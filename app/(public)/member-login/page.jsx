import { LogIn } from 'lucide-react';

export default function MemberLoginPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <LogIn className="w-8 h-8 text-brand-700" />
      </div>
      <h1 className="text-3xl font-black text-slate-900 mb-4">Member Portal</h1>
      <p className="text-slate-600 mb-8">The secure member portal is undergoing planned maintenance and upgrade.</p>
      <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg text-sm font-medium">
        Please check back shortly. Your existing credentials will remain valid.
      </div>
    </div>
  );
}
