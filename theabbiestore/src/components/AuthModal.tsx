import React, { useState } from 'react';
import { X, User, Phone, Mail, CheckCircle, LogOut } from 'lucide-react';
import type { UserProfile } from '../data';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  user: UserProfile;
  onLogin: (name: string, email: string, phone: string) => void;
  onLogout: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  user,
  onLogin,
  onLogout
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!phone) {
      alert('Please enter your mobile number!');
      return;
    }
    onLogin(name || 'Aesthetic Customer', email || 'customer@theabbie.in', phone);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-3xl max-w-md w-full overflow-hidden shadow-2xl relative border border-pink-100 p-6 space-y-4 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-gray-400 hover:text-gray-700 rounded-full hover:bg-pink-50"
        >
          <X className="w-5 h-5" />
        </button>

        {user.isLoggedIn ? (
          /* User Profile View */
          <div className="space-y-4 text-center py-2">
            <div className="w-16 h-16 rounded-full bg-gradient-to-tr from-pink-400 to-rose-300 text-white font-bold text-2xl flex items-center justify-center mx-auto shadow-md">
              {user.name.charAt(0).toUpperCase()}
            </div>
            
            <div>
              <h3 className="font-bold text-gray-900 font-serif-aesthetic text-xl">{user.name}</h3>
              <p className="text-xs text-pink-600 font-semibold">{user.phone}</p>
              <p className="text-xs text-gray-400">{user.email}</p>
            </div>

            <div className="bg-pink-50/70 p-4 rounded-2xl border border-pink-100 text-left space-y-2 text-xs">
              <span className="font-bold text-pink-900 block">Default Shipping Address:</span>
              <p className="text-gray-700">
                {user.addresses[0]?.street || '24, Rosewood Gardens, Indiranagar'}
              </p>
              <p className="text-gray-500">
                {user.addresses[0]?.city || 'Bengaluru, Karnataka'} - {user.addresses[0]?.pincode || '560038'}
              </p>
            </div>

            <div className="bg-emerald-50 p-3 rounded-xl border border-emerald-100 text-xs font-semibold text-emerald-800 flex items-center justify-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-emerald-600" />
              <span>WhatsApp Instant Order Sync Active</span>
            </div>

            <button
              onClick={() => {
                onLogout();
                onClose();
              }}
              className="w-full py-2.5 border border-rose-200 text-rose-600 hover:bg-rose-50 font-bold rounded-xl text-xs flex items-center justify-center gap-1.5 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Log Out</span>
            </button>
          </div>
        ) : (
          /* Mock Login / Signup Form */
          <div className="space-y-4">
            <div className="text-center space-y-1">
              <div className="w-12 h-12 rounded-full bg-pink-100 text-pink-600 flex items-center justify-center mx-auto mb-2">
                <User className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-gray-900 font-serif-aesthetic text-xl">
                {mode === 'login' ? 'Welcome Back!' : 'Create Account'}
              </h3>
              <p className="text-xs text-gray-500">
                Quick mock login to manage your custom stationery orders & address
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              {mode === 'signup' && (
                <div>
                  <label className="font-bold text-gray-700 block mb-1">Your Full Name</label>
                  <input
                    type="text"
                    placeholder="e.g. Ananya Sharma"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full px-3 py-2 bg-pink-50/40 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none"
                  />
                </div>
              )}

              <div>
                <label className="font-bold text-gray-700 block mb-1">WhatsApp Mobile Number *</label>
                <div className="relative">
                  <input
                    type="tel"
                    placeholder="+91 9876543210"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-pink-50/40 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none"
                  />
                  <Phone className="w-4 h-4 text-pink-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <div>
                <label className="font-bold text-gray-700 block mb-1">Email Address (Optional)</label>
                <div className="relative">
                  <input
                    type="email"
                    placeholder="ananya@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 bg-pink-50/40 border border-pink-200 rounded-xl focus:ring-2 focus:ring-pink-400 outline-none"
                  />
                  <Mail className="w-4 h-4 text-pink-400 absolute left-3 top-2.5" />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-400 text-white font-bold rounded-xl text-xs shadow-md hover:from-pink-600 hover:to-rose-500 transition-all"
              >
                {mode === 'login' ? 'Continue with Phone' : 'Sign Up & Save Address'}
              </button>
            </form>

            <div className="text-center pt-2 text-xs">
              <button
                onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
                className="text-pink-600 hover:underline font-semibold"
              >
                {mode === 'login' ? "Don't have an account? Sign Up" : 'Already have an account? Log In'}
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
