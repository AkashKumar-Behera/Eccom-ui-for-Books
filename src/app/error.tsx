"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    if (error?.message !== "NEXT_DEVTOOLS_SIMULATED_ERROR") {
      console.error("Unhandled app error:", error);
    }
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-between bg-[var(--bg-primary)] text-[var(--text-primary)] font-moresugar transition-colors duration-200">
      <Navbar />

      <main className="flex-1 flex flex-col items-center justify-center p-6 text-center max-w-lg mx-auto py-16">
        {/* Official Brand Logo */}
        <div className="relative w-28 h-28 sm:w-36 sm:h-36 mb-4 transition-transform hover:scale-105">
          <Image
            src="/logo.png"
            alt="The Abbie Store Logo"
            fill
            sizes="(max-width: 640px) 112px, 144px"
            className="object-contain opacity-95"
            priority
          />
        </div>

        <h1 className="text-3xl sm:text-4xl font-bold text-[var(--text-primary)] mb-3">
          Something Went Wrong!
        </h1>

        <p className="text-sm sm:text-base text-[var(--text-secondary)] max-w-md mb-8 font-sans">
          We ran into an unexpected issue while loading this page. Please try again or head back to the store.
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <button
            onClick={() => reset()}
            className="px-7 py-3 bg-[var(--btn-shop)] text-[var(--btn-shop-text)] hover:bg-[var(--btn-shop-hover)] font-bold rounded-2xl shadow-sm transition-all duration-200 hover:scale-105 active:scale-95 cursor-pointer"
          >
            Try Again
          </button>

          <Link
            href="/"
            className="px-7 py-3 bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] hover:bg-[var(--border-color)] font-bold rounded-2xl transition-all duration-200"
          >
            Go to Homepage
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
