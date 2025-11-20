"use client";

import { useRef, useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { motion, useInView, AnimatePresence, useReducedMotion } from "framer-motion";
import { ChevronUp, ChevronDown, Star } from "lucide-react";
import testimonialsData from "@/data/testimonials.json";
import { useIsMobile } from "@/hooks/use-mobile";
import { jsonLdScript } from "@/lib/seo";

const testimonials = testimonialsData;

const testimonialImages: { [key: string]: string } = {
  "Priya Sharma": "/testimonials/priya-sharma.jpg",
  "Rahul Mehta": "/testimonials/rahul-mehta.jpg",
  "Ananya Patel": "/testimonials/ananya-patel.jpg",
  "Vikram Singh": "/testimonials/vikram-singh.jpg",
};

export default function TestimonialsSection() {
  const ref = useRef<HTMLDivElement | null>(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [direction, setDirection] = useState(0);
  const isMobile = useIsMobile();
  const reduceMotion = useReducedMotion();
  const [isFocused, setIsFocused] = useState(false);
  const [startX, setStartX] = useState<number | null>(null);
  const [progress, setProgress] = useState(0); // 0..100 autoplay indicator

  const len = testimonials.length;
  const idx1 = len > 0 ? currentIndex % len : 0;
  const idx2 = len > 0 ? (currentIndex + 1) % len : 0;

  const averageRating = useMemo(() => {
    if (len === 0) return 0;
    const sum = testimonials.reduce((acc: number, t: any) => acc + (t.rating || 0), 0);
    return Math.round((sum / len) * 10) / 10;
  }, [len]);

  useEffect(() => {
    if (reduceMotion || isHovered || isFocused || len === 0) return;
    const id = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (len === 0 ? 0 : (prev + 1) % len));
    }, 5000);
    return () => clearInterval(id);
  }, [reduceMotion, isHovered, isFocused, len]);

  // Autoplay progress indicator
  useEffect(() => {
    setProgress(0);
    if (reduceMotion || isHovered || isFocused || len === 0) return;
    const start = Date.now();
    const duration = 5000;
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      const pct = Math.min(100, (elapsed / duration) * 100);
      setProgress(pct);
      if (pct >= 100) clearInterval(id);
    }, 100);
    return () => clearInterval(id);
  }, [currentIndex, reduceMotion, isHovered, isFocused, len]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } },
  };

  const slideVariants = {
    enter: { x: 300, opacity: 0, scale: 0.8 },
    center: { x: 0, opacity: 1, scale: 1 },
    exit: { x: -300, opacity: 0, scale: 0.8 },
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (len === 0 ? 0 : (prev + 1) % len));
  };
  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (len === 0 ? 0 : (prev - 1 + len) % len));
  };

  const totalPages = Math.max(1, len);

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "ArrowLeft" || e.key === "ArrowUp") {
      e.preventDefault();
      handlePrev();
    } else if (e.key === "ArrowRight" || e.key === "ArrowDown") {
      e.preventDefault();
      handleNext();
    }
  };

  const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    setStartX(e.changedTouches[0].clientX);
  };
  const onTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    if (startX == null) return;
    const dx = e.changedTouches[0].clientX - startX;
    if (Math.abs(dx) > 30) {
      dx < 0 ? handleNext() : handlePrev();
    }
    setStartX(null);
  };

// Inject small CSS for testimonial progress fill (width via data-p attribute)
if (typeof document !== 'undefined' && !document.getElementById('testimonials-progress-styles')) {
  const s = document.createElement('style');
  s.id = 'testimonials-progress-styles';
  s.textContent = `
    .testimonials-progress{ transition: width .1s linear; background: hsl(var(--brand-accent)); height:100%; }
    ${Array.from({length:101}, (_,i)=>`.testimonials-progress[data-p='${i}']{width:${i}%;}`).join('')}
  `;
  document.head.appendChild(s);
}

  const avatarSrc = (name?: string) => {
    const src = name ? testimonialImages[name] : undefined;
    return src || "/testimonials/default.jpg";
  };

  const Stars = ({ value }: { value?: number }) => {
    const v = Math.max(0, Math.min(5, value || 0));
    return (
      <div className="flex items-center gap-0.5" aria-label={`${v} out of 5 stars`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={i < v ? "w-4 h-4 text-yellow-400 fill-yellow-400" : "w-4 h-4 text-white/30"} />
        ))}
      </div>
    );
  };

  return (
    <section
      id="testimonials"
      ref={ref}
      className="section-spacing bg-[hsl(var(--surface-base))]"
      role="region"
      aria-label="Customer testimonials"
    >
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        className="container mx-auto px-4 sm:px-6 md:px-16 lg:px-20"
      >
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-start mb-8 gap-8">
          <motion.div variants={itemVariants}>
            <p className="text-xs tracking-[0.25em] text-dim font-medium uppercase mb-2">TESTIMONIALS</p>
            <h2 className="heading-display text-balance">What people say<br />about Us.</h2>
            {len > 0 && (
              <div className="mt-3 flex items-center gap-2 text-sm text-white/80">
                <Stars value={averageRating} />
                <span>
                  {averageRating} average • {len} review{len !== 1 ? "s" : ""}
                </span>
              </div>
            )}
          </motion.div>

          <motion.div variants={itemVariants} className="flex lg:flex-col gap-4 items-center lg:items-end">
            <div className="flex lg:flex-col gap-3">
              <button onClick={handlePrev} className="card-modern w-8 h-8 flex items-center justify-center rounded-full" aria-label="Previous testimonial" type="button">
                <ChevronUp className="w-4 h-4 text-white/80" strokeWidth={2} />
              </button>
              <button onClick={handleNext} className="card-modern w-8 h-8 flex items-center justify-center rounded-full" aria-label="Next testimonial" type="button">
                <ChevronDown className="w-4 h-4 text-white/80" strokeWidth={2} />
              </button>
            </div>
            <div className="flex lg:flex-col gap-3 lg:ml-2">
              {Array.from({ length: totalPages }).map((_, index) => (
                <button
                  type="button"
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  aria-label={`Go to testimonial ${index + 1}`}
                  title={`Go to testimonial ${index + 1}`}
                  aria-current={index === currentIndex ? 'true' : undefined}
                  className={`w-3.5 h-3.5 rounded-full transition-transform duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-[hsl(var(--brand-accent))] ${index === currentIndex ? 'bg-[hsl(var(--brand-accent))] scale-110' : 'bg-white/15 hover:bg-white/25'}`}
                />
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-8 outline-none"
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          tabIndex={0}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onKeyDown={onKeyDown}
          onTouchStart={onTouchStart}
          onTouchEnd={onTouchEnd}
          aria-roledescription="carousel"
        >
          {!reduceMotion && (
            <div className="col-span-full h-0.5 bg-white/10 rounded overflow-hidden" aria-hidden="true">
              <div
                className="h-full transition-all duration-100 testimonials-progress"
                data-p={Math.max(0, Math.min(100, Math.round(progress)))}
              />
            </div>
          )}
          {/* Left card */}
          <motion.div variants={itemVariants} className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={`left-${idx1}`} custom={direction} variants={slideVariants} initial={reduceMotion ? false : "enter"} animate={reduceMotion ? "center" : "center"} exit={reduceMotion ? undefined : "exit"} transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.4 }, scale: { duration: 0.4 } }} className="relative">
                {isMobile ? (
                  <motion.div className="card-modern rounded-xl p-6 transition-all duration-300 hover:-translate-y-2" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                    <div className="flex flex-col items-center">
                      {len > 0 && testimonials[idx1] && (
                        <motion.div className="mb-4" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                          <div className="w-[80px] h-[80px] rounded-full overflow-hidden border-2 border-white dark:border-gray-700 shadow-lg">
                            <Image src={avatarSrc(testimonials[idx1]?.name)} alt={testimonials[idx1]?.name || "User"} width={80} height={80} loading="lazy" className="object-cover w-full h-full transition-transform duration-300 hover:scale-110" placeholder="empty" />
                          </div>
                        </motion.div>
                      )}
                      <blockquote className="text-sm leading-7 text-white/80 mb-3 text-center max-w-prose">
                        "{testimonials[idx1]?.testimonial}"
                      </blockquote>
                      <Stars value={testimonials[idx1]?.rating} />
                      <div className="sr-only" role="status" aria-live="polite">
                        {testimonials[idx1]?.name} from {testimonials[idx1]?.location}
                      </div>
                      <div className="text-center">
                        <cite className="font-semibold text-sm md:text-base lg:text-lg text-white not-italic block tracking-wide">
                          {testimonials[idx1]?.name}
                        </cite>
                        <p className="text-dim text-xs mt-1">
                          From {testimonials[idx1]?.location}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {len > 0 && testimonials[idx1] && (
                      <motion.div className="absolute -left-6 top-0 z-10" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                        <div className="w-[60px] h-[60px] rounded-full overflow-hidden ring-2 ring-white/10">
                          <Image src={avatarSrc(testimonials[idx1]?.name)} alt={testimonials[idx1]?.name || "User"} width={68} height={68} loading="lazy" className="object-cover w-full h-full transition-transform duration-300 hover:scale-110" placeholder="empty" />
                        </div>
                      </motion.div>
                    )}
                    <motion.div className="card-modern rounded-xl p-8 pl-16 transition-all duration-300 hover:-translate-y-2" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                      <blockquote className="text-sm leading-7 text-white/80 mb-3 max-w-prose">
                        "{testimonials[idx1]?.testimonial}"
                      </blockquote>
                      <Stars value={testimonials[idx1]?.rating} />
                      <div>
                        <cite className="font-semibold text-base lg:text-lg text-white not-italic block tracking-wide">
                          {testimonials[idx1]?.name}
                        </cite>
                        <p className="text-dim text-xs mt-1">
                          From {testimonials[idx1]?.location}
                        </p>
                      </div>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* Right card */}
          <motion.div variants={itemVariants} className="relative">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div key={`right-${idx2}`} custom={direction} variants={slideVariants} initial={reduceMotion ? false : "enter"} animate={reduceMotion ? "center" : "center"} exit={reduceMotion ? undefined : "exit"} transition={{ x: { type: 'spring', stiffness: 300, damping: 30 }, opacity: { duration: 0.4 }, scale: { duration: 0.4 } }} className="relative">
                {isMobile ? (
                  <motion.div className="card-modern rounded-xl p-6 transition-all duration-300 hover:-translate-y-2" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                    <div className="flex flex-col items-center">
                      {len > 0 && testimonials[idx2] && (
                        <motion.div className="mb-4" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                          <div className="w-[80px] h-[80px] rounded-full overflow-hidden border border-white/10 shadow-lg">
                             <Image src={avatarSrc(testimonials[idx2]?.name)} alt={testimonials[idx2]?.name || "User"} width={80} height={80} loading="lazy" className="object-cover w-full h-full transition-transform duration-300 hover:scale-110" placeholder="empty" />
                          </div>
                        </motion.div>
                      )}
                      <blockquote className="text-sm leading-7 text-white/80 mb-3 text-center max-w-prose">
                        "{testimonials[idx2]?.testimonial}"
                      </blockquote>
                      <Stars value={testimonials[idx2]?.rating} />
                      <div className="text-center">
                        <cite className="font-semibold text-sm md:text-base lg:text-lg text-white not-italic block tracking-wide">
                          {testimonials[idx2]?.name}
                        </cite>
                        <p className="text-dim text-xs mt-1">
                          From {testimonials[idx2]?.location}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ) : (
                  <>
                    {len > 0 && testimonials[idx2] && (
                      <motion.div className="absolute -left-6 top-0 z-10" whileHover={{ scale: 1.1 }} transition={{ duration: 0.3 }}>
                        <div className="w-[60px] h-[60px] rounded-full overflow-hidden ring-2 ring-white/10">
                            <Image src={avatarSrc(testimonials[idx2]?.name)} alt={testimonials[idx2]?.name || "User"} width={68} height={68} loading="lazy" className="object-cover w-full h-full transition-transform duration-300 hover:scale-110" placeholder="empty" />
                        </div>
                      </motion.div>
                    )}
                    <motion.div className="card-modern rounded-xl p-8 pl-16 transition-all duration-300 hover:-translate-y-2" whileHover={{ scale: 1.02 }} transition={{ duration: 0.3 }}>
                      <blockquote className="text-sm leading-7 text-white/80 mb-3 max-w-prose">
                        "{testimonials[idx2]?.testimonial}"
                      </blockquote>
                      <Stars value={testimonials[idx2]?.rating} />
                      <div>
                        <cite className="font-semibold text-base lg:text-lg text-white not-italic block tracking-wide">
                          {testimonials[idx2]?.name}
                        </cite>
                        <p className="text-dim text-xs mt-1">
                          From {testimonials[idx2]?.location}
                        </p>
                      </div>
                    </motion.div>
                  </>
                )}
              </motion.div>
            </AnimatePresence>
          </motion.div>
        </motion.div>
      
        {/* JSON-LD: Organization with AggregateRating and individual reviews */}
        {len > 0 && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={jsonLdScript({
              '@context': 'https://schema.org',
              '@type': 'Organization',
              name: 'AllTripp',
              aggregateRating: {
                '@type': 'AggregateRating',
                ratingValue: averageRating,
                reviewCount: len,
                bestRating: 5,
                worstRating: 1,
              },
              review: testimonials.map((t: any) => ({
                '@type': 'Review',
                author: { '@type': 'Person', name: t.name },
                reviewBody: t.testimonial,
                reviewRating: { '@type': 'Rating', ratingValue: t.rating, bestRating: 5, worstRating: 1 },
              })),
            })}
          />
        )}
      </motion.div>
    </section>
  );
}
// End Testimonials Section
