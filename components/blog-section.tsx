"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState, useCallback, useMemo } from "react";
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

  const truncateText = (text: string, maxLength: number) => {
    return text.length > maxLength ? text.slice(0, maxLength - 3) + '...' : text;
  };

  const blogCards = useMemo(() => {
    return blogs.slice(0, 3).map((post, index) => (
      <motion.div
        key={post.slug}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: index * 0.1 }}
        className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300"
        style={{
          background: "linear-gradient(to bottom right, #fceabb, #f8b500, #e38e00)"
        }}
      >
        <div className="relative w-full h-56">
          <Image
            src={post.image}
            alt={post.title}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6 flex flex-col flex-grow backdrop-blur-sm bg-white/60">
          <p className="text-sm text-[#7c552f]">Adventure</p>
          <h3 className="text-xl font-semibold text-[#4d2e10] mt-3">
            {truncateText(post.title, 56)}
          </h3>
          <div className="flex justify-between items-center mt-4">
            <Link href={`/blog/${post.slug}`}>
              <button className="bg-[#5a3e2b] text-white px-4 py-2 rounded-full w-fit hover:scale-105 transition-all">
                Read More
              </button>
            </Link>
            <button
              onClick={(e) => handleLike(e, index, post.slug)}
              className={`flex items-center gap-1 text-sm ${liked[post.slug] ? "text-red-400" : "text-[#5a3e2b]"} hover:text-red-400 transition-colors`}
              aria-label={`Like ${post.title}`}
            >
              <Heart size={16} className={liked[post.slug] ? "fill-current" : ""} />
              {post.likes}
            </button>
          </div>
        </div>
      </motion.div>
    ));
  }, [blogs, liked, handleLike]);

  return (
    <section className="px-6 pt-52 pb-16 max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4">
        <div>
          <h2 className="text-4xl md:text-5xl font-bold text-[#5a3e2b]">Tips & Article</h2>
          <p className="text-lg text-[#8b6f47] mt-2 max-w-lg">
            Get inspired by stories, tips, and curated travel experiences from around the world.
          </p>
        </div>
        <Link href="/blogs">
          <button className="bg-[#dba43b] text-white px-6 py-2 rounded-full font-medium hover:opacity-90 transition-all">
            View more
          </button>
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-10">
        {blogCards}
      </div>
    </section>
  );
};

export default BlogSection;
