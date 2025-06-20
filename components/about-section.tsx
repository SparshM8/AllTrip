"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { Star, Users, MapPin, Award, Shield, Heart } from "lucide-react";

export default function AboutSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const stats = [
    { number: "50K+", label: "Happy Travelers", icon: Users },
    { number: "500+", label: "Premium Destinations", icon: MapPin },
  ];

  const features = [
    { icon: Award, label: "Premium Quality" },
    { icon: Shield, label: "Safe & Secure" },
    { icon: Heart, label: "Eco-Friendly" },
  ];

  return (
    <section
      id="about"
      ref={ref}
      className="py-20 bg-gradient-to-br from-blue-50 via-white to-purple-50 overflow-hidden"
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-8"
          >
            {/* Badge */}
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
              Our Story
            </div>

            {/* Main Heading */}
            <div className="space-y-4">
              <h2 className="text-4xl lg:text-5xl font-bold leading-tight">
                <span className="text-green-600">Redefining Travel</span>
                <br />
                <span className="text-blue-600">Standards</span>
              </h2>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                We believe travel is about confidence, authenticity, and celebrating 
                your unique journey. Since our founding, we've curated the finest 
                experiences for every travel style and destination.
              </p>
            </div>

            {/* Statistics */}
            <div className="flex gap-8">
              {stats.map((stat, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                  transition={{ duration: 0.5, delay: 0.4 + index * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-gray-900">{stat.number}</div>
                  <div className="text-sm text-gray-600 mt-1">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right Content - Image with Feature Badges */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative"
          >
            {/* Main Image */}
            <div className="relative rounded-2xl overflow-hidden bg-gray-100 h-[500px]">
              <Image
                src="/about_us_img.png"
                alt="Premium Travel Experience"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
              
              {/* Feature Badges */}
              {features.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  className={`absolute bg-white rounded-xl px-4 py-3 shadow-lg flex items-center gap-2 ${
                    index === 0 ? 'top-6 right-6' :
                    index === 1 ? 'bottom-6 right-6' :
                    'bottom-5 left-6'
                  }`}
                >
                  <div className="w-8 h-8 bg-orange-100 rounded-lg flex items-center justify-center">
                    <feature.icon size={16} className="text-orange-600" />
                  </div>
                  <span className="text-sm font-medium text-gray-800">
                    {feature.label}
                  </span>
                </motion.div>
              ))}

              {/* Additional decorative element */}
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.4, delay: 0.9 }}
                className="absolute top-1/2 right-6 bg-white rounded-full p-3 shadow-lg"
              >
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="text-yellow-400 fill-current"
                    />
                  ))}
                </div>
                <div className="text-xs text-gray-600 mt-1 text-center">5.0 Rating</div>
              </motion.div>
            </div>

            {/* Background decoration */}
            <div className="absolute -top-4 -right-4 w-20 h-20 bg-gradient-to-br from-blue-400 to-purple-500 rounded-full opacity-20 -z-10" />
            <div className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-green-400 to-blue-500 rounded-full opacity-20 -z-10" />
          </motion.div>
        </div>

        {/* Bottom Section - Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="mt-16 text-center"
        >
          <div className="max-w-3xl mx-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">
              Ready to Start Your Indian Adventure?
            </h3>
            <p className="text-gray-600 mb-8">
              Explore our curated travel packages and start planning your dream trip today. 
              From cultural immersion to thrilling adventures, we have something for every traveler.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-colors">
                Explore Packages
              </button>
              <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg font-semibold hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
