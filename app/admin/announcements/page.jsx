'use client';

import { useState, useEffect } from 'react';
import { Bell, Plus, Trash2, CheckCircle2, XCircle, AlertCircle } from 'lucide-react';

export default function AdminAnnouncementsPage() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newText, setNewText] = useState('');
  const [newLink, setNewLink] = useState('/notices');
  const [isUrgent, setIsUrgent] = useState(false);

  const loadItems = async () => {
    try {
      const res = await fetch('/api/announcements');
      if (res.ok) {
        const data = await res.json();
        setItems(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadItems();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newText.trim()) return;

    try {
      const res = await fetch('/api/announcements', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          text: newText,
          link: newLink,
          urgent: isUrgent,
          active: true
        })
      });

      if (res.ok) {
        setNewText('');
        setIsUrgent(false);
        loadItems();
      }
    } catch (err) {
      alert('Error creating announcement: ' + err.message);
    }
  };

  const toggleActive = async (item) => {
    try {
      await fetch('/api/announcements', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: item.id, active: !item.active })
      });
      loadItems();
    } catch (err) {
      console.error(err);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Delete this ticker announcement?')) return;
    try {
      await fetch(`/api/announcements?id=${id}`, { method: 'DELETE' });
      loadItems();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
          Marquee Ticker & Urgent Alerts
        </h1>
        <p className="text-xs text-slate-500 mt-0.5">
          Controls the live scrolling ticker tape at the top of the public website.
        </p>
      </div>

      {/* Add New Form */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
        <h2 className="font-bold text-sm text-slate-900 flex items-center gap-2">
          <Plus className="w-4 h-4 text-amber-500" />
          <span>Post New Announcement</span>
        </h2>

        <form onSubmit={handleCreate} className="space-y-3 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">Announcement Message *</label>
            <input
              type="text"
              required
              placeholder="e.g. Next Central Executive Committee Meeting on 26th September at Bhabani Bhawan..."
              value={newText}
              onChange={(e) => setNewText(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block font-bold text-slate-700 mb-1">Target Link</label>
              <input
                type="text"
                placeholder="/notices or /charter-of-demand"
                value={newLink}
                onChange={(e) => setNewLink(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
              />
            </div>

            <div className="flex items-center gap-2 pt-5">
              <input
                type="checkbox"
                id="urgentCheck"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="rounded text-red-600 focus:ring-red-500"
              />
              <label htmlFor="urgentCheck" className="font-bold text-slate-700">
                Mark as URGENT (displays animated badge)
              </label>
            </div>
          </div>

          <button
            type="submit"
            className="bg-brand-900 hover:bg-brand-950 text-white font-bold px-5 py-2 rounded-lg transition"
          >
            Add to Live Ticker
          </button>
        </form>
      </div>

      {/* Existing Announcements List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6 space-y-4">
        <h2 className="font-bold text-sm text-slate-900">Active & Inactive Ticker Items</h2>

        {loading ? (
          <div className="text-xs text-slate-500 py-6 text-center">Loading ticker items...</div>
        ) : items.length === 0 ? (
          <div className="text-xs text-slate-500 py-6 text-center">No announcement items created yet.</div>
        ) : (
          <div className="space-y-3">
            {items.map((item) => (
              <div
                key={item.id}
                className="p-4 rounded-xl border border-slate-200 bg-slate-50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    {item.urgent && (
                      <span className="bg-red-600 text-white text-[10px] font-black px-2 py-0.5 rounded-full uppercase">
                        Urgent
                      </span>
                    )}
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      item.active ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-200 text-slate-600'
                    }`}>
                      {item.active ? 'Active on Site' : 'Paused'}
                    </span>
                    <span className="text-slate-400 text-[11px]">{item.date}</span>
                  </div>
                  <div className="text-slate-800 font-medium text-sm">{item.text}</div>
                  <div className="text-slate-400 text-[11px]">Links to: <span className="font-mono text-brand-700">{item.link}</span></div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  <button
                    onClick={() => toggleActive(item)}
                    className={`px-3 py-1.5 rounded-lg font-bold transition text-xs ${
                      item.active 
                        ? 'bg-amber-100 hover:bg-amber-200 text-amber-900' 
                        : 'bg-emerald-100 hover:bg-emerald-200 text-emerald-900'
                    }`}
                  >
                    {item.active ? 'Pause Ticker' : 'Activate'}
                  </button>

                  <button
                    onClick={() => handleDelete(item.id)}
                    className="p-2 text-rose-600 hover:bg-rose-50 rounded-lg transition"
                    title="Delete item"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
