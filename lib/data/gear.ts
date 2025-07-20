import type { GearItem } from '@/types'

// Mock gear data for MVP - in production this would come from affiliate APIs
export const gearData: GearItem[] = [
  // Tents
  {
    id: 'coleman-sundome-tent',
    title: 'Coleman Sundome 4-Person Tent',
    description: 'Easy setup dome tent with WeatherTec system to keep you dry. Features large windows and ground vent for improved airflow.',
    image: 'https://images.unsplash.com/photo-1571863533956-01c88e79957e?w=400',
    price: '$89.99',
    originalPrice: '$119.99',
    rating: 4.3,
    reviewCount: 8247,
    affiliateLink: 'https://amazon.com/dp/B004J2GUOU',
    source: 'amazon',
    category: 'Tents',
    features: ['WeatherTec System', '4-Person Capacity', 'Easy Setup', 'Large Windows']
  },
  {
    id: 'rei-half-dome-tent',
    title: 'REI Co-op Half Dome SL 2+ Tent',
    description: 'Ultralight backpacking tent with generous interior space and two vestibules for gear storage.',
    image: 'https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?w=400',
    price: '$249.95',
    rating: 4.6,
    reviewCount: 1247,
    affiliateLink: 'https://amazon.com/dp/B07QMQV8R6',
    source: 'amazon',
    category: 'Tents',
    features: ['Ultralight', '2+ Person', 'Two Vestibules', 'Easy Pitch']
  },
  {
    id: 'cabelas-alaskan-guide-tent',
    title: "Cabela's Alaskan Guide Model Tent",
    description: 'Heavy-duty canvas tent built for extreme conditions. Features a wood-burning stove jack and reinforced construction.',
    image: 'https://images.unsplash.com/photo-1445308394109-4ec2920981b1?w=400',
    price: '$1,299.99',
    rating: 4.8,
    reviewCount: 342,
    affiliateLink: 'https://cabelas.com/shop/en/cabelas-alaskan-guide-model-tent',
    source: 'cabelas',
    category: 'Tents',
    features: ['Canvas Construction', 'Stove Jack', 'Extreme Weather', 'Large Interior']
  },

  // Sleeping Bags
  {
    id: 'kelty-cosmic-sleeping-bag',
    title: 'Kelty Cosmic 20 Degree Sleeping Bag',
    description: 'Down sleeping bag rated to 20°F with DriDown treated fill that retains warmth even when wet.',
    image: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=400',
    price: '$159.95',
    originalPrice: '$199.95',
    rating: 4.5,
    reviewCount: 687,
    affiliateLink: 'https://amazon.com/dp/B01M0TCYXJ',
    source: 'amazon',
    category: 'Sleeping Bags',
    features: ['20°F Rating', 'DriDown Fill', 'Compression Stuff Sack', 'Draft Collar']
  },
  {
    id: 'cabelas-space-rock-sleeping-bag',
    title: "Cabela's Space Rock 0° Sleeping Bag",
    description: 'Synthetic insulation sleeping bag designed for cold weather camping with a comfort rating to 0°F.',
    image: 'https://images.unsplash.com/photo-1504851149312-7a075b496cc7?w=400',
    price: '$199.99',
    rating: 4.4,
    reviewCount: 523,
    affiliateLink: 'https://cabelas.com/shop/en/cabelas-space-rock-0-sleeping-bag',
    source: 'cabelas',
    category: 'Sleeping Bags',
    features: ['0°F Rating', 'Synthetic Fill', 'Draft Tube', 'Foot Box']
  },

  // Backpacks
  {
    id: 'osprey-atmos-backpack',
    title: 'Osprey Atmos AG 65 Backpack',
    description: 'Anti-Gravity suspension system provides incredible comfort for multi-day adventures.',
    image: 'https://images.unsplash.com/photo-1622260614153-03223fb72052?w=400',
    price: '$279.95',
    rating: 4.7,
    reviewCount: 1834,
    affiliateLink: 'https://amazon.com/dp/B079KQZ8NR',
    source: 'amazon',
    category: 'Backpacks',
    features: ['Anti-Gravity Suspension', '65L Capacity', 'Integrated Rain Cover', 'Multiple Pockets']
  },
  {
    id: 'cabelas-alaskan-frame-pack',
    title: "Cabela's Alaskan II Frame Pack",
    description: 'External frame pack designed for heavy loads and extended backcountry expeditions.',
    image: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400',
    price: '$349.99',
    rating: 4.3,
    reviewCount: 298,
    affiliateLink: 'https://cabelas.com/shop/en/cabelas-alaskan-ii-frame-pack',
    source: 'cabelas',
    category: 'Backpacks',
    features: ['External Frame', 'Heavy Duty', 'Adjustable Torso', 'Load Lifters']
  },

  // Cooking Gear
  {
    id: 'jetboil-flash-stove',
    title: 'Jetboil Flash Cooking System',
    description: 'All-in-one stove system that boils water in just over 2 minutes with push-button ignition.',
    image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400',
    price: '$109.95',
    rating: 4.6,
    reviewCount: 2145,
    affiliateLink: 'https://amazon.com/dp/B01LX5J9V8',
    source: 'amazon',
    category: 'Cooking',
    features: ['Fast Boil', 'Push-Button Ignition', 'Insulated Cozy', 'Compact Design']
  },
  {
    id: 'coleman-camp-stove',
    title: 'Coleman Classic Propane Stove',
    description: 'Reliable two-burner stove with adjustable burners and wind guards for outdoor cooking.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400',
    price: '$59.99',
    rating: 4.4,
    reviewCount: 3241,
    affiliateLink: 'https://amazon.com/dp/B0009PURGA',
    source: 'amazon',
    category: 'Cooking',
    features: ['Two Burners', 'Wind Guards', 'Adjustable Heat', 'Easy Setup']
  },

  // Hiking Boots
  {
    id: 'merrell-moab-boots',
    title: 'Merrell Moab 3 Hiking Boots',
    description: 'Durable hiking boots with Vibram outsole and protective toe cap for rugged terrain.',
    image: 'https://images.unsplash.com/photo-1544966503-7cc5ac882d5f?w=400',
    price: '$139.95',
    rating: 4.3,
    reviewCount: 4532,
    affiliateLink: 'https://amazon.com/dp/B08XZPB9J4',
    source: 'amazon',
    category: 'Footwear',
    features: ['Vibram Outsole', 'Protective Toe Cap', 'Breathable Mesh', 'Ankle Support']
  },
  {
    id: 'cabelas-meindl-boots',
    title: "Cabela's Meindl Perfekt Hiking Boots",
    description: 'Premium leather boots handcrafted in Germany with exceptional durability and comfort.',
    image: 'https://images.unsplash.com/photo-1520639888713-7851133b1ed0?w=400',
    price: '$399.99',
    rating: 4.8,
    reviewCount: 187,
    affiliateLink: 'https://cabelas.com/shop/en/cabelas-meindl-perfekt-hiking-boots',
    source: 'cabelas',
    category: 'Footwear',
    features: ['German Craftsmanship', 'Full Leather', 'Gore-Tex', 'Resoleable']
  },

  // Headlamps & Lighting
  {
    id: 'black-diamond-headlamp',
    title: 'Black Diamond Spot 400 Headlamp',
    description: 'Waterproof headlamp with 400 lumens and multiple lighting modes including red night vision.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    price: '$39.95',
    rating: 4.5,
    reviewCount: 1687,
    affiliateLink: 'https://amazon.com/dp/B082WWHDTF',
    source: 'amazon',
    category: 'Lighting',
    features: ['400 Lumens', 'Waterproof', 'Red Night Vision', 'Multiple Modes']
  },
  {
    id: 'goal-zero-lantern',
    title: 'Goal Zero Lighthouse 400 Lantern',
    description: 'Solar rechargeable lantern with USB charging ports and hand crank backup power.',
    image: 'https://images.unsplash.com/photo-1602881917617-61882e37b258?w=400',
    price: '$79.95',
    rating: 4.4,
    reviewCount: 892,
    affiliateLink: 'https://amazon.com/dp/B06XQF9T8K',
    source: 'amazon',
    category: 'Lighting',
    features: ['Solar Rechargeable', 'USB Charging', 'Hand Crank', 'Collapsible']
  },

  // Water Filtration
  {
    id: 'lifestraw-filter',
    title: 'LifeStraw Personal Water Filter',
    description: 'Portable water filter that removes bacteria and parasites from contaminated water sources.',
    image: 'https://images.unsplash.com/photo-1571863533956-01c88e79957e?w=400',
    price: '$19.95',
    rating: 4.4,
    reviewCount: 15234,
    affiliateLink: 'https://amazon.com/dp/B006QF3TW4',
    source: 'amazon',
    category: 'Water',
    features: ['Removes Bacteria', 'No Chemicals', '1000L Capacity', 'Lightweight']
  },
  {
    id: 'katadyn-gravity-filter',
    title: 'Katadyn Gravity BeFree 10L Water Filter',
    description: 'High-capacity gravity filter system perfect for group camping and base camps.',
    image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=400',
    price: '$149.95',
    rating: 4.6,
    reviewCount: 423,
    affiliateLink: 'https://amazon.com/dp/B077SLBR7X',
    source: 'amazon',
    category: 'Water',
    features: ['10L Capacity', 'Gravity Fed', 'Fast Flow Rate', 'Easy Setup']
  },

  // Navigation & Electronics
  {
    id: 'garmin-inreach-mini',
    title: 'Garmin inReach Mini 2 Satellite Communicator',
    description: 'Compact satellite communicator with SOS and two-way messaging capabilities.',
    image: 'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=400',
    price: '$399.99',
    rating: 4.5,
    reviewCount: 734,
    affiliateLink: 'https://amazon.com/dp/B09B82P86M',
    source: 'amazon',
    category: 'Electronics',
    features: ['Satellite Messaging', 'SOS Feature', 'GPS Tracking', 'Smartphone Pairing']
  }
]

// Helper functions for gear data
export function getGearByCategory(category: string): GearItem[] {
  return gearData.filter(item => 
    item.category.toLowerCase() === category.toLowerCase()
  )
}

export function getGearBySource(source: 'amazon' | 'cabelas'): GearItem[] {
  return gearData.filter(item => item.source === source)
}

export function getFeaturedGear(limit: number = 6): GearItem[] {
  // Sort by rating and review count for featured selection
  return [...gearData]
    .sort((a, b) => {
      const scoreA = a.rating * Math.log(a.reviewCount + 1)
      const scoreB = b.rating * Math.log(b.reviewCount + 1)
      return scoreB - scoreA
    })
    .slice(0, limit)
}

export function getGearOnSale(): GearItem[] {
  return gearData.filter(item => item.originalPrice)
}

export function searchGear(query: string): GearItem[] {
  const searchTerms = query.toLowerCase().split(/\s+/)
  return gearData.filter(item => {
    const searchText = [
      item.title,
      item.description,
      item.category,
      ...item.features,
    ].join(' ').toLowerCase()

    return searchTerms.every(term => searchText.includes(term))
  })
}

export function getUniqueCategories(): string[] {
  const categories = new Set(gearData.map(item => item.category))
  return Array.from(categories).sort()
}

export function getRelatedGear(gearItem: GearItem, limit: number = 4): GearItem[] {
  return gearData
    .filter(item => item.id !== gearItem.id)
    .filter(item => 
      item.category === gearItem.category || 
      item.features.some(feature => gearItem.features.includes(feature))
    )
    .sort((a, b) => b.rating - a.rating)
    .slice(0, limit)
}