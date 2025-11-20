"use client";

import React, { useState } from "react";
import Image from "next/image";
import { getBlurData } from "@/lib/blur-data";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "@/components/ui/button";
import destinationsData from "@/data/destinations.json";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/motion";

// Create a unique list of all destinations by name
const allUniqueDestinations = Array.from(
  new Map(destinationsData.map(item => [item.name, item])).values()
);

// Corrected image mapping based on available files
const destinationImages: { [key: string]: string } = {
    "Goa": "/destinations/goa.jpg",
    "Rishikesh": "/destinations/Rishikesh.jpg",
    "Jim Corbett": "/destinations/Jim_Corbett.png",
    "Amritsar": "/destinations/Amritsar.jpg",
    "Kashmir": "/destinations/kashmir.jpg",
    "Kerala": "/destinations/kerala.jpg",
    "Rajasthan": "/destinations/rajasthan.jpg",
    "Ladakh": "/destinations/Ladakh.jpg",
    "Himachal Pradesh": "/destinations/himachal-pradesh.jpg",
    "Andaman and Nicobar": "/destinations/andaman-nicobar.jpg",
    "Assam": "/destinations/assam.jpeg",
    "Darjeeling": "/destinations/Darjeeling.jpg",
    "Delhi": "/destinations/delhi.jpg",
    "Manali": "/destinations/Manali.jpg",
    "Meghalaya": "/destinations/Meghalaya.jpg",
    "Shimla": "/destinations/Shimla.jpg",
    "Uttarakhand": "/destinations/Uttarakhand.jpg",
};

const DestinationCard = ({ destination }: { destination: any }) => {
  if (!destination) {
    return null;
  }

  return (
  <motion.div className="group relative card-modern rounded-xl overflow-hidden focusable" variants={fadeInUp}>
      <div className="relative h-44 md:h-48 lg:h-52 w-full">
        <Image
          src={destinationImages[destination.name] || "/placeholder.jpg"}
          alt={destination.name}
          fill
          loading="lazy"
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 16vw"
          placeholder="blur"
          blurDataURL={getBlurData(destinationImages[destination.name] || 'dest')}
        />
  <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/10 to-transparent" />
        <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between">
          <div>
            <h3 className="text-white font-semibold text-base md:text-lg leading-tight drop-shadow">{destination.name}</h3>
            <p className="text-white/80 text-xs md:text-sm">{destination.location}</p>
          </div>
          <a
            href={`/destinations/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}
            className="inline-flex items-center gap-1 px-3 py-1.5 rounded-md bg-white/10 backdrop-blur-sm border border-white/20 text-white text-xs font-medium hover:bg-white/15 transition"
          >
            Explore →
          </a>
        </div>
      </div>
    </motion.div>
  );
};

export default function DestinationsSection() {
   return (
  <section id="destinations" className="py-20 bg-white dark:bg-[hsl(var(--surface-base))]">
       <div className="container mx-auto px-6 md:px-16 lg:px-20">
         <Carousel
           opts={{
             align: "start",
             loop: true,
           }}
           className="w-full"
         >
           <div className="mb-12 md:mb-20">
             <div className="text-left">
               <motion.h2 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tighter uppercase" variants={fadeInUp} initial="initial" whileInView="animate" viewport={{ once: true, amount: 0.2 }}>
                 Popular Destinations
               </motion.h2>
               <div className="flex justify-between items-center mt-2 md:mt-4">
                 <p className="text-base md:text-lg text-gray-700 dark:text-gray-300 flex-1">
                   Explore our top-rated destinations
                 </p>
                 <div className="flex items-center space-x-2 sm:hidden ml-4">
                   <CarouselPrevious className="static translate-y-0 translate-x-0" />
                   <CarouselNext className="static translate-y-0 translate-x-0" />
                 </div>
               </div>
             </div>
             <div className="hidden sm:flex items-center space-x-2 justify-end mt-4">
               <CarouselPrevious />
               <CarouselNext />
             </div>
           </div>
          <CarouselContent className="-ml-2 md:-ml-4">
            {allUniqueDestinations.map((destination) => (
              <CarouselItem
                key={destination.name}
                className="basis-1/2 pl-2 md:pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6"
              >
                <motion.div
                  variants={fadeInUp}
                  initial="initial"
                  whileInView="animate"
                  viewport={{ once: true, amount: 0.15 }}
                >
                  <div className="p-1">
                    <DestinationCard destination={destination} />
                  </div>
                </motion.div>
              </CarouselItem>
            ))}
          </CarouselContent>
         </Carousel>
       </div>
     </section>
   );
 }
