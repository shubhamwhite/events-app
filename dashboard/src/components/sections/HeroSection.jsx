import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, Save, Plus, Trash2, Calendar, Clock, MapPin, Ticket } from 'lucide-react';

const HeroSection = () => {
  const [formData, setFormData] = useState({
    title: '',
    subtitle: '',
    description: '',
    upcomingEvent: {
      name: '',
      date: '',
      time: '',
      location: '',
      tickets: ''
    }
  });

  const [images, setImages] = useState([]);
  const [imageFiles, setImageFiles] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });
  const [showStatus, setShowStatus] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1
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

  useEffect(() => {
    const fetchHeroSection = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/v1/dashboard/hero/get');
        if (response.data.item && response.data.item.length > 0) {
          const heroData = response.data.item[0];
          setFormData({
            title: heroData.title || '',
            subtitle: heroData.subtitle || '',
            description: heroData.description || '',
            upcomingEvent: heroData.upcomingEvent || {
              name: '',
              date: '',
              time: '',
              location: '',
              tickets: ''
            }
          });
          if (heroData.images) setImages(heroData.images);
        }
      } catch (error) {
        console.error('Error fetching hero section:', error);
        setFormData({
          title: "Creating Unforgettable Moments",
          subtitle: "Premier Event Planning & Management",
          description: "Transform your vision into reality with our expert event planning services. From intimate gatherings to grand celebrations, we craft experiences that leave lasting impressions.",
          upcomingEvent: {
            name: "Annual Gala Night 2024",
            date: "March 15, 2024",
            time: "7:00 PM",
            location: "Grand Plaza Hotel",
            tickets: "Limited Seats Available"
          }
        });
        setImages([
          'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80',
          'https://images.unsplash.com/photo-1469371670807-013ccf25f16a?ixlib=rb-1.2.1&auto=format&fit=crop&w=1920&q=80'
        ]);
      }
    };

    fetchHeroSection();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name.includes('upcomingEvent.')) {
      const field = name.split('.')[1];
      setFormData(prev => ({
        ...prev,
        upcomingEvent: {
          ...prev.upcomingEvent,
          [field]: value
        }
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const newImageFiles = [...imageFiles];
    const newImages = [...images];

    files.forEach(file => {
      const imageUrl = URL.createObjectURL(file);
      newImages.push(imageUrl);
      newImageFiles.push(file);
    });

    setImages(newImages);
    setImageFiles(newImageFiles);
  };

  const handleRemoveImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newImageFiles = imageFiles.filter((_, i) => i !== index);
    setImages(newImages);
    setImageFiles(newImageFiles);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowStatus(false);

    const data = new FormData();
    data.append('title', formData.title);
    data.append('subtitle', formData.subtitle);
    data.append('description', formData.description);
    data.append('upcomingEvent', JSON.stringify(formData.upcomingEvent));
    
    imageFiles.forEach((file) => {
      data.append('images', file);
    });

    try {
      const response = await axios.put('http://localhost:5000/api/v1/dashboard/hero/update', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      setSubmitStatus({
        success: true,
        message: 'Hero section updated successfully!'
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Error updating hero section. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 5000);
    }
  };

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a] overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 inline-block mb-4">
            Hero Section Management
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
              Customize Your Hero
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Customize the main hero section of your event website to showcase your brand and services.
          </p>
        </motion.div>

        {showStatus && (
          <motion.div
            className={`mb-8 p-4 rounded-lg ${
              submitStatus.success 
                ? 'bg-emerald-500/10 border border-emerald-500/20' 
                : 'bg-red-500/10 border border-red-500/20'
            }`}
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <p className={submitStatus.success ? 'text-emerald-400' : 'text-red-400'}>
              {submitStatus.message}
            </p>
          </motion.div>
        )}

        <motion.form onSubmit={handleSubmit} className="space-y-8" variants={containerVariants}>
          {/* Main Content */}
          <motion.div variants={itemVariants}>
            <div className="space-y-6">
              {/* Title */}
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20 p-6">
                <h3 className="text-xl font-bold text-emerald-400 mb-4">Title</h3>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Enter main title"
                />
              </div>

              {/* Subtitle */}
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20 p-6">
                <h3 className="text-xl font-bold text-emerald-400 mb-4">Subtitle</h3>
                <input
                  type="text"
                  name="subtitle"
                  value={formData.subtitle}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  placeholder="Enter subtitle"
                />
              </div>

              {/* Description */}
              <div className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20 p-6">
                <h3 className="text-xl font-bold text-emerald-400 mb-4">Description</h3>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  className="w-full p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                  rows={4}
                  placeholder="Enter description"
                />
              </div>
            </div>
          </motion.div>

          {/* Upcoming Event Section */}
          <motion.div variants={itemVariants}>
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20 p-6">
              <h3 className="text-xl font-bold text-emerald-400 mb-6">Upcoming Event Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-emerald-400 text-sm font-medium mb-2">Event Name</label>
                  <input
                    type="text"
                    name="upcomingEvent.name"
                    value={formData.upcomingEvent.name}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Enter event name"
                  />
                </div>
                <div>
                  <label className="block text-emerald-400 text-sm font-medium mb-2">Date</label>
                  <input
                    type="text"
                    name="upcomingEvent.date"
                    value={formData.upcomingEvent.date}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Enter date"
                  />
                </div>
                <div>
                  <label className="block text-emerald-400 text-sm font-medium mb-2">Time</label>
                  <input
                    type="text"
                    name="upcomingEvent.time"
                    value={formData.upcomingEvent.time}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Enter time"
                  />
                </div>
                <div>
                  <label className="block text-emerald-400 text-sm font-medium mb-2">Location</label>
                  <input
                    type="text"
                    name="upcomingEvent.location"
                    value={formData.upcomingEvent.location}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Enter location"
                  />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-emerald-400 text-sm font-medium mb-2">Ticket Status</label>
                  <input
                    type="text"
                    name="upcomingEvent.tickets"
                    value={formData.upcomingEvent.tickets}
                    onChange={handleInputChange}
                    className="w-full p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                    placeholder="Enter ticket status"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          {/* Images Section */}
          <motion.div variants={itemVariants}>
            <div className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20 p-6">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-emerald-400 flex items-center">
                  <ImageIcon size={20} className="mr-2" />
                  Image Gallery
                </h3>
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 rounded-lg border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-all">
                    <Plus size={16} />
                    <span>Add Images</span>
                  </div>
                </label>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {images.map((image, index) => (
                  <div key={index} className="relative group">
                    <img
                      src={image}
                      alt={`Gallery ${index + 1}`}
                      className="w-full h-48 object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(index)}
                      className="absolute top-2 right-2 p-2 bg-red-500/20 rounded-full text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Submit Button */}
          <motion.div variants={itemVariants}>
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-8 rounded-xl font-medium inline-flex items-center justify-center gap-2 disabled:opacity-70 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
            >
              {isSubmitting ? (
                <>
                  <svg className="animate-spin h-5 w-5 mr-2" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Processing...
                </>
              ) : (
                <>
                  <Save size={20} />
                  Save Changes
                </>
              )}
            </button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default HeroSection;