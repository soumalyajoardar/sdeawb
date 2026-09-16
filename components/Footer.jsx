'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  Building2, Phone, Mail, MapPin, Globe, Shield, ArrowUp, 
  ExternalLink, FileText, ChevronRight, Lock
} from 'lucide-react';

export default function Footer() {
  const pathname = usePathname();

  // Hide public footer on admin views
  if (pathname.startsWith('/admin')) {
    return null;
  }

  const scrollToTop = () => {
    if (typeof window !== 'undefined') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <footer className="bg-gradient-to-b from-brand-950 to-slate-950 text-slate-300 border-t-4 border-amber-500 text-sm">
      {/* Upper Footer */}
      <div className="max-w-[100rem] mx-auto px-4 sm:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Col 1: About Organization */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-white rounded-full p-1 flex items-center justify-center border-2 border-amber-400 shrink-0 overflow-hidden">
                <img 
                  src="https://bgdnjmllgeksnpoxykza.supabase.co/storage/v1/object/public/gallery/sdea-logo-1789572632418.webp" 
                  alt="SDEA WB Logo" 
                  className="w-full h-full object-contain rounded-full"
                  onError={(e) => { e.target.style.display = 'none'; }}
                />
              </div>
              <div>
                <h3 className="text-white font-bold text-base leading-tight">SDEA WB</h3>
                <p className="text-xs text-amber-400 font-medium">Reg. No: S0005492</p>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-300 mb-4">
              <strong>Society for Development of Engineers’ & Architects’ West Bengal</strong> is the apex representative body of Sub-Assistant Engineers, Assistant Engineers, and Technocrats across all engineering wings of the Government of West Bengal. Established in 1971.
            </p>
            <div className="bg-brand-900/60 p-3 rounded-lg border border-brand-800 text-xs">
              <span className="text-amber-400 font-semibold block mb-1">Motto:</span>
              <span className="italic text-slate-200">Justice, Liberty, Equality, Fraternity • Pay, Prestige & Promotion</span>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-brand-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              Quick Navigation
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/" className="hover:text-amber-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>Home</span>
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-amber-400 transition flex items-center gap-1.5">
                  <ChevronRight className="w-3.5 h-3.5 text-amber-500" />
                  <span>History & Constitution</span>
                </Link>
              </li>
              <li>
                
              </li>
              <li>
                
              </li>
              <li>
                
              </li>
              <li>
                
              </li>
              <li>
                
              </li>
            </ul>
          </div>

          {/* Col 3: Departments Represented */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-brand-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              Directorates & Cadres
            </h4>
            <ul className="space-y-2 text-xs">
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-400 rounded-full"></span>
                <span>Public Works Department (P.W.D.)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-400 rounded-full"></span>
                <span>Public Works (Roads) Directorate</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-400 rounded-full"></span>
                <span>Irrigation & Waterways Directorate (I&W)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-400 rounded-full"></span>
                <span>Public Health Engineering Directorate (PHED)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-400 rounded-full"></span>
                <span>Panchayat & Rural Development (P&RD)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-400 rounded-full"></span>
                <span>Housing & Municipal Engineering (MED)</span>
              </li>
              <li className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 bg-brand-400 rounded-full"></span>
                <span>Sundarban Affairs & Other State Wings</span>
              </li>
            </ul>
          </div>

          {/* Col 4: Registered Office & Contacts */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-b border-brand-800 pb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-400 rounded-full"></span>
              State Headquarters
            </h4>
            <div className="space-y-3 text-xs">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Office Of The Superintending Engineer,<br />
                  State Highway Planning Circle,<br />
                  P. W. (Roads) Directorate, Estimating Branch,<br />
                  Bhabani Bhawan, Alipore, Kolkata - 700 027
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="tel:+917602877919" className="hover:text-amber-400 transition">
                  +91 7602877919 / 9038726512
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href="mailto:sdeawb@gmail.com" className="hover:text-amber-400 transition">
                  sdeawb@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-2.5">
                <Globe className="w-4 h-4 text-amber-400 shrink-0" />
                <span>www.sdeawb.org</span>
              </div>
            </div>

            <div className="mt-5 pt-3 border-t border-brand-800 flex items-center justify-between">
              
              <button 
                onClick={scrollToTop}
                className="bg-brand-800 hover:bg-brand-700 text-amber-400 p-2 rounded-full transition shadow"
                title="Scroll to Top"
                aria-label="Scroll to top"
              >
                <ArrowUp className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Legal Bar */}
      <div className="bg-black/80 py-4 px-4 sm:px-8 border-t border-brand-900 text-xs text-slate-400">
        <div className="max-w-[100rem] mx-auto flex flex-col sm:flex-row items-center justify-between gap-3">
          <div>
            © {new Date().getFullYear()} Society for Development of Engineers’ & Architects’ West Bengal (SDEA WB). All Rights Reserved.
          </div>
          <div className="flex items-center gap-4">
            <Link href="/privacy" className="hover:text-slate-200 transition">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-slate-200 transition">Terms & Bye-Laws</Link>
            <span>•</span>
            <Link href="/admin/login" className="text-amber-400 hover:text-amber-300 transition flex items-center gap-1 font-semibold">
              <Lock className="w-3 h-3" />
              <span>Admin Login</span>
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
