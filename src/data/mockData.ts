import type { TripCard, FeatureItem, TestimonialItem, FooterLinksMap } from '../types';
import icon1 from '../assets/Icon-1.svg';
import icon4 from '../assets/Icon-4.svg';
import icon10 from '../assets/Icon-10.svg';

export const NAV_LINKS = [
  { name: 'Home', href: '/#home' },
  { name: 'About', href: '/#about' },
  { name: 'Gallery', href: '/#gallery' },
  { name: 'Testimonials', href: '/#testimonials' },
  { name: 'Partner with us', href: '?page=partner' },
];

export const DESTINATION_CATEGORIES = ['All', 'Mountain', 'Beaches', 'Treks', 'Others'];

export const TRIP_CARDS: TripCard[] = [
  {
    title: 'Plan your Alpine retreat',
    desc: 'Discover luxury mountain lodges with curated experiences for the discerning traveller. From Dolomites to Rockies.',
    variant: 'green',
  },
  {
    title: 'Vivamus fermentum odio eu feugiat',
    desc: 'Vivamus fermentum odio eu feugiat tincidunt. Integer varius, nisi nec consectetur convallis, erat erat luctus sapien.',
    variant: 'green',
  },
  {
    title: 'Coastal escapes, reimagined',
    desc: 'From sun-soaked Maldives to rugged Big Sur, we curate private coastal getaways matched to your preferences.',
    variant: 'green',
  },
  {
    title: "Trek the world's great trails",
    desc: 'Expert-guided treks across Patagonia, Everest Base Camp, and Kilimanjaro — all managed in one platform.',
    variant: 'green',
  },
  {
    title: 'Corporate travel, simplified',
    desc: 'Streamline group itineraries and corporate retreats. Our platform handles logistics so your team can focus on what matters.',
    variant: 'grey',
  },
  {
    title: 'Family adventures, stress-free',
    desc: 'Kid-friendly destinations with smart filters. Find activities, accommodation, and transfers in seconds.',
    variant: 'light',
  },
  {
    title: 'Wellness & retreat journeys',
    desc: 'Yoga retreats, digital detox camps, and spa escapes — wellness travel handpicked for you.',
    variant: 'green',
  },
  {
    title: 'City breaks & cultural tours',
    desc: 'Art, history, gastronomy. Curated urban experiences in Paris, Tokyo, Istanbul and beyond.',
    variant: 'green',
  },
];

export const FEATURES: FeatureItem[] = [
  {
    icon: icon1,
    title: 'Smart Itinerary Builder',
    desc: 'AI-powered suggestions that adapt to your travel style, budget, and interests in real time.',
  },
  {
    icon: icon4,
    title: 'All-in-one Booking',
    desc: 'Flights, hotels, transfers, and experiences booked from a single unified dashboard.',
  },
  {
    icon: icon10,
    title: 'Group Travel Management',
    desc: 'Synchronise plans across your entire group with live updates, split payments, and shared itineraries.',
  },
];

export const TESTIMONIALS: TestimonialItem[] = [
  {
    name: 'Sarah M.',
    role: 'Frequent Traveller',
    quote: '"Alltripp transformed how I plan every trip. I saved 6 hours on my last Kyoto itinerary."',
    bg: 'https://images.unsplash.com/photo-1500534314209-a25ddb2bd429?w=600&q=80',
    video: 'https://cdn.coverr.co/videos/coverr-flying-over-a-forest-and-mountains-6202/1080p.mp4',
  },
  {
    name: 'James R.',
    role: 'Corporate Travel Manager',
    quote: '"Managing 40-person retreats used to be a nightmare. Alltripp made it effortless."',
    bg: 'https://images.unsplash.com/photo-1551632436-cbf8dd35adfa?w=600&q=80',
    video: 'https://cdn.coverr.co/videos/coverr-view-of-a-lake-in-the-mountains-5353/1080p.mp4',
  },
  {
    name: 'Priya K.',
    role: 'Family Traveller',
    quote: '"Found a perfect family-friendly villa in Bali within minutes. Absolutely love Alltripp."',
    bg: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80',
    video: 'https://cdn.coverr.co/videos/coverr-palm-trees-and-beach-aerial-view-4527/1080p.mp4',
  },
];

export const FOOTER_LINKS: FooterLinksMap = {
  Product: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'API'],
  Company: ['About Us', 'Careers', 'Blog', 'Press', 'Partners'],
  Support: ['Help Center', 'Community', 'Status', 'Contact Us', 'Privacy'],
  Legal: ['Terms', 'Privacy Policy', 'Cookie Policy', 'GDPR', 'Licenses'],
};
