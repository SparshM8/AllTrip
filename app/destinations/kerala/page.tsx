import { generateDestinationMetadata, generateDestinationStructuredData } from '@/lib/seo';
import StructuredData from '@/components/structured-data';

export const metadata = generateDestinationMetadata(
  'Kerala',
  'Experience God\'s Own Country with AllTripp Kerala tours. Explore serene backwaters, hill stations, spice plantations, and pristine beaches. Book your Kerala holiday package for an authentic South Indian experience.',
  ['Alleppey backwaters', 'Munnar hills', 'Kochi tours', 'Kerala houseboats', 'Kumarakom', 'Wayanad wildlife']
);

export default function KeralaPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800">
      <StructuredData data={generateDestinationStructuredData('Kerala', "God's Own Country featuring backwaters, hill stations, spice plantations, and rich cultural heritage")} />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Kerala - God's Own Country
          </h1>

          <div className="mb-8">
            <img
              src="/destinations/kerala.jpg"
              alt="Kerala Backwaters - Serene houseboats and palm trees"
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              loading="eager"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              Immerse yourself in the tranquil beauty of Kerala with AllTripp's authentic travel experiences.
              From the serene backwaters of Alleppey to the misty hills of Munnar, Kerala offers a perfect
              blend of nature, culture, and wellness.
            </p>

            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Why Choose Kerala?</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
              <li>Unique backwater experiences with traditional houseboats</li>
              <li>Lush hill stations and spice plantations</li>
              <li>Authentic Ayurvedic treatments and wellness retreats</li>
              <li>Rich cultural heritage and classical arts</li>
              <li>Pristine beaches and coastal beauty</li>
            </ul>
            
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Popular Attractions</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Alleppey</h3>
                <p className="text-gray-700 dark:text-gray-300">Venice of the East with serene backwaters and traditional houseboats.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Munnar</h3>
                <p className="text-gray-700 dark:text-gray-300">Hill station paradise with tea plantations and cool climate.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Kochi</h3>
                <p className="text-gray-700 dark:text-gray-300">Historic port city blending colonial architecture with modern culture.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Kumarakom</h3>
                <p className="text-gray-700 dark:text-gray-300">Bird sanctuary and backwater destination perfect for nature lovers.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
