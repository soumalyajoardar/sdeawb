const fs = require('fs');
const pillars = [
  "All Engineers should be declared as Professional.",
  "Non-Practicing Allowance @ 20% should be provided to all Engineers.",
  "Need based minimum pay should be fixed at Rs. 24,000/- as per C.P.I. 1245 (Base 1982=100) w.e.f. 01.01.2016.",
  "Initial scale of pay of Junior Engineers / Junior Inspecting Officers should be fixed just below the scale of Assistant Engineers / Inspecting Officers.",
  "50% of the posts of Assistant Engineer / Inspecting Officer should be filled from Junior Engineer / Junior Inspecting Officer.",
  "A special increment should be prescribed to Junior Engineers / Junior Inspecting Officers who acquire Degree in Engineering or equivalent qualification during service.",
  "Create Assistant Engineer posts in every Block Office designated as Block Development Engineer.",
  "Inter-se seniority should be determined from the date of occurrence of vacancy and promotion should be considered retrospectively.",
  "An Engineering Service Structure under an Engineering Directorate should be constituted for Engineering Officers of Electricity Duty.",
  "The service of Junior Engineers should be termed as West Bengal Engineering Service.",
  "Engineering Service Structure should be introduced for Junior Inspecting Officer, Inspecting Officer, Senior Inspecting Officer and Chief Inspecting Officer.",
  "Junior Engineers / Junior Inspecting Officers should be allowed to appear in PSC Professional Examination from the date of joining.",
  "Promotional eligibility to Assistant Engineer / Inspecting Officer after 8 Years of Service.",
  "Special Pay for Head Estimator: Rs. 3,000/- per month.",
  "Departmental Engineering candidates should be exempted from appearing at Supervisor Certificate of Competency (S.C.C.) examination where one-year experience certificate has been issued.",
  "Transport Allowance: Assistant Engineer: Rs. 3,600/- + D.A., Junior Engineer: Rs. 2,400/- + D.A.",
  "Travelling Allowance: 100% increase in all rates.",
  "Dearness Allowance at par with Central Government.",
  "House Rent Allowance: 25% of Basic Pay.",
  "Education Allowance: Rs. 36,000/- per annum per child (maximum two children).",
  "Hill Compensatory Allowance: 25% of Basic Pay.",
  "Winter Allowance: Rs. 5,000/- per year.",
  "Special Allowance for handling Stores & T&P: Rs. 2,500/- per month.",
  "Project / Construction Allowance: 20% of Basic Pay.",
  "Bonus: 8.33% of pay inclusive of D.A.",
  "Gratuity Benefit: No Maximum Limit.",
  "Leave Travel Concession should be provided biennially.",
  "Pension Enhancement: 65 Years: +10%, 70 Years: +20%, 75 Years: +30%, 85 Years: +50%, 100 Years: +100%",
  "Regular In-Service Training opportunities for Junior Engineers.",
  "Award of Full Trade Union Rights.",
  "Leave Encashment up to 360 Days.",
  "Transfer policy should be implemented sympathetically.",
  "Constitute the service of Junior Engineers under Development & Planning as State Cadre."
];

const pageCode = `
import { FileText, CheckCircle2 } from 'lucide-react';

export default function CharterPage() {
  const pillars = ${JSON.stringify(pillars, null, 4)};

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-5xl font-black text-brand-950 font-serif mb-4">Charter of Demands</h1>
        <p className="text-slate-600 max-w-2xl text-lg">The core demands and goals we are fighting for to protect the rights of technocrats in West Bengal.</p>
      </div>
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
          {pillars.map((pillar, idx) => (
            <div key={idx} className="flex items-start gap-4">
              <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
              <p className="text-slate-700 font-medium leading-relaxed">{pillar}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
`;

fs.writeFileSync('app/(public)/charter-of-demand/page.jsx', pageCode.trim());
