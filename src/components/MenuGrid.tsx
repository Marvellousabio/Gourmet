import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, ShoppingBag, Plus, Minus } from 'lucide-react';
import { foods } from '../data/foods';
import { useNavigate } from 'react-router-dom';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

const MenuGrid: React.FC = () => {
  const navigate = useNavigate();
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const getQuantity = (id: number) => quantities[id] || 0;

  const updateQuantity = (id: number, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const newQty = Math.max(0, current + delta);
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <section id="menu" className="py-16 sm:py-20 lg:py-24 bg-[#E5E5E5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight mb-4">
            Our Menu
          </h2>
          <p className="text-black/60 text-sm sm:text-base max-w-xl mx-auto">
            Discover our delicious selection of authentic dishes, crafted with love by our master chefs
          </p>
        </motion.div>

        {/* Menu Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {foods.map((food, index) => (
            <motion.div
              key={food.id}
              initial={{ y: 30, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
            >
              {/* Image */}
              <div className="relative aspect-square overflow-hidden bg-gray-100">
                <img
                  src={food.image}
                  alt={food.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                {/* Rating Badge */}
                <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1">
                  <Star size={12} className="text-[#FFB800]" fill="currentColor" />
                  <span className="text-xs font-bold">{food.rating}</span>
                </div>
              </div>

              {/* Content */}
              <div className="p-3 sm:p-4">
                <h3 className="font-black text-[#1A1A1A] text-sm sm:text-base leading-tight mb-1 truncate">
                  {food.title}
                </h3>
                <p className="text-xs text-black/50 font-medium mb-2 truncate">
                  {food.chef}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xs sm:text-sm font-bold text-[#1A1A1A]">
                    $12.99
                  </span>
                  {getQuantity(food.id) > 0 ? (
                    <div className="flex items-center gap-1 bg-[#1A1A1A] rounded-full">
                      <button 
                        onClick={() => updateQuantity(food.id, -1)}
                        className="w-6 h-6 sm:w-7 sm:h-7 bg-[#1A1A1A] text-white rounded-full flex items-center justify-center hover:bg-black/80"
                      >
                        <Minus size={12} sm:size={14} />
                      </button>
                      <span className="text-white text-xs sm:text-sm font-bold w-4 sm:w-5 text-center">
                        {getQuantity(food.id)}
                      </span>
                      <button 
                        onClick={() => updateQuantity(food.id, 1)}
                        className="w-6 h-6 sm:w-7 sm:h-7 bg-[#FFB800] text-white rounded-full flex items-center justify-center hover:bg-[#e5a800]"
                      >
                        <Plus size={12} sm:size={14} />
                      </button>
                    </div>
                  ) : (
                    <button 
                      onClick={() => updateQuantity(food.id, 1)}
                      className="px-3 py-1.5 sm:px-4 sm:py-2 bg-[#1A1A1A] text-white text-xs sm:text-sm font-bold rounded-full hover:scale-105 transition-transform"
                    >
                      Order Now
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* View More Button */}
        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-center mt-12"
        >
          <button 
            onClick={() => navigate('/menu')}
            className="px-8 py-3 bg-[#1A1A1A] text-white rounded-full font-bold hover:scale-105 active:scale-95 transition-transform"
          >
            View Full Menu
          </button>
        </motion.div>
      </div>
    </section>
  );
};

export default MenuGrid;
