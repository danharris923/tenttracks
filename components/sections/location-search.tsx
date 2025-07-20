'use client'

import { useState, useEffect, useCallback } from 'react'
import { MapPin, Search, Target, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Card } from '@/components/ui/card'
import { getCurrentLocation, getLocationWithFallback, formatDistance, isInNorthAmerica } from '@/lib/search/geolocation'
import { analytics } from '@/lib/utils/analytics'
import type { GeolocationData } from '@/types'

interface LocationSearchProps {
  onLocationSelect?: (location: GeolocationData & { name?: string }) => void
  onSearchChange?: (query: string) => void
  className?: string
  placeholder?: string
}

export default function LocationSearch({
  onLocationSelect,
  onSearchChange,
  className,
  placeholder = "Search for a city, state, or campground...",
}: LocationSearchProps) {
  const [searchQuery, setSearchQuery] = useState('')
  const [userLocation, setUserLocation] = useState<GeolocationData | null>(null)
  const [locationError, setLocationError] = useState<string | null>(null)
  const [isGettingLocation, setIsGettingLocation] = useState(false)
  const [searchSuggestions, setSearchSuggestions] = useState<Array<{
    id: string
    name: string
    location: GeolocationData
    type: 'city' | 'state' | 'campground'
  }>>([])

  // Handle search input
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value
    setSearchQuery(query)
    
    if (onSearchChange) {
      onSearchChange(query)
    }

    // Track search events
    if (query.length > 2) {
      analytics.searchCampgrounds(query, 0) // Will be updated with actual results
    }
  }, [onSearchChange])

  // Get user's current location
  const handleGetUserLocation = useCallback(async () => {
    setIsGettingLocation(true)
    setLocationError(null)

    try {
      const location = await getCurrentLocation({
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      })

      setUserLocation(location)

      // Check if user is in North America (primary service area)
      if (!isInNorthAmerica(location.latitude, location.longitude)) {
        setLocationError('TentTracks primarily serves campgrounds in North America')
      }

      if (onLocationSelect) {
        onLocationSelect({
          ...location,
          name: 'Your Current Location',
        })
      }

      // Track successful geolocation
      analytics.useGeolocation(true)

    } catch (error: unknown) {
      console.error('Geolocation error:', error)
      
      let errorMessage = 'Unable to get your location'
      
      // Type guard for error with type property
      if (error && typeof error === 'object' && 'type' in error) {
        switch ((error as { type: string }).type) {
        case 'permission_denied':
          errorMessage = 'Location access denied. Please enable location services.'
          break
        case 'position_unavailable':
          errorMessage = 'Location information is unavailable'
          break
        case 'timeout':
          errorMessage = 'Location request timed out'
          break
        case 'not_supported':
          errorMessage = 'Geolocation is not supported by your browser'
          break
        }
      }
      
      setLocationError(errorMessage)
      analytics.useGeolocation(false)

      // Try fallback location method
      try {
        const fallbackLocation = await getLocationWithFallback()
        if (fallbackLocation) {
          setUserLocation(fallbackLocation)
          if (onLocationSelect) {
            onLocationSelect({
              ...fallbackLocation,
              name: 'Approximate Location',
            })
          }
        }
      } catch (fallbackError) {
        console.warn('Fallback location also failed:', fallbackError)
      }
    } finally {
      setIsGettingLocation(false)
    }
  }, [onLocationSelect])

  // Mock search suggestions (in production, this would query a geocoding API)
  useEffect(() => {
    if (searchQuery.length < 2) {
      setSearchSuggestions([])
      return
    }

    // Simulate API delay
    const timeoutId = setTimeout(() => {
      // Mock suggestions based on common camping destinations
      const mockSuggestions = [
        { id: '1', name: 'Yellowstone National Park, WY', location: { latitude: 44.428, longitude: -110.588, accuracy: 1000 }, type: 'campground' as const },
        { id: '2', name: 'Yosemite National Park, CA', location: { latitude: 37.8651, longitude: -119.5383, accuracy: 1000 }, type: 'campground' as const },
        { id: '3', name: 'Denver, CO', location: { latitude: 39.7392, longitude: -104.9903, accuracy: 1000 }, type: 'city' as const },
        { id: '4', name: 'Moab, UT', location: { latitude: 38.5733, longitude: -109.5498, accuracy: 1000 }, type: 'city' as const },
        { id: '5', name: 'Great Smoky Mountains, TN', location: { latitude: 35.6118, longitude: -83.4895, accuracy: 1000 }, type: 'campground' as const },
      ].filter(suggestion => 
        suggestion.name.toLowerCase().includes(searchQuery.toLowerCase())
      )

      setSearchSuggestions(mockSuggestions)
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  // Handle suggestion selection
  const handleSuggestionSelect = useCallback((suggestion: typeof searchSuggestions[0]) => {
    setSearchQuery(suggestion.name)
    setSearchSuggestions([])
    
    if (onLocationSelect) {
      onLocationSelect({
        ...suggestion.location,
        name: suggestion.name,
      })
    }

    // Track location selection
    analytics.searchCampgrounds(suggestion.name, 1)
  }, [onLocationSelect])

  return (
    <div className={className}>
      <div className="space-y-4">
        {/* Search Input */}
        <div className="relative">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="text"
              placeholder={placeholder}
              value={searchQuery}
              onChange={handleSearchChange}
              className="pl-10 pr-4"
            />
          </div>

          {/* Search Suggestions */}
          {searchSuggestions.length > 0 && (
            <Card className="absolute z-10 w-full mt-2 max-h-60 overflow-y-auto" padding="none">
              <div className="py-2">
                {searchSuggestions.map((suggestion) => (
                  <button
                    key={suggestion.id}
                    onClick={() => handleSuggestionSelect(suggestion)}
                    className="w-full px-4 py-3 text-left hover:bg-gray-50 flex items-center space-x-3"
                  >
                    <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium text-gray-900 truncate">
                        {suggestion.name}
                      </p>
                      <Badge 
                        variant={suggestion.type === 'campground' ? 'primary' : 'secondary'}
                        size="sm"
                        className="mt-1"
                      >
                        {suggestion.type === 'campground' ? 'Campground' : 
                         suggestion.type === 'city' ? 'City' : 'State'}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          )}
        </div>

        {/* Current Location Button */}
        <div className="flex items-center space-x-3">
          <Button
            variant="outline"
            onClick={handleGetUserLocation}
            disabled={isGettingLocation}
            className="flex-shrink-0"
          >
            {isGettingLocation ? (
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current" />
            ) : (
              <Target className="h-4 w-4" />
            )}
            <span className="ml-2">
              {isGettingLocation ? 'Getting Location...' : 'Use My Location'}
            </span>
          </Button>

          {/* Current Location Display */}
          {userLocation && (
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <MapPin className="h-4 w-4" />
              <span>
                Location found ({formatDistance(userLocation.accuracy / 5280)} accuracy)
              </span>
            </div>
          )}
        </div>

        {/* Location Error */}
        {locationError && (
          <div className="flex items-center space-x-2 p-3 bg-yellow-50 border border-yellow-200 rounded-lg">
            <AlertCircle className="h-4 w-4 text-yellow-600 flex-shrink-0" />
            <p className="text-sm text-yellow-800">{locationError}</p>
          </div>
        )}

        {/* Popular Destinations */}
        <div className="space-y-2">
          <p className="text-sm font-medium text-gray-700">Popular Destinations</p>
          <div className="flex flex-wrap gap-2">
            {[
              'Yellowstone National Park',
              'Yosemite National Park', 
              'Grand Canyon National Park',
              'Zion National Park',
              'Great Smoky Mountains',
              'Glacier National Park'
            ].map((destination) => (
              <Badge
                key={destination}
                variant="outline"
                className="cursor-pointer hover:bg-gray-50"
                onClick={() => {
                  setSearchQuery(destination)
                  if (onSearchChange) {
                    onSearchChange(destination)
                  }
                }}
              >
                {destination}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}