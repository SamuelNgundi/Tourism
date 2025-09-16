import React from 'react';

function PartnersSection() {
  const partners = [
    {
      name: "Magical Kenya",
    },
    {
      name: "Magical Kenya",
      logo: "https://images.unsplash.com/photo-1574680096145-d05b474e2155?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80"
    },
    {
      name: "Magical Kenya",
      logo: "https://images.unsplash.com/photo-1565726952525-b39a4ddbb644?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80"
    },
    {
      name: "Magical Kenya",
      logo: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=100&q=80"
    }
  ];

  return (
    <section className="partners-section">
      <div className="container">
        <h2>Our Partners</h2>
        <div className="partners-grid">
          {partners.map((partner, index) => (
            <div key={index} className="partner-item">
              <img src={partner.logo} alt={partner.name} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default PartnersSection;