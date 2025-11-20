"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import SearchBarMobile from "@/components/search-bar-mobile";
import { StarIcon } from "@/components/ui/star-icon";
import { useTheme } from "next-themes";

export default function HeroSectionMobile() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [scrollProgress, setScrollProgress] = useState(0);
  const { theme } = useTheme();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
      },
    },
  };

  // Scroll progress tracking
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

// Inject module-level styles for the mobile scroll indicator (data-p -> height) to avoid inline styles
const injectedHeroMobile = (globalThis as any).__HERO_MOBILE_SCROLL_STYLES__;
if (!injectedHeroMobile && typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.id = 'hero-mobile-scroll-styles';
  style.textContent = `
    .hero-scroll-fill{ transition:height .3s ease-out; }
    ${Array.from({length:101}, (_,i)=>`.hero-scroll-fill[data-p='${i}']{height:${i}%;}`).join('')}
  `;
  document.head.appendChild(style);
  (globalThis as any).__HERO_MOBILE_SCROLL_STYLES__ = true;
}

  return (
    <>
      {/* Custom Scroll Indicator - Hidden on mobile for cleaner look */}
      <div className="hidden md:block fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
          <div className="w-1 h-32 bg-white/20 rounded-full backdrop-blur-sm">
            <div
              className="w-full bg-[#FDBE00] rounded-full hero-scroll-fill"
              data-p={Math.max(0, Math.min(100, Math.round(scrollProgress)))}
            />
          </div>
      </div>

      <section
        ref={ref}
        className="hero relative w-full h-screen overflow-hidden flex items-center justify-center"
      >
        <Image
          src="/4.png"
          alt="Scenic view of Himalayas/Kashmir"
          fill
          priority
          className="object-cover object-center"
        />
        {/* Optimized overlay for dark mode */}
        <div className={`absolute inset-0 ${theme === 'dark' ? 'bg-black/30' : 'bg-black/20'} z-0`} />

        {/* Content Container - Center Aligned for Mobile */}
        <div className="content relative z-10 flex flex-col items-center justify-center text-center text-white px-4 sm:px-6 pt-24 pb-8">
          <div className="bg-black/0 backdrop-blur-sm p-4 sm:p-6 rounded-lg w-full max-w-lg">
            <motion.div
              className="inline-block"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.h1
                className="text-3xl sm:text-4xl md:text-5xl font-bold text-white tracking-tight leading-tight mb-4"
                variants={itemVariants}
              >
                One Solution For All Your{' '}
                <span className="text-yellow-400">Travel Needs</span>
              </motion.h1>

              <motion.p
                className="text-sm sm:text-base text-gray-100 dark:text-gray-200 leading-relaxed mb-6 max-w-md mx-auto"
                variants={itemVariants}
              >
                Experience the magic of India with AllTripp. From mountain escapes to coastal retreats, we bring you curated journeys with unforgettable moments.
              </motion.p>

              {/* Optimized Testimonials for Mobile */}
              <motion.div
                className="flex items-center justify-center space-x-4 mb-6 cursor-pointer"
                variants={itemVariants}
                onClick={() => {
                  const testimonialsSection = document.getElementById('testimonials');
                  if (testimonialsSection) {
                    testimonialsSection.scrollIntoView({
                      behavior: 'smooth',
                      block: 'start'
                    });
                  }
                }}
              >
                <div className="flex items-center space-x-2">
                  {/* Show only 3 profile images on mobile for cleaner look */}
                  <div className="flex -space-x-2">
                    <Image
                      src="/testimonials/ananya-patel.jpg"
                      alt="User testimonial"
                      width={40}
                      height={40}
                      loading="lazy"
                      className="rounded-full object-cover aspect-square border-2 border-white dark:border-gray-700"
                    />
                    <Image
                      src="/testimonials/priya-sharma.jpg"
                      alt="User testimonial"
                      width={40}
                      height={40}
                      loading="lazy"
                      className="rounded-full object-cover aspect-square border-2 border-white dark:border-gray-700"
                    />
                    <Image
                      src="/testimonials/rahul-mehta.jpg"
                      alt="User testimonial"
                      width={40}
                      height={40}
                      loading="lazy"
                      className="rounded-full object-cover aspect-square border-2 border-white dark:border-gray-700"
                    />
                  </div>
                  <div className="flex flex-col items-center sm:items-start space-y-1">
                    <div className="flex items-center space-x-1">
                      <StarIcon width={16} height={16} className="text-yellow-400" />
                      <StarIcon width={16} height={16} className="text-yellow-400" />
                      <StarIcon width={16} height={16} className="text-yellow-400" />
                      <StarIcon width={16} height={16} className="text-yellow-400" />
                      <StarIcon width={16} height={16} className="text-yellow-400" />
                    </div>
                    <div className="flex items-center space-x-2 text-sm">
                      <p className="font-bold text-yellow-400">4.6</p>
                      <p className="text-yellow-400">•</p>
                      <p className="font-semibold text-yellow-400">50 reviews</p>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Mobile-Optimized Search Bar */}
              <motion.div
                className="w-full"
                variants={itemVariants}
              >
                <SearchBarMobile />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
