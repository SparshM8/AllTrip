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
  TreePine,
  Sunrise,
  Car,
  Plane,
} from "lucide-react";

export default function JibhiShojaOffbeatPage() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  const dayWiseItinerary = [
    {
      day: 1,
      title: "Delhi to Jibhi",
      highlights: ["Arrival in Jibhi", "Riverside stay", "Jibhi Waterfall", "Pine forest walk"],
      timeline: [
        { time: "Morning/Noon", activity: "Arrive in Jibhi" },
        { time: "Check-in", activity: "Check-in to a riverside or treehouse stay" },
        { time: "Afternoon", activity: "Explore Jibhi Waterfall and local cafes" },
        { time: "Evening", activity: "Evening walk in the pine forest and bonfire" },
      ],
      meals: "Lunch, Dinner",
      stay: "Riverside/Treehouse Stay in Jibhi"
    },
    {
      day: 2,
      title: "Shoja and Serolsar Lake Trek",
      highlights: ["Serolsar Lake trek", "Budhi Nagin Temple", "Mountain views", "Moderate trekking"],
      timeline: [
        { time: "Early Morning", activity: "Early drive to Shoja (30 min)" },
        { time: "Morning", activity: "Begin moderate trek to Serolsar Lake (~5 km one way)" },
        { time: "Afternoon", activity: "Visit Budhi Nagin Temple at the lake" },
        { time: "Evening", activity: "Return by evening, relax at your stay" },
      ],
      meals: "Breakfast, Lunch, Dinner",
      stay: "Same Stay in Jibhi"
    },
    {
      day: 3,
      title: "Jalori Pass Viewpoint and Return",
      highlights: ["Sunrise at Jalori Pass", "Meadow exploration", "Return journey"],
      timeline: [
        { time: "Early Morning", activity: "Early morning drive to Jalori Pass for sunrise view" },
        { time: "Morning", activity: "Light hike around the pass and explore the meadows" },
        { time: "Late Morning", activity: "Return to Jibhi, check out and depart to Delhi" },
      ],
      meals: "Breakfast",
      stay: "Departure to Delhi"
    }
  ];

  const stayOptions = [
    { name: "The Hidden Burrow, Jibhi", type: "Treehouse experience" },
    { name: "Raju Bharti's Guest House", type: "Homely and authentic" },
    { name: "Jibhi Heaven", type: "Budget-friendly riverside cottage" }
  ];

  const howToReach = [
    { method: "By Car", details: "10-12 hrs drive via Mandi" },
    { method: "By Bus", details: "Volvo till Aut Tunnel, then local cab to Jibhi (~1 hr)" },
    { method: "Nearest Airport", details: "Bhuntar (~3 hrs by road)" }
  ];

  const budgetEstimate = [
    { item: "Travel (Bus/Car RT)", cost: "₹2,000-3,000" },
    { item: "Stay (2N)", cost: "₹3,000-4,500" },
    { item: "Food & Entry", cost: "₹1,000-1,500" },
    { item: "Extras", cost: "₹500-1,000" },
    { item: "Total", cost: "₹6,500-10,000" }
  ];

  return (
    <div ref={ref} className="min-h-screen bg-gradient-to-br from-slate-50 to-white">
      {/* Hero Section */}
      <section className="relative h-[70vh] overflow-hidden">        <Image
          src="/Itenaries/Jibhi.jpg"
          alt="Jibhi and Shoja, Himachal Pradesh"
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
              Jibhi & Shoja Offbeat
            </h1>
            <p className="text-xl md:text-2xl mb-6">
              Serene Himachal Village Escape
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Calendar className="mr-2" size={18} />
                <span>2N/3D</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Users className="mr-2" size={18} />
                <span>2-10 People</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm rounded-full px-4 py-2">
                <Star className="mr-2 text-yellow-400 fill-yellow-400" size={18} />
                <span>4.7 Rating</span>
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
                Tranquility, Village Life & Nature
              </h2>
              <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                Escape to the serene and less explored parts of Himachal - Jibhi and Shoja. This 2N/3D trip is ideal 
                for travelers seeking tranquility, authentic village life, and pristine nature without the crowds. 
                Experience treehouse stays, hidden waterfalls, and breathtaking mountain treks.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-gray-600">
                  <TreePine className="mr-2 text-green-600" size={16} />
                  <span>Treehouse Stay</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Mountain className="mr-2 text-blue-600" size={16} />
                  <span>Serolsar Lake Trek</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Sunrise className="mr-2 text-orange-600" size={16} />
                  <span>Jalori Pass Sunrise</span>
                </div>
                <div className="flex items-center text-gray-600">
                  <Camera className="mr-2 text-purple-600" size={16} />
                  <span>Pine Forest Walks</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <Card className="p-6 bg-gradient-to-br from-green-50 to-blue-50 border-0 shadow-xl">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900 mb-2">
                    ₹8,500 <span className="text-lg text-gray-500 line-through">₹10,000</span>
                  </div>
                  <p className="text-gray-600 mb-4">Per Person (2N/3D)</p>                  <a
                    href="https://wa.me/919266602470?text=Hi%20AllTripp%2C%20I'm%20interested%20in%20the%20Jibhi%20Shoja%20Offbeat%20package.%20Please%20share%20availability%20and%20booking%20details."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-semibold py-3 rounded-xl inline-flex items-center justify-center gap-2 transition-all duration-300"
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
                  {option.method === "By Car" && <Car className="mx-auto text-blue-500" size={32} />}
                  {option.method === "By Bus" && <Car className="mx-auto text-green-500" size={32} />}
                  {option.method === "Nearest Airport" && <Plane className="mx-auto text-purple-500" size={32} />}
                </div>
                <h3 className="font-bold text-gray-900 mb-2">{option.method}</h3>
                <p className="text-gray-600 text-sm">{option.details}</p>
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
                      <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold text-xl">
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
                                <Clock className="text-green-500 mt-1" size={16} />
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
                                className="px-3 py-1 bg-green-100 text-green-800 text-sm rounded-full"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                          
                          <div className="space-y-2 text-sm text-gray-600">
                            <div><strong>Meals:</strong> {day.meals}</div>
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
                  <span className={`font-semibold ${item.item === 'Total' ? 'text-green-600 text-lg' : 'text-gray-900'}`}>
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
