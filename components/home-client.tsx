"use client"

import React from "react"
import HeroShowcase from "@/components/hero-showcase"
import FeaturesSection from "@/components/features-section"
import DestinationsSection from "@/components/destinations-section"
import ItinerariesSection from "@/components/trips-section"
import DiscountPage from "@/components/discount-page"
import BookDetailsSection from "@/components/book-details-section"
import TestimonialsSection from "@/components/testimonials-section"
import StayRedirect from "@/components/stayredirect"
import ScrollOverlapSection from "@/components/scroll-overlap-section"

export default function HomeClient() {
  return (
    <>
      <HeroShowcase />
      <FeaturesSection />
      <DestinationsSection />
      <DiscountPage />
      <ItinerariesSection />
      <BookDetailsSection />
      <StayRedirect />
      <TestimonialsSection />
      <ScrollOverlapSection />
    </>
  )
}
