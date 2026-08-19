"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Search, User, ShoppingCart, Menu, ChevronDown, X } from "lucide-react";
import AuthModal from "@/components/AuthModal";
import ThemeToggle from "@/components/ThemeToggle";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";

export const SHOP_CATEGORIES = [
  {
    title: "WRITE & NOTE",
    items: [
      { name: "Our Diary", href: "/category/our-diary" },
      { name: "Notebooks", href: "/category/notebooks" },
      { name: "Journals", href: "/category/journals" },
      { name: "Mini Notepads", href: "/category/mini-notepads" },
    ],
  },
  {
    title: "PLAN & ORGANISE",
    items: [
      { name: "Weekly Planners", href: "/category/weekly-planners" },
      { name: "To-Do Lists", href: "/category/to-do-lists" },
    ],
  },
  {
    title: "RELAX & COLOUR",
    items: [
      { name: "Stress-Relief Colouring Books", href: "/category/colouring-books" },
    ],
  },
  {
    title: "BUSINESS ESSENTIALS",
    items: [
      { name: "Business Kit", href: "/category/business-kit" },
    ],
  },
  {
    title: "CUSTOM STUDIO",
    items: [
      { name: "Customized Notebook", href: "/category/customized-notebook" },
      { name: "Customized Journal", href: "/category/customized-journal" },
      { name: "Customized Business Kit", href: "/category/customized-business-kit" },
    ],
  },
];

export default function Navbar() {
  const { user, logout } = useAuth();
  const { openCart, totalItems } = useCart();
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

  return (
    <>
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* Main Header */}
      <header className="w-full border-b border-[var(--border-color)] bg-[var(--bg-primary)] sticky top-0 z-40 transition-colors shadow-2xs backdrop-blur-md">
        <div className="w-full px-2.5 sm:px-8 h-14 sm:h-20 flex items-center justify-between gap-2">
          {/* Left Menu / Navigation Links */}
          <div className="flex-1 lg:flex-1 flex items-center justify-start min-w-0">
            <nav className="hidden lg:flex items-center gap-6 text-xs sm:text-sm font-semibold tracking-wider text-[var(--text-secondary)] font-moresugar">
              {/* SHOP Dropdown */}
              <div
                className="relative group py-2"
                onMouseEnter={() => setIsShopOpen(true)}
                onMouseLeave={() => setIsShopOpen(false)}
              >
                <Link
                  href="/shop"
                  className="bg-[var(--btn-shop)] text-[var(--btn-shop-text)] px-3.5 py-1.5 rounded-lg transition-all hover:bg-[var(--btn-shop-hover)] flex items-center gap-1.5 cursor-pointer shadow-2xs"
                >
                  SHOP
                  <ChevronDown
                    className={`w-3.5 h-3.5 transition-transform duration-200 ${
                      isShopOpen ? "rotate-180" : ""
                    }`}
                  />
                </Link>

                {/* Floating Categories Dropdown */}
                {isShopOpen && (
                  <div className="absolute top-full left-0 pt-2 w-[760px] xl:w-[860px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="relative bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] p-6 space-y-4">
                      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2.5">
                        <span className="text-xs font-extrabold text-[var(--text-brand)] font-moresugar uppercase tracking-wider">
                          STORE COLLECTIONS
                        </span>
                        <Link
                          href="/shop"
                          onClick={() => setIsShopOpen(false)}
                          className="text-xs text-[var(--text-brand)] font-bold hover:underline"
                        >
                          View All Products →
                        </Link>
                      </div>

                      <div className="grid grid-cols-5 gap-4">
                        {SHOP_CATEGORIES.map((group) => (
                          <div key={group.title} className="space-y-2">
                            <div className="text-[10px] font-bold text-[var(--text-brand)] uppercase tracking-wide bg-[var(--btn-shop)]/25 px-2 py-0.5 rounded-md inline-block font-moresugar whitespace-nowrap">
                              {group.title}
                            </div>
                            <ul className="space-y-1">
                              {group.items.map((item) => (
                                <li key={item.name}>
                                  <Link
                                    href={item.href}
                                    onClick={() => setIsShopOpen(false)}
                                    className="text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--text-brand)] transition-colors hover:underline block py-0.5 font-sans"
                                  >
                                    {item.name}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              <Link
                href="/shop"
                className="hover:text-[var(--text-brand)] transition-colors hover:scale-105"
              >
                NEW IN
              </Link>
              <Link
                href="/#happy-shopping"
                className="hover:text-[var(--text-brand)] transition-colors hover:scale-105"
              >
                BESTSELLERS
              </Link>
              <Link
                href="/category/our-diary"
                className="hover:text-[var(--text-brand)] transition-colors hover:scale-105"
              >
                OUR DIARY
              </Link>
            </nav>

            {/* Mobile Hamburger Button */}
            <div className="flex lg:hidden items-center">
              <button
                onClick={() => setIsMobileMenuOpen(true)}
                className="p-1.5 rounded-full hover:bg-[var(--border-color)] text-[var(--text-primary)] transition-colors cursor-pointer"
                aria-label="Open menu"
              >
                <Menu className="w-5 h-5 sm:w-6 sm:h-6" />
              </button>
            </div>
          </div>

          {/* Center Brand Name */}
          <div className="flex-initial flex items-center justify-center min-w-0 px-1">
            <Link href="/" className="group flex items-center gap-1.5 min-w-0">
              <span className="font-moresugar font-bold text-lg sm:text-2xl md:text-3xl text-[var(--text-brand)] tracking-tight sm:tracking-wide group-hover:scale-105 transition-transform drop-shadow-2xs truncate">
                The Abbie Store
              </span>
            </Link>
          </div>

          {/* Right Action Icons */}
          <div className="flex-1 lg:flex-1 flex items-center justify-end gap-1 sm:gap-3">
            {/* Theme Toggle (Desktop Only - >=950px) */}
            <div className="hidden min-[950px]:block">
              <ThemeToggle />
            </div>

            <Link
              href="/shop"
              className="p-1.5 sm:p-2 rounded-full hover:bg-[var(--border-color)] text-[var(--text-primary)] transition-colors"
              aria-label="Search"
            >
              <Search className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
            </Link>

            {user ? (
              <Link
                href="/profile"
                className="flex items-center gap-1.5 p-1 sm:px-3 sm:py-1.5 rounded-full hover:bg-[var(--border-color)] text-[var(--text-primary)] transition-all font-moresugar text-xs font-bold"
                title="My Profile & Orders"
              >
                <User className="w-4.5 h-4.5 sm:w-5 sm:h-5 text-[var(--text-brand)]" />
                <span className="hidden sm:inline-block max-w-[90px] truncate">
                  {user.displayName || user.email?.split("@")[0] || "Account"}
                </span>
              </Link>
            ) : (
              <button
                onClick={() => setIsAuthOpen(true)}
                className="p-1.5 sm:p-2 rounded-full hover:bg-[var(--border-color)] text-[var(--text-primary)] transition-colors cursor-pointer"
                aria-label="Sign in"
              >
                <User className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              </button>
            )}

            <button
              type="button"
              onClick={openCart}
              className="p-1.5 sm:p-2 rounded-full hover:bg-[var(--border-color)] text-[var(--text-primary)] transition-colors relative cursor-pointer"
              aria-label="Shopping Cart"
            >
              <ShoppingCart className="w-4.5 h-4.5 sm:w-5 sm:h-5" />
              {totalItems > 0 && (
                <span className="absolute -top-1 -right-1 bg-[var(--text-brand)] text-[var(--bg-primary)] text-[9px] sm:text-[10px] font-bold rounded-full w-4 h-4 flex items-center justify-center font-sans animate-in zoom-in-50 duration-200">
                  {totalItems > 99 ? "99+" : totalItems}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay & Slide Drawer */}
      <div
        className={`fixed inset-0 z-50 lg:hidden transition-all duration-300 ${
          isMobileMenuOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        }`}
      >
        {/* Backdrop */}
        <div
          onClick={() => setIsMobileMenuOpen(false)}
          className={`fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity duration-300 ${
            isMobileMenuOpen ? "opacity-100" : "opacity-0"
          }`}
        />

        {/* Sliding Drawer Container */}
        <div
          className={`relative w-4/5 max-w-xs bg-[var(--card-bg)] text-[var(--text-primary)] h-full shadow-2xl flex flex-col z-10 transition-all duration-300 ease-out transform no-scrollbar ${
            isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
          }`}
        >
          {/* 1. Fixed Drawer Header */}
          <div className="flex items-center justify-between p-6 pb-4 border-b border-[var(--border-color)] bg-[var(--card-bg)]">
            <span className="text-lg font-bold text-[var(--text-brand)] font-moresugar">
              MENU
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(false)}
              className="p-1 text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* 2. Scrollable Body Area */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-6">
            {/* User Profile Avatar / Guest Section */}
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

            {/* Mobile Categories Collapsible Accordion */}
            <div className="space-y-4 font-moresugar mt-4">
              <div className="border-b border-[var(--border-color)] pb-3">
                <button
                  onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
                  className="w-full flex items-center justify-between py-1 text-[var(--text-brand)] cursor-pointer"
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

                {/* Collapsible Accordion Content */}
                {isMobileCategoriesOpen && (
                  <div className="space-y-4 pl-2 pt-3 animate-in fade-in slide-in-from-top-1 duration-200">
                    {SHOP_CATEGORIES.map((group) => (
                      <div key={group.title} className="space-y-1.5">
                        <span className="text-[10px] font-extrabold text-[var(--text-brand)] uppercase tracking-wider block opacity-80">
                          {group.title}
                        </span>
                        <div className="space-y-1 pl-2 border-l-2 border-[var(--border-color)]">
                          {group.items.map((item) => (
                            <Link
                              key={item.name}
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-brand)] transition-colors font-sans"
                            >
                              {item.name}
                            </Link>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link
                href="/shop"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-sm text-[var(--text-primary)] hover:text-[var(--text-brand)] transition-colors"
              >
                NEW IN
              </Link>
              <Link
                href="/#happy-shopping"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-sm text-[var(--text-primary)] hover:text-[var(--text-brand)] transition-colors"
              >
                BESTSELLERS
              </Link>
              <Link
                href="/category/our-diary"
                onClick={() => setIsMobileMenuOpen(false)}
                className="block py-2 text-sm text-[var(--text-primary)] hover:text-[var(--text-brand)] transition-colors"
              >
                OUR DIARY
              </Link>

              {/* Dedicated Theme Preference in Side Drawer */}
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

          {/* 3. Fixed Drawer Footer */}
          <div className="p-6 pt-4 border-t border-[var(--border-color)] bg-[var(--card-bg)]">
            {user ? (
              <div className="space-y-2">
                <Link
                  href="/profile"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[var(--btn-shop)] text-[var(--btn-shop-text)] font-bold text-xs font-moresugar text-center shadow-xs"
                >
                  <User className="w-4 h-4" />
                  My Profile & Settings
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 border border-red-500/30 py-3 rounded-full font-bold font-moresugar hover:bg-red-500/20 transition-all text-xs cursor-pointer"
                >
                  Sign Out / Logout
                </button>
              </div>
            ) : (
              <button
                onClick={() => {
                  setIsMobileMenuOpen(false);
                  setIsAuthOpen(true);
                }}
                className="w-full flex items-center justify-center gap-2 bg-[var(--btn-shop)] text-[var(--btn-shop-text)] py-3 rounded-full font-bold font-moresugar shadow-sm hover:bg-[var(--btn-shop-hover)] transition-all text-xs cursor-pointer"
              >
                <User className="w-4 h-4" />
                Account / Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
