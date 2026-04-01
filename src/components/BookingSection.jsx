import React, { useState } from 'react';
import { Calendar, MapPin, Users, Compass, Star } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

function BookingSection() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleBookSafari = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 5000);
  };
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <OptimizedImage 
          src="https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
          alt="Kenya safari camping with tent"
          className="w-full h-full object-cover"
          widths={[640, 960, 1280, 1536, 1920]}
          sizes="100vw"
          quality={70}
          priority
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-forest-500 mb-4">
            BOOK YOUR DREAM<br />
            <span className="text-white">SAFARI NOW</span>
          </h2>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <div className="bg-white/95 backdrop-blur-sm rounded-2xl p-8 shadow-2xl">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">CHECK IN</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input 
                    type="date" 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">CHECK OUT</label>
                <div className="relative">
                  <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input 
                    type="date" 
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent"
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">GUESTS</label>
                <div className="relative">
                  <Users className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent appearance-none">
                    <option>2 Guests</option>
                    <option>3 Guests</option>
                    <option>4 Guests</option>
                    <option>5+ Guests</option>
                  </select>
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">DESTINATION</label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <select className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-forest-500 focus:border-transparent appearance-none">
                    <option>Maasai Mara</option>
                    <option>Amboseli National Park</option>
                    <option>Tsavo East & West</option>
                    <option>Samburu National Reserve</option>
                  </select>
                </div>
              </div>
            </div>
            
            <div className="text-center">
              <button 
                onClick={handleBookSafari}
                className="bg-brand-green text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2 cursor-pointer"
              >
                BOOK YOUR SAFARI
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Coming Soon Modal */}
      {showComingSoon && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div 
            className="bg-gradient-to-br from-white to-brand-green/5 rounded-3xl shadow-2xl max-w-md w-full p-8 transform animate-scale-up border-2 border-brand-green/20 relative overflow-hidden"
            onClick={() => setShowComingSoon(false)}
          >
            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-brand-green/10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-nature-400/10 rounded-full translate-y-12 -translate-x-12"></div>
            
            <div className="relative z-10 text-center">
              {/* Icon with animation */}
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-brand-green to-camp-600 rounded-full flex items-center justify-center mb-6 shadow-lg animate-bounce-slow">
                <Calendar className="h-10 w-10 text-white" />
              </div>

              {/* Title */}
              <h3 className="text-3xl font-bold text-gray-900 mb-3">
                Coming <span className="text-brand-green">Soon!</span>
              </h3>

              {/* Message */}
              <p className="text-gray-700 mb-6 leading-relaxed">
                Our safari booking feature is launching soon. Get ready to embark on an unforgettable adventure through Kenya's magnificent landscapes!
              </p>

              {/* Features preview */}
              <div className="bg-brand-green/5 rounded-xl p-4 mb-6">
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-center justify-center gap-2">
                    <Compass className="h-4 w-4 text-brand-green" />
                    <span>Wildlife Safaris in Maasai Mara</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Star className="h-4 w-4 text-brand-green" />
                    <span>Beach Resorts in Diani & Malindi</span>
                  </div>
                  <div className="flex items-center justify-center gap-2">
                    <Users className="h-4 w-4 text-brand-green" />
                    <span>Cultural Experiences & More</span>
                  </div>
                </div>
              </div>

              {/* CTA Text */}
              <p className="text-sm text-brand-green font-semibold italic">
                Stay tuned for amazing experiences!
              </p>

              {/* Close button */}
              <button
                onClick={() => setShowComingSoon(false)}
                className="mt-6 bg-brand-green text-white px-8 py-2.5 rounded-lg font-semibold hover:bg-brand-greenDark transition-all duration-200 shadow-md hover:shadow-lg"
              >
                Got it!
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default BookingSection;
