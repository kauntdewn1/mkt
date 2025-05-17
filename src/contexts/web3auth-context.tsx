'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { Web3Auth } from '@web3auth/modal';
import { SafeEventEmitterProvider } from '@web3auth/base';
import { initWeb3Auth } from '@/config/web3auth';

interface Web3AuthContextType {
  web3auth: Web3Auth | null;
  provider: SafeEventEmitterProvider | null;
  isConnected: boolean;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  error: Error | null;
  currentChain: 'ethereum' | 'solana';
  switchToEthereum: () => Promise<void>;
  switchToSolana: () => Promise<void>;
}

const Web3AuthContext = createContext<Web3AuthContextType>({
  web3auth: null,
  provider: null,
  isConnected: false,
  login: async () => {},
  logout: async () => {},
  isLoading: true,
  error: null,
  currentChain: 'ethereum',
  switchToEthereum: async () => {},
  switchToSolana: async () => {},
});

export function Web3AuthProvider({ children }: { children: React.ReactNode }) {
  const [web3auth, setWeb3Auth] = useState<Web3Auth | null>(null);
  const [provider, setProvider] = useState<SafeEventEmitterProvider | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [currentChain, setCurrentChain] = useState<'ethereum' | 'solana'>('ethereum');

  useEffect(() => {
    const init = async () => {
      try {
        const web3authInstance = await initWeb3Auth();
        setWeb3Auth(web3authInstance);
        if (web3authInstance.provider) {
          setProvider(web3authInstance.provider);
          setIsConnected(true);
        }
      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to initialize Web3Auth'));
      } finally {
        setIsLoading(false);
      }
    };

    init();
  }, []);

  const login = async () => {
    if (!web3auth) return;
    try {
      const provider = await web3auth.connect();
      setProvider(provider);
      setIsConnected(true);
    } catch (err) {
      console.error('Failed to login:', err);
    }
  };

  const logout = async () => {
    if (!web3auth) return;
    try {
      await web3auth.logout();
      setProvider(null);
      setIsConnected(false);
    } catch (err) {
      console.error('Failed to logout:', err);
    }
  };

  const switchToEthereum = async () => {
    if (!web3auth) return;
    try {
      await web3auth.switchChain({ chainId: '0x1' });
      setCurrentChain('ethereum');
    } catch (err) {
      console.error('Failed to switch to Ethereum:', err);
    }
  };

  const switchToSolana = async () => {
    if (!web3auth) return;
    try {
      await web3auth.switchChain({ chainId: '0x1' });
      setCurrentChain('solana');
    } catch (err) {
      console.error('Failed to switch to Solana:', err);
    }
  };

  return (
    <Web3AuthContext.Provider 
      value={{ 
        web3auth, 
        provider, 
        isConnected, 
        login, 
        logout, 
        isLoading, 
        error,
        currentChain,
        switchToEthereum,
        switchToSolana
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