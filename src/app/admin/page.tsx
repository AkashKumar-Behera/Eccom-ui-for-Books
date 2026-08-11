"use client";

import React, { useEffect, useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { notFound } from "next/navigation";
import { ref, get } from "firebase/database";
import { rtdb } from "@/lib/firebase";
import { LayoutDashboard, Package, ShoppingCart, Users, LogOut, ShieldCheck } from "lucide-react";

export default function AdminPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const [isAdminAuthorized, setIsAdminAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    async function verifyAdminSecret() {
      if (authLoading) return;
      if (!user) {
        setIsAdminAuthorized(false);
        return;
      }

      try {
        // Query RTDB secretly for users/{uid}/isAdmin
        const adminRef = ref(rtdb, `users/${user.uid}/isAdmin`);
        const snapshot = await get(adminRef);

        if (snapshot.exists() && snapshot.val() === true) {
          setIsAdminAuthorized(true);
        } else {
          setIsAdminAuthorized(false);
        }
      } catch (err) {
        setIsAdminAuthorized(false);
      }
    }

    verifyAdminSecret();
  }, [user, authLoading]);

  // While checking, render a clean blank page (no loader clue)
  if (authLoading || isAdminAuthorized === null) {
    return null;
  }

  // Strictly trigger Next.js native 404 Page Not Found if unauthorized
  if (isAdminAuthorized === false) {
    notFound();
  }

  return (
    <div className="min-h-screen flex bg-zinc-900 text-zinc-100 font-sans">
      {/* Sidebar */}
      <aside className="w-64 border-r border-zinc-800 bg-zinc-950 p-6 flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-3 mb-8">
            <ShieldCheck className="w-7 h-7 text-[#98C4C5]" />
            <h1 className="text-xl font-bold text-[#98C4C5] tracking-wider font-moresugar">
              ADMIN CONTROL
            </h1>
          </div>

          <nav className="space-y-2 font-moresugar">
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 bg-[#98C4C5]/10 text-[#98C4C5] rounded-2xl font-semibold transition-all"
            >
              <LayoutDashboard className="w-5 h-5" />
              Dashboard
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-2xl transition-all"
            >
              <Package className="w-5 h-5" />
              Products Management
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-2xl transition-all"
            >
              <ShoppingCart className="w-5 h-5" />
              Orders & Shipping
            </a>
            <a
              href="#"
              className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800/50 rounded-2xl transition-all"
            >
              <Users className="w-5 h-5" />
              Customers
            </a>
          </nav>
        </div>

        <button
          onClick={() => logout()}
          className="flex items-center gap-3 px-4 py-3 text-red-400 hover:bg-red-950/40 rounded-2xl font-semibold transition-all font-moresugar"
        >
          <LogOut className="w-5 h-5" />
          Exit Admin Mode
        </button>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-8 overflow-y-auto">
        <header className="flex items-center justify-between pb-6 border-b border-zinc-800 mb-8">
          <div>
            <h2 className="text-3xl font-bold text-white font-moresugar">Store Overview</h2>
            <p className="text-sm text-zinc-400 mt-1">
              Logged in secretly as <span className="text-[#98C4C5] font-semibold">{user?.email || user?.phoneNumber}</span>
            </p>
          </div>
          <div className="bg-[#98C4C5]/20 border border-[#98C4C5]/40 text-[#98C4C5] px-4 py-1.5 rounded-full text-xs font-bold font-moresugar">
            AUTHENTICATED ADMIN
          </div>
        </header>

        {/* Quick Stat Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
            <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Total Revenue</p>
            <h3 className="text-3xl font-bold text-white mt-2 font-moresugar">₹0.00</h3>
            <span className="inline-block mt-2 text-xs text-emerald-400 bg-emerald-950/50 px-2.5 py-1 rounded-full">
              Live Firestore Sync
            </span>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
            <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Total Orders</p>
            <h3 className="text-3xl font-bold text-white mt-2 font-moresugar">0</h3>
            <span className="inline-block mt-2 text-xs text-zinc-400 bg-zinc-800 px-2.5 py-1 rounded-full">
              0 pending
            </span>
          </div>

          <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-6">
            <p className="text-xs text-zinc-400 uppercase tracking-wider font-semibold">Live Inventory</p>
            <h3 className="text-3xl font-bold text-white mt-2 font-moresugar">0 Items</h3>
            <span className="inline-block mt-2 text-xs text-amber-400 bg-amber-950/50 px-2.5 py-1 rounded-full">
              Cloud Storage Ready
            </span>
          </div>
        </div>

        <div className="bg-zinc-950 border border-zinc-800 rounded-3xl p-8 text-center py-16">
          <Package className="w-12 h-12 text-zinc-600 mx-auto mb-4" />
          <h4 className="text-xl font-bold text-white font-moresugar">Secret Admin Console Ready</h4>
          <p className="text-sm text-zinc-400 mt-2 max-w-md mx-auto">
            You are authorized via RTDB (<code className="text-[#98C4C5]">users/{user?.uid}/isAdmin: true</code>). Unauthenticated or non-admin visitors automatically receive a 404 Not Found error.
          </p>
        </div>
      </main>
    </div>
  );
}
