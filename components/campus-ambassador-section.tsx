"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Award, Briefcase, BadgeIcon as Certificate, Gift } from "lucide-react";
import Link from "next/link";
import campusBenefitsData from "@/data/campus-benefits.json";

// Icon mapping for dynamic icon selection
const iconMap = {
  Award,
  Briefcase,
  Certificate,
  Gift,
};

const benefits = campusBenefitsData.map(benefit => ({
  ...benefit,
  icon: iconMap[benefit.icon as keyof typeof iconMap]
}));

export default function CampusAmbassadorSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.3 },
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
      id="campus" 
      ref={ref} 
      className="relative py-12 sm:py-16 md:py-20 lg:py-32"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container relative z-10 px-4 sm:px-6 md:px-8 md:px-16 lg:px-20"
      >
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-12 gap-8 lg:gap-0">
          <motion.div variants={itemVariants}>
            <p className="text-lg text-gray-500 font-semibold">CAMPUS AMBASSADOR</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-4">
              Join the tribe,
              <br />
              lead the journey
            </h2>
          </motion.div>
        </div>

        <motion.div 
          variants={itemVariants}
          className="bg-gradient-to-br from-yellow-400/10 to-yellow-500/10 backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-white/20 shadow-lg"
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {benefits.map((benefit, index) => (
              <motion.div 
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
                style={{ backgroundColor: '#FDBE00' }}
                className="rounded-xl p-6 shadow-lg text-center text-black"
              >
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/30 flex items-center justify-center border border-white/40">
                    <benefit.icon className="w-8 h-8 text-black" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-1">{benefit.title}</h3>
                <p className="text-black/70 text-sm">{benefit.description}</p>
              </motion.div>
            ))}
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
            <Button
              asChild
              size="lg"
              className="bg-yellow-400 text-black font-bold hover:bg-yellow-500 transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto"
            >
              <Link
                href="https://chat.whatsapp.com/LSCvkKHKeVj0tighxr2C4m"
                target="_blank"
              >
                Join WhatsApp Group
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="bg-transparent border-black/50 text-black hover:bg-black/10 hover:text-black transition-all duration-300 w-full sm:w-auto"
            >
              <Link href="https://www.instagram.com/alltripp_/" target="_blank">
                Follow on Instagram
              </Link>
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
