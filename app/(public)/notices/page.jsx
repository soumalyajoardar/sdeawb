import { getNotices } from '@/lib/db';
import NoticesClient from './NoticesClient';

export const metadata = {
  title: 'Notices & Circulars | SDEA WB',
  description: 'Official circulars, meeting notices, government memorandums, and orders issued by SDEA WB and state engineering departments.'
};

export default function NoticesPage() {
  const notices = getNotices().sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-8 py-12 space-y-10">
      <div className="text-center sm:text-left border-b border-slate-200 pb-6">
        <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Official Circulars</div>
        <h1 className="text-3xl sm:text-5xl font-black text-brand-950 font-serif mb-3">Notices & Memorandums</h1>
        <p className="text-slate-600 max-w-2xl text-base sm:text-lg">
          Stay informed with the latest official announcements, government gazettes, and departmental circulars.
        </p>
      </div>

      <NoticesClient notices={notices} />
    </div>
  );
}
