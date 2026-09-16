import { getOfficeBearers } from '@/lib/db';
import { Mail, Phone, Users, MapPin, Award } from 'lucide-react';

export default function OfficeBearersPage({ searchParams }) {
  const bearers = getOfficeBearers().sort((a, b) => a.order - b.order);
  const cec = bearers.filter(b => b.type === 'cec');
  const district = bearers.filter(b => b.type === 'district');
  
  const showDistricts = searchParams?.tab === 'districts';

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-8 py-12">
      <div className="mb-10 flex flex-col sm:flex-row sm:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl sm:text-5xl font-black text-brand-950 font-serif mb-4">Office Bearers</h1>
          <p className="text-slate-600 max-w-2xl text-lg">The dedicated leadership of SDEA WB driving the mission forward.</p>
        </div>
        
        <div className="flex bg-slate-100 p-1 rounded-lg w-max shrink-0">
          <a href="/office-bearers" className={`px-6 py-2.5 rounded-md text-sm font-bold transition ${!showDistricts ? 'bg-white text-brand-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
            Central Executive Committee
          </a>
          <a href="/office-bearers?tab=districts" className={`px-6 py-2.5 rounded-md text-sm font-bold transition ${showDistricts ? 'bg-white text-brand-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}>
            District Secretaries
          </a>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(showDistricts ? district : cec).map((person) => (
          <div key={person.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-14 h-14 rounded-full bg-brand-50 flex items-center justify-center shrink-0">
                <Users className="w-6 h-6 text-brand-700" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">{person.name}</h3>
                <div className="text-sm font-semibold text-brand-700">{person.designation}</div>
              </div>
            </div>
            
            <div className="space-y-3 flex-1">
              <div className="flex items-start gap-2.5 text-sm text-slate-600">
                <Award className="w-4 h-4 mt-0.5 shrink-0 text-slate-400" />
                <span className="leading-tight">{person.rank}, <br/>{person.department}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-600">
                <MapPin className="w-4 h-4 shrink-0 text-slate-400" />
                <span>{person.district}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 space-y-2">
              {person.mobile && (
                <a href={`tel:+91${person.mobile}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-brand-700 transition">
                  <Phone className="w-4 h-4 text-amber-500" />
                  +91 {person.mobile}
                </a>
              )}
              {person.email && (
                <a href={`mailto:${person.email}`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-brand-700 transition truncate">
                  <Mail className="w-4 h-4 text-amber-500" />
                  {person.email}
                </a>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
