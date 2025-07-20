"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

type Blog = {
  title: string;
  slug: string;
  category: string;
  excerpt: string;
};

const blogs: Blog[] = [
  {
    slug: "hidden-valleys-nepal",
    title: "Hidden Valleys of Nepal",
    category: "Adventure | Nature",
    excerpt: "Explore the untouched beauty of Nepal’s hidden gems tucked away from the crowd.",
  },
  {
    slug: "beach-vibes-bali",
    title: "Bali’s Beach Vibes",
    category: "Relaxation | Travel",
    excerpt: "From white sands to surfing waves—Bali is every traveler’s dreamy escape.",
  },
  {
    slug: "city-breaks-europe",
    title: "Charming City Breaks",
    category: "Culture | Urban",
    excerpt: "Wander through cobblestone streets and sip coffee in Europe’s coziest corners.",
  },
];

const placeholderImage =
  "https://www.purevacations.com/wp-content/uploads/2023/01/Freedom-and-Happiness-in-the-Manang-Valley-Nepal.jpg";

export default function BlogSection() {
  return (
    <section className="px-6 pt-48 pb-16 max-w-7xl mx-auto">
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
        {blogs.map((blog, i) => (
          <motion.div
            key={blog.slug}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-300 bg-gradient-to-br from-[#fceabb] via-[#f8b500] to-[#e38e00]"
          >

            <div className="relative w-full h-56">
              <Image
                src={placeholderImage}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>
            <div className="p-6 flex flex-col flex-grow backdrop-blur-sm bg-white/60">
              <p className="text-sm text-[#7c552f]">{blog.category}</p>
              <h3 className="text-xl font-semibold text-[#4d2e10] mt-1">{blog.title}</h3>
              <p className="text-sm text-[#5a3e2b] mt-2 mb-4 flex-grow">{blog.excerpt}</p>
              <Link href={`/blog/${blog.slug}`}>
                <button className="bg-[#5a3e2b] text-white px-4 py-2 rounded-full w-fit hover:scale-105 transition-all mt-auto">
                  Read More
                </button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
