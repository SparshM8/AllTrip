"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

type Slide = {
  title: string; // e.g., "Visit Kashmir"
  subtitle?: string;
  image: string; // public path
  href?: string;
};

const slides: Slide[] = [
  {
    title: "Visit Kashmir",
    subtitle: "Snow peaks, shikara rides and Mughal gardens",
    image: "/destinations/kashmir.jpg",
    href: "/destinations/kashmir",
  },
  {
    title: "Explore Goa",
    subtitle: "Golden beaches, vibrant nights, endless sunsets",
    image: "/destinations/goa.jpg",
    href: "/destinations/goa",
  },
  {
    title: "Royal Rajasthan",
    subtitle: "Palaces, deserts and living heritage",
    image: "/destinations/rajasthan.jpg",
    href: "/destinations/rajasthan",
  },
];

export default function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);
  const goTo = (i: number) => setIndex(i);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => next(), 6000);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [index]);

  const current = slides[index];

  return (
  <section className="relative h-[82vh] md:h-[90vh] w-full overflow-hidden bg-black">
      {/* Background image */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.image}
            initial={{ opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.03 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute inset-0"
          >
            <Image
              src={current.image}
              alt={current.title}
              fill
              priority
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>

        {/* Cinematic overlay */}
        <div className="absolute inset-0 bg-black/55" />
        {/* Subtle vignette */}
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0)_55%,rgba(0,0,0,0.55))]" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full container mx-auto px-6 md:px-12 lg:px-20">
        <div className="h-full grid grid-cols-12 items-center">
          {/* Left: Title and CTA */}
          <div className="col-span-12 md:col-span-8 lg:col-span-7">
            <motion.h1
              key={current.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="heading-display text-white uppercase tracking-tight leading-[0.9] drop-shadow-[0_4px_12px_rgba(0,0,0,0.55)]"
            >
              {current.title}
            </motion.h1>
            {current.subtitle ? (
              <motion.p
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="mt-6 max-w-xl text-white/80 text-base md:text-lg font-medium"
              >
                {current.subtitle}
              </motion.p>
            ) : null}

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-10 flex items-center gap-5"
            >
              <Link
                href={current.href || "#"}
                className="inline-flex items-center gap-2 px-7 py-3 rounded-lg bg-white/10 backdrop-blur-sm border border-white/15 text-white font-semibold hover:bg-white/15 transition shadow-sm"
              >
                Explore destination
              </Link>
              <button
                type="button"
                onClick={prev}
                aria-label="Previous slide"
                className="hidden md:inline-flex w-12 h-12 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md transition items-center justify-center"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                type="button"
                onClick={next}
                aria-label="Next slide"
                className="hidden md:inline-flex w-12 h-12 rounded-full bg-white/90 hover:bg-white text-gray-800 shadow-md transition items-center justify-center"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </motion.div>
          </div>

          {/* Right: Vertical pagination */}
          <div className="col-span-12 md:col-span-4 lg:col-span-5 flex md:justify-end mt-14 md:mt-0">
            <div className="flex md:flex-col gap-5 text-white/70 pr-2">
              {slides.map((s, i) => (
                <button
                  type="button"
                  key={s.title}
                  onClick={() => goTo(i)}
                  className="group inline-flex items-center md:justify-end gap-3"
                  aria-label={`Go to slide ${i + 1}`}
                >
                  <span className={`text-xs font-medium tabular-nums tracking-wide ${i === index ? "text-white" : "text-white/50"}`}>
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`hidden md:block h-px w-14 transition-all ${i === index ? "bg-white w-20" : "bg-white/25"}`}
                  />
                  <span className={`hidden md:block text-xs tracking-wide ${i === index ? "text-white" : "text-white/50"}`}>{s.title}</span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom accent divider */}
      <div className="absolute bottom-0 left-0 w-full h-[3px] bg-gradient-to-r from-[hsl(var(--brand-accent))] via-transparent to-transparent opacity-70" />
    </section>
  );
}
