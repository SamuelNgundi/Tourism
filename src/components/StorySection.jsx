import React from 'react';

function StorySection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
          alt="Kenya mountain forest landscape"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-end min-h-[60vh]">
          <div className="space-y-6">
            <h2 className="text-5xl font-bold text-white leading-tight">
              OUR STORY BEGINS<br />
              IN THE SAVANNAH
            </h2>
          </div>
          
          <div className="space-y-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <img 
                src="https://images.unsplash.com/photo-1547970810-dc1eac37d174?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80"
                alt="Kenya wildlife safari scene"
                className="w-full h-32 object-cover rounded-lg mb-4"
              />
              <h3 className="text-lg font-semibold text-white mb-2">Safari Adventure</h3>
              <p className="text-white/80 text-sm">
                Deep in the heart of Kenya's savannah, where every step reveals incredible wildlife and breathtaking landscapes.
              </p>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20">
              <img 
                src="https://images.unsplash.com/photo-1554075599-74a3de1b4d47?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=250&q=80"
                alt="Kenyan cultural celebration"
                className="w-full h-32 object-cover rounded-lg mb-4"
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