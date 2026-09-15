'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { config } from '@/lib/config'

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
  }

  return (
    <div className="flex min-h-[calc(100vh-60px)] bg-white">
      {/* Left panel */}
      <div className="flex flex-1 items-center justify-center px-5 py-16 sm:px-10">
        <div className="w-full max-w-[360px]">
          <div className="mb-8">
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
            <h1 className="text-2xl font-bold tracking-tight text-black">Welcome back</h1>
            <p className="mt-1 text-sm text-zinc-500">Sign in to your account</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? 'text' : 'password'}
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword((v) => !v)}
                className="absolute right-3 top-8 text-zinc-400 hover:text-black transition-colors"
              >
                {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
              </button>
            </div>
            <div className="flex justify-end">
              <Link href="/auth/forgot-password" className="text-[12px] text-zinc-400 hover:text-black underline underline-offset-2">
                Forgot password?
              </Link>
            </div>
            <Button type="submit" size="lg" className="w-full" loading={loading}>
              Sign in
            </Button>
          </form>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Don't have an account?{' '}
            <Link href="/auth/signup" className="font-semibold text-black hover:text-amber-700 underline underline-offset-2">
              Sign up
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
