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
  }: {
    width: number | string;
    title: string;
    bgUrl: string;
  }) => (
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
          background: 'rgba(255, 255, 255, 0.7)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          borderRadius: 9999,
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
            fontFamily: 'Outfit',
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

  return (
    <section
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
            background: 'rgba(10, 64, 40, 0.2)',
            borderRadius: 9999,
          }}
        >
          {CATEGORIES.map((cat) => (
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
                background: activeCategory === cat ? '#0A4028' : 'transparent',
                borderRadius: 9999,
                border: 'none',
                cursor: 'pointer',
                fontFamily: 'Outfit',
                fontWeight: activeCategory === cat ? 700 : 500,
                fontSize: 16,
                lineHeight: '24px',
                color: activeCategory === cat ? '#FFFFFF' : '#0A4028',
                transition: 'all 0.2s ease',
              }}
            >
              {cat}
            </button>
          ))}
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
            />
            <BentoCard
              width={569}
              title="Europe Tour"
              bgUrl={europeImg}
            />
            <BentoCard
              width={356}
              title="Sri Lanka"
              bgUrl={srilankaImg}
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
            />
            <BentoCard
              width={428.5}
              title="Paris, France"
              bgUrl={parisImg}
            />
            <BentoCard
              width={428.5}
              title="Singapore"
              bgUrl="https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800"
            />
            <BentoCard
              width={200}
              title="Europe Tour"
              bgUrl={europeImg}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
