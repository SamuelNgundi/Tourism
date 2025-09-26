import React from 'react';
import { MapPin, Clock, Users, Star } from 'lucide-react';

function ToursPage() {
  const groupTours = [
    {
      title: "Maasai Mara Classic Safari",
      duration: "3 Days / 2 Nights",
      price: "KES 45,000",
      image: "https://images.unsplash.com/photo-1518459384564-ecfd8e80721f?q=80&w=848&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Experience the Great Migration and Big Five in Kenya's most famous game reserve."
    },
    {
      title: "Coastal Culture Experience",
      duration: "4 Days / 3 Nights",
      price: "KES 32,000",
      image: "https://images.unsplash.com/photo-1664980587166-a6ff379c4637?q=80&w=872&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Discover Swahili culture, pristine beaches, and historic coastal towns."
    }
  ];

  const nairobiTours = [
    {
      title: "Nairobi City Walking Tour",
      duration: "Half Day",
      price: "KES 3,500",
      image: "https://images.unsplash.com/photo-1611348524140-53c9a25263d6?q=80&w=873&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Explore the vibrant capital with visits to markets, museums, and cultural sites."
    },
    {
      title: "Nairobi National Park & Giraffe Centre",
      duration: "Full Day",
      price: "KES 8,500",
      image: "https://images.unsplash.com/photo-1635595358293-03620e36be48?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      description: "Wildlife safari within the city limits plus intimate giraffe encounters."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
            alt="Kenya safari landscape with elephants"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/80 to-forest-900/40"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            DISCOVER KENYA WITH <span className="text-nature-400">#TembeaKenya</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            From wildlife safaris to cultural immersions, explore authentic Kenyan experiences curated by local Tourism Ambassadors.
          </p>
        </div>
      </section>

      {/* Group Tours */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-forest-900 mb-4">
              GROUP <span className="text-nature-600">TOURS</span>
            </h2>
            <p className="text-lg text-forest-700">Join fellow travelers on scheduled group adventures</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {groupTours.map((tour, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-nature-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {tour.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-forest-900 mb-2">{tour.title}</h3>
                  <div className="flex items-center space-x-4 mb-3 text-sm text-forest-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Users className="h-4 w-4" />
                      <span>Group</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  <button className="w-full bg-brand-green text-white py-3 rounded-lg font-semibold hover:bg-brand-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2">
                    ENQUIRE NOW
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Visit Nairobi */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-forest-900 mb-4">
              VISIT <span className="text-nature-600">NAIROBI</span>
            </h2>
            <p className="text-lg text-forest-700">Explore Kenya's vibrant capital city</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {nairobiTours.map((tour, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="relative h-64">
                  <img src={tour.image} alt={tour.title} className="w-full h-full object-cover" />
                  <div className="absolute top-4 right-4 bg-camp-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                    {tour.price}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-forest-900 mb-2">{tour.title}</h3>
                  <div className="flex items-center space-x-4 mb-3 text-sm text-forest-600">
                    <div className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{tour.duration}</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <MapPin className="h-4 w-4" />
                      <span>Nairobi</span>
                    </div>
                  </div>
                  <p className="text-gray-600 mb-4">{tour.description}</p>
                  <button className="w-full bg-brand-green text-white py-3 rounded-lg font-semibold hover:bg-brand-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2">
                    BOOK NOW
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Custom Tours */}
      <section className="py-20 bg-gradient-to-br from-nature-500 to-forest-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center text-white mb-12">
            <h2 className="text-4xl font-bold mb-4">
              CREATE YOUR OWN <span className="text-nature-200">ADVENTURE</span>
            </h2>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Let our Tourism Ambassadors design a personalized journey that matches your interests and budget.
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 max-w-2xl mx-auto">
            <form className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input 
                  type="text" 
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:ring-2 focus:ring-white/50"
                />
                <input 
                  type="email" 
                  placeholder="Email Address"
                  className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:ring-2 focus:ring-white/50"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <select className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-white/50">
                  <option value="">Preferred Duration</option>
                  <option value="1-3">1-3 Days</option>
                  <option value="4-7">4-7 Days</option>
                  <option value="8+">8+ Days</option>
                </select>
                <select className="w-full px-4 py-3 rounded-lg bg-white/20 text-white border border-white/30 focus:ring-2 focus:ring-white/50">
                  <option value="">Budget Range</option>
                  <option value="budget">Budget (Under KES 30k)</option>
                  <option value="mid">Mid-range (KES 30k-80k)</option>
                  <option value="luxury">Luxury (KES 80k+)</option>
                </select>
              </div>
              <textarea 
                placeholder="Tell us about your dream Kenya experience..."
                rows="4"
                className="w-full px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:ring-2 focus:ring-white/50 resize-none"
              ></textarea>
              <button className="w-full bg-white text-brand-green py-4 rounded-lg font-semibold text-lg hover:bg-brand-green/10 transition-colors">
                REQUEST CUSTOM TOUR
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default ToursPage;
