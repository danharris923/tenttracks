'use client'

import { useEffect } from 'react'
import { onCLS, onINP, onLCP, onFCP, onTTFB, Metric } from 'web-vitals'

// Analytics endpoint for sending Core Web Vitals data
async function sendToAnalytics(metric: Metric) {
  const body = JSON.stringify({
    name: metric.name,
    value: metric.value,
    rating: metric.rating,
    delta: metric.delta,
    id: metric.id,
    url: window.location.href,
    userAgent: navigator.userAgent,
    timestamp: Date.now(),
  })

  // Use sendBeacon if available, fallback to fetch
  if (navigator.sendBeacon) {
    navigator.sendBeacon('/api/analytics/web-vitals', body)
  } else {
    try {
      await fetch('/api/analytics/web-vitals', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body,
        keepalive: true,
      })
    } catch (error) {
      console.warn('Failed to send Core Web Vitals:', error)
    }
  }

  // Log to console in development
  if (process.env.NODE_ENV === 'development') {
    console.log(`${metric.name}:`, {
      value: metric.value,
      rating: metric.rating,
      target: getTarget(metric.name),
      status: metric.value <= getTarget(metric.name) ? '✅ Good' : '❌ Needs improvement',
    })
  }
}

// Get performance targets for each metric
function getTarget(metricName: string): number {
  switch (metricName) {
    case 'LCP':
      return 2500 // 2.5 seconds
    case 'INP':
      return 200 // 200 milliseconds
    case 'CLS':
      return 0.1 // 0.1 layout shift score
    case 'FCP':
      return 1800 // 1.8 seconds
    case 'TTFB':
      return 800 // 800 milliseconds
    default:
      return 0
  }
}

export default function WebVitalsTracker() {
  useEffect(() => {
    // Track Core Web Vitals
    onCLS(sendToAnalytics)
    onINP(sendToAnalytics)
    onLCP(sendToAnalytics)
    onFCP(sendToAnalytics)
    onTTFB(sendToAnalytics)

    // Track additional performance metrics
    if ('performance' in window) {
      // Track page load time
      window.addEventListener('load', () => {
        const loadTime = performance.now()
        if (process.env.NODE_ENV === 'development') {
          console.log('Page Load Time:', `${Math.round(loadTime)}ms`)
        }
      })

      // Track navigation timing
      const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming
      if (navigation) {
        const ttfb = navigation.responseStart - navigation.requestStart
        const domComplete = navigation.domContentLoadedEventEnd - navigation.fetchStart
        
        if (process.env.NODE_ENV === 'development') {
          console.log('Navigation Timing:', {
            TTFB: `${Math.round(ttfb)}ms`,
            'DOM Complete': `${Math.round(domComplete)}ms`,
          })
        }
      }
    }

    // Track resource loading errors
    const handleResourceError = (event: ErrorEvent) => {
      if (process.env.NODE_ENV === 'development') {
        console.warn('Resource loading error:', event.filename, event.message)
      }
    }

    window.addEventListener('error', handleResourceError)

    return () => {
      window.removeEventListener('error', handleResourceError)
    }
  }, [])

  return null // This component doesn't render anything
}

// Utility function to get current Core Web Vitals scores
export async function getCurrentWebVitals(): Promise<Record<string, number>> {
  return new Promise((resolve) => {
    const vitals: Record<string, number> = {}
    let collected = 0
    const expected = 5 // LCP, INP, CLS, FCP, TTFB

    const onMetric = (metric: Metric) => {
      vitals[metric.name] = metric.value
      collected++
      if (collected >= expected) {
        resolve(vitals)
      }
    }

    onCLS(onMetric)
    onINP(onMetric)
    onLCP(onMetric)
    onFCP(onMetric)
    onTTFB(onMetric)

    // Timeout after 10 seconds
    setTimeout(() => resolve(vitals), 10000)
  })
}