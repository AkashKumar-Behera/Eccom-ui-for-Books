"use client";

import React, { useEffect, useState, useMemo, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";
import Navbar, { SHOP_CATEGORIES } from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "@/context/WishlistContext";
import {
  Sparkles,
  ShoppingBag,
  Search,
  PackageOpen,
  Loader2,
  ChevronRight,
  Eye,
  SlidersHorizontal,
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

const CATEGORY_FILTERS = [
  { id: "all", name: "All Products" },
  { id: "our-diary", name: "Our Diary" },
  { id: "notebooks", name: "Notebooks" },
  { id: "journals", name: "Journals" },
  { id: "weekly-planners", name: "Weekly Planners" },
  { id: "mini-notepads", name: "Mini Notepads" },
  { id: "colouring-books", name: "Colouring Books" },
  { id: "to-do-lists", name: "To-Do Lists" },
  { id: "business-kit", name: "Business Kit" },
  { id: "customized-products", name: "Custom Studio" },
];

function ShopContent() {
  const { addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const searchParams = useSearchParams();
  const initialCategory = searchParams.get("category") || "all";

  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "price-low" | "price-high">("featured");

  useEffect(() => {
    try {
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items: Product[] = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          })) as Product[];
          setProducts(items);
          setLoading(false);
        },
        (err) => {
          console.warn("Falling back to unordered query:", err);
          const fallbackUnsub = onSnapshot(collection(db, "products"), (snapshot) => {
            const items: Product[] = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
            })) as Product[];
            setProducts(items);
            setLoading(false);
          });
          return () => fallbackUnsub();
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Failed to load products:", err);
      setLoading(false);
    }
  }, []);

  const filteredProducts = useMemo(() => {
    let result = products.filter((p) => {
      const matchesCategory =
        selectedCategory === "all" ||
        p.category?.toLowerCase() === selectedCategory.toLowerCase() ||
        p.category?.toLowerCase().replace(/\s+/g, "-") === selectedCategory.toLowerCase();

      const matchesSearch =
        !searchQuery.trim() ||
        p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.description?.toLowerCase().includes(searchQuery.toLowerCase());

      return matchesCategory && matchesSearch;
    });

    if (sortBy === "price-low") {
      result.sort((a, b) => (a.price || 0) - (b.price || 0));
    } else if (sortBy === "price-high") {
      result.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    return result;
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-3 sm:px-8 py-6 sm:py-12">
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto mb-6 sm:mb-10 space-y-1.5">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold font-moresugar bg-[var(--btn-shop)]/25 text-[var(--text-brand)]">
            <Sparkles className="w-3.5 h-3.5" /> All Stationery Collections
          </span>
          <h1 className="font-moresugar font-bold text-2xl sm:text-4xl md:text-5xl text-[var(--text-brand)] tracking-wide">
            Explore The Shop
          </h1>
          <p className="text-xs sm:text-base text-[var(--text-secondary)] font-sans">
            Handmade with love, aesthetic pastel designs, and premium paper quality.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-2.5 mb-5 sm:mb-8 no-scrollbar">
          {CATEGORY_FILTERS.map((cat) => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-3.5 py-1.5 sm:px-4 sm:py-2 rounded-full text-[11px] sm:text-xs font-bold font-moresugar whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? "bg-[var(--btn-shop)] text-[var(--btn-shop-text)] shadow-xs scale-105"
                    : "bg-[var(--card-bg)] text-[var(--text-secondary)] hover:text-[var(--text-brand)] border border-[var(--border-color)]"
                }`}
              >
                {cat.name}
              </button>
            );
          })}
        </div>

        {/* Toolbar: Search, Sort & Counter */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5 sm:mb-8 pb-3 sm:pb-4 border-b border-[var(--border-color)]">
          {/* Search Box */}
          <div className="relative w-full sm:w-72">
            <Search className="w-3.5 h-3.5 sm:w-4 sm:h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-secondary)]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search products..."
              className="w-full bg-[var(--card-bg)] border border-[var(--border-color)] rounded-full pl-9 pr-4 py-1.5 sm:py-2 text-xs font-sans text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none focus:border-[var(--btn-shop)]"
            />
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-3 w-full sm:w-auto">
            <span className="text-[11px] sm:text-xs font-semibold text-[var(--text-secondary)] font-sans">
              {filteredProducts.length} Product{filteredProducts.length !== 1 ? "s" : ""}
            </span>

            <div className="flex items-center gap-2">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="bg-[var(--card-bg)] border border-[var(--border-color)] text-[11px] sm:text-xs font-semibold text-[var(--text-primary)] rounded-full px-3 py-1.5 sm:py-2 focus:outline-none focus:border-[var(--btn-shop)] cursor-pointer"
              >
                <option value="featured">Featured / Latest</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="py-24 flex flex-col items-center justify-center text-[var(--text-secondary)]">
            <Loader2 className="w-8 h-8 animate-spin text-[var(--text-brand)] mb-3" />
            <p className="font-moresugar text-base">Loading products...</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="py-16 text-center rounded-3xl border border-dashed border-[var(--border-color)] bg-[var(--card-bg)]/40 p-6 sm:p-8 max-w-lg mx-auto">
            <div className="w-14 h-14 rounded-full bg-[var(--btn-shop)]/20 text-[var(--text-brand)] flex items-center justify-center mx-auto mb-3">
              <PackageOpen className="w-7 h-7" />
            </div>
            <h3 className="font-moresugar font-bold text-lg sm:text-xl text-[var(--text-primary)] mb-1">
              No Products Found
            </h3>
            <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-4">
              {searchQuery
                ? `No products match "${searchQuery}". Try a different keyword.`
                : "No products in this category yet. New items are arriving soon!"}
            </p>
            {(searchQuery || selectedCategory !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("all");
                }}
                className="px-5 py-2 rounded-full bg-[var(--btn-shop)] text-[var(--btn-shop-text)] font-bold text-xs font-moresugar"
              >
                Reset Filters
              </button>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-2.5 sm:gap-6">
            {filteredProducts.map((product) => {
              const hasImage = product.images && product.images.length > 0;
              const isOutOfStock = (product.stock || 0) <= 0;
              const isWishlisted = isInWishlist(product.id);

              return (
                <div
                  key={product.id}
                  className="group flex flex-col bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl sm:rounded-3xl overflow-hidden shadow-2xs hover:shadow-lg transition-all duration-300 hover:-translate-y-1"
                >
                  {/* Image */}
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
                          🌸
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

                    {isOutOfStock && (
                      <span className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-red-500/90 text-white text-[9px] sm:text-[10px] font-bold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full uppercase tracking-wider backdrop-blur-xs font-moresugar">
                        Sold Out
                      </span>
                    )}
                  </div>

                  {/* Info */}
                  <div className="p-2.5 sm:p-5 flex-1 flex flex-col justify-between space-y-2 sm:space-y-3">
                    <div>
                      <span className="text-[9px] sm:text-[10px] font-bold text-[var(--text-secondary)] uppercase tracking-wider block mb-0.5 sm:mb-1">
                        {product.category?.replace(/-/g, " ")}
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

export default function ShopPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[var(--bg-primary)]">
          <Loader2 className="w-8 h-8 animate-spin text-[var(--text-brand)]" />
        </div>
      }
    >
      <ShopContent />
    </Suspense>
  );
}
