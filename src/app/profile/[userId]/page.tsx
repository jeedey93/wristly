import { notFound } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { MapPin, ShieldCheck, Star, Calendar, Package } from 'lucide-react'
import { createClient } from '@/lib/supabase/server'
import { formatCAD } from '@/lib/config'
import { Button } from '@/components/ui/button'

interface Props {
  params: Promise<{ userId: string }>
}

export default async function ProfilePage({ params }: Props) {
  const { userId } = await params
  const supabase = await createClient()

  // Fetch profile + watches in parallel
  const [{ data: profile }, { data: watches }] = await Promise.all([
    supabase
      .from('profiles')
      .select('*')
      .eq('id', userId)
      .single(),
    supabase
      .from('watches')
      .select('*')
      .eq('owner_id', userId)
      .eq('status', 'active')
      .order('created_at', { ascending: false }),
  ])

  if (!profile) notFound()

  const memberSince = new Date(profile.created_at).toLocaleDateString('en-CA', {
    year: 'numeric',
    month: 'long',
  })

  return (
    <div className="min-h-screen bg-zinc-50">
      {/* Profile header */}
      <div className="bg-white border-b border-zinc-200">
        <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:gap-8">

            {/* Avatar */}
            <div className="shrink-0">
              {profile.avatar_url ? (
                <Image
                  src={profile.avatar_url}
                  alt={`${profile.first_name} ${profile.last_name}`}
                  width={88}
                  height={88}
                  className="rounded-full object-cover border border-zinc-200"
                />
              ) : (
                <div className="h-[88px] w-[88px] rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center text-3xl font-bold text-zinc-400">
                  {profile.first_name?.[0]?.toUpperCase() ?? '?'}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <h1 className="text-2xl font-bold text-black">
                  {profile.first_name} {profile.last_name?.[0]}.
                </h1>
                {profile.id_verified && (
                  <span className="inline-flex items-center gap-1 rounded-full bg-black px-2.5 py-0.5 text-[11px] font-medium text-white">
                    <ShieldCheck size={10} />
                    Verified
                  </span>
                )}
              </div>

              {/* Stats row */}
              <div className="flex flex-wrap items-center gap-4 mt-2 text-sm text-zinc-500">
                {profile.rating && (
                  <span className="flex items-center gap-1">
                    <Star size={13} className="text-amber-500 fill-amber-500" />
                    <span className="font-semibold text-black">{Number(profile.rating).toFixed(1)}</span>
                    <span>({profile.review_count} review{profile.review_count !== 1 ? 's' : ''})</span>
                  </span>
                )}
                <span className="flex items-center gap-1">
                  <Package size={13} />
                  {watches?.length ?? 0} watch{(watches?.length ?? 0) !== 1 ? 'es' : ''} listed
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={13} />
                  {profile.city}
                </span>
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  Member since {memberSince}
                </span>
              </div>
            </div>

            <Button size="md" asChild>
              <Link href={`/watches?owner=${userId}`}>Browse watches</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Watches */}
      <div className="mx-auto max-w-5xl px-5 py-10 sm:px-8 lg:px-10">
        <h2 className="text-lg font-semibold text-black mb-6">
          {watches && watches.length > 0
            ? `Available watches (${watches.length})`
            : 'No watches listed yet'}
        </h2>

        {watches && watches.length > 0 ? (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {watches.map((watch) => (
              <Link
                key={watch.id}
                href={`/watches/${watch.id}`}
                className="group block bg-white rounded-2xl border border-zinc-200 overflow-hidden hover:border-zinc-300 hover:shadow-sm transition-all"
              >
                {/* Photo */}
                <div className="relative aspect-[4/3] overflow-hidden bg-zinc-100">
                  {watch.photos?.[0] ? (
                    <Image
                      src={watch.photos[0]}
                      alt={`${watch.brand} ${watch.model}`}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-5xl text-zinc-300">⌚</div>
                  )}
                  {watch.is_authenticated && (
                    <span className="absolute top-3 right-3 inline-flex items-center gap-1 rounded-full bg-black/80 px-2 py-0.5 text-[10px] font-medium text-white">
                      <ShieldCheck size={9} />
                      Verified
                    </span>
                  )}
                </div>

                {/* Content */}
                <div className="p-4">
                  <p className="text-[11px] font-semibold tracking-widest uppercase text-zinc-400">{watch.brand}</p>
                  <h3 className="mt-0.5 text-[15px] font-semibold text-black">{watch.model}</h3>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-[15px] font-bold text-black">{formatCAD(watch.rental_price_30d)}<span className="text-xs font-normal text-zinc-400"> / 30 days</span></span>
                    {watch.rating && (
                      <span className="flex items-center gap-1 text-xs text-zinc-500">
                        <Star size={11} className="text-amber-500 fill-amber-500" />
                        {Number(watch.rating).toFixed(1)}
                      </span>
                    )}
                  </div>
                  <div className="mt-2 flex items-center gap-1 text-[12px] text-zinc-400">
                    <MapPin size={11} />
                    {watch.pickup_area}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="rounded-2xl border border-zinc-200 bg-white p-12 text-center text-zinc-400 text-sm">
            This owner hasn&apos;t listed any watches yet.
          </div>
        )}
      </div>
    </div>
  )
}
