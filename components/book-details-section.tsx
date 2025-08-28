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
    <section className="py-12 relative bg-gray-50 dark:bg-gray-900">
      <ConfettiCanvas trigger={showConfetti} origins={confettiOrigins} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 ml-4 sm:ml-6 md:ml-16 lg:ml-20">
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className="lg:w-1/2 mb-10 lg:mb-0">
            <p className="text-lg text-gray-500 dark:text-gray-400 font-semibold">Easy and Fast</p>
            <h2 className="text-4xl md:text-5xl font-bold text-gray-800 dark:text-gray-100 mt-4 mb-8">
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
                  <h3 className="text-lg font-bold text-gray-600 dark:text-gray-300">Choose Destination</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
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
                  <h3 className="text-lg font-bold text-gray-600 dark:text-gray-300">Give Enquiry</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
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
                  <h3 className="text-lg font-bold text-gray-600 dark:text-gray-300">Give Advance</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
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
                  <h3 className="text-lg font-bold text-gray-600 dark:text-gray-300">End to End Assistance</h3>
                  <p className="text-gray-500 dark:text-gray-400 mt-1">
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
  const [lastClickTime, setLastClickTime] = useState<number>(0);
  const [clickCount, setClickCount] = useState<number>(0);
  const [globalHighestProgress, setGlobalHighestProgress] = useState<number>(25);
  const [rateLimitActive, setRateLimitActive] = useState<boolean>(false);
  const [timeUntilNextClick, setTimeUntilNextClick] = useState<number>(0);

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string>('');
  const [zoomLevel, setZoomLevel] = useState<number>(1);
  const [panPosition, setPanPosition] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState<boolean>(false);
  const [dragStart, setDragStart] = useState<{ x: number; y: number }>({ x: 0, y: 0 });

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

  // Load data from localStorage on component mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      // Load trips data
      const savedTrips = localStorage.getItem('bookDetailsTrips');
      if (savedTrips) {
        setTrips(JSON.parse(savedTrips));
      }

      // Load click count
      const savedClickCount = localStorage.getItem('bookDetailsClickCount');
      if (savedClickCount) {
        setClickCount(parseInt(savedClickCount, 10));
      }

      // Load global highest progress
      const savedHighestProgress = localStorage.getItem('globalHighestProgress');
      if (savedHighestProgress) {
        setGlobalHighestProgress(parseInt(savedHighestProgress, 10));
      }

      // Load last click time
      const savedLastClickTime = localStorage.getItem('lastClickTime');
      if (savedLastClickTime) {
        setLastClickTime(parseInt(savedLastClickTime, 10));
      }

      // Analytics logging
      console.log('🚀 Book Details Section loaded!');
      console.log(`📊 Current stats: ${clickCount} total clicks, ${globalHighestProgress}% highest progress`);
      console.log(`🎯 Trips data:`, trips);
    }
  }, []);

  // Save trips data to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookDetailsTrips', JSON.stringify(trips));
    }
  }, [trips]);

  // Save click count to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('bookDetailsClickCount', clickCount.toString());
    }
  }, [clickCount]);

  // Save global highest progress to localStorage whenever it changes
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem('globalHighestProgress', globalHighestProgress.toString());
    }
  }, [globalHighestProgress]);

  // Countdown timer for rate limit
  useEffect(() => {
    if (rateLimitActive) {
      const interval = setInterval(() => {
        const now = Date.now();
        const timeLeft = Math.max(0, 40000 - (now - lastClickTime));
        setTimeUntilNextClick(Math.ceil(timeLeft / 1000));

        if (timeLeft <= 0) {
          setRateLimitActive(false);
          setTimeUntilNextClick(0);
        }
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [rateLimitActive, lastClickTime]);

  // Keyboard support and wheel prevention for modal
  useEffect(() => {
    if (!isModalOpen) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape':
          closeModal();
          break;
        case '+':
        case '=':
          e.preventDefault();
          zoomIn();
          break;
        case '-':
          e.preventDefault();
          zoomOut();
          break;
        case '0':
          e.preventDefault();
          resetZoom();
          break;
      }
    };

    const preventWheel = (e: WheelEvent) => {
      // Only prevent wheel events when modal is open and not over the image
      if (isModalOpen) {
        const target = e.target as HTMLElement;
        const modalContent = document.querySelector('[data-modal-content]');
        if (!modalContent?.contains(target)) {
          e.preventDefault();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    document.addEventListener('wheel', preventWheel, { passive: false });

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.removeEventListener('wheel', preventWheel);
    };
  }, [isModalOpen]);

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

  // Modal functions
  const openModal = (imageSrc: string) => {
    setSelectedImage(imageSrc);
    setIsModalOpen(true);
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    // Prevent background scroll and wheel events
    document.body.style.overflow = 'hidden';
    document.body.style.position = 'fixed';
    document.body.style.width = '100%';
    document.body.style.top = `-${window.scrollY}px`;
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedImage('');
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
    // Restore background scroll
    const scrollY = document.body.style.top;
    document.body.style.position = '';
    document.body.style.top = '';
    document.body.style.overflow = '';
    document.body.style.width = '';
    window.scrollTo(0, parseInt(scrollY || '0', 10) * -1);
  };

  const zoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.25, 3));
  };

  const zoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.25, 0.25));
  };

  const resetZoom = () => {
    setZoomLevel(1);
    setPanPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    if (zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({ x: e.clientX - panPosition.x, y: e.clientY - panPosition.y });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && zoomLevel > 1) {
      setPanPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    e.stopPropagation();

    // More responsive zoom with better delta handling
    const delta = e.deltaY * -0.001;
    const newZoom = Math.max(0.25, Math.min(3, zoomLevel + delta));

    // Only update if there's a meaningful change
    if (Math.abs(newZoom - zoomLevel) > 0.01) {
      setZoomLevel(newZoom);
    }
  };

  // Touch support for mobile
  const [touchStartDistance, setTouchStartDistance] = useState<number>(0);
  const [touchStartZoom, setTouchStartZoom] = useState<number>(1);

  const getTouchDistance = (touches: React.TouchList) => {
    if (touches.length < 2) return 0;
    const dx = touches[0].clientX - touches[1].clientX;
    const dy = touches[0].clientY - touches[1].clientY;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      setTouchStartDistance(getTouchDistance(e.touches));
      setTouchStartZoom(zoomLevel);
    } else if (e.touches.length === 1 && zoomLevel > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.touches[0].clientX - panPosition.x,
        y: e.touches[0].clientY - panPosition.y
      });
    }
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    e.preventDefault();

    if (e.touches.length === 2 && touchStartDistance > 0) {
      // Pinch to zoom
      const currentDistance = getTouchDistance(e.touches);
      const scale = currentDistance / touchStartDistance;
      const newZoom = Math.max(0.25, Math.min(3, touchStartZoom * scale));
      setZoomLevel(newZoom);
    } else if (e.touches.length === 1 && isDragging && zoomLevel > 1) {
      // Pan
      setPanPosition({
        x: e.touches[0].clientX - dragStart.x,
        y: e.touches[0].clientY - dragStart.y
      });
    }
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
    setTouchStartDistance(0);
  };

  const handleProgressClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent event bubbling

    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime;

    // Rate limiting: Only allow one click per 40 seconds
    if (timeSinceLastClick < 40000) {
      const remainingTime = Math.ceil((40000 - timeSinceLastClick) / 1000);
      setRateLimitActive(true);
      setTimeUntilNextClick(remainingTime);
      console.log(`⏰ Rate limited! Please wait ${remainingTime} seconds before clicking again.`);
      return;
    }

    // Update click count and log
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    console.log(`🎯 Progress clicked! Total clicks: ${newClickCount}`);
    console.log(`📊 Click timestamp: ${new Date(now).toLocaleString()}`);

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

      // Update global highest progress if this is higher
      if (newPercentage > globalHighestProgress) {
        setGlobalHighestProgress(newPercentage);
        console.log(`🏆 New highest progress achieved: ${newPercentage}%`);
      }

      return newTrips;
    });

    // Update last click time
    setLastClickTime(now);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lastClickTime', now.toString());
    }

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
                className="w-full h-[420px] object-cover object-center transition-transform duration-300 hover:scale-105 cursor-pointer"
                priority={index === 0}
                onClick={() => openModal(trip.image)}
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
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#374151" className="dark:stroke-gray-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-700/80 hover:bg-white dark:hover:bg-gray-600 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="#374151" className="dark:stroke-gray-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
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
        className={`absolute -bottom-8 -left-16 bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg w-64 transition-all duration-300 transform-gpu ${
          rateLimitActive
            ? 'cursor-not-allowed opacity-75'
            : 'cursor-pointer hover:shadow-xl hover:scale-102'
        }`}
        onClick={handleProgressClick}
      >
        <div className="flex items-center">
          <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-12 transform-gpu">
            <span className="text-white font-bold text-lg transition-all duration-300">
              {trips[currentIndex].title.charAt(0)}
            </span>
          </div>
          <div className="ml-3">
            <p className="font-semibold text-gray-900 dark:text-gray-100 transition-all duration-300">{trips[currentIndex].title}</p>
            <p className="text-sm text-gray-500 dark:text-gray-400 transition-all duration-300">
              {rateLimitActive ? (
                <>⏰ Wait {timeUntilNextClick}s | Progress: {globalHighestProgress}%</>
              ) : (
                <> Progress : {globalHighestProgress}%</>
              )}
            </p>
            <div className="w-full bg-gray-200 dark:bg-gray-600 rounded-full h-1.5 mt-1 overflow-hidden progress-bar-container">
              <div
                className="bg-gradient-to-r from-purple-600 to-blue-500 h-1.5 rounded-full transition-all duration-700 ease-out transform-gpu"
                style={{
                  width: `${globalHighestProgress}%`
                }}
              ></div>
            </div>
          </div>
        </div>
      </div>

      {/* Click to show interest text */}
      <div className="absolute -bottom-16 -left-16 w-64 text-center">
        <p className="text-sm text-blue-600 dark:text-blue-400 font-medium animate-pulse">
          Click to show interest ✨
        </p>
      </div>

      {/* Full Screen Image Modal */}
      {isModalOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90"
          onClick={closeModal}
          onWheel={(e) => e.preventDefault()} // Prevent background scrolling
        >
          <div
            className="relative max-w-[90vw] max-h-[90vh] p-4"
            onClick={(e) => e.stopPropagation()}
            data-modal-content
          >
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute -top-16 right-0 text-white hover:text-gray-300 transition-colors bg-black/50 p-2 rounded-full"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Zoom Controls */}
            <div className="absolute -top-16 left-0 flex space-x-2">
              <button
                onClick={zoomOut}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                title="Zoom Out"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button
                onClick={resetZoom}
                className="bg-black/50 hover:bg-black/70 text-white px-3 py-2 rounded-full text-sm transition-colors"
                title="Reset Zoom"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                onClick={zoomIn}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                title="Zoom In"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Image Container */}
            <div
              className="relative overflow-hidden bg-white rounded-lg shadow-2xl touch-none"
              style={{
                width: 'min(90vw, 800px)',
                height: 'min(90vh, 600px)',
                cursor: zoomLevel > 1 ? (isDragging ? 'grabbing' : 'grab') : 'default'
              }}
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onMouseUp={handleMouseUp}
              onMouseLeave={handleMouseUp}
              onWheel={handleWheel}
              onTouchStart={handleTouchStart}
              onTouchMove={handleTouchMove}
              onTouchEnd={handleTouchEnd}
            >
              <Image
                src={selectedImage}
                alt="Full screen view"
                fill
                className="object-contain"
                style={{
                  transform: `scale(${zoomLevel}) translate(${panPosition.x / zoomLevel}px, ${panPosition.y / zoomLevel}px)`,
                  transition: isDragging ? 'none' : 'transform 0.1s ease-out'
                }}
                draggable={false}
              />
            </div>

            {/* Zoom Hint */}
            <div className="absolute -bottom-12 left-0 right-0 text-center">
              <p className="text-white/70 text-sm">
                {zoomLevel > 1
                  ? 'Drag to pan • Scroll to zoom • Pinch to zoom on mobile'
                  : 'Scroll to zoom • Click and drag when zoomed • Pinch to zoom on mobile'
                }
              </p>
              <p className="text-white/50 text-xs mt-1">
                Press ESC to close • + to zoom in • - to zoom out • 0 to reset
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookDetailsSection;
