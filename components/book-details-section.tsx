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
      className="absolute inset-0 w-full h-full pointer-events-none z-50 translate-y-[150px]"
    />
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
  <section className="section-spacing relative bg-[hsl(var(--surface-base))]">
      {/* Progress bar width classes generated once (0-100%) to avoid inline styles */}
      <style
        // Using data attribute mapping keeps styling declarative & passes no-inline-styles lint
        dangerouslySetInnerHTML={{
          __html: `\n.progress-fill{transition:width .7s cubic-bezier(.4,0,.2,1); background: hsl(var(--brand-accent));}\n${Array.from({length:101},(_,i)=>`.progress-fill[data-p='${i}']{width:${i}%;}`).join('')}`
        }}
      />
      <ConfettiCanvas trigger={showConfetti} origins={confettiOrigins} />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-start justify-between gap-16">
          <div className="lg:w-1/2 mb-10 lg:mb-0 max-w-xl">
            <p className="text-xs tracking-[0.25em] text-dim font-medium uppercase">Process</p>
            <h2 className="heading-display mt-4 mb-10">Book your next trip<br />in 4 easy steps</h2>
            <div className="space-y-5">
              <div className="flex items-start card-modern p-5 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-[hsl(var(--brand-accent))] text-black font-semibold shadow-sm">
                    <img src="/selection.svg" alt="Choose Destination" width={22} height={22} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-white tracking-wide">Choose Destination</h3>
                  <p className="text-sm text-white/60 mt-1 leading-relaxed">
                    Select your preferred destination from our curated list of amazing travel experiences.
                  </p>
                </div>
              </div>
              <div className="flex items-start card-modern p-5 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-emerald-500 to-emerald-600 text-white shadow-sm">
                    <svg width={22} height={18} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M22 12.008C22 11.456 21.552 11.008 21 11.008H3C2.448 11.008 2 11.456 2 12.008C2 12.56 2.448 13.008 3 13.008H21C21.552 13.008 22 12.56 22 12.008Z" fill="white"/>
                      <path d="M12 3.008C11.448 3.008 11 3.456 11 4.008V20.008C11 20.56 11.448 21.008 12 21.008C12.552 21.008 13 20.56 13 20.008V4.008C13 3.456 12.552 3.008 12 3.008Z" fill="white"/>
                    </svg>
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-white tracking-wide">Give Enquiry</h3>
                  <p className="text-sm text-white/60 mt-1 leading-relaxed">
                    Submit your travel enquiry via WhatsApp and our team will contact you for personalized assistance.
                  </p>
                </div>
              </div>
              <div className="flex items-start card-modern p-5 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-orange-500 to-amber-600 text-white shadow-sm">
                    <img src="/water-sport.svg" alt="Give Advance" width={22} height={18} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-white tracking-wide">Give Advance</h3>
                  <p className="text-sm text-white/60 mt-1 leading-relaxed">
                    Secure your booking with a small advance payment to confirm your travel dates.
                  </p>
                </div>
              </div>
              <div className="flex items-start card-modern p-5 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center bg-gradient-to-br from-cyan-600 to-sky-600 text-white shadow-sm">
                    <img src="/taxi.svg" alt="End to End Assistance" width={22} height={18} />
                  </div>
                </div>
                <div className="ml-4">
                  <h3 className="font-semibold text-white tracking-wide">End to End Assistance</h3>
                  <p className="text-sm text-white/60 mt-1 leading-relaxed">
                    On the day of your trip, we provide complete guidance and assistance, including meet and onboarding support throughout your travel journey.
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 flex flex-col items-center">
            <div className="mb-10">
              <h3 className="text-xl font-semibold tracking-wide text-white/80 uppercase">Ongoing Trips</h3>
            </div>

            {/* Carousel Container - responsive widths */}
            <div className="relative w-full max-w-md sm:max-w-lg lg:max-w-full lg:pr-28">
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
  // Store latest ETag for conditional requests
  const etagRef = useRef<string | null>(null);

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

  // Load data from API on component mount
  useEffect(() => {
    const loadProgressData = async () => {
      try {
        console.log('🌐 Client: Fetching progress data (conditional)...');
        const headers: HeadersInit = {};
        if (etagRef.current) headers['If-None-Match'] = etagRef.current;
        const response = await fetch('/api/progress', { headers, cache: 'no-cache' });
        console.log('🌐 Client: API response status:', response.status);

        if (response.status === 304) {
          console.log('🔁 Client: 304 Not Modified – using cached state.');
          return; // Keep existing state
        }

        if (response.ok) {
          const data = await response.json();
          etagRef.current = response.headers.get('ETag');
          console.log('🌐 Client: Received data + ETag:', etagRef.current, data);

            setTrips(data.trips || trips);
            setClickCount(data.clickCount || 0);
            setGlobalHighestProgress(data.globalHighestProgress || 25);
            setLastClickTime(data.lastClickTime || 0);

          console.log('🚀 Book Details Section loaded!');
          console.log(`📊 Current stats: ${data.clickCount || 0} total clicks, ${data.globalHighestProgress || 25}% highest progress`);
        } else {
          console.log('🌐 Client: API response not OK, status:', response.status);
        }
      } catch (error) {
        console.error('❌ Client: Error loading progress data:', error);
        console.log('🔄 Client: Falling back to localStorage...');
        if (typeof window !== 'undefined') {
          const savedTrips = localStorage.getItem('bookDetailsTrips');
          if (savedTrips) setTrips(JSON.parse(savedTrips));
          const savedClickCount = localStorage.getItem('bookDetailsClickCount');
          if (savedClickCount) setClickCount(parseInt(savedClickCount, 10));
          const savedHighestProgress = localStorage.getItem('globalHighestProgress');
          if (savedHighestProgress) setGlobalHighestProgress(parseInt(savedHighestProgress, 10));
          const savedLastClickTime = localStorage.getItem('lastClickTime');
          if (savedLastClickTime) setLastClickTime(parseInt(savedLastClickTime, 10));
        }
      }
    };
    loadProgressData();
  }, []);

  // Save data to API whenever it changes
  useEffect(() => {
    const saveProgressData = async () => {
      try {
        console.log('💾 Client: Saving progress data to API (optimistic)...');
        const dataToSave = { trips, clickCount, globalHighestProgress, lastClickTime };
        const response = await fetch('/api/progress', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(dataToSave),
        });
        console.log('📥 Client: Save API response status:', response.status);
        if (!response.ok) throw new Error('Failed to save progress');
        etagRef.current = response.headers.get('ETag') || etagRef.current;
        console.log('✅ Client: Save successful. Updated ETag:', etagRef.current);
      } catch (error) {
        console.error('❌ Client: Error saving progress data:', error);
        if (typeof window !== 'undefined') {
          localStorage.setItem('bookDetailsTrips', JSON.stringify(trips));
          localStorage.setItem('bookDetailsClickCount', clickCount.toString());
          localStorage.setItem('globalHighestProgress', globalHighestProgress.toString());
          localStorage.setItem('lastClickTime', lastClickTime.toString());
        }
      }
    };
    const timeoutId = setTimeout(saveProgressData, 600); // slight delay to coalesce rapid updates
    return () => clearTimeout(timeoutId);
  }, [trips, clickCount, globalHighestProgress, lastClickTime]);

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

  // Update dynamic zoomed image transform without inline styles
  useUpdateZoomStyle(zoomLevel, panPosition, isDragging);

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
    console.log('🖱️ Click handler triggered!');
    e.stopPropagation(); // Prevent event bubbling

    const now = Date.now();
    const timeSinceLastClick = now - lastClickTime;
    console.log(`⏱️ Time since last click: ${timeSinceLastClick}ms`);

    // Rate limiting: Only allow one click per 40 seconds
    if (timeSinceLastClick < 40000) {
      const remainingTime = Math.ceil((40000 - timeSinceLastClick) / 1000);
      setRateLimitActive(true);
      setTimeUntilNextClick(remainingTime);
      console.log(`⏰ Rate limited! Please wait ${remainingTime} seconds before clicking again.`);
      return;
    }

    console.log('✅ Click allowed, processing...');

    // Update click count and log
    const newClickCount = clickCount + 1;
    setClickCount(newClickCount);
    console.log(`🎯 Progress clicked! Total clicks: ${newClickCount}`);
    console.log(`📊 Click timestamp: ${new Date(now).toLocaleString()}`);

    setTrips(prevTrips => {
      const newTrips = [...prevTrips];
      const currentTrip = newTrips[currentIndex];
      console.log(`📈 Current trip before update:`, currentTrip);

      // Increase percentage by 1% (max 100%)
      const newPercentage = Math.min(currentTrip.percentage + 1, 100);
      newTrips[currentIndex] = {
        ...currentTrip,
        percentage: newPercentage,
        status: `${newPercentage}% completed`
      };

      console.log(`📈 Updated trip:`, newTrips[currentIndex]);

      // Update global highest progress if this is higher
      if (newPercentage > globalHighestProgress) {
        setGlobalHighestProgress(newPercentage);
        console.log(`🏆 New highest progress achieved: ${newPercentage}%`);
      }

      return newTrips;
    });

    // Update last click time
    setLastClickTime(now);
    console.log(`🕒 Updated last click time to: ${now}`);

    // Trigger confetti
    onProgressClick(e);
  };

  return (
    <div className="relative">
      {/* Main Carousel Image */}
            <div className="relative overflow-hidden rounded-2xl shadow-lg ring-1 ring-white/10 bg-[hsl(var(--surface-alt))]">
        {/* Dynamic carousel track without inline style; CSS rules injected below based on data-index */}
        <div 
          className="carousel-track flex transition-transform duration-700 ease-in-out"
          data-index={currentIndex}
        >
          {trips.map((trip, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="relative w-full h-56 sm:h-72 md:h-80 lg:h-[420px]">
                <Image
                  src={trip.image}
                  alt={trip.title}
                  fill
                  className="object-cover object-center transition-transform duration-300 hover:scale-105 cursor-pointer"
                  priority={index === 0}
                  sizes="(max-width: 768px) 100vw, 370px"
                  onClick={() => openModal(trip.image)}
                />
              </div>
            </div>
          ))}
        </div>
        
        {/* Navigation Buttons */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goToPrevious();
          }}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm hover:bg-black/60 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 border border-white/10"
          aria-label="Previous image"
          title="Previous image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 18L9 12L15 6" stroke="#374151" className="dark:stroke-gray-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            goToNext();
          }}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/40 backdrop-blur-sm hover:bg-black/60 p-2 rounded-full shadow-lg transition-all duration-200 hover:scale-110 border border-white/10"
          aria-label="Next image"
          title="Next image"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9 18L15 12L9 6" stroke="#374151" className="dark:stroke-gray-300" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        
        {/* Dot Indicators */}
  <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {trips.map((_, index) => (
            <button
              type="button"
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(index);
              }}
              className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${
                currentIndex === index ? 'bg-[hsl(var(--brand-accent))]' : 'bg-white/30 hover:bg-white/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              title={`Slide ${index + 1}`}
            />
          ))}
        </div>
      </div>
      
      {/* Status Box - stacks under carousel on small screens, absolute overlay on large screens */}
      <div
        className={`card-modern p-4 transition-all duration-300 transform-gpu ${
          rateLimitActive ? 'cursor-not-allowed opacity-75' : 'cursor-pointer hover:shadow-xl hover:scale-102'
        } w-full sm:max-w-sm lg:w-64 mt-4 lg:mt-0 lg:absolute lg:bottom-6 lg:right-6 lg:left-auto lg:translate-x-0`}
        onClick={handleProgressClick}
      >
        <div className="flex items-center">
          <div className="w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 hover:rotate-12 transform-gpu bg-[hsl(var(--brand-accent))] text-black font-bold text-lg">
            <span className="transition-all duration-300">
              {trips[currentIndex].title.charAt(0)}
            </span>
          </div>
          <div className="ml-3">
            <p className="font-semibold text-white transition-all duration-300 tracking-wide">{trips[currentIndex].title}</p>
            <p className="text-xs text-white/60 transition-all duration-300">
              {rateLimitActive ? (
                <>⏰ Wait {timeUntilNextClick}s | Progress: {globalHighestProgress}%</>
              ) : (
                <> Progress : {globalHighestProgress}%</>
              )}
            </p>
            <div className="w-full bg-white/10 rounded-full h-1.5 mt-1 overflow-hidden progress-bar-container">
              <div
                className="progress-fill h-1.5 rounded-full transform-gpu"
                data-p={globalHighestProgress}
                aria-label="Trip progress: "
                role="img"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Click to show interest text - responsive */}
      <div className="w-full text-center mt-2 lg:mt-0 lg:absolute lg:bottom-0 lg:right-6 lg:w-64">
        <p className="text-xs text-white/50 font-medium tracking-wide">Click to show interest ✨</p>
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
              type="button"
              onClick={closeModal}
              className="absolute -top-16 right-0 text-white hover:text-gray-300 transition-colors bg-black/50 p-2 rounded-full"
              aria-label="Close full screen image"
              title="Close"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>

            {/* Zoom Controls */}
            <div className="absolute -top-16 left-0 flex space-x-2">
              <button
                type="button"
                onClick={zoomOut}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                title="Zoom Out"
                aria-label="Zoom out"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
              <button
                type="button"
                onClick={resetZoom}
                className="bg-black/50 hover:bg-black/70 text-white px-3 py-2 rounded-full text-sm transition-colors"
                title="Reset Zoom"
                aria-label="Reset zoom"
              >
                {Math.round(zoomLevel * 100)}%
              </button>
              <button
                type="button"
                onClick={zoomIn}
                className="bg-black/50 hover:bg-black/70 text-white p-2 rounded-full transition-colors"
                title="Zoom In"
                aria-label="Zoom in"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 5V19M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              </button>
            </div>

            {/* Image Container */}
            <div
              className="zoom-container relative overflow-hidden bg-white rounded-lg shadow-2xl touch-none w-[min(90vw,_800px)] h-[min(90vh,_600px)]"
              data-zoom={zoomLevel.toFixed(2)}
              data-dragging={isDragging ? 'true' : 'false'}
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
                loading="lazy"
                className="zoomed-image object-contain"
                draggable={false}
                sizes="100vw"
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

/* -------------------------------------------------
   Dynamically injected style rules (carousel + zoom)
   Using attribute selectors avoids inline style props
-------------------------------------------------- */
// Inject once per module load (outside component render) for static parts
const injected = (globalThis as any).__BOOK_DETAILS_STYLES__;
if (!injected) {
  const styleEl = typeof document !== 'undefined' ? document.createElement('style') : null;
  if (styleEl) {
    styleEl.id = 'book-details-dynamic-styles';
    styleEl.textContent = `
      .carousel-track { will-change: transform; }
      ${Array.from({length: 50}, (_,i)=>`.carousel-track[data-index='${i}']{transform:translateX(-${i*100}%);}`).join('')}
      .zoom-container[data-dragging='true'] { cursor: grabbing; }
      .zoom-container[data-dragging='false'][data-zoom='1'] { cursor: default; }
      .zoom-container[data-dragging='false']:not([data-zoom='1']) { cursor: grab; }
    `;
    document.head.appendChild(styleEl);
    (globalThis as any).__BOOK_DETAILS_STYLES__ = true;
  }
}

// Per-render dynamic image transform style (kept outside JSX style attribute)
// Observer: We use Mutation pattern by updating a dedicated <style> element's rule.
function updateZoomedImageStyle(zoom: number, pan: {x:number;y:number}, dragging: boolean) {
  if (typeof document === 'undefined') return;
  let styleEl = document.getElementById('book-details-zoom-style') as HTMLStyleElement | null;
  if (!styleEl) {
    styleEl = document.createElement('style');
    styleEl.id = 'book-details-zoom-style';
    document.head.appendChild(styleEl);
  }
  styleEl.textContent = `.zoomed-image{transform:scale(${zoom}) translate(${(pan.x/zoom).toFixed(2)}px, ${(pan.y/zoom).toFixed(2)}px); ${dragging ? 'transition:none;' : 'transition:transform .1s ease-out;'} }`;
}

// Hook into React state changes by monkey patching setState points (simple effect inside component would reintroduce inline styles).
// We export a tiny effect helper to be called within component body.
function useUpdateZoomStyle(zoomLevel: number, panPosition: {x:number;y:number}, isDragging: boolean) {
  useEffect(()=>{ updateZoomedImageStyle(zoomLevel, panPosition, isDragging); }, [zoomLevel, panPosition.x, panPosition.y, isDragging]);
}

