# Follow-Up Improvements (Phase 2)

These are low-risk, high-value enhancements to pursue after the dark UI refactor.

## UI / Visual Polish
- Motion refinement: unify easing (var(--transition-base)); add subtle fade/scale on section entrance using IntersectionObserver or Framer Motion wrapper.
- Image aspect ratios: standardize cards to a consistent ratio (e.g. 4:5 portrait for destinations, 16:10 landscape for blog) and enforce via utility classes.
- Light mode parity: derive a reduced-contrast light palette (neutral warm grays + soft accent) keeping same component tokens.
- Focus states: add visible focus ring using outline / ring-[--brand-accent] for keyboard navigation.
- Scroll-based subtle progress bar (top of page) to indicate reading progress on blog and itinerary pages.

## Accessibility
- Audit semantic headings sequence (ensure only one h1 per page; adjust section headings to h2/h3 accordingly).
- Provide aria-live feedback on progress interactions in Book Details Section.
- Add reduced motion preference checks to disable animation intensity.

## Performance
- Add next/image placeholders (blurDataURL) for hero and heavy sections.
- Preload critical font subset (display weight + regular) via next/font.
- Lazy load non-critical Lottie / animation modules with dynamic import and suspense fallback.

## Data & Persistence
- (Done) Persistent Upstash Redis store added for `/api/progress` with memory fallback.
- (Done) Basic per-IP write rate limit (1 update / 2s) via Redis TTL or in-memory fallback.
- Add optimistic UI update with conditional revalidation using ETag (client can send `If-None-Match`).
- Consider adding a minimal audit log list (e.g. store recent 10 updates in a Redis list). Reference `.env.example` for required vars.

## Code Quality
- Extract shared card layout into a <ModernCard /> component to centralize hover, padding, and elevation logic.
- Create SectionHeading component encapsulating label + heading + accent underline.
- Introduce constants/design-tokens.ts for TS-side usage (e.g. brand accent hex, transition curve) to avoid duplication.

## Analytics
- Track CTA click events (hero, discount, ongoing trips) with a lightweight custom hook batching and sending after idle.
- Add scroll depth tracking for long itinerary pages.

## Future Enhancements
- Optional soft gradient mesh background layer toggled (ARIA-hidden) for marketing pages.
- Framer Motion layout transitions between blog list and detail view.
- Theming switcher (dark / light / system) surfaced in nav.

---
Prioritize: Persistence (Upstash) -> Accessibility passes -> Performance preload -> Component extraction.
