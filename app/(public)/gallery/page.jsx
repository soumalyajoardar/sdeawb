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
