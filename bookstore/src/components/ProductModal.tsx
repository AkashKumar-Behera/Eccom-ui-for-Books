'use client';

import React, { useState } from 'react';
import { Product } from '@/data/products';
import { useCart } from '@/context/CartContext';
import { X, Star, Heart, ShoppingBag, Truck, ShieldCheck, RotateCcw, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

interface ProductModalProps {
  product: Product | null;
  onClose: () => void;
}

export const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  const { addToCart, toggleWishlist, isInWishlist } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [added, setAdded] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string>('');

  // Sync selectedImage when product changes
  React.useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
    }
  }, [product]);

  if (!product) return null;

  const isWishlisted = isInWishlist(product.id);
  const imageList = product.images && product.images.length > 0 ? product.images : [product.image];
  const currentImage = selectedImage || product.image;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setAdded(true);

    confetti({
      particleCount: 50,
      spread: 70,
      origin: { y: 0.6 },
      colors: ['#0284c7', '#38bdf8', '#7dd3fc', '#ffffff']
    });

    setTimeout(() => {
      setAdded(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#0c4a6e]/40 backdrop-blur-md animate-in fade-in duration-200">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-3xl bg-white rounded-3xl overflow-hidden shadow-2xl border border-slate-200 grid grid-cols-1 md:grid-cols-2">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 rounded-full bg-slate-100 hover:bg-slate-200 text-[#0c4a6e] transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Left: Image Container with Swap Thumbnails */}
        <div className="relative bg-slate-50 p-6 flex flex-col items-center justify-between border-b md:border-b-0 md:border-r border-slate-100">
          {product.badge && (
            <span className="absolute top-4 left-4 z-10 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#0284c7] text-white">
              {product.badge}
            </span>
          )}

          {/* Main Selected Image */}
          <div className="w-full flex-1 flex items-center justify-center min-h-[260px]">
            <img
              src={currentImage}
              alt={product.name}
              className="w-full max-h-72 object-contain transition-all duration-300 rounded-xl"
            />
          </div>

          {/* Thumbnail Image Swapper Row */}
          {imageList.length > 1 && (
            <div className="flex items-center justify-center gap-2 mt-4 pt-3 border-t border-slate-200/60 w-full overflow-x-auto">
              {imageList.map((imgUrl, idx) => (
                <button
                  key={idx}
                  onClick={() => setSelectedImage(imgUrl)}
                  className={`w-12 h-12 rounded-xl border-2 overflow-hidden flex-shrink-0 transition-all duration-200 ${
                    selectedImage === imgUrl
                      ? 'border-[#0284c7] scale-105 shadow-sm'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={imgUrl} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="p-6 md:p-8 flex flex-col justify-between space-y-6">
          <div className="space-y-3">
            <span className="text-xs font-bold text-[#0284c7] uppercase tracking-wider">
              {product.category}
            </span>
            <h2 className="text-xl md:text-2xl font-bold text-[#0c4a6e] leading-snug">
              {product.name}
            </h2>

            {/* Rating */}
            <div className="flex items-center gap-2">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-4 h-4 fill-current" />
                ))}
              </div>
              <span className="text-xs font-bold text-[#0c4a6e]">{product.rating}</span>
              <span className="text-xs text-slate-400">({product.reviewsCount} reviews)</span>
            </div>

            {/* Price with Rs. */}
            <div className="flex items-baseline gap-2 pt-2">
              <span className="text-2xl md:text-3xl font-extrabold text-[#0c4a6e]">
                Rs. {product.price}
              </span>
              {product.originalPrice && (
                <span className="text-sm text-slate-400 line-through">
                  Rs. {product.originalPrice}
                </span>
              )}
            </div>

            <p className="text-xs text-slate-600 leading-relaxed font-normal">
              {product.description}
            </p>

            {/* Specifications */}
            <div className="pt-3 border-t border-slate-100 space-y-2">
              <h4 className="text-[11px] font-bold uppercase text-slate-500 tracking-wider">
                Specifications
              </h4>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {product.specs.map((spec, idx) => (
                  <div key={idx} className="bg-slate-50 p-2 rounded-xl border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">{spec.label}</span>
                    <span className="font-semibold text-[#0c4a6e]">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Action Bar */}
          <div className="space-y-4 pt-2">
            <div className="flex items-center gap-3">
              
              {/* Quantity */}
              <div className="flex items-center border border-slate-200 rounded-2xl bg-slate-50 p-1 flex-shrink-0">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-slate-200 text-[#0c4a6e] font-bold text-sm flex items-center justify-center transition-colors shadow-xs"
                >
                  -
                </button>
                <span className="w-8 text-center text-sm font-bold text-[#0c4a6e]">
                  {quantity}
                </span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-8 h-8 rounded-xl bg-white hover:bg-slate-200 text-[#0c4a6e] font-bold text-sm flex items-center justify-center transition-colors shadow-xs"
                >
                  +
                </button>
              </div>

              {/* Clean Single Line 'Add to Bag' Button */}
              <button
                onClick={handleAddToCart}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl font-bold text-sm text-white shadow-md transition-all duration-300 transform active:scale-98 whitespace-nowrap ${
                  added
                    ? 'bg-emerald-600'
                    : 'bg-[#0284c7] hover:bg-[#0369a1]'
                }`}
              >
                {added ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Added to Bag</span>
                  </>
                ) : (
                  <>
                    <ShoppingBag className="w-4 h-4 flex-shrink-0" />
                    <span>Add to Bag</span>
                  </>
                )}
              </button>

              {/* Wishlist Button */}
              <button
                onClick={() => toggleWishlist(product.id)}
                className={`p-3.5 rounded-2xl border flex-shrink-0 transition-all ${
                  isWishlisted
                    ? 'bg-rose-600 text-white border-rose-600'
                    : 'border-slate-200 text-[#0c4a6e] hover:bg-slate-50'
                }`}
              >
                <Heart className={`w-5 h-5 ${isWishlisted ? 'fill-current' : ''}`} />
              </button>

            </div>

            {/* Guarantees */}
            <div className="grid grid-cols-3 gap-2 text-[10px] text-slate-500 pt-2 border-t border-slate-100 text-center">
              <div className="flex items-center justify-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Free Shipping</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>1 Year Quality</span>
              </div>
              <div className="flex items-center justify-center gap-1">
                <RotateCcw className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>Easy Returns</span>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
};
