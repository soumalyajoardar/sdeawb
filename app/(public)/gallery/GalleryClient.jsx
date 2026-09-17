'use client';

import { useState } from 'react';
import { ImageIcon, PlayCircle, X, ExternalLink, Calendar, Tag } from 'lucide-react';

export default function GalleryClient({ items = [] }) {
  const [activeTab, setActiveTab] = useState('all');
  const [selectedImage, setSelectedImage] = useState(null);

  const categories = [
    { id: 'all', label: 'All Media' },
    { id: 'video', label: 'Official Videos' },
    { id: 'Conventions', label: 'Conventions' },
    { id: 'CEC Meetings', label: 'CEC Meetings' },
    { id: 'Agitations & Meetings', label: 'Agitations & Demands' },
    { id: 'Social Initiatives', label: 'Social Welfare' },
  ];

  const filteredItems = items.filter((item) => {
    if (activeTab === 'all') return true;
    if (activeTab === 'video') return item.type === 'video';
    return item.category === activeTab;
  });

  const videos = filteredItems.filter(item => item.type === 'video');
  const photos = filteredItems.filter(item => item.type !== 'video');

  return (
    <div className="space-y-10">
      {/* Filter Tabs */}
      <div className="flex flex-wrap items-center gap-2 pb-2">
        {categories.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition ${
              activeTab === tab.id
                ? 'bg-brand-950 text-amber-400 shadow-md border-b-2 border-amber-400'
                : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200 hover:bg-slate-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Videos Section (if any in filtered) */}
      {videos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <PlayCircle className="w-5 h-5 text-brand-700" />
            <h2 className="text-xl font-bold text-slate-900">Official Video Broadcasts</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {videos.map((vid) => {
              const videoId = vid.youtubeId || (vid.src.includes('youtu.be/') ? vid.src.split('youtu.be/')[1]?.split('?')[0] : '');
              return (
                <div key={vid.id} className="bg-white rounded-2xl overflow-hidden shadow-sm border border-slate-200 flex flex-col">
                  <div className="aspect-video w-full bg-black">
                    <iframe
                      className="w-full h-full"
                      src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                      title={vid.title}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-5 flex-1 flex flex-col justify-between">
                    <div>
                      <span className="text-[11px] font-bold text-amber-600 uppercase tracking-wider">{vid.category}</span>
                      <h3 className="text-base font-bold text-slate-900 mt-1">{vid.title}</h3>
                    </div>
                    <div className="flex items-center justify-between mt-4 text-xs text-slate-400 pt-2 border-t border-slate-100">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        {vid.date}
                      </span>
                      <a 
                        href={vid.src} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-brand-700 font-semibold hover:underline flex items-center gap-1"
                      >
                        <span>Open on YouTube</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Photos Section */}
      {photos.length > 0 && (
        <div className="space-y-4">
          <div className="flex items-center gap-2 border-b border-slate-200 pb-2">
            <ImageIcon className="w-5 h-5 text-amber-600" />
            <h2 className="text-xl font-bold text-slate-900">Photo Gallery ({photos.length})</h2>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {photos.map((item) => (
              <div
                key={item.id}
                onClick={() => setSelectedImage(item)}
                className="group rounded-2xl overflow-hidden bg-white shadow-sm border border-slate-200 hover:shadow-lg transition cursor-pointer flex flex-col"
              >
                <div className="aspect-[4/3] bg-slate-100 relative overflow-hidden">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-500"
                  />
                  <div className="absolute inset-0 bg-brand-950/20 opacity-0 group-hover:opacity-100 transition duration-300"></div>
                </div>
                <div className="p-3.5 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] font-bold text-amber-600 uppercase tracking-wider block mb-1">
                      {item.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-800 line-clamp-2 leading-snug">
                      {item.title}
                    </h4>
                  </div>
                  <div className="text-[11px] text-slate-400 mt-2 font-medium">
                    {item.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Empty State */}
      {filteredItems.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-slate-200 text-slate-500">
          <ImageIcon className="w-10 h-10 text-slate-300 mx-auto mb-2" />
          <p className="text-sm font-semibold">No media found in this category.</p>
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-fadeIn"
          onClick={() => setSelectedImage(null)}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 text-white/80 hover:text-white bg-white/10 hover:bg-white/20 p-2.5 rounded-full transition"
            aria-label="Close image modal"
          >
            <X className="w-6 h-6" />
          </button>

          <div 
            className="max-w-4xl w-full bg-slate-900 rounded-2xl overflow-hidden shadow-2xl border border-slate-800"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="max-h-[75vh] flex items-center justify-center bg-black/50 p-2">
              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-lg"
              />
            </div>
            <div className="p-5 text-white bg-slate-900 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 border-t border-slate-800">
              <div>
                <span className="text-xs font-bold text-amber-400 uppercase tracking-wider">
                  {selectedImage.category}
                </span>
                <h3 className="text-base font-bold text-white mt-0.5">{selectedImage.title}</h3>
              </div>
              <span className="text-xs text-slate-400 font-medium shrink-0">
                Date: {selectedImage.date}
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
