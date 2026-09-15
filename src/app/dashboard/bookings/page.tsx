import Link from 'next/link'
import { Clock, CheckCircle, Package, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SEED_BOOKINGS } from '@/lib/seed-data'
import { formatCAD } from '@/lib/config'

const STATUS_INFO: Record<string, { label: string; variant: 'success' | 'warning' | 'secondary' | 'outline' }> = {
  requested: { label: 'Pending', variant: 'warning' },
  confirmed: { label: 'Confirmed', variant: 'success' },
  picked_up: { label: 'Active', variant: 'success' },
  returned: { label: 'Returned', variant: 'secondary' },
  completed: { label: 'Completed', variant: 'outline' },
  cancelled: { label: 'Cancelled', variant: 'outline' },
  disputed: { label: 'Disputed', variant: 'warning' },
}

export default function DashboardBookingsPage() {
  const bookings = SEED_BOOKINGS

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-200">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-stone-900">My Rentals</h1>
          <p className="mt-1 text-stone-500 text-sm">Track your active and past rentals</p>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats row */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { icon: <Clock size={20} className="text-amber-600" />, label: 'Active', value: bookings.filter(b => b.status === 'confirmed' || b.status === 'picked_up').length },
            { icon: <CheckCircle size={20} className="text-emerald-600" />, label: 'Completed', value: bookings.filter(b => b.status === 'completed').length },
            { icon: <Package size={20} className="text-stone-500" />, label: 'Total', value: bookings.length },
          ].map((stat) => (
            <div key={stat.label} className="rounded-xl bg-white border border-stone-200 p-4 flex items-center gap-3">
              {stat.icon}
              <div>
                <p className="text-xl font-bold text-stone-900">{stat.value}</p>
                <p className="text-xs text-stone-500">{stat.label}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Bookings list */}
        <div className="space-y-4">
          {bookings.length === 0 ? (
            <div className="rounded-2xl bg-white border border-stone-200 p-12 text-center">
              <span className="text-5xl mb-4 block">⌚</span>
              <h3 className="text-lg font-semibold text-stone-900">No rentals yet</h3>
              <p className="mt-2 text-stone-500 text-sm">Browse available watches to start your first rental.</p>
              <Button className="mt-4" asChild>
                <Link href="/watches">Browse watches</Link>
              </Button>
            </div>
          ) : (
            bookings.map((booking) => {
              const statusInfo = STATUS_INFO[booking.status] ?? { label: booking.status, variant: 'secondary' as const }
              return (
                <div key={booking.id} className="rounded-2xl bg-white border border-stone-200 p-5 flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
                  <div className="flex gap-4 items-start">
                    <div className="h-14 w-14 rounded-xl bg-stone-100 flex items-center justify-center text-2xl shrink-0">
                      ⌚
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-stone-900 text-sm">
                          {booking.watch.brand} {booking.watch.model}
                        </p>
                        <Badge variant={statusInfo.variant}>{statusInfo.label}</Badge>
                      </div>
                      <p className="text-xs text-stone-500 mt-1">
                        {booking.startDate} → {booking.endDate} ({booking.rentalDays} days)
                      </p>
                      <p className="text-xs text-stone-500">
                        Owner: {booking.ownerName} · {booking.watch.pickupArea}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 shrink-0">
                    <div className="text-right">
                      <p className="text-sm font-bold text-stone-900">{formatCAD(booking.rentalPrice)}</p>
                      <p className="text-xs text-stone-500">Deposit: {formatCAD(booking.depositAmount)}</p>
                    </div>
                    <Button variant="outline" size="sm" asChild>
                      <Link href={`/dashboard/bookings/${booking.id}`}>
                        View <ArrowRight size={12} className="ml-1" />
                      </Link>
                    </Button>
                  </div>
                </div>
              )
            })
          )}
        </div>

        <div className="mt-8 rounded-2xl bg-stone-900 p-6 flex items-center justify-between">
          <div>
            <p className="font-semibold text-white">Ready to rent another watch?</p>
            <p className="text-stone-400 text-sm mt-1">New listings added regularly</p>
          </div>
          <Button variant="accent" asChild>
            <Link href="/watches">Browse →</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
