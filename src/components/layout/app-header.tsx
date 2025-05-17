'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import AuthModal from '@/components/auth/auth-modal';

export default function AppHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-4 flex">
          <Link href="/" className="mr-6 flex items-center space-x-2">
            <span className="font-bold">FLWFF</span>
          </Link>
        </div>
        <div className="flex flex-1 items-center justify-between space-x-2 md:justify-end">
          <nav className="flex items-center space-x-6">
            <Link href="/FLWFF" className="text-sm font-medium transition-colors hover:text-primary">
              Home
            </Link>
            <Link href="/FLWFF/staking" className="text-sm font-medium transition-colors hover:text-primary">
              Staking
            </Link>
            <Link href="/FLWFF/whitelist" className="text-sm font-medium transition-colors hover:text-primary">
              Whitelist
            </Link>
          </nav>
          <div className="flex items-center space-x-4">
            <AuthModal
              triggerButton={
                <Button variant="outline" className="rounded-full">
                  Conectar Carteira
                </Button>
              }
            />
          </div>
        </div>
      </div>
    </header>
  );
}
