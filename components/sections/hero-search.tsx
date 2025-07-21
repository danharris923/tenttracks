'use client'

import { useRouter } from 'next/navigation'
import LocationSearch from './location-search'

interface HeroSearchProps {
  placeholder?: string
  className?: string
}

export default function HeroSearch({ placeholder, className }: HeroSearchProps) {
  const router = useRouter()

  const handleSearchChange = (query: string) => {
    if (query.trim()) {
      router.push(`/destinations?search=${encodeURIComponent(query.trim())}`)
    }
  }

  return (
    <LocationSearch
      placeholder={placeholder}
      className={className}
      onSearchChange={handleSearchChange}
    />
  )
}