import React from 'react';

function PartnersSection() {
  const partners = [
    {
      name: "Kenya Tourism Board",
      logo: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80"
    },
    {
      name: "Kenya Wildlife Service", 
      logo: "https://images.unsplash.com/photo-1565726952525-b39a4ddbb644?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80"
    },
    {
      name: "Kenya Association of Hotelkeepers",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80"
    },
    {
      name: "Kenya Civil Aviation Authority",
      logo: "https://images.unsplash.com/photo-1517804234-5885b7cb0b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80"
    },
    {
      name: "Kenya Association of Travel Agents",
      logo: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80"
    },
    {
      name: "Ministry of Tourism & Wildlife",
      logo: "https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80"
    },
    {
      name: "Kenya National Museums",
      logo: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80"
    },
    {
      name: "Kenya Forest Service",
      logo: "https://images.unsplash.com/photo-1516426122078-c23e76319801?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80"
    },
    {
      name: "Kenya Airports Authority",
      logo: "https://images.unsplash.com/photo-1549366021-9f761d040a94?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80"
    },
    {
      name: "Kenya Cultural Centre",
      logo: "https://images.unsplash.com/photo-1554075599-74a3de1b4d47?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80"
    },
    {
      name: "Kenya Association of Tour Operators",
      logo: "https://images.unsplash.com/photo-1547970810-dc1eac37d174?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80"
    },
    {
      name: "East African Community",
      logo: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80"
    }
  ];

  // Duplicate the partners array for seamless infinite scroll
  const duplicatedPartners = [...partners, ...partners];

  return (
    <section className="py-20 bg-gradient-to-br from-nature-50 to-forest-50 overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-forest-900 mb-4">
            OUR <span className="text-nature-600">PARTNERS</span>
          </h2>
          <p className="text-lg text-forest-700 max-w-3xl mx-auto">
            Working together with leading organizations to promote Kenya as a premier tourism destination 
            and support the #TembeaKenya movement across the country.
          </p>
        </div>

        <div className="relative">
          {/* Auto-scrolling container */}
          <div className="flex animate-scroll-left space-x-8 items-center">
            {duplicatedPartners.map((partner, index) => (
              <div 
                key={`${partner.name}-${index}`}
                className="flex-shrink-0 bg-white rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 group"
              >
                <div className="p-6 flex flex-col items-center justify-center h-32 w-48">
                  <img 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="max-h-16 max-w-full object-contain mb-3 group-hover:scale-105 transition-transform duration-300"
                  />
                  <p className="text-xs font-medium text-forest-700 text-center leading-tight">
                    {partner.name}
                  </p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Gradient overlays for smooth fade effect */}
          <div className="absolute inset-y-0 left-0 w-20 bg-gradient-to-r from-nature-50 to-transparent pointer-events-none z-10"></div>
          <div className="absolute inset-y-0 right-0 w-20 bg-gradient-to-l from-nature-50 to-transparent pointer-events-none z-10"></div>
        </div>

        <div className="text-center mt-12">
          <p className="text-forest-600 mb-4">
            Interested in partnering with Tourism Ambassadors Kenya?
          </p>
          <button className="bg-nature-500 text-white px-8 py-3 rounded-lg font-semibold hover:bg-nature-600 transition-colors">
            BECOME A PARTNER
          </button>
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;
