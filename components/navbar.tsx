"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Menu, Sun, Moon } from "lucide-react";
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
      className={`transition-transform duration-300 ease-in-out sticky top-0 z-50 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      } rounded-b-xl shadow-sm`}
      style={{ backgroundColor: '#FDBE00' }} // Using solid bright color without transparency
    >
      <div className="container mx-auto max-w-7xl flex items-center justify-between px-2 py-2 sm:px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center gap-2">
          <Link
            href="/"
            aria-label="AllTripp Home"
            className="font-bold text-xl"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-28 h-12 relative flex items-center justify-center">
                <Image
                  src="/logo.png"
                  alt="AllTripp Logo"
                  width={112}
                  height={48}
                  className="object-contain"
                  priority
                />
              </div>
            </motion.div>
          </Link>
        </div>

        {/* Desktop Navigation */}
        {isDesktop ? (
          <>
            <div className="flex items-center justify-center flex-1">
              <nav className="flex items-center gap-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    href={link.href}
                    className="text-base font-semibold text-gray-800 transition-colors hover:text-gray-600"
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
            </div>
            
            {/* Theme Toggle - Right Corner */}
            <div className="flex items-center">
              <button
                onClick={toggleTheme}
                aria-label="Toggle Dark Mode"
                className="relative inline-flex items-center w-16 h-8 rounded-full transition-colors duration-300 focus:outline-none"
                style={{
                  backgroundColor: theme === "light" ? "#FF8C00" : "#1e40af"
                }}
              >
                {/* Background Icons */}
                <div className="absolute inset-0 flex items-center justify-between px-2">
                  {/* Sun Icon */}
                  <div className={`transition-opacity duration-300 ${theme === "light" ? "opacity-100" : "opacity-50"}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                      <circle cx="12" cy="12" r="5"/>
                      <line x1="12" y1="1" x2="12" y2="3"/>
                      <line x1="12" y1="21" x2="12" y2="23"/>
                      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                      <line x1="1" y1="12" x2="3" y2="12"/>
                      <line x1="21" y1="12" x2="23" y2="12"/>
                      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                    </svg>
                  </div>
                  {/* Moon Icon */}
                  <div className={`transition-opacity duration-300 ${theme === "dark" ? "opacity-100" : "opacity-50"}`}>
                    <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-200">
                      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                      <circle cx="18" cy="6" r="1" className="text-white"/>
                      <circle cx="16" cy="4" r="0.5" className="text-white"/>
                      <circle cx="20" cy="8" r="0.5" className="text-white"/>
                    </svg>
                  </div>
                </div>
                
                {/* Toggle Circle */}
                <div
                  className={`absolute w-6 h-6 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
                    theme === "light" ? "translate-x-1" : "translate-x-9"
                  }`}
                />
              </button>
            </div>
          </>
        ) : (
          // Mobile Navigation: include both Theme Toggle and Drawer icon side by side
          <div className="flex items-center gap-2">
            {/* Mobile Theme Toggle */}
            <button
              onClick={toggleTheme}
              aria-label="Toggle Dark Mode"
              className="relative inline-flex items-center w-12 h-6 rounded-full transition-colors duration-300 focus:outline-none mr-2"
              style={{
                backgroundColor: theme === "light" ? "#FF8C00" : "#1e40af"
              }}
            >
              {/* Background Icons */}
              <div className="absolute inset-0 flex items-center justify-between px-1">
                {/* Sun Icon */}
                <div className={`transition-opacity duration-300 ${theme === "light" ? "opacity-100" : "opacity-50"}`}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-400">
                    <circle cx="12" cy="12" r="5"/>
                    <line x1="12" y1="1" x2="12" y2="3"/>
                    <line x1="12" y1="21" x2="12" y2="23"/>
                    <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/>
                    <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/>
                    <line x1="1" y1="12" x2="3" y2="12"/>
                    <line x1="21" y1="12" x2="23" y2="12"/>
                    <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"/>
                    <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"/>
                  </svg>
                </div>
                {/* Moon Icon */}
                <div className={`transition-opacity duration-300 ${theme === "dark" ? "opacity-100" : "opacity-50"}`}>
                  <svg width="8" height="8" viewBox="0 0 24 24" fill="currentColor" className="text-yellow-200">
                    <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
                  </svg>
                </div>
              </div>
              
              {/* Toggle Circle */}
              <div
                className={`absolute w-4 h-4 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
                  theme === "light" ? "translate-x-1" : "translate-x-7"
                }`}
              />
            </button>
            
            <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
              <DrawerTrigger asChild>
                <Button variant="outline" size="icon" aria-label="Toggle menu">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Toggle menu</span>
                </Button>
              </DrawerTrigger>
              <DrawerContent 
                className="rounded-b-xl shadow-sm"
                style={{ backgroundColor: '#FDBE00' }} // Using solid bright color without transparency
              >
                <DrawerHeader>
                  <DrawerTitle className="text-gray-800">AllTripp</DrawerTitle>
                  <DrawerDescription className="text-gray-700">
                    One Solution For All Your Travel Needs
                  </DrawerDescription>
                </DrawerHeader>
                <div className="flex flex-col gap-4 p-4">
                  {navLinks.map((link) => (
                    <Link
                      key={link.name}
                      href={link.href}
                      onClick={() => setIsDrawerOpen(false)}
                      className="text-base font-semibold text-gray-800 transition-colors hover:text-gray-600 text-center"
                    >
                      {link.name}
                    </Link>
                  ))}
                </div>
                <DrawerFooter>
                  <DrawerClose asChild>
                    <Button variant="outline">Close</Button>
                  </DrawerClose>
                </DrawerFooter>
              </DrawerContent>
            </Drawer>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
