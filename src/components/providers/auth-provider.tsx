'use client';

import { AuthProvider as BaseAuthProvider } from '@/contexts/auth-context';
import { Web3AuthProvider } from '@/contexts/web3auth-context';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  return (
    <BaseAuthProvider>
      <Web3AuthProvider>
        {children}
      </Web3AuthProvider>
    </BaseAuthProvider>
  );
} 