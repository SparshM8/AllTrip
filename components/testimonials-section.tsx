"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
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

  // Auto-scroll functionality with pause on hover
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
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

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex >= testimonials.length - 2 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? testimonials.length - 2 : prevIndex - 1
    );
  };

  const totalPages = Math.max(1, testimonials.length - 1);

  return (
    <section 
      id="testimonials" 
      ref={ref} 
      className="py-12"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-4 sm:px-6 lg:px-8 md:px-16 lg:px-20"
      >
        {/* Header Section with Navigation Controls */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-6 gap-8 lg:gap-0">
          <motion.div variants={itemVariants}>
            <p className="text-lg text-gray-500 font-semibold">TESTIMONIALS</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-4">
              What people say<br />
              about Us.
            </h2>
          </motion.div>
          
          {/* Navigation Controls - Parallel to title */}
          <motion.div variants={itemVariants} className="flex lg:flex-col gap-4 justify-center lg:justify-start items-center lg:items-end">
            {/* Navigation Arrows */}
            <div className="flex lg:flex-col gap-4">
              <button
                onClick={handlePrev}
                className="w-8 h-8 lg:w-7 lg:h-7 flex items-center justify-center transition-all duration-300 hover:bg-gray-100 rounded-full"
              >
                <ChevronUp className="w-6 h-6 lg:w-7 lg:h-7 text-[#BCB7C2] hover:text-[#3E2E4D] transition-colors" strokeWidth={2} />
              </button>
              <button
                onClick={handleNext}
                className="w-8 h-8 lg:w-7 lg:h-7 flex items-center justify-center transition-all duration-300 hover:bg-gray-100 rounded-full"
              >
                <ChevronDown className="w-6 h-6 lg:w-7 lg:h-7 text-[#3E2E4D] hover:text-[#BCB7C2] transition-colors" strokeWidth={2} />
              </button>
            </div>
            
            {/* Pagination Dots */}
            <div className="flex lg:flex-col gap-3 sm:gap-4 lg:ml-4">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-110 ${
                    index === currentIndex ? 'bg-[#39425D]' : 'bg-[#E5E5E5] hover:bg-[#BCB7C2]'
                  }`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Testimonials Cards */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-20"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          {/* Background Card */}
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            {/* Profile Image for Left Card */}
            {testimonials[currentIndex] && (
              <motion.div 
                className="absolute -left-6 sm:-left-9 top-0 z-10"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] rounded-full overflow-hidden border-2 border-white shadow-lg">
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
              className="bg-white rounded-lg p-6 sm:p-8 ml-6 sm:ml-9 border border-[#F7F7F7] shadow-[0px_1.85px_3.15px_0px_rgba(0,0,0,0),0px_8.15px_6.52px_0px_rgba(0,0,0,0.01),0px_20px_13px_0px_rgba(0,0,0,0.01),0px_38.52px_25.48px_0px_rgba(0,0,0,0.01),0px_64.81px_46.85px_0px_rgba(0,0,0,0.02),0px_100px_80px_0px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0px_10px_40px_0px_rgba(0,0,0,0.1)] hover:-translate-y-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <blockquote className="text-[#4E4E73] text-sm sm:text-base leading-7 sm:leading-8 mb-12 sm:mb-16" style={{ fontFamily: 'Open Sans, sans-serif' }}>
                "{testimonials[currentIndex]?.testimonial}"
              </blockquote>
              
              <div>
                <cite className="font-semibold text-base sm:text-lg text-[#5E6282] not-italic block" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {testimonials[currentIndex]?.name}
                </cite>
                <p className="text-[#5E6282] text-xs sm:text-sm mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  From {testimonials[currentIndex]?.location}
                </p>
              </div>
            </motion.div>
          </motion.div>

          {/* Featured Card with Image */}
          <motion.div 
            variants={itemVariants}
            className="relative"
          >
            {/* Profile Image */}
            {testimonials[currentIndex + 1] && (
              <motion.div 
                className="absolute -left-6 sm:-left-9 top-0 z-10"
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                <div className="w-[60px] h-[60px] sm:w-[68px] sm:h-[68px] rounded-full overflow-hidden border-2 border-white shadow-lg">
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
              className="bg-white rounded-lg p-6 sm:p-8 ml-6 sm:ml-9 shadow-[0px_1.85px_3.15px_0px_rgba(0,0,0,0),0px_8.15px_6.52px_0px_rgba(0,0,0,0.01),0px_20px_13px_0px_rgba(0,0,0,0.01),0px_38.52px_25.48px_0px_rgba(0,0,0,0.01),0px_64.81px_46.85px_0px_rgba(0,0,0,0.02),0px_100px_80px_0px_rgba(0,0,0,0.02)] transition-all duration-300 hover:shadow-[0px_10px_40px_0px_rgba(0,0,0,0.1)] hover:-translate-y-2"
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              <blockquote className="text-[#5E6282] text-sm sm:text-base leading-7 sm:leading-8 mb-12 sm:mb-16" style={{ fontFamily: 'Poppins, sans-serif' }}>
                "{testimonials[currentIndex + 1]?.testimonial}"
              </blockquote>
              
              <div>
                <cite className="font-semibold text-base sm:text-lg text-[#5E6282] not-italic block" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {testimonials[currentIndex + 1]?.name}
                </cite>
                <p className="text-[#5E6282] text-xs sm:text-sm mt-1" style={{ fontFamily: 'Poppins, sans-serif' }}>
                  {testimonials[currentIndex + 1]?.location}
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
