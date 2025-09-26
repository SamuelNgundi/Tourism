import React from 'react';

function SerenitySection() {
  return (
    <section className="relative py-20 overflow-hidden">
      <div className="absolute inset-0">
        <img 
          src="https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
          alt="Peaceful campfire in Kenya wilderness"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-forest-900/90 to-forest-900/70"></div>
      </div>
      
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h2 className="text-4xl font-bold text-nature-400 leading-tight">
              ARE YOU READY FOR<br />
              <span className="text-white">THE MAGIC OF</span><br />
              <span className="text-white">KENYA?</span>
            </h2>
            
            <p className="text-white/80 text-lg">
              Experience the profound beauty and wildlife that only Kenya can provide. 
              Disconnect from the ordinary and reconnect with the wild heart of Africa.
            </p>
            
            <button className="bg-brand-green text-white px-8 py-4 rounded-lg font-semibold hover:bg-brand-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2">
              EXPLORE KENYA
            </button>
          </div>
          
          <div className="relative">
            <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
              <img 
                src="https://images.unsplash.com/photo-1532574754390-44dc5c6780bb?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                alt="Peaceful Kenya landscape with mountains"
                className="w-full h-64 object-cover rounded-xl mb-6"
              />
              <h3 className="text-xl font-semibold text-white mb-3">Find Your Adventure</h3>
              <p className="text-white/80">
                Immerse yourself in the sounds of Africa, from roaring lions to the gentle rustle of acacia trees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default SerenitySection;
