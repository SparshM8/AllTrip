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
        <h3 className="destination-name text-lg font-semibold">{destination.name}</h3>
        <div className="flex items-center justify-between mt-1 h-12">
          <p className="destination-location text-sm text-gray-500">{destination.location}</p>
          <Button asChild className="bg-black text-white rounded-full hover:bg-gray-800 transition-colors duration-300 text-xs py-1 px-3 h-auto">
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
    <section id="destinations" className="py-20 bg-gray-50">
      <div className="container mx-auto px-6 md:px-16 lg:px-20">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <div className="flex justify-between items-center mb-20">
            <div className="text-left">
              <h2 className="text-5xl md:text-5xl font-extrabold text-black tracking-tighter uppercase">
                Popular Destination
              </h2>
              <p className="text-lg md:text-xl text-black mt-4">
                Explore our top-rated destinations
              </p>
            </div>
            <div className="flex items-center space-x-2">
              <CarouselPrevious />
              <CarouselNext />
            </div>
          </div>
          <CarouselContent>
            {allUniqueDestinations.map((destination) => (
              <CarouselItem key={destination.name} className="basis-1/2 sm:basis-1/3 md:basis-1/4 lg:basis-1/5 xl:basis-1/6">
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
