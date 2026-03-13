import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import debounce from 'lodash.debounce';
import { foods } from '../data/foods';
import FoodPlate from './FoodPlate';
import FoodText from './FoodText';
import RatingCard from './RatingCard';
import BottomNav from './BottomNav';
import { Search, Menu, X, ShoppingBag, Plus, Minus, Trash2 } from 'lucide-react';

interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  image: string;
}

interface FoodSliderProps {
  hideBottomNav?: boolean;
  onNavigateHome?: () => void;
  currentFoodIndex?: number;
  onFoodSelect?: (index: number) => void;
}

const FoodSlider: React.FC<FoodSliderProps> = ({ 
  hideBottomNav = false, 
  onNavigateHome,
  currentFoodIndex,
  onFoodSelect
}) => {
  const [currentIndex, setCurrentIndex] = useState(currentFoodIndex ?? 0);

  // Sync with parent component's food index
  useEffect(() => {
    if (currentFoodIndex !== undefined) {
      setCurrentIndex(currentFoodIndex);
    }
  }, [currentFoodIndex]);

  const [isVideoOpen, setIsVideoOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOrderOpen, setIsOrderOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [cart, setCart] = useState<CartItem[]>([]);
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

  const addToCart = (food: typeof foods[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === food.id);
      if (existing) {
        return prev.map(item =>
          item.id === food.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: food.id, title: food.title, price: 12.99, quantity: 1, image: food.image }];
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id));
  };

  const updateQuantity = (id: number, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.quantity + delta;
        return newQty > 0 ? { ...item, quantity: newQty } : item;
      }
      return item;
    }));
  };

  const clearCart = () => setCart([]);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  const filteredFoods = useMemo(() => {
    if (!searchQuery.trim()) return foods;
    const query = searchQuery.toLowerCase();
    return foods.filter(food =>
      food.title.toLowerCase().includes(query) ||
      food.chef.toLowerCase().includes(query) ||
      food.description.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const currentFood = foods[currentIndex];

  return (
    <main 
      id="home"
      onWheel={handleWheel}
      className="relative w-full min-h-screen bg-[#E5E5E5] flex items-center font-sans selection:bg-[#1A1A1A] selection:text-white"
    >
      {/* Header */}
      <header className="fixed top-0 left-0 w-full p-4 sm:p-6 md:p-8 lg:p-10 flex justify-between items-center z-50">
        <div className="text-xl sm:text-2xl font-black tracking-tighter">GOURMET.</div>
        <div className="flex items-center gap-2 sm:gap-4 md:gap-6">
          <button 
            onClick={() => setIsSearchOpen(true)}
            className="p-2 hover:bg-black/5 rounded-full transition-colors"
          >
            <Search size={20} sm:size={24} />
          </button>
          <button 
            onClick={() => setIsOrderOpen(true)}
            className="p-2 hover:bg-black/5 rounded-full transition-colors relative"
          >
            <ShoppingBag size={20} sm:size={24} />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-[#FFB800] text-white text-xs font-bold rounded-full flex items-center justify-center">
                {cartCount}
              </span>
            )}
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

      {/* Navigation - conditionally rendered based on prop */}
      {!hideBottomNav && (
        <BottomNav 
          foods={foods} 
          currentIndex={currentIndex} 
          onSelect={setCurrentIndex}
          onPrev={prevSlide}
          onNext={nextSlide}
        />
      )}

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

      {/* Search Panel - On-page extending to right */}
      {isSearchOpen && (
        <div className="fixed inset-0 z-[100] flex">
          {/* Backdrop */}
          <div 
            className="flex-1 bg-black/40 backdrop-blur-sm"
            onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
          />
          {/* Search Panel */}
          <div className="w-full max-w-md md:max-w-lg lg:max-w-xl h-full bg-white shadow-2xl overflow-hidden flex flex-col">
            <div className="p-4 sm:p-6 flex items-center gap-4 border-b border-black/10">
              <Search size={20} className="text-black/40" />
              <input
                type="text"
                placeholder="Search for dishes, chefs..."
                className="flex-1 text-lg outline-none placeholder:text-black/40"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                autoFocus
              />
              <button 
                onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={20} />
              </button>
            </div>
            {/* Search Results */}
            <div className="flex-1 overflow-y-auto p-4">
              {searchQuery.trim() ? (
                <div>
                  <p className="text-xs text-black/40 uppercase tracking-wider mb-3">
                    Search Results ({filteredFoods.length})
                  </p>
                  <div className="space-y-3">
                    {filteredFoods.map((food) => (
                      <button
                        key={food.id}
                        onClick={() => {
                          const idx = foods.findIndex(f => f.id === food.id);
                          if (idx !== -1) setCurrentIndex(idx);
                          setIsSearchOpen(false);
                          setSearchQuery('');
                        }}
                        className="w-full flex items-center gap-3 p-3 rounded-2xl hover:bg-[#E5E5E5] transition-colors text-left"
                      >
                        <img
                          src={food.image}
                          alt={food.title}
                          className="w-14 h-14 object-cover rounded-xl"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-[#1A1A1A] text-sm truncate">{food.title}</h4>
                          <p className="text-xs text-black/50 truncate">{food.chef}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  {filteredFoods.length === 0 && (
                    <p className="text-center text-black/40 py-8">No dishes found</p>
                  )}
                </div>
              ) : (
                <div>
                  <p className="text-xs text-black/40 uppercase tracking-wider mb-2">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {['Lotek Perkedel', 'Lamb Steak', 'Martabak', 'Soto Ayam', 'Urap Asli'].map((term) => (
                      <button
                        key={term}
                        onClick={() => setSearchQuery(term)}
                        className="px-3 py-1.5 bg-[#E5E5E5] rounded-full text-sm font-medium hover:bg-[#1A1A1A] hover:text-white transition-colors"
                      >
                        {term}
                      </button>
                    ))}
                  </div>
                </div>
              )}
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
               <div className="md:mt-10 bottom-6 left-6 right-6">
              <button 
                onClick={() => { setIsMenuOpen(false); setIsOrderOpen(true); }}
                className="w-full py-4 bg-[#1A1A1A] text-white rounded-full font-bold"
              >
                Order Now
              </button>
            </div>
            </nav>
           
          </div>
        </div>
      )}

      {/* Order Sidebar (Cart) */}
      {isOrderOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-center justify-end bg-black/60 backdrop-blur-sm"
          onClick={() => setIsOrderOpen(false)}
        >
          <div 
            className="w-full max-w-sm h-full bg-white shadow-2xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 flex justify-between items-center border-b border-black/10">
              <span className="text-xl font-black tracking-tighter">YOUR ORDER</span>
              <button 
                onClick={() => setIsOrderOpen(false)}
                className="p-2 hover:bg-black/5 rounded-full transition-colors"
              >
                <X size={24} />
              </button>
            </div>
            
            {/* Cart Items */}
            <div className="flex-1 overflow-y-auto p-4">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag size={48} className="text-black/20 mb-4" />
                  <p className="text-black/40 font-medium">Your cart is empty</p>
                  <p className="text-black/30 text-sm">Add some delicious dishes!</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex items-center gap-3 p-3 bg-[#E5E5E5] rounded-2xl">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-16 h-16 object-cover rounded-xl"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-bold text-[#1A1A1A] text-sm truncate">{item.title}</h4>
                        <p className="text-[#FFB800] font-bold text-sm">${item.price.toFixed(2)}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button
                            onClick={() => updateQuantity(item.id, -1)}
                            className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-200"
                          >
                            <Minus size={12} />
                          </button>
                          <span className="font-bold text-sm w-6 text-center">{item.quantity}</span>
                          <button
                            onClick={() => updateQuantity(item.id, 1)}
                            className="w-6 h-6 bg-white rounded-full flex items-center justify-center hover:bg-gray-200"
                          >
                            <Plus size={12} />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <Trash2 size={18} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Cart Footer */}
            {cart.length > 0 && (
              <div className="p-6 border-t border-black/10 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="font-bold text-black/60">Total</span>
                  <span className="text-2xl font-black text-[#1A1A1A]">${cartTotal.toFixed(2)}</span>
                </div>
                <button className="w-full py-4 bg-[#FFB800] text-white rounded-full font-bold hover:scale-[1.02] active:scale-[0.98] transition-transform">
                  Checkout
                </button>
                <button 
                  onClick={clearCart}
                  className="w-full py-3 text-red-500 font-bold text-sm hover:underline"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </main>
  );
};

export default FoodSlider;
