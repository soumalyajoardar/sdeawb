export default function ComingSoonPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center p-8 text-center">
      <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mb-6 shadow-sm">
        <svg className="w-10 h-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      <h1 className="text-3xl md:text-5xl font-black text-brand-950 mb-4">Coming Soon</h1>
      <p className="text-slate-600 max-w-lg mx-auto text-lg">
        We are currently working on this section. Please check back later for updates.
      </p>
    </div>
  );
}
