import React from 'react'
import Contact from '../components/Contact';
import EventGallery from '../components/EventGallery';
import FAQ from '../components/Faq';
import FeaturedEvents from '../components/FeaturedEvents';
import Footer from '../components/Footer';
import Hero from '../components/Hero';
import Services from '../components/Service';
import Testimonials from '../components/Testimonials';

const Home = () => {
  return (
    <div className="relative">
      <main className="bg-[#1a1a1a]">
        <div className="relative">
          <div className="absolute inset-0 opacity-20">
            <div
              className="absolute inset-0"
              style={{
                backgroundImage: `radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)`,
                backgroundSize: "40px 40px",
              }}
            />
          </div>
          <div className="relative z-10">
            <Hero />
            <FeaturedEvents />
            <Services />
            <EventGallery />
            <Testimonials />
            <Contact />
            <FAQ />
            <Footer />
          </div>
        </div>
      </main>
    </div>
  );
}

export default Home
