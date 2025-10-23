import { generateDestinationMetadata, generateDestinationStructuredData } from '@/lib/seo';
import StructuredData from '@/components/structured-data';

export const metadata = generateDestinationMetadata(
  'Rajasthan',
  'Explore the Land of Kings with AllTripp Rajasthan tours. Discover majestic palaces, forts, desert safaris, and royal heritage. Book your Rajasthan holiday package for an unforgettable royal experience.',
  ['Jaipur tours', 'Udaipur palaces', 'Jodhpur blue city', 'Jaisalmer desert', 'Rajasthan heritage', 'royal palaces']
);

export default function RajasthanPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800">
      <StructuredData data={generateDestinationStructuredData('Rajasthan', 'Land of Kings featuring majestic palaces, forts, desert landscapes, and rich royal heritage')} />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Rajasthan - Land of Kings
          </h1>

          <div className="mb-8">
            <img
              src="/destinations/rajasthan.jpg"
              alt="Rajasthan Palace - Majestic royal architecture"
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              loading="eager"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              Step into a world of royal grandeur with AllTripp's Rajasthan experiences.
              From the Pink City of Jaipur to the golden sands of Jaisalmer, discover the
              magnificent heritage and vibrant culture of India's most regal state.
            </p>

            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Why Choose Rajasthan?</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
              <li>Magnificent palaces and historic forts</li>
              <li>Vibrant culture and traditional arts</li>
              <li>Desert safaris and camel rides</li>
              <li>Royal heritage hotels and luxury experiences</li>
              <li>Colorful festivals and local cuisine</li>
            </ul>
            
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Popular Attractions</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Jaipur</h3>
                <p className="text-gray-700 dark:text-gray-300">The Pink City featuring Amber Fort, City Palace, and Hawa Mahal.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Udaipur</h3>
                <p className="text-gray-700 dark:text-gray-300">City of Lakes with stunning palaces and romantic ambiance.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Jodhpur</h3>
                <p className="text-gray-700 dark:text-gray-300">The Blue City dominated by the magnificent Mehrangarh Fort.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Jaisalmer</h3>
                <p className="text-gray-700 dark:text-gray-300">Golden City offering desert safaris and stunning sandstone architecture.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
