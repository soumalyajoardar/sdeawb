'use client';

import { useState } from 'react';
import { FileText, CheckCircle2, Award, Shield, ArrowRight, Download } from 'lucide-react';

export default function CharterPage() {
  const [activeCategory, setActiveCategory] = useState('all');

  const categorizedDemands = [
    {
      category: 'Pay & NPA',
      title: 'Professional Status & 20% Non-Practicing Allowance',
      points: [
        "All Engineers should be declared as Professional Technocrats.",
        "Non-Practicing Allowance @ 20% should be provided to all Engineers.",
        "Need based minimum pay should be fixed at Rs. 24,000/- as per C.P.I. 1245 (Base 1982=100) w.e.f. 01.01.2016.",
        "Initial scale of pay of Junior Engineers / Junior Inspecting Officers should be fixed just below the scale of Assistant Engineers / Inspecting Officers.",
        "Special Pay for Head Estimator: Rs. 3,000/- per month.",
        "Special Allowance for handling Stores & T&P: Rs. 2,500/- per month.",
        "Project / Construction Allowance: 20% of Basic Pay."
      ]
    },
    {
      category: 'Promotions & Cadre',
      title: 'Promotional Quota & Cadre Restructuring',
      points: [
        "50% of the posts of Assistant Engineer / Inspecting Officer should be filled from Junior Engineer / Junior Inspecting Officer.",
        "Promotional eligibility to Assistant Engineer / Inspecting Officer after 8 Years of Service.",
        "A special increment should be prescribed to Junior Engineers / Junior Inspecting Officers who acquire Degree in Engineering or equivalent qualification during service.",
        "Create Assistant Engineer posts in every Block Office designated as Block Development Engineer.",
        "Inter-se seniority should be determined from the date of occurrence of vacancy and promotion should be considered retrospectively.",
        "An Engineering Service Structure under an Engineering Directorate should be constituted for Engineering Officers of Electricity Duty.",
        "The service of Junior Engineers should be termed as West Bengal Engineering Service.",
        "Engineering Service Structure should be introduced for Junior Inspecting Officer, Inspecting Officer, Senior Inspecting Officer and Chief Inspecting Officer.",
        "Junior Engineers / Junior Inspecting Officers should be allowed to appear in PSC Professional Examination from the date of joining.",
        "Departmental Engineering candidates should be exempted from appearing at Supervisor Certificate of Competency (S.C.C.) examination where one-year experience certificate has been issued.",
        "Constitute the service of Junior Engineers under Development & Planning as State Cadre."
      ]
    },
    {
      category: 'Allowances & Benefits',
      title: 'Dearness, Transport & Travelling Parity',
      points: [
        "Dearness Allowance at par with Central Government rates.",
        "Transport Allowance: Assistant Engineer: Rs. 3,600/- + D.A., Junior Engineer: Rs. 2,400/- + D.A.",
        "Travelling Allowance: 100% increase in all existing state rates.",
        "House Rent Allowance: 25% of Basic Pay.",
        "Education Allowance: Rs. 36,000/- per annum per child (maximum two children).",
        "Hill Compensatory Allowance: 25% of Basic Pay.",
        "Winter Allowance: Rs. 5,000/- per year.",
        "Bonus: 8.33% of pay inclusive of D.A."
      ]
    },
    {
      category: 'Welfare & Service Rules',
      title: 'Retirement, Health & Trade Union Rights',
      points: [
        "Gratuity Benefit: Removal of arbitrary maximum limit.",
        "Leave Travel Concession should be provided biennially for all engineers.",
        "Pension Enhancement: 65 Years: +10%, 70 Years: +20%, 75 Years: +30%, 85 Years: +50%, 100 Years: +100%.",
        "Regular In-Service Training opportunities for Junior Engineers in modern engineering software and project management.",
        "Award of Full Trade Union Rights to all state diploma engineering cadres.",
        "Leave Encashment up to 360 Days at retirement.",
        "Transfer policy should be implemented sympathetically and transparently."
      ]
    }
  ];

  const categories = ['all', 'Pay & NPA', 'Promotions & Cadre', 'Allowances & Benefits', 'Welfare & Service Rules'];

  const displayedSections = activeCategory === 'all' 
    ? categorizedDemands 
    : categorizedDemands.filter(s => s.category === activeCategory);

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-200 pb-6">
        <div>
          <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Foundational Demands</div>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-950 font-serif mb-3">Charter of Demands</h1>
          <p className="text-slate-600 max-w-3xl text-base sm:text-lg">
            The core democratic goals and constitutional rights championed by SDEA WB to protect technocrats across West Bengal.
          </p>
        </div>

        <a 
          href="https://news.sdeawb.org/wp-content/uploads/2026/05/Application-Form-for-Membership.pdf"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-brand-950 hover:bg-brand-900 text-amber-400 font-bold px-5 py-3 rounded-xl shadow-md transition flex items-center gap-2 text-xs sm:text-sm shrink-0"
        >
          <Download className="w-4 h-4" />
          <span>Download Memorandum</span>
        </a>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeCategory === cat
                ? 'bg-brand-950 text-amber-400 shadow-sm border-b-2 border-amber-400'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {cat === 'all' ? 'All 40 Demands' : cat}
          </button>
        ))}
      </div>

      {/* Categorized Demands Cards */}
      <div className="space-y-8">
        {displayedSections.map((section, sIdx) => (
          <div key={sIdx} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="bg-slate-50 px-6 sm:px-8 py-4 border-b border-slate-200 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-8 h-8 rounded-lg bg-amber-500 text-brand-950 font-black flex items-center justify-center text-sm shadow-sm">
                  {sIdx + 1}
                </span>
                <h2 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                  {section.title}
                </h2>
              </div>
              <span className="text-xs font-bold text-slate-500 bg-white px-3 py-1 rounded-full border border-slate-200">
                {section.points.length} Demands
              </span>
            </div>

            <div className="p-6 sm:p-8 grid grid-cols-1 md:grid-cols-2 gap-4">
              {section.points.map((point, pIdx) => (
                <div key={pIdx} className="flex items-start gap-3 p-3 rounded-xl hover:bg-amber-50/40 transition">
                  <CheckCircle2 className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <p className="text-sm font-medium text-slate-800 leading-relaxed">
                    {point}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}