import React from 'react';

const STORIES = [
  {
    quote: '“Alltripp transformed how I plan every trip. I saved 6 hours on my last Kyoto itinerary.”',
    name: 'Sarah M.',
    role: 'Frequent Traveller',
    location: 'Kyoto, Japan',
  },
  {
    quote: '“Managing 40-person retreats used to be a nightmare. Alltripp made it effortless.”',
    name: 'James R.',
    role: 'Corporate Travel Manager',
    location: 'Team Retreat · 40 people',
  },
  {
    quote: '“Found a perfect family-friendly villa in Bali within minutes. Absolutely love Alltripp.”',
    name: 'Priya K.',
    role: 'Family Traveller',
    location: 'Bali, Indonesia',
  },
];

const MapPinIcon = () => (
  <svg
    aria-hidden="true"
    className="traveller-story-location-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M20 10c0 5-5.5 10.2-7.4 11.8a1 1 0 0 1-1.2 0C9.5 20.2 4 15 4 10a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="traveller-stories-section">
      <div className="traveller-stories-container">
        <header className="traveller-stories-heading">
          <div className="traveller-stories-eyebrow">
            <span aria-hidden="true">❧</span>
            <span>Traveller Stories</span>
          </div>
          <h2>Loved by the people who travel most.</h2>
          <p>
            From frequent flyers to corporate travel managers — here is what real Alltripp
            travellers say.
          </p>
        </header>

        <div className="traveller-stories-grid">
          {STORIES.map(story => (
            <article className="traveller-story-card" key={story.name}>
              <div className="traveller-story-stars" aria-label="5 out of 5 stars">
                <span aria-hidden="true">★★★★★</span>
              </div>
              <p className="traveller-story-quote">{story.quote}</p>
              <footer className="traveller-story-footer">
                <div>
                  <p className="traveller-story-name">{story.name}</p>
                  <p className="traveller-story-role">{story.role}</p>
                </div>
                <span className="traveller-story-location">
                  <MapPinIcon />
                  <span>{story.location}</span>
                </span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
