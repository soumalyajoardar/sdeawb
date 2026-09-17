'use client';

import { useState } from 'react';
import { Mail, Phone, Users, MapPin, Award, Search, Filter } from 'lucide-react';

export default function OfficeBearersClient({ bearers = [] }) {
  const [activeTab, setActiveTab] = useState('cec');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('all');

  const cec = bearers.filter(b => b.type === 'cec');
  const district = bearers.filter(b => b.type === 'district');

  const activeList = activeTab === 'cec' ? cec : district;

  const districtsList = Array.from(new Set(district.map(d => d.district).filter(Boolean)));

  const filtered = activeList.filter(person => {
    const q = searchQuery.toLowerCase();
    const matchesSearch = 
      person.name?.toLowerCase().includes(q) ||
      person.designation?.toLowerCase().includes(q) ||
      person.department?.toLowerCase().includes(q) ||
      person.district?.toLowerCase().includes(q);

    if (!matchesSearch) return false;
    if (activeTab === 'district' && selectedDistrict !== 'all') {
      return person.district === selectedDistrict;
    }
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Controls Bar */}
      <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-sm border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Tab Buttons */}
        <div className="flex bg-slate-100 p-1.5 rounded-xl w-full md:w-auto">
          <button
            onClick={() => { setActiveTab('cec'); setSelectedDistrict('all'); }}
            className={`flex-1 md:flex-initial px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition ${
              activeTab === 'cec' 
                ? 'bg-brand-950 text-amber-400 shadow-md' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            Central Executive Committee ({cec.length})
          </button>
          <button
            onClick={() => setActiveTab('district')}
            className={`flex-1 md:flex-initial px-5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition ${
              activeTab === 'district' 
                ? 'bg-brand-950 text-amber-400 shadow-md' 
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            District Secretaries ({district.length})
          </button>
        </div>

        {/* Search & District Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto">
          {activeTab === 'district' && districtsList.length > 0 && (
            <select
              value={selectedDistrict}
              onChange={(e) => setSelectedDistrict(e.target.value)}
              className="w-full sm:w-auto border border-slate-300 rounded-xl px-3 py-2 text-xs sm:text-sm font-semibold outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            >
              <option value="all">All Districts ({districtsList.length})</option>
              {districtsList.map((dist) => (
                <option key={dist} value={dist}>{dist}</option>
              ))}
            </select>
          )}

          <div className="relative w-full sm:w-64">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3 pointer-events-none" />
            <input
              type="text"
              placeholder="Search by name, post, dept..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-4 py-2 border border-slate-300 rounded-xl text-xs sm:text-sm outline-none focus:ring-2 focus:ring-amber-500 bg-white"
            />
          </div>
        </div>
      </div>

      {/* Office Bearers Vertical List */}
      <div className="flex flex-col gap-3.5">
        {filtered.map((person) => (
          <div 
            key={person.id} 
            className="bg-white rounded-xl shadow-sm border border-slate-200 p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-amber-400/80 hover:shadow-md transition group"
          >
            {/* Identity */}
            <div className="flex items-center gap-4 md:w-1/3 shrink-0">
              <div className="w-14 h-14 rounded-xl bg-brand-50 flex items-center justify-center shrink-0 border border-brand-100 group-hover:border-amber-400 transition overflow-hidden shadow-sm">
                {person.image ? (
                  <img src={person.image} alt={person.name} className="w-full h-full object-cover" />
                ) : (
                  <Users className="w-6 h-6 text-brand-700 group-hover:text-brand-950 transition" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-slate-900 text-base group-hover:text-brand-700 transition">
                  {person.name}
                </h3>
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[11px] font-bold bg-amber-100 text-amber-900 mt-0.5">
                  {person.designation}
                </span>
              </div>
            </div>

            {/* Cadre & District Details */}
            <div className="space-y-1.5 md:space-y-0 md:flex md:gap-8 flex-1 text-xs text-slate-600">
              <div className="flex items-center gap-2 md:w-1/2">
                <Award className="w-4 h-4 text-slate-400 shrink-0" />
                <span className="font-medium text-slate-800">{person.department || 'State Engineering Directorate'}</span>
              </div>
              <div className="flex items-center gap-2 md:w-1/2">
                <MapPin className="w-4 h-4 text-slate-400 shrink-0" />
                <span>{person.district || 'West Bengal (HQ)'}</span>
              </div>
            </div>

            {/* Contact Actions */}
            <div className="flex flex-row md:flex-col gap-3 md:gap-1.5 md:w-52 shrink-0 border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-6 text-xs">
              {person.mobile ? (
                <a 
                  href={`tel:+91${person.mobile}`} 
                  className="flex items-center gap-2 text-slate-700 hover:text-brand-700 font-semibold transition"
                >
                  <Phone className="w-3.5 h-3.5 text-amber-500" />
                  <span>+91 {person.mobile}</span>
                </a>
              ) : (
                <span className="text-slate-400 text-[11px]">Phone on file with HQ</span>
              )}
              {person.email ? (
                <a 
                  href={`mailto:${person.email}`} 
                  className="flex items-center gap-2 text-slate-700 hover:text-brand-700 font-medium transition truncate"
                >
                  <Mail className="w-3.5 h-3.5 text-amber-500" />
                  <span className="truncate">{person.email}</span>
                </a>
              ) : null}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500">
            <Users className="w-10 h-10 text-slate-300 mx-auto mb-2" />
            <p className="text-sm font-semibold">No office bearers found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
}
