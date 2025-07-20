import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, User, Calendar, Tag, ArrowLeft, Share2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import BlogCard from '@/components/blog/blog-card'
import { getBlogPostBySlug, getRelatedPosts, blogData } from '@/lib/data/blog'

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Generate metadata for SEO
export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    return {
      title: 'Post Not Found',
    }
  }

  return {
    title: `${post.title} | TentTracks Blog`,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      url: `https://tenttracks.com/blog/${post.slug}`,
      type: 'article',
      publishedTime: post.datePublished,
      modifiedTime: post.dateModified,
      authors: [post.author],
      images: [
        {
          url: post.featuredImage,
          width: 800,
          height: 600,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.featuredImage],
    },
    alternates: {
      canonical: `https://tenttracks.com/blog/${post.slug}`,
    },
  }
}

// Generate static paths for all blog posts
export async function generateStaticParams() {
  return blogData.map((post) => ({
    slug: post.slug,
  }))
}

export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const relatedPosts = getRelatedPosts(post)
  
  // Format date for display
  const formattedDate = new Date(post.datePublished).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  })

  // Generate JSON-LD structured data for SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: post.title,
    description: post.description,
    image: post.featuredImage,
    datePublished: post.datePublished,
    dateModified: post.dateModified,
    author: {
      '@type': 'Person',
      name: post.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'TentTracks',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tenttracks.com/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://tenttracks.com/blog/${post.slug}`,
    },
    url: `https://tenttracks.com/blog/${post.slug}`,
    wordCount: post.content.split(' ').length,
    keywords: post.tags.join(', '),
    articleSection: 'Camping',
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: 'https://tenttracks.com',
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Blog',
          item: 'https://tenttracks.com/blog',
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: post.title,
          item: `https://tenttracks.com/blog/${post.slug}`,
        },
      ],
    },
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

      <article className="min-h-screen">
        {/* Breadcrumbs & Back Button */}
        <section className="bg-gray-50 py-6">
          <div className="container">
            <div className="flex items-center justify-between">
              <Button variant="ghost" asChild>
                <Link href="/blog" className="flex items-center">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Blog
                </Link>
              </Button>
              
              <Button variant="ghost" size="sm">
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
            </div>
          </div>
        </section>

        {/* Article Header */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              {/* Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline">
                    <Tag className="h-3 w-3 mr-1" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                {post.title}
              </h1>

              {/* Meta Information */}
              <div className="flex flex-wrap items-center gap-6 text-gray-600 mb-8">
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2" />
                  <span>{post.author}</span>
                </div>
                
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{formattedDate}</span>
                </div>
                
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-2" />
                  <span>{post.readingTime} min read</span>
                </div>
              </div>

              {/* Featured Image */}
              <div className="relative h-64 md:h-96 rounded-lg overflow-hidden mb-8">
                <Image
                  src={post.featuredImage}
                  alt={post.title}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 800px"
                />
              </div>

              {/* Article Description */}
              <div className="text-xl text-gray-600 leading-relaxed mb-8 border-l-4 border-primary-500 pl-6">
                {post.description}
              </div>
            </div>
          </div>
        </section>

        {/* Article Content */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div 
                className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-headings:font-bold prose-p:text-gray-700 prose-p:leading-relaxed prose-a:text-primary-600 prose-a:no-underline hover:prose-a:underline prose-strong:text-gray-900 prose-ul:text-gray-700 prose-ol:text-gray-700"
                dangerouslySetInnerHTML={{ __html: post.content.replace(/\n/g, '<br />') }}
              />
            </div>
          </div>
        </section>

        {/* Author Bio Section */}
        <section className="bg-gray-50 section-padding">
          <div className="container">
            <div className="mx-auto max-w-4xl">
              <div className="bg-white rounded-lg p-6 md:p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">About the Author</h3>
                <div className="flex items-start space-x-4">
                  <div className="w-16 h-16 bg-primary-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-8 w-8 text-primary-600" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{post.author}</h4>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      Passionate outdoor enthusiast and camping expert with years of experience 
                      exploring the great outdoors. Dedicated to sharing knowledge and helping 
                      others discover the joy of camping and outdoor adventures.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Posts Section */}
        {relatedPosts.length > 0 && (
          <section className="section-padding bg-white">
            <div className="container">
              <div className="mx-auto max-w-4xl">
                <h3 className="text-2xl font-bold text-gray-900 mb-8">Related Articles</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {relatedPosts.map((relatedPost) => (
                    <BlogCard
                      key={relatedPost.slug}
                      post={relatedPost}
                      size="small"
                    />
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="bg-primary-50 section-padding">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Ready for Your Next Adventure?
              </h3>
              <p className="text-gray-600 mb-8">
                Find amazing campgrounds and great gear deals to make your next camping trip unforgettable.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link href="/destinations">Find Campgrounds</Link>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <Link href="/gear-deals">Shop Gear Deals</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </article>
    </>
  )
}