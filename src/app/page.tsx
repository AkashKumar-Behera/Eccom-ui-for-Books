"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { Search, User, ShoppingCart, Menu, ChevronDown, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import AuthModal from "@/components/AuthModal";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";

import { useAuth } from "@/context/AuthContext";

interface CategoryItem {
  name: string;
  href: string;
}

interface CategoryGroup {
  title: string;
  items: CategoryItem[];
}

function TabbedShopMenu({
  shopCategories,
  setIsShopOpen,
}: {
  shopCategories: CategoryGroup[];
  setIsShopOpen: (open: boolean) => void;
}) {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const activeGroup = shopCategories[activeTabIndex] || shopCategories[0];

  const iconsMap: Record<string, string> = {
    "WRITE & NOTE": "✍️",
    "PLAN & ORGANISE": "📅",
    "RELAX & COLOUR": "🎨",
    "BUSINESS ESSENTIALS": "💼",
    "CUSTOM STUDIO": "✨",
  };

  return (
    <div className="space-y-4 p-1">
      {/* Top Horizontal Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-1 border-b border-[var(--border-color)]">
        {shopCategories.map((group, idx) => {
          const isActive = activeTabIndex === idx;
          return (
            <button
              key={group.title}
              onClick={() => setActiveTabIndex(idx)}
              onMouseEnter={() => setActiveTabIndex(idx)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-bold font-moresugar whitespace-nowrap transition-all duration-200 cursor-pointer ${
                isActive
                  ? "bg-[var(--btn-shop)] text-[var(--btn-shop-text)] shadow-sm scale-105"
                  : "bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-brand)] hover:bg-[var(--border-color)]"
              }`}
            >
              <span>{iconsMap[group.title] || "🌸"}</span>
              <span>{group.title}</span>
            </button>
          );
        })}
      </div>

      {/* Content Area: Items grid for selected category */}
      <div className="bg-[var(--bg-secondary)]/50 rounded-2xl p-4 border border-[var(--border-color)]/60">
        <div className="flex items-center justify-between pb-2.5 mb-3 border-b border-[var(--border-color)]/40">
          <span className="text-xs font-extrabold text-[var(--text-brand)] font-moresugar tracking-wider uppercase">
            {activeGroup.title}
          </span>
          <span className="text-[10px] font-medium text-[var(--text-secondary)] font-sans">
            {activeGroup.items.length} Products
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
          {activeGroup.items.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={() => setIsShopOpen(false)}
              className="flex items-center justify-between p-2.5 rounded-xl bg-[var(--card-bg)] hover:bg-[var(--btn-shop)]/20 border border-[var(--border-color)]/50 text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--text-brand)] font-sans transition-all duration-150 group shadow-2xs hover:shadow-xs"
            >
              <span>{item.name}</span>
              <span className="text-xs text-[var(--text-brand)] opacity-0 group-hover:opacity-100 transition-opacity">
                →
              </span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}

function HomeContent() {
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

  const shopCategories = [
    {
      title: "WRITE & NOTE",
      items: [
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

  const searchParams = useSearchParams();
  const previewParam = searchParams.get("preview");

  const isDev = process.env.NODE_ENV === "development";
  const isMaintenance = process.env.NEXT_PUBLIC_MAINTENANCE_MODE === "true";

  // If ?soon=true or ?coming_soon=true is passed, show ComingSoon even on localhost
  const soonParam = searchParams.get("soon") === "true" || searchParams.get("coming_soon") === "true";
  
  // If in production (and no preview=true) OR if explicitly requested via ?soon=true, show ComingSoon
  const shouldShowComingSoon = soonParam || ((!isDev || isMaintenance) && previewParam !== "true" && previewParam !== "live");

  if (shouldShowComingSoon) {
    return <ComingSoon />;
  }

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />

      {/* 2nd Div: Navigation Bar */}
      <header className="w-full border-b border-[var(--border-color)] bg-[var(--bg-primary)] sticky top-0 z-40 transition-colors">
        <div className="w-full px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Left Menu / Navigation Links (Width: 1/3) */}
          <div className="flex-1 flex items-center justify-start">
            <nav className="hidden min-[1300px]:flex items-center gap-6 text-xs sm:text-sm font-semibold tracking-wider text-[var(--text-secondary)] font-moresugar">
              
              {/* SHOP Dropdown */}
              <div
                className="relative group py-2"
                onMouseEnter={() => setIsShopOpen(true)}
                onMouseLeave={() => setIsShopOpen(false)}
              >
                <button
                  onClick={() => setIsShopOpen(!isShopOpen)}
                  className="bg-[var(--btn-shop)] text-[var(--btn-shop-text)] px-3.5 py-1.5 rounded transition-all hover:bg-[var(--btn-shop-hover)] flex items-center gap-1.5 cursor-pointer"
                >
                  SHOP
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isShopOpen ? "rotate-180" : ""}`} />
                </button>

                {/* 5-Column Floating Dropdown Menu */}
                {isShopOpen && (
                  <div className="absolute top-full left-0 pt-2 w-[880px] z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                    <div className="relative bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl shadow-[0_20px_50px_rgba(0,0,0,0.12)] p-6 space-y-4">
                      {/* Top Pointer Arrow */}
                      <div className="absolute -top-2 left-6 w-4 h-4 bg-[var(--card-bg)] border-t border-l border-[var(--border-color)] rotate-45" />

                      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2.5">
                        <span className="text-xs font-extrabold text-[var(--text-brand)] font-moresugar uppercase tracking-wider">
                          CATEGORIES
                        </span>
                        <span className="text-[10px] text-[var(--text-secondary)] font-sans">
                          Select to explore
                        </span>
                      </div>

                      <div className="grid grid-cols-5 gap-4">
                        {shopCategories.map((group) => (
                          <div key={group.title} className="space-y-2">
                            {/* Section Badge */}
                            <div className="text-[10px] font-bold text-[var(--text-brand)] uppercase tracking-wide bg-[var(--btn-shop)]/25 px-2 py-0.5 rounded-md inline-block font-moresugar whitespace-nowrap">
                              {group.title}
                            </div>

                            {/* Section Links */}
                            <ul className="space-y-1">
                              {group.items.map((item) => (
                                <li key={item.name}>
                                  <a
                                    href={item.href}
                                    onClick={() => setIsShopOpen(false)}
                                    className="text-xs font-semibold text-[var(--text-primary)] hover:text-[var(--text-brand)] transition-colors hover:underline block py-0.5 font-sans"
                                  >
                                    {item.name}
                                  </a>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>

                      {/* Bottom Banner */}
                      <div className="pt-2 border-t border-[var(--border-color)] flex items-center justify-between text-xs font-moresugar text-[var(--text-secondary)]">
                        <span>Looking for something specific?</span>
                        <a
                          href="/shop"
                          onClick={() => setIsShopOpen(false)}
                          className="text-[var(--text-brand)] font-bold hover:underline"
                        >
                          All Products →
                        </a>
                      </div>
                    </div>
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
            <a href="#" className="text-lg sm:text-2xl md:text-4xl font-bold tracking-normal sm:tracking-wider text-[var(--text-brand)] font-moresugar inline-block whitespace-nowrap">
              The Abbie Store
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
              <ShoppingCart className="w-5 h-5" />
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
                  <div className="space-y-4 pl-2 pt-3 animate-in fade-in slide-in-from-top-1 duration-200">
                    {shopCategories.map((group) => (
                      <div key={group.title} className="space-y-1.5">
                        <span className="text-[10px] font-extrabold text-[var(--text-brand)] uppercase tracking-wider block opacity-80">
                          {group.title}
                        </span>
                        <div className="space-y-1 pl-2">
                          {group.items.map((item) => (
                            <a
                              key={item.name}
                              href={item.href}
                              onClick={() => setIsMobileMenuOpen(false)}
                              className="block py-1 text-xs text-[var(--text-secondary)] hover:text-[var(--text-brand)] transition-colors"
                            >
                              {item.name}
                            </a>
                          ))}
                        </div>
                      </div>
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
          alt="The Abbie Store - Online E-Commerce Store for Cute Stationery, Notebooks, Planners and Kawaii Goodies"
          width={2078}
          height={757}
          priority
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
      </section>

      {/* 4th Section: Happy Shopping Grid Section */}
      <section className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <h2 className="text-3xl sm:text-5xl font-bold text-center text-[var(--text-brand)] mb-8 sm:mb-12 font-moresugar">
          Happy Shopping!
        </h2>

        {/* 2x2 Grid on Mobile, 4-Column on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          
          {/* Card 1: Students Notebook */}
          <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-52 sm:h-80 md:h-96 flex flex-col justify-end p-3.5 sm:p-6 cursor-pointer">
            <Image
              src="/grid_stickers.png"
              alt="Students Notebook"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
            <div className="relative z-10 text-white">
              <h3 className="text-sm sm:text-xl md:text-2xl font-bold font-moresugar leading-tight">Students Notebook</h3>
              <p className="text-[10px] sm:text-xs md:text-sm text-zinc-200 font-sans mt-0.5">Explore Collection</p>
            </div>
          </div>

          {/* Card 2: Journal */}
          <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-52 sm:h-80 md:h-96 flex flex-col justify-end p-3.5 sm:p-6 cursor-pointer">
            <Image
              src="/grid_coloring.png"
              alt="Journal"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
            <div className="relative z-10 text-white">
              <h3 className="text-sm sm:text-xl md:text-2xl font-bold font-moresugar leading-tight">Journal</h3>
              <p className="text-[10px] sm:text-xs md:text-sm text-zinc-200 font-sans mt-0.5">Explore Collection</p>
            </div>
          </div>

          {/* Card 3: Business Kit */}
          <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-52 sm:h-80 md:h-96 flex flex-col justify-end p-3.5 sm:p-6 cursor-pointer">
            <Image
              src="/grid_pouches.png"
              alt="Business Kit"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
            <div className="relative z-10 text-white">
              <h3 className="text-sm sm:text-xl md:text-2xl font-bold font-moresugar leading-tight">Business Kit</h3>
              <p className="text-[10px] sm:text-xs md:text-sm text-zinc-200 font-sans mt-0.5">Explore Collection</p>
            </div>
          </div>

          {/* Card 4: Planners */}
          <div className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-52 sm:h-80 md:h-96 flex flex-col justify-end p-3.5 sm:p-6 cursor-pointer">
            <Image
              src="/grid_laptop.png"
              alt="Planners"
              fill
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 25vw"
              className="object-cover group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent"></div>
            <div className="relative z-10 text-white">
              <h3 className="text-sm sm:text-xl md:text-2xl font-bold font-moresugar leading-tight">Planners</h3>
              <p className="text-[10px] sm:text-xs md:text-sm text-zinc-200 font-sans mt-0.5">Explore Collection</p>
            </div>
          </div>

        </div>
      </section>

      {/* Footer Component */}
      <Footer />
    </div>
  );
}

export default function Home() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[var(--bg-primary)]" />}>
      <HomeContent />
    </Suspense>
  );
}
