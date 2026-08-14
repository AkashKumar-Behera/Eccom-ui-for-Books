import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, Truck, Clock, Plane, MapPin, AlertCircle, FileText, Mail, Phone } from "lucide-react";

export const metadata = {
  title: "Shipping & Delivery Policy | The Abbie Store",
  description: "Shipping timelines, express delivery and tracking details for The Abbie Store.",
};

export default function ShippingAndDelivery() {
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
            <Truck className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-brand)] tracking-tight">
            Shipping &amp; Delivery Policy
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans">
            Effective Date: August 15, 2026
          </p>
        </div>

        {/* Policy Content Card */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-sm sm:text-base leading-relaxed text-[var(--text-primary)]">
          <p className="text-[var(--text-secondary)]">
            At <strong>The Abbie Store</strong>, we aim to process and deliver every order safely and on time.
          </p>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <Clock className="w-5 h-5" /> 1. Dispatch Time
            </h2>
            <ul className="list-disc list-inside space-y-2 text-[var(--text-secondary)] pl-2">
              <li>
                <strong>Regular Orders:</strong> Products are usually dispatched within <strong>2–3 working days</strong> from the date of order.
              </li>
              <li>
                <strong>Customised Orders:</strong> Customised products usually take <strong>6–7 working days</strong> for printing and preparation, after which the order will be dispatched.
              </li>
              <li className="bg-[var(--bg-secondary)] p-3.5 rounded-xl border border-[var(--border-color)] list-none text-xs sm:text-sm text-[var(--text-brand)] font-semibold mt-2">
                ✨ If a customised order takes <strong>more than 10 working days</strong> to be ready, we will ensure that it is shipped through <strong>Speed Post by air at no additional cost to the customer</strong>.
              </li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <Plane className="w-5 h-5" /> 2. Express Delivery
            </h2>
            <p className="text-[var(--text-secondary)]">
              If you need your order urgently, please <strong>contact us before placing the order</strong>. Subject to availability and feasibility, we can arrange delivery through <strong>air or another express shipping service</strong>.
            </p>
            <p className="text-[var(--text-secondary)]">
              Additional shipping charges will apply for express delivery and will be communicated before the order is confirmed.
            </p>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <Truck className="w-5 h-5" /> 3. Delivery Time
            </h2>
            <p className="text-[var(--text-secondary)]">
              Once dispatched, delivery time depends on the courier partner and the delivery location. Estimated delivery timelines may vary due to weekends, public holidays, weather conditions or other unforeseen circumstances.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <MapPin className="w-5 h-5" /> 4. Tracking
            </h2>
            <p className="text-[var(--text-secondary)]">
              Once your order is dispatched, tracking details will be shared through the contact details provided at the time of purchase.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> 5. Delays
            </h2>
            <p className="text-[var(--text-secondary)]">
              While we strive to meet the estimated timelines, The Abbie Store is not responsible for delays caused by courier partners, incorrect address details, natural events or other circumstances beyond our control.
            </p>
            <p className="text-[var(--text-secondary)]">
              For any shipping-related queries, please contact <strong>The Abbie Store</strong> through the customer support details provided on our website.
            </p>
          </section>

          {/* Support Info Box */}
          <div className="mt-8 p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-bold font-moresugar text-[var(--text-brand)]">Need help tracking your order?</h3>
              <p className="text-xs text-[var(--text-secondary)]">Our support team is available Mon - Sat (10 AM - 6 PM IST)</p>
            </div>
            <a
              href="mailto:info@theabbiestore.in"
              className="px-5 py-2.5 rounded-full bg-[var(--btn-shop)] text-white text-xs font-bold font-moresugar hover:opacity-90 transition-all shadow-xs"
            >
              Contact Support
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-[var(--text-secondary)] font-sans pt-4">
          © 2026 The Abbie Store. All rights reserved.
        </div>
      </div>
    </div>
  );
}