# Playwright Web Scraping Documentation

## Playwright Capabilities for Web Automation and Scraping

### Cross-Browser and Cross-Platform Support
- Supports Chromium, WebKit, and Firefox
- Works on Windows, Linux, and macOS
- Supports multiple programming languages (TypeScript, JavaScript, Python, .NET, Java)

### Key Automation Features
- Auto-wait for elements to be actionable before performing actions
- Eliminates artificial timeouts
- Supports complex scenarios across multiple tabs, origins, and users
- Can interact with dynamic controls and pierce Shadow DOM

### Advanced Testing/Scraping Techniques
- Browser contexts provide full test isolation
- Trusted event generation mimicking real user interactions
- Native mobile web emulation
- Ability to handle complex web applications

### Powerful Tooling
- Codegen for test/scraping script generation
- Playwright Inspector for selector generation
- Trace Viewer for capturing detailed execution information

### Web Scraping Considerations
- Robust handling of dynamic content
- Ability to interact with complex web interfaces
- Cross-browser compatibility reduces scraping challenges

## Example Scraping Implementation for Cabela's

```javascript
// scripts/scrape-cabelas.mjs
import { chromium } from 'playwright';

export async function scrapeCabelasDeals() {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  try {
    await page.goto('https://www.cabelas.com/category/camping-gear/104791080');
    
    // Wait for products to load
    await page.waitForSelector('.product-item');
    
    const products = await page.evaluate(() => {
      const items = document.querySelectorAll('.product-item');
      return Array.from(items).map(item => ({
        title: item.querySelector('.product-title')?.textContent?.trim(),
        price: item.querySelector('.price')?.textContent?.trim(),
        image: item.querySelector('img')?.src,
        link: item.querySelector('a')?.href,
        rating: item.querySelector('.rating')?.textContent?.trim()
      })).filter(item => item.title && item.price);
    });
    
    return products;
  } catch (error) {
    console.error('Scraping error:', error);
    return [];
  } finally {
    await browser.close();
  }
}
```

## Best Practices for E-commerce Scraping

### Respect Rate Limits
```javascript
// Add delays between requests
await page.waitForTimeout(1000);
```

### Handle Dynamic Content
```javascript
// Wait for specific elements
await page.waitForSelector('.product-list');
await page.waitForLoadState('networkidle');
```

### User-Agent and Headers
```javascript
const page = await browser.newPage({
  userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
});
```

### Error Handling
```javascript
try {
  await page.goto(url, { waitUntil: 'networkidle' });
} catch (error) {
  if (error.name === 'TimeoutError') {
    // Handle timeout
  }
}
```

## TentTracks Integration Pattern

```javascript
// lib/scraping/cabelas.ts
import { scrapeCabelasDeals } from '../../scripts/scrape-cabelas.mjs';

export async function getCampingGearDeals() {
  const deals = await scrapeCabelasDeals();
  
  // Transform to TentTracks format
  return deals.map(deal => ({
    id: generateId(deal.link),
    title: deal.title,
    price: deal.price,
    image: deal.image,
    link: `/out?url=${encodeURIComponent(deal.link)}`, // Affiliate redirect
    rating: parseFloat(deal.rating) || 0,
    source: 'cabelas'
  }));
}
```

## Limitations/Considerations
- Designed primarily for testing, not exclusively for web scraping
- Requires careful implementation to respect website terms of service
- Monitor for anti-bot measures and adjust accordingly
- Consider caching results to reduce scraping frequency