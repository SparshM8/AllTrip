import React from 'react';

export const PartnersSection: React.FC = () => {
  return (
    <section
      style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '20px 60px 60px',
        gap: 40,
        width: '100%',
        boxSizing: 'border-box',
      }}
    >
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: '0px 100px',
          gap: 30,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <h2
            style={{
              fontFamily: 'Outfit',
              fontWeight: 500,
              fontSize: 60,
              lineHeight: '60px',
              textAlign: 'center',
              letterSpacing: '-1.53633px',
              color: '#032517',
              margin: 0,
            }}
          >
            Our Partners
          </h2>
        </div>
      </div>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          maxWidth: 1305,
        }}
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            gap: 80,
            flexWrap: 'wrap',
          }}
        >
          {/* Card 1 */}
          <article
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: 200,
              height: 200,
              background: '#F2F0E3',
              borderRadius: 28,
              boxSizing: 'border-box',
              gap: 16,
            }}
          >
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <svg viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 56, height: 56, color: '#cfa052' }}>
                <g transform="translate(3.23, 2.23)">
                  <path d="M5.5625 47.5195H35.8223" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M13.0078 54.2461H65.8425" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M13.0078 54.2461L13.0078 12.939" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M21 65.7734L21 25.7734" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M33 47.3207V5.77344L51.252 18.5991L45.0079 12.2577V8.17501H51.252V18.5991L68.5433 30.7498H57.7362V47.3207H33Z" fill="currentColor" />
                  <path d="M51.252 18.5991L68.5433 30.7498H57.7362V47.3207H33V5.77344L51.252 18.5991ZM51.252 18.5991V8.17501H45.0079V12.2577L51.252 18.5991Z" stroke="currentColor" strokeWidth="6" />
                  <path d="M37.9839 12.9375L12.0469 32.1501" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                  <path d="M34 5.77344L1 30.7734" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </g>
              </svg>
            </div>
            <div
              style={{
                fontFamily: 'Outfit, serif',
                fontWeight: 700,
                fontSize: 22,
                textAlign: 'center',
                letterSpacing: '-0.5px',
                color: '#2c2724',
              }}
            >
              Nest<span style={{ color: '#cfa052' }}>Arrival</span>
            </div>
          </article>

          {/* Card 2 */}
          <article
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: 200,
              height: 200,
              background: '#F2F0E3',
              borderRadius: 28,
              boxSizing: 'border-box',
              gap: 20,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                background: '#6C6C6C',
                borderRadius: '50%',
              }}
            />
            <div
              style={{
                fontFamily: 'Outfit',
                fontWeight: 500,
                fontSize: 33,
                textAlign: 'center',
                letterSpacing: '-1.53633px',
                color: '#000000',
              }}
            >
              Name
            </div>
          </article>

          {/* Card 3 */}
          <article
            style={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              width: 200,
              height: 200,
              background: '#F2F0E3',
              borderRadius: 28,
              boxSizing: 'border-box',
              gap: 20,
            }}
          >
            <div
              style={{
                width: 80,
                height: 80,
                background: '#6C6C6C',
                borderRadius: '50%',
              }}
            />
            <div
              style={{
                fontFamily: 'Outfit',
                fontWeight: 500,
                fontSize: 33,
                textAlign: 'center',
                letterSpacing: '-1.53633px',
                color: '#000000',
              }}
            >
              Name
            </div>
          </article>
        </div>
      </div>
    </section>
  );
};
