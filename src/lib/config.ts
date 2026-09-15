// Platform-wide configuration — change these values to reconfigure the platform
export const config = {
  app: {
    name: process.env.NEXT_PUBLIC_APP_NAME ?? 'Wristly',
    tagline: process.env.NEXT_PUBLIC_APP_TAGLINE ?? 'Rent. Wear. Return.',
    url: process.env.NEXT_PUBLIC_APP_URL ?? 'http://localhost:3000',
    supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL ?? 'hello@wristly.ca',
    defaultCity: process.env.NEXT_PUBLIC_DEFAULT_CITY ?? 'Montreal',
  },
  platform: {
    commissionRate: parseFloat(process.env.NEXT_PUBLIC_PLATFORM_COMMISSION_RATE ?? '0.20'),
    rentalDurations: [7, 14, 30] as const,
    defaultRentalDuration: 30,
    minWatchValue: 1500,
    stripeCurrency: 'cad',
  },
  deposits: {
    // Deposit as % of watch value
    tier1: { maxValue: 2500 as number, depositRate: 0.15 as number, minDeposit: 300 as number },
    tier2: { maxValue: 5000 as number, depositRate: 0.12 as number, minDeposit: 500 as number },
    tier3: { maxValue: 10000 as number, depositRate: 0.10 as number, minDeposit: 750 as number },
    tier4: { maxValue: 20000 as number, depositRate: 0.08 as number, minDeposit: 1200 as number },
    tier5: { maxValue: Infinity as number, depositRate: 0.06 as number, minDeposit: 2000 as number },
  },
  pricing: {
    // Suggested rental price ranges (30 days) by watch value
    tiers: [
      { minValue: 1000, maxValue: 2500, minPrice: 75, maxPrice: 125 },
      { minValue: 2500, maxValue: 5000, minPrice: 125, maxPrice: 175 },
      { minValue: 5000, maxValue: 10000, minPrice: 175, maxPrice: 275 },
      { minValue: 10000, maxValue: 20000, minPrice: 300, maxPrice: 450 },
      { minValue: 20000, maxValue: Infinity, minPrice: 500, maxPrice: 999 },
    ],
  },
  locations: {
    areas: [
      'Downtown Montreal',
      'Plateau-Mont-Royal',
      'Mile-End',
      'Westmount',
      'Outremont',
      'Rosemont',
      'NDG / Notre-Dame-de-Grâce',
      'Côte-des-Neiges',
      'Old Montreal',
      'Sud-Ouest',
      'Laval',
      'Longueuil',
      'West Island',
      'South Shore',
    ],
  },
  watch: {
    brands: [
      'Rolex',
      'Omega',
      'Tudor',
      'Cartier',
      'Breitling',
      'TAG Heuer',
      'IWC',
      'Panerai',
      'Grand Seiko',
      'Longines',
      'Zenith',
      'Jaeger-LeCoultre',
      'Audemars Piguet',
      'Patek Philippe',
      'A. Lange & Söhne',
      'Vacheron Constantin',
      'Other',
    ],
    conditions: ['Mint', 'Excellent', 'Good', 'Fair'] as const,
  },
  cancellation: {
    fullRefundHours: 48,
    partialRefundRate: 0.50,
  },
} as const

export type WatchCondition = typeof config.watch.conditions[number]
export type RentalDuration = typeof config.platform.rentalDurations[number]

export function calculateDeposit(watchValue: number): number {
  const tiers = config.deposits
  let tier = tiers.tier5
  if (watchValue <= 2500) tier = tiers.tier1
  else if (watchValue <= 5000) tier = tiers.tier2
  else if (watchValue <= 10000) tier = tiers.tier3
  else if (watchValue <= 20000) tier = tiers.tier4
  return Math.max(tier.minDeposit, Math.round(watchValue * tier.depositRate))
}

export function calculatePlatformFee(rentalPrice: number): number {
  return Math.round(rentalPrice * config.platform.commissionRate * 100) / 100
}

export function calculateOwnerPayout(rentalPrice: number): number {
  return Math.round((rentalPrice - calculatePlatformFee(rentalPrice)) * 100) / 100
}

export function getSuggestedRentalPrice(watchValue: number): { min: number; max: number } | null {
  const tier = config.pricing.tiers.find(
    (t) => watchValue >= t.minValue && watchValue < t.maxValue
  )
  return tier ? { min: tier.minPrice, max: tier.maxPrice } : null
}

export function formatCAD(amount: number): string {
  return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(amount)
}
