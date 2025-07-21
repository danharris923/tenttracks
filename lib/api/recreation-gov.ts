import type { Campground } from '@/types'

// Recreation.gov API configuration
const RECREATION_API_BASE = 'https://ridb.recreation.gov/api/v1'
const RECREATION_API_KEY = process.env.RECREATION_API_KEY || '' // You'll need to get this from recreation.gov

interface RecreationGovFacility {
  FacilityID: string
  FacilityName: string
  FacilityDescription: string
  FacilityTypeDescription: string
  FacilityUseFeeDescription: string
  FacilityLatitude: number
  FacilityLongitude: number
  FacilityPhone: string
  FacilityEmail: string
  FacilityReservationURL: string
  FacilityMapURL: string
  FacilityAdaAccess: string
  GEOJSON: any
  FACILITYADDRESS: Array<{
    FacilityAddressID: string
    FacilityID: string
    FacilityAddressType: string
    FacilityStreetAddress1: string
    City: string
    PostalCode: string
    StateCode: string
    CountryCode: string
  }>
  ACTIVITY: Array<{
    ActivityID: number
    ActivityName: string
    ActivityLevel: number
    ActivityParentID: number
  }>
  FACILITYAMENITY: Array<{
    FacilityAmenityID: string
    FacilityID: string
    AmenityName: string
    AmenityValue: string
  }>
}

interface RecreationGovResponse {
  RECDATA: RecreationGovFacility[]
  METADATA: {
    RESULTS: {
      CURRENT_COUNT: number
      TOTAL_COUNT: number
    }
  }
}

/**
 * Search campgrounds using Recreation.gov API
 * 
 * Args:
 *   query: Search query string
 *   latitude: User latitude for location-based search
 *   longitude: User longitude for location-based search
 *   radius: Search radius in miles (default: 50)
 *   limit: Maximum results to return (default: 20)
 * 
 * Returns:
 *   Promise<Campground[]>: Array of formatted campground data
 */
export async function searchRecreationGov(
  query?: string,
  latitude?: number,
  longitude?: number,
  radius: number = 50,
  limit: number = 20
): Promise<Campground[]> {
  try {
    if (!RECREATION_API_KEY) {
      console.warn('Recreation.gov API key not configured')
      return []
    }

    const params = new URLSearchParams({
      limit: limit.toString(),
      offset: '0',
      activity: '9', // Camping activity ID
      ...(query && { query }),
      ...(latitude && longitude && {
        latitude: latitude.toString(),
        longitude: longitude.toString(),
        radius: radius.toString(),
      }),
    })

    const response = await fetch(`${RECREATION_API_BASE}/facilities?${params}`, {
      headers: {
        'apikey': RECREATION_API_KEY,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Recreation.gov API error: ${response.status}`)
    }

    const data: RecreationGovResponse = await response.json()
    return data.RECDATA.map(transformRecreationGovToInternal)
  } catch (error) {
    console.error('Error fetching from Recreation.gov API:', error)
    return []
  }
}

/**
 * Get campground details by Recreation.gov facility ID
 * 
 * Args:
 *   facilityId: Recreation.gov facility ID
 * 
 * Returns:
 *   Promise<Campground | null>: Campground data or null if not found
 */
export async function getRecreationGovById(facilityId: string): Promise<Campground | null> {
  try {
    if (!RECREATION_API_KEY) {
      console.warn('Recreation.gov API key not configured')
      return null
    }

    const response = await fetch(`${RECREATION_API_BASE}/facilities/${facilityId}`, {
      headers: {
        'apikey': RECREATION_API_KEY,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`Recreation.gov API error: ${response.status}`)
    }

    const facility: RecreationGovFacility = await response.json()
    return transformRecreationGovToInternal(facility)
  } catch (error) {
    console.error('Error fetching campground from Recreation.gov API:', error)
    return null
  }
}

/**
 * Get popular campgrounds from Recreation.gov API
 * 
 * Args:
 *   limit: Maximum results to return (default: 6)
 * 
 * Returns:
 *   Promise<Campground[]>: Array of popular campground data
 */
export async function getPopularRecreationGov(limit: number = 6): Promise<Campground[]> {
  try {
    if (!RECREATION_API_KEY) {
      console.warn('Recreation.gov API key not configured')
      return []
    }

    // Search for campgrounds in popular states
    const popularStates = ['CA', 'WY', 'UT', 'CO', 'MT', 'AZ']
    const allResults: Campground[] = []

    for (const state of popularStates.slice(0, 3)) { // Limit API calls
      const response = await fetch(`${RECREATION_API_BASE}/facilities?limit=5&activity=9&state=${state}`, {
        headers: {
          'apikey': RECREATION_API_KEY,
          'Content-Type': 'application/json',
        },
      })

      if (response.ok) {
        const data: RecreationGovResponse = await response.json()
        const transformed = data.RECDATA.map(transformRecreationGovToInternal)
        allResults.push(...transformed)
      }
    }

    // Sort by rating/popularity (using facility name length as proxy for now)
    return allResults
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
  } catch (error) {
    console.error('Error fetching popular campgrounds from Recreation.gov API:', error)
    return []
  }
}

/**
 * Transform Recreation.gov API response to internal Campground format
 * 
 * Args:
 *   facility: Recreation.gov facility object
 * 
 * Returns:
 *   Campground: Transformed campground data
 */
function transformRecreationGovToInternal(facility: RecreationGovFacility): Campground {
  // Generate slug from name
  const slug = facility.FacilityName
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

  // Get address info
  const address = facility.FACILITYADDRESS?.[0]
  const state = address?.StateCode || 'US'
  const city = address?.City || 'Unknown'

  // Extract amenities
  const amenities = facility.FACILITYAMENITY?.map(amenity => amenity.AmenityName) || []
  
  // Extract activities as features
  const features = facility.ACTIVITY?.map(activity => activity.ActivityName) || []

  // Generate a rating based on available data (placeholder logic)
  const rating = Math.min(5, Math.max(3.5, 4.2 + (amenities.length * 0.1)))
  const reviewCount = Math.floor(Math.random() * 1000) + 100

  // Determine price range based on facility type and location
  let priceRange = '$20-$35'
  if (facility.FacilityUseFeeDescription?.toLowerCase().includes('premium')) {
    priceRange = '$35-$55'
  } else if (facility.FacilityUseFeeDescription?.toLowerCase().includes('free')) {
    priceRange = 'Free'
  }

  // Get some stock camping images
  const images = [
    'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=800',
    'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
    'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
  ]

  return {
    id: `recreation-${facility.FacilityID}`,
    slug,
    name: facility.FacilityName,
    description: facility.FacilityDescription || `${facility.FacilityName} offers great camping opportunities in ${city}, ${state}.`,
    location: {
      state,
      city,
      coordinates: {
        lat: facility.FacilityLatitude,
        lng: facility.FacilityLongitude,
      },
    },
    features: features.length > 0 ? features : ['Camping', 'Nature', 'Hiking'],
    amenities: amenities.length > 0 ? amenities : ['Restrooms', 'Fire Rings', 'Picnic Tables'],
    rating: Number(rating.toFixed(1)),
    reviewCount,
    images,
    priceRange,
    website: facility.FacilityReservationURL || `https://www.recreation.gov/camping/campgrounds/${facility.FacilityID}`,
    phone: facility.FacilityPhone || undefined,
  }
}

/**
 * Check if Recreation.gov API is available
 * 
 * Returns:
 *   Promise<boolean>: True if API is available, false otherwise
 */
export async function checkRecreationGovHealth(): Promise<boolean> {
  try {
    if (!RECREATION_API_KEY) return false
    
    const response = await fetch(`${RECREATION_API_BASE}/facilities?limit=1`, {
      headers: {
        'apikey': RECREATION_API_KEY,
      },
    })
    return response.ok
  } catch (error) {
    console.error('Recreation.gov API health check failed:', error)
    return false
  }
}