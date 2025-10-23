import { describe, it, expect } from 'vitest';
import { generateBlogMetadata, generateDestinationMetadata, generateMetadata } from '@/lib/seo';

function firstOgImageUrl(meta: any): string | undefined {
  const imgs = meta?.openGraph?.images;
  if (!imgs) return undefined;
  if (Array.isArray(imgs)) {
    const first = imgs[0];
    if (!first) return undefined;
    if (typeof first === 'string') return first;
    if (typeof first === 'object' && 'url' in first) return String((first as any).url);
    return undefined;
  }
  if (typeof imgs === 'string') return imgs;
  if (typeof imgs === 'object' && 'url' in imgs) return String((imgs as any).url);
  return undefined;
}

describe('SEO metadata generation', () => {
  it('generates base site metadata with dynamic OG', () => {
    const meta = generateMetadata({ title: 'Home Test', description: 'Desc' });
    expect(meta.title).toContain('Home Test');
    expect(firstOgImageUrl(meta)).toMatch(/\/api\/og\?title=Home%20Test/);
  });

  it('generates destination metadata with expected canonical & image', () => {
    const meta = generateDestinationMetadata('Goa');
    expect(meta.alternates?.canonical).toMatch(/goa$/);
    expect(firstOgImageUrl(meta)).toMatch(/destinations\/goa\.jpg$/);
  });

  it('generates blog metadata as article with dynamic OG when no explicit image override', () => {
    const meta = generateBlogMetadata({
      title: 'Hidden Waterfalls',
      description: 'All about waterfalls',
      slug: 'hidden-waterfalls'
    });
    expect((meta.openGraph as any)?.type).toBe('article');
    expect(firstOgImageUrl(meta)).toMatch(/api\/og\?title=Hidden%20Waterfalls/);
  });
});
