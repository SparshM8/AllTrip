import React from 'react';
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { InfoSection } from './components/sections/InfoSection';
import { TripCardsSection } from './components/sections/TripCardsSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { CtaSection } from './components/sections/CtaSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { PartnersSection } from './components/sections/PartnersSection';
import { Footer } from './components/sections/Footer';

const App: React.FC = () => {
  return (
    <div style={{ width: '100%', background: 'white', fontFamily: 'Outfit', overflowX: 'hidden' }}>
      <Header />
      <Hero />
      <InfoSection />
      <TripCardsSection />
      <FeaturesSection />
      <CtaSection />
      <TestimonialsSection />
      <PartnersSection />
      <Footer />
    </div>
  );
};

export default App;
