'use client';

import { AuthProvider } from '@/contexts/auth-context';
import { Web3AuthProvider } from '@/contexts/web3auth-context';

export default function AuthProviderWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Web3AuthProvider>
      <AuthProvider>{children}</AuthProvider>
    </Web3AuthProvider>
  );
} 