import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  X, 
  Pencil, 
  Trash2, 
  Upload, 
  Image as ImageIcon, 
  Video, 
  Save, 
  Check, 
  Info,
  Loader2
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api/v1/dashboard/gallery';

// Animation variants
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

const GallerySection = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    images: [],
    video: null
  });
  const [imagePreview, setImagePreview] = useState([]);
  const [videoPreview, setVideoPreview] = useState(null);
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });
  const [showStatus, setShowStatus] = useState(false);

  const fetchEvents = async () => {
    try {
      setLoading(true);
      const response = await axios.get(`${API_BASE_URL}/get`);
      
      if (!Array.isArray(response.data)) {
        console.error("Invalid data format received:", response.data);
        setSubmitStatus({
          success: false,
          message: 'Invalid data format received from server'
        });
        setShowStatus(true);
        return;
      }

      setEvents(response.data);
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Failed to fetch gallery items'
      });
      setShowStatus(true);
    } finally {
      setLoading(false);
      if (showStatus) {
        setTimeout(() => setShowStatus(false), 5000);
      }
    }
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    setFormData({ ...formData, images: files });
    const previews = files.map(file => URL.createObjectURL(file));
    setImagePreview(previews);
  };

  const handleVideoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, video: file });
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.images.length > 4) {
      setSubmitStatus({
        success: false,
        message: "You can only upload a maximum of 4 images."
      });
      setShowStatus(true);
      return;
    }
    
    try {
      setLoading(true);
      const formDataToSend = new FormData();
      formDataToSend.append('title', formData.title);
      
      formData.images.forEach((image) => {
        formDataToSend.append('images', image);
      });
      
      if (formData.video) {
        formDataToSend.append('video', formData.video);
      }

      if (selectedEvent) {
        await axios.put(`${API_BASE_URL}/update/${selectedEvent.id}`, formDataToSend);
        setSubmitStatus({
          success: true,
          message: 'Event updated successfully!'
        });
      } else {
        await axios.post(`${API_BASE_URL}/create`, formDataToSend);
        setSubmitStatus({
          success: true,
          message: 'Event created successfully!'
        });
      }

      setShowStatus(true);
      handleCloseModal();
      fetchEvents();
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: error.response?.data?.message || 'Operation failed'
      });
      setShowStatus(true);
    } finally {
      setLoading(false);
      setTimeout(() => setShowStatus(false), 5000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this item?')) return;

    try {
      setLoading(true);
      await axios.delete(`${API_BASE_URL}/delete/${id}`);
      setSubmitStatus({
        success: true,
        message: 'Event deleted successfully!'
      });
      setShowStatus(true);
      fetchEvents();
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Failed to delete event'
      });
      setShowStatus(true);
    } finally {
      setLoading(false);
      setTimeout(() => setShowStatus(false), 5000);
    }
  };

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setFormData({
      title: event.title || '',
      images: [],
      video: null
    });
    setImagePreview([event.image1, event.image2, event.image3, event.image4].filter(Boolean));
    setVideoPreview(event.video || null);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedEvent(null);
    setFormData({ title: '', images: [], video: null });
    setImagePreview([]);
    setVideoPreview(null);
    imagePreview.forEach(url => URL.revokeObjectURL(url));
    if (videoPreview) URL.revokeObjectURL(videoPreview);
  };

  const handleRemoveFile = (type, index) => {
    if (type === 'image') {
      const newPreviews = [...imagePreview];
      newPreviews.splice(index, 1);
      setImagePreview(newPreviews);
      
      const newImages = [...formData.images];
      newImages.splice(index, 1);
      setFormData({ ...formData, images: newImages });
    } else if (type === 'video') {
      setVideoPreview(null);
      setFormData({ ...formData, video: null });
    }
  };

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-[#1a1a1a] overflow-hidden">
      {/* Background pattern */}
      <div className="absolute inset-0 opacity-20">
        <div 
          className="absolute inset-0" 
          style={{ 
            backgroundImage: `radial-gradient(circle at 2px 2px, #ffffff 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>

      {/* Animated background gradient */}
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
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 inline-block mb-4">
            Gallery Management
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
              Manage Your Gallery
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Upload and manage your gallery content
          </p>
        </motion.div>

        {/* Status Message */}
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

        <motion.div 
          className="flex justify-between items-center mb-6"
          variants={itemVariants}
        >
          <motion.button
            onClick={() => setShowModal(true)}
            className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={loading}
          >
            <Plus size={18} />
            Add New Event
          </motion.button>
        </motion.div>

        {loading && !showModal && (
          <div className="flex justify-center items-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="text-emerald-400" size={32} />
            </motion.div>
          </div>
        )}
        
        <motion.div 
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6"
          variants={containerVariants}
        >
          {events.map((event) => (
            <motion.div 
              key={event.id} 
              className="bg-black/40 backdrop-blur-sm rounded-xl overflow-hidden border border-emerald-500/20 group"
              variants={itemVariants}
              whileHover={{ y: -3, scale: 1.02 }}
            >
              <div className="relative">
                {/* Main image display */}
                <div className="aspect-square overflow-hidden">
                  {event.image1 ? (
                    <img
                      src={event.image1}
                      alt={event.title}
                      className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-emerald-500/10">
                      <ImageIcon className="text-emerald-400" size={32} />
                    </div>
                  )}
                  
                  {/* Image count indicator */}
                  {(event.image2 || event.image3 || event.image4) && (
                    <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
                      +{[event.image2, event.image3, event.image4].filter(Boolean).length}
                    </div>
                  )}
                  
                  {/* Video indicator */}
                  {event.video && (
                    <div className="absolute bottom-2 left-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full flex items-center">
                      <Video size={12} className="mr-1" />
                      Video
                    </div>
                  )}
                </div>

                {/* Action buttons */}
                <div className="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <motion.button
                    onClick={() => handleEdit(event)}
                    className="p-2 bg-emerald-500 text-white rounded-full shadow-lg hover:bg-emerald-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Pencil size={14} />
                  </motion.button>
                  <motion.button
                    onClick={() => handleDelete(event.id)}
                    className="p-2 bg-red-500 text-white rounded-full shadow-lg hover:bg-red-600 transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <Trash2 size={14} />
                  </motion.button>
                </div>
              </div>

              <div className="p-4">
                <h3 className="font-medium text-emerald-400 truncate">{event.title}</h3>
                <p className="text-xs text-gray-400 mt-1">
                  {new Date(event.createdAt).toLocaleDateString()}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {events.length === 0 && !loading && (
          <motion.div 
            className="text-center py-12 bg-black/40 backdrop-blur-sm rounded-2xl border border-emerald-500/20"
            variants={itemVariants}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <ImageIcon className="mx-auto h-12 w-12 text-emerald-400" />
            </motion.div>
            <h3 className="mt-3 text-lg font-medium text-emerald-400">No events yet</h3>
            <p className="mt-1 text-sm text-gray-400">Get started by creating a new event.</p>
            <motion.button
              onClick={() => setShowModal(true)}
              className="mt-4 group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-xl font-medium inline-flex items-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={16} className="mr-1.5" />
              Add Your First Event
            </motion.button>
          </motion.div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {showModal && (
            <motion.div 
              className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 z-50"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-[#1a1a1a] rounded-2xl p-6 max-w-xl w-full border border-emerald-500/20"
                initial={{ scale: 0.9, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 20 }}
              >
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-2xl font-bold text-emerald-400">
                    {selectedEvent ? 'Edit Event' : 'Add New Event'}
                  </h3>
                  <motion.button
                    onClick={handleCloseModal}
                    className="text-emerald-400 hover:bg-emerald-500/10 p-1.5 rounded-full transition-colors"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <X size={20} />
                  </motion.button>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-emerald-400 mb-1.5">
                      Event Title
                    </label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                      className="w-full p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      placeholder="Enter event title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-400 mb-1.5">
                      Images (max 4)
                    </label>
                    <div className="border-2 border-dashed border-emerald-500/20 rounded-lg p-4 text-center hover:border-emerald-500/40 transition-colors bg-emerald-500/10">
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={handleImageChange}
                        className="hidden"
                        id="images"
                      />
                      <label htmlFor="images" className="cursor-pointer">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex flex-col items-center"
                        >
                          <Upload className="h-10 w-10 text-emerald-400" />
                          <p className="mt-1 text-sm text-emerald-400">Click to upload images</p>
                          <p className="text-xs text-emerald-400/70">(Max 4 images allowed)</p>
                        </motion.div>
                      </label>
                    </div>

                    {imagePreview.length > 0 && (
                      <div className="grid grid-cols-2 gap-3 mt-3">
                        {imagePreview.map((url, index) => (
                          <div key={index} className="relative rounded-lg overflow-hidden group">
                            <img src={url} alt={`Preview ${index + 1}`} className="w-full h-24 object-cover" />
                            <motion.button
                              type="button"
                              onClick={() => handleRemoveFile('image', index)}
                              className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <X size={12} />
                            </motion.button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-400 mb-1.5">
                      Video (Optional)
                    </label>
                    <div className="border-2 border-dashed border-emerald-500/20 rounded-lg p-4 text-center hover:border-emerald-500/40 transition-colors bg-emerald-500/10">
                      <input
                        type="file"
                        accept="video/mp4"
                        onChange={handleVideoChange}
                        className="hidden"
                        id="video"
                      />
                      <label htmlFor="video" className="cursor-pointer">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex flex-col items-center"
                        >
                          <Video className="h-10 w-10 text-emerald-400" />
                          <p className="mt-1 text-sm text-emerald-400">Click to upload video</p>
                          <p className="text-xs text-emerald-400/70">(MP4 format only)</p>
                        </motion.div>
                      </label>
                    </div>

                    {videoPreview && (
                      <div className="mt-3 relative group">
                        <video controls className="w-full rounded-lg border border-emerald-500/20">
                          <source src={videoPreview} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                        <motion.button
                          type="button"
                          onClick={() => handleRemoveFile('video')}
                          className="absolute top-1 right-1 bg-red-500 text-white p-1 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X size={12} />
                        </motion.button>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <motion.button
                      type="button"
                      onClick={handleCloseModal}
                      className="px-6 py-2 border border-emerald-500/20 text-emerald-400 rounded-xl hover:bg-emerald-500/10 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={loading}
                      className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-xl font-medium inline-flex items-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {loading ? (
                        <>
                          <Loader2 className="animate-spin" size={16} />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          {selectedEvent ? 'Update Event' : 'Create Event'}
                        </>
                      )}
                    </motion.button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </section>
  );
};

export default GallerySection;