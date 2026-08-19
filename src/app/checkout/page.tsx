"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { collection, addDoc, serverTimestamp, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/context/AuthContext";
import { useCart } from "@/context/CartContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthModal from "@/components/AuthModal";
import {
  ShoppingBag,
  CheckCircle2,
  ShieldCheck,
  Truck,
  ArrowLeft,
  Loader2,
  CreditCard,
  Banknote,
  Sparkles,
  MapPin,
  Phone,
  Mail,
  User,
  ChevronRight,
  AlertCircle,
  Package,
} from "lucide-react";

export default function CheckoutPage() {
  const router = useRouter();
  const { user, loading: authLoading } = useAuth();
  const { items, subtotal, clearCart } = useCart();

  const [isAuthOpen, setIsAuthOpen] = useState(false);

  // Form Fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");
  const [orderNotes, setOrderNotes] = useState("");

  // Payment Selection
  const [paymentMethod, setPaymentMethod] = useState<"COD" | "UPI">("COD");

  // State Management
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [placedOrder, setPlacedOrder] = useState<{
    orderId: string;
    total: number;
    paymentMethod: string;
    itemsCount: number;
  } | null>(null);

  // 1. Auto-fill from user profile if logged in
  useEffect(() => {
    if (!user) return;

    setFullName((prev) => prev || user.displayName || "");
    setEmail((prev) => prev || user.email || "");
    setPhone((prev) => prev || user.phoneNumber || "");

    async function loadSavedAddress() {
      if (!user) return;
      try {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          if (data.displayName && !fullName) setFullName(data.displayName);
          if (data.phone && !phone) setPhone(data.phone);
          if (data.address) {
            if (data.address.street) setStreet(data.address.street);
            if (data.address.city) setCity(data.address.city);
            if (data.address.state) setStateName(data.address.state);
            if (data.address.pincode) setPincode(data.address.pincode);
          }
        }
      } catch (err) {
        console.warn("Could not load user profile address:", err);
      }
    }

    loadSavedAddress();
  }, [user]);

  // Pricing calculations
  const shippingFee = subtotal >= 499 || subtotal === 0 ? 0 : 49;
  const isFreeGiftUnlocked = subtotal >= 499;
  const grandTotal = subtotal + shippingFee;

  // Handle Place Order
  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    if (items.length === 0) {
      setErrorMessage("Your cart is empty. Please add items before checking out.");
      return;
    }

    if (!fullName.trim() || !phone.trim() || !street.trim() || !city.trim() || !pincode.trim()) {
      setErrorMessage("Please fill in all mandatory delivery address fields.");
      return;
    }

    setIsSubmitting(true);

    try {
      // Generate a friendly order reference ID (e.g. ABB-849201)
      const randomSuffix = Math.floor(100000 + Math.random() * 900000);
      const generatedOrderId = `ABB-${randomSuffix}`;

      const orderData = {
        orderId: generatedOrderId,
        userId: user?.uid || "guest",
        customer: {
          name: fullName.trim(),
          email: email.trim() || user?.email || "",
          phone: phone.trim(),
          address: {
            street: street.trim(),
            city: city.trim(),
            state: stateName.trim(),
            pincode: pincode.trim(),
          },
          notes: orderNotes.trim() || null,
        },
        items: items.map((item) => ({
          id: item.id,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
          image: item.image || null,
          category: item.category || null,
        })),
        pricing: {
          subtotal,
          shippingFee,
          grandTotal,
          freeGiftUnlocked: isFreeGiftUnlocked,
        },
        paymentMethod,
        paymentStatus: paymentMethod === "COD" ? "Pending" : "Simulated / Paid",
        orderStatus: "Placed",
        createdAt: serverTimestamp(),
      };

      await addDoc(collection(db, "orders"), orderData);

      setPlacedOrder({
        orderId: generatedOrderId,
        total: grandTotal,
        paymentMethod,
        itemsCount: items.reduce((acc, i) => acc + i.quantity, 0),
      });

      // Clear the local cart
      clearCart();
    } catch (err: any) {
      console.error("Error creating order:", err);
      setErrorMessage(`Failed to place order: ${err.message || "Please try again."}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  // -------------------------------------------------------------
  // SUCCESS SCREEN
  // -------------------------------------------------------------
  if (placedOrder) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
        <Navbar />

        <main className="flex-1 max-w-3xl mx-auto w-full px-4 sm:px-8 py-12 sm:py-16 text-center">
          <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-8 sm:p-12 shadow-md relative overflow-hidden">
            <div className="w-20 h-20 rounded-full bg-[var(--btn-shop)]/30 text-[var(--text-brand)] flex items-center justify-center mx-auto mb-6 text-4xl shadow-inner">
              🎉
            </div>

            <span className="inline-block px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-emerald-500/15 text-emerald-500 border border-emerald-500/30 font-moresugar mb-3">
              Order Confirmed!
            </span>

            <h1 className="font-moresugar font-bold text-2xl sm:text-4xl text-[var(--text-primary)] mb-2">
              Thank You For Your Order!
            </h1>

            <p className="text-sm text-[var(--text-secondary)] max-w-md mx-auto mb-6 font-sans">
              We have received your order and our packaging team is already getting your cute stationery ready!
            </p>

            {/* Receipt Summary Card */}
            <div className="bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl p-5 text-left max-w-lg mx-auto space-y-3 mb-8 text-xs font-sans">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-2.5">
                <span className="text-[var(--text-secondary)]">Order Reference:</span>
                <span className="font-mono font-bold text-sm text-[var(--text-brand)]">
                  #{placedOrder.orderId}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">Payment Method:</span>
                <span className="font-bold text-[var(--text-primary)] font-moresugar">
                  {placedOrder.paymentMethod === "COD" ? "Cash on Delivery" : "UPI Payment"}
                </span>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-[var(--text-secondary)]">Items Ordered:</span>
                <span className="font-bold text-[var(--text-primary)]">
                  {placedOrder.itemsCount} {placedOrder.itemsCount === 1 ? "item" : "items"}
                </span>
              </div>

              <div className="flex items-center justify-between border-t border-[var(--border-color)] pt-2.5">
                <span className="font-bold text-sm text-[var(--text-primary)]">Total Amount:</span>
                <span className="font-moresugar font-bold text-lg text-[var(--text-brand)]">
                  ₹{placedOrder.total.toLocaleString("en-IN")}
                </span>
              </div>

              {isFreeGiftUnlocked && (
                <div className="bg-[var(--btn-shop)]/20 p-2.5 rounded-xl text-center text-[11px] font-bold text-[var(--text-brand)] font-moresugar flex items-center justify-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5" /> Free Handcrafted Kawaii Stickers Included!
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              {user ? (
                <Link
                  href="/profile"
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[var(--btn-shop)] text-[var(--btn-shop-text)] font-bold text-xs font-moresugar hover:bg-[var(--btn-shop-hover)] active:scale-95 transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <Package className="w-4 h-4" />
                  <span>View in My Orders</span>
                </Link>
              ) : (
                <button
                  type="button"
                  onClick={() => setIsAuthOpen(true)}
                  className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[var(--btn-shop)] text-[var(--btn-shop-text)] font-bold text-xs font-moresugar hover:bg-[var(--btn-shop-hover)] active:scale-95 transition-all shadow-xs flex items-center justify-center gap-2"
                >
                  <User className="w-4 h-4" />
                  <span>Link Account to Track Order</span>
                </button>
              )}

              <Link
                href="/shop"
                className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-[var(--bg-secondary)] border border-[var(--border-color)] text-[var(--text-primary)] font-bold text-xs font-moresugar hover:bg-[var(--border-color)] active:scale-95 transition-all flex items-center justify-center gap-2"
              >
                <span>Continue Shopping</span>
                <ChevronRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>
        </main>

        <Footer />
        <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
      </div>
    );
  }

  // -------------------------------------------------------------
  // EMPTY CART SCREEN
  // -------------------------------------------------------------
  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
        <Navbar />

        <main className="flex-1 max-w-lg mx-auto w-full px-6 py-24 text-center">
          <div className="w-20 h-20 rounded-full bg-[var(--btn-shop)]/20 text-[var(--text-brand)] flex items-center justify-center mx-auto mb-4 text-3xl">
            🛍️
          </div>
          <h2 className="font-moresugar font-bold text-2xl text-[var(--text-primary)] mb-2">
            Your Cart is Empty
          </h2>
          <p className="text-xs sm:text-sm text-[var(--text-secondary)] mb-6 font-sans">
            Add your favourite kawaii notebooks, journals, and planners to proceed with checkout.
          </p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-[var(--btn-shop)] text-[var(--btn-shop-text)] font-bold text-xs font-moresugar hover:bg-[var(--btn-shop-hover)] active:scale-95 transition-all shadow-xs"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Shop
          </Link>
        </main>

        <Footer />
      </div>
    );
  }

  // -------------------------------------------------------------
  // MAIN CHECKOUT FORM
  // -------------------------------------------------------------
  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12">
        {/* Header Breadcrumb */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--border-color)]">
          <div className="flex items-center gap-2 text-xs text-[var(--text-secondary)] font-sans">
            <Link href="/shop" className="hover:text-[var(--text-brand)] transition-colors flex items-center gap-1">
              <ArrowLeft className="w-3.5 h-3.5" /> Continue Shopping
            </Link>
            <span>/</span>
            <span className="font-semibold text-[var(--text-primary)]">Checkout</span>
          </div>

          {!user && (
            <button
              type="button"
              onClick={() => setIsAuthOpen(true)}
              className="text-xs text-[var(--text-brand)] font-bold hover:underline font-moresugar cursor-pointer flex items-center gap-1"
            >
              <User className="w-3.5 h-3.5" /> Have an account? Sign In
            </button>
          )}
        </div>

        <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Left Column (7 cols): Shipping Address & Payment */}
          <div className="lg:col-span-7 space-y-6">
            {/* Step 1: Delivery Address */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 shadow-sm space-y-5">
              <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <h2 className="font-moresugar font-bold text-lg text-[var(--text-primary)] flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-[var(--text-brand)]" />
                  1. Delivery Details
                </h2>
                {user && (
                  <span className="text-[11px] text-emerald-500 bg-emerald-500/10 px-2.5 py-0.5 rounded-full font-moresugar font-bold">
                    Profile Linked
                  </span>
                )}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 font-sans">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    placeholder="e.g. Ananya Sharma"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--btn-shop)] transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 font-sans">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--btn-shop)] transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 font-sans">
                  Email Address <span className="text-zinc-400 text-[10px] lowercase font-normal">(for receipt)</span>
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ananya@example.com"
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--btn-shop)] transition-all font-sans"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 font-sans">
                  Flat / House / Street Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Apartment 301, Lotus Garden, MG Road"
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--btn-shop)] transition-all font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 font-sans">
                    City <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Bhubaneswar"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--btn-shop)] transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 font-sans">
                    State
                  </label>
                  <input
                    type="text"
                    value={stateName}
                    onChange={(e) => setStateName(e.target.value)}
                    placeholder="Odisha"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--btn-shop)] transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 font-sans">
                    PIN Code <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="751001"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--btn-shop)] transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 font-sans">
                  Delivery Notes / Landmark <span className="text-zinc-400 text-[10px] lowercase font-normal">(optional)</span>
                </label>
                <input
                  type="text"
                  value={orderNotes}
                  onChange={(e) => setOrderNotes(e.target.value)}
                  placeholder="Near City Mall or Leave at security gate"
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--btn-shop)] transition-all font-sans"
                />
              </div>
            </div>

            {/* Step 2: Payment Method */}
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 shadow-sm space-y-4">
              <h2 className="font-moresugar font-bold text-lg text-[var(--text-primary)] flex items-center gap-2 border-b border-[var(--border-color)] pb-3">
                <CreditCard className="w-5 h-5 text-[var(--text-brand)]" />
                2. Payment Method
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Cash on Delivery */}
                <label
                  onClick={() => setPaymentMethod("COD")}
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "COD"
                      ? "border-[var(--text-brand)] bg-[var(--btn-shop)]/10 shadow-xs"
                      : "border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-[var(--text-brand)]/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "COD"}
                    onChange={() => setPaymentMethod("COD")}
                    className="mt-1"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <Banknote className="w-4 h-4 text-[var(--text-brand)]" />
                      <span className="font-moresugar font-bold text-sm text-[var(--text-primary)]">
                        Cash on Delivery
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] font-sans mt-0.5">
                      Pay cash or scan QR when your package arrives.
                    </p>
                  </div>
                </label>

                {/* Direct UPI / Online */}
                <label
                  onClick={() => setPaymentMethod("UPI")}
                  className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 cursor-pointer transition-all ${
                    paymentMethod === "UPI"
                      ? "border-[var(--text-brand)] bg-[var(--btn-shop)]/10 shadow-xs"
                      : "border-[var(--border-color)] bg-[var(--bg-primary)] hover:border-[var(--text-brand)]/50"
                  }`}
                >
                  <input
                    type="radio"
                    name="paymentMethod"
                    checked={paymentMethod === "UPI"}
                    onChange={() => setPaymentMethod("UPI")}
                    className="mt-1"
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[var(--text-brand)]" />
                      <span className="font-moresugar font-bold text-sm text-[var(--text-primary)]">
                        UPI / Instant Pay
                      </span>
                    </div>
                    <p className="text-[11px] text-[var(--text-secondary)] font-sans mt-0.5">
                      GPay, PhonePe, Paytm, or BHIM UPI instant confirmation.
                    </p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          {/* Right Column (5 cols): Order Summary & Place Order */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 shadow-sm space-y-5 sticky top-24">
              <h3 className="font-moresugar font-bold text-lg text-[var(--text-primary)] flex items-center justify-between border-b border-[var(--border-color)] pb-3">
                <span className="flex items-center gap-2">
                  <ShoppingBag className="w-5 h-5 text-[var(--text-brand)]" />
                  Order Summary
                </span>
                <span className="text-xs text-[var(--text-secondary)] font-sans">
                  {items.length} {items.length === 1 ? "item" : "items"}
                </span>
              </h3>

              {/* Items Mini List */}
              <div className="max-h-64 overflow-y-auto space-y-3 pr-1 no-scrollbar">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center gap-3">
                    <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-[var(--bg-secondary)] border border-[var(--border-color)] shrink-0">
                      {item.image ? (
                        <Image src={item.image} alt={item.title} fill className="object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-lg">🌸</div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-moresugar font-bold text-xs text-[var(--text-primary)] truncate">
                        {item.title}
                      </p>
                      <p className="text-[10px] text-[var(--text-secondary)] font-sans">
                        Qty: {item.quantity} × ₹{item.price.toLocaleString("en-IN")}
                      </p>
                    </div>
                    <span className="font-moresugar font-bold text-xs text-[var(--text-brand)]">
                      ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                    </span>
                  </div>
                ))}
              </div>

              {/* Price Breakdown */}
              <div className="border-t border-[var(--border-color)] pt-4 space-y-2 text-xs font-sans">
                <div className="flex items-center justify-between text-[var(--text-secondary)]">
                  <span>Items Subtotal</span>
                  <span className="font-bold text-[var(--text-primary)] font-moresugar">
                    ₹{subtotal.toLocaleString("en-IN")}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[var(--text-secondary)]">
                  <span>Shipping Fee</span>
                  <span className={`font-bold font-moresugar ${shippingFee === 0 ? "text-emerald-500" : "text-[var(--text-primary)]"}`}>
                    {shippingFee === 0 ? "FREE" : `₹${shippingFee}`}
                  </span>
                </div>

                {isFreeGiftUnlocked && (
                  <div className="flex items-center justify-between text-pink-500 font-bold font-moresugar text-[11px] bg-pink-500/10 p-2 rounded-xl">
                    <span className="flex items-center gap-1">
                      <Sparkles className="w-3.5 h-3.5" /> Free Kawaii Sticker Pack
                    </span>
                    <span>FREE</span>
                  </div>
                )}

                <div className="border-t border-[var(--border-color)] pt-3 flex items-center justify-between">
                  <span className="font-moresugar font-bold text-base text-[var(--text-primary)]">
                    Grand Total
                  </span>
                  <span className="font-moresugar font-bold text-2xl text-[var(--text-brand)]">
                    ₹{grandTotal.toLocaleString("en-IN")}
                  </span>
                </div>
              </div>

              {/* Error Message if any */}
              {errorMessage && (
                <div className="flex items-center gap-2 p-3 rounded-2xl bg-red-500/10 border border-red-500/30 text-red-500 text-xs font-sans">
                  <AlertCircle className="w-4 h-4 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex items-center justify-center gap-2 py-4 rounded-full bg-[var(--btn-shop)] text-[var(--btn-shop-text)] font-moresugar font-bold text-base hover:bg-[var(--btn-shop-hover)] active:scale-98 transition-all shadow-md cursor-pointer disabled:opacity-50 disabled:pointer-events-none"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    <span>Placing Order...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle2 className="w-5 h-5" />
                    <span>Place Order (₹{grandTotal.toLocaleString("en-IN")})</span>
                  </>
                )}
              </button>

              {/* Trust Badges */}
              <div className="grid grid-cols-2 gap-2 pt-2 border-t border-[var(--border-color)] text-[10px] text-[var(--text-secondary)]">
                <div className="flex items-center gap-1.5">
                  <Truck className="w-3.5 h-3.5 text-[var(--text-brand)]" />
                  <span>Dispatch in 2-3 Days</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-[var(--text-brand)]" />
                  <span>100% Genuine Quality</span>
                </div>
              </div>
            </div>
          </div>
        </form>
      </main>

      <Footer />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} />
    </div>
  );
}
