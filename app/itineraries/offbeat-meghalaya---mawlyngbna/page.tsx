"use client";

import { useRef } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  MapPin,
  Calendar,
  Users,
  Star,
  Clock,
  Mountain,
  Camera,
  Utensils,
  Bed,
  ChevronRight,
  Phone,
  Waves,
  TreePine,
} from "lucide-react";
import itineraryData from "@/data/itinerary-mawlyngbna.json";

export default function OffbeatMeghalayaMawlyngbnaPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const { dayWiseItinerary, recommendedStays, budgetBreakdown, packageIncludes } = itineraryData;

  return (
    <div ref={ref} className="min-h-screen bg-gradient-to-br from-slate-50 to-white dark:from-gray-900 dark:to-gray-800">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">        <Image
          src="/Itenaries/Mawlyngbna.jpg"
          alt="Mawlyngbna Village, Meghalaya"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />

        <div className="absolute inset-0 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8 }}
            className="text-center text-white px-6"
          >
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Offbeat Meghalaya
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              Mawlyngbna - Nature & Adventure
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Calendar className="mr-2" size={18} />
                <span>2N/3D</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="mr-2" size={18} />
                <span>2-6 People</span>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-6 py-16">
        {/* Package Overview */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-16"
        >
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900 dark:text-white">
                Nature, Waterfalls & Zero Crowds
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                Escape to Mawlyngbna, a hidden gem in Meghalaya perfect for nature lovers seeking peace and adventure.
                Experience pristine waterfalls, kayaking in crystal-clear reservoirs, unique fossil parks, and
                comfortable eco-homestays away from tourist crowds.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Waves className="mr-2 text-blue-600" size={16} />
                  <span>Kayaking</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Mountain className="mr-2 text-green-600" size={16} />
                  <span>Waterfalls</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <TreePine className="mr-2 text-green-700" size={16} />
                  <span>Fossil Park</span>
                </div>
                <div className="flex items-center text-gray-600 dark:text-gray-300">
                  <Camera className="mr-2 text-purple-600" size={16} />
                  <span>Photography</span>
                </div>
              </div>
            </div>

            <div className="relative">
              <Card className="p-6 bg-gradient-to-br from-blue-50 to-green-50 dark:from-gray-800 dark:to-gray-700 border-0 shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    ₹8,000 <span className="text-lg text-gray-500 dark:text-gray-400 line-through">₹10,000</span>
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Per Person (2N/3D)</p>                  <a
                    href="https://wa.me/919266602470?text=Hi%20AllTripp%2C%20I'm%20interested%20in%20the%20Offbeat%20Meghalaya%20Mawlyngbna%20package.%20Please%20share%20availability%20and%20booking%20details."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white font-semibold py-3 rounded-xl inline-flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <Phone size={18} />
                    Book Now via WhatsApp
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </motion.section>

        {/* Day-wise Itinerary */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Detailed Itinerary
          </h2>

          <div className="space-y-8">
            {dayWiseItinerary.map((day, index) => (
              <Card key={index} className="overflow-hidden shadow-lg border-0 bg-white dark:bg-gray-800">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {day.day}
                      </div>
                    </div>

                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                        Day {day.day}: {day.title}
                      </h3>

                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Timeline:</h4>
                          <div className="space-y-3">
                            {day.timeline.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Clock className="text-blue-500 mt-1" size={16} />
                                <div>
                                  <span className="font-medium text-gray-900 dark:text-white">{item.time}:</span>
                                  <span className="text-gray-600 dark:text-gray-300 ml-2">{item.activity}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>

                        <div>
                          <h4 className="font-semibold text-gray-900 dark:text-white mb-3">Highlights:</h4>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {day.highlights.map((highlight, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 text-sm rounded-full"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>

                          <div className="space-y-2 text-sm text-gray-600 dark:text-gray-300">
                            <div><strong>Stay:</strong> {day.stay}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Budget & Stays Info */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-2 gap-8 mb-16"
        >
          <Card className="p-6 border-0 shadow-lg bg-white dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Budget Breakdown</h3>
            <div className="space-y-3">
              {budgetBreakdown.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600 dark:text-gray-300">{item.item}</span>
                  <span className={`font-semibold ${item.item === 'Total' ? 'text-green-600 text-lg' : 'text-gray-900 dark:text-white'}`}>
                    {item.cost}
                  </span>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg bg-white dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Recommended Homestays</h3>
            <ul className="space-y-3">
              {recommendedStays.map((stay, index) => (
                <li key={index} className="flex items-start gap-3">
                  <Bed className="text-blue-500 mt-0.5" size={16} />
                  <span className="text-gray-600 dark:text-gray-300">{stay}</span>
                </li>
              ))}
            </ul>
          </Card>
        </motion.section>

        {/* Package Includes */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <Card className="p-6 border-0 shadow-lg bg-white dark:bg-gray-800">
            <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white">Package Includes</h3>
            <div className="grid md:grid-cols-2 gap-4">
              {packageIncludes.map((item, index) => (
                <div key={index} className="flex items-start gap-3">
                  <ChevronRight className="text-green-500 mt-0.5" size={16} />
                  <span className="text-gray-600 dark:text-gray-300">{item}</span>
                </div>
              ))}
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
