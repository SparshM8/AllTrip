"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Lottie from 'lottie-react';
import travelAnimation from "@/animations/travel-animation.json";
import { getBlurData } from "@/lib/blur-data";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
import SearchBar from "@/components/search-bar";
import AnimatedCounters from "@/components/animated-counters";
import { StarIcon } from "@/components/ui/star-icon";

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [scrollProgress, setScrollProgress] = useState(0);
  const reduceMotion = useReducedMotion();

  // Replaced local variants with centralized motion system

  // Scroll progress tracking
  useEffect(() => {
    // Inject CSS mapping for data-driven scroll indicator heights (0-100%)
    const styleId = 'scroll-progress-styles';
    if (typeof document !== 'undefined' && !document.getElementById(styleId)) {
      const style = document.createElement('style');
      style.id = styleId;
      let css = '';
      for (let i = 0; i <= 100; i++) {
        css += `.scroll-indicator [data-p='${i}']{height:${i}%}`;
      }
      style.textContent = css;
      document.head.appendChild(style);
    }

    const handleScroll = () => {
      const scrollTop = window.pageYOffset;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      setScrollProgress(scrollPercent);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      {/* Custom Scroll Indicator */}
      <div className="scroll-indicator fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
        <div className="w-1 h-32 bg-white/20 rounded-full backdrop-blur-sm">
          <div
            className="w-full bg-[#FDBE00] rounded-full transition-all duration-300 ease-out"
            data-p={Math.round(scrollProgress)}
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
          placeholder="blur"
          blurDataURL={getBlurData('/4.png')}
        />
  {/* Gradient tint overlay */}
  <div className="absolute inset-0 z-0 bg-travel-gradient opacity-30" />
        
        {/* Content Container - Left Aligned */}
        <div className="content relative z-10 flex flex-col items-start justify-center text-left text-white px-6 md:px-24 lg:px-56">
          <div className="glass-card p-6 md:p-8 rounded-2xl">
            <motion.div
              className="inline-block"
              variants={staggerContainer(0.1,0.15)}
              initial="initial"
              animate={isInView ? "animate" : "initial"}
            >
                <motion.h1 className="text-4xl md:text-6xl font-extrabold text-white tracking-tight" variants={fadeInUp}>
                  One Solution For All Your <span className="text-yellow-400">Travel</span> <span className="text-yellow-400">Needs</span>
                </motion.h1>

                <motion.p
                  className="mt-4 text-sm md:text-base mx-1"
                  variants={fadeInUp}
                >
                  Experience the magic of India with AllTripp. From mountain escapes to coastal retreats, we bring you curated journeys that celebrate culture, connection, and unforgettable moments. Whether you seek serene backwaters, majestic peaks, or vibrant cityscapes, our bespoke packages are designed to fulfill your every travel desire, ensuring a seamless and enriching adventure from start to finish.
                </motion.p>

                <motion.div
                  className="mt-6 flex items-center justify-start space-x-8 cursor-pointer focusable"
                  variants={fadeInUp}
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
                    <div className="flex space-x-2">
                      <Image
                        src="/testimonials/ananya-patel.jpg"
                        alt="User testimonial"
                        width={56}
                        height={56}
                        loading="lazy"
                        className="rounded-full object-cover aspect-square"
                        placeholder="blur"
                        blurDataURL={getBlurData('ananya-patel')}
                      />
                      <Image
                        src="/testimonials/priya-sharma.jpg"
                        alt="User testimonial"
                        width={56}
                        height={56}
                        loading="lazy"
                        className="rounded-full object-cover aspect-square"
                        placeholder="blur"
                        blurDataURL={getBlurData('priya-sharma')}
                      />
                      <Image
                        src="/testimonials/rahul-mehta.jpg"
                        alt="User testimonial"
                        width={56}
                        height={56}
                        loading="lazy"
                        className="rounded-full object-cover aspect-square"
                        placeholder="blur"
                        blurDataURL={getBlurData('rahul-mehta')}
                      />
                      <Image
                        src="/testimonials/rohan-sharma.jpg"
                        alt="User testimonial"
                        width={56}
                        height={56}
                        loading="lazy"
                        className="rounded-full object-cover aspect-square"
                        placeholder="blur"
                        blurDataURL={getBlurData('rohan-sharma')}
                      />
                      <Image
                        src="/testimonials/vikram-singh.jpg"
                        alt="User testimonial"
                        width={56}
                        height={56}
                        loading="lazy"
                        className="rounded-full object-cover aspect-square"
                        placeholder="blur"
                        blurDataURL={getBlurData('vikram-singh')}
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline space-y-2 sm:space-y-0 sm:space-x-4 translate-y-0 sm:translate-y-4">
                      <p className="font-bold leading-none text-[18px] text-[#fbb03b]">4.6</p>
                      <div className="flex items-baseline space-x-1">
                        <StarIcon width={18} height={18} className="sm:w-[22px] sm:h-[22px] text-yellow-400" />
                        <StarIcon width={18} height={18} className="sm:w-[22px] sm:h-[22px] text-yellow-400" />
                        <StarIcon width={18} height={18} className="sm:w-[22px] sm:h-[22px] text-yellow-400" />
                        <StarIcon width={18} height={18} className="sm:w-[22px] sm:h-[22px] text-yellow-400" />
                        <StarIcon width={18} height={18} className="sm:w-[22px] sm:h-[22px] text-yellow-400" />
                      </div>
                      <p className="font-semibold leading-none text-[18px] text-[#fbb03b]">50 reviews</p>
                    </div>
                  </div>
                </motion.div>

                {/* Search Bar - Below subtitle */}
                <motion.div 
                  className="mt-8 w-full"
                  variants={fadeInUp}
                >
                  <SearchBar />
                </motion.div>
                {/* Animated counters: social proof / quick stats */}
                <motion.div className="mt-6 w-full" variants={fadeInUp}>
                  <AnimatedCounters
                    items={[
                      { id: 'trips', label: 'Trips booked', value: 1248 },
                      { id: 'destinations', label: 'Destinations', value: 86 },
                      { id: 'partners', label: 'Local partners', value: 42 },
                    ]}
                  />
                </motion.div>
            </motion.div>
          </div>
        </div>
        {/* Decorative Lottie Animation - Right Side on large screens */}
        <div className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 pointer-events-none hidden lg:flex items-center justify-center w-1/2 pr-16">
          <div className="w-[520px] max-w-full" aria-hidden="true">
              {!reduceMotion ? (
                <Lottie animationData={travelAnimation} loop={true} autoplay={true} />
              ) : (
                // Reduced motion: render decorative static SVG fallback (keeps visual balance)
                <div className="w-full h-64 bg-gradient-to-tr from-yellow-200 via-amber-200 to-transparent rounded-lg" aria-hidden="true" />
              )}
            </div>
        </div>
      </section>
    </>
  );
}
