import { useEffect } from 'react';

export function PreloadResources() {
  useEffect(() => {
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

    // Preload critical fonts
    const fontLink = document.createElement('link');
    fontLink.rel = 'preload';
    fontLink.as = 'font';
    fontLink.type = 'font/woff2';
    fontLink.crossOrigin = 'anonymous';
    fontLink.href = '/fonts/inter-var.woff2'; // Adjust path as needed
    document.head.appendChild(fontLink);

  }, []);

  return null;
}

export default PreloadResources;
