"use client";

import React, { useState } from "react";
import Image from "next/image";
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
    <div className="destination-card">
      <Image
        src={destinationImages[destination.name] || "/placeholder.jpg"}
        alt={destination.name}
        width={140}
        height={140}
        className="object-cover rounded-lg shadow-lg"
      />
      <div className="destination-info mt-2">
        <h3 className="destination-name text-lg font-semibold text-black dark:text-white">{destination.name}</h3>
        <div className="flex items-center justify-between mt-1 h-12">
          <p className="destination-location text-sm text-gray-500 dark:text-gray-300">{destination.location}</p>
          <Button asChild className="bg-black dark:bg-white text-white dark:text-black rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-300 text-xs py-1 px-3 h-auto">
            <a href={`/destinations/${destination.name.toLowerCase().replace(/\s+/g, '-')}`}>
              View Details
            </a>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default function DestinationsSection() {
   return (
     <section id="destinations" className="py-20 bg-gray-50 dark:bg-gray-900">
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
               <h2 className="text-3xl md:text-5xl font-extrabold text-black dark:text-white tracking-tighter uppercase">
                 Popular Destination
               </h2>
               <div className="flex justify-between items-center mt-2 md:mt-4">
                 <p className="text-base md:text-lg md:text-xl text-black dark:text-white flex-1">
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
               <CarouselItem key={destination.name} className="basis-1/2 pl-2 md:pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
                 <div className="p-1">
                   <DestinationCard destination={destination} />
                 </div>
               </CarouselItem>
             ))}
           </CarouselContent>
         </Carousel>
       </div>
     </section>
   );
 }
