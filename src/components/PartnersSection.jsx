import React from 'react';
import Magical from '../images/Magical_Kenya.png';
import Tourism from '../images/Tourism.jpg';
import Kepaco from '../images/Kepaco.jpg';
import Global from '../images/Global.png';
import OptimizedImage from './OptimizedImage';

function PartnersSection() {
  const partners = [
    {
      name: "Magical Kenya",
      logo: Magical,
    },
    {
      name: "Ministry of Tourism and Wildlife", 
      logo: Tourism,
    },
    {
      name: "Global Peace Chain",
      logo: Global,
    },
    {
      name: "KePACO",
      logo: Kepaco,
    },
    {
      name: "Magical Kenya",
      logo: Magical,
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
                  <OptimizedImage 
                    src={partner.logo} 
                    alt={`${partner.name} logo`}
                    className="max-h-16 max-w-full object-contain mb-3 group-hover:scale-105 transition-transform duration-300"
                    widths={[200, 300, 400]}
                    sizes="192px"
                    quality={80}
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
          <button className="bg-brand-green text-white px-8 py-3 rounded-lg font-semibold hover:bg-brand-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2">
            BECOME A PARTNER
          </button>
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;
