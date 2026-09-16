'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { createClient } from '@/lib/supabase/client'

function LoginForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError('')

    const supabase = createClient()
    const { error } = await supabase.auth.signInWithPassword({ email, password })

    if (error) {
      setError(error.message)
      setLoading(false)
      return
    }

    const redirectTo = searchParams.get('redirectTo') || '/dashboard/bookings'
    router.push(redirectTo)
    router.refresh()
  }

  return (
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

      {error && (
        <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex justify-end">
        <Link href="/auth/forgot-password" className="text-[12px] text-zinc-400 hover:text-black underline underline-offset-2">
          Forgot password?
        </Link>
      </div>
      <Button type="submit" size="lg" className="w-full" loading={loading}>
        Sign in
      </Button>
    </form>
  )
}

export default function LoginPage() {
  return (
    <div className="flex min-h-[calc(100vh-60px)] bg-white">
      {/* Left panel */}
      <div className="flex flex-1 items-center justify-center px-5 py-16 sm:px-10">
        <div className="w-full max-w-[360px]">
          <div className="mb-8">
            <Link href="/" className="inline-block mb-8">
              <span className="text-[20px] font-bold tracking-[0.12em] uppercase text-black">
                Wristly
              </span>
            </Link>
            <h1 className="text-2xl font-bold tracking-tight text-black">Welcome back</h1>
            <p className="mt-1 text-sm text-zinc-500">Sign in to your account</p>
          </div>

          <Suspense fallback={<div className="h-64 animate-pulse bg-zinc-50 rounded-xl" />}>
            <LoginForm />
          </Suspense>

          <p className="mt-6 text-center text-sm text-zinc-500">
            Don&apos;t have an account?{' '}
            <Link href="/auth/signup" className="font-semibold text-black hover:text-amber-700 underline underline-offset-2">
              Sign up
            </Link>
          </p>
        </div>
      </div>

      <div className="hidden lg:flex flex-1 bg-black items-center justify-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
        <div className="absolute top-1/4 right-1/4 h-80 w-80 rounded-full border border-white/4" />
        <div className="absolute bottom-1/3 left-1/4 h-[500px] w-[500px] rounded-full border border-white/3" />
        <div className="relative z-10 flex flex-col items-center justify-center w-full px-10">
          <Image
            src="/logo.png"
            alt="Wristly"
            width={280}
            height={280}
            className="object-contain drop-shadow-2xl"
          />
        </div>
      </div>
    </div>
  )
}
