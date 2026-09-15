import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ShieldCheck, Star, Clock, Package, ChevronRight, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StarRating } from '@/components/ui/star-rating'
import { SEED_WATCHES } from '@/lib/seed-data'
import { config, formatCAD, calculateOwnerPayout, calculatePlatformFee } from '@/lib/config'

interface Props {
  params: Promise<{ id: string }>
}

export function generateStaticParams() {
  return SEED_WATCHES.map((w) => ({ id: w.id }))
}

export default async function WatchDetailPage({ params }: Props) {
  const { id } = await params
  const watch = SEED_WATCHES.find((w) => w.id === id)
  if (!watch) notFound()

  const isAvailable = watch.status === 'active'

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 py-3 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-1.5 text-xs text-stone-500">
            <Link href="/" className="hover:text-stone-900">Home</Link>
            <ChevronRight size={12} />
            <Link href="/watches" className="hover:text-stone-900">Watches</Link>
            <ChevronRight size={12} />
            <span className="text-stone-900 font-medium">{watch.brand} {watch.model}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-5">
          {/* Left: Photos */}
          <div className="lg:col-span-3">
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-stone-200">
              {watch.photos[0] ? (
                <Image
                  src={watch.photos[0]}
                  alt={`${watch.brand} ${watch.model}`}
                  fill
                  priority
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 60vw"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-6xl">⌚</div>
              )}
              {watch.isAuthenticated && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium bg-amber-700 text-white shadow-lg">
                    <ShieldCheck size={14} />
                    Authenticity Verified
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {watch.photos.length > 1 && (
              <div className="mt-3 flex gap-3">
                {watch.photos.map((photo, i) => (
                  <div key={i} className="relative h-20 w-24 rounded-xl overflow-hidden bg-stone-200 border-2 border-stone-200">
                    <Image
                      src={photo}
                      alt={`${watch.brand} ${watch.model} photo ${i + 1}`}
                      fill
                      className="object-cover"
                      sizes="96px"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="mt-8 rounded-2xl bg-white border border-stone-200 p-6">
              <h2 className="text-lg font-semibold text-stone-900 mb-3">About this watch</h2>
              <p className="text-stone-600 leading-relaxed text-sm">{watch.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3">
                {[
                  { label: 'Brand', value: watch.brand },
                  { label: 'Model', value: watch.model },
                  { label: 'Reference', value: watch.referenceNumber },
                  { label: 'Year', value: watch.year },
                  { label: 'Condition', value: watch.condition },
                  { label: 'Estimated Value', value: formatCAD(watch.estimatedValue) },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-stone-50 px-4 py-3">
                    <p className="text-xs text-stone-500 uppercase tracking-wide mb-1">{item.label}</p>
                    <p className="text-sm font-semibold text-stone-900">{item.value}</p>
                  </div>
                ))}
              </div>

              {/* Accessories */}
              {watch.includedAccessories.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Package size={16} className="text-stone-500" />
                    <h3 className="text-sm font-semibold text-stone-900">Included accessories</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {watch.includedAccessories.map((acc) => (
                      <Badge key={acc} variant="secondary">{acc}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Owner info */}
            <div className="mt-4 rounded-2xl bg-white border border-stone-200 p-6">
              <h2 className="text-lg font-semibold text-stone-900 mb-4">Owner</h2>
              <div className="flex items-center gap-4">
                <div className="h-12 w-12 rounded-full bg-stone-900 flex items-center justify-center text-white font-bold text-lg">
                  {watch.ownerName[0]}
                </div>
                <div>
                  <p className="font-semibold text-stone-900">{watch.ownerName}</p>
                  <StarRating rating={watch.ownerRating} count={watch.ownerReviews} size="md" />
                </div>
              </div>
              <p className="mt-4 text-sm text-stone-500 leading-relaxed">
                Exact pickup location is shared only after a booking is confirmed.
              </p>
            </div>

            {/* Disclaimer */}
            <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 p-4 flex gap-3">
              <AlertTriangle size={16} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-xs text-amber-700 leading-relaxed">
                <strong>Private Beta.</strong> This platform is currently operating in a private beta.
                All transactions are monitored. Insurance and full legal compliance is in progress.
                Renting is currently limited to invited users.
              </p>
            </div>
          </div>

          {/* Right: Booking panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-24 rounded-2xl border border-stone-200 bg-white p-6 shadow-sm">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs font-bold tracking-widest text-stone-400 uppercase">{watch.brand}</p>
                  <h1 className="text-xl font-bold text-stone-900 mt-0.5">{watch.model}</h1>
                </div>
                <Badge variant={isAvailable ? 'success' : 'secondary'}>
                  {isAvailable ? 'Available' : 'Currently Rented'}
                </Badge>
              </div>

              <div className="mt-1 flex items-center gap-2">
                <MapPin size={13} className="text-stone-400" />
                <span className="text-sm text-stone-500">{watch.pickupArea}, {watch.city}</span>
              </div>

              <StarRating rating={watch.watchRating} count={watch.watchReviews} size="md" className="mt-2" />

              {/* Price breakdown */}
              <div className="mt-6 space-y-3 rounded-xl bg-stone-50 p-4">
                <p className="text-xs font-bold tracking-wide text-stone-500 uppercase mb-4">Rental breakdown</p>
                {config.platform.rentalDurations.map((days) => {
                  const price = days === 30
                    ? watch.rentalPrice30d
                    : days === 14
                    ? Math.round(watch.rentalPrice30d * 0.6)
                    : Math.round(watch.rentalPrice30d * 0.35)
                  return (
                    <div key={days} className="flex justify-between text-sm">
                      <span className="text-stone-600">{days} days</span>
                      <span className="font-semibold text-stone-900">{formatCAD(price)}</span>
                    </div>
                  )
                })}
                <div className="border-t border-stone-200 pt-3 flex justify-between text-sm">
                  <span className="text-stone-500">Security deposit (hold)</span>
                  <span className="font-medium text-stone-700">{formatCAD(watch.depositAmount)}</span>
                </div>
                <p className="text-xs text-stone-400">
                  Deposit is an authorization only — not charged unless damage occurs.
                </p>
              </div>

              {/* Owner earnings note */}
              <div className="mt-3 rounded-lg bg-stone-900 px-4 py-3 text-xs text-stone-400">
                Owner receives:{' '}
                <span className="font-semibold text-amber-400">
                  {formatCAD(calculateOwnerPayout(watch.rentalPrice30d))} / 30 days
                </span>{' '}
                after {(config.platform.commissionRate * 100).toFixed(0)}% platform fee.
              </div>

              {/* CTA */}
              {isAvailable ? (
                <Button size="xl" variant="accent" className="w-full mt-6" asChild>
                  <Link href={`/book/${watch.id}`}>
                    Rent this watch →
                  </Link>
                </Button>
              ) : (
                <Button size="xl" disabled className="w-full mt-6">
                  Currently rented
                </Button>
              )}

              <p className="mt-3 text-center text-xs text-stone-400">
                Free to request. You won't be charged until confirmed.
              </p>

              {/* Trust signals */}
              <div className="mt-5 space-y-2 border-t border-stone-100 pt-4">
                {[
                  { icon: <ShieldCheck size={13} />, text: 'Identity verified renters only' },
                  { icon: <Clock size={13} />, text: 'Local pickup · No shipping' },
                  { icon: <Star size={13} />, text: 'Condition documented at pickup & return' },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-2 text-xs text-stone-500">
                    <span className="text-stone-400">{item.icon}</span>
                    {item.text}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
