import { track } from '@vercel/analytics'
import type { AnalyticsEvent } from '@/types'

// Vercel Analytics wrapper with type safety
export function trackEvent(event: AnalyticsEvent) {
  // Track with Vercel Analytics
  track(event.event, {
    category: event.category,
    label: event.label || '',
    value: event.value || 0,
    ...event.customParameters,
  })

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log('Analytics Event:', event)
  }
}

// Predefined event trackers for common TentTracks actions
export const analytics = {
  // Campground interactions
  viewCampground: (campgroundId: string, campgroundName: string) =>
    trackEvent({
      event: 'view_campground',
      category: 'engagement',
      label: campgroundName,
      customParameters: { campground_id: campgroundId },
    }),

  searchCampgrounds: (query: string, resultsCount: number) =>
    trackEvent({
      event: 'search_campgrounds',
      category: 'search',
      label: query,
      value: resultsCount,
    }),

  // Affiliate link tracking
  clickAffiliateLink: (url: string, source: 'amazon' | 'cabelas', productTitle?: string) =>
    trackEvent({
      event: 'affiliate_click',
      category: 'monetization',
      label: source,
      customParameters: {
        affiliate_url: url,
        product_title: productTitle || '',
      },
    }),

  // Gear deals interactions
  viewGearDeals: (category: string) =>
    trackEvent({
      event: 'view_gear_deals',
      category: 'engagement',
      label: category,
    }),

  // User engagement
  shareContent: (contentType: 'campground' | 'blog' | 'gear', contentId: string) =>
    trackEvent({
      event: 'share_content',
      category: 'engagement',
      label: contentType,
      customParameters: { content_id: contentId },
    }),

  subscribeNewsletter: (source: string) =>
    trackEvent({
      event: 'newsletter_signup',
      category: 'conversion',
      label: source,
    }),

  // Navigation and UX
  useGeolocation: (granted: boolean) =>
    trackEvent({
      event: 'geolocation_permission',
      category: 'ux',
      label: granted ? 'granted' : 'denied',
    }),

  filterCampgrounds: (filterType: string, filterValue: string) =>
    trackEvent({
      event: 'filter_campgrounds',
      category: 'search',
      label: filterType,
      customParameters: { filter_value: filterValue },
    }),

  // Performance tracking
  pageLoadTime: (loadTime: number, page: string) =>
    trackEvent({
      event: 'page_performance',
      category: 'performance',
      label: page,
      value: Math.round(loadTime),
    }),

  // Error tracking
  trackError: (error: string, context: string) =>
    trackEvent({
      event: 'error',
      category: 'error',
      label: context,
      customParameters: { error_message: error },
    }),
}

// Utility to track page views with performance data
export function trackPageView(page: string, referrer?: string) {
  trackEvent({
    event: 'page_view',
    category: 'navigation',
    label: page,
    customParameters: {
      referrer: referrer || document.referrer,
      user_agent: navigator.userAgent,
      viewport_width: window.innerWidth,
      viewport_height: window.innerHeight,
    },
  })
}

// Track scroll depth for content engagement
export function initScrollTracking() {
  let maxScroll = 0
  const trackingPoints = [25, 50, 75, 90, 100]
  const tracked = new Set<number>()

  const handleScroll = () => {
    const scrollPercent = Math.round(
      (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) * 100
    )

    if (scrollPercent > maxScroll) {
      maxScroll = scrollPercent

      // Track milestone percentages
      trackingPoints.forEach((point) => {
        if (scrollPercent >= point && !tracked.has(point)) {
          tracked.add(point)
          trackEvent({
            event: 'scroll_depth',
            category: 'engagement',
            label: `${point}%`,
            value: point,
          })
        }
      })
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true })

  // Clean up
  return () => window.removeEventListener('scroll', handleScroll)
}