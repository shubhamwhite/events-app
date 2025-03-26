import React, { useEffect, useState } from "react";
import { Package, Sparkles, Calendar, Users, Award, Clock, Home, ChevronRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const Service = () => {
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
              image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            },
            {
              title: "Corporate Events",
              description:
                "Impress clients and motivate teams with professionally organized corporate events, conferences, and team-building activities.",
              image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
            },
            {
              title: "Birthday Celebrations",
              description:
                "Make milestone birthdays unforgettable with custom themes, entertainment, and catering options for all ages.",
              image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            },
            {
              title: "Catering Services",
              description:
                "Delight your guests with gourmet cuisine tailored to your event theme and dietary requirements.",
              image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
            },
            {
              title: "Venue Selection",
              description:
                "Find the perfect location for your event with our venue sourcing and negotiation services.",
              image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1112&q=80",
            },
            {
              title: "Event Coordination",
              description:
                "Relax and enjoy your event while our coordinators handle all the details and timing on the day.",
              image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
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
            image: "https://images.unsplash.com/photo-1519741497674-611481863552?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
          },
          {
            title: "Corporate Events",
            description:
              "Impress clients and motivate teams with professionally organized corporate events, conferences, and team-building activities.",
            image: "https://images.unsplash.com/photo-1511578314322-379afb476865?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80",
          },
          {
            title: "Birthday Celebrations",
            description:
              "Make milestone birthdays unforgettable with custom themes, entertainment, and catering options for all ages.",
            image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
          },
          {
            title: "Catering Services",
            description:
              "Delight your guests with gourmet cuisine tailored to your event theme and dietary requirements.",
            image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
          },
          {
            title: "Venue Selection",
            description:
              "Find the perfect location for your event with our venue sourcing and negotiation services.",
            image: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&auto=format&fit=crop&w=1112&q=80",
          },
          {
            title: "Event Coordination",
            description:
              "Relax and enjoy your event while our coordinators handle all the details and timing on the day.",
            image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80",
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

  const displayedServices = showAll ? services : services.slice(0, 3);

 return (
     <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-gray-900 to-black">
       
 
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

       <nav className="mb-8">
          <motion.ol 
            className="flex items-center space-x-2 text-sm"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <li className="flex items-center">
              <a href="/" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
                <Home size={16} />
                <span>Home</span>
              </a>
            </li>
            <li className="flex items-center text-emerald-400">
              <ChevronRight size={16} />
            </li>
            <li className="text-emerald-200">Our Services</li>
          </motion.ol>
        </nav>

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
                   className="group bg-black/40 backdrop-blur-sm rounded-2xl overflow-hidden border border-emerald-500/20 hover:border-emerald-500/40 transition-all duration-300"
                   variants={itemVariants}
                   whileHover={{ y: -8, transition: { duration: 0.3 } }}
                   initial={{ opacity: 0, y: 20 }}
                   animate={{ opacity: 1, y: 0 }}
                   exit={{ opacity: 0, y: -20 }}
                   transition={{ duration: 0.3, delay: index * 0.1 }}
                 >
                   <div className="p-8">
                     <div className="w-12 h-12 rounded-xl bg-emerald-500/10 flex items-center justify-center overflow-hidden group-hover:bg-emerald-500/20 transition-all duration-300">
                      <img src= {service.image} className="w-full h-full object-cover filter invert p-2"/>
                     </div>
 
                     <h3 className="text-xl font-bold mt-6 mb-4">
                       <span className="bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
                         {service.title}
                       </span>
                     </h3>
 
                     <p className="text-gray-400 mb-6">{service.description}</p>
 
                   
                   </div>
                 </motion.div>
               ))}
             </motion.div>
           </AnimatePresence>
         )}
 
         <div className="flex flex-col gap-8 items-center mt-16">
           {services.length > 3 && (
             <motion.button
               className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-semibold inline-flex items-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 hover:cursor-pointer"
               whileHover={{ scale: 1.05 }}
               whileTap={{ scale: 0.95 }}
               onClick={() => setShowAll(!showAll)}
               variants={itemVariants}
             >
               <span>{showAll ? 'Show Less' : 'View All Services'}</span>
               <Sparkles className="w-5 h-5" />
             </motion.button>
           )}
 
          
         </div>
       </motion.div>
     </section>
   );
};

export default Service;