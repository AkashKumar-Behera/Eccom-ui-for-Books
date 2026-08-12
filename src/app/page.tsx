"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { Search, User, ShoppingBag, Menu, ChevronDown, X } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import ThemeToggle from "@/components/ThemeToggle";

import { useAuth } from "@/context/AuthContext";

export default function Home() {
  const { user, logout } = useAuth();
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);

  // Lock background body scroll when side menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileMenuOpen]);

  const categories = [
    { name: "Notebooks", href: "/category/notebooks" },
    { name: "Journals", href: "/category/journals" },
    { name: "Weekly Planners", href: "/category/weekly-planners" },
    { name: "Mini Notepads", href: "/category/mini-notepads" },
    { name: "Colouring Books", href: "/category/colouring-books" },
    { name: "To-do-lists", href: "/category/to-do-lists" },
    { name: "Business Kit", href: "/category/business-kit" },
  ];

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* 1st Div: Top Offers Banner */}
      <div className="w-full bg-[var(--bg-banner)] text-[var(--text-banner)] py-1.5 px-4 text-center text-xs sm:text-sm font-semibold tracking-wide font-moresugar transition-colors">
        Flat 20% OFF Sitewide | Online Store for Cute Stationery, Notebooks & Planners
      </div>

      {/* 2nd Div: Navigation Bar */}
      <header className="w-full border-b border-[var(--border-color)] bg-[var(--bg-primary)] sticky top-0 z-40 transition-colors">
        <div className="w-full px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left Menu / Navigation Links (Width: 1/3) */}
          <div className="flex-1 flex items-center justify-start">
            <nav className="hidden min-[1300px]:flex items-center gap-6 text-xs sm:text-sm font-semibold tracking-wider text-[var(--text-secondary)] font-moresugar">
              
              {/* SHOP Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setIsShopOpen(true)}
                onMouseLeave={() => setIsShopOpen(false)}
              >
                <button
                  onClick={() => setIsShopOpen(!isShopOpen)}
                  className="bg-[var(--btn-shop)] text-[var(--btn-shop-text)] px-3.5 py-1.5 rounded transition-all hover:bg-[var(--btn-shop-hover)] flex items-center gap-1.5"
                >
                  SHOP
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isShopOpen ? "rotate-180" : ""}`} />
                </button>

                {/* Dropdown Menu Box */}
                {isShopOpen && (
                  <div className="absolute top-full left-0 mt-1 w-56 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl shadow-xl py-3 px-2 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    {categories.map((cat) => (
                      <a
                        key={cat.name}
                        href={cat.href}
                        className="block px-4 py-2 text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--text-brand)] hover:bg-[var(--border-color)] rounded-xl transition-all font-moresugar"
                      >
                        {cat.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a href="#" className="hover:text-[var(--text-brand)] transition-colors">
                NEW IN
              </a>
              <a href="#" className="hover:text-[var(--text-brand)] transition-colors">
                BESTSELLERS
              </a>
              <a href="#" className="hover:text-[var(--text-brand)] transition-colors">
                OUR DIARY
              </a>
            </nav>

            {/* Side Menu Hamburger Button (Appears when width < 1300px) */}
            <button
              onClick={() => setIsMobileMenuOpen(true)}
              className="min-[1300px]:hidden p-2 text-[var(--text-primary)] hover:text-[var(--text-brand)]"
              aria-label="Open Mobile Menu"
            >
              <Menu className="w-6 h-6" />
            </button>
          </div>

          {/* Logo Center (Width: 1/3, Perfectly Centered) */}
          <div className="flex-1 text-center">
            <a href="#" className="text-lg sm:text-2xl md:text-4xl font-bold tracking-normal sm:tracking-wider text-[var(--text-brand)] font-moresugar inline-block uppercase whitespace-nowrap">
              THE ABBIE STORE
            </a>
          </div>

          {/* Right Action Icons (Width: 1/3) */}
          <div className="flex-1 flex items-center justify-end gap-3 sm:gap-5 text-[var(--text-primary)]">
            {/* Theme Toggle Component in Navbar (Visible when width >= 950px) */}
            <div className="hidden min-[950px]:block">
              <ThemeToggle />
            </div>

            <button className="hover:text-[var(--text-brand)] transition-colors" aria-label="Search">
              <Search className="w-5 h-5" />
            </button>
            <button
              onClick={() => setIsAuthOpen(true)}
              className="hover:text-[var(--text-brand)] transition-colors hidden sm:block"
              aria-label="User Account"
            >
              <User className="w-5 h-5" />
            </button>
            <button className="hover:text-[var(--text-brand)] transition-colors relative" aria-label="Cart">
              <ShoppingBag className="w-5 h-5" />
              <span className="absolute -top-2 -right-2 bg-[var(--text-brand)] text-[var(--bg-primary)] text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-sans">
                0
              </span>
            </button>
          </div>
        </div>
      </header>

      {/* Navigation Drawer Overlay & Container (Triggers when width < 1300px) */}
      <div
        className={`fixed inset-0 z-50 min-[1300px]:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className={`fixed inset-0 bg-black/50 backdrop-blur-xs transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        ></div>

        {/* Sliding Side Drawer */}
        <div
          className={`relative w-4/5 max-w-xs bg-[var(--card-bg)] text-[var(--text-primary)] h-full shadow-2xl flex flex-col z-10 transition-all duration-300 ease-out transform no-scrollbar ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* Fixed Drawer Header */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-[var(--border-color)] bg-[var(--card-bg)]">
            <span className="text-lg font-bold text-[var(--text-brand)] font-moresugar">
              MENU
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Scrollable Content Body ONLY */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-6">
            {/* User Profile Avatar Section */}
            <div className="pb-6 border-b border-[var(--border-color)] flex flex-col items-center text-center">
              {user ? (
                <>
                  <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-[var(--border-color)] shadow-md mb-3 flex items-center justify-center bg-[var(--border-color)] text-[var(--text-brand)]">
                    {user.photoURL ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={user.photoURL}
                        alt="User Avatar"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <span className="text-2xl font-bold font-moresugar uppercase">
                        {(user.displayName || user.email || user.phoneNumber || "U")[0]}
                      </span>
                    )}
                  </div>
                  <h3 className="text-base font-bold text-[var(--text-brand)] font-moresugar truncate max-w-[200px]">
                    {user.displayName || "Welcome Back!"}
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] font-sans mt-0.5 truncate max-w-[200px]">
                    {user.email || user.phoneNumber}
                  </p>
                </>
              ) : (
                <>
                  <div className="w-16 h-16 rounded-full bg-[var(--bg-secondary)] border-2 border-dashed border-[var(--border-color)] mb-3 flex items-center justify-center text-[var(--text-secondary)]">
                    <User className="w-8 h-8" />
                  </div>
                  <h3 className="text-sm font-bold text-[var(--text-primary)] font-moresugar">
                    Guest User
                  </h3>
                  <p className="text-xs text-[var(--text-secondary)] font-sans mt-0.5">
                    Sign in to track orders & wishlist
                  </p>
                </>
              )}
            </div>

            {/* Mobile Shop Categories Accordion */}
            <div className="space-y-4 font-moresugar mt-4">
              <div className="border-b border-[var(--border-color)] pb-3">
                <button
                  onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                  className="w-full flex items-center justify-between py-1 text-[var(--text-brand)]"
                >
                  <span className="text-xs font-extrabold uppercase tracking-wider">
                    CATEGORIES
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 transition-transform duration-300 ${
                      isMobileCategoriesOpen ? "rotate-180" : ""
                    }`}
                  />
                </button>

                {/* Collapsible Categories List */}
                {isMobileCategoriesOpen && (
                  <div className="space-y-1 pl-2 pt-2 animate-in fade-in slide-in-from-top-1 duration-200">
                    {categories.map((cat) => (
                      <a
                        key={cat.name}
                        href={cat.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="block py-2 text-sm text-[var(--text-secondary)] hover:text-[var(--text-brand)] transition-colors"
                      >
                        {cat.name}
                      </a>
                    ))}
                  </div>
                )}
              </div>

              <a
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-sm text-[var(--text-primary)] hover:text-[var(--text-brand)]"
              >
                NEW IN
              </a>
              <a
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-sm text-[var(--text-primary)] hover:text-[var(--text-brand)]"
              >
                BESTSELLERS
              </a>
              <a
                href="#"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-sm text-[var(--text-primary)] hover:text-[var(--text-brand)]"
              >
                OUR DIARY
              </a>

              {/* Dedicated Theme Switcher Section in Side Drawer */}
              <div className="pt-4 border-t border-[var(--border-color)]">
                <span className="text-xs font-extrabold text-[var(--text-brand)] uppercase tracking-wider block mb-3">
                  THEME PREFERENCE
                </span>
                <div className="flex items-center gap-2">
                  <ThemeToggle showLabels={true} />
                </div>
              </div>
            </div>
          </div>

          {/* Fixed Drawer Footer (Conditional Button: Account/Sign In vs Logout) */}
          <div className="p-6 pt-4 border-t border-[var(--border-color)] bg-[var(--card-bg)]">
            {user ? (
              <button
                onClick={() => {
                  logout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 border border-red-500/30 py-3 rounded-full font-bold font-moresugar hover:bg-red-500/20 transition-all"
              >
                <User className="w-4 h-4" />
                Sign Out / Logout
              </button>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAuthOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[var(--btn-shop)] text-[var(--btn-shop-text)] py-3 rounded-full font-bold font-moresugar shadow-sm hover:bg-[var(--btn-shop-hover)] transition-all"
              >
                <User className="w-4 h-4" />
                Account / Sign In
              </button>
            )}
          </div>
        </div>
      </div>

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
                sizes="(max-width: 768px) 100vw, 25vw"
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
                sizes="(max-width: 768px) 100vw, 25vw"
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
                sizes="(max-width: 768px) 100vw, 50vw"
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
                sizes="(max-width: 768px) 100vw, 25vw"
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
                sizes="(max-width: 768px) 100vw, 25vw"
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
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
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
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
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
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
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
              sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, 25vw"
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

      {/* Footer Section */}
      <footer className="w-full border-t border-[var(--border-color)] bg-[var(--bg-primary)] py-8 px-4 sm:px-8 mt-12 transition-colors">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs sm:text-sm font-moresugar text-[var(--text-secondary)]">
          <p>© 2026 The Abbie Store. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy-policy" className="hover:text-[var(--text-brand)] transition-colors">
              Privacy Policy
            </a>
            <a href="/terms-and-conditions" className="hover:text-[var(--text-brand)] transition-colors">
              Terms & Conditions
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
