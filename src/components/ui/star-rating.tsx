import { Star } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StarRatingProps {
  rating: number
  count?: number
  size?: 'sm' | 'md'
  className?: string
}

export function StarRating({ rating, count, size = 'sm', className }: StarRatingProps) {
  const starSize = size === 'sm' ? 12 : 16
  return (
    <span className={cn('inline-flex items-center gap-1', className)}>
      <Star
        size={starSize}
        className="fill-amber-400 text-amber-400"
      />
      <span className={cn('font-medium text-stone-900', size === 'sm' ? 'text-xs' : 'text-sm')}>
        {rating.toFixed(1)}
      </span>
      {count !== undefined && (
        <span className={cn('text-stone-500', size === 'sm' ? 'text-xs' : 'text-sm')}>
          ({count})
        </span>
      )}
    </span>
  )
}
