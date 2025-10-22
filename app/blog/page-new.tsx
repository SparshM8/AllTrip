import { generateMetadata } from '@/lib/seo';
import { Metadata } from 'next';
import BlogSection from "@/components/blog-section";

export const metadata: Metadata = generateMetadata({
  title: "Travel Blog - India Travel Tips, Guides & Stories | AllTripp",
  description: "Discover India through our travel blog. Get expert travel tips, destination guides, cultural insights, and inspiring stories from across incredible India. Plan your perfect trip with AllTripp's travel blog.",
  keywords: [
    "India travel blog",
    "travel tips India",
    "India destination guides",
    "cultural experiences India",
    "travel stories India",
    "adventure travel blog",
    "backpacking India",
    "India travel inspiration",
    "travel guides India",
    "cultural tours blog"
  ],
  ogImage: "/himalayas.jpg",
});

export default function BlogPage() {
  return (
    <main>
      <BlogSection />
    </main>
  );
}
