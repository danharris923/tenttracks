// Core data types for TentTracks

export interface Campground {
  id: string;
  slug: string;
  name: string;
  description: string;
  location: {
    state: string;
    city: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  features: string[];
  amenities: string[];
  rating: number;
  reviewCount: number;
  images: string[];
  priceRange: string;
  website?: string;
  phone?: string;
}

export interface GearItem {
  id: string;
  title: string;
  description: string;
  image: string;
  price: string;
  originalPrice?: string;
  rating: number;
  reviewCount: number;
  affiliateLink: string;
  source: 'amazon' | 'cabelas';
  category: string;
  features: string[];
}

export interface Review {
  id: string;
  campgroundId: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  datePublished: string;
  helpful: number;
  images?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  content: string;
  author: string;
  datePublished: string;
  dateModified: string;
  featuredImage: string;
  tags: string[];
  readingTime: number;
}

export interface AffiliateClick {
  timestamp: string;
  originalUrl: string;
  finalUrl: string;
  userAgent: string;
  referrer: string;
  geoLocation?: string;
}

// UI Component prop types
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

export interface BadgeProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error';
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export interface InputProps {
  type?: string;
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  disabled?: boolean;
  required?: boolean;
}

// Search and filter types
export interface SearchFilters {
  location?: string;
  state?: string;
  amenities?: string[];
  priceRange?: [number, number];
  rating?: number;
  features?: string[];
}

export interface GeolocationData {
  latitude: number;
  longitude: number;
  accuracy: number;
}

// SEO and metadata types
export interface PageMetadata {
  title: string;
  description: string;
  canonical?: string;
  openGraph?: {
    title: string;
    description: string;
    image: string;
    url: string;
  };
  jsonLd?: object;
}

// Analytics types
export interface AnalyticsEvent {
  event: string;
  category: string;
  label?: string;
  value?: number;
  customParameters?: Record<string, string | number>;
}