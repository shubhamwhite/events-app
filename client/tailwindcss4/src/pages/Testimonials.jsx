import React, { useState } from 'react';
import { Star, Upload, Send, Home, ChevronRight, User, Briefcase, MessageSquare } from 'lucide-react';
import { motion } from 'framer-motion';

const Testimonials = () => {
  const [formData, setFormData] = useState({
    name: '',
    profession: '',
    title: '',
    message: '',
    rating: 0,
    imageUrl: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&auto=format&fit=crop&q=80',
  });

  const handleStarClick = (rating) => {
    setFormData(prev => ({ ...prev, rating }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Testimonial submitted:', formData);
  };

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
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      {/* Floating Elements */}
      
      <motion.div
        className="relative z-10 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >

        {/* Breadcrumb Navigation */}
        <motion.nav className="mb-8" variants={itemVariants}>
          <ol className="flex items-center space-x-2 text-sm">
            <li className="flex items-center">
              <a href="/" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
                <Home size={16} />
                <span>Home</span>
              </a>
            </li>
            <li className="flex items-center text-emerald-400">
              <ChevronRight size={16} />
            </li>
            <li className="text-emerald-200">Testimonial</li>
          </ol>
        </motion.nav>

        <motion.div
          className="text-center mb-16"
          variants={itemVariants}
        >
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 inline-block mb-4">
            Share Your Experience
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
              Submit Your Testimonial
            </span>
          </h2>
          <p className="text-gray-400 text-lg">
            We value your feedback! Share your experience with our services.
          </p>
        </motion.div>

        <motion.form 
          onSubmit={handleSubmit} 
          className="space-y-8"
          variants={containerVariants}
        >
          <motion.div 
            className="bg-black/40 backdrop-blur-sm rounded-2xl border border-emerald-500/20 p-8"
            variants={itemVariants}
          >
            {/* Profile Image */}
            <motion.div 
              className="flex flex-col items-center mb-8"
              variants={itemVariants}
            >
              <div className="relative w-32 h-32 mb-4">
                <img
                  src={formData.imageUrl}
                  alt="Profile"
                  className="w-full h-full rounded-full object-cover border-4 border-emerald-500/20"
                />
                <motion.button
                  type="button"
                  className="absolute bottom-0 right-0 p-2 bg-emerald-500 rounded-full text-white hover:bg-emerald-600 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Upload className="w-4 h-4" />
                </motion.button>
              </div>
            </motion.div>

            {/* Personal Information */}
            <div className=" mb-6">
              <div className="relative">
                <label className="block text-emerald-400 text-sm font-medium mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400" size={18} />
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                    placeholder="John Doe"
                  />
                </div>
              </div>
            
                </div>
    
     

            {/* Message */}
            <div className="mb-6">
              <label className="block text-emerald-400 text-sm font-medium mb-2">
                Your Message
              </label>
              <div className="relative">
                <MessageSquare className="absolute left-4 top-6 text-emerald-400" size={18} />
                <textarea
                  value={formData.message}
                  onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
                  className="w-full bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 pl-12 text-white placeholder-gray-500 focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all min-h-[150px]"
                  placeholder="Share your experience with us..."
                />
              </div>
            </div>

                   {/* Rating */}
          <div className="mb-6">
              <label className="block text-emerald-400 text-sm font-medium mb-2">
                Rating
              </label>
              <div className="flex gap-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <motion.button
                  key={star}
                  type="button"
                  onClick={() => handleStarClick(star)}
                  className={`transition-colors ${
                    star <= formData.rating
                    ? 'text-yellow-400'
                    : 'text-gray-600'
                    }`}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.9 }}
                    >
                    <Star className="w-8 h-8 fill-current" />
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              type="submit"
              className="w-full px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-semibold inline-flex items-center justify-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="flex items-center gap-2">
                Submit Testimonial
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <Send className="w-5 h-5" />
                </motion.div>
              </span>
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Testimonials;