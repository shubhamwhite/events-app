import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import HeroSection from '../components/sections/HeroSection';
import Offer from '../components/sections/Offer';
import EventsSection from '../components/sections/EventsSection';
import GallerySection from '../components/sections/GallerySection';
import FAQSection from '../components/sections/FAQSection';
import FooterSection from '../components/sections/FooterSection';
import Service from '../components/sections/Service';
import Testimonials from '../components/sections/Testimonials';
import Contact from '../components/sections/contact';
import Analytics from '../components/sections/Analytics';

const Dashboard = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const navigate = useNavigate();
  const location = useLocation();

  // Handle first-time login and redirection to HeroSection
  useEffect(() => {
    const firstLogin = localStorage.getItem('firstLogin');
    if (!firstLogin) {
      localStorage.setItem('firstLogin', 'true');
      navigate('/hero'); // Redirect to hero section on first login
    }
  }, [navigate]);

  // Ensure route handling on page refresh
  useEffect(() => {
    if (location.pathname === '/') {
      navigate('/hero'); // Redirect to hero section if no route is defined
    }
  }, [location.pathname, navigate]);

  const activeSection = location.pathname.replace('/', '') || 'hero';

  return (
    <div className="h-screen flex flex-col">
      <Navbar onMenuClick={() => setIsSidebarOpen(!isSidebarOpen)} />
      <div className="flex flex-1 overflow-hidden">
        <Sidebar
          isOpen={isSidebarOpen}
          setIsOpen={setIsSidebarOpen}
          activeSection={activeSection}
          setActiveSection={(section) => navigate(`/${section}`)}
        />
        <div className="flex-1 bg-gray-100 overflow-auto">
          <Routes>
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/hero" element={<HeroSection />} />
            <Route path="/offer" element={<Offer />} />
            <Route path="/events" element={<EventsSection />} />
            <Route path="/service" element={<Service />} />
            <Route path="/gallery" element={<GallerySection />} />
            <Route path="/testimonials" element={<Testimonials />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/faq" element={<FAQSection />} />
            <Route path="/footer" element={<FooterSection />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

const App = () => (
  <Router>
    <Dashboard />
  </Router>
);

export default App;
