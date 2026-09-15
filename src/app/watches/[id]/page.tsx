import { notFound } from 'next/navigation'
import Image from 'next/image'
import Link from 'next/link'
import { MapPin, ShieldCheck, Star, Clock, Package, ChevronRight, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { StarRating } from '@/components/ui/star-rating'
import { SEED_WATCHES } from '@/lib/seed-data'
import { config, formatCAD, calculateOwnerPayout } from '@/lib/config'

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
    <div className="min-h-screen bg-white">

      {/* Breadcrumb */}
      <div className="border-b border-zinc-200">
        <div className="mx-auto max-w-7xl px-5 py-3 sm:px-8 lg:px-10">
          <nav className="flex items-center gap-1.5 text-[12px] text-zinc-400">
            <Link href="/" className="hover:text-black transition-colors">Home</Link>
            <ChevronRight size={11} />
            <Link href="/watches" className="hover:text-black transition-colors">Watches</Link>
            <ChevronRight size={11} />
            <span className="text-black font-medium">{watch.brand} {watch.model}</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 lg:px-10">
        <div className="grid gap-10 lg:grid-cols-5 lg:gap-14">

          {/* Left: Photos + details */}
          <div className="lg:col-span-3 space-y-5">

            {/* Main photo */}
            <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-zinc-100">
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
                <div className="flex h-full items-center justify-center text-6xl text-zinc-300">⌚</div>
              )}
              {watch.isAuthenticated && (
                <div className="absolute top-4 right-4">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-black/80 backdrop-blur-sm px-3 py-1.5 text-xs font-semibold text-white">
                    <ShieldCheck size={12} />
                    Authenticity Verified
                  </span>
                </div>
              )}
            </div>

            {/* Thumbnail strip */}
            {watch.photos.length > 1 && (
              <div className="flex gap-2.5">
                {watch.photos.map((photo, i) => (
                  <div key={i} className="relative h-20 w-24 shrink-0 rounded-xl overflow-hidden border-2 border-zinc-200 bg-zinc-100">
                    <Image src={photo} alt={`Photo ${i + 1}`} fill className="object-cover" sizes="96px" />
                  </div>
                ))}
              </div>
            )}

            {/* Description */}
            <div className="rounded-2xl border border-zinc-200 p-6">
              <h2 className="text-base font-semibold text-black mb-3">About this watch</h2>
              <p className="text-[14px] text-zinc-500 leading-relaxed">{watch.description}</p>

              <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3">
                {[
                  { label: 'Brand', value: watch.brand },
                  { label: 'Model', value: watch.model },
                  { label: 'Reference', value: watch.referenceNumber },
                  { label: 'Year', value: watch.year },
                  { label: 'Condition', value: watch.condition },
                  { label: 'Est. Value', value: formatCAD(watch.estimatedValue) },
                ].map((item) => (
                  <div key={item.label} className="rounded-xl bg-zinc-50 border border-zinc-200 px-4 py-3">
                    <p className="text-label text-zinc-400 mb-1">{item.label}</p>
                    <p className="text-sm font-semibold text-black">{item.value}</p>
                  </div>
                ))}
              </div>

              {watch.includedAccessories.length > 0 && (
                <div className="mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <Package size={14} className="text-zinc-400" />
                    <h3 className="text-sm font-semibold text-black">Included accessories</h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {watch.includedAccessories.map((acc) => (
                      <Badge key={acc} variant="secondary" className="text-[12px]">{acc}</Badge>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Owner */}
            <div className="rounded-2xl border border-zinc-200 p-6">
              <h2 className="text-base font-semibold text-black mb-4">Listed by</h2>
              <div className="flex items-center gap-4">
                <div className="h-11 w-11 rounded-full bg-black flex items-center justify-center text-white font-bold">
                  {watch.ownerName[0]}
                </div>
                <div>
                  <p className="font-semibold text-black text-sm">{watch.ownerName}</p>
                  <StarRating rating={watch.ownerRating} count={watch.ownerReviews} size="md" />
                </div>
              </div>
              <p className="mt-4 text-[13px] text-zinc-400 leading-relaxed">
                Exact pickup address is shared only after booking is confirmed.
              </p>
            </div>

            {/* Beta disclaimer */}
            <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 flex gap-3">
              <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
              <p className="text-[12px] text-amber-700 leading-relaxed">
                <strong>Private Beta.</strong> Rentals are currently limited to invited participants
                in the Greater Montreal area. Insurance and legal compliance is in progress.
              </p>
            </div>
          </div>

          {/* Right: Booking panel */}
          <div className="lg:col-span-2">
            <div className="sticky top-20 rounded-2xl border border-zinc-200 bg-white overflow-hidden">

              {/* Header */}
              <div className="p-6 border-b border-zinc-100">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-label text-zinc-400">{watch.brand}</p>
                    <h1 className="text-xl font-bold text-black tracking-tight mt-0.5">{watch.model}</h1>
                  </div>
                  <Badge variant={isAvailable ? 'success' : 'secondary'}>
                    {isAvailable ? 'Available' : 'Rented'}
                  </Badge>
                </div>
                <div className="mt-2 flex items-center gap-3">
                  <span className="inline-flex items-center gap-1 text-[13px] text-zinc-400">
                    <MapPin size={12} />
                    {watch.pickupArea}
                  </span>
                  <StarRating rating={watch.watchRating} count={watch.watchReviews} />
                </div>
              </div>

              {/* Pricing */}
              <div className="p-6 border-b border-zinc-100">
                <p className="text-label text-zinc-400 mb-4">Rental pricing</p>
                <div className="space-y-2">
                  {config.platform.rentalDurations.map((days) => {
                    const price = days === 30
                      ? watch.rentalPrice30d
                      : days === 14
                      ? Math.round(watch.rentalPrice30d * 0.6)
                      : Math.round(watch.rentalPrice30d * 0.35)
                    return (
                      <div key={days} className="flex items-center justify-between py-2">
                        <span className="text-sm text-zinc-500">{days} days</span>
                        <span className="text-sm font-bold text-black tabular-nums">{formatCAD(price)}</span>
                      </div>
                    )
                  })}
                </div>
                <div className="mt-3 pt-3 border-t border-zinc-100">
                  <div className="flex justify-between">
                    <span className="text-[13px] text-zinc-400">Security deposit (hold)</span>
                    <span className="text-[13px] font-medium text-zinc-600">{formatCAD(watch.depositAmount)}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1.5">
                    Authorization only — released if watch is returned undamaged.
                  </p>
                </div>
              </div>

              {/* Owner payout note */}
              <div className="px-6 py-3 bg-zinc-50 border-b border-zinc-100">
                <p className="text-[12px] text-zinc-500">
                  Owner earns{' '}
                  <span className="font-semibold text-black">{formatCAD(calculateOwnerPayout(watch.rentalPrice30d))}</span>
                  {' '}/ 30 days after {(config.platform.commissionRate * 100).toFixed(0)}% fee.
                </p>
              </div>

              {/* CTA */}
              <div className="p-6">
                {isAvailable ? (
                  <Button size="xl" variant="accent" className="w-full" asChild>
                    <Link href={`/book/${watch.id}`}>Rent this watch →</Link>
                  </Button>
                ) : (
                  <Button size="xl" disabled className="w-full">Currently rented</Button>
                )}
                <p className="mt-3 text-center text-[12px] text-zinc-400">
                  No charge until the owner confirms.
                </p>

                {/* Trust signals */}
                <div className="mt-5 space-y-2.5 pt-4 border-t border-zinc-100">
                  {[
                    { icon: <ShieldCheck size={12} />, text: 'Identity verified renters only' },
                    { icon: <Clock size={12} />, text: 'Local pickup · Greater Montreal' },
                    { icon: <Star size={12} />, text: 'Condition documented at pickup & return' },
                  ].map((item) => (
                    <div key={item.text} className="flex items-center gap-2 text-[12px] text-zinc-400">
                      <span className="text-zinc-300">{item.icon}</span>
                      {item.text}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
