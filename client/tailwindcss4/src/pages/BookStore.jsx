import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingCart, Heart, Star, ChevronRight, Home, Search, Sparkles } from 'lucide-react';
import Navbar from '../components/Navbar';

const books = [
  {
    id: 1,
    title: "The Art of Event Planning",
    author: "Sarah Johnson",
    price: 29.99,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=500&auto=format&fit=crop&q=60",
    description: "A comprehensive guide to planning successful events."
  },
  {
    id: 2,
    title: "Corporate Events Excellence",
    author: "Michael Smith",
    price: 34.99,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1589998059171-988d887df646?w=500&auto=format&fit=crop&q=60",
    description: "Master the art of corporate event management."
  },
  {
    id: 3,
    title: "Wedding Planning Made Simple",
    author: "Emily Brown",
    price: 24.99,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1541963463532-d68292c34b19?w=500&auto=format&fit=crop&q=60",
    description: "Your complete guide to planning the perfect wedding."
  },
  {
    id: 4,
    title: "Event Design & Decoration",
    author: "David Wilson",
    price: 39.99,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?w=500&auto=format&fit=crop&q=60",
    description: "Transform spaces with innovative event design concepts."
  }
];

const BookStore = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100
      }
    }
  };

  const addToCart = (bookId) => {
    setCart([...cart, bookId]);
  };

  const toggleFavorite = (bookId) => {
    if (favorites.includes(bookId)) {
      setFavorites(favorites.filter(id => id !== bookId));
    } else {
      setFavorites([...favorites, bookId]);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const displayedBooks = showAll ? filteredBooks : filteredBooks.slice(0, 3);

  return (
    <>
    
      <Navbar/>
    <section className="relative min-h-screen py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-gray-900 to-black">
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

      <div className="relative z-10 max-w-7xl mx-auto">

        {/* Header */}
        <div className="text-center mb-12">
          <span className="px-4 py-2 rounded-full bg-gradient-to-r from-emerald-500/10 to-teal-500/10 text-emerald-400 text-sm font-medium border border-emerald-500/20 inline-block mb-4">
            Our Collection
          </span>
          <motion.h1 
            className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
              Event Planning Books
            </span>
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-base sm:text-lg max-w-2xl mx-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Discover our curated collection of event planning resources
          </motion.p>
        </div>

        {/* Search Bar */}
        <div className="max-w-xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-emerald-400" size={20} />
            <input
              type="text"
              placeholder="Search books by title or author..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-black/40 backdrop-blur-sm border border-emerald-500/20 rounded-xl px-12 py-3 text-white placeholder-gray-500 focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all text-sm sm:text-base"
            />
          </div>
        </div>

        {/* Book Grid */}
        <AnimatePresence>
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {displayedBooks.map((book) => (
              <motion.div
                key={book.id}
                variants={itemVariants}
                className="group bg-black/40 backdrop-blur-sm rounded-2xl border border-emerald-500/20 overflow-hidden hover:border-emerald-500/40 transition-all duration-300"
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
              >
                <div className="relative aspect-[4/3]">
                  <img
                    src={book.image}
                    alt={book.title}
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
                  />
                  <button
                    onClick={() => toggleFavorite(book.id)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
                  >
                    <Heart
                      className={`w-4 h-4 ${
                        favorites.includes(book.id) ? "fill-red-500 text-red-500" : ""
                      }`}
                    />
                  </button>
                </div>
                
                <div className="p-6">
                  <div className="flex items-center justify-between text-sm text-gray-400 mb-2">
                    <span>{book.author}</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span>{book.rating}</span>
                    </div>
                  </div>
                  <h3 className="text-lg font-bold mb-2 text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                    {book.title}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4 line-clamp-2">{book.description}</p>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xl font-bold bg-gradient-to-r from-emerald-400 to-teal-400 text-transparent bg-clip-text">
                      ${book.price}
                    </span>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => addToCart(book.id)}
                      className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white text-sm font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-300 flex items-center gap-2"
                    >
                      <ShoppingCart className="w-4 h-4" />
                      Add to Cart
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>

        {/* View More Button */}
        {filteredBooks.length > 3 && (
          <div className="flex justify-center mt-12">
            <motion.button
              className="px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-semibold inline-flex items-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowAll(!showAll)}
            >
              <span>{showAll ? 'Show Less' : 'View All Books'}</span>
              <Sparkles className="w-5 h-5" />
            </motion.button>
          </div>
        )}

        {/* Cart Preview */}
        <AnimatePresence>
          {cart.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="fixed bottom-8 right-8 bg-black/80 backdrop-blur-sm rounded-xl border border-emerald-500/20 p-4 shadow-lg"
            >
              <div className="flex items-center gap-4">
                <div className="relative">
                  <ShoppingCart className="text-emerald-400 w-5 h-5" />
                  <span className="absolute -top-2 -right-2 bg-emerald-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                </div>
                <span className="text-white text-sm font-medium">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} in cart
                </span>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-4 py-2 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white text-sm font-medium hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
                >
                  Checkout
                </motion.button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
    </>
  );
};

export default BookStore;