import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Clock, Users } from 'lucide-react';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Reservation submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-24 bg-[#E5E5E5]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div 
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <span className="text-[#FFB800] uppercase tracking-[0.2em] font-bold text-sm mb-4 block">
            Reservations
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-[#1A1A1A] tracking-tight mb-4">
            Book a Table
          </h2>
          <p className="text-black/60 text-sm sm:text-base max-w-xl mx-auto">
            Reserve your spot for an unforgettable dining experience. We'll confirm your booking shortly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 max-w-6xl mx-auto">
          {/* Reservation Form */}
          <motion.div 
            initial={{ x: -30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl"
          >
            <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                    required
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 000-0000"
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Number of Guests</label>
                  <select
                    name="guests"
                    value={formData.guests}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                  >
                    {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Date</label>
                  <input
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Time</label>
                  <select
                    value={formData.time}
                    onChange={handleChange}
                    name="time"
                    className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#1A1A1A] focus:outline-none transition-colors"
                    required
                  >
                    <option value="">Select time</option>
                    {['10:00', '11:00', '12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00', '21:00'].map(time => (
                      <option key={time} value={time}>{time}:00</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-[#1A1A1A] mb-2">Special Requests</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Any special requests or dietary requirements?"
                  rows={4}
                  className="w-full px-4 py-3 rounded-xl border border-black/10 focus:border-[#1A1A1A] focus:outline-none transition-colors resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-4 bg-[#1A1A1A] text-white rounded-xl font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform"
              >
                Confirm Reservation
              </button>
            </form>
          </motion.div>

          {/* Info Cards */}
          <motion.div 
            initial={{ x: 30, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="space-y-4 sm:space-y-6"
          >
            {/* Quick Reservation Card */}
            <div className="bg-[#1A1A1A] rounded-3xl p-6 sm:p-8 text-white">
              <h3 className="text-xl sm:text-2xl font-black mb-6">Quick Reservation</h3>
              
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Calendar size={18} />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Easy online booking</p>
                    <p className="font-bold text-sm">Instant confirmation</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Clock size={18} />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Open daily</p>
                    <p className="font-bold text-sm">10:00 AM - 11:00 PM</p>
                  </div>
                </div>
                
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center">
                    <Users size={18} />
                  </div>
                  <div>
                    <p className="text-white/60 text-xs">Group bookings</p>
                    <p className="font-bold text-sm">Up to 20 guests</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 shadow-xl">
              <h3 className="text-xl sm:text-2xl font-black text-[#1A1A1A] mb-6">Contact Us Directly</h3>
              <div className="space-y-4">
                <a 
                  href="tel:+15551234567" 
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#FFB800]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#FFB800] font-bold">📞</span>
                  </div>
                  <div>
                    <p className="text-black/60 text-xs">Call us</p>
                    <p className="font-bold text-[#1A1A1A]">+1 (555) 123-4567</p>
                  </div>
                </a>
                
                <a 
                  href="mailto:hello@gourmetrestaurant.com" 
                  className="flex items-center gap-4 p-3 rounded-xl hover:bg-gray-50 transition-colors"
                >
                  <div className="w-10 h-10 bg-[#FFB800]/10 rounded-full flex items-center justify-center">
                    <span className="text-[#FFB800] font-bold">✉️</span>
                  </div>
                  <div>
                    <p className="text-black/60 text-xs">Email us</p>
                    <p className="font-bold text-[#1A1A1A]">hello@gourmetrestaurant.com</p>
                  </div>
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
