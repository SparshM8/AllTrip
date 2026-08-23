import React, { useState } from 'react';
import { Header } from '../sections/Header';
import { Footer } from '../sections/Footer';

const BENEFITS = [
  'Reach high-intent luxury travelers',
  'Showcase your best experiences',
  'Receive thoughtful partnership support',
];

const SparkleIcon = () => (
  <svg
    aria-hidden="true"
    className="partner-sparkle-icon"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="m12 2 1.35 5.65L19 9l-5.65 1.35L12 16l-1.35-5.65L5 9l5.65-1.35L12 2Z" />
    <path d="m19 15 .65 2.35L22 18l-2.35.65L19 21l-.65-2.35L16 18l2.35-.65L19 15Z" />
  </svg>
);

const ArrowUpRightIcon = () => (
  <svg aria-hidden="true" className="partner-arrow-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M7 17 17 7M7 7h10v10" />
  </svg>
);

export const PartnerPage: React.FC = () => {
  const [businessName, setBusinessName] = useState('');
  const [email, setEmail] = useState('');
  const [businessType, setBusinessType] = useState('');
  const [offer, setOffer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="partner-page">
      <Header />

      <main className="partner-contact-section">
        <div className="partner-route-pill">
          <span aria-hidden="true" className="partner-route-dot" />
          <span>Partner route / 01</span>
        </div>

        <div className="partner-contact-container">
          <section className="partner-contact-copy" aria-labelledby="partner-page-title">
            <p className="partner-kicker">A better way to be discovered</p>
            <h1 id="partner-page-title">
              Grow your hospitality business
              <br />
              with a <em>better guest</em>
              <br />
              <em>journey.</em>
            </h1>
            <p className="partner-intro">
              Join a curated network of exceptional stays, local experts, and experience makers reaching travelers who value thoughtful service and extraordinary detail.
            </p>

            <div className="partner-actions">
              <a
                className="partner-primary-action"
                href="https://wa.me/919266602470?text=Hi%20Alltripp%20Team,%20I%20would%20like%20to%20partner%20with%20Alltripp."
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>Start a conversation</span>
                <ArrowUpRightIcon />
              </a>
              <a className="partner-secondary-action" href="/">
                Back to Alltripp
              </a>
            </div>

            <ul className="partner-benefits">
              {BENEFITS.map(benefit => (
                <li key={benefit}>
                  <span aria-hidden="true">✓</span>
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </section>

          <section className="partner-form-card" aria-labelledby="partner-form-title">
            {submitted ? (
              <div className="partner-form-success">
                <div className="partner-success-icon">✓</div>
                <h2>Thank you for your interest.</h2>
                <p>Our partnerships team will review your profile and get back to you shortly.</p>
                <button type="button" onClick={() => setSubmitted(false)}>
                  Submit another request
                </button>
              </div>
            ) : (
              <form className="partner-form" onSubmit={handleSubmit}>
                <div className="partner-form-icon">
                  <SparkleIcon />
                </div>
                <h2 id="partner-form-title">Tell us about your business</h2>
                <p className="partner-form-intro">
                  Share a few details and our partnerships team will review your profile.
                </p>

                <div className="partner-form-fields">
                  <label>
                    <span className="sr-only">Business name</span>
                    <input
                      type="text"
                      name="businessName"
                      autoComplete="organization"
                      placeholder="Business name"
                      value={businessName}
                      onChange={event => setBusinessName(event.target.value)}
                      required
                    />
                  </label>
                  <label>
                    <span className="sr-only">Work email</span>
                    <input
                      type="email"
                      name="email"
                      autoComplete="email"
                      placeholder="Work email"
                      value={email}
                      onChange={event => setEmail(event.target.value)}
                      required
                    />
                  </label>
                  <label>
                    <span className="sr-only">Business type</span>
                    <select name="businessType" value={businessType} onChange={event => setBusinessType(event.target.value)} required>
                      <option value="" disabled>
                        Business type
                      </option>
                      <option value="hotel">Hotel or villa</option>
                      <option value="experience">Experience maker</option>
                      <option value="travel-service">Travel service provider</option>
                      <option value="other">Other</option>
                    </select>
                  </label>
                  <label>
                    <span className="sr-only">Tell us what you offer</span>
                    <textarea
                      name="offer"
                      placeholder="Tell us what you offer"
                      value={offer}
                      onChange={event => setOffer(event.target.value)}
                      rows={4}
                      required
                    />
                  </label>
                </div>

                <button className="partner-submit-button" type="submit">
                  <span>Submit partner interest</span>
                  <ArrowUpRightIcon />
                </button>
              </form>
            )}
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
};
