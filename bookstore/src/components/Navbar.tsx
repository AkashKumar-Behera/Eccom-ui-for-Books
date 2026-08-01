'use client';

import React, { useEffect, useRef, useState } from 'react';
import { useCart } from '@/context/CartContext';
import { 
  ShoppingBag, 
  Heart, 
  Search, 
  Menu, 
  X, 
  ChevronDown
} from 'lucide-react';
import gsap from 'gsap';

export const Navbar: React.FC = () => {
  const { totalItemsCount, setIsCartOpen, wishlist } = useCart();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 30) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -100, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power3.out' }
      );
    }
  }, []);

  return (
    <header
      ref={navRef}
      className={`sticky top-0 z-40 transition-all duration-300 backdrop-blur-md bg-white ${
        isScrolled
          ? 'border-b border-slate-200 shadow-sm py-2 sm:py-3'
          : 'border-b border-slate-100 py-3 sm:py-4'
      }`}
    >
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 flex items-center justify-between">
        
        {/* Logo */}
        <div className="flex items-center gap-2 sm:gap-3 cursor-pointer group">
          <div className="relative w-9 h-9 sm:w-11 sm:h-11 rounded-xl sm:rounded-2xl overflow-hidden bg-slate-50 border border-slate-200 p-0.5 sm:p-1 group-hover:scale-105 transition-transform duration-300 shadow-xs flex-shrink-0">
            <img
              src="/model-1/logo.png"
              alt="The Abbie Store Logo"
              className="w-full h-full object-contain"
            />
          </div>
          <div>
            <span className="text-base sm:text-2xl font-serif font-bold tracking-tight text-[#0c4a6e] flex items-center gap-1.5">
              The Abbie <span className="text-[#0284c7] font-sans text-[10px] sm:text-xs font-bold px-1.5 sm:px-2.5 py-0.5 rounded-full bg-slate-50 border border-slate-200">STORE</span>
            </span>
            <p className="text-[8px] sm:text-[10px] text-[#0284c7] tracking-wider uppercase font-bold">Pastel Stationery & Goods</p>
          </div>
        </div>

        {/* Desktop Nav Links */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="#hero" className="text-sm text-[#0c4a6e] hover:text-[#0284c7] font-bold transition-colors">
            Home
          </a>
          <div className="relative group py-2">
            <button className="text-sm text-[#0c4a6e] hover:text-[#0284c7] font-bold transition-colors flex items-center gap-1">
              Categories <ChevronDown className="w-3.5 h-3.5 group-hover:rotate-180 transition-transform" />
            </button>
            <div className="absolute left-0 top-full hidden group-hover:block w-60 bg-white border border-slate-200 rounded-2xl p-2 shadow-xl backdrop-blur-xl">
              <a href="#catalog" className="block px-3 py-2 text-xs font-semibold text-[#0c4a6e] hover:text-[#0284c7] hover:bg-slate-50 rounded-xl">
                Spiral & Hardcover Journals
              </a>
              <a href="#catalog" className="block px-3 py-2 text-xs font-semibold text-[#0c4a6e] hover:text-[#0284c7] hover:bg-slate-50 rounded-xl">
                Pastel Gel Pens & Highlighters
              </a>
              <a href="#catalog" className="block px-3 py-2 text-xs font-semibold text-[#0c4a6e] hover:text-[#0284c7] hover:bg-slate-50 rounded-xl">
                2026 Daily Planners
              </a>
              <a href="#catalog" className="block px-3 py-2 text-xs font-semibold text-[#0c4a6e] hover:text-[#0284c7] hover:bg-slate-50 rounded-xl">
                Kawaii Washi Tapes & Stickers
              </a>
            </div>
          </div>
          <a href="#bestsellers" className="text-sm text-[#0c4a6e] hover:text-[#0284c7] font-bold transition-colors">
            Popular
          </a>
          <a href="#craftsmanship" className="text-sm text-[#0c4a6e] hover:text-[#0284c7] font-bold transition-colors">
            Craftsmanship
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          <button
            aria-label="Search"
            className="p-1.5 sm:p-2.5 text-[#0c4a6e] hover:text-[#0284c7] hover:bg-slate-50 rounded-xl transition-all border border-slate-200 bg-white"
          >
            <Search className="w-4 h-4" />
          </button>

          <button
            aria-label="Wishlist"
            className="relative p-1.5 sm:p-2.5 text-[#0c4a6e] hover:text-rose-600 hover:bg-slate-50 rounded-xl transition-all border border-slate-200 bg-white"
          >
            <Heart className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute top-1 right-1 w-2 h-2 bg-rose-500 rounded-full animate-ping" />
            )}
          </button>

          {/* Primary Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="relative flex items-center gap-1.5 sm:gap-2 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold px-3 sm:px-4 py-1.5 sm:py-2.5 rounded-xl shadow-sm transition-all duration-300 active:scale-95"
          >
            <ShoppingBag className="w-4 h-4" />
            <span className="text-xs sm:text-sm">Bag</span>
            {totalItemsCount > 0 && (
              <span className="bg-[#38bdf8] text-white text-[10px] sm:text-xs font-bold w-4 h-4 sm:w-5 sm:h-5 rounded-full flex items-center justify-center">
                {totalItemsCount}
              </span>
            )}
          </button>

          {/* Mobile menu trigger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-1.5 text-[#0c4a6e]"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

      </div>

      {/* Mobile Dropdown */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-slate-200 px-4 py-3 flex flex-col gap-2 animate-in fade-in slide-in-from-top-2">
          <a href="#hero" onClick={() => setMobileMenuOpen(false)} className="text-[#0c4a6e] hover:text-[#0284c7] font-semibold py-1.5 text-sm border-b border-slate-100">Home</a>
          <a href="#catalog" onClick={() => setMobileMenuOpen(false)} className="text-[#0c4a6e] hover:text-[#0284c7] font-semibold py-1.5 text-sm border-b border-slate-100">Categories</a>
          <a href="#bestsellers" onClick={() => setMobileMenuOpen(false)} className="text-[#0c4a6e] hover:text-[#0284c7] font-semibold py-1.5 text-sm border-b border-slate-100">Popular</a>
          <a href="#craftsmanship" onClick={() => setMobileMenuOpen(false)} className="text-[#0c4a6e] hover:text-[#0284c7] font-semibold py-1.5 text-sm">Craftsmanship</a>
        </div>
      )}
    </header>
  );
};
