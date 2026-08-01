'use client';

import React from 'react';
import { Layers, Feather, Award, Sparkles } from 'lucide-react';

export const Craftsmanship: React.FC = () => {
  return (
    <section id="craftsmanship" className="py-20 bg-white relative overflow-hidden border-t border-b border-[#76B1BC]/30">
      
      {/* Background Soft Glows */}
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-[#76B1BC]/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#2C4F54]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end mb-16">
          <div className="lg:col-span-8">
            <span className="text-xs uppercase font-bold text-[#2C4F54] tracking-widest block mb-2">
              Uncompromising Quality
            </span>
            <h2 className="text-3xl sm:text-5xl font-serif font-bold text-[#1A1C1C] tracking-tight">
              The Heritage of Archival Paper & Precision Metals
            </h2>
          </div>
          <div className="lg:col-span-4">
            <p className="text-[#2C4F54]/80 text-sm font-sans font-normal leading-relaxed">
              Every spiral journal, fine writing nib, and daily planner pad is crafted with non-bleed 120gsm paper and precision engineered brass.
            </p>
          </div>
        </div>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          <div className="bg-[#E8F2F3]/40 p-8 rounded-3xl border border-[#76B1BC]/30 hover:border-[#2C4F54] transition-all duration-300 group shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#76B1BC]/30 text-[#2C4F54] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Layers className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#1A1C1C] mb-3 group-hover:text-[#2C4F54] transition-colors">
              120 GSM Bleed-Proof Paper
            </h3>
            <p className="text-xs text-[#2C4F54]/80 leading-relaxed font-sans font-normal">
              Specially milled smooth sheets ensure zero ghosting or ink bleed, perfect for wet fountain pen inks, markers, and gel nibs.
            </p>
          </div>

          <div className="bg-[#E8F2F3]/40 p-8 rounded-3xl border border-[#76B1BC]/30 hover:border-[#2C4F54] transition-all duration-300 group shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#76B1BC]/30 text-[#2C4F54] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Feather className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#1A1C1C] mb-3 group-hover:text-[#2C4F54] transition-colors">
              Full-Grain Italian Leather
            </h3>
            <p className="text-xs text-[#2C4F54]/80 leading-relaxed font-sans font-normal">
              Hand-tanned in Florence, Italy. Covers develop a unique individual patina over years of continuous journal entry.
            </p>
          </div>

          <div className="bg-[#E8F2F3]/40 p-8 rounded-3xl border border-[#76B1BC]/30 hover:border-[#2C4F54] transition-all duration-300 group shadow-xs">
            <div className="w-12 h-12 rounded-2xl bg-white border border-[#76B1BC]/30 text-[#2C4F54] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-serif font-bold text-[#1A1C1C] mb-3 group-hover:text-[#2C4F54] transition-colors">
              Precision Swiss Nibs
            </h3>
            <p className="text-xs text-[#2C4F54]/80 leading-relaxed font-sans font-normal">
              Solid machined brass barrels balanced to the exact fraction of a gram for effortless ergonomic hand feel.
            </p>
          </div>

        </div>

        {/* Quote Banner */}
        <div className="mt-16 bg-[#E8F2F3] rounded-3xl p-8 sm:p-12 border border-[#76B1BC]/30 text-center relative overflow-hidden shadow-xs">
          <Sparkles className="w-8 h-8 text-[#76B1BC] mx-auto mb-4" />
          <blockquote className="font-serif text-xl sm:text-2xl text-[#1A1C1C] max-w-3xl mx-auto italic font-bold">
            "Writing by hand is a mindful ritual. Your journal is a sanctuary for your greatest ambitions, private reflections, and creative sparks."
          </blockquote>
          <p className="text-xs text-[#2C4F54] uppercase tracking-widest font-bold mt-4">
            — The Abbie Store Design Studio
          </p>
        </div>

      </div>
    </section>
  );
};
