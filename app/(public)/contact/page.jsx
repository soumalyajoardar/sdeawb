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
