"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Users, MapPin, Award, Shield, LucideProps } from "lucide-react";
import aboutData from "@/data/about-data.json";

// Icon mapping for dynamic icon selection
const iconMap = {
  Users,
  MapPin,
  Award,
  Shield,
};

// Define a type for the stat object from the JSON file
interface Stat {
  number: string;
  label: string;
  icon: keyof typeof iconMap;
}

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Cast the imported data and then map it, letting TypeScript infer the final type
  const stats = (aboutData.stats as Stat[]).map(stat => ({
    ...stat,
    icon: iconMap[stat.icon]
  }));

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      id="about"
      ref={ref}
      className="relative py-20 md:py-32 overflow-hidden bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/background_destination.png')" }}
    >
      <div className="absolute inset-0 bg-black/60 z-0" />

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container relative z-10 px-4 md:px-6 mx-auto"
      >
        {/* Section Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter uppercase">
            Why Choose Us
          </h2>
          <div className="flex items-center justify-center mt-4">
            <div className="w-16 h-px bg-yellow-400"></div>
            <p className="text-lg md:text-xl text-white/80 mx-4">
              Crafting Authentic Journeys Since 2024
            </p>
            <div className="w-16 h-px bg-yellow-400"></div>
          </div>
        </motion.div>

        {/* Main Content Card */}
        <motion.div
          variants={itemVariants}
          className="max-w-4xl mx-auto bg-white/10 backdrop-blur-lg rounded-2xl p-8 md:p-12 border border-white/20 shadow-2xl"
        >
          <p className="text-lg md:text-xl text-white/90 leading-relaxed text-center">
            We believe travel is about confidence, authenticity, and celebrating your unique journey. 
            Since our founding, we've been dedicated to curating the finest, most immersive 
            experiences across the incredible landscapes of India. Our passion is to redefine 
            travel standards, one unforgettable trip at a time.
          </p>
        </motion.div>

        {/* Stats Grid */}
        {stats.length > 0 && (
          <motion.div
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 max-w-5xl mx-auto"
          >
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="text-center text-white"
              >
                <stat.icon className="mx-auto mb-3 h-10 w-10 text-yellow-400" strokeWidth={1.5} />
                <p className="text-3xl md:text-4xl font-bold">{stat.number}</p>
                <p className="text-sm text-white/70 uppercase tracking-wider">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        )}
      </motion.div>
    </section>
  );
}
