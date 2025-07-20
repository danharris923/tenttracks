'use client'

import { useState } from 'react'
import BlogCard, { BlogCardSkeleton } from './blog-card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Filter, Search, X, Grid, List } from 'lucide-react'
import type { BlogPost } from '@/types'
import { cn } from '@/lib/utils/cn'

interface BlogGridProps {
  posts: BlogPost[]
  tags: string[]
  loading?: boolean
  loadMore?: () => void
  hasMore?: boolean
  className?: string
  searchable?: boolean
  filterable?: boolean
  featuredPost?: BlogPost
}

/**
 * BlogGrid component for displaying blog posts with filtering and search
 * 
 * Args:
 *   posts: Array of blog posts
 *   tags: Array of available tags
 *   loading: Whether data is currently loading
 *   loadMore: Function to load more posts
 *   hasMore: Whether there are more posts to load
 *   className: Additional CSS classes
 *   searchable: Whether to show search input
 *   filterable: Whether to show tag filters
 *   featuredPost: Featured post to display prominently
 * 
 * Returns:
 *   JSX.Element: Responsive grid of blog cards with filters
 */
export default function BlogGrid({
  posts,
  tags,
  loading = false,
  loadMore,
  hasMore = false,
  className,
  searchable = true,
  filterable = true,
  featuredPost,
}: BlogGridProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedTags, setSelectedTags] = useState<string[]>([])
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid')

  // Filter posts based on search and filters
  const filteredPosts = posts.filter(post => {
    // Don&apos;t show featured post in regular grid
    if (featuredPost && post.slug === featuredPost.slug) {
      return false
    }

    // Search filter
    if (searchQuery) {
      const searchText = [
        post.title,
        post.description,
        post.author,
        ...post.tags,
      ].join(' ').toLowerCase()
      
      if (!searchText.includes(searchQuery.toLowerCase())) {
        return false
      }
    }

    // Tag filter
    if (selectedTags.length > 0) {
      if (!selectedTags.some(tag => post.tags.includes(tag))) {
        return false
      }
    }

    return true
  })

  // Toggle tag filter
  const toggleTag = (tag: string) => {
    setSelectedTags(prev =>
      prev.includes(tag)
        ? prev.filter(t => t !== tag)
        : [...prev, tag]
    )
  }

  // Clear all filters
  const clearFilters = () => {
    setSearchQuery('')
    setSelectedTags([])
  }

  // Get active filter count
  const activeFilterCount = [
    searchQuery.length > 0,
    selectedTags.length > 0,
  ].filter(Boolean).length

  // Handle empty state
  if (!loading && filteredPosts.length === 0 && posts.length > 0) {
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
                    placeholder="Search articles..."
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
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
          <p className="text-gray-600 mb-4">
            Try adjusting your search or filters to find what you&apos;re looking for.
          </p>
          <Button onClick={clearFilters}>Clear Filters</Button>
        </div>
      </div>
    )
  }

  if (!loading && posts.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
          <Grid className="h-full w-full" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles available</h3>
        <p className="text-gray-600">
          Check back later for the latest camping tips and guides.
        </p>
      </div>
    )
  }

  return (
    <div className={cn('space-y-6', className)}>
      {/* Featured Post */}
      {featuredPost && !searchQuery && selectedTags.length === 0 && (
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Featured Article</h2>
          <BlogCard
            post={featuredPost}
            size="large"
            priority={true}
          />
        </div>
      )}

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
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>
            )}

            {/* Tag Filters */}
            {filterable && (
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Filter by Topics
                </label>
                <div className="flex flex-wrap gap-2">
                  {tags.map((tag) => (
                    <button
                      key={tag}
                      onClick={() => toggleTag(tag)}
                      className={cn(
                        'px-3 py-1 text-sm border rounded-md transition-colors',
                        selectedTags.includes(tag)
                          ? 'border-primary-500 bg-primary-50 text-primary-700'
                          : 'border-gray-300 hover:border-gray-400'
                      )}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Results count */}
          <div className="mt-4 pt-4 border-t border-gray-200">
            <span className="text-sm text-gray-600">
              {filteredPosts.length.toLocaleString()} article{filteredPosts.length !== 1 ? 's' : ''} found
            </span>
          </div>
        </Card>
      )}

      {/* Articles Grid */}
      {filteredPosts.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-gray-900">
              {featuredPost && !searchQuery && selectedTags.length === 0 ? 'More Articles' : 'Articles'}
            </h2>
          </div>

          <div className={cn(
            viewMode === 'grid'
              ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
              : 'space-y-4'
          )}>
            {filteredPosts.map((post, index) => (
              <BlogCard
                key={post.slug}
                post={post}
                priority={index < 6} // Priority loading for first 6 images
                size={viewMode === 'list' ? 'large' : 'medium'}
              />
            ))}
            
            {/* Loading skeletons */}
            {loading && (
              <>
                {Array.from({ length: 6 }).map((_, index) => (
                  <BlogCardSkeleton 
                    key={`skeleton-${index}`} 
                    size={viewMode === 'list' ? 'large' : 'medium'}
                  />
                ))}
              </>
            )}
          </div>
        </div>
      )}

      {/* Load More Button */}
      {hasMore && !loading && (
        <div className="text-center">
          <Button
            variant="outline"
            onClick={loadMore}
            className="px-8 py-3"
          >
            Load More Articles
          </Button>
        </div>
      )}

      {/* Loading indicator for load more */}
      {loading && filteredPosts.length > 0 && (
        <div className="text-center py-4">
          <div className="inline-flex items-center text-sm text-gray-600">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-primary-600 mr-2"></div>
            Loading more articles...
          </div>
        </div>
      )}
    </div>
  )
}