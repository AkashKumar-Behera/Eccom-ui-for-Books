"use client";

import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCart } from "@/context/CartContext";
import {
  X,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Truck,
} from "lucide-react";

export default function CartDrawer() {
  const {
    items,
    isOpen,
    closeCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalItems,
    subtotal,
  } = useCart();
  const router = useRouter();

  // Free shipping / sticker perk threshold (₹499)
  const perkThreshold = 499;
  const amountNeeded = Math.max(0, perkThreshold - subtotal);
  const progressPercent = Math.min(100, (subtotal / perkThreshold) * 100);

  // Lock body scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  const handleCheckout = () => {
    closeCart();
    router.push("/checkout");
  };

  return (
    <div
      className={`fixed inset-0 z-50 transition-all duration-300 ${
        isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      />

      {/* Drawer Panel */}
      <aside
        className={`fixed top-0 right-0 h-full w-full sm:w-[440px] bg-[var(--card-bg)] text-[var(--text-primary)] shadow-2xl flex flex-col z-10 transition-transform duration-300 ease-out transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* 1. Header */}
        <div className="px-6 py-4 border-b border-[var(--border-color)] flex items-center justify-between bg-[var(--bg-primary)]">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-[var(--text-brand)]" />
            <h2 className="font-moresugar font-bold text-lg text-[var(--text-primary)]">
              Your Bag
            </h2>
            <span className="bg-[var(--btn-shop)] text-[var(--btn-shop-text)] text-xs font-bold font-moresugar px-2 py-0.5 rounded-full">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </span>
          </div>

          <button
            onClick={closeCart}
            className="p-2 rounded-full hover:bg-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label="Close cart"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 2. Kawaii Perk / Free Gift Progress Bar */}
        <div className="bg-[var(--bg-secondary)] px-6 py-3 border-b border-[var(--border-color)]">
          <div className="flex items-center justify-between text-xs font-moresugar font-bold mb-1.5">
            <span className="flex items-center gap-1.5 text-[var(--text-brand)]">
              <Sparkles className="w-3.5 h-3.5" />
              {amountNeeded > 0
                ? `Add ₹${amountNeeded} for Free Kawaii Stickers!`
                : "🎉 You unlocked Free Kawaii Stickers!"}
            </span>
            <span className="text-[var(--text-secondary)] text-[11px] font-sans">
              {progressPercent.toFixed(0)}%
            </span>
          </div>
          <div className="w-full bg-[var(--border-color)] h-2 rounded-full overflow-hidden">
            <div
              className="bg-gradient-to-r from-[var(--btn-shop)] to-[var(--text-brand)] h-full transition-all duration-500 rounded-full"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* 3. Items List or Empty State */}
        <div className="flex-1 overflow-y-auto px-6 py-4 space-y-4 no-scrollbar">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-center py-12 space-y-4">
              <div className="w-20 h-20 rounded-full bg-[var(--btn-shop)]/20 text-[var(--text-brand)] flex items-center justify-center text-3xl">
                🛍️
              </div>
              <div className="space-y-1">
                <h3 className="font-moresugar font-bold text-lg text-[var(--text-primary)]">
                  Your cart is empty
                </h3>
                <p className="text-xs text-[var(--text-secondary)] max-w-xs font-sans">
                  Looks like you haven&apos;t added any cute stationery or planners yet!
                </p>
              </div>
              <button
                type="button"
                onClick={() => {
                  closeCart();
                  router.push("/shop");
                }}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--btn-shop)] text-[var(--btn-shop-text)] font-bold text-xs font-moresugar hover:bg-[var(--btn-shop-hover)] active:scale-95 transition-all shadow-xs cursor-pointer"
              >
                <span>Explore Cute Stationery</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ) : (
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-3.5 p-3 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] group hover:border-[var(--btn-shop)] transition-all"
                >
                  {/* Thumbnail */}
                  <div className="relative w-16 h-16 sm:w-18 sm:h-18 rounded-xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] shrink-0">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        sizes="72px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-2xl">
                        🌸
                      </div>
                    )}
                  </div>

                  {/* Details */}
                  <div className="flex-1 min-w-0 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <Link
                          href={`/product/${item.id}`}
                          onClick={closeCart}
                          className="font-moresugar font-bold text-xs sm:text-sm text-[var(--text-primary)] hover:text-[var(--text-brand)] line-clamp-1 transition-colors"
                        >
                          {item.title}
                        </Link>
                        <button
                          type="button"
                          onClick={() => removeFromCart(item.id)}
                          className="text-[var(--text-secondary)] hover:text-red-500 transition-colors p-1 -mr-1 cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>

                      {item.category && (
                        <p className="text-[10px] text-[var(--text-secondary)] capitalize font-sans">
                          {item.category.replace(/-/g, " ")}
                        </p>
                      )}
                    </div>

                    {/* Quantity & Unit Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center border border-[var(--border-color)] rounded-xl bg-[var(--card-bg)] p-0.5">
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--border-color)] transition-all cursor-pointer"
                          aria-label="Decrease quantity"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-7 text-center font-moresugar font-bold text-xs">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          disabled={item.stock !== undefined && item.quantity >= item.stock}
                          className="w-6 h-6 rounded-lg flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--border-color)] disabled:opacity-30 transition-all cursor-pointer"
                          aria-label="Increase quantity"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="font-moresugar font-bold text-sm text-[var(--text-brand)]">
                        ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                      </span>
                    </div>
                  </div>
                </div>
              ))}

              <div className="pt-2 flex justify-end">
                <button
                  type="button"
                  onClick={clearCart}
                  className="text-[11px] text-[var(--text-secondary)] hover:text-red-500 underline transition-colors cursor-pointer font-sans"
                >
                  Clear Cart
                </button>
              </div>
            </div>
          )}
        </div>

        {/* 4. Footer & Checkout Actions */}
        {items.length > 0 && (
          <div className="px-6 py-4 border-t border-[var(--border-color)] bg-[var(--bg-primary)] space-y-3">
            <div className="space-y-1.5 text-xs font-sans">
              <div className="flex items-center justify-between text-[var(--text-secondary)]">
                <span>Subtotal</span>
                <span className="font-bold text-[var(--text-primary)] font-moresugar text-sm">
                  ₹{subtotal.toLocaleString("en-IN")}
                </span>
              </div>
              <div className="flex items-center justify-between text-[var(--text-secondary)]">
                <span>Shipping</span>
                <span className="text-[var(--text-brand)] font-bold font-moresugar">
                  {subtotal >= 499 ? "FREE" : "Calculated at checkout"}
                </span>
              </div>
            </div>

            <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between">
              <span className="font-moresugar font-bold text-sm text-[var(--text-primary)]">
                Estimated Total
              </span>
              <span className="font-moresugar font-bold text-xl text-[var(--text-brand)]">
                ₹{subtotal.toLocaleString("en-IN")}
              </span>
            </div>

            <button
              type="button"
              onClick={handleCheckout}
              className="w-full flex items-center justify-center gap-2 py-3.5 rounded-full bg-[var(--btn-shop)] text-[var(--btn-shop-text)] font-moresugar font-bold text-sm hover:bg-[var(--btn-shop-hover)] active:scale-98 transition-all shadow-md cursor-pointer"
            >
              <span>Proceed to Checkout</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <div className="flex items-center justify-center gap-4 text-[10px] text-[var(--text-secondary)] pt-1">
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-[var(--text-brand)]" /> Safe & Secure
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <Truck className="w-3.5 h-3.5 text-[var(--text-brand)]" /> Fast Dispatch
              </span>
            </div>
          </div>
        )}
      </aside>
    </div>
  );
}
