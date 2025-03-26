import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Pencil, 
  Trash2, 
  X, 
  Image as ImageIcon,
  Loader2,
  Upload,
  Save,
  Check,
  Info
} from 'lucide-react';

const API_BASE_URL = 'http://localhost:5000/api/v1';

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

function ServiceSection() {
  const [services, setServices] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedService, setSelectedService] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    image: null,
    imagePreview: null,
  });
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/service/get`);
      const data = await response.json();
      setServices(data.events);
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Failed to fetch services'
      });
      setShowStatus(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      const file = e.target.files[0];
      setFormData(prev => ({
        ...prev,
        image: file,
        imagePreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const formDataToSend = new FormData();
      
      if (selectedService) {
        formDataToSend.append('id', selectedService.id.toString());
      }
      
      formDataToSend.append('title', formData.title);
      formDataToSend.append('description', formData.description || '');
      
      if (formData.image) {
        formDataToSend.append('image', formData.image);
      }

      const url = selectedService
        ? `${API_BASE_URL}/dashboard/service/update`
        : `${API_BASE_URL}/dashboard/service/create`;

      const method = selectedService ? 'PUT' : 'POST';

      const response = await fetch(url, {
        method,
        body: formDataToSend,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      setSubmitStatus({
        success: true,
        message: selectedService ? 'Service updated successfully!' : 'Service created successfully!'
      });
      setShowStatus(true);
      await fetchServices();
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Failed to save service. Please try again.'
      });
      setShowStatus(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowStatus(false), 5000);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this service?')) return;

    setIsLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/service/delete/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      setSubmitStatus({
        success: true,
        message: 'Service deleted successfully!'
      });
      setShowStatus(true);
      await fetchServices();
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Failed to delete service'
      });
      setShowStatus(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleEdit = (service) => {
    setSelectedService(service);
    setFormData({
      title: service.title,
      description: service.description || '',
      image: null,
      imagePreview: service.image,
    });
    setIsModalOpen(true);
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      image: null,
      imagePreview: null,
    });
    setSelectedService(null);
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
        className="relative z-10 max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 inline-block mb-4">
            Services Management
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
              Manage Your Services
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Create and manage your service offerings
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
            onClick={() => {
              resetForm();
              setIsModalOpen(true);
            }}
            className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            disabled={isLoading}
          >
            <Plus size={18} />
            Add New Service
          </motion.button>
        </motion.div>

        {isLoading && !isModalOpen && (
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
          className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20"
          variants={containerVariants}
        >
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-emerald-500/20">
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Service</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Description</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Image</th>
                  <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-emerald-500/20">
                {services.map((service) => (
                  <motion.tr 
                    key={service.id} 
                    className="hover:bg-emerald-500/5 transition-colors"
                    variants={itemVariants}
                  >
                    <td className="px-6 py-4">
                      <h3 className="text-lg font-semibold text-white">{service.title}</h3>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-sm text-gray-400">{service.description}</p>
                    </td>
                    <td className="px-6 py-4">
                      <div className="relative group">
                        {service.image ? (
                          <img
                            src={service.image}
                            alt={service.title}
                            className="w-24 h-24  filter invert object-cover rounded-lg border border-emerald-500/20"
                          />
                        ) : (
                          <div className="w-24 h-24 bg-emerald-500/10 rounded-lg flex items-center justify-center border border-emerald-500/20">
                            <ImageIcon className="text-emerald-400" size={24} />
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex gap-2">
                        <motion.button
                          onClick={() => handleEdit(service)}
                          className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-full transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Pencil size={18} />
                        </motion.button>
                        <motion.button
                          onClick={() => handleDelete(service.id)}
                          className="p-2 text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Trash2 size={18} />
                        </motion.button>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>

        {services.length === 0 && !isLoading && (
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
            <h3 className="mt-3 text-lg font-medium text-emerald-400">No services yet</h3>
            <p className="mt-1 text-sm text-gray-400">Get started by creating a new service.</p>
            <motion.button
              onClick={() => setIsModalOpen(true)}
              className="mt-4 group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-xl font-medium inline-flex items-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Plus size={16} className="mr-1.5" />
              Add Your First Service
            </motion.button>
          </motion.div>
        )}

        {/* Modal */}
        <AnimatePresence>
          {isModalOpen && (
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
                    {selectedService ? 'Edit Service' : 'Add New Service'}
                  </h3>
                  <motion.button
                    onClick={() => setIsModalOpen(false)}
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
                      Service Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={formData.title}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      placeholder="Enter service title"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-400 mb-1.5">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={formData.description}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      rows="3"
                      placeholder="Enter service description"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-400 mb-1.5">
                      Service Image
                    </label>
                    <div className="border-2 border-dashed border-emerald-500/20 rounded-lg p-4 text-center hover:border-emerald-500/40 transition-colors bg-emerald-500/10">
                      <input
                        type="file"
                        name="image"
                        onChange={handleFileChange}
                        className="hidden"
                        id="image"
                        accept="image/*"
                      />
                      <label htmlFor="image" className="cursor-pointer">
                        <motion.div
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          className="flex flex-col items-center"
                        >
                          <Upload className="h-10 w-10 text-emerald-400" />
                          <p className="mt-1 text-sm text-emerald-400">Click to upload image</p>
                        </motion.div>
                      </label>
                    </div>

                    {formData.imagePreview && (
                      <div className="mt-3 relative group">
                        <img
                          src={formData.imagePreview}
                          alt="Preview"
                          className="w-full h-48 filter invert object-cover rounded-lg border border-emerald-500/20"
                        />
                        <motion.button
                          type="button"
                          onClick={() => setFormData(prev => ({ ...prev, image: null, imagePreview: null }))}
                          className="absolute top-2 right-2 bg-red-500 text-white p-1.5 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-opacity"
                          whileHover={{ scale: 1.1 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <X size={14} />
                        </motion.button>
                      </div>
                    )}
                  </div>

                  <div className="flex justify-end gap-2 pt-4">
                    <motion.button
                      type="button"
                      onClick={() => setIsModalOpen(false)}
                      className="px-6 py-2 border border-emerald-500/20 text-emerald-400 rounded-xl hover:bg-emerald-500/10 transition-colors"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Cancel
                    </motion.button>
                    <motion.button
                      type="submit"
                      disabled={isLoading}
                      className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-2 rounded-xl font-medium inline-flex items-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {isLoading ? (
                        <>
                          <Loader2 className="animate-spin" size={16} />
                          Processing...
                        </>
                      ) : (
                        <>
                          <Save size={16} />
                          {selectedService ? 'Update Service' : 'Create Service'}
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
}

export default ServiceSection;