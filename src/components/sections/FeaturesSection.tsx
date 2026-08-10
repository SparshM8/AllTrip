import React from 'react';
import { FEATURES } from '../../data/mockData';

export const FeaturesSection: React.FC = () => {
  return (
    <section className="hero-section" style={{ paddingBottom: 80 }}>
      <div style={{ maxWidth: 1340, margin: '0 auto' }}>
        {/* Heading */}
        <h2
          style={{
            color: '#032517',
            fontSize: 36,
            fontFamily: 'Space Grotesk',
            fontWeight: '600',
            lineHeight: '44px',
            textAlign: 'center',
            marginBottom: 64,
          }}
        >
          Everything you need for perfect travel
        </h2>
        {/* Divider line */}
        <style>
          {`
            @keyframes pathMovement {
              0% { left: 0%; transform: translateX(-100%); }
              100% { left: 100%; transform: translateX(0%); }
            }
          `}
        </style>
        <div
          style={{
            height: 2,
            background: 'rgba(68,71,72,0.15)',
            marginBottom: 48,
            position: 'relative',
            overflow: 'hidden',
            borderRadius: 2,
          }}
        >
          <div
            style={{
              position: 'absolute',
              top: 0,
              width: '30%',
              height: '100%',
              background: 'linear-gradient(90deg, rgba(3,37,23,0) 0%, rgba(3,37,23,0.8) 80%, #032517 100%)',
              animation: 'pathMovement 2.5s infinite ease-in-out',
            }}
          />
        </div>

        {/* 3 feature columns */}
        <div className="responsive-flex" style={{ gap: 80 }}>
          {FEATURES.map((feat, idx) => (
            <div key={idx} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
              {/* Icon box */}
              <div
                style={{
                  width: 96,
                  height: 96,
                  background: '#032517',
                  borderRadius: 18,
                  border: '1px solid rgba(68,71,72,0.30)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 32,
                }}
              >
                <img src={feat.icon} alt={feat.title} loading="lazy" style={{ width: 42, height: 42 }} />
              </div>
              {/* Title */}
              <h3
                style={{
                  color: '#424843',
                  fontSize: 18,
                  fontFamily: 'Plus Jakarta Sans',
                  fontWeight: '600',
                  textTransform: 'uppercase',
                  lineHeight: '28px',
                  letterSpacing: 1,
                  margin: '0 0 12px',
                }}
              >
                {feat.title}
              </h3>
              {/* Description */}
              <p
                style={{
                  color: '#424843',
                  fontSize: 16,
                  fontFamily: 'Plus Jakarta Sans',
                  fontWeight: '400',
                  lineHeight: '26px',
                  margin: 0,
                  textAlign: 'center',
                }}
              >
                {feat.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
