import React, { useState } from 'react';
import { Heart, ShoppingBag, Eye, Star, Sparkles, Check, Edit3 } from 'lucide-react';
import type { Product } from '../data';

interface ProductCardProps {
  product: Product;
  isWishlisted: boolean;
  onToggleWishlist: (p: Product) => void;
  onQuickView: (p: Product) => void;
  onAddToCart: (p: Product, customText?: string) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  isWishlisted,
  onToggleWishlist,
  onQuickView,
  onAddToCart
}) => {
  const [customInputText, setCustomInputText] = useState('');
  const [isAdded, setIsAdded] = useState(false);

  const handleAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    onAddToCart(product, customInputText);
    setIsAdded(true);
    setTimeout(() => setIsAdded(false), 1500);
  };

  return (
    <div 
      onClick={() => onQuickView(product)}
      className="group relative bg-white rounded-3xl overflow-hidden border border-sky-100/90 shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col cursor-pointer hover:-translate-y-1"
    >
      {/* Image Container with Badge */}
      <div className="relative aspect-4/3 sm:aspect-square overflow-hidden bg-sky-50/40">
        <img 
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          loading="lazy"
        />

        {/* Badge overlay */}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-gradient-to-r from-sky-500 to-blue-600 text-white text-[10px] uppercase font-bold tracking-wider px-2.5 py-1 rounded-full shadow-xs flex items-center gap-1">
            <Sparkles className="w-2.5 h-2.5 text-amber-200" />
            {product.badge}
          </span>
        )}

        {/* Wishlist Floating Button */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleWishlist(product);
          }}
          className={`absolute top-3 right-3 p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted 
              ? 'bg-sky-500 text-white' 
              : 'bg-white/80 text-gray-600 hover:text-sky-600 hover:bg-white'
          } shadow-xs`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {/* Quick View Button Hover Overlay */}
        <div className="absolute inset-0 bg-sky-950/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
          <button 
            onClick={(e) => {
              e.stopPropagation();
              onQuickView(product);
            }}
            className="bg-white/90 backdrop-blur-sm text-sky-950 text-xs font-bold px-4 py-2 rounded-full shadow-lg hover:bg-white transition-all transform translate-y-2 group-hover:translate-y-0 flex items-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5 text-sky-600" />
            <span>Customize & View</span>
          </button>
        </div>
      </div>

      {/* Content Info */}
      <div className="p-4 flex-1 flex flex-col justify-between space-y-3">
        <div>
          {/* Rating & Reviews */}
          <div className="flex items-center gap-1.5 mb-1.5">
            <div className="flex items-center text-amber-400">
              <Star className="w-3.5 h-3.5 fill-current" />
            </div>
            <span className="text-xs font-bold text-gray-800">{product.rating}</span>
            <span className="text-[11px] text-gray-400">({product.reviewsCount})</span>
          </div>

          <h3 className="font-semibold text-gray-900 text-sm leading-snug group-hover:text-sky-600 transition-colors line-clamp-2">
            {product.name}
          </h3>
        </div>

        {/* Live Custom Text Input Preview inside Card */}
        {product.isCustomizable && (
          <div 
            onClick={(e) => e.stopPropagation()} 
            className="bg-sky-50/70 p-2 rounded-xl border border-sky-100 text-xs space-y-1"
          >
            <div className="flex items-center gap-1 text-[11px] text-sky-800 font-semibold">
              <Edit3 className="w-3 h-3 text-sky-500" />
              <span>Custom Text Preview:</span>
            </div>
            <input 
              type="text" 
              placeholder="e.g. Delulu Jewels / Aanya"
              value={customInputText}
              onChange={(e) => setCustomInputText(e.target.value)}
              className="w-full bg-white px-2 py-1 border border-sky-200 rounded-md text-xs focus:outline-none focus:ring-1 focus:ring-sky-400 text-gray-800"
            />
          </div>
        )}

        {/* Price & Add To Cart CTA */}
        <div className="pt-2 border-t border-sky-50 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-gray-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-xs text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
            </div>
            {product.originalPrice && (
              <span className="text-[10px] font-bold text-emerald-600">
                {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
              </span>
            )}
          </div>

          <button
            onClick={handleAdd}
            className={`px-3 py-2 rounded-2xl font-bold text-xs flex items-center gap-1.5 transition-all shadow-xs ${
              isAdded 
                ? 'bg-emerald-500 text-white' 
                : 'bg-gradient-to-r from-sky-500 to-blue-500 hover:from-sky-600 hover:to-blue-600 text-white shadow-sky-200'
            }`}
          >
            {isAdded ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added!</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
