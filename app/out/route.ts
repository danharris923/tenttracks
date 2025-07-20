import { NextRequest, NextResponse } from 'next/server'
import { validateExternalUrl, appendAffiliateTag, logAffiliateClick, getAffiliateSource } from '@/lib/affiliate/tracker'
import type { AffiliateClick } from '@/types'

export async function GET(request: NextRequest) {
  const startTime = Date.now()
  
  try {
    // Extract target URL from query parameters
    const { searchParams } = new URL(request.url)
    const targetUrl = searchParams.get('url')
    
    if (!targetUrl) {
      return new NextResponse('Missing URL parameter', { 
        status: 400,
        headers: {
          'Content-Type': 'text/plain',
        }
      })
    }
    
    // Validate URL safety (prevent open redirects)
    let validatedUrl: string
    try {
      validatedUrl = validateExternalUrl(targetUrl)
    } catch (error) {
      console.error('URL validation failed:', error)
      return new NextResponse('Invalid URL provided', { 
        status: 400,
        headers: {
          'Content-Type': 'text/plain',
        }
      })
    }
    
    // Append affiliate tags based on domain
    const affiliateUrl = appendAffiliateTag(validatedUrl)
    
    // Prepare click tracking data
    const clickData: AffiliateClick = {
      timestamp: new Date().toISOString(),
      originalUrl: targetUrl,
      finalUrl: affiliateUrl,
      userAgent: request.headers.get('user-agent') || '',
      referrer: request.headers.get('referer') || '',
      geoLocation: request.geo?.country || undefined,
    }
    
    // Log click event for analytics (non-blocking)
    logAffiliateClick(clickData).catch(error => {
      console.error('Failed to log affiliate click:', error)
    })
    
    // Add security headers for external redirects
    const headers = new Headers()
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate')
    headers.set('Pragma', 'no-cache')
    headers.set('Expires', '0')
    
    // Add referrer policy for affiliate links
    const source = getAffiliateSource(affiliateUrl)
    if (source === 'amazon' || source === 'cabelas') {
      headers.set('Referrer-Policy', 'origin')
    }
    
    // Performance monitoring
    const processingTime = Date.now() - startTime
    if (process.env.NODE_ENV === 'development') {
      console.log(`Affiliate redirect processed in ${processingTime}ms`)
    }
    
    // Redirect with 302 status (temporary redirect for tracking)
    return NextResponse.redirect(affiliateUrl, {
      status: 302,
      headers,
    })
    
  } catch (error) {
    console.error('Affiliate redirect error:', error)
    
    // Fallback: Try to redirect to original URL if possible
    const { searchParams } = new URL(request.url)
    const fallbackUrl = searchParams.get('url')
    
    if (fallbackUrl) {
      try {
        // Basic validation for fallback
        new URL(fallbackUrl)
        if (fallbackUrl.startsWith('https://')) {
          return NextResponse.redirect(fallbackUrl, { status: 302 })
        }
      } catch (fallbackError) {
        console.error('Fallback redirect also failed:', fallbackError)
      }
    }
    
    // Last resort: redirect to home page
    const homeUrl = new URL('/', request.url)
    return NextResponse.redirect(homeUrl.toString(), { status: 302 })
  }
}

// Handle preflight requests
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}

// Prevent other HTTP methods
export async function POST() {
  return new NextResponse('Method not allowed', { status: 405 })
}

export async function PUT() {
  return new NextResponse('Method not allowed', { status: 405 })
}

export async function DELETE() {
  return new NextResponse('Method not allowed', { status: 405 })
}