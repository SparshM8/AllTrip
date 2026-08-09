# Alltripp - Industrial Grade Travel Platform UI

Welcome to the **Alltripp** web application codebase. This project is a modern, high-performance, responsive landing page and web application UI built for an all-in-one travel management platform. It is engineered following industrial frontend standards, modular component organization, strict TypeScript typing, and a bespoke design system.

---

## 🛠️ Tech Stack & Dependencies

- **Core Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Build Tool & Bundler**: [Vite](https://vitejs.dev/)
- **Design System & Typography**:
  - **Headings**: `Playfair Display` (Google Fonts) — Editorial, luxury aesthetic.
  - **Body / UI / Buttons**: `Outfit` (Google Fonts) — Clean, modern, geometric sans-serif.
- **Styling**: Modular CSS-in-JS inline styles backed by global design tokens (`src/index.css`).

---

## 📁 Industrial Folder Structure & Architecture

The codebase follows a domain-driven, feature-separated component architecture designed to make codebase navigation intuitive for any developer joining the team:

```text
alltripp-app/
├── public/                     # Static public assets served directly
├── src/
│   ├── assets/                 # Optimized brand graphics, icons & local destination media
│   │   ├── logo.png            # Main Alltripp Header Logo
│   │   ├── srilanka.png        # Destination asset for Sri Lanka card
│   │   ├── paris.png           # Destination asset for Paris card
│   │   ├── europe.png          # Destination asset for Europe Tour card
│   │   ├── thailand.png        # Destination asset for Thailand card
│   │   └── Icon-*.svg          # Feature vector icons
│   │
│   ├── components/             # Reusable UI component ecosystem
│   │   ├── sections/           # Page-level standalone layout sections
│   │   │   ├── Header.tsx             # Sticky Navigation Bar with dynamic CTA
│   │   │   ├── Hero.tsx               # High-impact Hero section with search integration
│   │   │   ├── TripCardsSection.tsx   # Responsive Bento Grid of curated destinations
│   │   │   ├── FeaturesSection.tsx    # 3-column feature grid with animated flight path
│   │   │   ├── TestimonialsSection.tsx# Interactive 3D vertical video carousel
│   │   │   ├── PartnersSection.tsx    # Connected partners (featuring NestArrival)
│   │   │   ├── InfoSection.tsx        # Value proposition & metrics section
│   │   │   ├── CtaSection.tsx         # Bottom call-to-action conversion banner
│   │   │   └── Footer.tsx             # Multi-column industrial footer
│   │   │
│   │   └── ui/                 # Atomic UI components
│   │       └── Icons.tsx       # Standardized SVG Icon primitives (Arrow, Play, etc.)
│   │
│   ├── data/                   # Centralized mock data & configuration files
│   │   └── mockData.ts         # Single Source of Truth for navigation, cards & content
│   │
│   ├── types/                  # TypeScript interface definitions & strict contracts
│   │   └── index.ts            # Type declarations for Trip Cards, Features & Partners
│   │
│   ├── App.tsx                 # Root Layout Orchestrator Component
│   ├── index.css               # Global CSS resets, typography imports & utility styles
│   └── main.tsx                # React DOM render entrypoint
│
├── index.html                  # HTML5 boilerplate & Google Fonts links
├── package.json                # Project dependencies & build scripts
├── tsconfig.json               # TypeScript compiler config
└── vite.config.ts              # Vite environment & plugin configuration
```

---

## 🧩 Key Component Modules & Responsibilities

| Component | File Path | Primary Functionality |
| :--- | :--- | :--- |
| **Header** | `src/components/sections/Header.tsx` | Sticky navigation bar featuring the primary Alltripp brand logo, navigation links, and primary CTA button. |
| **Hero** | `src/components/sections/Hero.tsx` | High-converting hero banner with key messaging, interactive destination filter pills, and background visual. |
| **TripCardsSection** | `src/components/sections/TripCardsSection.tsx` | Responsive **Bento Grid** layout showcasing popular trip destinations with blurred glassmorphism badges and local high-res imagery. |
| **FeaturesSection** | `src/components/sections/FeaturesSection.tsx` | Highlights platform benefits with centered feature cards and an animated keyframe "flight path" travel streak divider line. |
| **TestimonialsSection** | `src/components/sections/TestimonialsSection.tsx` | **3D Vertical Video Carousel** displaying Reels/Shorts style testimonial cards. Auto-calculates 3D transforms (`translateX`, `translateZ`, `scale`, `opacity`, `zIndex`) to elevate the active center video. |
| **PartnersSection** | `src/components/sections/PartnersSection.tsx` | Showcases corporate integration partners, including custom SVG vector branding for **NestArrival**. |
| **Footer** | `src/components/sections/Footer.tsx` | Comprehensive footer containing company information, social links, legal pages, and copyright notice. |

---

## 🎨 Design System & Guidelines

Developers adding new features should strictly adhere to the established design primitives:

- **Typography**:
  - Headings (`h1`, `h2`, `h3`): `font-family: 'Playfair Display', serif;`
  - Body Text, Buttons, Badges: `font-family: 'Outfit', sans-serif;`
- **Color Palette**:
  - **Deep Emerald (Primary)**: `#032517` / `#084028` / `#0A4028`
  - **Warm Off-White (Backgrounds)**: `#F2F0E3` / `#FAFAFA`
  - **Gold Accents**: `#DDB448` / `#CFA052`
  - **Dark Neutral Text**: `#14140F` / `#424843`
- **Component Styling Protocol**:
  - Use modular CSS style objects with explicit types.
  - Maintain smooth cubic-bezier transitions for interactive elements: `transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)'`.

---

## 🚀 Getting Started & Local Development

### Prerequisites

Ensure you have **Node.js (v18+)** and **npm** installed on your system.

### 1. Installation

Clone the repository and install the project dependencies:

```bash
npm install
```

### 2. Run Local Development Server

Start the Vite development server with hot-module replacement (HMR):

```bash
npm run dev
```

The application will be accessible at `http://localhost:5173/`.

### 3. Build for Production

To generate a optimized, production-ready static bundle in the `/dist` directory:

```bash
npm run build
```

---

## 💡 Developer Guidelines for Extending the Codebase

1. **Adding New Destinations**: Edit `TRIP_CARDS` or update the Bento Grid arrangement directly inside `src/components/sections/TripCardsSection.tsx`. Store image assets inside `src/assets/` and import them cleanly.
2. **Adding Partners**: Update `src/components/sections/PartnersSection.tsx` by adding new `<article>` card elements.
3. **Icons & SVGs**: Keep generic icons inside `src/components/ui/Icons.tsx` as reusable functional React components.

