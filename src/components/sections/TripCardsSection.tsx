import React, { useState } from 'react';
import srilankaImg from '../../assets/srilanka.webp';
import parisImg from '../../assets/paris.webp';
import europeImg from '../../assets/europe.webp';
import thailandImg from '../../assets/thailand.webp';

const CATEGORIES = ['All', 'Mountain', 'Beach', 'Lake', 'More'];

export const TripCardsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const BentoCard = ({
    title,
    bgUrl,
    category,
    className,
  }: {
    title: string;
    bgUrl: string;
    category: string;
    className?: string;
  }) => {
    const isMatched = activeCategory === 'All' || activeCategory.toLowerCase() === category.toLowerCase();

    return (
      <div
        className={`bento-card ${className || ''}`}
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          position: 'relative',
          height: 250.5,
          borderRadius: 40,
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          flexShrink: 0,
          boxShadow: '0 8px 30px rgba(0,0,0,0.06)',
          opacity: isMatched ? 1 : 0.35,
          filter: isMatched ? 'none' : 'grayscale(60%)',
          transform: isMatched ? 'scale(1)' : 'scale(0.96)',
          transition: 'all 0.4s cubic-bezier(0.25, 1, 0.5, 1)',
          cursor: 'pointer',
        }}
        onMouseEnter={e => {
          if (isMatched) {
            e.currentTarget.style.transform = 'translateY(-4px) scale(1.01)';
          }
        }}
        onMouseLeave={e => {
          if (isMatched) {
            e.currentTarget.style.transform = 'translateY(0) scale(1)';
          }
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '10px 20px',
            gap: 8,
            position: 'absolute',
            left: 24,
            bottom: 24,
            background: 'rgba(255, 255, 255, 0.75)',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            borderRadius: 9999,
            boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
          }}
        >
          <div
            style={{
              width: 12,
              height: 15,
              background: 'rgba(10, 64, 40, 0.8)',
              borderRadius: 2,
            }}
          />
          <div
            style={{
              fontFamily: '"Plus Jakarta Sans", sans-serif',
              fontWeight: 700,
              fontSize: 16,
              lineHeight: '24px',
              color: 'rgba(10, 64, 40, 0.8)',
            }}
          >
            {title}
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      id="gallery"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '60px 0',
        gap: 32,
        width: '100%',
      }}
    >
      {/* Category filter pills */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          padding: '0 16px',
          boxSizing: 'border-box',
        }}
      >
        <div
          className="pills-scroll-container"
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 8,
            gap: 8,
            background: 'rgba(10, 64, 40, 0.08)',
            borderRadius: 9999,
            border: '1px solid rgba(10, 64, 40, 0.12)',
            maxWidth: '100%',
          }}
        >
          {CATEGORIES.map((cat) => {
            const isCatActive = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: '10px 24px',
                  height: 44,
                  whiteSpace: 'nowrap',
                  background: isCatActive ? '#0A4028' : 'transparent',
                  borderRadius: 9999,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontWeight: isCatActive ? 700 : 500,
                  fontSize: 15,
                  lineHeight: '24px',
                  color: isCatActive ? '#FFFFFF' : '#0A4028',
                  transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                  boxShadow: isCatActive ? '0 4px 14px rgba(10, 64, 40, 0.25)' : 'none',
                  flexShrink: 0,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bento Grid Layout */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1425,
          padding: '0 16px',
          boxSizing: 'border-box',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 24,
            width: '100%',
            maxWidth: 1329,
          }}
        >
          {/* Top Row */}
          <div className="bento-grid-top">
            <BentoCard
              title="Thailand"
              bgUrl={thailandImg}
              category="Beach"
            />
            <BentoCard
              title="Europe Tour"
              bgUrl={europeImg}
              category="Mountain"
            />
            <BentoCard
              title="Sri Lanka"
              bgUrl={srilankaImg}
              category="Beach"
            />
          </div>

          {/* Bottom Row */}
          <div className="bento-grid-bottom">
            <BentoCard
              title="Europe Tour"
              bgUrl={europeImg}
              category="Mountain"
            />
            <BentoCard
              title="Paris, France"
              bgUrl={parisImg}
              category="More"
            />
            <BentoCard
              title="Singapore"
              bgUrl="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800"
              category="Lake"
            />
            <BentoCard
              title="Europe Tour"
              bgUrl={europeImg}
              category="Mountain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
