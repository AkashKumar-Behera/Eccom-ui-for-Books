"use client";

import React, { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { X, Mail, Phone, LogIn, Eye, EyeOff } from "lucide-react";
import { RecaptchaVerifier, ConfirmationResult } from "firebase/auth";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const {
    user,
    signInWithGoogle,
    logout,
    signUpWithEmail,
    signInWithEmail,
    setupRecaptcha,
    sendOtp,
  } = useAuth();

  const [mode, setMode] = useState<"login" | "signup" | "phone">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [otp, setOtp] = useState("");
  const [confirmationResult, setConfirmationResult] = useState<ConfirmationResult | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const getErrorMessage = (err: any) => {
    if (!err) return "An error occurred";
    if (err.code) {
      if (err.code === "auth/invalid-credential" || err.code === "auth/user-not-found" || err.code === "auth/wrong-password") {
        return "Invalid email or password. Please check your credentials.";
      }
      if (err.code === "auth/email-already-in-use") {
        return "An account with this email already exists.";
      }
      if (err.code === "auth/weak-password") {
        return "Password should be at least 6 characters.";
      }
      if (err.code === "auth/unauthorized-domain") {
        return "This domain is not authorized in Firebase Console settings.";
      }
      return `Firebase: ${err.code.replace("auth/", "").replace(/-/g, " ")}`;
    }
    return err.message || "Authentication failed";
  };

  const handleGoogleSignIn = async () => {
    try {
      setError("");
      setLoading(true);
      await signInWithGoogle();
      onClose();
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleEmailAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      if (mode === "signup") {
        await signUpWithEmail(email, password);
      } else {
        await signInWithEmail(email, password);
      }
      onClose();
    } catch (err: any) {
      setError(getErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setError("");
      setLoading(true);
      
      // Auto prepend +91 for Indian phone numbers if not already added
      const cleanPhone = phone.trim().replace(/\D/g, "");
      const formattedPhone = phone.trim().startsWith("+")
        ? phone.trim()
        : `+91${cleanPhone}`;

      if (cleanPhone.length < 10) {
        throw new Error("Please enter a valid 10-digit phone number.");
      }

      const recaptcha = setupRecaptcha("recaptcha-container");
      const result = await sendOtp(formattedPhone, recaptcha);
      setConfirmationResult(result);
    } catch (err: any) {
      setError(err.message || "Failed to send OTP");
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!confirmationResult) return;
    try {
      setError("");
      setLoading(true);
      await confirmationResult.confirm(otp);
      onClose();
    } catch (err: any) {
      setError(err.message || "Invalid OTP");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 sm:p-6 overflow-y-auto">
      <div className="relative w-full max-w-md bg-white rounded-3xl p-5 sm:p-8 shadow-2xl border border-[#98C4C5]/30 animate-in fade-in zoom-in duration-200 my-auto">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-zinc-400 hover:text-zinc-700 transition-colors p-1"
        >
          <X className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        {user ? (
          <div className="text-center py-4 sm:py-6">
            <h3 className="text-2xl font-bold text-[#1E4B4C] font-moresugar mb-2">
              Welcome Back!
            </h3>
            <p className="text-sm text-zinc-600 mb-6 font-sans">{user.email || user.phoneNumber}</p>
            <button
              onClick={() => {
                logout();
                onClose();
              }}
              className="w-full bg-[#A84242] text-white py-3 rounded-full font-bold hover:bg-[#8F3535] transition-all font-moresugar"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#1E4B4C] font-moresugar text-center mb-4 sm:mb-6 pt-1">
              {mode === "login"
                ? "Sign In"
                : mode === "signup"
                ? "Create Account"
                : "Phone Verification"}
            </h2>

            {error && (
              <div className="mb-4 text-xs bg-red-50 text-red-600 p-3 rounded-xl border border-red-200 text-center font-sans">
                {error}
              </div>
            )}

            {/* Google Sign-in Button */}
            <button
              onClick={handleGoogleSignIn}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 border border-zinc-200 py-2.5 sm:py-3 rounded-full text-xs sm:text-sm font-semibold text-zinc-700 hover:bg-zinc-50 transition-all mb-3 sm:mb-4"
            >
              <svg className="w-4 h-4 sm:w-5 sm:h-5" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              Continue with Google
            </button>

            <div className="relative flex items-center justify-center my-4">
              <div className="border-t border-zinc-200 w-full"></div>
              <span className="bg-white px-3 text-xs text-zinc-400 font-sans uppercase">Or</span>
            </div>

            {mode === "phone" ? (
              <div>
                {!confirmationResult ? (
                  <form onSubmit={handleSendOtp} className="space-y-4">
                    <div className="flex items-center border border-zinc-200 rounded-2xl overflow-hidden focus-within:border-[#98C4C5] transition-colors">
                      <span className="bg-zinc-100 text-zinc-700 px-3.5 py-3 text-sm font-semibold border-r border-zinc-200 flex items-center gap-1 select-none">
                        🇮🇳 +91
                      </span>
                      <input
                        type="tel"
                        placeholder="9876543210"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        maxLength={10}
                        required
                        className="w-full px-4 py-3 text-sm focus:outline-none bg-transparent"
                      />
                    </div>
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#98C4C5] text-[#1E4B4C] py-3 rounded-full font-bold hover:bg-[#7AB3B4] transition-all font-moresugar"
                    >
                      {loading ? "Sending..." : "Send OTP"}
                    </button>
                  </form>
                ) : (
                  <form onSubmit={handleVerifyOtp} className="space-y-4">
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={otp}
                      onChange={(e) => setOtp(e.target.value)}
                      required
                      className="w-full px-4 py-3 border border-zinc-200 rounded-2xl text-sm text-center tracking-widest focus:outline-none focus:border-[#98C4C5]"
                    />
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full bg-[#98C4C5] text-[#1E4B4C] py-3 rounded-full font-bold hover:bg-[#7AB3B4] transition-all font-moresugar"
                    >
                      Verify OTP
                    </button>
                  </form>
                )}
              </div>
            ) : (
              <form onSubmit={handleEmailAuth} className="space-y-4">
                <input
                  type="email"
                  placeholder="Email Address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:border-[#98C4C5]"
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-3 border border-zinc-200 rounded-2xl text-sm focus:outline-none focus:border-[#98C4C5] pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-700 transition-colors p-1"
                    aria-label={showPassword ? "Hide password" : "Show password"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full bg-[#98C4C5] text-[#1E4B4C] py-3 rounded-full font-bold hover:bg-[#7AB3B4] transition-all font-moresugar"
                >
                  {mode === "login" ? "Sign In" : "Register Account"}
                </button>
              </form>
            )}

            {/* Toggle Modes */}
            <div className="mt-6 text-center text-xs text-zinc-600 font-sans space-y-2">
              {mode === "login" && (
                <>
                  <p>
                    Don't have an account?{" "}
                    <button
                      onClick={() => setMode("signup")}
                      className="text-[#1E4B4C] font-bold hover:underline"
                    >
                      Sign Up
                    </button>
                  </p>
                  <p>
                    Or use{" "}
                    <button
                      onClick={() => setMode("phone")}
                      className="text-[#1E4B4C] font-bold hover:underline"
                    >
                      Phone Number
                    </button>
                  </p>
                </>
              )}
              {mode === "signup" && (
                <p>
                  Already have an account?{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="text-[#1E4B4C] font-bold hover:underline"
                  >
                    Sign In
                  </button>
                </p>
              )}
              {mode === "phone" && (
                <p>
                  Use{" "}
                  <button
                    onClick={() => setMode("login")}
                    className="text-[#1E4B4C] font-bold hover:underline"
                  >
                    Email & Password
                  </button>
                </p>
              )}
            </div>
          </div>
        )}

        {/* Global Invisible Recaptcha Container */}
        <div id="recaptcha-container"></div>
      </div>
    </div>
  );
}
