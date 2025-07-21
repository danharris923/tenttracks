'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, Navigation, Wifi, Car, TreesIcon as Trees, Zap, Flame } from 'lucide-react'
import type { Campground } from '@/types'
import { cn } from '@/lib/utils/cn'

interface CampgroundCardProps {
  campground: Campground
  distance?: number // in kilometers
  showDistance?: boolean
  className?: string
  priority?: boolean // for image loading priority
}

const amenityIcons = {
  wifi: Wifi,
  parking: Car,
  restrooms: Trees,
  electricity: Zap,
  'fire rings': Flame,
  'fire pits': Flame,
}

/**
 * CampgroundCard component with structured data for SEO
 * 
 * Args:
 *   campground: Campground data object
 *   distance: Distance from user location in kilometers
 *   showDistance: Whether to display distance information
 *   className: Additional CSS classes
 *   priority: Whether to load image with priority
 * 
 * Returns:
 *   JSX.Element: Campground card with JSON-LD structured data
 */
export default function CampgroundCard({
  campground,
  distance,
  showDistance = false,
  className,
  priority = false,
}: CampgroundCardProps) {
  const {
    slug,
    name,
    description,
    location,
    amenities,
    rating,
    reviewCount,
    images,
    priceRange,
  } = campground

  // Generate JSON-LD structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CampingPitch',
    name,
    description,
    url: `${process.env.NEXT_PUBLIC_SITE_URL}/campgrounds/${slug}`,
    image: images[0],
    address: {
      '@type': 'PostalAddress',
      addressLocality: location.city,
      addressRegion: location.state,
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: location.coordinates.lat,
      longitude: location.coordinates.lng,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount: reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    priceRange,
    amenityFeature: amenities.map(amenity => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity,
    })),
  }

  // Get amenity display info
  const displayAmenities = amenities.slice(0, 3).map(amenity => {
    const IconComponent = amenityIcons[amenity.toLowerCase() as keyof typeof amenityIcons]
    return {
      name: amenity.charAt(0).toUpperCase() + amenity.slice(1),
      icon: IconComponent
    }
  })

  const remainingCount = amenities.length > 3 ? amenities.length - 3 : 0

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <div className={cn('group cursor-pointer', className)}>
        {/* Clean card design inspired by HipCamp */}
        <div className="relative bg-white rounded-3xl overflow-hidden shadow-md transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
          
          {/* Image Container */}
          <div className="relative h-56 overflow-hidden">
            <Image
              src={images[0]}
              alt={`${name} campground`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Simple overlay for text readability */}
            <div className="absolute inset-0 bg-black/10" />
            
            {/* Heart/Favorite Button - simplified */}
            <button className="absolute top-4 right-4 rounded-full bg-white/95 p-2 text-gray-600 shadow-sm transition-all duration-200 hover:bg-white hover:text-red-500">
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Rating Badge - cleaner design */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center bg-white/95 rounded-full px-2.5 py-1 shadow-sm">
                <Star className="h-3.5 w-3.5 text-yellow-400 fill-current mr-1" />
                <span className="text-xs font-medium text-gray-900">
                  {rating}
                </span>
              </div>
            </div>

            {/* Distance Badge - only when needed */}
            {showDistance && distance && (
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center bg-white/95 rounded-full px-2.5 py-1 shadow-sm">
                  <Navigation className="h-3.5 w-3.5 text-green-600 mr-1" />
                  <span className="text-xs font-medium text-gray-900">
                    {distance.toFixed(1)} km
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Content - cleaner spacing */}
          <div className="p-5">
            {/* Header */}
            <div className="mb-3">
              <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1">
                {name}
              </h3>
              <div className="flex items-center text-gray-600">
                <MapPin className="h-3.5 w-3.5 mr-1 flex-shrink-0" />
                <span className="text-sm">{location.city}, {location.state}</span>
              </div>
            </div>

            {/* Description - shorter */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {description}
            </p>

            {/* Amenities - simplified */}
            <div className="mb-5">
              <div className="flex items-center gap-4 text-xs text-gray-600">
                {displayAmenities.slice(0, 3).map((amenity, index) => (
                  <span key={index} className="flex items-center">
                    {amenity.icon && <amenity.icon className="h-3.5 w-3.5 mr-1" />}
                    {amenity.name}
                  </span>
                ))}
                {remainingCount > 0 && (
                  <span>+{remainingCount} more</span>
                )}
              </div>
            </div>

            {/* Book Now Button - cleaner style */}
            <Link 
              href={campground.website ? `/out?url=${encodeURIComponent(campground.website)}&name=${encodeURIComponent(name)}` : '#'}
              className="block"
              target="_blank"
              rel="noopener noreferrer"
            >
              <button className="w-full bg-gray-900 hover:bg-gray-800 text-white font-medium py-2.5 px-6 rounded-xl transition-colors duration-200">
                Book Now
              </button>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

// Skeleton loader for campground cards
export function CampgroundCardSkeleton({ className }: { className?: string }) {
  return (
    <div className={cn('group cursor-pointer', className)}>
      <div className="relative bg-white rounded-3xl overflow-hidden shadow-md">
        <div className="h-56 bg-gray-200 animate-pulse" />
        <div className="p-5">
          <div className="h-5 bg-gray-200 rounded animate-pulse mb-1" />
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-3 w-2/3" />
          <div className="h-8 bg-gray-200 rounded animate-pulse mb-4" />
          <div className="flex gap-4 mb-5">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-14" />
          </div>
          <div className="h-10 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  )
}