import React, { useState } from 'react';
import { Target, Eye, Users, Award, Mail, Phone, MapPin, Download } from 'lucide-react';

function InfoPage() {
  const [activeTab, setActiveTab] = useState('about');

  const teamMembers = [
    {
      name: "Dr. Sarah Kimani",
      role: "Executive Director",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612d6c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Tourism expert with 15+ years experience in destination marketing and cultural preservation."
    },
    {
      name: "James Mwangi",
      role: "Community Engagement Manager",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Passionate advocate for youth involvement in tourism development and community empowerment."
    },
    {
      name: "Grace Wanjiru",
      role: "Cultural Programs Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=300&h=300&q=80",
      bio: "Expert in Kenyan cultural heritage and traditional practices with focus on authentic tourism experiences."
    }
  ];

  const membershipBenefits = [
    "Exclusive access to cultural events and festivals",
    "Professional development workshops and training",
    "Networking opportunities with tourism industry leaders",
    "Certificate of participation as Tourism Ambassador",
    "Priority booking for educational tours and trips",
    "Access to digital resources and tourism materials",
    "Opportunity to represent Kenya at international events",
    "Monthly newsletter with tourism updates and opportunities"
  ];

  const responsibilities = [
    "Promote positive image of Kenya as a tourist destination",
    "Share authentic cultural experiences and stories",
    "Participate in community tourism development initiatives",
    "Organize local events that showcase Kenyan culture",
    "Mentor new members and support club activities",
    "Contribute to #TembeaKenya social media campaigns",
    "Provide feedback on tourism development programs",
    "Maintain high standards of hospitality and professionalism"
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
            alt="Kenya landscape"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/80 to-forest-900/40"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            ABOUT TOURISM <span className="text-nature-400">AMBASSADORS</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Learn more about our mission, membership benefits, team, and how you can be part of the #TembeaKenya movement.
          </p>
        </div>
      </section>

      {/* Navigation Tabs */}
      <section className="py-8 bg-white border-b">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="flex flex-wrap justify-center space-x-8">
            {[
              { key: 'about', label: 'About Us' },
              { key: 'membership', label: 'Membership' },
              { key: 'team', label: 'Our Team' },
              { key: 'catalog', label: 'Catalog' },
              { key: 'contact', label: 'Contact' }
            ].map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`py-3 px-6 font-semibold transition-colors ${
                  activeTab === tab.key
                    ? 'text-nature-600 border-b-2 border-nature-600'
                    : 'text-forest-700 hover:text-nature-600'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* About Us Tab */}
      {activeTab === 'about' && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            {/* Official Launch Information */}
            <div className="text-center mb-16">
              <div className="bg-gradient-to-r from-nature-500 to-forest-600 rounded-2xl p-8 text-white mb-12">
                <img 
                  src="https://images.unsplash.com/photo-1578662996442-48f60103fc96?ixlib=rb-4.0.3&auto=format&fit=crop&w=120&h=120&q=80" 
                  alt="Tourism Ambassadors Kenya Logo"
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-white/30"
                />
                <h2 className="text-3xl font-bold mb-4">TOURISM AMBASSADORS KENYA</h2>
                <p className="text-xl text-nature-200 font-semibold mb-6">TRAVEL • CONNECT • SHARE • INSPIRE</p>
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6">
                  <p className="text-white/90 leading-relaxed">
                    The Tourism Ambassadors Initiative was launched by the Cabinet Secretary of the Ministry of Tourism, 
                    Wildlife, and Heritage <strong>Hon. Peninah Malonza, OGW</strong> on <strong>11th February 2023</strong> at 
                    Kenyatta International Convention Centre (KICC) during the Global Peace Summit Kenya 2023.
                  </p>
                  <p className="text-white/90 mt-4">
                    The Cabinet Secretary commissioned <strong>100 Tourism Ambassadors</strong> - 50 Kenyan and 50 international - 
                    who continue to promote Tourism locally and internationally to boost #MagicalKenya and #TembeaKenya brands.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-4xl font-bold text-forest-900 mb-6">
                  OUR <span className="text-nature-600">MISSION</span>
                </h2>
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start space-x-4 mb-6">
                    <Target className="h-8 w-8 text-nature-500 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-forest-900 mb-2">Mission Statement</h3>
                      <p className="text-forest-700">
                        To promote tourism and cultural awareness, and foster a community who are passionate about travel and exploring new destinations.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <img 
                  src="https://images.unsplash.com/photo-1551632811-561732d1e306?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&h=500&q=80"
                  alt="Kenya safari wildlife"
                  className="w-full h-96 object-cover rounded-2xl shadow-xl"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="order-2 lg:order-1">
                <img 
                  src="https://images.unsplash.com/photo-1517804234-5885b7cb0b5b?ixlib=rb-4.0.3&auto=format&fit=crop&w=700&h=500&q=80"
                  alt="Kenyan cultural celebration"
                  className="w-full h-96 object-cover rounded-2xl shadow-xl"
                />
              </div>
              <div className="order-1 lg:order-2">
                <h2 className="text-4xl font-bold text-forest-900 mb-6">
                  OUR <span className="text-nature-600">VISION</span>
                </h2>
                <div className="bg-white rounded-2xl p-8 shadow-lg">
                  <div className="flex items-start space-x-4">
                    <Eye className="h-8 w-8 text-nature-500 mt-1" />
                    <div>
                      <h3 className="text-xl font-semibold text-forest-900 mb-2">Vision Statement</h3>
                      <p className="text-forest-700">
                        To promote a sustainable tourism sector, through responsible development, socio-economic, environmental and socio-cultural development.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Role of Tourism Ambassadors */}
            <div className="bg-gradient-to-br from-forest-50 to-nature-50 rounded-2xl p-8 mb-16">
              <h2 className="text-3xl font-bold text-forest-900 mb-6 text-center">
                ROLE OF <span className="text-nature-600">TOURISM AMBASSADORS</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start space-x-3">
                    <div className="bg-nature-100 rounded-full p-2 mt-1">
                      <div className="w-3 h-3 bg-nature-500 rounded-full"></div>
                    </div>
                    <p className="text-forest-700">Promote Tourism, Wildlife, culture, and Heritage Locally and Internationally</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start space-x-3">
                    <div className="bg-nature-100 rounded-full p-2 mt-1">
                      <div className="w-3 h-3 bg-nature-500 rounded-full"></div>
                    </div>
                    <p className="text-forest-700">Champion Tourism, Wildlife, culture, and Heritage activities</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start space-x-3">
                    <div className="bg-nature-100 rounded-full p-2 mt-1">
                      <div className="w-3 h-3 bg-nature-500 rounded-full"></div>
                    </div>
                    <p className="text-forest-700">Lobby for International Meetings, Incentives, Conferences, and Exhibitions (MICE) events to be hosted in Kenya</p>
                  </div>
                </div>
                <div className="bg-white rounded-xl p-6 shadow-lg">
                  <div className="flex items-start space-x-3">
                    <div className="bg-nature-100 rounded-full p-2 mt-1">
                      <div className="w-3 h-3 bg-nature-500 rounded-full"></div>
                    </div>
                    <p className="text-forest-700">Make use of social media, mainstream media, and all available forums to boost Tourism</p>
                  </div>
                </div>
              </div>
              <div className="mt-6 bg-white rounded-xl p-6 shadow-lg text-center">
                <div className="flex items-center justify-center space-x-3">
                  <div className="bg-nature-100 rounded-full p-2">
                    <div className="w-3 h-3 bg-nature-500 rounded-full"></div>
                  </div>
                  <p className="text-forest-700 font-medium">Identification of hidden gems and tourist sites in the country</p>
                </div>
              </div>
            </div>

            {/* Our Story */}
            <div className="bg-white rounded-2xl p-8 shadow-xl">
              <h2 className="text-3xl font-bold text-forest-900 mb-6 text-center">
                OUR <span className="text-nature-600">STORY</span>
              </h2>
              <div className="prose prose-lg max-w-none text-forest-700">
                <p className="text-lg leading-relaxed">
                  Tourism Ambassadors aim to position our destination as a premier tourist hotspot, offering enriching experiences 
                  and unforgettable memories to visitors. By fostering sustainable practices, enhancing visitor services, and 
                  collaborating with various stakeholders, we are confident in achieving our goals and contributing to the 
                  long-term growth and success of our region's tourism industry.
                </p>
                <p className="text-lg leading-relaxed mt-6 text-center font-medium text-nature-600">
                  Together, let us embark on this journey to create a thriving, responsible, and vibrant tourism destination.
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Membership Tab */}
      {activeTab === 'membership' && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Benefits */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <div className="flex items-center space-x-3 mb-6">
                  <Award className="h-8 w-8 text-nature-500" />
                  <h2 className="text-3xl font-bold text-forest-900">MEMBERSHIP <span className="text-nature-600">BENEFITS</span></h2>
                </div>
                <div className="space-y-3">
                  {membershipBenefits.map((benefit, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-nature-100 rounded-full p-1 mt-1">
                        <div className="w-2 h-2 bg-nature-500 rounded-full"></div>
                      </div>
                      <p className="text-forest-700">{benefit}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 bg-nature-500 text-white py-3 rounded-lg font-semibold hover:bg-nature-600 transition-colors">
                  APPLY FOR MEMBERSHIP
                </button>
              </div>

              {/* Responsibilities */}
              <div className="bg-gradient-to-br from-forest-500 to-camp-600 rounded-2xl shadow-lg p-8 text-white">
                <div className="flex items-center space-x-3 mb-6">
                  <Users className="h-8 w-8 text-white" />
                  <h2 className="text-3xl font-bold">MEMBER <span className="text-nature-200">RESPONSIBILITIES</span></h2>
                </div>
                <div className="space-y-3">
                  {responsibilities.map((responsibility, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="bg-white/20 rounded-full p-1 mt-1">
                        <div className="w-2 h-2 bg-white rounded-full"></div>
                      </div>
                      <p className="text-white/90">{responsibility}</p>
                    </div>
                  ))}
                </div>
                <button className="w-full mt-8 bg-white text-forest-700 py-3 rounded-lg font-semibold hover:bg-nature-50 transition-colors">
                  VIEW MEMBERSHIP GUIDELINES
                </button>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Team Tab */}
      {activeTab === 'team' && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-forest-900 mb-4">
                MEET OUR <span className="text-nature-600">TEAM</span>
              </h2>
              <p className="text-lg text-forest-700">The passionate leaders driving the #TembeaKenya movement</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {teamMembers.map((member, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="relative h-64">
                    <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-forest-900 mb-1">{member.name}</h3>
                    <p className="text-nature-600 font-medium mb-3">{member.role}</p>
                    <p className="text-gray-600 text-sm">{member.bio}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Catalog Tab */}
      {activeTab === 'catalog' && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-forest-900 mb-4">
                TOURISM <span className="text-nature-600">CATALOG</span>
              </h2>
              <p className="text-lg text-forest-700">Download our comprehensive guides and resources</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                { title: "Kenya Tourism Guide 2024", pages: "64 pages", type: "PDF", size: "12.5 MB" },
                { title: "Cultural Heritage Handbook", pages: "48 pages", type: "PDF", size: "8.2 MB" },
                { title: "Wildlife Viewing Calendar", pages: "24 pages", type: "PDF", size: "5.1 MB" },
                { title: "Ambassador Training Manual", pages: "92 pages", type: "PDF", size: "15.3 MB" },
                { title: "Community Engagement Toolkit", pages: "36 pages", type: "PDF", size: "7.8 MB" },
                { title: "Event Planning Resources", pages: "28 pages", type: "PDF", size: "4.9 MB" }
              ].map((resource, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
                  <div className="flex items-start space-x-3 mb-4">
                    <Download className="h-8 w-8 text-nature-500 mt-1" />
                    <div>
                      <h3 className="text-lg font-semibold text-forest-900 mb-1">{resource.title}</h3>
                      <div className="text-sm text-forest-600 space-y-1">
                        <p>{resource.pages} • {resource.type}</p>
                        <p>File size: {resource.size}</p>
                      </div>
                    </div>
                  </div>
                  <button className="w-full bg-nature-500 text-white py-2 rounded-lg font-medium hover:bg-nature-600 transition-colors">
                    DOWNLOAD
                  </button>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Contact Tab */}
      {activeTab === 'contact' && (
        <section className="py-20">
          <div className="mx-auto max-w-7xl px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-forest-900 mb-4">
                GET IN <span className="text-nature-600">TOUCH</span>
              </h2>
              <p className="text-lg text-forest-700">We'd love to hear from you and answer any questions</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Info */}
              <div className="space-y-8">
                <div className="bg-white rounded-2xl shadow-lg p-8">
                  <h3 className="text-2xl font-bold text-forest-900 mb-6">Contact Information</h3>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <MapPin className="h-6 w-6 text-nature-500" />
                      <div>
                        <p className="font-medium text-forest-900">Office Address</p>
                        <p className="text-forest-700">Tourism House, 2nd Floor<br />Nairobi CBD, Kenya</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Phone className="h-6 w-6 text-nature-500" />
                      <div>
                        <p className="font-medium text-forest-900">Phone Numbers</p>
                        <p className="text-forest-700">+254 (700) 123-456<br />+254 (701) 789-012</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-4">
                      <Mail className="h-6 w-6 text-nature-500" />
                      <div>
                        <p className="font-medium text-forest-900">Email Addresses</p>
                        <p className="text-forest-700">info@tourismambassadors.ke<br />membership@tourismambassadors.ke</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Contact Form */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h3 className="text-2xl font-bold text-forest-900 mb-6">Send Us a Message</h3>
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input 
                      type="text" 
                      placeholder="First Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-transparent"
                    />
                    <input 
                      type="text" 
                      placeholder="Last Name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-transparent"
                    />
                  </div>
                  <input 
                    type="email" 
                    placeholder="Email Address"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-transparent"
                  />
                  <select className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-transparent">
                    <option value="">Subject</option>
                    <option value="membership">Membership Inquiry</option>
                    <option value="club">Club Registration</option>
                    <option value="event">Event Information</option>
                    <option value="partnership">Partnership Opportunity</option>
                    <option value="other">Other</option>
                  </select>
                  <textarea 
                    placeholder="Your Message"
                    rows="4"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-nature-500 focus:border-transparent resize-none"
                  ></textarea>
                  <button className="w-full bg-nature-500 text-white py-3 rounded-lg font-semibold hover:bg-nature-600 transition-colors">
                    SEND MESSAGE
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default InfoPage;
