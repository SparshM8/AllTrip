import React from 'react';
import { FEATURES } from '../../data/mockData';

export const FeaturesSection: React.FC = () => {
  return (
    <section className="features-section">
      <div className="features-container">
        <div className="features-heading-block">
          <p className="section-eyebrow">Designed around you</p>
          <h2>Everything you need for a better journey.</h2>
          <p>From the first idea to the final return, every detail stays connected.</p>
        </div>
        <div className="features-divider" aria-hidden="true" />
        <div className="features-grid">
          {FEATURES.map(feat => (
            <article className="feature-item" key={feat.title}>
              <div className="feature-icon-wrap">
                <img src={feat.icon} alt="" loading="lazy" />
              </div>
              <div>
                <h3>{feat.title}</h3>
                <p>{feat.desc}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
