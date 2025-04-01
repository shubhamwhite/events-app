import React, { useState } from "react";
import { Send, Mail, Home, User, MessageSquare, Phone, ArrowRight, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Contact = () => {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setStatus("");

    try {
      const response = await fetch("http://localhost:5000/api/v1/dashboard/contact/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, message, phone }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("Message sent successfully! We'll get back to you soon.");
        setName("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else {
        setStatus(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("Failed to send message. Please check your connection.");
    } finally {
      setLoading(false);
    }
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
    <section className="relative min-h-screen py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
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
        <motion.nav className="mb-6 sm:mb-8" variants={itemVariants}>
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
            <li className="text-emerald-200">Contact</li>
          </ol>
        </motion.nav>

        <motion.div
          className="text-center mb-8 sm:mb-12 lg:mb-16"
          variants={itemVariants}
        >
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 inline-block mb-4">
            Get in Touch
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
              Contact Us
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Have a question or want to work together? Drop us a message and we'll get back to you as soon as possible!
          </p>
        </motion.div>

        <motion.div
          className="max-w-4xl mx-auto"
          variants={containerVariants}
        >
          <motion.div
            className="group bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10 grid md:grid-cols-5 gap-6"
            variants={itemVariants}
            whileHover={{ y: -4, transition: { duration: 0.3 } }}
          >
            {/* Contact info sidebar */}
            <div className="md:col-span-2 bg-emerald-500/10 p-6 sm:p-8 text-white flex flex-col justify-between border-b md:border-b-0 md:border-r border-emerald-500/20">
              <div>
                <h3 className="text-xl sm:text-2xl font-bold text-emerald-400 mb-4 sm:mb-6">Contact Information</h3>
                <p className="mb-6 sm:mb-8 text-gray-400 text-sm sm:text-base">Fill out the form and we'll get back to you within 24 hours.</p>
                
                <div className="space-y-4 sm:space-y-6">
                  <div className="flex items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mr-4 text-emerald-400">
                      <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-gray-400 text-sm sm:text-base">+1 (555) 123-4567</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mr-4 text-emerald-400">
                      <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-gray-400 text-sm sm:text-base">contact@example.com</span>
                  </div>
                  
                  <div className="flex items-center">
                    <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mr-4 text-emerald-400">
                      <MessageSquare className="w-4 h-4 sm:w-5 sm:h-5" />
                    </div>
                    <span className="text-gray-400 text-sm sm:text-base">@username</span>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 sm:pt-6 border-t border-emerald-500/20">
                <p className="text-xs sm:text-sm text-gray-400">
                  &copy; {new Date().getFullYear()} All rights reserved
                </p>
              </div>
            </div>
            
            {/* Contact form */}
            <div className="md:col-span-3 p-6 sm:p-8">
              <AnimatePresence>
                {status && (
                  <motion.div 
                    className={`mb-6 p-4 rounded-xl ${
                      status.includes("successfully") 
                        ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20" 
                        : "bg-red-500/10 text-red-400 border border-red-500/20"
                    }`}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p className="text-sm sm:text-base">{status}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <form className="space-y-4 sm:space-y-6" onSubmit={handleSubmit}>
                {/* Name Input */}
                <div>
                  <label htmlFor="name" className="text-xs sm:text-sm font-medium text-emerald-400 block mb-2">
                    Your Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-emerald-400" size={16} />
                    <input
                      id="name"
                      type="text"
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full p-3 sm:p-4 pl-10 sm:pl-12 text-sm sm:text-base bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Phone Input */}
                <div>
                  <label htmlFor="phone" className="text-xs sm:text-sm font-medium text-emerald-400 block mb-2">
                    Phone Number
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-emerald-400" size={16} />
                    <input
                      id="phone"
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full p-3 sm:p-4 pl-10 sm:pl-12 text-sm sm:text-base bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Email Input */}
                <div>
                  <label htmlFor="email" className="text-xs sm:text-sm font-medium text-emerald-400 block mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-emerald-400" size={16} />
                    <input
                      id="email"
                      type="email"
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full p-3 sm:p-4 pl-10 sm:pl-12 text-sm sm:text-base bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                {/* Message Input */}
                <div>
                  <label htmlFor="message" className="text-xs sm:text-sm font-medium text-emerald-400 block mb-2">
                    Your Message
                  </label>
                  <div className="relative">
                    <MessageSquare className="absolute left-3 sm:left-4 top-4 text-emerald-400" size={16} />
                    <textarea
                      id="message"
                      placeholder="How can we help you?"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="w-full p-3 sm:p-4 pl-10 sm:pl-12 text-sm sm:text-base bg-emerald-500/10 border border-emerald-500/20 rounded-xl text-white placeholder-gray-500 focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all resize-none h-24 sm:h-32"
                      required
                    ></textarea>
                  </div>
                </div>

                {/* Submit Button */}
                <motion.button
                  type="submit"
                  className="w-full py-3 sm:py-4 px-6 sm:px-8 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-semibold inline-flex items-center justify-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 disabled:opacity-50 text-sm sm:text-base"
                  disabled={loading}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="flex items-center gap-2">
                    {loading ? "Sending..." : (
                      <>
                        Send Message
                        <motion.div
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5" />
                        </motion.div>
                      </>
                    )}
                  </span>
                </motion.button>
              </form>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Contact;