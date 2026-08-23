import React, { useState } from 'react';
import logoSrc from '../../assets/logo.webp';
import { NAV_LINKS } from '../../data/mockData';
import { ArrowIcon } from '../ui/Icons';

export const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header
      className="header-container"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingLeft: 50,
        paddingRight: 50,
        paddingTop: 16,
        paddingBottom: 16,
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
        <img src={logoSrc} alt="Alltripp" style={{ height: 36, width: 'auto' }} />
      </a>

      {/* Desktop Nav links */}
      <nav className="header-nav desktop-only" style={{ display: 'flex', gap: 32 }}>
        {NAV_LINKS.map(link => (
          <a
            key={link.name}
            href={link.href}
            style={{
              color: '#1A1C1A',
              fontSize: 14,
              fontFamily: 'Inter',
              fontWeight: '500',
              lineHeight: '18px',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'color 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.color = '#0A4028')}
            onMouseLeave={e => (e.currentTarget.style.color = '#1A1C1A')}
          >
            {link.name}
          </a>
        ))}
      </nav>

      {/* Desktop Primary CTA */}
      <a
        href="https://wa.me/919266602470?text=Hi%20Alltripp%20Team,%20I%20would%20like%20to%20book%20a%20demo."
        target="_blank"
        rel="noopener noreferrer"
        className="desktop-only"
        style={{
          height: 40,
          paddingLeft: 20,
          paddingRight: 20,
          background: '#0A4028',
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
        onMouseLeave={e => (e.currentTarget.style.background = '#0A4028')}
      >
        <span style={{ color: 'white', fontSize: 14, fontFamily: 'Inter', fontWeight: '500' }}>
          Book a demo
        </span>
        <ArrowIcon />
      </a>

      {/* Mobile Hamburger Toggle Button */}
      <button
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        className="mobile-only"
        aria-label="Toggle navigation menu"
        aria-expanded={mobileMenuOpen}
        aria-controls="mobile-navigation"
        style={{
          background: '#0A4028',
          color: 'white',
          border: 'none',
          borderRadius: 8,
          padding: '8px 12px',
          fontSize: 18,
          cursor: 'pointer',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {mobileMenuOpen ? '✕' : '☰'}
      </button>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation"
          className="mobile-only"
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            background: '#FFFFFF',
            borderBottom: '1px solid #EAE6DA',
            boxShadow: '0 12px 30px rgba(0,0,0,0.12)',
            padding: '24px 20px',
            flexDirection: 'column',
            gap: 16,
            zIndex: 999,
          }}
        >
          {NAV_LINKS.map(link => (
            <a
              key={link.name}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              style={{
                color: '#0A4028',
                fontSize: 16,
                fontFamily: 'Inter',
                fontWeight: '600',
                textDecoration: 'none',
                padding: '8px 0',
                borderBottom: '1px solid #F4F2EA',
              }}
            >
              {link.name}
            </a>
          ))}
          <a
            href="https://wa.me/919266602470?text=Hi%20Alltripp%20Team,%20I%20would%20like%20to%20book%20a%20demo."
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileMenuOpen(false)}
            style={{
              height: 48,
              background: '#0A4028',
              color: 'white',
              borderRadius: 26,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              textDecoration: 'none',
              fontWeight: 600,
              fontSize: 15,
              marginTop: 8,
            }}
          >
            <span>Book a demo</span>
            <ArrowIcon />
          </a>
        </div>
      )}
    </header>
  );
};
