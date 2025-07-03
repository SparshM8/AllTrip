"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, Sun, Moon, MapPin, MessageCircle } from "lucide-react";
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer";
import { useMediaQuery } from "@/hooks/use-media-query";
import { useTheme } from "next-themes";
import navLinksData from "@/data/nav-links.json";

const navLinks = navLinksData;

const Navbar: React.FC = () => {
  // State for drawer (mobile menu) and scroll-based show/hide logic
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [mounted, setMounted] = useState(false);
  const lastScrollY = useRef(0);
  const isDesktop = useMediaQuery("(min-width: 768px)");

  // Dark mode theme hook from next-themes
  const { theme, setTheme } = useTheme();

  // Scroll handler: show navbar on upward scroll, hide on downward scroll after a threshold
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY < lastScrollY.current) {
        setShowNavbar(true);
      } else if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setShowNavbar(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Toggle function for theme switching
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <header
      className={`transition-all duration-300 ease-in-out sticky top-0 z-50 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      {/* Main Navbar Container with modern design */}
      <div className="mx-4 mt-3 mb-0">
        <nav 
          className="rounded-2xl shadow-lg backdrop-blur-sm border border-gray-200/20"
          style={{ 
            backgroundColor: '#FDBE00',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.08), 0 2px 8px rgba(0, 0, 0, 0.04)'
          }}
        >
          <div className="container mx-auto max-w-5xl flex items-center justify-between px-4 py-2">
            {/* Logo Section - Left */}
            <div className="flex items-center gap-2">
              <Link
                href="/"
                aria-label="AllTripp Home"
                className="font-bold text-xl font-sans"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="w-32 h-12 relative flex items-center justify-center">
                    <Image
                      src="/logo.png"
                      alt="AllTripp Logo"
                      width={128}
                      height={48}
                      className="object-contain"
                      priority
                    />
                  </div>
                </motion.div>
              </Link>
            </div>

            {/* Desktop Navigation - Center */}
            {isDesktop ? (
              <>
                <div className="flex items-center justify-center flex-1">
                  <nav className="flex items-center gap-8">
                    {navLinks.map((link, index) => (
                      <motion.div
                        key={link.name}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3, delay: index * 0.1 }}
                      >
                        <Link
                          href={link.href}
                          className="relative text-lg font-medium text-gray-800 transition-all duration-300 hover:text-gray-600 group py-1 px-1 font-sans"
                        >
                          {link.name}
                          {/* Hover underline effect */}
                          <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gray-700 transition-all duration-300 group-hover:w-full rounded-full"></span>
                        </Link>
                      </motion.div>
                    ))}
                  </nav>
                </div>
                
                {/* Right Section - Theme Toggle & CTA */}
                <div className="flex items-center gap-6">
                  {/* Theme Toggle */}
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.4 }}
                    onClick={toggleTheme}
                    aria-label="Toggle Dark Mode"
                    className="relative inline-flex items-center w-12 h-6 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 hover:scale-105"
                    style={{
                      backgroundColor: theme === "light" ? "#FF8C00" : "#1e40af"
                    }}
                  >
                    {/* Background Icons */}
                    <div className="absolute inset-0 flex items-center justify-between px-1">
                      <Sun className={`w-3 h-3 transition-opacity duration-300 ${theme === "light" ? "opacity-100 text-yellow-100" : "opacity-50 text-yellow-400"}`} />
                      <Moon className={`w-3 h-3 transition-opacity duration-300 ${theme === "dark" ? "opacity-100 text-blue-100" : "opacity-50 text-blue-600"}`} />
                    </div>
                    
                    {/* Toggle Circle */}
                    <div
                      className={`absolute w-4 h-4 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
                        theme === "light" ? "translate-x-1" : "translate-x-7"
                      }`}
                    />
                  </motion.button>

                  {/* Book Now CTA Button */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3, delay: 0.5 }}
                  >
                    <Button
                      asChild
                      className="bg-green-600 text-white hover:bg-green-700 font-semibold px-4 py-1.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-0 hover:scale-105 font-sans"
                      style={{
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)'
                      }}
                    >
                      <a 
                        href="https://api.whatsapp.com/send/?phone=919266602470&text=Hi+AllTipp%2C+I+am+interested+in+planning+a+trip.+Can+you+help+me+with+the+details%3F&type=phone_number&app_absent=0" 
                        target="_blank" 
                        rel="noopener noreferrer" 
                        className="font-sans flex items-center gap-2"
                      >
                        <MessageCircle className="w-4 h-4" />
                        Book Now
                      </a>
                    </Button>
                  </motion.div>
                </div>
              </>
            ) : (
              // Mobile Navigation - Right side
              <div className="flex items-center gap-3">
                {/* Mobile Theme Toggle */}
                <button
                  onClick={toggleTheme}
                  aria-label="Toggle Dark Mode"
                  className="relative inline-flex items-center w-10 h-5 rounded-full transition-all duration-300 focus:outline-none hover:scale-105"
                  style={{
                    backgroundColor: theme === "light" ? "#FF8C00" : "#1e40af"
                  }}
                >
                  <div className="absolute inset-0 flex items-center justify-between px-1">
                    <Sun className={`w-2.5 h-2.5 transition-opacity duration-300 ${theme === "light" ? "opacity-100 text-yellow-100" : "opacity-50 text-yellow-400"}`} />
                    <Moon className={`w-2.5 h-2.5 transition-opacity duration-300 ${theme === "dark" ? "opacity-100 text-blue-100" : "opacity-50 text-blue-600"}`} />
                  </div>
                  
                  <div
                    className={`absolute w-3 h-3 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
                      theme === "light" ? "translate-x-1" : "translate-x-6"
                    }`}
                  />
                </button>

                {/* Mobile Book Now Button */}
                <Button
                  asChild
                  size="sm"
                  className="bg-green-600 text-white hover:bg-green-700 font-medium px-3 py-1.5 rounded-lg shadow-md text-sm"
                >
                  <a 
                    href="https://api.whatsapp.com/send/?phone=919266602470&text=Hi+AllTipp%2C+I+am+interested+in+planning+a+trip.+Can+you+help+me+with+the+details%3F&type=phone_number&app_absent=0" 
                    target="_blank" 
                    rel="noopener noreferrer" 
                    className="flex items-center gap-1"
                  >
                    <MessageCircle className="w-3 h-3" />
                    Book
                  </a>
                </Button>
                
                {/* Mobile Menu Drawer */}
                <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                  <DrawerTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="icon"
                      className="bg-white hover:bg-gray-50 border-gray-200 rounded-lg shadow-md"
                      aria-label="Toggle menu"
                    >
                      <Menu className="h-5 w-5 text-gray-700" />
                      <span className="sr-only">Toggle menu</span>
                    </Button>
                  </DrawerTrigger>
                  <DrawerContent 
                    className="rounded-t-2xl border-t border-gray-200/20"
                    style={{ 
                      backgroundColor: '#FDBE00',
                      boxShadow: '0 -8px 32px rgba(0, 0, 0, 0.08)'
                    }}
                  >
                    <DrawerHeader className="text-center">
                      <DrawerTitle className="text-gray-800 text-xl font-bold">AllTripp</DrawerTitle>
                      <DrawerDescription className="text-gray-700">
                        Your Gateway to Amazing Adventures
                      </DrawerDescription>
                    </DrawerHeader>
                    <div className="flex flex-col gap-2 p-6">
                      {navLinks.map((link) => (
                        <Link
                          key={link.name}
                          href={link.href}
                          onClick={() => setIsDrawerOpen(false)}
                          className="text-lg font-medium text-gray-800 transition-all duration-300 hover:text-gray-600 text-center py-3 px-4 rounded-lg hover:bg-white/20"
                        >
                          {link.name}
                        </Link>
                      ))}
                      
                      {/* Mobile Full Book Now Button */}
                      <div className="mt-4 pt-4 border-t border-gray-200/30">
                        <Button
                          asChild
                          className="w-full bg-green-600 text-white hover:bg-green-700 font-semibold py-3 rounded-xl shadow-md"
                        >
                          <a 
                            href="https://api.whatsapp.com/send/?phone=919266602470&text=Hi+AllTipp%2C+I+am+interested+in+planning+a+trip.+Can+you+help+me+with+the+details%3F&type=phone_number&app_absent=0" 
                            target="_blank" 
                            rel="noopener noreferrer" 
                            onClick={() => setIsDrawerOpen(false)}
                            className="flex items-center justify-center gap-2"
                          >
                            <MessageCircle className="w-4 h-4" />
                            Book Your Adventure Now
                          </a>
                        </Button>
                      </div>
                    </div>
                    <DrawerFooter>
                      <DrawerClose asChild>
                        <Button variant="outline" className="bg-white/20 border-gray-200/30">
                          Close
                        </Button>
                      </DrawerClose>
                    </DrawerFooter>
                  </DrawerContent>
                </Drawer>
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
