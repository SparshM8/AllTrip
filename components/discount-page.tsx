import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';

const DiscountPage = () => {
  return (
<section className="relative w-full h-auto overflow-hidden container mx-auto rounded-2xl px-6 py-20">
      <div className="absolute inset-0 p-8">
        <div className="relative w-full h-full rounded-2xl overflow-hidden">
          <Image
            src="/discount.png"
            alt="Woman looking at hot air balloons"
            fill
            style={{ objectFit: 'cover' }}
            className="z-0"
          />
        </div>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-0 z-10" />
      <div className="relative z-20 flex flex-col items-start justify-center text-black dark:text-white p-3.5 md:p-14 w-full md:w-1/2">
        <h2 className="text-xl md:text-4xl font-bold leading-tight">
          Grab up to <span className="text-orange-500">35% off</span>
          <br />
          on your favorite
          <br />
          Destination
        </h2>
        <p className="mt-3.5 text-sm md:text-base">
          Limited time offer, don't miss the opportunity.
        </p>
        <div className="mt-5 md:mt-7 flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-3.5 py-2.5 text-sm md:px-7 md:py-3.5 md:text-base rounded-xl sm:rounded-l-xl sm:rounded-r-none flex-1"
          />
          <Button className="bg-orange-500 text-white hover:bg-orange-600 px-3.5 py-2.5 text-sm md:px-6 md:py-7 md:text-base rounded-xl sm:rounded-r-xl sm:rounded-l-none whitespace-nowrap">
            Get Your Coupon
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DiscountPage;
