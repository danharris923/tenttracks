'use client'

import Image from 'next/image'
import { Star, ExternalLink, Tag, Percent } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import type { GearItem } from '@/types'
import { cn } from '@/lib/utils/cn'

interface GearCardProps {
  gear: GearItem
  className?: string
  priority?: boolean // for image loading priority
  showCategory?: boolean
}

/**
 * GearCard component with affiliate link integration and structured data
 * 
 * Args:
 *   gear: Gear item data object
 *   className: Additional CSS classes
 *   priority: Whether to load image with priority
 *   showCategory: Whether to display category badge
 * 
 * Returns:
 *   JSX.Element: Gear card with affiliate link tracking
 */
export default function GearCard({
  gear,
  className,
  priority = false,
  showCategory = true,
}: GearCardProps) {
  const {
    title,
    description,
    image,
    price,
    originalPrice,
    rating,
    reviewCount,
    affiliateLink,
    source,
    category,
    features,
  } = gear

  // Calculate discount percentage
  const discountPercentage = originalPrice ? 
    Math.round((1 - parseFloat(price.replace('$', '').replace(',', '')) / 
                   parseFloat(originalPrice.replace('$', '').replace(',', ''))) * 100) : 0

  // Generate affiliate redirect URL
  const redirectUrl = `/out?url=${encodeURIComponent(affiliateLink)}`

  // Generate JSON-LD structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: title,
    description,
    image,
    brand: source === 'amazon' ? 'Amazon' : "Cabela's",
    offers: {
      '@type': 'Offer',
      price: price.replace('$', '').replace(',', ''),
      priceCurrency: 'USD',
      availability: 'https://schema.org/InStock',
      seller: {
        '@type': 'Organization',
        name: source === 'amazon' ? 'Amazon' : "Cabela's",
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: rating,
      reviewCount: reviewCount,
      bestRating: 5,
      worstRating: 1,
    },
    category,
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

      <Card className={cn('overflow-hidden hover:shadow-lg transition-shadow duration-300 group', className)}>
        {/* Image Section */}
        <div className="relative h-48 md:h-56 overflow-hidden">
          <Image
            src={image}
            alt={title}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={priority}
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          
          {/* Source Badge */}
          <Badge
            variant="secondary"
            className={cn(
              "absolute top-3 left-3 text-xs font-medium",
              source === 'amazon' ? "bg-orange-100 text-orange-800" : "bg-green-100 text-green-800"
            )}
          >
            {source === 'amazon' ? 'Amazon' : "Cabela's"}
          </Badge>

          {/* Category Badge */}
          {showCategory && (
            <Badge
              variant="outline"
              className="absolute top-3 right-3 bg-white/90 text-gray-800 text-xs"
            >
              <Tag className="h-3 w-3 mr-1" />
              {category}
            </Badge>
          )}

          {/* Discount Badge */}
          {discountPercentage > 0 && (
            <Badge
              variant="secondary"
              className="absolute bottom-3 left-3 bg-red-100 text-red-800 font-semibold"
            >
              <Percent className="h-3 w-3 mr-1" />
              {discountPercentage}% OFF
            </Badge>
          )}
        </div>

        {/* Content Section */}
        <div className="p-4 md:p-6">
          {/* Header */}
          <div className="mb-3">
            <h3 className="text-lg md:text-xl font-semibold text-gray-900 line-clamp-2 mb-2 group-hover:text-primary-600 transition-colors">
              {title}
            </h3>
            
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center text-sm text-gray-600">
                <Star className="h-4 w-4 mr-1 fill-yellow-400 text-yellow-400" />
                <span className="font-medium">{rating}</span>
                <span className="mx-1">•</span>
                <span>{reviewCount.toLocaleString()} reviews</span>
              </div>
              
              <div className="text-right">
                <div className="text-lg font-bold text-primary-600">
                  {price}
                </div>
                {originalPrice && (
                  <div className="text-sm text-gray-500 line-through">
                    {originalPrice}
                  </div>
                )}
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
          <div className="flex items-center gap-3">
            <Button
              variant="primary"
              size="sm"
              asChild
              className="flex-1"
            >
              <a
                href={redirectUrl}
                target="_blank"
                rel="noopener noreferrer sponsored"
                className="flex items-center justify-center"
              >
                <ExternalLink className="h-4 w-4 mr-2" />
                View Deal
              </a>
            </Button>
            
            <div className="text-xs text-gray-500">
              FTC: Affiliate Link
            </div>
          </div>
        </div>
      </Card>
    </>
  )
}

// Skeleton loader for gear cards
export function GearCardSkeleton({ className }: { className?: string }) {
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
        <div className="flex gap-3">
          <div className="h-8 bg-gray-200 rounded animate-pulse flex-1" />
          <div className="h-8 bg-gray-200 rounded animate-pulse w-24" />
        </div>
      </div>
    </Card>
  )
}