import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const faqData = [
    {
      question: "What services do you offer?",
      answer:
        "We provide comprehensive event planning services including weddings, corporate events, concerts, birthdays, and catering. Each event is tailored to your specific needs with attention to detail.",
    },
    {
      question: "How much does an event cost?",
      answer:
        "Event costs vary based on type, guests, venue, and customizations. Packages start from $2,000 for intimate gatherings. Contact us for a personalized quote.",
    },
    {
      question: "Do you offer catering services?",
      answer:
        "Yes, we provide multi-cuisine catering with customizable menus. We accommodate dietary restrictions and offer tasting sessions before your event.",
    },
    {
      question: "Can I book an event online?",
      answer:
        "Yes, book through our online form or contact our specialists directly. We'll respond within 24 hours to discuss your event.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "30+ days: full refund minus admin fee. 7-29 days: 50% refund. Under 7 days: may be subject to full charges. See terms for details.",
    },
  ];

  const [openIndex, setOpenIndex] = useState(null);

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index);
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

  const contentVariants = {
    hidden: { height: 0, opacity: 0 },
    visible: { 
      height: "auto", 
      opacity: 1,
      transition: { 
        height: {
          type: "spring",
          stiffness: 500,
          damping: 30
        },
        opacity: { duration: 0.2, delay: 0.1 }
      }
    },
    exit: {
      height: 0,
      opacity: 0,
      transition: {
        height: { duration: 0.2 },
        opacity: { duration: 0.1 }
      }
    }
  };

  return (
    <section className="relative min-h-[50%] py-12 sm:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-50 right-20 w-48 sm:w-72 h-48 sm:h-72 rounded-full bg-emerald-500/20 blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, -40, 0],
            y: [0, 30, 0]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="text-center mb-10 sm:mb-16"
          variants={itemVariants}
        >
          <span className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 text-xs sm:text-sm font-medium border border-emerald-500/20 inline-block mb-3 sm:mb-4">
            Common Questions
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Find answers to common questions about our services.
          </p>
        </motion.div>

        <motion.div
          className="space-y-3 sm:space-y-4"
          variants={containerVariants}
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-xl sm:rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10"
              variants={itemVariants}
            >
              <motion.button
                className="w-full text-left p-4 sm:p-6 flex justify-between items-center hover:cursor-pointer group"
                onClick={() => toggleFAQ(index)}
                whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg sm:rounded-xl bg-emerald-500/10 flex items-center justify-center mr-3 sm:mr-4 text-emerald-400 group-hover:bg-emerald-500/20 transition-all duration-300">
                    <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
                  </div>
                  <span className="text-base sm:text-lg text-emerald-400 font-medium">{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400 group-hover:bg-emerald-500/20 transition-all duration-300"
                >
                  <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5" />
                </motion.div>
              </motion.button>

              <AnimatePresence>
                {openIndex === index && (
                  <motion.div
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    variants={contentVariants}
                    className="overflow-hidden"
                  >
                    <div className="p-4 sm:p-6 pt-2 border-t border-emerald-500/20">
                      <p className="text-sm sm:text-base text-gray-400">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-10 sm:mt-16 text-center"
          variants={itemVariants}
        >
          <motion.button
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg sm:rounded-xl text-white text-sm sm:text-base font-semibold inline-flex items-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Still Have Questions?</span>
            <HelpCircle className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FAQ;