import { FileText, CheckCircle2 } from 'lucide-react';

export default function CharterPage() {
  const pillars = [
    "20% Non-Practicing Allowance (NPA) for Engineering Cadre.",
    "Increase in Promotional Quota up to 50%.",
    "Restructuring of the Cadre in all Departments.",
    "Regularization of Contractual Engineers.",
    "Ensuring transparent transfer policies.",
    "Strengthening technical setup at Block and Panchayat levels."
  ];

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-5xl font-black text-brand-950 font-serif mb-4">Charter of Demands</h1>
        <p className="text-slate-600 max-w-2xl text-lg">The core goals we are fighting for to protect the rights of technocrats.</p>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="space-y-4">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <CheckCircle2 className="w-6 h-6 text-brand-600 shrink-0" />
              <p className="text-lg text-slate-800 font-medium">{pillar}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
