// Cabela's affiliate link handling
export function isCabelasUrl(url: string): boolean {
  return /cabelas\.com/.test(url)
}

export function appendCabelasAffiliateTag(url: string): string {
  const cabelasTag = process.env.CABELAS_AFFILIATE_TAG
  
  if (!cabelasTag) {
    console.warn('Cabelas affiliate tag not configured')
    return url
  }

  if (!isCabelasUrl(url)) {
    return url
  }

  try {
    const urlObj = new URL(url)
    
    // Remove existing affiliate parameters
    urlObj.searchParams.delete('affiliate')
    urlObj.searchParams.delete('affcode')
    urlObj.searchParams.delete('sourceCode')
    
    // Add Cabela's affiliate parameter
    // Note: Cabela's uses different parameter names depending on their affiliate program
    urlObj.searchParams.set('affiliate', cabelasTag)
    
    return urlObj.toString()
  } catch (error) {
    console.error('Error processing Cabelas URL:', error)
    return url
  }
}

// Extract product information from Cabela's URLs
export function extractCabelasProductInfo(url: string): {
  productId?: string
  title?: string
  category?: string
} {
  try {
    const urlObj = new URL(url)
    const pathname = urlObj.pathname
    
    // Extract product ID from Cabela's URL structure
    const productMatch = pathname.match(/\/product\/([^\/]+)/)
    const productId = productMatch?.[1]
    
    // Extract title from URL path
    const pathParts = pathname.split('/')
    const title = pathParts[pathParts.length - 1]?.replace(/-/g, ' ')
    
    // Determine category from URL path
    let category = 'outdoor-gear'
    if (pathname.includes('/camping-')) category = 'camping'
    if (pathname.includes('/fishing-')) category = 'fishing'
    if (pathname.includes('/hunting-')) category = 'hunting'
    if (pathname.includes('/clothing-')) category = 'clothing'
    
    return {
      productId,
      title,
      category
    }
  } catch (error) {
    console.error('Error extracting Cabelas product info:', error)
    return {}
  }
}