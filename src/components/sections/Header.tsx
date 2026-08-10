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
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        width: '100%',
        boxSizing: 'border-box',
        zIndex: 1000,
        boxShadow: '0 2px 10px rgba(0,0,0,0.08)',
      }}
    >
      {/* Logo */}
      <a href="/#home" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
        <img src={logoSrc} alt="Alltripp" style={{ height: 38, width: 'auto' }} />
      </a>

      {/* Nav links */}
      <nav style={{ display: 'flex', gap: 40 }}>
        {NAV_LINKS.map(link => (
          <a
            key={link.name}
            href={link.href}
            style={{
              color: '#14140F',
              fontSize: 14,
              fontFamily: 'Plus Jakarta Sans',
              fontWeight: '400',
              lineHeight: '18px',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#084028')}
            onMouseLeave={e => (e.currentTarget.style.color = '#14140F')}
          >
            {link.name}
          </a>
        ))}
      </nav>

      {/* Primary CTA */}
      <a
        href="https://wa.me/919266602470?text=Hi%20Alltripp%20Team,%20I%20would%20like%20to%20book%20a%20demo."
        target="_blank"
        rel="noopener noreferrer"
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
          textDecoration: 'none',
          transition: 'background 0.2s',
        }}
        onMouseEnter={e => (e.currentTarget.style.background = '#0a5033')}
        onMouseLeave={e => (e.currentTarget.style.background = '#084028')}
      >
        <span style={{ color: 'white', fontSize: 14, fontFamily: 'Plus Jakarta Sans', fontWeight: '500' }}>
          Book a demo
        </span>
        <ArrowIcon />
      </a>
    </header>
  );
};
