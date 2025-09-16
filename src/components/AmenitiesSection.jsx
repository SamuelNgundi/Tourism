import React from 'react';
import { Shield, Zap, Wifi, Utensils } from 'lucide-react';

function AmenitiesSection() {
  const amenities = [
    {
      icon: Shield,
      title: "Expert Guides",
      description: "Professional safari guides with deep knowledge of Kenya's wildlife and culture"
    },
    {
      icon: Utensils,
      title: "Authentic Cuisine", 
      description: "Experience traditional Kenyan dishes and international cuisine at safari lodges"
    },
    {
      icon: Zap,
      title: "Luxury Lodges",
      description: "Comfortable accommodations with modern amenities in the heart of the wilderness"
    },
    {
      icon: Wifi,
      title: "24/7 Support",
      description: "Round-the-clock assistance and emergency support throughout your safari"
    }
  ];

  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1517804234-5885b7cb0b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
          alt="Kenya wildlife silhouette at sunset"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-forest-900/60 via-forest-800/40 to-forest-900/80"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">
            DISCOVER SAFARI <span className="text-nature-400">SERVICES</span>
          </h2>
          <p className="text-white/80 text-lg max-w-3xl mx-auto">
            Experience world-class safari services designed for comfort and authentic experiences, 
            making your Kenyan adventure both memorable and seamless.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {amenities.map((amenity, index) => (
            <div key={index} className="text-center group">
              <div className="bg-white/10 backdrop-blur-sm rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4 border border-white/20 group-hover:bg-nature-500/20 transition-colors">
                <amenity.icon className="h-10 w-10 text-nature-400" />
              </div>
              <h3 className="text-lg font-semibold text-white mb-2">{amenity.title}</h3>
              <p className="text-white/70 text-sm">{amenity.description}</p>
            </div>
          ))}
        </div>
        
        <div className="mt-16 text-center">
          <div className="absolute inset-x-0 bottom-10">
            <div className="flex justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-full p-4 border border-white/20">
                <svg className="w-16 h-16 text-nature-400" viewBox="0 0 100 100" fill="currentColor">
                  <path d="M50 10 L60 30 L80 30 L65 45 L70 65 L50 55 L30 65 L35 45 L20 30 L40 30 Z"/>
                  <circle cx="50" cy="15" r="3"/>
                  <path d="M45 75 Q50 85 55 75"/>
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AmenitiesSection;
