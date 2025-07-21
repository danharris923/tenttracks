import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import Navigation from '@/components/layout/navigation'
import Footer from '@/components/layout/footer'
import '../styles/globals.css'
import WebVitalsTracker from '@/lib/utils/performance'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://tenttracks.com'),
  title: 'TentTracks - Find the Perfect Campground & Camping Gear',
  description: 'Discover amazing campgrounds across North America and find the best camping gear deals. Read reviews, get directions, and plan your perfect outdoor adventure.',
  keywords: 'camping, campgrounds, national parks, camping gear, outdoor recreation, RV parks, tent camping, hiking',
  authors: [{ name: 'TentTracks Team' }],
  creator: 'TentTracks',
  publisher: 'TentTracks',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://tenttracks.com',
    siteName: 'TentTracks',
    title: 'TentTracks - Find the Perfect Campground & Camping Gear',
    description: 'Discover amazing campgrounds across North America and find the best camping gear deals.',
    images: [
      {
        url: '/images/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'TentTracks - Find the Perfect Campground',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'TentTracks - Find the Perfect Campground & Camping Gear',
    description: 'Discover amazing campgrounds across North America and find the best camping gear deals.',
    images: ['/images/twitter-image.jpg'],
    creator: '@tenttracks',
  },
  alternates: {
    canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://tenttracks.com',
  },
  verification: {
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/images/apple-touch-icon.png" sizes="180x180" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="theme-color" content="#22c55e" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="format-detection" content="telephone=no" />
      </head>
      <body className={`${inter.className} antialiased bg-gray-50 dark:bg-gray-900 transition-colors`}>
        {/* Main Application */}
        <div id="root" className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Navigation />
          
          <main className="pt-16 lg:pt-20">
            {children}
          </main>
          
          <Footer />
        </div>
        
        {/* Performance and Analytics */}
        <WebVitalsTracker />
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  )
}