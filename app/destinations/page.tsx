import type { Metadata } from 'next'
import CampgroundGrid from '@/components/campgrounds/campground-grid'
import LocationSearch from '@/components/sections/location-search'
import Map from '@/components/ui/map'
import { getFeaturedCampgrounds } from '@/lib/data/campgrounds'

export const metadata: Metadata = {
  title: 'Find Campgrounds | TentTracks',
  description: 'Discover amazing campgrounds across North America. Search by location, amenities, and activities to find your perfect camping destination.',
  openGraph: {
    title: 'Find Campgrounds | TentTracks',
    description: 'Discover amazing campgrounds across North America.',
    type: 'website',
  },
}

export default async function DestinationsPage() {
  const campgrounds = await getFeaturedCampgrounds(12) // Show more campgrounds on destinations page
  
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-white py-16">
        <div className="container">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Find Your Perfect Campground
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Discover amazing campgrounds across North America with detailed reviews, amenities, and booking information.
            </p>
            
            {/* Search */}
            <div className="max-w-2xl mx-auto mb-8">
              <LocationSearch 
                placeholder="Search by location, campground name..."
                className="mb-4"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Map and Results */}
      <section className="section-padding">
        <div className="container">
          <div className="lg:grid lg:grid-cols-5 lg:gap-8">
            {/* Map */}
            <div className="lg:col-span-2 mb-8 lg:mb-0">
              <div className="sticky top-4">
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Map View</h2>
                <Map 
                  campgrounds={campgrounds}
                  center={[-115.5708, 51.1784]} // Banff, Canada [longitude, latitude]
                  className="h-96 lg:h-[600px] rounded-xl border border-gray-200"
                />
              </div>
            </div>
            
            {/* Results */}
            <div className="lg:col-span-3">
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-gray-900">
                  {campgrounds.length} Campgrounds Found
                </h2>
                <p className="text-sm text-gray-600">
                  Showing featured campgrounds across Canada and northern US
                </p>
              </div>
              <CampgroundGrid campgrounds={campgrounds} />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}