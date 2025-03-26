import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Loader2, MessageSquare, Info } from 'lucide-react';

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

const Contact = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [showStatus, setShowStatus] = useState(false);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/dashboard/contact/get`);
      const data = await response.json();

      if (response.ok) {
        setContacts(data.contacts);
      } else {
        setError(data.message || "Failed to fetch contacts.");
        setShowStatus(true);
      }
    } catch (err) {
      setError("Something went wrong. Please try again.");
      setShowStatus(true);
    } finally {
      setLoading(false);
      if (showStatus) {
        setTimeout(() => setShowStatus(false), 5000);
      }
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }).format(date);
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
            Contact Messages
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
              Message Center
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            View and manage your contact form submissions
          </p>
        </motion.div>

        {/* Status Message */}
        <AnimatePresence>
          {showStatus && error && (
            <motion.div 
              className="mb-8 p-4 rounded-lg bg-red-500/10 border border-red-500/20"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex items-center">
                <Info className="text-red-400 mr-2" size={20} />
                <p className="text-red-400">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {loading ? (
          <div className="flex justify-center items-center py-8">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            >
              <Loader2 className="text-emerald-400" size={32} />
            </motion.div>
          </div>
        ) : contacts.length > 0 ? (
          <motion.div 
            className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20"
            variants={containerVariants}
          >
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-emerald-500/20">
                    <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Name</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Phone</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Email</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Message</th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-emerald-400">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-emerald-500/20">
                  {contacts.map((contact) => (
                    <motion.tr 
                      key={contact.id}
                      className="hover:bg-emerald-500/5 transition-colors"
                      variants={itemVariants}
                    >
                      <td className="px-6 py-4">
                        <h3 className="text-lg font-semibold text-white">{contact.name}</h3>
                      </td>
                      <td className="px-6 py-4 text-gray-400">{contact.phone}</td>
                      <td className="px-6 py-4 text-gray-400">{contact.email}</td>
                      <td className="px-6 py-4 text-gray-400">{contact.message}</td>
                      <td className="px-6 py-4 text-gray-400">{formatDate(contact.createdAt)}</td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        ) : (
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
            <h3 className="mt-3 text-lg font-medium text-emerald-400">No messages yet</h3>
            <p className="mt-1 text-sm text-gray-400">
              When you receive contact form submissions, they will appear here.
            </p>
          </motion.div>
        )}
      </motion.div>
    </section>
  );
};

export default Contact;