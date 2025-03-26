import React, { useState, useEffect } from "react";
import { X } from "lucide-react";

const OfferNavbar = () => {
  const offers = [
    {
      id: 1,
      title: "🔥 50% Off on Wedding Planning",
      description: "Limited time offer on premium wedding packages! Valid until end of month.",
      price: "$999",
      originalPrice: "$1,999",
    },
    {
      id: 2,
      title: "🎉 Special Corporate Package",
      description: "Book now and get complimentary catering services for your corporate event!",
      price: "$2,499",
      originalPrice: "$3,499",
    },
    {
      id: 3,
      title: "💰 Early Bird Discount",
      description: "20% off on all birthday celebration packages booked 2 months in advance!",
      price: "$799",
      originalPrice: "$999",
    },
  ];

  const [currentOfferIndex, setCurrentOfferIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentOfferIndex((prevIndex) => (prevIndex + 1) % offers.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  if (!isVisible) return null;

  const currentOffer = offers[currentOfferIndex];

  return (
    <div className="relative z-50 w-full bg-gradient-to-r from-emerald-600 to-teal-600 p-2 text-white flex justify-center items-center text-sm sm:text-base">
      <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-4 max-w-7xl mx-auto px-4">
        <span className="text-sm font-semibold whitespace-nowrap">{currentOffer.title}</span>
        <span className="text-sm hidden sm:inline text-emerald-100">{currentOffer.description}</span>
        <span className="text-sm font-bold whitespace-nowrap">
          {currentOffer.price} <span className="line-through text-emerald-200/70">{currentOffer.originalPrice}</span>
        </span>
      </div>
      <button
        onClick={() => setIsVisible(false)}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 p-1 text-white hover:text-gray-300 hover:cursor-pointer"
      >
        <X size={18} />
      </button>
    </div>
  );
};

export default OfferNavbar;
