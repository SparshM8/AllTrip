import { generateDestinationMetadata } from '@/lib/seo';

export const metadata = generateDestinationMetadata(
  'Jim Corbett',
  'Discover India\'s oldest national park with AllTripp Jim Corbett tours. Experience wildlife safaris, tiger spotting, elephant safaris, and nature conservation. Book your Jim Corbett wildlife adventure today.',
  ['Jim Corbett safari', 'Tiger safari', 'Wildlife tours', 'Corbett National Park', 'Elephant safari', 'Wildlife photography']
);

export default function JimCorbettPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "name": "Jim Corbett National Park",
            "description": "India's oldest national park famous for tiger safaris, wildlife conservation, and diverse flora fauna",
            "url": "https://alltripp.com/destinations/jim-corbett",
            "image": "https://alltripp.com/destinations/jim-corbett.jpg",
            "containedInPlace": {
              "@type": "Country",
              "name": "India"
            },
            "touristType": ["Wildlife", "Nature", "Adventure", "Photography"],
            "hasMap": "https://maps.google.com/?q=Jim+Corbett+National+Park,India"
          })
        }}
      />
      
      <div className="container mx-auto px-4 py-20">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-6">
            Jim Corbett - India's Premier Wildlife Destination
          </h1>
            <div className="mb-8">
            <img
              src="/destinations/Uttarakhand.jpg"
              alt="Jim Corbett National Park - Tigers and wildlife in natural habitat"
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              loading="eager"
            />
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 dark:text-gray-300 mb-6">
              Embark on an extraordinary wildlife adventure to Jim Corbett with AllTripp's expert safari experiences.
              As India's oldest national park, Corbett offers the best tiger viewing opportunities
              and diverse ecosystem in the heart of Uttarakhand's pristine wilderness.
            </p>

            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Why Choose Jim Corbett?</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700 dark:text-gray-300">
              <li>India's first national park established in 1936</li>
              <li>Highest tiger density and excellent tiger spotting opportunities</li>
              <li>Diverse wildlife including elephants, leopards, and 600+ bird species</li>
              <li>Multiple safari zones with unique landscapes and wildlife</li>
              <li>Luxury resorts and eco-friendly accommodations</li>
              <li>Adventure activities like river rafting and nature walks</li>
            </ul>
            
            <h2 className="text-3xl font-semibold text-gray-900 dark:text-white mb-4">Safari Zones & Attractions</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Dhikala Zone</h3>
                <p className="text-gray-700 dark:text-gray-300">Core area with highest tiger density, diverse wildlife, and overnight forest rest houses.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Bijrani Zone</h3>
                <p className="text-gray-700 dark:text-gray-300">Popular day safari zone near Ramnagar with excellent wildlife sightings and accessibility.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Jhirna Zone</h3>
                <p className="text-gray-700 dark:text-gray-300">Open year-round zone offering consistent wildlife viewing and sloth bear sightings.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">Durga Devi Zone</h3>
                <p className="text-gray-700 dark:text-gray-300">Peaceful zone with elephant safaris, bird watching, and beautiful river views.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
