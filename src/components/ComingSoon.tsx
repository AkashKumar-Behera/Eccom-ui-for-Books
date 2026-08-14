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
    <main className="min-h-screen flex flex-col justify-between bg-gradient-to-b from-[#0e2122] via-[#122829] to-[#183637] text-white font-sans relative overflow-hidden px-4 sm:px-6">
      
      {/* Background Soft Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[550px] rounded-full bg-[#1b3d3f]/60 blur-[130px] pointer-events-none" />

      {/* Main Content Area */}
      <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col items-center justify-center text-center z-10 py-12 space-y-8">
        
        {/* Main Heading */}
        <div className="space-y-4">
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-extrabold font-moresugar text-white tracking-wide leading-tight">
            We Are Crafting Your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#A5D5D8] via-[#B8D7E8] to-[#F3A69A]">
              Dream Stationery
            </span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-xs sm:text-base text-zinc-300 font-sans leading-relaxed">
            From aesthetic journals, weekly planners to cute anime goodies &amp; desk essentials.<br className="hidden sm:block" />
            Our full online storefront is getting its final touches!
          </p>
        </div>

        {/* Categories Preview Badges */}
        <div className="flex flex-wrap items-center justify-center gap-2 max-w-2xl pt-1">
          {["📓 Notebooks", "✨ Journals", "📅 Planners", "🎨 Coloring Books"].map((pill) => (
            <span
              key={pill}
              className="px-3.5 py-1.5 rounded-full bg-[#1c3839]/90 border border-[#2b5153] text-[11px] sm:text-xs font-bold font-moresugar text-[#bce0e2] shadow-xs"
            >
              {pill}
            </span>
          ))}
        </div>
        <div className="flex justify-center -mt-5">
          <span className="px-3.5 py-1.5 rounded-full bg-[#1c3839]/90 border border-[#2b5153] text-[11px] sm:text-xs font-bold font-moresugar text-[#bce0e2] shadow-xs">
            💼 Business Kit
          </span>
        </div>

        {/* Notify Me Input Form */}
        <div className="w-full max-w-md pt-2">
          {isSubmitted ? (
            <div className="flex items-center justify-center gap-2 p-3.5 rounded-2xl bg-[#142e2f] border border-[#2d585a] text-emerald-300 font-moresugar text-sm animate-in fade-in">
              <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
              <span>You&apos;re on the VIP list! We&apos;ll notify you when we launch. 🎉</span>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex items-center gap-2 p-1.5 rounded-full bg-[#112425]/90 border border-[#224446] shadow-2xl">
              <div className="flex-1 flex items-center gap-2.5 pl-4 pr-2 py-1.5">
                <Mail className="w-4 h-4 text-zinc-400 shrink-0" />
                <input
                  type="email"
                  required
                  placeholder="Enter your email for early bird perks"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-transparent text-xs sm:text-sm text-white placeholder-zinc-400 outline-none font-sans"
                />
              </div>
              <button
                type="submit"
                className="px-5 py-2.5 rounded-full bg-[#20494b] hover:bg-[#285d60] text-white text-xs sm:text-sm font-bold font-moresugar transition-all duration-200 flex items-center justify-center gap-2 shadow-md active:scale-95 cursor-pointer whitespace-nowrap"
              >
                <Bell className="w-3.5 h-3.5" />
                <span>Notify Me</span>
              </button>
            </form>
          )}
        </div>

        {/* Follow Our Journey Section */}
        <div className="flex flex-col items-center gap-2.5 pt-4">
          <span className="text-[11px] sm:text-xs font-bold font-moresugar tracking-wider text-zinc-400 uppercase">
            Follow our journey
          </span>
          <div className="flex items-center gap-3">
            <a
              href="https://www.instagram.com/theabbiestore.in"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 px-5 py-2 rounded-full bg-[#1c3839]/80 hover:bg-gradient-to-r hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] text-zinc-200 hover:text-white border border-[#2b5153] transition-all duration-300 text-xs font-bold font-moresugar group"
            >
              <svg className="w-4 h-4 fill-current transition-colors" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
              <span>@theabbiestore.in</span>
            </a>
          </div>
        </div>

      </div>

      {/* Bottom Footer Info */}
      <footer className="w-full max-w-7xl mx-auto py-6 border-t border-white/10 text-center sm:text-left flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-sans text-zinc-400 z-10">
        <p>© 2026 The Abbie Store. All rights reserved.</p>
        <div className="flex items-center gap-6 font-medium">
          <Link href="/privacy-policy" className="hover:text-white transition-colors">
            Privacy Policy
          </Link>
          <Link href="/terms-and-conditions" className="hover:text-white transition-colors">
            Terms &amp; Conditions
          </Link>
          <a href="mailto:info@theabbiestore.in" className="hover:text-white transition-colors">
            info@theabbiestore.in
          </a>
        </div>
      </footer>

    </main>
  );
}
