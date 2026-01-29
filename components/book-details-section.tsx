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

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
      style={{ pointerEvents: 'none' }}
    />
  );
};

// Ongoing Trips Showcase Component
const OngoingTripsShowcase = ({ onProgressClick }: { onProgressClick: (e: React.MouseEvent) => void }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trips, setTrips] = useState([
    {
      image: "/ongoing/trip-to-goa.png",
      title: "Trip to Goa",
      status: "25% completed",
      percentage: 25,
      location: "Goa, India",
      travelers: "8 travelers",
      days: "7 days"
    },
    {
      image: "/ongoing/trip-to-himachal.png",
      title: "Trip to Himachal",
      status: "20% completed",
      percentage: 20,
      location: "Himachal Pradesh, India",
      travelers: "12 travelers",
      days: "10 days"
    }
  ]);

  // Auto rotation
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % trips.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [trips.length]);

  const currentTrip = trips[currentIndex];

  return (
    <div className="relative">
      {/* Progress bar width classes */}
      <style
        dangerouslySetInnerHTML={{
          __html: `\n.progress-fill{transition:width .7s cubic-bezier(.4,0,.2,1); background: linear-gradient(90deg, #3b82f6, #8b5cf6);}\n${Array.from({length:101},(_,i)=>`.progress-fill[data-p='${i}']{width:${i}%;}`).join('')}`
        }}
      />

      {/* Main Trip Card */}
      <div className="relative group">
        <div className="relative overflow-hidden rounded-3xl shadow-2xl bg-white dark:bg-gray-800 transform transition-all duration-500 hover:scale-105 hover:shadow-3xl">
          {/* Background Image */}
          <div className="relative h-80 md:h-96">
            <Image
              src={currentTrip.image}
              alt={currentTrip.title}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-110"
              sizes="(max-width: 768px) 100vw, 500px"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>

            {/* Trip Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Live Trip</span>
                </div>
                <div className="flex items-center space-x-4 text-sm">
                  <span>📍 {currentTrip.location}</span>
                  <span>👥 {currentTrip.travelers}</span>
                </div>
              </div>

              <h3 className="text-2xl font-bold mb-2">{currentTrip.title}</h3>

              {/* Progress Section */}
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium">Trip Progress</span>
                  <span className="text-sm font-bold">{currentTrip.percentage}%</span>
                </div>
                <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden progress-bar-container cursor-pointer hover:bg-white/30 transition-colors"
                     onClick={(e) => {
                       e.stopPropagation();
                       onProgressClick(e);
                     }}>
                  <div
                    className="progress-fill h-2 rounded-full cursor-pointer"
                    data-p={currentTrip.percentage}
                    onClick={(e) => {
                      e.stopPropagation();
                      onProgressClick(e);
                    }}
                  />
                </div>
                <p className="text-xs text-white/80 mt-2">Click to show interest ✨</p>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="flex justify-center mt-6 space-x-3">
          {trips.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'bg-blue-500 scale-125 shadow-lg'
                  : 'bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500'
              }`}
              aria-label={`View ${trips[index].title}`}
            />
          ))}
        </div>

        {/* Trip Stats */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-blue-600 dark:text-blue-400">{currentTrip.days}</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Duration</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600 dark:text-green-400">{currentTrip.percentage}%</div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Complete</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">
              {currentTrip.travelers.split(' ')[0]}
            </div>
            <div className="text-sm text-gray-600 dark:text-gray-400">Travelers</div>
          </div>
        </div>
      </div>
    </div>
  );
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
    // Find the progress-bar-container element, either as currentTarget or by searching up the DOM
    let progressBarEl = e.currentTarget as HTMLElement;
    if (!progressBarEl.classList.contains('progress-bar-container')) {
      progressBarEl = progressBarEl.closest('.progress-bar-container') as HTMLElement;
    }

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
    <section className="section-spacing relative bg-gradient-to-br from-slate-50 via-white to-slate-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-blue-500 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-purple-500 rounded-full blur-3xl"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-green-500 rounded-full blur-3xl"></div>
      </div>

      <ConfettiCanvas trigger={showConfetti} origins={confettiOrigins} />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-sm font-medium mb-6">
            <span className="w-2 h-2 bg-blue-500 rounded-full mr-2 animate-pulse"></span>
            How It Works
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Your Journey Starts Here
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Experience seamless travel planning with our 4-step process designed to make your dream vacation a reality.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Process Steps */}
          <div className="space-y-8">
            <ProcessStep
              number={1}
              title="Choose Your Destination"
              description="Browse our curated collection of incredible destinations and select the perfect location for your adventure."
              icon="🗺️"
              color="from-blue-500 to-blue-600"
            />
            <ProcessStep
              number={2}
              title="Get Personalized Quote"
              description="Contact our travel experts via WhatsApp for a customized itinerary and pricing tailored to your preferences."
              icon="💬"
              color="from-green-500 to-green-600"
            />
            <ProcessStep
              number={3}
              title="Secure Your Booking"
              description="Make a small advance payment to confirm your dates and lock in the best rates for your trip."
              icon="💳"
              color="from-purple-500 to-purple-600"
            />
            <ProcessStep
              number={4}
              title="Enjoy End-to-End Support"
              description="From pickup to drop-off, our team ensures every moment of your journey is memorable and hassle-free."
              icon="🎯"
              color="from-orange-500 to-orange-600"
            />
          </div>

          {/* Ongoing Trips Showcase */}
          <div className="relative">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Live Trip Progress</h3>
              <p className="text-gray-600 dark:text-gray-300">See real-time updates from our ongoing adventures</p>
            </div>

            <OngoingTripsShowcase onProgressClick={triggerConfetti} />
          </div>
        </div>
      </div>
    </section>
  );
};

// Process Step Component
const ProcessStep = ({ number, title, description, icon, color }: {
  number: number;
  title: string;
  description: string;
  icon: string;
  color: string;
}) => {
  return (
    <div className="group relative">
      {/* Connection Line */}
      {number < 4 && (
        <div className="absolute left-8 top-20 w-0.5 h-16 bg-gradient-to-b from-gray-300 to-transparent dark:from-gray-600"></div>
      )}

      <div className="flex items-start space-x-6">
        {/* Step Number & Icon */}
        <div className={`flex-shrink-0 w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}>
          <div className="text-center">
            <div className="text-2xl mb-1">{icon}</div>
            <div className="text-xs font-bold text-white">{number}</div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
            {title}
          </h3>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsSection;

