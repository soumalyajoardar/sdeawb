'use client';

import { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, AlertCircle, Clock, Shield } from 'lucide-react';

export default function ContactClient({ settings }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: 'General Inquiry',
    subject: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess(false);

    try {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit message.');
      }

      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        category: 'General Inquiry',
        subject: '',
        message: ''
      });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
      {/* Contact Information & HQ */}
      <div className="lg:col-span-5 space-y-6">
        <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-200 space-y-6">
          <div className="border-b border-slate-100 pb-4">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Central Secretariat</span>
            <h2 className="text-2xl font-black text-brand-950 font-serif mt-1">State Headquarters</h2>
          </div>

          <div className="space-y-5 text-sm">
            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0 border border-brand-100">
                <MapPin className="w-5 h-5 text-brand-700" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-0.5">Office Address</h4>
                <p className="text-slate-600 text-xs leading-relaxed">{settings.address}</p>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0 border border-brand-100">
                <Phone className="w-5 h-5 text-brand-700" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-0.5">Helpline Phone</h4>
                <div className="space-y-0.5">
                  <a href={`tel:${settings.phone}`} className="text-xs text-slate-700 hover:text-brand-700 font-semibold block transition">
                    {settings.phone}
                  </a>
                  {settings.alternatePhone && (
                    <a href={`tel:${settings.alternatePhone}`} className="text-xs text-slate-700 hover:text-brand-700 font-medium block transition">
                      {settings.alternatePhone} (Office)
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0 border border-brand-100">
                <Mail className="w-5 h-5 text-brand-700" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-0.5">Official Email</h4>
                <div className="space-y-0.5">
                  <a href={`mailto:${settings.email}`} className="text-xs text-slate-700 hover:text-brand-700 font-semibold block transition">
                    {settings.email}
                  </a>
                  {settings.alternateEmail && (
                    <a href={`mailto:${settings.alternateEmail}`} className="text-xs text-slate-700 hover:text-brand-700 font-medium block transition">
                      {settings.alternateEmail}
                    </a>
                  )}
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3.5">
              <div className="w-10 h-10 rounded-xl bg-brand-50 flex items-center justify-center shrink-0 border border-brand-100">
                <Clock className="w-5 h-5 text-brand-700" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 mb-0.5">Secretariat Hours</h4>
                <p className="text-slate-600 text-xs">Monday – Friday: 11:00 AM – 5:30 PM</p>
                <p className="text-slate-400 text-[11px] mt-0.5">Saturday: Meeting Days (11:00 AM onwards)</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Message / Grievance Form */}
      <div className="lg:col-span-7">
        <div className="bg-white p-6 sm:p-10 rounded-2xl shadow-sm border border-slate-200">
          <div className="border-b border-slate-100 pb-4 mb-6">
            <span className="text-xs font-bold text-amber-600 uppercase tracking-wider">Direct Redressal</span>
            <h2 className="text-2xl font-black text-brand-950 font-serif mt-1">Send a Message or Grievance</h2>
            <p className="text-xs text-slate-500 mt-1">
              Your submission will be routed directly to the Central Executive Secretariat for official review.
            </p>
          </div>

          {success && (
            <div className="mb-6 p-4 rounded-xl bg-emerald-50 border border-emerald-300 text-emerald-800 text-sm flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
              <div>
                <p className="font-bold">Message Dispatched Successfully!</p>
                <p className="text-xs text-emerald-700 mt-0.5">Our Secretariat will review your submission and contact you shortly.</p>
              </div>
            </div>
          )}

          {error && (
            <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Your Full Name *</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required 
                  className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" 
                  placeholder="Er. John Doe" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Email Address *</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required 
                  className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" 
                  placeholder="engineer@domain.com" 
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Mobile / Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" 
                  placeholder="10-digit number" 
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 mb-1">Inquiry Category *</label>
                <select 
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                >
                  <option value="General Inquiry">General Inquiry</option>
                  <option value="Membership Query">Membership Query</option>
                  <option value="Cadre Grievance">Cadre Grievance</option>
                  <option value="NPA & Pay Scale">NPA & Pay Scale Representation</option>
                  <option value="Legal & Mutual Aid">Legal & Mutual Aid</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Subject *</label>
              <input 
                type="text" 
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required 
                className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" 
                placeholder="Brief summary of your inquiry" 
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">Detailed Message / Grievance *</label>
              <textarea 
                name="message"
                value={formData.message}
                onChange={handleChange}
                required 
                rows={5}
                className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" 
                placeholder="Please include department, place of posting, or specific details..."
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full bg-brand-950 hover:bg-brand-900 text-amber-400 font-bold py-3.5 rounded-xl transition shadow-lg flex items-center justify-center gap-2 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Transmitting Message...' : 'Submit to Secretariat'}</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
