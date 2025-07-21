import type { GeolocationData } from '@/types'
import { analytics } from '@/lib/utils/analytics'

export interface GeolocationOptions {
  enableHighAccuracy?: boolean
  timeout?: number
  maximumAge?: number
}

export interface GeolocationError {
  code: number
  message: string
  type: 'permission_denied' | 'position_unavailable' | 'timeout' | 'not_supported'
}

// Get user's current location
export async function getCurrentLocation(
  options: GeolocationOptions = {}
): Promise<GeolocationData> {
  const defaultOptions: PositionOptions = {
    enableHighAccuracy: true,
    timeout: 10000,
    maximumAge: 300000, // 5 minutes
    ...options,
  }

  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      const error: GeolocationError = {
        code: 0,
        message: 'Geolocation is not supported by this browser',
        type: 'not_supported',
      }
      reject(error)
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const locationData: GeolocationData = {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          accuracy: position.coords.accuracy,
        }

        // Track successful geolocation
        analytics.useGeolocation(true)

        resolve(locationData)
      },
      (error) => {
        let errorType: GeolocationError['type']
        let errorMessage: string

        switch (error.code) {
          case error.PERMISSION_DENIED:
            errorType = 'permission_denied'
            errorMessage = 'User denied the request for geolocation'
            break
          case error.POSITION_UNAVAILABLE:
            errorType = 'position_unavailable'
            errorMessage = 'Location information is unavailable'
            break
          case error.TIMEOUT:
            errorType = 'timeout'
            errorMessage = 'The request to get user location timed out'
            break
          default:
            errorType = 'position_unavailable'
            errorMessage = 'An unknown error occurred'
            break
        }

        // Track failed geolocation
        analytics.useGeolocation(false)

        const geolocationError: GeolocationError = {
          code: error.code,
          message: errorMessage,
          type: errorType,
        }

        reject(geolocationError)
      },
      defaultOptions
    )
  })
}

// Calculate distance between two points using Haversine formula
export function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number,
  unit: 'km' | 'mi' = 'km'
): number {
  const R = unit === 'km' ? 6371 : 3958.8 // Earth's radius in km or miles
  const dLat = ((lat2 - lat1) * Math.PI) / 180
  const dLon = ((lon2 - lon1) * Math.PI) / 180
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  return R * c // Distance in km or miles
}

// Get user's location with fallback to IP-based location
export async function getLocationWithFallback(): Promise<GeolocationData | null> {
  try {
    // Try precise geolocation first
    const location = await getCurrentLocation()
    return location
  } catch (error) {
    console.log('Precise geolocation failed, trying IP-based location')
    
    try {
      // Fallback to IP-based location
      const ipLocation = await getIPBasedLocation()
      return ipLocation
    } catch (ipError) {
      console.warn('All location methods failed:', ipError)
      return null
    }
  }
}

// Get approximate location based on IP address
async function getIPBasedLocation(): Promise<GeolocationData> {
  try {
    const response = await fetch('https://ipapi.co/json/')
    const data = await response.json()

    if (data.latitude && data.longitude) {
      return {
        latitude: parseFloat(data.latitude),
        longitude: parseFloat(data.longitude),
        accuracy: 10000, // IP-based location is less accurate
      }
    }

    throw new Error('Invalid IP location data')
  } catch (error) {
    throw new Error('Failed to get IP-based location')
  }
}

// Check if user is in North America (primary TentTracks region)
export function isInNorthAmerica(latitude: number, longitude: number): boolean {
  // Approximate bounds for North America
  const bounds = {
    north: 83.0, // Northern Canada
    south: 14.0, // Southern Mexico/Central America
    west: -180.0, // Alaska
    east: -50.0, // Eastern Canada
  }

  return (
    latitude >= bounds.south &&
    latitude <= bounds.north &&
    longitude >= bounds.west &&
    longitude <= bounds.east
  )
}

// Get nearby campgrounds based on location
export function findNearbyCampgrounds<T extends { location: { coordinates: { lat: number; lng: number } } }>(
  userLocation: GeolocationData,
  campgrounds: T[],
  maxDistance: number = 160, // kilometers (100 miles equivalent)
  unit: 'km' | 'mi' = 'km'
): Array<T & { distance: number }> {
  return campgrounds
    .map(campground => ({
      ...campground,
      distance: calculateDistance(
        userLocation.latitude,
        userLocation.longitude,
        campground.location.coordinates.lat,
        campground.location.coordinates.lng,
        unit
      ),
    }))
    .filter(campground => campground.distance <= maxDistance)
    .sort((a, b) => a.distance - b.distance)
}

// Format distance for display
export function formatDistance(distance: number, unit: 'km' | 'mi' = 'km'): string {
  if (unit === 'km') {
    if (distance < 1) {
      return `${(distance * 1000).toFixed(0)} m`
    } else if (distance < 10) {
      return `${distance.toFixed(1)} km`
    } else {
      return `${Math.round(distance)} km`
    }
  } else {
    if (distance < 1) {
      return `${(distance * 5280).toFixed(0)} ft`
    } else if (distance < 10) {
      return `${distance.toFixed(1)} mi`
    } else {
      return `${Math.round(distance)} mi`
    }
  }
}