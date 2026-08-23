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

export type FooterLinksMap = Record<string, string[]>;
