'use client'

import { useState, useMemo } from 'react'
import { Search, SlidersHorizontal, X } from 'lucide-react'
import { WatchCard } from '@/components/watches/watch-card'
import { Input } from '@/components/ui/input'
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
        )
          return false
      }
      return true
    })
  }, [search, selectedBrand, selectedArea, maxPrice])

  const activeFilters = [
    selectedBrand !== 'All' && selectedBrand,
    selectedArea !== 'All areas' && selectedArea,
    maxPrice && `Max $${maxPrice}/mo`,
  ].filter(Boolean) as string[]

  return (
    <div className="min-h-screen bg-stone-50">
      {/* Page header */}
      <div className="bg-white border-b border-stone-200">
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
          <h1 className="text-2xl font-bold text-stone-900">Browse Watches</h1>
          <p className="mt-1 text-stone-500">
            {filtered.length} watch{filtered.length !== 1 ? 'es' : ''} available · Greater Montreal
          </p>

          {/* Search + filter row */}
          <div className="mt-5 flex gap-3">
            <div className="relative flex-1 max-w-md">
              <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-stone-400" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search brand, model, neighborhood…"
                className="h-10 w-full rounded-lg border border-stone-300 bg-white pl-9 pr-4 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900"
              />
            </div>
            <Button
              variant={showFilters ? 'default' : 'outline'}
              size="md"
              onClick={() => setShowFilters((v) => !v)}
            >
              <SlidersHorizontal size={15} className="mr-2" />
              Filters
              {activeFilters.length > 0 && (
                <span className="ml-2 flex h-5 w-5 items-center justify-center rounded-full bg-amber-600 text-xs text-white">
                  {activeFilters.length}
                </span>
              )}
            </Button>
          </div>

          {/* Expanded filters */}
          {showFilters && (
            <div className="mt-4 grid gap-4 sm:grid-cols-3 p-4 bg-stone-50 rounded-xl border border-stone-200">
              <div>
                <label className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2 block">Brand</label>
                <div className="flex flex-wrap gap-2">
                  {BRANDS.map((brand) => (
                    <button
                      key={brand}
                      onClick={() => setSelectedBrand(brand)}
                      className={`rounded-full px-3 py-1 text-xs font-medium transition-colors ${
                        selectedBrand === brand
                          ? 'bg-stone-900 text-white'
                          : 'bg-white border border-stone-300 text-stone-700 hover:border-stone-500'
                      }`}
                    >
                      {brand}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2 block">Neighborhood</label>
                <select
                  value={selectedArea}
                  onChange={(e) => setSelectedArea(e.target.value)}
                  className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 focus:outline-none focus:ring-2 focus:ring-stone-900"
                >
                  {AREAS.map((a) => (
                    <option key={a}>{a}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="text-xs font-medium text-stone-500 uppercase tracking-wide mb-2 block">Max price / 30 days</label>
                <input
                  type="number"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(e.target.value)}
                  placeholder="e.g. 250"
                  className="h-9 w-full rounded-lg border border-stone-300 bg-white px-3 text-sm text-stone-900 placeholder:text-stone-400 focus:outline-none focus:ring-2 focus:ring-stone-900"
                />
              </div>
            </div>
          )}

          {/* Active filter chips */}
          {activeFilters.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {activeFilters.map((f) => (
                <Badge key={f} variant="secondary" className="gap-1 pl-2.5 pr-1.5 py-1">
                  {f}
                  <button
                    onClick={() => {
                      if (f === selectedBrand) setSelectedBrand('All')
                      if (f === selectedArea) setSelectedArea('All areas')
                      if (f.startsWith('Max $')) setMaxPrice('')
                    }}
                    className="ml-0.5 rounded-full hover:bg-stone-300 p-0.5"
                  >
                    <X size={10} />
                  </button>
                </Badge>
              ))}
              <button
                onClick={() => {
                  setSelectedBrand('All')
                  setSelectedArea('All areas')
                  setMaxPrice('')
                  setSearch('')
                }}
                className="text-xs text-stone-500 hover:text-stone-900 underline"
              >
                Clear all
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Watch grid */}
      <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <span className="text-5xl mb-4">⌚</span>
            <h3 className="text-lg font-semibold text-stone-900">No watches found</h3>
            <p className="mt-2 text-stone-500">Try adjusting your filters or search.</p>
            <Button
              variant="outline"
              className="mt-4"
              onClick={() => {
                setSearch('')
                setSelectedBrand('All')
                setSelectedArea('All areas')
                setMaxPrice('')
              }}
            >
              Reset filters
            </Button>
          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filtered.map((watch) => (
              <WatchCard key={watch.id} watch={watch} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
