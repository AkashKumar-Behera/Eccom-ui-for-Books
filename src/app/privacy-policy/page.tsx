import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Lock, Eye, FileText } from "lucide-react";

export const metadata = {
  title: "Privacy Policy | The Abbie Store",
  description: "Privacy Policy and Data Protection Guidelines for The Abbie Store.",
};

export default function PrivacyPolicy() {
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
            <ShieldCheck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-brand)] tracking-tight">
            Privacy Policy
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans">
            Last Updated: August 13, 2026
          </p>
        </div>

        {/* Policy Content Sections */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-sm sm:text-base leading-relaxed text-[var(--text-primary)]">
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <Eye className="w-5 h-5" /> 1. Information We Collect
            </h2>
            <p className="text-[var(--text-secondary)]">
              At <strong>The Abbie Store</strong>, we respect your privacy and are committed to protecting your personal data. When you visit our website, register an account, or place an order, we may collect:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-[var(--text-secondary)] pl-2">
              <li><strong>Personal Identifiers:</strong> Name, email address, phone number, and shipping/billing address.</li>
              <li><strong>Transaction Details:</strong> Purchase history, order items, and payment status updates.</li>
              <li><strong>Technical Data:</strong> IP address, browser type, device information, and site interaction logs.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <Lock className="w-5 h-5" /> 2. How We Use Your Information
            </h2>
            <p className="text-[var(--text-secondary)]">
              We use the collected information solely to provide a seamless e-commerce shopping experience, including:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-[var(--text-secondary)] pl-2">
              <li>Processing and delivering your stationery orders.</li>
              <li>Sending order confirmations, tracking details, and support updates.</li>
              <li>Improving store navigation, design, and product catalog.</li>
              <li>Preventing fraudulent transactions and ensuring store security.</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)]">
              3. Payment Security & Third Parties
            </h2>
            <p className="text-[var(--text-secondary)]">
              We do not store complete credit card or debit card details on our servers. All online payments are securely processed through encrypted SSL payment gateways. We never sell, trade, or rent your personal information to third parties for marketing purposes.
            </p>
          </section>

          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)]">
              4. Cookies Policy
            </h2>
            <p className="text-[var(--text-secondary)]">
              We use essential cookies to maintain your shopping cart session, remember theme preferences (Light/Dark mode), and understand site usage analytics to enhance overall user experience.
            </p>
          </section>

          <section className="space-y-3 border-t border-[var(--border-color)] pt-6">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <FileText className="w-5 h-5" /> 5. Contact Us
            </h2>
            <p className="text-[var(--text-secondary)]">
              If you have any questions, concerns, or requests regarding this Privacy Policy, please reach out to us at:
            </p>
            <p className="font-semibold text-[var(--text-brand)]">
              Email: support@theabbiestore.in
            </p>
          </section>
        </div>

        {/* Footer Link */}
        <div className="text-center pt-4">
          <Link
            href="/terms-and-conditions"
            className="text-xs sm:text-sm font-semibold font-moresugar text-[var(--text-secondary)] hover:text-[var(--text-brand)] underline transition-all"
          >
            Read Terms & Conditions
          </Link>
        </div>
      </div>
    </div>
  );
}
