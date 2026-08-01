'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { X, Trash2, ShoppingBag, ArrowRight, ShieldCheck, Check } from 'lucide-react';
import confetti from 'canvas-confetti';

export const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, setIsCartOpen, removeFromCart, updateQuantity, totalAmount } = useCart();
  const [isCheckingOut, setIsCheckingOut] = useState(false);
  const [checkedOutSuccess, setCheckedOutSuccess] = useState(false);

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    setIsCheckingOut(true);
    setTimeout(() => {
      setIsCheckingOut(false);
      setCheckedOutSuccess(true);
      confetti({
        particleCount: 80,
        spread: 90,
        origin: { y: 0.5 },
        colors: ['#0284c7', '#38bdf8', '#7dd3fc', '#ffffff', '#34d399']
      });
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-[#0c4a6e]/30 backdrop-blur-sm transition-opacity animate-in fade-in"
      />

      <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col border-l border-slate-200 animate-in slide-in-from-right duration-300">
          
          <div className="p-6 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="p-2 rounded-xl bg-[#0284c7] text-white">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg font-bold text-[#0c4a6e]">Your Stationery Bag</h2>
                <p className="text-xs text-[#0284c7]">
                  {cart.length} {cart.length === 1 ? 'item' : 'items'} selected
                </p>
              </div>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-2 rounded-full hover:bg-slate-200 text-[#0c4a6e] transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {checkedOutSuccess ? (
              <div className="text-center py-16 space-y-4">
                <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto animate-bounce">
                  <Check className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-serif font-bold text-[#0c4a6e]">Order Confirmed!</h3>
                <p className="text-xs text-slate-500 max-w-xs mx-auto">
                  Thank you for shopping at The Abbie Store. Your pastel stationery package is being carefully packed!
                </p>
                <button
                  onClick={() => {
                    setCheckedOutSuccess(false);
                    setIsCartOpen(false);
                  }}
                  className="px-6 py-3 bg-[#0284c7] text-white rounded-2xl text-xs font-bold shadow-md"
                >
                  Continue Shopping
                </button>
              </div>
            ) : cart.length === 0 ? (
              <div className="text-center py-20 space-y-3">
                <ShoppingBag className="w-12 h-12 text-[#0284c7] mx-auto opacity-50" />
                <h3 className="text-base font-bold text-[#0c4a6e]">Your bag is empty</h3>
                <p className="text-xs text-slate-400">Discover cute notebooks & pastel pens to add.</p>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.product.id}
                  className="flex gap-4 p-3 rounded-2xl border border-slate-100 bg-slate-50 items-center"
                >
                  <div className="w-16 h-16 rounded-xl bg-white p-1 border border-slate-200 flex-shrink-0 flex items-center justify-center">
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-full h-full object-contain"
                    />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="text-xs font-bold text-[#0c4a6e] truncate">{item.product.name}</h4>
                    <p className="text-xs font-bold text-[#0284c7] mt-0.5">Rs. {item.product.price}</p>

                    <div className="flex items-center gap-2 mt-2">
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                        className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0c4a6e]"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold text-[#0c4a6e] w-4 text-center">
                        {item.quantity}
                      </span>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                        className="w-6 h-6 rounded-lg bg-white border border-slate-200 text-xs font-bold text-[#0c4a6e]"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="p-2 text-slate-400 hover:text-rose-600 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              ))
            )}
          </div>

          {!checkedOutSuccess && cart.length > 0 && (
            <div className="p-6 bg-slate-50 border-t border-slate-200 space-y-4">
              <div className="space-y-2 text-xs">
                <div className="flex justify-between text-slate-500">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#0c4a6e]">Rs. {totalAmount}</span>
                </div>
                <div className="flex justify-between text-slate-500">
                  <span>Shipping</span>
                  <span className="font-semibold text-emerald-600">Free</span>
                </div>
                <div className="flex justify-between text-sm font-bold text-[#0c4a6e] pt-2 border-t border-slate-200">
                  <span>Total Amount</span>
                  <span className="text-[#0284c7]">Rs. {totalAmount}</span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isCheckingOut}
                className="w-full flex items-center justify-center gap-2 py-4 bg-[#0284c7] hover:bg-[#0369a1] text-white font-bold rounded-2xl shadow-lg transition-all duration-300 transform active:scale-98"
              >
                {isCheckingOut ? (
                  <span className="text-xs">Processing Order...</span>
                ) : (
                  <>
                    <span>Proceed to Checkout</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-400">
                <ShieldCheck className="w-3.5 h-3.5 text-[#0284c7]" />
                <span>100% Encrypted & Safe Checkout</span>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};
