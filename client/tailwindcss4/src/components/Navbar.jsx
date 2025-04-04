import { NavLink, Outlet } from "react-router";
import React, { useState } from "react";
import { Menu, X, BookOpen } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navItems = [
    { name: "Home", path: "/"},
    { name: "Events", path: "/event" },
    { name: "Services", path: "/service" },
    { name: "Gallery", path: "/gallery" },
    { name: "Send Testimonials", path: "/testimonial" },
    { name: "Contact Us", path: "/contact" },
  ];

  const navVariants = {
    hidden: { 
      opacity: 0,
      height: 0,
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.2,
        ease: "easeInOut"
      }
    }
  };

  return (
    <>
      <nav className="sticky top-0 left-0 right-0 z-20 bg-[#1B262C]/80 backdrop-blur-lg border-b border-emerald-500/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex-shrink-0"
            >
              <NavLink to="/" className="flex items-center">
                <span className="text-2xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
                  CrystalEvent
                </span>
              </NavLink>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `px-3 py-2 rounded-md text-sm font-medium transition-colors duration-200 ${
                          isActive ? "text-emerald-400" : "text-gray-300 hover:text-emerald-400"
                        }`
                      }
                    >
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <NavLink
                    to="/store"
                    className="inline-flex px-4 py-2 rounded-md text-sm font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-colors duration-200 items-center gap-2"
                  >
                    <BookOpen size={16} />
                    <span>Book Store</span>
                  </NavLink>
                </motion.div>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsOpen(!isOpen)}
                className="inline-flex items-center justify-center p-2 rounded-md text-emerald-400 hover:text-emerald-500 hover:bg-black/40 focus:outline-none"
                aria-label="Toggle menu"
              >
                {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </motion.button>
            </div>
          </div>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className="fixed inset-x-0 top-16 md:hidden bg-[#1B262C]/100 backdrop-blur-lg border-t border-emerald-500/20"
              initial="hidden"
              animate="visible"
              exit="hidden"
              variants={navVariants}
            >
              <div className="px-4 py-3 space-y-2">
                {navItems.map((item) => (
                  <motion.div
                    key={item.name}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full"
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `block w-full px-4 py-2.5 rounded-lg text-base font-medium transition-colors duration-200 ${
                          isActive 
                            ? "bg-emerald-500/10 text-emerald-400" 
                            : "text-gray-300 hover:bg-emerald-500/5 hover:text-emerald-400"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      {item.name}
                    </NavLink>
                  </motion.div>
                ))}
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full"
                >
                  <NavLink
                    to="/store"
                    className="flex items-center gap-2 w-full px-4 py-2.5 rounded-lg text-base font-medium bg-gradient-to-r from-emerald-500 to-teal-500 text-white hover:from-emerald-600 hover:to-teal-600 transition-colors duration-200"
                    onClick={() => setIsOpen(false)}
                  >
                    <BookOpen size={18} />
                    <span>Book Store</span>
                  </NavLink>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* Outlet for rendering nested components */}
      <Outlet />
    </>
  );
};

export default Navbar;