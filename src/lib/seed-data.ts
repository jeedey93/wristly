// Seed data for demo/development — replace with real database records
import { calculateDeposit } from './config'

export type WatchStatus = 'active' | 'rented' | 'pending_review' | 'inactive'
export type BookingStatus =
  | 'requested'
  | 'confirmed'
  | 'picked_up'
  | 'returned'
  | 'completed'
  | 'cancelled'
  | 'disputed'

export interface Watch {
  id: string
  brand: string
  model: string
  referenceNumber: string
  year: number
  estimatedValue: number
  condition: string
  description: string
  includedAccessories: string[]
  rentalPrice30d: number
  depositAmount: number
  pickupArea: string
  city: string
  isAuthenticated: boolean
  status: WatchStatus
  photos: string[]
  ownerId: string
  ownerName: string
  ownerRating: number
  ownerReviews: number
  watchRating: number
  watchReviews: number
}

export interface Booking {
  id: string
  watchId: string
  watch: Watch
  renterId: string
  renterName: string
  ownerId: string
  ownerName: string
  startDate: string
  endDate: string
  rentalDays: number
  rentalPrice: number
  platformFee: number
  ownerPayout: number
  depositAmount: number
  status: BookingStatus
  createdAt: string
}

// Placeholder watch photos — realistic gradient covers for demo
const PLACEHOLDER_PHOTOS = {
  rolex: [
    'https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=800&q=80',
    'https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&q=80',
  ],
  omega: [
    'https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=800&q=80',
    'https://images.unsplash.com/photo-1614164185128-e4ec99c436d7?w=800&q=80',
  ],
  tudor: [
    'https://images.unsplash.com/photo-1619946794135-5bc917a27793?w=800&q=80',
    'https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=800&q=80',
  ],
  cartier: [
    'https://images.unsplash.com/photo-1548690312-e3b507d8c110?w=800&q=80',
    'https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=800&q=80',
  ],
  grandseiko: [
    'https://images.unsplash.com/photo-1622434641406-a158123450f9?w=800&q=80',
    'https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=800&q=80',
  ],
}

export const SEED_WATCHES: Watch[] = [
  {
    id: 'w1',
    brand: 'Rolex',
    model: 'Datejust 41',
    referenceNumber: '126300',
    year: 2021,
    estimatedValue: 9800,
    condition: 'Excellent',
    description:
      'A stunning Rolex Datejust 41 in stainless steel with Jubilee bracelet and slate dial. Full set with box and papers. This watch has been serviced and wears beautifully. Perfect for business or formal occasions.',
    includedAccessories: ['Original box', 'Papers', 'Extra links', 'Chronofile'],
    rentalPrice30d: 225,
    depositAmount: calculateDeposit(9800),
    pickupArea: 'Westmount',
    city: 'Montreal',
    isAuthenticated: true,
    status: 'active',
    photos: PLACEHOLDER_PHOTOS.rolex,
    ownerId: 'u1',
    ownerName: 'Marc D.',
    ownerRating: 4.9,
    ownerReviews: 12,
    watchRating: 4.8,
    watchReviews: 8,
  },
  {
    id: 'w2',
    brand: 'Omega',
    model: 'Speedmaster Professional',
    referenceNumber: '310.30.42.50.01.001',
    year: 2022,
    estimatedValue: 7200,
    condition: 'Mint',
    description:
      'The original Moonwatch. This Speedmaster Professional is unworn with full set. Manual-wind movement, hesalite crystal, iconic panda dial. A true horological icon for the watch enthusiast.',
    includedAccessories: ['Original box', 'Papers', 'NATO strap', 'Calibre 3861'],
    rentalPrice30d: 195,
    depositAmount: calculateDeposit(7200),
    pickupArea: 'Plateau-Mont-Royal',
    city: 'Montreal',
    isAuthenticated: true,
    status: 'active',
    photos: PLACEHOLDER_PHOTOS.omega,
    ownerId: 'u2',
    ownerName: 'Sophie L.',
    ownerRating: 5.0,
    ownerReviews: 6,
    watchRating: 5.0,
    watchReviews: 5,
  },
  {
    id: 'w3',
    brand: 'Tudor',
    model: 'Black Bay 58',
    referenceNumber: '79030N',
    year: 2023,
    estimatedValue: 4200,
    condition: 'Excellent',
    description:
      'Tudor Black Bay 58 in navy blue. Excellent everyday sports watch. 39mm case wears beautifully on smaller wrists. Comes with both bracelet and leather strap. Ideal for any occasion.',
    includedAccessories: ['Original box', 'Papers', 'Leather strap', 'Bracelet'],
    rentalPrice30d: 145,
    depositAmount: calculateDeposit(4200),
    pickupArea: 'Mile-End',
    city: 'Montreal',
    isAuthenticated: false,
    status: 'active',
    photos: PLACEHOLDER_PHOTOS.tudor,
    ownerId: 'u3',
    ownerName: 'Alex B.',
    ownerRating: 4.7,
    ownerReviews: 4,
    watchRating: 4.9,
    watchReviews: 3,
  },
  {
    id: 'w4',
    brand: 'Cartier',
    model: 'Santos de Cartier',
    referenceNumber: 'WSSA0018',
    year: 2020,
    estimatedValue: 8500,
    condition: 'Excellent',
    description:
      'The Cartier Santos — the world\'s first pilot\'s wristwatch, now a timeless icon. Steel with interchangeable straps (alligator + steel bracelet). Elegant yet sporty. Perfect for someone who wants to stand out.',
    includedAccessories: ['Original box', 'Papers', 'Alligator strap', 'Steel bracelet', 'Strap changing tool'],
    rentalPrice30d: 210,
    depositAmount: calculateDeposit(8500),
    pickupArea: 'Downtown Montreal',
    city: 'Montreal',
    isAuthenticated: true,
    status: 'active',
    photos: PLACEHOLDER_PHOTOS.cartier,
    ownerId: 'u1',
    ownerName: 'Marc D.',
    ownerRating: 4.9,
    ownerReviews: 12,
    watchRating: 4.7,
    watchReviews: 4,
  },
  {
    id: 'w5',
    brand: 'Grand Seiko',
    model: 'Snowflake',
    referenceNumber: 'SBGA211',
    year: 2021,
    estimatedValue: 5800,
    condition: 'Mint',
    description:
      'The legendary Grand Seiko Snowflake with its mesmerizing textured dial inspired by the snow-covered forests of Shinshu. Spring Drive movement. A watch for those who appreciate true Japanese craftsmanship.',
    includedAccessories: ['Original box', 'Papers', 'Titanium bracelet'],
    rentalPrice30d: 165,
    depositAmount: calculateDeposit(5800),
    pickupArea: 'Outremont',
    city: 'Montreal',
    isAuthenticated: false,
    status: 'active',
    photos: PLACEHOLDER_PHOTOS.grandseiko,
    ownerId: 'u4',
    ownerName: 'Jean-F. T.',
    ownerRating: 4.8,
    ownerReviews: 3,
    watchRating: 5.0,
    watchReviews: 2,
  },
  {
    id: 'w6',
    brand: 'Rolex',
    model: 'Submariner Date',
    referenceNumber: '126610LN',
    year: 2022,
    estimatedValue: 16500,
    condition: 'Excellent',
    description:
      'The iconic Rolex Submariner in black ceramic. Full set with box and papers. The most recognizable dive watch in the world. Wears perfectly at 40mm. Currently unavailable at retail — waiting lists are years long.',
    includedAccessories: ['Original box', 'Papers', 'Swing tag'],
    rentalPrice30d: 350,
    depositAmount: calculateDeposit(16500),
    pickupArea: 'Westmount',
    city: 'Montreal',
    isAuthenticated: true,
    status: 'rented',
    photos: PLACEHOLDER_PHOTOS.rolex,
    ownerId: 'u2',
    ownerName: 'Sophie L.',
    ownerRating: 5.0,
    ownerReviews: 6,
    watchRating: 5.0,
    watchReviews: 6,
  },
]

export const SEED_BOOKINGS: Booking[] = [
  {
    id: 'b1',
    watchId: 'w1',
    watch: SEED_WATCHES[0],
    renterId: 'u5',
    renterName: 'Thomas M.',
    ownerId: 'u1',
    ownerName: 'Marc D.',
    startDate: '2026-09-20',
    endDate: '2026-10-20',
    rentalDays: 30,
    rentalPrice: 225,
    platformFee: 45,
    ownerPayout: 180,
    depositAmount: 980,
    status: 'confirmed',
    createdAt: '2026-09-14',
  },
  {
    id: 'b2',
    watchId: 'w6',
    watch: SEED_WATCHES[5],
    renterId: 'u5',
    renterName: 'Thomas M.',
    ownerId: 'u2',
    ownerName: 'Sophie L.',
    startDate: '2026-08-15',
    endDate: '2026-09-14',
    rentalDays: 30,
    rentalPrice: 350,
    platformFee: 70,
    ownerPayout: 280,
    depositAmount: 1320,
    status: 'completed',
    createdAt: '2026-08-10',
  },
]
