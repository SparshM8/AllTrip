"use client";
import React, { useEffect } from 'react';

const InstagramSection = () => {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = "//www.instagram.com/embed.js";
    script.async = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    }
  }, []);

  return (
    <section className="py-12 md:py-20 bg-gradient-to-b from-yellow-100 to-transparent">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
          @AllTripp
        </h2>
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 justify-items-center" style={{ height: '800px', overflowY: 'auto' }}>
          <blockquote
            className="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink="https://www.instagram.com/reel/DEH9yk6ytjO/?utm_source=ig_embed&utm_campaign=loading"
            data-instgrm-version="14"
            style={{
              background: '#FFFFFF',
              border: '1px solid #e6e6e6',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              margin: '1px',
              width: '350px',
              height: '480px',
              padding: '0',
            }}
          ></blockquote>
          <blockquote
            className="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink="https://www.instagram.com/reel/DEpomBRyjWV/?utm_source=ig_embed&utm_campaign=loading"
            data-instgrm-version="14"
            style={{
              background: '#FFFFFF',
              border: '1px solid #e6e6e6',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              margin: '1px',
              width: '350px',
              height: '480px',
              padding: '0',
            }}
          ></blockquote>
          <blockquote
            className="instagram-media"
            data-instgrm-captioned
            data-instgrm-permalink="https://www.instagram.com/reel/DDM-rGWyWek/?utm_source=ig_embed&utm_campaign=loading"
            data-instgrm-version="14"
            style={{
              background: '#FFFFFF',
              border: '1px solid #e6e6e6',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
              margin: '1px',
              width: '350px',
              height: '480px',
              padding: '0',
            }}
          ></blockquote>
        </div>
      </div>
    </section>
  );
};

export default InstagramSection;
