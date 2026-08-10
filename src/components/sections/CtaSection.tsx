import React from 'react';

export const CtaSection: React.FC = () => {
  return (
    <section style={{ paddingLeft: 50, paddingRight: 50, paddingTop: 32, paddingBottom: 32 }}>
      <div
        style={{
          background: '#084028',
          borderRadius: 24,
          padding: 96,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: 40,
        }}
      >
        {/* Text */}
        <div style={{ maxWidth: 576 }}>
          <h2
            style={{
              color: '#F2F0E3',
              fontSize: 38,
              fontFamily: 'Plus Jakarta Sans',
              fontWeight: '500',
              lineHeight: '48px',
              letterSpacing: 0.8,
              margin: '0 0 20px',
            }}
          >
            Ready to transform how you travel?
          </h2>
          <p
            style={{
              color: 'rgba(242,240,227,0.80)',
              fontSize: 18,
              fontFamily: 'Plus Jakarta Sans',
              fontWeight: '400',
              lineHeight: '30px',
              margin: 0,
              textAlign: 'justify',
            }}
          >
            Join thousands of travellers and corporate teams who use Alltripp to plan, book, and manage every journey with confidence.
          </p>
        </div>

        {/* CTA button area */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 14 }}>
          <a
            href="https://wa.me/919266602470?text=Hi%20Alltripp%20Team,%20I%20would%20like%20to%20get%20started."
            target="_blank"
            rel="noopener noreferrer"
            style={{
              height: 64,
              paddingLeft: 60,
              paddingRight: 60,
              background: '#F2F0E3',
              borderRadius: 9999,
              border: 'none',
              cursor: 'pointer',
              color: '#032517',
              fontSize: 16,
              fontFamily: 'Plus Jakarta Sans',
              fontWeight: '700',
              lineHeight: '24px',
              whiteSpace: 'nowrap',
              textDecoration: 'none',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#e0dece')}
            onMouseLeave={e => (e.currentTarget.style.background = '#F2F0E3')}
          >
            Get Started Free
          </a>
          <span
            style={{
              color: '#7E8B60',
              fontSize: 13,
              fontFamily: 'Plus Jakarta Sans',
              fontWeight: '600',
              letterSpacing: 1.4,
              lineHeight: '20px',
            }}
          >
            Average setup time: 4 minutes
          </span>
        </div>
      </div>
    </section>
  );
};
