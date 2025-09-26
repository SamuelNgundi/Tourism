import React from 'react';
import logo from '../images/logo.jpg.jpeg';
import { ArrowRight, Users, Star } from 'lucide-react';

function HeroSection() {
  return (
    <section className="relative min-h-screen bg-nature-gradient overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
          alt="Kenya wildlife safari landscape"
          className="w-full h-full object-cover"
          fetchpriority="high"
          loading="eager"
          decoding="async"
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
                <button className="group inline-flex items-center gap-2 bg-brand-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-greenDark transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2 focus:ring-offset-white">
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
    </section>
  );
}

export default HeroSection;
