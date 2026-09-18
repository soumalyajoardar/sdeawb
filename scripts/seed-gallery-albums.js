import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const extractedPath = path.join(process.cwd(), 'scripts', 'extracted_gallery_albums.json');
const storePath = path.join(process.cwd(), 'data', 'store.json');
const initialPath = path.join(process.cwd(), 'data', 'initialData.json');

const albums = JSON.parse(fs.readFileSync(extractedPath, 'utf8'));

// Map titles to categories
function getCategory(title) {
  if (title.toLowerCase().includes('technical session')) return 'Technical Sessions';
  if (title.toLowerCase().includes('biennial') || title.toLowerCase().includes('conference')) return 'Biennial Conferences';
  if (title.toLowerCase().includes('viva')) return 'Viva & Training';
  if (title.toLowerCase().includes('psc')) return 'PSC Training';
  if (title.toLowerCase().includes('engineers')) return "Engineers' Day";
  return 'Conventions';
}

const albumDates = {
  0: '2026-06-20',
  1: '2026-06-20',
  2: '2026-06-20',
  3: '2026-06-20',
  4: '2026-06-20'
};

const newItems = [];
albums.forEach((album, aIdx) => {
  const category = getCategory(album.title);
  const date = albumDates[aIdx] || '2026-06-20';
  
  album.images.forEach((url, iIdx) => {
    newItems.push({
      id: `gal-album-${aIdx + 1}-${iIdx + 1}`,
      title: `${album.title.trim()} (Photo ${iIdx + 1})`,
      category: category,
      type: 'image',
      src: url,
      date: date
    });
  });
});

console.log(`Prepared ${newItems.length} gallery items from 5 albums.`);

// Update store.json
const storeData = JSON.parse(fs.readFileSync(storePath, 'utf8'));
const existingUrls = new Set((storeData.gallery || []).map(g => g.src));

const itemsToAdd = newItems.filter(item => !existingUrls.has(item.src));
storeData.gallery = [...itemsToAdd, ...(storeData.gallery || [])];

fs.writeFileSync(storePath, JSON.stringify(storeData, null, 2), 'utf8');
console.log(`Updated store.json: total gallery items = ${storeData.gallery.length}`);

// Update initialData.json
if (fs.existsSync(initialPath)) {
  const initData = JSON.parse(fs.readFileSync(initialPath, 'utf8'));
  const initUrls = new Set((initData.gallery || []).map(g => g.src));
  const initToAdd = newItems.filter(item => !initUrls.has(item.src));
  initData.gallery = [...initToAdd, ...(initData.gallery || [])];
  fs.writeFileSync(initialPath, JSON.stringify(initData, null, 2), 'utf8');
  console.log(`Updated initialData.json: total gallery items = ${initData.gallery.length}`);
}

// Upsert to Supabase
if (supabase) {
  supabase.from('collections').upsert({
    name: 'sdea_gallery',
    data: storeData.gallery,
    updated_at: new Date().toISOString()
  }, { onConflict: 'name' }).then(({ data, error }) => {
    if (error) {
      console.error('Error syncing gallery to Supabase:', error.message);
    } else {
      console.log('Successfully synced sdea_gallery to Supabase!');
    }
  });
} else {
  console.log('Supabase credentials not configured in env, skipping Supabase sync.');
}
