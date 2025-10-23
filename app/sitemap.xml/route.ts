import { readdir } from 'fs/promises';
import path from 'path';

// Dynamic sitemap leveraging App Router route handler.
// Enumerates static known sections + discovered blog slugs + itineraries.
export const revalidate = 3600; // 1 hour

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://alltripp.com';

async function getBlogSlugs(): Promise<string[]> {
  try {
    const blogsDir = path.join(process.cwd(), 'public', 'blogs');
    const entries = await readdir(blogsDir, { withFileTypes: true });
    return entries.filter(e => e.isDirectory()).map(d => `/blog/${d.name}`);
  } catch {
    return [];
  }
}

async function getItinerarySlugs(): Promise<string[]> {
  try {
    const itinerariesDir = path.join(process.cwd(), 'AllTrip', 'app', 'itineraries');
    const entries = await readdir(itinerariesDir, { withFileTypes: true });
    return entries
      .filter(e => e.isDirectory())
      .map(d => `/itineraries/${d.name}`)
      .filter(slug => !slug.endsWith('/_components'));
  } catch {
    return [];
  }
}

export async function GET(): Promise<Response> {
  const now = new Date().toISOString();

  const staticPaths = [
    '/',
    '/destinations',
    '/contact',
    '/blog',
    '/packages',
    '/itineraries',
    '/refund',
    '/privacy',
    '/terms',
  ];

  const destinationSlugs = [
    'amritsar','goa','himachal-pradesh','jim-corbett','kashmir','kerala','ladakh','rajasthan','rishikesh'
  ].map(d => `/destinations/${d}`);

  const [blogSlugs, itinerarySlugs] = await Promise.all([
    getBlogSlugs(),
    getItinerarySlugs(),
  ]);

  const all = [
    ...staticPaths,
    ...destinationSlugs,
    ...blogSlugs,
    ...itinerarySlugs,
  ];

  const deduped = Array.from(new Set(all));

  const entries = deduped.map(url => ({
    url: `${BASE_URL.replace(/\/$/, '')}${url}`,
    lastModified: now,
    changeFrequency: 'weekly',
    priority: url === '/' ? 1 : 0.6,
  }));

  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n` +
    `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">` +
    entries.map(e => (
      `<url>` +
        `<loc>${e.url}</loc>` +
        `<lastmod>${e.lastModified}</lastmod>` +
        `<changefreq>${e.changeFrequency}</changefreq>` +
        `<priority>${e.priority}</priority>` +
      `</url>`
    )).join('') +
    `</urlset>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': `public, s-maxage=${revalidate}`,
    },
  });
}