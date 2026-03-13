import { useState, useEffect } from 'react';

interface Section {
  id: string;
  name: string;
}

const sections: Section[] = [
  { id: 'home', name: 'Home' },
  { id: 'menu', name: 'Menu' },
  { id: 'about', name: 'About' },
  { id: 'contact', name: 'Contact' },
];

export function useScrollSection() {
  const [currentSection, setCurrentSection] = useState<string>('home');
  const [isMenuMode, setIsMenuMode] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 2;

      // Find which section is currently in view
      for (const section of sections) {
        const element = document.getElementById(section.id);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setCurrentSection(section.id);
            // Switch to menu mode when past the home section
            setIsMenuMode(section.id !== 'home');
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Check initial position

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(sectionId);
      setIsMenuMode(sectionId !== 'home');
    }
  };

  return { currentSection, isMenuMode, scrollToSection, sections };
}
