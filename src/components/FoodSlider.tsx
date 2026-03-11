import React, { useState, useCallback, useEffect, useRef } from 'react';
import debounce from 'lodash.debounce';
import { foods } from '../data/foods';
import FoodPlate from './FoodPlate';
import FoodText from './FoodText';
import RatingCard from './RatingCard';
import BottomNav from './BottomNav';
import { Search, Menu } from 'lucide-react';

const FoodSlider: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
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
      <header className="fixed top-0 left-0 w-full p-10 flex justify-between items-center z-50">
        <div className="text-2xl font-black tracking-tighter">GOURMET.</div>
        <div className="flex items-center gap-8">
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <Search size={24} />
          </button>
          <button className="p-2 hover:bg-black/5 rounded-full transition-colors">
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* Background Decorative Text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <h2 className="text-[25vw] font-black text-black/[0.02] leading-none whitespace-nowrap">
          {currentFood.title.split(' ')[0]}
        </h2>
      </div>

      {/* Main Content */}
      <div className="relative w-full h-full flex items-center px-10 md:px-20">
        <FoodPlate image={currentFood.image} title={currentFood.title} />
        <FoodText title={currentFood.title} subtitle={currentFood.subtitle} />
        <RatingCard 
          rating={currentFood.rating} 
          chef={currentFood.chef} 
          description={currentFood.description} 
        />
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
      <div className="fixed right-10 bottom-10 z-30 flex flex-col items-center gap-4">
        <div className="h-32 w-px bg-black/10 relative">
          <div 
            className="absolute top-0 left-0 w-full bg-[#1A1A1A] transition-all duration-500"
            style={{ height: `${((currentIndex + 1) / foods.length) * 100}%` }}
          />
        </div>
        <span className="text-xs font-bold tracking-widest text-black/40">
          0{currentIndex + 1} / 0{foods.length}
        </span>
      </div>
    </main>
  );
};

export default FoodSlider;
