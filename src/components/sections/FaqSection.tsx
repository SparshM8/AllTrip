import React, { useState } from 'react';

const FAQ_ITEMS = [
  {
    question: 'How does Alltripp pricing work?',
    answer:
      'Alltripp is free to start — the average setup takes just 4 minutes. Plans scale from solo trips to enterprise group travel, and you only pay for what you book.',
  },
  {
    question: 'Can you handle corporate and group retreats?',
    answer:
      'Yes. Alltripp helps teams coordinate shared itineraries, accommodation, transfers, activities, and live updates for corporate travel and group retreats.',
  },
  {
    question: 'Do you offer B2B partnerships?',
    answer:
      'We work with travel companies, hospitality providers, and businesses that want to offer a smoother planning and booking experience to their customers or teams.',
  },
  {
    question: 'What support do you offer while traveling?',
    answer:
      'Our support team is available throughout your journey to help with itinerary questions, booking changes, and unexpected travel details.',
  },
];

const ChevronIcon = ({ expanded }: { expanded: boolean }) => (
  <svg
    aria-hidden="true"
    className={`faq-chevron${expanded ? ' faq-chevron-expanded' : ''}`}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m6 9 6 6 6-6" />
  </svg>
);

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="faq-section">
      <div className="faq-container">
        <header className="faq-heading">
          <h2>Questions, answered.</h2>
          <p>Everything you want to know before your first Alltripp journey.</p>
        </header>

        <div className="faq-list">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            const answerId = `faq-answer-${index}`;

            return (
              <div className={`faq-item${isOpen ? ' faq-item-open' : ''}`} key={item.question}>
                <button
                  className="faq-question"
                  type="button"
                  aria-expanded={isOpen}
                  aria-controls={answerId}
                  onClick={() => setOpenIndex(isOpen ? -1 : index)}
                >
                  <span>{item.question}</span>
                  <ChevronIcon expanded={isOpen} />
                </button>
                <div
                  id={answerId}
                  className="faq-answer"
                  role="region"
                  aria-hidden={!isOpen}
                  hidden={!isOpen}
                >
                  <p>{item.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
