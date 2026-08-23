import React, { useEffect, useState } from 'react';
import { Header } from './components/sections/Header';
import { Hero } from './components/sections/Hero';
import { AboutSection } from './components/sections/AboutSection';
import { InfoSection } from './components/sections/InfoSection';
import { TripCardsSection } from './components/sections/TripCardsSection';
import { FeaturesSection } from './components/sections/FeaturesSection';
import { CtaSection } from './components/sections/CtaSection';
import { TestimonialsSection } from './components/sections/TestimonialsSection';
import { FaqSection } from './components/sections/FaqSection';
import { Footer } from './components/sections/Footer';
import { PartnerPage } from './components/pages/PartnerPage';
import { DestinationsPage } from './components/pages/DestinationsPage';

const App: React.FC = () => {
  const [isPartnerPage, setIsPartnerPage] = useState(false);
  const [isAboutPage, setIsAboutPage] = useState(false);
  const [isDestinationsPage, setIsDestinationsPage] = useState(false);

  useEffect(() => {
    const checkRoute = () => {
      const search = window.location.search;
      const pathname = window.location.pathname;
      setIsPartnerPage(search.includes('page=partner') || pathname.includes('/partner'));
      setIsAboutPage(pathname === '/about' || pathname.startsWith('/about/'));
      setIsDestinationsPage(pathname === '/destinations' || pathname.startsWith('/destinations/'));
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

  if (isAboutPage) {
    return (
      <div style={{ width: '100%', background: 'white', fontFamily: 'Poppins', overflowX: 'hidden', paddingTop: 78 }}>
        <Header />
        <AboutSection />
        <Footer />
      </div>
    );
  }

  if (isDestinationsPage) {
    return <DestinationsPage />;
  }

  return (
    <div style={{ width: '100%', background: 'white', fontFamily: 'Poppins', overflowX: 'hidden', paddingTop: 78 }}>
      <Header />
      <Hero />
      <InfoSection />
      <TripCardsSection />
      <FeaturesSection />
      <CtaSection />
      <TestimonialsSection />
      <FaqSection />
      <Footer />
    </div>
  );
};

export default App;
