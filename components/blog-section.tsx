"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Heart } from "lucide-react";
import { trackBlogInteraction, usePerformanceTracking } from "@/hooks/use-analytics";

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

  // Track performance
  usePerformanceTracking();

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/blogs");
        if (!res.ok) {
          throw new Error('Failed to fetch blogs');
        }
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
    e.preventDefault(); // prevent link navigation
    const updatedBlogs = [...blogs];
    const isLiked = liked[slug];

    updatedBlogs[index].likes += isLiked ? -1 : 1;
    setBlogs(updatedBlogs);
    setLiked(prev => ({ ...prev, [slug]: !isLiked }));
    
    // Track the like interaction
    trackBlogInteraction(isLiked ? 'unlike' : 'like', slug);
  }, [blogs, liked]);

  const handleBlogClick = useCallback((slug: string) => {
    trackBlogInteraction('click', slug);
  }, []);  const blogCards = useMemo(() => {
    return blogs.map((post, index) => (
      <Link 
        href={`/blog/${post.slug}`} 
        key={post.slug} 
        className="block group"
        onClick={() => handleBlogClick(post.slug)}
      >
        <div className="relative h-80 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl">
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              priority={index < 2}
              loading={index < 2 ? "eager" : "lazy"}
            />
          </div>

          {/* Dark Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          
          {/* Content */}
          <div className="absolute inset-0 p-6 flex flex-col justify-end text-white">
            <h3 className="text-lg font-bold mb-3 line-clamp-2 leading-tight">{post.title}</h3>
            
            {/* Like Button */}
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
                  className={
                    liked[post.slug]
                      ? "fill-red-400 text-red-400"
                      : ""
                  }
                />
                {post.likes}
              </button>
            </div>
          </div>
        </div>
      </Link>
    ));
  }, [blogs, liked, handleLike, handleBlogClick]);  if (loading) {
    return (
      <section className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 py-20 px-6">
        <div className="container mx-auto">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-wider uppercase">
              ADVENTURE STORIES
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              for every wanderer
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="bg-white/20 backdrop-blur-sm rounded-2xl h-80 animate-pulse"></div>
            ))}
          </div>
        </div>
      </section>
    );
  }  if (error) {
    return (
      <section className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 py-20 px-6">
        <div className="container mx-auto text-center">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-wider uppercase">
              ADVENTURE STORIES
            </h2>
            <p className="text-xl md:text-2xl text-white/90 font-medium">
              for every wanderer
            </p>
          </div>
          <p className="text-white text-lg">Unable to load stories at the moment</p>
        </div>
      </section>
    );
  }  return (
    <section className="bg-gradient-to-r from-orange-400 via-yellow-400 to-orange-500 py-20 px-6" id="blog">
      <div className="container mx-auto">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-wider uppercase">
            ADVENTURE STORIES
          </h2>
          <p className="text-xl md:text-2xl text-white/90 font-medium">
            for every wanderer
          </p>
        </div>

        {/* Blog Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {blogCards}
        </div>
        
        {blogs.length > 4 && (
          <div className="text-center mt-12">
            <Link 
              href="/blog" 
              className="inline-flex items-center px-8 py-4 bg-white text-orange-600 rounded-full font-bold text-lg hover:bg-gray-100 transition-colors shadow-lg"
            >
              Explore All Stories
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default BlogSection;
