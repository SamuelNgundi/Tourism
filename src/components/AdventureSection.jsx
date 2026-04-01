import React, { useState } from 'react';
import OptimizedImage from './OptimizedImage';
import { Calendar, Compass, Star, Users } from 'lucide-react';

function AdventureSection() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleStartSafari = () => {
    setShowComingSoon(true);
    setTimeout(() => setShowComingSoon(false), 5000);
  };
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <OptimizedImage 
          src="https://images.unsplash.com/photo-1547970810-dc1eac37d174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Kenya wildlife adventure"
          className="w-full h-full object-cover"
          widths={[640, 960, 1280, 1536, 1920]}
          sizes="100vw"
          quality={70}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-camp-900/80 to-transparent"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-white leading-tight">
              DISCOVER YOURSELF<br />
              THROUGH <span className="text-camp-300">WILDLIFE</span><br />
              SAFARI
            </h2>
            
            <p className="text-white/80 text-lg">
              Embark on a journey of discovery through Kenya's incredible wildlife reserves. 
              Our safaris offer the perfect blend of adventure and authentic African experiences.
            </p>
            
            <button 
              onClick={handleStartSafari}
              className="bg-brand-green text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2 cursor-pointer"
            >
              START YOUR SAFARI
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-camp-500/30 to-transparent rounded-2xl"></div>
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

export default AdventureSection;
