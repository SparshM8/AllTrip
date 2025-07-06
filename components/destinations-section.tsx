"use client";

import React from "react";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import destinationsData from "@/data/destinations.json";

const destinations = destinationsData;

// Hardcoded image mapping for destinations
const destinationImages: { [key: string]: string } = {
  "Goa": "/destinations/goa.jpg",
  "Rishikesh": "/destinations/kashmir.jpg",
  "Jim Corbett": "/destinations/Uttarakhand.jpg",
  "Amritsar": "/destinations/himachal-pradesh.jpg",
  "Kashmir": "/destinations/kashmir.jpg",
  "Kerala": "/destinations/kerala.jpg",
  "Rajasthan": "/destinations/rajasthan.jpg",
  "Ladakh": "/destinations/Ladakh.jpg",
  "Himachal Pradesh": "/destinations/himachal.jpg",
};

export default function DestinationsSection() {
  const ref = useRef<HTMLElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  // State for cycling through destinations
  const [currentStartIndex, setCurrentStartIndex] = useState(0);
  const destinationsPerPage = 4;
  const [fade, setFade] = useState(false);

  // Auto-rotate destinations every 7 seconds (less frequent)
  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentStartIndex((prevIndex) => {
          const nextIndex = prevIndex + destinationsPerPage;
          return nextIndex >= destinations.length ? 0 : nextIndex;
        });
        setFade(false);
      }, 350); // fade duration
    }, 7000);

    return () => clearInterval(interval);
  }, [isInView]);

  // Get current destinations to display
  const getCurrentDestinations = () => {
    const current = [];
    for (let i = 0; i < destinationsPerPage; i++) {
      const index = (currentStartIndex + i) % destinations.length;
      current.push(destinations[index]);
    }
    return current;
  };

  const currentDestinations = getCurrentDestinations();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  // Memoized card to prevent unnecessary re-renders
  const DestinationCard = React.memo(function DestinationCard({ destination, index, currentStartIndex }: { destination: any, index: number, currentStartIndex: number }) {
    return (
      <div
        key={`${destination.name}-${currentStartIndex}-${index}`}
        className="group relative h-96 rounded-2xl overflow-hidden cursor-pointer transform transition-all duration-500 hover:scale-105 hover:shadow-2xl"
      >
        <div className="absolute inset-0">
          <Image
            src={destinationImages[destination.name] || "/destinations/default.jpg"}
            alt={destination.name}
            fill
            priority={index === 0}
            quality={60}
            className="object-cover object-center transition-transform duration-700 group-hover:scale-110"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute top-4 left-4 z-20">
          <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow-lg">
            {destination.badge}
          </span>
        </div>
        <div className="absolute inset-0 bg-black/30 transition-opacity duration-500 group-hover:opacity-0" />
        <div className="absolute inset-0 bg-black/70 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
        <div className="absolute inset-x-0 bottom-0 p-6 text-white transition-all duration-500 group-hover:opacity-0">
          <h3 className="text-2xl font-bold mb-2 drop-shadow-lg">{destination.name}</h3>
          <p className="text-sm text-white/90 line-clamp-2 mb-4 drop-shadow">
            {destination.shortDescription}
          </p>
        </div>
        <div className="absolute inset-0 p-6 flex flex-col justify-center items-center text-center text-white opacity-0 transition-all duration-500 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0">
          <h3 className="text-3xl font-bold mb-4 drop-shadow-lg">{destination.name}</h3>
          <p className="text-sm text-white/90 mb-6 leading-relaxed drop-shadow">
            {destination.detailedDescription}
          </p>
          <a 
            href={`/destinations/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-block bg-yellow-400 text-black hover:bg-yellow-500 font-semibold px-8 py-3 rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            View tours
          </a>
        </div>
      </div>
    );
  });

  return (
    <section 
      id="destinations" 
      ref={ref} 
      className="relative py-20 overflow-hidden"
    >
      <div className="container mx-auto px-6 relative z-10">
        {/* Card container with background image, white overlay, rounded corners, and padding */}
        <div
          className="relative rounded-2xl shadow-lg p-8 overflow-hidden"
          style={{
            backgroundImage: "url('/background_destination.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
<div className="absolute inset-0 bg-white/80 rounded-2xl pointer-events-none" />
          <div className="relative z-10">
            {/* Section Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
              transition={{ duration: 0.8 }}
className="text-left mb-12"
            >
              <h2 className="text-5xl md:text-7xl font-extrabold text-black tracking-tighter uppercase">
                Destinations
              </h2>
              <div className="mt-4">
                <p className="text-lg md:text-xl text-black">
                  That Beckon Every Traveller
                </p>
              </div>
            </motion.div>
          <div
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 transition-opacity duration-300 ${fade ? 'opacity-0' : 'opacity-100'}`}
          >
            {currentDestinations.map((destination, index) => (
              <DestinationCard
                key={`${destination.name}-${currentStartIndex}-${index}`}
                destination={destination}
                index={index}
                currentStartIndex={currentStartIndex}
              />
            ))}
          </div>

          {/* Rotation Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isInView ? 1 : 0 }}
            transition={{ delay: 1 }}
            className="flex justify-center mt-8"
          >
            <div className="flex space-x-2">
              {Array.from({ length: Math.ceil(destinations.length / destinationsPerPage) }).map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    Math.floor(currentStartIndex / destinationsPerPage) === index
                      ? 'bg-black w-8'
                      : 'bg-gray-300'
                  }`}
                />
              ))}
            </div>
          </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
