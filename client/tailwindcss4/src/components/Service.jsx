import React, { useEffect, useState } from "react";
import { Package, Sparkles, Calendar, Users, Award, Clock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { NavLink } from "react-router";

const Services = () => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showAll, setShowAll] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch(
          "http://localhost:5000/api/v1/dashboard/service/get"
        );
        const data = await response.json();
        if (response.ok) {
          setServices(data.events);
        } else {
          console.error("Error fetching services:", data.message);
          setServices([
            {
              title: "Wedding Planning",
              description:
                "Create your dream wedding with our comprehensive planning services, from venue selection to day-of coordination.",
              image: "wedding",
            },
            {
              title: "Corporate Events",
              description:
                "Impress clients and motivate teams with professionally organized corporate events, conferences, and team-building activities.",
              image: "corporate",
            },
            {
              title: "Birthday Celebrations",
              description:
                "Make milestone birthdays unforgettable with custom themes, entertainment, and catering options for all ages.",
              image: "birthday",
            },
            {
              title: "Catering Services",
              description:
                "Delight your guests with gourmet cuisine tailored to your event theme and dietary requirements.",
              image: "catering",
            },
            {
              title: "Venue Selection",
              description:
                "Find the perfect location for your event with our venue sourcing and negotiation services.",
              image: "venue",
            },
            {
              title: "Event Coordination",
              description:
                "Relax and enjoy your event while our coordinators handle all the details and timing on the day.",
              image: "coordination",
            },
          ]);
        }
      } catch (error) {
        console.error("Error fetching services:", error);
        setServices([
          {
            title: "Wedding Planning",
            description:
              "Create your dream wedding with our comprehensive planning services, from venue selection to day-of coordination.",
            image: "wedding",
          },
          {
            title: "Corporate Events",
            description:
              "Impress clients and motivate teams with professionally organized corporate events, conferences, and team-building activities.",
            image: "corporate",
          },
          {
            title: "Birthday Celebrations",
            description:
              "Make milestone birthdays unforgettable with custom themes, entertainment, and catering options for all ages.",
            image: "birthday",
          },
          {
            title: "Catering Services",
            description:
              "Delight your guests with gourmet cuisine tailored to your event theme and dietary requirements.",
            image: "catering",
          },
          {
            title: "Venue Selection",
            description:
              "Find the perfect location for your event with our venue sourcing and negotiation services.",
            image: "venue",
          },
          {
            title: "Event Coordination",
            description:
              "Relax and enjoy your event while our coordinators handle all the details and timing on the day.",
            image: "coordination",
          },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchServices();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  };

  // Display only first 3 services if showAll is false
  const displayedServices = showAll ? services : services.slice(0, 3);

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Floating Elements */}
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
        className="relative z-10 max-w-7xl mx-auto"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 inline-block mb-4">
            What We Offer
          </span>
          <h2 className="text-4xl sm:text-5xl font-bold mb-6">
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
              Our Services
            </span>
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover our comprehensive range of event planning services designed
            to make your special occasions truly memorable.
          </p>
        </motion.div>

        {loading ? (
          <motion.div
            className="flex justify-center items-center py-20"
            variants={itemVariants}
          >
            <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </motion.div>
        ) : (
          <AnimatePresence>
            <motion.div
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
              variants={containerVariants}
            >
              {displayedServices.map((service, index) => (
                <motion.div
                  key={index}
                  className="group bg-gradient-to-br from-gray-900/90 via-gray-800/90 to-gray-900/90 backdrop-blur-xl rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300 shadow-lg hover:shadow-emerald-500/10"
                  variants={itemVariants}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <div className="p-8 relative overflow-hidden">
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center overflow-hidden group-hover:bg-emerald-500/20 transition-all duration-300">
                        <img src={service.image} className="w-full h-full object-cover filter invert p-2"/>
                      </div>

                      <h3 className="text-xl font-bold mt-6 mb-4">
                        <span className="bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
                          {service.title}
                        </span>
                      </h3>

                      <p className="text-gray-400 mb-6">{service.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          </AnimatePresence>
        )}

        <div className="flex flex-col gap-8 items-center mt-16">
          <NavLink to="/service">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-semibold inline-flex items-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span>View All Service</span>
              <Sparkles className="w-5 h-5" />
            </motion.button>
          </NavLink>
        </div>
      </motion.div>
    </section>
  );
};

export default Services;