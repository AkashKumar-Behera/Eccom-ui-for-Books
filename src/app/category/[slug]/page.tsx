"use client";

import React, { useEffect, useState, use } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, query, where, onSnapshot, getDocs } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  Sparkles,
  ShoppingBag,
  ArrowLeft,
  SlidersHorizontal,
  PackageOpen,
  Loader2,
  ChevronRight,
  Eye,
  Heart,
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

// Map slugs to display meta
const CATEGORY_META: Record<
  string,
  { title: string; subtitle: string; icon: string; bgGradient: string }
> = {
  "our-diary": {
    title: "Our Diary",
    subtitle: "Special handcrafted diaries to preserve your thoughts, stories, and daily wonders.",
    icon: "📖",
    bgGradient: "from-purple-500/15 via-purple-500/5 to-transparent",
  },
  notebooks: {
    title: "Notebooks",
    subtitle: "Durable, high-quality, aesthetic notebooks for everyday notes & thoughts.",
    icon: "📓",
    bgGradient: "from-[#98C4C5]/20 via-[#98C4C5]/5 to-transparent",
  },
  journals: {
    title: "Journals",
    subtitle: "Capture your deepest reflections, dreams, and memories in style.",
    icon: "📔",
    bgGradient: "from-pink-500/15 via-pink-500/5 to-transparent",
  },
  "mini-notepads": {
    title: "Mini Notepads",
    subtitle: "Compact pocket-sized pads for quick ideas on the go.",
    icon: "📝",
    bgGradient: "from-amber-500/15 via-amber-500/5 to-transparent",
  },
  "weekly-planners": {
    title: "Weekly Planners",
    subtitle: "Stay on top of your week, habits, and goals with structured layouts.",
    icon: "📅",
    bgGradient: "from-blue-500/15 via-blue-500/5 to-transparent",
  },
  "to-do-lists": {
    title: "To-Do Lists",
    subtitle: "Organize daily priorities and crush your goals one checkmark at a time.",
    icon: "✅",
    bgGradient: "from-emerald-500/15 via-emerald-500/5 to-transparent",
  },
  "colouring-books": {
    title: "Stress-Relief Colouring Books",
    subtitle: "Unwind, relax, and spark your inner creativity with intricate designs.",
    icon: "🎨",
    bgGradient: "from-purple-500/15 via-purple-500/5 to-transparent",
  },
  "business-kit": {
    title: "Business Kit",
    subtitle: "Professional stationery essentials curated for meetings and productivity.",
    icon: "💼",
    bgGradient: "from-teal-500/15 via-teal-500/5 to-transparent",
  },
  "customized-notebook": {
    title: "Customized Notebooks",
    subtitle: "Personalize your cover, name, and style for a one-of-a-kind stationery piece.",
    icon: "✨",
    bgGradient: "from-rose-500/15 via-rose-500/5 to-transparent",
  },
  "customized-journal": {
    title: "Customized Journals",
    subtitle: "Your personal story deserve a custom designed journal cover.",
    icon: "✨",
    bgGradient: "from-violet-500/15 via-violet-500/5 to-transparent",
  },
  "customized-business-kit": {
    title: "Customized Business Kits",
    subtitle: "Custom branded corporate stationery tailored to your business identity.",
    icon: "💼",
    bgGradient: "from-cyan-500/15 via-cyan-500/5 to-transparent",
  },
  "customized-products": {
    title: "Customized Studio",
    subtitle: "Handcrafted personalized stationery made especially for you.",
    icon: "✨",
    bgGradient: "from-[#98C4C5]/20 via-[#98C4C5]/5 to-transparent",
  },
};

export default function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high" | "newest">("featured");

  const meta = CATEGORY_META[slug] || {
    title: slug.replace(/-/g, " ").replace(/\b\w/g, (l) => l.toUpperCase()),
    subtitle: "Explore our curated collection crafted with love & aesthetics.",
    icon: "🌸",
    bgGradient: "from-[#98C4C5]/15 via-transparent to-transparent",
  };

  useEffect(() => {
    setLoading(true);

    try {
      // Listen to products where category matches this slug
      const q = query(collection(db, "products"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const allItems: Product[] = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as Product[];

        // Filter products for this category
        const filtered = allItems.filter(
          (p) =>
            p.category?.toLowerCase() === slug.toLowerCase() ||
            p.category?.toLowerCase().replace(/\s+/g, "-") === slug.toLowerCase()
        );

        setProducts(filtered);
        setLoading(false);
      });

      return () => unsubscribe();
    } catch (err) {
      console.error("Failed to fetch category products:", err);
      setLoading(false);
    }
  }, [slug]);

  // Sorted Products
  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "price-low") return (a.price || 0) - (b.price || 0);
    if (sortBy === "price-high") return (b.price || 0) - (a.price || 0);
    return 0;
  });

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12">
        {/* Breadcrumb navigation */}
        <nav className="flex items-center gap-2 text-xs text-[var(--text-secondary)] mb-6 font-sans">
          <Link href="/" className="hover:text-[var(--text-brand)] transition-colors">
            Home
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <Link href="/shop" className="hover:text-[var(--text-brand)] transition-colors">
            Shop
          </Link>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="font-semibold text-[var(--text-primary)] capitalize">
            {meta.title}
          </span>
        </nav>

        {/* Category Hero Banner */}
        <div
          className={`relative rounded-3xl bg-gradient-to-r ${meta.bgGradient} border border-[var(--border-color)] p-6 sm:p-10 mb-10 overflow-hidden shadow-xs`}
        >
          <div className="relative z-10 max-w-2xl">
            <span className="text-3xl sm:text-4xl mb-3 block">{meta.icon}</span>
            <h1 className="font-moresugar font-bold text-3xl sm:text-4xl text-[var(--text-brand)] tracking-wide mb-2">
              {meta.title}
            </h1>
            <p className="text-sm sm:text-base text-[var(--text-secondary)] font-sans leading-relaxed">
              {meta.subtitle}
            </p>
          </div>
        </div>

        {/* Toolbar: Counter & Sort */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--border-color)]">
          <p className="text-xs sm:text-sm font-semibold text-[var(--text-secondary)] font-sans">
            Showing <span className="text-[var(--text-primary)] font-bold">{products.length}</span>{" "}
            item{products.length !== 1 ? "s" : ""}
          </p>

          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold text-[var(--text-secondary)] font-sans">
              Sort by:
            </span>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="bg-[var(--card-bg)] border border-[var(--border-color)] text-xs font-semibold text-[var(--text-primary)] rounded-full px-3.5 py-2 focus:outline-none focus:border-[var(--btn-shop)] cursor-pointer"
            >
              <option value="featured">Featured / Latest</option>
              <option value="price-low">Price: Low to High</option>
              <option value="price-high">Price: High to Low</option>
            </select>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-[var(--text-secondary)]">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--text-brand)] mb-3" />
            <p className="font-moresugar text-base">Loading collection...</p>
          </div>
        ) : sortedProducts.length === 0 ? (
          <div className="py-20 text-center rounded-3xl border border-dashed border-[var(--border-color)] bg-[var(--card-bg)]/40 p-8 max-w-lg mx-auto">
            <div className="w-16 h-16 rounded-full bg-[var(--btn-shop)]/20 text-[var(--text-brand)] flex items-center justify-center mx-auto mb-4">
              <PackageOpen className="w-8 h-8" />
            </div>
            <h3 className="font-moresugar font-bold text-xl text-[var(--text-primary)] mb-2">
              No Products in this Collection Yet
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6">
              We&apos;re crafting new cute stationery items for this category! Check back soon or
              explore our other collections.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--btn-shop)] text-[var(--btn-shop-text)] font-bold text-xs font-moresugar hover:opacity-90 transition-all shadow-xs"
            >
              <ArrowLeft className="w-4 h-4" /> Explore All Products
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {sortedProducts.map((product) => {
              const hasImage = product.images && product.images.length > 0;
              const isOutOfStock = (product.stock || 0) <= 0;
              const isWishlisted = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="group flex flex-col bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Product Image */}
                  <div className="relative aspect-square w-full bg-[var(--bg-secondary)] overflow-hidden block">
                    <Link href={`/product/${product.id}`} className="block w-full h-full">
                      {hasImage ? (
                        <Image
                          src={product.images[0]}
                          alt={product.title}
                          fill
                          sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-3xl sm:text-4xl">
                          {meta.icon}
                        </div>
                      )}
                    </Link>

                    {/* Wishlist Button */}
                    <button
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        toggleWishlist(product.id);
                      }}
                      className={`absolute top-2 right-2 sm:top-3 sm:right-3 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center backdrop-blur-md transition-all shadow-xs z-10 cursor-pointer ${
                        isWishlisted
                          ? "bg-rose-500 text-white"
                          : "bg-black/30 hover:bg-black/50 text-white"
                      }`}
                      title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                    >
                      <Heart className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isWishlisted ? "fill-current" : ""}`} />
                    </button>

                    {/* Stock Status Badge */}
                    {isOutOfStock ? (
                      <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-500/90 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase tracking-wider backdrop-blur-xs font-moresugar">
                        Sold Out
                      </span>
                    ) : (
                      <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[var(--btn-shop)]/90 text-[var(--btn-shop-text)] text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase tracking-wider backdrop-blur-xs font-moresugar">
                        In Stock
                      </span>
                    )}
                  </div>

                  {/* Product Content */}
                  <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider block mb-0.5 sm:mb-1">
                        {meta.title}
                      </span>
                      <Link href={`/product/${product.id}`}>
                        <h4 className="font-bold text-xs sm:text-base text-[var(--text-primary)] line-clamp-2 leading-tight hover:text-[var(--text-brand)] transition-colors font-sans">
                          {product.title}
                        </h4>
                      </Link>
                    </div>

                    <div className="pt-1.5 sm:pt-2 border-t border-[var(--border-color)] flex items-center justify-between gap-1">
                      <div className="min-w-0">
                        <span className="text-[9px] sm:text-[10px] text-[var(--text-secondary)] block">
                          Price
                        </span>
                        <span className="font-moresugar font-bold text-xs sm:text-xl text-[var(--text-brand)] truncate block">
                          ₹{Number(product.price || 0).toLocaleString("en-IN")}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 shrink-0">
                        <Link
                          href={`/product/${product.id}`}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] flex items-center justify-center hover:bg-[var(--border-color)] transition-all"
                          title="View Details"
                        >
                          <Eye className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </Link>
                        <button
                          type="button"
                          onClick={() => addToCart(product, 1)}
                          disabled={isOutOfStock}
                          className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[var(--btn-shop)] text-[var(--btn-shop-text)] flex items-center justify-center hover:scale-110 active:scale-95 transition-all shadow-2xs disabled:opacity-40 disabled:pointer-events-none cursor-pointer"
                          title="Add to Bag"
                        >
                          <ShoppingBag className="w-3 h-3 sm:w-3.5 sm:h-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
