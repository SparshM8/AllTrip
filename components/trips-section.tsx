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
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

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

  const checkScrollButtons = () => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setCanScrollLeft(scrollLeft > 10); // Small threshold to account for floating point precision
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.clientWidth || 320;
      carouselRef.current.scrollBy({ left: -cardWidth, behavior: 'smooth' });
      // Check buttons after a short delay to ensure scroll has completed
      setTimeout(checkScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.clientWidth || 320;
      carouselRef.current.scrollBy({ left: cardWidth, behavior: 'smooth' });
      // Check buttons after a short delay to ensure scroll has completed
      setTimeout(checkScrollButtons, 300);
    }
  };

  // Touch handlers for mobile swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;

    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe && canScrollRight) {
      scrollRight();
    }
    if (isRightSwipe && canScrollLeft) {
      scrollLeft();
    }
  };

  useEffect(() => {
    const carousel = carouselRef.current;
    if (carousel) {
      // Initial check
      checkScrollButtons();
      // Add scroll event listener
      carousel.addEventListener('scroll', checkScrollButtons);
      return () => carousel.removeEventListener('scroll', checkScrollButtons);
    }
  }, []);


  return (
    <section
      id="itineraries"
      ref={ref}
      className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300"
    >
      <div className="container mx-auto px-6 md:px-16 lg:px-20">
        {/* Section Header */}
        <motion.div
            initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
              className="text-left mb-10"
            >
              <div className="flex flex-col space-y-4">
                <h2 className="text-5xl md:text-5xl font-extrabold text-black dark:text-white tracking-tighter uppercase">
                  ITINERARIES
                </h2>

                {/* Subtitle and Navigation Buttons - Same Line */}
                <div className="flex items-center justify-between">
                  <p className="text-lg md:text-xl text-black dark:text-gray-300">
                    That Beckon Every Traveller
                  </p>

                  {/* Navigation Buttons - Parallel to Subtitle */}
                  <div className="flex items-center space-x-3 ml-6">
                    <Button
                      onClick={scrollLeft}
                      disabled={!canScrollLeft}
                      className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200 dark:border-gray-600"
                      variant="outline"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </Button>
                    <Button
                      onClick={scrollRight}
                      disabled={!canScrollRight}
                      className="w-12 h-12 rounded-full bg-white dark:bg-gray-800 shadow-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200 dark:border-gray-600"
                      variant="outline"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="relative">
              {/* Cards Container */}
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
                  className="flex space-x-4 overflow-x-auto snap-x snap-mandatory py-4 px-4 md:px-24 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {itineraries.map((itinerary, idx) => (
                    <motion.div
                      key={idx}
                      className="snap-start flex-shrink-0 w-full md:w-[300px] lg:w-[320px]"
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
                      <div className="group bg-white dark:bg-slate-800 rounded-xl shadow-md dark:shadow-slate-700 hover:shadow-lg dark:hover:shadow-slate-600 transition-all duration-300 overflow-hidden border border-gray-100 dark:border-slate-700">
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
                            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-700/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-600 transition-all duration-300 flex items-center justify-center shadow-sm dark:shadow-slate-900"
                          >
                            <Heart
                              size={16}
                              className={`${likedTrips.has(idx) ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-400'} transition-colors duration-300`}
                            />
                          </button>

                          {/* Carousel Dots - Bottom Center */}
                          <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-1.5">
                            {[...Array(3)].map((_, dotIdx) => (
                              <div
                                key={dotIdx}
                                className={`w-1.5 h-1.5 rounded-full ${dotIdx === 0 ? 'bg-white dark:bg-gray-300' : 'bg-white/60 dark:bg-gray-400/60'}`}
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
                          <div className="flex items-center justify-between text-xs text-gray-600 dark:text-gray-300 w-full">
                            <div className="flex items-center space-x-1">
                              <Calendar size={16} className="text-black dark:text-white" />
                              <span className="font-medium">{itinerary.duration}</span>
                            </div>
                            <Button
                              asChild
                              className="bg-[#FDBE00] dark:bg-[#FDBE00] text-black dark:text-black hover:bg-[#FDBE00]/90 dark:hover:bg-[#FDBE00]/90 px-5 py-2 rounded-lg text-sm font-medium transition-all duration-300 shadow-sm dark:shadow-slate-900"
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
          </div>
    </section>
  );
}
