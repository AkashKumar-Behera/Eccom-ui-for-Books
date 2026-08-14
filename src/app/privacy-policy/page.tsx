import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowLeft, ShieldCheck, Eye, Lock, FileText, Sparkles, CreditCard, Users, Cookie, UserCheck, Baby, RefreshCw, Mail, Phone } from "lucide-react";

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
            Effective Date: August 15, 2026
          </p>
        </div>

        {/* Policy Content Card */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-10 shadow-sm space-y-8 text-sm sm:text-base leading-relaxed text-[var(--text-primary)]">
          <p className="text-[var(--text-secondary)]">
            At <strong>The Abbie Store</strong>, your privacy is important to us. This Privacy Policy explains how we collect and use your personal information when you visit our website or place an order with us.
          </p>

          {/* Section 1 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <Eye className="w-5 h-5" /> 1. Information We Collect
            </h2>
            <p className="text-[var(--text-secondary)]">When you use our website or place an order, we may collect:</p>
            <ul className="list-disc list-inside space-y-1.5 text-[var(--text-secondary)] pl-2">
              <li>Name</li>
              <li>Mobile number and email address</li>
              <li>Billing and shipping address</li>
              <li>Order and transaction details</li>
              <li>Customisation details, including names, photographs, designs or other content provided by you</li>
              <li>Information you provide when contacting us through email, WhatsApp, Instagram or other support channels</li>
              <li>Basic website usage information, such as device or browser information, where applicable</li>
            </ul>
          </section>

          {/* Section 2 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <Lock className="w-5 h-5" /> 2. How We Use Your Information
            </h2>
            <p className="text-[var(--text-secondary)]">We use your information to:</p>
            <ul className="list-disc list-inside space-y-1.5 text-[var(--text-secondary)] pl-2">
              <li>Process and deliver your orders;</li>
              <li>Create and personalise customised products;</li>
              <li>Process payments and provide order confirmations;</li>
              <li>Communicate with you regarding your orders or queries;</li>
              <li>Provide customer support;</li>
              <li>Improve our products, services and website; and</li>
              <li>Comply with applicable legal requirements.</li>
            </ul>
          </section>

          {/* Section 3 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <Sparkles className="w-5 h-5" /> 3. Customised Content
            </h2>
            <p className="text-[var(--text-secondary)]">
              If you provide photographs, names, artwork or other personal content for customisation, we use such information only as required to prepare your order and provide the requested service.
            </p>
            <p className="text-[var(--text-secondary)]">
              Please ensure that you have the necessary permission to provide any photograph, artwork or other content belonging to another person.
            </p>
          </section>

          {/* Section 4 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <CreditCard className="w-5 h-5" /> 4. Payment Information
            </h2>
            <p className="text-[var(--text-secondary)]">
              Payments may be processed through third-party payment gateways. <strong>The Abbie Store does not store your complete debit card, credit card, UPI or banking credentials</strong> on its own systems.
            </p>
            <p className="text-[var(--text-secondary)]">
              Payment information is handled by the respective payment service provider according to its privacy and security practices.
            </p>
          </section>

          {/* Section 5 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <Users className="w-5 h-5" /> 5. Sharing of Information
            </h2>
            <p className="text-[var(--text-secondary)]">We may share necessary information with trusted service providers, such as:</p>
            <ul className="list-disc list-inside space-y-1.5 text-[var(--text-secondary)] pl-2">
              <li>Payment gateways;</li>
              <li>Courier and delivery partners;</li>
              <li>Printing or production partners, where required for customised orders; and</li>
              <li>Website, hosting or technology service providers.</li>
            </ul>
            <p className="text-[var(--text-secondary)]">
              We share only the information reasonably required to provide the relevant service, fulfil your order or meet legal obligations.
            </p>
            <p className="text-[var(--text-secondary)] font-medium">
              We do <strong>not sell or rent your personal information</strong> to third parties.
            </p>
          </section>

          {/* Section 6 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <Cookie className="w-5 h-5" /> 6. Cookies &amp; Website Data
            </h2>
            <p className="text-[var(--text-secondary)]">
              Our website may use cookies or similar technologies to improve website functionality, understand website usage and provide a better browsing experience.
            </p>
            <p className="text-[var(--text-secondary)]">
              You may be able to manage or disable cookies through your browser settings. Some website features may not function properly if certain cookies are disabled.
            </p>
          </section>

          {/* Section 7 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <UserCheck className="w-5 h-5" /> 7. Your Rights
            </h2>
            <p className="text-[var(--text-secondary)]">
              Subject to applicable law, you may contact us to request access to, correction of, or deletion of your personal information, or to withdraw consent where applicable.
            </p>
            <p className="text-[var(--text-secondary)]">
              To make a request, please contact us using the details provided below.
            </p>
          </section>

          {/* Section 8 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <Baby className="w-5 h-5" /> 8. Children&apos;s Privacy
            </h2>
            <p className="text-[var(--text-secondary)]">
              Our website is not intended to knowingly collect personal information directly from children without appropriate consent or authorisation as required by applicable law.
            </p>
            <p className="text-[var(--text-secondary)]">
              If you believe that a child has provided personal information to us improperly, please contact us so that we can take appropriate action.
            </p>
          </section>

          {/* Section 9 */}
          <section className="space-y-3">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <RefreshCw className="w-5 h-5" /> 9. Changes to This Policy
            </h2>
            <p className="text-[var(--text-secondary)]">
              We may update this Privacy Policy from time to time to reflect changes in our business, website or applicable laws.
            </p>
            <p className="text-[var(--text-secondary)]">
              Any updated version will be published on this page with the revised effective date.
            </p>
          </section>

          {/* Section 10 */}
          <section className="space-y-4 border-t border-[var(--border-color)] pt-6">
            <h2 className="text-xl font-bold font-moresugar text-[var(--text-brand)] flex items-center gap-2">
              <FileText className="w-5 h-5" /> 10. Contact Us
            </h2>
            <p className="text-[var(--text-secondary)]">
              For any questions, concerns or requests regarding your personal information or this Privacy Policy, please contact:
            </p>
            <div className="space-y-2.5 text-sm font-sans text-[var(--text-secondary)] bg-[var(--bg-secondary)] p-5 rounded-2xl border border-[var(--border-color)]">
              <p className="font-bold text-base font-moresugar text-[var(--text-brand)]">The Abbie Store</p>
              <p className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-[var(--text-brand)] shrink-0" />
                <span><strong>Email:</strong> <a href="mailto:info@theabbiestore.in" className="hover:underline text-[var(--text-brand)]">info@theabbiestore.in</a></span>
              </p>
              <p className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-[var(--text-brand)] shrink-0" />
                <span><strong>WhatsApp / Phone:</strong> <a href="tel:+918093143377" className="hover:underline text-[var(--text-brand)]">+91-80931 43377</a></span>
              </p>
              <p className="flex items-center gap-2">
                <svg className="w-4 h-4 fill-current text-[var(--text-brand)] shrink-0" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
                <span><strong>Instagram:</strong> <a href="https://www.instagram.com/theabbiestore.in" target="_blank" rel="noopener noreferrer" className="hover:underline text-[var(--text-brand)]">@theabbiestore.in</a></span>
              </p>
            </div>
          </section>
        </div>

        {/* Footer Note */}
        <div className="text-center text-xs text-[var(--text-secondary)] font-sans pt-4">
          © 2026 The Abbie Store. All rights reserved.
        </div>
      </div>
    </div>
  );
}
