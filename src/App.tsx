import { useState, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FoodSlider from './components/FoodSlider';
import MenuGrid from './components/MenuGrid';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import FullMenu from './components/FullMenu';
import BottomNav from './components/BottomNav';
import { useScrollSection } from './hooks/useScrollSection';
import { foods } from './data/foods';

function HomePage() {
  const { currentSection, isMenuMode, scrollToSection } = useScrollSection();
  const [currentFoodIndex, setCurrentFoodIndex] = useState(0);

  const nextSlide = useCallback(() => {
    setCurrentFoodIndex((prev) => (prev + 1) % foods.length);
  }, []);

  const prevSlide = useCallback(() => {
    setCurrentFoodIndex((prev) => (prev - 1 + foods.length) % foods.length);
  }, []);

  const handleFoodSelect = useCallback((index: number) => {
    setCurrentFoodIndex(index);
    // When selecting a food, ensure we're on home section
    scrollToSection('home');
  }, [scrollToSection]);
  
  return (
    <>
      <FoodSlider 
        hideBottomNav={true}
        currentFoodIndex={currentFoodIndex}
        onFoodSelect={handleFoodSelect}
      />
      <MenuGrid />
      <AboutSection />
      <ContactSection />
      <Footer />
      
      {/* Global BottomNav that changes based on scroll position */}
      <BottomNav 
        foods={foods}
        currentIndex={currentFoodIndex}
        onSelect={handleFoodSelect}
        onPrev={prevSlide}
        onNext={nextSlide}
        isMenuMode={isMenuMode}
        currentSection={currentSection}
        onNavigate={scrollToSection}
      />
    </>
  );
}

export default function App() {
  return (
    <Router>
      <div className="antialiased">
        <Routes>
          <Route path="/menu" element={
            <>
              <FullMenu />
            </>
          } />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </div>
    </Router>
  );
}
