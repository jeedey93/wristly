import * as React from 'react'
import { Slot, Slottable } from '@radix-ui/react-slot'
import { cn } from '@/lib/utils'

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'default' | 'outline' | 'ghost' | 'secondary' | 'destructive' | 'accent'
  size?: 'sm' | 'md' | 'lg' | 'xl'
  loading?: boolean
  asChild?: boolean
}

const variantClasses: Record<NonNullable<ButtonProps['variant']>, string> = {
  default:     'bg-black text-white hover:bg-zinc-800 active:bg-zinc-950',
  outline:     'border border-zinc-300 bg-transparent text-black hover:bg-zinc-50 hover:border-zinc-400',
  ghost:       'bg-transparent text-zinc-600 hover:bg-zinc-100 hover:text-black',
  secondary:   'bg-zinc-100 text-black hover:bg-zinc-200',
  destructive: 'bg-red-600 text-white hover:bg-red-700',
  accent:      'bg-amber-600 text-white hover:bg-amber-700 active:bg-amber-800',
}

const sizeClasses: Record<NonNullable<ButtonProps['size']>, string> = {
  sm:  'h-8 px-3 text-xs rounded-md gap-1.5',
  md:  'h-10 px-4 text-sm rounded-lg gap-2',
  lg:  'h-11 px-6 text-sm rounded-lg gap-2',
  xl:  'h-13 px-8 text-base rounded-xl gap-2',
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'default', size = 'md', loading, children, disabled, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button'
    return (
      <Comp
        ref={ref}
        disabled={disabled || loading}
        className={cn(
          'inline-flex items-center justify-center font-medium tracking-tight transition-all duration-150',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-black focus-visible:ring-offset-2',
          'disabled:opacity-40 disabled:pointer-events-none',
          variantClasses[variant],
          sizeClasses[size],
          className
        )}
        {...props}
      >
        {loading && (
          <svg className="h-4 w-4 animate-spin shrink-0" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
          </svg>
        )}
        <Slottable>{children}</Slottable>
      </Comp>
    )
  }
)
Button.displayName = 'Button'
