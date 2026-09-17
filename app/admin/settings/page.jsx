'use client';

import { useState, useEffect } from 'react';
import { Settings, Save, CheckCircle2, Lock, Building, Phone, Mail, Globe } from 'lucide-react';

export default function AdminSettingsPage() {
  const [form, setForm] = useState({
    organizationName: '',
    shortName: '',
    regNo: '',
    motto: '',
    address: '',
    phone: '',
    alternatePhone: '',
    email: '',
    alternateEmail: '',
    adminUsername: '',
    adminPassword: ''
  });

  const [loading, setLoading] = useState(true);
  const [savedSuccess, setSavedSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    async function loadSettings() {
      try {
        const res = await fetch('/api/settings');
        if (res.ok) {
          const data = await res.json();
          setForm(prev => ({ ...prev, ...data }));
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadSettings();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSavedSuccess(false);
    setErrorMessage('');

    try {
      const res = await fetch('/api/settings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      if (!res.ok) {
        throw new Error('Failed to update settings');
      }

      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 4000);
    } catch (err) {
      setErrorMessage(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
          Portal & Association Settings
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Configure state headquarters contacts, official correspondence emails, and portal credentials.
        </p>
      </div>

      {savedSuccess && (
        <div className="bg-emerald-50 border border-emerald-300 text-emerald-800 p-4 rounded-xl flex items-center gap-2 text-xs font-bold">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Settings saved and applied successfully across the portal!</span>
        </div>
      )}

      {errorMessage && (
        <div className="bg-red-50 border border-red-200 text-red-700 p-3 rounded-xl text-xs font-bold">
          {errorMessage}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Organization Profile */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Building className="w-4 h-4 text-amber-500" />
            <span>Organization Profile</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Official Association Name</label>
              <input
                type="text"
                required
                value={form.organizationName}
                onChange={(e) => setForm({ ...form, organizationName: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Abbreviation / Short Name</label>
              <input
                type="text"
                value={form.shortName}
                onChange={(e) => setForm({ ...form, shortName: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Registration No.</label>
              <input
                type="text"
                value={form.regNo}
                onChange={(e) => setForm({ ...form, regNo: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Motto / Core Principles</label>
              <input
                type="text"
                value={form.motto}
                onChange={(e) => setForm({ ...form, motto: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-600"
              />
            </div>
          </div>

          <div className="text-xs">
            <label className="block font-bold text-slate-700 mb-1">State Registered Headquarters Address</label>
            <textarea
              rows={3}
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-600"
            ></textarea>
          </div>
        </div>

        {/* Contacts */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Phone className="w-4 h-4 text-amber-500" />
            <span>Helplines & Public Contacts</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Helpline Number</label>
              <input
                type="text"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Alternate Contact Number</label>
              <input
                type="text"
                value={form.alternatePhone}
                onChange={(e) => setForm({ ...form, alternatePhone: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Primary Official Email</label>
              <input
                type="email"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Alternate Email</label>
              <input
                type="email"
                value={form.alternateEmail}
                onChange={(e) => setForm({ ...form, alternateEmail: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-brand-600"
              />
            </div>
          </div>
        </div>

        {/* Security & Password */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <h2 className="font-bold text-sm text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
            <Lock className="w-4 h-4 text-amber-500" />
            <span>Admin Authentication Security</span>
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs max-w-2xl">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Admin Username</label>
              <input
                type="text"
                value={form.adminUsername || ''}
                placeholder="sdea_admin"
                onChange={(e) => setForm({ ...form, adminUsername: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg font-mono focus:ring-2 focus:ring-brand-600"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">Admin Portal Password</label>
              <input
                type="text"
                placeholder="sdea@2026"
                value={form.adminPassword || ''}
                onChange={(e) => setForm({ ...form, adminPassword: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg font-mono focus:ring-2 focus:ring-brand-600"
              />
            </div>
          </div>
          <p className="text-[11px] text-slate-400">
            Used for logging into <code className="bg-slate-100 px-1 py-0.5 rounded font-mono">/admin/login</code>
          </p>
        </div>

        <div>
          <button
            type="submit"
            className="bg-brand-900 hover:bg-brand-950 text-white font-bold px-6 py-3 rounded-xl transition shadow-lg flex items-center gap-2 text-xs sm:text-sm"
          >
            <Save className="w-4 h-4 text-amber-400" />
            <span>Save All Configuration Settings</span>
          </button>
        </div>
      </form>
    </div>
  );
}
