'use client'

import Link from 'next/link'
import Image from 'next/image'
import { Clock, User, Tag, ArrowRight } from 'lucide-react'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { BlogPost } from '@/types'
import { cn } from '@/lib/utils/cn'

interface BlogCardProps {
  post: BlogPost
  className?: string
  priority?: boolean // for image loading priority
  size?: 'small' | 'medium' | 'large'
}

/**
 * BlogCard component with SEO optimization and structured data
 * 
 * Args:
 *   post: Blog post data object
 *   className: Additional CSS classes
 *   priority: Whether to load image with priority
 *   size: Card size variant
 * 
 * Returns:
 *   JSX.Element: Blog card with proper SEO structure
 */
export default function BlogCard({
  post,
  className,
  priority = false,
  size = 'medium',
}: BlogCardProps) {
  const {
    slug,
    title,
    description,
    author,
    datePublished,
    featuredImage,
    tags,
    readingTime,
  } = post

  // Format date for display
  const formattedDate = new Date(datePublished).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Generate JSON-LD structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    image: featuredImage,
    datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Person',
      name: author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TentTracks',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tenttracks.com/images/logo.png',
      },
    },
    url: `https://tenttracks.com/blog/${slug}`,
    wordCount: post.content.split(' ').length,
    keywords: tags.join(', '),
  }

  // Size-based styling
  const sizeClasses = {
    small: {
      card: 'h-auto',
      image: 'h-32 md:h-40',
      title: 'text-base md:text-lg',
      description: 'text-sm',
      meta: 'text-xs',
    },
    medium: {
      card: 'h-auto',
      image: 'h-40 md:h-48',
      title: 'text-lg md:text-xl',
      description: 'text-sm',
      meta: 'text-xs',
    },
    large: {
      card: 'h-auto lg:flex-row',
      image: 'h-48 md:h-64 lg:h-auto lg:w-1/2',
      title: 'text-xl md:text-2xl',
      description: 'text-base',
      meta: 'text-sm',
    },
  }

  const styles = sizeClasses[size]

  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />

      <Card className={cn(
        'overflow-hidden hover:shadow-lg transition-shadow duration-300 group',
        styles.card,
        className
      )}>
        <Link href={`/blog/${slug}`} className="block h-full">
          {/* Image Section */}
          <div className={cn('relative overflow-hidden', styles.image)}>
            <Image
              src={featuredImage}
              alt={title}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority={priority}
              sizes={size === 'large' 
                ? '(max-width: 1024px) 100vw, 50vw'
                : '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
              }
            />
            
            {/* Reading Time Badge */}
            <Badge
              variant="secondary"
              className="absolute top-3 right-3 bg-white/90 text-gray-800"
            >
              <Clock className="h-3 w-3 mr-1" />
              {readingTime} min read
            </Badge>
          </div>

          {/* Content Section */}
          <div className={cn(
            'p-4 md:p-6 flex-1',
            size === 'large' && 'lg:flex lg:flex-col lg:justify-between'
          )}>
            {/* Tags */}
            <div className="flex flex-wrap gap-1 mb-3">
              {tags.slice(0, 2).map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  size="sm"
                  className="text-xs"
                >
                  <Tag className="h-3 w-3 mr-1" />
                  {tag}
                </Badge>
              ))}
              {tags.length > 2 && (
                <Badge variant="outline" size="sm" className="text-xs">
                  +{tags.length - 2} more
                </Badge>
              )}
            </div>

            {/* Title */}
            <h3 className={cn(
              'font-semibold text-gray-900 line-clamp-2 mb-3 group-hover:text-primary-600 transition-colors',
              styles.title
            )}>
              {title}
            </h3>

            {/* Description */}
            <p className={cn(
              'text-gray-600 line-clamp-3 mb-4',
              styles.description
            )}>
              {description}
            </p>

            {/* Meta Information */}
            <div className="flex items-center justify-between text-gray-500">
              <div className="flex items-center space-x-4">
                <div className={cn('flex items-center', styles.meta)}>
                  <User className="h-3 w-3 mr-1" />
                  <span>{author}</span>
                </div>
                <div className={cn('flex items-center', styles.meta)}>
                  <span>{formattedDate}</span>
                </div>
              </div>
              
              <div className="flex items-center text-primary-600 group-hover:text-primary-700 transition-colors">
                <span className={cn('font-medium mr-1', styles.meta)}>
                  Read more
                </span>
                <ArrowRight className="h-3 w-3 group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </Link>
      </Card>
    </>
  )
}

// Skeleton loader for blog cards
export function BlogCardSkeleton({ 
  size = 'medium', 
  className 
}: { 
  size?: 'small' | 'medium' | 'large'
  className?: string 
}) {
  const sizeClasses = {
    small: 'h-32 md:h-40',
    medium: 'h-40 md:h-48',
    large: 'h-48 md:h-64',
  }

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className={cn('bg-gray-200 animate-pulse', sizeClasses[size])} />
      <div className="p-4 md:p-6">
        <div className="flex gap-2 mb-3">
          <div className="h-5 bg-gray-200 rounded animate-pulse w-16" />
          <div className="h-5 bg-gray-200 rounded animate-pulse w-20" />
        </div>
        <div className="h-6 bg-gray-200 rounded animate-pulse mb-3" />
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2" />
        <div className="h-4 bg-gray-200 rounded animate-pulse mb-4 w-3/4" />
        <div className="flex justify-between items-center">
          <div className="flex space-x-4">
            <div className="h-3 bg-gray-200 rounded animate-pulse w-20" />
            <div className="h-3 bg-gray-200 rounded animate-pulse w-24" />
          </div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-16" />
        </div>
      </div>
    </Card>
  )
}