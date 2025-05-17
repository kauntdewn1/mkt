'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { Form,
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  FormMessage,
  FormDescription,
} from 'src/components/ui/form';
import { Input } from 'src/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from 'src/components/ui/select';
import { useToast } from 'src/hooks/use-toast';
import { submitStakingAction } from 'src/lib/actions/staking-actions';
import type { StakingFormValues } from 'src/lib/schemas/staking-schema';
import { StakingFormSchema, STAKE_CONFIG } from 'src/lib/schemas/staking-schema';
import { useAuth } from 'src/contexts/auth-context';
import { useState, useTransition, useEffect } from 'react';
import { Loader2, CheckCircle, AlertTriangle, BarChartBig } from 'lucide-react';

interface DurationOption {
  label: string;
  value: number;
}

const DURATION_OPTIONS = STAKE_CONFIG.DURATIONS.map((duration: number): DurationOption => ({
  label: `${duration} Meses`,
  value: duration
}));

export default function StakingForm() {
  const [isPending, startTransition] = useTransition();
  const { toast } = useToast();
  const { user } = useAuth();
  const [estimatedReturn, setEstimatedReturn] = useState<number | null>(null);
  const [apr, setApr] = useState<number | null>(null);

  const form = useForm<StakingFormValues>({
    resolver: zodResolver(StakingFormSchema),
    defaultValues: {
      walletAddress: user?.walletAddress || '',
      amount: 0,
      durationMonths: DURATION_OPTIONS[0].value,
    },
  });

  useEffect(() => {
    if (user?.walletAddress) {
      form.setValue('walletAddress', user.walletAddress);
    }
  }, [user, form]);
  
  useEffect(() => {
    const subscription = form.watch((values: Partial<StakingFormValues>, { name }: { name?: keyof StakingFormValues }) => {
      if (name === 'amount' || name === 'durationMonths') {
        const amount = Number(values.amount) || 0;
        const duration = Number(values.durationMonths) || 0;
        const durationKey = duration as keyof typeof STAKE_CONFIG.APR_RATES;
        if (
          amount > 0 &&
          duration > 0 &&
          Object.prototype.hasOwnProperty.call(STAKE_CONFIG.APR_RATES, durationKey)
        ) {
          const currentApr = STAKE_CONFIG.APR_RATES[durationKey];
          setApr(currentApr * 100);
          const interest = amount * currentApr * (duration / 12);
          setEstimatedReturn(interest);
        } else {
          setEstimatedReturn(null);
          setApr(null);
        }
      }
    });

    return () => subscription.unsubscribe();
  }, [form]);

  function onSubmit(values: StakingFormValues) {
    if (!user?.walletAddress) {
      toast({ 
        title: "Carteira não conectada", 
        description: "Conecte sua carteira para fazer stake.", 
        variant: "destructive" 
      });
      return;
    }
    
    const dataToSubmit = { ...values, walletAddress: user.walletAddress };

    startTransition(async () => {
      try {
        const result = await submitStakingAction(dataToSubmit);
        if (result.success && result.stakeId) {
          toast({
            title: <div className="flex items-center"><CheckCircle className="h-5 w-5 text-secondary mr-2" />Stake Realizado!</div>,
            description: `Seu stake de ${values.amount} $MKS foi registrado com sucesso. ID: ${result.stakeId.substring(0,8)}...`,
            variant: 'default',
            className: 'bg-card border-secondary text-foreground',
          });
          form.reset({ 
            amount: 0, 
            durationMonths: DURATION_OPTIONS[0].value, 
            walletAddress: user.walletAddress || ''
          });
          setEstimatedReturn(null);
          setApr(null);
        } else {
          throw new Error(result.error || 'Falha ao registrar o stake.');
        }
      } catch (error) {
        toast({
          title: <div className="flex items-center"><AlertTriangle className="h-5 w-5 text-destructive mr-2" />Erro no Stake</div>,
          description: error instanceof Error ? error.message : 'Ocorreu um erro desconhecido.',
          variant: 'destructive',
        });
      }
    });
  }

  if (!user?.walletAddress) {
    return (
      <div className="text-center p-4 bg-input rounded-md shadow-inner">
        <p className="text-muted-foreground">Conecte sua carteira para participar do staking.</p>
      </div>
    );
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="amount"
          render={({ field }: { field: { value: number; onChange: (value: number) => void } }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground uppercase text-xs tracking-wider">
                Montante $MKS (Min: {STAKE_CONFIG.MIN_AMOUNT}, Max: {STAKE_CONFIG.MAX_AMOUNT})
              </FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="0.00"
                  {...field}
                  onChange={e => field.onChange(parseFloat(e.target.value) || 0)}
                  className="bg-input border-border focus:border-primary focus:ring-primary text-foreground placeholder:text-muted-foreground/50 h-12 text-base"
                />
              </FormControl>
              <FormMessage className="text-destructive/80" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="durationMonths"
          render={({ field }: { field: { value: number; onChange: (value: number) => void } }) => (
            <FormItem>
              <FormLabel className="text-muted-foreground uppercase text-xs tracking-wider">Duração do Stake</FormLabel>
              <Select onValueChange={(value: string) => field.onChange(parseInt(value))} defaultValue={String(field.value)}>
                <FormControl>
                  <SelectTrigger className="bg-input border-border focus:border-primary focus:ring-primary text-foreground h-12 text-base">
                    <SelectValue placeholder="Selecione a duração" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent className="bg-popover border-primary/50 text-popover-foreground">
                  {DURATION_OPTIONS.map((opt: DurationOption) => (
                    <SelectItem key={opt.value} value={String(opt.value)} className="hover:bg-primary/20 focus:bg-primary/30">
                      {opt.label} (APR: {STAKE_CONFIG.APR_RATES[opt.value as keyof typeof STAKE_CONFIG.APR_RATES] * 100}%)
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-destructive/80" />
            </FormItem>
          )}
        />
        
        {apr !== null && (
          <FormDescription className="text-secondary font-mono text-sm">
            Taxa Anual de Retorno (APR): {apr.toFixed(2)}%
          </FormDescription>
        )}
        
        {estimatedReturn !== null && (
          <div className="p-4 bg-input rounded-md mt-2">
            <p className="text-sm text-muted-foreground">Retorno Estimado ao Final do Período:</p>
            <p className="text-lg font-mono text-secondary">
              {estimatedReturn.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 4 })} $MKS
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Penalidade por Early Withdrawal: {STAKE_CONFIG.EARLY_WITHDRAWAL_PENALTY * 100}%
            </p>
          </div>
        )}

        <Button
          type="submit"
          className="w-full bg-secondary hover:bg-secondary/80 text-secondary-foreground font-bold py-3 h-14 text-lg uppercase tracking-wider"
          disabled={isPending || !form.formState.isValid || form.getValues("amount") <= 0}
        >
          {isPending ? (
            <><Loader2 className="mr-2 h-5 w-5 animate-spin" />Processando Stake...</>
          ) : (
            <><BarChartBig className="mr-2 h-5 w-5" />Fazer Stake $MKS</>
          )}
        </Button>
      </form>
    </Form>
  );
}