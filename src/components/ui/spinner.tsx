import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface SpinnerProps extends HTMLAttributes<HTMLDivElement> {
  size?: 'sm' | 'md' | 'lg';
}

const Spinner = forwardRef<HTMLDivElement, SpinnerProps>(
  ({ className, size = 'md', ...props }, ref) => {
    const sizes = {
      sm: 'h-4 w-4',
      md: 'h-8 w-8',
      lg: 'h-12 w-12'
    };

    return (
      <div
        ref={ref}
        className={cn(
          'animate-spin rounded-full border-2 border-current border-t-transparent',
          sizes[size],
          className
        )}
        {...props}
      >
        <span className="sr-only">Carregando...</span>
      </div>
    );
  }
);

Spinner.displayName = 'Spinner';

export { Spinner }; 