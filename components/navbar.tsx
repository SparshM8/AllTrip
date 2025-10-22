"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import { Menu, Sun, Moon, MessageCircle } from "lucide-react";
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
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import navLinksData from "@/data/nav-links.json";

const navLinks = navLinksData as { name: string; href: string }[];

const iconMap: Record<string, string> = {
  Home: "mdi:home",
  "About Us": "mdi:information",
  Destinations: "mdi:map-marker",
  Trips: "mdi:airplane",
  Checkout: "mdi:cart",
};

const Navbar: React.FC = () => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const lastScrollY = useRef(0);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const current = window.scrollY;
      if (current < lastScrollY.current) {
        setShowNavbar(true);
      } else if (current > lastScrollY.current && current > 50) {
        setShowNavbar(false);
      }
      lastScrollY.current = current;
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleTheme = () => setTheme(theme === "light" ? "dark" : "light");

  return (
    <header
      className={`transition-all duration-300 ease-in-out fixed top-0 left-0 right-0 z-50 ${
        showNavbar ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <nav className="backdrop-blur-md bg-black/55 dark:bg-black/55 border-b border-white/10 shadow-[0_2px_6px_rgba(0,0,0,0.4)] transition-colors">
        <div className="container mx-auto max-w-7xl flex items-center justify-between px-2 sm:px-4 py-2">
          {/* Logo */}
          <Link
            href="/"
            aria-label="AllTripp Home"
            className="font-bold text-lg sm:text-xl font-sans"
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

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <nav className="flex items-center gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.name}
                  variants={fadeInUp}
                  initial="initial"
                  animate="animate"
                  transition={{ delay: 0.05 * i }}
                >
                  <Link
                    href={link.href}
                    aria-current={pathname === link.href ? "page" : undefined}
                    className={`relative focusable text-sm tracking-wide uppercase text-white/70 transition-colors duration-300 group py-2 px-3 font-sans flex items-center gap-2 rounded-md ${
                      pathname === link.href ? "text-white" : "hover:text-white"
                    }`}
                  >
                    <Icon icon={iconMap[link.name]} className="w-5 h-5" />
                    {link.name}
                    <span
                      className={`absolute bottom-0 left-0 h-0.5 bg-[hsl(var(--brand-accent))] transition-all duration-300 rounded-full ${
                        pathname === link.href ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </Link>
                </motion.div>
              ))}
            </nav>
          </div>

          {/* Right side (desktop) */}
          <div className="hidden md:flex items-center gap-6">
            {mounted && (
              <motion.button
                variants={fadeInUp}
                initial="initial"
                animate="animate"
                transition={{ delay: 0.35 }}
                onClick={toggleTheme}
                aria-label="Toggle Dark Mode"
                className={`relative focusable inline-flex items-center w-12 h-6 rounded-full transition-all duration-300 hover:scale-105 ${theme === "light" ? "bg-[#FF8C00]" : "bg-[#1e40af]"}`}
              >
                <div className="absolute inset-0 flex items-center justify-between px-1">
                  <Sun className={`w-3 h-3 transition-opacity duration-300 ${theme === "light" ? "opacity-100 text-yellow-100" : "opacity-50 text-yellow-400"}`} />
                  <Moon className={`w-3 h-3 transition-opacity duration-300 ${theme === "dark" ? "opacity-100 text-blue-100" : "opacity-50 text-blue-600"}`} />
                </div>
                <div
                  className={`absolute w-4 h-4 bg-white rounded-full shadow-lg transform transition-transform duration-300 ${
                    theme === "light" ? "translate-x-1" : "translate-x-7"
                  }`}
                />
              </motion.button>
            )}
            <motion.div
              variants={fadeInUp}
              initial="initial"
              animate="animate"
              transition={{ delay: 0.45 }}
            >
              <Button
                asChild
                className="btn-gradient focusable text-white font-semibold px-4 py-1.5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300 border-0 hover:scale-105 font-sans"
              >
                <a
                  href="https://api.whatsapp.com/send/?phone=919266602470&text=Hi+AllTripp%2C+I+am+interested+in+planning+a+trip.+Can+you+help+me+with+the+details%3F&type=phone_number&app_absent=0"
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

          {/* Mobile Controls */}
          <div className="flex md:hidden items-center gap-3">
              {/* Drawer Trigger */}
              <Drawer open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
                <DrawerTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="focusable bg-white hover:bg-gray-50 border-gray-200 rounded-lg shadow-md"
                    aria-label="Toggle menu"
                  >
                    <Menu className="h-5 w-5 text-gray-700" />
                  </Button>
                </DrawerTrigger>
                <DrawerContent className="rounded-t-2xl border-t border-gray-200/20 bg-[#FDBE00] shadow-2xl">
                  <DrawerHeader className="text-center">
                    <DrawerTitle className="text-gray-800 text-xl font-bold">AllTripp</DrawerTitle>
                    <DrawerDescription className="text-gray-700">
                      Your Gateway to Amazing Adventures
                    </DrawerDescription>
                  </DrawerHeader>
                  <div className="flex flex-col gap-2 p-6">
                    {navLinks.map(link => (
                      <Link
                        key={link.name}
                        href={link.href}
                        aria-current={pathname === link.href ? "page" : undefined}
                        onClick={() => setIsDrawerOpen(false)}
                        className={`focusable text-lg font-medium text-gray-800 transition-all duration-300 hover:text-gray-600 text-center py-3 px-4 rounded-lg hover:bg-white/20 ${pathname === link.href ? 'bg-white/20' : ''}`}
                      >
                        {link.name}
                      </Link>
                    ))}
                    <div className="mt-4 pt-4 border-t border-gray-200/30">
                      <Button
                        asChild
                        className="w-full btn-gradient focusable text-white font-semibold py-3 rounded-xl shadow-md"
                      >
                        <a
                          href="https://api.whatsapp.com/send/?phone=919266602470&text=Hi+AllTripp%2C+I+am+interested+in+planning+a+trip.+Can+you+help+me+with+the+details%3F&type=phone_number&app_absent=0"
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
                      <Button variant="outline" className="focusable bg-white/20 border-gray-200/30">
                        Close
                      </Button>
                    </DrawerClose>
                  </DrawerFooter>
                </DrawerContent>
              </Drawer>
              <Button
                asChild
                size="sm"
                className="btn-gradient focusable text-white hover:opacity-95 font-medium px-3 py-1.5 rounded-lg shadow-md text-sm"
              >
                <a
                  href="https://api.whatsapp.com/send/?phone=919266602470&text=Hi+AllTripp%2C+I+am+interested+in+planning+a+trip.+Can+you+help+me+with+the+details%3F&type=phone_number&app_absent=0"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-1"
                >
                  <MessageCircle className="w-3 h-3" />
                  Book
                </a>
              </Button>
            {mounted && (
              <button
                onClick={toggleTheme}
                aria-label="Toggle Dark Mode"
                className={`relative focusable inline-flex items-center w-10 h-5 rounded-full transition-all duration-300 hover:scale-105 ${theme === "light" ? 'bg-[#FF8C00]' : 'bg-[#1e40af]'}`}
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
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
