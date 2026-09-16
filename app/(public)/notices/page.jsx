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
                  <span>&bull;</span>
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
