'use client'

import { useState, useEffect } from 'react'
import CampgroundCard, { CampgroundCardSkeleton } from './campground-card'
import { Button } from '@/components/ui/button'
import type { Campground } from '@/types'
import { cn } from '@/lib/utils/cn'

interface CampgroundGridProps {
  campgrounds: Campground[]
  userLocation?: { latitude: number; longitude: number }
  showDistance?: boolean
  loading?: boolean
  loadMore?: () => void
  hasMore?: boolean
  className?: string
}

/**
 * CampgroundGrid component for displaying campgrounds in a responsive grid
 * 
 * Args:
 *   campgrounds: Array of campground data
 *   userLocation: User's current location for distance calculations
 *   showDistance: Whether to show distance from user location
 *   loading: Whether data is currently loading
 *   loadMore: Function to load more campgrounds
 *   hasMore: Whether there are more campgrounds to load
 *   className: Additional CSS classes
 * 
 * Returns:
 *   JSX.Element: Responsive grid of campground cards
 */
export default function CampgroundGrid({
  campgrounds,
  userLocation,
  showDistance = false,
  loading = false,
  loadMore,
  hasMore = false,
  className,
}: CampgroundGridProps) {
  const [distances, setDistances] = useState<Record<string, number>>({})

  // Calculate distances when user location changes
  useEffect(() => {
    if (userLocation && showDistance) {
      const newDistances: Record<string, number> = {}
      
      campgrounds.forEach(campground => {
        const distance = calculateDistance(
          userLocation.latitude,
          userLocation.longitude,
          campground.location.coordinates.lat,
          campground.location.coordinates.lng
        )
        newDistances[campground.id] = distance
      })
      
      setDistances(newDistances)
    }
  }, [campgrounds, userLocation, showDistance])

  // Handle empty state
  if (!loading && campgrounds.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
          <svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z" />
          </svg>
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No campgrounds found</h3>
        <p className="text-gray-600 mb-4">
          Try adjusting your search criteria or explore different locations.
        </p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {campgrounds.map((campground, index) => (
          <CampgroundCard
            key={campground.id}
            campground={campground}
            distance={distances[campground.id]}
            showDistance={showDistance && distances[campground.id] !== undefined}
            priority={index < 6} // Priority loading for first 6 images
          />
        ))}
        
        {/* Loading skeletons */}
        {loading && (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <CampgroundCardSkeleton key={`skeleton-${index}`} />
            ))}
          </>
        )}
      </div>

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={loadMore}
            className="px-8 py-3"
          >
            Load More Campgrounds
          </Button>
        </div>
      )}

      {/* Loading indicator for load more */}
      {loading && campgrounds.length > 0 && (
        <div className="text-center py-4">
          <div className="inline-flex items-center text-sm text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
            Loading more campgrounds...
          </div>
        </div>
      )}
    </div>
  )
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * 
 * Args:
 *   lat1: First latitude
 *   lon1: First longitude
 *   lat2: Second latitude
 *   lon2: Second longitude
 *   unit: 'km' or 'mi' for kilometers or miles
 * 
 * Returns:
 *   number: Distance in kilometers or miles
 */
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number, unit: 'km' | 'mi' = 'km'): number {
  const R = unit === 'km' ? 6371 : 3959 // Earth's radius in km or miles
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}