/**
 * Card Component
 * 
 * A flexible card component with theme support.
 */

import { cn } from '@/shared/utils/format';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  variant?: 'default' | 'outlined' | 'elevated';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

export function Card({ 
  children, 
  className, 
  variant = 'default',
  padding = 'md',
  ...props 
}: CardProps) {
  const baseClasses = 'rounded-xl border transition-colors';
  
  const variantClasses = {
    default: 'bg-[var(--lc-surface)] border-[var(--lc-border)]',
    outlined: 'bg-transparent border-[var(--lc-border)]',
    elevated: 'bg-[var(--lc-surface-strong)] border-[var(--lc-border)] shadow-lg',
  };
  
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  return (
    <div
      className={cn(
        baseClasses,
        variantClasses[variant],
        paddingClasses[padding],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
