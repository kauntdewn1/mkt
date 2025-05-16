'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { useWeb3Auth } from '@/contexts/web3auth-context';
import { useAuth } from '@/contexts/auth-context';

interface AuthModalProps {
  triggerButton: React.ReactNode;
}

export default function AuthModal({ triggerButton }: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { web3auth, isLoading, currentChain, switchToEthereum, switchToSolana } = useWeb3Auth();
  const { signIn } = useAuth();

  const handleLogin = async () => {
    try {
      if (!web3auth) {
        throw new Error('Web3Auth not initialized');
      }

      const provider = await web3auth.connect();
      const user = await web3auth.getUserInfo();
      
      if (user && user.verifierId) {
        await signIn({
          id: user.verifierId as string,
          email: user.email || '',
          name: user.name || '',
          avatar: user.profileImage || '',
        });
      }
        setIsOpen(false);
    } catch (error) {
      console.error('Falha no login:', error);
    }
  };

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>{triggerButton}</button>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[425px] bg-black border border-gray-800">
          <DialogHeader>
            <DialogTitle className="text-2xl font-bold text-center bg-gradient-to-r from-purple-500 to-pink-500 bg-clip-text text-transparent">
              Conecte sua Carteira
            </DialogTitle>
          </DialogHeader>
          <div className="flex flex-col gap-4 py-4">
            <div className="flex justify-center gap-2 mb-4">
              <Button
                onClick={switchToEthereum}
                variant={currentChain === 'ethereum' ? 'primary' : 'outline'}
                className="rounded-full"
              >
                Ethereum
              </Button>
              <Button
                onClick={switchToSolana}
                variant={currentChain === 'solana' ? 'primary' : 'outline'}
                className="rounded-full"
              >
                Solana
              </Button>
            </div>
            <Button
              onClick={handleLogin}
              disabled={isLoading}
              className="w-full rounded-full bg-gradient-to-r from-primary to-background text-primary-foreground border-none hover:opacity-90 transition-opacity duration-300"
            >
              {isLoading ? 'Carregando...' : 'Conectar com Web3Auth'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
} 