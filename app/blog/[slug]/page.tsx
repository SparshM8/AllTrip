import { readFile, readdir, access } from 'fs/promises';
import path from 'path';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

interface BlogPageProps {
  params: Promise<{ slug: string }>;
}

async function getBlogContent(slug: string) {
  try {
    const blogDir = path.join(process.cwd(), 'public', 'blogs', slug);
    const files = await readdir(blogDir);
    
    const textFile = files.find(file => file.endsWith('.txt'));
    if (!textFile) {
      return null;
    }
    
    const content = await readFile(path.join(blogDir, textFile), 'utf-8');
    const lines = content.split('\n');
    const titleLine = lines.find(line => line.startsWith('Title:'));
    const title = titleLine ? titleLine.replace('Title:', '').trim() : slug;
    
    // Remove the title line from content
    const bodyContent = lines
      .filter(line => !line.startsWith('Title:'))
      .join('\n')
      .trim();
    
    // Check if blog-specific image exists, otherwise use fallback
    const blogImage = `/blogs/${slug}.png`;
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
      content: bodyContent,
      image: finalImage,
    };
  } catch (error) {
    return null;
  }
}

export async function generateMetadata({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogContent(slug);
  
  if (!blog) {
    return {
      title: 'Blog Not Found',
    };
  }
  
  return {
    title: `${blog.title} | AllTripp Travel Blog`,
    description: blog.content.substring(0, 160) + '...',
    openGraph: {
      title: blog.title,
      description: blog.content.substring(0, 160) + '...',
      images: [blog.image],
    },
  };
}

export default async function BlogPage({ params }: BlogPageProps) {
  const { slug } = await params;
  const blog = await getBlogContent(slug);
  
  if (!blog) {
    notFound();
  }
  
  return (
    <article className="min-h-screen bg-gray-50 dark:bg-gray-900">
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

            <div className="prose prose-lg max-w-none dark:prose-invert">
              <div className="whitespace-pre-line text-muted-foreground leading-relaxed">
                {blog.content}
              </div>
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
