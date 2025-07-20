import { appendAmazonAffiliateTag, isAmazonUrl, extractAmazonProductInfo } from './amazon'
import { appendCabelasAffiliateTag, isCabelasUrl, extractCabelasProductInfo } from './cabelas'
import type { AffiliateClick } from '@/types'

// Validate URL safety to prevent open redirects
export function validateExternalUrl(url: string): string {
  try {
    const urlObj = new URL(url)
    
    // Allow only HTTPS URLs for security
    if (urlObj.protocol !== 'https:') {
      throw new Error('Only HTTPS URLs are allowed')
    }
    
    // Block internal/localhost URLs to prevent open redirects
    const hostname = urlObj.hostname.toLowerCase()
    if (
      hostname === 'localhost' ||
      hostname.startsWith('127.') ||
      hostname.startsWith('192.168.') ||
      hostname.startsWith('10.') ||
      hostname.includes('internal') ||
      hostname === '0.0.0.0'
    ) {
      throw new Error('Internal URLs are not allowed')
    }
    
    return url
  } catch (error) {
    console.error('URL validation failed:', error)
    throw new Error('Invalid URL provided')
  }
}

// Main function to append affiliate tags based on URL domain
export function appendAffiliateTag(url: string): string {
  // Validate URL first
  const validatedUrl = validateExternalUrl(url)
  
  if (isAmazonUrl(validatedUrl)) {
    return appendAmazonAffiliateTag(validatedUrl)
  }
  
  if (isCabelasUrl(validatedUrl)) {
    return appendCabelasAffiliateTag(validatedUrl)
  }
  
  // Return original URL if no affiliate program is configured
  return validatedUrl
}

// Log affiliate click for analytics
export async function logAffiliateClick(clickData: AffiliateClick): Promise<void> {
  try {
    // Extract product information based on URL
    let productInfo = {}
    let source: 'amazon' | 'cabelas' | 'unknown' = 'unknown'
    
    if (isAmazonUrl(clickData.originalUrl)) {
      productInfo = extractAmazonProductInfo(clickData.originalUrl)
      source = 'amazon'
    } else if (isCabelasUrl(clickData.originalUrl)) {
      productInfo = extractCabelasProductInfo(clickData.originalUrl)
      source = 'cabelas'
    }
    
    const enrichedClickData = {
      ...clickData,
      source,
      productInfo,
      timestamp: new Date().toISOString()
    }
    
    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.log('Affiliate Click:', enrichedClickData)
    }
    
    // In production, you might want to:
    // 1. Send to analytics service
    // 2. Store in database
    // 3. Send to affiliate network for tracking
    
    // Example: Store in database or send to external service
    if (process.env.NODE_ENV === 'production') {
      // await storeClickInDatabase(enrichedClickData)
      // await sendToAnalyticsService(enrichedClickData)
    }
    
  } catch (error) {
    console.error('Error logging affiliate click:', error)
    // Don't throw error to avoid breaking the redirect flow
  }
}

// Get affiliate source from URL
export function getAffiliateSource(url: string): 'amazon' | 'cabelas' | 'unknown' {
  if (isAmazonUrl(url)) return 'amazon'
  if (isCabelasUrl(url)) return 'cabelas'
  return 'unknown'
}

// Generate affiliate link with tracking
export function generateAffiliateLink(originalUrl: string, trackingParams?: Record<string, string>): string {
  try {
    let affiliateUrl = appendAffiliateTag(originalUrl)
    
    // Add custom tracking parameters if provided
    if (trackingParams) {
      const urlObj = new URL(affiliateUrl)
      Object.entries(trackingParams).forEach(([key, value]) => {
        urlObj.searchParams.set(key, value)
      })
      affiliateUrl = urlObj.toString()
    }
    
    // Return the redirect URL through our /out handler
    const redirectUrl = new URL('/out', process.env.NEXT_PUBLIC_SITE_URL || 'https://tenttracks.com')
    redirectUrl.searchParams.set('url', affiliateUrl)
    
    return redirectUrl.toString()
  } catch (error) {
    console.error('Error generating affiliate link:', error)
    return originalUrl // Fallback to original URL
  }
}

// Utility to check if a URL is already an affiliate link
export function isAffiliateLink(url: string): boolean {
  try {
    const urlObj = new URL(url)
    
    // Check for Amazon affiliate parameters
    if (isAmazonUrl(url) && urlObj.searchParams.has('tag')) {
      return true
    }
    
    // Check for Cabela's affiliate parameters
    if (isCabelasUrl(url) && urlObj.searchParams.has('affiliate')) {
      return true
    }
    
    return false
  } catch (error) {
    return false
  }
}