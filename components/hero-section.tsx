"use client";

import { useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import SearchBar from "@/components/search-bar";

export default function HeroSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

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

  // Function to handle smooth scroll to sections
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section ref={ref} className="relative h-screen w-full overflow-hidden flex items-center justify-center" style={{ marginTop: '-60px' }}>
      <Image
        src="/5.jpg"
        alt="Scenic view of Himalayas/Kashmir"
        fill
        priority
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/40" /> {/* Overlay */}
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
          className="mb-8 max-w-xl text-base sm:text-lg"
          variants={itemVariants}
        >
          Discover the beauty of India with AllTripp. We offer premium travel
          experiences across the country, from the Himalayas to the backwaters
          of Kerala.
        </motion.p>

        {/* Search Bar below subtitle */}
        <motion.div 
          className="w-full flex justify-center"
          variants={itemVariants}
        >
          <SearchBar />
        </motion.div>
      </motion.div>
    </section>
  );
}
