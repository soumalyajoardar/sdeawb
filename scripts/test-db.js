const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.log('No credentials found in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function check() {
  console.log('Testing Supabase connection to:', supabaseUrl);
  const tables = ['memberships', 'messages', 'notices', 'announcements', 'office_bearers', 'gallery', 'settings'];
  for (const t of tables) {
    try {
      const { data, error } = await supabase.from(t).select('*').limit(1);
      if (error) {
        console.log(`Table '${t}':`, error.message);
      } else {
        console.log(`Table '${t}': Found! Row count >=`, data.length);
      }
    } catch (e) {
      console.log(`Table '${t}' exception:`, e.message);
    }
  }

  // Also check buckets
  try {
    const { data: buckets, error: bErr } = await supabase.storage.listBuckets();
    if (bErr) console.log('Storage buckets error:', bErr.message);
    else console.log('Storage buckets:', buckets.map(b => b.name));
  } catch (e) {
    console.log('Storage exception:', e.message);
  }
}

check();
