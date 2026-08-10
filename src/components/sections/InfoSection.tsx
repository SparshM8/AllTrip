import React from 'react';

export const InfoSection: React.FC = () => {
  return (
    <section id="about" className="info-section-wrapper" style={{ padding: '80px 160px' }}>
      <div className="info-section-flex" style={{ display: 'flex', alignItems: 'flex-end', gap: 32 }}>
        <div style={{ flex: 1 }}>
          <p
            style={{
              color: '#735C00',
              fontSize: 13,
              fontFamily: 'Plus Jakarta Sans',
              fontWeight: '600',
              textTransform: 'uppercase',
              letterSpacing: 2.8,
              lineHeight: '20px',
              margin: '0 0 16px',
            }}
          >
            Smart Travel Planning
          </p>
          <h2
            className="info-section-heading"
            style={{
              color: '#1A1C1A',
              fontSize: 56,
              fontFamily: 'Space Grotesk',
              fontWeight: '500',
              lineHeight: '64px',
              margin: 0,
            }}
          >
            Plan smarter, travel better, experience more
          </h2>
        </div>
        <div style={{ flex: 1 }}>
          <p
            className="info-section-body"
            style={{
              color: '#424843',
              fontSize: 18,
              fontFamily: 'Plus Jakarta Sans',
              fontWeight: '400',
              lineHeight: '30px',
              margin: 0,
              textAlign: 'justify',
            }}
          >
            Alltripp combines AI-powered recommendations, real-time booking, and collaborative planning tools into one seamless platform. Whether you're planning a solo adventure or a company retreat, we make every journey effortless from start to finish.
          </p>
        </div>
      </div>
    </section>
  );
};
