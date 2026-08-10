import React, { useState, useEffect } from 'react';
import { TESTIMONIALS } from '../../data/mockData';
import { ArrowIcon, PlayIcon } from '../ui/Icons';

export const TestimonialsSection: React.FC = () => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const prevTestimonial = () =>
    setTestimonialIndex(i => (i - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  const nextTestimonial = () =>
    setTestimonialIndex(i => (i + 1) % TESTIMONIALS.length);

  return (
    <section id="testimonials" className="testimonials-wrapper" style={{ paddingTop: 40, paddingBottom: 60, paddingLeft: 60, paddingRight: 60, overflow: 'hidden' }}>
      <div style={{ textAlign: 'center', marginBottom: 48 }}>
        <h2
          className="testimonials-heading"
          style={{
            color: '#032517',
            fontSize: 52,
            fontFamily: 'Plus Jakarta Sans',
            fontWeight: '500',
            lineHeight: '56px',
            margin: 0,
          }}
        >
          Video Testimonials
        </h2>
      </div>

      {/* 3D Carousel Container */}
      <div style={{ position: 'relative', height: 520, display: 'flex', justifyContent: 'center', alignItems: 'center', marginBottom: 48, perspective: 1000 }}>
        {TESTIMONIALS.map((t, idx) => {
          // Calculate relative position (-1, 0, 1) handling array wrapping
          let diff = idx - testimonialIndex;
          if (diff < -1) diff += TESTIMONIALS.length;
          if (diff > 1) diff -= TESTIMONIALS.length;

          const isActive = diff === 0;
          const spreadFactor = isMobile ? 180 : 380;
          const translateX = diff * spreadFactor;
          const translateZ = isActive ? 0 : -100;
          const scale = isActive ? 1 : (isMobile ? 0.75 : 0.85);
          const opacity = isActive ? 1 : (isMobile ? 0.2 : 0.6);
          const zIndex = isActive ? 10 : 5;

          return (
            <div
              key={idx}
              onClick={() => setTestimonialIndex(idx)}
              className="testimonial-card"
              style={{
                position: 'absolute',
                width: 360,
                height: 520,
                borderRadius: 28,
                backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.10) 60%), url(${t.bg})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'flex-end',
                padding: 24,
                cursor: 'pointer',
                transform: `translateX(${translateX}px) translateZ(${translateZ}px) scale(${scale})`,
                opacity: opacity,
                zIndex: zIndex,
                transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)',
                overflow: 'hidden',
                boxShadow: isActive ? '0 20px 40px rgba(0,0,0,0.2)' : 'none',
              }}
            >
              {t.video && (
                <video
                  src={t.video}
                  autoPlay
                  loop
                  muted
                  playsInline
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    zIndex: 0,
                  }}
                />
              )}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  background: 'linear-gradient(0deg, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.15) 60%)',
                  zIndex: 1,
                }}
              />
              <div style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', height: '100%', justifyContent: 'flex-end' }}>
                <div style={{ display: 'flex', justifyContent: 'center', marginBottom: 24, transition: 'transform 0.3s', transform: isActive ? 'scale(1)' : 'scale(0.8)' }}>
                  <PlayIcon />
                </div>
                <div style={{ transform: isActive ? 'translateY(0)' : 'translateY(10px)', opacity: isActive ? 1 : 0.8, transition: 'all 0.6s cubic-bezier(0.25, 1, 0.5, 1)' }}>
                  <p
                    style={{
                      color: 'white',
                      fontSize: isActive ? 16 : 14,
                      fontFamily: 'Plus Jakarta Sans',
                      fontWeight: '400',
                      lineHeight: '24px',
                      margin: '0 0 12px',
                      fontStyle: 'italic',
                    }}
                  >
                    {t.quote}
                  </p>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.95)',
                      fontSize: isActive ? 14 : 12,
                      fontFamily: 'Plus Jakarta Sans',
                      fontWeight: '600',
                      margin: 0,
                    }}
                  >
                    {t.name}
                  </p>
                  <p
                    style={{
                      color: 'rgba(255,255,255,0.60)',
                      fontSize: isActive ? 12 : 10,
                      fontFamily: 'Plus Jakarta Sans',
                      fontWeight: '500',
                      margin: '4px 0 0',
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Testimonial controls */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 24 }}>
        <button
          onClick={prevTestimonial}
          style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid #14140F', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.05)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <ArrowIcon direction="left" color="#14140F" />
        </button>

        <div style={{ display: 'flex', gap: 8 }}>
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setTestimonialIndex(i)}
              style={{
                width: i === testimonialIndex ? 40 : 8,
                height: 8,
                borderRadius: 9999,
                background: i === testimonialIndex ? '#032517' : 'rgba(20,20,15,0.30)',
                border: 'none',
                cursor: 'pointer',
                padding: 0,
                transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
              }}
            />
          ))}
        </div>

        <button
          onClick={nextTestimonial}
          style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid #14140F', background: 'transparent', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', transition: 'background 0.2s' }}
          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.05)')}
          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
        >
          <ArrowIcon color="#14140F" />
        </button>
      </div>
    </section>
  );
};
