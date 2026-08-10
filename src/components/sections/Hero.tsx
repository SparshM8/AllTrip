import React from 'react';
import heroImg from '../../assets/Container.webp';
import { ArrowIcon } from '../ui/Icons';

export const Hero: React.FC = () => {
  return (
    <section id="home" style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 20 }}>
      <div
        style={{
          width: '100%',
          height: 640,
          borderRadius: 24,
          backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.30) 0%, rgba(0,0,0,0.15) 100%), url(${heroImg})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 24,
        }}
      >
        {/* Badge */}
        <div
          style={{
            paddingLeft: 16,
            paddingRight: 16,
            paddingTop: 6,
            paddingBottom: 6,
            background: '#C7EBD4',
            borderRadius: 9999,
          }}
        >
          <span
            style={{
              color: '#2D4D3C',
              fontSize: 13,
              fontFamily: 'Plus Jakarta Sans',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: 1.4,
              lineHeight: '20px',
            }}
          >
            Alpine Modern Luxury
          </span>
        </div>

        {/* Headline */}
        <h1
          style={{
            maxWidth: 900,
            textAlign: 'center',
            color: 'white',
            fontSize: 72,
            fontFamily: 'Space Grotesk',
            fontWeight: '500',
            lineHeight: '76px',
            textShadow: '0px 4px 4px rgba(0,0,0,0.25)',
            margin: 0,
          }}
        >
          Discover the world's finest travel experiences
        </h1>

        {/* Buttons */}
        <div style={{ display: 'flex', gap: 10 }}>
          <a
            href="https://wa.me/919266602470?text=Hi%20Alltripp%20Team,%20I%20would%20like%20to%20book%20a%20demo."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              height: 48,
              paddingLeft: 24,
              paddingRight: 20,
              background: '#084028',
              boxShadow: '0px 0px 4px rgba(0,0,0,0.25)',
              borderRadius: 26,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              textDecoration: 'none',
              transition: 'background 0.2s',
            }}
          >
            <span style={{ color: 'white', fontSize: 14, fontFamily: 'Plus Jakarta Sans', fontWeight: '500' }}>
              Book a demo
            </span>
            <ArrowIcon />
          </a>

          <button
            style={{
              height: 48,
              paddingLeft: 24,
              paddingRight: 20,
              background: 'transparent',
              boxShadow: '0px 4px 4px rgba(0,0,0,0.25)',
              borderRadius: 26,
              border: '1px solid white',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}
          >
            <span style={{ color: 'white', fontSize: 14, fontFamily: 'Plus Jakarta Sans', fontWeight: '500' }}>
              Explore our product
            </span>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M9 14.25L14.25 9M14.25 9L9 3.75M14.25 9H3.75"
                stroke="white"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                transform="rotate(90 9 9)"
              />
            </svg>
          </button>
        </div>
      </div>
    </section>
  );
};
