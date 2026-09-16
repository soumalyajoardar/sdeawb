'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';

export default function MarqueeTicker({ initialAnnouncements = [] }) {
  const [announcements, setAnnouncements] = useState(initialAnnouncements);

  useEffect(() => {
    // Optionally re-fetch on client side to keep it fresh, but we don't need a loading state anymore
    async function loadAnnouncements() {
      try {
        const res = await fetch('/api/announcements');
        if (res.ok) {
          const data = await res.json();
          setAnnouncements(data.filter(a => a.active));
        }
      } catch (err) {
        console.error('Failed to load announcements:', err);
      }
    }
    loadAnnouncements();
  }, []);

  if (announcements.length === 0) {
    return null;
  }

  return (
    <div className="bg-amber-500 text-slate-950 text-sm font-semibold border-b border-amber-600 shadow-sm relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex items-center">

        {/* Scrolling Track with Pause on Hover */}
        <div className="relative w-full overflow-hidden whitespace-nowrap py-2 pause-hover">
          <div className="inline-block animate-marquee hover:[animation-play-state:paused] cursor-pointer pl-[100%] [animation-delay:1s] [animation-fill-mode:both]">
            {announcements.map((item, idx) => (
              <span key={item.id || idx} className="inline-flex items-center mx-6">
                {item.urgent && (
                  <span className="bg-red-700 text-white text-[10px] uppercase font-black px-2 py-0.5 rounded-full mr-2 shadow-sm animate-pulse">
                    Urgent
                  </span>
                )}
                <Link 
                  href={item.link || '/notices'} 
                  className="hover:underline text-brand-950 font-bold hover:text-white transition flex items-center gap-1 whitespace-nowrap"
                >
                  <span>{item.text}</span>
                  <ChevronRight className="w-3.5 h-3.5 inline opacity-70" />
                </Link>
                <span className="text-amber-800 mx-4">•</span>
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
