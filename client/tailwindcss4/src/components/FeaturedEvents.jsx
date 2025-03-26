import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, MapPin, Clock, Sparkles } from "lucide-react";
import { NavLink } from "react-router";

const FeaturedEvents = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/dashboard/feature-event/get");
        const data = await response.json();
        
        if (response.ok) {
          setEvents(data.events || []);
        } else {
          setError(data.message || "Failed to fetch events");
          // Fallback data for development
          setEvents([
            {
              id: "1",
              title: "Annual Corporate Gala",
              description: "Join us for an evening of networking, fine dining, and entertainment at our annual corporate gala.",
              image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
              dateTime: "2025-06-15T18:00:00Z",
              location: "Grand Ballroom, Luxury Hotel"
            },
            {
              id: "2",
              title: "Summer Wedding Showcase",
              description: "Discover the latest trends in wedding planning and meet top vendors at our summer showcase event.",
              image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
              dateTime: "2025-07-22T14:00:00Z",
              location: "Botanical Gardens"
            },
            {
              id: "3",
              title: "Tech Conference 2025",
              description: "Explore the future of technology with industry leaders and innovative startups at our annual tech conference.",
              image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
              dateTime: "2025-08-10T09:00:00Z",
              location: "Convention Center, Downtown"
            },
            {
              id: "4",
              title: "Food & Wine Festival",
              description: "Experience culinary excellence with top chefs and sommeliers at our annual food and wine festival.",
              image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
              dateTime: "2025-09-05T16:00:00Z",
              location: "Riverfront Park"
            },
            {
              id: "5",
              title: "Art Exhibition Opening",
              description: "Be among the first to view stunning contemporary artworks at our gallery opening night.",
              image: "https://images.unsplash.com/photo-1531243269054-5ebf6f34081e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
              dateTime: "2025-10-01T19:00:00Z",
              location: "Modern Art Gallery"
            }
          ]);
        }
      } catch (err) {
        setError("Error fetching events. Please try again later.");
        console.error(err);
        // Using the same fallback data as above
        setEvents([/* ... same fallback data as above ... */]);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  const formatDateTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.1,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    }
  };

  // Display only first 3 events if showAll is false
  const displayedEvents = showAll ? events : events.slice(0, 3);

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
     
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        
        <motion.div
          className="absolute bottom-50 left-20 w-96 h-96 rounded-full bg-teal-500/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -40, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 inline-block mb-4">
            Upcoming Events
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
              Featured Events
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover our upcoming signature events and join us for unforgettable experiences crafted with passion and attention to detail.
          </p>
        </motion.div>

        {loading && (
          <motion.div
            className="flex justify-center items-center py-20"
            variants={itemVariants}
          >
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        )}

        {error && !loading && events.length === 0 && (
          <motion.div
            className="bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-6 max-w-md mx-auto"
            variants={itemVariants}
          >
            <p className="text-emerald-400 text-center">{error}</p>
          </motion.div>
        )}

        {!loading && (
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {displayedEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  className="group bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={event.image}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent"></div>
                    <motion.div
                      className="absolute top-4 right-4 text-emerald-400"
                      animate={{
                        rotate: [0, 15, 0, -15, 0],
                        scale: [1, 1.2, 1]
                      }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="w-6 h-6" />
                    </motion.div>
                  </div>

                  <div className="p-6">
                    <h3 className="text-xl font-bold mb-2">
                      <span className="bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
                        {event.title}
                      </span>
                    </h3>
                    <p className="text-gray-400 mb-4 line-clamp-2">
                      {event.description}
                    </p>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 text-gray-300">
                        <Calendar className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm">{formatDateTime(event.dateTime)}</span>
                      </div>
                      <div className="flex items-center gap-3 text-gray-300">
                        <MapPin className="w-4 h-4 text-emerald-400" />
                        <span className="text-sm">{event.location}</span>
                      </div>
                    </div>

                    
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

{events.length > 3 && (
      <motion.div className="mt-16 text-center" variants={itemVariants}>
        <NavLink to="/event">
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-semibold inline-flex items-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Events</span>
            <Sparkles className="w-5 h-5" />
          </motion.button>
        </NavLink>
      </motion.div>
    )}
      </motion.div>
    </section>
  );
};

export default FeaturedEvents;