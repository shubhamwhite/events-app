import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Play, Search, X, Sparkles, Calendar, Users, Gift, ChevronRight, Home } from 'lucide-react';

const EventGallery = () => {
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAll, setShowAll] = useState(false);
  const [eventCategories, setEventCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  const fallbackData = [
    {
      category: "Elegant Weddings",
      icon: <Users className="w-6 h-6" />,
      description: "Crafting unforgettable moments for your special day",
      images: [
        "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1465495976277-4387d4b0b4c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
        "https://images.unsplash.com/photo-1606800052052-a08af7148866?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      ],
      videos: ["https://player.vimeo.com/external/368763065.sd.mp4?s=13d7e3e1464f21b724d89c4c175d7c712924d2d9&profile_id=139&oauth2_token_id=57447761"],
    },
    {
      category: "Corporate Events",
      icon: <Calendar className="w-6 h-6" />,
      description: "Professional events that leave lasting impressions",
      images: [
        "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80",
        "https://images.unsplash.com/photo-1560439514-4e9645039924?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1632&q=80",
        "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1112&q=80"
      ],
      videos: [],
    },
    {
      category: "Birthday Celebrations",
      icon: <Gift className="w-6 h-6" />,
      description: "Making every birthday a magical celebration",
      images: [
        "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1464349153735-7db50ed83c84?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80",
        "https://images.unsplash.com/photo-1602631985686-1bb0e6a8696e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
        "https://images.unsplash.com/photo-1513151233558-d860c5398176?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
      ],
      videos: ["https://player.vimeo.com/external/370467553.sd.mp4?s=32ef1f185aadf594be7e5ad7c8d364985aa13cd2&profile_id=139&oauth2_token_id=57447761"],
    },
  ];

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/dashboard/gallery/get")
      .then((response) => response.json())
      .then((data) => {
        const formattedData = data.map((event) => ({
          category: event.title,
          icon: getEventIcon(event.title),
          description: event.description || getDefaultDescription(event.title),
          images: [event.image1, event.image2, event.image3, event.image4].filter(Boolean),
          videos: event.video ? [event.video] : [],
        }));
        setEventCategories(formattedData);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching event gallery:", error);
        setEventCategories(fallbackData);
        setLoading(false);
      });
  }, []);

  const getEventIcon = (category) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('wedding')) return <Users className="w-6 h-6" />;
    if (categoryLower.includes('corporate')) return <Calendar className="w-6 h-6" />;
    if (categoryLower.includes('birthday')) return <Gift className="w-6 h-6" />;
    return <Calendar className="w-6 h-6" />;
  };

  const getDefaultDescription = (category) => {
    const categoryLower = category.toLowerCase();
    if (categoryLower.includes('wedding')) return "Creating unforgettable wedding experiences";
    if (categoryLower.includes('corporate')) return "Professional events that leave lasting impressions";
    if (categoryLower.includes('birthday')) return "Making every birthday a magical celebration";
    return "Crafting memorable moments for your special occasion";
  };

  const filteredEvents = eventCategories.filter((event) =>
    event.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const displayedEvents = showAll ? filteredEvents : filteredEvents.slice(0, 3);

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      
      <motion.div
        className="absolute top-0 left-0 w-full h-full"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent" />
      </motion.div>

      <div className="relative z-10 max-w-7xl mx-auto">
        <nav className="mb-8">
          <motion.ol 
            className="flex items-center space-x-2 text-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <li className="flex items-center">
              <a href="/" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
                <Home size={16} />
                <span>Home</span>
              </a>
            </li>
            <li className="flex items-center text-emerald-400">
              <ChevronRight size={16} />
            </li>
            <li className="text-emerald-200">Gallery</li>
          </motion.ol>
        </nav>

        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <motion.span 
            className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 inline-block mb-4"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Discover Our Work
          </motion.span>
          <h1 className="text-5xl sm:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white via-emerald-200 to-emerald-400">
            Event Gallery
          </h1>
          <p className="text-emerald-200/80 text-lg max-w-2xl mx-auto">
            Explore our collection of meticulously crafted events, where every detail tells a story of celebration and success.
          </p>
        </motion.div>

        <div className="max-w-md mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2" size={20} />
            <input
              type="text"
              placeholder="Search events..."
              className="w-full p-4 pl-12 pr-4 bg-black/40 backdrop-blur-sm border border-emerald-500/100 rounded-full text-emerald-400 placeholder-emerald-400/50 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {loading ? (
          <div className="flex justify-center items-center min-h-[400px]">
            <div className="w-12 h-12 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayedEvents.map((event, index) => (
              <motion.div
                key={index}
                className="group bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -8 }}
              >
                <div className="p-6">
                  <div className="flex items-center gap-3 mb-4">
                    
                    <div>
                      <h3 className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
                        {event.category}
                      </h3>
                  
                    </div>
                    {event.videos.length > 0 && (
                      <motion.button
                        className="ml-auto w-8 h-8 rounded-full bg-emerald-500/10 flex items-center justify-center hover:bg-emerald-500/20 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setSelectedMedia({ type: 'video', url: event.videos[0] })}
                      >
                        <Play size={16} className="text-emerald-400 ml-0.5" />
                      </motion.button>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-2 gap-3">
                    {event.images.map((img, idx) => (
                      <motion.div
                        key={idx}
                        className="relative overflow-hidden rounded-lg aspect-[4/3] border border-emerald-500/20"
                        whileHover={{ scale: 1.03 }}
                      >
                        <img
                          src={img}
                          alt={`${event.category} - Image ${idx + 1}`}
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                          onClick={() => setSelectedMedia({ type: 'image', url: img })}
                          loading="lazy"
                        />
                        <div 
                          className="absolute inset-0 bg-gradient-to-t from-emerald-900/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
                          onClick={() => setSelectedMedia({ type: 'image', url: img })}
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
        
        {filteredEvents.length > 3 && (
          <motion.div 
            className="mt-16 text-center "
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-semibold inline-flex items-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 "
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
            >
              <span>{showAll ? 'Show Less' : 'View All Events'}</span>
              <Sparkles className="w-5 h-5 " />
            </motion.button>
          </motion.div>
        )}
      </div>

      <AnimatePresence>
        {selectedMedia && (
          <motion.div
            className="fixed inset-0 bg-black/95 z-50 flex items-center justify-center p-4 sm:p-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMedia(null)}
          >
            <motion.button
              className="absolute top-6 right-6 w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center hover:bg-emerald-500/20 transition-colors z-10"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              onClick={() => setSelectedMedia(null)}
            >
              <X size={20} className="text-emerald-400" />
            </motion.button>
            
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              className="relative max-w-5xl max-h-[80vh] rounded-lg overflow-hidden shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {selectedMedia.type === 'image' ? (
                <img
                  src={selectedMedia.url}
                  alt="Gallery image"
                  className="max-w-full max-h-[80vh] object-contain"
                  loading="lazy"
                />
              ) : (
                <div className="relative bg-black rounded-lg overflow-hidden">
                  <video
                    src={selectedMedia.url}
                    controls
                    autoPlay
                    className="max-w-full max-h-[80vh]"
                  />
                  <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-emerald-400 to-teal-600" />
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default EventGallery;