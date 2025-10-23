import * as React from 'react';
import { cn } from '@/shared/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', ...props }, ref) => {
    return (
      <button
        className={cn(
          'inline-flex items-center justify-center rounded-full font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400 disabled:pointer-events-none disabled:opacity-50',
          {
            'bg-emerald-500 text-slate-950 hover:bg-emerald-400': variant === 'default',
            'border border-white/20 text-white/80 hover:border-white hover:text-white': variant === 'outline',
            'text-white/70 hover:text-white': variant === 'ghost',
          },
          {
            'px-4 py-2 text-sm': size === 'sm',
            'px-6 py-3 text-base': size === 'md',
            'px-8 py-4 text-lg': size === 'lg',
          },
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button };
