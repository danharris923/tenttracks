'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, Navigation, Wifi, Car, TreesIcon as Trees, Zap, Flame } from 'lucide-react'
import type { Campground } from '@/types'
import { cn } from '@/lib/utils/cn'

interface CampgroundCardProps {
  campground: Campground
  distance?: number // in miles
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
 *   distance: Distance from user location in miles
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
        {/* Card with organic rounded shape inspired by HipCamp */}
        <div className="relative bg-white rounded-[2rem] overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
          
          {/* Image Container with organic shape */}
          <div className="relative h-64 overflow-hidden">
            <Image
              src={images[0]}
              alt={`${name} campground`}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
              priority={priority}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
            
            {/* Overlay gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            
            {/* Heart/Favorite Button */}
            <button className="absolute top-4 right-4 rounded-full bg-white/90 p-2.5 text-gray-600 shadow-lg transition-all duration-200 hover:bg-white hover:text-red-500 hover:scale-110">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </button>

            {/* Rating Badge */}
            <div className="absolute top-4 left-4">
              <div className="flex items-center bg-white/90 rounded-full px-3 py-1.5 shadow-lg">
                <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                <span className="text-sm font-medium text-gray-900">
                  {rating}
                </span>
              </div>
            </div>

            {/* Distance Badge */}
            {showDistance && distance && (
              <div className="absolute bottom-4 left-4">
                <div className="flex items-center bg-white/90 rounded-full px-3 py-1.5 shadow-lg">
                  <Navigation className="h-4 w-4 text-green-600 mr-1" />
                  <span className="text-sm font-medium text-gray-900">
                    {distance.toFixed(1)} mi
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* Content */}
          <div className="p-6">
            {/* Header */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-green-600 transition-colors line-clamp-1">
                {name}
              </h3>
              <div className="flex items-center text-gray-600 mb-3">
                <MapPin className="h-4 w-4 mr-1.5 flex-shrink-0 text-green-600" />
                <span className="text-sm font-medium">{location.city}, {location.state}</span>
              </div>
            </div>

            {/* Description */}
            <p className="text-gray-600 text-sm mb-4 line-clamp-2 leading-relaxed">
              {description}
            </p>

            {/* Amenities */}
            <div className="mb-6">
              <div className="flex flex-wrap items-center gap-3 mb-2">
                {displayAmenities.map((amenity, index) => (
                  <div key={index} className="flex items-center text-gray-700">
                    {amenity.icon && <amenity.icon className="h-4 w-4 mr-1.5 text-green-600" />}
                    <span className="text-sm font-medium">{amenity.name}</span>
                  </div>
                ))}
              </div>
              {remainingCount > 0 && (
                <span className="text-xs text-gray-500 font-medium">
                  +{remainingCount} more
                </span>
              )}
            </div>

            {/* Book Now Button */}
            <Link 
              href={`/campgrounds/${slug}`}
              className="block"
            >
              <button className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:scale-95">
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
      <div className="relative bg-white rounded-[2rem] overflow-hidden shadow-lg">
        <div className="h-64 bg-gray-200 animate-pulse" />
        <div className="p-6">
          <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-3 w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-1/2" />
          <div className="h-16 bg-gray-200 rounded animate-pulse mb-6" />
          <div className="flex gap-3 mb-6">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-16" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-20" />
            <div className="h-4 bg-gray-200 rounded animate-pulse w-14" />
          </div>
          <div className="h-12 bg-gray-200 rounded-xl animate-pulse" />
        </div>
      </div>
    </div>
  )
}