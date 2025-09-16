import React from 'react';
import { Tent, TreePine, Camera, Compass } from 'lucide-react';

function ActivitiesSection() {
  const activities = [
    {
      icon: Camera,
      title: "Wildlife Safari",
      description: "Experience the Big Five in their natural habitat across Kenya's national parks",
      image: "https://images.unsplash.com/photo-1659639237213-e30ddf33fd4c?q=80&w=1032&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    },
    {
      icon: Compass,
      title: "Cultural Tours",
      description: "Immerse yourself in authentic Maasai and local Kenyan traditions",
      image: "https://images.unsplash.com/photo-1704495511133-0cb58501606a?q=80&w=870&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-forest-600 mb-4">
            DISCOVER THE EXPERIENCES
          </h2>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Experience a wide range of authentic Kenyan adventures designed to connect you with wildlife, culture, and create lasting memories.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {activities.map((activity, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
              <div className="relative h-48">
                <img 
                  src={activity.image}
                  alt={activity.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="bg-nature-500 p-2 rounded-lg">
                      <activity.icon className="h-5 w-5 text-white" />
                    </div>
                    <h3 className="text-white font-semibold text-lg">{activity.title}</h3>
                  </div>
                  <p className="text-white/80 text-sm">{activity.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="relative">
          <div className="absolute inset-0">
            <img 
              src="https://images.unsplash.com/photo-1521651201144-634f700b36ef?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&h=600&q=80"
              alt="Kenya forest landscape"
              className="w-full h-full object-cover rounded-2xl"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-forest-900/80 to-transparent rounded-2xl"></div>
          </div>
          
          <div className="relative p-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <h3 className="text-3xl font-bold text-white mb-4">
                  Immerse in Kenya's Beauty
                </h3>
                <p className="text-white/80 mb-6">
                  Discover the Great Migration, ancient baobab trees, and pristine wilderness areas that will take your breath away.
                </p>
              </div>
              
              <div className="space-y-4">
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center space-x-3">
                    <Camera className="h-6 w-6 text-nature-400" />
                    <span className="text-white font-medium">Wildlife Photography</span>
                  </div>
                </div>
                
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex items-center space-x-3">
                    <Compass className="h-6 w-6 text-nature-400" />
                    <span className="text-white font-medium">Guided Safari Walks</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ActivitiesSection;
