"use client";

import Link from "next/link";
import dynamic from "next/dynamic";
import { Mail, Phone, MapPin } from "lucide-react";
import { trackCta, trackEvent } from "@/lib/analytics";
import { SiInstagram, SiFacebook, SiLinkedin } from "react-icons/si";
import { IconBrandWhatsapp } from "@tabler/icons-react";
import { motion } from "framer-motion";

// Dynamically import DotLottieReact so it only loads on the client.
const DotLottieReactDynamic = dynamic(
  () =>
    import("@lottiefiles/dotlottie-react").then((mod) => mod.DotLottieReact),
  { ssr: false }
);

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white overflow-hidden">
      <div className="container px-4 md:px-8 py-16">
        <div className="grid gap-10 md:grid-cols-5">
          {/* Branding */}
          <div className="flex flex-col items-start gap-4 md:col-span-1">
            <h3 className="text-2xl font-bold mb-2">Follow Us</h3>
            <div className="flex gap-4 mb-4">
              <motion.a
                href="https://www.instagram.com/alltripp_/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 10 }}
                whileTap={{ scale: 0.95 }}
                className="text-yellow-400 hover:text-yellow-300 transition-colors drop-shadow-lg"
                aria-label="Instagram"
              >
                <SiInstagram className="h-7 w-7" />
              </motion.a>
              <motion.a
                href="https://www.facebook.com/people/AllTripp/61569322995221/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: -10 }}
                whileTap={{ scale: 0.95 }}
                className="text-yellow-400 hover:text-yellow-300 transition-colors drop-shadow-lg"
                aria-label="Facebook"
              >
                <SiFacebook className="h-7 w-7" />
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/company/alltripp/?originalSubdomain=in"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, rotate: 8 }}
                whileTap={{ scale: 0.95 }}
                className="text-yellow-400 hover:text-yellow-300 transition-colors drop-shadow-lg"
                aria-label="LinkedIn"
              >
                <SiLinkedin className="h-7 w-7" />
              </motion.a>
            </div>
            <div className="flex justify-start">
              <a
                href="https://wa.me/919266602470?text=Hi%20AllTripp%2C%20I%20am%20interested%20in%20planning%20a%20trip.%20Can%20you%20help%20me%20with%20the%20details%3F"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackCta('whatsapp_book_trip', 'footer')}
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-500 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all duration-300 text-base"
              >
                <IconBrandWhatsapp className="h-6 w-6" />
                Book Your Trip
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col gap-2 md:col-span-1">
            <h3 className="text-lg font-semibold mb-2">Quick Links</h3>
            <ul className="space-y-1">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-white transition-colors">About Us</Link>
              </li>
              <li>
                <Link href="#destinations" className="text-gray-400 hover:text-white transition-colors">Destinations</Link>
              </li>
              <li>
                <Link href="#trips" className="text-gray-400 hover:text-white transition-colors">Trips</Link>
              </li>
              <li>
                <Link href="#campus" className="text-gray-400 hover:text-white transition-colors">Campus Ambassador</Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="flex flex-col gap-2 md:col-span-1">
            <h3 className="text-lg font-semibold mb-2">Contact Us</h3>
            <ul className="space-y-1 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">alltrippofficial@gmail.com</span>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">+91 9266602470</span>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-gray-400" />
                <span className="text-gray-400">New Delhi, India</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="flex flex-col gap-3 md:col-span-2 bg-gray-800 rounded-2xl p-6 md:ml-8 mt-8 md:mt-0">
            <h3 className="text-lg font-semibold mb-2">Subscribe to our Newsletter</h3>
            <p className="text-gray-400 text-sm mb-2">
              Get the latest travel updates, offers, and inspiration delivered to your inbox.
            </p>
            <form
              className="flex flex-col sm:flex-row gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                const form = e.currentTarget;
                const emailInput = form.querySelector('input[type="email"]') as HTMLInputElement | null;
                trackEvent('newsletter_subscribe_attempt', { emailPresent: !!emailInput?.value });
                // In a future enhancement you'd call an API here then track success/failure
              }}
            >
              <input
                type="email"
                required
                placeholder="Your email address"
                className="rounded-lg px-4 py-2 text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400 flex-1"
              />
              <button
                type="submit"
                className="bg-yellow-400 hover:bg-yellow-300 text-gray-900 font-bold px-6 py-2 rounded-lg transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>

          
        </div>
      </div>
      <div className="py-8 border-t border-gray-800 text-center text-gray-400 text-sm">
        <p>&copy; {new Date().getFullYear()} AllTripp. All rights reserved.</p>
      </div>
    </footer>
  );
}
