import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Users, Building2, Heart, Sparkles } from 'lucide-react';
import { NavLink } from 'react-router';

const events = [
  {
    id: 1,
    type: 'wedding',
    title: 'Sarah & John\'s Wedding',
    description: 'An elegant beachside wedding celebration filled with love and joy.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    date: 'June 15, 2023'
  },
  {
    id: 2,
    type: 'corporate',
    title: 'Tech Summit 2023',
    description: 'Annual corporate gathering showcasing innovation and networking.',
    image: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    date: 'July 22, 2023'
  },
  {
    id: 3,
    type: 'wedding',
    title: 'Emily & Michael\'s Reception',
    description: 'A romantic garden wedding with vintage touches and elegant details.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    date: 'August 10, 2023'
  },
  {
    id: 4,
    type: 'corporate',
    title: 'Annual Awards Gala',
    description: 'Celebrating excellence in business with an evening of recognition.',
    image: 'https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80',
    date: 'September 5, 2023'
  },
  {
    id: 5,
    type: 'wedding',
    title: 'Jessica & David\'s Celebration',
    description: 'A magical winter wonderland wedding with stunning decorations.',
    image: 'https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    date: 'October 1, 2023'
  },
  {
    id: 6,
    type: 'corporate',
    title: 'Product Launch Event',
    description: 'Unveiling our latest innovations to industry leaders.',
    image: 'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80',
    date: 'November 15, 2023'
  }
];

const EventGallery = () => {
  const [filter, setFilter] = useState('all');
  const [expanded, setExpanded] = useState(false);

  const filteredEvents = events.filter(event => 
    filter === 'all' ? true : event.type === filter
  );

  const displayedEvents = expanded ? filteredEvents : filteredEvents.slice(0, 3);

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

  return (
    <section className="relative min-h-[50%] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute bottom-50 left-20 w-72 sm:w-96 h-72 sm:h-96 rounded-full bg-teal-500/20 blur-3xl"
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
        initial="hidden"
        animate="visible"
        variants={containerVariants}
        className="relative z-10 max-w-7xl mx-auto"
      >
        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-10 sm:mb-16">
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 inline-block mb-4">
            Upcoming Events
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
              Event Gallery
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Discover our upcoming signature events and join us for unforgettable experiences crafted with passion and attention to detail.
          </p>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
        >
          <AnimatePresence>
            {displayedEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10"
              >
                <div className="relative h-48 sm:h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
                  <motion.div
                    className="absolute top-4 right-4 text-emerald-400"
                    animate={{
                      rotate: [0, 15, 0, -15, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="w-5 h-5 sm:w-6 sm:h-6" />
                  </motion.div>
                </div>
                <div className="p-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-3">
                      {event.type === 'wedding' ? (
                        <Heart className="w-4 h-4 text-emerald-400" />
                      ) : (
                        <Building2 className="w-4 h-4 text-emerald-400" />
                      )}
                      <span className="text-sm text-emerald-400">{event.date}</span>
                    </div>
                    <h3 className="text-xl font-semibold mb-2">
                      <span className="bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
                        {event.title}
                      </span>
                    </h3>
                    <p className="text-gray-400 text-sm line-clamp-2">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Events Button */}
        {events.length > 3 && (
          <motion.div className="mt-10 sm:mt-16 text-center" variants={itemVariants}>
            <NavLink to="/gallery">
              <motion.button
                className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-semibold inline-flex items-center gap-2 text-sm sm:text-base hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:cursor-pointer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <span>View All Images</span>
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
              </motion.button>
            </NavLink>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default EventGallery;