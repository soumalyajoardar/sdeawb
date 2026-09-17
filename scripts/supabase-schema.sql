-- ================================================================
-- SDEA WB (Society for Development of Engineers & Architects WB)
-- Supabase PostgreSQL Database Schema
-- Run this in your Supabase SQL Editor (Dashboard > SQL Editor)
-- ================================================================

-- 1. Settings Table
CREATE TABLE IF NOT EXISTS public.settings (
  id TEXT PRIMARY KEY DEFAULT 'site-settings',
  organization_name TEXT DEFAULT 'Society for Development of Engineers'' & Architects'' West Bengal',
  short_name TEXT DEFAULT 'SDEA WB',
  reg_no TEXT DEFAULT 'S0005492',
  established TEXT DEFAULT '1971',
  motto TEXT DEFAULT 'Justice, Liberty, Equality, Fraternity | Pay, Prestige & Promotion',
  address TEXT DEFAULT 'Office Of The Superintending Engineer, State Highway Planning Circle, P. W. (Roads) Directorate, Estimating Branch, Bhabani Bhawan, Alipore, Kolkata - 700 027',
  phone TEXT DEFAULT '+91 7602877919',
  alternate_phone TEXT DEFAULT '+91 9038726512',
  email TEXT DEFAULT 'sdeawb@gmail.com',
  alternate_email TEXT DEFAULT 'sdeawb@yahoo.co.in',
  website TEXT DEFAULT 'https://sdeawb.org',
  facebook TEXT DEFAULT 'https://facebook.com/sdeawb',
  youtube TEXT DEFAULT 'https://youtube.com/@sdeawb',
  admin_username TEXT DEFAULT 'sdea_admin',
  admin_password TEXT DEFAULT 'sdea@2026',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Announcements / Ticker Table
CREATE TABLE IF NOT EXISTS public.announcements (
  id TEXT PRIMARY KEY,
  text TEXT NOT NULL,
  link TEXT DEFAULT '/notices',
  urgent BOOLEAN DEFAULT FALSE,
  active BOOLEAN DEFAULT TRUE,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Notices & Circulars Table
CREATE TABLE IF NOT EXISTS public.notices (
  id TEXT PRIMARY KEY,
  notice_no TEXT,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'General Circular',
  date DATE DEFAULT CURRENT_DATE,
  pinned BOOLEAN DEFAULT FALSE,
  department TEXT DEFAULT 'All Departments',
  description TEXT,
  pdf_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Office Bearers Table
CREATE TABLE IF NOT EXISTS public.office_bearers (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL, -- 'cec' or 'district'
  district TEXT NOT NULL,
  designation TEXT NOT NULL,
  name TEXT NOT NULL,
  department TEXT,
  rank TEXT,
  mobile TEXT,
  email TEXT,
  image TEXT,
  sort_order INTEGER DEFAULT 1,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. Media & Gallery Table
CREATE TABLE IF NOT EXISTS public.gallery (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  category TEXT DEFAULT 'CEC Meetings',
  src TEXT,
  type TEXT DEFAULT 'image', -- 'image' or 'video'
  youtube_id TEXT,
  date DATE DEFAULT CURRENT_DATE,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. Membership Applications Table
CREATE TABLE IF NOT EXISTS public.memberships (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  father_name TEXT,
  dob DATE,
  blood_group TEXT,
  qualification TEXT,
  designation TEXT,
  department TEXT,
  posting_office TEXT,
  district TEXT,
  date_of_joining DATE,
  mobile TEXT NOT NULL,
  email TEXT NOT NULL,
  residential_address TEXT,
  aadhaar_number TEXT,
  pan_number TEXT,
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected'
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  notes TEXT
);

-- 7. Contact Messages & Grievances Table
CREATE TABLE IF NOT EXISTS public.messages (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT NOT NULL,
  department TEXT,
  message TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'unread' -- 'unread', 'read'
);

-- Row Level Security (RLS) policies: Allow public read, secure writes
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.notices ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.office_bearers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.memberships ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

-- Allow public read access to active content
CREATE POLICY "Public Read Settings" ON public.settings FOR SELECT USING (true);
CREATE POLICY "Public Read Announcements" ON public.announcements FOR SELECT USING (true);
CREATE POLICY "Public Read Notices" ON public.notices FOR SELECT USING (true);
CREATE POLICY "Public Read Office Bearers" ON public.office_bearers FOR SELECT USING (true);
CREATE POLICY "Public Read Gallery" ON public.gallery FOR SELECT USING (true);

-- Allow public submit to memberships and messages
CREATE POLICY "Public Submit Membership" ON public.memberships FOR INSERT WITH CHECK (true);
CREATE POLICY "Public Submit Message" ON public.messages FOR INSERT WITH CHECK (true);

-- Service role has full access to everything by default
