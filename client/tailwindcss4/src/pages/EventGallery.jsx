import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Camera, Users, Building2, Heart, Sparkles, Home, ChevronRight, Video, Image } from 'lucide-react';

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
    <section className="relative min-h-[50%] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute bottom-50 left-20 w-60 sm:w-72 h-60 sm:h-72 rounded-full bg-teal-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 18,
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
        <nav className="mb-6 sm:mb-8">
          <motion.ol 
            className="flex items-center space-x-2 text-xs sm:text-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <li className="flex items-center">
              <a href="/" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
                <Home size={14} className="sm:w-4 sm:h-4" />
                <span>Home</span>
              </a>
            </li>
            <li className="flex items-center text-emerald-400">
              <ChevronRight size={14} className="sm:w-4 sm:h-4" />
            </li>
            <li className="text-emerald-200">Featured Events</li>
          </motion.ol>
        </nav>

        {/* Header Section */}
        <motion.div variants={itemVariants} className="text-center mb-8 sm:mb-12">
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 text-xs sm:text-sm font-medium border border-emerald-500/20 inline-block mb-4">
            Upcoming Events
          </span>
          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
              Event Gallery
            </span>
          </h2>
          <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-2xl mx-auto">
            Discover our upcoming signature events and join us for unforgettable experiences crafted with passion and attention to detail.
          </p>
        </motion.div>

        {/* Filter Buttons */}
        <motion.div variants={itemVariants} className="flex flex-wrap justify-center gap-2 sm:gap-4 mb-8 sm:mb-12">
          <button
            onClick={() => setFilter('all')}
            className={`px-3 sm:px-6 py-2 rounded-full transition-all text-xs sm:text-sm ${
              filter === 'all'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                : 'bg-gray-800/80 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Camera className="inline-block w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            All Events
          </button>
          <button
            onClick={() => setFilter('wedding')}
            className={`px-3 sm:px-6 py-2 rounded-full transition-all text-xs sm:text-sm ${
              filter === 'wedding'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                : 'bg-gray-800/80 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Heart className="inline-block w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Weddings
          </button>
          <button
            onClick={() => setFilter('corporate')}
            className={`px-3 sm:px-6 py-2 rounded-full transition-all text-xs sm:text-sm ${
              filter === 'corporate'
                ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white'
                : 'bg-gray-800/80 text-gray-400 hover:bg-gray-700'
            }`}
          >
            <Building2 className="inline-block w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
            Corporate
          </button>
        </motion.div>

        {/* Gallery Grid */}
        <motion.div
          variants={containerVariants}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
        >
          <AnimatePresence>
            {displayedEvents.map((event, index) => (
              <motion.div
                key={event.id}
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="group bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10"
              >
                <div className="relative h-40 sm:h-48 lg:h-56 overflow-hidden">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-transparent"></div>
                  <div className="absolute top-3 sm:top-4 left-3 sm:left-4 flex space-x-2">
                    <motion.button
                      className="p-1.5 sm:p-2 bg-black/50 backdrop-blur-md rounded-full text-emerald-400 hover:text-emerald-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Video className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.button>
                    <motion.button
                      className="p-1.5 sm:p-2 bg-black/50 backdrop-blur-md rounded-full text-emerald-400 hover:text-emerald-300 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Image className="w-3 h-3 sm:w-4 sm:h-4" />
                    </motion.button>
                  </div>
                  <motion.div
                    className="absolute top-3 sm:top-4 right-3 sm:right-4 text-emerald-400"
                    animate={{
                      rotate: [0, 15, 0, -15, 0],
                      scale: [1, 1.2, 1]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6" />
                  </motion.div>
                </div>
                <div className="p-4 sm:p-6 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2 sm:mb-3">
                      {event.type === 'wedding' ? (
                        <Heart className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                      ) : (
                        <Building2 className="w-3 h-3 sm:w-4 sm:h-4 text-emerald-400" />
                      )}
                      <span className="text-xs sm:text-sm text-emerald-400">{event.date}</span>
                    </div>
                    <h3 className="text-lg sm:text-xl font-semibold mb-2">
                      <span className="bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
                        {event.title}
                      </span>
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-400 line-clamp-2">{event.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* View All Events Button */}
        {filteredEvents.length > 3 && (
          <motion.div variants={itemVariants} className="mt-8 sm:mt-12 lg:mt-16 text-center">
            <motion.button
              onClick={() => setExpanded(!expanded)}
              className="px-5 sm:px-6 py-2.5 sm:py-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-semibold inline-flex items-center gap-2 text-xs sm:text-sm hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>{expanded ? 'Show Less' : 'View All Events'}</span>
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4" />
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default EventGallery;