import React from 'react';
import Hero from '../images/Hero.jpg';
import Official from '../images/official.jpg';
import { Users, MapPin, GraduationCap, Calendar } from 'lucide-react';
import OptimizedImage from '../components/OptimizedImage';

function EngagementsPage() {
  const counties = [
    { name: "Nairobi", clubs: 12, members: 450, youthLeader: "LILIAN WAMBUI MWANGI" },
    { name: "Mombasa", clubs: 8, members: 320, youthLeader: "DOROTHY WENDY" },
    { name: "Nakuru", clubs: 5, members: 180, youthLeader: "JAMES NJERI" },
    { name: "Uasin Gishu", clubs: 4, members: 160, youthLeader: "ODDAH CHEPKEMOI" },
    { name: "Kiambu", clubs: 7, members: 280, youthLeader: "WAMBUI HANNAH" },
    { name: "Turkana", clubs: 3, members: 95, youthLeader: "Lolem Reuben" },
    { name: "West Pokot", clubs: 2, members: 65, youthLeader: "Diana Chepkorir Rotich" },
    { name: "Samburu", clubs: 2, members: 58, youthLeader: "SILVANA LENTAAYA" },
    { name: "Nandi", clubs: 3, members: 125, youthLeader: "VALENTINE MIBEI" },
    { name: "Laikipia", clubs: 3, members: 140, youthLeader: "EPHRAM MWANGI KINYUA" },
    { name: "Nyeri", clubs: 4, members: 195, youthLeader: "WANJIKU MURIITHI" },
    { name: "Kirinyaga", clubs: 3, members: 155, youthLeader: "WILLIAMS MAINA" },
    { name: "Murang'a", clubs: 4, members: 185, youthLeader: "MONICAH NDUTA KIMARI" },
    { name: "Kiambu", clubs: 5, members: 220, youthLeader: "WAMBUI HANNAH" },
    { name: "Meru", clubs: 4, members: 165, youthLeader: "kaimenyi Samuel" },
    { name: "Tharaka Nithi", clubs: 2, members: 88, youthLeader: "BRIAN ADAMS" },
    { name: "Embu", clubs: 3, members: 132, youthLeader: "MERCY MUTANA" },
    { name: "Kitui", clubs: 3, members: 145, youthLeader: "ONESMUS MUVENGEI" },
    { name: "Machakos", clubs: 4, members: 175, youthLeader: "EMMANUEL KITHUKA" },
    { name: "Makueni", clubs: 3, members: 128, youthLeader: "David mutua kitila" },
    { name: "Nyandarua", clubs: 3, members: 115, youthLeader: "ANNAH WAMBUI" },
    { name: "Nyamira", clubs: 2, members: 92, youthLeader: "Elizabeth Kerubo Makana" },
    { name: "Kisii", clubs: 4, members: 158, youthLeader: "FLAVIA NYARANGI" },
    { name: "Migori", clubs: 3, members: 135, youthLeader: "Raila Opany" },
    { name: "Siaya", clubs: 3, members: 118, youthLeader: "Fidel Ouma" },
    { name: "Busia", clubs: 2, members: 98, youthLeader: "RODRICK WESONGA" },
    { name: "Kakamega", clubs: 4, members: 168, youthLeader: "Dildra Akoth Sisuma" },
    { name: "Bungoma", clubs: 3, members: 148, youthLeader: "DERRICK WAFULA" },
    { name: "Bomet", clubs: 2, members: 105, youthLeader: "Faith Cherono" },
    { name: "Kericho", clubs: 3, members: 138, youthLeader: "WYCLIFE KIMUTAI" },
    { name: "Narok", clubs: 3, members: 152, youthLeader: "WILLIAM PERE" },
    { name: "Kajiado", clubs: 4, members: 188, youthLeader: "ELIJAH J.TIPANGO" },
    { name: "Kericho", clubs: 2, members: 95, youthLeader: "WYCLIFE KIMUTAI" },
    { name: "Kwale", clubs: 2, members: 112, youthLeader: "NURU MOHAMMED" },
    { name: "Kilifi", clubs: 3, members: 125, youthLeader: "Irene birya" },
    { name: "Tana River", clubs: 2, members: 68, youthLeader: "Hiribae Ali" },
    { name: "Lamu", clubs: 1, members: 45, youthLeader: "ARIKAM ATHMAN MOHAMED" },
    { name: "Taita Taveta", clubs: 2, members: 82, youthLeader: "ANTONY MWAKINGALI" },
    { name: "Garissa", clubs: 2, members: 75, youthLeader: "TARAQAZIZ ABDI" },
    { name: "Wajir", clubs: 1, members: 52, youthLeader: "Hussein Mohamed Noor" }
  ];
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <OptimizedImage 
            src={Hero}
            alt="Kenya community engagement"
            className="w-full h-full object-cover"
            widths={[640, 960, 1280, 1536, 1920]}
            sizes="100vw"
            quality={70}
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-camp-900/80 to-camp-900/40"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            TOURISM AMBASSADOR <span className="text-camp-300">CLUBS</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Building a community of passionate advocates for Kenyan tourism and culture through student clubs and community groups.
          </p>
        </div>
      </section>

      {/* What Are Tourism Ambassador Clubs */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-forest-900 mb-6">
                WHAT ARE TOURISM <span className="text-nature-600">AMBASSADOR CLUBS?</span>
              </h2>
              <p className="text-lg text-forest-700 mb-6">
                Tourism Ambassador Clubs are community-driven groups that promote Kenyan tourism, culture, and heritage. 
                These clubs empower students and community members to become active advocates for the #TembeaKenya movement.
              </p>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <GraduationCap className="h-6 w-6 text-nature-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-forest-900">Student Clubs</h3>
                    <p className="text-forest-700">University and college groups promoting tourism education and cultural awareness.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Users className="h-6 w-6 text-nature-500 mt-1" />
                  <div>
                    <h3 className="font-semibold text-forest-900">Community Groups</h3>
                    <p className="text-forest-700">Local organizations working to showcase their region's unique attractions and culture.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative">
              <OptimizedImage 
                src= {Official}
                alt="Tourism ambassador community meeting"
                className="w-full h-96 object-cover rounded-2xl shadow-xl"
                widths={[480, 768, 1024, 1280]}
                sizes="(min-width: 1024px) 50vw, 100vw"
                quality={75}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Active Counties */}
      <section className="py-20 bg-gradient-to-br from-nature-50 to-forest-50 overflow-hidden">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-forest-900 mb-4">
              COUNTIES WITH ACTIVE <span className="text-nature-600">CLUBS</span>
            </h2>
            <p className="text-lg text-forest-700">Our growing network of Tourism Ambassador Clubs across Kenya with active coordinators</p>
            <div className="mt-4 text-sm text-forest-600">
              <p>Scroll horizontally to view all counties ↔ (use scrollbar below)</p>
            </div>
          </div>

          <div className="flex gap-6 overflow-x-auto pb-6 scrollbar-custom">
            {counties.map((county, index) => (
              <div key={index} className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow min-w-[300px] flex-shrink-0">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="h-8 w-8 text-nature-500" />
                  <h3 className="text-xl font-bold text-forest-900">{county.name}</h3>
                </div>
                <div className="mb-4 pb-4 border-b border-gray-100">
                  <h4 className="text-sm font-semibold text-forest-700 mb-2">County Coordinator</h4>
                  <p className="text-forest-900 font-medium">{county.youthLeader}</p>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-forest-700">Active Clubs:</span>
                    <span className="font-semibold text-nature-600">{county.clubs}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-forest-700">Total Members:</span>
                    <span className="font-semibold text-nature-600">{county.members}</span>
                  </div>
                </div>
                <button className="w-full mt-4 bg-brand-green/10 text-brand-green py-2 rounded-lg text-sm font-medium hover:bg-brand-green/20 transition-colors">
                  VIEW DETAILS
                </button>
              </div>
            ))}
          </div>
          
          <div className="text-center mt-8">
            <p className="text-forest-600 text-sm mb-4">
              Total: <span className="font-bold text-nature-600">{counties.reduce((sum, county) => sum + county.clubs, 0)} Active Clubs</span> | 
              <span className="font-bold text-nature-600 ml-2">{counties.reduce((sum, county) => sum + county.members, 0)} Total Members</span>
            </p>
            <button className="bg-brand-green text-white px-6 py-3 rounded-lg font-semibold hover:bg-brand-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2">
              VIEW COUNTY DETAILS MAP
            </button>
          </div>
        </div>
      </section>

      {/* How to Start or Join */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-forest-900 mb-4">
              START OR JOIN A <span className="text-nature-600">CLUB</span>
            </h2>
            <p className="text-lg text-forest-700">Become part of the #TembeaKenya movement in your community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Start a Club */}
            <div className="bg-gradient-to-br from-nature-500 to-forest-600 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">START A NEW CLUB</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 rounded-full p-2 mt-1">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <p>Gather 10+ interested members from your institution or community</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 rounded-full p-2 mt-1">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <p>Complete the club registration form with member details</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 rounded-full p-2 mt-1">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <p>Attend virtual orientation and receive club resources</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 rounded-full p-2 mt-1">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <p>Begin organizing activities and promoting #TembeaKenya</p>
                </div>
              </div>
              <button className="w-full bg-white text-brand-green py-3 rounded-lg font-semibold hover:bg-brand-green/10 transition-colors">
                REGISTER NEW CLUB
              </button>
            </div>

            {/* Join a Club */}
            <div className="bg-gradient-to-br from-camp-500 to-camp-700 rounded-2xl p-8 text-white">
              <h3 className="text-2xl font-bold mb-6">JOIN EXISTING CLUB</h3>
              <div className="space-y-4 mb-8">
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 rounded-full p-2 mt-1">
                    <span className="text-sm font-bold">1</span>
                  </div>
                  <p>Find an active club in your county or institution</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 rounded-full p-2 mt-1">
                    <span className="text-sm font-bold">2</span>
                  </div>
                  <p>Contact the club coordinator for meeting details</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 rounded-full p-2 mt-1">
                    <span className="text-sm font-bold">3</span>
                  </div>
                  <p>Attend club meetings and participate in activities</p>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="bg-white/20 rounded-full p-2 mt-1">
                    <span className="text-sm font-bold">4</span>
                  </div>
                  <p>Complete individual membership registration</p>
                </div>
              </div>
              <button className="w-full bg-white text-brand-green py-3 rounded-lg font-semibold hover:bg-brand-green/10 transition-colors">
                FIND LOCAL CLUBS
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Registration CTA */}
      <section className="py-20 bg-forest-900">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            READY TO JOIN THE <span className="text-nature-400">#TembeaKenya</span> MOVEMENT?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Whether you're starting a new club or joining an existing one, become part of Kenya's growing community of Tourism Ambassadors.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-brand-green text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-brand-greenDark transition-colors focus:outline-none focus:ring-2 focus:ring-brand-red/40 focus:ring-offset-2">
              CLUB REGISTRATION
            </button>
            <button className="bg-transparent border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white hover:text-forest-900 transition-colors">
              INDIVIDUAL MEMBERSHIP
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EngagementsPage;
