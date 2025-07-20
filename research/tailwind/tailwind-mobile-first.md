# Tailwind CSS Mobile-First Documentation

## Core Philosophy
- Utility-first CSS framework
- Works by scanning all HTML files, JavaScript components, and templates for class names
- Generates corresponding styles into a static CSS file
- Zero-runtime performance

## Responsive Design
- Mobile-first approach built into utility classes
- Responsive design achieved through responsive prefixes (e.g., `sm:`, `md:`, `lg:`)
- Easily create adaptive layouts using utility classes

## Customization
- Supports adding custom styles
- Configurable theme variables
- Flexible color and design system

## Integration
- Works seamlessly with modern frameworks like Vite, Next.js
- Easy installation via npm
- Supports PostCSS and CLI workflows

## Key Features
- Dark mode support
- Comprehensive utility classes for layout, typography, spacing
- Flexible grid and flexbox utilities
- Advanced effects and filters

## Example Installation (Next.js)
```bash
npm install tailwindcss postcss autoprefixer
npx tailwindcss init -p
```

## Example Responsive Layout
```html
<div class="flex flex-col md:flex-row">
  <div class="w-full md:w-1/2">Mobile full, desktop half</div>
  <div class="w-full md:w-1/2">Mobile full, desktop half</div>
</div>
```

## Mobile-First Utility Classes
- `w-full` → full width on mobile
- `md:w-1/2` → half width on medium screens and up
- `flex-col` → column layout on mobile
- `md:flex-row` → row layout on medium screens and up