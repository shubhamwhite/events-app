import React, { useState } from "react";
import { ChevronDown, HelpCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const FAQ = () => {
  const faqData = [
    {
      question: "What services do you offer?",
      answer:
        "We provide comprehensive event planning services including elegant weddings, corporate gatherings, concerts & festivals, birthday celebrations, and premium catering services. Each event is tailored to your specific requirements with meticulous attention to detail.",
    },
    {
      question: "How much does an event cost?",
      answer:
        "Event costs vary based on several factors including the type of event, number of guests, venue selection, catering options, and customizations. We offer packages starting from $2,000 for intimate gatherings to comprehensive solutions for large-scale events. Contact us for a personalized quote tailored to your specific requirements.",
    },
    {
      question: "Do you offer catering services?",
      answer:
        "Yes, we provide exceptional multi-cuisine catering options with customizable menus crafted by professional chefs. Our culinary team can accommodate dietary restrictions, cultural preferences, and theme-based food presentations. We source fresh, local ingredients and offer tasting sessions before your event to ensure complete satisfaction.",
    },
    {
      question: "Can I book an event online?",
      answer:
        "Yes, you can easily book your event through our online booking system. Simply fill out our detailed booking form with your event requirements, or contact our event specialists directly for personalized assistance. We'll respond within 24 hours to discuss your vision and begin the planning process.",
    },
    {
      question: "What is your cancellation policy?",
      answer:
        "We understand that plans can change. Cancellations made 30+ days before the event receive a full refund minus a small administrative fee. Cancellations within 7-29 days receive a 50% refund. Unfortunately, cancellations made within 7 days of the event may be subject to full charges as we've already committed to vendors and resources. We recommend reviewing our complete terms and conditions for specific details.",
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
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
    

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-50 right-20 w-72 h-72 rounded-full bg-emerald-500/20 blur-3xl"
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
          className="text-center mb-16"
          variants={itemVariants}
        >
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 inline-block mb-4">
            Common Questions
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
              Frequently Asked Questions
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Find answers to common questions about our services, pricing, and event planning process.
          </p>
        </motion.div>

        <motion.div
          className="space-y-4 "
          variants={containerVariants}
        >
          {faqData.map((faq, index) => (
            <motion.div
              key={index}
              className="bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 "
              variants={itemVariants}
            >
              <motion.button
                className="w-full text-left p-6 flex justify-between items-center hover:cursor-pointer"
                onClick={() => toggleFAQ(index)}
                whileHover={{ backgroundColor: "rgba(16, 185, 129, 0.05)" }}
                transition={{ duration: 0.2 }}
              >
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/10 flex items-center justify-center mr-4 text-emerald-400">
                    <HelpCircle className="w-5 h-5" />
                  </div>
                  <span className="text-lg text-emerald-400 font-medium">{faq.question}</span>
                </div>
                <motion.div
                  animate={{ rotate: openIndex === index ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="w-8 h-8 rounded-xl bg-emerald-500/10 flex items-center justify-center text-emerald-400"
                >
                  <ChevronDown className="w-5 h-5" />
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
                    <div className="p-6 pt-2 border-t border-emerald-500/20">
                      <p className="text-gray-400">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="mt-16 text-center"
          variants={itemVariants}
        >
          <motion.button
            className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-semibold inline-flex items-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>Still Have Questions?</span>
            <HelpCircle className="w-5 h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default FAQ;