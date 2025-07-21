import type { Campground } from '@/types'
import { getCampflareById } from '@/lib/api/campflare'

// Mock campground data for MVP - used as fallback when Campflare API is unavailable
export const campgroundsData: Campground[] = [
  {
    id: 'banff-tunnel-mountain',
    slug: 'banff-tunnel-mountain-campground',
    name: 'Tunnel Mountain Campground - Banff',
    description: 'Located in the heart of Banff National Park with stunning views of the Canadian Rockies. Close to downtown Banff and offers easy access to hiking trails and hot springs.',
    location: {
      state: 'AB',
      city: 'Banff',
      coordinates: {
        lat: 51.1784,
        lng: -115.5708
      }
    },
    features: ['Mountain Views', 'Hiking Trails', 'Hot Springs', 'Wildlife Viewing', 'Photography', 'Downtown Access'],
    amenities: ['Restrooms', 'Showers', 'Fire Pits', 'Picnic Tables', 'Bear Boxes', 'Store/Camp Shop', 'RV Accessible'],
    rating: 4.8,
    reviewCount: 2156,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1464822759844-d150ad6c7c73?w=800'
    ],
    priceRange: '$35-$45 CAD',
    website: 'https://www.pc.gc.ca/en/pn-np/ab/banff/activ/camping',
    phone: '+1-403-762-1550'
  },
  {
    id: 'lake-louise-campground',
    slug: 'lake-louise-campground',
    name: 'Lake Louise Campground - Banff',
    description: 'Experience world-famous Lake Louise with turquoise waters and glacier views. Premium camping location in the Canadian Rockies with access to Chateau Lake Louise and hiking trails.',
    location: {
      state: 'AB',
      city: 'Lake Louise',
      coordinates: {
        lat: 51.4254,
        lng: -116.1773
      }
    },
    features: ['Lake Views', 'Glacier Views', 'Hiking Trails', 'Canoeing', 'Photography', 'Mountain Access'],
    amenities: ['Restrooms', 'Showers', 'Fire Pits', 'Picnic Tables', 'Bear Boxes', 'RV Accessible'],
    rating: 4.9,
    reviewCount: 1834,
    images: [
      'https://images.unsplash.com/photo-1503614472-8c93d56cd919?w=800',
      'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800'
    ],
    priceRange: '$40-$50 CAD',
    website: 'https://www.pc.gc.ca/en/pn-np/ab/banff/activ/camping',
    phone: '+1-403-522-1264'
  },
  {
    id: 'jasper-whistlers',
    slug: 'jasper-whistlers-campground',
    name: 'Whistlers Campground - Jasper',
    description: 'Largest campground in Jasper National Park with views of the Whistlers Mountain. Perfect base for exploring the Canadian Rockies and dark sky preserve stargazing.',
    location: {
      state: 'AB',
      city: 'Jasper',
      coordinates: {
        lat: 52.8737,
        lng: -118.0814
      }
    },
    features: ['Mountain Views', 'Dark Sky Reserve', 'Hiking Trails', 'Wildlife Viewing', 'Stargazing', 'Cycling'],
    amenities: ['Restrooms', 'Showers', 'Fire Pits', 'Picnic Tables', 'Bear Boxes', 'Store/Camp Shop', 'RV Accessible'],
    rating: 4.7,
    reviewCount: 1624,
    images: [
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800',
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800'
    ],
    priceRange: '$32-$42 CAD',
    website: 'https://www.pc.gc.ca/en/pn-np/ab/jasper/activ/camping',
    phone: '+1-780-852-6176'
  },
  {
    id: 'glacier-national-park-apgar',
    slug: 'glacier-apgar-campground',
    name: 'Apgar Campground - Glacier National Park',
    description: 'Located near the Canadian border in Montana with stunning mountain views. Close to the Going-to-the-Sun Road and offers easy access to hiking trails and Lake McDonald.',
    location: {
      state: 'MT',
      city: 'West Glacier',
      coordinates: {
        lat: 48.5130,
        lng: -113.9885
      }
    },
    features: ['Mountain Views', 'Lake Access', 'Hiking Trails', 'Wildlife Viewing', 'Photography', 'Going-to-the-Sun Road'],
    amenities: ['Restrooms', 'Fire Pits', 'Picnic Tables', 'Bear Boxes', 'Tent Sites', 'RV Accessible'],
    rating: 4.6,
    reviewCount: 1432,
    images: [
      'https://images.unsplash.com/photo-1551632811-561732d1e306?w=800',
      'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800'
    ],
    priceRange: '$23-$30 USD',
    website: 'https://www.nps.gov/glac/planyourvisit/apgarcampground.htm',
    phone: '+1-406-888-7800'
  },
  {
    id: 'yosemite-valley',
    slug: 'yosemite-upper-pines-campground',
    name: 'Upper Pines Campground - Yosemite Valley',
    description: 'Located in the heart of Yosemite Valley with stunning views of Half Dome and easy access to trails. One of the most popular campgrounds in the national park system.',
    location: {
      state: 'CA',
      city: 'Yosemite National Park',
      coordinates: {
        lat: 37.7395,
        lng: -119.5659
      }
    },
    features: ['Mountain Views', 'Hiking Trails', 'Rock Climbing', 'Photography', 'Waterfall Access', 'Wildlife Viewing'],
    amenities: ['Restrooms', 'Showers', 'Fire Pits', 'Picnic Tables', 'Bear Boxes', 'Store/Camp Shop', 'RV Accessible'],
    rating: 4.8,
    reviewCount: 2341,
    images: [
      'https://images.unsplash.com/photo-1609788063095-d71bf3c1f01f?w=800',
      'https://images.unsplash.com/photo-1602826347632-fc49a8675be6?w=800'
    ],
    priceRange: '$35-$40',
    website: 'https://www.nps.gov/yose/planyourvisit/upperpines.htm',
    phone: '+1-209-372-0200'
  },
  {
    id: 'grand-canyon-mather',
    slug: 'grand-canyon-mather-campground',
    name: 'Mather Campground - Grand Canyon South Rim',
    description: 'Located on the South Rim of the Grand Canyon, offering year-round camping with easy access to rim trails and visitor services. Book early as this campground fills quickly.',
    location: {
      state: 'AZ',
      city: 'Grand Canyon Village',
      coordinates: {
        lat: 36.0503,
        lng: -112.1205
      }
    },
    features: ['Canyon Views', 'Hiking Trails', 'Stargazing', 'Photography', 'Visitor Center', 'Shuttle Access'],
    amenities: ['Restrooms', 'Showers', 'Fire Pits', 'Picnic Tables', 'Laundry', 'Store/Camp Shop', 'Pet Friendly'],
    rating: 4.5,
    reviewCount: 1876,
    images: [
      'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=800',
      'https://images.unsplash.com/photo-1474623809196-26c1d33457cc?w=800'
    ],
    priceRange: '$18-$25',
    website: 'https://www.nps.gov/grca/planyourvisit/cg-sr.htm',
    phone: '+1-928-638-7888'
  },
  {
    id: 'zion-watchman',
    slug: 'zion-watchman-campground',
    name: 'Watchman Campground - Zion National Park',
    description: 'Located near the south entrance of Zion National Park, offering stunning red rock views and easy access to the visitor center and shuttle system.',
    location: {
      state: 'UT',
      city: 'Springdale',
      coordinates: {
        lat: 37.1989,
        lng: -112.9877
      }
    },
    features: ['Red Rock Views', 'Hiking Trails', 'Canyon Access', 'Photography', 'Shuttle Access', 'Stargazing'],
    amenities: ['Restrooms', 'Fire Pits', 'Picnic Tables', 'RV Accessible', 'Electrical Hookups', 'Pet Friendly'],
    rating: 4.7,
    reviewCount: 1543,
    images: [
      'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=800',
      'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=800'
    ],
    priceRange: '$35-$50',
    website: 'https://www.nps.gov/zion/planyourvisit/watchman-campground.htm',
    phone: '+1-435-772-3256'
  },
  {
    id: 'acadia-blackwoods',
    slug: 'acadia-blackwoods-campground',
    name: 'Blackwoods Campground - Acadia National Park',
    description: 'A wooded campground on Mount Desert Island, offering access to ocean views, hiking trails, and the charming town of Bar Harbor.',
    location: {
      state: 'ME',
      city: 'Mount Desert Island',
      coordinates: {
        lat: 44.3094,
        lng: -68.2067
      }
    },
    features: ['Ocean Views', 'Forest', 'Hiking Trails', 'Tide Pools', 'Wildlife Viewing', 'Photography'],
    amenities: ['Restrooms', 'Fire Pits', 'Picnic Tables', 'Store/Camp Shop', 'Tent Sites', 'RV Accessible'],
    rating: 4.4,
    reviewCount: 967,
    images: [
      'https://images.unsplash.com/photo-1519904981063-b0cf448d479e?w=800',
      'https://images.unsplash.com/photo-1533419784160-1f7f79022119?w=800'
    ],
    priceRange: '$22-$30',
    website: 'https://www.nps.gov/acad/planyourvisit/blackwoods.htm',
    phone: '+1-207-288-3338'
  },
  {
    id: 'joshua-tree-jumbo',
    slug: 'joshua-tree-jumbo-rocks-campground',
    name: 'Jumbo Rocks Campground - Joshua Tree',
    description: 'Famous for its massive rock formations and Joshua trees, this campground offers excellent rock climbing and desert stargazing opportunities.',
    location: {
      state: 'CA',
      city: 'Twentynine Palms',
      coordinates: {
        lat: 33.9913,
        lng: -116.0625
      }
    },
    features: ['Rock Climbing', 'Desert', 'Stargazing', 'Photography', 'Hiking Trails', 'Rock Formations'],
    amenities: ['Restrooms', 'Fire Pits', 'Picnic Tables', 'Tent Sites'],
    rating: 4.6,
    reviewCount: 1122,
    images: [
      'https://images.unsplash.com/photo-1455496231601-e6195da1f841?w=800',
      'https://images.unsplash.com/photo-1517632298125-9286fb0ec603?w=800'
    ],
    priceRange: '$15-$20',
    website: 'https://www.nps.gov/jotr/planyourvisit/jumborocks.htm',
    phone: '+1-760-367-5500'
  },
  {
    id: 'glacier-apgar',
    slug: 'glacier-apgar-campground',
    name: 'Apgar Campground - Glacier National Park',
    description: 'Located on the shores of Lake McDonald, offering stunning mountain views and access to the Going-to-the-Sun Road.',
    location: {
      state: 'MT',
      city: 'West Glacier',
      coordinates: {
        lat: 48.6146,
        lng: -114.0283
      }
    },
    features: ['Lake Access', 'Mountain Views', 'Hiking Trails', 'Boating', 'Fishing', 'Wildlife Viewing'],
    amenities: ['Restrooms', 'Fire Pits', 'Picnic Tables', 'Store/Camp Shop', 'Boat Launch', 'Pet Friendly'],
    rating: 4.7,
    reviewCount: 1435,
    images: [
      'https://images.unsplash.com/photo-1564166174574-a9666f590437?w=800',
      'https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800'
    ],
    priceRange: '$23-$30',
    website: 'https://www.nps.gov/glac/planyourvisit/apgarcampground.htm',
    phone: '+1-406-888-7800'
  },
  {
    id: 'smoky-mountains-cades-cove',
    slug: 'smoky-mountains-cades-cove-campground',
    name: 'Cades Cove Campground - Great Smoky Mountains',
    description: 'Situated in a beautiful valley surrounded by mountains, known for wildlife viewing including black bears, deer, and wild turkeys.',
    location: {
      state: 'TN',
      city: 'Townsend',
      coordinates: {
        lat: 35.6065,
        lng: -83.8408
      }
    },
    features: ['Wildlife Viewing', 'Mountain Views', 'Hiking Trails', 'Waterfall Access', 'Forest', 'Photography'],
    amenities: ['Restrooms', 'Fire Pits', 'Picnic Tables', 'Store/Camp Shop', 'Tent Sites', 'RV Accessible'],
    rating: 4.5,
    reviewCount: 1867,
    images: [
      'https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800',
      'https://images.unsplash.com/photo-1563299796-17596ed6b017?w=800'
    ],
    priceRange: '$25-$27',
    website: 'https://www.nps.gov/grsm/planyourvisit/cadescove.htm',
    phone: '+1-865-448-4103'
  },
  {
    id: 'olympic-kalaloch',
    slug: 'olympic-kalaloch-campground',
    name: 'Kalaloch Campground - Olympic National Park',
    description: 'Perched on a bluff overlooking the Pacific Ocean, offering dramatic coastal views and beach access for tide pooling.',
    location: {
      state: 'WA',
      city: 'Forks',
      coordinates: {
        lat: 47.6119,
        lng: -124.3755
      }
    },
    features: ['Beach', 'Ocean Views', 'Tide Pools', 'Hiking Trails', 'Whale Watching', 'Sunset Views'],
    amenities: ['Restrooms', 'Fire Pits', 'Picnic Tables', 'Pet Friendly', 'Tent Sites', 'RV Accessible'],
    rating: 4.8,
    reviewCount: 1654,
    images: [
      'https://images.unsplash.com/photo-1533587851505-d119e13fa0d7?w=800',
      'https://images.unsplash.com/photo-1573489930104-ad4d5838d0cd?w=800'
    ],
    priceRange: '$22-$25',
    website: 'https://www.nps.gov/olym/planyourvisit/kalaloch-campground.htm',
    phone: '+1-360-565-3130'
  },
  {
    id: 'big-sur-pfeiffer',
    slug: 'big-sur-pfeiffer-campground',
    name: 'Pfeiffer Big Sur State Park Campground',
    description: 'Nestled in a redwood forest along the Big Sur River, offering a peaceful retreat with hiking trails and river swimming holes.',
    location: {
      state: 'CA',
      city: 'Big Sur',
      coordinates: {
        lat: 36.2469,
        lng: -121.7825
      }
    },
    features: ['Redwood Forest', 'River Access', 'Hiking Trails', 'Swimming', 'Wildlife Viewing', 'Photography'],
    amenities: ['Restrooms', 'Showers', 'Fire Pits', 'Picnic Tables', 'Store/Camp Shop', 'WiFi'],
    rating: 4.6,
    reviewCount: 1298,
    images: [
      'https://images.unsplash.com/photo-1534067783941-51c9c23ecefd?w=800',
      'https://images.unsplash.com/photo-1519331379826-f10be5486c6f?w=800'
    ],
    priceRange: '$35-$50',
    website: 'https://www.parks.ca.gov/?page_id=570',
    phone: '+1-831-667-2315'
  }
]

// Helper functions for campground data with Campflare API integration

/**
 * Get campground by ID, checking both Campflare API and local data
 * 
 * Args:
 *   id: Campground ID
 * 
 * Returns:
 *   Promise<Campground | undefined>: Campground data or undefined if not found
 */
export async function getCampgroundById(id: string): Promise<Campground | undefined> {
  // Check if it's a Campflare ID
  if (id.startsWith('campflare-')) {
    const campflareId = id.replace('campflare-', '')
    const campground = await getCampflareById(campflareId)
    if (campground) return campground
  }
  
  // Fallback to local mock data
  return campgroundsData.find(campground => campground.id === id)
}

/**
 * Get campground by slug from local data only
 * 
 * Args:
 *   slug: Campground slug
 * 
 * Returns:
 *   Campground | undefined: Campground data or undefined if not found
 */
export function getCampgroundBySlug(slug: string): Campground | undefined {
  return campgroundsData.find(campground => campground.slug === slug)
}

/**
 * Get campgrounds by state, combining API and local data
 * 
 * Args:
 *   state: State abbreviation (e.g., 'CA', 'WY')
 * 
 * Returns:
 *   Promise<Campground[]>: Array of campgrounds in the state
 */
export async function getCampgroundsByState(state: string): Promise<Campground[]> {
  // Filter local data by state
  const results = campgroundsData.filter(campground => 
    campground.location.state.toLowerCase() === state.toLowerCase()
  )
  
  console.log(`✓ Found ${results.length} campgrounds in ${state}`)
  return results
}

/**
 * Get featured campgrounds, preferring API data with local fallback
 * 
 * Args:
 *   limit: Maximum number of campgrounds to return (default: 6)
 * 
 * Returns:
 *   Promise<Campground[]>: Array of featured campgrounds
 */
export async function getFeaturedCampgrounds(limit: number = 6): Promise<Campground[]> {
  // For now, use curated local data which provides good search functionality
  // Future: Replace with real API when available
  console.log(`✓ Using ${Math.min(limit, campgroundsData.length)} curated campgrounds`)
  
  return [...campgroundsData]
    .sort((a, b) => {
      const scoreA = a.rating * Math.log(a.reviewCount + 1)
      const scoreB = b.rating * Math.log(b.reviewCount + 1)
      return scoreB - scoreA
    })
    .slice(0, limit)
}

/**
 * Search campgrounds using both API and local data
 * 
 * Args:
 *   query: Search query string
 *   latitude: User latitude for location-based search
 *   longitude: User longitude for location-based search
 *   radius: Search radius in miles (default: 50)
 *   limit: Maximum results to return (default: 20)
 * 
 * Returns:
 *   Promise<Campground[]>: Array of matching campgrounds
 */
export async function searchCampgrounds(
  query?: string,
  latitude?: number,
  longitude?: number,
  radius: number = 80, // 80km default for Canadian focus
  limit: number = 20
): Promise<Campground[]> {
  // Enhanced local search with location-based filtering
  let results = [...campgroundsData]
  
  // Apply text search filter
  if (query && query.trim()) {
    const searchTerms = query.toLowerCase().trim().split(/\s+/)
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
  
  // Apply location-based filtering if coordinates provided
  if (latitude && longitude) {
    results = results
      .map(campground => ({
        ...campground,
        distance: calculateDistance(
          latitude,
          longitude,
          campground.location.coordinates.lat,
          campground.location.coordinates.lng,
          'km'
        )
      }))
      .filter(campground => campground.distance <= radius)
      .sort((a, b) => a.distance - b.distance)
  } else {
    // Sort by rating if no location provided
    results = results.sort((a, b) => {
      const scoreA = a.rating * Math.log(a.reviewCount + 1)
      const scoreB = b.rating * Math.log(b.reviewCount + 1)
      return scoreB - scoreA
    })
  }
  
  const finalResults = results.slice(0, limit)
  console.log(`✓ Found ${finalResults.length} campgrounds matching search criteria`)
  
  return finalResults
}

// Helper function for distance calculation
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number, unit: 'km' | 'mi' = 'km'): number {
  const R = unit === 'km' ? 6371 : 3959 // Earth's radius
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLon = (lon2 - lon1) * Math.PI / 180
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c
}

export function getRelatedCampgrounds(campground: Campground, limit: number = 4): Campground[] {
  // Find campgrounds with similar features or in the same state
  return campgroundsData
    .filter(c => c.id !== campground.id)
    .map(c => ({
      campground: c,
      score: calculateSimilarity(campground, c)
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(item => item.campground)
}

function calculateSimilarity(a: Campground, b: Campground): number {
  let score = 0
  
  // Same state gets high weight
  if (a.location.state === b.location.state) score += 3
  
  // Common features
  const commonFeatures = a.features.filter(f => b.features.includes(f))
  score += commonFeatures.length * 0.5
  
  // Common amenities
  const commonAmenities = a.amenities.filter(am => b.amenities.includes(am))
  score += commonAmenities.length * 0.3
  
  // Similar rating
  const ratingDiff = Math.abs(a.rating - b.rating)
  score += (1 - ratingDiff / 5) * 2
  
  return score
}