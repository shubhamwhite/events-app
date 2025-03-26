import React from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Home, Calendar, Image, HelpCircle, MessageSquareHeart, Contact, Package, Tag, BarChart as ChartBar, FilterIcon as FooterIcon, Layout } from "lucide-react";

const menuItems = [
  { id: "analytics", label: "Analytics", icon: ChartBar },
  { id: "hero", label: "Hero", icon: Home },
  { id: "offer", label: "Offer", icon: Tag },
  { id: "events", label: "Feature Events", icon: Calendar },
  { id: "service", label: "Our Services", icon: Package },
  { id: "gallery", label: "Gallery Section", icon: Image },
  { id: "testimonials", label: "Testimonials", icon: MessageSquareHeart },
  { id: "contact", label: "Contact", icon: Contact },
  { id: "faq", label: "FAQ Section", icon: HelpCircle },
  { id: "footer", label: "Footer Section", icon: FooterIcon },
];

const Sidebar = ({ isOpen, setIsOpen, activeSection, setActiveSection }) => {
  return (
    <motion.div
      initial={false}
      animate={{
        width: isOpen ? "260px" : "70px",
        transition: { duration: 0.3, ease: "easeInOut" },
      }}
      className="h-screen bg-[#1a1a1a] text-white shadow-lg flex flex-col border-r border-emerald-500/20"
    >
      {/* Logo Section */}
      <div className="flex items-center justify-between h-16 px-4 bg-[#1a1a1a]  border-emerald-500/20">
       
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsOpen(!isOpen)}
          className="p-2 rounded-lg transition-colors text-emerald-400"
        >
          {isOpen ? <ChevronLeft size={20} /> : <ChevronRight size={20} />}
        </motion.button>
      </div>

      {/* Navigation Menu */}
      <nav className="flex-1 overflow-y-auto px-2 py-4 space-y-1">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.id;

          return (
            <motion.button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all relative ${
                isActive
                  ? "bg-emerald-500/10 text-emerald-400 shadow-inner border border-emerald-500/20"
                  : "hover:bg-emerald-500/5 text-gray-400 hover:text-emerald-400"
              }`}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Icon
                size={22}
                className={`${
                  isActive ? "text-emerald-400" : "text-gray-500"
                } transition-colors`}
              />
              {isOpen && (
                <span
                  className={`${
                    isActive ? "text-emerald-400" : "text-gray-300"
                  } transition-colors`}
                >
                  {item.label}
                </span>
              )}
              {isActive && (
                <motion.div
                  layoutId="activeSection"
                  className="absolute inset-0 rounded-xl bg-emerald-400/5"
                  transition={{
                    type: "spring",
                    stiffness: 500,
                    damping: 30,
                  }}
                />
              )}
            </motion.button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-4 py-3 border-t border-emerald-500/20 bg-[#1a1a1a]">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-r from-emerald-400 to-teal-500 flex items-center justify-center text-white font-bold">
            A
          </div>
          {isOpen && (
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-emerald-400">
                Admin User
              </span>
              <span className="text-xs text-gray-400">
                admin@company.com
              </span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default Sidebar;