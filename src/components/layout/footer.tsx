import Link from 'next/link'
import { Watch } from 'lucide-react'
import { config } from '@/lib/config'

export function Footer() {
  return (
    <footer className="border-t border-stone-200 bg-white">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900">
                <Watch size={16} className="text-white" />
              </div>
              <span className="text-lg font-bold tracking-tight text-stone-900">
                {config.app.name}
              </span>
            </Link>
            <p className="mt-3 text-sm text-stone-500 leading-relaxed">
              {config.app.tagline}
            </p>
            <p className="mt-2 text-xs text-stone-400">
              Greater Montreal Area • Private Beta
            </p>
          </div>

          {/* Platform */}
          <div>
            <h4 className="text-sm font-semibold text-stone-900">Platform</h4>
            <ul className="mt-4 space-y-3 text-sm text-stone-500">
              <li><Link href="/watches" className="hover:text-stone-900 transition-colors">Browse Watches</Link></li>
              <li><Link href="/how-it-works" className="hover:text-stone-900 transition-colors">How It Works</Link></li>
              <li><Link href="/owner/watches/new" className="hover:text-stone-900 transition-colors">List Your Watch</Link></li>
              <li><Link href="/pricing" className="hover:text-stone-900 transition-colors">Pricing</Link></li>
            </ul>
          </div>

          {/* Trust */}
          <div>
            <h4 className="text-sm font-semibold text-stone-900">Trust & Safety</h4>
            <ul className="mt-4 space-y-3 text-sm text-stone-500">
              <li><Link href="/trust" className="hover:text-stone-900 transition-colors">Security Deposit</Link></li>
              <li><Link href="/trust" className="hover:text-stone-900 transition-colors">Identity Verification</Link></li>
              <li><Link href="/trust" className="hover:text-stone-900 transition-colors">Condition Reports</Link></li>
              <li><Link href="/trust" className="hover:text-stone-900 transition-colors">Dispute Resolution</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="text-sm font-semibold text-stone-900">Company</h4>
            <ul className="mt-4 space-y-3 text-sm text-stone-500">
              <li><Link href="/about" className="hover:text-stone-900 transition-colors">About</Link></li>
              <li>
                <a href={`mailto:${config.app.supportEmail}`} className="hover:text-stone-900 transition-colors">
                  Contact
                </a>
              </li>
              <li><Link href="/legal/terms" className="hover:text-stone-900 transition-colors">Terms of Service</Link></li>
              <li><Link href="/legal/privacy" className="hover:text-stone-900 transition-colors">Privacy Policy</Link></li>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-stone-100 pt-8 text-xs text-stone-400 sm:flex-row">
          <p>© {new Date().getFullYear()} {config.app.name}. All rights reserved. Montreal, QC.</p>
          <p className="text-center">
            Platform commission: {(config.platform.commissionRate * 100).toFixed(0)}% •{' '}
            <span className="text-amber-600 font-medium">Private Beta</span>
          </p>
        </div>
      </div>
    </footer>
  )
}
