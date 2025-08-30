import { generateDestinationMetadata } from '@/lib/seo';

export const metadata = generateDestinationMetadata(
  'Ladakh',
  'Discover the land of high passes with AllTripp Ladakh tours. Experience stunning landscapes, Buddhist monasteries, pristine lakes, and adventure biking. Book your Ladakh expedition today.',
  ['Ladakh tours', 'Leh Ladakh', 'Pangong Lake', 'Ladakh monasteries', 'Ladakh biking', 'High altitude lakes']
);

export default function LadakhPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "name": "Ladakh",
            "description": "Land of high passes with stunning landscapes, Buddhist monasteries, and pristine lakes",
            "url": "https://alltripp.com/destinations/ladakh",
            "image": "https://alltripp.com/destinations/ladakh.jpg",
            "containedInPlace": {
              "@type": "Country",
              "name": "India"
            },
            "touristType": ["Adventure", "Cultural", "Nature", "Spiritual"],
            "hasMap": "https://maps.google.com/?q=Ladakh,India"
          })
        }}
      />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Ladakh - Land of High Passes
          </h1>
            <div className="mb-8">
            <img
              src="/destinations/Ladakh.jpg"
              alt="Ladakh - Stunning mountain landscapes and monasteries"
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              loading="eager"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              Experience the raw beauty of Ladakh with AllTripp's adventure expeditions.
              Known as the Land of High Passes, Ladakh offers breathtaking landscapes,
              ancient Buddhist culture, and some of the world's most challenging yet rewarding adventures.
            </p>

            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Why Choose Ladakh?</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
              <li>Spectacular high-altitude landscapes and mountain passes</li>
              <li>Ancient Buddhist monasteries and spiritual heritage</li>
              <li>Pristine lakes like Pangong Tso and Tso Moriri</li>
              <li>Adventure activities like biking, trekking, and river rafting</li>
              <li>Unique Ladakhi culture and cuisine</li>
              <li>Stargazing opportunities in clear mountain skies</li>
            </ul>
            
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Popular Attractions</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Pangong Lake</h3>
                <p className="text-gray-700 dark:text-gray-300">Stunning high-altitude lake stretching across India and China with changing blue hues.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Leh Palace</h3>
                <p className="text-gray-700 dark:text-gray-300">Historic royal palace offering panoramic views of Leh town and surrounding mountains.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Nubra Valley</h3>
                <p className="text-gray-700 dark:text-gray-300">Desert valley accessible via Khardung La pass, featuring sand dunes and double-humped camels.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Hemis Monastery</h3>
                <p className="text-gray-700 dark:text-gray-300">Largest monastery in Ladakh famous for its annual festival and ancient Buddhist artifacts.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
