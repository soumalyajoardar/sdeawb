'use client';

import { useState } from 'react';
import Link from 'next/link';
import { 
  Landmark, Shield, CheckCircle2, AlertCircle, Send, 
  Printer, ArrowLeft, Award, FileSpreadsheet, Building2, User, Phone, Mail 
} from 'lucide-react';

export default function LegacyMemberPage() {
  const [formData, setFormData] = useState({
    membershipId: '',
    entryYear: '',
    paidUpYear: '2026',
    oldBookRef: '',
    fullName: '',
    mobile: '',
    email: '',
    address: '',
    designation: 'Sub-Assistant Engineer',
    department: 'Public Works (Roads) Directorate',
    postingOffice: '',
    district: 'Kolkata',
    hrmsId: '',
    gpfNo: '',
    qualification: 'Diploma in Civil Engineering',
    joiningDate: '',
    remarks: ''
  });

  const [loading, setLoading] = useState(false);
  const [successData, setSuccessData] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Format legacy details
    const payload = {
      ...formData,
      remarks: [
        formData.remarks,
        formData.oldBookRef ? `Old Book/Receipt Ref: ${formData.oldBookRef}` : ''
      ].filter(Boolean).join(' | ')
    };

    try {
      const res = await fetch('/api/legacy-members', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit legacy record.');
      }

      setSuccessData(data.item || data);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const districts = [
    'Alipurduar', 'Bankura', 'Birbhum', 'Cooch Behar', 'Dakshin Dinajpur',
    'Darjeeling', 'Hooghly', 'Howrah', 'Jalpaiguri', 'Jhargram',
    'Kalimpong', 'Kolkata', 'Malda', 'Murshidabad', 'Nadia',
    'North 24 Parganas', 'Paschim Bardhaman', 'Paschim Medinipur',
    'Purba Bardhaman', 'Purba Medinipur', 'Purulia', 'South 24 Parganas', 'Uttar Dinajpur'
  ];

  const departments = [
    'Public Works Department (P.W.D.)',
    'Public Works (Roads) Directorate',
    'Irrigation & Waterways Directorate (I&W)',
    'Public Health Engineering Directorate (PHED)',
    'Panchayat & Rural Development (P&RD)',
    'Housing Directorate',
    'Municipal Engineering Directorate (MED)',
    'Sundarban Affairs Directorate',
    'Water Resources Investigation & Development (WRIDD)',
    'Other State Engineering Cadre'
  ];

  const designations = [
    'Sub-Assistant Engineer (SAE)',
    'Assistant Engineer (AE)',
    'Executive Engineer (EE)',
    'Superintending Engineer (SE)',
    'Assistant Architect',
    'Architect',
    'Senior Architect',
    'Retired State Engineer'
  ];

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-8 py-12 space-y-10">
      {/* Header Banner */}
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-600 uppercase tracking-wider mb-2 bg-amber-50 px-3 py-1 rounded-md border border-amber-200">
            <Landmark className="w-3.5 h-3.5" />
            <span>Official Digitization Registry</span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-950 font-serif mb-3">
            Legacy Member Digitization
          </h1>
          <p className="text-slate-600 max-w-3xl text-base sm:text-lg">
            For existing registered members of SDEA WB holding physical membership IDs or books. Update and link your lifelong service record to the new central digital technocrat database.
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/membership"
            className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold px-4 py-2.5 rounded-xl shadow-sm transition text-xs sm:text-sm flex items-center gap-2"
          >
            <span>New Member? Apply Here</span>
          </Link>
        </div>
      </div>

      {/* Success Notification Slip */}
      {successData ? (
        <div className="bg-white border-2 border-emerald-500 rounded-3xl p-6 sm:p-10 max-w-3xl mx-auto shadow-xl space-y-6 animate-fadeIn print:shadow-none print:border-slate-800">
          <div className="text-center space-y-2 border-b border-slate-200 pb-6">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner mb-3">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <span className="text-xs font-bold text-emerald-700 uppercase tracking-widest bg-emerald-100/80 px-3 py-1 rounded-full">
              Digitization Record Acknowledged
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-brand-950 font-serif">
              Legacy Record Submitted Successfully!
            </h2>
            <p className="text-sm text-slate-600 max-w-lg mx-auto">
              Your existing membership details have been entered into the SDEA Central Digitization Queue for verification against the physical state register.
            </p>
          </div>

          {/* Member Card Summary */}
          <div className="bg-gradient-to-br from-brand-950 to-slate-900 text-white rounded-2xl p-6 shadow-lg border-2 border-amber-500 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-amber-400/10 rounded-full blur-2xl"></div>
            
            <div className="flex justify-between items-start border-b border-brand-800 pb-4 mb-4">
              <div>
                <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider block">SDEA WB Digitized Member</span>
                <h3 className="text-xl font-bold font-serif text-white">{successData.fullName}</h3>
                <p className="text-xs text-slate-300">{successData.designation}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block">Existing Membership ID</span>
                <span className="text-2xl font-black font-mono text-amber-400">{successData.membershipId}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs">
              <div>
                <span className="text-slate-400 block text-[11px]">Directorate:</span>
                <span className="font-semibold text-slate-100">{successData.department}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">District:</span>
                <span className="font-semibold text-slate-100">{successData.district}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">HRMS / GPF No:</span>
                <span className="font-mono text-amber-300 font-semibold">{successData.hrmsId || successData.gpfNo || 'N/A'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Entry Year:</span>
                <span className="font-semibold text-slate-100">{successData.entryYear || 'Historic'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Paid Up Year:</span>
                <span className="font-semibold text-slate-100">{successData.paidUpYear || '2026'}</span>
              </div>
              <div>
                <span className="text-slate-400 block text-[11px]">Verification Status:</span>
                <span className="inline-block px-2 py-0.5 rounded text-[11px] font-bold bg-amber-500/20 text-amber-300 border border-amber-400/40">
                  {successData.status || 'Pending Verification'}
                </span>
              </div>
            </div>
          </div>

          <div className="text-xs text-slate-500 bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-1.5">
            <div className="font-bold text-slate-700 flex items-center gap-1.5">
              <Shield className="w-4 h-4 text-brand-700" />
              <span>Next Verification Steps:</span>
            </div>
            <p>1. The Central Executive Committee (CEC) and your District Secretary will reconcile this entry with the historical paper ledger.</p>
            <p>2. Once verified, your digital ID card with QR code verification will be issued automatically.</p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-2 print:hidden">
            <button
              onClick={() => window.print()}
              className="bg-brand-950 hover:bg-brand-900 text-amber-400 font-bold px-6 py-3 rounded-xl text-sm transition shadow-md flex items-center gap-2"
            >
              <Printer className="w-4 h-4" />
              <span>Print Acknowledgment Slip</span>
            </button>
            <button
              onClick={() => {
                setSuccessData(null);
                setFormData({
                  membershipId: '',
                  entryYear: '',
                  paidUpYear: '2026',
                  oldBookRef: '',
                  fullName: '',
                  mobile: '',
                  email: '',
                  address: '',
                  designation: 'Sub-Assistant Engineer',
                  department: 'Public Works (Roads) Directorate',
                  postingOffice: '',
                  district: 'Kolkata',
                  hrmsId: '',
                  gpfNo: '',
                  qualification: 'Diploma in Civil Engineering',
                  joiningDate: '',
                  remarks: ''
                });
              }}
              className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold px-6 py-3 rounded-xl text-sm transition shadow-sm"
            >
              Digitize Another Record
            </button>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm space-y-10 max-w-4xl mx-auto">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-center gap-3 text-sm">
              <AlertCircle className="w-5 h-5 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Section 1: Legacy Membership Information */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Award className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-slate-900">1. Physical SDEA Membership Details</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Existing Membership ID *
                </label>
                <input
                  type="text"
                  name="membershipId"
                  required
                  placeholder="e.g. 1042 or 0452"
                  value={formData.membershipId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 bg-amber-50/40 border border-amber-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 font-mono font-bold text-brand-950 placeholder-slate-400 text-base"
                />
                <p className="text-[11px] text-slate-500 mt-1">
                  Enter the 3 or 4-digit physical membership number on your card or receipt book.
                </p>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Year of SDEA Entry *
                </label>
                <input
                  type="number"
                  name="entryYear"
                  required
                  min="1971"
                  max="2026"
                  placeholder="e.g. 2012"
                  value={formData.entryYear}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Subscription Paid Up To *
                </label>
                <input
                  type="number"
                  name="paidUpYear"
                  required
                  min="1990"
                  max="2035"
                  placeholder="e.g. 2026"
                  value={formData.paidUpYear}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-semibold text-brand-900"
                />
              </div>

              <div className="sm:col-span-4">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Old Membership Book Serial / Counterfoil Reference (Optional)
                </label>
                <input
                  type="text"
                  name="oldBookRef"
                  placeholder="e.g. Receipt Book No. 14, Receipt #082, Issued at Alipore Branch"
                  value={formData.oldBookRef}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Technocrat Contact & Identity */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <User className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-slate-900">2. Member Profile & Contacts</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Full Name (with Er. Prefix) *
                </label>
                <input
                  type="text"
                  name="fullName"
                  required
                  placeholder="e.g. Er. Supratim Roy"
                  value={formData.fullName}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-semibold"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Mobile Number (10 digits) *
                </label>
                <input
                  type="tel"
                  name="mobile"
                  required
                  pattern="[0-9]{10}"
                  placeholder="e.g. 9830112233"
                  value={formData.mobile}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-mono"
                />
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  placeholder="e.g. supratim.roy@gmail.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Highest Technical Qualification
                </label>
                <input
                  type="text"
                  name="qualification"
                  placeholder="e.g. Dip. Civil / B.Tech"
                  value={formData.qualification}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Permanent / Residential Address
                </label>
                <textarea
                  name="address"
                  rows={2}
                  placeholder="Street, City, PIN Code..."
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Section 3: Civil Service & Cadre Credentials */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-200 pb-3">
              <Building2 className="w-5 h-5 text-amber-600" />
              <h2 className="text-lg font-bold text-slate-900">3. Civil Service & Posting Verification</h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Designation / Cadre Rank *
                </label>
                <select
                  name="designation"
                  value={formData.designation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm bg-white"
                >
                  {designations.map(d => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Directorate / Department *
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm bg-white"
                >
                  {departments.map(dept => (
                    <option key={dept} value={dept}>{dept}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Posting District *
                </label>
                <select
                  name="district"
                  value={formData.district}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm bg-white"
                >
                  {districts.map(dist => (
                    <option key={dist} value={dist}>{dist}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-2">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Current Posting Division / Office / Sub-Division *
                </label>
                <input
                  type="text"
                  name="postingOffice"
                  required
                  placeholder="e.g. Alipore Highway Division, Writers' Buildings / Bhabani Bhawan"
                  value={formData.postingOffice}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  HRMS Employee ID
                </label>
                <input
                  type="text"
                  name="hrmsId"
                  placeholder="e.g. 2012001452"
                  value={formData.hrmsId}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  GPF Account Number
                </label>
                <input
                  type="text"
                  name="gpfNo"
                  placeholder="e.g. PWD/ROADS/1245"
                  value={formData.gpfNo}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm font-mono"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Date of Joining Govt Service
                </label>
                <input
                  type="date"
                  name="joiningDate"
                  value={formData.joiningDate}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
                  Past Committee Offices Held / Additional Notes
                </label>
                <textarea
                  name="remarks"
                  rows={2}
                  placeholder="e.g. Former District Treasurer, Howrah (2018-2022), State Conference delegate..."
                  value={formData.remarks}
                  onChange={handleChange}
                  className="w-full px-4 py-2.5 border border-slate-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-amber-500 text-sm"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Submission Notice & Button */}
          <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-xs text-slate-500">
              <span className="font-semibold text-slate-700 block">Solemn Declaration:</span>
              I solemnly affirm that the physical membership ID and service credentials entered above are genuine and correct.
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-brand-950 font-bold px-8 py-3.5 rounded-xl text-base shadow-lg transition flex items-center justify-center gap-2 shrink-0 disabled:opacity-50"
            >
              <Send className="w-4 h-4" />
              <span>{loading ? 'Submitting Record...' : 'Submit Legacy Verification'}</span>
            </button>
          </div>
        </form>
      )}
    </div>
  );
}
