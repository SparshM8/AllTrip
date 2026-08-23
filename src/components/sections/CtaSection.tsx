import React from 'react';
import { ArrowIcon } from '../ui/Icons';

export const CtaSection: React.FC = () => {
  return (
    <section className="cta-section-wrapper">
      <div className="cta-card">
        <div className="cta-copy">
          <p className="section-eyebrow section-eyebrow-on-dark">Make the next journey count</p>
          <h2 className="cta-heading">Ready to transform how you travel?</h2>
          <p>
            Join thousands of travellers and corporate teams who use Alltripp to plan, book, and manage every journey with confidence.
          </p>
        </div>
        <div className="cta-action-group">
          <a
            href="https://wa.me/919266602470?text=Hi%20Alltripp%20Team,%20I%20would%20like%20to%20get%20started."
            target="_blank"
            rel="noopener noreferrer"
            className="cta-button"
          >
            <span>Get started free</span>
            <ArrowIcon />
          </a>
          <span>Average setup time: 4 minutes</span>
        </div>
      </div>
    </section>
  );
};
