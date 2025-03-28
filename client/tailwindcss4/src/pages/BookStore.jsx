import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingCart, Heart, Star, ChevronRight, Home, Search } from 'lucide-react';

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

  const addToCart = (book) => {
    setCart([...cart, book]);
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

  return (
    <section className="relative min-h-screen py-20 px-4 sm:px-6 lg:px-8 bg-gray-900">
      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <motion.div
          className="absolute top-20 right-20 w-96 h-96 rounded-full bg-emerald-500/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -50, 0],
            y: [0, 40, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
        <motion.div
          className="absolute bottom-50 left-20 w-96 h-96 rounded-full bg-teal-500/20 blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 50, 0],
            y: [0, -40, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            repeatType: "reverse"
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Breadcrumb */}
        <nav className="mb-8">
          <ol className="flex items-center space-x-2 text-sm">
            <li className="flex items-center">
              <a href="/" className="text-emerald-400 hover:text-emerald-300 flex items-center gap-1 transition-colors">
                <Home size={16} />
                <span>Home</span>
              </a>
            </li>
            <li className="flex items-center text-emerald-400">
              <ChevronRight size={16} />
            </li>
            <li className="text-emerald-200">Book Store</li>
          </ol>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <motion.h1 
            className="text-4xl sm:text-5xl font-bold mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <span className="bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 text-transparent bg-clip-text">
              Event Planning Books
            </span>
          </motion.h1>
          <motion.p 
            className="text-gray-400 text-lg max-w-2xl mx-auto"
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
              className="w-full bg-black/40 border border-emerald-500/20 rounded-xl px-12 py-4 text-white placeholder-gray-500 focus:border-emerald-500/40 focus:ring-2 focus:ring-emerald-500/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Book Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredBooks.map((book) => (
            <motion.div
              key={book.id}
              variants={itemVariants}
              className="bg-black/40 backdrop-blur-sm rounded-2xl border border-emerald-500/20 overflow-hidden hover:border-emerald-500/40 transition-all duration-300"
            >
              <div className="relative">
                <img
                  src={book.image}
                  alt={book.title}
                  className="w-full h-48 object-cover"
                />
                <button
                  onClick={() => toggleFavorite(book.id)}
                  className="absolute top-4 right-4 p-2 rounded-full bg-black/40 text-white hover:bg-black/60 transition-colors"
                >
                  <Heart
                    className={`w-5 h-5 ${
                      favorites.includes(book.id) ? "fill-red-500 text-red-500" : ""
                    }`}
                  />
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">{book.title}</h3>
                <p className="text-gray-400 mb-2">{book.author}</p>
                <p className="text-sm text-gray-500 mb-4">{book.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <Star className="w-5 h-5 text-yellow-400 fill-yellow-400" />
                    <span className="text-gray-400 ml-1">{book.rating}</span>
                  </div>
                  <span className="text-2xl font-bold text-emerald-400">${book.price}</span>
                </div>
                
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  onClick={() => addToCart(book)}
                  className="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-xl text-white font-semibold flex items-center justify-center gap-2 hover:from-emerald-600 hover:to-teal-600 transition-all duration-300"
                >
                  <ShoppingCart className="w-5 h-5" />
                  Add to Cart
                </motion.button>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Cart Preview */}
        {cart.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-8 right-8 bg-black/80 backdrop-blur-sm rounded-2xl border border-emerald-500/20 p-4"
          >
            <div className="flex items-center gap-3">
              <ShoppingCart className="text-emerald-400" />
              <span className="text-white">
                {cart.length} {cart.length === 1 ? 'item' : 'items'} in cart
              </span>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-4 py-2 bg-emerald-500 rounded-xl text-white text-sm font-semibold hover:bg-emerald-600 transition-colors"
              >
                Checkout
              </motion.button>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default BookStore;