import React, { useState } from 'react';
import { Home, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const EventBlog = () => {
  const [showAll, setShowAll] = useState(false);

  const blogs = [
    {
      title: "The Art of Corporate Event Planning",
      date: "March 15, 2024",
      category: "Corporate Events",
      image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      excerpt: "Discover the key elements that make corporate events successful and memorable for all attendees.",
      readTime: "5 min read"
    },
    {
      title: "Wedding Trends for 2024",
      date: "March 12, 2024",
      category: "Weddings",
      image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      excerpt: "Explore the latest wedding trends that are making waves this year, from sustainable celebrations to tech-integrated ceremonies.",
      readTime: "7 min read"
    },
    {
      title: "Creating the Perfect Birthday Celebration",
      date: "March 10, 2024",
      category: "Birthday Events",
      image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      excerpt: "Tips and tricks for planning unforgettable birthday parties for all ages and preferences.",
      readTime: "4 min read"
    },
    {
      title: "Sustainable Event Planning Guide",
      date: "March 8, 2024",
      category: "Event Planning",
      image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
      excerpt: "Learn how to create eco-friendly events without compromising on style or experience.",
      readTime: "6 min read"
    },
    {
      title: "Mastering Event Catering",
      date: "March 5, 2024",
      category: "Catering",
      image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
      excerpt: "Expert insights into planning and executing flawless event catering services.",
      readTime: "5 min read"
    },
    {
      title: "Venue Selection Secrets",
      date: "March 1, 2024",
      category: "Venues",
      image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1112&q=80",
      excerpt: "Professional tips for choosing the perfect venue for any type of event.",
      readTime: "8 min read"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  const displayedBlogs = showAll ? blogs : blogs.slice(0, 3);

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-50 right-20 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -40, 0],
            y: [0, 30, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
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
            <li className="text-emerald-200">Blog</li>
          </motion.ol>
        </nav>

        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 inline-block mb-4">
            Our Blog
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
              Latest Event Planning Insights
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Stay updated with the latest trends, tips, and stories from the world of event planning and management.
          </p>
        </motion.div>

        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            variants={containerVariants}
          >
            {displayedBlogs.map((blog, index) => (
              <motion.article
                key={index}
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
                    src={blog.image} 
                    alt={blog.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4 px-3 py-1 bg-emerald-500/90 rounded-full text-xs text-white">
                    {blog.category}
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-3">
                    <span>{blog.date}</span>
                    <span>{blog.readTime}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 text-white group-hover:text-emerald-400 transition-colors">
                    {blog.title}
                  </h3>
                  <p className="text-gray-400 mb-4">
                    {blog.excerpt}
                  </p>
                  <a 
                    href="#" 
                    className="inline-flex items-center text-emerald-400 hover:text-emerald-300 transition-colors"
                  >
                    Read More <ArrowRight size={16} className="ml-2" />
                  </a>
                </div>
              </motion.article>
            ))}
          </motion.div>
        </AnimatePresence>

        <div className="flex flex-col gap-8 items-center mt-16">
          {blogs.length > 3 && (
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-semibold inline-flex items-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
              variants={itemVariants}
            >
              <span>{showAll ? 'Show Less' : 'View All Posts'}</span>
              <Sparkles className="w-5 h-5" />
            </motion.button>
          )}
        </div>
      </motion.div>
    </section>
  );
};

export default EventBlog;