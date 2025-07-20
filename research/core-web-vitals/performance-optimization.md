# Core Web Vitals Performance Optimization

## Core Web Vitals Overview
Core Web Vitals are three key performance metrics that measure critical aspects of web user experience:

### 1. Largest Contentful Paint (LCP)
- Measures loading performance
- Target: within 2.5 seconds of when the page first starts loading
- Represents how quickly the main content of a page loads

### 2. Interaction to Next Paint (INP)
- Measures interactivity
- Target: 200 milliseconds or less
- Assesses page responsiveness and user interaction performance

### 3. Cumulative Layout Shift (CLS)
- Measures visual stability
- Target: 0.1 or less
- Evaluates how much page elements move during loading

## Measurement Recommendations
- Measure at the 75th percentile of page loads
- Use field tools like Chrome User Experience Report
- Recommended measurement library: web-vitals JavaScript library

## Optimization Strategies
Key optimization guides include:
- Optimize LCP
- Optimize INP
- Optimize CLS

## Measurement Tools

### Field Tools
- Chrome User Experience Report
- Chrome DevTools
- PageSpeed Insights
- Search Console

### Lab Tools
- Chrome DevTools
- Lighthouse (with limitations for INP)

## Implementation Example
```javascript
import {onCLS, onINP, onLCP} from 'web-vitals';

function sendToAnalytics(metric) {
  const body = JSON.stringify(metric);
  (navigator.sendBeacon && navigator.sendBeacon('/analytics', body)) ||
    fetch('/analytics', {body, method: 'POST', keepalive: true});
}

onCLS(sendToAnalytics);
onINP(sendToAnalytics);
onLCP(sendToAnalytics);
```

## Next.js Specific Optimizations

### LCP Optimization
```javascript
// Use Next.js Image component for optimized loading
import Image from 'next/image';

<Image
  src="/hero-campground.jpg"
  alt="Beautiful campground"
  width={1200}
  height={600}
  priority // For above-the-fold images
/>
```

### CLS Prevention
```css
/* Reserve space for images to prevent layout shift */
.image-container {
  aspect-ratio: 16 / 9;
  position: relative;
}
```

### INP Optimization
```javascript
// Use React.lazy for code splitting
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <p>Loading...</p>
});
```

## TentTracks Performance Targets
- Lighthouse mobile score > 90
- LCP < 2.5s
- INP < 200ms
- CLS < 0.1
- First Contentful Paint < 1.8s