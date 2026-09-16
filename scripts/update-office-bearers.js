const fs = require('fs');

const pageCode = `
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
          <a href="/office-bearers" className={\`px-6 py-2.5 rounded-md text-sm font-bold transition \${!showDistricts ? 'bg-white text-brand-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}\`}>
            Central Executive Committee
          </a>
          <a href="/office-bearers?tab=districts" className={\`px-6 py-2.5 rounded-md text-sm font-bold transition \${showDistricts ? 'bg-white text-brand-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'}\`}>
            District Secretaries
          </a>
        </div>
      </div>

      <div className="flex flex-col gap-4">
        {(showDistricts ? district : cec).map((person) => (
          <div key={person.id} className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col md:flex-row md:items-center gap-4 md:gap-8 hover:shadow-md transition">
            
            <div className="flex items-center gap-4 md:w-1/3 shrink-0">
              <div className="w-12 h-12 rounded-full bg-brand-50 flex items-center justify-center shrink-0 border border-brand-100">
                <Users className="w-5 h-5 text-brand-700" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-lg">{person.name}</h3>
                <div className="text-sm font-bold text-brand-700">{person.designation}</div>
              </div>
            </div>
            
            <div className="space-y-2 md:space-y-0 md:flex md:gap-8 flex-1">
              <div className="flex items-center gap-2.5 text-sm text-slate-600 md:w-1/2">
                <Award className="w-4 h-4 shrink-0 text-slate-400" />
                <span className="leading-tight">{person.rank}, {person.department}</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-600 md:w-1/2">
                <MapPin className="w-4 h-4 shrink-0 text-slate-400" />
                <span>{person.district}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 md:w-48 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-6">
              {person.mobile && (
                <a href={\`tel:+91\${person.mobile}\`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-700 transition">
                  <Phone className="w-4 h-4 text-amber-500" />
                  +91 {person.mobile}
                </a>
              )}
              {person.email && (
                <a href={\`mailto:\${person.email}\`} className="flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-brand-700 transition truncate">
                  <Mail className="w-4 h-4 text-amber-500" />
                  {person.email}
                </a>
              )}
            </div>
            
          </div>
        ))}
        {(showDistricts ? district : cec).length === 0 && (
          <div className="text-center py-12 text-slate-500 bg-slate-50 rounded-xl border border-slate-200 border-dashed">
            No office bearers listed currently.
          </div>
        )}
      </div>
    </div>
  );
}
`;

fs.writeFileSync('app/(public)/office-bearers/page.jsx', pageCode.trim());
console.log('Office bearers updated!');
