'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import Link from 'next/link'
import { ChevronRight, Check, Upload, Lock } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SEED_WATCHES } from '@/lib/seed-data'
import { config, formatCAD, calculatePlatformFee, calculateOwnerPayout } from '@/lib/config'

const STEPS = ['Dates', 'Review', 'Identity', 'Payment', 'Confirm']

function StepIndicator({ current }: { current: number }) {
  return (
    <div className="flex items-center justify-center gap-2 mb-8">
      {STEPS.map((label, i) => (
        <div key={label} className="flex items-center">
          <div className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold transition-colors ${
            i < current
              ? 'bg-stone-900 text-white'
              : i === current
              ? 'bg-amber-600 text-white'
              : 'bg-stone-200 text-stone-500'
          }`}>
            {i < current ? <Check size={14} /> : i + 1}
          </div>
          {i < STEPS.length - 1 && (
            <div className={`h-0.5 w-8 mx-1 ${i < current ? 'bg-stone-900' : 'bg-stone-200'}`} />
          )}
        </div>
      ))}
    </div>
  )
}

export default function BookingPage() {
  const params = useParams()
  const router = useRouter()
  const watchId = params.watchId as string
  const watch = SEED_WATCHES.find((w) => w.id === watchId)

  const [step, setStep] = useState(0)
  const [duration, setDuration] = useState<7 | 14 | 30>(30)
  const [startDate, setStartDate] = useState('')
  const [idUploaded, setIdUploaded] = useState(false)
  const [agreed, setAgreed] = useState(false)
  const [loading, setLoading] = useState(false)

  if (!watch) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-bold text-stone-900">Watch not found</h2>
          <Button className="mt-4" asChild>
            <Link href="/watches">Back to watches</Link>
          </Button>
        </div>
      </div>
    )
  }

  const rentalPrice =
    duration === 30
      ? watch.rentalPrice30d
      : duration === 14
      ? Math.round(watch.rentalPrice30d * 0.6)
      : Math.round(watch.rentalPrice30d * 0.35)

  const platformFee = calculatePlatformFee(rentalPrice)
  const totalCharge = rentalPrice

  const endDate = startDate
    ? new Date(new Date(startDate).getTime() + duration * 24 * 60 * 60 * 1000)
        .toISOString()
        .split('T')[0]
    : ''

  const handleNext = () => {
    if (step < STEPS.length - 1) setStep((s) => s + 1)
  }

  const handleConfirm = async () => {
    setLoading(true)
    // DEMO: simulate booking confirmation — replace with real Stripe + Supabase calls
    await new Promise((r) => setTimeout(r, 1500))
    setStep(4)
    setLoading(false)
  }

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-stone-200">
        <div className="mx-auto max-w-3xl px-4 py-3">
          <nav className="flex items-center gap-1.5 text-xs text-stone-500">
            <Link href="/watches" className="hover:text-stone-900">Watches</Link>
            <ChevronRight size={12} />
            <Link href={`/watches/${watch.id}`} className="hover:text-stone-900">{watch.brand} {watch.model}</Link>
            <ChevronRight size={12} />
            <span className="text-stone-900 font-medium">Book</span>
          </nav>
        </div>
      </div>

      <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <StepIndicator current={step} />

        {/* Step 0 — Select dates */}
        {step === 0 && (
          <div className="rounded-2xl bg-white border border-stone-200 p-8">
            <h2 className="text-xl font-bold text-stone-900 mb-6">Select your rental duration</h2>
            <div className="grid grid-cols-3 gap-3 mb-6">
              {config.platform.rentalDurations.map((d) => {
                const price =
                  d === 30
                    ? watch.rentalPrice30d
                    : d === 14
                    ? Math.round(watch.rentalPrice30d * 0.6)
                    : Math.round(watch.rentalPrice30d * 0.35)
                return (
                  <button
                    key={d}
                    onClick={() => setDuration(d as 7 | 14 | 30)}
                    className={`rounded-xl border-2 p-4 text-center transition-colors ${
                      duration === d
                        ? 'border-stone-900 bg-stone-50'
                        : 'border-stone-200 hover:border-stone-400'
                    }`}
                  >
                    <p className="text-xl font-bold text-stone-900">{d}</p>
                    <p className="text-xs text-stone-500">days</p>
                    <p className="mt-2 text-sm font-semibold text-amber-700">{formatCAD(price)}</p>
                  </button>
                )
              })}
            </div>
            <div>
              <label className="block text-sm font-medium text-stone-700 mb-1.5">Start date</label>
              <input
                type="date"
                value={startDate}
                min={new Date().toISOString().split('T')[0]}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-10 w-full rounded-lg border border-stone-300 px-3 text-sm focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
              {startDate && endDate && (
                <p className="mt-2 text-sm text-stone-500">
                  Rental period: <strong>{startDate}</strong> → <strong>{endDate}</strong> ({duration} days)
                </p>
              )}
            </div>
            <Button
              size="lg"
              className="w-full mt-6"
              disabled={!startDate}
              onClick={handleNext}
            >
              Continue
            </Button>
          </div>
        )}

        {/* Step 1 — Review pricing */}
        {step === 1 && (
          <div className="rounded-2xl bg-white border border-stone-200 p-8">
            <h2 className="text-xl font-bold text-stone-900 mb-6">Review your rental</h2>
            <div className="rounded-xl bg-stone-50 p-5 space-y-3 mb-6">
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">{watch.brand} {watch.model}</span>
                <span className="font-medium">{formatCAD(rentalPrice)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Rental duration</span>
                <span className="font-medium">{duration} days ({startDate} → {endDate})</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-stone-600">Platform fee (included)</span>
                <span className="font-medium text-stone-500">{formatCAD(platformFee)}</span>
              </div>
              <div className="border-t border-stone-200 pt-3 flex justify-between font-bold">
                <span>Total charged today</span>
                <span className="text-amber-700">{formatCAD(totalCharge)}</span>
              </div>
              <div className="flex justify-between text-sm text-stone-500">
                <span>Security deposit (hold — not charged)</span>
                <span>{formatCAD(watch.depositAmount)}</span>
              </div>
            </div>
            <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-sm text-amber-800 mb-6">
              The security deposit of <strong>{formatCAD(watch.depositAmount)}</strong> is an authorization
              hold on your card. It will NOT be charged unless damage is reported at return.
            </div>
            <div className="flex gap-3">
              <Button variant="outline" onClick={() => setStep(0)} className="flex-1">Back</Button>
              <Button onClick={handleNext} className="flex-1">Looks good →</Button>
            </div>
          </div>
        )}

        {/* Step 2 — Identity */}
        {step === 2 && (
          <div className="rounded-2xl bg-white border border-stone-200 p-8">
            <h2 className="text-xl font-bold text-stone-900 mb-2">Identity verification</h2>
            <p className="text-stone-500 text-sm mb-6">
              Required before your first rental. Upload a government-issued photo ID (passport, driver's license).
              Your ID is securely stored and only accessed in case of a dispute.
            </p>
            <div
              className={`border-2 border-dashed rounded-xl p-8 text-center transition-colors ${
                idUploaded ? 'border-emerald-400 bg-emerald-50' : 'border-stone-300 hover:border-stone-400 cursor-pointer'
              }`}
              onClick={() => setIdUploaded(true)}
            >
              {idUploaded ? (
                <div>
                  <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-full bg-emerald-100">
                    <Check size={24} className="text-emerald-600" />
                  </div>
                  <p className="mt-3 font-medium text-emerald-700">ID uploaded successfully</p>
                  <p className="text-sm text-emerald-600 mt-1">We'll verify it within 24 hours</p>
                </div>
              ) : (
                <div>
                  <Upload size={32} className="mx-auto text-stone-400 mb-3" />
                  <p className="font-medium text-stone-700">Click to upload your ID</p>
                  <p className="text-sm text-stone-400 mt-1">Passport, driver's license, or government ID</p>
                  <Badge variant="secondary" className="mt-3">Demo: click to simulate upload</Badge>
                </div>
              )}
            </div>
            <div className="mt-4 flex items-start gap-2">
              <input
                type="checkbox"
                id="agree"
                checked={agreed}
                onChange={(e) => setAgreed(e.target.checked)}
                className="mt-0.5 h-4 w-4 rounded border-stone-300"
              />
              <label htmlFor="agree" className="text-sm text-stone-600 leading-relaxed">
                I agree to the{' '}
                <Link href="/legal/terms" className="underline text-stone-900 hover:text-amber-700">
                  Rental Terms
                </Link>
                . I understand that I am responsible for the watch during the rental period and that my security
                deposit may be captured in case of damage or non-return.
              </label>
            </div>
            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep(1)} className="flex-1">Back</Button>
              <Button
                onClick={handleNext}
                disabled={!idUploaded || !agreed}
                className="flex-1"
              >
                Continue to payment →
              </Button>
            </div>
          </div>
        )}

        {/* Step 3 — Payment */}
        {step === 3 && (
          <div className="rounded-2xl bg-white border border-stone-200 p-8">
            <h2 className="text-xl font-bold text-stone-900 mb-2">Secure payment</h2>
            <p className="text-stone-500 text-sm mb-6">Payments are processed by Stripe. Your card details are never stored on our servers.</p>

            {/* Demo Stripe form */}
            <div className="rounded-xl border border-stone-200 p-5 bg-stone-50 space-y-4">
              <div className="flex items-center gap-2 mb-2">
                <Lock size={14} className="text-stone-400" />
                <span className="text-xs text-stone-500 font-medium">Secure payment · Powered by Stripe</span>
                <Badge variant="warning">Demo mode</Badge>
              </div>
              <div>
                <label className="block text-xs font-medium text-stone-500 mb-1">Card number</label>
                <input
                  className="h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm font-mono text-stone-400 focus:outline-none"
                  value="4242 4242 4242 4242"
                  readOnly
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">Expiry</label>
                  <input
                    className="h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm font-mono text-stone-400 focus:outline-none"
                    value="12/28"
                    readOnly
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-stone-500 mb-1">CVV</label>
                  <input
                    className="h-10 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm font-mono text-stone-400 focus:outline-none"
                    value="***"
                    readOnly
                  />
                </div>
              </div>
            </div>

            <div className="mt-4 rounded-xl bg-stone-50 p-4 space-y-2">
              <div className="flex justify-between text-sm font-bold">
                <span>Charged today</span>
                <span className="text-amber-700">{formatCAD(totalCharge)}</span>
              </div>
              <div className="flex justify-between text-xs text-stone-500">
                <span>Security deposit hold</span>
                <span>{formatCAD(watch.depositAmount)}</span>
              </div>
            </div>

            <div className="flex gap-3 mt-6">
              <Button variant="outline" onClick={() => setStep(2)} className="flex-1">Back</Button>
              <Button onClick={handleConfirm} loading={loading} variant="accent" className="flex-1">
                Confirm & Pay {formatCAD(totalCharge)}
              </Button>
            </div>
          </div>
        )}

        {/* Step 4 — Confirmation */}
        {step === 4 && (
          <div className="rounded-2xl bg-white border border-stone-200 p-8 text-center">
            <div className="flex h-16 w-16 mx-auto items-center justify-center rounded-full bg-emerald-100 mb-4">
              <Check size={32} className="text-emerald-600" />
            </div>
            <h2 className="text-2xl font-bold text-stone-900">Booking confirmed!</h2>
            <p className="mt-3 text-stone-500 max-w-sm mx-auto">
              Your rental of the <strong>{watch.brand} {watch.model}</strong> has been confirmed.
              The owner will contact you within 24 hours to arrange pickup.
            </p>
            <div className="mt-6 rounded-xl bg-stone-50 p-5 text-left space-y-2 max-w-xs mx-auto">
              <p className="text-sm"><strong>Watch:</strong> {watch.brand} {watch.model}</p>
              <p className="text-sm"><strong>Duration:</strong> {duration} days</p>
              <p className="text-sm"><strong>Start:</strong> {startDate}</p>
              <p className="text-sm"><strong>Pickup area:</strong> {watch.pickupArea}</p>
              <p className="text-sm"><strong>Amount paid:</strong> {formatCAD(totalCharge)}</p>
            </div>
            <div className="mt-6 flex flex-col gap-3 max-w-xs mx-auto">
              <Button asChild>
                <Link href="/dashboard/bookings">View my bookings</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/watches">Browse more watches</Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
