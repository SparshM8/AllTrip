"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Award, Briefcase, BadgeIcon as Certificate, Gift, Users, Target, Star, Zap } from "lucide-react";
import Link from "next/link";
import campusBenefitsData from "@/data/campus-benefits.json";

// Icon mapping for dynamic icon selection
const iconMap = {
  Award,
  Briefcase,
  Certificate,
  Gift,
};

// Additional icons for enhanced design
const additionalIcons = [Users, Target, Star, Zap];

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
      className="relative py-20 bg-gradient-to-br from-gray-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-yellow-900/10"
    >
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-10 left-10 w-20 h-20 border-2 border-yellow-400 rounded-full"></div>
        <div className="absolute top-32 right-16 w-16 h-16 border-2 border-yellow-400 rounded-full"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 border-2 border-yellow-400 rounded-full"></div>
        <div className="absolute bottom-32 right-1/3 w-14 h-14 border-2 border-yellow-400 rounded-full"></div>
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container relative z-10 px-4 sm:px-6 md:px-16 lg:px-20"
      >
        {/* Header Section */}
        <div className="text-center mb-16">
          <motion.div variants={itemVariants} className="inline-block">
            <span className="inline-flex items-center px-4 py-2 rounded-full bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200 text-sm font-medium mb-4">
              <Star className="w-4 h-4 mr-2" />
              CAMPUS AMBASSADOR PROGRAM
            </span>
          </motion.div>

          <motion.h2
            variants={itemVariants}
            className="text-3xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 dark:text-white tracking-tighter mb-6"
          >
            Join the tribe,
            <br />
            <span className="text-yellow-500">lead the journey</span>
          </motion.h2>

          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed"
          >
            Become a campus ambassador and turn your passion for travel into an exciting opportunity.
            Connect with fellow travelers, earn rewards, and make a difference in your community.
          </motion.p>
        </div>

        {/* Stats Section */}
        <motion.div
          variants={itemVariants}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-16"
        >
          {[
            { number: "500+", label: "Active Ambassadors" },
            { number: "50+", label: "Partner Colleges" },
            { number: "1000+", label: "Trips Organized" },
            { number: "4.8★", label: "Average Rating" }
          ].map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-2xl md:text-3xl font-bold text-yellow-500 mb-1">{stat.number}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </div>
          ))}
        </motion.div>

        {/* Benefits Grid */}
        <motion.div
          variants={itemVariants}
          className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-xl rounded-3xl p-6 md:p-12 border border-white/50 dark:border-gray-700/50 shadow-2xl mb-12"
        >
          <div className="text-center mb-10">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Why Join Our Program?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Unlock exclusive benefits and opportunities designed for campus leaders
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05, y: -5 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-gradient-to-br from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 rounded-2xl p-6 shadow-lg text-black dark:text-black hover:shadow-2xl transition-all duration-300"
              >
                {/* Icon with background */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full bg-white/30 dark:bg-black/20 flex items-center justify-center border border-white/40 dark:border-black/30 group-hover:scale-110 transition-transform duration-300">
                    <benefit.icon className="w-8 h-8 text-black dark:text-black" strokeWidth={1.5} />
                  </div>
                </div>

                <h3 className="text-lg font-bold mb-2 text-center">{benefit.title}</h3>
                <p className="text-black/80 dark:text-black/90 text-sm text-center leading-relaxed">{benefit.description}</p>

                {/* Decorative element */}
                <div className="absolute -top-2 -right-2 w-4 h-4 bg-white/20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Call to Action Section */}
        <motion.div
          variants={itemVariants}
          className="text-center"
        >
          <div className="bg-gradient-to-r from-yellow-400 to-yellow-500 dark:from-yellow-500 dark:to-yellow-600 rounded-3xl p-8 md:p-12 text-black shadow-2xl">
            <h3 className="text-2xl md:text-3xl font-bold mb-4">
              Ready to Start Your Journey?
            </h3>
            <p className="text-lg mb-8 opacity-90">
              Join thousands of students who are already part of our ambassador community
            </p>

            <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
              <Button
                asChild
                size="lg"
                className="bg-black text-white hover:bg-gray-800 transition-all duration-300 transform hover:scale-105 shadow-lg w-full sm:w-auto px-8 py-4 text-lg font-semibold"
              >
                <Link
                  href="https://chat.whatsapp.com/LSCvkKHKeVj0tighxr2C4m"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <Users className="w-5 h-5" />
                  Join WhatsApp Group
                </Link>
              </Button>

              <Button
                asChild
                size="lg"
                variant="outline"
                className="bg-transparent border-2 border-black text-black hover:bg-black hover:text-white transition-all duration-300 w-full sm:w-auto px-8 py-4 text-lg font-semibold"
              >
                <Link
                  href="https://www.instagram.com/alltripp_/"
                  target="_blank"
                  className="flex items-center gap-2"
                >
                  <Target className="w-5 h-5" />
                  Follow on Instagram
                </Link>
              </Button>
            </div>

            <p className="text-sm mt-6 opacity-75">
              No prior experience required • Flexible commitment • Instant approval
            </p>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
