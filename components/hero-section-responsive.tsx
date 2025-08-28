"use client";

import { useIsMobile } from "@/hooks/use-mobile";
import HeroSection from "@/components/hero-section";
import HeroSectionMobile from "@/components/hero-section-mobile";

export default function HeroSectionResponsive() {
  const isMobile = useIsMobile();

  // Show mobile version on screens smaller than 768px
  if (isMobile) {
    return <HeroSectionMobile />;
  }

  // Show desktop version on screens 768px and larger
  return <HeroSection />;
}