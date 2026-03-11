import React from 'react';
import { motion } from 'motion/react';
import { Clock, Phone, Mail, MapPin, Facebook, Instagram, Twitter, Youtube } from 'lucide-react';

const Footer: React.FC = () => {
  const navigationLinks = [
    { name: 'Home', href: '#' },
    { name: 'Menu', href: '#menu' },
    { name: 'About', href: '#about' },
    { name: 'Contact', href: '#contact' },
  ];

  const businessHours = [
    { day: 'Monday - Thursday', time: '10:00 AM - 10:00 PM' },
    { day: 'Friday - Saturday', time: '10:00 AM - 11:00 PM' },
    { day: 'Sunday', time: '10:00 AM - 9:00 PM' },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: '#' },
    { name: 'Instagram', icon: Instagram, href: '#' },
    { name: 'Twitter', icon: Twitter, href: '#' },
    { name: 'Youtube', icon: Youtube, href: '#' },
  ];

  return (
    <footer className="bg-[#1A1A1A] text-white pt-16 sm:pt-20 lg:pt-24 pb-6">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 mb-12">
          {/* Brand Section */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            {/* Logo */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-[#FFB800] rounded-full flex items-center justify-center">
                <span className="text-white font-black text-lg">G</span>
              </div>
              <span className="text-xl font-black text-white">Gourmet</span>
            </div>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Experience the finest authentic cuisine crafted with passion and the freshest locally-sourced ingredients.
            </p>
            {/* Social Links */}
            <div className="flex items-center gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-[#FFB800] hover:text-white transition-all duration-300"
                  aria-label={social.name}
                >
                  <social.icon size={18} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Quick Links */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <h3 className="text-lg font-black mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {navigationLinks.map((link) => (
                <li key={link.name}>
                  <a
                    href={link.href}
                    className="text-white/60 hover:text-[#FFB800] transition-colors text-sm font-medium"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Business Hours */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-lg font-black mb-6">Business Hours</h3>
            <ul className="space-y-3">
              {businessHours.map((hours) => (
                <li key={hours.day} className="flex justify-between items-center text-sm">
                  <span className="text-white/60">{hours.day}</span>
                  <span className="text-white font-medium">{hours.time}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div 
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-lg font-black mb-6">Contact Us</h3>
            <div className="space-y-4">
              <a 
                href="tel:+15551234567" 
                className="flex items-center gap-3 text-white/60 hover:text-[#FFB800] transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#FFB800] transition-colors">
                  <Phone size={18} className="text-white" />
                </div>
                <span className="text-sm font-medium">+1 (555) 123-4567</span>
              </a>
              
              <a 
                href="mailto:hello@gourmetrestaurant.com" 
                className="flex items-center gap-3 text-white/60 hover:text-[#FFB800] transition-colors group"
              >
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-[#FFB800] transition-colors">
                  <Mail size={18} className="text-white" />
                </div>
                <span className="text-sm font-medium">hello@gourmetrestaurant.com</span>
              </a>
              
              <div className="flex items-start gap-3 text-white/60">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center flex-shrink-0">
                  <MapPin size={18} className="text-white" />
                </div>
                <span className="text-sm font-medium">
                  123 Gourmet Street<br />
                  Food City, FC 12345
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 pt-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-white/60 text-sm">
              © {new Date().getFullYear()} Gourmet Restaurant. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-white/60 hover:text-[#FFB800] transition-colors text-sm">
                Privacy Policy
              </a>
              <a href="#" className="text-white/60 hover:text-[#FFB800] transition-colors text-sm">
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
