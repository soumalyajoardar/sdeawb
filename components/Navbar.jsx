'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { 
  Phone, Mail, Shield, Menu, X, ChevronDown, UserCheck, 
  ExternalLink, LogIn, FileText, Landmark, Users, Award, BookOpen
} from 'lucide-react';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [bearersDropdown, setBearersDropdown] = useState(false);
  const pathname = usePathname();

  const isCurrent = (path) => pathname === path;

  

  

  // Don't render public navbar on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      {/* Top Utility Bar */}
      <div className="bg-brand-950 text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-brand-800">
        <div className="max-w-[100rem] mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-amber-400 font-semibold">
              <Shield className="w-3.5 h-3.5" />
              <span>Reg. No: S0005492 (Est. 1971)</span>
            </span>
            <span className="hidden md:inline-block text-slate-400">|</span>
            <a href="tel:+917602877919" className="flex items-center gap-1 hover:text-white transition">
              <Phone className="w-3 h-3 text-amber-400" />
              <span>+91 7602877919</span>
            </a>
            <span className="hidden md:inline-block text-slate-400">|</span>
            <a href="mailto:sdeawb@gmail.com" className="hidden sm:flex items-center gap-1 hover:text-white transition">
              <Mail className="w-3 h-3 text-amber-400" />
              <span>sdeawb@gmail.com</span>
            </a>
          </div>

          <div className="flex items-center gap-3 ml-auto">
            
            
            <Link href="/admin/login" 
              className="text-slate-300 hover:text-white transition flex items-center gap-1 font-medium"
            >
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-[100rem] mx-auto px-4 sm:px-8 flex justify-between items-center">
          {/* Mobile Menu Button - Moved Here */}
          <div className="md:hidden py-2 flex items-center gap-2 text-brand-900 font-bold w-full justify-between">
            <span className="flex items-center gap-2">
              <img src="https://bgdnjmllgeksnpoxykza.supabase.co/storage/v1/object/public/gallery/sdea-logo-1789572632418.webp" className="w-8 h-8 rounded-full border border-amber-500" />
              SDEA WB
            </span>
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-900 p-1.5 rounded-md hover:bg-slate-100 transition border border-slate-200"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          <div className="hidden md:flex items-center space-x-1 lg:space-x-2 py-1 text-sm font-semibold text-slate-700">
            <Link 
              href="/" 
              className={`px-3 py-2 rounded-md transition ${isCurrent('/') ? 'text-brand-700 bg-brand-50 font-bold border-b-2 border-brand-700' : 'hover:text-brand-700 hover:bg-slate-100'}`}
            >
              Home
            </Link>

            <Link 
              href="/about" 
              className={`px-3 py-2 rounded-md transition ${isCurrent('/about') ? 'text-brand-700 bg-brand-50 font-bold border-b-2 border-brand-700' : 'hover:text-brand-700 hover:bg-slate-100'}`}
            >
              About SDEA.WB
            </Link>

            

            

            

            

            

            
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-slate-50 border-t border-slate-200 px-4 py-3 space-y-1 text-sm font-medium text-slate-800">
            <Link 
              href="/" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded hover:bg-brand-100 hover:text-brand-900"
            >
              Home
            </Link>
            <Link 
              href="/about" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded hover:bg-brand-100 hover:text-brand-900"
            >
              About SDEA.WB (History & Constitution)
            </Link>
            
            
            
            
            
            
            <div className="pt-2 border-t border-slate-200">
              <Link 
                href="/admin/login" 
                onClick={() => setMobileMenuOpen(false)}
                className="block px-3 py-2 rounded bg-brand-900 text-white font-bold text-center mt-2"
              >
                Executive Admin Portal
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}
