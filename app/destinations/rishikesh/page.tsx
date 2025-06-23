import { generateDestinationMetadata } from '@/lib/seo';

export const metadata = generateDestinationMetadata(
  'Rishikesh',
  'Discover the yoga capital of the world with AllTripp Rishikesh tours. Experience spiritual awakening, adventure sports, Ganga Aarti, and ancient ashrams. Book your Rishikesh spiritual journey today.',
  ['Rishikesh yoga', 'Ganga Aarti', 'River rafting Rishikesh', 'Rishikesh ashrams', 'Adventure sports', 'Spiritual tourism']
);

export default function RishikeshPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "TouristDestination",
            "name": "Rishikesh",
            "description": "Yoga capital of the world with spiritual heritage, adventure sports, and Ganga Aarti",
            "url": "https://alltripp.com/destinations/rishikesh",
            "image": "https://alltripp.com/destinations/rishikesh.jpg",
            "containedInPlace": {
              "@type": "Country",
              "name": "India"
            },
            "touristType": ["Spiritual", "Adventure", "Cultural", "Wellness"],
            "hasMap": "https://maps.google.com/?q=Rishikesh,India"
          })
        }}
      />
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Rishikesh - Yoga Capital of the World
          </h1>
            <div className="mb-8">
            <img 
              src="/destinations/Uttarakhand.jpg" 
              alt="Rishikesh - River Ganges and spiritual temples" 
              className="w-full h-64 md:h-96 object-cover rounded-lg shadow-lg"
              loading="eager"
            />
          </div>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-700 mb-6">
              Embark on a spiritual journey to Rishikesh with AllTripp's transformative experiences. 
              Known as the Yoga Capital of the World, Rishikesh offers the perfect blend of 
              spirituality, adventure, and natural beauty along the sacred River Ganges.
            </p>
            
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Why Choose Rishikesh?</h2>
            <ul className="list-disc pl-6 mb-6 text-gray-700">
              <li>World-renowned yoga and meditation centers</li>
              <li>Sacred River Ganges and spiritual atmosphere</li>
              <li>Adventure sports like river rafting and bungee jumping</li>
              <li>Ancient temples and ashrams</li>
              <li>Evening Ganga Aarti ceremonies</li>
              <li>Gateway to the Himalayas and char dham yatra</li>
            </ul>
            
            <h2 className="text-3xl font-semibold text-gray-900 mb-4">Popular Attractions</h2>
            <div className="grid md:grid-cols-2 gap-6 mb-8">
              <div>
                <h3 className="text-xl font-semibold mb-2">Laxman Jhula</h3>
                <p>Iconic suspension bridge across the Ganges with spiritual significance and stunning views.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Triveni Ghat</h3>
                <p>Sacred confluence point where evening Ganga Aarti creates a mesmerizing spiritual experience.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Beatles Ashram</h3>
                <p>Famous meditation retreat where The Beatles stayed and composed music in the 1960s.</p>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Adventure Sports</h3>
                <p>Thrilling river rafting, bungee jumping, and zip-lining for adrenaline enthusiasts.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
