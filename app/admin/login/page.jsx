'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Shield, Lock, User, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('sdea_admin');
  const [password, setPassword] = useState('sdea@2026');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Authentication failed');
      }

      // Save token in localStorage for client auth state
      localStorage.setItem('sdea_admin_logged_in', 'true');
      router.push('/admin');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-950 via-slate-900 to-black flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-2xl overflow-hidden border border-slate-700">
        {/* Header */}
        <div className="bg-brand-900 text-white p-6 sm:p-8 text-center relative border-b-4 border-amber-500">
          <div className="w-16 h-16 bg-white rounded-full p-1 mx-auto mb-3 flex items-center justify-center border-2 border-amber-400 shadow-md overflow-hidden shrink-0">
            <img 
              src="https://bgdnjmllgeksnpoxykza.supabase.co/storage/v1/object/public/gallery/sdea-logo-1789572632418.webp" 
              alt="SDEA WB Logo" 
              className="w-full h-full object-contain rounded-full"
              onError={(e) => { e.target.style.display = 'none'; }}
            />
          </div>
          <h1 className="text-xl sm:text-2xl font-black font-serif">
            SDEA WB Admin Portal
          </h1>
          <p className="text-xs text-amber-300 font-medium mt-1">
            Executive Content & Membership Management
          </p>
        </div>

        {/* Form Container */}
        <div className="p-6 sm:p-8 space-y-6">
          <div className="bg-amber-50 border border-amber-200 p-3 rounded-lg text-xs text-amber-900 font-medium">
            <strong>Default Credentials:</strong> Username: <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">sdea_admin</code> | Password: <code className="bg-amber-100 px-1 py-0.5 rounded font-mono">sdea@2026</code>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-lg text-xs flex items-center gap-2 font-semibold">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Admin Username
              </label>
              <div className="relative">
                <User className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type="text"
                  required
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Password
              </label>
              <div className="relative">
                <Lock className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-9 pr-10 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-brand-900 hover:bg-brand-950 text-white font-bold py-2.5 px-4 rounded-xl shadow-lg transition flex items-center justify-center gap-2 text-sm disabled:opacity-50"
              >
                {loading ? (
                  <span>Signing in...</span>
                ) : (
                  <>
                    <span>Sign In to Admin Portal</span>
                    <ArrowRight className="w-4 h-4 text-amber-400" />
                  </>
                )}
              </button>
            </div>
          </form>

          <div className="text-center pt-2 border-t border-slate-100">
            <Link 
              href="/"
              className="text-xs text-brand-700 hover:text-brand-900 font-semibold inline-flex items-center gap-1"
            >
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
