# Schema.org Camping Structured Data

## CampingPitch Documentation Summary

### Definition
"A CampingPitch is an individual place for overnight stay in the outdoors, typically being part of a larger camping site, or Campground."

### Key Characteristics
- Subclass of Accommodation
- Part of a larger campground or camping site
- Designed for tent, camper van, or caravan overnight stays

### Terminology Nuance
- British English: "campsite" means an area divided into pitches
- American English: "campsite" means an area where individuals can pitch a tent or park a camper

## Important Properties

### Inherited from Accommodation
- `petsAllowed`: Boolean indicating pet permissions
- `occupancy`: Maximum number of people
- `amenityFeature`: Specific characteristics of the pitch
- `floorSize`: Size of the camping area

### Inherited from Place
- `address`: Physical location
- `geo`: Geographic coordinates
- `openingHoursSpecification`: Available camping times

## TentTracks Implementation Examples

### Campground JSON-LD
```json
{
  "@context": "https://schema.org",
  "@type": "Campground",
  "name": "Scenic Lake Campground",
  "description": "Beautiful lakeside camping with full amenities",
  "url": "https://tenttracks.com/reviews/scenic-lake-campground",
  "image": "https://tenttracks.com/images/scenic-lake.jpg",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "123 Lake Shore Drive",
    "addressLocality": "Mountain View",
    "addressRegion": "CA",
    "postalCode": "94041",
    "addressCountry": "US"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.123",
    "longitude": "-73.456"
  },
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "WiFi",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Restrooms",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Fire Pits",
      "value": true
    }
  ],
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.5",
    "reviewCount": "127"
  },
  "review": [
    {
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": "John Doe"
      },
      "datePublished": "2024-01-15",
      "reviewBody": "Amazing campground with great facilities!",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      }
    }
  ],
  "priceRange": "$25-$50",
  "telephone": "+1-555-123-4567",
  "openingHours": "Mo-Su 08:00-20:00"
}
```

### Individual CampingPitch JSON-LD
```json
{
  "@context": "https://schema.org",
  "@type": "CampingPitch",
  "name": "Lakeside Pitch #15",
  "description": "Premium lakefront camping pitch with water and electric hookups",
  "partOf": {
    "@type": "Campground",
    "name": "Scenic Lake Campground"
  },
  "occupancy": {
    "@type": "QuantitativeValue",
    "value": 6
  },
  "amenityFeature": [
    {
      "@type": "LocationFeatureSpecification",
      "name": "Electric Hookup",
      "value": "30 amp"
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Water Hookup",
      "value": true
    },
    {
      "@type": "LocationFeatureSpecification",
      "name": "Sewer Hookup",
      "value": false
    }
  ],
  "petsAllowed": true,
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": "40.123456",
    "longitude": "-73.456789"
  }
}
```

### Product (Camping Gear) JSON-LD
```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "4-Person Camping Tent",
  "image": "https://tenttracks.com/images/tent.jpg",
  "description": "Waterproof 4-person camping tent perfect for family trips",
  "brand": {
    "@type": "Brand",
    "name": "OutdoorGear Pro"
  },
  "offers": {
    "@type": "Offer",
    "priceCurrency": "USD",
    "price": "149.99",
    "availability": "https://schema.org/InStock",
    "url": "https://tenttracks.com/out?url=https://amazon.com/tent-product"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.3",
    "reviewCount": "89"
  },
  "category": "Camping Equipment"
}
```

## Recommended Use
- Use for structured data about specific camping locations
- Provide detailed amenities and site specifications
- Link to broader campground or camping site information
- Include review and rating data for SEO benefits