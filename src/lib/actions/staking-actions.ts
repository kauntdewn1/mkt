'use server';

import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { STAKE_CONFIG } from '../schemas/staking-schema';
import type { StakingFormValues } from '../schemas/staking-schema';

export async function submitStakingAction(data: StakingFormValues) {
  try {
    // Validações de segurança
    if (data.amount < STAKE_CONFIG.MIN_AMOUNT) {
      throw new Error(`Valor mínimo para stake é ${STAKE_CONFIG.MIN_AMOUNT} FLWFF`);
    }

    if (data.amount > STAKE_CONFIG.MAX_AMOUNT) {
      throw new Error(`Valor máximo para stake é ${STAKE_CONFIG.MAX_AMOUNT} FLWFF`);
    }

    if (!STAKE_CONFIG.DURATIONS.includes(data.durationMonths as typeof STAKE_CONFIG.DURATIONS[number])) {
      throw new Error('Duração inválida para stake');
    }

    // TODO: Adicionar verificação de saldo do usuário
    // TODO: Implementar lock de tokens no contrato

    const stakeData = {
      ...data,
      startDate: serverTimestamp(),
      status: 'active',
      apr: STAKE_CONFIG.APR_RATES[data.durationMonths as keyof typeof STAKE_CONFIG.APR_RATES],
      estimatedReturn: data.amount * STAKE_CONFIG.APR_RATES[data.durationMonths as keyof typeof STAKE_CONFIG.APR_RATES] * (data.durationMonths / 12),
      earlyWithdrawalPenalty: STAKE_CONFIG.EARLY_WITHDRAWAL_PENALTY
    };

    if (!db) {
      throw new Error('Firestore não está inicializado');
    }

    const docRef = await addDoc(collection(db, 'staking'), stakeData);

    return {
      success: true,
      stakeId: docRef.id,
      message: 'Stake realizado com sucesso'
    };
  } catch (error) {
    console.error('Erro ao realizar stake:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Erro desconhecido ao realizar stake'
    };
  }
} 