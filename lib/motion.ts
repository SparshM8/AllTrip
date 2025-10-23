import { Variants } from 'framer-motion';

// Central motion variants for consistent premium feel
// Easing tuned for subtle, professional motion (no harsh overshoot)
export const fadeInUp: Variants = {
  initial: { opacity: 0, y: 24, filter: 'blur(4px)' },
  animate: { opacity: 1, y: 0, filter: 'blur(0px)', transition: { duration: 0.6, ease: [0.4, 0, 0.2, 1] } },
};

export const staggerContainer = (delayChildren = 0.15, stagger = 0.08): Variants => ({
  initial: {},
  animate: { transition: { delayChildren, staggerChildren: stagger } },
});

export const scaleIn: Variants = {
  initial: { opacity: 0, scale: 0.95 },
  animate: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.4,0,0.2,1] } },
};

export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: { opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } },
};

export const slideInX = (dir: 1): Variants => ({
  initial: { opacity: 0, x: dir * 40 },
  animate: { opacity: 1, x: 0, transition: { duration: 0.55, ease: [0.4,0,0.2,1] } },
});

export const viewportOnce = { once: true, amount: 0.15 };
