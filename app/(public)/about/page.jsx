import Link from 'next/link';
import { 
  Building2, Award, History, Target, CheckCircle2, Shield, 
  Users, Sparkles, Scale, HeartHandshake, ArrowRight, Compass,
  Calendar, FileText, ChevronRight, Quote, Landmark
} from 'lucide-react';

export const metadata = {
  title: "About SDEA WB | History, Constitution & Vision",
  description: "Learn about the Society for Development of Engineers' & Architects' West Bengal (Founded 1971). Championing Pay, Prestige & Promotion for state technocrats."
};

export default function AboutPage() {
  const milestones = [
    {
      year: '1967',
      badge: 'Genesis & 1st Pay Commission',
      title: 'The Struggle Against Wage Disparity',
      description: 'At the time of the United Front Government in West Bengal, the 1st Pay Commission was formed. Sub-Assistant Engineers (then on Rs. 200–400/-) demanded a need-based minimum scale of Rs. 370–700/-. However, the commission recommended only Rs. 300–600/-, sparking deep grievances and statewide technocrat agitation.',
      quote: '“Sub-Assistant Engineers and Estimators hold L.C.E, L.M.E or L.E.E diplomas. Their work is of the same technical nature; there is no justification for disparity in pay scales.” — Late Mr. K. G. Bose, Member, 1st Pay Commission',
      color: 'border-blue-500',
      tagBg: 'bg-blue-50 text-blue-800'
    },
    {
      year: '1970',
      badge: 'The Resistance',
      title: 'Formation of the Fighting Committee',
      description: 'Following arbitrary disciplinary actions and membership revocations by the conservative leadership of the legacy subordinate service body against vocal diploma engineers, debarred pioneers united to establish the “West Bengal Sub-Assistant Engineers Fighting Committee”. Tens of thousands of engineers across districts rallied under this banner.',
      color: 'border-amber-500',
      tagBg: 'bg-amber-50 text-amber-900'
    },
    {
      year: '1971',
      badge: 'Foundation',
      title: 'Historic Kalighat Convention & Birth of WBSAEA',
      description: 'In December 1971, an iconic general convention was assembled at Kalighat, Kolkata. From this convention, the “West Bengal Sub-Assistant Engineers’ Association” (W.B.S.A.E.A.) was formally inaugurated. The body adopted the enduring democratic creed of JUSTICE, LIBERTY, EQUALITY, and FRATERNITY, pledging to champion Pay, Prestige & Promotion.',
      color: 'border-emerald-500',
      tagBg: 'bg-emerald-50 text-emerald-900'
    },
    {
      year: '1973 – 1976',
      badge: 'Federal Unity',
      title: 'National Affiliation & The State Federation',
      description: 'WBSAEA secured affiliation with the All India Federation of Diploma Engineers (A.I.F.O.D.E.) in 1973. Inspired by renowned federal leader Er. S. P. Mohanty, the “State Federation of Associations of Diploma Engineers, West Bengal” (S.F.A.D.E.) was formed in 1974 alongside sister technical associations to establish an impenetrable technocrat front.',
      color: 'border-purple-500',
      tagBg: 'bg-purple-50 text-purple-900'
    },
    {
      year: '1980 – 1981',
      badge: 'Unification',
      title: 'Renaming as State Diploma Engineers’ Association (SDEA WB)',
      description: 'As hundreds of active Sub-Assistant Engineers earned promotions to Assistant Engineer and Executive Engineer ranks, the association resolved to prevent cadre fragmentation. At the landmark 1981 Annual Conference (the supreme constitutional body), the organization was rechristened as the “State Diploma Engineers’ Association, West Bengal” (SDEA WB) to represent all cadres.',
      color: 'border-cyan-500',
      tagBg: 'bg-cyan-50 text-cyan-900'
    },
    {
      year: '2017 – Present',
      badge: 'Mahajati Sadan Resolution',
      title: 'Society for Development of Engineers’ & Architects’ West Bengal',
      description: 'At the momentous Annual General Meeting at Mahajati Sadan, Kolkata in December 2017, the organization expanded its constitutional mandate to include Architects and state engineering directorates under the title “Society for Development of Engineers’ & Architects’ West Bengal” (Reg. No. S0005492), spearheading technological excellence and social development.',
      color: 'border-amber-500',
      tagBg: 'bg-amber-100 text-amber-950 font-bold'
    }
  ];

  const objectives = [
    {
      title: 'Constitutional Tenets',
      desc: 'Upholding Justice, Liberty, Equality, and Fraternity for every technocrat in state service.',
      icon: Scale
    },
    {
      title: 'Pay, Prestige & Promotion',
      desc: 'Relentless advocacy for 20% NPA, timely promotional ratios (50% quota for AE), and career progression.',
      icon: Award
    },
    {
      title: 'Inter-Directorate Cadre Unity',
      desc: 'Fostering seamless fraternal bonding across PWD, P.W. (Roads), Irrigation, PHED, P&RD, and Municipal wings.',
      icon: HeartHandshake
    },
    {
      title: 'Professional Growth & Training',
      desc: 'Conducting PSC Preparatory training, technical viva workshops, and departmental exam seminars.',
      icon: Compass
    },
    {
      title: 'Social Responsibility',
      desc: 'Extending technological and humanitarian aid to underprivileged communities and disaster relief across Bengal.',
      icon: Shield
    }
  ];

  return (
    <div className="space-y-16 pb-20">
      {/* Header Banner */}
      <section className="relative bg-gradient-to-br from-brand-950 via-brand-900 to-slate-950 text-white py-16 lg:py-24 overflow-hidden border-b-4 border-amber-500">
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="max-w-[100rem] mx-auto px-4 sm:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-8 justify-between">
            <div className="space-y-4 text-center lg:text-left max-w-3xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-400/30 text-xs font-bold text-amber-400 uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Established 1971 • Reg. No. S0005492</span>
              </div>
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-tight">
                About <span className="text-amber-400">SDEA WB</span>
              </h1>
              <p className="text-slate-300 text-base sm:text-lg lg:text-xl font-light leading-relaxed">
                The apex representative organization of Sub-Assistant Engineers, Assistant Engineers, and Architects across the Government of West Bengal. Over 50 years of relentless struggle for <strong>Pay, Prestige & Promotion</strong>.
              </p>
            </div>

            <div className="bg-white/5 backdrop-blur-md p-6 rounded-2xl border border-white/10 text-xs text-slate-300 space-y-3 max-w-sm shrink-0">
              <div className="text-amber-400 font-bold uppercase tracking-wider text-[11px]">Core Organizational Motto</div>
              <p className="font-serif italic text-base text-white leading-relaxed">
                “Justice, Liberty, Equality, Fraternity • Pay, Prestige & Promotion”
              </p>
              <div className="pt-2 border-t border-white/10 flex items-center justify-between text-[11px] text-slate-400">
                <span>10,000+ Members</span>
                <span>•</span>
                <span>23 District Units</span>
                <span>•</span>
                <span>6+ Cadres</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="max-w-[100rem] mx-auto px-4 sm:px-8 -mt-10 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-brand-50 text-brand-900 flex items-center justify-center mb-4 border border-brand-100">
              <Landmark className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Democratic & Independent</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Founded on strict constitutional principles, free from external political interference. Driven entirely by state engineering technocrats elected democratically.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-amber-50 text-amber-800 flex items-center justify-center mb-4 border border-amber-200">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">Uniting All Engineering Cadres</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              From Sub-Assistant Engineers (SAE) to Assistant Engineers (AE) and Executive Engineers (EE), uniting professionals across PWD, Irrigation, PHED, and Municipalities.
            </p>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-lg border border-slate-200">
            <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-800 flex items-center justify-center mb-4 border border-blue-200">
              <Shield className="w-6 h-6" />
            </div>
            <h3 className="font-bold text-slate-900 text-lg mb-2">National AIFODE Affiliation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Affiliated with the All India Federation of Diploma Engineers (A.I.F.O.D.E.) since 1973, representing West Bengal on the national technocrat stage.
            </p>
          </div>
        </div>
      </section>

      {/* Main Narrative: Interactive Milestone Timeline */}
      <section className="max-w-[100rem] mx-auto px-4 sm:px-8 space-y-12">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 text-amber-600 font-bold uppercase tracking-wider text-xs mb-2">
            <History className="w-4 h-4" />
            <span>Chronological Heritage</span>
          </div>
          <h2 className="text-2xl sm:text-4xl font-black text-brand-950 font-serif">
            Why & How SDEA WB Was Formed
          </h2>
          <p className="text-slate-600 text-sm sm:text-base mt-2">
            The extraordinary journey of West Bengal’s diploma engineers—from the 1967 pay movement to the apex technocrat society of today.
          </p>
        </div>

        {/* Timeline Cards */}
        <div className="space-y-8 relative before:absolute before:inset-0 before:left-4 sm:before:left-8 before:w-0.5 before:bg-slate-200">
          {milestones.map((item, index) => (
            <div key={index} className="relative flex items-start gap-4 sm:gap-8 group">
              {/* Timeline Pin */}
              <div className="w-8 h-8 sm:w-16 sm:h-16 rounded-full bg-brand-900 text-amber-400 font-black text-xs sm:text-sm flex items-center justify-center shrink-0 shadow-md border-4 border-white z-10 group-hover:scale-110 group-hover:bg-amber-500 group-hover:text-brand-950 transition">
                {item.year.includes('–') ? 'ERA' : item.year}
              </div>

              {/* Content Card */}
              <div className={`flex-1 bg-white rounded-2xl p-6 sm:p-8 border-l-4 ${item.color} border-y border-r border-slate-200 shadow-sm hover:shadow-md transition space-y-3`}>
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full ${item.tagBg}`}>
                    {item.badge}
                  </span>
                  <span className="text-xs font-semibold text-slate-400">{item.year}</span>
                </div>

                <h3 className="text-lg sm:text-xl font-bold text-slate-900 font-serif">
                  {item.title}
                </h3>

                <p className="text-slate-700 text-xs sm:text-sm leading-relaxed text-justify">
                  {item.description}
                </p>

                {item.quote && (
                  <div className="bg-amber-50/70 border-l-4 border-amber-400 p-4 rounded-r-xl text-xs text-amber-950 italic flex items-start gap-3 mt-3">
                    <Quote className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                    <span>{item.quote}</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Objectives & Strategic Tenets */}
      <section className="bg-slate-50 py-16 border-y border-slate-200">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-8 space-y-10">
          <div className="text-center max-w-3xl mx-auto space-y-2">
            <div className="inline-flex items-center gap-2 text-brand-700 font-bold uppercase tracking-wider text-xs">
              <Target className="w-4 h-4" />
              <span>Our Guiding Principles</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black text-slate-900 font-serif">
              Constitutional Aims & Objectives
            </h2>
            <p className="text-xs sm:text-sm text-slate-600">
              The foundational pillars that guide every delegation, convention, and administrative representation of SDEA WB.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {objectives.map((obj, i) => {
              const Icon = obj.icon;
              return (
                <div key={i} className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:border-amber-400 transition space-y-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 text-amber-700 flex items-center justify-center font-bold">
                    <Icon className="w-5 h-5 text-amber-600" />
                  </div>
                  <h3 className="font-bold text-slate-900 text-base">{obj.title}</h3>
                  <p className="text-xs text-slate-600 leading-relaxed">{obj.desc}</p>
                </div>
              );
            })}

            {/* CTA Card */}
            <div className="bg-gradient-to-br from-brand-950 to-brand-900 text-white p-6 rounded-2xl shadow-md flex flex-col justify-between space-y-4">
              <div>
                <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest">Join the Movement</span>
                <h3 className="text-lg font-bold text-white mt-1">Strengthen SDEA WB Today</h3>
                <p className="text-xs text-slate-300 mt-2 leading-relaxed">
                  Join over 10,000 fellow state technocrats to safeguard cadre rights, pay parity, and career growth.
                </p>
              </div>
              <div className="flex flex-wrap gap-2 pt-2">
                <Link 
                  href="/membership"
                  className="bg-amber-500 hover:bg-amber-600 text-brand-950 font-bold text-xs px-3.5 py-2 rounded-lg transition inline-flex items-center gap-1.5"
                >
                  <span>Apply Online</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link 
                  href="/legacy-member"
                  className="bg-white/10 hover:bg-white/20 text-white font-semibold text-xs px-3.5 py-2 rounded-lg transition"
                >
                  <span>Legacy Entry</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}