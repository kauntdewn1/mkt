'use client';

import { useEffect, type ReactNode } from 'react';
import { ensureFirebaseInitialized } from '@/lib/firebase';

interface FirebaseProviderProps {
  children: ReactNode;
}

export function FirebaseProvider({ children }: FirebaseProviderProps) {
  useEffect(() => {
    ensureFirebaseInitialized();
  }, []);

  return <>{children}</>;
}
