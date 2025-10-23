"use client";

import ItinerariesSection from "@/components/trips-section";
import StructuredData from "@/components/structured-data";
import itineraries from "@/data/itineraries.json";
import { generateItemListStructuredData } from "@/lib/seo";

export default function ItinerariesPage() {
  const itemList = generateItemListStructuredData(
    'Offbeat India Itineraries',
    'Curated multi-day authentic cultural and nature travel itineraries across offbeat Indian destinations',
    '/itineraries',
    itineraries.map((it: any) => ({
      name: it.title,
      description: it.description,
      url: `/itineraries/${it.title.toLowerCase().replace(/[^a-z0-9]+/g,'-')}`,
      price: it.price,
      priceCurrency: 'INR',
      type: 'TouristTrip'
    }))
  );
  return (
    <div className="min-h-screen">
      <StructuredData data={itemList} />
      <ItinerariesSection />
    </div>
  );
}
