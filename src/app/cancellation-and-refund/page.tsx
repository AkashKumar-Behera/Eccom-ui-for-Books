import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, RotateCcw, PackageX, AlertCircle, Sparkles, Truck, ShieldCheck } from "lucide-react";

export const metadata = {
  title: "Cancellation & Refund Policy | The Abbie Store",
  description: "Cancellation, Returns and Refund Policies for The Abbie Store.",
};

export default function CancellationAndRefund() {
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
            <RotateCcw className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-brand)] tracking-tight">
            Cancellation &amp; Refund Policy
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans">
            Effective Date: August 15, 2026
          </p>
        </div>

        {/* Policy Content Card */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-sm sm:text-base leading-relaxed text-[var(--text-primary)]">
          <p className="text-[var(--text-secondary)]">
            At <strong>The Abbie Store</strong>, we carefully process and pack every order. Please read our cancellation and refund terms before placing your order.
          </p>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <PackageX className="w-5 h-5" /> 1. Order Cancellation
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-[var(--text-secondary)] pl-2">
              <li>Orders can be cancelled <strong>before dispatch</strong> by contacting us as soon as possible.</li>
              <li>Once an order has been dispatched, it cannot be cancelled.</li>
              <li>Cancellation may not be possible once an order has entered the printing, customisation or packaging stage.</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> 2. Customised Products
            </h2>
            <ul className="list-disc list-inside space-y-1.5 text-[var(--text-secondary)] pl-2">
              <li>Customised or personalised products cannot be cancelled or returned once processing has started.</li>
              <li>If a customised product is received <strong>damaged, defective or incorrect</strong>, please contact us within <strong>48 hours of delivery</strong> for a replacement or refund, as applicable.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <RotateCcw className="w-5 h-5" /> 3. Returns &amp; Replacements
            </h2>
            <p className="text-[var(--text-secondary)]">
              Returns or replacements are accepted only if the product:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-[var(--text-secondary)] pl-2">
              <li>Is damaged or defective;</li>
              <li>Is incorrect or different from what was ordered; or</li>
              <li>Has a significant printing/manufacturing defect.</li>
            </ul>
            <p className="text-[var(--text-secondary)] mt-2">
              Please contact us within <strong>48 hours of delivery</strong> with your <strong>order number and clear photos/videos of the product and packaging</strong>.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <AlertCircle className="w-5 h-5" /> 4. Change of Mind
            </h2>
            <p className="text-[var(--text-secondary)]">
              We do not accept returns or refunds for change of mind, incorrect selection of product/variant, or simply because the customer no longer requires the product.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <RotateCcw className="w-5 h-5" /> 5. Refunds
            </h2>
            <p className="text-[var(--text-secondary)]">
              Approved refunds will be processed to the <strong>original payment method</strong>, subject to applicable payment gateway/bank processing times.
            </p>
            <p className="text-[var(--text-secondary)]">
              Shipping charges are generally non-refundable for customer-initiated cancellations or returns. Where the issue is attributable to The Abbie Store, applicable return/shipping costs will be handled by us.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <Truck className="w-5 h-5" /> 6. Incorrect Address / Failed Delivery
            </h2>
            <p className="text-[var(--text-secondary)]">
              Customers are responsible for providing accurate delivery details. If an order is returned due to an incorrect address, refusal of delivery or repeated failed delivery attempts, additional shipping charges may apply for re-dispatch.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <ShieldCheck className="w-5 h-5" /> 7. Legal Rights
            </h2>
            <p className="text-[var(--text-secondary)]">
              Nothing in this policy limits any rights available to customers under applicable Indian consumer protection laws.
            </p>
            <p className="text-[var(--text-secondary)]">
              For cancellation, return or refund requests, please contact <strong>The Abbie Store</strong> through the customer support details provided on our website.
            </p>
          </section>

          {/* Support Info Box */}
          <div className="mt-8 p-6 rounded-2xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="space-y-1 text-center sm:text-left">
              <h3 className="font-bold font-moresugar text-[var(--text-brand)]">Need help with an order?</h3>
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
