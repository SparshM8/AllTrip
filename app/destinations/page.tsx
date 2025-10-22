import Link from "next/link";
import Image from "next/image";
import destinationsData from "@/data/destinations.json";
import { generateMetadata as baseGenerateMetadata, generateItemListStructuredData, jsonLdScript } from "@/lib/seo";
import DestinationsIndex, { type DestinationItem } from "@/components/destinations-index";

export const metadata = baseGenerateMetadata({
  title: "Destinations Across India",
  description:
    "Browse AllTripp's curated destinations across India. Discover Goa, Kashmir, Kerala, Rajasthan, Ladakh and more, and jump into detailed guides.",
  canonical: "/destinations",
  keywords: [
    "India destinations",
    "Goa",
    "Kashmir",
    "Kerala",
    "Rajasthan",
    "Ladakh",
    "travel India",
  ],
});

function uniqueByName<T extends { name: string }>(arr: T[]): T[] {
  return Array.from(new Map(arr.map((i) => [i.name, i])).values());
}

export default function DestinationsIndexPage() {
  const unique = uniqueByName(destinationsData as any[]);
  const items = unique.map((d) => ({
    name: d.name,
    description: d.location || undefined,
    url: `/destinations/${d.name.toLowerCase().replace(/\s+/g, "-")}`,
  }));

  // Image map aligned with components/destinations-section.tsx
  const destinationImages: Record<string, string> = {
    Goa: "/destinations/goa.jpg",
    Rishikesh: "/destinations/Rishikesh.jpg",
    "Jim Corbett": "/destinations/Jim_Corbett.png",
    Amritsar: "/destinations/Amritsar.jpg",
    Kashmir: "/destinations/kashmir.jpg",
    Kerala: "/destinations/kerala.jpg",
    Rajasthan: "/destinations/rajasthan.jpg",
    Ladakh: "/destinations/Ladakh.jpg",
    "Himachal Pradesh": "/destinations/himachal-pradesh.jpg",
    "Andaman and Nicobar": "/destinations/andaman-nicobar.jpg",
    Assam: "/destinations/assam.jpeg",
    Darjeeling: "/destinations/Darjeeling.jpg",
    Delhi: "/destinations/delhi.jpg",
    Manali: "/destinations/Manali.jpg",
    Meghalaya: "/destinations/Meghalaya.jpg",
    Shimla: "/destinations/Shimla.jpg",
    Uttarakhand: "/destinations/Uttarakhand.jpg",
  };

  const itemList = generateItemListStructuredData(
    "AllTripp Destinations",
    "A curated list of popular destinations across India",
    "/destinations",
    items
  );

  return (
    <main className="min-h-screen bg-white dark:bg-[hsl(var(--surface-base))]">
      <div className="container mx-auto px-6 md:px-16 lg:px-20 py-16">
        <h1 className="text-3xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tighter uppercase">
          Destinations
        </h1>
        <p className="mt-3 text-base md:text-lg text-gray-700 dark:text-gray-300">
          Explore our top-rated destinations and jump into detailed guides.
        </p>

        <DestinationsIndex
          items={unique.map((d) => ({
            name: d.name,
            location: d.location,
            href: `/destinations/${d.name.toLowerCase().replace(/\s+/g, "-")}`,
            image: destinationImages[d.name] || "/placeholder.jpg",
            badge: (d as any).badge,
            region: d.location ? (d.location.includes(",") ? d.location.split(",")[0].trim() : d.location) : undefined,
            blurDataURL: undefined,
            tags: (d as any).tags || [],
          })) as DestinationItem[]}
        />
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={jsonLdScript(itemList)}
      />
    </main>
  );
}
