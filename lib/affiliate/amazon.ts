// Amazon affiliate link handling
export function isAmazonUrl(url: string): boolean {
  return /amazon\.(com|ca|co\.uk|de|fr|it|es|in|com\.au|co\.jp)/.test(url)
}

export function appendAmazonAffiliateTag(url: string): string {
  const amazonTag = process.env.AMAZON_AFFILIATE_TAG
  
  if (!amazonTag) {
    console.warn('Amazon affiliate tag not configured')
    return url
  }

  if (!isAmazonUrl(url)) {
    return url
  }

  try {
    const urlObj = new URL(url)
    
    // Remove existing affiliate tags to avoid conflicts
    urlObj.searchParams.delete('tag')
    urlObj.searchParams.delete('linkCode')
    urlObj.searchParams.delete('camp')
    urlObj.searchParams.delete('creative')
    
    // Add our affiliate tag
    urlObj.searchParams.set('tag', amazonTag)
    
    // Add standard Amazon affiliate parameters
    urlObj.searchParams.set('linkCode', 'as2')
    urlObj.searchParams.set('camp', '1789')
    urlObj.searchParams.set('creative', '9325')
    
    return urlObj.toString()
  } catch (error) {
    console.error('Error processing Amazon URL:', error)
    return url
  }
}

// Extract product information from Amazon URLs
export function extractAmazonProductInfo(url: string): {
  asin?: string
  title?: string
  category?: string
} {
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    
    // Extract ASIN from various Amazon URL formats
    const asinMatch = pathname.match(/\/(?:dp|gp\/product|exec\/obidos\/ASIN)\/([A-Z0-9]{10})/)
    const asin = asinMatch?.[1]
    
    // Extract title from URL if present
    const titleMatch = pathname.match(/\/([^\/]+)\/dp\//)
    const title = titleMatch?.[1]?.replace(/-/g, ' ')
    
    return {
      asin,
      title,
      category: 'amazon-product'
    }
  } catch (error) {
    console.error('Error extracting Amazon product info:', error)
    return {}
  }
}