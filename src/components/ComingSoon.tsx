"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, Sparkles, Heart, Bell, CheckCircle2, MapPin, Phone } from "lucide-react";

export default function ComingSoon() {
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setIsSubmitted(true);
    }
  };

  return (
    <main className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#FAF8F5] via-[#F4EDE4] to-[#EAE0D5] text-[#18181b] font-sans relative overflow-hidden selection:bg-[#98C4C5] selection:text-[#1E4B4C]">
      
      {/* Background Decorative Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#98C4C5]/25 blur-3xl pointer-events-none animate-pulse" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[#E8B4B8]/30 blur-3xl pointer-events-none animate-pulse" style={{ animationDuration: "4s" }} />

      {/* Top Brand Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-6 sm:py-8 flex items-center justify-between z-10">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-2xl sm:text-3xl font-bold font-moresugar text-[#1E4B4C] tracking-wide transition-transform group-hover:scale-105">
            The Abbie Store
          </span>
        </Link>

        {/* Launch Status Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1E4B4C]/10 border border-[#1E4B4C]/15 text-xs sm:text-sm font-semibold font-moresugar text-[#1E4B4C] shadow-xs">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          <span>Opening Soon</span>
        </div>
      </header>

      {/* Hero Content Section */}
      <section className="w-full max-w-4xl mx-auto px-6 py-8 sm:py-12 flex flex-col items-center text-center z-10 space-y-8">
        
        {/* Cute Floating Pill */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/90 backdrop-blur-md border border-[var(--border-color)] shadow-sm text-xs sm:text-sm font-moresugar text-[#1E4B4C] animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-500" />
          <span>Something magical is on the way!</span>
          <Heart className="w-4 h-4 text-rose-400 fill-current" />
        </div>

        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-moresugar text-[#1E4B4C] tracking-tight leading-tight drop-shadow-xs">
            We Are Crafting Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#1E4B4C] via-[#35797A] to-[#E27D60]">
              Dream Stationery
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-sm sm:text-lg text-[#52525b] font-sans leading-relaxed">
            From aesthetic journals, weekly planners to cute anime goodies & desk essentials. Our full online storefront is getting its final touches!
          </p>
        </div>

        {/* Categories Preview Pills */}
        <div className="flex flex-wrap items-center justify-center gap-2.5 max-w-xl pt-2">
          {["📓 Notebooks", "✨ Journals", "📅 Planners", "🎨 Coloring Books", "💼 Business Kit"].map((pill) => (
            <span
              key={pill}
              className="px-3.5 py-1.5 rounded-full bg-white/80 border border-black/5 text-xs font-bold font-moresugar text-[#1E4B4C] shadow-2xs"
            >
              {pill}
            </span>
          ))}
        </div>

        {/* Notify Me Form */}
        <div className="w-full max-w-md pt-4">
          {isSubmitted ? (
            <div className="flex items-center justify-center gap-2 p-4 rounded-2xl bg-emerald-50 border border-emerald-300 text-emerald-800 font-moresugar text-sm animate-in fade-in zoom-in-95">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <span>You&apos;re on the VIP list! We&apos;ll notify you when we launch. 🎉</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2.5 p-1.5 rounded-3xl bg-white/95 backdrop-blur-md border border-[var(--border-color)] shadow-xl">
              <div className="flex-1 flex items-center gap-2.5 px-4 py-2">
                <Mail className="w-4 h-4 text-[#52525b] shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email for early bird perks"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-[#18181b] placeholder-[#71717a] outline-none font-sans"
                />
              </div>
              <button
                type="submit"
                className="px-6 py-3 rounded-2xl bg-[#1E4B4C] hover:bg-[#286061] text-white text-xs sm:text-sm font-bold font-moresugar transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg active:scale-95 cursor-pointer"
              >
                <Bell className="w-4 h-4" />
                <span>Notify Me</span>
              </button>
            </form>
          )}
        </div>

        {/* Social Follow */}
        <div className="flex flex-col items-center gap-3 pt-4">
          <span className="text-xs font-bold font-moresugar tracking-wider text-[#52525b] uppercase">
            Follow our journey
          </span>
          <div className="flex items-center gap-4">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/theabbiestore.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/90 hover:bg-gradient-to-r hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] hover:text-white text-[#1E4B4C] border border-[var(--border-color)] transition-all duration-300 shadow-xs hover:shadow-md text-xs font-bold font-moresugar group"
            >
              <svg className="w-4 h-4 fill-current group-hover:text-white transition-colors" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>@theabbiestore.in</span>
            </a>
          </div>
        </div>

      </section>

      {/* Footer Info */}
      <footer className="w-full max-w-7xl mx-auto px-6 py-6 border-t border-[var(--border-color)]/60 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-[#52525b] z-10">
        <p>© 2026 The Abbie Store. All rights reserved.</p>
        <div className="flex items-center gap-6 font-semibold">
          <Link href="/privacy-policy" className="hover:text-[#1E4B4C] transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-[#1E4B4C] transition-colors">
            Terms & Conditions
          </Link>
          <a href="mailto:info@theabbiestore.in" className="hover:text-[#1E4B4C] transition-colors">
            info@theabbiestore.in
          </a>
        </div>
      </footer>

    </main>
  );
}
