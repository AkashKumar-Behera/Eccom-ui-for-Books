'use client';

import React from 'react';
import { Mail, Send, Share2, Globe, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#E8F2F3] border-t border-[#76B1BC]/30 text-[#2C4F54] text-xs">
      
      {/* Newsletter */}
      <div className="border-b border-[#76B1BC]/20 py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left space-y-1">
            <h3 className="font-serif text-2xl font-bold text-[#1A1C1C] flex items-center gap-2 justify-center md:justify-start">
              <Sparkles className="w-5 h-5 text-[#76B1BC]" />
              Join The Society of Letters
            </h3>
            <p className="text-xs text-[#2C4F54]/80 font-normal">
              Receive private invitations to limited artisan runs, writing prompts, and 15% off your first journal.
            </p>
          </div>

          <div className="flex items-center w-full md:w-auto max-w-md gap-2">
            <div className="relative flex-1">
              <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                placeholder="Enter your email address..."
                className="w-full bg-[#E8F2F3] border border-[#76B1BC]/30 rounded-xl pl-9 pr-3 py-3 text-xs text-[#1A1C1C] placeholder-slate-400 focus:outline-none focus:border-[#2C4F54] transition-colors"
              />
            </div>
            <button className="px-5 py-3 bg-[#2C4F54] hover:bg-[#1A1C1C] text-white font-bold rounded-xl flex items-center gap-1.5 transition-colors shadow-md whitespace-nowrap">
              <span>Subscribe</span>
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 md:grid-cols-5 gap-10">
        
        {/* Brand Col */}
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl overflow-hidden bg-white border border-[#76B1BC]/30 p-1">
              <img src="/model-1/logo.png" alt="The Abbie Store Logo" className="w-full h-full object-contain" />
            </div>
            <span className="text-lg font-serif font-bold text-[#1A1C1C] tracking-tight">
              The Abbie <span className="text-[#2C4F54] text-xs font-sans font-bold">STORE</span>
            </span>
          </div>
          <p className="text-xs text-[#2C4F54]/80 font-normal max-w-sm leading-relaxed">
            Crafting heritage stationery, executive journals, and archival pens designed to turn every note into an enduring masterpiece.
          </p>
          <div className="flex items-center gap-3 pt-2">
            <a href="#" aria-label="Globe" className="p-2 bg-white border border-[#76B1BC]/30 rounded-xl text-[#2C4F54] hover:text-[#1A1C1C] transition-colors">
              <Globe className="w-4 h-4" />
            </a>
            <a href="#" aria-label="Share" className="p-2 bg-white border border-[#76B1BC]/30 rounded-xl text-[#2C4F54] hover:text-[#1A1C1C] transition-colors">
              <Share2 className="w-4 h-4" />
            </a>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="font-serif font-bold text-[#1A1C1C] text-sm">Collections</h4>
          <ul className="space-y-2 text-[#2C4F54] font-semibold">
            <li><a href="#catalog" className="hover:text-[#1A1C1C] transition-colors">Executive Journals</a></li>
            <li><a href="#catalog" className="hover:text-[#1A1C1C] transition-colors">Fountain Pens & Ink</a></li>
            <li><a href="#catalog" className="hover:text-[#1A1C1C] transition-colors">Weekly Planners</a></li>
            <li><a href="#catalog" className="hover:text-[#1A1C1C] transition-colors">Artist Watercolor Sets</a></li>
            <li><a href="#catalog" className="hover:text-[#1A1C1C] transition-colors">Desk Accessories</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-serif font-bold text-[#1A1C1C] text-sm">Craft & Heritage</h4>
          <ul className="space-y-2 text-[#2C4F54] font-semibold">
            <li><a href="#craftsmanship" className="hover:text-[#1A1C1C] transition-colors">Paper Milling Story</a></li>
            <li><a href="#craftsmanship" className="hover:text-[#1A1C1C] transition-colors">Italian Leather Tanning</a></li>
            <li><a href="#craftsmanship" className="hover:text-[#1A1C1C] transition-colors">Sustainability Guarantee</a></li>
            <li><a href="#craftsmanship" className="hover:text-[#1A1C1C] transition-colors">Bespoke Monogramming</a></li>
          </ul>
        </div>

        <div className="space-y-3">
          <h4 className="font-serif font-bold text-[#1A1C1C] text-sm">Customer Care</h4>
          <ul className="space-y-2 text-[#2C4F54] font-semibold">
            <li><a href="#" className="hover:text-[#1A1C1C] transition-colors">Shipping & Returns</a></li>
            <li><a href="#" className="hover:text-[#1A1C1C] transition-colors">Track Your Order</a></li>
            <li><a href="#" className="hover:text-[#1A1C1C] transition-colors">Care & Refill Guide</a></li>
            <li><a href="#" className="hover:text-[#1A1C1C] transition-colors">Contact Support</a></li>
          </ul>
        </div>

      </div>

      <div className="border-t border-[#76B1BC]/20 py-6 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-400 font-semibold">
          <p>© 2026 The Abbie Store Luxury Stationery Ltd. All rights reserved.</p>
          <div className="flex gap-6">
            <a href="#" className="hover:text-[#1A1C1C]">Privacy Policy</a>
            <a href="#" className="hover:text-[#1A1C1C]">Terms of Service</a>
          </div>
        </div>
      </div>

    </footer>
  );
};
