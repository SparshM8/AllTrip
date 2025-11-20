"use client";
import Image from 'next/image';
import { getBlurData } from '@/lib/blur-data';
import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const DiscountPage = () => {
  return (
    <section className="relative w-full overflow-hidden section-spacing">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-2xl overflow-hidden shadow-xl ring-1 ring-white/10 bg-[hsl(var(--surface-alt))]">
          {/* Background image */}
          <Image
            src="/discount.png"
            alt="Woman looking at hot air balloons"
            fill
            className="object-cover opacity-70 mix-blend-luminosity"
            priority
            placeholder="blur"
            blurDataURL={getBlurData('/discount.png')}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/60 to-black/20" />

          {/* Content */}
          <div className="relative z-10 p-8 sm:p-12 lg:p-16 text-white max-w-xl">
            <h2 className="heading-display text-white/90">
              Grab up to <span className="text-[--brand-accent]">35% off</span><br />on your favourite<br />Destination
            </h2>
            <p className="mt-5 text-sm sm:text-base text-white/70 max-w-prose leading-relaxed">
              Limited time offer. Don&apos;t miss the opportunity.
            </p>

            {/* Subscribe form */}
            <form
              className="mt-8 grid grid-cols-1 sm:grid-cols-[1fr_auto] gap-3 sm:gap-2 card-modern p-2 bg-white/5 backdrop-blur-md"
              onSubmit={(e) => e.preventDefault()}
              aria-label="Get discount coupon"
            >
              <label htmlFor="discount-email" className="sr-only">
                Email address
              </label>
              <Input
                id="discount-email"
                type="email"
                inputMode="email"
                placeholder="Enter your email"
                required
                className="bg-white/10 text-white placeholder:text-white/40 border-0 focus-visible:ring-0 focus:outline-none"
                aria-label="Email address"
              />
              <Button
                type="submit"
                className="focusable relative overflow-hidden rounded-lg px-6 py-2.5 font-semibold tracking-wide text-sm bg-[hsl(var(--brand-accent))] text-black transition-all duration-300 hover:shadow-[0_0_0_1px_rgba(255,255,255,0.15),0_4px_24px_-4px_rgba(0,0,0,0.4)] group"
                aria-label="Get your coupon"
                title="Get your coupon"
              >
                <span className="relative z-10">Get Your Coupon</span>
                {/* Sheen */}
                <span className="pointer-events-none absolute inset-0 before:absolute before:top-0 before:left-[-60%] before:h-full before:w-[50%] before:translate-x-0 before:rotate-12 before:bg-gradient-to-r before:from-white/0 before:via-white/50 before:to-white/0 before:opacity-0 before:transition-transform before:duration-700 before:ease-out group-hover:before:translate-x-[220%] group-hover:before:opacity-70" />
                {/* Glow underline */}
                <span className="pointer-events-none absolute -bottom-px left-0 w-full h-px bg-gradient-to-r from-transparent via-black/40 to-transparent" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DiscountPage;
