"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import destinationsDataRaw from "@/data/destinations.json";
import itinerariesDataRaw from "@/data/itineraries.json";

export default function SearchBar() {
  const router = useRouter();
  const [destination, setDestination] = useState("");
  const [itinerary, setItinerary] = useState("");
  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(1);
  const [showDestDropdown, setShowDestDropdown] = useState(false);
  const [showItineraryDropdown, setShowItineraryDropdown] = useState(false);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [savedScrollPosition, setSavedScrollPosition] = useState(0);
  
  const destDropdownRef = useRef<HTMLDivElement>(null);
  const itineraryDropdownRef = useRef<HTMLDivElement>(null);

  // Remove duplicate destinations by name
  const destinationsData = Array.from(
    new Map(destinationsDataRaw.map((d) => [d.name, d])).values()
  );
  // Remove duplicate itineraries by title
  const itinerariesData = Array.from(
    new Map(itinerariesDataRaw.map((i) => [i.title, i])).values()
  );

  // Function to handle dropdown opening with scroll lock and overlay
  const handleDropdownOpen = (dropdownType: 'destination' | 'itinerary') => {
    // If overlay is already active, just switch dropdowns
    if (isOverlayActive) {
      if (dropdownType === 'destination') {
        setShowDestDropdown(true);
        setShowItineraryDropdown(false);
      } else {
        setShowItineraryDropdown(true);
        setShowDestDropdown(false);
      }
      return;
    }
    
    // Save current scroll position
    const currentScrollY = window.scrollY;
    setSavedScrollPosition(currentScrollY);
    
    // Calculate scrollbar width to prevent layout shift
    const scrollBarWidth = window.innerWidth - document.documentElement.clientWidth;
    
    // Apply scroll lock immediately using requestAnimationFrame for smooth execution
    requestAnimationFrame(() => {
      // Lock scroll on both body and html
      const body = document.body;
      const html = document.documentElement;
      
      body.style.overflow = 'hidden';
      body.style.position = 'fixed';
      body.style.top = `-${currentScrollY}px`;
      body.style.left = '0';
      body.style.right = '0';
      body.style.width = '100vw';
      body.style.paddingRight = `${scrollBarWidth}px`;
      
      html.style.overflow = 'hidden';
      
      // Activate overlay and start transition
      setIsOverlayActive(true);
      setIsTransitioning(true);
      
      // Open the specific dropdown
      if (dropdownType === 'destination') {
        setShowDestDropdown(true);
        setShowItineraryDropdown(false);
      } else {
        setShowItineraryDropdown(true);
        setShowDestDropdown(false);
      }
      
      // End transition after animation completes
      setTimeout(() => {
        setIsTransitioning(false);
      }, 300);
    });
  };

  // Function to handle dropdown closing
  const handleDropdownClose = () => {
    setShowDestDropdown(false);
    setShowItineraryDropdown(false);
    setIsTransitioning(true);
    
    // Wait for the search bar to animate down first (300ms animation)
    setTimeout(() => {
      // Remove overlay after search bar has moved down
      setIsOverlayActive(false);
      setIsTransitioning(false);
      
      // Restore body and html styles
      const body = document.body;
      const html = document.documentElement;
      
      body.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.paddingRight = '';
      
      html.style.overflow = '';
      
      // Restore scroll position smoothly
      window.scrollTo({ top: savedScrollPosition, behavior: 'smooth' });
    }, 300);
  };

  // Handle clicks outside dropdowns and escape key
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Only close if clicking outside the entire search form (not just dropdowns)
      const searchForm = document.querySelector('form');
      if (searchForm && !searchForm.contains(event.target as Node)) {
        handleDropdownClose();
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && (showDestDropdown || showItineraryDropdown)) {
        handleDropdownClose();
      }
    };

    if (showDestDropdown || showItineraryDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscapeKey);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [showDestDropdown, showItineraryDropdown]);

  // Cleanup on component unmount
  useEffect(() => {
    return () => {
      // Ensure all styles are cleaned up on unmount
      const body = document.body;
      const html = document.documentElement;
      
      body.style.overflow = '';
      body.style.position = '';
      body.style.top = '';
      body.style.left = '';
      body.style.right = '';
      body.style.width = '';
      body.style.paddingRight = '';
      
      html.style.overflow = '';
    };
  }, []);

  // Handle search navigation
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Close any open dropdowns first
    if (showDestDropdown || showItineraryDropdown) {
      handleDropdownClose();
    }
    
    if (itinerary) {
      // Navigate to itinerary page (slugify title)
      const slug = encodeURIComponent(
        itinerary
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9\-]/g, "")
      );
      router.push(`/itineraries/${slug}`);
    } else if (destination) {
      // Navigate to destination page (slugify name)
      const slug = encodeURIComponent(
        destination
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9\-]/g, "")
      );
      router.push(`/destinations/${slug}`);
    }
  };

  return (
    <>
      {/* Enhanced Translucent Overlay with Strong Blur */}
      {isOverlayActive && (
        <div 
          className="fixed inset-0 z-40 transition-all duration-300 ease-out"
          onClick={handleDropdownClose}
          style={{ 
            backgroundColor: 'rgba(0, 0, 0, 0.6)',
            backdropFilter: 'blur(15px)',
            WebkitBackdropFilter: 'blur(15px)',
            transform: 'translateZ(0)',
            willChange: 'backdrop-filter, opacity'
          }}
        />
      )}
      
      {/* Search Bar Form */}
      <form
        className={`w-full max-w-5xl bg-white/95 rounded-3xl shadow-2xl flex flex-row items-center px-0 py-0 border border-gray-100 min-h-[100px] transition-all duration-300 ease-out ${
          isOverlayActive || isTransitioning
            ? 'fixed top-20 z-50' 
            : 'relative mx-auto mt-8 z-20'
        }`}
        onSubmit={handleSearch}
        style={{
          // Ensure perfect centering throughout the entire animation
          ...(isOverlayActive || isTransitioning ? {
            left: '50%',
            transform: 'translateX(-50%)',
            margin: 0
          } : {})
        }}
      >
        <div className="w-full flex flex-row items-stretch min-h-[100px]">
          {/* Where - Custom Dropdown */}
          <div className="relative flex-1 flex flex-col items-start px-4 py-3 group" ref={destDropdownRef}>
            <label className="font-semibold text-base mb-1 text-gray-700 group-hover:text-[#FDBE00] transition-colors duration-200">
              Where
            </label>
            <div
              className="w-full bg-transparent outline-none text-gray-800 font-medium py-2 px-3 rounded-xl border border-transparent focus:border-[#FDBE00] focus:ring-2 focus:ring-[#FDBE00]/30 transition-all duration-200 cursor-pointer min-h-[44px] flex items-center"
              onClick={() => handleDropdownOpen('destination')}
              style={{ 
                background: destination ? '#fffbe6' : 'white',
                // Add visual feedback when field is selected and overlay is active
                ...(destination && isOverlayActive ? {
                  border: '2px solid #FDBE00',
                  boxShadow: '0 0 0 3px rgba(253, 190, 0, 0.1)'
                } : {})
              }}
            >
              {destination || <span className="text-gray-400">Search destinations</span>}
              <svg className="w-4 h-4 ml-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* Destinations Dropdown */}
            {showDestDropdown && (
              <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-80 overflow-y-auto">
                <div className="sticky top-0 bg-white px-4 py-3 text-xs text-gray-500 font-semibold border-b border-gray-100">
                  Suggested destinations
                </div>
                {destinationsData.map((d: any) => (
                  <div
                    key={d.name}
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-[#FFF3CD] cursor-pointer transition-all duration-150 ${
                      destination === d.name ? 'bg-[#FFF3CD] font-semibold' : ''
                    }`}
                    onClick={() => { 
                      setDestination(d.name); 
                      // Close the dropdown after selection to allow switching to other fields
                      setShowDestDropdown(false);
                      // If overlay is not active, close everything
                      if (!isOverlayActive) {
                        handleDropdownClose(); 
                      }
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-400 to-blue-600 flex-shrink-0 flex items-center justify-center text-white text-sm font-semibold">
                      {d.name.charAt(0)}
                    </div>
                    <div className="text-base text-gray-900 font-medium">{d.name}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Divider */}
          <div className="hidden md:block h-16 w-px bg-gray-200 my-4" />
          
          {/* Itinerary - Custom Dropdown */}
          <div className="relative flex-1 flex flex-col items-start px-4 py-3 group" ref={itineraryDropdownRef}>
            <label className="font-semibold text-base mb-1 text-gray-700 group-hover:text-[#FDBE00] transition-colors duration-200">
              Itinerary
            </label>
            <div
              className="w-full bg-transparent outline-none text-gray-800 font-medium py-2 px-3 rounded-xl border border-transparent focus:border-[#FDBE00] focus:ring-2 focus:ring-[#FDBE00]/30 transition-all duration-200 cursor-pointer min-h-[44px] flex items-center"
              onClick={() => handleDropdownOpen('itinerary')}
              style={{ 
                background: itinerary ? '#fffbe6' : 'white',
                // Add visual feedback when field is selected and overlay is active
                ...(itinerary && isOverlayActive ? {
                  border: '2px solid #FDBE00',
                  boxShadow: '0 0 0 3px rgba(253, 190, 0, 0.1)'
                } : {})
              }}
            >
              {itinerary || <span className="text-gray-400">Select itinerary</span>}
              <svg className="w-4 h-4 ml-auto text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
            
            {/* Itineraries Dropdown */}
            {showItineraryDropdown && (
              <div className="absolute left-0 top-full mt-2 w-full bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-80 overflow-y-auto">
                <div className="sticky top-0 bg-white px-4 py-3 text-xs text-gray-500 font-semibold border-b border-gray-100">
                  Available itineraries
                </div>
                {itinerariesData.map((i: any) => (
                  <div
                    key={i.title}
                    className={`flex items-center gap-3 px-4 py-3 hover:bg-[#FFF3CD] cursor-pointer transition-all duration-150 ${
                      itinerary === i.title ? 'bg-[#FFF3CD] font-semibold' : ''
                    }`}
                    onClick={() => { 
                      setItinerary(i.title); 
                      // Close the dropdown after selection to allow switching to other fields
                      setShowItineraryDropdown(false);
                      // If overlay is not active, close everything
                      if (!isOverlayActive) {
                        handleDropdownClose(); 
                      }
                    }}
                  >
                    <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex-shrink-0 flex items-center justify-center text-white text-sm font-semibold">
                      {i.title.charAt(0)}
                    </div>
                    <div className="text-base text-gray-900 font-medium">{i.title}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
          
          {/* Divider */}
          <div className="hidden md:block h-16 w-px bg-gray-200 my-4" />
          
          {/* Check-in */}
          <div className="flex flex-col items-start px-4 py-3 group">
            <label className="font-semibold text-base mb-1 text-gray-700 group-hover:text-[#FDBE00] transition-colors duration-200">
              Check in
            </label>
            <input
              type="date"
              className="bg-transparent outline-none text-gray-800 font-medium py-2 px-3 rounded-xl border border-transparent focus:border-[#FDBE00] focus:ring-2 focus:ring-[#FDBE00]/30 transition-all duration-200 min-h-[44px]"
              value={checkIn}
              onChange={e => setCheckIn(e.target.value)}
              style={{
                // Add visual feedback when overlay is active and field has value
                ...(checkIn && isOverlayActive ? {
                  background: '#fffbe6',
                  border: '2px solid #FDBE00',
                  boxShadow: '0 0 0 3px rgba(253, 190, 0, 0.1)'
                } : checkIn ? {
                  background: '#fffbe6'
                } : {})
              }}
            />
          </div>
          
          {/* Divider */}
          <div className="hidden md:block h-16 w-px bg-gray-200 my-4" />
          
          {/* Check-out */}
          <div className="flex flex-col items-start px-4 py-3 group">
            <label className="font-semibold text-base mb-1 text-gray-700 group-hover:text-[#FDBE00] transition-colors duration-200">
              Check out
            </label>
            <input
              type="date"
              className="bg-transparent outline-none text-gray-800 font-medium py-2 px-3 rounded-xl border border-transparent focus:border-[#FDBE00] focus:ring-2 focus:ring-[#FDBE00]/30 transition-all duration-200 min-h-[44px]"
              value={checkOut}
              onChange={e => setCheckOut(e.target.value)}
              style={{
                // Add visual feedback when overlay is active and field has value
                ...(checkOut && isOverlayActive ? {
                  background: '#fffbe6',
                  border: '2px solid #FDBE00',
                  boxShadow: '0 0 0 3px rgba(253, 190, 0, 0.1)'
                } : checkOut ? {
                  background: '#fffbe6'
                } : {})
              }}
            />
          </div>
          
          {/* Divider */}
          <div className="hidden md:block h-16 w-px bg-gray-200 my-4" />
          
          {/* Guests */}
          <div className="flex flex-col items-start px-4 py-3 group">
            <label className="font-semibold text-base mb-1 text-gray-700 group-hover:text-[#FDBE00] transition-colors duration-200">
              Guests
            </label>
            <input
              type="number"
              min={1}
              className="w-16 bg-transparent outline-none text-gray-800 font-medium py-2 px-3 rounded-xl border border-transparent focus:border-[#FDBE00] focus:ring-2 focus:ring-[#FDBE00]/30 transition-all duration-200 min-h-[44px]"
              value={guests}
              onChange={e => setGuests(Number(e.target.value))}
              style={{
                // Add visual feedback when overlay is active and field has non-default value
                ...(guests > 1 && isOverlayActive ? {
                  background: '#fffbe6',
                  border: '2px solid #FDBE00',
                  boxShadow: '0 0 0 3px rgba(253, 190, 0, 0.1)'
                } : guests > 1 ? {
                  background: '#fffbe6'
                } : {})
              }}
            />
          </div>
          
          {/* Search button */}
          <div className="flex flex-col justify-end px-4 py-3">
            <button
              type="submit"
              className="bg-[#FDBE00] hover:bg-blue-500 hover:text-white text-black rounded-full p-4 shadow-md flex items-center justify-center transition-all duration-200 focus:ring-4 focus:ring-blue-300 text-lg group"
              aria-label="Search"
              style={{ minWidth: 56, minHeight: 56 }}
            >
              <svg
                width="24"
                height="24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
                className="transition-colors duration-200"
              >
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
