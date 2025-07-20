# Next-SEO Library Documentation and Patterns

## Installation
```bash
npm install next-seo
# or
yarn add next-seo
```

## Basic Configuration

### Per-Page SEO
```javascript
import { NextSeo } from 'next-seo';

const Page = () => (
  <>
    <NextSeo
      title="Page Title"
      description="Page description"
      canonical="https://www.canonical.url"
    />
    {/* Page content */}
  </>
);
```

### Global Default SEO (in `_app.js`)
```javascript
import { DefaultSeo } from 'next-seo';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <DefaultSeo
        openGraph={{
          type: 'website',
          locale: 'en_IE',
          url: 'https://www.site.com',
          siteName: 'SiteName'
        }}
      />
      <Component {...pageProps} />
    </>
  );
}
```

## Key Features
- Title templating
- Canonical URLs
- Open Graph metadata
- Twitter card configuration
- Robots meta tag control (index/noindex, follow/nofollow)
- JSON-LD structured data support

## Notable Patterns
- Can override global defaults on specific pages
- Supports multiple image/metadata configurations
- Works with both `pages` and `app` directory in Next.js

## Recommended Practices
- Always include title and description
- Use canonical URLs to prevent duplicate content
- Configure Open Graph for better social sharing
- Leverage JSON-LD for rich structured data

## TentTracks Specific Configuration
```javascript
// For campground pages
<NextSeo
  title={`${campground.name} - Campground Reviews | TentTracks`}
  description={`Read reviews and find deals for ${campground.name}. ${campground.description}`}
  canonical={`https://tenttracks.com/reviews/${campground.slug}`}
  openGraph={{
    type: 'article',
    url: `https://tenttracks.com/reviews/${campground.slug}`,
    title: campground.name,
    description: campground.description,
    images: [
      {
        url: campground.image,
        width: 1200,
        height: 630,
        alt: campground.name,
      },
    ],
  }}
/>
```

## JSON-LD Structured Data Example
```javascript
import { ArticleJsonLd } from 'next-seo';

<ArticleJsonLd
  url="https://tenttracks.com/blog/best-camping-gear"
  title="Best Camping Gear for 2024"
  images={['https://tenttracks.com/images/camping-gear.jpg']}
  datePublished="2024-01-15T08:00:00+08:00"
  dateModified="2024-01-15T09:00:00+08:00"
  authorName="TentTracks Team"
  publisherName="TentTracks"
  publisherLogo="https://tenttracks.com/logo.png"
  description="Comprehensive guide to the best camping gear for outdoor enthusiasts."
/>
```