"use client";

import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import Image from "next/image";
import { getBlurData } from "@/lib/blur-data";
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
        variants={fadeInUp}
        className="card-modern rounded-xl overflow-hidden focusable"
      >
        <div className="relative w-full h-56">
          <Image
            src={post.image}
            alt={post.title}
            fill
            loading="lazy"
            className="object-cover"
            placeholder="blur"
            blurDataURL={getBlurData(post.image)}
          />
        </div>
        <div className="p-5 flex flex-col flex-grow bg-gradient-to-b from-black/30 via-black/0 to-black/60">
          <p className="text-xs uppercase tracking-wide text-white/60">Adventure</p>
          <h3 className="text-lg font-semibold text-white mt-3 leading-snug">
            {truncateText(post.title, 56)}
          </h3>
          <div className="flex justify-between items-center mt-4">
            <Link href={`/blog/${post.slug}`}>
                <button type="button" className="inline-flex items-center px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white text-sm font-medium hover:bg-white/15 transition">
                  Read More
                </button>
              </Link>
            <button
              type="button"
              onClick={(e) => handleLike(e, index, post.slug)}
              className={`flex items-center gap-1 text-sm ${liked[post.slug] ? "text-red-400" : "text-white/70"} hover:text-red-400 transition-colors`}
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
    <section className="px-6 py-20 max-w-7xl mx-auto bg-white dark:bg-[hsl(var(--surface-base))]">
      <motion.div
        className="flex flex-col md:flex-row items-start md:items-center justify-between mb-12 gap-4"
        variants={staggerContainer(0.05,0.12)}
        initial="initial"
        whileInView="animate"
        viewport={{ once: true, amount: 0.2 }}
      >
        <motion.div variants={fadeInUp}>
          <h2 className="heading-display text-gray-900 dark:text-white">Tips & Articles</h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 mt-3 max-w-lg">
            Get inspired by stories, tips, and curated travel experiences from around the world.
          </p>
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Link href="/blog">
            <button type="button" className="focusable inline-flex items-center px-6 py-2 rounded-md bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition">
              View more
            </button>
          </Link>
        </motion.div>
      </motion.div>

      <motion.div className="grid md:grid-cols-3 gap-10" variants={staggerContainer(0.1,0.15)} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.15 }}>
        {blogCards}
      </motion.div>
    </section>
  );
};

export default BlogSection;
