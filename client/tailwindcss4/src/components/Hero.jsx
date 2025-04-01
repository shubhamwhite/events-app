import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronUp, Clock, MapPin, Sparkles } from "lucide-react";
import { Link } from "react-router";

const Hero = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showScrollTop, setShowScrollTop] = useState(false);

  const eventData = {
    title: "Creating Unforgettable Moments",
    subtitle: "Premier Event Planning & Management",
    description: "Transform your vision into reality with our expert event planning services. From intimate gatherings to grand celebrations, we craft experiences that leave lasting impressions.",
    upcomingEvent: {
      name: "Annual Gala Night 2024",
      date: "March 15, 2024",
      time: "7:00 PM",
      location: "Grand Plaza Hotel",
      tickets: "Limited Seats Available"
    },
    images: [
      "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80",
      "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80"
    ]
  };

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 300);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev === 0 ? 1 : 0));
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleScrollDown = () => {
    window.scrollTo({
      top: window.innerHeight,
      behavior: "smooth",
    });
  };

  const handleScrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative min-h-[50%] bg-[#1a1a1a] overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)`,
          backgroundSize: '40px 40px',
        }}></div>
      </div>  

      {/* Main Content Container */}
      <div className="relative z-10 min-h-[100svh] flex items-center py-16 sm:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Mobile-first layout: Card appears first on mobile */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative order-1 lg:order-2"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-2xl">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentImageIndex}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                    className="aspect-[4/3] sm:aspect-[16/10] lg:aspect-[4/3]"
                  >
                    <img
                      src={eventData.images[currentImageIndex]}
                      alt="Event"
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                  </motion.div>
                </AnimatePresence>

                {/* Event Details Overlay */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1 }}
                  className="absolute bottom-0 left-0 right-0 p-4 sm:p-6 lg:p-8"
                >
                  <div className="bg-black/40 backdrop-blur-lg rounded-xl p-4 sm:p-6 border border-white/10">
                    <div className="flex items-center gap-2 text-emerald-400 mb-2">
                      <Calendar className="w-4 sm:w-5 h-4 sm:h-5" />
                      <span className="text-xs sm:text-sm">{eventData.upcomingEvent.date}</span>
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                      {eventData.upcomingEvent.name}
                    </h3>
                    <div className="grid grid-cols-2 gap-3 sm:gap-4">
                      <div className="flex items-center gap-2 text-gray-300">
                        <Clock className="w-4 h-4" />
                        <span className="text-xs sm:text-sm">{eventData.upcomingEvent.time}</span>
                      </div>
                      <div className="flex items-center gap-2 text-gray-300">
                        <MapPin className="w-4 h-4" />
                        <span className="text-xs sm:text-sm truncate">{eventData.upcomingEvent.location}</span>
                      </div>
                    </div>
                    <div className="mt-3 sm:mt-4 pt-3 sm:pt-4 border-t border-white/10">
                      <span className="text-emerald-400 text-xs sm:text-sm font-medium">
                        {eventData.upcomingEvent.tickets}
                      </span>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Navigation Dots */}
              <div className="absolute -bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
                {[0, 1].map((index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      currentImageIndex === index ? "w-8 bg-emerald-500" : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </motion.div>

            {/* Content appears second on mobile */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-left space-y-6 order-2 lg:order-1 mt-8 lg:mt-0"
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="inline-block"
              >
                <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20">
                  Premier Events Management
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight"
              >
                <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
                  {eventData.title}
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="text-gray-400 text-base sm:text-lg max-w-xl"
              >
                {eventData.description}
              </motion.p>

              {/* Buttons appear last on mobile */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <Link to="/blog">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span>Event Blog</span>
                  </motion.button>
                </Link>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handleScrollDown}
                  className="w-full sm:w-auto px-6 sm:px-8 py-3 sm:py-4 bg-white/5 border border-emerald-500/20 rounded-xl text-emerald-400 font-semibold hover:bg-white/10 transition-all duration-300 flex items-center justify-center"
                >
                  Learn More
                </motion.button>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      <AnimatePresence>
        {showScrollTop && (
          <motion.div
            className="fixed bottom-4 sm:bottom-8 right-4 sm:right-8 z-50 flex items-center gap-2"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
          >
            {/* Hidden on mobile, visible from sm breakpoint (640px) */}
            <motion.div
              className="hidden sm:block px-3 py-1 rounded-full bg-emerald-500/10 backdrop-blur-lg border border-emerald-500/20 text-emerald-400 text-sm"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
            >
              Scroll to top
            </motion.div>
            
            <motion.button
              onClick={handleScrollTop}
              className="p-2 sm:p-3 rounded-full bg-emerald-500/10 backdrop-blur-lg border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all duration-300"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronUp className="w-5 h-5 sm:w-8 sm:h-8" />
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>  
    </div>
  );
};

export default Hero;