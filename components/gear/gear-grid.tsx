'use client'

import { useState } from 'react'
import GearCard, { GearCardSkeleton } from './gear-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Filter, Grid, List, Search, X } from 'lucide-react'
import { Input } from '@/components/ui/input'
import type { GearItem } from '@/types'
import { cn } from '@/lib/utils/cn'

interface GearGridProps {
  gear: GearItem[]
  categories: string[]
  loading?: boolean
  loadMore?: () => void
  hasMore?: boolean
  className?: string
  searchable?: boolean
  filterable?: boolean
}

/**
 * GearGrid component for displaying gear items with filtering and search
 * 
 * Args:
 *   gear: Array of gear items
 *   categories: Array of available categories
 *   loading: Whether data is currently loading
 *   loadMore: Function to load more gear items
 *   hasMore: Whether there are more items to load
 *   className: Additional CSS classes
 *   searchable: Whether to show search input
 *   filterable: Whether to show category filters
 * 
 * Returns:
 *   JSX.Element: Responsive grid of gear cards with filters
 */
export default function GearGrid({
  gear,
  categories,
  loading = false,
  loadMore,
  hasMore = false,
  className,
  searchable = true,
  filterable = true,
}: GearGridProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<string[]>([])
  const [selectedSources, setSelectedSources] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')
  const [showOnSale, setShowOnSale] = useState(false)

  // Filter gear based on search and filters
  const filteredGear = gear.filter(item => {
    // Search filter
    if (searchQuery) {
      const searchText = [
        item.title,
        item.description,
        item.category,
        ...item.features,
      ].join(' ').toLowerCase()
      
      if (!searchText.includes(searchQuery.toLowerCase())) {
        return false
      }
    }

    // Category filter
    if (selectedCategories.length > 0) {
      if (!selectedCategories.includes(item.category)) {
        return false
      }
    }

    // Source filter
    if (selectedSources.length > 0) {
      if (!selectedSources.includes(item.source)) {
        return false
      }
    }

    // On sale filter
    if (showOnSale && !item.originalPrice) {
      return false
    }

    return true
  })

  // Toggle category filter
  const toggleCategory = (category: string) => {
    setSelectedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  // Toggle source filter
  const toggleSource = (source: string) => {
    setSelectedSources(prev =>
      prev.includes(source)
        ? prev.filter(s => s !== source)
        : [...prev, source]
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('')
    setSelectedCategories([])
    setSelectedSources([])
    setShowOnSale(false)
  }

  // Get active filter count
  const activeFilterCount = [
    searchQuery.length > 0,
    selectedCategories.length > 0,
    selectedSources.length > 0,
    showOnSale,
  ].filter(Boolean).length

  // Handle empty state
  if (!loading && filteredGear.length === 0 && gear.length > 0) {
    return (
      <div className={cn('space-y-6', className)}>
        {/* Filters */}
        {(searchable || filterable) && (
          <Card className="p-6">
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
              
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              )}
            </div>

            <div className="space-y-4">
              {/* Search */}
              {searchable && (
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Search gear..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-9"
                  />
                </div>
              )}
            </div>
          </Card>
        )}

        {/* Empty state */}
        <div className="text-center py-12">
          <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
            <Search className="h-full w-full" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No gear found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filters to find what you&apos;re looking for.
          </p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      </div>
    )
  }

  if (!loading && gear.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
          <Grid className="h-full w-full" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No gear available</h3>
        <p className="text-gray-600">
          Check back later for the latest camping gear deals.
        </p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Filters */}
      {(searchable || filterable) && (
        <Card className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Filter className="h-5 w-5 text-gray-600" />
              <h3 className="font-medium text-gray-900">Filters & Search</h3>
              {activeFilterCount > 0 && (
                <Badge variant="primary" size="sm">
                  {activeFilterCount}
                </Badge>
              )}
            </div>
            
            <div className="flex items-center space-x-2">
              {activeFilterCount > 0 && (
                <Button variant="ghost" size="sm" onClick={clearFilters}>
                  <X className="h-4 w-4 mr-1" />
                  Clear All
                </Button>
              )}
              
              <div className="flex items-center border border-gray-300 rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none border-r"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {/* Search */}
            {searchable && (
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  type="text"
                  placeholder="Search gear..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            )}

            {/* Filters */}
            {filterable && (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Categories
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => toggleCategory(category)}
                        className={cn(
                          'px-3 py-1 text-sm border rounded-md transition-colors',
                          selectedCategories.includes(category)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-gray-400'
                        )}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sources */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Retailers
                  </label>
                  <div className="flex flex-wrap gap-2">
                    {['amazon', 'cabelas'].map((source) => (
                      <button
                        key={source}
                        onClick={() => toggleSource(source)}
                        className={cn(
                          'px-3 py-1 text-sm border rounded-md transition-colors capitalize',
                          selectedSources.includes(source)
                            ? 'border-primary-500 bg-primary-50 text-primary-700'
                            : 'border-gray-300 hover:border-gray-400'
                        )}
                      >
                        {source === 'amazon' ? 'Amazon' : 'Cabela&apos;s'}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special Filters */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Special Offers
                  </label>
                  <button
                    onClick={() => setShowOnSale(!showOnSale)}
                    className={cn(
                      'px-3 py-1 text-sm border rounded-md transition-colors',
                      showOnSale
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-300 hover:border-gray-400'
                    )}
                  >
                    On Sale Only
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">
              {filteredGear.length.toLocaleString()} item{filteredGear.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </Card>
      )}

      {/* Grid */}
      <div className={cn(
        viewMode === 'grid'
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'space-y-4'
      )}>
        {filteredGear.map((gearItem, index) => (
          <GearCard
            key={gearItem.id}
            gear={gearItem}
            priority={index < 6} // Priority loading for first 6 images
            showCategory={selectedCategories.length === 0}
            className={viewMode === 'list' ? 'flex flex-row' : ''}
          />
        ))}
        
        {/* Loading skeletons */}
        {loading && (
          <>
            {Array.from({ length: 6 }).map((_, index) => (
              <GearCardSkeleton key={`skeleton-${index}`} />
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
            Load More Gear
          </Button>
        </div>
      )}

      {/* Loading indicator for load more */}
      {loading && filteredGear.length > 0 && (
        <div className="text-center py-4">
          <div className="inline-flex items-center text-sm text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
            Loading more gear...
          </div>
        </div>
      )}
    </div>
  )
}