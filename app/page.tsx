import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import LocationSearch from '@/components/sections/location-search'
import CampgroundGrid from '@/components/campgrounds/campground-grid'

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

export default function HomePage() {
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
        <section className="section-padding bg-gray-900">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Featured Campgrounds
              </h2>
              <p className="mt-6 text-lg text-gray-300">
                Discover handpicked camping destinations that offer the best outdoor experiences across North America
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {/* Yosemite Valley */}
              <div className="group relative overflow-hidden rounded-2xl bg-gray-800">
                <div className="aspect-[3/4] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=800&auto=format&fit=crop"
                    alt="Yosemite Valley Campground"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <button className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                  </button>
                  <h3 className="text-xl font-bold text-white mb-2">Yosemite Valley Campground</h3>
                  <p className="text-sm text-gray-300 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Yosemite National Park, California
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Experience the iconic granite cliffs and waterfalls of Yosemite Valley...
                  </p>
                </div>
              </div>

              {/* Banff National Park */}
              <div className="group relative overflow-hidden rounded-2xl bg-gray-800">
                <div className="aspect-[3/4] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop"
                    alt="Banff National Park Campground"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <button className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                  </button>
                  <h3 className="text-xl font-bold text-white mb-2">Banff National Park Campground</h3>
                  <p className="text-sm text-gray-300 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Banff, Alberta
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Nestled in the heart of the Canadian Rockies, this campground offers breathtaking mountain views...
                  </p>
                </div>
              </div>

              {/* Acadia Oceanside */}
              <div className="group relative overflow-hidden rounded-2xl bg-gray-800">
                <div className="aspect-[3/4] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=800&auto=format&fit=crop"
                    alt="Acadia Oceanside Camping"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <button className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                  </button>
                  <h3 className="text-xl font-bold text-white mb-2">Acadia Oceanside Camping</h3>
                  <p className="text-sm text-gray-300 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Bar Harbor, Maine
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Wake up to the sound of waves crashing against rugged coastlines. Perfect for those seeking a coastal...
                  </p>
                </div>
              </div>

              {/* Glacier Point */}
              <div className="group relative overflow-hidden rounded-2xl bg-gray-800">
                <div className="aspect-[3/4] overflow-hidden">
                  <Image
                    src="https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=800&auto=format&fit=crop"
                    alt="Glacier Point Wilderness Camp"
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <button className="absolute top-4 right-4 p-2 rounded-full bg-black/20 text-white hover:bg-black/40 transition-colors">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                    </svg>
                  </button>
                  <h3 className="text-xl font-bold text-white mb-2">Glacier Point Wilderness Camp</h3>
                  <p className="text-sm text-gray-300 mb-3 flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Glacier National Park, Montana
                  </p>
                  <p className="text-sm text-gray-400 leading-relaxed">
                    Experience the pristine wilderness of Glacier National Park with stunning mountain vistas and...
                  </p>
                </div>
              </div>
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
                  href="/"
                  className="rounded-md bg-green-500 px-8 py-3 text-lg font-semibold text-white shadow-sm hover:bg-green-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-400 transition-colors"
                >
                  Explore Campgrounds
                </Link>
                <Link
                  href="/gear-deals"
                  className="text-lg font-semibold leading-6 text-white hover:text-green-400 transition-colors"
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