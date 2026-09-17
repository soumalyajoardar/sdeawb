import { getGallery } from '@/lib/db';
import GalleryClient from './GalleryClient';

export const metadata = {
  title: 'Media Gallery | SDEA WB',
  description: 'Official photos, video broadcasts, technical conventions, and historic moments of the Society for Development of Engineers & Architects West Bengal.'
};

export default function GalleryPage() {
  const items = getGallery();

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-8 py-12 space-y-10">
      <div className="text-center sm:text-left border-b border-slate-200 pb-6">
        <div className="text-xs font-bold text-amber-600 uppercase tracking-wider mb-1">Visual Archive</div>
        <h1 className="text-3xl sm:text-5xl font-black text-brand-950 font-serif mb-3">Media Gallery</h1>
        <p className="text-slate-600 max-w-2xl text-base sm:text-lg">
          Explore historic moments, technical sessions, state conventions, and official broadcasts of SDEA WB technocrats.
        </p>
      </div>

      <GalleryClient items={items} />
    </div>
  );
}