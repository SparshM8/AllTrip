"use client";
import React, { useState, useEffect, useRef } from 'react';

const InstagramSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const reels = [
    "https://www.instagram.com/reel/DEH9yk6ytjO/?utm_source=ig_embed&utm_campaign=loading",
    "https://www.instagram.com/reel/DDM-rGWyWek/?utm_source=ig_embed&utm_campaign=loading",
    "https://www.instagram.com/reel/DEpomBRyjWV/?utm_source=ig_embed&utm_campaign=loading",
  ];

useEffect(() => {
    const playCurrentVideo = () => {
      if (videoRefs.current[currentIndex]) {
        videoRefs.current[currentIndex].play();
      }
    };

    playCurrentVideo();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reels.length);
    }, 15000); // Move to next reel every 15 seconds

    return () => clearInterval(interval);
  }, [currentIndex, reels.length]);

  return (
    <div className="carousel-container flex overflow-x-scroll snap-x snap-mandatory">
      {reels.map((reel, index) => (
        <div
          key={index}
          className={`carousel-item snap-center flex-shrink-0 w-full ${
            index === currentIndex ? "scale-110" : "scale-90"
          } transition-transform duration-300`}
        >
          <video
            ref={(el) => {
              if (el) {
                videoRefs.current[index] = el;
              }
            }}
            src={reel}
            muted
            className="w-full h-auto"
          />
        </div>
      ))}
    </div>
  );
};

export default InstagramSection;
