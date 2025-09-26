import React from 'react';

function StorySection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1649688047697-f1f6b5557500?q=80&w=387&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Kenya mountain forest landscape"
          className="w-full h-full object-cover"
          loading="lazy"
          decoding="async"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end min-h-[60vh]">
          {/* Left column: heading and feature card with responsive order */}
          <div className="flex flex-col gap-6">
            <h2 className="text-5xl font-bold text-white leading-tight order-1 lg:order-2">
              OUR STORY BEGINS<br />
              IN THE SAVANNAH
            </h2>
            <div className="block bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 order-2 lg:order-1">
              <img 
                src="https://images.unsplash.com/photo-1546182990-dffeafbe841d?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="The Big Five of Kenya"
                className="w-full h-40 sm:h-48 lg:h-56 object-cover rounded-lg mb-4"
                loading="lazy"
                decoding="async"
              />
              <h3 className="text-xl font-semibold text-white mb-1">The Big 5</h3>
              <p className="text-white/80 text-sm">Lion • Leopard • Elephant • Rhino • Buffalo</p>
            </div>
          </div>

          {/* Right column: existing story cards */}
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <img 
                src="https://images.unsplash.com/photo-1547970810-dc1eac37d174?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80"
                alt="Kenya wildlife safari scene"
                className="w-full h-32 object-cover rounded-lg mb-4"
                loading="lazy"
                decoding="async"
              />
              <h3 className="text-lg font-semibold text-white mb-2">Safari Adventure</h3>
              <p className="text-white/80 text-sm">
                Deep in the heart of Kenya's savannah, where every step reveals incredible wildlife and breathtaking landscapes.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <img 
                src="https://images.unsplash.com/photo-1696299871960-59ae209db58b?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Kenyan cultural celebration"
                className="w-full h-32 object-cover rounded-lg mb-4"
                loading="lazy"
                decoding="async"
              />
              <h3 className="text-lg font-semibold text-white mb-2">Cultural Stories</h3>
              <p className="text-white/80 text-sm">
                Experience authentic Kenyan culture and traditions with local communities under starlit African skies.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default StorySection;