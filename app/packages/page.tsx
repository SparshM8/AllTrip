import { generateMetadata, generateItemListStructuredData } from '@/lib/seo';
import { Metadata } from 'next';
import Image from 'next/image';
import packagesData from '@/data/packages.json';
import StructuredData from '@/components/structured-data';

// Hardcoded image mapping for packages
const packageImages: { [key: string]: string } = {
  "Kashmir Paradise": "/destinations/kashmir-wonderland.jpg",
  "Kerala Backwaters": "/destinations/kerala-backwaters.webp",
  "Royal Rajasthan": "/featured/rajasthan-heritage.jpg",
};

export const metadata: Metadata = generateMetadata({
  title: "India Tour Packages - Customized Travel Experiences by AllTripp",
  description: "Browse AllTripp's curated India tour packages. Find the perfect holiday package for Kashmir, Kerala, Rajasthan, Himachal Pradesh, and more destinations. Book authentic travel experiences with expert local guidance.",
  keywords: [
    "India tour packages",
    "holiday packages India",
    "travel packages India",
    "customized tours India",
    "Kashmir packages",
    "Kerala packages",
    "Rajasthan packages",
    "Himachal packages",
    "adventure tours India",
    "cultural tours India",
    "family holiday packages",
    "honeymoon packages India"
  ],
  canonical: "https://alltripp.com/packages"
  // ogImage intentionally omitted to use dynamic /api/og generation
});

export default function PackagesPage() {
  const packages = packagesData;

  const itemList = generateItemListStructuredData(
    'AllTripp Tour Packages',
    'Curated travel packages for authentic India experiences',
    '/packages',
    packages.map((pkg: any) => ({
      name: pkg.name,
      description: `${pkg.duration} package to ${pkg.destination}`,
      url: `/packages/${pkg.name.toLowerCase().replace(/\s+/g, '-')}`,
      image: packageImages[pkg.name] || '/featured/default.jpg',
      price: pkg.price.replace('₹',''),
      priceCurrency: 'INR',
      type: 'TouristTrip'
    }))
  );
  return (
    <div className="min-h-screen bg-gray-50">
      <StructuredData data={itemList} />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              India Tour Packages
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover India's incredible diversity with our curated travel packages. 
              From snow-capped mountains to tropical beaches, from royal palaces to 
              serene backwaters - find your perfect Indian adventure.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-2 gap-8 mb-12">
            {packages.map((pkg, index) => (
              <div key={index} className="bg-white rounded-lg shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">                  <Image
                    src={packageImages[pkg.name] || "/featured/default.jpg"}
                    alt={`${pkg.name} - ${pkg.destination} tour package`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 600px"
                    priority={index < 2}
                    className="object-cover"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {pkg.price}
                  </div>
                </div>
                
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{pkg.name}</h3>
                  <p className="text-gray-600 mb-3">{pkg.destination} • {pkg.duration}</p>
                  
                  <div className="mb-4">
                    <h4 className="font-semibold text-gray-900 mb-2">Highlights:</h4>
                    <div className="flex flex-wrap gap-2">
                      {pkg.highlights.map((highlight, idx) => (
                        <span key={idx} className="bg-gray-100 text-gray-700 px-3 py-1 rounded-full text-sm">
                          {highlight}
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-2xl font-bold text-blue-600">{pkg.price}</span>
                      <span className="text-gray-500 text-sm ml-1">per person</span>
                    </div>
                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Looking for Something Custom?
            </h2>
            <p className="text-gray-600 mb-6 text-lg">
              Our travel experts can create a personalized itinerary based on your preferences, 
              budget, and travel dates. Get a custom quote today!
            </p>
            <button className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors text-lg font-semibold">
              Get Custom Quote
            </button>
          </div>
          
          <div className="mt-12 grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl mb-4">🏆</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Expert Curation</h3>
              <p className="text-gray-600">Hand-picked experiences by local travel experts</p>
            </div>
            <div>
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Best Value</h3>
              <p className="text-gray-600">Competitive pricing with no hidden costs</p>
            </div>
            <div>
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">24/7 Support</h3>
              <p className="text-gray-600">Round-the-clock assistance during your journey</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
