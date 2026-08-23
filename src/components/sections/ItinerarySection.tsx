import React, { useMemo, useState } from 'react';
import srilankaImg from '../../assets/srilanka.webp';
import parisImg from '../../assets/paris.webp';
import europeImg from '../../assets/europe.webp';
import thailandImg from '../../assets/thailand.webp';
import heroImg from '../../assets/Container.webp';

const FILTERS = ['All', 'Beach', 'Mountain', 'Culture', 'City', 'Nature'];

type Itinerary = {
  title: string;
  country: string;
  category: string;
  image: string;
  description: string;
  highlights: string[];
  duration: string;
  price: string;
  rating: string;
  featured?: boolean;
};

const ITINERARIES: Itinerary[] = [
  {
    title: 'Bali Island Escape',
    country: 'Indonesia',
    category: 'Beach',
    image: srilankaImg,
    description: 'Private villas, temple mornings, and Uluwatu sunsets on a family-friendly island itinerary.',
    highlights: ['Private pool villa', 'Uluwatu cliffside sunset', 'Ubud rice terraces'],
    duration: '6 days · 5 nights',
    price: '$1,290',
    rating: '4.9',
    featured: true,
  },
  {
    title: 'Kyoto Cultural Immersion',
    country: 'Japan',
    category: 'Culture',
    image: europeImg,
    description: 'Cherry blossoms, tea ceremonies, and Arashiyama bamboo groves, paced for deep discovery.',
    highlights: ['Arashiyama bamboo grove', 'Private tea ceremony', 'Fushimi Inari at dawn'],
    duration: '7 days · 6 nights',
    price: '$1,850',
    rating: '4.9',
    featured: true,
  },
  {
    title: 'Swiss Alps Explorer',
    country: 'Switzerland',
    category: 'Mountain',
    image: heroImg,
    description: 'Glacier railways, alpine lakes, and panoramic stays across the heart of Europe.',
    highlights: ['Glacier Express panorama', 'Lake Lucerne cruise', 'Alpine village stays'],
    duration: '8 days · 7 nights',
    price: '$2,400',
    rating: '4.8',
  },
  {
    title: 'Thailand Highlights',
    country: 'Thailand',
    category: 'Beach',
    image: thailandImg,
    description: 'Bangkok street food, island-hopping, and private beachfront villas — all in one flow.',
    highlights: ['Bangkok riverfront stay', 'Phi Phi Island day trip', 'Private beachfront villa'],
    duration: '8 days · 4 nights',
    price: '$890',
    rating: '4.8',
  },
  {
    title: 'Paris & the South of France',
    country: 'France',
    category: 'City',
    image: parisImg,
    description: 'The Eiffel Tower to Provence lavender fields with seamless city-to-country logistics.',
    highlights: ['Eiffel Tower dinner', 'Provence lavender fields', 'High-speed rail transfers'],
    duration: '6 days · 5 nights',
    price: '$1,650',
    rating: '4.9',
  },
  {
    title: 'Sri Lanka Discovery',
    country: 'Sri Lanka',
    category: 'Nature',
    image: srilankaImg,
    description: 'Tea-country hill stations, safari parks, and golden beaches on a complete island tour.',
    highlights: ['Sigiriya rock fortress', 'Yala safari', 'Galle fort coastline'],
    duration: '9 days · 8 nights',
    price: '$1,150',
    rating: '4.8',
  },
];

const ArrowUpRightIcon = () => (
  <svg aria-hidden="true" className="itinerary-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

export const ItinerarySection: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const visibleItineraries = useMemo(
    () => ITINERARIES.filter(itinerary => activeFilter === 'All' || itinerary.category === activeFilter),
    [activeFilter],
  );

  return (
    <section className="itinerary-section" aria-labelledby="itinerary-title">
      <div className="itinerary-container">
        <div className="itinerary-toolbar">
          <div>
            <p className="itinerary-kicker">Curated itineraries</p>
            <h2 id="itinerary-title">Go further, with every detail considered.</h2>
            <p className="itinerary-intro">
              Choose a starting point and let Alltripp shape the rest around how you want to travel.
            </p>
          </div>
          <div className="itinerary-filters" role="group" aria-label="Filter itineraries by category">
            {FILTERS.map(filter => (
              <button
                key={filter}
                type="button"
                className={activeFilter === filter ? 'itinerary-filter-active' : ''}
                aria-pressed={activeFilter === filter}
                onClick={() => setActiveFilter(filter)}
              >
                {filter}
              </button>
            ))}
          </div>
        </div>

        <div className="itinerary-grid">
          {visibleItineraries.map(itinerary => (
            <article className="itinerary-card" key={itinerary.title}>
              <div className="itinerary-card-image-wrap">
                <img src={itinerary.image} alt={`${itinerary.title} itinerary`} className="itinerary-card-image" loading="lazy" />
                <div className="itinerary-card-image-overlay" />
                <span className="itinerary-category-pill">{itinerary.category}</span>
                {itinerary.featured && <span className="itinerary-featured-pill">Featured</span>}
                <div className="itinerary-card-image-copy">
                  <div>
                    <h3>{itinerary.title}</h3>
                    <p>{itinerary.country}</p>
                  </div>
                  <span className="itinerary-rating">★ {itinerary.rating}</span>
                </div>
              </div>
              <div className="itinerary-card-body">
                <p className="itinerary-description">{itinerary.description}</p>
                <ul>
                  {itinerary.highlights.map(highlight => (
                    <li key={highlight}>
                      <span aria-hidden="true">✓</span>
                      {highlight}
                    </li>
                  ))}
                </ul>
                <div className="itinerary-card-footer">
                  <div>
                    <span className="itinerary-duration">{itinerary.duration}</span>
                    <p>From <strong>{itinerary.price}</strong> <small>/ person</small></p>
                  </div>
                  <a
                    href={`https://wa.me/919266602470?text=Hi%20Alltripp%20Team,%20I%20am%20interested%20in%20the%20${encodeURIComponent(itinerary.title)}%20itinerary.`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="itinerary-inquire-button"
                    aria-label={`Inquire about ${itinerary.title}`}
                  >
                    <ArrowUpRightIcon />
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
