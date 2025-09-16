import React from 'react';
import { ArrowRight, Users, Star } from 'lucide-react';

function HeroSection() {
  return (
    <section className="relative min-h-screen bg-nature-gradient overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
          alt="Kenya wildlife safari landscape"
          className="w-full h-full object-cover"
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
                DISCOVER KENYA'S<br />
                <span className="text-forest-600">MAGICAL SAFARI</span><br />
                EXPERIENCES
              </h1>
              
              <p className="text-gray-600 mb-8">
                Experience the breathtaking wildlife of Kenya and embark on unforgettable safari adventures. 
                From the Big Five in Maasai Mara to pristine coastal beaches in Diani.
              </p>
              
              <div className="flex items-center space-x-4 mb-8">
                <div className="flex -space-x-2">
                  <img src="https://images.unsplash.com/photo-1494790108755-2616b612d6c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" alt="Happy tourist" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" alt="Safari guide" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" alt="Tourism ambassador" className="w-10 h-10 rounded-full border-2 border-white" />
                  <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&h=100&q=80" alt="Cultural guide" className="w-10 h-10 rounded-full border-2 border-white" />
                  <div className="w-10 h-10 rounded-full bg-forest-500 border-2 border-white flex items-center justify-center">
                    <span className="text-xs font-semibold text-white">+10</span>
                  </div>
                </div>
                <div>
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-500">1000+ Happy Campers</p>
                </div>
              </div>
              
              <button className="group inline-flex items-center gap-2 bg-nature-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-nature-600 transition-all duration-200">
                BOOK SAFARI NOW
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </button>
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
