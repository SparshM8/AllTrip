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

const featureImages: { [key: string]: string } = {
  "Custom-Made Travel Plans": "/feature1.png",
  "Hidden Gems, Offbeat Trails": "/feature2.jpg",
  "End-to-End Planning & Support": "/feature3.png",
  "Authentic Local Connections": "/feature4.jpg",
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
      className="relative py-20 md:py-32 overflow-hidden"
      style={{ backgroundColor: "#fff" }}
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container relative z-10 px-4 md:px-6"
      >
        <motion.div variants={itemVariants} className="text-left mb-16">
          <h2 className="text-5xl md:text-7xl font-extrabold text-black tracking-wide uppercase">
            Why Choose Us ?
          </h2>
          <div className="mt-4">
            <p className="text-lg md:text-xl text-black">
              Experiences you'll cherish forever
            </p>
            <div className="mt-4 h-0.5 bg-yellow-400"></div>
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
              className={`rounded-2xl p-0 text-center border shadow-lg bg-white transform transition-all duration-300 ${featureImages[feature.title] ? "flex flex-row min-h-[220px]" : "p-6"}`}
            >
              {featureImages[feature.title] ? (
                <>
                  <div className="w-1/3 h-full rounded-l-2xl overflow-hidden">
                    <img
                      src={featureImages[feature.title]}
                      alt={feature.title}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="w-2/3 flex flex-col justify-center items-start p-6 text-left">
                    <h3 className="text-xl font-bold mb-2 text-black">{feature.title}</h3>
                    <p className="text-black text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex flex-col justify-center items-start text-left p-2">
                    <h3 className="text-xl font-bold mb-2 text-black">{feature.title}</h3>
                    <p className="text-black text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
