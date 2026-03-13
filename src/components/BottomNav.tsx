import React from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight, Home, Utensils, Users, Mail, ArrowLeft } from 'lucide-react';
import { cn } from '../lib/utils';

interface BottomNavProps {
  foods?: any[];
  currentIndex?: number;
  onSelect?: (index: number) => void;
  onPrev?: () => void;
  onNext?: () => void;
  isMenuMode?: boolean;
  currentSection?: string;
  onNavigate?: (section: string) => void;
}

interface NavItem {
  id: string;
  name: string;
  icon: React.ReactNode;
}

const navItems: NavItem[] = [
  { id: 'home', name: 'Home', icon: <Home size={18} /> },
  { id: 'menu', name: 'Menu', icon: <Utensils size={18} /> },
  { id: 'about', name: 'About', icon: <Users size={18} /> },
  { id: 'contact', name: 'Contact', icon: <Mail size={18} /> },
];

const BottomNav: React.FC<BottomNavProps> = ({ 
  foods, 
  currentIndex = 0, 
  onSelect, 
  onPrev, 
  onNext,
  isMenuMode = false,
  currentSection = 'home',
  onNavigate
}) => {
  // Food navigation mode (original behavior)
  if (!isMenuMode && foods && foods.length > 0) {
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
              onClick={() => onSelect?.(index)}
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
  }

  // Menu navigation mode (when scrolled past home section)
  return (
    <div className="fixed bottom-10 left-1/2 -translate-x-1/2 z-30">
      <motion.div 
        initial={{ y: 100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center gap-2 sm:gap-3 p-2 bg-white/80 backdrop-blur-md rounded-full border border-white/40 shadow-xl"
      >
        {/* Back to Home button */}
        <button
          onClick={() => onNavigate?.('home')}
          className={cn(
            "w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center rounded-full transition-all",
            currentSection === 'home' 
              ? "bg-[#1A1A1A] text-white" 
              : "bg-white text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white shadow-md"
          )}
        >
          <ArrowLeft size={18} />
        </button>

        {/* Divider */}
        <div className="w-px h-8 bg-black/10" />

        {/* Navigation Items */}
        {navItems.slice(1).map((item) => (
          <button
            key={item.id}
            onClick={() => onNavigate?.(item.id)}
            className={cn(
              "flex items-center gap-1.5 sm:gap-2 px-3 sm:px-4 py-2 rounded-full transition-all duration-300",
              currentSection === item.id
                ? "bg-[#FFB800] text-white shadow-lg"
                : "bg-white/50 text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white"
            )}
          >
            <span className="hidden sm:inline">{item.icon}</span>
            <span className="text-xs sm:text-sm font-bold">{item.name}</span>
          </button>
        ))}
      </motion.div>
    </div>
  );
};

export default BottomNav;
