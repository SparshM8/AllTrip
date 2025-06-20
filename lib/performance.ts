// Performance utilities for the website

export const SECTION_SPACING = {
  standard: 'py-20',
  small: 'py-12',
  large: 'py-24',
  none: 'py-0'
} as const;

export const CONTAINER_SPACING = {
  standard: 'px-6',
  small: 'px-4',
  large: 'px-8',
  none: 'px-0'
} as const;

// Performance optimization helpers
export const lazyLoadConfig = {
  rootMargin: '50px',
  threshold: 0.1,
};

export const imageOptimization = {
  sizes: '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
  quality: 85,
  placeholder: 'blur' as const,
  loading: 'lazy' as const,
};

// Common intersection observer options
export const intersectionOptions = {
  once: true,
  amount: 0.3,
} as const;

// Debounce utility for performance
export function debounce<T extends (...args: any[]) => void>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

// Throttle utility for scroll events
export function throttle<T extends (...args: any[]) => void>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
