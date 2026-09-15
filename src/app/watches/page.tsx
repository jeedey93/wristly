'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { WatchCard } from '@/components/watches/watch-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { SEED_WATCHES } from '@/lib/seed-data'
import { config } from '@/lib/config'

const BRANDS = ['All', ...config.watch.brands.slice(0, 10)]
const AREAS = ['All areas', ...config.locations.areas]

export default function WatchesPage() {
  const [search, setSearch] = useState('')
  const [selectedBrand, setSelectedBrand] = useState('All')
  const [selectedArea, setSelectedArea] = useState('All areas')
  const [maxPrice, setMaxPrice] = useState('')
  const [showFilters, setShowFilters] = useState(false)

  const filtered = useMemo(() => {
    return SEED_WATCHES.filter((w) => {
      if (selectedBrand !== 'All' && w.brand !== selectedBrand) return false
      if (selectedArea !== 'All areas' && w.pickupArea !== selectedArea) return false
      if (maxPrice && w.rentalPrice30d > parseFloat(maxPrice)) return false
      if (search) {
        const q = search.toLowerCase()
        if (
          !w.brand.toLowerCase().includes(q) &&
          !w.model.toLowerCase().includes(q) &&
          !w.pickupArea.toLowerCase().includes(q)
        ) return false
      }
      return true
    })
  }, [search, selectedBrand, selectedArea, maxPrice])

  const activeFilters = [
    selectedBrand !== 'All' && selectedBrand,
    selectedArea !== 'All areas' && selectedArea,
    maxPrice && `Max $${maxPrice}`,
  ].filter(Boolean) as string[]

  const resetAll = () => {
    setSelectedBrand('All')
    setSelectedArea('All areas')
    setMaxPrice('')
    setSearch('')
  }

  return (
    <div className="min-h-screen bg-white">

      {/* Page header */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
          <div className="flex items-end justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-black">Browse Watches</h1>
              <p className="mt-1 text-[14px] text-zinc-500">
                {filtered.length} watch{filtered.length !== 1 ? 'es' : ''} available · Greater Montreal
              </p>
            </div>
          </div>

          {/* Search + filter row */}
          <div className="flex gap-2.5">
            <div className="relative flex-1 max-w-sm">
              <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Brand, model, neighborhood…"
                className="h-10 w-full rounded-lg border border-zinc-300 bg-white pl-9 pr-4 text-sm text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent transition-all"
              />
            </div>
            <Button
              variant={showFilters ? 'default' : 'outline'}
              size="md"
              onClick={() => setShowFilters((v) => !v)}
            >
              <SlidersHorizontal size={14} />
              Filters
              {activeFilters.length > 0 && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-amber-500 text-[10px] font-bold text-white">
                  {activeFilters.length}
                </span>
              )}
            </Button>
          </div>

          {/* Expanded filter panel */}
          {showFilters && (
            <div className="mt-3 rounded-xl border border-zinc-200 bg-zinc-50 p-5 grid gap-5 sm:grid-cols-3">
              <div>
                <p className="text-label text-zinc-400 mb-3">Brand</p>
                <div className="flex flex-wrap gap-1.5">
                  {BRANDS.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`rounded-full px-3 py-1 text-[12px] font-medium transition-all ${
                        selectedBrand === brand
                          ? 'bg-black text-white'
                          : 'bg-white border border-zinc-300 text-zinc-600 hover:border-zinc-500 hover:text-black'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-label text-zinc-400 mb-3">Neighborhood</p>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-black focus:outline-none focus:ring-2 focus:ring-black"
                >
                  {AREAS.map((a) => <option key={a}>{a}</option>)}
                </select>
              </div>
              <div>
                <p className="text-label text-zinc-400 mb-3">Max price / 30 days</p>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="e.g. 250"
                  className="h-9 w-full rounded-lg border border-zinc-300 bg-white px-3 text-sm text-black placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>
            </div>
          )}

          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <div className="mt-3 flex flex-wrap items-center gap-2">
              {activeFilters.map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1 rounded-full border border-zinc-300 bg-white px-2.5 py-1 text-[12px] font-medium text-zinc-700"
                >
                  {f}
                  <button
                    onClick={() => {
                      if (f === selectedBrand) setSelectedBrand('All')
                      else if (f === selectedArea) setSelectedArea('All areas')
                      else setMaxPrice('')
                    }}
                    className="ml-0.5 rounded-full p-0.5 hover:bg-zinc-100"
                  >
                    <X size={10} />
                  </button>
                </span>
              ))}
              <button onClick={resetAll} className="text-[12px] text-zinc-400 hover:text-black underline underline-offset-2">
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Grid */}
      <div className="mx-auto max-w-7xl px-5 py-8 sm:px-8 lg:px-10">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-28 text-center">
            <div className="text-5xl mb-5 text-zinc-200">⌚</div>
            <h3 className="text-lg font-semibold text-black">No watches found</h3>
            <p className="mt-2 text-zinc-500 text-sm">Try adjusting your filters.</p>
            <Button variant="outline" className="mt-5" onClick={resetAll}>
              Reset filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((watch) => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
