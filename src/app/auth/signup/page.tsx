'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { config } from '@/lib/config'

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<'renter' | 'owner' | 'both'>('renter')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
  }

  return (
    <div className="flex min-h-[calc(100vh-60px)] bg-white">
      {/* Left panel */}
      <div className="flex flex-1 items-start justify-center px-5 py-12 sm:px-10 overflow-y-auto">
        <div className="w-full max-w-[400px]">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black">
              <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth="1.5">
                <circle cx="10" cy="10" r="7" />
                <path d="M10 6.5v4l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
                <path d="M7 2.5h6" strokeLinecap="round" />
              </svg>
            </div>
            <span className="text-[15px] font-bold tracking-tight text-black">{config.app.name}</span>
          </Link>

          <div className="mb-7">
            <h1 className="text-2xl font-bold tracking-tight text-black">Join the beta</h1>
            <p className="mt-1 text-sm text-zinc-500">Montreal watch community · By invitation</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Role */}
            <div>
              <p className="text-[13px] font-medium text-zinc-700 mb-2">I want to…</p>
              <div className="grid grid-cols-3 gap-2">
                {([
                  { value: 'renter', emoji: '🔍', label: 'Rent', desc: 'Borrow watches' },
                  { value: 'owner',  emoji: '📦', label: 'List',  desc: 'Earn from mine' },
                  { value: 'both',   emoji: '✨', label: 'Both',  desc: 'Rent & list' },
                ] as const).map((opt) => (
                  <button
                    key={opt.value}
                    type="button"
                    onClick={() => setRole(opt.value)}
                    className={`rounded-xl border-2 p-3 text-center text-xs transition-all ${
                      role === opt.value
                        ? 'border-black bg-black/5'
                        : 'border-zinc-200 hover:border-zinc-400'
                    }`}
                  >
                    <div className="text-lg mb-1">{opt.emoji}</div>
                    <div className="font-semibold text-black">{opt.label}</div>
                    <div className="text-zinc-400 mt-0.5">{opt.desc}</div>
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <Input label="First name" placeholder="Alex" required />
              <Input label="Last name" placeholder="Martin" required />
            </div>
            <Input label="Email" type="email" placeholder="you@example.com" required />
            <Input label="Phone (optional)" type="tel" placeholder="+1 (514) 555-0000" />
            <Input label="Password" type="password" placeholder="••••••••" required />

            <div className="flex items-start gap-2 pt-1">
              <input type="checkbox" id="terms" required className="mt-0.5 h-4 w-4 rounded border-zinc-300 accent-black" />
              <label htmlFor="terms" className="text-[12px] text-zinc-500 leading-relaxed">
                I agree to the{' '}
                <Link href="/legal/terms" className="text-black underline underline-offset-2">Terms</Link>
                {' '}and{' '}
                <Link href="/legal/privacy" className="text-black underline underline-offset-2">Privacy Policy</Link>.
              </label>
            </div>

            <Button type="submit" size="lg" className="w-full" loading={loading}>
              Create account
            </Button>
          </form>

          <p className="mt-5 text-center text-sm text-zinc-500">
            Already have an account?{' '}
            <Link href="/auth/login" className="font-semibold text-black underline underline-offset-2">
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right panel — decorative */}
      <div className="hidden lg:flex flex-1 bg-black items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
        <div className="absolute top-1/4 right-1/4 h-64 w-64 rounded-full border border-white/5" />
        <div className="absolute bottom-1/3 left-1/4 h-96 w-96 rounded-full border border-white/4" />
        <div className="relative z-10 text-center px-10">
          <p className="text-[11px] font-semibold tracking-widest uppercase text-amber-500 mb-4">Private Beta</p>
          <h2 className="text-3xl font-bold text-white leading-tight tracking-tight">
            Rent. Wear.<br />Return.
          </h2>
          <p className="mt-4 text-zinc-500 text-sm max-w-[220px] mx-auto leading-relaxed">
            Luxury watch rentals from collectors in Greater Montreal.
          </p>
        </div>
      </div>
    </div>
  )
}
