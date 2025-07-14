"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star, Users, SlidersHorizontal, LifeBuoy } from "lucide-react";
import featuresData from "@/data/features.json";

// Icon mapping for dynamic icon selection
const iconMap: { [key: string]: React.ElementType } = {
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
      className="relative py-20 md:py-28 overflow-hidden bg-white"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container relative z-10 px-4 md:px-6"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-black tracking-wide">
            WHY CHOOSE US?
          </h2>
          <p className="text-lg md:text-xl text-gray-600 mt-4 max-w-2xl mx-auto">
            Experiences you'll cherish forever
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4"
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div 
                key={index} 
                variants={itemVariants}
                className="card text-center p-8 bg-gray-50 rounded-xl shadow-md hover:shadow-xl transition-shadow duration-300"
              >
                <div className="card-icon flex justify-center items-center mb-5">
                  <Icon className="w-16 h-16 text-gray-800" strokeWidth={1.5} />
                </div>
                <h3 className="card-title text-xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="card-text text-gray-600 leading-relaxed text-sm">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </motion.div>
    </section>
  );
}
