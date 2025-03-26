import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Plus, 
  Pencil,
  Trash2, 
  X,
  MessageSquare,
  Loader2,
  Save,
  Info
} from 'lucide-react';

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

const FAQSection = () => {
  const [faqs, setFaqs] = useState([
    { id: 1, question: 'Frequently Asked Question 1', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
    { id: 2, question: 'Frequently Asked Question 2', answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' }
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFAQ, setSelectedFAQ] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    question: '',
    answer: '',
  });
  const [submitStatus, setSubmitStatus] = useState({ success: false, message: '' });
  const [showStatus, setShowStatus] = useState(false);

  const handleAddFAQ = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Are you sure you want to delete this FAQ?')) return;
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      setFaqs(faqs.filter(faq => faq.id !== id));
      setSubmitStatus({
        success: true,
        message: 'FAQ deleted successfully!'
      });
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Failed to delete FAQ. Please try again.'
      });
    } finally {
      setIsLoading(false);
      setShowStatus(true);
      setTimeout(() => setShowStatus(false), 3000);
    }
  };

  const handleEdit = (faq) => {
    setSelectedFAQ(faq);
    setFormData({
      question: faq.question,
      answer: faq.answer,
    });
    setIsModalOpen(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      if (selectedFAQ) {
        setFaqs(faqs.map(faq => 
          faq.id === selectedFAQ.id 
            ? { ...faq, question: formData.question, answer: formData.answer }
            : faq
        ));
      } else {
        const newFAQ = {
          id: Date.now(),
          question: formData.question,
          answer: formData.answer
        };
        setFaqs([...faqs, newFAQ]);
      }

      setSubmitStatus({
        success: true,
        message: selectedFAQ ? 'FAQ updated successfully!' : 'FAQ created successfully!'
      });
      setShowStatus(true);
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'Failed to save FAQ. Please try again.'
      });
      setShowStatus(true);
    } finally {
      setIsLoading(false);
      setTimeout(() => setShowStatus(false), 3000);
    }
  };

  const resetForm = () => {
    setFormData({
      question: '',
      answer: '',
    });
    setSelectedFAQ(null);
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
            FAQ Management
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
              Manage Your FAQs
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Create and manage your frequently asked questions
          </p>
        </motion.div>

        {/* Status Message */}
        <AnimatePresence>
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
                  <Info className="text-emerald-400 mr-2" size={20} />
                ) : (
                  <Info className="text-red-400 mr-2" size={20} />
                )}
                <p className={submitStatus.success ? 'text-emerald-400' : 'text-red-400'}>
                  {submitStatus.message}
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div 
          className="flex justify-end mb-6"
          variants={itemVariants}
        >
          <motion.button
            onClick={handleAddFAQ}
            className="group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Plus size={18} />
            Add New FAQ
          </motion.button>
        </motion.div>

        <motion.div 
          className="space-y-4"
          variants={containerVariants}
        >
          {faqs.map((faq) => (
            <motion.div 
              key={faq.id}
              className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20"
              variants={itemVariants}
            >
              <div className="p-6">
                <div className="flex gap-6">
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-white mb-2">{faq.question}</h3>
                    <p className="text-gray-400">{faq.answer}</p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <motion.button
                      onClick={() => handleEdit(faq)}
                      className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-full transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Pencil size={20} />
                    </motion.button>
                    <motion.button
                      onClick={() => handleDelete(faq.id)}
                      className="p-2 text-red-400 hover:bg-red-500/10 rounded-full transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Trash2 size={20} />
                    </motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {faqs.length === 0 && (
          <motion.div 
            className="text-center py-12 bg-black/40 backdrop-blur-sm rounded-2xl border border-emerald-500/20"
            variants={itemVariants}
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              <MessageSquare className="mx-auto h-12 w-12 text-emerald-400" />
            </motion.div>
            <h3 className="mt-3 text-lg font-medium text-emerald-400">No FAQs yet</h3>
            <p className="mt-1 text-sm text-gray-400">Get started by adding your first FAQ.</p>
            <motion.button
              onClick={handleAddFAQ}
              className="mt-4 group relative overflow-hidden bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-6 py-3 rounded-xl font-medium inline-flex items-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Plus size={16} className="mr-1.5" />
              Add Your First FAQ
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
                    {selectedFAQ ? 'Edit FAQ' : 'Add New FAQ'}
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
                      Question
                    </label>
                    <input
                      type="text"
                      name="question"
                      value={formData.question}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      placeholder="Enter FAQ question"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-emerald-400 mb-1.5">
                      Answer
                    </label>
                    <textarea
                      name="answer"
                      value={formData.answer}
                      onChange={handleInputChange}
                      className="w-full p-4 bg-emerald-500/10 border border-emerald-500/20 rounded-lg text-white focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none transition-all"
                      rows="4"
                      placeholder="Enter FAQ answer"
                      required
                    />
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
                          {selectedFAQ ? 'Update FAQ' : 'Create FAQ'}
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

export default FAQSection;