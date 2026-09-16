import { UserCheck } from 'lucide-react';

export default function MembershipPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserCheck className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-brand-950 font-serif mb-4">Apply for Membership</h1>
        <p className="text-slate-600 text-lg">Join SDEA WB and strengthen our collective voice.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
        <p className="text-slate-800 mb-6 font-medium">The digital membership application form is currently being updated for the 2026-2027 cycle.</p>
        <p className="text-slate-600 mb-8">Please contact your District Secretary for offline membership forms.</p>
        <a href="/office-bearers?tab=districts" className="bg-brand-900 hover:bg-brand-800 text-white font-bold py-3 px-8 rounded-xl transition">
          Find District Secretaries
        </a>
      </div>
    </div>
  );
}
