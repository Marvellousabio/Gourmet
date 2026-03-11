import React, { useState, useCallback, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { foods } from '../data/foods';
import FoodPlate from './FoodPlate';
import FoodText from './FoodText';
import RatingCard from './RatingCard';
import BottomNav from './BottomNav';
import { Search, Menu, X } from 'lucide-react';

const FoodSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isScrolling = useRef(false);

  const nextSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev + 1) % foods.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentIndex((prev) => (prev - 1 + foods.length) % foods.length);
  }, []);

  const handleWheel = useCallback(
    debounce((e: React.WheelEvent) => {
      if (Math.abs(e.deltaY) < 30) return;
      
      if (e.deltaY > 0) {
        nextSlide();
      } else {
        prevSlide();
      }
    }, 100, { leading: true, trailing: false }),
    [nextSlide, prevSlide]
  );

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown') nextSlide();
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') prevSlide();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [nextSlide, prevSlide]);

  const currentFood = foods[currentIndex];

  return (
    <main 
      onWheel={handleWheel}
      className="relative w-full h-screen overflow-hidden bg-[#E5E5E5] flex items-center font-sans selection:bg-[#1A1A1A] selection:text-white"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-4 sm:p-6 md:p-8 lg:p-10 flex justify-between items-center z-50">
        <div className="text-xl sm:text-2xl font-black tracking-tighter">GOURMET.</div>
        <div className="flex items-center gap-4 sm:gap-6 md:gap-8">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <Search size={20} sm:size={24} />
          </button>
          <button 
            onClick={() => setIsMenuOpen(true)}
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <Menu size={20} sm:size={24} />
          </button>
        </div>
      </header>

      {/* Background Decorative Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h2 className="text-[20vw] sm:text-[25vw] font-black text-black/[0.02] leading-none whitespace-nowrap">
          {currentFood.title.split(' ')[0]}
        </h2>
      </div>

      {/* Main Content - Responsive Flex Layout */}
      <div className="relative w-full h-full flex flex-col md:flex-row items-center justify-center md:justify-start md:items-center px-4 sm:px-6 md:px-10 lg:px-20 pt-20 md:pt-0 gap-6 md:gap-8 lg:gap-12">
        <FoodPlate image={currentFood.image} title={currentFood.title} />
        <div className="flex flex-col md:flex-row items-start md:items-center gap-6 lg:gap-10 w-full md:w-auto">
          <FoodText title={currentFood.title} subtitle={currentFood.subtitle} onPlayVideo={() => setIsVideoOpen(true)} />
          <RatingCard 
            rating={currentFood.rating} 
            chef={currentFood.chef} 
            description={currentFood.description} 
          />
        </div>
      </div>

      {/* Navigation */}
      <BottomNav 
        foods={foods} 
        currentIndex={currentIndex} 
        onSelect={setCurrentIndex}
        onPrev={prevSlide}
        onNext={nextSlide}
      />

      {/* Progress Indicator */}
      <div className="fixed right-4 sm:right-6 md:right-8 lg:right-10 bottom-4 sm:bottom-6 md:bottom-8 lg:bottom-10 z-30 flex flex-col items-center gap-3 sm:gap-4">
        <div className="h-24 sm:h-28 md:h-32 w-px bg-black/10 relative">
          <div 
            className="absolute top-0 left-0 w-full bg-[#1A1A1A] transition-all duration-500"
            style={{ height: `${((currentIndex + 1) / foods.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-bold tracking-widest text-black/40">
          0{currentIndex + 1} / 0{foods.length}
        </span>
      </div>

      {/* Video Modal */}
      {isVideoOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-sm"
          onClick={() => setIsVideoOpen(false)}
        >
          <button 
            className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-colors z-10"
            onClick={() => setIsVideoOpen(false)}
          >
            <X size={24} className="text-white" />
          </button>
          <div 
            className="w-full max-w-3xl aspect-video mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1&mute=1"
              title="Video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="rounded-2xl"
            />
          </div>
        </div>
      )}

      {/* Search Modal */}
      {isSearchOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-start justify-center pt-20 sm:pt-32 bg-black/60 backdrop-blur-sm"
          onClick={() => setIsSearchOpen(false)}
        >
          <div 
            className="w-full max-w-2xl mx-4"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-white rounded-3xl p-4 sm:p-6 shadow-2xl">
              <div className="flex items-center gap-4">
                <Search size={20} className="text-black/40" />
                <input
                  type="text"
                  placeholder="Search for dishes, chefs, or categories..."
                  className="flex-1 text-lg outline-none placeholder:text-black/40"
                  autoFocus
                />
                <button 
                  onClick={() => setIsSearchOpen(false)}
                  className="p-2 hover:bg-black/5 rounded-full transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <div className="mt-4 pt-4 border-t border-black/10">
                <p className="text-xs text-black/40 uppercase tracking-wider mb-2">Popular Searches</p>
                <div className="flex flex-wrap gap-2">
                  {['Lotek Perkedel', 'Lamb Steak', 'Martabak', 'Soto Ayam', 'Urap Asli'].map((term) => (
                    <button key={term} className="px-3 py-1.5 bg-[#E5E5E5] rounded-full text-sm font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors">
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Menu Modal */}
      {isMenuOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-end bg-black/60 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        >
          <div 
            className="w-full max-w-sm h-full bg-white shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex justify-between items-center border-b border-black/10">
              <span className="text-xl font-black tracking-tighter">GOURMET.</span>
              <button 
                onClick={() => setIsMenuOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            <nav className="p-6">
              <ul className="space-y-4">
                {[
                  { name: 'Home', href: '#' },
                  { name: 'Menu', href: '#menu' },
                  { name: 'About Us', href: '#about' },
                  { name: 'Reservations', href: '#contact' },
                  { name: 'Contact', href: '#contact' },
                ].map((item) => (
                  <li key={item.name}>
                    <a 
                      href={item.href}
                      className="block text-lg font-bold text-[#1A1A1A] py-2 hover:text-[#FFB800] transition-colors"
                      onClick={() => setIsMenuOpen(false)}
                    >
                      {item.name}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
            <div className="absolute bottom-6 left-6 right-6">
              <button className="w-full py-4 bg-[#1A1A1A] text-white rounded-full font-bold">
                Order Now
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
};

export default FoodSlider;
