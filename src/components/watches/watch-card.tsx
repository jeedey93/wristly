import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ShieldCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { StarRating } from '@/components/ui/star-rating'
import { formatCAD } from '@/lib/config'
import type { Watch } from '@/lib/seed-data'

interface WatchCardProps {
  watch: Watch
}

export function WatchCard({ watch }: WatchCardProps) {
  const isAvailable = watch.status === 'active'

  return (
    <Link
      href={`/watches/${watch.id}`}
      className={`group block bg-white rounded-2xl border border-zinc-200 overflow-hidden watch-card ${
        !isAvailable ? 'opacity-50' : ''
      }`}
    >
      {/* Photo */}
      <div className="relative aspect-watch overflow-hidden bg-zinc-100">
        {watch.photos[0] ? (
          <Image
            src={watch.photos[0]}
            alt={`${watch.brand} ${watch.model}`}
            fill
            className="object-cover img-zoom"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-5xl text-zinc-300">⌚</div>
        )}

        {/* Overlay badges */}
        <div className="absolute inset-x-0 top-0 flex items-start justify-between p-3">
          {!isAvailable && (
            <Badge variant="secondary" className="text-[11px]">Rented</Badge>
          )}
          {isAvailable && <span />}
          {watch.isAuthenticated && (
            <span className="inline-flex items-center gap-1 rounded-full bg-black/80 px-2 py-0.5 text-[10px] font-medium text-white backdrop-blur-sm">
              <ShieldCheck size={9} />
              Verified
            </span>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {/* Brand + price */}
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <p className="text-label text-zinc-400 truncate">{watch.brand}</p>
            <h3 className="mt-0.5 text-[15px] font-semibold text-black leading-tight truncate">
              {watch.model}
            </h3>
          </div>
          <div className="text-right shrink-0">
            <p className="text-[15px] font-bold text-black tabular-nums">{formatCAD(watch.rentalPrice30d)}</p>
            <p className="text-[11px] text-zinc-400">/ 30 days</p>
          </div>
        </div>

        {/* Meta row */}
        <div className="mt-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-[12px] text-zinc-400">
            <MapPin size={11} />
            {watch.pickupArea}
          </span>
          <StarRating rating={watch.watchRating} count={watch.watchReviews} />
        </div>

        {/* Footer row */}
        <div className="mt-3 pt-3 border-t border-zinc-100 flex items-center justify-between">
          <p className="text-[12px] text-zinc-400">
            Deposit{' '}
            <span className="font-medium text-zinc-600">{formatCAD(watch.depositAmount)}</span>
          </p>
          <p className="text-[12px] text-zinc-400">
            Value{' '}
            <span className="font-medium text-zinc-600">{formatCAD(watch.estimatedValue)}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}
