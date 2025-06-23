"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ChevronLeft,
  ChevronRight,
  Star,
  MapPin,
  Users,
  Calendar,
  Heart,
  Wifi,
  Car,
  Camera,
} from "lucide-react";
import itinerariesData from "@/data/itineraries.json";

// Helper function to map itinerary titles to their correct folder slugs
const getItinerarySlug = (title: string): string => {
  const slugMap: Record<string, string> = {
    "Offbeat Meghalaya - Kongthong": "offbeat-meghalaya---kongthong",
    "Offbeat Meghalaya - Mawlyngbna": "offbeat-meghalaya---mawlyngbna", 
    "Jibhi & Shoja Offbeat": "jibhi---shoja-offbeat",
    "Himachal Cultural Trail": "himachal-cultural-trail"
  };
  
  return slugMap[title] || title.toLowerCase().replace(/[^a-z0-9]+/g, '-');
};

type Trip = {
  title: string;
  description: string;
  image: string;
  duration: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviews: number;
  location: string;
  groupSize: string;
  features: string[];
  bestTime: string;
};

const itineraries: Trip[] = itinerariesData;

export default function ItinerariesSection() {
  const ref = useRef(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [likedTrips, setLikedTrips] = useState<Set<number>>(new Set());

  const toggleLike = (idx: number) => {
    setLikedTrips(prev => {
      const newSet = new Set(prev);
      if (newSet.has(idx)) {
        newSet.delete(idx);
      } else {
        newSet.add(idx);
      }
      return newSet;
    });
  };

  const scrollNext = () => {
    carouselRef.current?.scrollBy({
      left: carouselRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  const scrollPrev = () => {
    carouselRef.current?.scrollBy({
      left: -carouselRef.current.clientWidth,
      behavior: "smooth",
    });
  };

  return (
    <section id="itineraries" ref={ref} className="py-20 bg-gradient-to-br from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <div className="container px-4 md:px-6">
        <div className="text-center mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-yellow-500 to-orange-500 bg-clip-text text-transparent mb-4">
               ITINERARIES
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover India's hidden gems with our carefully crafted offbeat travel experiences
            </p>
          </motion.div>
        </div>

        <div className="relative">
          {/* Left Navigation Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border-2 border-yellow-500 bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-300 shadow-lg -ml-16"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Right Navigation Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border-2 border-yellow-500 bg-yellow-500 text-white hover:bg-yellow-600 transition-all duration-300 shadow-lg -mr-16"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>

          <motion.div
            className="overflow-hidden"
            initial={{ opacity: 0 }}
            animate={
              isInView
                ? { opacity: 1, transition: { duration: 0.7, ease: "easeInOut" } }
                : {}
            }
          >

          <div
            ref={carouselRef}
            className="flex space-x-4 overflow-x-auto snap-x snap-mandatory py-4 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
          >
            {itineraries.map((itinerary, idx) => (
              <motion.div
                key={idx}
                className="snap-start flex-shrink-0 w-full sm:w-[400px] lg:w-[420px]"
                initial={{ y: 50, opacity: 0 }}
                animate={
                  isInView
                    ? {
                        y: 0,
                        opacity: 1,
                        transition: {
                          delay: idx * 0.15,
                          duration: 0.8,
                          ease: "easeInOut",
                        },
                      }
                    : {}
                }
                onMouseEnter={() => setHoveredCard(idx)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <Card className="group h-full bg-white dark:bg-slate-800 border-0 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden rounded-2xl">
                  {/* Extended Image Section with Overlay Content */}
                  <div className="relative h-[550px] w-full overflow-hidden">
                    <Image
                      src={itinerary.image}
                      alt={itinerary.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-700"
                      loading="lazy"
                    />
                    
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                    
                    {/* Heart/Like Button */}
                    <button
                      onClick={() => toggleLike(idx)}
                      className="absolute top-4 right-4 p-2 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 transition-all duration-300"
                    >
                      <Heart 
                        size={20} 
                        className={`${likedTrips.has(idx) ? 'fill-red-500 text-red-500' : 'text-white'} transition-colors duration-300`}
                      />
                    </button>

                    {/* Price Badge */}
                    <div className="absolute top-4 left-4">
                      <div className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white px-4 py-2 rounded-full text-sm font-semibold">
                        {itinerary.originalPrice && (
                          <span className="line-through text-white/80 mr-2">₹{itinerary.originalPrice.toLocaleString()}</span>
                        )}
                        ₹{itinerary.price.toLocaleString()}
                      </div>
                    </div>

                    {/* Content Overlay - Positioned at Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-4">
                      <div className="bg-black/5 backdrop-blur-sm rounded-2xl p-4 border border-white/10 space-y-3">
                        {/* Title and Location */}
                        <div>
                          <h3 className="text-lg font-bold text-white mb-1 group-hover:text-yellow-400 transition-colors duration-300 line-clamp-1">
                            {itinerary.title}
                          </h3>
                          <div className="flex items-center text-white/90 text-sm mb-2">
                            <MapPin size={14} className="mr-1 text-red-400" />
                            <span className="line-clamp-1">{itinerary.location}</span>
                          </div>
                          <p className="text-white/80 text-sm line-clamp-2 mb-3">
                            {itinerary.description}
                          </p>
                        </div>

                        {/* Trip Details */}
                        <div className="grid grid-cols-2 gap-3 text-sm mb-3">
                          <div className="flex items-center text-white/90">
                            <Calendar size={12} className="mr-1 text-blue-400" />
                            <span className="text-xs">{itinerary.duration}</span>
                          </div>
                          <div className="flex items-center text-white/90">
                            <Users size={12} className="mr-1 text-green-400" />
                            <span className="text-xs">{itinerary.groupSize}</span>
                          </div>
                        </div>

                        {/* Features */}
                        <div className="flex flex-wrap gap-1 mb-3">
                          {itinerary.features.slice(0, 3).map((feature, featureIdx) => (
                            <span
                              key={featureIdx}
                              className="px-2 py-1 bg-white/20 backdrop-blur-sm text-white text-xs rounded-full"
                            >
                              {feature}
                            </span>
                          ))}
                        </div>

                        {/* Reserve Button */}
                        <Button
                          className="w-full bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600 text-white font-semibold py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
                          asChild
                        >
                          <a
                            href={`/itineraries/${getItinerarySlug(itinerary.title)}`}
                          >
                            View Details
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
    </section>
  );
}
