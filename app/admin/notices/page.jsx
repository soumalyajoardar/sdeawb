'use client';

import { useState, useEffect } from 'react';
import { 
  FileText, Plus, Trash2, Pin, CheckCircle2, 
  Search, Calendar, Building, X, AlertCircle, Edit 
} from 'lucide-react';

export default function AdminNoticesPage() {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [editingId, setEditingId] = useState(null);

  const [form, setForm] = useState({
    noticeNo: '',
    title: '',
    category: 'Meeting Notice',
    date: new Date().toISOString().split('T')[0],
    pinned: false,
    department: 'All Departments',
    description: '',
    fileUrl: '#'
  });

  const loadNotices = async () => {
    try {
      const res = await fetch('/api/notices');
      if (res.ok) {
        const data = await res.json();
        setNotices(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadNotices();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (editingId) {
        // Edit
        const res = await fetch('/api/notices', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ id: editingId, ...form })
        });
        if (res.ok) {
          setShowModal(false);
          setEditingId(null);
          loadNotices();
        }
      } else {
        // Create
        const res = await fetch('/api/notices', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(form)
        });
        if (res.ok) {
          setShowModal(false);
          loadNotices();
        }
      }
    } catch (err) {
      alert('Error saving notice: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this notice?')) return;
    try {
      const res = await fetch(`/api/notices?id=${id}`, { method: 'DELETE' });
      if (res.ok) loadNotices();
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const togglePin = async (notice) => {
    try {
      await fetch('/api/notices', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: notice.id, pinned: !notice.pinned })
      });
      loadNotices();
    } catch (err) {
      console.error(err);
    }
  };

  const openEdit = (notice) => {
    setEditingId(notice.id);
    setForm({
      noticeNo: notice.noticeNo,
      title: notice.title,
      category: notice.category,
      date: notice.date,
      pinned: notice.pinned,
      department: notice.department,
      description: notice.description,
      fileUrl: notice.fileUrl
    });
    setShowModal(true);
  };

  const openNew = () => {
    setEditingId(null);
    setForm({
      noticeNo: `SDEA/GEN/${new Date().getFullYear()}/${notices.length + 1}`,
      title: '',
      category: 'Meeting Notice',
      date: new Date().toISOString().split('T')[0],
      pinned: false,
      department: 'All Departments',
      description: '',
      fileUrl: '#'
    });
    setShowModal(true);
  };

  const filtered = notices.filter(n => 
    n.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    n.noticeNo.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            Notices & Circulars Manager
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Create, publish, pin, and organize official circulars and government memorandums.
          </p>
        </div>
        <button
          onClick={openNew}
          className="bg-brand-900 hover:bg-brand-950 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition shadow-md shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Publish New Notice</span>
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm relative">
        <Search className="w-4 h-4 text-slate-400 absolute left-6 top-6" />
        <input
          type="text"
          placeholder="Filter notices by reference or title..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
        />
      </div>

      {/* Table / List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">Loading notices...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">No notices found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Ref No.</th>
                  <th className="py-3 px-4">Title & Description</th>
                  <th className="py-3 px-4">Category</th>
                  <th className="py-3 px-4">Date</th>
                  <th className="py-3 px-4 text-center">Pin</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {filtered.map((n) => (
                  <tr key={n.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-mono font-bold text-brand-900 whitespace-nowrap">
                      {n.noticeNo}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-bold text-slate-900 text-sm">{n.title}</div>
                      <div className="text-slate-500 text-[11px] line-clamp-1">{n.description}</div>
                      <span className="text-[10px] text-amber-700 font-semibold">{n.department}</span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className="bg-slate-100 text-slate-700 px-2 py-0.5 rounded font-semibold text-[11px]">
                        {n.category}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap text-slate-500">
                      {n.date}
                    </td>
                    <td className="py-3 px-4 text-center whitespace-nowrap">
                      <button
                        onClick={() => togglePin(n)}
                        title={n.pinned ? 'Unpin from top' : 'Pin to top'}
                        className={`p-1.5 rounded-lg transition ${
                          n.pinned 
                            ? 'bg-amber-100 text-amber-800 font-bold' 
                            : 'text-slate-400 hover:text-slate-600'
                        }`}
                      >
                        <Pin className={`w-3.5 h-3.5 ${n.pinned ? 'fill-current' : ''}`} />
                      </button>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => openEdit(n)}
                        className="text-slate-600 hover:text-brand-800 p-1 rounded transition"
                        title="Edit notice"
                      >
                        <Edit className="w-3.5 h-3.5 inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(n.id)}
                        className="text-rose-600 hover:text-rose-800 p-1 rounded transition"
                        title="Delete notice"
                      >
                        <Trash2 className="w-3.5 h-3.5 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Modal for Create / Edit */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="font-bold text-base text-slate-900">
                {editingId ? 'Edit Circular / Notice' : 'Create Official Circular'}
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-slate-400 hover:text-slate-600 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Notice Reference No. *</label>
                  <input
                    type="text"
                    required
                    value={form.noticeNo}
                    onChange={(e) => setForm({ ...form, noticeNo: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Date *</label>
                  <input
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Title *</label>
                <input
                  type="text"
                  required
                  placeholder="Official headline of the notice"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 bg-white"
                  >
                    <option value="Meeting Notice">Meeting Notice</option>
                    <option value="Govt Memorandum">Govt Memorandum</option>
                    <option value="Examination">Examination</option>
                    <option value="Welfare">Welfare</option>
                    <option value="Cadre Restructuring">Cadre Restructuring</option>
                    <option value="General Circular">General Circular</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Target Department</label>
                  <input
                    type="text"
                    placeholder="e.g. All Departments / PWD"
                    value={form.department}
                    onChange={(e) => setForm({ ...form, department: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Description / Summary</label>
                <textarea
                  rows={4}
                  placeholder="Detailed description of the notice or agenda..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                ></textarea>
              </div>

              <div className="flex items-center gap-2 pt-1">
                <input
                  type="checkbox"
                  id="pinCheck"
                  checked={form.pinned}
                  onChange={(e) => setForm({ ...form, pinned: e.target.checked })}
                  className="rounded text-brand-600 focus:ring-brand-500"
                />
                <label htmlFor="pinCheck" className="font-bold text-slate-700">
                  Pin to Top of Notices Hub and Homepage
                </label>
              </div>

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-lg text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-900 hover:bg-brand-950 text-white font-bold px-5 py-2 rounded-lg transition"
                >
                  {editingId ? 'Save Changes' : 'Publish Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
