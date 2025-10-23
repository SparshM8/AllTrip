// Performance optimization utilities
export const preloadCriticalResources = () => {
  if (typeof window === 'undefined') return;

  // Preload critical images
  const criticalImages = [
    '/destinations/kerala.jpg',
    '/destinations/kashmir.jpg',
    '/destinations/rajasthan.jpg',
    '/himalayas.jpg',
  ];

  criticalImages.forEach((src) => {
    const link = document.createElement('link');
    link.rel = 'preload';
    link.as = 'image';
    link.href = src;
    document.head.appendChild(link);
  });
};

// Lazy load images using Intersection Observer
export const lazyLoadImages = () => {
  if (typeof window === 'undefined' || !('IntersectionObserver' in window)) {
    return;
  }

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target as HTMLImageElement;
        if (img.dataset.src) {
          img.src = img.dataset.src;
          img.classList.remove('lazy');
          observer.unobserve(img);
        }
      }
    });
  });

  document.querySelectorAll('img[data-src]').forEach((img) => {
    imageObserver.observe(img);
  });
};

// Remove unused CSS
export const removeUnusedCSS = () => {
  if (typeof window === 'undefined') return;

  // Remove unused stylesheets after page load
  window.addEventListener('load', () => {
    const stylesheets = document.querySelectorAll('link[rel="stylesheet"]');
    stylesheets.forEach((sheet) => {
      const link = sheet as HTMLLinkElement;
      if (link.href.includes('unused') || link.href.includes('optional')) {
        link.remove();
      }
    });
  });
};

// Optimize font loading
export const optimizeFonts = () => {
  if (typeof window === 'undefined') return;

  // Add font-display: swap to all font faces
  const style = document.createElement('style');
  style.textContent = `
    @font-face {
      font-display: swap;
    }
  `;
  document.head.appendChild(style);
};

// Service Worker for caching
export const registerServiceWorker = () => {
  if (typeof window === 'undefined' || !('serviceWorker' in navigator)) {
    return;
  }

  window.addEventListener('load', () => {
    // Verify that sw.js is available before attempting to register
    fetch('/sw.js', { method: 'HEAD' })
      .then((res) => {
        if (!res.ok) return;
        navigator.serviceWorker
          .register('/sw.js')
          .then((registration) => {
            const nodeEnv = (globalThis as any)?.process?.env?.NODE_ENV;
            if (nodeEnv !== 'production') {
              console.log('SW registered: ', registration.scope);
            }
          })
          .catch((registrationError) => {
            const nodeEnv = (globalThis as any)?.process?.env?.NODE_ENV;
            if (nodeEnv !== 'production') {
              console.warn('SW registration failed: ', registrationError);
            }
          });
      })
      .catch(() => {
        // No service worker found; skip registration
      });
  });
};

// Prefetch next page resources
export const prefetchResources = (urls: string[]) => {
  if (typeof window === 'undefined') return;

  urls.forEach((url) => {
    const link = document.createElement('link');
    link.rel = 'prefetch';
    link.href = url;
    document.head.appendChild(link);
  });
};

// Initialize all performance optimizations
export const initPerformanceOptimizations = () => {
  preloadCriticalResources();
  lazyLoadImages();
  removeUnusedCSS();
  optimizeFonts();
  registerServiceWorker();
  
  // Prefetch likely next pages
  prefetchResources([
    '/blog',
    '/packages',
    '/destinations',
    '/contact'
  ]);
};
