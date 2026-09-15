'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Watch } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { config } from '@/lib/config'

export default function SignupPage() {
  const [loading, setLoading] = useState(false)
  const [role, setRole] = useState<'renter' | 'owner' | 'both'>('renter')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    // TODO: connect to Supabase Auth
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-stone-50 px-4 py-12">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900">
              <Watch size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-stone-900">{config.app.name}</span>
          </Link>
          <h1 className="text-2xl font-bold text-stone-900">Join the beta</h1>
          <p className="mt-1 text-stone-500 text-sm">Montreal watch community · By invitation</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-stone-200 p-6 shadow-sm space-y-4">
          {/* Role selection */}
          <div>
            <label className="block text-sm font-medium text-stone-700 mb-2">I want to…</label>
            <div className="grid grid-cols-3 gap-2">
              {([
                { value: 'renter', label: '🔍 Rent', desc: 'Borrow watches' },
                { value: 'owner', label: '📦 List', desc: 'Rent out mine' },
                { value: 'both', label: '✨ Both', desc: 'Rent & list' },
              ] as const).map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => setRole(opt.value)}
                  className={`rounded-xl border-2 p-3 text-center text-xs transition-colors ${
                    role === opt.value
                      ? 'border-stone-900 bg-stone-50 font-semibold'
                      : 'border-stone-200 hover:border-stone-400'
                  }`}
                >
                  <div className="text-base mb-1">{opt.label.split(' ')[0]}</div>
                  <div className="font-medium text-stone-800">{opt.label.split(' ')[1]}</div>
                  <div className="text-stone-500 mt-0.5">{opt.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <Input label="First name" placeholder="Alex" required />
            <Input label="Last name" placeholder="Martin" required />
          </div>
          <Input label="Email" type="email" placeholder="you@example.com" required />
          <Input label="Phone" type="tel" placeholder="+1 (514) 555-0000" />
          <Input label="Password" type="password" placeholder="••••••••" required />

          <div className="flex items-start gap-2">
            <input type="checkbox" id="terms" required className="mt-0.5 h-4 w-4 rounded border-stone-300" />
            <label htmlFor="terms" className="text-xs text-stone-600 leading-relaxed">
              I agree to the{' '}
              <Link href="/legal/terms" className="underline text-stone-900">Terms of Service</Link>
              {' '}and{' '}
              <Link href="/legal/privacy" className="underline text-stone-900">Privacy Policy</Link>.
            </label>
          </div>

          <Button type="submit" size="lg" className="w-full" loading={loading}>
            Create account
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-stone-500">
          Already have an account?{' '}
          <Link href="/auth/login" className="font-medium text-stone-900 hover:text-amber-700 underline">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  )
}
