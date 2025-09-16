import React from 'react';
import HeroSection from '../components/HeroSection';
import StorySection from '../components/StorySection';
import BookingSection from '../components/BookingSection';
import AdventureSection from '../components/AdventureSection';
import ActivitiesSection from '../components/ActivitiesSection';
import AmenitiesSection from '../components/AmenitiesSection';
import SerenitySection from '../components/SerenitySection';
import TestimonialsSection from '../components/TestimonialsSection';
import PartnersSection from '../components/PartnersSection';

function HomePage() {
  return (
    <div>
      <HeroSection />
      <StorySection />
      <BookingSection />
      <AdventureSection />
      <ActivitiesSection />
      <AmenitiesSection />
      <TestimonialsSection />
      <PartnersSection />
      <SerenitySection />
    </div>
  );
}

export default HomePage;
