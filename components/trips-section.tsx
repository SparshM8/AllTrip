"use client";

import { useRef, useState, useEffect } from "react";
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

// Hardcoded image mapping for itineraries
const itineraryImages: { [key: string]: string } = {
  "Offbeat Meghalaya - Kongthong": "/Itenaries/Meghalaya.jpg",
  "Offbeat Meghalaya - Mawlyngbna": "/Itenaries/Mawlyngbna.jpg",
  "Jibhi & Shoja Offbeat": "/Itenaries/Jibhi.jpg",
  "Himachal Cultural Trail": "/Itenaries/Himachal Cultural.jpg",
};

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
  const [scrollY, setScrollY] = useState(0);

  // Track scroll position for parallax effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
    <section 
      id="itineraries" 
      ref={ref} 
      className="relative py-20 overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: "url('/background_itenary1.png')" }}
    >
      {/* Content with slide-up animation */}
      <motion.div 
        className="relative z-10 container px-4 md:px-6"
        initial={{ y: 100, opacity: 0 }}
        animate={isInView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 1, ease: "easeOut" }}
      >
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-5xl md:text-7xl font-extrabold text-black tracking-tighter uppercase">
              ITINERARIES
            </h2>
            <div className="flex items-center justify-center mt-4">
                <div className="w-16 h-px bg-gray-400"></div>
                <p className="text-lg md:text-xl text-gray-600 mx-4">
                    that beckon every traveller
                </p>
                <div className="w-16 h-px bg-gray-400"></div>
            </div>
          </motion.div>
        </div>

        <div className="relative">
          {/* Left Navigation Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollPrev}
            className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border-2 border-[#FDBE00] bg-[#FDBE00] text-black hover:bg-[#FDBE00]/90 transition-all duration-300 shadow-lg -ml-16"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          {/* Right Navigation Button */}
          <Button
            variant="outline"
            size="icon"
            onClick={scrollNext}
            className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 rounded-full border-2 border-[#FDBE00] bg-[#FDBE00] text-black hover:bg-[#FDBE00]/90 transition-all duration-300 shadow-lg -mr-16"
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
                className="snap-start flex-shrink-0 w-full sm:w-[300px] lg:w-[320px]"
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
                {/* Clean Compact Card Design */}
                <div className="group bg-white dark:bg-slate-800 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 overflow-hidden">
                  {/* Image Section with Carousel Dots and Heart */}
                  <div className="relative h-56 w-full overflow-hidden">
                    <Image
                      src={itineraryImages[itinerary.title] || "/Itenaries/default.jpg"}
                      alt={itinerary.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      loading="lazy"
                    />
                    
                    {/* Heart/Like Icon - Top Right */}
                    <button
                      onClick={() => toggleLike(idx)}
                      className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 backdrop-blur-sm hover:bg-white transition-all duration-300 flex items-center justify-center shadow-sm"
                    >
                      <Heart 
                        size={16} 
                        className={`${likedTrips.has(idx) ? 'fill-red-500 text-red-500' : 'text-gray-600'} transition-colors duration-300`}
                      />
                    </button>

                    {/* Carousel Dots - Bottom Center */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
                      {[...Array(3)].map((_, dotIdx) => (
                        <div
                          key={dotIdx}
                          className={`w-1.5 h-1.5 rounded-full ${dotIdx === 0 ? 'bg-white' : 'bg-white/60'}`}
                        />
                      ))}
                    </div>
                  </div>

                  {/* Content Section */}
                  <div className="p-4 space-y-3">
                    {/* Title Row */}
                    <div className="flex items-start justify-between">
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-gray-900 dark:text-white truncate text-base leading-tight">
                          {itinerary.title}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate mt-0.5">
                          {itinerary.location}
                        </p>
                      </div>
                    </div>

                    {/* Features Row */}
                    <div className="flex items-center text-xs text-gray-600 dark:text-gray-300">
                      <div className="flex items-center space-x-1">
                        <Calendar size={16} className="text-black dark:text-white" />
                        <span className="font-medium">{itinerary.duration}</span>
                      </div>
                    </div>

                    {/* Price and View Details Button */}
                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <span className="text-lg font-bold text-gray-900 dark:text-white">
                          ₹{itinerary.price.toLocaleString()}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                          per person
                        </span>
                      </div>
                      <Button
                        asChild
                        className="bg-[#FDBE00] text-black hover:bg-[#FDBE00]/90 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm"
                      >
                        <a href={`/itineraries/${getItinerarySlug(itinerary.title)}`}>
                          View Details
                        </a>
                      </Button>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.div>
    </section>
  );
}
