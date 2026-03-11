import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Play, ShoppingBag } from 'lucide-react';

interface FoodTextProps {
  title: string;
  subtitle: string;
}

const FoodText: React.FC<FoodTextProps> = ({ title, subtitle }) => {
  return (
    <div className="ml-[400px] md:ml-[550px] lg:ml-[650px] z-10 max-w-2xl">
      <AnimatePresence mode="wait">
        <motion.div
          key={title}
          initial={{ y: 40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -40, opacity: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <motion.span 
            className="text-sm uppercase tracking-[0.2em] font-semibold text-black/40 mb-4 block"
          >
            {subtitle}
          </motion.span>
          
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black text-[#1A1A1A] leading-[0.9] tracking-tighter mb-10">
            {title.split(' ').map((word, i) => (
              <span key={i} className="block">{word}</span>
            ))}
          </h1>

          <div className="flex items-center gap-6">
            <button className="group flex items-center gap-3 px-6 py-3 bg-[#1A1A1A] text-white rounded-full font-bold transition-all hover:scale-105 active:scale-95">
              <ShoppingBag size={20} className="transition-transform group-hover:-rotate-12" />
              <span>Order Food</span>
            </button>
            
            <button className="group flex items-center gap-3 px-6 py-3 border-2 border-[#1A1A1A]/10 rounded-full font-bold transition-all hover:bg-[#1A1A1A]/5 active:scale-95">
              <div className="w-8 h-8 flex items-center justify-center bg-[#1A1A1A] text-white rounded-full">
                <Play size={14} fill="currentColor" />
              </div>
              <span>Play Video</span>
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FoodText;
