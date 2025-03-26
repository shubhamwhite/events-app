import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { Upload, Image as ImageIcon, Video, Save, X, Check, Info } from 'lucide-react';

const HeroSection = () => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    motto: '',
  });

  const [image1, setImage1] = useState(null);
  const [image2, setImage2] = useState(null);
  const [video, setVideo] = useState(null);
  const [image1Preview, setImage1Preview] = useState(null);
  const [image2Preview, setImage2Preview] = useState(null);
  const [videoPreview, setVideoPreview] = useState(null);

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
            name: heroData.name || '',
            description: heroData.description || '',
            motto: heroData.motto || '',
          });
          if (heroData.image1) setImage1Preview(heroData.image1);
          if (heroData.image2) setImage2Preview(heroData.image2);
          if (heroData.video) setVideoPreview(heroData.video);
        }
      } catch (error) {
        console.error('Error fetching hero section:', error);
        setFormData({
          name: 'Elegant Event Planning',
          description: 'We create unforgettable experiences tailored to your unique vision. From intimate gatherings to grand celebrations, our team of experts handles every detail with precision and creativity.',
          motto: 'Creating Memories That Last a Lifetime',
        });
        setImage1Preview('https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80');
        setImage2Preview('https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1469&q=80');
        setVideoPreview('https://player.vimeo.com/external/368763065.sd.mp4?s=13d7e3e1464f21b724d89c4c175d7c712924d2d9&profile_id=139&oauth2_token_id=57447761');
      }
    };

    fetchHeroSection();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    const { id, files } = e.target;
    if (!files.length) return;

    const file = files[0];

    if (id === 'hero-image') {
      setImage1(file);
      setImage1Preview(URL.createObjectURL(file));
    } else if (id === 'additional-image') {
      setImage2(file);
      setImage2Preview(URL.createObjectURL(file));
    } else if (id === 'hero-video') {
      setVideo(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setShowStatus(false);

    const data = new FormData();
    data.append('name', formData.name);
    data.append('description', formData.description);
    data.append('motto', formData.motto);
    if (image1) data.append('image1', image1);
    if (image2) data.append('image2', image2);
    if (video) data.append('video', video);

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
      setTimeout(() => {
        setShowStatus(false);
      }, 5000);
    }
  };

  const handleRemoveFile = (type) => {
    if (type === 'image1') {
      setImage1(null);
      setImage1Preview(null);
    } else if (type === 'image2') {
      setImage2(null);
      setImage2Preview(null);
    } else if (type === 'video') {
      setVideo(null);
      setVideoPreview(null);
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
            <div className="flex items-center">
              {submitStatus.success ? (
                <Check className="text-emerald-400 mr-2" size={20} />
              ) : (
                <Info className="text-red-400 mr-2" size={20} />
              )}
              <p className={submitStatus.success ? 'text-emerald-400' : 'text-red-400'}>
                {submitStatus.message}
              </p>
            </div>
          </motion.div>
        )}

        <motion.form
          onSubmit={handleSubmit}
          className="space-y-8"
          variants={containerVariants}
        >
          <motion.div
            className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20 p-6"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold text-emerald-400 mb-4">Company Name</h3>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="Enter your company or event name"
            />
          </motion.div>

          <motion.div
            className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20 p-6"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold text-emerald-400 mb-4">Description</h3>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              rows={4}
              placeholder="Describe your services or event"
            ></textarea>
          </motion.div>

          <motion.div
            className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20 p-6"
            variants={itemVariants}
          >
            <h3 className="text-xl font-bold text-emerald-400 mb-4">Company Motto</h3>
            <input
              type="text"
              name="motto"
              value={formData.motto}
              onChange={handleInputChange}
              className="w-full p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
              placeholder="Enter your motto or tagline"
            />
          </motion.div>

          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
            variants={containerVariants}
          >
            <motion.div
              className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20 p-6"
              variants={itemVariants}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-emerald-400 flex items-center">
                  <ImageIcon size={20} className="mr-2 text-emerald-400" />
                  Primary Image
                </h3>
                {image1Preview && (
                  <motion.button
                    type="button"
                    onClick={() => handleRemoveFile('image1')}
                    className="bg-red-500/20 text-red-400 p-2 rounded-full hover:bg-red-500/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={16} />
                  </motion.button>
                )}
              </div>

              <div className="relative">
                {image1Preview ? (
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={image1Preview}
                      alt="Hero"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <label
                    htmlFor="hero-image"
                    className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-emerald-500/20 rounded-lg cursor-pointer bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors"
                  >
                    <Upload size={40} className="text-emerald-400 mb-2" />
                    <span className="text-emerald-400 font-medium">Click to upload primary image</span>
                    <span className="text-emerald-500/60 text-sm mt-1">PNG, JPG or WEBP (max. 10MB)</span>
                  </label>
                )}
                <input
                  type="file"
                  id="hero-image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </motion.div>

            <motion.div
              className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20 p-6"
              variants={itemVariants}
            >
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-emerald-400 flex items-center">
                  <ImageIcon size={20} className="mr-2 text-emerald-400" />
                  Secondary Image
                </h3>
                {image2Preview && (
                  <motion.button
                    type="button"
                    onClick={() => handleRemoveFile('image2')}
                    className="bg-red-500/20 text-red-400 p-2 rounded-full hover:bg-red-500/30 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={16} />
                  </motion.button>
                )}
              </div>

              <div className="relative">
                {image2Preview ? (
                  <div className="relative rounded-lg overflow-hidden">
                    <img
                      src={image2Preview}
                      alt="Additional"
                      className="w-full h-64 object-cover rounded-lg"
                    />
                  </div>
                ) : (
                  <label
                    htmlFor="additional-image"
                    className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-emerald-500/20 rounded-lg cursor-pointer bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors"
                  >
                    <Upload size={40} className="text-emerald-400 mb-2" />
                    <span className="text-emerald-400 font-medium">Click to upload secondary image</span>
                    <span className="text-emerald-500/60 text-sm mt-1">PNG, JPG or WEBP (max. 10MB)</span>
                  </label>
                )}
                <input
                  type="file"
                  id="additional-image"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20 p-6"
            variants={itemVariants}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-emerald-400 flex items-center">
                <Video size={20} className="mr-2 text-emerald-400" />
                Promotional Video
              </h3>
              {videoPreview && (
                <motion.button
                  type="button"
                  onClick={() => handleRemoveFile('video')}
                  className="bg-red-500/20 text-red-400 p-2 rounded-full hover:bg-red-500/30 transition-colors"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <X size={16} />
                </motion.button>
              )}
            </div>

            <div className="relative">
              {videoPreview ? (
                <div className="relative rounded-lg overflow-hidden">
                  <video
                    controls
                    className="w-full rounded-lg"
                  >
                    <source src={videoPreview} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
              ) : (
                <label
                  htmlFor="hero-video"
                  className="flex flex-col items-center justify-center h-64 border-2 border-dashed border-emerald-500/20 rounded-lg cursor-pointer bg-emerald-500/10 hover:bg-emerald-500/20 transition-colors"
                >
                  <Upload size={40} className="text-emerald-400 mb-2" />
                  <span className="text-emerald-400 font-medium">Click to upload promotional video</span>
                  <span className="text-emerald-500/60 text-sm mt-1">MP4, WebM or OGG (max. 100MB)</span>
                </label>
              )}
              <input
                type="file"
                id="hero-video"
                accept="video/*"
                onChange={handleFileChange}
                className="hidden"
              />
            </div>
          </motion.div>

          <motion.div
            className="mt-10"
            variants={itemVariants}
          >
            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="group relative overflow-hidden w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white py-4 px-8 rounded-xl font-medium inline-flex items-center justify-center gap-2 disabled:opacity-70 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="relative flex items-center">
                {isSubmitting ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  <>
                    <Save size={20} className="mr-2" />
                    Save Hero Section
                  </>
                )}
              </span>
            </motion.button>
          </motion.div>
        </motion.form>
      </motion.div>
    </section>
  );
};

export default HeroSection;