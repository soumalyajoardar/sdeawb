'use client';

import { useState } from 'react';
import { UserCheck, FileText, Send, CheckCircle2, AlertCircle, Download, ArrowRight } from 'lucide-react';

export default function MembershipPage() {
  const [formData, setFormData] = useState({
    applicantName: '',
    fatherName: '',
    dob: '',
    bloodGroup: '',
    mobile: '',
    email: '',
    address: '',
    designation: 'Sub-Assistant Engineer',
    department: 'Public Works Department (Civil)',
    postingOffice: '',
    district: 'Kolkata',
    qualification: '',
    dateOfJoining: ''
  });

  const [loading, setLoading] = useState(false);
  const [successApp, setSuccessApp] = useState(null);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/memberships', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || 'Failed to submit application.');
      }

      setSuccessApp(data);
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

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-8 py-12 space-y-10">
      <div className="border-b border-slate-200 pb-6 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">State Technocrat Enrollment</div>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-950 font-serif mb-3">Apply for Membership</h1>
          <p className="text-slate-600 max-w-2xl text-base sm:text-lg">
            Join the Society for Development of Engineers & Architects West Bengal and protect your career rights.
          </p>
        </div>

        <a 
          href="https://news.sdeawb.org/wp-content/uploads/2026/05/Application-Form-for-Membership.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-white hover:bg-slate-50 border border-slate-300 text-slate-700 font-bold px-5 py-3 rounded-xl shadow-sm transition flex items-center gap-2 text-xs sm:text-sm shrink-0"
        >
          <Download className="w-4 h-4 text-amber-600" />
          <span>Download Physical PDF Form</span>
        </a>
      </div>

      {successApp ? (
        <div className="bg-emerald-50 border-2 border-emerald-500/40 rounded-2xl p-8 sm:p-12 text-center space-y-4 max-w-3xl mx-auto shadow-lg animate-fadeIn">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-inner">
            <CheckCircle2 className="w-10 h-10" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-black text-emerald-950 font-serif">
            Application Submitted Successfully!
          </h2>
          <p className="text-sm sm:text-base text-emerald-800 max-w-lg mx-auto leading-relaxed">
            Thank you, <strong className="font-bold">{successApp.applicantName}</strong>. Your membership enrollment request has been registered in the state database with reference ID:
          </p>
          <div className="inline-block bg-white border border-emerald-300 px-6 py-2 rounded-xl text-lg font-mono font-bold text-brand-950 shadow-sm">
            {successApp.id}
          </div>
          <p className="text-xs text-emerald-700 max-w-md mx-auto">
            Your credentials will be verified by the District Secretary and the Central Executive Committee. You will receive an official notification once approved.
          </p>
          <div className="pt-4">
            <button
              onClick={() => setSuccessApp(null)}
              className="bg-brand-950 text-amber-400 font-bold px-6 py-2.5 rounded-xl text-xs hover:bg-brand-900 transition"
            >
              Submit Another Application
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="p-6 sm:p-10">
            {error && (
              <div className="mb-6 p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-center gap-2">
                <AlertCircle className="w-5 h-5 shrink-0" />
                <span>{error}</span>
              </div>
            )}

            <form className="space-y-8" onSubmit={handleSubmit}>
              {/* Personal Details */}
              <div>
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-950 text-amber-400 text-xs flex items-center justify-center font-black">1</span>
                  <span>Personal Credentials</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Full Name *</label>
                    <input 
                      type="text" 
                      name="applicantName"
                      value={formData.applicantName}
                      onChange={handleChange}
                      required 
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" 
                      placeholder="Er. Firstname Lastname" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Father's / Spouse's Name *</label>
                    <input 
                      type="text" 
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      required 
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Date of Birth *</label>
                    <input 
                      type="date" 
                      name="dob"
                      value={formData.dob}
                      onChange={handleChange}
                      required 
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Blood Group</label>
                    <select 
                      name="bloodGroup"
                      value={formData.bloodGroup}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                    >
                      <option value="">Select Group</option>
                      <option value="A+">A+</option>
                      <option value="A-">A-</option>
                      <option value="B+">B+</option>
                      <option value="B-">B-</option>
                      <option value="O+">O+</option>
                      <option value="O-">O-</option>
                      <option value="AB+">AB+</option>
                      <option value="AB-">AB-</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div>
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-950 text-amber-400 text-xs flex items-center justify-center font-black">2</span>
                  <span>Contact Information</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Mobile Number *</label>
                    <input 
                      type="tel" 
                      name="mobile"
                      value={formData.mobile}
                      onChange={handleChange}
                      required 
                      placeholder="10-digit mobile number"
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" 
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Email Address *</label>
                    <input 
                      type="email" 
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required 
                      placeholder="engineer@domain.com"
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" 
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Permanent / Residential Address *</label>
                    <textarea 
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required 
                      rows={2}
                      placeholder="House, Street, Post Office, PIN Code"
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none"
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Service & Directorate Details */}
              <div>
                <h3 className="text-base font-bold text-slate-900 border-b border-slate-200 pb-2 mb-6 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-brand-950 text-amber-400 text-xs flex items-center justify-center font-black">3</span>
                  <span>Service & Directorate Details</span>
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Designation *</label>
                    <select 
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                    >
                      <option value="Sub-Assistant Engineer">Sub-Assistant Engineer (SAE)</option>
                      <option value="Assistant Engineer">Assistant Engineer (AE)</option>
                      <option value="Executive Engineer">Executive Engineer (EE)</option>
                      <option value="Estimator">Estimator / Head Estimator</option>
                      <option value="Architect">Architect / Assistant Architect</option>
                      <option value="Inspecting Officer">Inspecting Officer (Electricity Duty)</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Department / Directorate *</label>
                    <select 
                      name="department"
                      value={formData.department}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                    >
                      <option value="Public Works Department (Civil)">Public Works Department (Civil)</option>
                      <option value="P.W.D. (Electrical / Mechanical)">P.W.D. (Electrical / Mechanical)</option>
                      <option value="P.W. (Roads) Directorate">P.W. (Roads) Directorate</option>
                      <option value="Irrigation & Waterways Directorate">Irrigation & Waterways Directorate</option>
                      <option value="Public Health Engineering (PHED)">Public Health Engineering (PHED)</option>
                      <option value="Water Resources Investigation (WRIDD)">Water Resources Investigation (WRIDD)</option>
                      <option value="Panchayat & Rural Development (P&RD)">Panchayat & Rural Development (P&RD)</option>
                      <option value="Municipal Engineering Directorate (MED)">Municipal Engineering Directorate (MED)</option>
                      <option value="Other State Engineering Wing">Other State Engineering Wing</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Current Office of Posting *</label>
                    <input 
                      type="text" 
                      name="postingOffice"
                      value={formData.postingOffice}
                      onChange={handleChange}
                      required 
                      placeholder="e.g. Alipore Highway Division, Kolkata"
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">District of Posting *</label>
                    <select 
                      name="district"
                      value={formData.district}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none bg-white"
                    >
                      {districts.map(d => (
                        <option key={d} value={d}>{d}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Technical Qualification *</label>
                    <input 
                      type="text" 
                      name="qualification"
                      value={formData.qualification}
                      onChange={handleChange}
                      required 
                      placeholder="e.g. Diploma in Civil Engineering (APC Roy Poly.)"
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" 
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-slate-700 mb-1.5">Date of Joining Government Service</label>
                    <input 
                      type="date" 
                      name="dateOfJoining"
                      value={formData.dateOfJoining}
                      onChange={handleChange}
                      className="w-full border border-slate-300 rounded-xl p-3 text-sm focus:ring-2 focus:ring-amber-500 outline-none" 
                    />
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-4 flex justify-end">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="bg-brand-950 hover:bg-brand-900 text-amber-400 font-bold py-3.5 px-8 rounded-xl transition flex items-center gap-2 shadow-lg disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>{loading ? 'Submitting Application...' : 'Submit Membership Application'}</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
