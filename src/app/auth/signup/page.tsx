'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

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
          <Link href="/" className="inline-block mb-8">
            <div className="relative h-10 w-[120px] overflow-hidden">
              <Image
                src="/logo.png"
                alt="Wristly"
                fill
                className="object-contain object-left"
                style={{ mixBlendMode: 'multiply' }}
                priority
              />
            </div>
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
        <div className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full border border-white/4" />
        <div className="absolute bottom-1/3 left-1/4 h-[500px] w-[500px] rounded-full border border-white/3" />
        <div className="relative z-10 flex flex-col items-center px-10">
          <Image
            src="/logo.png"
            alt="Wristly"
            width={320}
            height={320}
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  )
}
