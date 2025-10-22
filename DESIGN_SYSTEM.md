# AllTripp Design System

A concise reference for the visual, interaction, and motion language powering the AllTripp experience.

---
## 1. Brand Foundations

### Color Tokens (CSS Variables in `globals.css`)
| Token | Purpose |
|-------|---------|
| `--brand-accent` | Primary accent (buttons / highlights) |
| `--surface-base` | Primary app background (dark) |
| `--surface-alt` | Elevated cards / panels |
| `--surface-raised` | Higher elevation (drawers, modals) |
| `--border-subtle` | Low-contrast dividers / outlines |
| `--text-primary` | High emphasis text |
| `--text-secondary` | Body / secondary text |
| `--text-dim` | Muted metadata, helper labels |

Additional transient opacity layers (e.g. white/xx) are applied via Tailwind utilities.

### Elevation & Depth
| Layer | Treatment |
|-------|----------|
| Base | Flat, gradient backdrops, subtle vignette |
| Card (`card-modern`) | Backdrop blur + subtle inner/outer border + low alpha stroke |
| Interactive Hover | Scale 1.01–1.03, soft shadow `0 4px 28px -8px rgba(0,0,0,.55)` |
| Focus | `.focusable` ring (outline + glow) independent of hover |

---
## 2. Typography

### Font Stack
- Display / Headings: Montserrat (weights 600–800)
- Body / UI: Inter variable (optical sizing on by default)

### Scale (CSS custom properties)
| Var | Rem | Suggested Use |
|-----|-----|---------------|
| `--font-size-xs` | 0.75 | Superscripts, micro labels |
| `--font-size-sm` | 0.875 | Secondary metadata |
| `--font-size-base` | 1 | Body text, paragraph |
| `--font-size-md` | 1.125 | Eyebrows, small emphasis |
| `--font-size-lg` | 1.25 | Section intros |
| `--font-size-xl` | 1.5 | Sub–head large |
| `--font-size-2xl` | 1.875 | H4/H3 bridge |
| `--font-size-3xl` | 2.25 | H2 prominent |
| `--font-size-4xl` | 3 | Hero headline breakpoint start |
| `--font-size-5xl` | 3.75 | Large hero headline |

Utility: `.heading-display` applies tracking, weight, responsive scaling, and accent gradient handling where needed.

### Line Length & Rhythm
- Optimal paragraph width: 55–70ch
- Headings tight leading; body relaxed leading (~1.6)

---
## 3. Spacing & Layout

| Utility | Purpose |
|---------|---------|
| `.section-spacing` | Vertical section rhythm (clamp-based) |
| `.card-modern` | Unified card aesthetic (background blend, blur, border) |
| Container | `max-w-7xl` centralized; horizontal padding adaptive via Tailwind breakpoints |

---
## 4. Components

### Cards (`card-modern`)
Principles: reduced glare, layered translucency, cinematic mood. Includes:
- Backdrop blur (for dynamic ambient depth)
- Semi–transparent gradient overlays
- Border layering: inner hairline + subtle outer alpha stroke

### Buttons
- Primary gradient / accent uses `--brand-accent`
- Motion: subtle scale on hover, shadow amplification
- Focus: always visible ring courtesy of `.focusable` independent of color

### Navigation
- Hide-on-scroll logic (desktop)
- Accessible states: `aria-current="page"`, focus outlines, keyboard reachability for drawer items

---
## 5. Motion System (`lib/motion.ts`)

| Variant | Intent | Notes |
|---------|--------|-------|
| `fadeInUp` | Entrance + elevation reveal | Opacity + Y + blur clear |
| `staggerContainer(delay, stagger)` | Orchestrates children | Compose with other variants |
| `scaleIn` | Subtle pop-in for icons / toggles | Scale 0.95 → 1 |
| `fadeIn` | Minimal opacity reveal | Lightweight fallback |
| `slideInX(dir)` | Horizontal entrance | `dir` 1 or -1 |
| `viewportOnce` | Viewport control helper | `amount: 0.15` |

Guidelines:
- Avoid simultaneous large translations + scale for readability
- Duration sweet spot: 0.45–0.65s for primary section content
- Easing: Material-esque `[0.4,0,0.2,1]` for natural acceleration

---
## 6. Interaction & Accessibility

### Focus Management
`.focusable` adds:
- Visible ring (even in dark context)
- Isolation from hover states
Use on all custom interactive wrappers (cards with click, icon buttons, pseudo-buttons).

### Color Contrast
Target WCAG AA for all interactive text (≥4.5:1). Dim text is reserved for non-essential copy.

### Motion Preferences
Future Enhancement: Respect `prefers-reduced-motion` by swapping complex variants to simple fades.

---
## 7. Imagery & Performance

### Progressive Media
- All key imagery uses `placeholder="blur"` with lightweight embedded SVG gradients via `getBlurData()`.
- Avatars & cards prioritize quick skeleton-free reveal.

### Network Optimization
- ETag conditional GET in `/api/progress` + client `If-None-Match` prevents redundant payload hydration.
- Debounced POST (600ms) reduces write amplification.

Future: Add `<link rel="preload">` for hero background & critical font subsets.

---
## 8. SEO, Content & Metadata System

The platform now implements a centralized, extensible metadata + structured data architecture housed in `lib/seo.ts` and small page-level helpers. This section documents how to extend or safely consume it.

### 8.1 Core Architecture
| Layer | Responsibility | Key Functions |
|-------|----------------|---------------|
| Canonical Builder | Normalize absolute canonical URL for any route | `buildCanonical(path)` |
| Generic Metadata | Base title/description/OG defaults & global site settings | `generateMetadata(base)` |
| Domain-Specific Generators | Tailored metadata per entity type (blog post, destination, package, itinerary) | `generateBlogMetadata`, `generateDestinationMetadata`, `generatePackageMetadata` |
| Dynamic OG Helper | Ensures every page has a valid OG image (static override or dynamic fallback) | `buildOgImage(title, type?)` |
| Structured Data Builders | Return JSON-LD objects (not string) for reuse | `buildTravelAgency`, `buildDestination`, `buildTourPackage`, `buildBlogPosting`, `generateItemListStructuredData`, `buildBreadcrumbList` |
| Rendering Component | Safely injects JSON-LD into `<head>` | `<StructuredData data={...} />` |

Guidelines:
1. Page routes import ONLY what they need (avoid bundling entire SEO utils for API routes).
2. New entity types should follow the pattern: builder (pure fn) → metadata wrapper → optional structured data builder.
3. Keep functions pure & side‑effect free (input → output). No global mutation.

### 8.2 Dynamic Open Graph Image Workflow
Route: `app/api/og/route.tsx` (Edge runtime)
1. Page calls `buildOgImage(title, type)` which returns absolute URL: `https://<host>/api/og?title=<encoded>&type=<entity>`.
2. OG route renders a React/JSX template (tailored colors / typography) into an image.
3. If a page supplies a static image URL, pass it directly in metadata and skip dynamic builder.

Performance Notes:
- Edge function kept lean: no external font fetches beyond cached ones; minimal layout complexity.
- Titles truncated / scaled at runtime to avoid overflow.

### 8.3 Structured Data Vocabulary Implemented
| Type | Use Case | Builder |
|------|---------|---------|
| `TravelAgency` | Global site context (in `app/layout.tsx`) | `buildTravelAgency()` |
| `TouristDestination` | Individual destination detail pages | `buildDestination(data)` |
| `TouristTrip` (Trip / Package) | Packages & itineraries (when itinerary scope fits) | `buildTourPackage(data)` |
| `BlogPosting` | Blog article pages (markdown & txt) | `buildBlogPosting(frontMatter)` |
| `BreadcrumbList` | Hierarchical navigation for blog & destination pages | `buildBreadcrumbList(segments)` |
| `ItemList` | Listing pages (itineraries, packages) for better discovery | `generateItemListStructuredData(items, type)` |

Rules:
- Always ensure `@id` or `url` fields are absolute.
- Keep description < 300 characters for clarity.
- When adding new schema types, prefer official schema.org vocabulary & mark version in comment.

### 8.4 Markdown + Front Matter Content Pipeline
Blog slug route loader:
1. Attempts to resolve `<slug>.md` then `<slug>.txt`.
2. For `.md`, parses YAML front matter (title, description, date, tags, author, image).
3. Lightweight markdown transform (headings, paragraphs, code, emphasis) keeps bundle small—upgradeable to a full parser later.
4. Metadata generation uses front matter first, falls back to heuristics (first 160 chars of body).

Extending:
- Add additional allowed front matter keys; pass through to schema builder only if valid per `BlogPosting` spec (e.g. `image`, `datePublished`).

### 8.5 Canonicals & Indexability
- Canonical is ALWAYS absolute; never relative (important for SEO consolidation).
- Aggregation pages (lists) use canonical of their stable path (avoid query strings).
- Disallow indexing via `robots` directive only on explicitly private route segments (none currently); manage through `generateMetadata` override if required later.

### 8.6 Testing Strategy (Metadata)
Current tests: `tests/seo-metadata.test.ts` (Vitest) verifying:
- Canonical formation
- OG dynamic fallback pattern
- Article metadata shape for blog posts

Add tests for new entity metadata by:
1. Creating fixture input object.
2. Invoking generator.
3. Asserting critical fields (title, description, openGraph.images[0], alternates.canonical, JSON-LD presence if serialized separately).

### 8.7 Extensibility Checklist (When Adding New Entity)
1. Define data shape (TS interface) near your loader.
2. Write pure builder for structured data.
3. Add metadata generator (or extend generic one) ensuring OG fallback.
4. Add Vitest spec covering canonical + OG + essential fields.
5. Document the addition here (table update).

### 8.8 Future Enhancements
- Language alternates (hreflang) infrastructure.
- Automatic tag extraction + `keywords` de-duplication for blog taxonomy pages.
- Precomputed OG images for high-traffic evergreen posts (static optimization layer).

### 8.9 Quick Usage Examples
Blog Page:
```ts
export const generateMetadata = async ({ params }) => {
	const post = await loadPost(params.slug);
	return generateBlogMetadata(post);
};
```

Inject structured data:
```tsx
<StructuredData data={[buildBlogPosting(post), buildBreadcrumbList([...])]} />
```

---
## 9. Analytics & Event Tracking

Lightweight client-first analytics scaffold in `lib/analytics.ts` providing SSR-safe no-ops.

### API Surface
| Function | Purpose |
|----------|---------|
| `trackEvent(name, props?)` | Generic event dispatcher |
| `trackCta(label, props?)` | Convenience wrapper for call-to-action interactions |
| `identifyUser(id, traits?)` | Associate anonymous queue with a user id |

Implementation Details:
- During SSR, functions are no-ops (guards `typeof window !== 'undefined'`).
- Client queues events (placeholder) and logs to console—swap transport with a real endpoint or third-party SDK later.
- Footer showcases example CTA tracking.

Future Enhancements:
- Batch dispatch with `navigator.sendBeacon`.
- Performance timing integration (Largest Contentful Paint etc.).
- Consent mode gating (cookie banner integration).

### Adding a New Tracked Event
```ts
import { trackEvent } from '@/lib/analytics';
trackEvent('itinerary_view', { id: itinerary.id, source: 'itineraries_page' });
```

---
## 10. Roadmap / Nice-to-Haves
- Variants: Add `tiltParallax` for subtle hero imagery shift
- Design tokens export (JSON) for tooling synergy
- Light mode refinement parity audit
- Reduced motion variant mapping

---
## 11. Contribution Rules
1. Use existing tokens before creating new ones—extend only with justification.
2. New motion patterns go through `lib/motion.ts`.
3. Keep blur placeholders tiny (<350 bytes) unless critical aesthetic need.
4. Add ARIA labels for any non-text interactive icon.
5. Document new utilities here when merged.

---
*Last updated: 2025-10-15*
