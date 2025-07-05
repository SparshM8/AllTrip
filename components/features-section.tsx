"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Users, SlidersHorizontal, LifeBuoy } from "lucide-react";
import featuresData from "@/data/features.json";

// Icon mapping for dynamic icon selection
const iconMap = {
  Star,
  Users,
  SlidersHorizontal,
  LifeBuoy,
};

const features = featuresData.map(feature => ({
  ...feature,
  icon: iconMap[feature.icon as keyof typeof iconMap]
}));

export default function FeaturesSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

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
      id="features" 
      ref={ref} 
      className="relative py-20 md:py-32 bg-cover bg-center"
style={{ backgroundImage: "url('/gradient1.jpg')" }}
    >
<div className="absolute inset-0 bg-black/10 z-0" />
      
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container relative z-10 px-4 md:px-6"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
<h2 className="text-5xl md:text-7xl font-extrabold text-black tracking-wide uppercase">
Why Choose Us ?
          </h2>
          <div className="flex items-center justify-center mt-4">
            <div className="w-16 h-px bg-yellow-400"></div>
<p className="text-lg md:text-xl text-black mx-4">
              Experiences you'll cherish forever
            </p>
            <div className="w-16 h-px bg-yellow-400"></div>
          </div>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => (
            <motion.div 
              key={index} 
              variants={itemVariants}
className="bg-white/10 backdrop-blur-2xl rounded-2xl p-6 text-center text-white border border-white/10
                         transform transition-all duration-300"
            >
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center">
                  <feature.icon
className="w-8 h-8 text-black"
                    strokeWidth={1.5}
                  />
                </div>
              </div>
<h3 className="text-xl font-bold mb-2 text-black">{feature.title}</h3>
<p className="text-black text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
