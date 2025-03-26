import React from "react";
import { motion } from "framer-motion";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin, Calendar, ArrowRight } from "lucide-react";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    "Events", "Services", "Gallery", "Testimonials", "Contact Us", "FAQ"
  ];

  const upcomingEvents = [
    { name: "Summer Wedding Expo", date: "June 15, 2025" },
    { name: "Corporate Retreat Planning", date: "July 22, 2025" },
    { name: "Holiday Party Workshop", date: "August 10, 2025" },
  ];

  const socialLinks = [
    { icon: <Facebook size={18} />, href: "#", label: "Facebook" },
    { icon: <Twitter size={18} />, href: "#", label: "Twitter" },
    { icon: <Instagram size={18} />, href: "#", label: "Instagram" },
    { icon: <Mail size={18} />, href: "mailto:contact@eventmanagement.com", label: "Email" },
  ];

  return (
    <footer className="relative bg-[#1B262C] text-gray-300">
      {/* Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-0 right-0 w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[120px]"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
        />
        <motion.div
          className="absolute bottom-0 left-0 w-[600px] h-[600px] rounded-full bg-cyan-500/10 blur-[130px]"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
        />
      </div>

      {/* Main Footer Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center"
            >
              <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
                Crystal Event Management System
              </span>
            </motion.div>
            <p className="text-gray-400 leading-relaxed">
              Transforming your dreams into unforgettable moments. With meticulous planning and flawless execution, we create experiences that last a lifetime.
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((link, index) => (
                <motion.a
                  key={index}
                  href={link.href}
                  aria-label={link.label}
                  className="w-10 h-10 rounded-lg bg-black/40 hover:bg-emerald-500/20 flex items-center justify-center transition-colors duration-300"
                  whileHover={{ y: -3, scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.icon}
                </motion.a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {quickLinks.map((link, index) => (
                <motion.li
                  key={index}
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#" className="flex items-center group text-gray-400 hover:text-emerald-400 transition-colors duration-300">
                    <ArrowRight size={16} className="mr-2 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                    {link}
                  </a>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Upcoming Events */}
          <div>
            <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
              Upcoming Events
            </h3>
            <div className="space-y-6">
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={index}
                  className="group"
                  whileHover={{ x: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <a href="#" className="block">
                    <h4 className="text-gray-300 group-hover:text-emerald-400 transition-colors duration-300">
                      {event.name}
                    </h4>
                    <p className="text-sm text-gray-500 flex items-center mt-1">
                      <Calendar size={14} className="mr-2" />
                      {event.date}
                    </p>
                  </a>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-semibold mb-6 bg-gradient-to-r from-emerald-400 to-cyan-400 text-transparent bg-clip-text">
              Get in Touch
            </h3>
            <ul className="space-y-6">
              <motion.li 
                className="flex items-start group"
                whileHover={{ x: 5 }}
              >
                <MapPin size={18} className="text-emerald-400 mr-3 mt-1 flex-shrink-0" />
                <span className="text-gray-400 group-hover:text-emerald-400 transition-colors duration-300">
                  123 Event Boulevard, Suite 500,<br />
                  Celebration City, EC 12345
                </span>
              </motion.li>
              <motion.li 
                className="flex items-center group"
                whileHover={{ x: 5 }}
              >
                <Phone size={18} className="text-emerald-400 mr-3 flex-shrink-0" />
                <a href="tel:+11234567890" className="text-gray-400 group-hover:text-emerald-400 transition-colors duration-300">
                  (123) 456-7890
                </a>
              </motion.li>
              <motion.li 
                className="flex items-center group"
                whileHover={{ x: 5 }}
              >
                <Mail size={18} className="text-emerald-400 mr-3 flex-shrink-0" />
                <a href="mailto:contact@eventmanagement.com" className="text-gray-400 group-hover:text-emerald-400 transition-colors duration-300">
                  contact@eventmanagement.com
                </a>
              </motion.li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="relative z-10 border-t border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <p className="text-gray-500 text-sm">
              &copy; {currentYear} CrystalEvent. All rights reserved.
            </p>
            <div className="flex space-x-6 text-sm text-gray-500">
              <a href="#" className="hover:text-emerald-400 transition-colors duration-300">Privacy Policy</a>
              <a href="#" className="hover:text-emerald-400 transition-colors duration-300">Terms of Service</a>
              <a href="#" className="hover:text-emerald-400 transition-colors duration-300">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;