"use client";

import React from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Leaf, Users, ArrowRight } from "lucide-react";

export default function SocialImpactSection() {
  const sectionRef = React.useRef(null);
  const isSectionInView = useInView(sectionRef, { once: true, amount: 0.1 });

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const eventCard = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5, ease: "easeOut" },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full overflow-hidden py-12 sm:py-16 md:py-20 section-spacing"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-10 sm:mb-12 md:mb-16"
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-3 sm:mb-4 text-gray-900 dark:text-white">
            Make a Difference
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto px-2">
            Join our community initiatives and create positive impact while
            exploring the beauty of destinations.
          </p>
        </motion.div>

        {/* Events Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8"
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          variants={staggerContainer}
        >
          {/* Clean Wastage Volunteers */}
          <motion.div
            className="relative group overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transition-shadow duration-300"
            variants={eventCard}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-green-600 to-emerald-700 opacity-90" />

            {/* Decorative elements - scaled down on mobile */}
            <div className="absolute -right-8 sm:-right-10 -top-8 sm:-top-10 w-24 sm:w-40 h-24 sm:h-40 bg-white/10 rounded-full blur-2xl sm:blur-3xl" />
            <div className="absolute -left-8 sm:-left-10 -bottom-8 sm:-bottom-10 w-24 sm:w-40 h-24 sm:h-40 bg-white/10 rounded-full blur-2xl sm:blur-3xl" />

            {/* Content */}
            <div className="relative z-10 p-6 sm:p-8 md:p-12 flex flex-col h-full justify-between">
              <div>
                <div className="mb-3 sm:mb-4 inline-flex p-2 sm:p-3 bg-white/20 rounded-lg">
                  <Leaf className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                  Clean Wastage Volunteers
                </h3>
                <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
                  Help us keep our destinations clean and pristine. Join our
                  volunteer initiative to remove wastage, protect ecosystems,
                  and contribute to sustainable travel practices. Every action
                  counts towards preserving nature for future travelers.
                </p>
              </div>

              <Button
                asChild
                className="mt-6 sm:mt-8 bg-white text-green-600 hover:bg-gray-100 rounded-full font-semibold inline-flex items-center gap-2 w-fit text-xs sm:text-sm"
              >
                <Link
                  href="https://wa.me/919266602470?text=Hi%20AllTripp!%20I%27m%20interested%20in%20participating%20in%20the%20Clean%20Wastage%20Volunteers%20initiative."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Now
                  <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>

          {/* Distribute and Educate Children */}
          <motion.div
            className="relative group overflow-hidden rounded-lg sm:rounded-xl md:rounded-2xl shadow-md sm:shadow-lg hover:shadow-lg sm:hover:shadow-xl transition-shadow duration-300"
            variants={eventCard}
          >
            <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-cyan-700 opacity-90" />

            {/* Decorative elements - scaled down on mobile */}
            <div className="absolute -right-8 sm:-right-10 -top-8 sm:-top-10 w-24 sm:w-40 h-24 sm:h-40 bg-white/10 rounded-full blur-2xl sm:blur-3xl" />
            <div className="absolute -left-8 sm:-left-10 -bottom-8 sm:-bottom-10 w-24 sm:w-40 h-24 sm:h-40 bg-white/10 rounded-full blur-2xl sm:blur-3xl" />

            {/* Content */}
            <div className="relative z-10 p-6 sm:p-8 md:p-12 flex flex-col h-full justify-between">
              <div>
                <div className="mb-3 sm:mb-4 inline-flex p-2 sm:p-3 bg-white/20 rounded-lg">
                  <Users className="w-5 sm:w-6 h-5 sm:h-6 text-white" />
                </div>
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-white mb-2 sm:mb-3">
                  Distribute and Educate Children
                </h3>
                <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
                  Be part of our mission to empower children through education
                  and support. Distribute learning materials, teach essential
                  skills, and provide mentorship to underprivileged children in
                  remote destinations. Make a lasting impact one child at a time.
                </p>
              </div>

              <Button
                asChild
                className="mt-6 sm:mt-8 bg-white text-blue-600 hover:bg-gray-100 rounded-full font-semibold inline-flex items-center gap-2 w-fit text-xs sm:text-sm"
              >
                <Link
                  href="https://wa.me/919266602470?text=Hi%20AllTripp!%20I%27m%20interested%20in%20participating%20in%20the%20Distribute%20and%20Educate%20Children%20initiative."
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Join Now
                  <ArrowRight className="w-3 sm:w-4 h-3 sm:h-4" />
                </Link>
              </Button>
            </div>
          </motion.div>
        </motion.div>

        {/* Call to Action */}
        <motion.div
          className="mt-10 sm:mt-12 md:mt-16 text-center px-2"
          initial="hidden"
          animate={isSectionInView ? "visible" : "hidden"}
          variants={fadeInUp}
          transition={{ delay: 0.4 }}
        >
          <p className="text-xs sm:text-sm md:text-base text-gray-600 dark:text-gray-300">
            Can't join in person?{" "}
            <Link
              href="https://wa.me/919266602470?text=Hi%20AllTripp!%20I%20want%20to%20support%20your%20social%20impact%20initiatives."
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-600 dark:text-green-400 font-semibold hover:underline"
            >
              Contact us for sponsorship opportunities
            </Link>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
