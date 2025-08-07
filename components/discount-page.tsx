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
      <div className="relative z-20 flex flex-col items-start justify-center h-full text-black p-8 md:p-16 w-full md:w-1/2">
        <h2 className="text-4xl md:text-5xl font-bold leading-tight">
          Grab up to <span className="text-orange-500">35% off</span>
          <br />
          on your favorite
          <br />
          Destination
        </h2>
        <p className="mt-4 text-lg">
          Limited time offer, don't miss the opportunity.
        </p>
        <div className="mt-8 flex items-stretch">
          <input
            type="email"
            placeholder="Enter your email"
            className="px-8 py-4 text-lg rounded-l-xl "
          />
          <Button className="bg-orange-500 text-white hover:bg-orange-600 px-7 py-8 text-lg rounded-r-xl">
            Get Your Coupon
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DiscountPage;
