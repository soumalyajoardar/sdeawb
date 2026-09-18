'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, FileText, Bell, Users, UserCheck, 
  Mail, Image as ImageIcon, ArrowRight, CheckCircle2, XCircle, 
  Clock, AlertCircle, Plus, Eye, Landmark 
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [stats, setStats] = useState({
    notices: 0,
    announcements: 0,
    bearers: 0,
    memberships: [],
    legacyMembers: [],
    messages: [],
    gallery: 0
  });
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    try {
      const [noticesRes, annRes, bearersRes, memRes, legRes, msgRes, galRes] = await Promise.all([
        fetch('/api/notices'),
        fetch('/api/announcements'),
        fetch('/api/office-bearers'),
        fetch('/api/memberships'),
        fetch('/api/legacy-members'),
        fetch('/api/messages'),
        fetch('/api/gallery')
      ]);

      const [notices, announcements, bearers, memberships, legacyMembers, messages, gallery] = await Promise.all([
        noticesRes.json(),
        annRes.json(),
        bearersRes.json(),
        memRes.json(),
        legRes.json(),
        msgRes.json(),
        galRes.json()
      ]);

      setStats({
        notices: notices.length || 0,
        announcements: announcements.length || 0,
        bearers: bearers.length || 0,
        memberships: memberships || [],
        legacyMembers: legacyMembers || [],
        messages: messages || [],
        gallery: gallery.length || 0
      });
    } catch (err) {
      console.error('Failed to load dashboard data:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleMembershipStatus = async (id, status) => {
    try {
      const res = await fetch('/api/memberships', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status })
      });
      if (res.ok) {
        loadAll();
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const pendingMemberships = stats.memberships.filter(m => m.status === 'Pending');
  const unreadMessages = stats.messages.filter(m => m.status === 'unread');

  if (loading) {
    return (
      <div className="text-center py-20">
        <div className="animate-spin w-8 h-8 border-4 border-brand-900 border-t-transparent rounded-full mx-auto mb-3"></div>
        <p className="text-sm text-slate-500 font-medium">Loading SDEA WB administrative dashboard...</p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Top Welcome Card */}
      <div className="bg-gradient-to-r from-brand-900 via-brand-800 to-slate-900 text-white p-6 sm:p-8 rounded-2xl shadow-md border-b-4 border-amber-500 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span className="text-amber-400 font-bold text-xs uppercase tracking-wider">Executive Administration</span>
          <h1 className="text-2xl sm:text-3xl font-black font-serif mt-1">
            SDEA WB Control Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 mt-1">
            Real-time management for notices, district committees, incoming memberships, and site communications.
          </p>
        </div>

        <div className="flex gap-2">
          <Link
            href="/admin/notices"
            className="bg-amber-500 hover:bg-amber-600 text-brand-950 font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition shadow"
          >
            <Plus className="w-4 h-4" />
            <span>New Notice</span>
          </Link>
          <Link
            href="/admin/announcements"
            className="bg-white/10 hover:bg-white/20 text-white font-semibold px-4 py-2 rounded-lg text-xs transition border border-white/20"
          >
            <span>Update Ticker</span>
          </Link>
          <Link
            href="/admin/legacy-members"
            className="bg-amber-400/20 hover:bg-amber-400/30 text-amber-300 font-semibold px-4 py-2 rounded-lg text-xs transition border border-amber-400/30 flex items-center gap-1.5"
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>Legacy Desk</span>
          </Link>
        </div>
      </div>

      {/* Metric Counters */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-xl flex items-center justify-center shrink-0">
            <UserCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{pendingMemberships.length}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Pending Apps</div>
          </div>
        </div>

        <Link 
          href="/admin/legacy-members" 
          className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4 hover:border-amber-400 hover:shadow-md transition"
        >
          <div className="w-12 h-12 bg-amber-50 text-brand-900 rounded-xl flex items-center justify-center shrink-0">
            <Landmark className="w-6 h-6 text-amber-600" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{stats.legacyMembers?.length || 0}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Legacy Records</div>
          </div>
        </Link>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-blue-50 text-brand-700 rounded-xl flex items-center justify-center shrink-0">
            <FileText className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{stats.notices}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Notices & Circulars</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center shrink-0">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{stats.bearers}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Office Bearers</div>
          </div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm flex items-center gap-4">
          <div className="w-12 h-12 bg-purple-50 text-purple-600 rounded-xl flex items-center justify-center shrink-0">
            <Mail className="w-6 h-6" />
          </div>
          <div>
            <div className="text-2xl font-black text-slate-900">{unreadMessages.length}</div>
            <div className="text-xs font-bold text-slate-500 uppercase tracking-wide">Unread Inquiries</div>
          </div>
        </div>
      </div>

      {/* Two Column Section: Recent Applications & Messages */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left 7 Cols: Recent Membership Applications */}
        <div className="lg:col-span-7 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-amber-500" />
              <h2 className="font-bold text-base text-slate-900">Recent Membership Applications</h2>
            </div>
            <Link href="/admin/memberships" className="text-xs font-bold text-brand-700 hover:underline flex items-center gap-1">
              <span>View All ({stats.memberships.length})</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {stats.memberships.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No applications submitted yet.</p>
          ) : (
            <div className="space-y-3">
              {stats.memberships.slice(0, 5).map(app => (
                <div key={app.id} className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <strong className="text-slate-900 font-bold">{app.applicantName}</strong>
                      <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                        app.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                        app.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status}
                      </span>
                    </div>
                    <div className="text-slate-600">
                      {app.designation} • {app.department}
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      District: <strong className="text-slate-700">{app.district}</strong> | Applied: {app.appliedAt}
                    </div>
                  </div>

                  {app.status === 'Pending' && (
                    <div className="flex items-center gap-2 shrink-0">
                      <button
                        onClick={() => handleMembershipStatus(app.id, 'Approved')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-2.5 py-1 rounded text-[11px] flex items-center gap-1 transition shadow-sm"
                      >
                        <CheckCircle2 className="w-3 h-3" />
                        <span>Approve</span>
                      </button>
                      <button
                        onClick={() => handleMembershipStatus(app.id, 'Rejected')}
                        className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-2.5 py-1 rounded text-[11px] flex items-center gap-1 transition shadow-sm"
                      >
                        <XCircle className="w-3 h-3" />
                        <span>Reject</span>
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Right 5 Cols: Incoming Contact Messages */}
        <div className="lg:col-span-5 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div className="flex items-center gap-2">
              <Mail className="w-5 h-5 text-amber-500" />
              <h2 className="font-bold text-base text-slate-900">Recent Messages & Grievances</h2>
            </div>
            <Link href="/admin/messages" className="text-xs font-bold text-brand-700 hover:underline flex items-center gap-1">
              <span>View Inbox</span>
              <ArrowRight className="w-3 h-3" />
            </Link>
          </div>

          {stats.messages.length === 0 ? (
            <p className="text-xs text-slate-500 py-6 text-center">No messages in inbox.</p>
          ) : (
            <div className="space-y-3">
              {stats.messages.slice(0, 4).map(msg => (
                <div key={msg.id} className="p-3 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                  <div className="flex items-center justify-between">
                    <strong className="text-slate-900 font-bold">{msg.name}</strong>
                    <span className="text-[10px] text-slate-400">{msg.date}</span>
                  </div>
                  <div className="text-amber-700 font-semibold text-[11px]">{msg.subject}</div>
                  <p className="text-slate-600 text-[11px] line-clamp-2">{msg.message}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
