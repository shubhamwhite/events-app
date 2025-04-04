import React, { useState } from 'react';
import { Star, Upload, Send, Home, ChevronRight, User, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Navbar from '../components/Navbar';

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
    <>
    <Navbar/>
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-50 right-20 w-60 sm:w-72 h-60 sm:h-72 rounded-full bg-emerald-500/20 blur-3xl"
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
          className="max-w-2xl mx-auto"
          variants={containerVariants}
          >
          <motion.div 
            className="group bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10 p-8"
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
            >
            <div className="relative z-10">
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
              <div className="mb-6">
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
            </div>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
    </>
  );
};

export default Testimonials;