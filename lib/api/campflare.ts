import type { Campground } from '@/types'

// Campflare API configuration
const CAMPFLARE_API_BASE = 'https://api.campflare.com/v1'
const CAMPFLARE_TOKEN = process.env.CAMPFLARE_API_TOKEN || 'eyJ2IjoxLCJyIjoiUEFlUVpOZFJWcXR2RlI3UTJDY0Yzd0V0QUFNSmlEYllqWkk1NVZZWGdrMCIsInUiOjE5NDY5NzIzNTU1Mjc5NzA4MTZ9'

interface CampflareApiCampground {
  id: string
  name: string
  description: string
  latitude: number
  longitude: number
  address: {
    city: string
    state: string
    country: string
  }
  amenities: string[]
  features: string[]
  rating: number
  reviewCount: number
  priceRange: {
    min: number
    max: number
  }
  images: string[]
  website?: string
  phone?: string
  type: 'national-park' | 'state-park' | 'private' | 'rv-park' | 'primitive'
}

interface CampflareSearchResponse {
  campgrounds: CampflareApiCampground[]
  total: number
  page: number
  limit: number
}

/**
 * Search campgrounds using Campflare API
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
export async function searchCampflareAPI(
  query?: string,
  latitude?: number,
  longitude?: number,
  radius: number = 50,
  limit: number = 20
): Promise<Campground[]> {
  try {
    const params = new URLSearchParams({
      limit: limit.toString(),
      ...(query && { q: query }),
      ...(latitude && longitude && {
        lat: latitude.toString(),
        lng: longitude.toString(),
        radius: radius.toString(),
      }),
    })

    const response = await fetch(`${CAMPFLARE_API_BASE}/search?${params}`, {
      headers: {
        'Authorization': `Bearer ${CAMPFLARE_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Campflare API error: ${response.status}`)
    }

    const data: CampflareSearchResponse = await response.json()
    return data.campgrounds.map(transformCampflareToInternal)
  } catch (error) {
    console.error('Error fetching from Campflare API:', error)
    return []
  }
}

/**
 * Get campground details by ID from Campflare API
 * 
 * Args:
 *   id: Campflare campground ID
 * 
 * Returns:
 *   Promise<Campground | null>: Campground data or null if not found
 */
export async function getCampflareById(id: string): Promise<Campground | null> {
  try {
    const response = await fetch(`${CAMPFLARE_API_BASE}/campgrounds/${id}`, {
      headers: {
        'Authorization': `Bearer ${CAMPFLARE_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      if (response.status === 404) return null
      throw new Error(`Campflare API error: ${response.status}`)
    }

    const campground: CampflareApiCampground = await response.json()
    return transformCampflareToInternal(campground)
  } catch (error) {
    console.error('Error fetching campground from Campflare API:', error)
    return null
  }
}

/**
 * Get featured/popular campgrounds from Campflare API
 * 
 * Args:
 *   limit: Maximum results to return (default: 6)
 * 
 * Returns:
 *   Promise<Campground[]>: Array of featured campground data
 */
export async function getFeaturedCampflare(limit: number = 6): Promise<Campground[]> {
  try {
    const response = await fetch(`${CAMPFLARE_API_BASE}/featured?limit=${limit}`, {
      headers: {
        'Authorization': `Bearer ${CAMPFLARE_TOKEN}`,
        'Content-Type': 'application/json',
      },
    })

    if (!response.ok) {
      throw new Error(`Campflare API error: ${response.status}`)
    }

    const data: CampflareSearchResponse = await response.json()
    return data.campgrounds.map(transformCampflareToInternal)
  } catch (error) {
    console.error('Error fetching featured campgrounds from Campflare API:', error)
    return []
  }
}

/**
 * Transform Campflare API response to internal Campground format
 * 
 * Args:
 *   apiCampground: Campflare API campground object
 * 
 * Returns:
 *   Campground: Transformed campground data
 */
function transformCampflareToInternal(apiCampground: CampflareApiCampground): Campground {
  // Generate slug from name
  const slug = apiCampground.name
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim()

  // Format price range
  const priceRange = apiCampground.priceRange.min === 0 && apiCampground.priceRange.max === 0
    ? 'Free'
    : apiCampground.priceRange.min === apiCampground.priceRange.max
    ? `$${apiCampground.priceRange.min}`
    : `$${apiCampground.priceRange.min}-$${apiCampground.priceRange.max}`

  return {
    id: `campflare-${apiCampground.id}`,
    slug,
    name: apiCampground.name,
    description: apiCampground.description,
    location: {
      state: apiCampground.address.state,
      city: apiCampground.address.city,
      coordinates: {
        lat: apiCampground.latitude,
        lng: apiCampground.longitude,
      },
    },
    features: apiCampground.features,
    amenities: apiCampground.amenities,
    rating: apiCampground.rating,
    reviewCount: apiCampground.reviewCount,
    images: apiCampground.images,
    priceRange,
    website: apiCampground.website,
    phone: apiCampground.phone,
  }
}

/**
 * Check if Campflare API is available
 * 
 * Returns:
 *   Promise<boolean>: True if API is available, false otherwise
 */
export async function checkCampflareHealth(): Promise<boolean> {
  try {
    const response = await fetch(`${CAMPFLARE_API_BASE}/health`, {
      headers: {
        'Authorization': `Bearer ${CAMPFLARE_TOKEN}`,
      },
    })
    return response.ok
  } catch (error) {
    console.error('Campflare API health check failed:', error)
    return false
  }
}