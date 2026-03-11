import React from 'react';
import { motion } from 'motion/react';
import { Clock, MapPin, Phone, Mail } from 'lucide-react';

const AboutSection: React.FC = () => {
  return (
    <section id="about" className="relative py-16 sm:py-20 lg:py-24 overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80"
          alt="Restaurant interior"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#1A1A1A]/80" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-[#FFB800] uppercase tracking-[0.2em] font-bold text-sm mb-4 block">
              About Us
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-white leading-tight mb-6">
              Experience the Taste of Authentic Cuisine
            </h2>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8">
              At Gourmet, we believe that food is more than just sustenance – it's an experience that brings people together. 
              Our chefs combine traditional recipes with modern techniques to create dishes that are both familiar and exciting.
            </p>
            <p className="text-white/70 text-sm sm:text-base leading-relaxed mb-8">
              Every dish we serve is prepared with the freshest locally-sourced ingredients, ensuring that you get the 
              authentic taste that keeps our customers coming back for more.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#FFB800]">15+</div>
                <div className="text-white/60 text-xs sm:text-sm">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#FFB800]">50+</div>
                <div className="text-white/60 text-xs sm:text-sm">Menu Items</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl lg:text-4xl font-black text-[#FFB800]">10k+</div>
                <div className="text-white/60 text-xs sm:text-sm">Happy Customers</div>
              </div>
            </div>
          </motion.div>

          {/* Right Content - Info Cards */}
          <motion.div 
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4"
          >
            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFB800] rounded-full flex items-center justify-center flex-shrink-0">
                <MapPin size={20} className="text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Location</h4>
                <p className="text-white/60 text-sm">123 Gourmet Street, Food City, FC 12345</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFB800] rounded-full flex items-center justify-center flex-shrink-0">
                <Clock size={20} className="text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Opening Hours</h4>
                <p className="text-white/60 text-sm">Mon - Sun: 10:00 AM - 11:00 PM</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFB800] rounded-full flex items-center justify-center flex-shrink-0">
                <Phone size={20} className="text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Phone</h4>
                <p className="text-white/60 text-sm">+1 (555) 123-4567</p>
              </div>
            </div>

            <div className="bg-white/10 backdrop-blur-lg rounded-3xl p-6 flex items-start gap-4">
              <div className="w-12 h-12 bg-[#FFB800] rounded-full flex items-center justify-center flex-shrink-0">
                <Mail size={20} className="text-white" />
              </div>
              <div>
                <h4 className="text-white font-bold mb-1">Email</h4>
                <p className="text-white/60 text-sm">hello@gourmetrestaurant.com</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
