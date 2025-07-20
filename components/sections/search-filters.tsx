'use client'

import { useState, useEffect } from 'react'
import { ChevronDown, ChevronUp, Filter, X, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import type { FilterOptions, SortOptions } from '@/lib/search/filters'
import { PRICE_RANGES, POPULAR_AMENITIES, POPULAR_FEATURES } from '@/lib/search/filters'
import { cn } from '@/lib/utils/cn'

interface SearchFiltersProps {
  filters: FilterOptions
  sort: SortOptions
  onFiltersChange: (filters: FilterOptions) => void
  onSortChange: (sort: SortOptions) => void
  resultCount?: number
  className?: string
}

export default function SearchFilters({
  filters,
  sort,
  onFiltersChange,
  onSortChange,
  resultCount = 0,
  className,
}: SearchFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>(filters.amenities || [])
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>(filters.features || [])
  const [priceRange, setPriceRange] = useState<[number, number] | undefined>(filters.priceRange)
  const [minRating, setMinRating] = useState<number>(filters.rating || 0)
  const [radius, setRadius] = useState<number>(filters.radius || 50)

  // Update filters when local state changes
  useEffect(() => {
    const newFilters: FilterOptions = {
      ...filters,
      amenities: selectedAmenities.length > 0 ? selectedAmenities : undefined,
      features: selectedFeatures.length > 0 ? selectedFeatures : undefined,
      priceRange: priceRange,
      rating: minRating > 0 ? minRating : undefined,
      radius: radius,
    }

    onFiltersChange(newFilters)
  }, [selectedAmenities, selectedFeatures, priceRange, minRating, radius, filters, onFiltersChange])

  // Clear all filters
  const clearFilters = () => {
    setSelectedAmenities([])
    setSelectedFeatures([])
    setPriceRange(undefined)
    setMinRating(0)
    setRadius(50)
    onFiltersChange({
      location: filters.location, // Keep location
      radius: 50,
    })
  }

  // Toggle amenity selection
  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    )
  }

  // Toggle feature selection
  const toggleFeature = (feature: string) => {
    setSelectedFeatures(prev =>
      prev.includes(feature)
        ? prev.filter(f => f !== feature)
        : [...prev, feature]
    )
  }

  // Get active filter count
  const activeFilterCount = [
    selectedAmenities.length > 0,
    selectedFeatures.length > 0,
    priceRange !== undefined,
    minRating > 0,
  ].filter(Boolean).length

  return (
    <Card className={cn('p-4', className)}>
      {/* Filter Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Filter className="h-5 w-5 text-gray-600" />
          <h3 className="font-medium text-gray-900">Filters</h3>
          {activeFilterCount > 0 && (
            <Badge variant="primary" size="sm">
              {activeFilterCount}
            </Badge>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          {resultCount > 0 && (
            <span className="text-sm text-gray-600">
              {resultCount.toLocaleString()} result{resultCount !== 1 ? 's' : ''}
            </span>
          )}
          
          {activeFilterCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearFilters}>
              <X className="h-4 w-4 mr-1" />
              Clear
            </Button>
          )}
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
          >
            {isExpanded ? (
              <ChevronUp className="h-4 w-4" />
            ) : (
              <ChevronDown className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Sort Options (Always Visible) */}
      <div className="flex items-center space-x-4 mb-4 pb-4 border-b border-gray-200">
        <span className="text-sm font-medium text-gray-700">Sort by:</span>
        <select
          value={`${sort.sortBy}-${sort.direction}`}
          onChange={(e) => {
            const [sortBy, direction] = e.target.value.split('-') as [SortOptions['sortBy'], SortOptions['direction']]
            onSortChange({ sortBy, direction })
          }}
          className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
        >
          <option value="popularity-desc">Most Popular</option>
          <option value="rating-desc">Highest Rated</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A to Z</option>
          {filters.location && (
            <option value="distance-asc">Distance: Near to Far</option>
          )}
        </select>
      </div>

      {/* Expandable Filters */}
      {isExpanded && (
        <div className="space-y-6">
          {/* Distance Filter */}
          {filters.location && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Distance from your location
              </label>
              <div className="space-y-2">
                <Input
                  type="range"
                  min="5"
                  max="500"
                  value={radius}
                  onChange={(e) => setRadius(parseInt(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>5 miles</span>
                  <span className="font-medium">{radius} miles</span>
                  <span>500 miles</span>
                </div>
              </div>
            </div>
          )}

          {/* Price Range Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Price Range (per night)
            </label>
            <div className="grid grid-cols-2 gap-2">
              {PRICE_RANGES.map((range) => (
                <button
                  key={range.label}
                  onClick={() => {
                    if (priceRange && priceRange[0] === range.min && priceRange[1] === range.max) {
                      setPriceRange(undefined)
                    } else {
                      setPriceRange([range.min, range.max])
                    }
                  }}
                  className={cn(
                    'px-3 py-2 text-sm border rounded-md transition-colors',
                    priceRange && priceRange[0] === range.min && priceRange[1] === range.max
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  )}
                >
                  {range.label}
                </button>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Minimum Rating
            </label>
            <div className="flex space-x-2">
              {[0, 3, 4, 4.5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => setMinRating(rating === minRating ? 0 : rating)}
                  className={cn(
                    'flex items-center px-3 py-2 text-sm border rounded-md transition-colors',
                    minRating === rating
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  )}
                >
                  <Star className="h-4 w-4 mr-1" />
                  {rating === 0 ? 'Any' : `${rating}+`}
                </button>
              ))}
            </div>
          </div>

          {/* Amenities Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Amenities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {POPULAR_AMENITIES.map((amenity) => (
                <button
                  key={amenity}
                  onClick={() => toggleAmenity(amenity)}
                  className={cn(
                    'px-3 py-2 text-sm border rounded-md transition-colors text-left',
                    selectedAmenities.includes(amenity)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  )}
                >
                  {amenity}
                </button>
              ))}
            </div>
          </div>

          {/* Features Filter */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Features & Activities
            </label>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {POPULAR_FEATURES.map((feature) => (
                <button
                  key={feature}
                  onClick={() => toggleFeature(feature)}
                  className={cn(
                    'px-3 py-2 text-sm border rounded-md transition-colors text-left',
                    selectedFeatures.includes(feature)
                      ? 'border-primary-500 bg-primary-50 text-primary-700'
                      : 'border-gray-300 hover:border-gray-400'
                  )}
                >
                  {feature}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Active Filters Summary */}
      {!isExpanded && activeFilterCount > 0 && (
        <div className="flex flex-wrap gap-2 mt-4">
          {selectedAmenities.map((amenity) => (
            <Badge
              key={`amenity-${amenity}`}
              variant="secondary"
              removable
              onRemove={() => toggleAmenity(amenity)}
            >
              {amenity}
            </Badge>
          ))}
          {selectedFeatures.map((feature) => (
            <Badge
              key={`feature-${feature}`}
              variant="secondary"
              removable
              onRemove={() => toggleFeature(feature)}
            >
              {feature}
            </Badge>
          ))}
          {priceRange && (
            <Badge
              variant="secondary"
              removable
              onRemove={() => setPriceRange(undefined)}
            >
              ${priceRange[0]}-${priceRange[1] === 999 ? '+' : `$${priceRange[1]}`}
            </Badge>
          )}
          {minRating > 0 && (
            <Badge
              variant="secondary"
              removable
              onRemove={() => setMinRating(0)}
            >
              <Star className="h-3 w-3 mr-1" />
              {minRating}+
            </Badge>
          )}
        </div>
      )}
    </Card>
  )
}