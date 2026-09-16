'use client';

import { useState, useEffect } from 'react';
import { 
  UserCheck, Search, Filter, CheckCircle2, XCircle, 
  Download, Eye, Clock, Phone, Mail, MapPin, Building, X 
} from 'lucide-react';

export default function AdminMembershipsPage() {
  const [memberships, setMemberships] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [selectedApp, setSelectedApp] = useState(null);
  const [adminNotes, setAdminNotes] = useState('');

  const loadMemberships = async () => {
    try {
      const res = await fetch('/api/memberships');
      if (res.ok) {
        const data = await res.json();
        setMemberships(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMemberships();
  }, []);

  const updateStatus = async (id, status, notes) => {
    try {
      const res = await fetch('/api/memberships', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status, notes })
      });
      if (res.ok) {
        setSelectedApp(null);
        loadMemberships();
      }
    } catch (err) {
      alert('Failed to update: ' + err.message);
    }
  };

  const exportCSV = () => {
    if (memberships.length === 0) return;
    const headers = ['Application ID', 'Applicant Name', 'Designation', 'Department', 'District', 'Posting Office', 'Mobile', 'Email', 'Status', 'Applied At'];
    const rows = memberships.map(m => [
      `"${m.id}"`,
      `"${m.applicantName}"`,
      `"${m.designation}"`,
      `"${m.department}"`,
      `"${m.district}"`,
      `"${m.postingOffice}"`,
      `"${m.mobile}"`,
      `"${m.email || ''}"`,
      `"${m.status}"`,
      `"${m.appliedAt}"`
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(r => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `SDEA_WB_Memberships_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const filtered = memberships.filter(m => {
    if (statusFilter !== 'All' && m.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return m.applicantName.toLowerCase().includes(q) ||
             m.district.toLowerCase().includes(q) ||
             m.mobile.includes(q) ||
             m.id.toLowerCase().includes(q);
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            Membership Applications Desk
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Review online membership enrolment requests from state technocrats across all 23 districts.
          </p>
        </div>
        <button
          onClick={exportCSV}
          className="bg-brand-900 hover:bg-brand-950 text-white font-bold px-4 py-2 rounded-xl text-xs flex items-center gap-2 transition shadow-md shrink-0"
        >
          <Download className="w-4 h-4 text-amber-400" />
          <span>Export All to CSV</span>
        </button>
      </div>

      {/* Filter Row */}
      <div className="grid grid-cols-1 sm:grid-cols-12 gap-3 bg-white p-4 rounded-xl border border-slate-200 shadow-sm">
        <div className="sm:col-span-8 relative">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by applicant name, mobile, district, or reference ID..."
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
            <option value="All">All Statuses</option>
            <option value="Pending">Pending Review</option>
            <option value="Approved">Approved Members</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">Loading applications...</div>
        ) : filtered.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">No applications match your criteria.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-500 font-bold uppercase tracking-wider">
                <tr>
                  <th className="py-3 px-4">Ref ID</th>
                  <th className="py-3 px-4">Applicant</th>
                  <th className="py-3 px-4">Cadre & Dept</th>
                  <th className="py-3 px-4">District</th>
                  <th className="py-3 px-4">Contact</th>
                  <th className="py-3 px-4">Status</th>
                  <th className="py-3 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200 text-slate-700">
                {filtered.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition">
                    <td className="py-3 px-4 font-mono font-bold text-brand-900 whitespace-nowrap">
                      {app.id}
                    </td>
                    <td className="py-3 px-4 font-bold text-slate-900 whitespace-nowrap">
                      {app.applicantName}
                    </td>
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-800">{app.designation}</div>
                      <div className="text-slate-400 text-[11px]">{app.department}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap font-medium text-slate-800">
                      {app.district}
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <div>{app.mobile}</div>
                      <div className="text-slate-400 text-[11px]">{app.email || '—'}</div>
                    </td>
                    <td className="py-3 px-4 whitespace-nowrap">
                      <span className={`px-2.5 py-0.5 rounded font-bold text-[10px] ${
                        app.status === 'Approved' ? 'bg-emerald-100 text-emerald-800' :
                        app.status === 'Rejected' ? 'bg-rose-100 text-rose-800' :
                        'bg-amber-100 text-amber-800'
                      }`}>
                        {app.status}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-right whitespace-nowrap space-x-2">
                      <button
                        onClick={() => {
                          setSelectedApp(app);
                          setAdminNotes(app.notes || '');
                        }}
                        className="bg-brand-50 text-brand-900 hover:bg-brand-100 font-bold px-2.5 py-1 rounded transition flex items-center gap-1 inline-flex"
                      >
                        <Eye className="w-3.5 h-3.5" />
                        <span>Inspect</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Details & Review Modal */}
      {selectedApp && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 max-w-xl w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <div>
                <span className="text-amber-600 font-mono font-bold text-xs">{selectedApp.id}</span>
                <h2 className="font-bold text-base text-slate-900">{selectedApp.applicantName}</h2>
              </div>
              <button onClick={() => setSelectedApp(null)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-xs space-y-2">
              <div className="grid grid-cols-2 gap-2">
                <div><span className="text-slate-400">Designation:</span> <strong>{selectedApp.designation}</strong></div>
                <div><span className="text-slate-400">Department:</span> <strong>{selectedApp.department}</strong></div>
                <div><span className="text-slate-400">Posting Office:</span> <strong>{selectedApp.postingOffice}</strong></div>
                <div><span className="text-slate-400">District:</span> <strong>{selectedApp.district}</strong></div>
                <div><span className="text-slate-400">Mobile:</span> <strong>{selectedApp.mobile}</strong></div>
                <div><span className="text-slate-400">Email:</span> <strong>{selectedApp.email || '—'}</strong></div>
                <div><span className="text-slate-400">Qualification:</span> <strong>{selectedApp.qualification || '—'}</strong></div>
                <div><span className="text-slate-400">Joining Date:</span> <strong>{selectedApp.dateOfJoining || '—'}</strong></div>
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-slate-700 mb-1">
                Secretariat Verification Notes:
              </label>
              <textarea
                rows={3}
                placeholder="e.g. Credentials verified with Howrah district secretary..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg text-xs focus:outline-none focus:ring-2 focus:ring-brand-600"
              ></textarea>
            </div>

            <div className="pt-3 border-t border-slate-200 flex items-center justify-between gap-2">
              <span className="text-xs text-slate-500">
                Current Status: <strong className="text-slate-800">{selectedApp.status}</strong>
              </span>

              <div className="flex gap-2">
                <button
                  onClick={() => updateStatus(selectedApp.id, 'Approved', adminNotes)}
                  className="bg-emerald-600 hover:bg-emerald-700 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Member</span>
                </button>
                <button
                  onClick={() => updateStatus(selectedApp.id, 'Rejected', adminNotes)}
                  className="bg-rose-600 hover:bg-rose-700 text-white font-bold px-4 py-2 rounded-lg text-xs flex items-center gap-1.5 transition"
                >
                  <XCircle className="w-4 h-4" />
                  <span>Reject</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
