"use client";

import React, { useEffect, useState, useRef } from "react";
import { useAuth } from "@/context/AuthContext";
import { notFound } from "next/navigation";
import { ref, get } from "firebase/database";
import {
  collection,
  addDoc,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import {
  ref as storageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";
import { db, storage, rtdb } from "@/lib/firebase";
import {
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
  LogOut,
  ShieldCheck,
  UploadCloud,
  X,
  Trash2,
  Loader2,
  CheckCircle2,
  AlertCircle,
  Image as ImageIcon,
  Search,
  Plus,
  TrendingUp,
  Boxes,
  Menu,
  SlidersHorizontal,
  ExternalLink,
} from "lucide-react";
import Image from "next/image";
import CustomSelect from "@/components/CustomSelect";

interface Product {
  id: string;
  title: string;
  category: string;
  price: number;
  stock: number;
  description: string;
  images: string[];
  createdAt?: any;
}

interface Banner {
  id: string;
  imageUrl: string;
  title?: string;
  link?: string;
  createdAt?: any;
}

const CATEGORIES = [
  { id: "our-diary", name: "Our Diary" },
  { id: "notebooks", name: "Notebooks" },
  { id: "journals", name: "Journals" },
  { id: "weekly-planners", name: "Weekly Planners" },
  { id: "mini-notepads", name: "Mini Notepads" },
  { id: "colouring-books", name: "Stress-Relief Colouring Books" },
  { id: "to-do-lists", name: "To-Do Lists" },
  { id: "business-kit", name: "Business Kit" },
  { id: "customized-products", name: "Customized Products" },
];

export default function AdminPage() {
  const { user, loading: authLoading, logout } = useAuth();
  const [isAdminAuthorized, setIsAdminAuthorized] = useState<boolean | null>(null);

  // Active Tab & Mobile Drawer State
  const [activeTab, setActiveTab] = useState<
    "dashboard" | "products" | "banners" | "orders" | "customers"
  >("dashboard");
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Product Form State
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDescription] = useState("");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [filePreviews, setFilePreviews] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  // Products List State
  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Banners State
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loadingBanners, setLoadingBanners] = useState(true);
  const [bannerTitle, setBannerTitle] = useState("");
  const [bannerLink, setBannerLink] = useState("/shop");
  const [bannerFile, setBannerFile] = useState<File | null>(null);
  const [bannerPreview, setBannerPreview] = useState<string | null>(null);
  const [isSubmittingBanner, setIsSubmittingBanner] = useState(false);
  const [bannerFeedback, setBannerFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);
  const [deletingBannerId, setDeletingBannerId] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const bannerFileInputRef = useRef<HTMLInputElement>(null);

  // 1. Verify Admin Access via RTDB
  useEffect(() => {
    async function verifyAdminSecret() {
      if (authLoading) return;
      if (!user) {
        setIsAdminAuthorized(false);
        return;
      }

      try {
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

  // 2. Real-time sync with Firestore Products Collection
  useEffect(() => {
    if (!isAdminAuthorized) return;

    try {
      const q = query(collection(db, "products"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items: Product[] = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          })) as Product[];
          setProducts(items);
          setLoadingProducts(false);
        },
        (error) => {
          console.warn("Firestore onSnapshot fallback:", error);
          const fallbackUnsub = onSnapshot(collection(db, "products"), (snapshot) => {
            const items: Product[] = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
            })) as Product[];
            setProducts(items);
            setLoadingProducts(false);
          });
          return () => fallbackUnsub();
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up products listener:", err);
      setLoadingProducts(false);
    }
  }, [isAdminAuthorized]);

  // 3. Real-time sync with Firestore Banners Collection
  useEffect(() => {
    if (!isAdminAuthorized) return;

    try {
      const q = query(collection(db, "banners"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          const items: Banner[] = snapshot.docs.map((docSnap) => ({
            id: docSnap.id,
            ...docSnap.data(),
          })) as Banner[];
          setBanners(items);
          setLoadingBanners(false);
        },
        (error) => {
          console.warn("Banners onSnapshot fallback:", error);
          const fallbackUnsub = onSnapshot(collection(db, "banners"), (snapshot) => {
            const items: Banner[] = snapshot.docs.map((docSnap) => ({
              id: docSnap.id,
              ...docSnap.data(),
            })) as Banner[];
            setBanners(items);
            setLoadingBanners(false);
          });
          return () => fallbackUnsub();
        }
      );

      return () => unsubscribe();
    } catch (err) {
      console.error("Error setting up banners listener:", err);
      setLoadingBanners(false);
    }
  }, [isAdminAuthorized]);

  // Lock body scroll when mobile sidebar is open
  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isMobileSidebarOpen]);

  // Handle Product Image Selection
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const files = Array.from(e.target.files);
    setSelectedFiles((prev) => [...prev, ...files]);

    const newPreviews = files.map((file) => URL.createObjectURL(file));
    setFilePreviews((prev) => [...prev, ...newPreviews]);
  };

  const removeSelectedFile = (index: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== index));
    setFilePreviews((prev) => {
      URL.revokeObjectURL(prev[index]);
      return prev.filter((_, i) => i !== index);
    });
  };

  // Submit Product to Firestore + Storage
  const handleCreateProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormFeedback(null);

    if (!title.trim() || !category || !price || !stock) {
      setFormFeedback({
        type: "error",
        message: "Please fill in all required fields (Title, Category, Price, Stock Quantity).",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const uploadedImageUrls: string[] = [];

      for (const file of selectedFiles) {
        const cleanFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_");
        const fileStoragePath = `products/${Date.now()}_${cleanFileName}`;
        const imageRef = storageRef(storage, fileStoragePath);

        const uploadResult = await uploadBytes(imageRef, file);
        const downloadUrl = await getDownloadURL(uploadResult.ref);
        uploadedImageUrls.push(downloadUrl);
      }

      await addDoc(collection(db, "products"), {
        title: title.trim(),
        category,
        price: parseFloat(price) || 0,
        stock: parseInt(stock, 10) || 0,
        description: description.trim(),
        images: uploadedImageUrls,
        createdAt: serverTimestamp(),
      });

      // Reset form
      setTitle("");
      setCategory("");
      setPrice("");
      setStock("");
      setDescription("");
      setSelectedFiles([]);
      filePreviews.forEach((url) => URL.revokeObjectURL(url));
      setFilePreviews([]);
      if (fileInputRef.current) fileInputRef.current.value = "";

      setFormFeedback({
        type: "success",
        message: "🎉 Product published and listed successfully!",
      });

      setTimeout(() => {
        setFormFeedback(null);
      }, 4000);
    } catch (err: any) {
      console.error("Failed to save product:", err);
      setFormFeedback({
        type: "error",
        message: `Failed to create product: ${err.message || "Unknown error occurred"}`,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  // Delete Product
  const handleDeleteProduct = async (productId: string) => {
    if (!confirm("Are you sure you want to delete this product from the store?")) return;
    setDeletingId(productId);
    try {
      await deleteDoc(doc(db, "products", productId));
    } catch (err: any) {
      alert(`Could not delete product: ${err.message}`);
    } finally {
      setDeletingId(null);
    }
  };

  // Handle Banner Image Change
  const handleBannerFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const file = e.target.files[0];
    setBannerFile(file);
    if (bannerPreview) URL.revokeObjectURL(bannerPreview);
    setBannerPreview(URL.createObjectURL(file));
  };

  // Upload & Publish New Banner
  const handleCreateBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    setBannerFeedback(null);

    if (!bannerFile) {
      setBannerFeedback({
        type: "error",
        message: "Please select a banner image to upload.",
      });
      return;
    }

    setIsSubmittingBanner(true);

    try {
      const cleanFileName = bannerFile.name.replace(/[^a-zA-Z0-9.-]/g, "_");
      const fileStoragePath = `banners/${Date.now()}_${cleanFileName}`;
      const imageRef = storageRef(storage, fileStoragePath);

      const uploadResult = await uploadBytes(imageRef, bannerFile);
      const downloadUrl = await getDownloadURL(uploadResult.ref);

      await addDoc(collection(db, "banners"), {
        imageUrl: downloadUrl,
        title: bannerTitle.trim() || "Store Banner",
        link: bannerLink.trim() || "/shop",
        createdAt: serverTimestamp(),
      });

      // Reset
      setBannerTitle("");
      setBannerLink("/shop");
      setBannerFile(null);
      if (bannerPreview) URL.revokeObjectURL(bannerPreview);
      setBannerPreview(null);
      if (bannerFileInputRef.current) bannerFileInputRef.current.value = "";

      setBannerFeedback({
        type: "success",
        message: "🎉 Banner published successfully to homepage carousel!",
      });

      setTimeout(() => {
        setBannerFeedback(null);
      }, 4000);
    } catch (err: any) {
      console.error("Failed to upload banner:", err);
      setBannerFeedback({
        type: "error",
        message: `Failed to upload banner: ${err.message || "Unknown error occurred"}`,
      });
    } finally {
      setIsSubmittingBanner(false);
    }
  };

  // Delete Banner
  const handleDeleteBanner = async (bannerId: string) => {
    if (!confirm("Are you sure you want to remove this banner from the store?")) return;
    setDeletingBannerId(bannerId);
    try {
      await deleteDoc(doc(db, "banners", bannerId));
    } catch (err: any) {
      alert(`Could not delete banner: ${err.message}`);
    } finally {
      setDeletingBannerId(null);
    }
  };

  // Calculations
  const totalStockItems = products.reduce((acc, p) => acc + (p.stock || 0), 0);
  const totalInventoryValue = products.reduce((acc, p) => acc + (p.price || 0) * (p.stock || 0), 0);

  // Filtered Products
  const filteredProducts = products.filter((p) => {
    const matchesSearch =
      p.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.category?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory = categoryFilter === "all" || p.category === categoryFilter;

    return matchesSearch && matchesCategory;
  });

  if (authLoading || isAdminAuthorized === null) {
    return null;
  }

  if (isAdminAuthorized === false) {
    notFound();
  }

  const renderNavLinks = () => (
    <>
      <button
        onClick={() => {
          setActiveTab("dashboard");
          setIsMobileSidebarOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all cursor-pointer ${
          activeTab === "dashboard"
            ? "bg-[#98C4C5] text-[#121c1d] shadow-lg shadow-[#98C4C5]/20 font-bold"
            : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
      >
        <LayoutDashboard className="w-5 h-5 shrink-0" />
        Dashboard
      </button>

      <button
        onClick={() => {
          setActiveTab("products");
          setIsMobileSidebarOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all cursor-pointer ${
          activeTab === "products"
            ? "bg-[#98C4C5] text-[#121c1d] shadow-lg shadow-[#98C4C5]/20 font-bold"
            : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
      >
        <Package className="w-5 h-5 shrink-0" />
        <span>Products</span>
      </button>

      <button
        onClick={() => {
          setActiveTab("banners");
          setIsMobileSidebarOpen(false);
        }}
        className={`w-full flex items-center justify-between px-4 py-3 rounded-2xl font-semibold transition-all cursor-pointer ${
          activeTab === "banners"
            ? "bg-[#98C4C5] text-[#121c1d] shadow-lg shadow-[#98C4C5]/20 font-bold"
            : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
      >
        <div className="flex items-center gap-3">
          <ImageIcon className="w-5 h-5 shrink-0" />
          <span>Banners</span>
        </div>
        {banners.length > 0 && (
          <span
            className={`text-xs px-2 py-0.5 rounded-full font-sans ${
              activeTab === "banners" ? "bg-[#121c1d] text-[#98C4C5]" : "bg-white/10 text-white"
            }`}
          >
            {banners.length}
          </span>
        )}
      </button>

      <button
        onClick={() => {
          setActiveTab("orders");
          setIsMobileSidebarOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all cursor-pointer ${
          activeTab === "orders"
            ? "bg-[#98C4C5] text-[#121c1d] shadow-lg shadow-[#98C4C5]/20 font-bold"
            : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
      >
        <ShoppingCart className="w-5 h-5 shrink-0" />
        Orders & Shipping
      </button>

      <button
        onClick={() => {
          setActiveTab("customers");
          setIsMobileSidebarOpen(false);
        }}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-2xl font-semibold transition-all cursor-pointer ${
          activeTab === "customers"
            ? "bg-[#98C4C5] text-[#121c1d] shadow-lg shadow-[#98C4C5]/20 font-bold"
            : "text-zinc-400 hover:text-white hover:bg-white/5"
        }`}
      >
        <Users className="w-5 h-5 shrink-0" />
        Customers
      </button>
    </>
  );

  return (
    <div className="min-h-screen flex flex-col md:flex-row bg-[#0d1314] text-zinc-100 font-sans selection:bg-[#98C4C5] selection:text-[#1E4B4C]">
      {/* Mobile Top App Bar */}
      <div className="md:hidden flex items-center justify-between p-4 bg-[#121c1d] border-b border-white/10 sticky top-0 z-40">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setIsMobileSidebarOpen(true)}
            className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-white cursor-pointer"
            aria-label="Open Navigation"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-[#98C4C5]" />
            <span className="font-bold text-white font-moresugar tracking-wider text-sm">
              ABBIE ADMIN
            </span>
          </div>
        </div>

        <span className="text-[10px] bg-[#98C4C5]/15 border border-[#98C4C5]/30 text-[#98C4C5] px-2.5 py-1 rounded-full font-bold font-moresugar">
          LIVE
        </span>
      </div>

      {/* Mobile Slide-Out Drawer Overlay */}
      {isMobileSidebarOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm transition-opacity"
            onClick={() => setIsMobileSidebarOpen(false)}
          />

          <div className="fixed inset-y-0 left-0 w-72 bg-[#121c1d] border-r border-white/10 p-6 flex flex-col justify-between shadow-2xl z-10 animate-in slide-in-from-left duration-200">
            <div>
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-[#98C4C5]/15 border border-[#98C4C5]/30 flex items-center justify-center text-[#98C4C5]">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <div>
                    <h1 className="text-base font-bold text-white font-moresugar tracking-wider">
                      ABBIE STORE
                    </h1>
                    <span className="text-[10px] text-[#98C4C5] font-semibold uppercase tracking-widest block">
                      Admin Panel
                    </span>
                  </div>
                </div>

                <button
                  onClick={() => setIsMobileSidebarOpen(false)}
                  className="w-8 h-8 rounded-full bg-white/5 hover:bg-white/10 flex items-center justify-center text-zinc-400 hover:text-white cursor-pointer"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              <nav className="space-y-1.5 font-moresugar">{renderNavLinks()}</nav>
            </div>

            <div className="pt-6 border-t border-white/10">
              <button
                onClick={() => logout()}
                className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-2xl font-semibold transition-all font-moresugar text-sm cursor-pointer"
              >
                <LogOut className="w-4 h-4" />
                Exit Admin Mode
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Desktop Sticky Sidebar */}
      <aside className="hidden md:flex md:w-64 border-r border-white/10 bg-[#121c1d]/95 backdrop-blur-xl p-6 flex-col justify-between shrink-0 h-screen sticky top-0">
        <div>
          <div className="flex items-center gap-3 mb-8 px-2">
            <div className="w-10 h-10 rounded-2xl bg-[#98C4C5]/15 border border-[#98C4C5]/30 flex items-center justify-center shadow-lg shadow-[#98C4C5]/10">
              <ShieldCheck className="w-6 h-6 text-[#98C4C5]" />
            </div>
            <div>
              <h1 className="text-base font-bold text-white tracking-wider font-moresugar">
                ABBIE STORE
              </h1>
              <span className="text-[10px] text-[#98C4C5] font-semibold uppercase tracking-widest block">
                Admin Panel
              </span>
            </div>
          </div>

          <nav className="space-y-1.5 font-moresugar">{renderNavLinks()}</nav>
        </div>

        <div className="pt-6 border-t border-white/10">
          <button
            onClick={() => logout()}
            className="w-full flex items-center gap-3 px-4 py-3 text-red-400 hover:text-red-300 hover:bg-red-950/30 rounded-2xl font-semibold transition-all font-moresugar text-sm cursor-pointer"
          >
            <LogOut className="w-4 h-4" />
            Exit Admin Mode
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 p-4 sm:p-6 md:p-8 overflow-y-auto max-w-7xl mx-auto w-full">
        {/* Header Bar */}
        <header className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-white/10 mb-8 gap-4">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-white font-moresugar tracking-wide">
              {activeTab === "dashboard" && "Store Overview & Live Inventory"}
              {activeTab === "products" && "Products Management"}
              {activeTab === "banners" && "Hero Banners & Carousel Manager"}
              {activeTab === "orders" && "Orders & Shipping Tracker"}
              {activeTab === "customers" && "Registered Customers"}
            </h2>
            <p className="text-xs sm:text-sm text-zinc-400 mt-1">
              Admin Session:{" "}
              <span className="text-[#98C4C5] font-semibold">
                {user?.email || user?.phoneNumber}
              </span>
            </p>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="inline-flex items-center gap-2 bg-[#98C4C5]/15 border border-[#98C4C5]/30 text-[#98C4C5] px-4 py-1.5 rounded-full text-xs font-bold font-moresugar shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#98C4C5] animate-pulse"></span>
              LIVE FIREBASE
            </span>
          </div>
        </header>

        {/* Quick KPI Stat Cards (Only visible on Dashboard tab) */}
        {activeTab === "dashboard" && (
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-8">
            <div className="bg-[#121c1d]/80 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 hover:border-[#98C4C5]/40 transition-all group">
              <div className="flex items-center justify-between">
                <p className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                  Listed Products
                </p>
                <div className="w-7 h-7 sm:w-8 h-8 rounded-lg sm:rounded-xl bg-[#98C4C5]/15 flex items-center justify-center text-[#98C4C5]">
                  <Package className="w-3.5 h-3.5 sm:w-4 h-4" />
                </div>
              </div>
              <h3 className="text-xl sm:text-3xl font-bold text-white mt-1.5 sm:mt-2 font-moresugar">
                {products.length}
              </h3>
              <span className="inline-flex items-center gap-1 mt-1.5 sm:mt-2 text-[9px] sm:text-[11px] text-emerald-400 bg-emerald-950/50 px-2 py-0.5 rounded-full font-medium">
                <TrendingUp className="w-2.5 h-2.5 sm:w-3 h-3" /> Live
              </span>
            </div>

            <div className="bg-[#121c1d]/80 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 hover:border-[#98C4C5]/40 transition-all group">
              <div className="flex items-center justify-between">
                <p className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                  Total Stock
                </p>
                <div className="w-7 h-7 sm:w-8 h-8 rounded-lg sm:rounded-xl bg-amber-500/15 flex items-center justify-center text-amber-400">
                  <Boxes className="w-3.5 h-3.5 sm:w-4 h-4" />
                </div>
              </div>
              <h3 className="text-xl sm:text-3xl font-bold text-white mt-1.5 sm:mt-2 font-moresugar">
                {totalStockItems}
              </h3>
              <span className="inline-block mt-1.5 sm:mt-2 text-[9px] sm:text-[11px] text-amber-400 bg-amber-950/50 px-2 py-0.5 rounded-full font-medium">
                Units
              </span>
            </div>

            <div className="bg-[#121c1d]/80 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 hover:border-[#98C4C5]/40 transition-all group">
              <div className="flex items-center justify-between">
                <p className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                  Inventory Value
                </p>
                <div className="w-7 h-7 sm:w-8 h-8 rounded-lg sm:rounded-xl bg-[#98C4C5]/15 flex items-center justify-center text-[#98C4C5] font-bold text-xs sm:text-sm">
                  ₹
                </div>
              </div>
              <h3 className="text-xl sm:text-3xl font-bold text-white mt-1.5 sm:mt-2 font-moresugar truncate">
                ₹{totalInventoryValue.toLocaleString("en-IN")}
              </h3>
              <span className="inline-block mt-1.5 sm:mt-2 text-[9px] sm:text-[11px] text-[#98C4C5] bg-[#98C4C5]/10 px-2 py-0.5 rounded-full font-medium">
                Retail
              </span>
            </div>

            <div className="bg-[#121c1d]/80 border border-white/10 rounded-2xl sm:rounded-3xl p-4 sm:p-5 hover:border-[#98C4C5]/40 transition-all group">
              <div className="flex items-center justify-between">
                <p className="text-[10px] sm:text-xs text-zinc-400 uppercase tracking-wider font-semibold">
                  Live Banners
                </p>
                <div className="w-7 h-7 sm:w-8 h-8 rounded-lg sm:rounded-xl bg-purple-500/15 flex items-center justify-center text-purple-400">
                  <ImageIcon className="w-3.5 h-3.5 sm:w-4 h-4" />
                </div>
              </div>
              <h3 className="text-xl sm:text-3xl font-bold text-white mt-1.5 sm:mt-2 font-moresugar">
                {banners.length}
              </h3>
              <span className="inline-block mt-1.5 sm:mt-2 text-[9px] sm:text-[11px] text-purple-400 bg-purple-950/50 px-2 py-0.5 rounded-full font-medium">
                {banners.length > 1 ? "Carousel Active" : "Static Slide"}
              </span>
            </div>
          </div>
        )}

        {/* Tab 1 & Tab 2: Dashboard & Products Views */}
        <div className="space-y-8 sm:space-y-10">
          {/* Form: Add New Product (Only visible in 'Products' tab) */}
          {activeTab === "products" && (
            <div className="bg-[#121c1d]/90 border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-96 h-96 bg-[#98C4C5]/5 rounded-full blur-3xl pointer-events-none"></div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-white/10 gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white font-moresugar flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#98C4C5]/20 flex items-center justify-center text-[#98C4C5]">
                    <Plus className="w-5 h-5" />
                  </div>
                  Add New Product to Store
                </h3>
                <span className="text-xs text-zinc-400 font-medium">
                  Fields marked with <span className="text-red-400">*</span> are required
                </span>
              </div>

              {/* Feedback Alert */}
              {formFeedback && (
                <div
                  className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${
                    formFeedback.type === "success"
                      ? "bg-emerald-950/70 border border-emerald-500/40 text-emerald-300"
                      : "bg-red-950/70 border border-red-500/40 text-red-300"
                  }`}
                >
                  {formFeedback.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                  )}
                  <span>{formFeedback.message}</span>
                </div>
              )}

              <form onSubmit={handleCreateProduct} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  {/* 1. Product Title */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Product Title <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => setTitle(e.target.value)}
                      placeholder="e.g. Dreamers Floral Daily Planner"
                      className="w-full bg-[#0d1314] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#98C4C5] focus:ring-1 focus:ring-[#98C4C5] transition-all"
                    />
                  </div>

                  {/* 2. Category Dropdown */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Category <span className="text-red-400">*</span>
                    </label>
                    <CustomSelect
                      options={CATEGORIES}
                      value={category}
                      onChange={(val) => setCategory(val)}
                      placeholder="Select Category..."
                    />
                  </div>

                  {/* 3. Price */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Price (₹) <span className="text-red-400">*</span>
                    </label>
                    <div className="relative">
                      <span className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400 font-semibold text-sm">
                        ₹
                      </span>
                      <input
                        type="number"
                        min="0"
                        step="0.01"
                        required
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                        placeholder="499"
                        className="w-full bg-[#0d1314] border border-white/10 rounded-2xl pl-8 pr-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#98C4C5] focus:ring-1 focus:ring-[#98C4C5] transition-all"
                      />
                    </div>
                  </div>

                  {/* 4. Stock Quantity */}
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Stock Quantity <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="number"
                      min="0"
                      required
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                      placeholder="50"
                      className="w-full bg-[#0d1314] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#98C4C5] focus:ring-1 focus:ring-[#98C4C5] transition-all"
                    />
                  </div>
                </div>

                {/* 5. Product Description */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                    Description
                  </label>
                  <textarea
                    rows={3}
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Product dimensions, paper GSM, cover finish, pages count, highlights..."
                    className="w-full bg-[#0d1314] border border-white/10 rounded-2xl p-4 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#98C4C5] focus:ring-1 focus:ring-[#98C4C5] transition-all"
                  ></textarea>
                </div>

                {/* 6. Product Images Upload Zone */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider">
                      Product Images (Multi-select)
                    </label>
                    {selectedFiles.length > 0 && (
                      <span className="text-xs text-[#98C4C5] font-semibold">
                        {selectedFiles.length} image{selectedFiles.length > 1 ? "s" : ""} selected
                      </span>
                    )}
                  </div>

                  {/* Drag & Drop Input Zone */}
                  <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/15 hover:border-[#98C4C5]/60 bg-[#0d1314]/60 hover:bg-[#0d1314] rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 group"
                  >
                    <input
                      ref={fileInputRef}
                      type="file"
                      multiple
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                    <div className="flex flex-col items-center justify-center gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-[#98C4C5]/10 group-hover:bg-[#98C4C5]/20 flex items-center justify-center text-[#98C4C5] transition-all">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <p className="text-sm font-semibold text-white">
                        Click or drag images here to upload
                      </p>
                      <p className="text-xs text-zinc-500">
                        Supports PNG, JPG, WEBP (Max 5MB each)
                      </p>
                    </div>
                  </div>

                  {/* Image Previews Grid */}
                  {filePreviews.length > 0 && (
                    <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3 mt-4">
                      {filePreviews.map((previewUrl, idx) => (
                        <div
                          key={idx}
                          className="relative aspect-square rounded-2xl overflow-hidden border border-white/20 bg-zinc-900 group"
                        >
                          <Image
                            src={previewUrl}
                            alt={`Preview ${idx + 1}`}
                            fill
                            className="object-cover"
                          />
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              removeSelectedFile(idx);
                            }}
                            className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-700 transition-all shadow-md cursor-pointer"
                            title="Remove image"
                          >
                            <X className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-end gap-4 pt-4 border-t border-white/10">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#98C4C5] text-[#121c1d] px-8 py-3.5 rounded-full font-bold font-moresugar hover:bg-[#7eb5b6] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-[#98C4C5]/20 cursor-pointer"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading & Publishing...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Publish Product</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          )}

          {/* Products Table & Catalog View (Visible in both Dashboard and Products tabs) */}
          {(activeTab === "dashboard" || activeTab === "products") && (
            <div className="bg-[#121c1d]/90 border border-white/10 rounded-3xl p-5 sm:p-8 shadow-xl">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-4 border-b border-white/10">
                <div className="flex items-center justify-between gap-4 w-full md:w-auto">
                  <div>
                    <h3 className="text-lg sm:text-xl font-bold text-white font-moresugar flex items-center gap-2">
                      <Package className="w-5 h-5 text-[#98C4C5]" />
                      Live Products Catalog ({products.length})
                    </h3>
                    <p className="text-xs text-zinc-400 mt-0.5">
                      Real-time synced products in your Firestore store database
                    </p>
                  </div>

                  {activeTab === "dashboard" && (
                    <button
                      onClick={() => setActiveTab("products")}
                      className="md:hidden inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#98C4C5] text-[#121c1d] font-bold text-xs font-moresugar cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" /> Add
                    </button>
                  )}
                </div>

                {/* Filter, Search & Add Shortcut */}
                <div className="flex flex-wrap items-center gap-3">
                  {activeTab === "dashboard" && (
                    <button
                      onClick={() => setActiveTab("products")}
                      className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#98C4C5] text-[#121c1d] font-bold text-xs font-moresugar hover:bg-[#7eb5b6] transition-all cursor-pointer shadow-sm"
                    >
                      <Plus className="w-4 h-4" /> Add Product
                    </button>
                  )}

                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-zinc-400" />
                    <input
                      type="text"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      placeholder="Search title, category..."
                      className="w-full sm:w-52 bg-[#0d1314] border border-white/10 rounded-full pl-9 pr-4 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-[#98C4C5]"
                    />
                  </div>

                  <div className="w-full sm:w-48">
                    <CustomSelect
                      size="sm"
                      options={[{ id: "all", name: "All Categories" }, ...CATEGORIES]}
                      value={categoryFilter}
                      onChange={(val) => setCategoryFilter(val)}
                      placeholder="All Categories"
                    />
                  </div>
                </div>
              </div>

              {/* Table */}
              {loadingProducts ? (
                <div className="flex flex-col items-center justify-center py-16 text-zinc-400">
                  <Loader2 className="w-8 h-8 animate-spin text-[#98C4C5] mb-3" />
                  <p className="text-sm font-medium font-moresugar">Loading Live Products...</p>
                </div>
              ) : filteredProducts.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-white/10 rounded-2xl bg-[#0d1314]/40">
                  <Package className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                  <h4 className="text-base font-bold text-white font-moresugar">No Products Found</h4>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1">
                    {searchQuery || categoryFilter !== "all"
                      ? "No products match your search or category filter criteria."
                      : "You haven't listed any products yet. Use the form above to add your first product!"}
                  </p>
                </div>
              ) : (
                <div className="overflow-x-auto -mx-5 sm:mx-0 px-5 sm:px-0">
                  <table className="w-full text-left text-sm min-w-[640px]">
                    <thead>
                      <tr className="border-b border-white/10 text-xs uppercase font-semibold text-zinc-400 tracking-wider">
                        <th className="pb-3 pl-2">Product</th>
                        <th className="pb-3">Category</th>
                        <th className="pb-3">Price</th>
                        <th className="pb-3">Stock</th>
                        <th className="pb-3">Status</th>
                        <th className="pb-3 text-right pr-2">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {filteredProducts.map((p) => {
                        const hasImages = p.images && p.images.length > 0;
                        const isOutOfStock = (p.stock || 0) <= 0;
                        const isLowStock = (p.stock || 0) > 0 && (p.stock || 0) <= 5;

                        return (
                          <tr
                            key={p.id}
                            className="hover:bg-white/[0.02] transition-colors group"
                          >
                            {/* Product Info + Thumbnail */}
                            <td className="py-4 pl-2">
                              <div className="flex items-center gap-3">
                                <div className="relative w-12 h-12 rounded-xl overflow-hidden bg-zinc-900 border border-white/10 shrink-0">
                                  {hasImages ? (
                                    <Image
                                      src={p.images[0]}
                                      alt={p.title}
                                      fill
                                      className="object-cover"
                                    />
                                  ) : (
                                    <div className="w-full h-full flex items-center justify-center text-zinc-600">
                                      <ImageIcon className="w-5 h-5" />
                                    </div>
                                  )}
                                </div>
                                <div className="max-w-xs sm:max-w-sm">
                                  <h5 className="font-semibold text-white line-clamp-1 group-hover:text-[#98C4C5] transition-colors">
                                    {p.title}
                                  </h5>
                                  {p.description && (
                                    <p className="text-xs text-zinc-400 line-clamp-1 mt-0.5">
                                      {p.description}
                                    </p>
                                  )}
                                </div>
                              </div>
                            </td>

                            {/* Category */}
                            <td className="py-4">
                              <span className="inline-block px-2.5 py-1 rounded-full text-xs font-semibold bg-[#98C4C5]/10 text-[#98C4C5] border border-[#98C4C5]/20 capitalize">
                                {CATEGORIES.find((c) => c.id === p.category)?.name || p.category}
                              </span>
                            </td>

                            {/* Price */}
                            <td className="py-4 font-bold text-white font-moresugar text-base">
                              ₹{Number(p.price || 0).toLocaleString("en-IN")}
                            </td>

                            {/* Stock */}
                            <td className="py-4 text-zinc-300 font-medium">
                              {p.stock || 0} units
                            </td>

                            {/* Stock Badge */}
                            <td className="py-4">
                              {isOutOfStock ? (
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-red-950/60 text-red-400 border border-red-500/30">
                                  Out of Stock
                                </span>
                              ) : isLowStock ? (
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-950/60 text-amber-400 border border-amber-500/30">
                                  Low Stock
                                </span>
                              ) : (
                                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-emerald-950/60 text-emerald-400 border border-emerald-500/30">
                                  In Stock
                                </span>
                              )}
                            </td>

                            {/* Actions */}
                            <td className="py-4 text-right pr-2">
                              <button
                                onClick={() => handleDeleteProduct(p.id)}
                                disabled={deletingId === p.id}
                                className="w-8 h-8 rounded-xl bg-red-950/40 text-red-400 hover:bg-red-600 hover:text-white inline-flex items-center justify-center transition-all disabled:opacity-50 cursor-pointer"
                                title="Delete Product"
                              >
                                {deletingId === p.id ? (
                                  <Loader2 className="w-4 h-4 animate-spin" />
                                ) : (
                                  <Trash2 className="w-4 h-4" />
                                )}
                              </button>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Tab: Banners Management */}
        {activeTab === "banners" && (
          <div className="space-y-8">
            {/* Upload New Banner Card */}
            <div className="bg-[#121c1d]/90 border border-white/10 rounded-3xl p-5 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-white/10 gap-2">
                <h3 className="text-lg sm:text-xl font-bold text-white font-moresugar flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-[#98C4C5]/20 flex items-center justify-center text-[#98C4C5]">
                    <Plus className="w-5 h-5" />
                  </div>
                  Upload New Hero Banner
                </h3>
                <span className="text-xs text-zinc-400">
                  Recommended size: <strong className="text-white">2078 × 757 px</strong> (Widescreen)
                </span>
              </div>

              {bannerFeedback && (
                <div
                  className={`mb-6 p-4 rounded-2xl flex items-center gap-3 text-sm font-medium ${
                    bannerFeedback.type === "success"
                      ? "bg-emerald-950/70 border border-emerald-500/40 text-emerald-300"
                      : "bg-red-950/70 border border-red-500/40 text-red-300"
                  }`}
                >
                  {bannerFeedback.type === "success" ? (
                    <CheckCircle2 className="w-5 h-5 shrink-0 text-emerald-400" />
                  ) : (
                    <AlertCircle className="w-5 h-5 shrink-0 text-red-400" />
                  )}
                  <span>{bannerFeedback.message}</span>
                </div>
              )}

              <form onSubmit={handleCreateBanner} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 sm:gap-6">
                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Banner Title / Campaign Tag
                    </label>
                    <input
                      type="text"
                      value={bannerTitle}
                      onChange={(e) => setBannerTitle(e.target.value)}
                      placeholder="e.g. Back to School Stationery Sale"
                      className="w-full bg-[#0d1314] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#98C4C5] focus:ring-1 focus:ring-[#98C4C5]"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                      Click Destination Link
                    </label>
                    <input
                      type="text"
                      value={bannerLink}
                      onChange={(e) => setBannerLink(e.target.value)}
                      placeholder="/shop or /category/journals"
                      className="w-full bg-[#0d1314] border border-white/10 rounded-2xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#98C4C5] focus:ring-1 focus:ring-[#98C4C5]"
                    />
                  </div>
                </div>

                {/* Banner File Upload Box */}
                <div>
                  <label className="block text-xs font-semibold text-zinc-300 uppercase tracking-wider mb-2">
                    Banner Image <span className="text-red-400">*</span>
                  </label>

                  <div
                    onClick={() => bannerFileInputRef.current?.click()}
                    className="border-2 border-dashed border-white/15 hover:border-[#98C4C5]/60 bg-[#0d1314]/60 hover:bg-[#0d1314] rounded-2xl p-6 text-center cursor-pointer transition-all duration-200 group"
                  >
                    <input
                      ref={bannerFileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleBannerFileChange}
                      className="hidden"
                    />
                    {bannerPreview ? (
                      <div className="relative aspect-[2078/757] w-full max-w-2xl mx-auto rounded-2xl overflow-hidden border border-white/20">
                        <Image src={bannerPreview} alt="Banner Preview" fill className="object-cover" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                          <span className="bg-[#98C4C5] text-[#121c1d] px-4 py-2 rounded-full font-bold text-xs font-moresugar shadow-md">
                            Change Banner Image
                          </span>
                        </div>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center gap-2">
                        <div className="w-12 h-12 rounded-2xl bg-[#98C4C5]/10 group-hover:bg-[#98C4C5]/20 flex items-center justify-center text-[#98C4C5] transition-all">
                          <UploadCloud className="w-6 h-6" />
                        </div>
                        <p className="text-sm font-semibold text-white">
                          Click to select a high-resolution banner image
                        </p>
                        <p className="text-xs text-zinc-500">Supports PNG, JPG, WEBP (Wide Aspect Ratio)</p>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex justify-end pt-2">
                  <button
                    type="submit"
                    disabled={isSubmittingBanner || !bannerFile}
                    className="w-full sm:w-auto flex items-center justify-center gap-2 bg-[#98C4C5] text-[#121c1d] px-8 py-3.5 rounded-full font-bold font-moresugar hover:bg-[#7eb5b6] active:scale-95 transition-all disabled:opacity-50 disabled:pointer-events-none shadow-lg shadow-[#98C4C5]/20 cursor-pointer"
                  >
                    {isSubmittingBanner ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Uploading Banner...</span>
                      </>
                    ) : (
                      <>
                        <Plus className="w-4 h-4" />
                        <span>Publish Banner to Carousel</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Published Banners List */}
            <div className="bg-[#121c1d]/90 border border-white/10 rounded-3xl p-5 sm:p-8 shadow-xl">
              <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-moresugar flex items-center gap-2">
                    <ImageIcon className="w-5 h-5 text-[#98C4C5]" />
                    Live Carousel Banners ({banners.length})
                  </h3>
                  <p className="text-xs text-zinc-400 mt-0.5">
                    {banners.length > 1
                      ? "✨ Multiple banners detected — Homepage carousel is auto-sliding!"
                      : banners.length === 1
                      ? "1 banner active on homepage."
                      : "Default static fallback banner active."}
                  </p>
                </div>
              </div>

              {loadingBanners ? (
                <div className="py-16 text-center text-zinc-400">
                  <Loader2 className="w-8 h-8 animate-spin text-[#98C4C5] mx-auto mb-3" />
                  <p className="font-moresugar text-sm">Loading banners...</p>
                </div>
              ) : banners.length === 0 ? (
                <div className="py-16 text-center border border-dashed border-white/10 rounded-2xl bg-[#0d1314]/40 p-6">
                  <ImageIcon className="w-12 h-12 text-zinc-600 mx-auto mb-3" />
                  <h4 className="font-moresugar font-bold text-base text-white">No Custom Banners Yet</h4>
                  <p className="text-xs text-zinc-400 max-w-sm mx-auto mt-1">
                    Upload your first banner above to customize your store&apos;s homepage hero slider!
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {banners.map((banner, index) => (
                    <div
                      key={banner.id}
                      className="bg-[#0d1314] border border-white/10 rounded-2xl overflow-hidden group hover:border-[#98C4C5]/40 transition-all p-3 space-y-3"
                    >
                      <div className="relative aspect-[2078/757] w-full rounded-xl overflow-hidden bg-zinc-900 border border-white/10">
                        <Image src={banner.imageUrl} alt={banner.title || `Banner ${index + 1}`} fill className="object-cover" />
                        <span className="absolute top-2 left-2 bg-black/60 text-[#98C4C5] font-bold text-[10px] font-moresugar px-2 py-0.5 rounded-md backdrop-blur-xs">
                          Slide #{index + 1}
                        </span>
                      </div>

                      <div className="flex items-center justify-between gap-3 px-1">
                        <div className="min-w-0">
                          <h5 className="font-semibold text-white text-sm truncate font-moresugar">
                            {banner.title || `Banner #${index + 1}`}
                          </h5>
                          <span className="text-xs text-[#98C4C5] font-mono flex items-center gap-1 mt-0.5">
                            <ExternalLink className="w-3 h-3" />
                            {banner.link || "/shop"}
                          </span>
                        </div>

                        <button
                          onClick={() => handleDeleteBanner(banner.id)}
                          disabled={deletingBannerId === banner.id}
                          className="w-8 h-8 rounded-xl bg-red-950/40 text-red-400 hover:bg-red-600 hover:text-white inline-flex items-center justify-center transition-all disabled:opacity-50 shrink-0 cursor-pointer"
                          title="Delete Banner"
                        >
                          {deletingBannerId === banner.id ? (
                            <Loader2 className="w-4 h-4 animate-spin" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 4: Orders Placeholder */}
        {activeTab === "orders" && (
          <div className="bg-[#121c1d]/90 border border-white/10 rounded-3xl p-12 text-center">
            <ShoppingCart className="w-12 h-12 text-[#98C4C5] mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white font-moresugar">Orders Tracker</h3>
            <p className="text-sm text-zinc-400 mt-1 max-w-md mx-auto">
              Customer checkout and order receipts will be logged here in real-time.
            </p>
          </div>
        )}

        {/* Tab 5: Customers Placeholder */}
        {activeTab === "customers" && (
          <div className="bg-[#121c1d]/90 border border-white/10 rounded-3xl p-12 text-center">
            <Users className="w-12 h-12 text-[#98C4C5] mx-auto mb-3" />
            <h3 className="text-xl font-bold text-white font-moresugar">Customer Management</h3>
            <p className="text-sm text-zinc-400 mt-1 max-w-md mx-auto">
              Registered user profiles and contact logs will appear here.
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
