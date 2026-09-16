'use client';

import { useState, useEffect } from 'react';
import { Users, Plus, Trash2, Edit, Search, MapPin, Building, X } from 'lucide-react';

export default function AdminOfficeBearersPage() {
  const [bearers, setBearers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedType, setSelectedType] = useState('All');
  const [editingItem, setEditingItem] = useState(null);

  const allDistricts = [
    'State Level',
    'Kolkata', 'Howrah', 'North 24 Parganas', 'South 24 Parganas',
    'Hooghly', 'Nadia', 'Purba Bardhaman', 'Paschim Bardhaman',
    'Purba Medinipur', 'Paschim Medinipur', 'Jhargram', 'Bankura',
    'Purulia', 'Birbhum', 'Murshidabad', 'Malda', 'Uttar Dinajpur',
    'Dakshin Dinajpur', 'Jalpaiguri', 'Alipurduar', 'Cooch Behar',
    'Darjeeling', 'Kalimpong'
  ];

  const [form, setForm] = useState({
    type: 'district',
    district: 'Kolkata',
    designation: 'District Secretary',
    name: '',
    department: 'Public Works Department (Civil)',
    rank: 'Assistant Engineer',
    mobile: '',
    email: '',
    order: 1
  });

  const loadBearers = async () => {
    try {
      const res = await fetch('/api/office-bearers');
      if (res.ok) {
        const data = await res.json();
        setBearers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBearers();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = editingItem ? { id: editingItem.id, ...form } : form;
      const res = await fetch('/api/office-bearers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowModal(false);
        setEditingItem(null);
        loadBearers();
      }
    } catch (err) {
      alert('Error saving bearer: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to remove this office bearer?')) return;
    try {
      await fetch(`/api/office-bearers?id=${id}`, { method: 'DELETE' });
      loadBearers();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  const openNew = () => {
    setEditingItem(null);
    setForm({
      type: 'district',
      district: 'Kolkata',
      designation: 'District Secretary',
      name: '',
      department: 'Public Works Department (Civil)',
      rank: 'Assistant Engineer',
      mobile: '',
      email: '',
      order: bearers.length + 1
    });
    setShowModal(true);
  };

  const openEdit = (b) => {
    setEditingItem(b);
    setForm({
      type: b.type,
      district: b.district,
      designation: b.designation,
      name: b.name,
      department: b.department,
      rank: b.rank,
      mobile: b.mobile,
      email: b.email,
      order: b.order || 1
    });
    setShowModal(true);
  };

  const filtered = bearers.filter(b => {
    if (selectedType === 'cec' && b.type !== 'cec') return false;
    if (selectedType === 'district' && b.type !== 'district') return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return b.name?.toLowerCase().includes(q) || 
             b.district?.toLowerCase().includes(q) ||
             b.designation?.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            Office Bearers & Committees
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage State Central Executive Committee (CEC) and 23 District leadership listings.
          </p>
        </div>
        <button
          onClick={openNew}
          className="bg-brand-900 hover:bg-brand-950 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition shadow-md shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add Committee Member</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by name, district, or designation..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-600"
          />
        </div>
        <div className="sm:col-span-4">
          <select
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
            className="w-full py-2 px-3 border border-slate-300 rounded-lg text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-brand-600 bg-white"
          >
            <option value="All">All Levels (State & Districts)</option>
            <option value="cec">Central Executive Committee (State)</option>
            <option value="district">District Committees</option>
          </select>
        </div>
      </div>

      {/* Members Grid / List */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">Loading office bearers...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">No members found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Level</th>
                  <th className="py-3 px-4">District / Unit</th>
                  <th className="py-3 px-4">Designation</th>
                  <th className="py-3 px-4">Leader Name</th>
                  <th className="py-3 px-4">Department & Rank</th>
                  <th className="py-3 px-4">Mobile & Email</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {filtered.map((b) => (
                  <tr key={b.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded font-bold text-[10px] ${
                        b.type === 'cec' ? 'bg-amber-100 text-amber-800' : 'bg-slate-100 text-slate-700'
                      }`}>
                        {b.type === 'cec' ? 'State CEC' : 'District'}
                      </span>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-semibold text-slate-900">
                      {b.district}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-bold text-brand-900">
                      {b.designation}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {b.name}
                    </td>
                    <td className="py-3 px-4">
                      <div className="text-slate-800">{b.department}</div>
                      <div className="text-[11px] text-slate-400">{b.rank}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div>{b.mobile || '—'}</div>
                      <div className="text-slate-400 text-[11px]">{b.email}</div>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => openEdit(b)}
                        className="text-slate-600 hover:text-brand-800 p-1"
                        title="Edit member"
                      >
                        <Edit className="w-3.5 h-3.5 inline" />
                      </button>
                      <button
                        onClick={() => handleDelete(b.id)}
                        className="text-rose-600 hover:text-rose-800 p-1"
                        title="Delete member"
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

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="font-bold text-base text-slate-900">
                {editingItem ? 'Edit Office Bearer' : 'Add Office Bearer'}
              </h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3 text-xs">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Committee Tier *</label>
                  <select
                    value={form.type}
                    onChange={(e) => {
                      const val = e.target.value;
                      setForm({ 
                        ...form, 
                        type: val,
                        district: val === 'cec' ? 'State Level' : 'Kolkata'
                      });
                    }}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 bg-white"
                  >
                    <option value="district">District Committee</option>
                    <option value="cec">Central Executive Committee (CEC)</option>
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">District / Jurisdiction *</label>
                  <select
                    value={form.district}
                    disabled={form.type === 'cec'}
                    onChange={(e) => setForm({ ...form, district: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600 bg-white disabled:bg-slate-100"
                  >
                    {allDistricts.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Designation *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. District Secretary / President"
                    value={form.designation}
                    onChange={(e) => setForm({ ...form, designation: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Official Name (Er.) *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Er. Kalyan Mondal"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Department / Directorate</label>
                <input
                  type="text"
                  placeholder="e.g. P. W. (Roads) Directorate"
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Rank / Cadre</label>
                <input
                  type="text"
                  placeholder="e.g. Assistant Engineer (A.E.)"
                  value={form.rank}
                  onChange={(e) => setForm({ ...form, rank: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Contact Mobile</label>
                  <input
                    type="tel"
                    placeholder="10-digit mobile"
                    value={form.mobile}
                    onChange={(e) => setForm({ ...form, mobile: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Email ID</label>
                  <input
                    type="email"
                    placeholder="email@sdeawb.org"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-600"
                  />
                </div>
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
                  Save Office Bearer
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
