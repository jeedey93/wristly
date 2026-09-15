'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ChevronRight, Upload, Info } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { config, formatCAD, calculateDeposit, getSuggestedRentalPrice } from '@/lib/config'

export default function NewWatchPage() {
  const [brand, setBrand] = useState('')
  const [estimatedValue, setEstimatedValue] = useState('')
  const [loading, setLoading] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const valueNum = parseFloat(estimatedValue) || 0
  const suggestedPrice = getSuggestedRentalPrice(valueNum)
  const suggestedDeposit = valueNum > 0 ? calculateDeposit(valueNum) : 0

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: save to Supabase
    await new Promise((r) => setTimeout(r, 1200))
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-stone-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl bg-white border border-stone-200 p-8 text-center">
          <span className="text-5xl mb-4 block">🎉</span>
          <h2 className="text-2xl font-bold text-stone-900">Watch submitted!</h2>
          <p className="mt-3 text-stone-500 text-sm">
            Your listing is now under review. We'll approve it within 24–48 hours and notify you when it goes live.
          </p>
          <div className="mt-6 flex flex-col gap-3">
            <Button asChild><Link href="/owner/watches">Back to my watches</Link></Button>
            <Button variant="outline" asChild><Link href="/watches">Browse marketplace</Link></Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-200">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-stone-500">
            <Link href="/owner/watches" className="hover:text-stone-900">My Watches</Link>
            <ChevronRight size={12} />
            <span className="text-stone-900 font-medium">Add a watch</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-stone-900">List your watch</h1>
          <p className="mt-1 text-stone-500 text-sm">
            All listings are reviewed by our team before going live. Minimum watch value: {formatCAD(config.platform.minWatchValue)}.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Watch details */}
          <section className="rounded-2xl bg-white border border-stone-200 p-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-5">Watch details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-stone-700 mb-1.5">Brand</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                  className="h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                >
                  <option value="">Select brand</option>
                  {config.watch.brands.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Model" placeholder="e.g. Submariner Date" required />
                <Input label="Reference number" placeholder="e.g. 126610LN" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Year" type="number" placeholder="e.g. 2022" min={1950} max={2026} />
                <div>
                  <label className="block text-sm font-medium text-stone-700 mb-1.5">Condition</label>
                  <select
                    required
                    className="h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
                  >
                    <option value="">Select condition</option>
                    {config.watch.conditions.map((c) => (
                      <option key={c}>{c}</option>
                    ))}
                  </select>
                </div>
              </div>
              <Textarea
                label="Description"
                rows={4}
                placeholder="Describe the watch, its history, what makes it special, and what's included."
                required
              />
              <Input
                label="Included accessories (comma-separated)"
                placeholder="Original box, Papers, Extra links, NATO strap"
              />
            </div>
          </section>

          {/* Pricing */}
          <section className="rounded-2xl bg-white border border-stone-200 p-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-5">Pricing</h2>
            <div className="space-y-4">
              <div>
                <Input
                  label="Estimated market value (CAD)"
                  type="number"
                  placeholder="e.g. 9800"
                  value={estimatedValue}
                  onChange={(e) => setEstimatedValue(e.target.value)}
                  required
                  min={config.platform.minWatchValue}
                />
                {valueNum > 0 && valueNum < config.platform.minWatchValue && (
                  <p className="text-xs text-red-600 mt-1">
                    Minimum watch value is {formatCAD(config.platform.minWatchValue)}.
                  </p>
                )}
              </div>

              {suggestedPrice && (
                <div className="rounded-xl bg-amber-50 border border-amber-200 p-4">
                  <div className="flex items-start gap-2">
                    <Info size={14} className="text-amber-600 shrink-0 mt-0.5" />
                    <div>
                      <p className="text-sm font-medium text-amber-800">Suggested rental price</p>
                      <p className="text-sm text-amber-700 mt-0.5">
                        {formatCAD(suggestedPrice.min)} – {formatCAD(suggestedPrice.max)} / 30 days
                      </p>
                      <p className="text-xs text-amber-600 mt-1">
                        You receive {formatCAD(Math.round(suggestedPrice.min * (1 - config.platform.commissionRate)))}–
                        {formatCAD(Math.round(suggestedPrice.max * (1 - config.platform.commissionRate)))} after platform fee.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <Input
                label="Your rental price / 30 days (CAD)"
                type="number"
                placeholder={suggestedPrice ? `Suggested: ${suggestedPrice.min}–${suggestedPrice.max}` : 'e.g. 225'}
                required
              />

              {suggestedDeposit > 0 && (
                <div className="flex items-start gap-2 rounded-xl bg-stone-50 p-4">
                  <Info size={14} className="text-stone-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-stone-600">
                    Recommended deposit: <strong>{formatCAD(suggestedDeposit)}</strong>.
                    This is an authorization hold — not charged unless damage occurs.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Location */}
          <section className="rounded-2xl bg-white border border-stone-200 p-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-1">Pickup area</h2>
            <p className="text-sm text-stone-500 mb-4">
              Only your general neighborhood is shown publicly. Exact location shared after booking confirmation.
            </p>
            <select
              required
              className="h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
            >
              <option value="">Select area</option>
              {config.locations.areas.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </section>

          {/* Photos */}
          <section className="rounded-2xl bg-white border border-stone-200 p-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-2">Photos</h2>
            <p className="text-sm text-stone-500 mb-4">
              Upload at least 3 clear photos. Dial, case, bracelet, and any accessories.
            </p>
            <div className="border-2 border-dashed border-stone-300 rounded-xl p-8 text-center hover:border-stone-400 transition-colors cursor-pointer">
              <Upload size={28} className="mx-auto text-stone-400 mb-3" />
              <p className="font-medium text-stone-700 text-sm">Click to upload photos</p>
              <p className="text-xs text-stone-400 mt-1">PNG, JPG up to 10MB each · Min 3 photos required</p>
              <Badge variant="secondary" className="mt-3">Supabase Storage — connect in production</Badge>
            </div>
          </section>

          {/* Rental rules */}
          <section className="rounded-2xl bg-white border border-stone-200 p-6">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">Rental rules (optional)</h2>
            <Textarea
              rows={3}
              placeholder="Any specific rules for renters? e.g. No water activities, must have prior rental history, etc."
            />
          </section>

          <div className="rounded-xl bg-stone-100 p-4 text-sm text-stone-600 flex gap-2">
            <Info size={14} className="shrink-0 mt-0.5 text-stone-500" />
            <span>
              Your listing will be reviewed within 24–48 hours. We may contact you to verify the watch.
              By submitting, you confirm you own the watch and agree to our{' '}
              <Link href="/legal/terms" className="underline">owner terms</Link>.
            </span>
          </div>

          <div className="flex gap-3 pb-8">
            <Button variant="outline" size="lg" className="flex-1" asChild>
              <Link href="/owner/watches">Cancel</Link>
            </Button>
            <Button type="submit" size="lg" className="flex-1" loading={loading}>
              Submit for review
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
