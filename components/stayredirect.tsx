import React from 'react';

// Inject small CSS class for background image + overlay to avoid inline styles
if (typeof document !== 'undefined' && !(globalThis as any).__STAY_REDIRECT_STYLES__) {
  const s = document.createElement('style');
  s.id = 'stay-redirect-bg-style';
  s.textContent = `
    .stay-redirect-bg { background-image: url('/stayredirect-bg.png'); background-size: cover; background-position: center; position: relative; }
    .stay-redirect-bg::before { content: ''; position: absolute; inset: 0; background: linear-gradient(180deg, rgba(0,0,0,0.45), rgba(0,0,0,0.55)); pointer-events: none; }
    .stay-redirect-bg > .stay-redirect-content { position: relative; z-index: 10; }
  `;
  document.head.appendChild(s);
  (globalThis as any).__STAY_REDIRECT_STYLES__ = true;
}

const StayRedirect = () => {
  return (
    <section className="bg-background dark:bg-gray-900 py-20">
      <div className="container mx-auto px-7">
        <div className="relative rounded-lg overflow-hidden stay-redirect-bg">
          <div className="stay-redirect-content relative z-10 p-12 md:p-24 text-white">
            <h2 className="text-4xl md:text-5xl font-bold font-serif mb-6 max-w-xl">
              Nourish the mind, body, and spirit.
            </h2>
            <p className="text-base md:text-lg mb-8 max-w-xl">
              Many people find that the combination of being in a peaceful
              natural setting and engaging in activities that nourish the
              mind, body, and spirit leave them feeling rejuvenated and
              refreshed.
            </p>
            <button type="button" className="bg-[#F5B963] text-black font-semibold py-3 px-10 rounded-md hover:bg-opacity-90 transition-colors">
              Find available stays
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StayRedirect;
