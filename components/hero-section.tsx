"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
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

  // Function to handle smooth scroll to sections
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

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
        className="relative w-full overflow-hidden"
        style={{
          height: 'calc(100vh + 100px)',
          marginTop: '-100px',
          zIndex: 1,
        }}
      >
        <Image
          src="/5.jpg"
          alt="Scenic view of Himalayas/Kashmir"
          fill
          priority
          className="object-cover"
          style={{ objectPosition: 'center center' }}
        />
        <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
        
        {/* Content Container - Dead Center */}
        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            className="relative z-10 flex flex-col items-center justify-center text-center text-white px-4 w-full max-w-6xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.h1
              className="mb-6 text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl lg:text-6xl max-w-4xl"
              variants={itemVariants}
            >
              One Solution For All Your{" "}
              <span className="text-[#FDBE00]">Travel Needs</span>
            </motion.h1>

            <motion.p
              className="mb-12 max-w-2xl text-lg sm:text-xl leading-relaxed"
              variants={itemVariants}
            >
              Experience the magic of India with AllTripp. From mountain escapes to coastal retreats, we bring you curated journeys that celebrate culture, connection, and unforgettable moments.
            </motion.p>

            {/* Search Bar below subtitle */}
            <motion.div 
              className="w-full flex justify-center"
              variants={itemVariants}
            >
              <SearchBar />
            </motion.div>
          </motion.div>
        </div>
      </section>
    </>
  );
}
