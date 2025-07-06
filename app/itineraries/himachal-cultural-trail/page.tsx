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
  Palette,
  Coffee,
  Car,
  Plane,
} from "lucide-react";
import itineraryData from "@/data/itinerary-himachal-cultural-trail.json";

export default function HimachalCulturalTrailPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const { 
    dayWiseItinerary, 
    stayOptions, 
    howToReach, 
    budgetEstimate, 
    culturalExperiences 
  } = itineraryData;

  return (
    <div ref={ref} className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}      <section className="relative h-[70vh] overflow-hidden">        <Image
          src="/Itenaries/Himachal Cultural.jpg"
          alt="Himachal Cultural Trail - Bir, Andretta & Palampur"
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
              Himachal Cultural Trail
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              Bir, Andretta & Palampur - Art, Tea & Monasteries
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Calendar className="mr-2" size={18} />
                <span>2N/3D</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="mr-2" size={18} />
                <span>2-8 People</span>
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
              <h2 className="text-3xl font-bold mb-6 text-gray-900">
                Art, Culture & Spiritual Experiences
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                This 2-night, 3-day trip explores lesser-known but culturally rich locations around Dharamshala and Palampur. 
                Perfect for travelers looking for peace, authentic local experiences, and an escape from the usual tourist circuit. 
                Discover art villages, tea culture, and Buddhist monasteries.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <Palette className="mr-2 text-purple-600" size={16} />
                  <span>Art Workshops</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Coffee className="mr-2 text-green-600" size={16} />
                  <span>Tea Gardens</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mountain className="mr-2 text-blue-600" size={16} />
                  <span>Monastery Visits</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Camera className="mr-2 text-orange-600" size={16} />
                  <span>Cultural Photography</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-0 shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    ₹8,000 <span className="text-lg text-gray-500 line-through">₹10,000</span>
                  </div>
                  <p className="text-gray-600 mb-4">Per Person (2N/3D)</p>                  <a
                    href="https://wa.me/919266602470?text=Hi%20AllTripp%2C%20I'm%20interested%20in%20the%20Himachal%20Cultural%20Trail%20package.%20Please%20share%20availability%20and%20booking%20details."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-semibold py-3 rounded-xl inline-flex items-center justify-center gap-2 transition-all duration-300"
                  >
                    <Phone size={18} />
                    Book Now via WhatsApp
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </motion.section>

        {/* How to Reach */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            How to Reach from Delhi
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {howToReach.map((option, index) => (
              <Card key={index} className="p-6 border-0 shadow-lg text-center">
                <div className="mb-4">
                  {option.method === "Volvo Bus" && <Car className="mx-auto text-blue-500" size={32} />}
                  {option.method === "Flight" && <Plane className="mx-auto text-purple-500" size={32} />}
                  {option.method === "Car" && <Car className="mx-auto text-green-500" size={32} />}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{option.method}</h3>
                <p className="text-gray-600 text-sm">{option.details}</p>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Cultural Experiences */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mb-16"
        >
          <h2 className="text-2xl font-bold text-center mb-8 text-gray-900">
            Cultural Experiences
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {culturalExperiences.map((experience, index) => (
              <Card key={index} className="p-4 border-0 shadow-lg">
                <div className="flex items-start gap-3">
                  <Palette className="text-purple-500 mt-1" size={16} />
                  <span className="text-gray-700 text-sm">{experience}</span>
                </div>
              </Card>
            ))}
          </div>
        </motion.section>

        {/* Day-wise Itinerary */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mb-16"
        >
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Detailed Itinerary
          </h2>
          
          <div className="space-y-8">
            {dayWiseItinerary.map((day, index) => (
              <Card key={index} className="overflow-hidden shadow-lg border-0">
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
                        {day.day}
                      </div>
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4">
                        Day {day.day}: {day.title}
                      </h3>
                      
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Timeline:</h4>
                          <div className="space-y-3">
                            {day.timeline.map((item, idx) => (
                              <div key={idx} className="flex items-start gap-3">
                                <Clock className="text-purple-500 mt-1" size={16} />
                                <div>
                                  <span className="font-medium text-gray-900">{item.time}:</span>
                                  <span className="text-gray-600 ml-2">{item.activity}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold text-gray-900 mb-3">Highlights:</h4>
                          <div className="flex flex-wrap gap-2 mb-4">
                            {day.highlights.map((highlight, idx) => (
                              <span
                                key={idx}
                                className="px-3 py-1 bg-purple-100 text-purple-800 text-sm rounded-full"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-600">
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

        {/* Stay Options & Budget */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="grid md:grid-cols-2 gap-8"
        >
          <Card className="p-6 border-0 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Stay Suggestions</h3>
            <div className="space-y-4">
              {stayOptions.map((stay, index) => (
                <div key={index} className="border-b border-gray-200 pb-3 last:border-b-0">
                  <h4 className="font-semibold text-gray-900">{stay.name}</h4>
                  <p className="text-gray-600 text-sm">{stay.type}</p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6 border-0 shadow-lg">
            <h3 className="text-xl font-bold mb-4 text-gray-900">Estimated Budget (Per Person)</h3>
            <div className="space-y-3">
              {budgetEstimate.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <span className="text-gray-600">{item.item}</span>
                  <span className={`font-semibold ${item.item === 'Total' ? 'text-purple-600 text-lg' : 'text-gray-900'}`}>
                    {item.cost}
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </motion.section>
      </div>
    </div>
  );
}
