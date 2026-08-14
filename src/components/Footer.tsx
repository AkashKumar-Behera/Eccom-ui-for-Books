import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Mail, MapPin, Phone } from "lucide-react";

export default function Footer() {
  return (
    <footer className="w-full bg-[#1E4B4C] text-white font-sans transition-colors pt-12 pb-6">
      <div className="max-w-7xl mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-10 border-b border-white/20">
          
          {/* Col 1: Brand & Social */}
          <div className="flex flex-col space-y-4">
            <Link href="/" className="inline-block">
              <span className="font-moresugar font-bold text-2xl sm:text-3xl text-white tracking-wide drop-shadow-sm">
                The Abbie Store
              </span>
            </Link>

            <div className="flex items-center gap-2 text-sm font-sans font-medium text-white/90 pt-2">
              <Mail className="w-4 h-4" />
              <span>Follow us</span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-[#1877F2] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg"
                aria-label="Facebook"
              >
                <svg className="w-4 h-4 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>
              <a
                href="https://www.instagram.com/theabbiestore.in"
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-gradient-to-tr hover:from-[#f09433] hover:via-[#dc2743] hover:to-[#bc1888] flex items-center justify-center transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-pink-500/30"
                aria-label="Instagram"
              >
                <svg className="w-4.5 h-4.5 fill-current text-white" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Col 2: Exciting things */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-sans font-bold text-base tracking-wide text-white mb-1 uppercase">
              Exciting things
            </h4>
            <ul className="space-y-2 text-sm font-sans text-white/80">
              <li>
                <Link href="/" className="hover:text-white hover:underline transition-all">
                  Shop
                </Link>
              </li>
              <li>
                <Link href="/#about" className="hover:text-white hover:underline transition-all">
                  About us
                </Link>
              </li>
              <li>
                <Link href="/#blogs" className="hover:text-white hover:underline transition-all">
                  Blogs
                </Link>
              </li>
              <li>
                <Link href="/#faqs" className="hover:text-white hover:underline transition-all">
                  FAQs
                </Link>
              </li>
              <li>
                <Link href="/#contact" className="hover:text-white hover:underline transition-all">
                  Contact us
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Unexciting things */}
          <div className="flex flex-col space-y-3">
            <h4 className="font-sans font-bold text-base tracking-wide text-white mb-1 uppercase">
              Unexciting things
            </h4>
            <ul className="space-y-2 text-sm font-sans text-white/80">
              <li>
                <Link href="/terms-and-conditions" className="hover:text-white hover:underline transition-all">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link href="/privacy-policy" className="hover:text-white hover:underline transition-all">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link href="/cancellation-and-refund" className="hover:text-white hover:underline transition-all">
                  Cancellation & Refund Policies
                </Link>
              </li>
              <li>
                <Link href="/shipping-and-delivery" className="hover:text-white hover:underline transition-all">
                  Shipping & Delivery
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Get In Touch */}
          <div className="flex flex-col space-y-4">
            <h4 className="font-sans font-bold text-base tracking-wide text-white mb-1 uppercase">
              Get In Touch
            </h4>
            <div className="space-y-3 text-sm font-sans text-white/80">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 shrink-0 mt-1" />
                <span>Plot No. 678, Laxmisagar, Bhubaneswar, Odisha 751006</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 shrink-0" />
                <a href="tel:+918093143377" className="hover:underline">
                  +91-80931 43377
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 shrink-0" />
                <a href="mailto:support@theabbiestore.in" className="hover:underline">
                  support@theabbiestore.in
                </a>
              </div>
            </div>
          </div>

        </div>

        {/* Bottom Copyright bar */}
        <div className="pt-6 text-center text-xs font-sans text-white/70">
          Copyright © 2026 The Abbie Store. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
