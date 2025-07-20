name: "TentTracks PRP - SEO‑Driven Camping Site with Affiliate Monetization"
description: |

## Purpose
Template optimized for AI agents to implement a fully SEO-optimized, mobile-first camping site with scalable affiliate monetization and future extensibility through modular design.

## Core Principles
1. **Context is King**: Full stack documentation, SEO meta, affiliate tagging rules, and UI strategy are provided.
2. **Validation Loops**: Lighthouse audits, redirect click test, metadata rendering, and CI validation built in.
3. **Information Dense**: Includes affiliate structure, UX layout, SEO patterns, and known constraints.
4. **Progressive Success**: MVP ready on day one with structured scaling roadmap.
5. **Global rules**: Legal pages, tracking consent, and FTC affiliate disclosure are mandatory.

---

## Goal
Build a React/Next.js-based project called **TentTracks**, designed for campers in North America to:
- Discover campgrounds
- Browse gear deals (Amazon + Cabela’s)
- Read & contribute reviews
- Follow affiliate links (cookied)
- Experience high-speed mobile browsing

## Why
- Tap into a high-intent, evergreen niche with strong affiliate earning potential.
- Solve the poor UX of existing campground directories.
- Rank high in SEO with structured metadata, speed, and longtail keywords.
- Serve as the foundation for printables, guides, newsletter, and e-commerce.

## What

### User-visible behavior:
- Pages: Home, Destinations, Reviews, Gear Deals, Blog, About
- Users can search by location, read campground reviews, and click recommended gear links.
- Reviews are seeded with scraped content; geolocation surfaces nearby options.
- All gear links redirect through a tracking handler that adds affiliate tags.
- Metadata and JSON-LD for SEO are present on every page.
- Legal info is visible and compliant with FTC and affiliate policies.

### Success Criteria
- [x] Lighthouse mobile score > 90
- [x] Outbound links contain affiliate tags
- [x] JSON-LD and meta render correctly
- [x] Vercel analytics collects page/click data
- [x] Responsive on all viewports
- [x] Legal/consent present and functional
- [x] Ready for AdSense/Ezoic submission

---

## All Needed Context

### Documentation & References
```yaml
# MUST READ - Include these in your context window
- url: https://nextjs.org/docs
  why: Core Next.js docs for SSG, ISR, and metadata routing

- url: https://tailwindcss.com/docs
  why: Styling system used across the site (mobile-first + utility)

- url: https://vercel.com/docs
  why: Hosting and analytics integration

- url: https://developer.amazon.com/affiliate/product-advertising-api
  why: For fetching deals + proper use of affiliate tags

- url: https://affiliate-program.amazon.com/
  why: Official tagging format and restrictions

- url: https://docs.playwright.dev/
  why: Used to scrape Cabela’s (no API)

- url: https://developers.google.com/search/docs
  why: Required to optimize for Core Web Vitals and JSON-LD

- url: https://nextjs.org/docs/pages/api-reference/next-config-js/next-seo
  why: Per-route SEO config patterns

- url: https://docs.github.com/actions
  why: Setup CI for lint/test/deploy

- url: https://www.freecodecamp.org/news/core-web-vitals/
  why: Explains key SEO performance targets

- url: https://pubhelp.rakutenadvertising.com/
  why: For affiliate redirect formatting and tracking rules

- url: https://help.impact.com/en/support/home
  why: Deep links, SubID tags, affiliate link generation

- url: https://developers.cj.com/
  why: Link tracking, pixel requirements, conversion reporting
Desired Codebase Tree
bash
Copy
Edit
/app
  └── (public)
       ├── page.tsx
       ├── destinations/
       ├── gear-deals/
       ├── blog/
       ├── reviews/[campground]/
       └── about/

/components
  ├── ui/
  ├── sections/
  └── composite/

  # composite: GearCard, CampgroundGrid, ReviewSection

/lib
  ├── data/
  ├── affiliate/
  └── search/

/pages
  └── out.tsx          # Outbound redirect w/ affiliate tagging

/scripts
  └── scrape-cabelas.mjs

/public
  └── robots.txt
  └── sitemap.xml
Known Gotchas
python
Copy
Edit
# CRITICAL: Amazon PA-API rate-limits aggressively and can return null without valid auth.
# CRITICAL: Cabela’s requires Playwright scraping, no structured product API.
# SEO: next-seo requires per-route fallbacks or default fallbacks will break metadata.
# Legal: All affiliate usage must be disclosed and tracked (FTC + platform rules).
# Vercel Analytics must be explicitly configured in dashboard for data to appear.
Implementation Blueprint
Data models and structure
ts
Copy
Edit
// types.ts
export type Campground = {
  id: string
  name: string
  location: string
  features: string[]
  rating: number
  reviewCount: number
}

export type GearItem = {
  id: string
  title: string
  image: string
  price: string
  rating: number
  link: string
}
list of tasks
yaml
Copy
Edit
Task 1:
SETUP Next.js project w/ Tailwind & shadcn/ui
- Scaffold pages with App Router
- Add layout.tsx, globals.css, seo.ts config

Task 2:
CREATE GearCard, CampgroundGrid, ReviewSection in components/composite
- Props-driven display, responsive, accessible

Task 3:
IMPLEMENT /out.tsx redirect
- Parse target URL
- Append tag, subID
- Log/track click
- Redirect 302

Task 4:
SCRAPE starter reviews (Playwright → JSON)
- Store in content/reviews/ or via local API

Task 5:
ADD geolocation UX
- Ask permission on home/destinations
- Filter results by lat/lon radius

Task 6:
BUILD About page
- Include FTC disclosure, privacy, cookie, API attribution

Task 7:
CONFIGURE next-seo for metadata
- Add title/desc per route
- Inject JSON-LD for campgrounds + gear

Task 8:
ENABLE Vercel Analytics
- Connect project
- Track clicks, time-on-page, outbound flow
Per task pseudocode
ts
Copy
Edit
// Task 3 - outbound redirect
export async function GET(req: Request) {
  const url = new URL(req.url)
  const dest = url.searchParams.get('url')

  if (!dest) return new Response('Bad request', { status: 400 })

  const withTag = appendAffiliateTag(dest)
  logClickEvent(dest)

  return Response.redirect(withTag, 302)
}
Integration Points
yaml
Copy
Edit
DATABASE: n/a

VERCEL:
- Add ENV vars for affiliate tags
- Enable Vercel Analytics

CI:
- GitHub Actions: lint, type-check, deploy
- Lighthouse CI optional on PR

CONSENT:
- Cookie notice toggle using localStorage
- Consent bar shown once on first visit
Validation Loop
Level 1: Syntax & Style
bash
Copy
Edit
pnpm lint
pnpm type-check
Level 2: Affiliate + Metadata Unit Tests
ts
Copy
Edit
test("Amazon link gets tag", () => {
  const input = "https://amazon.ca/product/abc"
  const output = appendAffiliateTag(input)
  expect(output).toContain("tag=")
})

test("Missing param returns 400", async () => {
  const res = await GET(new Request("/out"))
  expect(res.status).toBe(400)
})
Level 3: Integration + SEO Test
bash
Copy
Edit
npx lighthouse http://localhost:3000 --preset=mobile
# Expect >90 performance and SEO scores
Final validation Checklist
 All core pages statically generated

 Meta + structured data in head

 Affiliate links tagged + tracked

 Consent visible + logged

 Reviews render + link to source

 Lighthouse score > 90 mobile

 Legal present on /about

Anti-Patterns to Avoid
❌ Don’t link directly to affiliate sites without tag

❌ Don’t hardcode affiliate values — use env vars

❌ Don’t use JavaScript-only rendering — prefer SSG

❌ Don’t fetch dynamic content