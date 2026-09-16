const fs = require('fs');
const path = require('path');

const pages = {
  'notices': `
import { getNotices } from '@/lib/db';
import { FileText, Download, Calendar, Pin } from 'lucide-react';

export default function NoticesPage() {
  const notices = getNotices().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-5xl font-black text-brand-950 font-serif mb-4">Notices & Circulars</h1>
        <p className="text-slate-600 max-w-2xl text-lg">Stay updated with the latest official announcements, government memorandums, and departmental circulars.</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        <div className="divide-y divide-slate-100">
          {notices.map((notice) => (
            <div key={notice.id} className="p-6 sm:p-8 hover:bg-slate-50 transition flex flex-col sm:flex-row gap-6">
              <div className="shrink-0 sm:w-48 flex flex-col gap-2">
                <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                  <Calendar className="w-3.5 h-3.5" />
                  {new Date(notice.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                </span>
                <span className="inline-block px-2.5 py-1 rounded bg-brand-50 text-brand-700 text-xs font-semibold w-max">
                  {notice.category}
                </span>
                {notice.pinned && (
                  <span className="inline-flex items-center gap-1 text-xs font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded w-max mt-1">
                    <Pin className="w-3 h-3" /> Pinned
                  </span>
                )}
              </div>
              
              <div className="flex-1">
                <h3 className="text-lg sm:text-xl font-bold text-slate-900 mb-2">{notice.title}</h3>
                <p className="text-slate-600 text-sm mb-4 leading-relaxed">{notice.description}</p>
                <div className="flex flex-wrap items-center gap-4 text-xs font-medium text-slate-500">
                  <span>Ref: {notice.noticeNo}</span>
                  <span>?</span>
                  <span>Dept: {notice.department}</span>
                </div>
              </div>
              
              <div className="shrink-0 flex items-center sm:items-start">
                <a href={notice.fileUrl !== '#' ? notice.fileUrl : '#'} className="flex items-center gap-2 bg-brand-50 hover:bg-brand-100 text-brand-700 font-semibold px-4 py-2.5 rounded-lg transition">
                  <Download className="w-4 h-4" />
                  <span>Download</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
  `,

  'gallery': `
import { getGallery } from '@/lib/db';
import { ImageIcon } from 'lucide-react';

export default function GalleryPage() {
  const items = getGallery().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-8 py-12">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-5xl font-black text-brand-950 font-serif mb-4">Media Gallery</h1>
        <p className="text-slate-600 max-w-2xl text-lg">Glimpses of our events, technical sessions, and organizational milestones.</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {items.map((item) => (
          <div key={item.id} className="group rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200 flex flex-col">
            <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
              <img 
                src={item.src} 
                alt={item.title} 
                className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
              />
            </div>
            <div className="p-5 flex-1 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold text-amber-500 uppercase tracking-wider mb-2 block">{item.category}</span>
                <h3 className="text-slate-900 font-bold leading-snug mb-2">{item.title}</h3>
              </div>
              <div className="text-xs text-slate-500 font-medium">
                {new Date(item.date).toLocaleDateString('en-IN', { month: 'long', year: 'numeric' })}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
  `,

  'office-bearers': `
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
                <a href={\`tel:+91\${person.mobile}\`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-brand-700 transition">
                  <Phone className="w-4 h-4 text-amber-500" />
                  +91 {person.mobile}
                </a>
              )}
              {person.email && (
                <a href={\`mailto:\${person.email}\`} className="flex items-center gap-2 text-sm text-slate-600 hover:text-brand-700 transition truncate">
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
  `,

  'charter-of-demand': `
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
  `,

  'membership': `
import { UserCheck } from 'lucide-react';

export default function MembershipPage() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-8 py-12">
      <div className="text-center mb-10">
        <div className="w-16 h-16 bg-amber-100 rounded-full flex items-center justify-center mx-auto mb-4">
          <UserCheck className="w-8 h-8 text-amber-600" />
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-brand-950 font-serif mb-4">Apply for Membership</h1>
        <p className="text-slate-600 text-lg">Join SDEA WB and strengthen our collective voice.</p>
      </div>

      <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200 text-center">
        <p className="text-slate-800 mb-6 font-medium">The digital membership application form is currently being updated for the 2026-2027 cycle.</p>
        <p className="text-slate-600 mb-8">Please contact your District Secretary for offline membership forms.</p>
        <a href="/office-bearers?tab=districts" className="bg-brand-900 hover:bg-brand-800 text-white font-bold py-3 px-8 rounded-xl transition">
          Find District Secretaries
        </a>
      </div>
    </div>
  );
}
  `,

  'contact': `
import { Mail, Phone, MapPin } from 'lucide-react';
import { getSettings } from '@/lib/db';

export default function ContactPage() {
  const settings = getSettings();
  
  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-8 py-12">
      <div className="mb-10">
        <h1 className="text-3xl sm:text-5xl font-black text-brand-950 font-serif mb-4">Contact Us</h1>
        <p className="text-slate-600 max-w-2xl text-lg">Get in touch with the State Headquarters.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Head Office</h2>
          <div className="space-y-6">
            <div className="flex items-start gap-4">
              <MapPin className="w-6 h-6 text-brand-700 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Address</h4>
                <p className="text-slate-600">{settings.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Phone className="w-6 h-6 text-brand-700 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Phone</h4>
                <p className="text-slate-600">{settings.phone}</p>
                {settings.alternatePhone && <p className="text-slate-600">{settings.alternatePhone}</p>}
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-brand-700 shrink-0 mt-1" />
              <div>
                <h4 className="font-bold text-slate-900 mb-1">Email</h4>
                <p className="text-slate-600">{settings.email}</p>
                {settings.alternateEmail && <p className="text-slate-600">{settings.alternateEmail}</p>}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-8 rounded-2xl shadow-sm border border-slate-200">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Send a Message</h2>
          <form className="space-y-4">
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Name</label>
              <input type="text" className="w-full border border-slate-300 rounded-lg p-3" placeholder="Er. John Doe" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Email</label>
              <input type="email" className="w-full border border-slate-300 rounded-lg p-3" placeholder="john@example.com" />
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Message</label>
              <textarea className="w-full border border-slate-300 rounded-lg p-3 h-32" placeholder="How can we help?"></textarea>
            </div>
            <button type="button" className="w-full bg-brand-900 hover:bg-brand-800 text-white font-bold py-3 rounded-xl transition">
              Submit Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
  `,

  'member-login': `
import { LogIn } from 'lucide-react';

export default function MemberLoginPage() {
  return (
    <div className="max-w-md mx-auto px-4 py-20 text-center">
      <div className="w-16 h-16 bg-brand-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <LogIn className="w-8 h-8 text-brand-700" />
      </div>
      <h1 className="text-3xl font-black text-slate-900 mb-4">Member Portal</h1>
      <p className="text-slate-600 mb-8">The secure member portal is undergoing planned maintenance and upgrade.</p>
      <div className="bg-amber-50 border border-amber-200 text-amber-800 p-4 rounded-lg text-sm font-medium">
        Please check back shortly. Your existing credentials will remain valid.
      </div>
    </div>
  );
}
  `
};

for (const [route, code] of Object.entries(pages)) {
  const dir = path.join(__dirname, '..', 'app', '(public)', route);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'page.jsx'), code.trim() + '\\n');
  console.log('Restored', route);
}
