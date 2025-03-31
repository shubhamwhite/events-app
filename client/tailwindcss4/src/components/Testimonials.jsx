import React, { useEffect, useState } from "react";
import { Star, Quote } from "lucide-react";
import { motion } from "framer-motion";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTestimonials = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/v1/dashboard/testimonials/get");
        const data = await response.json();
        if (response.ok) {
          setTestimonials(data.testimonials);
        } else {
          console.error("Error fetching testimonials:", data.message);
          setTestimonials([
            {
              title: "Exceptional Service",
              description: "The team went above and beyond to make our corporate event a huge success. Every detail was perfectly executed.",
              image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
              rating: 5,
              reviewer: "John Doe",
              position: "CEO, TechCorp"
            },
            {
              title: "Creative Solutions",
              description: "They transformed our vision into reality with creative solutions and impeccable attention to detail.",
              image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
              rating: 5,
              reviewer: "Sarah Smith",
              position: "Marketing Director, BrandX"
            },
            {
              title: "Flawless Execution",
              description: "From planning to execution, everything was flawless. Our wedding day was exactly how we dreamed it would be.",
              image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
              rating: 4,
              reviewer: "Michael Johnson",
              position: "Happy Client"
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials([
          {
            title: "Exceptional Service",
            description: "The team went above and beyond to make our corporate event a huge success. Every detail was perfectly executed.",
            image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
            rating: 5,
            reviewer: "John Doe",
            position: "CEO, TechCorp"
          },
          {
            title: "Creative Solutions",
            description: "They transformed our vision into reality with creative solutions and impeccable attention to detail.",
            image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
            rating: 5,
            reviewer: "Sarah Smith",
            position: "Marketing Director, BrandX"
          },
          {
            title: "Flawless Execution",
            description: "From planning to execution, everything was flawless. Our wedding day was exactly how we dreamed it would be.",
            image: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=774&q=80",
            rating: 4,
            reviewer: "Michael Johnson",
            position: "Happy Client"
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchTestimonials();
  }, []);

  const renderStars = (rating) => {
    return Array(5).fill(0).map((_, index) => (
      <Star 
        key={index} 
        size={16} 
        className={`${index < rating ? "text-emerald-500 fill-emerald-500" : "text-gray-300"}`} 
      />
    ));
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
    <section className="relative min-h-[50%] py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-50 right-20 w-60 sm:w-72 h-60 sm:h-72 rounded-full bg-emerald-500/20 blur-3xl"
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
        className="relative z-10 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div
          className="text-center mb-10 sm:mb-16"
          variants={itemVariants}
        >
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 text-xs sm:text-sm font-medium border border-emerald-500/20 inline-block mb-4">
            Client Stories
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
              What Our Clients Say
            </span>
          </h2>
          <p className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto">
            Discover why our clients trust us with their most important events and celebrations.
          </p>
        </motion.div>

        {loading ? (
          <motion.div
            className="flex justify-center items-center py-12 sm:py-20"
            variants={itemVariants}
          >
            <div className="w-12 sm:w-16 h-12 sm:h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        ) : (
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8"
            variants={containerVariants}
          >
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                className="group bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10"
                variants={itemVariants}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="p-6 sm:p-8 relative">
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  
                  <div className="relative z-10">
                    <div className="flex items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                      <div className="relative">
                        <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-full overflow-hidden border-2 border-emerald-500/20">
                          <img
                            src={testimonial.image}
                            alt={testimonial.reviewer}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                          />
                        </div>
                        <motion.div 
                          className="absolute -bottom-1 -right-1 w-5 sm:w-6 h-5 sm:h-6 rounded-full bg-emerald-500 flex items-center justify-center text-white"
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          transition={{ delay: 0.5 + index * 0.2, type: "spring" }}
                        >
                          <Quote size={10} className="sm:w-3 sm:h-3" />
                        </motion.div>
                      </div>
                      <div>
                        <h3 className="text-base sm:text-lg font-bold text-emerald-400">{testimonial.reviewer}</h3>
                        <p className="text-xs sm:text-sm text-gray-400">{testimonial.position}</p>
                      </div>
                    </div>
                    
                    <p className="text-sm sm:text-base text-gray-400 mb-4 sm:mb-6">{testimonial.description}</p>
                    
                    <div className="flex items-center gap-1">
                      {renderStars(testimonial.rating)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
        
        <motion.div
          className="mt-10 sm:mt-16 text-center"
          variants={itemVariants}
        >
          <motion.button
            className="px-6 sm:px-8 py-3 sm:py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-semibold inline-flex items-center gap-2 text-sm sm:text-base hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:cursor-pointer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>View All Testimonials</span>
            <Quote className="w-4 h-4 sm:w-5 sm:h-5" />
          </motion.button>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Testimonials;