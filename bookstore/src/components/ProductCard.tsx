'use client';

import React, { useState } from 'react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { Star, Heart, ShoppingBag, Eye, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProductCardProps {
  product: Product;
  onQuickView: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [added, setAdded] = useState(false);
  const isWishlisted = isInWishlist(product.id);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(product);
    setAdded(true);
    
    confetti({
      particleCount: 35,
      spread: 60,
      origin: { y: 0.8 },
      colors: ['#0284c7', '#38bdf8', '#7dd3fc', '#ffffff']
    });

    setTimeout(() => setAdded(false), 1800);
  };

  const handleWishlist = (e: React.MouseEvent) => {
    e.stopPropagation();
    toggleWishlist(product.id);
  };

  return (
    <div
      onClick={() => onQuickView(product)}
      className="group relative bg-white border border-slate-200 hover:border-[#0284c7] rounded-2xl p-3 sm:p-4 transition-all duration-300 hover:shadow-lg cursor-pointer flex flex-col justify-between overflow-hidden"
    >
      {/* Badges */}
      <div className="absolute top-4 left-4 z-10 flex flex-col gap-1">
        {product.badge && (
          <span className="px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-lg text-[9px] sm:text-[10px] font-bold uppercase tracking-wider bg-[#0284c7] text-white shadow-xs">
            {product.badge}
          </span>
        )}
      </div>

      <button
        onClick={handleWishlist}
        aria-label="Add to Wishlist"
        className={`absolute top-4 right-4 z-10 p-2 sm:p-2.5 rounded-xl transition-all duration-300 ${
          isWishlisted
            ? 'bg-rose-600 text-white scale-110 shadow-md'
            : 'bg-white/90 text-[#0c4a6e] hover:text-rose-600 border border-slate-200 shadow-xs'
        }`}
      >
        <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? 'fill-current' : ''}`} />
      </button>

      {/* Image Container */}
      <div className="relative aspect-square rounded-xl overflow-hidden bg-slate-50 mb-3 sm:mb-4 flex items-center justify-center p-2 sm:p-3 border border-slate-100">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain group-hover:scale-108 transition-transform duration-500 ease-out"
        />

        {/* Quick View Button */}
        <div className="absolute inset-0 bg-[#0c4a6e]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2 backdrop-blur-[2px]">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="flex items-center gap-1 bg-[#0284c7] text-white text-[11px] font-bold px-3 py-2 rounded-xl shadow-md hover:bg-[#0369a1] transition-all"
          >
            <Eye className="w-3.5 h-3.5" /> Quick View
          </button>
        </div>
      </div>

      {/* Details */}
      <div className="space-y-1.5 sm:space-y-2 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between text-[10px] sm:text-xs text-[#0284c7] mb-0.5">
            <span className="font-bold">{product.category}</span>
            <div className="flex items-center gap-1 text-amber-500">
              <Star className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-current" />
              <span className="font-bold text-[#0c4a6e]">{product.rating}</span>
              <span className="text-slate-400 text-[9px]">({product.reviewsCount})</span>
            </div>
          </div>

          <h3 className="font-bold text-[#0c4a6e] group-hover:text-[#0284c7] transition-colors text-xs sm:text-sm line-clamp-1">
            {product.name}
          </h3>
          <p className="text-[10px] sm:text-xs text-slate-500 line-clamp-2 mt-0.5 font-normal leading-relaxed">
            {product.description}
          </p>
        </div>

        {/* Price with Rs. */}
        <div className="pt-3 flex items-center justify-between border-t border-slate-100 mt-2">
          <div className="flex items-baseline gap-1">
            <span className="text-sm sm:text-base font-extrabold text-[#0c4a6e] font-sans">
              Rs. {product.price}
            </span>
            {product.originalPrice && (
              <span className="text-[10px] sm:text-xs text-slate-400 line-through font-sans font-medium">
                Rs. {product.originalPrice}
              </span>
            )}
          </div>

          <button
            onClick={handleAddToCart}
            className={`flex items-center gap-1 px-2.5 py-1.5 sm:px-3.5 sm:py-2 rounded-xl text-[10px] sm:text-xs font-bold transition-all duration-300 ${
              added
                ? 'bg-emerald-600 text-white shadow-xs'
                : 'bg-[#0284c7] hover:bg-[#0369a1] text-white shadow-xs'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Added
              </>
            ) : (
              <>
                <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" /> Add
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
