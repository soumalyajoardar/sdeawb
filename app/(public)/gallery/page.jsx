'use client';
import { useState } from 'react';
import { ImageIcon, X, PlayCircle } from 'lucide-react';

export default function GalleryPage() {
  const images = ["https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.43.29-PM-1-1024x576.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.43.29-PM-1024x576.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.43.28-PM-2-1024x576.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.43.28-PM-1-1024x576.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.43.28-PM-1024x576.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.43.27-PM-1024x771.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.43.26-PM-1-1024x768.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.43.26-PM-1024x576.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.43.25-PM-1-1024x576.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.43.25-PM-1024x576.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.38.27-PM-1-1024x576.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.38.27-PM-1024x576.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.38.26-PM-2-1024x576.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.38.26-PM-1-1024x576.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.38.26-PM-1024x576.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.38.25-PM-3-1024x576.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.38.25-PM-2-1024x576.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.30.24-PM.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.30.25-PM.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.30.24-PM-2.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.30.24-PM-1.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.21.02-PM.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.21.01-PM.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.21.00-PM.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.20.59-PM.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.20.58-PM-1.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.20.58-PM.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.20.57-PM.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-12.20.56-PM.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-11.55.24-AM-1024x768.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-11.55.23-AM-1-1024x576.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-11.55.23-AM-1024x576.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-11.55.22-AM-3-1024x768.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-11.55.22-AM-2-576x1024.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-11.55.22-AM-768x1024.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-11.55.21-AM-2-1024x770.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-11.55.21-AM-1-1024x768.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-11.55.21-AM-1024x768.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-11.55.16-AM-1024x768.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-11.55.15-AM-1-1024x768.jpeg","https://sdeawb.org/wp-content/uploads/2026/06/WhatsApp-Image-2026-06-20-at-11.55.15-AM-1024x770.jpeg"];
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <div className="max-w-[100rem] mx-auto px-4 sm:px-8 py-12">
      <div className="mb-10 text-center sm:text-left">
        <h1 className="text-3xl sm:text-5xl font-black text-brand-950 font-serif mb-4">Media Gallery</h1>
        <p className="text-slate-600 max-w-2xl text-lg">Glimpses of our events, technical sessions, and organizational milestones.</p>
      </div>

      {/* Videos Section */}
      <div className="mb-16">
        <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
          <PlayCircle className="text-brand-600" /> Featured Videos
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
            <iframe className="w-full h-full" src="https://www.youtube.com/embed/dQw4w9WgXcQ" title="SDEA WB Technical Session" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
          </div>
          <div className="aspect-video bg-slate-100 rounded-2xl overflow-hidden border border-slate-200">
            <div className="w-full h-full flex items-center justify-center text-slate-400">
              More videos coming soon...
            </div>
          </div>
        </div>
      </div>

      <h2 className="text-2xl font-bold text-slate-900 mb-6 flex items-center gap-2">
        <ImageIcon className="text-brand-600" /> Photo Gallery
      </h2>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {images.map((src, idx) => (
          <div 
            key={idx} 
            className="group rounded-xl overflow-hidden bg-slate-100 border border-slate-200 cursor-pointer relative aspect-square"
            onClick={() => setSelectedImage(src)}
          >
            <img 
              src={src} 
              alt="Gallery Image"
              loading="lazy"
              className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
            />
            <div className="absolute inset-0 bg-brand-900/0 group-hover:bg-brand-900/20 transition duration-300"></div>
          </div>
        ))}
      </div>

      {/* Lightbox Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8" onClick={() => setSelectedImage(null)}>
          <button 
            className="absolute top-4 right-4 sm:top-8 sm:right-8 text-white/70 hover:text-white bg-black/50 hover:bg-black/80 rounded-full p-2 transition"
            onClick={(e) => {
              e.stopPropagation();
              setSelectedImage(null);
            }}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Enlarged view" 
            className="max-w-full max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}