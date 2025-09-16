import React from 'react';
import logo from '../images/logo.jpg.jpeg';
import { MapPin, Phone, Mail, Facebook, Instagram, Twitter } from 'lucide-react';

function Footer() {
  return (
    <footer className="bg-forest-900 text-white">
      <div className="relative py-20 overflow-hidden">
        <div className="absolute inset-0">
          <img 
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1920&h=800&q=80"
            alt="Kenya forest background"
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        
        <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center space-x-4 mb-6">
              <img 
                src={logo}
                alt="Tourism Ambassadors Kenya Logo"
                className="w-16 h-16 rounded-full border-4 border-nature-400"
              />
              <div className="text-left">
                <h2 className="text-4xl font-bold mb-2">
                  <span className="text-nature-400">TOURISM</span> AMBASSADORS
                </h2>
                <p className="text-nature-300 font-medium">TRAVEL • CONNECT • SHARE • INSPIRE</p>
              </div>
            </div>
            <p className="text-white/80 text-lg mb-4">Welcome to Kenya - The Home of Human Origin</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">ABOUT US</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Our Mission</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Kenya Tourism</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Join Our Team</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Media Center</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">EXPERIENCES</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Wildlife Safaris</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Cultural Tours</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Beach Holidays</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Mountain Climbing</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">SUPPORT</h3>
              <ul className="space-y-2">
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Help Center</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Safety Guidelines</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Cancellation</a></li>
                <li><a href="#" className="text-white/70 hover:text-white transition-colors">Contact Us</a></li>
              </ul>
            </div>
            
            <div>
              <h3 className="text-lg font-semibold mb-4">CONNECT</h3>
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-nature-400" />
                  <span className="text-white/70 text-sm">Nairobi, Kenya</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-nature-400" />
                  <span className="text-white/70 text-sm">+254 (700) 123-456</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-nature-400" />
                  <span className="text-white/70 text-sm">info@tourismambassadors.ke</span>
                </div>
              </div>
              
              <div className="flex space-x-4 mt-6">
                <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="bg-white/10 p-2 rounded-lg hover:bg-white/20 transition-colors">
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
    <div className="bg-forest-900 py-4">
      <p className="text-center text-white/70 text-sm">
        &copy; 2025 Tourism Ambassadors. All rights reserved.
      </p>
    </div>
    </footer>
  );
}

export default Footer;
