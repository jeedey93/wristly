import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, ShieldCheck, MapPin, Clock, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { WatchCard } from '@/components/watches/watch-card'
import { SEED_WATCHES } from '@/lib/seed-data'
import { config, formatCAD } from '@/lib/config'

export default function HomePage() {
  const featuredWatches = SEED_WATCHES.filter((w) => w.status === 'active').slice(0, 3)

  return (
    <>
      {/* ── HERO ──────────────────────────────────────────── */}
      <section className="gradient-hero relative min-h-[88vh] flex items-center overflow-hidden">
        <div className="relative z-20 mx-auto max-w-7xl w-full px-5 py-24 sm:px-8 lg:px-10 lg:py-32">
          <div className="max-w-2xl">

            {/* Logo — full mark, prominent in hero */}
            <div className="mb-10">
              <Image
                src="/logo.png"
                alt="Wristly — Rent Luxury Watches"
                width={220}
                height={220}
                className="object-contain"
                priority
              />
            </div>

            {/* Eyebrow */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-3.5 py-1.5 mb-8 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 rounded-full bg-amber-400 animate-pulse" />
              <span className="text-[11px] font-semibold tracking-widest uppercase text-white/70">
                Private Beta · Montreal
              </span>
            </div>

            <h1 className="text-display text-white">
              Wear a<br />
              <span className="text-amber-400">luxury watch</span><br />
              for a month.
            </h1>

            <p className="mt-7 text-lg text-white/55 max-w-md leading-relaxed">
              Peer-to-peer luxury watch rentals from collectors near you.
              No shipping. Local pickup only.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Button size="xl" variant="accent" asChild>
                <Link href="/watches">
                  Browse watches
                  <ArrowRight size={16} />
                </Link>
              </Button>
              <Button
                size="xl"
                variant="outline"
                className="border-white/20 text-white bg-transparent hover:bg-white/8 hover:border-white/40"
                asChild
              >
                <Link href="/owner/watches/new">List your watch</Link>
              </Button>
            </div>

            {/* Trust row */}
            <div className="mt-12 flex flex-wrap items-center gap-6 text-[12px] text-white/40">
              {[
                'Identity verified renters',
                'Security deposit hold',
                'Condition reports',
              ].map((item) => (
                <span key={item} className="flex items-center gap-1.5">
                  <span className="h-1 w-1 rounded-full bg-amber-500/60" />
                  {item}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Decorative right-side texture */}
        <div className="absolute right-0 top-0 bottom-0 w-1/2 hidden lg:block pointer-events-none z-10">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-transparent" />
          <div className="absolute top-1/4 right-16 h-64 w-64 rounded-full border border-white/5" />
          <div className="absolute top-1/3 right-28 h-96 w-96 rounded-full border border-white/4" />
          <div className="absolute bottom-1/4 right-8 h-48 w-48 rounded-full border border-white/5" />
        </div>
      </section>

      {/* ── BRANDS STRIP ─────────────────────────────────── */}
      <div className="border-y border-zinc-200 bg-white py-4">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-hide">
            <span className="text-[11px] text-zinc-400 uppercase tracking-widest font-semibold shrink-0 mr-4">
              Available brands
            </span>
            {['Rolex', 'Omega', 'Tudor', 'Cartier', 'Breitling', 'IWC', 'Grand Seiko', 'Panerai', 'TAG Heuer'].map((brand) => (
              <Link
                key={brand}
                href={`/watches?brand=${brand}`}
                className="shrink-0 rounded-full border border-zinc-200 bg-zinc-50 px-3.5 py-1.5 text-[12px] font-medium text-zinc-600 hover:border-black hover:text-black hover:bg-white transition-all"
              >
                {brand}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* ── FEATURED WATCHES ─────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="flex items-end justify-between mb-12">
            <div>
              <span className="line-accent mb-3" />
              <h2 className="text-heading text-black">Available now</h2>
              <p className="mt-2 text-zinc-500 text-[15px]">
                Exceptional timepieces in Greater Montreal
              </p>
            </div>
            <Button variant="outline" size="md" asChild className="hidden sm:inline-flex">
              <Link href="/watches">
                View all <ArrowRight size={13} />
              </Link>
            </Button>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {featuredWatches.map((watch) => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
          <div className="mt-8 sm:hidden">
            <Button variant="outline" size="md" className="w-full" asChild>
              <Link href="/watches">View all watches</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ─────────────────────────────────── */}
      <section className="bg-zinc-50 border-y border-zinc-200 py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="max-w-xl mb-16">
            <span className="line-accent mb-3" />
            <h2 className="text-heading text-black">How it works</h2>
            <p className="mt-3 text-zinc-500 text-[15px] leading-relaxed">
              Three steps. Local. No shipping ever.
            </p>
          </div>
          <div className="grid gap-0 md:grid-cols-3 md:divide-x md:divide-zinc-200">
            {[
              {
                num: '01',
                title: 'Discover',
                desc: 'Browse luxury watches listed by collectors near you. Filter by brand, price, or Montreal neighborhood.',
                href: '/watches',
                cta: 'Browse watches',
              },
              {
                num: '02',
                title: 'Book & Pay',
                desc: 'Select your dates, verify your identity once, and pay securely. A deposit authorization protects the owner.',
                href: '/auth/signup',
                cta: 'Get started',
              },
              {
                num: '03',
                title: 'Wear & Return',
                desc: 'Meet locally for pickup. Document the watch together. Wear it. Return it. Deposit released.',
                href: '/how-it-works',
                cta: 'Learn more',
              },
            ].map((item, i) => (
              <div
                key={item.num}
                className={`px-8 py-10 first:pl-0 last:pr-0 ${i > 0 ? 'md:pl-10' : ''} ${i < 2 ? 'md:pr-10' : ''}`}
              >
                <p className="text-[11px] font-bold tracking-widest text-amber-600 uppercase mb-5">
                  {item.num}
                </p>
                <h3 className="text-xl font-semibold text-black mb-3">{item.title}</h3>
                <p className="text-zinc-500 text-sm leading-relaxed mb-6">{item.desc}</p>
                <Link
                  href={item.href}
                  className="text-[13px] font-semibold text-black inline-flex items-center gap-1.5 hover:gap-2.5 transition-all"
                >
                  {item.cta} <ArrowRight size={13} />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── TRUST ────────────────────────────────────────── */}
      <section className="bg-white py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-20 lg:items-start">
            <div>
              <span className="line-accent mb-3" />
              <h2 className="text-heading text-black">
                Built for trust<br />on both sides.
              </h2>
              <p className="mt-4 text-zinc-500 text-[15px] leading-relaxed max-w-sm">
                Handing a $7,000 watch to a stranger requires real infrastructure.
                We've designed {config.app.name} to protect owners and renters at every step.
              </p>
              <ul className="mt-10 space-y-6">
                {[
                  {
                    icon: <ShieldCheck size={16} className="text-amber-600" />,
                    title: 'Identity verification',
                    desc: 'Every renter provides a government-issued ID before their first rental.',
                  },
                  {
                    icon: <Star size={16} className="text-amber-600" />,
                    title: 'Security deposit hold',
                    desc: `${formatCAD(500)}–${formatCAD(2000)} authorization on the renter's card. Not charged unless damage occurs.`,
                  },
                  {
                    icon: <MapPin size={16} className="text-amber-600" />,
                    title: 'Condition documentation',
                    desc: 'Photo + checklist at pickup and return. Timestamped. Protects both parties.',
                  },
                  {
                    icon: <Clock size={16} className="text-amber-600" />,
                    title: 'Mutual review system',
                    desc: 'After every rental, both parties rate each other. Trust scores build over time.',
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-4">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-amber-50 border border-amber-100">
                      {item.icon}
                    </div>
                    <div>
                      <p className="text-[14px] font-semibold text-black">{item.title}</p>
                      <p className="text-[13px] text-zinc-500 mt-0.5 leading-relaxed">{item.desc}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Economics card */}
            <div className="rounded-2xl bg-black p-8 lg:p-10">
              <p className="text-label text-amber-500 mb-2">Sample economics</p>
              <h3 className="text-2xl font-bold text-white mb-1">Omega Speedmaster</h3>
              <p className="text-zinc-500 text-sm mb-8">30-day rental · Montreal</p>
              <div className="space-y-0 divide-y divide-zinc-800">
                {[
                  { label: 'Watch value', value: formatCAD(7200), muted: true },
                  { label: '30-day rental price', value: formatCAD(195), muted: true },
                  { label: 'Deposit hold (auth only)', value: formatCAD(720), muted: true },
                  { label: `Platform fee (${config.platform.commissionRate * 100}%)`, value: formatCAD(39), muted: true },
                  { label: 'Owner receives', value: formatCAD(156), muted: false },
                ].map((row) => (
                  <div
                    key={row.label}
                    className={`flex justify-between py-3.5 text-sm ${
                      !row.muted ? 'font-bold' : ''
                    }`}
                  >
                    <span className={row.muted ? 'text-zinc-500' : 'text-white'}>
                      {row.label}
                    </span>
                    <span className={row.muted ? 'text-zinc-400' : 'text-amber-400'}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-[11px] text-zinc-600 leading-relaxed">
                Deposit is an authorization — never charged unless damage is confirmed at return.
              </p>
              <Button size="lg" variant="accent" className="w-full mt-6" asChild>
                <Link href="/owner/watches/new">
                  List your watch <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOR OWNERS ───────────────────────────────────── */}
      <section className="bg-black py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <span className="block w-10 h-0.5 bg-amber-600 mb-6" />
              <h2 className="text-heading text-white">
                Your watch<br />is sitting in a safe.
              </h2>
              <p className="mt-5 text-zinc-400 text-[15px] leading-relaxed max-w-sm">
                Most collectors wear less than 20% of their watches.
                List yours on {config.app.name} and earn monthly income from it.
              </p>
              <Button size="lg" variant="accent" className="mt-8" asChild>
                <Link href="/owner/watches/new">
                  List your watch for free <ArrowRight size={14} />
                </Link>
              </Button>
            </div>

            <div className="grid grid-cols-3 gap-4">
              {[
                { stat: '80%', label: 'You keep after\nplatform fee' },
                { stat: '2–4×', label: 'Monthly yield\nvs. bank savings' },
                { stat: '48h', label: 'Avg. time to\nfirst booking' },
              ].map((item) => (
                <div key={item.stat} className="rounded-xl bg-zinc-900 border border-zinc-800 p-5 text-center">
                  <p className="stat-number text-amber-400">{item.stat}</p>
                  <p className="mt-2 text-[11px] text-zinc-500 leading-snug whitespace-pre-line">{item.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────── */}
      <section className="bg-white border-t border-zinc-200 py-20">
        <div className="mx-auto max-w-3xl px-5 text-center sm:px-8">
          <h2 className="text-heading text-black">
            Ready to experience<br />your first luxury rental?
          </h2>
          <p className="mt-4 text-zinc-500 text-[15px]">
            Private beta · Greater Montreal · Invitation only
          </p>
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
            <Button size="xl" asChild>
              <Link href="/auth/signup">Join the beta</Link>
            </Button>
            <Button size="xl" variant="outline" asChild>
              <Link href="/watches">Browse watches first</Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  )
}
