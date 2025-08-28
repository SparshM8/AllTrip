import Image from 'next/image';
import React from 'react';
import { Button } from './ui/button';

const DiscountPage = () => {
  return (
<section className="relative w-full h-auto md:h-[400px] overflow-hidden container mx-auto my-0 rounded-2xl px-6">
      <div className="absolute inset-0">
        <Image
          src="/discount.png"
          alt="Woman looking at hot air balloons"
          fill
          style={{ objectFit: 'cover' }}
          className="z-0"
        />
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-0 z-10" />
      <div className="relative z-20 flex flex-col items-start justify-center h-full text-black dark:text-white p-4 md:p-16 w-full md:w-1/2">
        <h2 className="text-2xl md:text-5xl font-bold leading-tight">
          Grab up to <span className="text-orange-500">35% off</span>
          <br />
          on your favorite
          <br />
          Destination
        </h2>
        <p className="mt-4 text-base md:text-lg">
          Limited time offer, don't miss the opportunity.
        </p>
        <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-stretch gap-2 sm:gap-0">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-4 py-3 text-base md:px-8 md:py-4 md:text-lg rounded-xl sm:rounded-l-xl sm:rounded-r-none flex-1"
          />
          <Button className="bg-orange-500 text-white hover:bg-orange-600 px-4 py-3 text-base md:px-7 md:py-8 md:text-lg rounded-xl sm:rounded-r-xl sm:rounded-l-none whitespace-nowrap">
            Get Your Coupon
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DiscountPage;
