import { z } from 'zod';

export const StakingFormSchema = z.object({
  amount: z.number()
    .min(100, 'Mínimo de 100 FLWFF para stake')
    .max(1000000, 'Máximo de 1.000.000 FLWFF por stake'),
  durationMonths: z.number()
    .refine((val) => [3, 6, 12].includes(val), 'Duração inválida'),
  walletAddress: z.string()
    .min(1, 'Carteira é obrigatória')
});

export type StakingFormValues = z.infer<typeof StakingFormSchema>;

export const STAKE_CONFIG = {
  MIN_AMOUNT: 100,
  MAX_AMOUNT: 1000000,
  EARLY_WITHDRAWAL_PENALTY: 0.1, // 10% de penalidade
  DURATIONS: [3, 6, 12] as const,
  APR_RATES: {
    3: 0.05,  // 5% APR
    6: 0.08,  // 8% APR
    12: 0.12  // 12% APR
  }
} as const; 