import React, { useState } from 'react';
import { ShoppingBag, Heart, Search, User, Menu, X, Sparkles, PhoneCall } from 'lucide-react';
import type { CartItem } from '../data';

interface NavbarProps {
  cartItems: CartItem[];
  wishlistCount: number;
  onOpenCart: () => void;
  onOpenWishlist: () => void;
  onOpenAuthModal: () => void;
  userLoggedIn: boolean;
  userName: string;
  selectedCategory: string;
  onSelectCategory: (cat: string) => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartItems,
  wishlistCount,
  onOpenCart,
  onOpenWishlist,
  onOpenAuthModal,
  userLoggedIn,
  userName,
  selectedCategory,
  onSelectCategory,
  searchQuery,
  onSearchChange
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const totalCartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const categories = [
    { id: 'all', label: '🌸 Shop All' },
    { id: 'business-kits', label: '✨ Business Kits' },
    { id: 'order-books', label: '📖 Order Books' },
    { id: 'labels', label: '🏷️ Name Labels ₹149' },
    { id: 'journals', label: '🪄 Theme Journals' },
    { id: 'trackers', label: '📊 Profit Trackers' },
    { id: 'stickers', label: '🎀 Stickers' },
  ];

  return (
    <header className="sticky top-0 z-40 w-full transition-all">
      {/* Aesthetic Top Announcement Bar */}
      <div className="bg-gradient-to-r from-sky-400 via-blue-300 to-sky-400 text-white text-xs md:text-sm font-medium py-2 px-4 text-center shadow-xs flex items-center justify-center gap-2">
        <Sparkles className="w-3.5 h-3.5 animate-pulse text-amber-200" />
        <span>☁️ <b>FREE SHIPPING</b> on all orders above ₹499 | Customized Business Kits @ ₹499 Only!</span>
        <span className="hidden md:inline bg-white/20 px-2 py-0.5 rounded-full text-[11px] font-bold">LIMITED TIME</span>
      </div>

      {/* Main Navigation Header */}
      <div className="glass-panel border-b border-sky-100 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
          
          {/* Mobile menu trigger */}
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-700 hover:text-sky-600 p-1"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Brand Logo */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => onSelectCategory('all')}>
            <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-sky-400 to-blue-400 flex items-center justify-center text-white font-bold text-xl shadow-md ring-2 ring-sky-200">
              A
            </div>
            <div>
              <h1 className="text-xl md:text-2xl font-bold font-serif-aesthetic tracking-tight text-sky-950 leading-none">
                The Abbie Store
              </h1>
              <span className="text-[10px] text-sky-600 font-semibold tracking-wider uppercase block mt-0.5">
                Customized Aesthetic Stationery
              </span>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-6 relative">
            <input
              type="text"
              placeholder="Search Business Kits, Order Books, Harry Potter Journals..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-sky-50/60 border border-sky-200 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-sky-400 focus:bg-white transition-all"
            />
            <Search className="w-4 h-4 text-sky-400 absolute left-3.5 top-3" />
            {searchQuery && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-600"
              >
                Clear
              </button>
            )}
          </div>

          {/* Right Action Icons */}
          <div className="flex items-center gap-2 sm:gap-4">
            
            {/* Quick WhatsApp Support Direct Icon */}
            <a 
              href="https://wa.me/919876543210?text=Hi%20The%20Abbie%20Store!%20I%20have%20an%20inquiry%20about%20your%20customized%20kits."
              target="_blank"
              rel="noreferrer"
              className="hidden lg:flex items-center gap-1.5 bg-emerald-50 text-emerald-700 px-3 py-1.5 rounded-full text-xs font-semibold border border-emerald-200 hover:bg-emerald-100 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5 text-emerald-600" />
              <span>WhatsApp Help</span>
            </a>

            {/* Wishlist Icon */}
            <button 
              onClick={onOpenWishlist}
              className="relative p-2 text-gray-700 hover:text-sky-600 rounded-full hover:bg-sky-50 transition-colors"
              title="Wishlist"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute top-0 right-0 w-4 h-4 bg-sky-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center ring-2 ring-white">
                  {wishlistCount}
                </span>
              )}
            </button>

            {/* Cart Drawer Toggle */}
            <button 
              onClick={onOpenCart}
              className="relative p-2 text-sky-800 hover:text-sky-950 bg-sky-100/70 hover:bg-sky-200/80 rounded-full transition-all flex items-center gap-1 px-3 shadow-xs"
            >
              <ShoppingBag className="w-5 h-5 text-sky-600" />
              <span className="hidden sm:inline text-xs font-bold text-sky-900">Cart</span>
              {totalCartCount > 0 && (
                <span className="w-5 h-5 bg-sky-600 text-white rounded-full text-xs font-bold flex items-center justify-center shadow-xs">
                  {totalCartCount}
                </span>
              )}
            </button>

            {/* User Profile / Mock Login Button */}
            <button
              onClick={onOpenAuthModal}
              className="flex items-center gap-2 pl-2 pr-3 py-1.5 border border-sky-200 rounded-full hover:border-sky-400 bg-white text-xs font-semibold text-gray-700 shadow-2xs transition-all"
            >
              <div className="w-6 h-6 rounded-full bg-sky-100 text-sky-600 flex items-center justify-center font-bold">
                {userLoggedIn ? userName.charAt(0).toUpperCase() : <User className="w-3.5 h-3.5" />}
              </div>
              <span className="hidden sm:inline">
                {userLoggedIn ? userName.split(' ')[0] : 'Mock Login'}
              </span>
            </button>

          </div>
        </div>

        {/* Category Pills Navigation Bar */}
        <div className="border-t border-sky-100/70 bg-white/70 backdrop-blur-sm overflow-x-auto no-scrollbar py-2.5 px-4">
          <div className="max-w-7xl mx-auto flex items-center gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-200 flex items-center gap-1.5 ${
                  selectedCategory === cat.id
                    ? 'bg-gradient-to-r from-sky-500 to-blue-500 text-white shadow-md shadow-sky-200 scale-105'
                    : 'bg-sky-50/50 text-gray-700 hover:bg-sky-100 hover:text-sky-800 border border-sky-100'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Mobile Drawer Navigation */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-pink-200 p-4 space-y-3">
          <div className="relative">
            <input
              type="text"
              placeholder="Search items..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full pl-9 pr-4 py-2 bg-pink-50 border border-pink-200 rounded-full text-sm"
            />
            <Search className="w-4 h-4 text-pink-400 absolute left-3 top-3" />
          </div>
          
          <div className="grid grid-cols-2 gap-2 pt-2">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => {
                  onSelectCategory(cat.id);
                  setMobileMenuOpen(false);
                }}
                className={`px-3 py-2 rounded-xl text-left text-xs font-semibold ${
                  selectedCategory === cat.id
                    ? 'bg-pink-500 text-white'
                    : 'bg-pink-50 text-gray-700'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};
