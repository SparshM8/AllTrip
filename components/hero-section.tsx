"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import SearchBar from "@/components/search-bar";
import { StarIcon } from "@/components/ui/star-icon";

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
        {/* Black tint overlay */}
        <div className="absolute inset-0 bg-black/20 z-0" />
        
        {/* Content Container - Left Aligned */}
        <div className="content relative z-10 flex flex-col items-start justify-center text-left text-white px-56">
          <div className="bg-black/0 backdrop--sm p-8 rounded-lg">
            <motion.div
              className="inline-block"
              variants={containerVariants}
              initial="hidden"
              animate={isInView ? "visible" : "hidden"}
            >
                <motion.h1 className="text-4xl md:text-6xl font-bold text-white tracking-tighter whitespace-nowrap" variants={itemVariants}>
                  One Solution For All Your <span className="text-yellow-400">Travel</span> <span className="text-yellow-400">Needs</span>
                </motion.h1>

                <motion.p
                  className="mt-4 text-sm md:text-base mx-1"
                  variants={itemVariants}
                >
                  Experience the magic of India with AllTripp. From mountain escapes to coastal retreats, we bring you curated journeys that celebrate culture, connection, and unforgettable moments. Whether you seek serene backwaters, majestic peaks, or vibrant cityscapes, our bespoke packages are designed to fulfill your every travel desire, ensuring a seamless and enriching adventure from start to finish.
                </motion.p>

                <motion.div
                  className="mt-6 flex items-center justify-start space-x-8 cursor-pointer"
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
                    <div className="flex space-x-2">
                      <Image
                        src="/testimonials/ananya-patel.jpg"
                        alt="User testimonial"
                        width={56}
                        height={56}
                        className="rounded-full object-cover aspect-square"
                      />
                      <Image
                        src="/testimonials/priya-sharma.jpg"
                        alt="User testimonial"
                        width={56}
                        height={56}
                        className="rounded-full object-cover aspect-square"
                      />
                      <Image
                        src="/testimonials/rahul-mehta.jpg"
                        alt="User testimonial"
                        width={56}
                        height={56}
                        className="rounded-full object-cover aspect-square"
                      />
                      <Image
                        src="/testimonials/rohan-sharma.jpg"
                        alt="User testimonial"
                        width={56}
                        height={56}
                        className="rounded-full object-cover aspect-square"
                      />
                      <Image
                        src="/testimonials/vikram-singh.jpg"
                        alt="User testimonial"
                        width={56}
                        height={56}
                        className="rounded-full object-cover aspect-square"
                      />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-baseline space-y-2 sm:space-y-0 sm:space-x-4 translate-y-0 sm:translate-y-4">
                      <p className="font-bold leading-none" style={{ color: '#fbb03b', fontSize: '18px' }}>4.6</p>
                      <div className="flex items-baseline space-x-1">
                        <StarIcon width={18} height={18} className="sm:w-[22px] sm:h-[22px] text-yellow-400" />
                        <StarIcon width={18} height={18} className="sm:w-[22px] sm:h-[22px] text-yellow-400" />
                        <StarIcon width={18} height={18} className="sm:w-[22px] sm:h-[22px] text-yellow-400" />
                        <StarIcon width={18} height={18} className="sm:w-[22px] sm:h-[22px] text-yellow-400" />
                        <StarIcon width={18} height={18} className="sm:w-[22px] sm:h-[22px] text-yellow-400" />
                      </div>
                      <p className="font-semibold leading-none" style={{ color: '#fbb03b', fontSize: '18px' }}>50 reviews</p>
                    </div>
                  </div>
                </motion.div>

                {/* Search Bar - Below subtitle */}
                <motion.div 
                  className="mt-8 w-full"
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
