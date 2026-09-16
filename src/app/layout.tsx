import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import './globals.css'
import { Navbar } from '@/components/layout/navbar'
import { Footer } from '@/components/layout/footer'
import { config } from '@/lib/config'

const geistSans = Geist({ variable: '--font-geist-sans', subsets: ['latin'] })
const geistMono = Geist_Mono({ variable: '--font-geist-mono', subsets: ['latin'] })

export const metadata: Metadata = {
  title: {
    default: `${config.app.name} — ${config.app.tagline}`,
    template: `%s | ${config.app.name}`,
  },
  description: `${config.app.name} is a peer-to-peer luxury watch rental marketplace in the Greater Montreal area. Rent a luxury watch from someone near you.`,
  keywords: ['luxury watch rental', 'Montreal', 'Rolex rental', 'Omega rental', 'watch marketplace'],
  openGraph: {
    type: 'website',
    siteName: config.app.name,
    title: `${config.app.name} — ${config.app.tagline}`,
    description: 'Rent a luxury watch from someone near you. Rolex, Omega, Cartier and more — Greater Montreal.',
    images: [{ url: '/opengraph-image.png', width: 1200, height: 630, alt: 'Wristly' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${config.app.name} — ${config.app.tagline}`,
    description: 'Rent a luxury watch from someone near you. Rolex, Omega, Cartier and more — Greater Montreal.',
    images: ['/opengraph-image.png'],
  },
  icons: {
    icon: '/icon.png',
    apple: '/icon.png',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <body className="min-h-screen bg-stone-50 antialiased">
        <Navbar />
        <main className="min-h-[calc(100vh-4rem)]">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
