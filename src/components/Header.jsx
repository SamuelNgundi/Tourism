import React, { useState } from 'react';
import { Menu, X, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-nature-400 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-nature-500/20 to-forest-500/20"></div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src="src/images/logo.jpg.jpeg" 
              alt="Tourism Ambassadors Kenya Logo"
              className="h-10 w-10 rounded-full border-2 border-white/30"
            />
            <div>
              <span className="text-lg font-bold text-white">TOURISM AMBASSADORS</span>
              <div className="text-xs text-white/80 font-medium">TRAVEL • CONNECT • SHARE • INSPIRE</div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-white hover:text-white/80 transition-colors">HOME</Link>
            <Link to="/tours" className="text-sm font-medium text-white hover:text-white/80 transition-colors">TOURS</Link>
            <Link to="/engagements" className="text-sm font-medium text-white hover:text-white/80 transition-colors">ENGAGEMENTS</Link>
            <Link to="/events" className="text-sm font-medium text-white hover:text-white/80 transition-colors">EVENTS</Link>
            <Link to="/info" className="text-sm font-medium text-white hover:text-white/80 transition-colors">INFO</Link>
            <Link to="/competition" className="text-sm font-medium text-white hover:text-white/80 transition-colors">COMPETITION</Link>
            <Link to="/blog" className="text-sm font-medium text-white hover:text-white/80 transition-colors">BLOG</Link>
          </div>

          <button 
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="h-6 w-6 text-white" /> : <Menu className="h-6 w-6 text-white" />}
          </button>
        </nav>
        
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-white/20">
            <div className="flex flex-col space-y-2">
              <Link to="/" className="text-sm font-medium text-white hover:text-white/80 transition-colors py-2">HOME</Link>
              <Link to="/tours" className="text-sm font-medium text-white hover:text-white/80 transition-colors py-2">TOURS</Link>
              <Link to="/engagements" className="text-sm font-medium text-white hover:text-white/80 transition-colors py-2">ENGAGEMENTS</Link>
              <Link to="/events" className="text-sm font-medium text-white hover:text-white/80 transition-colors py-2">EVENTS</Link>
              <Link to="/info" className="text-sm font-medium text-white hover:text-white/80 transition-colors py-2">INFO</Link>
              <Link to="/competition" className="text-sm font-medium text-white hover:text-white/80 transition-colors py-2">COMPETITION</Link>
              <Link to="/blog" className="text-sm font-medium text-white hover:text-white/80 transition-colors py-2">BLOG</Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

export default Header;
