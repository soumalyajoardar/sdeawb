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

  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 250) {
            setIsScrolled(true);
          } else if (window.scrollY < 20) {
            setIsScrolled(false);
          }
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Don't render public navbar on admin pages
  if (pathname.startsWith('/admin')) {
    return null;
  }

  return (
    <header className="w-full bg-white shadow-md sticky top-0 z-50">
      {/* Top Utility Bar */}
      <div className="bg-brand-950 text-slate-200 text-xs py-1.5 px-4 sm:px-8 border-b border-brand-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
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
            <Link 
              href="/membership" 
              className="bg-amber-500 hover:bg-amber-600 text-brand-950 font-bold px-2.5 py-0.5 rounded transition flex items-center gap-1 shadow-sm"
            >
              <UserCheck className="w-3 h-3" />
              <span>New Membership</span>
            </Link>
            <Link 
              href="/member-login" 
              className="hover:text-amber-400 transition flex items-center gap-1 font-medium"
            >
              <LogIn className="w-3 h-3" />
              <span>Member Login</span>
            </Link>
            <span className="text-slate-500">|</span>
            <Link 
              href="/admin/login" 
              className="text-slate-300 hover:text-white transition flex items-center gap-1 font-medium"
            >
              <span>Admin Portal</span>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Branding Header */}
      <div className={`bg-gradient-to-r from-brand-900 via-brand-800 to-brand-900 text-white px-4 sm:px-8 border-amber-500 overflow-hidden transition-all duration-300 ease-in-out ${isScrolled ? 'max-h-0 opacity-0 border-b-0 py-0' : 'max-h-[500px] opacity-100 border-b-4 py-3'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <Link href="/" className="flex items-center gap-3 sm:gap-4 group">
            <div className="relative w-14 h-14 sm:w-16 sm:h-16 bg-white rounded-full p-1 shadow-lg shrink-0 flex items-center justify-center border-2 border-amber-400 overflow-hidden">
              <img 
                src="/images/sdea-logo.png" 
                alt="SDEA WB Logo" 
                className="w-full h-full object-contain rounded-full"
                onError={(e) => {
                  e.target.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center font-black text-brand-900 text-xs text-center leading-tight -z-10">
                SDEA<br/>WB
              </div>
            </div>
            <div>
              <div className="text-xs sm:text-sm font-semibold tracking-wider text-amber-400 uppercase">
                Society For Development Of
              </div>
              <h1 className="text-lg sm:text-2xl font-black tracking-tight text-white group-hover:text-amber-200 transition font-serif">
                ENGINEERS’ & ARCHITECTS’ WEST BENGAL
              </h1>
              <div className="text-[11px] sm:text-xs text-slate-300 font-light hidden sm:block">
                (State Diploma Engineers’ Association, West Bengal | Founded 1971)
              </div>
            </div>
          </Link>

          {/* Slogan Banner */}
          <div className="hidden lg:block text-right">
            <div className="inline-block bg-brand-950/60 backdrop-blur px-3 py-1.5 rounded-lg border border-brand-700/50 text-right">
              <div className="text-amber-400 font-bold text-xs">JUSTICE • LIBERTY • EQUALITY • FRATERNITY</div>
              <div className="text-slate-300 text-[11px]">Pay, Prestige & Promotion for Technocrats</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <nav className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-8 flex justify-between items-center">
          {/* Mobile Menu Button - Moved Here */}
          <div className="md:hidden py-2 flex items-center gap-2 text-brand-900 font-bold w-full justify-between">
            <span className="flex items-center gap-2">
              <img src="/images/sdea-logo.png" className="w-8 h-8 rounded-full border border-amber-500" />
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

            <Link 
              href="/office-bearers" 
              className={`px-3 py-2 rounded-md transition ${isCurrent('/office-bearers') ? 'text-brand-700 bg-brand-50 font-bold border-b-2 border-brand-700' : 'hover:text-brand-700 hover:bg-slate-100'}`}
            >
              Office Bearers
            </Link>

            <Link 
              href="/charter-of-demand" 
              className={`px-3 py-2 rounded-md transition ${isCurrent('/charter-of-demand') ? 'text-brand-700 bg-brand-50 font-bold border-b-2 border-brand-700' : 'hover:text-brand-700 hover:bg-slate-100'}`}
            >
              Charter of Demands
            </Link>

            <Link 
              href="/notices" 
              className={`px-3 py-2 rounded-md transition ${isCurrent('/notices') ? 'text-brand-700 bg-brand-50 font-bold border-b-2 border-brand-700' : 'hover:text-brand-700 hover:bg-slate-100'}`}
            >
              Notices & Circulars
            </Link>

            <Link 
              href="/gallery" 
              className={`px-3 py-2 rounded-md transition ${isCurrent('/gallery') ? 'text-brand-700 bg-brand-50 font-bold border-b-2 border-brand-700' : 'hover:text-brand-700 hover:bg-slate-100'}`}
            >
              Gallery
            </Link>

            <Link 
              href="/membership" 
              className={`px-3 py-2 rounded-md transition ${isCurrent('/membership') ? 'text-brand-700 bg-brand-50 font-bold border-b-2 border-brand-700' : 'hover:text-brand-700 hover:bg-slate-100'}`}
            >
              Membership
            </Link>

            <Link 
              href="/contact" 
              className={`px-3 py-2 rounded-md transition ${isCurrent('/contact') ? 'text-brand-700 bg-brand-50 font-bold border-b-2 border-brand-700' : 'hover:text-brand-700 hover:bg-slate-100'}`}
            >
              Contact Us
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
            <Link 
              href="/office-bearers" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded hover:bg-brand-100 hover:text-brand-900"
            >
              Office Bearers (CEC & 23 Districts)
            </Link>
            <Link 
              href="/charter-of-demand" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded hover:bg-brand-100 hover:text-brand-900"
            >
              Charter of Demands (6 Pillars)
            </Link>
            <Link 
              href="/notices" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded hover:bg-brand-100 hover:text-brand-900"
            >
              Notices & Circulars Hub
            </Link>
            <Link 
              href="/gallery" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded hover:bg-brand-100 hover:text-brand-900"
            >
              Media & Event Gallery
            </Link>
            <Link 
              href="/membership" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded bg-amber-100 text-amber-900 font-bold"
            >
              Online Membership Application
            </Link>
            <Link 
              href="/contact" 
              onClick={() => setMobileMenuOpen(false)}
              className="block px-3 py-2 rounded hover:bg-brand-100 hover:text-brand-900"
            >
              Contact Us & Grievance Desk
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
