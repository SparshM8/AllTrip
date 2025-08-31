"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Calendar as CalendarIcon, Search, User, MapPin, ChevronDown } from "lucide-react";
import destinationsDataRaw from "@/data/destinations.json";
import itinerariesDataRaw from "@/data/itineraries.json";
import { DatePickerModal } from "@/components/ui/date-picker-modal";

// Debounce function
function debounce<F extends (...args: any[]) => any>(func: F, waitFor: number) {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<F>): void => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), waitFor);
  };
}

export default function SearchBarMobile() {
  const router = useRouter();
  const [activeField, setActiveField] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selection, setSelection] = useState<{ type: 'dest' | 'itin'; value: string } | null>(null);
  const [dateRange, setDateRange] = useState<any[]>([]);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const [guests, setGuests] = useState(1);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  const destinationsData = Array.from(new Map(destinationsDataRaw.map((d) => [d.name, d])).values());
  const itinerariesData = Array.from(new Map(itinerariesDataRaw.map((i) => [i.title, i])).values());

  const filteredDestinations = searchTerm
    ? destinationsData.filter((d) => d.name.toLowerCase().includes(searchTerm.toLowerCase()))
    : destinationsData;

  const filteredItineraries = searchTerm
    ? itinerariesData.filter((i) => i.title.toLowerCase().includes(searchTerm.toLowerCase()))
    : itinerariesData;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selection) return;

    let slug;
    if (selection.type === 'itin') {
      const itinerarySlugMap: { [key: string]: string } = {
        "Jibhi & Shoja Offbeat": "jibhi---shoja-offbeat",
        "Offbeat Meghalaya - Kongthong": "offbeat-meghalaya---kongthong",
        "Offbeat Meghalaya - Mawlyngbna": "offbeat-meghalaya---mawlyngbna",
        "Himachal Cultural Trail": "himachal-cultural-trail"
      };
      slug = itinerarySlugMap[selection.value] || encodeURIComponent(selection.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, ""));
      router.push(`/itineraries/${slug}`);
    } else {
      slug = encodeURIComponent(selection.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, ""));
      router.push(`/destinations/${slug}`);
    }
  };

  const handleFieldActivation = (field: string | null) => {
    setActiveField(field);
    if (field) {
      setIsOverlayActive(true);
      document.body.style.overflow = 'hidden';
    }
  };

  const handleClose = () => {
    setActiveField(null);
    setIsOverlayActive(false);
    document.body.style.overflow = 'auto';
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const debouncedSetSearchTerm = useCallback(debounce(setSearchTerm, 300), []);

  return (
    <>
      <AnimatePresence>
        {isOverlayActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40"
            onClick={handleClose}
          />
        )}
      </AnimatePresence>

      <div ref={searchBarRef} className="relative w-full z-50">
        <motion.div
          layout
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl transition-all duration-300 ease-in-out border ${activeField ? 'ring-2 ring-[#FDBE00]' : 'border-transparent dark:border-gray-600'}`}
        >
          {/* Mobile Layout - Vertical Stack */}
          <div className="p-4 space-y-4">
            {/* Destination/Itinerary Search */}
            <div className="group" onClick={() => handleFieldActivation('location')}>
              <div className="flex items-center cursor-pointer p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors min-h-[60px] active:bg-gray-100 dark:active:bg-gray-600">
                <MapPin className="h-6 w-6 text-[#FDBE00] mr-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Location</label>
                  <div className="text-base text-gray-600 dark:text-gray-400 truncate font-medium">
                    {selection ? selection.value : "Where are you going?"}
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400 ml-3 flex-shrink-0" />
              </div>
            </div>

            {/* Date Picker */}
            <div className="group">
              <div
                className="flex items-center cursor-pointer p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors min-h-[60px] active:bg-gray-100 dark:active:bg-gray-600"
                onClick={() => setIsDateModalOpen(true)}
              >
                <CalendarIcon className="h-6 w-6 text-[#FDBE00] mr-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Dates</label>
                  <div className="text-base text-gray-600 dark:text-gray-400 font-medium">
                    {dateRange.length === 2 && dateRange[0] && dateRange[1]
                      ? `${dateRange[0].format("MMM dd")} - ${dateRange[1].format("MMM dd")}`
                      : "Add dates"
                    }
                  </div>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400 ml-3 flex-shrink-0" />
              </div>
            </div>

            {/* Guests */}
            <div className="group">
              <div className="flex items-center p-4 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors min-h-[60px] active:bg-gray-100 dark:active:bg-gray-600">
                <User className="h-6 w-6 text-[#FDBE00] mr-4 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block mb-1">Guests</label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full text-base text-gray-600 dark:text-gray-400 bg-transparent border-none outline-none cursor-pointer font-medium"
                  >
                    {[1,2,3,4,5,6,7,8].map(num => (
                      <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
                    ))}
                  </select>
                </div>
                <ChevronDown className="h-5 w-5 text-gray-400 ml-3 flex-shrink-0" />
              </div>
            </div>

            {/* Search Button */}
            <motion.button
              layout
              onClick={handleSearch}
              disabled={!selection}
              className="w-full bg-[#FDBE00] text-black rounded-lg py-4 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center font-semibold text-lg min-h-[56px] active:bg-yellow-600"
            >
              <Search className="h-6 w-6 mr-3" />
              Search
            </motion.button>
          </div>
        </motion.div>

        {/* Location Search Dropdown */}
        <AnimatePresence>
          {activeField === 'location' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: -10 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-full left-0 right-0 mb-2 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border dark:border-gray-600 p-4 mx-4 z-50"
            >
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations or itineraries"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FDBE00] outline-none bg-white dark:bg-gray-700 dark:text-white dark:border-gray-600"
                  onChange={(e) => debouncedSetSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
              <div className="max-h-60 overflow-y-auto mt-4 custom-scrollbar">
                {/* Itineraries */}
                <h3 className="font-bold text-gray-800 dark:text-gray-200 px-2 pt-2">Itineraries</h3>
                {filteredItineraries.length > 0 ? (
                  filteredItineraries.map((item) => (
                    <div
                      key={item.title}
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        setSelection({ type: 'itin', value: item.title });
                        handleFieldActivation(null);
                      }}
                    >
                      <div className="bg-emerald-100 text-emerald-700 rounded-lg p-2">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <span className="text-black dark:text-white">{item.title}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 p-2">No itineraries found.</p>
                )}

                {/* Destinations */}
                <h3 className="font-bold text-gray-800 dark:text-gray-200 px-2 pt-4">Destinations</h3>
                {filteredDestinations.length > 0 ? (
                  filteredDestinations.map((item) => (
                    <div
                      key={item.name}
                      className="flex items-center gap-4 p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
                      onClick={() => {
                        setSelection({ type: 'dest', value: item.name });
                        handleFieldActivation(null);
                      }}
                    >
                      <div className="bg-blue-100 text-blue-700 rounded-lg p-2">
                        <MapPin className="h-5 w-5" />
                      </div>
                      <span className="text-black dark:text-white">{item.name}</span>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500 dark:text-gray-400 p-2">No destinations found.</p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Date Picker Modal */}
      <DatePickerModal
        isOpen={isDateModalOpen}
        onClose={() => setIsDateModalOpen(false)}
        dateRange={dateRange}
        onDateChange={setDateRange}
      />
    </>
  );
}