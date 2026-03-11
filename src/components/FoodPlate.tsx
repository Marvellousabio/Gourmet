import React from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface FoodPlateProps {
  image: string;
  title: string;
}

const FoodPlate: React.FC<FoodPlateProps> = ({ image, title }) => {
  return (
    <div className="absolute left-10 lg:left-20 z-20 pointer-events-none">
      <AnimatePresence mode="wait">
        <motion.div
          key={title}
          initial={{ x: 300, opacity: 0, rotate: 45, scale: 0.8 }}
          animate={{ x: 0, opacity: 1, rotate: 0, scale: 1 }}
          exit={{ x: -300, opacity: 0, rotate: -45, scale: 0.8 }}
          transition={{
            duration: 0.8,
            ease: [0.22, 1, 0.36, 1],
          }}
          className="relative"
        >
          {/* Shadow effect */}
          <div className="absolute inset-0 bg-black/10 blur-3xl rounded-full transform translate-y-10 scale-90" />
          
          <img
            src={image}
            alt={title}
            className="w-[300px] md:w-[450px] lg:w-[550px] h-auto object-contain drop-shadow-2xl rounded-full"
            referrerPolicy="no-referrer"
          />
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default FoodPlate;
