"use client";

import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { Search, User, ShoppingBag, Menu, ChevronDown, ChevronLeft, ChevronRight, X } from "lucide-react";
import { useSearchParams } from "next/navigation";
import AuthModal from "@/components/AuthModal";
import ThemeToggle from "@/components/ThemeToggle";
import Footer from "@/components/Footer";
import ComingSoon from "@/components/ComingSoon";
import Navbar from "@/components/Navbar";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "@/lib/firebase";

import { useAuth } from "@/context/AuthContext";

interface CategoryItem {
  name: string;
  href: string;
}

interface CategoryGroup {
  title: string;
  items: CategoryItem[];
}

function HomeContent() {
  // Banners & Carousel State
  const [banners, setBanners] = useState<Array<{ id: string; imageUrl: string; title?: string; link?: string }>>([]);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Fetch Banners from Firestore
  useEffect(() => {
    try {
      const q = query(collection(db, "banners"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          })) as Array<{ id: string; imageUrl: string; title?: string; link?: string }>;
          setBanners(items);
        },
        (err) => {
          console.warn("Fallback to un-ordered banners:", err);
          const fallbackUnsub = onSnapshot(collection(db, "banners"), (snapshot) => {
            const items = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
            })) as Array<{ id: string; imageUrl: string; title?: string; link?: string }>;
            setBanners(items);
          });
          return () => fallbackUnsub();
        }
      );
      return () => unsubscribe();
    } catch (err) {
      console.error("Failed to load banners:", err);
    }
  }, []);

  // Auto-play Carousel Timer (Every 5 seconds when > 1 banner)
  useEffect(() => {
    if (banners.length <= 1 || isPaused) return;

    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [banners.length, isPaused]);

  // Touch swipe gesture handlers for mobile
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);

  const minSwipeDistance = 40;

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsPaused(true);
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    setIsPaused(false);
    if (!touchStart || !touchEnd) return;
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe && banners.length > 1) {
      setCurrentSlide((prev) => (prev + 1) % banners.length);
    } else if (isRightSwipe && banners.length > 1) {
      setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
    }
  };

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
      <Navbar />

      {/* 3rd Div: Hero Banner / Dynamic Carousel Section */}
      <section
        className="group relative w-full aspect-[2078/757] overflow-hidden bg-zinc-900 select-none touch-pan-y"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        {banners.length === 0 ? (
          // Default Static Fallback Banner
          <a href="/shop" className="block w-full h-full">
            <Image
              src="/banner.png"
              alt="The Abbie Store - Cute Stationery, Notebooks, Planners and Kawaii Goodies"
              width={2078}
              height={757}
              priority
              className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            />
          </a>
        ) : (
          // Dynamic Banners Carousel
          <>
            <div className="relative w-full h-full">
              {banners.map((banner, index) => {
                const isActive = index === currentSlide;
                return (
                  <div
                    key={banner.id}
                    className={`absolute inset-0 transition-opacity duration-700 ease-in-out ${
                      isActive ? "opacity-100 z-10 pointer-events-auto" : "opacity-0 z-0 pointer-events-none"
                    }`}
                  >
                    <a href={banner.link || "/shop"} className="block w-full h-full relative cursor-pointer">
                      <Image
                        src={banner.imageUrl}
                        alt={banner.title || `Store Banner Slide ${index + 1}`}
                        fill
                        sizes="100vw"
                        priority={index === 0}
                        className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                      />
                    </a>
                  </div>
                );
              })}
            </div>

            {/* Carousel Navigation Arrows (Visible when > 1 banner) */}
            {banners.length > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentSlide((prev) => (prev - 1 + banners.length) % banners.length);
                  }}
                  className="absolute left-2 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer active:scale-90"
                  aria-label="Previous Slide"
                >
                  <ChevronLeft className="w-4 h-4 sm:w-6 sm:h-6" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    setCurrentSlide((prev) => (prev + 1) % banners.length);
                  }}
                  className="absolute right-2 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-7 h-7 sm:w-12 sm:h-12 rounded-full bg-black/40 hover:bg-black/75 text-white backdrop-blur-md flex items-center justify-center opacity-85 sm:opacity-0 sm:group-hover:opacity-100 transition-all duration-300 hover:scale-110 shadow-lg cursor-pointer active:scale-90"
                  aria-label="Next Slide"
                >
                  <ChevronRight className="w-4 h-4 sm:w-6 sm:h-6" />
                </button>

                {/* Pagination Dots */}
                <div className="absolute bottom-2.5 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-1.5 sm:gap-2.5 bg-black/30 backdrop-blur-md px-2.5 py-1 sm:px-3 sm:py-1.5 rounded-full">
                  {banners.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        setCurrentSlide(idx);
                      }}
                      className={`h-1.5 sm:h-2 rounded-full transition-all duration-300 cursor-pointer ${
                        currentSlide === idx ? "w-5 sm:w-6 bg-[var(--btn-shop)]" : "w-1.5 sm:w-2 bg-white/50 hover:bg-white/80"
                      }`}
                      aria-label={`Go to slide ${idx + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </section>

      {/* 4th Section: Happy Shopping Grid Section */}
      <section id="happy-shopping" className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 scroll-mt-24">
        <h2 className="text-3xl sm:text-5xl font-bold text-center text-[#1E4B4C] mb-8 sm:mb-12 font-moresugar">
          Happy Shopping!
        </h2>

        {/* 2x2 Grid on Mobile, 4-Column on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-6">
          
          {/* Card 1: Students Notebook */}
          <Link
            href="/category/notebooks"
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-52 sm:h-80 md:h-96 flex flex-col justify-end p-3.5 sm:p-6 cursor-pointer"
          >
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
          </Link>

          {/* Card 2: Journal */}
          <Link
            href="/category/journals"
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-52 sm:h-80 md:h-96 flex flex-col justify-end p-3.5 sm:p-6 cursor-pointer"
          >
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
          </Link>

          {/* Card 3: Business Kit */}
          <Link
            href="/category/business-kit"
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-52 sm:h-80 md:h-96 flex flex-col justify-end p-3.5 sm:p-6 cursor-pointer"
          >
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
          </Link>

          {/* Card 4: Planners */}
          <Link
            href="/category/weekly-planners"
            className="group relative rounded-2xl sm:rounded-3xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 h-52 sm:h-80 md:h-96 flex flex-col justify-end p-3.5 sm:p-6 cursor-pointer"
          >
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
          </Link>

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
