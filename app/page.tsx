import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import LocationSearch from '@/components/sections/location-search'
import CampgroundCard from '@/components/campgrounds/campground-card'
import { getFeaturedCampgrounds } from '@/lib/data/campgrounds'

export const metadata: Metadata = {
  title: 'Find the Perfect Campground & Camping Gear',
  description: 'Discover amazing campgrounds across North America and find the best camping gear deals. Read reviews, get directions, and plan your perfect outdoor adventure.',
  openGraph: {
    title: 'TentTracks - Find the Perfect Campground & Camping Gear',
    description: 'Discover amazing campgrounds across North America and find the best camping gear deals.',
    url: 'https://tenttracks.com',
    type: 'website',
  },
}

export default async function HomePage() {
  const featuredCampgrounds = await getFeaturedCampgrounds(4)
  
  return (

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src="https://images.unsplash.com/photo-1504851149312-7a075b496cc7?q=80&w=2087&auto=format&fit=crop"
              alt="Mountain landscape with campfire"
              fill
              className="object-cover"
              priority
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-black/40"></div>
          </div>

          {/* Content */}
          <div className="relative z-10 container py-20 lg:py-32">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl">
                Find Your Perfect
                <span className="block text-green-400"> Campground</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-gray-200 sm:text-xl">
                Discover amazing outdoor experiences across Canada and the United States
              </p>
              <div className="mt-10 max-w-2xl mx-auto">
                <LocationSearch
                  placeholder="Search by state, province, or campground name..."
                  className="mb-6"
                />
              </div>
            </div>
          </div>

          {/* Scroll Indicator */}
          <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10">
            <div className="animate-bounce">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
              </svg>
            </div>
          </div>
        </section>

        {/* Featured Campgrounds Section */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
                Featured Campgrounds
              </h2>
              <p className="mt-6 text-lg text-gray-600">
                Discover handpicked camping destinations that offer the best outdoor experiences across North America
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {featuredCampgrounds.map((campground, index) => (
                <CampgroundCard
                  key={campground.id}
                  campground={campground}
                  priority={index < 2} // Priority load for first 2 images
                />
              ))}
            </div>

            {/* View All Link */}
            <div className="text-center mt-12">
              <Link
                href="/destinations"
                className="inline-flex items-center justify-center rounded-xl bg-gray-900 px-8 py-3 text-sm font-semibold text-white shadow-lg hover:bg-gray-800 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gray-900 transition-all duration-200 hover:shadow-xl hover:-translate-y-0.5"
              >
                View All Campgrounds
                <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </Link>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 sm:text-4xl">10,000+</div>
                <div className="mt-2 text-sm text-gray-600">Campgrounds Listed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 sm:text-4xl">50,000+</div>
                <div className="mt-2 text-sm text-gray-600">Happy Campers</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 sm:text-4xl">25,000+</div>
                <div className="mt-2 text-sm text-gray-600">Reviews Written</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-gray-900 sm:text-4xl">1,000+</div>
                <div className="mt-2 text-sm text-gray-600">Gear Deals</div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="relative overflow-hidden bg-gray-900 py-20 lg:py-32">
          <div className="absolute inset-0">
            <Image
              src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=2000&auto=format&fit=crop"
              alt="Campfire under starry night sky"
              fill
              className="object-cover opacity-30"
              sizes="100vw"
            />
          </div>
          <div className="relative container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Ready to Start Your Adventure?
              </h2>
              <p className="mt-6 text-lg leading-8 text-gray-300">
                Join thousands of campers who trust TentTracks to find their perfect outdoor getaway.
              </p>
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Link
                  href="/destinations"
                  className="rounded-xl bg-white px-8 py-3 text-lg font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white transition-colors"
                >
                  Explore Campgrounds
                </Link>
                <Link
                  href="/gear-deals"
                  className="text-lg font-semibold leading-6 text-white hover:text-gray-300 transition-colors"
                >
                  Browse Gear Deals <span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
  )
}