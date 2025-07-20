import type { Metadata } from 'next'
import Link from 'next/link'
import { Percent, Star, TrendingUp, Zap } from 'lucide-react'
import GearGrid from '@/components/gear/gear-grid'
import GearCard from '@/components/gear/gear-card'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { gearData, getFeaturedGear, getGearOnSale, getUniqueCategories } from '@/lib/data/gear'

export const metadata: Metadata = {
  title: 'Best Camping Gear Deals & Discounts | TentTracks',
  description: 'Find the best camping gear deals from Amazon and Cabela&apos;s. Save money on tents, sleeping bags, backpacks, and more outdoor equipment.',
  openGraph: {
    title: 'Best Camping Gear Deals & Discounts | TentTracks',
    description: 'Find the best camping gear deals from Amazon and Cabela&apos;s. Save money on tents, sleeping bags, backpacks, and more outdoor equipment.',
    url: 'https://tenttracks.com/gear-deals',
    type: 'website',
  },
  alternates: {
    canonical: 'https://tenttracks.com/gear-deals',
  },
}

export default async function GearDealsPage() {
  const featuredGear = getFeaturedGear(6)
  const saleGear = getGearOnSale()
  const categories = getUniqueCategories()

  // Generate JSON-LD structured data for the page
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Camping Gear Deals',
    description: 'Find the best camping gear deals from top retailers',
    url: 'https://tenttracks.com/gear-deals',
    mainEntity: {
      '@type': 'ItemList',
      numberOfItems: gearData.length,
      itemListElement: gearData.slice(0, 10).map((gear, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'Product',
          name: gear.title,
          description: gear.description,
          image: gear.image,
          offers: {
            '@type': 'Offer',
            price: gear.price.replace('$', '').replace(',', ''),
            priceCurrency: 'USD',
            availability: 'https://schema.org/InStock',
          },
        },
      })),
    },
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
          name: 'Gear Deals',
          item: 'https://tenttracks.com/gear-deals',
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
                Best Camping Gear
                <span className="text-primary-200"> Deals</span>
              </h1>
              <p className="mt-6 text-lg leading-8 text-primary-100 sm:text-xl">
                Save money on top-quality camping gear from trusted retailers. 
                Find deals on tents, sleeping bags, backpacks, and more outdoor equipment.
              </p>
              
              {/* Quick Stats */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-2xl mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{gearData.length}+</div>
                  <div className="text-primary-200">Gear Items</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{saleGear.length}+</div>
                  <div className="text-primary-200">On Sale</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white">{categories.length}</div>
                  <div className="text-primary-200">Categories</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Featured Deals Section */}
        {saleGear.length > 0 && (
          <section className="section-padding bg-red-50">
            <div className="container">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <h2 className="heading-2 flex items-center">
                    <Percent className="h-8 w-8 text-red-600 mr-3" />
                    Hot Deals
                  </h2>
                  <p className="mt-2 text-gray-600">
                    Limited-time offers and discounts on camping gear
                  </p>
                </div>
                <Badge variant="secondary" className="bg-red-100 text-red-800">
                  <TrendingUp className="h-4 w-4 mr-1" />
                  Save Big
                </Badge>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {saleGear.slice(0, 6).map((gear, index) => (
                  <div key={gear.id}>
                    <GearCard
                      gear={gear}
                      priority={index < 3}
                      showCategory={true}
                    />
                  </div>
                ))}
              </div>

              {saleGear.length > 6 && (
                <div className="text-center">
                  <Button variant="outline" size="lg">
                    View All Sale Items ({saleGear.length})
                  </Button>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Categories Section */}
        <section className="section-padding bg-white">
          <div className="container">
            <h2 className="heading-2 text-center mb-8">Shop by Category</h2>
            
            <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mb-8">
              {categories.map((category) => (
                <Link
                  key={category}
                  href={`/gear-deals?category=${encodeURIComponent(category)}`}
                  className="group"
                >
                  <Card className="p-6 text-center hover:shadow-lg transition-shadow duration-300">
                    <div className="h-12 w-12 bg-primary-100 rounded-lg flex items-center justify-center mx-auto mb-3 group-hover:bg-primary-200 transition-colors">
                      <Zap className="h-6 w-6 text-primary-600" />
                    </div>
                    <h3 className="font-medium text-gray-900 text-sm">{category}</h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {gearData.filter(item => item.category === category).length} items
                    </p>
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Featured Gear Section */}
        <section className="section-padding bg-gray-50">
          <div className="container">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="heading-2 flex items-center">
                  <Star className="h-8 w-8 text-yellow-500 mr-3" />
                  Top Rated Gear
                </h2>
                <p className="mt-2 text-gray-600">
                  Highest rated camping gear based on customer reviews
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredGear.map((gear, index) => (
                <div key={gear.id}>
                  <GearCard
                    gear={gear}
                    priority={index < 3}
                    showCategory={true}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* All Gear Section */}
        <section className="section-padding bg-white">
          <div className="container">
            <div className="mb-8">
              <h2 className="heading-2">All Camping Gear</h2>
              <p className="mt-2 text-gray-600">
                Browse our complete collection of camping equipment and outdoor gear
              </p>
            </div>

            <GearGrid
              gear={gearData}
              categories={categories}
              searchable={true}
              filterable={true}
            />
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-primary-50 section-padding">
          <div className="container">
            <div className="mx-auto max-w-2xl text-center">
              <h2 className="heading-2">Find Your Perfect Campground</h2>
              <p className="mt-6 body-large">
                Now that you have the gear, discover amazing campgrounds to put it to use.
              </p>
              <div className="mt-10">
                <Button size="lg" asChild>
                  <Link href="/destinations">
                    Explore Campgrounds
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Affiliate Disclosure */}
        <section className="bg-gray-100 py-8">
          <div className="container">
            <div className="mx-auto max-w-4xl text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                FTC Disclosure: Affiliate Links
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                TentTracks participates in affiliate programs with Amazon and Cabela&apos;s. 
                When you click on links to products and make a purchase, we may earn a commission 
                at no additional cost to you. This helps support our site and allows us to continue 
                providing valuable camping information and deals.
              </p>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}