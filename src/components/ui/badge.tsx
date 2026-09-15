import * as React from 'react'
import { cn } from '@/lib/utils'

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'secondary' | 'outline' | 'success' | 'warning' | 'destructive' | 'auth'
}

const variantClasses: Record<NonNullable<BadgeProps['variant']>, string> = {
  default:     'bg-black text-white',
  secondary:   'bg-zinc-100 text-zinc-700',
  outline:     'border border-zinc-300 text-zinc-600 bg-transparent',
  success:     'bg-emerald-50 text-emerald-700 border border-emerald-200',
  warning:     'bg-amber-50 text-amber-700 border border-amber-200',
  destructive: 'bg-red-50 text-red-700 border border-red-200',
  auth:        'bg-amber-600 text-white',
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium tracking-tight',
        variantClasses[variant],
        className
      )}
      {...props}
    />
  )
}
