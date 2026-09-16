const fs = require('fs');

const pageCode = `
import { UserCheck, FileText, Send } from 'lucide-react';

export default function MembershipPage() {
  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-8 py-12">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-5xl font-black text-brand-950 font-serif mb-4">Membership Application</h1>
        <p className="text-slate-600 max-w-2xl text-lg">Join SDEA WB and strengthen our collective voice. Fill out the application form below.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="p-6 sm:p-10">
          <form className="space-y-8" action="#" method="POST" onSubmit={(e) => e.preventDefault()}>
            
            {/* Personal Details */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-6">Personal Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Full Name *</label>
                  <input type="text" className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" required placeholder="Er. John Doe" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Father's / Husband's Name *</label>
                  <input type="text" className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Date of Birth *</label>
                  <input type="date" className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Blood Group</label>
                  <select className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none bg-white">
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

            {/* Contact Details */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-6">Contact Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Mobile Number *</label>
                  <input type="tel" className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" required placeholder="+91" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Email Address *</label>
                  <input type="email" className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" required placeholder="name@example.com" />
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Permanent Address *</label>
                  <textarea className="w-full border border-slate-300 rounded-lg p-3 h-24 focus:ring-2 focus:ring-brand-500 outline-none" required></textarea>
                </div>
              </div>
            </div>

            {/* Professional Details */}
            <div>
              <h3 className="text-lg font-bold text-slate-900 border-b border-slate-200 pb-2 mb-6">Professional Details</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Designation *</label>
                  <input type="text" className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" required placeholder="e.g. Sub-Assistant Engineer" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Department / Directorate *</label>
                  <select className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none bg-white" required>
                    <option value="">Select Department</option>
                    <option value="PWD">PWD (Roads & Electrical)</option>
                    <option value="IWD">Irrigation & Waterways (I&W)</option>
                    <option value="PHED">Public Health Engineering (PHE)</option>
                    <option value="WRIDD">Water Resources Investigation (WRIDD)</option>
                    <option value="PRD">Panchayat & Rural Development</option>
                    <option value="MED">Municipal Engineering Directorate</option>
                    <option value="OTHER">Other Department</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Current Place of Posting *</label>
                  <input type="text" className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" required />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Date of Joining in Service</label>
                  <input type="date" className="w-full border border-slate-300 rounded-lg p-3 focus:ring-2 focus:ring-brand-500 outline-none" />
                </div>
              </div>
            </div>

            <div className="pt-6 flex justify-end">
              <button type="submit" className="bg-brand-900 hover:bg-brand-800 text-white font-bold py-3.5 px-8 rounded-xl transition flex items-center gap-2 shadow-lg">
                <Send className="w-5 h-5" />
                <span>Submit Application</span>
              </button>
            </div>

          </form>
        </div>
        
        {/* Offline Form Notice */}
        <div className="bg-amber-50 border-t border-amber-100 p-6 sm:p-10 text-center">
          <FileText className="w-8 h-8 text-amber-500 mx-auto mb-4" />
          <h3 className="text-lg font-bold text-brand-950 mb-2">Prefer Offline Registration?</h3>
          <p className="text-slate-600 mb-4 max-w-lg mx-auto text-sm">
            You can also download the physical membership form, fill it out, and submit it to your respective District Secretary along with the membership fee.
          </p>
          <a href="#" className="inline-flex items-center gap-2 text-brand-700 font-bold hover:text-brand-900 transition">
            Download PDF Form
          </a>
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('app/(public)/membership/page.jsx', pageCode.trim());
console.log('Membership page updated!');
