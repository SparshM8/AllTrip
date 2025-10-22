"use client";

import { Star, Users, SlidersHorizontal, LifeBuoy } from "lucide-react";
import featuresData from "@/data/features.json";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

// Icon mapping for dynamic icon selection
const iconMap: { [key: string]: React.ElementType } = {
  Star,
  Users,
  SlidersHorizontal,
  LifeBuoy,
};

const features = featuresData.map((feature) => ({
  ...feature,
  icon: iconMap[feature.icon as keyof typeof iconMap],
}));

export default function FeaturesSection() {
  return (
    <section
      id="features"
      className="relative py-20 overflow-hidden bg-white dark:bg-[hsl(var(--surface-base))]"
    >
      <div className="container relative z-10 px-6 md:px-12 lg:px-20">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="heading-display text-gray-900 dark:text-white uppercase">Why Choose Us</h2>
          <div className="mx-auto mt-6 h-[3px] w-20 bg-gradient-to-r from-[hsl(var(--brand-accent))] to-transparent rounded" />
          <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
            Experiences you'll cherish forever
          </p>
        </div>

        <motion.div 
          className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-4"
          variants={staggerContainer(0.1,0.12)}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true, amount: 0.15 }}
        >
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="card-modern p-6 md:p-7 rounded-xl hover:-translate-y-1 focusable"
              >
                <div className="flex items-center justify-center w-14 h-14 md:w-16 md:h-16 rounded-lg bg-white/10 border border-white/15 mb-6">
                  <Icon className="w-7 h-7 md:w-8 md:h-8 text-white" strokeWidth={1.5} />
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-white mb-2 tracking-tight">
                  {feature.title}
                </h3>
                <p className="text-sm md:text-base text-gray-300 leading-relaxed">
                  {feature.description}
                </p>
              </motion.div>
            );
          })}
        </motion.div>
      </div>

      {/* Subtle vignette */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/0 via-black/0 to-black/5 dark:to-black/20" />
    </section>
  );
}
