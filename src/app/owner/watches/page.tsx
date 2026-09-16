import { redirect } from 'next/navigation'
import Link from 'next/link'
import { Plus, Edit, Eye, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { createClient } from '@/lib/supabase/server'
import { formatCAD, calculateOwnerPayout } from '@/lib/config'

export default async function OwnerWatchesPage() {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) redirect('/auth/login?redirectTo=/owner/watches')

  const { data: watches } = await supabase
    .from('watches')
    .select('*')
    .eq('owner_id', user.id)
    .order('created_at', { ascending: false })

  const myWatches = watches ?? []
  const activeCount = myWatches.filter((w) => w.status === 'active').length
  const rentedCount = myWatches.filter((w) => w.status === 'rented').length

  return (
    <div className="min-h-screen bg-zinc-50">
      <div className="bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-5xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-black">My collection</h1>
              <p className="mt-1 text-zinc-500 text-sm">Manage your listings and earnings</p>
            </div>
            <Button asChild>
              <Link href="/owner/watches/new">
                <Plus size={16} /> Add watch
              </Link>
            </Button>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-8 sm:grid-cols-3">
          {[
            { label: 'Active listings', value: activeCount },
            { label: 'Currently rented', value: rentedCount },
            { label: 'Total watches', value: myWatches.length },
          ].map((s) => (
            <div key={s.label} className="rounded-xl bg-white border border-zinc-200 p-4">
              <p className="text-xl font-bold text-black">{s.value}</p>
              <p className="text-xs text-zinc-500 mt-1">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Watches */}
        <div className="space-y-4">
          {myWatches.length === 0 ? (
            <div className="rounded-2xl bg-white border border-zinc-200 p-12 text-center">
              <span className="text-5xl mb-4 block">📦</span>
              <h3 className="text-lg font-semibold text-black">No watches listed yet</h3>
              <p className="mt-2 text-zinc-500 text-sm">List your first watch and start earning.</p>
              <Button className="mt-4" asChild>
                <Link href="/owner/watches/new">Add your first watch</Link>
              </Button>
            </div>
          ) : (
            myWatches.map((watch) => {
              const monthlyEarning = calculateOwnerPayout(watch.rental_price_30d)
              return (
                <div key={watch.id} className="rounded-2xl bg-white border border-zinc-200 p-5">
                  <div className="flex flex-col sm:flex-row gap-4 sm:items-start sm:justify-between">
                    <div className="flex gap-4 items-start">
                      <div className="h-14 w-14 rounded-xl bg-zinc-100 flex items-center justify-center text-2xl shrink-0">
                        ⌚
                      </div>
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <p className="font-semibold text-black">{watch.brand} {watch.model}</p>
                          <Badge variant={
                            watch.status === 'active' ? 'success' :
                            watch.status === 'rented' ? 'secondary' : 'warning'
                          }>
                            {watch.status === 'active' ? 'Active' :
                             watch.status === 'rented' ? 'Rented' :
                             watch.status === 'pending_review' ? 'Under review' : watch.status}
                          </Badge>
                          {watch.is_authenticated && (
                            <Badge variant="auth">Verified</Badge>
                          )}
                        </div>
                        {watch.reference_number && (
                          <p className="text-xs text-zinc-500 mt-1">Ref: {watch.reference_number} · {watch.pickup_area}</p>
                        )}
                        <p className="text-xs text-zinc-500">Est. value: {formatCAD(watch.estimated_value)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 shrink-0">
                      <div className="text-right">
                        <p className="text-sm font-bold text-black">
                          {formatCAD(watch.rental_price_30d)}<span className="font-normal text-zinc-500">/30d</span>
                        </p>
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
      </div>
    </div>
  )
}
