import React from 'react';
import { cn } from '@/lib/utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', children, ...props }, ref) => {
    const base = 'inline-flex items-center justify-center font-medium rounded-xl transition-all duration-200 focus:outline-none disabled:opacity-40 disabled:pointer-events-none cursor-pointer active:scale-[0.98]';

    const variants = {
      primary: 'bg-white text-slate-950 hover:bg-slate-100 shadow-md font-semibold',
      secondary: 'bg-white/[0.08] hover:bg-white/[0.12] text-white border border-white/10 backdrop-blur-md',
      outline: 'border border-white/15 bg-transparent hover:bg-white/[0.05] text-slate-200',
      danger: 'bg-rose-500/80 hover:bg-rose-600 text-white shadow-md',
      ghost: 'text-slate-300 hover:bg-white/[0.06] hover:text-white',
    };

    const sizes = {
      sm: 'text-xs px-3 py-1.5 gap-1.5',
      md: 'text-xs px-4 py-2 gap-2',
      lg: 'text-sm px-5 py-2.5 gap-2.5',
    };

    return (
      <button ref={ref} className={cn(base, variants[variant], sizes[size], className)} {...props}>
        {children}
      </button>
    );
  }
);
Button.displayName = 'Button';
