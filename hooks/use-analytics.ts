"use client";

import { useEffect } from 'react';
import { track } from '@vercel/analytics';

interface PerformanceMetrics {
  lcp?: number;
  fid?: number;
  cls?: number;
  ttfb?: number;
}

export function usePerformanceTracking() {
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const metrics: PerformanceMetrics = {};
    
    // Track performance metrics
    const observer = new PerformanceObserver((list) => {
      for (const entry of list.getEntries()) {
        switch (entry.entryType) {
          case 'largest-contentful-paint':
            metrics.lcp = entry.startTime;
            track('performance', { metric: 'LCP', value: Math.round(entry.startTime) });
            break;
            
          case 'first-input':
            const fidEntry = entry as any;
            const fidValue = fidEntry.processingStart - fidEntry.startTime;
            metrics.fid = fidValue;
            track('performance', { metric: 'FID', value: Math.round(fidValue) });
            break;
            
          case 'layout-shift':
            const clsEntry = entry as any;
            if (!clsEntry.hadRecentInput) {
              metrics.cls = (metrics.cls || 0) + clsEntry.value;
              if (metrics.cls !== undefined) {
                track('performance', { metric: 'CLS', value: Math.round(metrics.cls * 1000) / 1000 });
              }
            }
            break;
            
          case 'navigation':
            const navEntry = entry as any;
            const ttfbValue = navEntry.responseStart - navEntry.fetchStart;
            metrics.ttfb = ttfbValue;
            track('performance', { metric: 'TTFB', value: Math.round(ttfbValue) });
            break;
        }
      }
    });

    try {
      observer.observe({ entryTypes: ['largest-contentful-paint', 'first-input', 'layout-shift', 'navigation'] });
    } catch (error) {
      console.warn('Performance Observer not fully supported:', error);
    }

    // Track page load time
    window.addEventListener('load', () => {
      const loadTime = performance.now();
      track('performance', { metric: 'Load_Time', value: Math.round(loadTime) });
    });

    return () => {
      observer.disconnect();
    };
  }, []);
}

// Custom analytics tracking for user interactions
export function trackBlogInteraction(action: string, blogSlug: string) {
  try {
    track('blog_interaction', { action, blog_slug: blogSlug });
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
  }
}

export function trackPageView(page: string) {
  try {
    track('page_view', { page });
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
  }
}

export function trackFeatureUsage(feature: string) {
  try {
    track('feature_usage', { feature });
  } catch (error) {
    console.warn('Analytics tracking failed:', error);
  }
}

export default usePerformanceTracking;
