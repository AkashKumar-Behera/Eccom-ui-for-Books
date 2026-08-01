import React, { useState } from 'react';
import { X, Star, ShoppingBag, Heart, Sparkles, Check, PhoneCall, ShieldCheck, Edit3 } from 'lucide-react';
import type { Product } from '../data';

interface ProductModalProps {
  product: Product | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (product: Product, customText?: string) => void;
  isWishlisted: boolean;
  onToggleWishlist: (product: Product) => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({
  product,
  isOpen,
  onClose,
  onAddToCart,
  isWishlisted,
  onToggleWishlist
}) => {
  if (!isOpen || !product) return null;

  const [selectedImg, setSelectedImg] = useState(product.image);
  const [customText, setCustomText] = useState('');
  const [added, setAdded] = useState(false);

  const images = [product.image, ...product.secondaryImages];

  const handleAdd = () => {
    onAddToCart(product, customText);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const handleDirectWhatsApp = () => {
    const text = `Hi! I want to order *${product.name}* (Price: ₹${product.price}). ${customText ? `Customization Text: "${customText}"` : ''}`;
    window.open(`https://wa.me/919876543210?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/50 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-3xl w-full overflow-hidden shadow-2xl relative animate-in zoom-in-95 duration-200 border border-pink-100 flex flex-col md:flex-row">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 bg-white/80 backdrop-blur-md text-gray-500 hover:text-gray-800 rounded-full shadow-md transition-all"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Gallery Preview Left Column */}
        <div className="md:w-1/2 p-6 bg-pink-50/40 flex flex-col items-center justify-between">
          <div className="w-full aspect-square rounded-2xl overflow-hidden shadow-md bg-white border border-pink-100">
            <img 
              src={selectedImg} 
              alt={product.name} 
              className="w-full h-full object-cover"
            />
          </div>

          {images.length > 1 && (
            <div className="flex gap-2 mt-4 overflow-x-auto p-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImg(img)}
                  className={`w-14 h-14 rounded-xl overflow-hidden border-2 transition-all ${
                    selectedImg === img ? 'border-pink-500 scale-105' : 'border-pink-100 opacity-70'
                  }`}
                >
                  <img src={img} alt="" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Product Info Right Column */}
        <div className="md:w-1/2 p-6 flex flex-col justify-between space-y-4">
          <div className="space-y-3">
            
            {/* Category & Badge */}
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-pink-600 bg-pink-100 px-2.5 py-0.5 rounded-full">
                {product.category.replace('-', ' ')}
              </span>
              <button
                onClick={() => onToggleWishlist(product)}
                className={`p-2 rounded-full border ${
                  isWishlisted ? 'bg-rose-50 border-rose-200 text-rose-500' : 'border-gray-200 text-gray-400 hover:text-rose-500'
                }`}
              >
                <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>
            </div>

            <h2 className="text-xl font-bold font-serif-aesthetic text-gray-900 leading-snug">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex text-amber-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-gray-800">{product.rating}</span>
              <span className="text-xs text-gray-400">({product.reviewsCount} customer reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-gray-900">₹{product.price}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-400 line-through">₹{product.originalPrice}</span>
              )}
              <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full">
                Free Shipping
              </span>
            </div>

            <p className="text-xs text-gray-600 leading-relaxed">
              {product.description}
            </p>

            {/* Live Custom Text Field */}
            {product.isCustomizable && (
              <div className="bg-pink-50/80 p-3 rounded-2xl border border-pink-200 space-y-1.5">
                <label className="text-xs font-bold text-pink-900 flex items-center gap-1">
                  <Edit3 className="w-3.5 h-3.5 text-pink-500" />
                  <span>{product.customizationLabel || 'Enter Custom Text / Name'}</span>
                </label>
                <input
                  type="text"
                  placeholder="e.g. Delulu Jewels / Aanya Studio"
                  value={customText}
                  onChange={(e) => setCustomText(e.target.value)}
                  className="w-full bg-white px-3 py-2 border border-pink-200 rounded-xl text-xs focus:ring-2 focus:ring-pink-400 focus:outline-none"
                />
              </div>
            )}

            {/* Key Features */}
            <div className="space-y-1">
              <span className="text-xs font-bold text-gray-800">Highlights:</span>
              <ul className="text-xs text-gray-600 space-y-1">
                {product.features.map((feat, idx) => (
                  <li key={idx} className="flex items-center gap-1.5">
                    <Sparkles className="w-3 h-3 text-pink-500" />
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="pt-4 border-t border-pink-100 space-y-2">
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={handleAdd}
                className={`py-3 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all shadow-md ${
                  added 
                    ? 'bg-emerald-500 text-white' 
                    : 'bg-gradient-to-r from-pink-500 to-rose-400 text-white hover:from-pink-600 hover:to-rose-500'
                }`}
              >
                {added ? <Check className="w-4 h-4" /> : <ShoppingBag className="w-4 h-4" />}
                <span>{added ? 'Added to Cart!' : 'Add to Bag'}</span>
              </button>

              <button
                onClick={handleDirectWhatsApp}
                className="py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 shadow-md"
              >
                <PhoneCall className="w-4 h-4" />
                <span>Buy via WhatsApp</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400 pt-1">
              <ShieldCheck className="w-3.5 h-3.5 text-pink-400" />
              <span>100% Handcrafted with Love | Fast Shipping Across India</span>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
