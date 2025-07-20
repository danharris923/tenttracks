'use client'

import Link from 'next/link'
import Image from 'next/image'
import { MapPin, Star, Phone, ExternalLink, Navigation } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { Campground } from '@/types'
import { cn } from '@/lib/utils/cn'

interface CampgroundCardProps {
  campground: Campground
  distance?: number // in miles
  showDistance?: boolean
  className?: string
  priority?: boolean // for image loading priority
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
    features,
    amenities,
    rating,
    reviewCount,
    images,
    priceRange,
    website,
    phone,
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
    ...(website && { url: website }),
    ...(phone && { telephone: phone }),
  }

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <Card className={cn('overflow-hidden hover:shadow-lg transition-shadow duration-300', className)}>
        {/* Image Section */}
        <div className="relative h-48 md:h-56">
          <Image
            src={images[0]}
            alt={`${name} campground`}
            fill
            className="object-cover"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Distance Badge */}
          {showDistance && distance && (
            <Badge
              variant="secondary"
              className="absolute top-3 left-3 bg-white/90 text-gray-800"
            >
              <Navigation className="h-3 w-3 mr-1" />
              {distance.toFixed(1)} mi
            </Badge>
          )}

          {/* Rating Badge */}
          <Badge
            variant="secondary"
            className="absolute top-3 right-3 bg-white/90 text-gray-800"
          >
            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
            {rating}
          </Badge>
        </div>

        {/* Content Section */}
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="mb-3">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-2 mb-2">
              {name}
            </h3>
            
            <div className="flex items-center text-sm text-gray-600 mb-2">
              <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
              <span className="truncate">
                {location.city}, {location.state}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm text-gray-600">
                <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating}</span>
                <span className="mx-1">•</span>
                <span>{reviewCount.toLocaleString()} reviews</span>
              </div>
              
              <div className="text-sm font-semibold text-primary-600">
                {priceRange}/night
              </div>
            </div>
          </div>

          {/* Description */}
          <p className="text-sm text-gray-600 line-clamp-3 mb-4">
            {description}
          </p>

          {/* Features */}
          <div className="mb-4">
            <div className="flex flex-wrap gap-1">
              {features.slice(0, 3).map((feature) => (
                <Badge
                  key={feature}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  {feature}
                </Badge>
              ))}
              {features.length > 3 && (
                <Badge variant="outline" size="sm" className="text-xs">
                  +{features.length - 3} more
                </Badge>
              )}
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              {phone && (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="p-2"
                >
                  <a
                    href={`tel:${phone}`}
                    aria-label={`Call ${name}`}
                  >
                    <Phone className="h-4 w-4" />
                  </a>
                </Button>
              )}
              
              {website && (
                <Button
                  variant="ghost"
                  size="sm"
                  asChild
                  className="p-2"
                >
                  <a
                    href={website}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit ${name} website`}
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              )}
            </div>

            <Button
              variant="primary"
              size="sm"
              asChild
              className="flex-shrink-0"
            >
              <Link href={`/campgrounds/${slug}`}>
                View Details
              </Link>
            </Button>
          </div>
        </div>
      </Card>
    </>
  )
}

// Skeleton loader for campground cards
export function CampgroundCardSkeleton({ className }: { className?: string }) {
  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="h-48 md:h-56 bg-gray-200 animate-pulse" />
      <div className="p-4 md:p-6">
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2 w-3/4" />
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-1/2" />
        <div className="h-16 bg-gray-200 rounded animate-pulse mb-4" />
        <div className="flex gap-2 mb-4">
          <div className="h-6 bg-gray-200 rounded animate-pulse w-16" />
          <div className="h-6 bg-gray-200 rounded animate-pulse w-20" />
          <div className="h-6 bg-gray-200 rounded animate-pulse w-14" />
        </div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
            <div className="h-8 w-8 bg-gray-200 rounded animate-pulse" />
          </div>
          <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
        </div>
      </div>
    </Card>
  )
}