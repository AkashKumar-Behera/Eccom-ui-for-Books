"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import {
  Sparkles,
  ShoppingBag,
  ArrowLeft,
  Loader2,
  ChevronRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  CheckCircle2,
  Plus,
  Minus,
  Share2,
} from "lucide-react";

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  images: string[];
  createdAt?: any;
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    async function fetchProduct() {
      try {
        const docRef = doc(db, "products", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setProduct({ id: docSnap.id, ...docSnap.data() } as Product);
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [id]);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <Navbar />
        <main className="flex-1 flex flex-col items-center justify-center py-32">
          <Loader2 className="w-10 h-10 animate-spin text-[var(--text-brand)] mb-4" />
          <p className="font-moresugar text-lg text-[var(--text-secondary)]">Loading product...</p>
        </main>
        <Footer />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-[var(--bg-primary)] text-[var(--text-primary)]">
        <Navbar />
        <main className="flex-1 max-w-lg mx-auto w-full px-6 py-24 text-center">
          <div className="w-16 h-16 rounded-full bg-red-500/10 text-red-500 flex items-center justify-center mx-auto mb-4">
            <ShoppingBag className="w-8 h-8" />
          </div>
          <h2 className="font-moresugar font-bold text-2xl text-[var(--text-primary)] mb-2">
            Product Not Found
          </h2>
          <p className="text-sm text-[var(--text-secondary)] mb-6">
            The product you are looking for may have been removed or is no longer available.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--btn-shop)] text-[var(--btn-shop-text)] font-bold text-sm font-moresugar"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
        </main>
        <Footer />
      </div>
    );
  }

  const hasImages = product.images && product.images.length > 0;
  const isOutOfStock = (product.stock || 0) <= 0;
  const isLowStock = (product.stock || 0) > 0 && (product.stock || 0) <= 5;

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-8 py-4 sm:py-12">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-1.5 sm:gap-2 text-[11px] sm:text-xs text-[var(--text-secondary)] mb-4 sm:mb-8 font-sans overflow-x-auto no-scrollbar whitespace-nowrap">
          <Link href="/" className="hover:text-[var(--text-brand)] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <Link href="/shop" className="hover:text-[var(--text-brand)] transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <Link
            href={`/category/${product.category}`}
            className="hover:text-[var(--text-brand)] transition-colors capitalize"
          >
            {product.category?.replace(/-/g, " ")}
          </Link>
          <ChevronRight className="w-3 h-3 sm:w-3.5 sm:h-3.5 shrink-0" />
          <span className="font-semibold text-[var(--text-primary)] truncate max-w-[120px] sm:max-w-xs">
            {product.title}
          </span>
        </nav>

        {/* Product Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-14">
          {/* Col 1: Images Gallery */}
          <div className="space-y-3 sm:space-y-4">
            {/* Main Big Image Preview */}
            <div className="relative aspect-square w-full rounded-2xl sm:rounded-3xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] shadow-sm">
              {hasImages ? (
                <Image
                  src={product.images[selectedImageIndex] || product.images[0]}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-5xl sm:text-6xl text-[var(--text-secondary)]">
                  🌸
                </div>
              )}

              {/* Status Badge */}
              <div className="absolute top-3 left-3 sm:top-4 sm:left-4">
                {isOutOfStock ? (
                  <span className="bg-red-500/90 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full uppercase tracking-wider backdrop-blur-xs font-moresugar">
                    Sold Out
                  </span>
                ) : isLowStock ? (
                  <span className="bg-amber-500/90 text-white text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full uppercase tracking-wider backdrop-blur-xs font-moresugar">
                    Only {product.stock} Left
                  </span>
                ) : (
                  <span className="bg-[var(--btn-shop)]/90 text-[var(--btn-shop-text)] text-[10px] sm:text-xs font-bold px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full uppercase tracking-wider backdrop-blur-xs font-moresugar">
                    In Stock
                  </span>
                )}
              </div>
            </div>

            {/* Thumbnails row */}
            {hasImages && product.images.length > 1 && (
              <div className="flex items-center gap-2 sm:gap-3 overflow-x-auto pb-2 no-scrollbar">
                {product.images.map((imgUrl, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setSelectedImageIndex(idx)}
                    className={`relative w-16 h-16 sm:w-20 sm:h-20 rounded-xl sm:rounded-2xl overflow-hidden border-2 transition-all shrink-0 cursor-pointer ${
                      selectedImageIndex === idx
                        ? "border-[var(--text-brand)] scale-105 shadow-sm"
                        : "border-[var(--border-color)] opacity-70 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={imgUrl}
                      alt={`Thumbnail ${idx + 1}`}
                      fill
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Col 2: Details & Buy Actions */}
          <div className="flex flex-col justify-between space-y-5 sm:space-y-6">
            <div className="space-y-3 sm:space-y-4">
              {/* Category tag & share */}
              <div className="flex items-center justify-between">
                <Link
                  href={`/category/${product.category}`}
                  className="inline-block px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full text-[10px] sm:text-xs font-bold uppercase tracking-wider bg-[var(--btn-shop)]/20 text-[var(--text-brand)] border border-[var(--btn-shop)]/30 font-moresugar"
                >
                  {product.category?.replace(/-/g, " ")}
                </Link>

                <button
                  type="button"
                  onClick={handleShare}
                  className="flex items-center gap-1.5 text-xs text-[var(--text-secondary)] hover:text-[var(--text-brand)] transition-colors p-1.5 rounded-full hover:bg-[var(--border-color)]"
                  title="Share product link"
                >
                  <Share2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
                  <span>{isCopied ? "Link Copied!" : "Share"}</span>
                </button>
              </div>

              {/* Title */}
              <h1 className="font-moresugar font-bold text-xl sm:text-3xl md:text-4xl text-[var(--text-primary)] leading-tight">
                {product.title}
              </h1>

              {/* Price */}
              <div className="flex items-baseline gap-2 sm:gap-3 pt-1">
                <span className="font-moresugar font-bold text-2xl sm:text-4xl text-[var(--text-brand)]">
                  ₹{Number(product.price || 0).toLocaleString("en-IN")}
                </span>
                <span className="text-[11px] sm:text-xs text-[var(--text-secondary)] font-medium">
                  (Inclusive of all taxes)
                </span>
              </div>

              {/* Description */}
              {product.description && (
                <div className="pt-3 border-t border-[var(--border-color)]">
                  <h3 className="text-[11px] sm:text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider mb-1.5 font-sans">
                    Product Description
                  </h3>
                  <p className="text-xs sm:text-sm text-[var(--text-primary)]/90 leading-relaxed font-sans whitespace-pre-line">
                    {product.description}
                  </p>
                </div>
              )}

              {/* Quantity Selector & Actions */}
              <div className="pt-4 space-y-3 sm:space-y-4">
                <div className="flex items-center gap-3 sm:gap-4">
                  <span className="text-xs font-bold text-[var(--text-secondary)] uppercase tracking-wider font-sans">
                    Quantity:
                  </span>
                  <div className="flex items-center border border-[var(--border-color)] rounded-xl sm:rounded-2xl bg-[var(--card-bg)] p-0.5 sm:p-1">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      disabled={quantity <= 1 || isOutOfStock}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--border-color)] disabled:opacity-30 transition-all cursor-pointer"
                    >
                      <Minus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                    <span className="w-8 sm:w-10 text-center font-moresugar font-bold text-sm sm:text-base">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(product.stock || 10, q + 1))}
                      disabled={quantity >= (product.stock || 1) || isOutOfStock}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg sm:rounded-xl flex items-center justify-center text-[var(--text-primary)] hover:bg-[var(--border-color)] disabled:opacity-30 transition-all cursor-pointer"
                    >
                      <Plus className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                    </button>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-2.5 sm:gap-3 pt-1">
                  <button
                    type="button"
                    onClick={() => product && addToCart(product, quantity)}
                    disabled={isOutOfStock}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 sm:px-8 sm:py-4 rounded-full bg-[var(--btn-shop)] text-[var(--btn-shop-text)] font-bold text-sm sm:text-base font-moresugar hover:opacity-90 active:scale-98 transition-all shadow-md disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>{isOutOfStock ? "Out of Stock" : "Add to Cart"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => product && addToCart(product, quantity)}
                    disabled={isOutOfStock}
                    className="flex-1 flex items-center justify-center gap-2 px-5 py-3 sm:px-8 sm:py-4 rounded-full bg-[var(--text-brand)] text-white font-bold text-sm sm:text-base font-moresugar hover:opacity-90 active:scale-98 transition-all shadow-md disabled:opacity-50 disabled:pointer-events-none cursor-pointer"
                  >
                    <Sparkles className="w-4 h-4 sm:w-5 sm:h-5" />
                    <span>Buy Now</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Trust Badges & Highlights */}
            <div className="grid grid-cols-3 gap-2 sm:gap-3 pt-4 sm:pt-6 border-t border-[var(--border-color)]">
              <div className="flex flex-col items-center text-center p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <Truck className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-brand)] mb-0.5 sm:mb-1" />
                <span className="text-[10px] sm:text-[11px] font-bold font-moresugar text-[var(--text-primary)]">
                  Fast Dispatch
                </span>
                <span className="text-[8px] sm:text-[9px] text-[var(--text-secondary)]">Within 2–3 Days</span>
              </div>

              <div className="flex flex-col items-center text-center p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <ShieldCheck className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-brand)] mb-0.5 sm:mb-1" />
                <span className="text-[10px] sm:text-[11px] font-bold font-moresugar text-[var(--text-primary)]">
                  100% Quality
                </span>
                <span className="text-[8px] sm:text-[9px] text-[var(--text-secondary)]">Premium Paper</span>
              </div>

              <div className="flex flex-col items-center text-center p-2 sm:p-3 rounded-xl sm:rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)]">
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5 text-[var(--text-brand)] mb-0.5 sm:mb-1" />
                <span className="text-[10px] sm:text-[11px] font-bold font-moresugar text-[var(--text-primary)]">
                  Cute Stationery
                </span>
                <span className="text-[8px] sm:text-[9px] text-[var(--text-secondary)]">Aesthetic Designs</span>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
