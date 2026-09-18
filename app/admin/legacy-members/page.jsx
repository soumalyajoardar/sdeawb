'use client';

import { useState, useEffect } from 'react';
import { 
  Landmark, Search, Filter, CheckCircle2, XCircle, 
  Download, Eye, Clock, Phone, Mail, MapPin, Building, X, 
  Plus, Shield, Trash2, Edit3, Award 
} from 'lucide-react';

export default function AdminLegacyMembersPage() {
  const [legacyMembers, setLegacyMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedMember, setSelectedMember] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  // Manual Add Form State
  const [addForm, setAddForm] = useState({
    membershipId: '',
    entryYear: '2015',
    paidUpYear: '2026',
    fullName: '',
    designation: 'Sub-Assistant Engineer',
    department: 'Public Works (Roads) Directorate',
    postingOffice: '',
    district: 'Kolkata',
    hrmsId: '',
    gpfNo: '',
    mobile: '',
    email: '',
    qualification: 'Diploma in Civil Engineering',
    status: 'Verified',
    remarks: 'Manually entered by Central Admin'
  });

  const loadLegacyMembers = async () => {
    try {
      const res = await fetch('/api/legacy-members');
      if (res.ok) {
        const data = await res.json();
        setLegacyMembers(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadLegacyMembers();
  }, []);

  const updateStatus = async (id, status, notes) => {
    try {
      const res = await fetch('/api/legacy-members', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, adminNotes: notes })
      });
      if (res.ok) {
        setSelectedMember(null);
        loadLegacyMembers();
      }
    } catch (err) {
      alert('Failed to update status: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this legacy member record?')) return;
    try {
      const res = await fetch(`/api/legacy-members?id=${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (selectedMember?.id === id) setSelectedMember(null);
        loadLegacyMembers();
      }
    } catch (err) {
      alert('Failed to delete: ' + err.message);
    }
  };

  const handleManualAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/legacy-members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(addForm)
      });
      if (res.ok) {
        setShowAddModal(false);
        setAddForm({
          membershipId: '',
          entryYear: '2015',
          paidUpYear: '2026',
          fullName: '',
          designation: 'Sub-Assistant Engineer',
          department: 'Public Works (Roads) Directorate',
          postingOffice: '',
          district: 'Kolkata',
          hrmsId: '',
          gpfNo: '',
          mobile: '',
          email: '',
          qualification: 'Diploma in Civil Engineering',
          status: 'Verified',
          remarks: 'Manually entered by Central Admin'
        });
        loadLegacyMembers();
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to add legacy member');
      }
    } catch (err) {
      alert(err.message);
    }
  };

  const exportCSV = () => {
    if (legacyMembers.length === 0) return;
    const headers = [
      'Membership ID', 'Full Name', 'Designation', 'Department', 'District', 
      'Posting Office', 'HRMS ID', 'GPF No', 'Entry Year', 'Paid Up Year', 
      'Mobile', 'Email', 'Status', 'Submitted At', 'Admin Notes'
    ];
    const rows = legacyMembers.map(m => [
      `"${m.membershipId}"`,
      `"${m.fullName}"`,
      `"${m.designation}"`,
      `"${m.department}"`,
      `"${m.district}"`,
      `"${m.postingOffice}"`,
      `"${m.hrmsId || ''}"`,
      `"${m.gpfNo || ''}"`,
      `"${m.entryYear || ''}"`,
      `"${m.paidUpYear || ''}"`,
      `"${m.mobile}"`,
      `"${m.email || ''}"`,
      `"${m.status}"`,
      `"${m.submittedAt}"`,
      `"${m.adminNotes || ''}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SDEA_WB_Legacy_Members_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = legacyMembers.filter(m => {
    if (statusFilter !== 'All' && m.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (m.fullName || '').toLowerCase().includes(q) ||
             (m.membershipId || '').toLowerCase().includes(q) ||
             (m.district || '').toLowerCase().includes(q) ||
             (m.hrmsId || '').toLowerCase().includes(q) ||
             (m.mobile || '').includes(q);
    }
    return true;
  });

  const verifiedCount = legacyMembers.filter(m => m.status === 'Verified').length;
  const pendingCount = legacyMembers.filter(m => m.status === 'Pending Verification' || m.status === 'Pending').length;
  const districtsCount = new Set(legacyMembers.map(m => m.district).filter(Boolean)).size;

  const districts = [
    'Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur',
    'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram',
    'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia',
    'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur',
    'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur'
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">
            <Landmark className="w-3.5 h-3.5" />
            <span>Membership Digitization Desk</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            Legacy Members Central Registry
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Audit, verify, and reconcile 4-digit physical membership records against the central paper register.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAddModal(true)}
            className="bg-brand-950 hover:bg-brand-900 text-amber-400 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition"
          >
            <Plus className="w-4 h-4" />
            <span>Add Legacy Record</span>
          </button>
          <button
            onClick={exportCSV}
            disabled={legacyMembers.length === 0}
            className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 shadow-sm transition disabled:opacity-50"
          >
            <Download className="w-4 h-4 text-emerald-600" />
            <span>Export CSV</span>
          </button>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-slate-500 block">Total Legacy Records</span>
          <span className="text-2xl font-black text-brand-950 font-serif mt-1 block">{legacyMembers.length}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-emerald-600 block">Verified & Digitized</span>
          <span className="text-2xl font-black text-emerald-600 font-serif mt-1 block">{verifiedCount}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-amber-600 block">Pending Verification</span>
          <span className="text-2xl font-black text-amber-600 font-serif mt-1 block">{pendingCount}</span>
        </div>
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-xs font-semibold text-indigo-600 block">Districts Active</span>
          <span className="text-2xl font-black text-indigo-600 font-serif mt-1 block">{districtsCount}</span>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col sm:flex-row gap-3 items-center justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by ID, Name, Mobile, District..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto overflow-x-auto">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0" />
          {['All', 'Verified', 'Pending Verification', 'Rejected'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition whitespace-nowrap ${
                statusFilter === st
                  ? 'bg-brand-950 text-amber-400 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Members Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="text-center py-16 text-slate-400 text-xs">
            Loading legacy membership records...
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-16 text-slate-400 text-xs">
            No legacy member records matching your filter.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-50 border-b border-slate-200 text-slate-600 font-bold uppercase tracking-wider">
                  <th className="p-3.5 pl-6">ID</th>
                  <th className="p-3.5">Technocrat Member</th>
                  <th className="p-3.5">Department & District</th>
                  <th className="p-3.5">HRMS / GPF</th>
                  <th className="p-3.5">Entry / Paid-Up</th>
                  <th className="p-3.5">Status</th>
                  <th className="p-3.5 pr-6 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filtered.map((m) => (
                  <tr key={m.id} className="hover:bg-slate-50/80 transition">
                    <td className="p-3.5 pl-6 font-mono font-black text-brand-900 text-sm">
                      <span className="bg-amber-100 text-amber-900 px-2 py-0.5 rounded-md border border-amber-300">
                        {m.membershipId}
                      </span>
                    </td>
                    <td className="p-3.5">
                      <div className="font-bold text-slate-900 text-sm">{m.fullName}</div>
                      <div className="text-[11px] text-slate-500">{m.designation}</div>
                      <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                        <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> {m.mobile}</span>
                      </div>
                    </td>
                    <td className="p-3.5">
                      <div className="font-semibold text-slate-800">{m.department}</div>
                      <div className="text-[11px] text-slate-500">{m.district} • {m.postingOffice}</div>
                    </td>
                    <td className="p-3.5 font-mono text-[11px] text-slate-600">
                      <div>{m.hrmsId ? `HRMS: ${m.hrmsId}` : ''}</div>
                      <div>{m.gpfNo ? `GPF: ${m.gpfNo}` : ''}</div>
                      {!m.hrmsId && !m.gpfNo && <span className="text-slate-400">N/A</span>}
                    </td>
                    <td className="p-3.5 text-[11px] text-slate-600">
                      <div>Entry: <span className="font-bold text-slate-800">{m.entryYear || 'Historic'}</span></div>
                      <div>Paid: <span className="font-bold text-emerald-700">{m.paidUpYear || '2026'}</span></div>
                    </td>
                    <td className="p-3.5">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[11px] font-bold ${
                        m.status === 'Verified'
                          ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                          : m.status === 'Rejected'
                          ? 'bg-rose-50 text-rose-700 border border-rose-200'
                          : 'bg-amber-50 text-amber-700 border border-amber-200'
                      }`}>
                        {m.status === 'Verified' && <CheckCircle2 className="w-3 h-3" />}
                        {m.status === 'Pending Verification' && <Clock className="w-3 h-3" />}
                        {m.status === 'Rejected' && <XCircle className="w-3 h-3" />}
                        <span>{m.status}</span>
                      </span>
                    </td>
                    <td className="p-3.5 pr-6 text-right space-x-1.5 whitespace-nowrap">
                      <button
                        onClick={() => {
                          setSelectedMember(m);
                          setAdminNotes(m.adminNotes || '');
                        }}
                        className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      {m.status !== 'Verified' && (
                        <button
                          onClick={() => updateStatus(m.id, 'Verified', m.adminNotes)}
                          className="p-1.5 rounded-lg bg-emerald-50 hover:bg-emerald-100 text-emerald-700 transition"
                          title="Verify Member"
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </button>
                      )}
                      <button
                        onClick={() => handleDelete(m.id)}
                        className="p-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 text-rose-600 transition"
                        title="Delete Record"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Member Details Modal */}
      {selectedMember && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 bg-brand-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Landmark className="w-5 h-5 text-amber-400" />
                <div>
                  <h3 className="font-bold text-base">Legacy Member Audit Record</h3>
                  <p className="text-xs text-amber-400 font-mono">ID: {selectedMember.membershipId}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedMember(null)}
                className="p-1.5 rounded-full hover:bg-brand-800 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-6 text-xs text-slate-700">
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 bg-slate-50 p-4 rounded-xl border border-slate-200">
                <div>
                  <span className="text-slate-400 font-semibold block">Full Name</span>
                  <span className="font-bold text-slate-900 text-sm">{selectedMember.fullName}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Physical Membership ID</span>
                  <span className="font-mono font-bold text-amber-600 text-base">{selectedMember.membershipId}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Current Status</span>
                  <span className="font-bold text-slate-800">{selectedMember.status}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Designation</span>
                  <span className="font-semibold text-slate-800">{selectedMember.designation}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Department</span>
                  <span className="font-semibold text-slate-800">{selectedMember.department}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">District</span>
                  <span className="font-semibold text-slate-800">{selectedMember.district}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Posting Office</span>
                  <span className="font-semibold text-slate-800">{selectedMember.postingOffice || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">HRMS ID</span>
                  <span className="font-mono font-semibold text-slate-800">{selectedMember.hrmsId || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">GPF No</span>
                  <span className="font-mono font-semibold text-slate-800">{selectedMember.gpfNo || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Entry Year</span>
                  <span className="font-bold text-slate-800">{selectedMember.entryYear || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Paid Up Year</span>
                  <span className="font-bold text-emerald-700">{selectedMember.paidUpYear || 'N/A'}</span>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Qualification</span>
                  <span className="font-semibold text-slate-800">{selectedMember.qualification || 'N/A'}</span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <span className="text-slate-400 font-semibold block">Mobile Number</span>
                  <a href={`tel:${selectedMember.mobile}`} className="font-semibold text-brand-700 hover:underline">
                    {selectedMember.mobile}
                  </a>
                </div>
                <div>
                  <span className="text-slate-400 font-semibold block">Email</span>
                  <a href={`mailto:${selectedMember.email}`} className="font-semibold text-brand-700 hover:underline">
                    {selectedMember.email || 'N/A'}
                  </a>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 font-semibold block">Residential Address</span>
                  <span className="text-slate-800">{selectedMember.address || 'N/A'}</span>
                </div>
                <div className="col-span-2">
                  <span className="text-slate-400 font-semibold block">Member Remarks / Old Book Ref</span>
                  <p className="bg-amber-50/50 p-2.5 rounded-lg border border-amber-200 text-slate-800">
                    {selectedMember.remarks || 'None provided'}
                  </p>
                </div>
              </div>

              {/* Admin Verification Notes */}
              <div>
                <label className="block text-slate-700 font-bold mb-1">
                  Central Registry Audit Notes
                </label>
                <textarea
                  rows={2}
                  value={adminNotes}
                  onChange={(e) => setAdminNotes(e.target.value)}
                  placeholder="e.g. Verified against 2012 Alipore District paper ledger by IT Secretary."
                  className="w-full p-2.5 border rounded-lg focus:ring-2 focus:ring-amber-500 text-xs"
                ></textarea>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap justify-between items-center gap-2">
              <button
                onClick={() => handleDelete(selectedMember.id)}
                className="text-rose-600 hover:text-rose-800 text-xs font-bold px-3 py-2 flex items-center gap-1"
              >
                <Trash2 className="w-4 h-4" />
                <span>Delete Record</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => updateStatus(selectedMember.id, 'Rejected', adminNotes)}
                  className="px-4 py-2 rounded-xl border border-rose-300 bg-rose-50 text-rose-700 font-bold hover:bg-rose-100 transition text-xs flex items-center gap-1"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject Record</span>
                </button>
                <button
                  onClick={() => updateStatus(selectedMember.id, 'Verified', adminNotes)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 text-white font-bold hover:bg-emerald-700 transition text-xs flex items-center gap-1 shadow-sm"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Mark as Verified</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Manual Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4">
          <form onSubmit={handleManualAdd} className="bg-white w-full max-w-2xl rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[90vh]">
            <div className="p-5 bg-brand-950 text-white flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Plus className="w-5 h-5 text-amber-400" />
                <h3 className="font-bold text-base">Direct Entry: Legacy Physical Member</h3>
              </div>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="p-1.5 rounded-full hover:bg-brand-800 text-slate-300"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Membership ID *</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. 1042"
                    value={addForm.membershipId}
                    onChange={(e) => setAddForm({ ...addForm, membershipId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg font-mono font-bold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Entry Year *</label>
                  <input
                    type="number"
                    required
                    value={addForm.entryYear}
                    onChange={(e) => setAddForm({ ...addForm, entryYear: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Paid Up Year *</label>
                  <input
                    type="number"
                    required
                    value={addForm.paidUpYear}
                    onChange={(e) => setAddForm({ ...addForm, paidUpYear: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Full Name *</label>
                  <input
                    type="text"
                    required
                    placeholder="Er. ..."
                    value={addForm.fullName}
                    onChange={(e) => setAddForm({ ...addForm, fullName: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg font-semibold"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Mobile Number *</label>
                  <input
                    type="tel"
                    required
                    value={addForm.mobile}
                    onChange={(e) => setAddForm({ ...addForm, mobile: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Designation</label>
                  <input
                    type="text"
                    value={addForm.designation}
                    onChange={(e) => setAddForm({ ...addForm, designation: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">District *</label>
                  <select
                    value={addForm.district}
                    onChange={(e) => setAddForm({ ...addForm, district: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg bg-white"
                  >
                    {districts.map(d => (
                      <option key={d} value={d}>{d}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={addForm.department}
                    onChange={(e) => setAddForm({ ...addForm, department: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Posting Office</label>
                  <input
                    type="text"
                    value={addForm.postingOffice}
                    onChange={(e) => setAddForm({ ...addForm, postingOffice: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">HRMS ID</label>
                  <input
                    type="text"
                    value={addForm.hrmsId}
                    onChange={(e) => setAddForm({ ...addForm, hrmsId: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg font-mono"
                  />
                </div>
                <div>
                  <label className="block font-bold text-slate-700 mb-1">GPF No</label>
                  <input
                    type="text"
                    value={addForm.gpfNo}
                    onChange={(e) => setAddForm({ ...addForm, gpfNo: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg font-mono"
                  />
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Verification Status</label>
                <select
                  value={addForm.status}
                  onChange={(e) => setAddForm({ ...addForm, status: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg bg-white"
                >
                  <option value="Verified">Verified</option>
                  <option value="Pending Verification">Pending Verification</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="px-4 py-2 border rounded-xl font-bold text-slate-600 hover:bg-slate-100 text-xs"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-amber-500 hover:bg-amber-600 text-brand-950 font-bold rounded-xl text-xs shadow-md"
              >
                Save Legacy Member
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
