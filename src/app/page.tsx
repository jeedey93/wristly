import Link from 'next/link'
import { ArrowRight, ShieldCheck, MapPin, Clock, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WatchCard } from '@/components/watches/watch-card'
import { Badge } from '@/components/ui/badge'
import { SEED_WATCHES } from '@/lib/seed-data'
import { config, formatCAD } from '@/lib/config'

export default function HomePage() {
  const featuredWatches = SEED_WATCHES.filter((w) => w.status === 'active').slice(0, 3)

  return (
    <>
      {/* ── HERO ── */}
      <section className="gradient-hero relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-amber-400 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-amber-600 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8 lg:py-40">
          <div className="mx-auto max-w-3xl text-center">
            <Badge variant="auth" className="mb-6 text-xs px-3 py-1">
              Private Beta · Greater Montreal
            </Badge>
            <h1 className="text-display text-white">
              Rent a luxury watch<br />
              <span className="text-amber-400">from someone near you.</span>
            </h1>
            <p className="mt-6 text-lg text-stone-300 max-w-xl mx-auto leading-relaxed">
              Experience a Rolex, Omega, or Cartier before you buy — or simply wear something
              extraordinary for the occasion. Local pickup. No shipping.
            </p>
            <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
              <Button size="xl" variant="accent" asChild>
                <Link href="/watches">
                  Browse watches <ArrowRight size={18} className="ml-2" />
                </Link>
              </Button>
              <Button size="xl" variant="outline" className="border-stone-600 text-white hover:bg-stone-800 hover:text-white" asChild>
                <Link href="/owner/watches/new">List your watch</Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-stone-500">
              {config.app.tagline}
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-heading text-stone-900">How it works</h2>
            <p className="mt-3 text-stone-500">Three steps. Local. Simple.</p>
          </div>
          <div className="mt-16 grid gap-12 md:grid-cols-3">
            {[
              {
                icon: '🔍',
                step: '01',
                title: 'Discover',
                desc: 'Browse luxury watches available near you in Montreal. Filter by brand, price, or neighborhood.',
              },
              {
                icon: '📅',
                step: '02',
                title: 'Book & Pay',
                desc: 'Select your rental dates, complete identity verification, and pay securely. A deposit hold protects the owner.',
              },
              {
                icon: '⌚',
                step: '03',
                title: 'Wear & Return',
                desc: 'Meet locally for pickup. Document the watch condition together. Wear it. Return it. Deposit released.',
              },
            ].map((item) => (
              <div key={item.step} className="flex flex-col items-center text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-stone-900 text-3xl mb-5">
                  {item.icon}
                </div>
                <span className="text-xs font-bold tracking-widest text-amber-600 uppercase mb-2">
                  Step {item.step}
                </span>
                <h3 className="text-lg font-semibold text-stone-900 mb-3">{item.title}</h3>
                <p className="text-stone-500 leading-relaxed text-sm max-w-xs">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FEATURED WATCHES ── */}
      <section className="bg-stone-50 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-end justify-between mb-10">
            <div>
              <h2 className="text-heading text-stone-900">Available now</h2>
              <p className="mt-2 text-stone-500">Exceptional timepieces in Greater Montreal</p>
            </div>
            <Button variant="outline" asChild>
              <Link href="/watches">
                View all <ArrowRight size={14} className="ml-2" />
              </Link>
            </Button>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {featuredWatches.map((watch) => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ── */}
      <section className="bg-white py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <Badge variant="secondary" className="mb-4">Trust & Safety</Badge>
              <h2 className="text-heading text-stone-900">
                Designed to protect<br />everyone involved.
              </h2>
              <p className="mt-4 text-stone-500 leading-relaxed">
                Renting a watch worth thousands of dollars requires real trust infrastructure.
                We've designed {config.app.name} to protect both owners and renters at every step.
              </p>
              <ul className="mt-8 space-y-4">
                {[
                  { icon: <ShieldCheck size={18} className="text-amber-600" />, title: 'Identity verification', desc: 'Every renter provides a government-issued ID before their first rental.' },
                  { icon: <Star size={18} className="text-amber-600" />, title: 'Security deposit hold', desc: `A ${formatCAD(500)}–${formatCAD(2000)} deposit authorization protects owners without charging renters upfront.` },
                  { icon: <MapPin size={18} className="text-amber-600" />, title: 'Condition documentation', desc: 'Photo-based condition reports at pickup and return protect both parties from disputes.' },
                  { icon: <Clock size={18} className="text-amber-600" />, title: 'Review system', desc: 'Mutual ratings build a trust score that grows with every completed rental.' },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-amber-50">
                      {item.icon}
                    </div>
                    <div>
                      <p className="font-medium text-stone-900 text-sm">{item.title}</p>
                      <p className="text-stone-500 text-sm mt-0.5">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-stone-900 p-8 text-white">
              <p className="text-xs font-bold tracking-widest text-amber-400 uppercase mb-4">Sample Economics</p>
              <h3 className="text-2xl font-bold mb-6">Omega Speedmaster</h3>
              <div className="space-y-3">
                {[
                  { label: 'Watch value', value: formatCAD(7200) },
                  { label: '30-day rental', value: formatCAD(195) },
                  { label: 'Deposit hold (authorization)', value: formatCAD(720) },
                  { label: `Platform fee (${config.platform.commissionRate * 100}%)`, value: formatCAD(39) },
                  { label: 'Owner receives', value: formatCAD(156), highlight: true },
                ].map((row) => (
                  <div key={row.label} className={`flex justify-between text-sm py-2 border-b border-stone-700 last:border-0 ${row.highlight ? 'font-bold text-amber-400' : ''}`}>
                    <span className={row.highlight ? '' : 'text-stone-400'}>{row.label}</span>
                    <span>{row.value}</span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-xs text-stone-500">
                Deposit is an authorization hold — only captured if damage occurs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR OWNERS ── */}
      <section className="bg-stone-900 py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-heading text-white">
            Your watch is sitting in a safe.
          </h2>
          <p className="mt-4 text-stone-400 max-w-xl mx-auto leading-relaxed">
            Most collectors wear less than 20% of their watches. List yours and earn monthly income
            from a watch that would otherwise gather dust.
          </p>
          <div className="mt-10 grid gap-6 sm:grid-cols-3 max-w-3xl mx-auto">
            {[
              { stat: '2.5–4%', label: 'monthly yield on watch value' },
              { stat: '72h', label: 'average time to first booking' },
              { stat: '20%', label: 'platform commission — you keep 80%' },
            ].map((item) => (
              <div key={item.stat} className="rounded-xl bg-stone-800 p-6 text-center">
                <p className="text-3xl font-bold text-amber-400">{item.stat}</p>
                <p className="mt-2 text-sm text-stone-400">{item.label}</p>
              </div>
            ))}
          </div>
          <Button size="xl" variant="accent" className="mt-10" asChild>
            <Link href="/owner/watches/new">
              List your watch for free <ArrowRight size={18} className="ml-2" />
            </Link>
          </Button>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-amber-700 py-16">
        <div className="mx-auto max-w-3xl px-4 text-center">
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Ready to experience your first luxury rental?
          </h2>
          <p className="mt-3 text-amber-100">
            Join the private beta. Montreal watch community only.
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="lg" className="bg-white text-amber-800 hover:bg-amber-50" asChild>
              <Link href="/auth/signup">Join the beta</Link>
            </Button>
            <Button size="lg" variant="outline" className="border-amber-400 text-white hover:bg-amber-800" asChild>
              <Link href="/watches">Browse watches first</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
