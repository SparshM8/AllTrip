"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Star, Quote } from "lucide-react";
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

  return (
<section 
      id="testimonials" 
      ref={ref} 
      className="relative py-20 md:py-32"
    >
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container relative z-10 px-4 md:px-6"
      >
        <motion.div variants={itemVariants} className="text-left mb-16">
<h2 className="text-5xl md:text-5xl font-extrabold text-black tracking-tighter uppercase">
            From Our Travellers
          </h2>
          <div className="flex items-center mt-4">
<p className="text-lg md:text-xl text-black">
              Real stories from the AllTripp family
            </p>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4"
        >
          {testimonials.map((testimonial, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
              className="bg-[#b8860b] backdrop-blur-lg rounded-2xl p-6 flex flex-col h-full border border-[#ddb400]
                         transform transition-all duration-300 hover:shadow-[0_4px_12px_rgba(0,0,0,0.08)] hover:-translate-y-2 hover:bg-[#c8961b]"
            >
<Quote className="w-10 h-10 text-[#fdbe00] mb-4" strokeWidth={1.5} />
              
<blockquote className="text-white mb-6 italic text-base flex-grow" style={{ lineHeight: '1.6', letterSpacing: '0.5px' }}>
                "{testimonial.testimonial}"
              </blockquote>

              <footer className="mt-auto">
                <div className="flex items-center gap-4">
<div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-white/50">
                    <Image
                      src={testimonialImages[testimonial.name] || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-white">
<cite className="font-semibold not-italic" style={{ lineHeight: '1.2', letterSpacing: '0.2px', color: 'rgba(255,255,255,0.9)' }}>{testimonial.name}</cite>
<p className="text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      {testimonial.location}
                    </p>
                  </div>
                </div>
                <div className="flex mt-4">
                  {[...Array(5)].map((_, i) => (
<Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-[#fdbe00] fill-[#fdbe00]"
                          : "text-gray-500"
                      }`}
                    />
                  ))}
                </div>
              </footer>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
