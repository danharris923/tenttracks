import type { Metadata } from 'next'
import { Rss, TrendingUp, BookOpen } from 'lucide-react'
import BlogGrid from '@/components/blog/blog-grid'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { blogData, getFeaturedPosts, getAllTags } from '@/lib/data/blog'

export const metadata: Metadata = {
  title: 'Camping Blog - Tips, Guides & Adventure Stories | TentTracks',
  description: 'Discover camping tips, gear guides, destination reviews, and outdoor adventure stories. Expert advice for beginners and experienced campers.',
  openGraph: {
    title: 'Camping Blog - Tips, Guides & Adventure Stories | TentTracks',
    description: 'Discover camping tips, gear guides, destination reviews, and outdoor adventure stories. Expert advice for beginners and experienced campers.',
    url: 'https://tenttracks.com/blog',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tenttracks.com/blog',
  },
}

export default async function BlogPage() {
  const featuredPosts = getFeaturedPosts(1)
  const featuredPost = featuredPosts[0]
  const allTags = getAllTags()

  // Generate JSON-LD structured data for the blog page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    name: 'TentTracks Camping Blog',
    description: 'Camping tips, gear guides, and outdoor adventure stories',
    url: 'https://tenttracks.com/blog',
    author: {
      '@type': 'Organization',
      name: 'TentTracks',
    },
    publisher: {
      '@type': 'Organization',
      name: 'TentTracks',
      logo: {
        '@type': 'ImageObject',
        url: 'https://tenttracks.com/images/logo.png',
      },
    },
    blogPost: blogData.slice(0, 10).map((post) => ({
      '@type': 'BlogPosting',
      headline: post.title,
      description: post.description,
      datePublished: post.datePublished,
      dateModified: post.dateModified,
      author: {
        '@type': 'Person',
        name: post.author,
      },
      url: `https://tenttracks.com/blog/${post.slug}`,
    })),
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

      <div className="min-h-screen">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-primary-600 to-primary-800 py-16 lg:py-24">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <h1 className="text-4xl font-bold tracking-tight text-white sm:text-6xl">
                Camping Blog &
                <span className="text-primary-200"> Guides</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-primary-100 sm:text-xl">
                Expert tips, gear reviews, destination guides, and outdoor adventure stories 
                to help you make the most of your camping experiences.
              </p>
              
              {/* Quick Stats */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{blogData.length}+</div>
                  <div className="text-primary-200">Articles</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{allTags.length}</div>
                  <div className="text-primary-200">Topics</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">Weekly</div>
                  <div className="text-primary-200">Updates</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="mt-10 flex items-center justify-center gap-x-6">
                <Button variant="secondary" size="lg">
                  <Rss className="h-5 w-5 mr-2" />
                  Subscribe to RSS
                </Button>
                <Button variant="ghost" size="lg" className="text-white hover:text-primary-200">
                  <BookOpen className="h-5 w-5 mr-2" />
                  Browse Categories
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Popular Topics Section */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="heading-2 flex items-center">
                  <TrendingUp className="h-8 w-8 text-primary-600 mr-3" />
                  Popular Topics
                </h2>
                <p className="mt-2 text-gray-600">
                  Explore our most popular camping topics and guides
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
              {allTags.map((tag) => (
                <Badge
                  key={tag}
                  variant="outline"
                  className="justify-center py-2 px-4 hover:bg-primary-50 hover:border-primary-500 hover:text-primary-700 cursor-pointer transition-colors"
                >
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </section>

        {/* Blog Grid Section */}
        <section className="section-padding bg-gray-50">
          <div className="container">
            <BlogGrid
              posts={blogData}
              tags={allTags}
              searchable={true}
              filterable={true}
              featuredPost={featuredPost}
            />
          </div>
        </section>

        {/* Newsletter Signup Section */}
        <section className="bg-primary-50 section-padding">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="heading-2">Stay Updated</h2>
              <p className="mt-6 body-large">
                Get the latest camping tips, gear reviews, and destination guides 
                delivered to your inbox weekly.
              </p>
              <div className="mt-10 flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="flex-1 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                />
                <Button size="lg" className="px-8">
                  Subscribe
                </Button>
              </div>
              <p className="mt-4 text-sm text-gray-600">
                No spam, unsubscribe anytime. We respect your privacy.
              </p>
            </div>
          </div>
        </section>

        {/* Related Links Section */}
        <section className="bg-white section-padding">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <h2 className="heading-2 mb-8">Explore More</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Find Campgrounds
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Discover amazing campgrounds across North America with our comprehensive database.
                  </p>
                  <Button variant="outline" asChild>
                    <a href="/destinations">Browse Campgrounds</a>
                  </Button>
                </div>
                
                <div className="text-center">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Shop Gear Deals
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Find the best deals on camping gear from trusted retailers.
                  </p>
                  <Button variant="outline" asChild>
                    <a href="/gear-deals">Shop Gear</a>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}