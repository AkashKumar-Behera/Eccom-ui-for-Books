"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { collection, onSnapshot, query } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Search, X, Sparkles, ChevronRight, Loader2, PackageOpen } from "lucide-react";

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  images: string[];
}

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [queryText, setQueryText] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // 1. Fetch products from Firestore
  useEffect(() => {
    if (!isOpen) return;

    try {
      const unsubscribe = onSnapshot(collection(db, "products"), (snapshot) => {
        const items = snapshot.docs.map((docSnap) => ({
          id: docSnap.id,
          ...docSnap.data(),
        })) as Product[];
        setProducts(items);
        setLoading(false);
      });
      return () => unsubscribe();
    } catch (e) {
      console.warn("Could not load products for search:", e);
      setLoading(false);
    }
  }, [isOpen]);

  // 2. Keyboard listener for Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // 3. Lock scroll when modal is open
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

  if (!isOpen) return null;

  const filtered = products.filter((p) => {
    const q = queryText.toLowerCase().trim();
    if (!q) return true;
    return (
      p.title?.toLowerCase().includes(q) ||
      p.category?.toLowerCase().includes(q) ||
      p.description?.toLowerCase().includes(q)
    );
  });

  const popularTags = [
    { label: "Our Diary", slug: "our-diary" },
    { label: "Notebooks", slug: "notebooks" },
    { label: "Journals", slug: "journals" },
    { label: "Weekly Planners", slug: "weekly-planners" },
    { label: "Colouring Books", slug: "colouring-books" },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 px-4">
      {/* Backdrop */}
      <div
        onClick={onClose}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity animate-in fade-in duration-200"
      />

      {/* Modal Container */}
      <div className="relative w-full max-w-2xl bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl shadow-2xl overflow-hidden z-10 animate-in zoom-in-95 duration-200 flex flex-col max-h-[80vh]">
        {/* Search Input Bar */}
        <div className="p-4 sm:p-5 border-b border-[var(--border-color)] flex items-center gap-3 bg-[var(--bg-primary)]">
          <Search className="w-5 h-5 text-[var(--text-brand)] shrink-0" />
          <input
            type="text"
            autoFocus
            value={queryText}
            onChange={(e) => setQueryText(e.target.value)}
            placeholder="Search cute stationery, planners, journals..."
            className="w-full bg-transparent text-sm sm:text-base font-sans text-[var(--text-primary)] placeholder-[var(--text-secondary)] focus:outline-none"
          />
          {queryText && (
            <button
              onClick={() => setQueryText("")}
              className="p-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-primary)] rounded-full hover:bg-[var(--border-color)]"
            >
              Clear
            </button>
          )}
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            aria-label="Close search"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Quick Suggestion Tags */}
        <div className="px-4 py-2.5 bg-[var(--bg-secondary)] border-b border-[var(--border-color)] flex items-center gap-2 overflow-x-auto no-scrollbar">
          <span className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-secondary)] font-sans shrink-0">
            Popular:
          </span>
          {popularTags.map((tag) => (
            <button
              key={tag.slug}
              onClick={() => setQueryText(tag.label)}
              className="px-2.5 py-1 rounded-full text-[11px] font-bold font-moresugar bg-[var(--card-bg)] text-[var(--text-primary)] border border-[var(--border-color)] hover:border-[var(--btn-shop)] whitespace-nowrap transition-all"
            >
              {tag.label}
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-2 no-scrollbar">
          {loading ? (
            <div className="py-12 text-center text-[var(--text-secondary)]">
              <Loader2 className="w-6 h-6 animate-spin text-[var(--text-brand)] mx-auto mb-2" />
              <p className="font-moresugar text-xs">Searching store catalog...</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="py-12 text-center text-[var(--text-secondary)] space-y-2">
              <PackageOpen className="w-10 h-10 mx-auto opacity-50" />
              <p className="font-moresugar font-bold text-sm text-[var(--text-primary)]">
                No matching stationery found
              </p>
              <p className="text-xs font-sans">
                Try searching for &quot;Notebook&quot;, &quot;Diary&quot;, or &quot;Planner&quot;.
              </p>
            </div>
          ) : (
            filtered.map((product) => {
              const hasImage = product.images && product.images.length > 0;
              return (
                <Link
                  key={product.id}
                  href={`/product/${product.id}`}
                  onClick={onClose}
                  className="flex items-center gap-3.5 p-2.5 rounded-2xl bg-[var(--bg-primary)] border border-[var(--border-color)] hover:border-[var(--btn-shop)] transition-all group"
                >
                  <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] shrink-0">
                    {hasImage ? (
                      <Image
                        src={product.images[0]}
                        alt={product.title}
                        fill
                        sizes="48px"
                        className="object-cover group-hover:scale-105 transition-transform"
                      />
                    ) : (
                      <div className="w-full h-full flex items-center justify-center text-lg">
                        🌸
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span className="text-[9px] font-bold uppercase tracking-wider text-[var(--text-secondary)] block">
                      {product.category?.replace(/-/g, " ")}
                    </span>
                    <h4 className="font-moresugar font-bold text-xs sm:text-sm text-[var(--text-primary)] group-hover:text-[var(--text-brand)] truncate transition-colors">
                      {product.title}
                    </h4>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="font-moresugar font-bold text-xs sm:text-sm text-[var(--text-brand)] block">
                      ₹{Number(product.price || 0).toLocaleString("en-IN")}
                    </span>
                    <span className="text-[9px] text-[var(--text-secondary)] flex items-center justify-end gap-0.5 group-hover:text-[var(--text-brand)]">
                      View <ChevronRight className="w-2.5 h-2.5" />
                    </span>
                  </div>
                </Link>
              );
            })
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-3 bg-[var(--bg-secondary)] border-t border-[var(--border-color)] text-center text-[10px] text-[var(--text-secondary)] font-sans flex items-center justify-between px-5">
          <span>{filtered.length} products found</span>
          <span className="hidden sm:inline">Press Esc to close</span>
        </div>
      </div>
    </div>
  );
}
