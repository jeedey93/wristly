'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

const navLinks = [
  { href: '/watches', label: 'Browse' },
  { href: '/how-it-works', label: 'How It Works' },
  { href: '/owner/watches/new', label: 'List a Watch' },
]

export function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-zinc-200 bg-white/95 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
        <div className="flex h-[60px] items-center justify-between">

          {/* Logo — black pill so the PNG looks intentional on white */}
          <Link href="/" className="flex items-center group">
            <div className="flex h-9 items-center rounded-lg bg-black px-3 overflow-hidden">
              <Image
                src="/logo.png"
                alt="Wristly"
                width={88}
                height={28}
                className="object-contain"
                style={{ objectPosition: 'center' }}
                priority
              />
            </div>
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
            <Button variant="ghost" size="sm" asChild>
              <Link href="/auth/login">Sign in</Link>
            </Button>
            <Button size="sm" asChild>
              <Link href="/auth/signup">Get started</Link>
            </Button>
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
              <Button variant="outline" size="md" asChild>
                <Link href="/auth/login" onClick={() => setOpen(false)}>Sign in</Link>
              </Button>
              <Button size="md" asChild>
                <Link href="/auth/signup" onClick={() => setOpen(false)}>Get started</Link>
              </Button>
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
