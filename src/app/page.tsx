"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Search, User, ShoppingBag, Menu } from "lucide-react";
import AuthModal from "@/components/AuthModal";

export default function Home() {
  const [isAuthOpen, setIsAuthOpen] = useState(false);

  return (
    <div className="min-h-screen flex flex-col font-sans bg-white text-zinc-900">
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* 1st Div: Top Offers Banner */}
      <div className="w-full bg-[#98C4C5] text-[#1E4B4C] py-2 px-4 text-center text-sm font-semibold tracking-wide font-moresugar">
        Flat 20% OFF Sitewide
      </div>

      {/* 2nd Div: Navigation Bar */}
      <header className="w-full border-b border-[#98C4C5]/30 bg-white sticky top-0 z-50">
        <div className="w-full px-4 sm:px-8 h-20 flex items-center justify-between">
          {/* Left Menu / Navigation Links (Width: 1/3) */}
          <div className="flex-1 flex items-center justify-start">
            <nav className="hidden md:flex items-center gap-6 text-xs sm:text-sm font-semibold tracking-wider text-zinc-700 font-moresugar">
              <a href="#" className="bg-[#98C4C5] text-[#1E4B4C] px-3.5 py-1.5 rounded transition-all hover:bg-[#7AB3B4]">
                SHOP
              </a>
              <a href="#" className="hover:text-[#2A6E70] transition-colors">
                NEW IN
              </a>
              <a href="#" className="hover:text-[#2A6E70] transition-colors">
                BESTSELLERS
              </a>
              <a href="#" className="hover:text-[#2A6E70] transition-colors">
                OUR DIARY
              </a>
            </nav>

            {/* Mobile Hamburger */}
            <button className="md:hidden p-2 text-zinc-700 hover:text-[#2A6E70]">
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Logo Center (Width: 1/3, Perfectly Centered) */}
          <div className="flex-1 text-center">
            <a href="#" className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-wider text-[#1E4B4C] font-moresugar inline-block uppercase">
              THE ABBIE STORE
            </a>
          </div>

          {/* Right Action Icons (Width: 1/3) */}
          <div className="flex-1 flex items-center justify-end gap-4 sm:gap-6 text-zinc-700">
            <button className="hover:text-[#2A6E70] transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="hover:text-[#2A6E70] transition-colors hidden sm:block"
              aria-label="User Account"
            >
              <User className="w-5 h-5" />
            </button>
            <button className="hover:text-[#2A6E70] transition-colors relative" aria-label="Cart">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-[#1E4B4C] text-white text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-sans">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* 3rd Div: Hero Banner Section (2078:757 Aspect Ratio with Natural Colors Hover Effect) */}
      <section className="group relative w-full aspect-[2078/757] overflow-hidden cursor-pointer">
        <Image
          src="/banner.png"
          alt="The Abbie Store Banner"
          width={2078}
          height={757}
          priority
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </section>

      {/* 4th Section: Happy Shopping Grid Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-5xl font-bold text-center text-[#1E4B4C] mb-8 sm:mb-12 font-moresugar">
          Happy Shopping!
        </h2>

        {/* Grid Container matching screenshot layout */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-stretch">
          
          {/* Left Column (Width: 3/12 on md screen, 2 Stacked Cards) */}
          <div className="md:col-span-3 flex flex-col gap-6">
            {/* Card 1: Journal Stickers */}
            <div className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-64 md:h-1/2 flex flex-col justify-end p-6 cursor-pointer">
              <Image
                src="/grid_stickers.png"
                alt="Journal Stickers"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="relative z-10 text-white">
                <h3 className="text-xl sm:text-2xl font-bold font-moresugar">Journal Stickers</h3>
                <p className="text-xs sm:text-sm text-zinc-200 font-sans mt-0.5">Explore Collection</p>
              </div>
            </div>

            {/* Card 2: Coloring Books */}
            <div className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-64 md:h-1/2 flex flex-col justify-end p-6 cursor-pointer">
              <Image
                src="/grid_coloring.png"
                alt="Coloring Books"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="relative z-10 text-white">
                <h3 className="text-xl sm:text-2xl font-bold font-moresugar">Coloring Books</h3>
                <p className="text-xs sm:text-sm text-zinc-200 font-sans mt-0.5">Explore Collection</p>
              </div>
            </div>
          </div>

          {/* Center Column (Width: 6/12 on md screen, 1 Main Featured Tall Card) */}
          <div className="md:col-span-6">
            <div className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-96 md:h-full min-h-[500px] flex flex-col justify-end p-8 cursor-pointer">
              <Image
                src="/grid_pouches.png"
                alt="Flat Pouches"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="relative z-10 text-white">
                <h3 className="text-3xl sm:text-4xl font-bold font-moresugar">Flat Pouches</h3>
                <p className="text-sm sm:text-base text-zinc-200 font-sans mt-1">Explore Collection</p>
              </div>
            </div>
          </div>

          {/* Right Column (Width: 3/12 on md screen, 2 Stacked Cards) */}
          <div className="md:col-span-3 flex flex-col gap-6">
            {/* Card 3: Laptop Sleeves */}
            <div className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-64 md:h-1/2 flex flex-col justify-end p-6 cursor-pointer">
              <Image
                src="/grid_laptop.png"
                alt="Laptop Sleeves"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="relative z-10 text-white">
                <h3 className="text-xl sm:text-2xl font-bold font-moresugar">Laptop Sleeves</h3>
                <p className="text-xs sm:text-sm text-zinc-200 font-sans mt-0.5">Explore Collection</p>
              </div>
            </div>

            {/* Card 4: Meal Planner */}
            <div className="group relative rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-64 md:h-1/2 flex flex-col justify-end p-6 cursor-pointer">
              <Image
                src="/grid_planner.png"
                alt="Meal Planner"
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
              <div className="relative z-10 text-white">
                <h3 className="text-xl sm:text-2xl font-bold font-moresugar">Meal Planner</h3>
                <p className="text-xs sm:text-sm text-zinc-200 font-sans mt-0.5">Explore Collection</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5th Section: 4-Column Feature Category Grid */}
      <section className="w-full py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-0">
          
          {/* Post 1: DESK ESSENTIALS */}
          <div className="group relative aspect-[3/4] sm:aspect-auto sm:h-[450px] md:h-[550px] overflow-hidden cursor-pointer">
            <Image
              src="/post_desk_essentials.png"
              alt="Desk Essentials"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
            <div className="absolute bottom-8 inset-x-0 text-center z-10">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-widest uppercase font-moresugar drop-shadow-md">
                DESK ESSENTIALS
              </h3>
            </div>
          </div>

          {/* Post 2: LIFESTYLE */}
          <div className="group relative aspect-[3/4] sm:aspect-auto sm:h-[450px] md:h-[550px] overflow-hidden cursor-pointer">
            <Image
              src="/post_lifestyle.png"
              alt="Lifestyle"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
            <div className="absolute bottom-8 inset-x-0 text-center z-10">
              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-widest uppercase font-moresugar drop-shadow-md">
                LIFESTYLE
              </h3>
            </div>
          </div>

          {/* Post 3: HOME DECOR */}
          <div className="group relative aspect-[3/4] sm:aspect-auto sm:h-[450px] md:h-[550px] overflow-hidden cursor-pointer">
            <Image
              src="/post_home_decor.png"
              alt="Home Decor"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
            <div className="absolute bottom-8 inset-x-0 text-center z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-widest uppercase font-moresugar drop-shadow-md">
                HOME DECOR
              </h3>
            </div>
          </div>

          {/* Post 4: MINDFUL PLANNING */}
          <div className="group relative aspect-[3/4] sm:aspect-auto sm:h-[450px] md:h-[550px] overflow-hidden cursor-pointer">
            <Image
              src="/post_mindful_planning.png"
              alt="Mindful Planning"
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent"></div>
            <div className="absolute bottom-8 inset-x-0 text-center z-10">
              <h3 className="text-xl sm:text-2xl font-bold text-white tracking-widest uppercase font-moresugar drop-shadow-md">
                MINDFUL PLANNING
              </h3>
            </div>
          </div>

        </div>
      </section>
    </div>
  );
}


