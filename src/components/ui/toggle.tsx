import { HTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

export interface ToggleProps extends HTMLAttributes<HTMLButtonElement> {
  pressed?: boolean;
  onPressedChange?: (pressed: boolean) => void;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

const Toggle = forwardRef<HTMLButtonElement, ToggleProps>(
  ({ className, pressed = false, onPressedChange, disabled = false, size = 'md', children, ...props }, ref) => {
    const sizes = {
      sm: 'h-8 px-3 text-sm',
      md: 'h-10 px-4',
      lg: 'h-12 px-6'
    };

    return (
      <button
        ref={ref}
        type="button"
        role="switch"
        aria-checked={pressed}
        disabled={disabled}
        onClick={() => onPressedChange?.(!pressed)}
        className={cn(
          'inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
          pressed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-muted/80',
          sizes[size],
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Toggle.displayName = 'Toggle';

export { Toggle }; 