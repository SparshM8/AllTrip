"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { getBlurData } from "@/lib/blur-data";
import { motion, useInView } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";
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
      const gap = 16; // space-x-4 = 1rem = 16px
      carouselRef.current.scrollBy({ left: -(cardWidth + gap), behavior: 'smooth' });
      // Check buttons after a short delay to ensure scroll has completed
      setTimeout(checkScrollButtons, 300);
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const cardWidth = carouselRef.current.children[0]?.clientWidth || 320;
      const gap = 16; // space-x-4 = 1rem = 16px
      carouselRef.current.scrollBy({ left: cardWidth + gap, behavior: 'smooth' });
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
  className="py-20 bg-white dark:bg-[hsl(var(--surface-base))] transition-colors duration-300"
    >
      <div className="container mx-auto px-6 md:px-16 lg:px-20">
        {/* Section Header */}
        <motion.div
            variants={fadeInUp}
            initial="initial"
            animate={isInView ? "animate" : "initial"}
              className="text-left mb-10"
            >
              <div className="flex flex-col space-y-4">
                <h2 className="text-5xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tighter uppercase">
                  ITINERARIES
                </h2>

                {/* Subtitle and Navigation Buttons - Same Line */}
                <div className="flex items-center justify-between">
                  <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300">
                    That Beckon Every Traveller
                  </p>

                  {/* Navigation Buttons - Parallel to Subtitle */}
                  <div className="flex items-center space-x-3 ml-6">
                    <Button
                      onClick={scrollLeft}
                      disabled={!canScrollLeft}
                      className="focusable w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200 dark:border-slate-700"
                      variant="outline"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                    </Button>
                    <Button
                      onClick={scrollRight}
                      disabled={!canScrollRight}
                      className="focusable w-12 h-12 rounded-full bg-white dark:bg-slate-800 shadow-lg hover:bg-gray-50 dark:hover:bg-slate-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 border border-gray-200 dark:border-slate-700"
                      variant="outline"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-700 dark:text-gray-200" />
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
            <div className="relative">
              {/* Cards Container */}
              <motion.div
                className="overflow-hidden"
                variants={staggerContainer(0.05,0.12)}
                initial="initial"
                animate={isInView ? "animate" : "initial"}
              >
                <div
                  ref={carouselRef}
                  className="flex space-x-4 overflow-x-auto snap-x snap-mandatory py-4 px-2 md:px-8 lg:px-12 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
                  onTouchStart={handleTouchStart}
                  onTouchMove={handleTouchMove}
                  onTouchEnd={handleTouchEnd}
                >
                  {itineraries.map((itinerary, idx) => (
                    <motion.div
                      key={idx}
                      className="snap-start flex-shrink-0 w-full sm:w-80 md:w-80 lg:w-80 xl:w-96"
                      variants={fadeInUp}
                      onMouseEnter={() => setHoveredCard(idx)}
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      {/* Dark modern compact card */}
                      <div className="group card-modern rounded-xl overflow-hidden">
                        {/* Image Section with Carousel Dots and Heart */}
                        <div className="relative h-56 w-full overflow-hidden">
                          <Image
                            src={itineraryImages[itinerary.title] || "/Itenaries/default.jpg"}
                            alt={itinerary.title}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                            loading="lazy"
                            placeholder="blur"
                            blurDataURL={getBlurData(itineraryImages[itinerary.title] || 'itinerary')}
                          />
                          {/* overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/0 to-black/0" />
                          {/* Heart/Like Icon - Top Right */}
                          <button
                            onClick={() => toggleLike(idx)}
                            className="focusable absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 dark:bg-slate-800/90 backdrop-blur-sm hover:bg-white dark:hover:bg-slate-700 transition-all duration-300 flex items-center justify-center shadow-sm"
                            aria-label={likedTrips.has(idx) ? "Remove from saved" : "Save this trip"}
                            title={likedTrips.has(idx) ? "Remove from saved" : "Save this trip"}
                            type="button"
                          >
                            <Heart
                              size={16}
                              className={`${likedTrips.has(idx) ? 'fill-red-500 text-red-500' : 'text-gray-700 dark:text-gray-200'} transition-colors duration-300`}
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
                              <h3 className="font-semibold text-white truncate text-base leading-tight">
                                {itinerary.title}
                              </h3>
                              <p className="text-sm text-gray-300/80 truncate mt-0.5">
                                {itinerary.location}
                              </p>
                            </div>
                          </div>

                          {/* Features Row */}
                          <div className="flex items-center justify-between text-xs text-gray-200 w-full">
                            <div className="flex items-center space-x-1">
                              <Calendar size={16} className="text-white" />
                              <span className="font-medium">{itinerary.duration}</span>
                            </div>
                            <a
                              href={`/itineraries/${getItinerarySlug(itinerary.title)}`}
                              className="focusable inline-flex items-center px-4 py-2 rounded-md bg-white/10 border border-white/20 text-white font-medium hover:bg-white/15 transition text-sm"
                            >
                              View Details
                            </a>
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
