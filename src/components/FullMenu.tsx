import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Star, Plus, Minus, ArrowLeft, Search } from 'lucide-react';
import { foods } from '../data/foods';
import { useNavigate } from 'react-router-dom';

// Extended menu items (more dishes)
const extendedFoods = [
  ...foods,
  {
    id: 6,
    title: "NASI GORENG SPECIAL",
    subtitle: "#6 Most loved dish",
    rating: 4.8,
    chef: "Chef Mbah",
    image: "https://images.unsplash.com/photo-1512058564366-18510be2db19?auto=format&fit=crop&w=800&q=80",
    description: "Traditional fried rice with shrimp paste. A classic Indonesian breakfast favorite."
  },
  {
    id: 7,
    title: "SATE AYAM MADURA",
    subtitle: "#7 Most loved dish",
    rating: 4.7,
    chef: "Chef Rahmat",
    image: "https://images.unsplash.com/photo-1529563021893-cc83c992d75d?auto=format&fit=crop&w=800&q=80",
    description: "Chicken satay with peanut sauce. Tender grilled chicken with rich peanut glaze."
  },
  {
    id: 8,
    title: "RENDANG DAGING",
    subtitle: "#8 Most loved dish",
    rating: 4.9,
    chef: "Chef Padang",
    image: "https://images.unsplash.com/photo-1601050690597-df0568f70950?auto=format&fit=crop&w=800&q=80",
    description: "Slow-cooked beef in coconut milk. A spicy Indonesian curry masterpiece."
  },
  {
    id: 9,
    title: "AYAM BETUTU",
    subtitle: "#9 Most loved dish",
    rating: 4.6,
    chef: "Chef Bali",
    image: "https://images.unsplash.com/photo-1599487488170-d11ec9c172f0?auto=format&fit=crop&w=800&q=80",
    description: "Balinese roasted chicken. Aromatic herbs and spices slow-roasted to perfection."
  },
  {
    id: 10,
    title: "GADO GADO",
    subtitle: "#10 Most loved dish",
    rating: 4.5,
    chef: "Chef Jakarta",
    image: "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80",
    description: "Mixed vegetables with peanut sauce. Fresh salad with creamy peanut dressing."
  },
  {
    id: 11,
    title: "MI GORENG",
    subtitle: "#11 Most loved dish",
    rating: 4.4,
    chef: "Chef Street",
    image: "https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=800&q=80",
    description: "Fried noodles with vegetables. Quick and delicious street food favorite."
  },
  {
    id: 12,
    title: "BABI GULUNG",
    subtitle: "#12 Most loved dish",
    rating: 4.8,
    chef: "Chef Bali",
    image: "https://images.unsplash.com/photo-1519708227418-c8fd9a32b7a2?auto=format&fit=crop&w=800&q=80",
    description: "Balinese grilled pork. Crispy skin with succulent seasoned meat."
  },
  {
    id: 13,
    title: "TEMPEH GORENG",
    subtitle: "#13 Most loved dish",
    rating: 4.3,
    chef: "Chef Healthy",
    image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?auto=format&fit=crop&w=800&q=80",
    description: "Crispy fermented soybean cake. A healthy and delicious protein option."
  },
  {
    id: 14,
    title: "KUPAT TAHU",
    subtitle: "#14 Most loved dish",
    rating: 4.5,
    chef: "Chef Bandung",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=800&q=80",
    description: "Tofu with rice cakes and peanut sauce. A refreshing Sundanese delight."
  },
  {
    id: 15,
    title: "RAWON",
    subtitle: "#15 Most loved dish",
    rating: 4.7,
    chef: "Chef Surabaya",
    image: "https://images.unsplash.com/photo-1547592166-23ac45744acd?auto=format&fit=crop&w=800&q=80",
    description: "Black beef soup with ferns. A rich and hearty East Javanese specialty."
  }
];

const FullMenu: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [quantities, setQuantities] = useState<Record<number, number>>({});

  const filteredFoods = searchQuery.trim()
    ? extendedFoods.filter(food =>
        food.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.chef.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : extendedFoods;

  const getQuantity = (id: number) => quantities[id] || 0;

  const updateQuantity = (id: number, delta: number) => {
    setQuantities(prev => {
      const current = prev[id] || 0;
      const newQty = Math.max(0, current + delta);
      return { ...prev, [id]: newQty };
    });
  };

  return (
    <div className="min-h-screen bg-[#E5E5E5] ">
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-4 sm:p-6  bg-white shadow-md z-50 ">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate(-1)}
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <ArrowLeft size={24} />
          </button>
          <h1 className="text-xl sm:text-2xl font-black tracking-tighter">FULL MENU</h1>
        </div>
        {/* Search Bar */}
      
        <div className="max-w-xl mx-auto">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-black/40" />
            <input
              type="text"
              placeholder="Search dishes or chefs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white rounded-2xl shadow-lg outline-none placeholder:text-black/40"
            />
          </div>
        </div>
      
      </header>

      

      {/* Menu Grid */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pb-16 mt-40">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
          {filteredFoods.map((food, index) => (
            <motion.div
              key={food.id}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
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

        {filteredFoods.length === 0 && (
          <div className="text-center py-16">
            <p className="text-black/40 text-lg">No dishes found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FullMenu;
