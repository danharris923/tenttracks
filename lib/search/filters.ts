import type { Campground, GeolocationData } from '@/types'
import { calculateDistance, findNearbyCampgrounds } from './geolocation'

export interface FilterOptions {
  location?: GeolocationData
  radius?: number // miles
  amenities?: string[]
  features?: string[]
  priceRange?: [number, number]
  rating?: number
  state?: string
  type?: 'national-park' | 'state-park' | 'private' | 'rv-park' | 'primitive'
}

export interface SortOptions {
  sortBy: 'distance' | 'rating' | 'price' | 'name' | 'popularity'
  direction: 'asc' | 'desc'
}

// Main search and filter function
export function searchAndFilterCampgrounds(
  campgrounds: Campground[],
  query?: string,
  filters: FilterOptions = {},
  sort: SortOptions = { sortBy: 'popularity', direction: 'desc' }
): Campground[] {
  let results = [...campgrounds]

  // Text search
  if (query && query.length > 0) {
    const searchTerms = query.toLowerCase().split(/\s+/)
    results = results.filter(campground => {
      const searchText = [
        campground.name,
        campground.description,
        campground.location.city,
        campground.location.state,
        ...campground.features,
        ...campground.amenities,
      ].join(' ').toLowerCase()

      return searchTerms.every(term => searchText.includes(term))
    })
  }

  // Location-based filtering
  if (filters.location && filters.radius) {
    const nearby = findNearbyCampgrounds(filters.location, results, filters.radius)
    results = nearby.map(item => item)
  }

  // State filtering
  if (filters.state) {
    results = results.filter(campground => 
      campground.location.state.toLowerCase() === filters.state!.toLowerCase()
    )
  }

  // Amenities filtering
  if (filters.amenities && filters.amenities.length > 0) {
    results = results.filter(campground =>
      filters.amenities!.every(amenity =>
        campground.amenities.some(campAmenity =>
          campAmenity.toLowerCase().includes(amenity.toLowerCase())
        )
      )
    )
  }

  // Features filtering
  if (filters.features && filters.features.length > 0) {
    results = results.filter(campground =>
      filters.features!.every(feature =>
        campground.features.some(campFeature =>
          campFeature.toLowerCase().includes(feature.toLowerCase())
        )
      )
    )
  }

  // Price range filtering
  if (filters.priceRange) {
    results = results.filter(campground => {
      const price = parsePriceRange(campground.priceRange)
      return price.min >= filters.priceRange![0] && price.max <= filters.priceRange![1]
    })
  }

  // Rating filtering
  if (filters.rating) {
    results = results.filter(campground => campground.rating >= filters.rating!)
  }

  // Sorting
  results = sortCampgrounds(results, sort, filters.location)

  return results
}

// Parse price range string to min/max values
function parsePriceRange(priceRange: string): { min: number; max: number } {
  const matches = priceRange.match(/\$(\d+)(?:-\$?(\d+))?/)
  if (!matches) return { min: 0, max: 999 }

  const min = parseInt(matches[1])
  const max = matches[2] ? parseInt(matches[2]) : min

  return { min, max }
}

// Sort campgrounds based on criteria
function sortCampgrounds(
  campgrounds: Campground[],
  sort: SortOptions,
  userLocation?: GeolocationData
): Campground[] {
  return campgrounds.sort((a, b) => {
    let comparison = 0

    switch (sort.sortBy) {
      case 'distance':
        if (userLocation) {
          const distanceA = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            a.location.coordinates.lat,
            a.location.coordinates.lng
          )
          const distanceB = calculateDistance(
            userLocation.latitude,
            userLocation.longitude,
            b.location.coordinates.lat,
            b.location.coordinates.lng
          )
          comparison = distanceA - distanceB
        }
        break

      case 'rating':
        comparison = a.rating - b.rating
        break

      case 'price':
        const priceA = parsePriceRange(a.priceRange).min
        const priceB = parsePriceRange(b.priceRange).min
        comparison = priceA - priceB
        break

      case 'name':
        comparison = a.name.localeCompare(b.name)
        break

      case 'popularity':
        comparison = a.reviewCount - b.reviewCount
        break

      default:
        comparison = 0
    }

    return sort.direction === 'desc' ? -comparison : comparison
  })
}

// Get unique amenities from campground data
export function getUniqueAmenities(campgrounds: Campground[]): string[] {
  const amenitiesSet = new Set<string>()
  
  campgrounds.forEach(campground => {
    campground.amenities.forEach(amenity => {
      amenitiesSet.add(amenity)
    })
  })

  return Array.from(amenitiesSet).sort()
}

// Get unique features from campground data
export function getUniqueFeatures(campgrounds: Campground[]): string[] {
  const featuresSet = new Set<string>()
  
  campgrounds.forEach(campground => {
    campground.features.forEach(feature => {
      featuresSet.add(feature)
    })
  })

  return Array.from(featuresSet).sort()
}

// Get unique states from campground data
export function getUniqueStates(campgrounds: Campground[]): string[] {
  const statesSet = new Set<string>()
  
  campgrounds.forEach(campground => {
    statesSet.add(campground.location.state)
  })

  return Array.from(statesSet).sort()
}

// Generate search suggestions based on query
export function generateSearchSuggestions(
  query: string,
  campgrounds: Campground[],
  limit: number = 5
): Array<{
  type: 'campground' | 'city' | 'state' | 'feature'
  text: string
  count?: number
}> {
  if (query.length < 2) return []

  const suggestions: Array<{
    type: 'campground' | 'city' | 'state' | 'feature'
    text: string
    count?: number
  }> = []

  const queryLower = query.toLowerCase()

  // Campground name suggestions
  campgrounds
    .filter(c => c.name.toLowerCase().includes(queryLower))
    .slice(0, 3)
    .forEach(campground => {
      suggestions.push({
        type: 'campground',
        text: campground.name,
      })
    })

  // City suggestions
  const cities = new Map<string, number>()
  campgrounds
    .filter(c => c.location.city.toLowerCase().includes(queryLower))
    .forEach(campground => {
      const cityState = `${campground.location.city}, ${campground.location.state}`
      cities.set(cityState, (cities.get(cityState) || 0) + 1)
    })

  Array.from(cities.entries())
    .slice(0, 2)
    .forEach(([cityState, count]) => {
      suggestions.push({
        type: 'city',
        text: cityState,
        count,
      })
    })

  // State suggestions
  const states = new Map<string, number>()
  campgrounds
    .filter(c => c.location.state.toLowerCase().includes(queryLower))
    .forEach(campground => {
      states.set(campground.location.state, (states.get(campground.location.state) || 0) + 1)
    })

  Array.from(states.entries())
    .slice(0, 2)
    .forEach(([state, count]) => {
      suggestions.push({
        type: 'state',
        text: state,
        count,
      })
    })

  return suggestions.slice(0, limit)
}

// Price range helpers
export const PRICE_RANGES = [
  { label: 'Free', min: 0, max: 0 },
  { label: 'Under $25', min: 0, max: 25 },
  { label: '$25 - $50', min: 25, max: 50 },
  { label: '$50 - $75', min: 50, max: 75 },
  { label: '$75+', min: 75, max: 999 },
]

export const POPULAR_AMENITIES = [
  'WiFi',
  'Showers',
  'Restrooms',
  'Fire Pits',
  'Picnic Tables',
  'Electrical Hookups',
  'Water Hookups',
  'Sewer Hookups',
  'Laundry',
  'Store/Camp Shop',
  'Swimming Pool',
  'Playground',
  'Pet Friendly',
  'RV Accessible',
  'Tent Sites',
]

export const POPULAR_FEATURES = [
  'Lake Access',
  'Beach',
  'Hiking Trails',
  'Fishing',
  'Boating',
  'Swimming',
  'Mountain Views',
  'Waterfront',
  'Forest',
  'Desert',
  'Wildlife Viewing',
  'Stargazing',
  'Photography',
  'Biking Trails',
  'Rock Climbing',
]