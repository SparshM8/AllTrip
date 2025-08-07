"use client";

import Image from "next/image";
import React, { useState, useEffect, useRef } from "react";

// Declare confetti function for TypeScript
declare global {
  interface Window {
    confetti: any;
  }
}

// New ConfettiCanvas component
const ConfettiCanvas = ({ trigger, origins }: { trigger: boolean; origins: { x: number; y: number }[] }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (trigger && typeof window !== 'undefined' && window.confetti && canvasRef.current && origins.length > 1) {
      const myConfetti = window.confetti.create(canvasRef.current, {
        resize: true,
        useWorker: true,
      });

      // Left corner burst
      myConfetti({
        particleCount: 75,
        spread: 80,
        origin: origins[0],
        angle: 45,
      });

      // Right corner burst
      myConfetti({
        particleCount: 75,
        spread: 80,
        origin: origins[1],
        angle: 135,
      });
    }
  }, [trigger, origins]);

  return <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none z-50" style={{ transform: 'translateY(150px)' }} />;
};

const BookDetailsSection = () => {
  const [showConfetti, setShowConfetti] = useState(false);
  const [confettiOrigins, setConfettiOrigins] = useState<{ x: number; y: number }[]>([]);

  // Load canvas-confetti CDN
  useEffect(() => {
    const confettiScript = document.createElement('script');
    confettiScript.src = 'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
    confettiScript.async = true;
    document.head.appendChild(confettiScript);

    return () => {
      // Cleanup scripts on unmount
      if (document.head.contains(confettiScript)) {
        document.head.removeChild(confettiScript);
      }
    };
  }, []);

  const triggerConfetti = (e: React.MouseEvent) => {
    const progressBarEl = (e.currentTarget as HTMLElement).querySelector('.progress-bar-container');
    if (progressBarEl) {
      const rect = progressBarEl.getBoundingClientRect();
      const originLeft = {
        x: rect.left / window.innerWidth,
        y: (rect.top + rect.height) / window.innerHeight,
      };
      const originRight = {
        x: rect.right / window.innerWidth,
        y: (rect.top + rect.height) / window.innerHeight,
      };
      setConfettiOrigins([originLeft, originRight]);
    }

    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 3000); // Reset after 3 seconds
  };

  return (
    <section className="py-12 relative">
      <ConfettiCanvas trigger={showConfetti} origins={confettiOrigins} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ml-4 sm:ml-6 md:ml-16 lg:ml-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <p className="text-lg text-gray-500 font-semibold">Easy and Fast</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mt-4 mb-8">
              Book your next trip <br />
              in 4 easy steps
            </h2>
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-yellow-400 rounded-lg flex items-center justify-center">
                    <Image src="/selection.svg" alt="Choose Destination" width={22} height={22} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-600">Choose Destination</h3>
                  <p className="text-gray-500 mt-1">
                    Select your preferred destination from our curated list of amazing travel experiences.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center">
                    <svg width={22} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12.008C22 11.456 21.552 11.008 21 11.008H3C2.448 11.008 2 11.456 2 12.008C2 12.56 2.448 13.008 3 13.008H21C21.552 13.008 22 12.56 22 12.008Z" fill="white"/>
                      <path d="M12 3.008C11.448 3.008 11 3.456 11 4.008V20.008C11 20.56 11.448 21.008 12 21.008C12.552 21.008 13 20.56 13 20.008V4.008C13 3.456 12.552 3.008 12 3.008Z" fill="white"/>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-600">Give Enquiry</h3>
                  <p className="text-gray-500 mt-1">
                    Submit your travel enquiry via WhatsApp and our team will contact you for personalized assistance.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                    <Image src="/water-sport.svg" alt="Give Advance" width={22} height={18} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-600">Give Advance</h3>
                  <p className="text-gray-500 mt-1">
                    Secure your booking with a small advance payment to confirm your travel dates.
                  </p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 bg-cyan-700 rounded-lg flex items-center justify-center">
                    <Image src="/taxi.svg" alt="End to End Assistance" width={22} height={18} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="text-lg font-bold text-gray-600">End to End Assistance</h3>
                  <p className="text-gray-500 mt-1">
                    On the day of your trip, we provide complete guidance and assistance, including meet and onboarding support throughout your travel journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 flex flex-col items-center">
            {/* Funky Ongoing Trips Heading */}
            <div className="mb-8">
              <h3 className="text-3xl md:text-4xl font-black text-transparent bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 bg-clip-text transform -rotate-2 hover:rotate-0 transition-transform duration-300 font-mono tracking-wider">
                🌟 Ongoing Trips ✈️
              </h3>
            </div>
            
            {/* Carousel Container */}
            <div className="relative w-full max-w-xs">
              <OngoingTripsCarousel onProgressClick={triggerConfetti} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// Ongoing Trips Carousel Component
const OngoingTripsCarousel = ({ onProgressClick }: { onProgressClick: (e: React.MouseEvent) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  
  const [trips, setTrips] = useState([
    {
      image: "/ongoing/trip-to-goa.png",
      title: "Trip to Goa",
      status: "25% completed",
      percentage: 25
    },
    {
      image: "/ongoing/trip-to-himachal.png", 
      title: "Trip to Himachal",
      status: "20% completed",
      percentage: 20
    }
  ]);

  // Auto rotation effect (reduced speed by 15% total - from 4000ms to 4600ms)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trips.length);
    }, 4600); // Rotate every 4.6 seconds (15% slower total)

    return () => clearInterval(interval);
  }, [trips.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + trips.length) % trips.length);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % trips.length);
  };

  const handleProgressClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling
    
    setTrips(prevTrips => {
      const newTrips = [...prevTrips];
      const currentTrip = newTrips[currentIndex];
      
      // Increase percentage by 1% (max 100%)
      const newPercentage = Math.min(currentTrip.percentage + 1, 100);
      newTrips[currentIndex] = {
        ...currentTrip,
        percentage: newPercentage,
        status: `${newPercentage}% completed`
      };
      
      return newTrips;
    });

    // Trigger confetti
    onProgressClick(e);
  };

  return (
    <div className="relative">
      {/* Main Carousel Image */}
      <div className="relative overflow-hidden rounded-2xl shadow-lg">
        <div 
          className="flex transition-transform duration-700 ease-in-out"
          style={{ 
            transform: `translateX(-${currentIndex * 100}%)`,
            willChange: 'transform'
          }}
        >
          {trips.map((trip, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <Image
                src={trip.image}
                alt={trip.title}
                width={370}
                height={420}
                className="w-full h-[420px] object-cover object-center transition-transform duration-300 hover:scale-105"
                priority={index === 0}
              />
            </div>
          ))}
        </div>
        
        {/* Navigation Buttons */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 hover:bg-white p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="#374151" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* Dot Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {trips.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-white' : 'bg-white/50'
              }`}
            />
          ))}
        </div>
      </div>
      
      {/* Status Box */}
      <div 
        className="absolute -bottom-8 -left-16 bg-white p-4 rounded-xl shadow-lg w-64 cursor-pointer hover:shadow-xl transition-all duration-300 hover:scale-102 transform-gpu"
        onClick={handleProgressClick}
      >
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-12 transform-gpu">
            <span className="text-white font-bold text-lg transition-all duration-300">
              {trips[currentIndex].title.charAt(0)}
            </span>
          </div>
          <div className="ml-3">
            <p className="font-semibold transition-all duration-300">{trips[currentIndex].title}</p>
            <p className="text-sm text-gray-500 transition-all duration-300">{trips[currentIndex].status}</p>
            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-1 overflow-hidden progress-bar-container">
              <div 
                className="bg-gradient-to-r from-purple-600 to-blue-500 h-1.5 rounded-full transition-all duration-700 ease-out transform-gpu" 
                style={{ 
                  width: `${trips[currentIndex].percentage}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsSection;
