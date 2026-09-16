'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Menu, X, User, LogOut } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { createClient } from '@/lib/supabase/client'
import type { User as SupabaseUser } from '@supabase/supabase-js'

const navLinks = [
  { href: '/watches', label: 'Browse' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/owner/watches/new', label: 'List a Watch' },
]

export function Navbar() {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [user, setUser] = useState<SupabaseUser | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const supabase = createClient()

    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user)
      setLoading(false)
    })

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  const handleSignOut = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/')
    router.refresh()
  }

  const firstName = user?.user_metadata?.first_name as string | undefined

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex h-[60px] items-center justify-between">

          {/* Wordmark */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-[18px] font-bold tracking-[0.12em] uppercase text-black">
              Wristly
            </span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-[13px] font-medium text-zinc-500 transition-colors hover:text-black"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop auth */}
          <div className="hidden items-center gap-2.5 md:flex">
            {!loading && (
              user ? (
                <>
                  <Link
                    href="/owner/watches"
                    className="text-[13px] font-medium text-zinc-500 hover:text-black transition-colors"
                  >
                    My collection
                  </Link>
                  <Link
                    href={`/profile/${user.id}`}
                    className="flex items-center gap-1.5 text-[13px] font-medium text-zinc-500 hover:text-black transition-colors"
                  >
                    <User size={14} />
                    {firstName ?? 'Account'}
                  </Link>
                  <Button variant="ghost" size="sm" onClick={handleSignOut}>
                    <LogOut size={13} />
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="ghost" size="sm" asChild>
                    <Link href="/auth/login">Sign in</Link>
                  </Button>
                  <Button size="sm" asChild>
                    <Link href="/auth/signup">Get started</Link>
                  </Button>
                </>
              )
            )}
          </div>

          {/* Mobile toggle */}
          <button
            className="flex items-center justify-center rounded-lg p-2 text-zinc-500 hover:bg-zinc-100 md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="border-t border-zinc-100 bg-white px-5 py-4 md:hidden">
          <nav className="flex flex-col gap-0.5">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-3 py-2.5 text-sm font-medium text-zinc-700 hover:bg-zinc-50 hover:text-black"
                onClick={() => setOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-3 flex flex-col gap-2 border-t border-zinc-100 pt-3">
              {user ? (
                <>
                  <Button variant="outline" size="md" asChild>
                    <Link href="/owner/watches" onClick={() => setOpen(false)}>
                      My collection
                    </Link>
                  </Button>
                  <Button variant="outline" size="md" asChild>
                    <Link href={`/profile/${user.id}`} onClick={() => setOpen(false)}>
                      My account
                    </Link>
                  </Button>
                  <Button size="md" onClick={() => { handleSignOut(); setOpen(false) }}>
                    Sign out
                  </Button>
                </>
              ) : (
                <>
                  <Button variant="outline" size="md" asChild>
                    <Link href="/auth/login" onClick={() => setOpen(false)}>Sign in</Link>
                  </Button>
                  <Button size="md" asChild>
                    <Link href="/auth/signup" onClick={() => setOpen(false)}>Get started</Link>
                  </Button>
                </>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
