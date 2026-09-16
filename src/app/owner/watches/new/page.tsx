'use client'

import { useState, useRef } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { ChevronRight, Upload, Info, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input, Textarea } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'
import { config, formatCAD, calculateDeposit, getSuggestedRentalPrice } from '@/lib/config'

export default function NewWatchPage() {
  const router = useRouter()
  const fileInputRef = useRef<HTMLInputElement>(null)

  // Form state
  const [brand, setBrand] = useState('')
  const [model, setModel] = useState('')
  const [referenceNumber, setReferenceNumber] = useState('')
  const [year, setYear] = useState('')
  const [condition, setCondition] = useState('')
  const [description, setDescription] = useState('')
  const [accessories, setAccessories] = useState('')
  const [estimatedValue, setEstimatedValue] = useState('')
  const [rentalPrice, setRentalPrice] = useState('')
  const [pickupArea, setPickupArea] = useState('')
  const [photos, setPhotos] = useState<File[]>([])
  const [photoPreviews, setPhotoPreviews] = useState<string[]>([])

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const valueNum = parseFloat(estimatedValue) || 0
  const suggestedPrice = getSuggestedRentalPrice(valueNum)
  const suggestedDeposit = valueNum > 0 ? calculateDeposit(valueNum) : 0

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const newPhotos = [...photos, ...files].slice(0, 8)
    setPhotos(newPhotos)
    const previews = newPhotos.map((f) => URL.createObjectURL(f))
    setPhotoPreviews(previews)
  }

  const removePhoto = (index: number) => {
    const newPhotos = photos.filter((_, i) => i !== index)
    const newPreviews = photoPreviews.filter((_, i) => i !== index)
    setPhotos(newPhotos)
    setPhotoPreviews(newPreviews)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (photos.length < 1) {
      setError('Please upload at least one photo.')
      return
    }
    setLoading(true)
    setError('')

    const supabase = createClient()

    // Get current user
    const { data: { user } } = await supabase.auth.getUser()
    if (!user) {
      router.push('/auth/login?redirectTo=/owner/watches/new')
      return
    }

    try {
      // Upload photos to Supabase Storage
      const photoUrls: string[] = []
      for (const photo of photos) {
        const ext = photo.name.split('.').pop()
        const path = `${user.id}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`
        const { error: uploadError } = await supabase.storage
          .from('watch-photos')
          .upload(path, photo, { contentType: photo.type })

        if (uploadError) throw uploadError

        const { data: { publicUrl } } = supabase.storage
          .from('watch-photos')
          .getPublicUrl(path)

        photoUrls.push(publicUrl)
      }

      // Save watch to database
      const depositAmount = calculateDeposit(valueNum)
      const { error: insertError } = await supabase.from('watches').insert({
        owner_id: user.id,
        brand,
        model,
        reference_number: referenceNumber || null,
        year: year ? parseInt(year) : null,
        condition,
        description,
        included_accessories: accessories
          ? accessories.split(',').map((a) => a.trim()).filter(Boolean)
          : [],
        estimated_value: valueNum,
        rental_price_30d: parseInt(rentalPrice),
        deposit_amount: depositAmount,
        pickup_area: pickupArea,
        city: 'Montreal',
        status: 'pending_review',
        photos: photoUrls,
      })

      if (insertError) throw insertError

      setSubmitted(true)
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <div className="min-h-screen bg-zinc-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full rounded-2xl bg-white border border-zinc-200 p-8 text-center">
          <div className="text-5xl mb-4">✓</div>
          <h2 className="text-2xl font-bold text-black">Watch submitted!</h2>
          <p className="mt-3 text-zinc-500 text-sm leading-relaxed">
            Your listing is now under review. We&apos;ll approve it within 24–48 hours and notify you when it goes live.
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
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-zinc-500">
            <Link href="/owner/watches" className="hover:text-black">My Watches</Link>
            <ChevronRight size={12} />
            <span className="text-black font-medium">Add a watch</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-black">List your watch</h1>
          <p className="mt-1 text-zinc-500 text-sm">
            Listings are reviewed before going live. Minimum watch value: {formatCAD(config.platform.minWatchValue)}.
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Watch details */}
          <section className="rounded-2xl bg-white border border-zinc-200 p-6">
            <h2 className="text-lg font-semibold text-black mb-5">Watch details</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-zinc-700 mb-1.5">Brand</label>
                <select
                  value={brand}
                  onChange={(e) => setBrand(e.target.value)}
                  required
                  className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
                >
                  <option value="">Select brand</option>
                  {config.watch.brands.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Model" placeholder="e.g. Submariner Date" value={model} onChange={(e) => setModel(e.target.value)} required />
                <Input label="Reference number" placeholder="e.g. 126610LN" value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <Input label="Year" type="number" placeholder="e.g. 2022" value={year} onChange={(e) => setYear(e.target.value)} min={1950} max={2026} />
                <div>
                  <label className="block text-sm font-medium text-zinc-700 mb-1.5">Condition</label>
                  <select
                    value={condition}
                    onChange={(e) => setCondition(e.target.value)}
                    required
                    className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
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
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <Input
                label="Included accessories (comma-separated)"
                placeholder="Original box, Papers, Extra links, NATO strap"
                value={accessories}
                onChange={(e) => setAccessories(e.target.value)}
              />
            </div>
          </section>

          {/* Pricing */}
          <section className="rounded-2xl bg-white border border-zinc-200 p-6">
            <h2 className="text-lg font-semibold text-black mb-5">Pricing</h2>
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
                value={rentalPrice}
                onChange={(e) => setRentalPrice(e.target.value)}
                required
              />

              {suggestedDeposit > 0 && (
                <div className="flex items-start gap-2 rounded-xl bg-zinc-50 p-4">
                  <Info size={14} className="text-zinc-500 shrink-0 mt-0.5" />
                  <p className="text-sm text-zinc-600">
                    Security deposit: <strong>{formatCAD(suggestedDeposit)}</strong> authorization hold — not charged unless damage occurs.
                  </p>
                </div>
              )}
            </div>
          </section>

          {/* Location */}
          <section className="rounded-2xl bg-white border border-zinc-200 p-6">
            <h2 className="text-lg font-semibold text-black mb-1">Pickup area</h2>
            <p className="text-sm text-zinc-500 mb-4">
              Only your neighborhood is shown publicly. Exact address shared after booking confirmation.
            </p>
            <select
              value={pickupArea}
              onChange={(e) => setPickupArea(e.target.value)}
              required
              className="h-10 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="">Select area</option>
              {config.locations.areas.map((a) => (
                <option key={a}>{a}</option>
              ))}
            </select>
          </section>

          {/* Photos */}
          <section className="rounded-2xl bg-white border border-zinc-200 p-6">
            <h2 className="text-lg font-semibold text-black mb-2">Photos</h2>
            <p className="text-sm text-zinc-500 mb-4">
              Upload clear photos of the dial, case, bracelet, and accessories. Max 8 photos.
            </p>

            {photoPreviews.length > 0 && (
              <div className="grid grid-cols-4 gap-2 mb-4">
                {photoPreviews.map((src, i) => (
                  <div key={i} className="relative aspect-square rounded-lg overflow-hidden border border-zinc-200">
                    <Image src={src} alt={`Photo ${i + 1}`} fill className="object-cover" />
                    <button
                      type="button"
                      onClick={() => removePhoto(i)}
                      className="absolute top-1 right-1 h-5 w-5 rounded-full bg-black/70 flex items-center justify-center text-white hover:bg-black"
                    >
                      <X size={10} />
                    </button>
                  </div>
                ))}
              </div>
            )}

            {photos.length < 8 && (
              <>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*"
                  multiple
                  className="hidden"
                  onChange={handlePhotoChange}
                />
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="border-2 border-dashed border-zinc-300 rounded-xl p-8 text-center hover:border-zinc-400 transition-colors cursor-pointer"
                >
                  <Upload size={24} className="mx-auto text-zinc-400 mb-2" />
                  <p className="font-medium text-zinc-700 text-sm">Click to upload photos</p>
                  <p className="text-xs text-zinc-400 mt-1">PNG, JPG up to 10MB · {photos.length}/8 uploaded</p>
                </div>
              </>
            )}
          </section>

          {error && (
            <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-4 py-3">
              {error}
            </p>
          )}

          <div className="rounded-xl bg-zinc-100 p-4 text-sm text-zinc-600 flex gap-2">
            <Info size={14} className="shrink-0 mt-0.5 text-zinc-500" />
            <span>
              Your listing will be reviewed within 24–48 hours. By submitting, you confirm you own the watch and agree to our{' '}
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
