import Link from 'next/link'
import { ShieldCheck, MapPin, Clock, Users, Star, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { config } from '@/lib/config'

export default function HowItWorksPage() {
  return (
    <div className="min-h-screen bg-stone-50">
      {/* Header */}
      <div className="bg-white border-b border-stone-200">
        <div className="mx-auto max-w-4xl px-4 py-12 text-center sm:px-6">
          <h1 className="text-3xl font-bold text-stone-900 sm:text-4xl">How {config.app.name} works</h1>
          <p className="mt-4 text-stone-500 text-lg max-w-xl mx-auto">
            A peer-to-peer luxury watch rental platform designed for trust and simplicity.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6 space-y-16">
        {/* For renters */}
        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-8 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-700 text-white text-sm font-bold">R</span>
            For renters
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: 'Browse and choose', desc: 'Filter by brand, model, neighborhood, or price. Every listing shows real photos, condition, and pricing.' },
              { step: 2, title: 'Select dates & pay', desc: 'Choose 7, 14, or 30-day rental. Pay securely via Stripe. A deposit hold is authorized (not charged).' },
              { step: 3, title: 'Verify your identity', desc: 'Upload a government ID. Required once per account. Your data is securely stored.' },
              { step: 4, title: 'Meet for pickup', desc: 'Owner contacts you after confirmation. Meet at an agreed Montreal location. Document the watch condition together.' },
              { step: 5, title: 'Wear it', desc: 'Enjoy the watch during your rental period. Treat it as you would your own.' },
              { step: 6, title: 'Return & review', desc: 'Meet again for return. Both parties confirm condition. Deposit released. Leave a review.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 rounded-xl bg-white border border-stone-200 p-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-stone-900 text-white text-xs font-bold">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-stone-900 text-sm">{item.title}</p>
                  <p className="text-stone-500 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* For owners */}
        <section>
          <h2 className="text-xl font-bold text-stone-900 mb-8 flex items-center gap-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-stone-900 text-white text-sm font-bold">O</span>
            For watch owners
          </h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              { step: 1, title: 'List your watch', desc: 'Create a listing with photos, condition, and rental price. Set your own price (we suggest a range).' },
              { step: 2, title: 'We review it', desc: 'Our team reviews every listing within 24–48 hours before it goes live.' },
              { step: 3, title: 'Accept bookings', desc: 'Get notified when someone requests your watch. Review their profile and confirm.' },
              { step: 4, title: 'Meet for pickup', desc: 'Meet in your area to hand over the watch. Document condition together with the renter.' },
              { step: 5, title: 'Earn', desc: `You keep ${((1 - config.platform.commissionRate) * 100).toFixed(0)}% of the rental fee. Payout sent via Stripe 2 days after return.` },
              { step: 6, title: 'Get it back', desc: 'Meet for return. Check condition. If damaged, the security deposit covers repairs.' },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 rounded-xl bg-white border border-stone-200 p-5">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-amber-700 text-white text-xs font-bold">
                  {item.step}
                </div>
                <div>
                  <p className="font-semibold text-stone-900 text-sm">{item.title}</p>
                  <p className="text-stone-500 text-sm mt-1">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Trust */}
        <section className="rounded-2xl bg-stone-900 text-white p-8">
          <h2 className="text-xl font-bold mb-6">Trust & safety</h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {[
              { icon: <ShieldCheck size={16} />, title: 'Identity verification', desc: 'Every renter uploads a government-issued ID before their first rental.' },
              { icon: <MapPin size={16} />, title: 'Local only', desc: 'Greater Montreal only. No shipping. Owner and renter meet in person.' },
              { icon: <Clock size={16} />, title: 'Security deposit', desc: 'Authorization hold on renter\'s card protects owners. Never charged unless damage is confirmed.' },
              { icon: <Users size={16} />, title: 'Condition reports', desc: 'Photo + checklist at pickup and return. Timestamped. Protects both parties.' },
              { icon: <Star size={16} />, title: 'Mutual reviews', desc: 'Ratings after every rental build a trust score over time.' },
              { icon: <AlertTriangle size={16} />, title: 'Dispute resolution', desc: 'Admin team reviews condition reports and makes fair rulings.' },
            ].map((item) => (
              <div key={item.title} className="flex gap-3">
                <span className="text-amber-400 shrink-0 mt-0.5">{item.icon}</span>
                <div>
                  <p className="font-medium text-sm">{item.title}</p>
                  <p className="text-stone-400 text-xs mt-0.5">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Beta disclaimer */}
        <section className="rounded-2xl bg-amber-50 border border-amber-200 p-6">
          <div className="flex gap-3">
            <AlertTriangle size={18} className="text-amber-600 shrink-0 mt-0.5" />
            <div>
              <h3 className="font-semibold text-amber-900 text-sm">Private beta — important notice</h3>
              <p className="text-amber-800 text-sm mt-2 leading-relaxed">
                {config.app.name} is currently in private beta, limited to invited participants in the
                Greater Montreal area. Full insurance integration, automated identity verification, and
                legal compliance documentation are in progress. This platform does not currently guarantee
                coverage for loss or theft beyond the security deposit. Participate at your own discretion.
              </p>
            </div>
          </div>
        </section>

        <div className="text-center pb-8">
          <Button size="xl" variant="accent" asChild>
            <Link href="/watches">Start browsing →</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
