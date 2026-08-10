export type CardVariant = 'green' | 'grey' | 'light';

export interface TripCard {
  title: string;
  desc: string;
  variant: CardVariant;
  image?: string;
}

export interface FeatureItem {
  icon: string;
  title: string;
  desc: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  quote: string;
  bg: string;
  video?: string;
}

export type FooterLinksMap = Record<string, string[]>;
