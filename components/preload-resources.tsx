import { useEffect } from 'react';

export function PreloadResources() {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return;
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

    // Preload critical fonts (ensure file exists in production build)
    const fontHref = '/fonts/inter-var.woff2';
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    fontLink.href = fontHref;
    document.head.appendChild(fontLink);

  }, []);

  return null;
}

export default PreloadResources;
