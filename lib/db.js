import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
export const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const dataDir = path.join(process.cwd(), 'data');
const storePath = path.join(dataDir, 'store.json');
const initialPath = path.join(dataDir, 'initialData.json');

function ensureStore() {
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  if (!fs.existsSync(storePath)) {
    if (fs.existsSync(initialPath)) {
      const initial = fs.readFileSync(initialPath, 'utf8');
      fs.writeFileSync(storePath, initial, 'utf8');
    } else {
      fs.writeFileSync(storePath, JSON.stringify({
        settings: {},
        announcements: [],
        notices: [],
        officeBearers: [],
        gallery: [],
        memberships: [],
        messages: []
      }, null, 2), 'utf8');
    }
  }
}

export function getDatabase() {
  ensureStore();
  try {
    const raw = fs.readFileSync(storePath, 'utf8');
    return JSON.parse(raw);
  } catch (err) {
    console.error('Error reading store.json:', err);
    return {};
  }
}

export function saveDatabase(data) {
  ensureStore();
  fs.writeFileSync(storePath, JSON.stringify(data, null, 2), 'utf8');

  if (supabase) {
    const collections = [
      { name: 'sdea_settings', data: data.settings },
      { name: 'sdea_announcements', data: data.announcements || [] },
      { name: 'sdea_notices', data: data.notices || [] },
      { name: 'sdea_office_bearers', data: data.officeBearers || [] },
      { name: 'sdea_gallery', data: data.gallery || [] },
      { name: 'sdea_memberships', data: data.memberships || [] },
      { name: 'sdea_messages', data: data.messages || [] }
    ];

    Promise.all(collections.map(c => 
      supabase.from('collections').upsert({
        name: c.name,
        data: c.data,
        updated_at: new Date().toISOString()
      }, { onConflict: 'name' })
    )).catch(err => {
      console.warn('Supabase sync warning:', err.message);
    });
  }

  return data;
}

// Announcements
export function getAnnouncements() {
  const db = getDatabase();
  return db.announcements || [];
}

export function createAnnouncement(item) {
  const db = getDatabase();
  const newAnn = {
    id: 'ann-' + Date.now(),
    text: item.text,
    link: item.link || '/notices',
    urgent: !!item.urgent,
    active: item.active !== false,
    date: item.date || new Date().toISOString().split('T')[0]
  };
  db.announcements = [newAnn, ...(db.announcements || [])];
  saveDatabase(db);
  return newAnn;
}

export function updateAnnouncement(id, updates) {
  const db = getDatabase();
  db.announcements = (db.announcements || []).map(a => 
    a.id === id ? { ...a, ...updates } : a
  );
  saveDatabase(db);
  return db.announcements.find(a => a.id === id);
}

export function deleteAnnouncement(id) {
  const db = getDatabase();
  db.announcements = (db.announcements || []).filter(a => a.id !== id);
  saveDatabase(db);
  return true;
}

// Notices
export function getNotices() {
  const db = getDatabase();
  return db.notices || [];
}

export function createNotice(item) {
  const db = getDatabase();
  const newNotice = {
    id: 'not-' + Date.now(),
    noticeNo: item.noticeNo || `SDEA/GEN/${new Date().getFullYear()}/${(db.notices?.length || 0) + 1}`,
    title: item.title,
    category: item.category || 'General Circular',
    date: item.date || new Date().toISOString().split('T')[0],
    pinned: !!item.pinned,
    department: item.department || 'All Departments',
    description: item.description || '',
    fileUrl: item.fileUrl || '#'
  };
  db.notices = [newNotice, ...(db.notices || [])];
  saveDatabase(db);
  return newNotice;
}

export function updateNotice(id, updates) {
  const db = getDatabase();
  db.notices = (db.notices || []).map(n => 
    n.id === id ? { ...n, ...updates } : n
  );
  saveDatabase(db);
  return db.notices.find(n => n.id === id);
}

export function deleteNotice(id) {
  const db = getDatabase();
  db.notices = (db.notices || []).filter(n => n.id !== id);
  saveDatabase(db);
  return true;
}

// Office Bearers
export function getOfficeBearers() {
  const db = getDatabase();
  return db.officeBearers || [];
}

export function saveOfficeBearer(item) {
  const db = getDatabase();
  let bearers = db.officeBearers || [];
  let savedItem;
  if (item.id) {
    bearers = bearers.map(b => b.id === item.id ? { ...b, ...item } : b);
    savedItem = bearers.find(b => b.id === item.id);
  } else {
    savedItem = {
      ...item,
      id: 'ob-' + Date.now(),
      image: item.image || '',
      order: item.order || bearers.length + 1
    };
    bearers.push(savedItem);
  }
  db.officeBearers = bearers;
  saveDatabase(db);
  return savedItem;
}

export function deleteOfficeBearer(id) {
  const db = getDatabase();
  db.officeBearers = (db.officeBearers || []).filter(b => b.id !== id);
  saveDatabase(db);
  return true;
}

// Memberships
export function getMemberships() {
  const db = getDatabase();
  return db.memberships || [];
}

export function createMembership(data) {
  const db = getDatabase();
  const newApp = {
    id: 'mem-' + Date.now(),
    applicantName: data.applicantName,
    designation: data.designation,
    department: data.department,
    postingOffice: data.postingOffice,
    district: data.district,
    mobile: data.mobile,
    email: data.email,
    qualification: data.qualification,
    dateOfJoining: data.dateOfJoining,
    status: 'Pending',
    appliedAt: new Date().toISOString().split('T')[0],
    notes: ''
  };
  db.memberships = [newApp, ...(db.memberships || [])];
  saveDatabase(db);
  return newApp;
}

export function updateMembership(id, status, notes = '') {
  const db = getDatabase();
  db.memberships = (db.memberships || []).map(m => 
    m.id === id ? { ...m, status, notes: notes !== undefined ? notes : m.notes } : m
  );
  saveDatabase(db);
  return db.memberships.find(m => m.id === id);
}

// Contact Messages
export function getMessages() {
  const db = getDatabase();
  return db.messages || [];
}

export function createMessage(data) {
  const db = getDatabase();
  const newMsg = {
    id: 'msg-' + Date.now(),
    name: data.name,
    email: data.email,
    phone: data.phone || '',
    category: data.category || 'General Inquiry',
    subject: data.subject,
    message: data.message,
    date: new Date().toISOString().split('T')[0],
    status: 'unread'
  };
  db.messages = [newMsg, ...(db.messages || [])];
  saveDatabase(db);
  return newMsg;
}

export function updateMessage(id, updates) {
  const db = getDatabase();
  db.messages = (db.messages || []).map(m => 
    m.id === id ? { ...m, ...updates } : m
  );
  saveDatabase(db);
  return db.messages.find(m => m.id === id);
}

export function deleteMessage(id) {
  const db = getDatabase();
  db.messages = (db.messages || []).filter(m => m.id !== id);
  saveDatabase(db);
  return true;
}

// Gallery
export function getGallery() {
  const db = getDatabase();
  return db.gallery || [];
}

export function createGalleryItem(data) {
  const db = getDatabase();
  const newItem = {
    id: 'gal-' + Date.now(),
    title: data.title,
    category: data.category || 'Conventions',
    type: data.type || 'image',
    src: data.src,
    youtubeId: data.youtubeId || '',
    date: data.date || new Date().toISOString().split('T')[0]
  };
  db.gallery = [newItem, ...(db.gallery || [])];
  saveDatabase(db);
  return newItem;
}

export function deleteGalleryItem(id) {
  const db = getDatabase();
  db.gallery = (db.gallery || []).filter(g => g.id !== id);
  saveDatabase(db);
  return true;
}

// Settings
export function getSettings() {
  const db = getDatabase();
  return db.settings || {};
}

export function updateSettings(updates) {
  const db = getDatabase();
  const cleanUpdates = { ...updates };
  if (!cleanUpdates.adminPassword || cleanUpdates.adminPassword.trim() === '') {
    delete cleanUpdates.adminPassword;
  }
  if (!cleanUpdates.adminUsername || cleanUpdates.adminUsername.trim() === '') {
    delete cleanUpdates.adminUsername;
  }
  db.settings = { ...db.settings, ...cleanUpdates };
  saveDatabase(db);
  return db.settings;
}
