import React from 'react';
import { cn } from '@/lib/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'success' | 'warning' | 'danger' | 'outline' | 'purple' | 'cyan';
  dot?: boolean;
}

export function Badge({ children, variant = 'default', dot = true, className, ...props }: BadgeProps) {
  const variantStyles = {
    default: 'bg-white/[0.06] text-slate-300 border-white/[0.08]',
    success: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/25',
    warning: 'bg-amber-500/10 text-amber-300 border-amber-500/25',
    danger: 'bg-rose-500/10 text-rose-300 border-rose-500/25',
    outline: 'bg-transparent text-slate-300 border-white/15',
    purple: 'bg-purple-500/10 text-purple-300 border-purple-500/25',
    cyan: 'bg-cyan-500/10 text-cyan-300 border-cyan-500/25',
  };

  const dotColors = {
    default: 'bg-slate-400',
    success: 'bg-emerald-400',
    warning: 'bg-amber-400',
    danger: 'bg-rose-400',
    outline: 'bg-slate-400',
    purple: 'bg-purple-400',
    cyan: 'bg-cyan-400',
  };

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-medium tracking-tight backdrop-blur-md',
        variantStyles[variant],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('h-1.5 w-1.5 rounded-full', dotColors[variant])} />}
      {children}
    </span>
  );
}
