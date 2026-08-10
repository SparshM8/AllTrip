import React, { useState } from 'react';
import srilankaImg from '../../assets/srilanka.png';
import parisImg from '../../assets/paris.png';
import europeImg from '../../assets/europe.png';
import thailandImg from '../../assets/thailand.png';

const CATEGORIES = ['All', 'Mountain', 'Beach', 'Lake', 'More'];

export const TripCardsSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState('All');

  const BentoCard = ({
    width,
    title,
    bgUrl,
    category,
  }: {
    width: number | string;
    title: string;
    bgUrl: string;
    category: string;
  }) => {
    const isMatched = activeCategory === 'All' || activeCategory.toLowerCase() === category.toLowerCase();

    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'flex-start',
          position: 'relative',
          width: width,
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
        gap: 48,
        width: '100%',
      }}
    >
      {/* Category filter pills */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: 8,
            gap: 8,
            background: 'rgba(10, 64, 40, 0.08)',
            borderRadius: 9999,
            border: '1px solid rgba(10, 64, 40, 0.12)',
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
                  padding: '12px 32px',
                  height: 48,
                  background: isCatActive ? '#0A4028' : 'transparent',
                  borderRadius: 9999,
                  border: 'none',
                  cursor: 'pointer',
                  fontFamily: '"Plus Jakarta Sans", sans-serif',
                  fontWeight: isCatActive ? 700 : 500,
                  fontSize: 16,
                  lineHeight: '24px',
                  color: isCatActive ? '#FFFFFF' : '#0A4028',
                  transition: 'all 0.3s cubic-bezier(0.25, 1, 0.5, 1)',
                  boxShadow: isCatActive ? '0 4px 14px rgba(10, 64, 40, 0.25)' : 'none',
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>
      </div>

      {/* Bento Grid Layout (Restored 2-Row Design) */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1425,
          padding: '0 48px',
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
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 24,
              width: '100%',
            }}
          >
            <BentoCard
              width={356}
              title="Thailand"
              bgUrl={thailandImg}
              category="Beach"
            />
            <BentoCard
              width={569}
              title="Europe Tour"
              bgUrl={europeImg}
              category="Mountain"
            />
            <BentoCard
              width={356}
              title="Sri Lanka"
              bgUrl={srilankaImg}
              category="Beach"
            />
          </div>

          {/* Bottom Row */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'center',
              gap: 24,
              width: '100%',
            }}
          >
            <BentoCard
              width={200}
              title="Europe Tour"
              bgUrl={europeImg}
              category="Mountain"
            />
            <BentoCard
              width={428.5}
              title="Paris, France"
              bgUrl={parisImg}
              category="More"
            />
            <BentoCard
              width={428.5}
              title="Singapore"
              bgUrl="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800"
              category="Lake"
            />
            <BentoCard
              width={200}
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
