'use client';

import React, { useState } from 'react';
import { CartProvider, useCart } from '@/context/CartContext';
import { Navbar } from '@/components/Navbar';
import { Hero } from '@/components/Hero';
import { Catalog } from '@/components/Catalog';
import { Craftsmanship } from '@/components/Craftsmanship';
import { ProductModal } from '@/components/ProductModal';
import { CartDrawer } from '@/components/CartDrawer';
import { Footer } from '@/components/Footer';
import { InstagramFeedSection } from '@/components/InstagramFeedSection';
import { PRODUCTS, Product } from '@/data/products';
import { CheckCircle2 } from 'lucide-react';

function Storefront() {
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  const { notification } = useCart();

  return (
    <div className="min-h-screen bg-white text-[#0c4a6e] font-sans selection:bg-[#38bdf8] selection:text-white">
      
      {/* Toast Notification */}
      {notification && (
        <div className="fixed bottom-6 right-6 z-50 bg-white border border-[#bae6fd] text-[#0c4a6e] px-4 py-3 rounded-2xl shadow-2xl backdrop-blur-md flex items-center gap-3 animate-in fade-in slide-in-from-bottom-5">
          <div className="w-8 h-8 rounded-xl bg-[#e0f2fe] text-[#0284c7] flex items-center justify-center">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <span className="text-xs font-bold">{notification}</span>
        </div>
      )}

      {/* Header */}
      <Navbar />

      {/* Hero Section with Centered Video Carousel */}
      <Hero />

      {/* As Seen On Instagram Reels Showcase */}
      <InstagramFeedSection products={PRODUCTS} onQuickView={(p) => setQuickViewProduct(p)} />

      {/* Product Catalog */}
      <Catalog products={PRODUCTS} onQuickView={(p) => setQuickViewProduct(p)} />

      {/* Craftsmanship & Brand Story */}
      <Craftsmanship />

      {/* Quick View Modal */}
      <ProductModal
        product={quickViewProduct}
        onClose={() => setQuickViewProduct(null)}
      />

      {/* Shopping Cart Drawer */}
      <CartDrawer />

      {/* Footer */}
      <Footer />

    </div>
  );
}

export default function Home() {
  return (
    <CartProvider>
      <Storefront />
    </CartProvider>
  );
}
