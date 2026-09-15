'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Watch, Eye, EyeOff } from 'lucide-react'
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
    // TODO: connect to Supabase Auth
    await new Promise((r) => setTimeout(r, 1000))
    setLoading(false)
  }

  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-stone-50 px-4">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 mb-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-stone-900">
              <Watch size={20} className="text-white" />
            </div>
            <span className="text-xl font-bold text-stone-900">{config.app.name}</span>
          </Link>
          <h1 className="text-2xl font-bold text-stone-900">Welcome back</h1>
          <p className="mt-1 text-stone-500 text-sm">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="rounded-2xl bg-white border border-stone-200 p-6 shadow-sm space-y-4">
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
              className="absolute right-3 top-8 text-stone-400 hover:text-stone-600"
            >
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
          <div className="flex justify-end">
            <Link href="/auth/forgot-password" className="text-xs text-stone-500 hover:text-stone-900 underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" size="lg" className="w-full" loading={loading}>
            Sign in
          </Button>
        </form>

        <p className="mt-4 text-center text-sm text-stone-500">
          Don't have an account?{' '}
          <Link href="/auth/signup" className="font-medium text-stone-900 hover:text-amber-700 underline">
            Sign up
          </Link>
        </p>
        <p className="mt-2 text-center text-xs text-stone-400">
          Private beta · Montreal only
        </p>
      </div>
    </div>
  )
}
