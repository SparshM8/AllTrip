"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronUp, ChevronDown } from "lucide-react";
import testimonialsData from "@/data/testimonials.json";

const testimonials = testimonialsData;

// Hardcoded image mapping for testimonials
const testimonialImages: { [key: string]: string } = {
  "Priya Sharma": "/testimonials/priya-sharma.jpg",
  "Rahul Mehta": "/testimonials/rahul-mehta.jpg",
  "Ananya Patel": "/testimonials/ananya-patel.jpg",
  "Vikram Singh": "/testimonials/vikram-singh.jpg",
};

export default function TestimonialsSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);

  // Auto-scroll functionality with pause on hover
  useEffect(() => {
    if (isHovered) return;

    const interval = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prevIndex) =>
        prevIndex >= testimonials.length - 2 ? 0 : prevIndex + 1
      );
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [isHovered]);


  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const slideVariants = {
    enter: {
      x: 300,
      opacity: 0,
      scale: 0.8,
    },
    center: {
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: {
      x: -300,
      opacity: 0,
      scale: 0.8,
    },
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prevIndex) =>
      prevIndex >= testimonials.length - 2 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 2 : prevIndex - 1
    );
  };

  const totalPages = Math.max(1, testimonials.length - 1);

  return (
    <section
      id="testimonials"
      ref={ref}
      className="py-12 bg-white dark:bg-gray-900"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-4 sm:px-6 lg:px-8 md:px-16 lg:px-20"
      >
        {/* Header Section with Navigation Controls */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-4 md:mb-6 gap-6 md:gap-8 lg:gap-0">
          <motion.div variants={itemVariants}>
            <p className="text-base md:text-lg text-gray-500 dark:text-gray-400 font-semibold">TESTIMONIALS</p>
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-800 dark:text-gray-100 mt-3 md:mt-4">
              What people say<br />
              about Us.
            </h2>
          </motion.div>

          {/* Navigation Controls - Parallel to title */}
          <motion.div variants={itemVariants} className="flex lg:flex-col gap-3 md:gap-4 justify-center lg:justify-start items-center lg:items-end">
            {/* Navigation Arrows */}
            <div className="flex lg:flex-col gap-3 md:gap-4">
              <button
                onClick={handlePrev}
                className="w-7 h-7 md:w-8 md:h-8 lg:w-7 lg:h-7 flex items-center justify-center transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <ChevronUp className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#BCB7C2] dark:text-gray-400 hover:text-[#3E2E4D] dark:hover:text-gray-200 transition-colors" strokeWidth={2} />
              </button>
              <button
                onClick={handleNext}
                className="w-7 h-7 md:w-8 md:h-8 lg:w-7 lg:h-7 flex items-center justify-center transition-all duration-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-full"
              >
                <ChevronDown className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7 text-[#3E2E4D] dark:text-gray-300 hover:text-[#BCB7C2] dark:hover:text-gray-400 transition-colors" strokeWidth={2} />
              </button>
            </div>

            {/* Pagination Dots */}
            <div className="flex lg:flex-col gap-2 md:gap-3 lg:gap-4 lg:ml-4">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2.5 h-2.5 md:w-3 md:h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    index === currentIndex ? 'bg-[#39425D] dark:bg-gray-300' : 'bg-[#E5E5E5] dark:bg-gray-600 hover:bg-[#BCB7C2] dark:hover:bg-gray-500'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Testimonials Cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-8 lg:gap-20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background Card */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 }
                }}
                className="relative"
              >
                {/* Profile Image for Left Card */}
                {testimonials[currentIndex] && (
                  <motion.div
                    className="absolute -left-3 md:-left-6 lg:-left-9 top-0 z-10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[68px] lg:h-[68px] rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-lg">
                      <Image
                        src={testimonialImages[testimonials[currentIndex]?.name] || "/placeholder.svg"}
                        alt={testimonials[currentIndex]?.name || "User"}
                        width={68}
                        height={68}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </motion.div>
                )}

                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 lg:p-8 ml-4 md:ml-6 lg:ml-9 border border-[#F7F7F7] dark:border-gray-700 shadow-[0px_1.85px_3.15px_0px_rgba(0,0,0,0),0px_8.15px_6.52px_0px_rgba(0,0,0,0.01),0px_20px_13px_0px_rgba(0,0,0,0.01),0px_38.52px_25.48px_0px_rgba(0,0,0,0.01),0px_64.81px_46.85px_0px_rgba(0,0,0,0.02),0px_100px_80px_0px_rgba(0,0,0,0.02)] dark:shadow-[0px_1.85px_3.15px_0px_rgba(0,0,0,0.3),0px_8.15px_6.52px_0px_rgba(0,0,0,0.2),0px_20px_13px_0px_rgba(0,0,0,0.2),0px_38.52px_25.48px_0px_rgba(0,0,0,0.2),0px_64.81px_46.85px_0px_rgba(0,0,0,0.3),0px_100px_80px_0px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0px_10px_40px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[0px_10px_40px_0px_rgba(0,0,0,0.3)] hover:-translate-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <blockquote className="text-[#4E4E73] dark:text-gray-300 text-sm leading-6 md:leading-7 lg:leading-8 mb-8 md:mb-12 lg:mb-16" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                    "{testimonials[currentIndex]?.testimonial}"
                  </blockquote>

                  <div>
                    <cite className="font-semibold text-sm md:text-base lg:text-lg text-[#5E6282] dark:text-gray-200 not-italic block" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {testimonials[currentIndex]?.name}
                    </cite>
                    <p className="text-[#5E6282] dark:text-gray-400 text-xs mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      From {testimonials[currentIndex]?.location}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Featured Card with Image */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={currentIndex + 1}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{
                  x: { type: "spring", stiffness: 300, damping: 30 },
                  opacity: { duration: 0.4 },
                  scale: { duration: 0.4 }
                }}
                className="relative"
              >
                {/* Profile Image */}
                {testimonials[currentIndex + 1] && (
                  <motion.div
                    className="absolute -left-3 md:-left-6 lg:-left-9 top-0 z-10"
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="w-[50px] h-[50px] md:w-[60px] md:h-[60px] lg:w-[68px] lg:h-[68px] rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-lg">
                      <Image
                        src={testimonialImages[testimonials[currentIndex + 1]?.name] || "/placeholder.svg"}
                        alt={testimonials[currentIndex + 1]?.name || "User"}
                        width={68}
                        height={68}
                        className="object-cover w-full h-full transition-transform duration-300 hover:scale-110"
                      />
                    </div>
                  </motion.div>
                )}

                <motion.div
                  className="bg-white dark:bg-gray-800 rounded-lg p-4 md:p-6 lg:p-8 ml-4 md:ml-6 lg:ml-9 border border-[#F7F7F7] dark:border-gray-700 shadow-[0px_1.85px_3.15px_0px_rgba(0,0,0,0),0px_8.15px_6.52px_0px_rgba(0,0,0,0.01),0px_20px_13px_0px_rgba(0,0,0,0.01),0px_38.52px_25.48px_0px_rgba(0,0,0,0.01),0px_64.81px_46.85px_0px_rgba(0,0,0,0.02),0px_100px_80px_0px_rgba(0,0,0,0.02)] dark:shadow-[0px_1.85px_3.15px_0px_rgba(0,0,0,0.3),0px_8.15px_6.52px_0px_rgba(0,0,0,0.2),0px_20px_13px_0px_rgba(0,0,0,0.2),0px_38.52px_25.48px_0px_rgba(0,0,0,0.2),0px_64.81px_46.85px_0px_rgba(0,0,0,0.3),0px_100px_80px_0px_rgba(0,0,0,0.3)] transition-all duration-300 hover:shadow-[0px_10px_40px_0px_rgba(0,0,0,0.1)] dark:hover:shadow-[0px_10px_40px_0px_rgba(0,0,0,0.3)] hover:-translate-y-2"
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                >
                  <blockquote className="text-[#5E6282] dark:text-gray-300 text-sm leading-6 md:leading-7 lg:leading-8 mb-8 md:mb-12 lg:mb-16" style={{ fontFamily: 'Poppins, sans-serif' }}>
                    "{testimonials[currentIndex + 1]?.testimonial}"
                  </blockquote>

                  <div>
                    <cite className="font-semibold text-sm md:text-base lg:text-lg text-[#5E6282] dark:text-gray-200 not-italic block" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      {testimonials[currentIndex + 1]?.name}
                    </cite>
                    <p className="text-[#5E6282] dark:text-gray-400 text-xs mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                      From {testimonials[currentIndex + 1]?.location}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
