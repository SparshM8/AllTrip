import React from 'react';
import logoSrc from '../../assets/Vector.svg';
import instagramIcon from '../../assets/Icon - Instagram.svg';
import linkedinIcon from '../../assets/Icon - LinkedIn.svg';
import youtubeIcon from '../../assets/Icon - YouTube.svg';
import { FOOTER_LINKS } from '../../data/mockData';

export const Footer: React.FC = () => {
  return (
    <footer
      style={{
        background: '#032517',
        paddingTop: 80,
        paddingBottom: 40,
        paddingLeft: 80,
        paddingRight: 80,
      }}
    >
      {/* Top row: logo + link columns */}
      <div style={{ display: 'flex', gap: 60, marginBottom: 60 }}>
        {/* Brand column */}
        <div style={{ minWidth: 220, maxWidth: 280 }}>
          <img
            src={logoSrc}
            alt="Alltripp"
            style={{ height: 38, marginBottom: 20, filter: 'brightness(0) invert(1)' }}
          />
          <p
            style={{
              color: 'rgba(242,240,227,0.70)',
              fontSize: 14,
              fontFamily: 'Outfit',
              fontWeight: '400',
              lineHeight: '22px',
              margin: '0 0 24px',
            }}
          >
            The all-in-one travel platform for individuals, families and enterprises.
          </p>
          <div style={{ display: 'flex', gap: 12 }}>
            {[instagramIcon, linkedinIcon, youtubeIcon].map((icon, i) => (
              <a
                key={i}
                href="#"
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 9999,
                  border: '1px solid rgba(242,240,227,0.20)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(242,240,227,0.60)')}
                onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(242,240,227,0.20)')}
              >
                <img src={icon} alt="Social Icon" style={{ width: 18, height: 18, filter: 'brightness(0) invert(1)' }} />
              </a>
            ))}
          </div>
        </div>

        {/* Link columns */}
        {Object.entries(FOOTER_LINKS).map(([category, links]) => (
          <div key={category} style={{ flex: 1 }}>
            <h4
              style={{
                color: '#F2F0E3',
                fontSize: 13,
                fontFamily: 'Outfit',
                fontWeight: '600',
                textTransform: 'uppercase',
                letterSpacing: 1.4,
                lineHeight: '20px',
                margin: '0 0 20px',
              }}
            >
              {category}
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {links.map(link => (
                <a
                  key={link}
                  href="#"
                  style={{
                    color: 'rgba(242,240,227,0.60)',
                    fontSize: 13,
                    fontFamily: 'Outfit',
                    fontWeight: '400',
                    lineHeight: '18px',
                    textDecoration: 'none',
                    transition: 'color 0.2s',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#F2F0E3')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,240,227,0.60)')}
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom row: copyright */}
      <div
        style={{
          paddingTop: 24,
          borderTop: '1px solid rgba(242,240,227,0.10)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            color: 'rgba(242,240,227,0.40)',
            fontSize: 13,
            fontFamily: 'Outfit',
            fontWeight: '400',
          }}
        >
          © 2025 Alltripp. All rights reserved.
        </span>
        <div style={{ display: 'flex', gap: 24 }}>
          {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map(item => (
            <a
              key={item}
              href="#"
              style={{
                color: 'rgba(242,240,227,0.40)',
                fontSize: 13,
                fontFamily: 'Outfit',
                fontWeight: '400',
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'rgba(242,240,227,0.80)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,240,227,0.40)')}
            >
              {item}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
};
