import { generateDestinationMetadata } from '@/lib/seo';

export const metadata = generateDestinationMetadata(
  'Himachal Pradesh',
  'Discover the beauty of Himachal Pradesh with AllTripp. Experience hill stations, snow-capped mountains, adventure sports, and serene valleys. Book your Himachal Pradesh tour today.',
  ['Himachal Pradesh tours', 'Shimla Manali', 'Dharamshala', 'Himachal hill stations', 'Adventure sports', 'Mountain tourism']
);

export default function HimachalPradeshPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "name": "Himachal Pradesh",
            "description": "Beautiful hill state with snow-capped mountains, serene valleys, and adventure sports",
            "url": "https://alltripp.com/destinations/himachal-pradesh",
            "image": "https://alltripp.com/destinations/himachal-pradesh.jpg",
            "containedInPlace": {
              "@type": "Country",
              "name": "India"
            },
            "touristType": ["Adventure", "Nature", "Hill Station", "Leisure"],
            "hasMap": "https://maps.google.com/?q=Himachal+Pradesh,India"
          })
        }}
      />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Himachal Pradesh - Land of Gods
          </h1>
            <div className="mb-8">
            <img
              src="/destinations/himachal-pradesh.jpg"
              alt="Himachal Pradesh - Beautiful mountain valleys and hill stations"
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              loading="eager"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              Explore the enchanting beauty of Himachal Pradesh with AllTripp's mountain adventures.
              From the colonial charm of Shimla to the adventure capital Manali, discover a land
              blessed with snow-capped peaks, lush valleys, and vibrant hill station culture.
            </p>

            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Why Choose Himachal Pradesh?</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
              <li>Scenic hill stations with pleasant weather year-round</li>
              <li>Adventure sports like paragliding, skiing, and trekking</li>
              <li>Rich cultural heritage and ancient temples</li>
              <li>Beautiful valleys and snow-capped mountain views</li>
              <li>Colonial architecture and heritage hotels</li>
              <li>Local handicrafts and delicious Himachali cuisine</li>
            </ul>
            
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Popular Destinations</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Shimla</h3>
                <p className="text-gray-700 dark:text-gray-300">Former British summer capital with colonial architecture, Mall Road, and scenic toy train.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Manali</h3>
                <p className="text-gray-700 dark:text-gray-300">Adventure hub offering skiing, paragliding, and gateway to high-altitude destinations.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Dharamshala</h3>
                <p className="text-gray-700 dark:text-gray-300">Home to the Dalai Lama with McLeod Ganj, Tibetan culture, and beautiful mountain views.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Spiti Valley</h3>
                <p className="text-gray-700 dark:text-gray-300">High-altitude desert valley with ancient monasteries and dramatic landscapes.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
