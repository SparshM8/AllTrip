import { generateDestinationMetadata } from '@/lib/seo';

export const metadata = generateDestinationMetadata(
  'Goa',
  'Discover the beach paradise of Goa with AllTripp. Experience pristine beaches, vibrant nightlife, Portuguese heritage, and delicious seafood. Book your Goa holiday package today.',
  ['Goa beaches', 'North Goa', 'South Goa', 'Goa nightlife', 'Portuguese heritage', 'Goa tourism']
);

export default function GoaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "name": "Goa",
            "description": "Beach paradise with pristine shores, vibrant nightlife, and rich Portuguese heritage",
            "url": "https://alltripp.com/destinations/goa",
            "image": "https://alltripp.com/destinations/goa.jpg",
            "containedInPlace": {
              "@type": "Country",
              "name": "India"
            },
            "touristType": ["Beach", "Cultural", "Nightlife", "Leisure"],
            "hasMap": "https://maps.google.com/?q=Goa,India"
          })
        }}
      />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Goa - Beach Paradise of India
          </h1>
          
          <div className="mb-8">
            <img 
              src="/destinations/goa.jpg" 
              alt="Goa beaches - Beautiful coastline and palm trees" 
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              loading="eager"
            />
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              Experience the magic of Goa with AllTripp's curated beach experiences.
              From the bustling beaches of North Goa to the serene shores of South Goa,
              discover a perfect blend of relaxation, adventure, and cultural heritage.
            </p>
            
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Why Choose Goa?</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
              <li>Pristine beaches with golden sand and clear waters</li>
              <li>Vibrant nightlife and beach parties</li>
              <li>Rich Portuguese colonial heritage and architecture</li>
              <li>Delicious seafood and Goan cuisine</li>
              <li>Water sports and adventure activities</li>
              <li>Peaceful beach resorts and luxury accommodations</li>
            </ul>
            
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Popular Attractions</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">North Goa</h3>
                <p className="text-gray-700 dark:text-gray-300">Famous for Baga, Calangute, and Anjuna beaches with vibrant nightlife and water sports.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">South Goa</h3>
                <p className="text-gray-700 dark:text-gray-300">Peaceful beaches like Palolem and Agonda, perfect for relaxation and luxury resorts.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Old Goa</h3>
                <p className="text-gray-700 dark:text-gray-300">UNESCO World Heritage site with beautiful churches and Portuguese architecture.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Panaji</h3>
                <p className="text-gray-700 dark:text-gray-300">Capital city featuring colorful houses, local markets, and the famous Mandovi River.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
