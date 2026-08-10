import React, { useState } from 'react';
import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';
import logoSrc from '../../assets/logo.webp';

const PARTNERSHIP_TYPES = [
  { id: 'hotel', label: 'Hotel & Villa Partner', icon: '🏨' },
  { id: 'transfer', label: 'Flight & Transfer Provider', icon: '✈️' },
  { id: 'tour', label: 'Tour & Activity Operator', icon: '🌴' },
  { id: 'corporate', label: 'Corporate Travel Client', icon: '💼' },
  { id: 'agency', label: 'Travel Agency & Affiliate', icon: '🤝' },
  { id: 'other', label: 'Other', icon: '🌟' },
];

const PARTNERSHIP_GOALS = [
  'Inventory & Experience Listing',
  'Corporate Group Bookings',
  'API & Distribution Integration',
  'Marketing & Affiliate Program',
  'Other',
];

export const PartnerPage: React.FC = () => {
  const [partnershipType, setPartnershipType] = useState('Hotel & Villa Partner');
  const [selectedGoal, setSelectedGoal] = useState('Inventory & Experience Listing');
  
  const [formData, setFormData] = useState({
    orgName: '',
    fullName: '',
    email: '',
    phone: '',
    country: '',
    city: '',
    tellUsMore: '',
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div style={{ width: '100%', background: '#FAF9F5', fontFamily: 'Plus Jakarta Sans', overflowX: 'hidden', minHeight: '100vh' }}>
      <Header />

      <main style={{ paddingTop: 110, paddingBottom: 90, paddingLeft: 40, paddingRight: 40, maxWidth: 1320, margin: '0 auto' }}>
        
        {/* Header Hero */}
        <div style={{ textAlign: 'center', marginBottom: 56 }}>
          
          {/* Badge */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 24px', background: '#FFFFFF', border: '1px solid #E4E1D2', borderRadius: 9999, boxShadow: '0 4px 20px rgba(0,0,0,0.04)', marginBottom: 24 }}>
            <span style={{ fontSize: 14 }}>🌐</span>
            <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.8px', color: '#084028', textTransform: 'uppercase' }}>
              ALLTRIPP B2B PARTNERSHIPS
            </span>
          </div>

          <h1 className="partner-hero-title" style={{ fontFamily: 'Playfair Display, serif', fontSize: 52, fontWeight: 600, color: '#032517', lineHeight: '60px', margin: '0 0 16px' }}>
            Partner With Alltripp
          </h1>
          <p style={{ fontSize: 17, lineHeight: '28px', color: '#424843', maxWidth: 740, margin: '0 auto' }}>
            Join our global travel ecosystem. Expand your reach, distribute inventory, manage corporate team travel, and collaborate with verified industry partners.
          </p>

          {/* Metric Badges */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: 40, marginTop: 32, flexWrap: 'wrap' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: '#084028' }}>500+</div>
              <div style={{ fontSize: 13, color: '#666666', fontWeight: 500 }}>Global Travel Partners</div>
            </div>
            <div className="metric-divider" style={{ width: 1, height: 40, background: '#E0DDD0' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: '#084028' }}>&lt; 24h</div>
              <div style={{ fontSize: 13, color: '#666666', fontWeight: 500 }}>B2B Response SLA</div>
            </div>
            <div className="metric-divider" style={{ width: 1, height: 40, background: '#E0DDD0' }} />
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, fontWeight: 700, color: '#084028' }}>100%</div>
              <div style={{ fontSize: 13, color: '#666666', fontWeight: 500 }}>Verified Network</div>
            </div>
          </div>

        </div>

        {/* 2-Column Content Grid */}
        <div className="responsive-flex" style={{ flexWrap: 'wrap', alignItems: 'flex-start' }}>
          
          {/* Left Column - Information & Connected Partners */}
          <div className="partner-content" style={{ display: 'flex', flexDirection: 'column', gap: 28 }}>
            
            {/* Alltripp Ecosystem Overview */}
            <div style={{ background: '#FFFFFF', border: '1px solid #EAE6DA', borderRadius: 24, padding: 32, boxShadow: '0 8px 30px rgba(0,0,0,0.02)' }}>
              <div style={{ width: 120, height: 40, background: '#084028', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                <img src={logoSrc} alt="Alltripp Logo" loading="lazy" style={{ height: 22, width: 'auto', filter: 'brightness(0) invert(1)' }} />
              </div>
              <h3 style={{ margin: '0 0 12px', fontSize: 22, fontWeight: 700, color: '#032517' }}>Empowering Travel Businesses</h3>
              <p style={{ margin: 0, fontSize: 14, color: '#555555', lineHeight: '22px' }}>
                Alltripp provides an integrated travel management infrastructure connecting hotels, tour operators, flight providers, and corporate managers on one unified platform.
              </p>
            </div>

            {/* Featured Connected Partner - NestArrival */}
            <div style={{ background: '#FFFFFF', border: '1px solid #EAE6DA', borderRadius: 24, padding: 28, display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 52, height: 52, background: '#F2F0E3', borderRadius: 16, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg viewBox="0 0 76 76" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width: 32, height: 32, color: '#cfa052' }}>
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
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                  <h4 style={{ margin: 0, fontSize: 16, fontWeight: 700, color: '#032517' }}>NestArrival</h4>
                  <span style={{ fontSize: 11, background: '#FAF5E8', color: '#cfa052', border: '1px solid #EAE1CB', padding: '2px 8px', borderRadius: 9999, fontWeight: 700 }}>VERIFIED PARTNER</span>
                </div>
                <p style={{ margin: '4px 0 0', fontSize: 13, color: '#666666' }}>Connected housing & relocation verification partner.</p>
              </div>
            </div>

            {/* SLA Block 1 */}
            <div style={{ background: '#FFFFFF', border: '1px solid #EAE6DA', borderRadius: 20, padding: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#084028', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: '#032517' }}>Fast B2B Response SLA</h4>
                <p style={{ margin: 0, fontSize: 13, color: '#666666' }}>Mon - Fri: Within 24 hours | Weekends: Within 48 hours</p>
              </div>
            </div>

            {/* SLA Block 2 */}
            <div style={{ background: '#FFFFFF', border: '1px solid #EAE6DA', borderRadius: 20, padding: 24, display: 'flex', gap: 16, alignItems: 'center' }}>
              <div style={{ width: 44, height: 44, borderRadius: 12, background: '#084028', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              </div>
              <div>
                <h4 style={{ margin: '0 0 4px', fontSize: 15, fontWeight: 700, color: '#032517' }}>Strict Vetting & Security</h4>
                <p style={{ margin: 0, fontSize: 13, color: '#666666' }}>All partners undergo verification to maintain quality travel standards.</p>
              </div>
            </div>

          </div>

          {/* Right Column - B2B Form Card */}
          <div className="partner-form">
            <div className="partner-form-card" style={{ background: '#FFFFFF', border: '1px solid #E4E0D2', borderRadius: 32, padding: 40, boxShadow: '0 16px 50px rgba(0,0,0,0.04)' }}>
              
              {submitted ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div style={{ width: 72, height: 72, background: '#084028', borderRadius: '50%', color: '#cfa052', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 36, margin: '0 auto 24px' }}>
                    ✓
                  </div>
                  <h3 style={{ fontFamily: 'Playfair Display, serif', fontSize: 32, color: '#032517', margin: '0 0 12px' }}>
                    Partnership Request Received!
                  </h3>
                  <p style={{ fontSize: 15, color: '#666666', maxWidth: 420, margin: '0 auto 24px', lineHeight: '24px' }}>
                    Thank you for reaching out. Our Alltripp B2B Partnerships team will review your details and connect with you within 24 hours.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{ background: '#084028', color: 'white', border: 'none', borderRadius: 9999, padding: '14px 32px', fontWeight: 600, fontSize: 14, cursor: 'pointer' }}
                  >
                    Submit Another Inquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                  
                  {/* Partnership Category Selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#777465', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>
                      1. SELECT YOUR B2B CATEGORY *
                    </label>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {PARTNERSHIP_TYPES.map(item => {
                        const isSelected = partnershipType === item.label;
                        return (
                          <button
                            key={item.id}
                            type="button"
                            onClick={() => setPartnershipType(item.label)}
                            style={{
                              padding: '10px 16px',
                              borderRadius: 12,
                              border: isSelected ? '2px solid #084028' : '1px solid #E5E2D5',
                              background: isSelected ? '#084028' : '#F9F8F3',
                              color: isSelected ? '#FFFFFF' : '#424843',
                              fontSize: 13,
                              fontWeight: isSelected ? 600 : 500,
                              cursor: 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              gap: 8,
                              transition: 'all 0.2s ease',
                            }}
                          >
                            <span>{item.icon}</span>
                            <span>{item.label}</span>
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Company & Name */}
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#777465', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
                        COMPANY / ORGANIZATION NAME *
                      </label>
                      <input
                        type="text"
                        name="orgName"
                        placeholder="e.g. Alpine Resorts Ltd."
                        value={formData.orgName}
                        onChange={handleChange}
                        style={{ width: '100%', height: 48, padding: '0 16px', background: '#F9F8F3', border: '1px solid #E2DFD2', borderRadius: 12, fontSize: 14, color: '#14140F', outline: 'none', boxSizing: 'border-box' }}
                        required
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#777465', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
                        YOUR FULL NAME *
                      </label>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="e.g. Sarah Johnson"
                        value={formData.fullName}
                        onChange={handleChange}
                        style={{ width: '100%', height: 48, padding: '0 16px', background: '#F9F8F3', border: '1px solid #E2DFD2', borderRadius: 12, fontSize: 14, color: '#14140F', outline: 'none', boxSizing: 'border-box' }}
                        required
                      />
                    </div>
                  </div>

                  {/* Work Email & Phone */}
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#777465', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
                        BUSINESS EMAIL *
                      </label>
                      <input
                        type="email"
                        name="email"
                        placeholder="e.g. sarah@company.com"
                        value={formData.email}
                        onChange={handleChange}
                        style={{ width: '100%', height: 48, padding: '0 16px', background: '#F9F8F3', border: '1px solid #E2DFD2', borderRadius: 12, fontSize: 14, color: '#14140F', outline: 'none', boxSizing: 'border-box' }}
                        required
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#777465', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
                        PHONE NUMBER *
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="e.g. +91 92666 02470"
                        value={formData.phone}
                        onChange={handleChange}
                        style={{ width: '100%', height: 48, padding: '0 16px', background: '#F9F8F3', border: '1px solid #E2DFD2', borderRadius: 12, fontSize: 14, color: '#14140F', outline: 'none', boxSizing: 'border-box' }}
                        required
                      />
                    </div>
                  </div>

                  {/* Country & City */}
                  <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#777465', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
                        COUNTRY / HEADQUARTERS *
                      </label>
                      <input
                        type="text"
                        name="country"
                        placeholder="e.g. India / Global"
                        value={formData.country}
                        onChange={handleChange}
                        style={{ width: '100%', height: 48, padding: '0 16px', background: '#F9F8F3', border: '1px solid #E2DFD2', borderRadius: 12, fontSize: 14, color: '#14140F', outline: 'none', boxSizing: 'border-box' }}
                        required
                      />
                    </div>
                    <div style={{ flex: 1, minWidth: 220 }}>
                      <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#777465', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
                        CITY / REGION
                      </label>
                      <input
                        type="text"
                        name="city"
                        placeholder="e.g. New Delhi"
                        value={formData.city}
                        onChange={handleChange}
                        style={{ width: '100%', height: 48, padding: '0 16px', background: '#F9F8F3', border: '1px solid #E2DFD2', borderRadius: 12, fontSize: 14, color: '#14140F', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  {/* Goal Selector */}
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#777465', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 12 }}>
                      2. PRIMARY COLLABORATION GOAL *
                    </label>
                    <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                      {PARTNERSHIP_GOALS.map(goal => {
                        const isGoalSelected = selectedGoal === goal;
                        return (
                          <button
                            key={goal}
                            type="button"
                            onClick={() => setSelectedGoal(goal)}
                            style={{
                              padding: '8px 14px',
                              borderRadius: 10,
                              border: isGoalSelected ? '1px solid #cfa052' : '1px solid #E5E2D5',
                              background: isGoalSelected ? '#FAF5E8' : '#F9F8F3',
                              color: isGoalSelected ? '#084028' : '#666666',
                              fontSize: 13,
                              fontWeight: isGoalSelected ? 600 : 400,
                              cursor: 'pointer',
                              transition: 'all 0.2s ease',
                            }}
                          >
                            {goal}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Message */}
                  <div>
                    <label style={{ display: 'block', fontSize: 12, fontWeight: 700, color: '#777465', textTransform: 'uppercase', letterSpacing: '0.8px', marginBottom: 8 }}>
                      3. TELL US ABOUT YOUR BUSINESS *
                    </label>
                    <textarea
                      name="tellUsMore"
                      rows={4}
                      placeholder="Describe your inventory, services, or travel requirements and how you envision partnering with Alltripp..."
                      value={formData.tellUsMore}
                      onChange={handleChange}
                      style={{ width: '100%', padding: '14px 16px', background: '#F9F8F3', border: '1px solid #E2DFD2', borderRadius: 12, fontSize: 14, color: '#14140F', outline: 'none', fontFamily: 'Plus Jakarta Sans', resize: 'vertical', boxSizing: 'border-box' }}
                      required
                    />
                  </div>

                  {/* Submit CTA */}
                  <button
                    type="submit"
                    style={{
                      height: 54,
                      width: '100%',
                      background: '#084028',
                      color: '#FFFFFF',
                      borderRadius: 16,
                      fontSize: 16,
                      fontWeight: 600,
                      border: 'none',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      gap: 12,
                      marginTop: 8,
                      boxShadow: '0 8px 24px rgba(8,64,40,0.2)',
                      transition: 'all 0.2s ease',
                    }}
                    onMouseEnter={e => {
                      e.currentTarget.style.background = '#0a5033';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = '#084028';
                      e.currentTarget.style.transform = 'translateY(0)';
                    }}
                  >
                    <span>Submit Partnership Inquiry</span>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="22" y1="2" x2="11" y2="13" />
                      <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                  </button>

                </form>
              )}

            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};
