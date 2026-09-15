import Link from 'next/link'
import { config } from '@/lib/config'

export function Footer() {
  return (
    <footer className="border-t border-zinc-200 bg-white">
      <div className="mx-auto max-w-7xl px-5 py-14 sm:px-8 lg:px-10">
        <div className="grid grid-cols-2 gap-10 md:grid-cols-4">

          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-black">
                <svg viewBox="0 0 20 20" fill="none" className="h-4 w-4 text-white" stroke="currentColor" strokeWidth="1.5">
                  <circle cx="10" cy="10" r="7" />
                  <path d="M10 6.5v4l2.5 1.5" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M7 2.5h6" strokeLinecap="round" />
                </svg>
              </div>
              <span className="text-[15px] font-bold tracking-tight text-black">{config.app.name}</span>
            </Link>
            <p className="mt-4 text-sm text-zinc-500 leading-relaxed max-w-[200px]">
              {config.app.tagline}
            </p>
            <p className="mt-3 text-xs text-zinc-400">Greater Montreal · Private Beta</p>
          </div>

          {/* Platform */}
          <div>
            <p className="text-label text-zinc-400 mb-4">Platform</p>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link href="/watches" className="hover:text-black transition-colors">Browse Watches</Link></li>
              <li><Link href="/how-it-works" className="hover:text-black transition-colors">How It Works</Link></li>
              <li><Link href="/owner/watches/new" className="hover:text-black transition-colors">List Your Watch</Link></li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <p className="text-label text-zinc-400 mb-4">Trust</p>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link href="/trust" className="hover:text-black transition-colors">Security Deposit</Link></li>
              <li><Link href="/trust" className="hover:text-black transition-colors">Verification</Link></li>
              <li><Link href="/trust" className="hover:text-black transition-colors">Condition Reports</Link></li>
              <li><Link href="/trust" className="hover:text-black transition-colors">Disputes</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-label text-zinc-400 mb-4">Company</p>
            <ul className="space-y-3 text-sm text-zinc-500">
              <li><Link href="/about" className="hover:text-black transition-colors">About</Link></li>
              <li>
                <a href={`mailto:${config.app.supportEmail}`} className="hover:text-black transition-colors">
                  Contact
                </a>
              </li>
              <li><Link href="/legal/terms" className="hover:text-black transition-colors">Terms</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-black transition-colors">Privacy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-zinc-100 pt-8 sm:flex-row sm:items-center">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} {config.app.name}. All rights reserved.
          </p>
          <p className="text-xs text-zinc-400">
            {(config.platform.commissionRate * 100).toFixed(0)}% commission ·{' '}
            <span className="text-amber-600 font-medium">Private Beta</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
