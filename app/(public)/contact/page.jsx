import { getSettings } from '@/lib/db';
import ContactClient from './ContactClient';

export const metadata = {
  title: 'Contact Us | SDEA WB',
  description: 'Reach the State Secretariat of the Society for Development of Engineers & Architects West Bengal at Bhabani Bhawan, Kolkata.'
};

export default function ContactPage() {
  const settings = getSettings();

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-8 py-12 space-y-10">
      <div className="border-b border-slate-200 pb-6">
        <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Get in Touch</div>
        <h1 className="text-3xl sm:text-5xl font-black text-brand-950 font-serif mb-3">Contact & Grievance Cell</h1>
        <p className="text-slate-600 max-w-2xl text-base sm:text-lg">
          Connect with the Central Executive Committee or submit representations directly to the State Headquarters.
        </p>
      </div>

      <ContactClient settings={settings} />
    </div>
  );
}
