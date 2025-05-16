
'use client';

import dynamic from 'next/dynamic';
import { Skeleton } from 'src/components/ui/skeleton';
import { ShieldCheck } from 'lucide-react';

// Importação dinâmica do componente StakingSection
const ActualStakingSection = dynamic(() => import('src/app/FLWFF/staking-section'), {
  ssr: false,
  loading: () => (
    <section id="staking" className="w-full max-w-2xl mt-12 md:mt-20">
      <div className="bg-card p-6 md:p-8 rounded-lg shadow-xl border border-secondary/50">
        <h2 className="text-3xl md:text-4xl font-bold text-secondary mb-3 text-center font-mono uppercase tracking-tight flex items-center justify-center">
          <ShieldCheck className="mr-3 h-8 w-8" /> Staking $MKS
        </h2>
        <Skeleton className="h-6 w-3/4 mx-auto mb-6" />
        <div className="space-y-6">
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-14 w-full" />
        </div>
      </div>
    </section>
  ),
});

export default function DynamicStakingSection() {
  return <ActualStakingSection />;
}