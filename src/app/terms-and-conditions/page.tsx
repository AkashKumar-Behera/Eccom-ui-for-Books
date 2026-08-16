import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Scale, ShoppingBag, Truck, AlertCircle } from "lucide-react";

export const metadata = {
  title: "Terms of Service | The Abbie Store",
  description: "Terms of Service for purchasing from The Abbie Store.",
};

export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200 py-10 px-4 sm:px-8">
      <div className="max-w-4xl mx-auto space-y-8 font-sans">
        {/* Top Header Navigation */}
        <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-6">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm font-semibold font-moresugar text-[var(--text-brand)] hover:underline transition-all"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Store
          </Link>
          <div className="relative w-24 h-10">
            <Image
              src="/logo.png"
              alt="The Abbie Store Logo"
              fill
              className="object-contain"
              sizes="96px"
            />
          </div>
        </div>

        {/* Document Title Header */}
        <div className="text-center space-y-3 font-moresugar">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-[var(--bg-secondary)] text-[var(--text-brand)] border border-[var(--border-color)] mb-2 shadow-xs">
            <Scale className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-brand)] tracking-tight">
            Terms of Service
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans">
            Last Updated: August 16, 2026
          </p>
        </div>

        {/* Terms Content Sections */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-sm sm:text-base leading-relaxed text-[var(--text-primary)]">
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <ShoppingBag className="w-5 h-5" /> 1. Store Terms & Acceptance
            </h2>
            <p className="text-[var(--text-secondary)]">
              Welcome to <strong>The Abbie Store</strong>. By browsing, accessing, or purchasing products from our website, you agree to be bound by these Terms of Service. Please read them carefully before placing an order.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)]">
              2. Product & Pricing Information
            </h2>
            <p className="text-[var(--text-secondary)]">
              We make every effort to display the colors, designs, and specifications of our stationery products as accurately as possible. Prices are listed in INR (Indian Rupees) and are subject to change without prior notice. Promotions and discount offers (such as Sitewide discounts) apply according to active coupon rules.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <Truck className="w-5 h-5" /> 3. Orders & Shipping Policy
            </h2>
            <p className="text-[var(--text-secondary)]">
              Once an order is placed, you will receive an order confirmation via email/SMS. Orders are typically dispatched within 1-3 business days. Estimated delivery times may vary depending on courier services and shipping location.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)]">
              4. Returns & Exchanges
            </h2>
            <p className="text-[var(--text-secondary)]">
              Due to the delicate nature of stationery and paper goods, returns are only accepted in cases of damaged, defective, or incorrect items delivered. Customers must notify support within 48 hours of receipt with unboxing proof.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)]">
              5. Intellectual Property
            </h2>
            <p className="text-[var(--text-secondary)]">
              All content on this website, including illustrations, product designs, banners, logos, text, and graphics, are the intellectual property of <strong>The Abbie Store</strong>. Unauthorized reproduction or commercial use is strictly prohibited.
            </p>
          </section>

          <section className="space-y-3 border-t border-[var(--border-color)] pt-6">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> 6. Customer Support
            </h2>
            <p className="text-[var(--text-secondary)]">
              For any queries regarding terms, order status, or business inquiries, feel free to contact us:
            </p>
            <p className="font-semibold text-[var(--text-brand)]">
              Email: support@theabbiestore.in
            </p>
          </section>
        </div>

        {/* Footer Link */}
        <div className="text-center pt-4">
          <Link
            href="/privacy-policy"
            className="text-xs sm:text-sm font-semibold font-moresugar text-[var(--text-secondary)] hover:text-[var(--text-brand)] underline transition-all"
          >
            Read Privacy Policy
          </Link>
        </div>
      </div>
    </div>
  );
}
