import { useState, useCallback } from 'react';

interface Toast {
  title: React.ReactNode;
  description?: React.ReactNode;
  variant?: 'default' | 'destructive';
  className?: string;
}

export function useToast() {
  const [toast, setToast] = useState<Toast | null>(null);

  const showToast = useCallback((toastData: Toast) => {
    setToast(toastData);
    setTimeout(() => setToast(null), 5000);
  }, []);

  return {
    toast: showToast,
    currentToast: toast
  };
} 