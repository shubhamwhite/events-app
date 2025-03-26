import React, { useState } from "react";
import { Search, Bell, User, ChevronDown } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import logoImage from '../assets/crystal.png';

const Navbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    localStorage.setItem("isAuthenticated", "false"); // Set authentication to false
    window.location.reload(); // Refresh page to redirect to login
  };

  return (
    <div className="h-16 bg-[#04364A] shadow-md flex items-center justify-between py-4 px-8 lg:px-20">
      {/* Logo / Title */}
      <span className="flex items-center gap-2">
        <img className="h-8" src={logoImage}/>
      <div className="text-xl font-semibold text-white">Crystal Event Dashboard</div>
      </span>
      

      {/* Search Bar */}
      <div className="flex-1 max-w-xl mx-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 pl-10 rounded-lg bg-white/90 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-orange-600 focus:border-transparent placeholder-gray-500 text-gray-800"
          />
          <Search className="absolute left-3 top-2.5 text-gray-500" size={20} />
        </div>
      </div>

      {/* Right Side Icons */}
      <div className="flex items-center gap-4">
        {/* Notification Bell */}
        <button className="relative p-2 hover:bg-white/10 rounded-full transition-all duration-200">
          <Bell size={20} className="text-white" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full border-2 border-white"></span>
        </button>

        {/* User Dropdown */}
        <div className="relative">
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          >
            <div className="w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <span className="font-medium text-white">Admin</span>
            <ChevronDown
              size={18}
              className={`text-white transition-transform duration-200 ${
                dropdownOpen ? "rotate-180" : ""
              }`}
            />
          </div>

          {/* Dropdown Menu */}
          <AnimatePresence>
            {dropdownOpen && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="absolute right-0 mt-2 w-48 bg-white border border-gray-200 rounded-lg shadow-lg z-10 overflow-hidden"
              >
                <button
                  onClick={handleLogout}
                  className="block w-full px-4 py-2 text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200"
                >
                  Logout
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
};

export default Navbar;