import React from 'react';
import aboutImage from '../../assets/europe.webp';

const STATS = [
  { value: '10,000+', label: 'Journeys Planned' },
  { value: '500+', label: 'Verified Partners' },
  { value: '40+', label: 'Destinations' },
  { value: '4.9★', label: 'Traveler Rating' },
];

const VALUES = [
  {
    icon: '◎',
    title: 'Discovery-first',
    description: 'We plan around places worth discovering, not just places that book well.',
  },
  {
    icon: '♡',
    title: 'Thoughtful service',
    description: 'A human team behind every itinerary — because AI plans, people care.',
  },
  {
    icon: '⊕',
    title: 'Worldwide reach',
    description: 'Verified local partners in 40+ destinations across six continents.',
  },
  {
    icon: '♢',
    title: 'Verified quality',
    description: 'Every partner is vetted, and every stay is quality-checked before you pack.',
  },
];

const EarthIcon = () => (
  <svg
    aria-hidden="true"
    className="about-eyebrow-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="9.5" />
    <path d="M2.8 9h18.4M2.8 15h18.4M12 2.5c2.3 2.6 3.5 5.8 3.5 9.5S14.3 18.9 12 21.5c-2.3-2.6-3.5-5.8-3.5-9.5S9.7 5.1 12 2.5Z" />
  </svg>
);

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="about-section">
      <div className="about-container">
        <div className="about-intro-grid">
          <div className="about-copy">
            <div className="about-eyebrow">
              <EarthIcon />
              <span>The Alltripp Story</span>
            </div>
            <h2>We exist to give time back to travellers.</h2>
            <p>
              Planning a great trip used to mean dozens of tabs, conflicting itineraries, and hours
              of research. Alltripp was built to change that — combining AI-powered recommendations,
              real-time booking, and collaborative group tools into one seamless platform.
            </p>
            <p>
              Today, Alltripp serves solo adventurers, families, and enterprise teams alike, backed by
              a verified network of 500+ global travel partners.
            </p>
          </div>

          <div className="about-image-wrap">
            <img
              src={aboutImage}
              alt="Travellers exploring a mountain lake"
              className="about-image"
              loading="lazy"
            />
            <div className="about-time-card">
              <p>4 min</p>
              <span>Average trip setup time</span>
            </div>
          </div>
        </div>

        <div className="about-stats-grid">
          {STATS.map(stat => (
            <div className="about-stat-card" key={stat.label}>
              <p>{stat.value}</p>
              <span>{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="about-values-grid">
          {VALUES.map(value => (
            <div className="about-value" key={value.title}>
              <div className="about-value-icon" aria-hidden="true">
                {value.icon}
              </div>
              <div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
