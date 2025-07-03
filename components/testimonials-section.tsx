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
      className="relative py-20 md:py-32 bg-cover bg-center bg-fixed"
      style={{ backgroundImage: "url('/map.jpg')" }}
    >
      <div className="absolute inset-0 bg-slate-800/80 z-0" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container relative z-10 px-4 md:px-6"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-extrabold text-white tracking-tighter uppercase">
            From Our Travellers
          </h2>
          <div className="flex items-center justify-center mt-4">
            <div className="w-16 h-px bg-yellow-400"></div>
            <p className="text-lg md:text-xl text-white/80 mx-4">
              Real stories from the AllTripp family
            </p>
            <div className="w-16 h-px bg-yellow-400"></div>
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
              className="bg-black/20 backdrop-blur-lg rounded-2xl p-6 flex flex-col h-full border border-white/10
                         transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-2"
            >
              <Quote className="w-10 h-10 text-yellow-400/50 mb-4" strokeWidth={1.5} />
              
              <p className="text-white/80 mb-6 italic text-sm leading-relaxed flex-grow">
                "{testimonial.testimonial}"
              </p>

              <div className="mt-auto">
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full border-2 border-yellow-400/50">
                    <Image
                      src={testimonialImages[testimonial.name] || "/placeholder.svg"}
                      alt={testimonial.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="text-white">
                    <h3 className="font-semibold">{testimonial.name}</h3>
                    <p className="text-sm text-white/70">
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
                          ? "text-yellow-400 fill-yellow-400"
                          : "text-yellow-400/30"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
