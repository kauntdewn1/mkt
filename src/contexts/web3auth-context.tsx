'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { initWeb3Auth } from '@/config/web3auth';

interface Web3AuthContextType {
  web3auth: Web3Auth | null;
  isLoading: boolean;
  error: Error | null;
  switchToEthereum: () => Promise<void>;
  switchToSolana: () => Promise<void>;
  currentChain: 'ethereum' | 'solana';
}

const Web3AuthContext = createContext<Web3AuthContextType>({
  web3auth: null,
  isLoading: true,
  error: null,
  switchToEthereum: async () => {},
  switchToSolana: async () => {},
  currentChain: 'ethereum',
});

export function Web3AuthProvider({ children }: { children: React.ReactNode }) {
  const [web3auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentChain, setCurrentChain] = useState<'ethereum' | 'solana'>('ethereum');

  useEffect(() => {
    const init = async () => {
      try {
        const web3authInstance = await initWeb3Auth();
        setWeb3Auth(web3authInstance);
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize Web3Auth'));
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const switchToEthereum = async () => {
    if (!web3auth) return;
    try {
      await web3auth.switchChain({
        chainNamespace: 'eip155',
        chainId: '0x1',
      });
      setCurrentChain('ethereum');
    } catch (err) {
      console.error('Failed to switch to Ethereum:', err);
    }
  };

  const switchToSolana = async () => {
    if (!web3auth) return;
    try {
      await web3auth.switchChain({
        chainNamespace: 'solana',
        chainId: '0x1',
      });
      setCurrentChain('solana');
    } catch (err) {
      console.error('Failed to switch to Solana:', err);
    }
  };

  return (
    <Web3AuthContext.Provider 
      value={{ 
        web3auth, 
        isLoading, 
        error, 
        switchToEthereum, 
        switchToSolana,
        currentChain,
      }}
    >
      {children}
    </Web3AuthContext.Provider>
  );
}

export const useWeb3Auth = () => {
  const context = useContext(Web3AuthContext);
  if (!context) {
    throw new Error('useWeb3Auth must be used within a Web3AuthProvider');
  }
  return context;
}; 