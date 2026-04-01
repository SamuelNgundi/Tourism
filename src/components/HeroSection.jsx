import React, { useState } from 'react';
import logo from '../images/logo-bg.png';
import { ArrowRight, Users, Star, Calendar, Compass } from 'lucide-react';
import OptimizedImage from './OptimizedImage';

function HeroSection() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const handleBookSafari = () => {
    setShowComingSoon(true);
    // Auto-hide after 5 seconds
    setTimeout(() => setShowComingSoon(false), 5000);
  };
  return (
    <section className="relative min-h-screen bg-nature-gradient overflow-hidden">
      <div className="absolute inset-0">
        <OptimizedImage 
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
          alt="Kenya wildlife safari landscape"
          className="w-full h-full object-cover"
          widths={[640, 960, 1280, 1536, 1920]}
          sizes="100vw"
          quality={70}
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-nature-900/60 to-forest-900/40"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
          <div className="space-y-8">
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              <div className="text-center mb-6">
                <p className="text-lg font-semibold text-forest-600 mb-2">Welcome to Kenya</p>
                <h2 className="text-2xl font-bold text-camp-600">THE HOME OF HUMAN ORIGIN</h2>
              </div>
              <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-6">
                TOURISM AMBASSADORS<br />
                <span className="text-forest-600">KENYA</span>
              </h1>
              
              <p className="text-gray-600 mb-8">
                Experience the breathtaking wildlife of Kenya and embark on unforgettable safari adventures. 
                From the Big Five in Maasai Mara to pristine coastal beaches in Diani.
              </p>
              
            <div className="flex items-center justify-center space-x-3 mb-8">
              {/* Replace the rating and avatars with your logo */}
              <div>
                <img
                  src={logo}
                  alt="Tourism Website Logo"
                  className="h-30 w-auto object-contain"
                />
              </div>
            </div>
                          
              <div className="flex justify-center">
                <button 
                  onClick={handleBookSafari}
                  className="group inline-flex items-center gap-2 bg-brand-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-greenDark transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2 focus:ring-offset-white cursor-pointer"
                >
                  <Compass className="h-5 w-5" />
                  BOOK SAFARI NOW
                </button>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <h2 className="text-3xl font-bold text-white mb-4">
                KENYA'S<br />
                <span className="text-nature-300">WONDERS</span>
              </h2>
              <p className="text-white/80">
                Immerse yourself in Kenya's diverse landscapes and discover the beauty of East Africa's crown jewel.
              </p>
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

export default HeroSection;
