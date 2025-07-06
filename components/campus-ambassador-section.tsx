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
      className="relative py-20 md:py-32"
    >
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container relative z-10 px-4 md:px-6"
      >
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h2 className="text-5xl md:text-7xl font-extrabold text-black tracking-tighter uppercase">
            Campus Ambassador
          </h2>
          <div className="flex items-center justify-center mt-4">
            <div className="w-16 h-px bg-black"></div>
            <p className="text-lg md:text-xl text-black mx-4">
              Join the tribe, lead the journey
            </p>
            <div className="w-16 h-px bg-black"></div>
          </div>
        </motion.div>

        <motion.div 
          variants={itemVariants}
          className="max-w-5xl mx-auto bg-gradient-to-br from-[#fdbe00] to-[#b8860b] backdrop-blur-xl rounded-2xl p-8 md:p-12 border border-[#ddb400] shadow-2xl"
        >
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-12">
            {benefits.map((benefit, index) => (
              <div key={index} className="bg-white/20 backdrop-blur-sm rounded-xl p-6 shadow-lg text-center text-black">
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/20 flex items-center justify-center border border-white/30">
                    <benefit.icon className="w-8 h-8 text-black" strokeWidth={1.5} />
                  </div>
                </div>
                <h3 className="text-lg font-semibold mb-1">{benefit.title}</h3>
                <p className="text-black/70 text-sm">{benefit.description}</p>
              </div>
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
