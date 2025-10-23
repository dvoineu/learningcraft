/**
 * Input Component
 * 
 * A styled input component with theme support.
 */

import { cn } from '@/shared/utils/format';
import { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  helperText?: string;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, helperText, className, ...props }, ref) => {
    return (
      <div className="space-y-2">
        {label && (
          <label className="text-sm font-medium text-[var(--lc-foreground)]">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-3 py-2 rounded-lg border border-[var(--lc-border)]',
            'bg-[var(--lc-surface)] text-[var(--lc-foreground)]',
            'placeholder:text-[var(--lc-muted)]',
            'focus:outline-none focus:ring-2 focus:ring-[var(--lc-accent)] focus:border-transparent',
            'disabled:opacity-50 disabled:cursor-not-allowed',
            error && 'border-red-500 focus:ring-red-500',
            className
          )}
          {...props}
        />
        {error && (
          <p className="text-sm text-red-500">{error}</p>
        )}
        {helperText && !error && (
          <p className="text-sm text-[var(--lc-muted)]">{helperText}</p>
        )}
      </div>
    );
  }
);

Input.displayName = 'Input';
