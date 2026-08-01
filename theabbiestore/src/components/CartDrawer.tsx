import React, { useState } from 'react';
import { X, ShoppingBag, Plus, Minus, Trash2, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import type { CartItem } from '../data';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (id: string, delta: number) => void;
  onRemoveItem: (id: string) => void;
  onClearCart: () => void;
}

export const CartDrawer: React.FC<CartDrawerProps> = ({
  isOpen,
  onClose,
  cartItems,
  onUpdateQuantity,
  onRemoveItem
}) => {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [pincode, setPincode] = useState('');
  const [promoCode, setPromoCode] = useState('');
  const [discountApplied, setDiscountApplied] = useState(false);

  if (!isOpen) return null;

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discount = discountApplied ? Math.round(subtotal * 0.1) : 0;
  const shipping = subtotal >= 499 || subtotal === 0 ? 0 : 40;
  const grandTotal = subtotal - discount + shipping;

  const handleApplyPromo = () => {
    if (promoCode.trim().toUpperCase() === 'ABBIE10' || promoCode.trim().toUpperCase() === 'FREESHIP') {
      setDiscountApplied(true);
    } else {
      alert('Try promo code: ABBIE10 for 10% OFF!');
    }
  };

  const handleWhatsAppCheckout = () => {
    if (!customerName || !phone || !address) {
      alert('Please fill in your Name, Phone Number, and Address before proceeding to WhatsApp!');
      return;
    }

    let message = `*NEW ORDER - THE ABBIE STORE*\n\n`;
    message += `👤 *Customer Name:* ${customerName}\n`;
    message += `📞 *Phone:* ${phone}\n`;
    message += `📍 *Delivery Address:* ${address}, PIN: ${pincode}\n\n`;
    message += `🛒 *ORDER ITEMS:*\n`;

    cartItems.forEach((item, idx) => {
      message += `${idx + 1}. *${item.product.name}* (Qty: ${item.quantity}) - ₹${item.product.price * item.quantity}\n`;
      if (item.customText) {
        message += `   ✍️ *Custom Title/Text:* "${item.customText}"\n`;
      }
    });

    message += `\n-----------------------\n`;
    message += `💰 *Subtotal:* ₹${subtotal}\n`;
    if (discount > 0) message += `🏷️ *Discount (ABBIE10):* -₹${discount}\n`;
    message += `🚚 *Shipping:* ${shipping === 0 ? 'FREE' : `₹${shipping}`}\n`;
    message += `TOTAL PAYABLE: *₹${grandTotal}*\n`;
    message += `\nPayment options requested: UPI / GPay / PhonePe QR code on WhatsApp.`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/919876543210?text=${encodedMessage}`;

    window.open(whatsappUrl, '_blank');
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-black/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col justify-between animate-in slide-in-from-right duration-300">
        
        {/* Header */}
        <div className="p-4 border-b border-pink-100 flex items-center justify-between bg-pink-50/50">
          <div className="flex items-center gap-2">
            <div className="p-2 bg-pink-100 rounded-full text-pink-600">
              <ShoppingBag className="w-5 h-5" />
            </div>
            <div>
              <h2 className="font-bold text-gray-900 font-serif-aesthetic text-lg">Your Bag</h2>
              <p className="text-xs text-pink-600 font-semibold">{cartItems.length} aesthetic item(s)</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-pink-100/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {cartItems.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-3">
              <div className="w-16 h-16 rounded-full bg-pink-100 text-pink-400 flex items-center justify-center">
                <ShoppingBag className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-gray-800 text-base">Your cart is currently empty</h3>
              <p className="text-xs text-gray-500 max-w-xs">
                Explore our customized business kits, journals & name labels to add magic to your bag!
              </p>
              <button 
                onClick={onClose}
                className="mt-2 px-5 py-2.5 bg-pink-500 text-white font-bold text-xs rounded-full shadow-md hover:bg-pink-600"
              >
                Start Shopping
              </button>
            </div>
          ) : (
            <>
              {cartItems.map((item) => (
                <div 
                  key={item.product.id} 
                  className="flex gap-3 p-3 bg-pink-50/40 rounded-2xl border border-pink-100 relative group"
                >
                  <img 
                    src={item.product.image} 
                    alt={item.product.name} 
                    className="w-16 h-16 object-cover rounded-xl border border-pink-200"
                  />
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-start">
                      <h4 className="font-semibold text-xs text-gray-900 line-clamp-1">{item.product.name}</h4>
                      <button 
                        onClick={() => onRemoveItem(item.product.id)}
                        className="text-gray-400 hover:text-rose-500"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {item.customText && (
                      <p className="text-[11px] text-pink-700 bg-pink-100/60 px-2 py-0.5 rounded-md inline-block font-medium">
                        ✍️ Custom: "{item.customText}"
                      </p>
                    )}

                    <div className="flex items-center justify-between pt-1">
                      <span className="font-bold text-xs text-gray-900">₹{item.product.price * item.quantity}</span>
                      
                      <div className="flex items-center gap-1.5 bg-white border border-pink-200 rounded-full px-2 py-0.5">
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, -1)}
                          className="text-gray-500 hover:text-pink-600"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-gray-800 w-4 text-center">{item.quantity}</span>
                        <button 
                          onClick={() => onUpdateQuantity(item.product.id, 1)}
                          className="text-gray-500 hover:text-pink-600"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}

              {/* Promo Code section */}
              <div className="bg-pink-50 p-3 rounded-2xl border border-pink-200/60 space-y-2">
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Enter Coupon (Try ABBIE10)"
                    value={promoCode}
                    onChange={(e) => setPromoCode(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-white border border-pink-200 rounded-xl text-xs uppercase"
                  />
                  <button 
                    onClick={handleApplyPromo}
                    className="px-3 py-1.5 bg-pink-600 text-white font-bold text-xs rounded-xl hover:bg-pink-700"
                  >
                    Apply
                  </button>
                </div>
                {discountApplied && (
                  <p className="text-[11px] font-bold text-emerald-600 flex items-center gap-1">
                    <Sparkles className="w-3 h-3" /> 10% Discount Applied!
                  </p>
                )}
              </div>

              {/* Shipping Details Form */}
              <div className="bg-white p-3 rounded-2xl border border-pink-100 space-y-2 text-xs">
                <h4 className="font-bold text-gray-800 text-xs flex items-center gap-1">
                  <span>📍</span> Delivery Address (For WhatsApp Order)
                </h4>
                <input 
                  type="text" 
                  placeholder="Your Name *"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-3 py-1.5 bg-pink-50/50 border border-pink-200 rounded-lg"
                />
                <input 
                  type="tel" 
                  placeholder="WhatsApp Mobile Number *"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-3 py-1.5 bg-pink-50/50 border border-pink-200 rounded-lg"
                />
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    placeholder="Full Address *"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="flex-1 px-3 py-1.5 bg-pink-50/50 border border-pink-200 rounded-lg"
                  />
                  <input 
                    type="text" 
                    placeholder="Pincode"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="w-24 px-3 py-1.5 bg-pink-50/50 border border-pink-200 rounded-lg"
                  />
                </div>
              </div>
            </>
          )}
        </div>

        {/* Footer Checkout CTA */}
        {cartItems.length > 0 && (
          <div className="p-4 border-t border-pink-100 bg-white space-y-3">
            <div className="space-y-1 text-xs text-gray-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-semibold text-gray-800">₹{subtotal}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-emerald-600">
                  <span>Coupon Discount</span>
                  <span>-₹{discount}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>{shipping === 0 ? <strong className="text-emerald-600">FREE</strong> : `₹${shipping}`}</span>
              </div>
              <div className="flex justify-between text-sm font-bold text-gray-900 pt-1 border-t border-gray-100">
                <span>Total Amount</span>
                <span className="text-pink-600 text-base">₹{grandTotal}</span>
              </div>
            </div>

            <button
              onClick={handleWhatsAppCheckout}
              className="w-full py-3.5 bg-emerald-500 hover:bg-emerald-600 text-white font-bold rounded-2xl shadow-lg shadow-emerald-200 flex items-center justify-center gap-2 text-sm transition-all transform active:scale-98"
            >
              <span>📲 Checkout via WhatsApp</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-2 text-[10px] text-gray-400">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-500" />
              <span>Safe & Instant Confirmation on WhatsApp</span>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
