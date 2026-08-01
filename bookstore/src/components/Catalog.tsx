'use client';

import React, { useState } from 'react';
import { Product, CATEGORIES } from '@/data/products';
import { ProductCard } from './ProductCard';
import { Filter, Search, SlidersHorizontal, BookOpen, Feather, Calendar, Palette, Briefcase } from 'lucide-react';

interface CatalogProps {
  products: Product[];
  onQuickView: (product: Product) => void;
}

export const Catalog: React.FC<CatalogProps> = ({ products, onQuickView }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-low' | 'price-high' | 'rating'>('featured');

  const categories = ['All', 'Notebooks', 'Pens & Writing', 'Planner & Diaries', 'Art Supplies', 'Office Accessories'];

  const getCategoryIcon = (iconName: string) => {
    switch (iconName) {
      case 'BookOpen': return <BookOpen className="w-5 h-5" />;
      case 'Feather': return <Feather className="w-5 h-5" />;
      case 'Calendar': return <Calendar className="w-5 h-5" />;
      case 'Palette': return <Palette className="w-5 h-5" />;
      case 'Briefcase': return <Briefcase className="w-5 h-5" />;
      default: return <BookOpen className="w-5 h-5" />;
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'All' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          p.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortBy === 'price-low') return a.price - b.price;
    if (sortBy === 'price-high') return b.price - a.price;
    if (sortBy === 'rating') return b.rating - a.rating;
    return 0;
  });

  return (
    <section id="catalog" className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs uppercase font-bold text-[#0284c7] tracking-widest mb-2">Curated Aesthetic Collections</h2>
          <h3 className="text-3xl sm:text-5xl font-serif font-bold text-[#0c4a6e] tracking-tight">
            Pastel Journals & Fine Stationery
          </h3>
          <p className="mt-3 text-slate-600 text-sm sm:text-base font-normal">
            Each item is designed with bleed-proof paper, soft pastel colors, and cute detail for journaling & daily focus.
          </p>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4 mb-16">
          {CATEGORIES.map((cat) => (
            <div
              key={cat.id}
              onClick={() => setSelectedCategory(cat.name)}
              className={`group relative overflow-hidden rounded-3xl p-5 border transition-all duration-300 cursor-pointer ${
                selectedCategory === cat.name
                  ? 'border-[#0284c7] bg-white shadow-lg ring-2 ring-[#38bdf8]/30 scale-102'
                  : 'border-slate-200 bg-white hover:border-[#0284c7]/60 hover:shadow-md'
              }`}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="p-2.5 rounded-2xl bg-slate-50 text-[#0284c7]">
                  {getCategoryIcon(cat.iconName)}
                </div>
                <span className="text-[11px] font-bold text-[#0284c7] bg-slate-50 border border-slate-200 px-2.5 py-0.5 rounded-full">
                  {cat.count} items
                </span>
              </div>
              <h4 className="font-serif font-bold text-[#0c4a6e] text-sm group-hover:text-[#0284c7] transition-colors">
                {cat.name}
              </h4>
              <p className="text-[11px] text-slate-500 line-clamp-1 mt-1 font-sans font-normal">
                {cat.description}
              </p>
            </div>
          ))}
        </div>

        {/* Filter Bar */}
        <div className="bg-white border border-slate-200 rounded-3xl p-4 mb-8 flex flex-col md:flex-row items-center justify-between gap-4 shadow-xs">
          
          <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 scrollbar-none">
            <span className="text-xs text-[#0c4a6e] font-bold flex items-center gap-1 mr-2">
              <Filter className="w-3.5 h-3.5" /> Category:
            </span>
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-2xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedCategory === cat
                    ? 'bg-[#0284c7] text-white shadow-sm'
                    : 'bg-slate-50 text-[#0c4a6e] hover:text-[#0284c7] hover:bg-slate-100'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Search & Sort */}
          <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
            <div className="relative flex-1 md:w-60">
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#f8fafc] border border-slate-200 rounded-2xl pl-9 pr-3 py-2.5 text-xs text-[#0c4a6e] placeholder-slate-400 focus:outline-none focus:border-[#0284c7] transition-colors"
              />
            </div>

            <div className="flex items-center gap-1 bg-[#f8fafc] border border-slate-200 rounded-2xl px-3 py-2 text-xs text-slate-700 font-semibold">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#0c4a6e] mr-1" />
              <select
                value={sortBy}
                onChange={(e: unknown) => setSortBy((e as React.ChangeEvent<HTMLSelectElement>).target.value as unknown as typeof sortBy)}
                className="bg-transparent text-[#0c4a6e] focus:outline-none cursor-pointer font-bold"
              >
                <option value="featured" className="bg-white">Sort: Featured</option>
                <option value="price-low" className="bg-white">Price: Low to High</option>
                <option value="price-high" className="bg-white">Price: High to Low</option>
                <option value="rating" className="bg-white">Highest Rated</option>
              </select>
            </div>
          </div>

        </div>

        {/* Product Grid */}
        {sortedProducts.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-3xl border border-slate-200">
            <BookOpen className="w-12 h-12 text-[#0284c7] mx-auto mb-3" />
            <h3 className="text-lg font-serif font-bold text-[#0c4a6e]">No products found</h3>
            <p className="text-xs text-slate-500 mt-1">Try adjusting your search criteria.</p>
            <button
              onClick={() => {
                setSelectedCategory('All');
                setSearchQuery('');
              }}
              className="mt-4 px-5 py-2.5 bg-[#0284c7] text-white rounded-2xl text-xs font-bold shadow-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {sortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} onQuickView={onQuickView} />
            ))}
          </div>
        )}

      </div>
    </section>
  );
};
