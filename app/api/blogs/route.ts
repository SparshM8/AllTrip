import { NextResponse } from 'next/server';
import { readdir, readFile, access } from 'fs/promises';
import path from 'path';

// Cache the blogs data to avoid reading files on every request
let cachedBlogs: any[] | null = null;
let cacheTimestamp = 0;
const CACHE_DURATION = 60 * 1000; // 1 minute in development, can be increased for production

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const forceRefresh = searchParams.get('refresh') === 'true';

  try {
    // Check if we have cached data that's still valid
    const now = Date.now();
    if (cachedBlogs && (now - cacheTimestamp) < CACHE_DURATION && !forceRefresh) {
      return NextResponse.json(cachedBlogs);
    }

    const blogsDir = path.join(process.cwd(), 'public', 'blogs');
    const items = await readdir(blogsDir, { withFileTypes: true });
    
    const blogs = [];
    
    // Fallback images from destinations
    const fallbackImages = [
      '/destinations/kerala.jpg',
      '/destinations/goa.jpg',
      '/destinations/rajasthan.jpg',
      '/destinations/himachal-pradesh.jpg',
      '/destinations/kashmir.jpg'
    ];
    
    let imageIndex = 0;
    
    // Process blogs in parallel for better performance
    const blogPromises = items
      .filter(item => item.isDirectory())
      .map(async (item) => {
        try {
          const blogDir = path.join(blogsDir, item.name);
          const files = await readdir(blogDir);
          
          // Find the text file
          const textFile = files.find(file => file.endsWith('.txt'));
          if (!textFile) return null;

          const textContent = await readFile(path.join(blogDir, textFile), 'utf-8');
          const lines = textContent.split('\n');
          const titleLine = lines.find(line => line.startsWith('Title:'));
          const title = titleLine ? titleLine.replace('Title:', '').trim() : item.name;
          
          // Check if there's a corresponding image, otherwise use fallback
          const imageFile = `${item.name}.png`;
          const imagePath = `/blogs/${imageFile}`;
          let finalImagePath = imagePath;
          
          try {
            await access(path.join(process.cwd(), 'public', 'blogs', imageFile));
          } catch {
            // Use fallback image if the specific blog image doesn't exist
            finalImagePath = fallbackImages[imageIndex % fallbackImages.length];
            imageIndex++;
          }
          
          return {
            title,
            slug: item.name,
            fileType: 'txt',
            image: finalImagePath,
            likes: Math.floor(Math.random() * 50) + 10, // Random likes for demo
            comments: Math.floor(Math.random() * 20) + 5, // Random comments for demo
          };
        } catch (error) {
          console.error(`Error processing blog ${item.name}:`, error);
          return null;
        }
      });

    const blogResults = await Promise.all(blogPromises);
    const validBlogs = blogResults.filter(blog => blog !== null);
    
    // Cache the results
    cachedBlogs = validBlogs;
    cacheTimestamp = now;
    
    return NextResponse.json(validBlogs, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (error) {
    console.error('Error fetching blogs:', error);
    return NextResponse.json({ error: 'Failed to fetch blogs' }, { status: 500 });
  }
}
