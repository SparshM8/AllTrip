import React, { useEffect, useState } from 'react';
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { InfoSection } from './components/sections/InfoSection';
import { TripCardsSection } from './components/sections/TripCardsSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { CtaSection } from './components/sections/CtaSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { Footer } from './components/sections/Footer';
import { PartnerPage } from './components/pages/PartnerPage';

const App: React.FC = () => {
  const [isPartnerPage, setIsPartnerPage] = useState(false);

  useEffect(() => {
    const checkRoute = () => {
      const search = window.location.search;
      const pathname = window.location.pathname;
      setIsPartnerPage(search.includes('page=partner') || pathname.includes('/partner'));
    };

    checkRoute();
    window.addEventListener('popstate', checkRoute);
    window.addEventListener('hashchange', checkRoute);
    return () => {
      window.removeEventListener('popstate', checkRoute);
      window.removeEventListener('hashchange', checkRoute);
    };
  }, []);

  if (isPartnerPage) {
    return <PartnerPage />;
  }

  return (
    <div style={{ width: '100%', background: 'white', fontFamily: 'Plus Jakarta Sans', overflowX: 'hidden', paddingTop: 78 }}>
      <Header />
      <Hero />
      <InfoSection />
      <TripCardsSection />
      <FeaturesSection />
      <CtaSection />
      <TestimonialsSection />
      <Footer />
    </div>
  );
};

export default App;
