import React from 'react';
import srilankaImg from '../../assets/srilanka.webp';
import parisImg from '../../assets/paris.webp';
import europeImg from '../../assets/europe.webp';
import thailandImg from '../../assets/thailand.webp';

type GalleryCard = {
  title: string;
  bgUrl: string;
  category: string;
};

const GALLERY_CARDS: GalleryCard[] = [
  { title: 'Thailand', bgUrl: thailandImg, category: 'Beach' },
  { title: 'Europe Tour', bgUrl: europeImg, category: 'Mountain' },
  { title: 'Sri Lanka', bgUrl: srilankaImg, category: 'Beach' },
  { title: 'Europe Tour', bgUrl: europeImg, category: 'Mountain' },
  { title: 'Paris, France', bgUrl: parisImg, category: 'More' },
  {
    title: 'Singapore',
    bgUrl: 'https://images.unsplash.com/photo-1525625293386-3f8f99389edd?auto=format&fit=crop&q=80&w=800',
    category: 'Lake',
  },
  { title: 'Europe Tour', bgUrl: europeImg, category: 'Mountain' },
];

const BentoCard: React.FC<GalleryCard> = ({ title, bgUrl, category }) => {
  return (
    <article
      className="bento-card"
      style={{ backgroundImage: `url(${bgUrl})` }}
      aria-label={`${title}, ${category} destination`}
    >
    </article>
  );
};

export const TripCardsSection: React.FC = () => {
  return (
    <section id="gallery" className="gallery-section" aria-label="Destination gallery">
      <div className="gallery-reference-grid">
        <div className="gallery-reference-row gallery-reference-row-top">
          {GALLERY_CARDS.slice(0, 3).map((card, index) => (
            <BentoCard key={`${card.title}-top-${index}`} {...card} />
          ))}
        </div>
        <div className="gallery-reference-row gallery-reference-row-bottom">
          {GALLERY_CARDS.slice(3).map((card, index) => (
            <BentoCard key={`${card.title}-bottom-${index}`} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};
