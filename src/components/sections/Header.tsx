import React from 'react';
import logoSrc from '../../assets/logo.png';
import { NAV_LINKS } from '../../data/mockData';
import { ArrowIcon } from '../ui/Icons';

export const Header: React.FC = () => {
  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 20,
        paddingBottom: 20,
        background: 'white',
        position: 'sticky',
        top: 0,
        zIndex: 100,
        boxShadow: '0 1px 0 rgba(0,0,0,0.06)',
      }}
    >
      {/* Logo */}
      <img src={logoSrc} alt="Alltripp" style={{ height: 38, width: 'auto' }} />

      {/* Nav links */}
      <nav style={{ display: 'flex', gap: 40 }}>
        {NAV_LINKS.map(link => (
          <a
            key={link}
            href="#"
            style={{
              color: '#14140F',
              fontSize: 14,
              fontFamily: 'Outfit',
              fontWeight: '400',
              lineHeight: '18px',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#084028')}
            onMouseLeave={e => (e.currentTarget.style.color = '#14140F')}
          >
            {link}
          </a>
        ))}
      </nav>

      {/* Primary CTA */}
      <button
        style={{
          height: 40,
          paddingLeft: 20,
          paddingRight: 20,
          background: '#084028',
          borderRadius: 26,
          border: 'none',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#0a5033')}
        onMouseLeave={e => (e.currentTarget.style.background = '#084028')}
      >
        <span style={{ color: 'white', fontSize: 14, fontFamily: 'Outfit', fontWeight: '500' }}>
          Book a demo
        </span>
        <ArrowIcon />
      </button>
    </header>
  );
};
