import type { Metadata } from 'next'
import Link from 'next/link'
import LocationSearch from '@/components/sections/location-search'

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
        <section className="relative bg-gradient-to-r from-primary-600 to-primary-800 py-20 lg:py-32">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Find Your Perfect
                <span className="text-primary-200"> Campground</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-primary-100 sm:text-xl">
                Discover amazing campgrounds across North America, read authentic reviews, 
                and find the best camping gear deals all in one place.
              </p>
              <div className="mt-10 max-w-2xl mx-auto">
                <LocationSearch
                  placeholder="Search campgrounds by location..."
                  className="mb-6"
                />
                <div className="flex items-center justify-center gap-x-6">
                  <Link
                    href="/destinations"
                    className="btn-primary bg-white text-primary-600 hover:bg-gray-50"
                  >
                    Explore Campgrounds
                  </Link>
                  <Link
                    href="/gear-deals"
                    className="text-sm font-semibold leading-6 text-white hover:text-primary-200"
                  >
                    Browse Gear Deals <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="heading-2">Everything You Need for Your Next Adventure</h2>
              <p className="mt-6 body-large">
                From finding the perfect campsite to getting the best deals on gear, 
                TentTracks has everything you need to plan your outdoor adventure.
              </p>
            </div>

            <div className="mx-auto mt-16 max-w-5xl">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
                <div className="text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-gray-900">Find Campgrounds</h3>
                  <p className="mt-2 text-gray-600">
                    Search thousands of campgrounds across North America with detailed reviews and amenities.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-gray-900">Read Reviews</h3>
                  <p className="mt-2 text-gray-600">
                    Get insights from real campers about amenities, cleanliness, and overall experience.
                  </p>
                </div>

                <div className="text-center">
                  <div className="mx-auto h-16 w-16 rounded-full bg-primary-100 flex items-center justify-center">
                    <svg className="h-8 w-8 text-primary-600" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 1 0-7.5 0v4.5m11.356-1.993 1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 0 1-1.12-1.243l1.264-12A1.125 1.125 0 0 1 5.513 7.5h12.974c.576 0 1.059.435 1.119 1.007ZM8.625 10.5a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm7.5 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z" />
                    </svg>
                  </div>
                  <h3 className="mt-6 text-lg font-semibold text-gray-900">Gear Deals</h3>
                  <p className="mt-2 text-gray-600">
                    Find the best camping gear deals from trusted retailers with exclusive discounts.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-50 section-padding">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="heading-2">Ready to Start Your Adventure?</h2>
              <p className="mt-6 body-large">
                Join thousands of campers who trust TentTracks to find their perfect outdoor getaway.
              </p>
              <div className="mt-10">
                <Link
                  href="/destinations"
                  className="btn-primary text-lg px-8 py-3"
                >
                  Explore Campgrounds Now
                </Link>
              </div>
            </div>
          </div>
        </section>
      </div>
  )
}