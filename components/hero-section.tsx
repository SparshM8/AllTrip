"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import SearchBar from "@/components/search-bar";

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [scrollProgress, setScrollProgress] = useState(0);

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

  return (
    <>
      {/* Custom Scroll Indicator */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50">
        <div className="w-1 h-32 bg-white/20 rounded-full backdrop-blur-sm">
          <div 
            className="w-full bg-[#FDBE00] rounded-full transition-all duration-300 ease-out"
            style={{ height: `${scrollProgress}%` }}
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
          className="object-cover"
          style={{ objectPosition: 'center center' }}
        />
        {/* The ::before pseudo-element will handle the overlay */}
        
        {/* Content Container - Centered */}
        <div className="content relative z-10 flex flex-col items-center text-center text-white">
          <div>
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
              <motion.h1 className="text-5xl md:text-7xl font-bold text-white tracking-tighter " variants={itemVariants}>
                One Solution For All Your <span className="text-yellow-400">Travel</span> <br /> <span className="text-yellow-400">Needs</span>
              </motion.h1>

              <motion.p
                className="max-w-2xl mt-4 text-sm md:text-base mx-auto"
                variants={itemVariants}
              >
                Experience the magic of India with AllTripp. From mountain escapes to coastal retreats, we bring you curated journeys that celebrate culture, connection, and unforgettable moments.
              </motion.p>

              {/* Search Bar - Below subtitle */}
              <motion.div 
                className="mt-8"
                variants={itemVariants}
              >
                <SearchBar />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>
    </>
  );
}
