"use client";

import { useEffect } from 'react';
import { initPerformanceOptimizations } from '@/lib/performance-utils';

export default function ClientPerformance() {
  useEffect(() => {
    // Initialize performance optimizations on the client side
    initPerformanceOptimizations();
  }, []);

  // This component doesn't render anything
  return null;
}
