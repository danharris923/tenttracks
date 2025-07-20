# Next.js Core Features Documentation

## App Router
- Newer routing system supporting modern React features
- Enables Server Components and advanced routing patterns
- Key features include:
  - Parallel Routes
  - Intercepting Routes
  - Dynamic Route Segments
  - Loading and Error UI

## Rendering Strategies

### Static Site Generation (SSG)
- Generate static HTML at build time
- Improves performance and SEO
- Use `generateStaticParams()` for dynamic routes

### Incremental Static Regeneration (ISR)
- Allows updating static content without full rebuild
- Supports "stale-while-revalidate" caching strategy

## Metadata API
- Enhance SEO and web shareability
- Use `generateMetadata()` function
- Support for:
  - Open Graph images
  - Twitter cards
  - Favicon and app icons
  - Sitemap generation

## API Routes
- Create custom request handlers
- Support both Edge and Node.js runtimes
- Handle server-side logic and data mutations

## Deployment Best Practices
- Static exports option
- Support for various hosting platforms
- Optimizations:
  - Image optimization
  - Font loading
  - Script management

## SEO Optimization Techniques
- Server-side rendering
- Metadata configuration
- Static generation
- Performance optimizations

## Example Metadata Configuration
```javascript
export async function generateMetadata() {
  return {
    title: 'My Next.js Page',
    description: 'Optimized page with great SEO'
  }
}
```

## Key Recommendation
Leverage Next.js's built-in features for performance, SEO, and developer experience.