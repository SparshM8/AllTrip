import React from 'react';
import { Footer } from '../sections/Footer';
import { Header } from '../sections/Header';
import { ItinerarySection } from '../sections/ItinerarySection';

export const DestinationsPage: React.FC = () => {
  return (
    <div className="destinations-page">
      <Header />
      <main className="destinations-page-main">
        <ItinerarySection />
      </main>
      <Footer />
    </div>
  );
};
