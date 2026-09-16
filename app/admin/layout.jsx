'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { 
  LayoutDashboard, FileText, Bell, Users, UserCheck, 
  Mail, Image as ImageIcon, Settings, LogOut, ExternalLink, 
  Menu, X, Shield, ChevronRight 
} from 'lucide-react';

export default function AdminLayout({ children }) {
  const pathname = usePathname();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // If on login page, don't show admin dashboard wrapper
  if (pathname === '/admin/login') {
    return children;
  }

  const navItems = [
    { label: 'Overview Dashboard', href: '/admin', icon: LayoutDashboard },
    { label: 'Notices & Circulars', href: '/admin/notices', icon: FileText },
    { label: 'Marquee Ticker', href: '/admin/announcements', icon: Bell },
    { label: 'Office Bearers', href: '/admin/office-bearers', icon: Users },
    { label: 'Membership Apps', href: '/admin/memberships', icon: UserCheck },
    { label: 'Messages & Grievances', href: '/admin/messages', icon: Mail },
    { label: 'Gallery Media', href: '/admin/gallery', icon: ImageIcon },
    { label: 'Site Settings', href: '/admin/settings', icon: Settings },
  ];

  const handleLogout = () => {
    localStorage.removeItem('sdea_admin_logged_in');
    document.cookie = 'sdea_admin_session=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
    router.push('/admin/login');
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col md:flex-row">
      {/* Mobile Topbar */}
      <div className="md:hidden bg-brand-950 text-white p-4 flex items-center justify-between border-b-2 border-amber-500 sticky top-0 z-40">
        <div className="flex items-center gap-2">
          <Shield className="w-5 h-5 text-amber-400" />
          <span className="font-black text-sm">SDEA WB Admin</span>
        </div>
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-1.5 rounded-lg bg-brand-800 text-slate-200"
          aria-label="Toggle menu"
        >
          {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky top-0 h-screen w-64 bg-brand-950 text-slate-300 flex flex-col justify-between border-r border-brand-900 z-50 transition-transform duration-300 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="p-5 space-y-6">
          {/* Admin Brand */}
          <div className="flex items-center gap-3 border-b border-brand-800 pb-4">
            <div className="w-10 h-10 bg-white rounded-full p-1 flex items-center justify-center border border-amber-400 shrink-0 overflow-hidden">
              <img 
                src="https://bgdnjmllgeksnpoxykza.supabase.co/storage/v1/object/public/gallery/sdea-logo-1789572632418.webp" 
                alt="Logo" 
                className="w-full h-full object-contain rounded-full"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            <div>
              <div className="text-white font-bold text-sm">SDEA WB</div>
              <div className="text-[11px] text-amber-400 font-medium">Control Center</div>
            </div>
          </div>

          {/* Navigation Items */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold transition ${
                    isActive
                      ? 'bg-amber-500 text-brand-950 font-bold shadow-md'
                      : 'hover:bg-brand-900 hover:text-white text-slate-300'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* Bottom Sidebar Action Buttons */}
        <div className="p-4 border-t border-brand-800 space-y-2">
          <Link
            href="/"
            target="_blank"
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg bg-brand-900/60 hover:bg-brand-900 text-xs font-semibold text-amber-300 transition"
          >
            <span className="flex items-center gap-2">
              <ExternalLink className="w-3.5 h-3.5" />
              <span>Public Website</span>
            </span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold text-rose-300 hover:bg-rose-950/40 hover:text-rose-200 transition"
          >
            <LogOut className="w-3.5 h-3.5" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content View */}
      <main className="flex-1 p-4 sm:p-8 max-w-[100rem] mx-auto w-full overflow-x-hidden">
        {children}
      </main>
    </div>
  );
}
