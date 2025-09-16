import React from 'react';

function AdventureSection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1547970810-dc1eac37d174?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
          alt="Kenya wildlife adventure"
          className="w-full h-full object-cover"
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
            
            <button className="bg-camp-500 text-white px-8 py-4 rounded-lg font-semibold hover:bg-camp-600 transition-colors">
              START YOUR SAFARI
            </button>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-br from-camp-500/30 to-transparent rounded-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AdventureSection;
