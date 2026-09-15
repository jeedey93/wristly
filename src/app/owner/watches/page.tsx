import Link from 'next/link'
import { Plus, Edit, Eye, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SEED_WATCHES, SEED_BOOKINGS } from '@/lib/seed-data'
import { formatCAD, calculateOwnerPayout } from '@/lib/config'

const OWNER_ID = 'u1' // Demo: Marc D.'s watches

export default function OwnerWatchesPage() {
  const myWatches = SEED_WATCHES.filter((w) => w.ownerId === OWNER_ID)
  const myBookings = SEED_BOOKINGS.filter((b) => b.ownerId === OWNER_ID)
  const totalEarned = myBookings
    .filter((b) => b.status === 'completed')
    .reduce((sum, b) => sum + b.ownerPayout, 0)

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-white border-b border-stone-200">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-stone-900">My Watches</h1>
              <p className="mt-1 text-stone-500 text-sm">Manage your listings and earnings</p>
            </div>
            <Button asChild>
              <Link href="/owner/watches/new">
                <Plus size={16} className="mr-2" /> Add watch
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: 'Active listings', value: myWatches.filter((w) => w.status === 'active').length },
            { label: 'Currently rented', value: myWatches.filter((w) => w.status === 'rented').length },
            { label: 'Total earned', value: formatCAD(totalEarned) },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-white border border-stone-200 p-4">
              <p className="text-xl font-bold text-stone-900">{s.value}</p>
              <p className="text-xs text-stone-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Watches */}
        <div className="space-y-4">
          {myWatches.length === 0 ? (
            <div className="rounded-2xl bg-white border border-stone-200 p-12 text-center">
              <span className="text-5xl mb-4 block">📦</span>
              <h3 className="text-lg font-semibold text-stone-900">No watches listed yet</h3>
              <p className="mt-2 text-stone-500 text-sm">List your first watch and start earning.</p>
              <Button className="mt-4" asChild>
                <Link href="/owner/watches/new">Add your first watch</Link>
              </Button>
            </div>
          ) : (
            myWatches.map((watch) => {
              const monthlyEarning = calculateOwnerPayout(watch.rentalPrice30d)
              return (
                <div key={watch.id} className="rounded-2xl bg-white border border-stone-200 p-5">
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-start sm:justify-between">
                    <div className="flex gap-4 items-start">
                      <div className="h-14 w-14 rounded-xl bg-stone-100 flex items-center justify-center text-2xl shrink-0">
                        ⌚
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-stone-900">{watch.brand} {watch.model}</p>
                          <Badge variant={watch.status === 'active' ? 'success' : watch.status === 'rented' ? 'secondary' : 'warning'}>
                            {watch.status === 'active' ? 'Active' : watch.status === 'rented' ? 'Rented' : 'Pending'}
                          </Badge>
                          {watch.isAuthenticated && (
                            <Badge variant="auth">Verified</Badge>
                          )}
                        </div>
                        <p className="text-xs text-stone-500 mt-1">Ref: {watch.referenceNumber} · {watch.pickupArea}</p>
                        <p className="text-xs text-stone-500">Est. value: {formatCAD(watch.estimatedValue)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <p className="text-sm font-bold text-stone-900">{formatCAD(watch.rentalPrice30d)}<span className="font-normal text-stone-500">/30d</span></p>
                        <p className="text-xs text-emerald-600 flex items-center justify-end gap-1">
                          <TrendingUp size={10} />
                          You earn {formatCAD(monthlyEarning)}/mo
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/watches/${watch.id}`}><Eye size={13} /></Link>
                        </Button>
                        <Button variant="outline" size="sm" asChild>
                          <Link href={`/owner/watches/${watch.id}/edit`}><Edit size={13} /></Link>
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              )
            })
          )}
        </div>

        {/* Upcoming bookings */}
        {myBookings.length > 0 && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold text-stone-900 mb-4">Rental requests</h2>
            <div className="space-y-3">
              {myBookings.map((booking) => (
                <div key={booking.id} className="rounded-xl bg-white border border-stone-200 p-4 flex items-center justify-between">
                  <div>
                    <p className="text-sm font-semibold text-stone-900">
                      {booking.watch.brand} {booking.watch.model} — {booking.renterName}
                    </p>
                    <p className="text-xs text-stone-500">{booking.startDate} → {booking.endDate}</p>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-sm font-bold text-emerald-700">{formatCAD(booking.ownerPayout)}</p>
                    <Badge variant={booking.status === 'confirmed' ? 'success' : 'secondary'}>
                      {booking.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
