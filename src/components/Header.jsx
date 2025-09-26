import React, { useState } from 'react';
import { Menu, X, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import logo from '../images/logo.jpg.jpeg';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-brand-green relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-brand-green/20 to-brand-red/10"></div>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-8">
        <nav className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <img 
              src={logo} 
              alt="Tourism Ambassadors Kenya Logo"
              className="h-10 w-10 rounded-full border-2 border-white/30"
            />
            <div>
              <span className="text-lg font-bold text-white">TOURISM AMBASSADORS</span>
              <div className="text-xs text-white/80 font-medium">TRAVEL • CONNECT • SHARE • INSPIRE</div>
            </div>
          </Link>
          
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-sm font-medium text-white hover:text-white/80 transition-colors hover:underline underline-offset-8 decoration-2 decoration-brand-red/70">HOME</Link>
            <Link to="/tours" className="text-sm font-medium text-white hover:text-white/80 transition-colors hover:underline underline-offset-8 decoration-2 decoration-brand-red/70">TOURS</Link>
            <Link to="/engagements" className="text-sm font-medium text-white hover:text-white/80 transition-colors hover:underline underline-offset-8 decoration-2 decoration-brand-red/70">ENGAGEMENTS</Link>
            <Link to="/events" className="text-sm font-medium text-white hover:text-white/80 transition-colors hover:underline underline-offset-8 decoration-2 decoration-brand-red/70">EVENTS</Link>
            <Link to="/info" className="text-sm font-medium text-white hover:text-white/80 transition-colors hover:underline underline-offset-8 decoration-2 decoration-brand-red/70">INFO</Link>
            <Link to="/competition" className="text-sm font-medium text-white hover:text-white/80 transition-colors hover:underline underline-offset-8 decoration-2 decoration-brand-red/70">COMPETITION</Link>
            <Link to="/blog" className="text-sm font-medium text-white hover:text-white/80 transition-colors hover:underline underline-offset-8 decoration-2 decoration-brand-red/70">BLOG</Link>
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
              <Link to="/" className="text-sm font-medium text-white hover:text-white/80 transition-colors py-2 hover:underline underline-offset-6 decoration-2 decoration-brand-red/70">HOME</Link>
              <Link to="/tours" className="text-sm font-medium text-white hover:text-white/80 transition-colors py-2 hover:underline underline-offset-6 decoration-2 decoration-brand-red/70">TOURS</Link>
              <Link to="/engagements" className="text-sm font-medium text-white hover:text-white/80 transition-colors py-2 hover:underline underline-offset-6 decoration-2 decoration-brand-red/70">ENGAGEMENTS</Link>
              <Link to="/events" className="text-sm font-medium text-white hover:text-white/80 transition-colors py-2 hover:underline underline-offset-6 decoration-2 decoration-brand-red/70">EVENTS</Link>
              <Link to="/info" className="text-sm font-medium text-white hover:text-white/80 transition-colors py-2 hover:underline underline-offset-6 decoration-2 decoration-brand-red/70">INFO</Link>
              <Link to="/blog" className="text-sm font-medium text-white hover:text-white/80 transition-colors py-2 hover:underline underline-offset-6 decoration-2 decoration-brand-red/70">BLOG</Link>
            </div>
          </div>
        )}
      </div>
      {/* Subtle brand accent bar matching logo colors */}
      <div className="h-1 w-full bg-brand-accent-gradient opacity-90"></div>
    </header>
  );
}

export default Header;
