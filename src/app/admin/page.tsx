import Link from 'next/link'
import { Users, Watch, BookOpen, AlertTriangle, TrendingUp, DollarSign, ShieldCheck, Clock } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { SEED_WATCHES, SEED_BOOKINGS } from '@/lib/seed-data'
import { formatCAD, config } from '@/lib/config'

const MOCK_USERS = [
  { id: 'u1', name: 'Marc D.', email: 'marc@example.com', role: 'owner', status: 'active', verified: true, joined: '2026-09-01' },
  { id: 'u2', name: 'Sophie L.', email: 'sophie@example.com', role: 'both', status: 'active', verified: true, joined: '2026-09-03' },
  { id: 'u3', name: 'Alex B.', email: 'alex@example.com', role: 'owner', status: 'active', verified: false, joined: '2026-09-08' },
  { id: 'u4', name: 'Jean-F. T.', email: 'jft@example.com', role: 'owner', status: 'active', verified: true, joined: '2026-09-10' },
  { id: 'u5', name: 'Thomas M.', email: 'thomas@example.com', role: 'renter', status: 'active', verified: true, joined: '2026-09-12' },
]

export default function AdminDashboardPage() {
  const totalRevenue = SEED_BOOKINGS.reduce((s, b) => s + b.platformFee, 0)
  const activeRentals = SEED_BOOKINGS.filter((b) => b.status === 'confirmed' || b.status === 'picked_up').length
  const activeWatches = SEED_WATCHES.filter((w) => w.status === 'active').length
  const pendingVerification = MOCK_USERS.filter((u) => !u.verified).length

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="bg-stone-900 text-white">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant="auth">Admin</Badge>
                <span className="text-stone-400 text-xs">Private Beta</span>
              </div>
              <h1 className="text-2xl font-bold">Platform Dashboard</h1>
            </div>
            <p className="text-stone-400 text-sm">{config.app.name} · Montreal Beta</p>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {/* KPI row */}
        <div className="grid gap-4 grid-cols-2 lg:grid-cols-4 mb-8">
          {[
            { icon: <DollarSign size={20} className="text-emerald-600" />, label: 'Platform revenue', value: formatCAD(totalRevenue), sub: 'All time' },
            { icon: <BookOpen size={20} className="text-blue-600" />, label: 'Active rentals', value: activeRentals, sub: 'Ongoing' },
            { icon: <Watch size={20} className="text-amber-600" />, label: 'Listed watches', value: activeWatches, sub: 'Available' },
            { icon: <Users size={20} className="text-purple-600" />, label: 'Users', value: MOCK_USERS.length, sub: `${pendingVerification} pending ID` },
          ].map((kpi) => (
            <div key={kpi.label} className="rounded-xl bg-white border border-stone-200 p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-stone-50">
                  {kpi.icon}
                </div>
              </div>
              <p className="text-2xl font-bold text-stone-900">{kpi.value}</p>
              <p className="text-xs text-stone-500 mt-0.5">{kpi.label}</p>
              <p className="text-xs text-stone-400">{kpi.sub}</p>
            </div>
          ))}
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Users */}
          <section className="rounded-2xl bg-white border border-stone-200">
            <div className="flex items-center justify-between p-5 border-b border-stone-100">
              <h2 className="font-semibold text-stone-900 flex items-center gap-2">
                <Users size={16} /> Users
              </h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/users">View all</Link>
              </Button>
            </div>
            <div className="divide-y divide-stone-100">
              {MOCK_USERS.map((user) => (
                <div key={user.id} className="flex items-center justify-between p-4">
                  <div className="flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-stone-200 flex items-center justify-center text-xs font-bold text-stone-600">
                      {user.name[0]}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-stone-900">{user.name}</p>
                      <p className="text-xs text-stone-400">{user.email} · {user.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {user.verified ? (
                      <Badge variant="success"><ShieldCheck size={10} className="mr-1" />Verified</Badge>
                    ) : (
                      <Badge variant="warning"><Clock size={10} className="mr-1" />Pending ID</Badge>
                    )}
                    <Badge variant={user.status === 'active' ? 'outline' : 'destructive'}>
                      {user.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Watches */}
          <section className="rounded-2xl bg-white border border-stone-200">
            <div className="flex items-center justify-between p-5 border-b border-stone-100">
              <h2 className="font-semibold text-stone-900 flex items-center gap-2">
                <Watch size={16} /> Watch Listings
              </h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/watches">View all</Link>
              </Button>
            </div>
            <div className="divide-y divide-stone-100">
              {SEED_WATCHES.map((watch) => (
                <div key={watch.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium text-stone-900">{watch.brand} {watch.model}</p>
                    <p className="text-xs text-stone-400">
                      {formatCAD(watch.estimatedValue)} · {watch.pickupArea} · {watch.ownerName}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    {watch.isAuthenticated && (
                      <Badge variant="auth"><ShieldCheck size={10} className="mr-1" />Auth</Badge>
                    )}
                    <Badge variant={
                      watch.status === 'active' ? 'success' :
                      watch.status === 'rented' ? 'secondary' :
                      'warning'
                    }>
                      {watch.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Bookings */}
          <section className="rounded-2xl bg-white border border-stone-200">
            <div className="flex items-center justify-between p-5 border-b border-stone-100">
              <h2 className="font-semibold text-stone-900 flex items-center gap-2">
                <BookOpen size={16} /> Bookings
              </h2>
              <Button variant="outline" size="sm" asChild>
                <Link href="/admin/bookings">View all</Link>
              </Button>
            </div>
            <div className="divide-y divide-stone-100">
              {SEED_BOOKINGS.map((booking) => (
                <div key={booking.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-stone-900">
                        {booking.watch.brand} {booking.watch.model}
                      </p>
                      <p className="text-xs text-stone-400">
                        {booking.renterName} → {booking.ownerName} · {booking.startDate} – {booking.endDate}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-bold text-stone-900">{formatCAD(booking.rentalPrice)}</p>
                      <p className="text-xs text-emerald-600">+{formatCAD(booking.platformFee)} fee</p>
                    </div>
                  </div>
                  <div className="mt-2 flex items-center justify-between">
                    <Badge variant={
                      booking.status === 'confirmed' ? 'success' :
                      booking.status === 'completed' ? 'outline' :
                      'secondary'
                    }>
                      {booking.status}
                    </Badge>
                    <p className="text-xs text-stone-400">
                      Deposit: {formatCAD(booking.depositAmount)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Revenue */}
          <section className="rounded-2xl bg-white border border-stone-200">
            <div className="p-5 border-b border-stone-100">
              <h2 className="font-semibold text-stone-900 flex items-center gap-2">
                <TrendingUp size={16} /> Revenue Summary
              </h2>
            </div>
            <div className="p-5 space-y-4">
              <div className="rounded-xl bg-stone-900 p-5 text-white">
                <p className="text-xs text-stone-400 uppercase tracking-wide mb-3">Platform metrics (demo data)</p>
                {[
                  { label: 'Total rental volume', value: formatCAD(SEED_BOOKINGS.reduce((s, b) => s + b.rentalPrice, 0)) },
                  { label: `Commission (${config.platform.commissionRate * 100}%)`, value: formatCAD(totalRevenue) },
                  { label: 'Owner payouts', value: formatCAD(SEED_BOOKINGS.reduce((s, b) => s + b.ownerPayout, 0)) },
                  { label: 'Deposits on hold', value: formatCAD(SEED_BOOKINGS.filter(b => b.status === 'confirmed').reduce((s, b) => s + b.depositAmount, 0)) },
                ].map((row) => (
                  <div key={row.label} className="flex justify-between text-sm py-2 border-b border-stone-700 last:border-0">
                    <span className="text-stone-400">{row.label}</span>
                    <span className="font-semibold text-amber-400">{row.value}</span>
                  </div>
                ))}
              </div>
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 flex gap-2">
                <AlertTriangle size={14} className="text-amber-600 shrink-0 mt-0.5" />
                <p className="text-xs text-amber-700">
                  Private beta. Data shown is seeded demo data. Connect Supabase + Stripe for real metrics.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}
