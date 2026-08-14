import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, HelpCircle, Sparkles, BookOpen, Plane, Clock, CheckCircle2, Gift, Users, Mail } from "lucide-react";

export const metadata = {
  title: "Frequently Asked Questions | The Abbie Store",
  description: "FAQs regarding customization, delivery timelines, bulk orders and packaging at The Abbie Store.",
};

const faqs = [
  {
    icon: Sparkles,
    q: "1. What can I customise on my order?",
    a: "Almost anything! You can customise the front and back cover with names, photographs, illustrations, designs, quotes, or other elements of your choice.",
  },
  {
    icon: BookOpen,
    q: "2. Can I customise the inner pages?",
    a: "Yes! Inner pages can also be customised according to your requirements. Additional charges will apply depending on the type and extent of customisation.",
  },
  {
    icon: Plane,
    q: "3. Is express delivery available?",
    a: "Yes, express delivery may be available depending on your location and order requirements. Please contact us before placing your order so we can check the available options. Additional shipping charges will apply.",
  },
  {
    icon: Clock,
    q: "4. How long does a customised order take?",
    a: "Customised orders usually take 6–7 working days for printing and preparation before dispatch.",
  },
  {
    icon: CheckCircle2,
    q: "5. Is the design reviewed before printing?",
    a: "Yes! All our customised products are approved by the customer before they are sent for printing.",
  },
  {
    icon: Gift,
    q: "6. Can I gift-pack my order?",
    a: "Yes! Gift packaging is available at an additional charge. Please select the gift-packaging option while placing your order or contact us for more details.",
  },
  {
    icon: Users,
    q: "7. Can I place a bulk or multiple customised order?",
    a: "Yes! For bulk or multiple customised orders, please contact us through Instagram, email or WhatsApp to discuss your requirements, pricing and timeline.",
  },
];

export default function FAQsPage() {
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
            <HelpCircle className="w-6 h-6" />
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold text-[var(--text-brand)] tracking-tight">
            Frequently Asked Questions
          </h1>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans">
            Got questions? We&apos;ve got answers! Everything you need to know about our customised products &amp; delivery.
          </p>
        </div>

        {/* FAQ Grid / List */}
        <div className="space-y-4">
          {faqs.map((faq, index) => {
            const Icon = faq.icon;
            return (
              <div
                key={index}
                className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-2xl p-6 shadow-xs hover:border-[var(--text-brand)]/30 transition-all space-y-2"
              >
                <h2 className="text-base sm:text-lg font-bold font-moresugar text-[var(--text-brand)] flex items-start sm:items-center gap-2.5">
                  <span className="p-1.5 rounded-lg bg-[var(--bg-secondary)] text-[var(--text-brand)] shrink-0 mt-0.5 sm:mt-0">
                    <Icon className="w-4 h-4" />
                  </span>
                  {faq.q}
                </h2>
                <p className="text-sm sm:text-base text-[var(--text-secondary)] leading-relaxed pl-8 sm:pl-9">
                  {faq.a}
                </p>
              </div>
            );
          })}
        </div>

        {/* Support Box */}
        <div className="p-6 rounded-3xl bg-[var(--bg-secondary)] border border-[var(--border-color)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="font-bold font-moresugar text-[var(--text-brand)] text-base">Still have questions?</h3>
            <p className="text-xs text-[var(--text-secondary)]">We&apos;re here to help you customise the perfect stationery gift!</p>
          </div>
          <a
            href="mailto:info@theabbiestore.in"
            className="px-5 py-2.5 rounded-full bg-[var(--btn-shop)] text-white text-xs font-bold font-moresugar hover:opacity-90 transition-all shadow-xs"
          >
            Contact Us
          </a>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-[var(--text-secondary)] font-sans pt-4">
          © 2026 The Abbie Store. All rights reserved.
        </div>
      </div>
    </div>
  );
}