"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Heart } from "lucide-react";
import { trackBlogInteraction, usePerformanceTracking } from "@/hooks/use-analytics";
import { Button } from "@/components/ui/button";

interface BlogPost {
  title: string;
  slug: string;
  fileType: string;
  image: string;
  likes: number;
  comments: number;
}

const BlogSection: React.FC = () => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [liked, setLiked] = useState<{ [slug: string]: boolean }>({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  usePerformanceTracking();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error('Failed to fetch blogs');
        const data = await res.json();
        setBlogs(data);
        setError(null);
      } catch (err) {
        setError('Failed to load blogs');
        console.error('Error fetching blogs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

  const handleLike = useCallback((e: React.MouseEvent, index: number, slug: string) => {
    e.preventDefault();
    const updatedBlogs = [...blogs];
    const isLiked = liked[slug];
    updatedBlogs[index].likes += isLiked ? -1 : 1;
    setBlogs(updatedBlogs);
    setLiked(prev => ({ ...prev, [slug]: !isLiked }));
    trackBlogInteraction(isLiked ? 'unlike' : 'like', slug);
  }, [blogs, liked]);

  const handleBlogClick = useCallback((slug: string) => {
    trackBlogInteraction('click', slug);
  }, []);

  const blogCards = useMemo(() => {
    return blogs.slice(0, 4).map((post, index) => (
      <Link 
        href={`/blog/${post.slug}`} 
        key={post.slug} 
        className="block group"
        onClick={() => handleBlogClick(post.slug)}
      >
        <div className="relative h-96 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            priority={index < 2}
            loading={index < 2 ? "eager" : "lazy"}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
            <h3 className="text-lg font-bold mb-3 line-clamp-2 leading-tight">{post.title}</h3>
            <div className="flex justify-between items-center">
              <span className="text-sm text-white/80">Adventure</span>
              <button
                onClick={(e) => handleLike(e, index, post.slug)}
                className={`flex items-center gap-1 text-sm ${
                  liked[post.slug] ? "text-red-400" : "text-white/80"
                } hover:text-red-400 transition-colors`}
                aria-label={`Like ${post.title}`}
              >
                <Heart
                  size={16}
                  className={liked[post.slug] ? "fill-current" : ""}
                />
                {post.likes}
              </button>
            </div>
          </div>
        </div>
      </Link>
    ));
  }, [blogs, liked, handleLike, handleBlogClick]);

  const renderSkeleton = () => (
    <section className="bg-slate-900 py-20 md:py-32">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter uppercase">
            Adventure Stories
          </h2>
          <div className="flex items-center justify-center mt-4">
            <div className="w-16 h-px bg-yellow-400"></div>
            <p className="text-lg md:text-xl text-white/80 mx-4">
              for every wanderer
            </p>
            <div className="w-16 h-px bg-yellow-400"></div>
          </div>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white/10 rounded-2xl h-96 animate-pulse"></div>
          ))}
        </div>
      </div>
    </section>
  );

  if (loading) return renderSkeleton();
  if (error) return (
    <section className="bg-slate-900 py-20 md:py-32">
      <div className="container mx-auto text-center text-white">
        <h2 className="text-3xl font-bold mb-4">Oops!</h2>
        <p>{error}</p>
      </div>
    </section>
  );

  return (
    <section 
      id="blog"
      className="relative py-20 md:py-32 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/background_itenary1.png')" }}
    >
      <div className="absolute inset-0 bg-black/70 z-0" />
      <div className="container relative z-10 mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter uppercase">
            Adventure Stories
          </h2>
          <div className="flex items-center justify-center mt-4">
            <div className="w-16 h-px bg-yellow-400"></div>
            <p className="text-lg md:text-xl text-white/80 mx-4">
              for every wanderer
            </p>
            <div className="w-16 h-px bg-yellow-400"></div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {blogCards}
        </div>
        
        {blogs.length > 4 && (
          <div className="text-center mt-16">
            <Button asChild size="lg" className="bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg">
              <Link href="/blog">
                Explore All Stories
              </Link>
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
