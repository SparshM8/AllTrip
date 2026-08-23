import React from 'react';

export const InfoSection: React.FC = () => {
  return (
    <section id="planning" className="info-section-wrapper">
      <div className="info-section-flex">
        <div className="info-section-copy">
          <p className="section-eyebrow">Smart travel planning</p>
          <h2 className="info-section-heading">Plan smarter, travel better, experience more.</h2>
        </div>
        <div className="info-section-body-wrap">
          <p className="info-section-body">
            Alltripp combines AI-powered recommendations, real-time booking, and collaborative planning tools into one seamless platform. Whether you&apos;re planning a solo adventure or a company retreat, we make every journey effortless from start to finish.
          </p>
        </div>
      </div>
    </section>
  );
};
