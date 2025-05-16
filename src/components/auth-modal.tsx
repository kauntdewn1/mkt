'use client';

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';

interface AuthModalProps {
  triggerButton?: React.ReactNode;
}

export default function AuthModal({ triggerButton }: AuthModalProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <>
      {triggerButton ? (
        <span 
          role="button" 
          tabIndex={0} 
          onClick={() => setIsOpen(true)} 
          onKeyDown={e => (e.key === 'Enter' || e.key === ' ') && setIsOpen(true)} 
          className="cursor-pointer inline-block"
        >
          {triggerButton}
        </span>
      ) : (
        <Button onClick={() => setIsOpen(true)}>
          Conectar / Entrar
        </Button>
      )}
      {isOpen && (
        <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
          <div className="bg-background border border-border p-8 rounded-lg min-w-[300px] text-center">
            <h2 className="font-bold text-2xl mb-4">Autenticação</h2>
            <p className="text-muted-foreground mb-6">
              Conecte sua wallet para acessar o staking.
            </p>
            <div className="space-y-4">
              <Button 
                className="w-full bg-gradient-to-r from-primary to-background text-primary-foreground"
                onClick={() => {
                  // TODO: Implementar conexão com wallet
                  console.log('Conectar wallet');
                }}
              >
                Conectar Wallet
              </Button>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setIsOpen(false)}
              >
                Fechar
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}