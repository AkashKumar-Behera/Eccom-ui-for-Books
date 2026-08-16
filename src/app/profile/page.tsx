"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { ref, get } from "firebase/database";
import { db, rtdb } from "@/lib/firebase";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  User,
  Mail,
  Phone,
  MapPin,
  ShieldCheck,
  Package,
  LogOut,
  Sparkles,
  Save,
  Loader2,
  CheckCircle2,
  ExternalLink,
  ShoppingBag,
  Heart,
  Calendar,
} from "lucide-react";

interface UserProfileData {
  displayName?: string;
  phone?: string;
  address?: {
    street: string;
    city: string;
    state: string;
    pincode: string;
  };
}

export default function ProfilePage() {
  const { user, loading: authLoading, logout } = useAuth();
  const router = useRouter();

  const [isAdmin, setIsAdmin] = useState(false);
  const [loadingData, setLoadingData] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [savedFeedback, setSavedFeedback] = useState(false);

  // Editable Form Fields
  const [displayName, setDisplayName] = useState("");
  const [phone, setPhone] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [stateName, setStateName] = useState("");
  const [pincode, setPincode] = useState("");

  // 1. Redirect to home if not logged in after auth finishes
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/");
    }
  }, [user, authLoading, router]);

  // 2. Load User Profile & Admin status
  useEffect(() => {
    if (!user) return;
    const currentUser = user;

    async function loadProfile() {
      try {
        setDisplayName(currentUser.displayName || "");
        setPhone(currentUser.phoneNumber || "");

        // Check Admin
        try {
          const adminSnap = await get(ref(rtdb, `users/${currentUser.uid}/isAdmin`));
          if (adminSnap.exists() && adminSnap.val() === true) {
            setIsAdmin(true);
          }
        } catch (e) {
          console.warn("Could not fetch admin status:", e);
        }

        // Fetch Firestore profile data
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          const data = docSnap.data() as UserProfileData;
          if (data.displayName) setDisplayName(data.displayName);
          if (data.phone) setPhone(data.phone);
          if (data.address) {
            setStreet(data.address.street || "");
            setCity(data.address.city || "");
            setStateName(data.address.state || "");
            setPincode(data.address.pincode || "");
          }
        }
      } catch (err) {
        console.error("Error loading profile:", err);
      } finally {
        setLoadingData(false);
      }
    }

    loadProfile();
  }, [user]);

  // Save address & info to Firestore
  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    const currentUser = user;

    setIsSaving(true);
    try {
      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          displayName: displayName.trim(),
          phone: phone.trim(),
          email: currentUser.email || "",
          address: {
            street: street.trim(),
            city: city.trim(),
            state: stateName.trim(),
            pincode: pincode.trim(),
          },
          updatedAt: new Date().toISOString(),
        },
        { merge: true }
      );

      setSavedFeedback(true);
      setTimeout(() => setSavedFeedback(false), 3000);
    } catch (err: any) {
      alert(`Could not save profile: ${err.message}`);
    } finally {
      setIsSaving(false);
    }
  };

  if (authLoading || !user) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)]">
        <Loader2 className="w-8 h-8 animate-spin text-[var(--text-brand)] mb-3" />
        <p className="font-moresugar text-base text-[var(--text-secondary)]">Loading Account...</p>
      </div>
    );
  }

  const initialLetter = (user.displayName || user.email || user.phoneNumber || "A")[0].toUpperCase();

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[var(--bg-primary)] text-[var(--text-primary)] transition-colors duration-200">
      <Navbar />

      <main className="flex-1 max-w-5xl mx-auto w-full px-4 sm:px-8 py-8 sm:py-12">
        {/* Profile Header Banner */}
        <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 shadow-sm mb-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--btn-shop)]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-6 relative z-10">
            <div className="flex flex-col sm:flex-row items-center sm:items-start gap-5 text-center sm:text-left">
              {/* Avatar */}
              <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-full overflow-hidden border-4 border-[var(--border-color)] shadow-md flex items-center justify-center bg-[var(--btn-shop)]/30 text-[var(--text-brand)] shrink-0">
                {user.photoURL ? (
                  /* eslint-disable-next-line @next/next/no-img-element */
                  <img
                    src={user.photoURL}
                    alt={user.displayName || "User"}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-3xl sm:text-4xl font-bold font-moresugar">{initialLetter}</span>
                )}
              </div>

              {/* Info */}
              <div className="space-y-1.5">
                <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2">
                  <h1 className="font-moresugar font-bold text-2xl sm:text-3xl text-[var(--text-brand)]">
                    {user.displayName || displayName || "Abbie Customer"}
                  </h1>
                  {isAdmin && (
                    <span className="inline-flex items-center gap-1 bg-amber-500/15 border border-amber-500/30 text-amber-500 text-[11px] font-bold px-2.5 py-0.5 rounded-full font-moresugar">
                      <ShieldCheck className="w-3.5 h-3.5" /> Admin
                    </span>
                  )}
                </div>

                <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans flex items-center justify-center sm:justify-start gap-1.5">
                  <Mail className="w-3.5 h-3.5" />
                  {user.email || "No email linked"}
                </p>

                {user.phoneNumber && (
                  <p className="text-xs sm:text-sm text-[var(--text-secondary)] font-sans flex items-center justify-center sm:justify-start gap-1.5">
                    <Phone className="w-3.5 h-3.5" />
                    {user.phoneNumber}
                  </p>
                )}
              </div>
            </div>

            {/* Logout & Admin Action Buttons */}
            <div className="flex flex-row sm:flex-col items-center gap-3 w-full sm:w-auto">
              {isAdmin && (
                <Link
                  href="/admin"
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-[#121c1d] text-[#98C4C5] border border-[#98C4C5]/40 text-xs font-bold font-moresugar hover:bg-[#1a2729] transition-all shadow-xs"
                >
                  <ShieldCheck className="w-4 h-4" />
                  Admin Panel
                </Link>
              )}

              <button
                type="button"
                onClick={() => logout()}
                className="w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-2.5 rounded-full bg-red-500/10 hover:bg-red-500/20 text-red-500 border border-red-500/20 text-xs font-bold font-moresugar transition-all cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Sign Out
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Grid: Saved Address & Orders Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          {/* Column 1 & 2: Shipping & Delivery Details */}
          <div className="md:col-span-2 bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 sm:p-8 shadow-sm">
            <div className="flex items-center justify-between pb-4 border-b border-[var(--border-color)] mb-6">
              <div>
                <h3 className="font-moresugar font-bold text-lg sm:text-xl text-[var(--text-brand)] flex items-center gap-2">
                  <MapPin className="w-5 h-5" />
                  Shipping & Delivery Address
                </h3>
                <p className="text-xs text-[var(--text-secondary)] mt-0.5 font-sans">
                  Saved address for express checkout on cute stationery orders
                </p>
              </div>
            </div>

            {savedFeedback && (
              <div className="mb-6 p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-600 text-xs sm:text-sm font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                Profile and address updated successfully!
              </div>
            )}

            <form onSubmit={handleSaveProfile} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 font-sans">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    placeholder="e.g. Akash Kumar"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--btn-shop)] transition-all font-sans"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 font-sans">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="+91 98765 43210"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--btn-shop)] transition-all font-sans"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 font-sans">
                  Flat / House / Street Address
                </label>
                <input
                  type="text"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                  placeholder="Apartment 402, Sunshine Residency, Main Road"
                  className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--btn-shop)] transition-all font-sans"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-[var(--text-secondary)] mb-1.5 font-sans">
                    City
                  </label>
                  <input
                    type="text"
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
                    PIN Code
                  </label>
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    placeholder="751001"
                    className="w-full bg-[var(--bg-primary)] border border-[var(--border-color)] rounded-2xl px-4 py-2.5 text-xs sm:text-sm text-[var(--text-primary)] focus:outline-none focus:border-[var(--btn-shop)] transition-all font-sans"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end">
                <button
                  type="submit"
                  disabled={isSaving}
                  className="flex items-center gap-2 px-6 py-2.5 rounded-full bg-[var(--btn-shop)] text-[var(--btn-shop-text)] text-xs font-bold font-moresugar hover:bg-[var(--btn-shop-hover)] active:scale-95 transition-all shadow-xs cursor-pointer disabled:opacity-50"
                >
                  {isSaving ? (
                    <>
                      <Loader2 className="w-3.5 h-3.5 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-3.5 h-3.5" />
                      Save Address
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Column 3: My Orders Quick Glance */}
          <div className="space-y-6">
            <div className="bg-[var(--card-bg)] border border-[var(--border-color)] rounded-3xl p-6 shadow-sm">
              <h3 className="font-moresugar font-bold text-lg text-[var(--text-brand)] mb-1 flex items-center gap-2">
                <ShoppingBag className="w-4 h-4" />
                My Orders
              </h3>
              <p className="text-xs text-[var(--text-secondary)] mb-6 font-sans">
                Track your active shipments & order history
              </p>

              <div className="py-8 text-center border border-dashed border-[var(--border-color)] rounded-2xl bg-[var(--bg-primary)]/50 p-4">
                <Package className="w-8 h-8 text-[var(--text-secondary)] mx-auto mb-2 opacity-50" />
                <p className="font-moresugar font-bold text-sm text-[var(--text-primary)]">No Orders Yet</p>
                <p className="text-[11px] text-[var(--text-secondary)] font-sans mt-0.5 mb-4">
                  Explore our kawaii stationery and place your first order!
                </p>
                <Link
                  href="/shop"
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-[var(--btn-shop)] text-[var(--btn-shop-text)] text-xs font-bold font-moresugar hover:scale-105 transition-all shadow-2xs"
                >
                  Start Shopping →
                </Link>
              </div>
            </div>

            {/* Loyalty Card */}
            <div className="bg-gradient-to-br from-[var(--btn-shop)]/20 via-[var(--card-bg)] to-[var(--bg-primary)] border border-[var(--border-color)] rounded-3xl p-6 shadow-sm space-y-2">
              <div className="flex items-center gap-2 text-[var(--text-brand)]">
                <Sparkles className="w-4 h-4" />
                <span className="font-moresugar font-bold text-sm">Abbie Club Member</span>
              </div>
              <p className="text-xs text-[var(--text-secondary)] font-sans">
                Enjoy free handcrafted aesthetic stickers on every stationery order above ₹499! 🌸
              </p>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
