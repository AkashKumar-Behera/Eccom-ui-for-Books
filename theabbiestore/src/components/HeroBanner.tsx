import React from 'react';
import { Sparkles, Heart, Gift, Truck, ShieldCheck, PhoneCall, Award, Camera as Instagram } from 'lucide-react';
import { PRODUCTS_DATA } from '../data';
import type { Product } from '../data';

interface HeroBannerProps {
  onExploreClick: () => void;
  onSelectProduct: (p: Product) => void;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ onExploreClick, onSelectProduct }) => {
  const businessKitProduct = PRODUCTS_DATA[0]; // Business Kit ₹499

  const highlightStories = [
    { title: 'Business Kit', img: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=200', tag: '₹499' },
    { title: 'Delulu Jewels', img: 'https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&q=80&w=200', tag: 'Viral' },
    { title: 'Labels @ 149', img: 'https://images.unsplash.com/photo-1607344645866-009c320b5ab8?auto=format&fit=crop&q=80&w=200', tag: '50 Pcs' },
    { title: 'Harry Potter', img: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?auto=format&fit=crop&q=80&w=200', tag: 'Magic' },
    { title: 'Customer Love', img: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&q=80&w=200', tag: 'Reviews' },
  ];

  return (
    <section className="relative overflow-hidden pt-4 pb-8 md:py-12 bg-gradient-to-b from-sky-100/70 via-sky-50/50 to-transparent">
      
      {/* Decorative Pastel Sky Bubbles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-sky-200/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-5 right-5 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Instagram Reel Highlight Bar */}
        <div className="mb-8 overflow-x-auto no-scrollbar py-2">
          <div className="flex items-center gap-4 sm:gap-6 min-w-max justify-start md:justify-center">
            {highlightStories.map((story, i) => (
              <div 
                key={i} 
                onClick={onExploreClick}
                className="flex flex-col items-center gap-1.5 cursor-pointer group"
              >
                <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full p-[2.5px] bg-gradient-to-tr from-sky-400 via-blue-500 to-indigo-500 shadow-md group-hover:scale-105 transition-transform duration-300">
                  <div className="w-full h-full rounded-full overflow-hidden border-2 border-white relative">
                    <img src={story.img} alt={story.title} className="w-full h-full object-cover" />
                    <span className="absolute bottom-0 inset-x-0 bg-sky-600/90 text-white text-[9px] font-bold text-center py-0.5">
                      {story.tag}
                    </span>
                  </div>
                </div>
                <span className="text-[11px] font-bold text-gray-700 group-hover:text-sky-600">
                  {story.title}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Hero Card Container */}
        <div className="glass-card rounded-3xl p-6 sm:p-10 border border-sky-200/80 shadow-xl grid md:grid-cols-2 gap-8 items-center">
          
          {/* Left Text Banner */}
          <div className="space-y-4 text-center md:text-left">
            <div className="inline-flex items-center gap-2 bg-sky-100/90 text-sky-800 px-3 py-1 rounded-full text-xs font-bold border border-sky-200">
              <Instagram className="w-3.5 h-3.5 text-sky-600" />
              <span>@theabbiestore.in Official Web Store</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-aesthetic text-sky-950 leading-tight">
              Romanticize Your Business & Journaling ☁️
            </h1>

            <p className="text-sm sm:text-base text-gray-600 max-w-lg leading-relaxed">
              Customized Order Books, Profit Trackers, Name Labels & Harry Potter Journals handcrafted for girls who dream big!
            </p>

            {/* Key Feature Badges */}
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-1 text-xs font-semibold text-gray-700">
              <span className="bg-white/80 px-3 py-1 rounded-full border border-sky-100 shadow-2xs flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-500" /> 100 GSM Bleed-Proof
              </span>
              <span className="bg-white/80 px-3 py-1 rounded-full border border-sky-100 shadow-2xs flex items-center gap-1">
                <Heart className="w-3.5 h-3.5 text-rose-500" /> Gold Foil Custom Cover
              </span>
              <span className="bg-white/80 px-3 py-1 rounded-full border border-sky-100 shadow-2xs flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-emerald-500" /> WhatsApp Checkout
              </span>
            </div>

            {/* Hero CTAs */}
            <div className="pt-3 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={onExploreClick}
                className="px-6 py-3.5 bg-gradient-to-r from-sky-500 via-blue-500 to-sky-600 text-white font-bold text-sm rounded-full shadow-lg shadow-sky-200 hover:shadow-sky-300 hover:scale-102 transition-all"
              >
                Shop Bestsellers (₹149 onwards)
              </button>

              <button
                onClick={() => onSelectProduct(businessKitProduct)}
                className="px-5 py-3.5 bg-white hover:bg-sky-50 text-sky-800 font-bold text-sm rounded-full border-2 border-sky-300 shadow-sm flex items-center gap-2 transition-all"
              >
                <Gift className="w-4 h-4 text-sky-500" />
                <span>Business Kit @ ₹499</span>
              </button>
            </div>
          </div>

          {/* Right Product Spotlight Image */}
          <div className="relative group cursor-pointer" onClick={() => onSelectProduct(businessKitProduct)}>
            <div className="aspect-4/3 rounded-3xl overflow-hidden shadow-2xl border-4 border-white relative">
              <img 
                src="https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=800" 
                alt="Business Kit" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              
              {/* Price Tag Overlay */}
              <div className="absolute bottom-4 left-4 right-4 bg-white/90 backdrop-blur-md p-4 rounded-2xl border border-pink-100 shadow-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-bold text-rose-500 uppercase tracking-wider block">
                    🔥 VIRAL INSTAGRAM KIT
                  </span>
                  <h4 className="font-bold text-gray-900 text-sm">Customized Business Starter Kit</h4>
                  <p className="text-xs text-gray-500">Order Book + Sales Tracker + Profit Book</p>
                </div>
                <div className="text-right">
                  <span className="text-xl font-bold text-pink-600">₹499</span>
                  <span className="text-xs text-gray-400 line-through block">₹999</span>
                </div>
              </div>
            </div>
          </div>

        </div>

        {/* Value Proposition Strip */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8">
          {[
            { icon: <Truck className="w-5 h-5 text-pink-500" />, title: 'Free Express Shipping', desc: 'On all orders above ₹499' },
            { icon: <Award className="w-5 h-5 text-amber-500" />, title: '100% Handcrafted', desc: 'Made with love & high GSM paper' },
            { icon: <PhoneCall className="w-5 h-5 text-emerald-500" />, title: 'WhatsApp Orders', desc: 'Direct chat order confirmation' },
            { icon: <ShieldCheck className="w-5 h-5 text-purple-500" />, title: 'Satisfaction Guaranteed', desc: '5,000+ Happy Customers' },
          ].map((item, idx) => (
            <div key={idx} className="bg-white/80 p-4 rounded-2xl border border-pink-100/70 shadow-2xs flex items-center gap-3">
              <div className="p-2.5 bg-pink-50 rounded-xl">
                {item.icon}
              </div>
              <div>
                <h4 className="font-bold text-gray-800 text-xs">{item.title}</h4>
                <p className="text-[11px] text-gray-500">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
