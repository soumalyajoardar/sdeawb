'use client';

import { useState, useEffect } from 'react';
import { Mail, Search, CheckCircle2, Trash2, Clock, Phone, User, MessageSquare } from 'lucide-react';

export default function AdminMessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');

  const loadMessages = async () => {
    try {
      const res = await fetch('/api/messages');
      if (res.ok) {
        const data = await res.json();
        setMessages(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMessages();
  }, []);

  const toggleStatus = async (msg) => {
    const newStatus = msg.status === 'resolved' ? 'unread' : 'resolved';
    try {
      await fetch('/api/messages', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: msg.id, status: newStatus })
      });
      loadMessages();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this message?')) return;
    try {
      await fetch(`/api/messages?id=${id}`, { method: 'DELETE' });
      loadMessages();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const filtered = messages.filter(m => {
    if (statusFilter !== 'All' && m.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return m.name.toLowerCase().includes(q) ||
             m.subject.toLowerCase().includes(q) ||
             m.message.toLowerCase().includes(q) ||
             m.email.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
          Grievances & Messages Inbox
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Review inquiries, transfer representations, and service grievances received via the contact portal.
        </p>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search messages by sender name, subject, or keywords..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
          />
        </div>
        <div className="sm:col-span-4">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full py-2 px-3 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 bg-white"
          >
            <option value="All">All Inquiries</option>
            <option value="unread">Unread / Pending</option>
            <option value="resolved">Resolved</option>
          </select>
        </div>
      </div>

      {/* Messages List */}
      <div className="space-y-4">
        {loading ? (
          <div className="bg-white p-12 text-center text-xs text-slate-500 rounded-2xl">Loading messages...</div>
        ) : filtered.length === 0 ? (
          <div className="bg-white p-12 text-center text-xs text-slate-500 rounded-2xl">No messages in inbox.</div>
        ) : (
          filtered.map(m => (
            <div
              key={m.id}
              className={`bg-white rounded-2xl border p-5 sm:p-6 transition shadow-sm ${
                m.status === 'unread' ? 'border-amber-400 ring-1 ring-amber-400/20' : 'border-slate-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3 mb-3 text-xs">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-bold text-slate-900 text-sm">{m.name}</span>
                  <span className="bg-brand-50 text-brand-900 font-bold px-2 py-0.5 rounded text-[11px]">
                    {m.category}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                    m.status === 'resolved' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                  }`}>
                    {m.status === 'resolved' ? 'Resolved' : 'Unread'}
                  </span>
                </div>
                <div className="text-slate-400 text-[11px] flex items-center gap-1">
                  <Clock className="w-3 h-3" />
                  <span>{m.date}</span>
                </div>
              </div>

              <div className="space-y-2 text-xs">
                <div className="text-amber-800 font-bold text-sm">
                  {m.subject}
                </div>
                <p className="text-slate-700 leading-relaxed whitespace-pre-wrap bg-slate-50 p-3 rounded-xl border border-slate-100">
                  {m.message}
                </p>
                <div className="flex flex-wrap gap-4 text-slate-500 pt-1">
                  <span>Email: <a href={`mailto:${m.email}`} className="text-brand-700 hover:underline font-medium">{m.email}</a></span>
                  {m.phone && (
                    <span>Phone: <a href={`tel:${m.phone}`} className="text-brand-700 hover:underline font-medium">{m.phone}</a></span>
                  )}
                </div>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center justify-between">
                <button
                  onClick={() => toggleStatus(m)}
                  className={`text-xs font-bold px-3 py-1.5 rounded-lg transition flex items-center gap-1.5 ${
                    m.status === 'resolved'
                      ? 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                      : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-sm'
                  }`}
                >
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{m.status === 'resolved' ? 'Mark as Unread' : 'Mark as Resolved'}</span>
                </button>

                <button
                  onClick={() => handleDelete(m.id)}
                  className="text-rose-600 hover:text-rose-800 p-1.5 text-xs font-semibold flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
