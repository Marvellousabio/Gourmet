import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, User } from 'lucide-react';

interface RatingCardProps {
  rating: number;
  chef: string;
  description: string;
}

const RatingCard: React.FC<RatingCardProps> = ({ rating, chef, description }) => {
  return (
    <div className="absolute right-10 lg:right-20 top-1/2 -translate-y-1/2 z-20">
      <AnimatePresence mode="wait">
        <motion.div
          key={chef}
          initial={{ x: 50, opacity: 0, scale: 0.9 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ x: 50, opacity: 0, scale: 0.9 }}
          transition={{
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="w-80 backdrop-blur-xl bg-white/40 border border-white/40 rounded-[2.5rem] shadow-2xl p-8"
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="text-4xl font-black text-[#1A1A1A]">{rating}</span>
                <div className="flex flex-col">
                  <div className="flex text-[#FFB800]">
                    {[...Array(5)].map((_, i) => (
                      <Star 
                        key={i} 
                        size={14} 
                        fill={i < Math.floor(rating) ? "currentColor" : "none"} 
                        strokeWidth={2}
                      />
                    ))}
                  </div>
                  <span className="text-[10px] uppercase font-bold text-black/40 tracking-wider">Rating</span>
                </div>
              </div>
              <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center shadow-inner">
                <Star size={24} className="text-[#FFB800]" fill="currentColor" />
              </div>
            </div>

            <div className="h-px bg-black/5 w-full" />

            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#1A1A1A] rounded-full flex items-center justify-center text-white">
                  <User size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-[#1A1A1A]">{chef}</h4>
                  <p className="text-xs text-black/40 font-medium">Master Chef</p>
                </div>
              </div>
              
              <p className="text-sm text-black/60 leading-relaxed font-medium">
                "{description}"
              </p>
            </div>

            <button className="w-full py-4 bg-white/80 hover:bg-white rounded-2xl text-sm font-bold text-[#1A1A1A] transition-colors shadow-sm">
              View Ingredients
            </button>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default RatingCard;
