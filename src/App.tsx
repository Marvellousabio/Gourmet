import FoodSlider from './components/FoodSlider';
import MenuGrid from './components/MenuGrid';
import AboutSection from './components/AboutSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="antialiased">
      <FoodSlider />
      <MenuGrid />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
