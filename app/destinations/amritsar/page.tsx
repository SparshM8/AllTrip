import { generateDestinationMetadata } from '@/lib/seo';

export const metadata = generateDestinationMetadata(
  'Amritsar',
  'Discover the spiritual heart of Punjab with AllTripp Amritsar tours. Experience Golden Temple, Sikh heritage, Wagah Border ceremony, and authentic Punjabi culture. Book your Amritsar pilgrimage today.',
  ['Golden Temple', 'Amritsar tours', 'Sikh heritage', 'Wagah Border', 'Punjab culture', 'Religious tourism']
);

export default function AmritsarPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "name": "Amritsar",
            "description": "Spiritual center of Sikhism featuring Golden Temple, rich Punjab culture, and historic significance",
            "url": "https://alltripp.com/destinations/amritsar",
            "image": "https://alltripp.com/destinations/amritsar.jpg",
            "containedInPlace": {
              "@type": "Country",
              "name": "India"
            },
            "touristType": ["Religious", "Cultural", "Historical", "Spiritual"],
            "hasMap": "https://maps.google.com/?q=Amritsar,India"
          })
        }}
      />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Amritsar - Golden City of Punjab
          </h1>
            <div className="mb-8">
            <img 
              src="/destinations/delhi.jpg" 
              alt="Amritsar - Golden Temple and Sikh heritage" 
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              loading="eager"
            />
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              Experience the spiritual magnificence of Amritsar with AllTripp's cultural journeys.
              Home to the Golden Temple, this sacred city offers profound spiritual experiences,
              rich Sikh heritage, and the warmth of Punjabi hospitality.
            </p>

            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Why Choose Amritsar?</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
              <li>Sacred Golden Temple - holiest shrine of Sikhism</li>
              <li>Rich Sikh history and cultural heritage</li>
              <li>Famous Wagah Border ceremony with Pakistan</li>
              <li>Delicious authentic Punjabi cuisine</li>
              <li>Historic Jallianwala Bagh memorial</li>
              <li>Warm Punjabi hospitality and vibrant culture</li>
            </ul>
            
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Must-Visit Attractions</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Golden Temple</h3>
                <p className="text-gray-700 dark:text-gray-300">Stunning golden shrine surrounded by sacred pool, offering spiritual peace and community kitchen.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Wagah Border</h3>
                <p className="text-gray-700 dark:text-gray-300">Famous border ceremony between India and Pakistan with patriotic fervor and military parade.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Jallianwala Bagh</h3>
                <p className="text-gray-700 dark:text-gray-300">Historic memorial commemorating the tragic 1919 massacre during British colonial rule.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Akal Takht</h3>
                <p className="text-gray-700 dark:text-gray-300">Highest temporal seat of Sikh authority facing the Golden Temple with religious significance.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
