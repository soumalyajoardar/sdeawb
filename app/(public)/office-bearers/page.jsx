import { getOfficeBearers } from '@/lib/db';
import OfficeBearersClient from './OfficeBearersClient';

export const metadata = {
  title: 'Office Bearers | SDEA WB',
  description: 'Leadership directory of the Central Executive Committee and District Secretaries of the Society for Development of Engineers & Architects West Bengal.'
};

export default function OfficeBearersPage() {
  const bearers = getOfficeBearers().sort((a, b) => (a.order || 99) - (b.order || 99));

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-8 py-12 space-y-10">
      <div className="text-center sm:text-left border-b border-slate-200 pb-6">
        <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">State & District Leadership</div>
        <h1 className="text-3xl sm:text-5xl font-black text-brand-950 font-serif mb-3">Office Bearers Directory</h1>
        <p className="text-slate-600 max-w-2xl text-base sm:text-lg">
          Meet the dedicated technocrat leadership of SDEA WB leading the democratic movement across West Bengal.
        </p>
      </div>

      <OfficeBearersClient bearers={bearers} />
    </div>
  );
}