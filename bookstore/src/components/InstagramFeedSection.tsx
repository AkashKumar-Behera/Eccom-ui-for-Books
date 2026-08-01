'use client';

import React from 'react';
import { Product } from '@/data/products';
import { ProductCard } from './ProductCard';
import { Heart, Sparkles, Flame, Share2, Camera } from 'lucide-react';

interface InstagramFeedProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const InstagramFeedSection: React.FC<InstagramFeedProps> = ({ products, onQuickView }) => {
  return (
    <section className="py-20 bg-white border-t border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Instagram Header Banner */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 bg-[#f0f9ff] border border-[#bae6fd] p-8 rounded-3xl mb-12">
          <div className="flex items-center gap-4 text-left">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 p-0.5 shadow-md flex-shrink-0">
              <div className="w-full h-full bg-white rounded-[14px] p-1 flex items-center justify-center">
                <img src="/model-1/logo.png" alt="The Abbie Store Insta" className="w-full h-full object-contain" />
              </div>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-serif text-2xl font-bold text-[#0c4a6e]">@theabbiestore.in</h3>
                <span className="bg-[#0284c7] text-white text-[10px] font-bold px-2 py-0.5 rounded-full">Verified Store</span>
              </div>
              <p className="text-xs text-[#0284c7] font-semibold mt-0.5">
                Daily Cute Stationery Reels • Pastel Aesthetics • 150K+ Instagram Family
              </p>
            </div>
          </div>

          <a
            href="https://www.instagram.com/theabbiestore.in"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-rose-500 via-purple-600 to-indigo-600 hover:from-rose-600 hover:to-indigo-700 text-white font-bold px-6 py-3.5 rounded-2xl shadow-md transition-all duration-300 transform hover:-translate-y-0.5 whitespace-nowrap"
          >
            <Camera className="w-4 h-4" />
            <span>Follow @theabbiestore.in</span>
          </a>
        </div>

        {/* Trending Instagram Reels Picks Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-bold uppercase tracking-wider mb-2">
            <Flame className="w-3.5 h-3.5" />
            <span>As Seen On Instagram Reels</span>
          </div>
          <h2 className="text-3xl font-serif font-bold text-[#0c4a6e]">
            Viral Customer Favorites
          </h2>
          <p className="text-xs text-slate-500 mt-1 font-normal">
            Shop the exact cute notebooks, heart gel pens & planner pads featured in our viral reels.
          </p>
        </div>

        {/* Featured Instagram Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
          ))}
        </div>

      </div>
    </section>
  );
};
