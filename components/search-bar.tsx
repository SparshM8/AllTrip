"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "next-themes";
import { Calendar as CalendarIcon, Search, User, MapPin } from "lucide-react";
import destinationsDataRaw from "@/data/destinations.json";
import itinerariesDataRaw from "@/data/itineraries.json";
import { Button } from "@/components/ui/button";
import { DatePickerModal } from "@/components/ui/date-picker-modal";
import { format } from "date-fns";

// We'll import the new reusable hook instead of defining a function here
import { useDebounce } from "@/hooks/use-debounce";

export default function SearchBar() {
  const router = useRouter();
  const [activeField, setActiveField] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [selection, setSelection] = useState<{ type: 'dest' | 'itin'; value: string } | null>(null);
  const [dateRange, setDateRange] = useState<any[]>([]);
  const [guests, setGuests] = useState(1);
  const [isOverlayActive, setIsOverlayActive] = useState(false);
  const [isDateModalOpen, setIsDateModalOpen] = useState(false);
  const searchBarRef = useRef<HTMLDivElement>(null);
  const scrollableRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // New: Use the custom hook to get the debounced value.
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const destinationsData = Array.from(new Map(destinationsDataRaw.map((d) => [d.name, d])).values());
  const itinerariesData = Array.from(new Map(itinerariesDataRaw.map((i) => [i.title, i])).values());

  // Use the debounced value for filtering
  const filteredDestinations = debouncedSearchTerm
    ? destinationsData.filter((d) => d.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    : destinationsData;

  const filteredItineraries = debouncedSearchTerm
    ? itinerariesData.filter((i) => i.title.toLowerCase().includes(debouncedSearchTerm.toLowerCase()))
    : itinerariesData;

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selection) return;

    // A single, reusable slug generation logic for both destinations and itineraries
    const slug = encodeURIComponent(selection.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9\-]/g, ""));

    if (selection.type === 'itin') {
      router.push(`/itineraries/${slug}`);
    } else {
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
    setSearchTerm(""); // Clear search term when closing
    document.body.style.overflow = 'auto';
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (searchBarRef.current && !searchBarRef.current.contains(event.target as Node)) {
      handleClose();
    }
  };

  // Handle scroll within the dropdown
  const handleDropdownScroll = (e: React.WheelEvent) => {
    const scrollableDiv = scrollableRef.current;
    if (!scrollableDiv) return;

    const { scrollTop, scrollHeight, clientHeight } = scrollableDiv;
    const isAtTop = scrollTop === 0;
    const isAtBottom = Math.abs(scrollHeight - clientHeight - scrollTop) <= 1;

    // Prevent body scroll when scrolling up at the top or down at the bottom
    if ((isAtTop && e.deltaY < 0) || (isAtBottom && e.deltaY > 0)) {
      e.preventDefault();
      e.stopPropagation();
      return;
    }

    // Stop propagation to prevent body scroll
    e.stopPropagation();
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.body.style.overflow = 'auto'; // Cleanup
    };
  }, []);

  // Handle keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  };

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
      
      <div 
        ref={searchBarRef} 
        className={`relative w-full z-50 transition-transform duration-300 ease-in-out ${isOverlayActive ? '-translate-y-64' : ''}`}
        onKeyDown={handleKeyDown}
      >
        <motion.div
          layout
          className={`bg-white dark:bg-gray-800 rounded-lg shadow-2xl flex items-center transition-all duration-300 ease-in-out p-4 border ${activeField ? 'ring-2 ring-[#FDBE00]' : 'border-transparent dark:border-gray-600'}`}
        >
          {/* Destination/Itinerary Search */}
          <div className="flex-1 group" onClick={() => handleFieldActivation('location')}>
            <div className="flex items-center pl-4 pr-2 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 py-2">
              <MapPin className="h-6 w-6 text-[#FDBE00] mr-3 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Location</label>
                <div className="text-base text-gray-600 dark:text-gray-400 truncate">
                  {selection ? selection.value : "Where are you going?"}
                </div>
              </div>
            </div>
          </div>

          <div className="h-10 w-px bg-gray-200 dark:bg-gray-600" />

          {/* Date Picker */}
          <div className="flex-1 group">
            <div 
              className="flex items-center px-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700 rounded-lg transition-colors duration-200 py-2" 
              onClick={() => setIsDateModalOpen(true)}
            >
              <CalendarIcon className="h-6 w-6 text-[#FDBE00] mr-3 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Dates</label>
                <div className="text-base text-gray-600 dark:text-gray-400 truncate">
                  {dateRange.length === 2 && dateRange[0] && dateRange[1] 
                    ? `${dateRange[0].format("MMM dd")} - ${dateRange[1].format("MMM dd")}` 
                    : "Add dates"
                  }
                </div>
              </div>
            </div>
          </div>

          <div className="h-10 w-px bg-gray-200 dark:bg-gray-600" />

          {/* Guests */}
          <div className="flex-1 group">
            <div className="flex items-center px-4 py-2">
              <User className="h-6 w-6 text-[#FDBE00] mr-3 flex-shrink-0" />
              <div className="min-w-0 flex-1">
                <label className="text-sm font-semibold text-gray-700 dark:text-gray-300 block">Guests</label>
                <select
                  value={guests}
                  onChange={(e) => setGuests(Number(e.target.value))}
                  className="w-full text-base text-gray-600 dark:text-gray-400 bg-transparent border-none outline-none cursor-pointer hover:text-gray-800 dark:hover:text-gray-200 transition-colors duration-200"
                >
                  {[1,2,3,4,5,6,7,8].map(num => (
                    <option key={num} value={num}>{num} guest{num > 1 ? 's' : ''}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <motion.button
            layout
            onClick={handleSearch}
            disabled={!selection}
            className="bg-[#FDBE00] text-black rounded-md p-3 hover:bg-yellow-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200 flex items-center justify-center ml-2"
            whileHover={{ scale: selection ? 1.05 : 1 }}
            whileTap={{ scale: selection ? 0.95 : 1 }}
          >
            <Search className="h-5 w-5" />
          </motion.button>
        </motion.div>

        {/* Location Search Dropdown */}
        <AnimatePresence>
          {activeField === 'location' && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 10 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute top-full left-0 right-0 mt-2 bg-white dark:bg-gray-800 rounded-lg shadow-2xl border dark:border-gray-600 p-4 max-h-96 overflow-hidden"
              onWheel={handleDropdownScroll}
            >
              <div className="relative mb-4">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations or itineraries"
                  value={searchTerm}
                  style={{ color: theme === 'dark' ? 'white' : 'black' }} 
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-[#FDBE00] outline-none bg-white dark:bg-gray-700 dark:border-gray-600 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                />
              </div>
              
              <div 
                ref={scrollableRef}
                className="max-h-60 overflow-y-auto custom-scrollbar"
                style={{ scrollbarGutter: 'stable' }}
              >
                {/* Itineraries Section */}
                {filteredItineraries.length > 0 && (
                  <>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 px-2 pt-2 pb-1 sticky top-0 bg-white dark:bg-gray-800">
                      Itineraries
                    </h3>
                    {filteredItineraries.map((item) => (
                      <motion.div
                        key={`itin-${item.title}`}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                        onClick={() => {
                          setSelection({ type: 'itin', value: item.title });
                          handleClose();
                        }}
                        whileHover={{ x: 4 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="bg-emerald-100 text-emerald-700 rounded-lg p-2 flex-shrink-0">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <span className="text-black dark:text-white font-medium">{item.title}</span>
                      </motion.div>
                    ))}
                  </>
                )}

                {/* Destinations Section */}
                {filteredDestinations.length > 0 && (
                  <>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200 px-2 pt-4 pb-1 sticky top-0 bg-white dark:bg-gray-800">
                      Destinations
                    </h3>
                    {filteredDestinations.map((item) => (
                      <motion.div
                        key={`dest-${item.name}`}
                        className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer transition-colors duration-200"
                        onClick={() => {
                          setSelection({ type: 'dest', value: item.name });
                          handleClose();
                        }}
                        whileHover={{ x: 4 }}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div className="bg-blue-100 text-blue-700 rounded-lg p-2 flex-shrink-0">
                          <MapPin className="h-5 w-5" />
                        </div>
                        <span className="text-black dark:text-white font-medium">{item.name}</span>
                      </motion.div>
                    ))}
                  </>
                )}

                {/* No Results */}
                {filteredItineraries.length === 0 && filteredDestinations.length === 0 && searchTerm && (
                  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                    <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                    <p className="text-lg font-medium">No results found</p>
                    <p className="text-sm">Try searching with different keywords</p>
                  </div>
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