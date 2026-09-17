'use client';

import { useState, useEffect } from 'react';
import { Image as ImageIcon, PlayCircle, Plus, Trash2, Calendar, X, UploadCloud, Video } from 'lucide-react';

export default function AdminGalleryPage() {
  const [gallery, setGallery] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);

  const [form, setForm] = useState({
    title: '',
    category: 'CEC Meetings',
    src: '',
    youtubeId: '',
    type: 'image',
    date: new Date().toISOString().split('T')[0]
  });

  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [dragActive, setDragActive] = useState(false);

  const handleFileUpload = (file) => {
    if (!file) return;
    setIsUploading(true);
    setUploadProgress(0);

    const formData = new FormData();
    formData.append('file', file);

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload', true);

    xhr.upload.onprogress = (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percent);
      }
    };

    xhr.onload = () => {
      setIsUploading(false);
      if (xhr.status === 200) {
        const response = JSON.parse(xhr.responseText);
        setForm(prev => ({ ...prev, src: response.url }));
      } else {
        alert('Upload failed.');
      }
    };

    xhr.onerror = () => {
      setIsUploading(false);
      alert('Upload error.');
    };

    xhr.send(formData);
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const categories = ['CEC Meetings', 'Conventions', 'Agitations & Meetings', 'Social Initiatives'];

  const loadGallery = async () => {
    try {
      const res = await fetch('/api/gallery');
      if (res.ok) {
        const data = await res.json();
        setGallery(data);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadGallery();
  }, []);

  const handleCreate = async (e) => {
    e.preventDefault();
    try {
      let payload = { ...form };
      if (form.type === 'video') {
        let yId = '';
        if (form.src.includes('youtu.be/')) {
          yId = form.src.split('youtu.be/')[1].split('?')[0];
        } else if (form.src.includes('watch?v=')) {
          yId = form.src.split('watch?v=')[1].split('&')[0];
        } else {
          yId = form.src.trim();
        }
        payload.youtubeId = yId;
      }

      const res = await fetch('/api/gallery', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (res.ok) {
        setShowModal(false);
        setForm({
          title: '',
          category: 'CEC Meetings',
          src: '',
          youtubeId: '',
          type: 'image',
          date: new Date().toISOString().split('T')[0]
        });
        loadGallery();
      }
    } catch (err) {
      alert('Failed to upload media: ' + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this media item?')) return;
    try {
      await fetch(`/api/gallery?id=${id}`, { method: 'DELETE' });
      loadGallery();
    } catch (err) {
      alert('Delete failed: ' + err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
        <div>
          <h1 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
            Gallery & Video Manager
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Add convention photos, historic moments, and YouTube video broadcasts.
          </p>
        </div>
        <button
          onClick={() => setShowModal(true)}
          className="bg-brand-950 hover:bg-brand-900 text-white font-bold px-4 py-2.5 rounded-xl text-xs flex items-center gap-2 transition shadow-md shrink-0"
        >
          <Plus className="w-4 h-4 text-amber-400" />
          <span>Add Photo / Video</span>
        </button>
      </div>

      {/* Gallery Grid */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-6">
        {loading ? (
          <div className="p-12 text-center text-xs text-slate-500">Loading gallery items...</div>
        ) : gallery.length === 0 ? (
          <div className="p-12 text-center text-xs text-slate-500">No media uploaded yet.</div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-6">
            {gallery.map(item => {
              const isVid = item.type === 'video';
              const yId = item.youtubeId || (item.src?.includes('youtu.be/') ? item.src.split('youtu.be/')[1]?.split('?')[0] : '');
              const thumbUrl = isVid && yId ? `https://img.youtube.com/vi/${yId}/hqdefault.jpg` : item.src;

              return (
                <div
                  key={item.id}
                  className="bg-slate-50 rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col justify-between hover:shadow-md transition"
                >
                  <div className="aspect-video bg-slate-200 relative overflow-hidden">
                    <img
                      src={thumbUrl}
                      alt={item.title}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.src = 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?w=600&auto=format&fit=crop&q=60';
                      }}
                    />
                    <span className="absolute top-2 left-2 bg-brand-950/80 text-amber-400 font-bold text-[10px] px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                    {isVid && (
                      <span className="absolute top-2 right-2 bg-red-600 text-white font-bold text-[10px] px-2 py-0.5 rounded flex items-center gap-1">
                        <PlayCircle className="w-3 h-3" /> Video
                      </span>
                    )}
                  </div>

                  <div className="p-3.5 space-y-2">
                    <h3 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug">
                      {item.title}
                    </h3>
                    <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1 border-t border-slate-200">
                      <span>{item.date}</span>
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="text-rose-600 hover:text-rose-800 p-1 font-semibold"
                        title="Delete media item"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Modal for adding photo or video */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl border border-slate-300 max-w-lg w-full p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-200 pb-3">
              <h2 className="font-bold text-base text-slate-900">Add Media to Gallery</h2>
              <button onClick={() => setShowModal(false)} className="text-slate-400 hover:text-slate-600 p-1">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleCreate} className="space-y-4 text-xs">
              {/* Type Selector */}
              <div>
                <label className="block font-bold text-slate-700 mb-1">Media Type</label>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, type: 'image', src: '' })}
                    className={`flex-1 py-2 rounded-lg font-bold border transition flex items-center justify-center gap-1.5 ${
                      form.type === 'image' ? 'bg-brand-950 text-amber-400 border-brand-950' : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    <ImageIcon className="w-4 h-4" />
                    <span>Photo</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, type: 'video', src: '' })}
                    className={`flex-1 py-2 rounded-lg font-bold border transition flex items-center justify-center gap-1.5 ${
                      form.type === 'video' ? 'bg-brand-950 text-amber-400 border-brand-950' : 'bg-slate-50 text-slate-600 border-slate-200'
                    }`}
                  >
                    <Video className="w-4 h-4" />
                    <span>YouTube Video</span>
                  </button>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 mb-1">Title / Caption *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. State Technical Convention 2026"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Category *</label>
                  <select
                    value={form.category}
                    onChange={(e) => setForm({ ...form, category: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500 bg-white"
                  >
                    {categories.map(c => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-bold text-slate-700 mb-1">Event Date</label>
                  <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                </div>
              </div>

              {/* Conditional Input: Video vs Image */}
              {form.type === 'video' ? (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">YouTube URL or Video ID *</label>
                  <input
                    type="text"
                    required
                    placeholder="https://youtu.be/GOfwU2M1qXs or GOfwU2M1qXs"
                    value={form.src}
                    onChange={(e) => setForm({ ...form, src: e.target.value })}
                    className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-amber-500"
                  />
                  <p className="text-[10px] text-slate-400 mt-1">Paste standard YouTube link or video ID.</p>
                </div>
              ) : (
                <div>
                  <label className="block font-bold text-slate-700 mb-1">Image Upload *</label>
                  <div 
                    className={`border-2 border-dashed rounded-lg p-6 flex flex-col items-center justify-center transition-colors ${dragActive ? 'border-amber-500 bg-amber-50' : 'border-slate-300 hover:border-amber-400 hover:bg-slate-50'}`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    <UploadCloud className="w-8 h-8 text-slate-400 mb-2" />
                    <p className="text-xs text-slate-600 mb-3 text-center">
                      Drag and drop image here, or
                    </p>
                    <label className="bg-white border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold px-4 py-1.5 rounded-lg cursor-pointer transition shadow-sm">
                      Browse File
                      <input 
                        type="file" 
                        className="hidden" 
                        accept="image/*"
                        onChange={(e) => {
                          if (e.target.files && e.target.files[0]) {
                            handleFileUpload(e.target.files[0]);
                          }
                        }}
                      />
                    </label>
                  </div>

                  {isUploading && (
                    <div className="mt-3">
                      <div className="flex justify-between text-[10px] text-slate-500 mb-1">
                        <span>Optimizing & Uploading to Supabase...</span>
                        <span>{uploadProgress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                        <div className="bg-amber-500 h-1.5 rounded-full transition-all duration-200" style={{ width: `${uploadProgress}%` }}></div>
                      </div>
                    </div>
                  )}

                  {form.src && !isUploading && (
                    <div className="mt-3 p-2 bg-emerald-50 border border-emerald-200 rounded flex items-center justify-between text-emerald-800 text-[11px] font-semibold">
                      <span className="truncate">Image Ready: {form.src.split('/').pop()}</span>
                    </div>
                  )}
                </div>
              )}

              <div className="pt-3 border-t border-slate-200 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 border rounded-xl text-slate-600 hover:bg-slate-50 font-semibold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-brand-950 hover:bg-brand-900 text-amber-400 font-bold px-5 py-2 rounded-xl transition shadow-md"
                >
                  Save Media Item
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
