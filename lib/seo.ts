import type { Metadata } from 'next';

// Base site URL (override with NEXT_PUBLIC_SITE_URL if provided)
const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://alltripp.com';

// Helper to build dynamic OG image URL from title & type. Keeps existing static paths if a full URL or path is supplied.
function buildOgImage(input?: string, opts?: { title?: string; type?: string }) {
  if (!input && opts?.title) {
    // Build query string with encodeURIComponent to ensure spaces are %20 (not '+')
    const titleParam = `title=${encodeURIComponent(opts.title)}`;
    const typeParam = opts.type ? `&type=${encodeURIComponent(opts.type)}` : '';
    return `${BASE_URL}/api/og?${titleParam}${typeParam}`;
  }
  if (!input) return `${BASE_URL}/api/og`; // generic fallback
  if (/^https?:\/\//.test(input)) return input; // already absolute
  // If it's a relative path to a static asset keep as-is
  if (input.startsWith('/')) return `${BASE_URL}${input}`;
  return `${BASE_URL}/${input.replace(/^\//,'')}`;
}

export interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string[];
  canonical?: string;
  ogImage?: string;
  ogType?: 'website' | 'article';
  publishedTime?: string;
  modifiedTime?: string;
  author?: string;
  noindex?: boolean;
}

// Build absolute canonical URL from a relative path or return as-is if already absolute
export function buildCanonical(path?: string) {
  if (!path) return BASE_URL;
  if (path.startsWith('http')) return path;
  return `${BASE_URL.replace(/\/$/, '')}/${path.replace(/^\//, '')}`;
}

export function generateMetadata({
  title,
  description = "Discover India's hidden gems with AllTripp - your premium travel partner. Authentic travel experiences, cultural tours, and adventure trips across incredible India.",
  keywords = [],
  canonical,
  ogImage,
  ogType = 'website',
  publishedTime,
  modifiedTime,
  author,
  noindex = false,
}: SEOProps): Metadata {
  const defaultKeywords = [
    'travel agency India',
    'India tour packages',
    'travel experiences India',
    'cultural tours India',
    'adventure travel India',
    'holiday packages India',
  ];
  const allKeywords = Array.from(new Set([...defaultKeywords, ...keywords]));

  const metadata: Metadata = {
    title: title ? `${title} | AllTripp` : 'AllTripp - One Solution For All Your Travel Needs',
    description,
    keywords: allKeywords,
    authors: author ? [{ name: author }] : [{ name: 'AllTripp Travel' }],
    openGraph: {
      type: ogType,
      locale: 'en_IN',
      url: canonical || BASE_URL,
      title: title || 'AllTripp - Premium Travel Experiences Across India',
      description,
      siteName: 'AllTripp',
      images: [
        {
          url: buildOgImage(ogImage, { title, type: ogType === 'article' ? 'blog' : 'website' }),
          width: 1200,
            height: 630,
          alt: title || 'AllTripp - Travel Agency India',
        },
      ],
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: 'summary_large_image',
      title: title || 'AllTripp - Premium Travel Experiences Across India',
      description,
      images: [buildOgImage(ogImage, { title, type: ogType === 'article' ? 'blog' : 'website' })],
      creator: '@AllTripp',
    },
    alternates: canonical ? { canonical } : undefined,
    robots: noindex
      ? { index: false, follow: false }
      : {
          index: true,
          follow: true,
          nocache: true,
          googleBot: {
            index: true,
            follow: true,
            noimageindex: false,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
          },
        },
  };

  return metadata;
}

export function generateDestinationMetadata(
  destination: string,
  description?: string,
  customKeywords?: string[]
): Metadata {
  const destinationKeywords = [
    `${destination} tours`,
    `${destination} packages`,
    `${destination} travel`,
    `visit ${destination}`,
    `${destination} holiday`,
    `${destination} tourism`,
    ...(customKeywords || []),
  ];

  return generateMetadata({
    title: `${destination} Tours & Packages - Discover ${destination} with AllTripp`,
    description:
      description ||
      `Explore the beauty of ${destination} with AllTripp's curated travel packages. Authentic experiences, local culture, and unforgettable memories await in ${destination}.`,
    keywords: destinationKeywords,
    canonical: buildCanonical(`/destinations/${destination.toLowerCase().replace(/\s+/g, '-')}`),
    ogImage: `/destinations/${destination.toLowerCase().replace(/\s+/g, '-')}.jpg`,
  });
}

export function generatePackageMetadata(
  packageName: string,
  destination: string,
  duration: string,
  price?: string
): Metadata {
  const packageKeywords = [
    `${destination} ${duration} package`,
    `${packageName}`,
    `${destination} tour package`,
    `${destination} holiday package`,
    ...(price ? [`${destination} package ${price}`] : []),
  ];

  return generateMetadata({
    title: `${packageName} - ${duration} ${destination} Package`,
    description: `Book ${packageName} with AllTripp. ${duration} of authentic ${destination} experiences including local culture, sightseeing, and memorable adventures. ${price ? `Starting from ${price}.` : ''}`,
    keywords: packageKeywords,
    canonical: buildCanonical(`/packages/${packageName.toLowerCase().replace(/\s+/g, '-')}`),
    ogImage: `/featured/${destination.toLowerCase().replace(/\s+/g, '-')}.jpg`,
  });
}

// Structured Data Generators
export function generateTravelAgencyStructuredData() {
  return {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'AllTripp',
    description: 'Premium travel experiences across India',
    url: BASE_URL,
    logo: buildCanonical('/logo.png'),
    sameAs: [
      'https://facebook.com/alltripp',
      'https://instagram.com/alltripp',
      'https://twitter.com/alltripp',
    ],
    address: { '@type': 'PostalAddress', addressCountry: 'IN' },
    areaServed: { '@type': 'Country', name: 'India' },
    serviceType: [
      'Travel Planning',
      'Tour Packages',
      'Cultural Tours',
      'Adventure Travel',
      'Holiday Packages',
    ],
  };
}

export function generateTourPackageStructuredData(
  name: string,
  description: string,
  destination: string,
  duration: string,
  price?: string,
  image?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name,
    description,
    touristType: 'Cultural, Adventure, Leisure',
    url: buildCanonical(`/packages/${name.toLowerCase().replace(/\s+/g, '-')}`),
    image: image || `/featured/${destination.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    provider: { '@type': 'TravelAgency', name: 'AllTripp', url: BASE_URL },
    itinerary: {
      '@type': 'ItemList',
      name: `${destination} Itinerary`,
      description: `${duration} itinerary for ${destination}`,
    },
    ...(price && {
      offers: {
        '@type': 'Offer',
        price,
        priceCurrency: 'INR',
        availability: 'https://schema.org/InStock',
      },
    }),
  };
}

export function generateDestinationStructuredData(
  name: string,
  description: string,
  image?: string
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'TouristDestination',
    name,
    description,
    url: buildCanonical(`/destinations/${name.toLowerCase().replace(/\s+/g, '-')}`),
    image: image || `/destinations/${name.toLowerCase().replace(/\s+/g, '-')}.jpg`,
    containedInPlace: { '@type': 'Country', name: 'India' },
    touristType: ['Cultural', 'Adventure', 'Leisure', 'Nature'],
  };
}

// Generic ItemList generator for collections (itineraries, packages, etc.)
export interface ListItemInput {
  name: string;
  description?: string;
  url: string;
  image?: string;
  price?: string | number;
  priceCurrency?: string;
  type?: string; // fallback TouristTrip / Product / Article etc.
}

export function generateItemListStructuredData(
  name: string,
  description: string,
  baseUrl: string,
  items: ListItemInput[]
) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name,
    description,
    url: buildCanonical(baseUrl),
    numberOfItems: items.length,
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': item.type || 'TouristTrip',
        name: item.name,
        description: item.description,
        url: buildCanonical(item.url),
        ...(item.image && { image: buildCanonical(item.image) }),
        ...(item.price && {
          offers: {
            '@type': 'Offer',
            price: item.price,
            priceCurrency: item.priceCurrency || 'INR',
            availability: 'https://schema.org/InStock',
          },
        }),
      },
    })),
  };
}

// Blog helpers
export interface BlogMetaInput {
  title: string;
  description: string;
  slug: string;
  image?: string;
  author?: string;
  publishedTime?: string; // ISO
  modifiedTime?: string; // ISO
  keywords?: string[];
}

export function generateBlogMetadata(input: BlogMetaInput): Metadata {
  const {
    title,
    description,
    slug,
    image,
    author = 'AllTripp Travel',
    publishedTime,
    modifiedTime,
    keywords = [],
  } = input;

  return generateMetadata({
    title: `${title} | Travel Blog`,
    description,
    ogImage: image || undefined,
    ogType: 'article',
    canonical: buildCanonical(`/blog/${slug}`),
    author,
    publishedTime,
    modifiedTime,
    keywords,
  });
}

export function generateBlogStructuredData(input: BlogMetaInput) {
  const {
    title,
    description,
    slug,
    image = '/logo.png',
    author = 'AllTripp Travel',
    publishedTime,
    modifiedTime,
  } = input;
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    image: buildCanonical(image),
    url: buildCanonical(`/blog/${slug}`),
    mainEntityOfPage: buildCanonical(`/blog/${slug}`),
    author: { '@type': 'Person', name: author },
    publisher: {
      '@type': 'Organization',
      name: 'AllTripp',
      logo: { '@type': 'ImageObject', url: buildCanonical('/logo.png') },
    },
    ...(publishedTime && { datePublished: publishedTime }),
    ...(modifiedTime && { dateModified: modifiedTime || publishedTime }),
  };
}

// Utility to generate props for dangerouslySetInnerHTML when injecting JSON-LD
export function jsonLdScript(data: any) {
  return { __html: JSON.stringify(data) };
}
