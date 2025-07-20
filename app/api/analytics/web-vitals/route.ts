import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const vitalsData = await request.json()
    
    // Log Core Web Vitals data (in production, send to analytics service)
    console.log('Core Web Vitals:', {
      name: vitalsData.name,
      value: vitalsData.value,
      rating: vitalsData.rating,
      url: vitalsData.url,
      timestamp: new Date(vitalsData.timestamp).toISOString(),
    })

    // In production, you might want to:
    // 1. Send to Google Analytics
    // 2. Store in database
    // 3. Send to monitoring service like DataDog, New Relic, etc.
    
    // Example: Send to external analytics service
    if (process.env.NODE_ENV === 'production') {
      // await sendToAnalyticsService(vitalsData)
    }

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error('Error processing Web Vitals data:', error)
    return NextResponse.json(
      { error: 'Failed to process analytics data' },
      { status: 500 }
    )
  }
}

// Optional: Handle CORS for external analytics calls
export async function OPTIONS() {
  return new NextResponse(null, {
    status: 200,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    },
  })
}