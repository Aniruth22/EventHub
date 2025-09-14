import React from 'react';
import HeroSection from '../components/HeroSection';
import StatsSection from '../components/StatsSection'; // Import StatsSection
import FeaturedEvents from '../components/FeaturedEvents'; // Import FeaturedEvents

const HomePage = () => {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <FeaturedEvents />
    </>
  );
};

export default HomePage;