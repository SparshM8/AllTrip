"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, Rocket, LineChart } from "lucide-react";
import aboutData from "@/data/about-data.json";

const iconMap = {
  Users,
  Rocket,
  LineChart,
};

interface Feature {
  icon: keyof typeof iconMap;
  title: string;
  text: string;
}

export default function AboutSection() {
  const features: Feature[] = aboutData.features as Feature[];

  return (
    <section id="about" className="py-20 md:py-28 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, amount: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800">
            Why AllTrip
          </h2>
          <p className="text-lg text-gray-600 mt-4 max-w-2xl mx-auto">
            We are a team of passionate travelers dedicated to creating
            unforgettable journeys.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {features.map((feature, index) => {
            const Icon = iconMap[feature.icon];
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
                className="card text-center max-w-sm p-8 bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow duration-300"
              >
                <div className="card-icon flex justify-center items-center mb-4">
                  <Icon className="w-16 h-16 text-gray-800" />
                </div>
                <h3 className="card-title text-2xl font-bold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="card-text text-gray-600 leading-relaxed">
                  {feature.text}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
