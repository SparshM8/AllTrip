import React, { useState } from 'react';
import logoSrc from '../../assets/Vector.svg';
import instagramIcon from '../../assets/Icon - Instagram.svg';
import linkedinIcon from '../../assets/Icon - LinkedIn.svg';
import youtubeIcon from '../../assets/Icon - YouTube.svg';
import { FOOTER_LINKS } from '../../data/mockData';

const SOCIAL_LINKS = [
  { label: 'Instagram', icon: instagramIcon },
  { label: 'LinkedIn', icon: linkedinIcon },
  { label: 'YouTube', icon: youtubeIcon },
];

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubscribed(true);
  };

  return (
    <footer className="footer-wrapper">
      <div className="footer-flex">
        <div className="footer-brand">
          <img src={logoSrc} alt="Alltripp" className="footer-logo" loading="lazy" />
          <p className="footer-description">
            The all-in-one travel platform for individuals, families and enterprises.
          </p>
          <form className={`footer-newsletter${subscribed ? ' footer-newsletter-subscribed' : ''}`} onSubmit={handleSubscribe}>
            <label className="sr-only" htmlFor="footer-email">
              Email address
            </label>
            <input
              id="footer-email"
              type="email"
              name="email"
              autoComplete="email"
              placeholder={subscribed ? 'You’re on the list' : 'Email address'}
              value={email}
              onChange={event => {
                setEmail(event.target.value);
                setSubscribed(false);
              }}
              required
              aria-label="Email address"
            />
            <button type="submit" aria-label="Subscribe with email">
              <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h13M13 6l6 6-6 6" />
              </svg>
            </button>
          </form>
          {subscribed && (
            <p className="footer-newsletter-status" role="status" aria-live="polite">
              Thanks — you’re on the list.
            </p>
          )}
          <div className="footer-social-links">
            {SOCIAL_LINKS.map(social => (
              <a
                key={social.label}
                href="#"
                aria-label={social.label}
                className="footer-social-link"
              >
                <img src={social.icon} alt="" loading="lazy" />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-links-grid">
          {Object.entries(FOOTER_LINKS).map(([category, links]) => (
            <div className="footer-link-column" key={category}>
              <h4>{category}</h4>
              <div className="footer-link-list">
                {links.map(link => (
                  <a key={link} href="#">
                    {link}
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="footer-bottom-row">
        <span>© 2025 Alltripp. All rights reserved.</span>
      </div>
    </footer>
  );
};
