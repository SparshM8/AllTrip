import { readFile, readdir, access } from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { generateBlogMetadata, generateBlogStructuredData, jsonLdScript } from '@/lib/seo';
import StructuredData from '@/components/structured-data';

// Optional front matter keys supported in the first lines of the .txt file:
// Title: My Post Title
// Description: Custom description up to 160 chars.
// Date: 2025-10-01
// Author: Jane Doe
// Image: /blogs/custom-image.png
// Keywords: travel, india, adventure

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogContent(slug: string) {
  try {
    const blogDir = path.join(process.cwd(), 'public', 'blogs', slug);
    const files = await readdir(blogDir);
    
    const contentFile = files.find(file => file.endsWith('.md')) || files.find(f => f.endsWith('.txt'));
    if (!contentFile) return null;

    const raw = await readFile(path.join(blogDir, contentFile), 'utf-8');

    let meta: Record<string,string> = {};
    let body = raw;

    if (contentFile.endsWith('.md')) {
      // Parse optional YAML front matter (--- delimiter)
      if (raw.startsWith('---')) {
        const end = raw.indexOf('\n---', 3);
        if (end !== -1) {
          const front = raw.slice(3, end).trim();
          front.split(/\r?\n/).forEach(line => {
            const m = line.match(/^([A-Za-z][A-Za-z0-9_-]*):\s*(.*)$/);
            if (m) meta[m[1].toLowerCase()] = m[2].trim();
          });
          body = raw.slice(end + 4).trim();
        }
      }
    }

    // Fallback simple key: value (txt) parsing if not markdown / no yaml
    if (contentFile.endsWith('.txt')) {
      const lines = raw.split('\n');
      meta = {};
      let contentStartIndex = 0;
      for (let i = 0; i < lines.length; i++) {
        const line = lines[i].trim();
        if (line === '') { contentStartIndex = i + 1; break; }
        const match = line.match(/^(Title|Description|Date|Author|Image|Keywords):\s*(.*)$/i);
        if (match) {
          meta[match[1].toLowerCase()] = match[2].trim();
          contentStartIndex = i + 1;
        } else { contentStartIndex = i; break; }
      }
      body = lines.slice(contentStartIndex).join('\n').trim();
    }
    const title = meta['title'] || slug.replace(/-/g, ' ');
    const description = meta['description'];
    const publishedTime = meta['date'] && !isNaN(Date.parse(meta['date'])) ? new Date(meta['date']).toISOString() : undefined;
    const author = meta['author'];
    const imageOverride = meta['image'];
    const keywords = meta['keywords'] ? meta['keywords'].split(',').map(k => k.trim()).filter(Boolean) : [];

    // Minimal markdown to HTML (only a few patterns) while keeping plain text fallback
    let rendered = body;
    if (contentFile.endsWith('.md')) {
      rendered = rendered
        // headings
        .replace(/^###\s+(.*)$/gm, '<h3>$1</h3>')
        .replace(/^##\s+(.*)$/gm, '<h2>$1</h2>')
        .replace(/^#\s+(.*)$/gm, '<h1>$1</h1>')
        // bold / italic
        .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
        .replace(/\*(.+?)\*/g, '<em>$1</em>')
        // links
        .replace(/\[(.+?)\]\((https?:[^)]+)\)/g, '<a href="$2" class="underline text-blue-600 dark:text-blue-400" target="_blank" rel="noopener noreferrer">$1<\/a>')
        // paragraphs (double newline)
        .replace(/^(?!<h\d|<ul|<p|<blockquote|<img)([^\n]+)\n\n/gm, '<p>$1</p>');
    }
    
    // Check if blog-specific image exists, otherwise use fallback
  const blogImage = imageOverride || `/blogs/${slug}.png`;
  let finalImage = blogImage;
    
    try {
      await access(path.join(process.cwd(), 'public', 'blogs', `${slug}.png`));
    } catch {
      // Use fallback image
      const fallbackImages = [
        '/destinations/kerala.jpg',
        '/destinations/goa.jpg',
        '/destinations/rajasthan.jpg',
        '/destinations/himachal-pradesh.jpg',
        '/destinations/kashmir.jpg'
      ];
      finalImage = fallbackImages[Math.floor(Math.random() * fallbackImages.length)];
    }
    
    return {
      title,
      description,
  content: rendered,
      image: finalImage,
      publishedTime,
      author,
      keywords,
    };
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogContent(slug);
  if (!blog) {
    return { title: 'Blog Not Found', robots: { index: false, follow: false } };
  }
  const description = blog.description || (blog.content.substring(0, 157) + (blog.content.length > 157 ? '...' : ''));
  return generateBlogMetadata({
    title: blog.title,
    description,
    slug,
    image: blog.image,
    author: blog.author,
    publishedTime: blog.publishedTime,
    modifiedTime: blog.publishedTime,
    keywords: blog.keywords,
  });
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogContent(slug);
  
  if (!blog) {
    notFound();
  }
  const description = blog.description || (blog.content.substring(0, 157) + (blog.content.length > 157 ? '...' : ''));
  const structuredData = generateBlogStructuredData({
    title: blog.title,
    description,
    slug,
    image: blog.image,
    author: blog.author,
    publishedTime: blog.publishedTime,
    modifiedTime: blog.publishedTime,
    keywords: blog.keywords,
  });
  const breadcrumbList = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://alltripp.com/'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://alltripp.com/blog'
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: blog.title,
        item: `https://alltripp.com/blog/${slug}`
      }
    ]
  };
  
  return (
    <article className="min-h-screen bg-gray-50 dark:bg-gray-900">
  <script type="application/ld+json" dangerouslySetInnerHTML={jsonLdScript(structuredData)} />
  <StructuredData data={breadcrumbList} />
      {/* Header with back navigation */}
      <div className="bg-white dark:bg-gray-800 border-b border-border">
        <div className="container mx-auto px-6 py-4">
          <Link
            href="/"
            className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
          >
            <ArrowLeft size={20} className="mr-2" />
            Back to Home
          </Link>
        </div>
      </div>

      {/* Main content */}
      <main className="container mx-auto px-6 py-12 max-w-4xl">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg dark:shadow-2xl overflow-hidden">
          {/* Hero image */}
          <div className="relative h-96 w-full">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              priority
              sizes="(max-width: 1200px) 100vw, 1200px"
            />
          </div>

          {/* Content */}
          <div className="p-8">
            <h1 className="text-4xl font-bold mb-6 text-foreground">{blog.title}</h1>
            {blog.author || blog.publishedTime ? (
              <div className="text-sm text-muted-foreground mb-8 flex flex-wrap gap-4">
                {blog.author && <span>By {blog.author}</span>}
                {blog.publishedTime && <time dateTime={blog.publishedTime}>{new Date(blog.publishedTime).toLocaleDateString()}</time>}
              </div>
            ) : null}

            <div className="prose prose-lg max-w-none dark:prose-invert">
              {blog.content.match(/<h\d|<p>|<strong>|<em>|<a /) ? (
                // eslint-disable-next-line react/no-danger
                <div className="prose-content" dangerouslySetInnerHTML={{ __html: blog.content }} />
              ) : (
                <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                  {blog.content}
                </div>
              )}
            </div>

            {/* Footer actions */}
            <div className="mt-12 pt-8 border-t border-border dark:border-border flex justify-between items-center">
              <Link
                href="/"
                className="inline-flex items-center text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 transition-colors"
              >
                <ArrowLeft size={16} className="mr-1" />
                Back to Home
              </Link>

              <Link
                href="/blog"
                className="inline-flex items-center px-4 py-2 bg-blue-600 dark:bg-blue-700 text-white rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors"
              >
                View All Blogs
              </Link>
            </div>
          </div>
        </div>
      </main>
    </article>
  );
}
