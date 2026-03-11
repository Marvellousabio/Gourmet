import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

interface BottomNavProps {
  foods: any[];
  currentIndex: number;
  onSelect: (index: number) => void;
  onPrev: () => void;
  onNext: () => void;
}

const BottomNav: React.FC<BottomNavProps> = ({ foods, currentIndex, onSelect, onPrev, onNext }) => {
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30 flex items-center gap-8">
      <button 
        onClick={onPrev}
        className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
      >
        <ChevronLeft size={24} />
      </button>

      <div className="flex gap-4 p-2 bg-white/40 backdrop-blur-md rounded-full border border-white/40 shadow-xl">
        {foods.map((food, index) => (
          <button
            key={food.id}
            onClick={() => onSelect(index)}
            className={cn(
              "relative w-16 h-16 rounded-full overflow-hidden transition-all duration-500",
              currentIndex === index ? "scale-110 ring-4 ring-white shadow-2xl" : "scale-90 opacity-50 hover:opacity-100"
            )}
          >
            <img 
              src={food.image} 
              alt={food.title} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
            {currentIndex === index && (
              <motion.div 
                layoutId="active-nav"
                className="absolute inset-0 bg-black/10"
              />
            )}
          </button>
        ))}
      </div>

      <button 
        onClick={onNext}
        className="w-12 h-12 flex items-center justify-center bg-white rounded-full shadow-lg hover:scale-110 active:scale-95 transition-all"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

export default BottomNav;
