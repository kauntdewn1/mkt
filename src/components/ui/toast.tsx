'use client';

import { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { X } from 'lucide-react';

export function Toast() {
  const { currentToast } = useToast();

  if (!currentToast) return null;

  return (
    <div className={`fixed bottom-4 right-4 p-4 rounded-lg shadow-lg z-50 ${
      currentToast.variant === 'destructive' ? 'bg-destructive text-destructive-foreground' : 'bg-background border border-border'
    } ${currentToast.className || ''}`}>
      <div className="flex items-start gap-2">
        <div className="flex-1">
          <div className="font-semibold">{currentToast.title}</div>
          {currentToast.description && (
            <div className="text-sm mt-1">{currentToast.description}</div>
          )}
        </div>
        <button className="p-1 hover:opacity-70">
          <X className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
} 