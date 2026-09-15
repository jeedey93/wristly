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

const STATUS_LABELS: Record<Watch['status'], { label: string; variant: 'success' | 'secondary' | 'warning' | 'outline' }> = {
  active: { label: 'Available', variant: 'success' },
  rented: { label: 'Rented', variant: 'secondary' },
  pending_review: { label: 'Under Review', variant: 'warning' },
  inactive: { label: 'Inactive', variant: 'outline' },
}

export function WatchCard({ watch }: WatchCardProps) {
  const statusInfo = STATUS_LABELS[watch.status]
  const isAvailable = watch.status === 'active'

  return (
    <Link
      href={`/watches/${watch.id}`}
      className={`group block rounded-xl border border-stone-200 bg-white overflow-hidden watch-card ${
        !isAvailable ? 'opacity-60' : ''
      }`}
    >
      {/* Photo */}
      <div className="relative aspect-watch overflow-hidden bg-stone-100">
        {watch.photos[0] ? (
          <Image
            src={watch.photos[0]}
            alt={`${watch.brand} ${watch.model}`}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center bg-stone-100">
            <span className="text-4xl">⌚</span>
          </div>
        )}

        {/* Status badge overlay */}
        <div className="absolute top-3 left-3">
          <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
        </div>

        {/* Auth badge */}
        {watch.isAuthenticated && (
          <div className="absolute top-3 right-3">
            <span className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs font-medium bg-amber-700 text-white">
              <ShieldCheck size={10} />
              Verified
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4">
        <div className="flex items-start justify-between gap-2">
          <div>
            <p className="text-xs font-medium text-stone-500 uppercase tracking-wide">{watch.brand}</p>
            <h3 className="mt-0.5 text-sm font-semibold text-stone-900 leading-tight">{watch.model}</h3>
          </div>
          <div className="text-right shrink-0">
            <p className="text-sm font-bold text-stone-900">{formatCAD(watch.rentalPrice30d)}</p>
            <p className="text-xs text-stone-500">/ 30 days</p>
          </div>
        </div>

        <div className="mt-3 flex items-center justify-between">
          <div className="flex items-center gap-1 text-xs text-stone-500">
            <MapPin size={11} />
            <span>{watch.pickupArea}</span>
          </div>
          <StarRating rating={watch.watchRating} count={watch.watchReviews} />
        </div>

        <div className="mt-3 border-t border-stone-100 pt-3 flex items-center justify-between">
          <p className="text-xs text-stone-500">
            Deposit: <span className="font-medium text-stone-700">{formatCAD(watch.depositAmount)}</span>
          </p>
          <p className="text-xs text-stone-500">
            Est. value: <span className="font-medium text-stone-700">{formatCAD(watch.estimatedValue)}</span>
          </p>
        </div>
      </div>
    </Link>
  )
}
