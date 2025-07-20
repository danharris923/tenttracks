'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { cn } from '@/lib/utils/cn'
import type { Campground } from '@/types'
import { Button } from './button'
import { MapPin, Locate, ZoomIn, ZoomOut } from 'lucide-react'

// Set Mapbox access token
mapboxgl.accessToken = process.env.NEXT_PUBLIC_MAPBOX_ACCESS_TOKEN || ''

export interface MapProps {
  campgrounds?: Campground[]
  center?: [number, number] // [longitude, latitude]
  zoom?: number
  className?: string
  onCampgroundClick?: (campground: Campground) => void
  showUserLocation?: boolean
  height?: string
}

export default function InteractiveMap({
  campgrounds = [],
  center = [-95.7129, 37.0902], // Geographic center of US
  zoom = 4,
  className,
  onCampgroundClick,
  showUserLocation = true,
  height = '400px',
}: MapProps) {
  const mapContainer = useRef<HTMLDivElement>(null)
  const map = useRef<mapboxgl.Map | null>(null)
  const userLocationMarker = useRef<mapboxgl.Marker | null>(null)
  const campgroundMarkers = useRef<mapboxgl.Marker[]>([])
  
  const [isMapLoaded, setIsMapLoaded] = useState(false)
  const [, setUserLocation] = useState<[number, number] | null>(null)
  const [mapError, setMapError] = useState<string | null>(null)

  // Initialize map
  useEffect(() => {
    if (!mapContainer.current || map.current) return

    if (!mapboxgl.accessToken) {
      setMapError('Mapbox access token is not configured')
      return
    }

    try {
      map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/outdoors-v12', // Outdoor style perfect for campgrounds
        center,
        zoom,
        attributionControl: false,
      })

      // Add navigation controls
      map.current.addControl(new mapboxgl.NavigationControl(), 'top-right')
      
      // Add scale control
      map.current.addControl(new mapboxgl.ScaleControl(), 'bottom-left')

      // Map loaded event
      map.current.on('load', () => {
        setIsMapLoaded(true)
      })

      // Error handling
      map.current.on('error', (e) => {
        console.error('Mapbox error:', e)
        setMapError('Failed to load map')
      })

    } catch (error) {
      console.error('Failed to initialize map:', error)
      setMapError('Failed to initialize map')
    }

    return () => {
      if (map.current) {
        map.current.remove()
        map.current = null
      }
    }
  }, [center, zoom])

  // Add campground markers
  useEffect(() => {
    if (!map.current || !isMapLoaded) return

    // Clear existing markers
    campgroundMarkers.current.forEach(marker => marker.remove())
    campgroundMarkers.current = []

    // Add new markers
    campgrounds.forEach(campground => {
      const { lat, lng } = campground.location.coordinates

      // Create marker element
      const markerElement = document.createElement('div')
      markerElement.className = 'campground-marker'
      markerElement.innerHTML = `
        <div class="bg-primary-600 text-white p-2 rounded-full shadow-lg cursor-pointer hover:bg-primary-700 transition-colors">
          <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd" />
          </svg>
        </div>
      `

      // Create marker
      const marker = new mapboxgl.Marker(markerElement)
        .setLngLat([lng, lat])
        .addTo(map.current!)

      // Create popup
      const popup = new mapboxgl.Popup({ offset: 25 })
        .setHTML(`
          <div class="p-3 max-w-xs">
            <h3 class="font-semibold text-gray-900 mb-1">${campground.name}</h3>
            <p class="text-sm text-gray-600 mb-2">${campground.location.city}, ${campground.location.state}</p>
            <div class="flex items-center mb-2">
              <div class="flex items-center">
                <svg class="w-4 h-4 text-yellow-400 mr-1" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
                <span class="text-sm font-medium text-gray-900">${campground.rating}</span>
                <span class="text-sm text-gray-500 ml-1">(${campground.reviewCount})</span>
              </div>
            </div>
            <p class="text-sm text-green-600 font-medium">${campground.priceRange}</p>
          </div>
        `)

      // Add click event
      markerElement.addEventListener('click', () => {
        if (onCampgroundClick) {
          onCampgroundClick(campground)
        }
      })

      marker.setPopup(popup)
      campgroundMarkers.current.push(marker)
    })
  }, [campgrounds, isMapLoaded, onCampgroundClick])

  // Get user location
  const getUserLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setMapError('Geolocation is not supported by this browser')
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords
        const userCoords: [number, number] = [longitude, latitude]
        
        setUserLocation(userCoords)

        if (map.current) {
          // Fly to user location
          map.current.flyTo({
            center: userCoords,
            zoom: 10,
            duration: 2000,
          })

          // Add/update user location marker
          if (userLocationMarker.current) {
            userLocationMarker.current.remove()
          }

          const userMarkerElement = document.createElement('div')
          userMarkerElement.innerHTML = `
            <div class="bg-blue-500 text-white p-3 rounded-full shadow-lg">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
              </svg>
            </div>
          `

          userLocationMarker.current = new mapboxgl.Marker(userMarkerElement)
            .setLngLat(userCoords)
            .setPopup(new mapboxgl.Popup().setHTML('<div class="p-2 text-sm">Your Location</div>'))
            .addTo(map.current)
        }
      },
      (error) => {
        console.error('Geolocation error:', error)
        setMapError('Unable to get your location')
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 300000,
      }
    )
  }, [])

  // Zoom controls
  const zoomIn = useCallback(() => {
    if (map.current) {
      map.current.zoomIn()
    }
  }, [])

  const zoomOut = useCallback(() => {
    if (map.current) {
      map.current.zoomOut()
    }
  }, [])

  // Fit bounds to show all campgrounds
  const fitToCampgrounds = useCallback(() => {
    if (!map.current || campgrounds.length === 0) return

    const bounds = new mapboxgl.LngLatBounds()
    
    campgrounds.forEach(campground => {
      bounds.extend([
        campground.location.coordinates.lng,
        campground.location.coordinates.lat
      ])
    })

    map.current.fitBounds(bounds, {
      padding: 50,
      maxZoom: 12,
    })
  }, [campgrounds])

  if (mapError) {
    return (
      <div className={cn('flex items-center justify-center bg-gray-100 rounded-lg', className)} style={{ height }}>
        <div className="text-center p-6">
          <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 mb-4">{mapError}</p>
          <Button onClick={() => setMapError(null)} variant="outline" size="sm">
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className={cn('relative', className)} style={{ height }}>
      <div ref={mapContainer} className="w-full h-full rounded-lg overflow-hidden" />
      
      {/* Map Controls */}
      <div className="absolute top-4 left-4 flex flex-col gap-2">
        {showUserLocation && (
          <Button
            size="icon"
            variant="secondary"
            onClick={getUserLocation}
            className="bg-white/90 hover:bg-white shadow-md"
          >
            <Locate className="h-4 w-4" />
          </Button>
        )}
        
        {campgrounds.length > 0 && (
          <Button
            size="icon"
            variant="secondary"
            onClick={fitToCampgrounds}
            className="bg-white/90 hover:bg-white shadow-md"
          >
            <MapPin className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Custom Zoom Controls */}
      <div className="absolute top-4 right-4 flex flex-col gap-1">
        <Button
          size="icon"
          variant="secondary"
          onClick={zoomIn}
          className="bg-white/90 hover:bg-white shadow-md"
        >
          <ZoomIn className="h-4 w-4" />
        </Button>
        <Button
          size="icon"
          variant="secondary"
          onClick={zoomOut}
          className="bg-white/90 hover:bg-white shadow-md"
        >
          <ZoomOut className="h-4 w-4" />
        </Button>
      </div>

      {/* Loading overlay */}
      {!isMapLoaded && (
        <div className="absolute inset-0 bg-gray-100 rounded-lg flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-600 mx-auto mb-4"></div>
            <p className="text-gray-600 text-sm">Loading map...</p>
          </div>
        </div>
      )}

      {/* Campground count */}
      {campgrounds.length > 0 && (
        <div className="absolute bottom-4 left-4 bg-white/90 px-3 py-2 rounded-lg shadow-md">
          <p className="text-sm font-medium text-gray-900">
            {campgrounds.length} campground{campgrounds.length !== 1 ? 's' : ''} shown
          </p>
        </div>
      )}
    </div>
  )
}