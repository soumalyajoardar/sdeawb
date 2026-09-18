import Link from 'next/link';
import { 
  Shield, Award, Users, FileText, CheckCircle2, ChevronRight, 
  ArrowRight, Landmark, Building2, Droplets, HardHat, Compass, 
  Download, Calendar, Bell, PlayCircle, ExternalLink, Sparkles
} from 'lucide-react';
import { getNotices, getOfficeBearers, getGallery } from '@/lib/db';

export default function HomePage() {
  const notices = getNotices().slice(0, 4);
  const allOfficeBearers = getOfficeBearers();
  const cecMembers = allOfficeBearers.filter(b => b.type === 'cec').slice(0, 3);
  const allGallery = getGallery();
  const photoItems = allGallery.filter(item => item.type !== 'video').slice(0, 8);
  const videoItems = allGallery.filter(item => item.type === 'video');

  return (
    <div className="space-y-16 pb-20">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-brand-950 via-brand-900 to-slate-950 text-white overflow-hidden py-16 lg:py-24 border-b-4 border-amber-500">
        {/* Background Decorative Elements */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none"></div>
        <div className="absolute -top-32 -right-32 w-96 h-96 bg-amber-500/15 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-brand-500/20 rounded-full blur-3xl pointer-events-none"></div>

        <div className="max-w-[100rem] mx-auto px-4 sm:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            {/* Left Col: Hero Headline & Actions */}
            <div className="lg:col-span-8 space-y-6">
              
              <div className="flex flex-col sm:flex-row items-center gap-5 sm:gap-6 mb-2">
                <div className="relative w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-white rounded-full p-2 shadow-2xl shrink-0 flex items-center justify-center border-4 border-amber-400 overflow-hidden">
                  <img 
                    src="https://bgdnjmllgeksnpoxykza.supabase.co/storage/v1/object/public/gallery/sdea-logo-1789572632418.webp" 
                    alt="SDEA WB Official Crest" 
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div className="text-center sm:text-left space-y-2">
                  <h1 className="text-2xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white font-serif">
                    Society For Development Of<br className="hidden sm:inline" />
                    <span className="text-amber-400"> ENGINEERS’ & ARCHITECTS’</span> WEST BENGAL
                  </h1>
                  <div className="text-xs sm:text-sm text-slate-300 font-medium">
                    (State Diploma Engineers’ Association, West Bengal | Founded 1971 | Reg. No. S0005492)
                  </div>
                </div>
              </div>

              <p className="text-slate-300 text-base sm:text-lg leading-relaxed max-w-3xl font-light">
                Uniting over 10,000 diploma engineers, architects, and technical officers across West Bengal. Championing <strong className="text-white font-semibold">Pay, Prestige & Promotion</strong> in PWD, Irrigation & Waterways, PHED, P&RD, Municipalities, and state engineering directorates.
              </p>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <Link 
                  href="/membership"
                  className="bg-amber-500 hover:bg-amber-600 text-brand-950 font-black px-6 py-3.5 rounded-xl shadow-lg hover:shadow-amber-500/20 transition flex items-center gap-2 text-sm sm:text-base transform active:scale-95"
                >
                  <span>Apply for Membership</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                <Link 
                  href="/notices"
                  className="bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl backdrop-blur-sm transition flex items-center gap-2 text-sm sm:text-base"
                >
                  <FileText className="w-4 h-4 text-amber-300" />
                  <span>Circulars & Notices</span>
                </Link>

                <Link 
                  href="/charter-of-demand"
                  className="text-amber-300 hover:text-white font-semibold text-sm sm:text-base flex items-center gap-1.5 px-3 py-2 transition"
                >
                  <span>Charter of Demands (20% NPA)</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* Core Constitutional Pillars */}
              <div className="pt-6 border-t border-brand-800/80 grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold text-slate-300">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>JUSTICE</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>LIBERTY</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>EQUALITY</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
                  <span>FRATERNITY</span>
                </div>
              </div>
            </div>

            {/* Right Col: Leadership Desk Card */}
            <div className="lg:col-span-4">
              <div className="bg-gradient-to-b from-brand-900/95 to-brand-950/95 border border-brand-700/60 rounded-2xl p-6 shadow-2xl backdrop-blur relative">
                <div className="flex items-center justify-between border-b border-brand-800 pb-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-white rounded-full p-1 border-2 border-amber-400 flex items-center justify-center overflow-hidden shrink-0">
                      <img 
                        src="https://bgdnjmllgeksnpoxykza.supabase.co/storage/v1/object/public/gallery/sdea-logo-1789572632418.webp" 
                        alt="Logo" 
                        className="w-full h-full object-contain rounded-full"
                      />
                    </div>
                    <div>
                      <div className="text-amber-400 font-bold text-xs uppercase tracking-wider">Central Executive</div>
                      <div className="text-white font-bold text-sm">Leadership Desk</div>
                    </div>
                  </div>
                </div>

                <div className="space-y-3 text-xs text-slate-300">
                  {cecMembers.map((person) => (
                    <div key={person.id} className="bg-brand-800/40 p-3 rounded-xl border border-brand-700/40 hover:border-amber-400/40 transition flex items-center gap-3">
                      {person.image ? (
                        <img 
                          src={person.image} 
                          alt={person.name} 
                          className="w-11 h-11 rounded-lg object-cover border border-amber-400/40 shrink-0" 
                        />
                      ) : null}
                      <div className="flex-1 min-w-0">
                        <div className="text-white font-bold text-sm truncate">{person.name}</div>
                        <div className="text-amber-400 font-semibold text-xs">{person.designation}</div>
                        <div className="text-slate-400 text-[11px] truncate mt-0.5">{person.department}</div>
                        {person.mobile && (
                          <div className="text-slate-400 text-[11px] mt-0.5">Mob: +91 {person.mobile}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-4 pt-3 border-t border-brand-800 text-center">
                  <Link 
                    href="/office-bearers" 
                    className="text-amber-400 hover:text-amber-300 text-xs font-bold inline-flex items-center gap-1 transition"
                  >
                    <span>View All CEC & 23 District Secretaries</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Stats Counter */}
      <section className="max-w-[100rem] mx-auto px-4 sm:px-8 -mt-10 sm:-mt-12 relative z-20">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 bg-white rounded-2xl shadow-xl p-6 sm:p-8 border border-slate-200">
          <div className="text-center p-3 border-r last:border-0 border-slate-200">
            <div className="text-3xl sm:text-4xl font-black text-brand-950 mb-1">50+</div>
            <div className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide">Years of Legacy</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Founded in 1971</div>
          </div>

          <div className="text-center p-3 sm:border-r border-slate-200">
            <div className="text-3xl sm:text-4xl font-black text-brand-950 mb-1">10,000+</div>
            <div className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide">State Technocrats</div>
            <div className="text-[11px] text-slate-500 mt-0.5">SAE, AE, EE Cadres</div>
          </div>

          <div className="text-center p-3 border-r last:border-0 border-slate-200">
            <div className="text-3xl sm:text-4xl font-black text-brand-950 mb-1">23</div>
            <div className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide">District Units</div>
            <div className="text-[11px] text-slate-500 mt-0.5">Covering all of West Bengal</div>
          </div>

          <div className="text-center p-3">
            <div className="text-3xl sm:text-4xl font-black text-brand-950 mb-1">6+</div>
            <div className="text-xs sm:text-sm font-bold text-slate-700 uppercase tracking-wide">Major Directorates</div>
            <div className="text-[11px] text-slate-500 mt-0.5">PWD, I&W, PHED, P&RD etc.</div>
          </div>
        </div>
      </section>

      {/* Main Grid: Urgent Notices & Charter of Demands */}
      <section className="max-w-[100rem] mx-auto px-4 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left 7 Cols: Notices & Circulars */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-brand-950 pb-2">
              <div className="flex items-center gap-2">
                <Bell className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl sm:text-2xl font-black text-brand-950 font-serif">
                  Latest Notices & Circulars
                </h2>
              </div>
              <Link 
                href="/notices" 
                className="text-xs sm:text-sm font-bold text-brand-700 hover:text-brand-900 flex items-center gap-1 transition"
              >
                <span>View All</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="space-y-3">
              {notices.map((notice) => (
                <div 
                  key={notice.id}
                  className="bg-white p-5 rounded-xl border border-slate-200 hover:border-brand-500 shadow-sm hover:shadow-md transition group"
                >
                  <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 mb-2">
                    <span className="font-bold text-brand-800 bg-brand-50 px-2.5 py-0.5 rounded border border-brand-100">
                      {notice.noticeNo}
                    </span>
                    <div className="flex items-center gap-2">
                      <span className="bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded text-[11px]">
                        {notice.category}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3 text-slate-400" />
                        {notice.date}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-base font-bold text-slate-900 group-hover:text-brand-700 transition mb-1 leading-snug">
                    <Link href="/notices">{notice.title}</Link>
                  </h3>

                  <p className="text-xs text-slate-600 line-clamp-2 mb-3 leading-relaxed">
                    {notice.description}
                  </p>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-100 text-xs">
                    <span className="text-slate-500 font-medium">
                      Dept: <strong className="text-slate-700">{notice.department}</strong>
                    </span>
                    <a 
                      href={notice.fileUrl} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-brand-700 hover:text-brand-900 font-bold flex items-center gap-1.5 transition"
                    >
                      <Download className="w-3.5 h-3.5" />
                      <span>Download PDF</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right 5 Cols: Charter of Demands Spotlight */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between border-b-2 border-brand-950 pb-2">
              <div className="flex items-center gap-2">
                <Award className="w-5 h-5 text-amber-500" />
                <h2 className="text-xl sm:text-2xl font-black text-brand-950 font-serif">
                  Charter of Demands
                </h2>
              </div>
              <Link 
                href="/charter-of-demand" 
                className="text-xs sm:text-sm font-bold text-brand-700 hover:text-brand-900 flex items-center gap-1 transition"
              >
                <span>Full 40 Points</span>
                <ChevronRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="bg-gradient-to-b from-brand-950 to-slate-900 text-white p-6 rounded-2xl shadow-xl space-y-4 border border-brand-800">
              <div className="text-xs text-amber-400 font-bold uppercase tracking-wider">
                Key Cadre Reform Priorities
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                The SDEA WB continues its democratic fight for rightful dignity, equitable pay scale, and promotions for technical officers across West Bengal:
              </p>

              <div className="space-y-2.5 text-xs">
                <div className="flex items-start gap-2.5 bg-brand-800/40 p-3 rounded-xl border border-brand-700/50">
                  <span className="bg-amber-500 text-brand-950 font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs">1</span>
                  <div>
                    <strong className="text-white">20% Non-Practicing Allowance (NPA)</strong>
                    <div className="text-slate-300 text-[11px]">Declare all Engineers as Professional Technocrats with NPA @ 20%.</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-brand-800/40 p-3 rounded-xl border border-brand-700/50">
                  <span className="bg-amber-500 text-brand-950 font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs">2</span>
                  <div>
                    <strong className="text-white">Need-Based Minimum Pay: Rs. 24,000/-</strong>
                    <div className="text-slate-300 text-[11px]">Fixed as per C.P.I. 1245 (Base 1982=100) w.e.f. 01.01.2016.</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-brand-800/40 p-3 rounded-xl border border-brand-700/50">
                  <span className="bg-amber-500 text-brand-950 font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs">3</span>
                  <div>
                    <strong className="text-white">50% AE Promotion Quota</strong>
                    <div className="text-slate-300 text-[11px]">50% Assistant Engineer posts filled from Junior/Sub-Assistant Engineers.</div>
                  </div>
                </div>

                <div className="flex items-start gap-2.5 bg-brand-800/40 p-3 rounded-xl border border-brand-700/50">
                  <span className="bg-amber-500 text-brand-950 font-black w-5 h-5 rounded-full flex items-center justify-center shrink-0 text-xs">4</span>
                  <div>
                    <strong className="text-white">Block Development Engineers</strong>
                    <div className="text-slate-300 text-[11px]">Create Assistant Engineer post in every Block Office designated as BDE.</div>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <Link 
                  href="/charter-of-demand" 
                  className="w-full bg-amber-500 hover:bg-amber-600 text-brand-950 font-black py-3 px-4 rounded-xl text-xs flex items-center justify-center gap-2 transition shadow-md"
                >
                  <span>Explore Complete 40-Point Demands</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Video Gallery (From sdeawb.org) */}
      <section className="max-w-[100rem] mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex items-center justify-between border-b-2 border-brand-950 pb-2">
          <div>
            <div className="text-xs font-bold text-amber-600 uppercase tracking-wider">Multimedia Stream</div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-950 font-serif flex items-center gap-2">
              <PlayCircle className="w-6 h-6 text-brand-700" />
              <span>Official Video Broadcasts</span>
            </h2>
          </div>
          <Link 
            href="/gallery" 
            className="text-xs sm:text-sm font-bold text-brand-700 hover:text-brand-900 flex items-center gap-1 transition"
          >
            <span>View All Media</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200">
            <div className="aspect-video w-full bg-black">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/GOfwU2M1qXs" 
                title="SDEA WB State Technical Convention" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-5">
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Conventions & Assemblies</span>
              <h3 className="text-base font-bold text-slate-900 mt-1">SDEA WB State Technical Convention & Leadership Address</h3>
              <p className="text-xs text-slate-500 mt-1">Proceedings of the annual meeting and discussion on engineer cadre rights.</p>
            </div>
          </div>

          <div className="bg-white rounded-2xl overflow-hidden shadow-md border border-slate-200">
            <div className="aspect-video w-full bg-black">
              <iframe 
                className="w-full h-full"
                src="https://www.youtube-nocookie.com/embed/lQVXjy6cH-0" 
                title="Technocrats Rights & Charter of Demands" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe>
            </div>
            <div className="p-5">
              <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">Agitations & Demands</span>
              <h3 className="text-base font-bold text-slate-900 mt-1">Technocrats Rights & Charter of Demands Convention</h3>
              <p className="text-xs text-slate-500 mt-1">Deliberation on 20% Non-Practicing Allowance and career progression.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Engineering Directorates Showcase */}
      <section className="bg-slate-100 py-14 border-y border-slate-200">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-8 space-y-8">
          <div className="text-center max-w-3xl mx-auto">
            <div className="text-xs font-bold text-brand-700 uppercase tracking-wider mb-1">Statewide Technocrat Wings</div>
            <h2 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif">
              Engineering Directorates Represented
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 mt-2">
              SDEA WB represents diploma engineers, architects, and technical officers serving in every key infrastructure department of the Government of West Bengal.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-blue-50 text-blue-700 rounded-xl flex items-center justify-center mb-4 border border-blue-200">
                <Building2 className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Public Works (PWD)</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Civil, Electrical, and Mechanical wings executing state government buildings, hospitals, courts, and prestigious institutional infrastructure.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-amber-50 text-amber-700 rounded-xl flex items-center justify-center mb-4 border border-amber-200">
                <Compass className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">P.W. (Roads) Directorate</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Planning, constructing, and maintaining state highways, major district roads, flyovers, and arterial corridors across all 23 districts.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-cyan-50 text-cyan-700 rounded-xl flex items-center justify-center mb-4 border border-cyan-200">
                <Droplets className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">Irrigation & Waterways</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Flood defense embankments, barrages, canal networks, drainage systems, and vital water resource engineering across North and South Bengal.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition">
              <div className="w-12 h-12 bg-emerald-50 text-emerald-700 rounded-xl flex items-center justify-center mb-4 border border-emerald-200">
                <HardHat className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-slate-900 text-base mb-1">PHED & P&RD</h3>
              <p className="text-xs text-slate-600 leading-relaxed">
                Potable rural water supply networks (JJM), rural road connectivity, sanitation, and grassroots panchayat engineering development.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Spotlight */}
      <section className="max-w-[100rem] mx-auto px-4 sm:px-8 space-y-6">
        <div className="flex items-center justify-between border-b-2 border-brand-950 pb-2">
          <div>
            <div className="text-xs font-bold text-brand-700 uppercase tracking-wider">Association Activities</div>
            <h2 className="text-xl sm:text-2xl font-black text-brand-950 font-serif">
              Moments & Photo Gallery
            </h2>
          </div>
          <Link 
            href="/gallery" 
            className="text-xs sm:text-sm font-bold text-brand-700 hover:text-brand-900 flex items-center gap-1 transition"
          >
            <span>View Full Gallery ({allGallery.length}+)</span>
            <ChevronRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {photoItems.map((item) => (
            <Link 
              key={item.id}
              href="/gallery" 
              className="group relative rounded-xl overflow-hidden shadow-sm hover:shadow-lg border border-slate-200 aspect-square bg-slate-200 block"
            >
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition p-2 flex flex-col justify-end text-white text-[10px] leading-tight">
                <span className="font-bold line-clamp-2">{item.title}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Call to Action Banner */}
      <section className="max-w-[100rem] mx-auto px-4 sm:px-8">
        <div className="bg-gradient-to-r from-brand-950 via-brand-900 to-slate-950 text-white rounded-2xl p-8 sm:p-12 shadow-2xl border-2 border-amber-500/40 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-2xl text-center md:text-left">
            <div className="inline-flex items-center gap-1.5 text-amber-400 text-xs font-bold uppercase tracking-wider">
              <Users className="w-4 h-4" />
              <span>Membership Drive 2026-2027</span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-black font-serif">
              Become an Active Member of SDEA WB
            </h2>
            <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
              Strengthen the democratic voice of engineers and architects in West Bengal. Protect your cadre interests, receive legal and mutual welfare assistance, and stay connected with technocrats across all 23 districts.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0 w-full md:w-auto">
            <Link 
              href="/membership"
              className="w-full sm:w-auto bg-amber-500 hover:bg-amber-600 text-brand-950 font-black px-6 py-3.5 rounded-xl shadow-lg transition text-center text-sm"
            >
              Fill Online Application
            </Link>
            <Link 
              href="/contact"
              className="w-full sm:w-auto bg-white/10 hover:bg-white/20 border border-white/20 text-white font-semibold px-6 py-3.5 rounded-xl transition text-center text-sm"
            >
              Contact State Headquarters
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
