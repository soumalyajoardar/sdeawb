'use client';

import { useState } from 'react';
import { FileText, Download, Calendar, Pin, Search, Filter } from 'lucide-react';

export default function NoticesClient({ notices = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const categories = [
    'all',
    'Meeting Notice',
    'Govt Memorandum',
    'Examination',
    'Welfare',
    'Cadre Restructuring'
  ];

  const filtered = notices.filter(n => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      n.title?.toLowerCase().includes(q) ||
      n.noticeNo?.toLowerCase().includes(q) ||
      n.department?.toLowerCase().includes(q) ||
      n.description?.toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (selectedCategory !== 'all') {
      return n.category === selectedCategory;
    }
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Search & Filters */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition capitalize ${
                selectedCategory === cat
                  ? 'bg-brand-950 text-amber-400 shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Circulars' : cat}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72 shrink-0">
          <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            placeholder="Search circulars, ref, dept..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-amber-500 bg-white"
          />
        </div>
      </div>

      {/* Notices List */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
        {filtered.map((notice) => (
          <div key={notice.id} className="p-6 sm:p-8 hover:bg-slate-50/80 transition flex flex-col sm:flex-row gap-6">
            <div className="shrink-0 sm:w-48 flex flex-col gap-2">
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-500">
                <Calendar className="w-3.5 h-3.5 text-amber-500" />
                {notice.date}
              </span>
              <span className="inline-block px-2.5 py-1 rounded-lg bg-brand-50 text-brand-800 text-xs font-bold w-max border border-brand-100">
                {notice.category}
              </span>
              {notice.pinned && (
                <span className="inline-flex items-center gap-1 text-[11px] font-bold text-amber-700 bg-amber-100/70 px-2.5 py-0.5 rounded-md w-max">
                  <Pin className="w-3 h-3" /> Pinned Official
                </span>
              )}
            </div>
            
            <div className="flex-1 space-y-2">
              <h3 className="text-lg font-bold text-slate-900 leading-snug">
                {notice.title}
              </h3>
              <p className="text-slate-600 text-xs sm:text-sm leading-relaxed">
                {notice.description}
              </p>
              <div className="flex flex-wrap items-center gap-3 text-xs font-medium text-slate-500 pt-1">
                <span>Ref: <strong className="text-slate-700">{notice.noticeNo}</strong></span>
                <span>•</span>
                <span>Dept: <strong className="text-slate-700">{notice.department}</strong></span>
              </div>
            </div>
            
            <div className="shrink-0 flex items-center sm:items-start pt-2 sm:pt-0">
              <a 
                href={notice.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-brand-900 hover:bg-brand-800 text-white text-xs sm:text-sm font-bold px-4 py-2.5 rounded-xl transition shadow-sm"
              >
                <Download className="w-4 h-4 text-amber-400" />
                <span>Download PDF</span>
              </a>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 text-slate-500">
            <FileText className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold">No notices found matching your query.</p>
          </div>
        )}
      </div>
    </div>
  );
}
