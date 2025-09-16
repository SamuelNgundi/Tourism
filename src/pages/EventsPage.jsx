import React, { useState } from 'react';
import { Calendar, Clock, MapPin, Users, Star } from 'lucide-react';

function EventsPage() {
  const [selectedMonth, setSelectedMonth] = useState('all');

  const upcomingEvents = [
    {
      title: "Magical Kenya Travel Expo 2024",
      date: "March 15-17, 2024",
      time: "9:00 AM - 6:00 PM",
      location: "Kenyatta International Convention Centre, Nairobi",
      type: "Trade Show",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      description: "Kenya's premier tourism trade exhibition showcasing the best of Kenyan hospitality, culture, and destinations."
    },
    {
      title: "Maasai Cultural Festival",
      date: "April 8-10, 2024",
      time: "10:00 AM - 8:00 PM",
      location: "Maasai Mara National Reserve",
      type: "Cultural",
      image: "https://images.unsplash.com/photo-1554075599-74a3de1b4d47?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      description: "Experience authentic Maasai traditions, dances, crafts, and storytelling in their ancestral homeland."
    },
    {
      title: "Coastal Food & Culture Week",
      date: "May 20-26, 2024",
      time: "Various Times",
      location: "Mombasa Old Town",
      type: "Culinary",
      image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      description: "Celebrate Swahili cuisine and coastal culture with cooking classes, food tours, and cultural performances."
    },
    {
      title: "Tourism Ambassador Youth Summit",
      date: "June 12-14, 2024",
      time: "8:00 AM - 5:00 PM",
      location: "University of Nairobi",
      type: "Educational",
      image: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      description: "Annual gathering of student Tourism Ambassadors for training, networking, and project planning."
    }
  ];

  const pastEvents = [
    {
      title: "Kenya Safari Rally Experience",
      date: "February 10-12, 2024",
      location: "Various Locations",
      participants: 250,
      image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      highlights: ["Rally circuit tours", "Driver meet & greets", "Cultural exhibitions"]
    },
    {
      title: "Kenyan Coffee Festival",
      date: "January 25-28, 2024",
      location: "Central Kenya",
      participants: 180,
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=300&q=80",
      highlights: ["Coffee plantation tours", "Barista workshops", "Farm-to-cup experiences"]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=1080&q=80"
            alt="Kenya cultural event celebration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-forest-900/80 to-forest-900/40"></div>
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold text-white mb-6">
            TOURISM AMBASSADOR <span className="text-nature-400">EVENTS</span>
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            Join us at exciting cultural festivals, educational summits, and community gatherings that celebrate Kenya's rich heritage and tourism potential.
          </p>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-forest-900 mb-4">
              UPCOMING <span className="text-nature-600">EVENTS</span>
            </h2>
            <p className="text-lg text-forest-700">Don't miss these exciting opportunities to connect and celebrate Kenyan culture</p>
          </div>

          <div className="space-y-8">
            {upcomingEvents.map((event, index) => (
              <div key={index} className="bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="relative h-64 lg:h-auto">
                    <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                    <div className="absolute top-4 left-4 bg-nature-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
                      {event.type}
                    </div>
                  </div>
                  <div className="lg:col-span-2 p-6">
                    <h3 className="text-2xl font-bold text-forest-900 mb-3">{event.title}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 text-sm text-forest-600">
                      <div className="flex items-center space-x-2">
                        <Calendar className="h-4 w-4 text-nature-500" />
                        <span>{event.date}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Clock className="h-4 w-4 text-nature-500" />
                        <span>{event.time}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-4 w-4 text-nature-500" />
                        <span>{event.location}</span>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">{event.description}</p>
                    <button className="bg-nature-500 text-white px-6 py-3 rounded-lg font-semibold hover:bg-nature-600 transition-colors">
                      REGISTER FOR EVENT
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Past Event Highlights */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-forest-900 mb-4">
              PAST EVENT <span className="text-nature-600">HIGHLIGHTS</span>
            </h2>
            <p className="text-lg text-forest-700">See what you missed and get inspired for future events</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastEvents.map((event, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl overflow-hidden shadow-lg">
                <div className="relative h-64">
                  <img src={event.image} alt={event.title} className="w-full h-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-bold text-white mb-2">{event.title}</h3>
                    <div className="flex items-center justify-between text-white/90 text-sm">
                      <span>{event.date}</span>
                      <div className="flex items-center space-x-1">
                        <Users className="h-4 w-4" />
                        <span>{event.participants} participants</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center space-x-2 mb-3">
                    <MapPin className="h-4 w-4 text-nature-500" />
                    <span className="text-forest-700">{event.location}</span>
                  </div>
                  <h4 className="font-semibold text-forest-900 mb-2">Event Highlights:</h4>
                  <ul className="space-y-1">
                    {event.highlights.map((highlight, i) => (
                      <li key={i} className="text-gray-600 text-sm flex items-center space-x-2">
                        <Star className="h-3 w-3 text-nature-500" />
                        <span>{highlight}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Event Registration CTA */}
      <section className="py-20 bg-gradient-to-br from-nature-500 to-camp-600">
        <div className="mx-auto max-w-7xl px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-6">
            NEVER MISS AN <span className="text-nature-200">EVENT</span>
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-3xl mx-auto">
            Subscribe to our event newsletter and be the first to know about upcoming Tourism Ambassador activities and cultural celebrations.
          </p>
          <div className="max-w-md mx-auto flex gap-4">
            <input 
              type="email" 
              placeholder="Enter your email"
              className="flex-1 px-4 py-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:ring-2 focus:ring-white/50"
            />
            <button className="bg-white text-nature-600 px-6 py-3 rounded-lg font-semibold hover:bg-nature-50 transition-colors">
              SUBSCRIBE
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}

export default EventsPage;
