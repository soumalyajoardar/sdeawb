import Link from 'next/link';
import { 
  Shield, Award, History, Landmark, CheckCircle, Target, 
  ArrowRight, Users, Compass, BookOpen 
} from 'lucide-react';

export const metadata = {
  title: "About SDEA WB | History, Constitution & Vision",
  description: "Learn about the heritage of the Society for Development of Engineers’ & Architects’ West Bengal, established in 1971."
};

export default function AboutPage() {
  return (
    <div className="space-y-12 pb-16">
      {/* Banner */}
      <section className="bg-gradient-to-r from-brand-950 via-brand-900 to-slate-900 text-white py-14 border-b-4 border-amber-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="max-w-3xl space-y-3">
            <span className="text-amber-400 font-bold text-xs uppercase tracking-widest flex items-center gap-2">
              <Landmark className="w-4 h-4" />
              <span>Heritage & Foundation</span>
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-serif">
              About SDEA WB
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Serving the technocrat fraternity since 1971. Founded on the bedrock principles of Justice, Liberty, Equality, and Fraternity for all state engineers and architects.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 space-y-12">
        {/* Registration & Basic Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-brand-700 font-bold text-xs uppercase mb-1">Government Registration</div>
            <div className="text-2xl font-black text-slate-900">Reg. No: S0005492</div>
            <p className="text-xs text-slate-500 mt-2">
              Registered under the West Bengal Societies Registration Act XXVI of 1961.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-brand-700 font-bold text-xs uppercase mb-1">Foundational Year</div>
            <div className="text-2xl font-black text-slate-900">December 1971</div>
            <p className="text-xs text-slate-500 mt-2">
              Over 50 years of uninterrupted democratic technocrat representation across Bengal.
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
            <div className="text-brand-700 font-bold text-xs uppercase mb-1">Affiliation & Network</div>
            <div className="text-2xl font-black text-slate-900">All India & State</div>
            <p className="text-xs text-slate-500 mt-2">
              Apex non-political association affiliated with All India Federation of Diploma Engineers (AIFODE).
            </p>
          </div>
        </div>

        {/* Historical Narrative */}
        <section className="bg-white rounded-2xl p-8 sm:p-10 border border-slate-200 shadow-sm space-y-6">
          <div className="flex items-center gap-3 border-b border-slate-200 pb-4">
            <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center font-bold">
              <History className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                The Historical Movement & Genesis
              </h2>
              <div className="text-xs text-slate-500">From 1970 Fighting Committee to Present Day SDEA WB</div>
            </div>
          </div>

          <div className="prose prose-slate max-w-none text-slate-700 space-y-4 text-sm sm:text-base leading-relaxed">
            <p>
              Following the publication of the Report of the Hon&apos;ble Pay Commission in the late 1960s, Sub-Assistant Engineers (S.A.E.) across West Bengal felt deeply aggrieved by the denial of their rightful pay, promotion avenues, and professional status. A widespread democratic agitation was ignited in different corners of the state.
            </p>
            
            <p>
              In 1970, when vocal leaders standing up for the cadre were subjected to retaliatory measures, dedicated technocrats resolved that an independent, uncompromising body must be created. They formed the <strong>&quot;West Bengal Sub-Assistant Engineers Fighting Committee&quot;</strong>. Large numbers of engineers rallied under this banner.
            </p>

            <div className="bg-brand-50 border-l-4 border-brand-700 p-4 rounded-r-lg my-6">
              <h3 className="font-bold text-brand-900 text-base mb-1">The Historic Kalighat Convention (December 1971)</h3>
              <p className="text-xs sm:text-sm text-brand-800">
                In December 1971, a historic convention of engineers was convened at Kalighat, Kolkata. From this convention, the <strong>West Bengal Sub-Assistant Engineers’ Association (W.B.S.A.E.A)</strong> was born, solemnly adopting the sacred motto: <em>JUSTICE, LIBERTY, EQUALITY AND FRATERNITY</em> as well as <em>Pay, Prestige & Promotion</em> for the engineering cadre.
              </p>
            </div>

            <p>
              In 1973, the Association obtained affiliation with <strong>A.I.F.O.D.E. (All India Federation of Diploma Engineers)</strong>, the premier national organization free from political overlook. Inspired by federal leaders such as Er. S. P. Mohanty and Er. P. B. Karmakar, the <strong>State Federation of Associations of Diploma Engineers, West Bengal (SFADE WB)</strong> was established in 1974.
            </p>

            <p>
              By 1980, as senior members earned promotions to the rank of Assistant Engineer (A.E.), the organization resolved at its 1981 Annual Conference to rename itself as <strong>&quot;STATE DIPLOMA ENGINEERS’ ASSOCIATION, WEST BENGAL&quot; (SDEA WB)</strong>, ensuring lifelong solidarity across both junior and senior cadre ranks.
            </p>

            <div className="bg-amber-50 border-l-4 border-amber-600 p-4 rounded-r-lg my-6">
              <h3 className="font-bold text-amber-950 text-base mb-1">Mahajati Sadan Resolution & Expanded Nomenclature (2017)</h3>
              <p className="text-xs sm:text-sm text-amber-900">
                In the historic Annual General Meeting held at <strong>Mahajati Sadan, Kolkata</strong> in December 2017, the general body unanimously voted to adopt the expanded nomenclature: <strong>&quot;Society for Development of Engineers’ & Architects’ West Bengal&quot;</strong>, preserving the cherished acronym <strong>SDEA WB</strong> while welcoming architects and technocrats across all engineering sectors.
              </p>
            </div>
          </div>
        </section>

        {/* Core Aims and Objectives */}
        <section className="space-y-6">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
              Our Core Aims & Objects
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-1">
              Guiding every resolution, deputation, and democratic initiative undertaken by SDEA WB.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 bg-brand-100 text-brand-800 rounded-lg flex items-center justify-center font-bold">
                <Shield className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Cadre Protection & Rights</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Protecting service conditions, recruitment rules, promotion avenues, and fair seniority for engineers across all government wings.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 bg-amber-100 text-amber-800 rounded-lg flex items-center justify-center font-bold">
                <Award className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Professional Parity & NPA</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Demanding statutory professional status for state technocrats and 20% Non-Practicing Allowance (NPA) at par with medical officers.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 bg-cyan-100 text-cyan-800 rounded-lg flex items-center justify-center font-bold">
                <Compass className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Technical Excellence</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Conducting engineering symposiums, quality audits, technical training, and modern design seminars to elevate state public works.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 bg-emerald-100 text-emerald-800 rounded-lg flex items-center justify-center font-bold">
                <Users className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Mutual Benevolent Aid</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Administering benevolent emergency grants, medical aid schemes, and legal defense assistance for member engineers and families.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 bg-indigo-100 text-indigo-800 rounded-lg flex items-center justify-center font-bold">
                <BookOpen className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Career Advancement</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Enabling PSC examination eligibility from day one of service and fighting for 8-year promotional eligibility to Assistant Engineer.
              </p>
            </div>

            <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-3">
              <div className="w-10 h-10 bg-rose-100 text-rose-800 rounded-lg flex items-center justify-center font-bold">
                <Target className="w-5 h-5" />
              </div>
              <h3 className="font-bold text-slate-900 text-base">Statewide Solidarity</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Maintaining active, democratic, and responsive district committees in all 23 districts from the Himalayas in Darjeeling to the Sundarbans.
              </p>
            </div>
          </div>
        </section>

        {/* CTA */}
        <div className="bg-brand-900 text-white rounded-2xl p-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold font-serif mb-1">Meet the Leadership Team</h3>
            <p className="text-xs sm:text-sm text-slate-300">Explore Central Executive Committee and District Secretaries representing your region.</p>
          </div>
          <Link 
            href="/office-bearers" 
            className="bg-amber-500 hover:bg-amber-600 text-brand-950 font-bold px-6 py-3 rounded-lg text-sm transition shrink-0"
          >
            View Office Bearers
          </Link>
        </div>
      </div>
    </div>
  );
}
