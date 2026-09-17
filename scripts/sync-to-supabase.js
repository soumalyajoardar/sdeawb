const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const path = require('path');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey, {
  auth: { persistSession: false, autoRefreshToken: false }
});

async function syncAllToSupabase() {
  console.log('Connecting to Supabase at:', supabaseUrl);

  const storePath = path.join(__dirname, '..', 'data', 'store.json');
  if (!fs.existsSync(storePath)) {
    console.error('store.json not found!');
    process.exit(1);
  }

  const store = JSON.parse(fs.readFileSync(storePath, 'utf8'));

  const collectionsToSync = [
    { name: 'sdea_settings', data: store.settings },
    { name: 'sdea_announcements', data: store.announcements || [] },
    { name: 'sdea_notices', data: store.notices || [] },
    { name: 'sdea_office_bearers', data: store.officeBearers || [] },
    { name: 'sdea_gallery', data: store.gallery || [] },
    { name: 'sdea_memberships', data: store.memberships || [] },
    { name: 'sdea_messages', data: store.messages || [] }
  ];

  console.log('\n--- Syncing Essentials & Credentials to Supabase collections ---');

  for (const item of collectionsToSync) {
    try {
      const { data, error } = await supabase.from('collections').upsert({
        name: item.name,
        data: item.data,
        updated_at: new Date().toISOString()
      }, { onConflict: 'name' });

      if (error) {
        console.error(`Failed to sync '${item.name}':`, error.message);
      } else {
        const count = Array.isArray(item.data) ? `${item.data.length} items` : 'Object';
        console.log(`✓ Successfully synced '${item.name}' (${count})`);
      }
    } catch (err) {
      console.error(`Exception syncing '${item.name}':`, err.message);
    }
  }

  // Also verify they can be read back
  console.log('\n--- Verifying Synced Collections ---');
  for (const item of collectionsToSync) {
    const { data, error } = await supabase.from('collections').select('name, updated_at').eq('name', item.name).single();
    if (error) {
      console.error(`Verification error for '${item.name}':`, error.message);
    } else {
      console.log(`✓ Verified in Supabase: '${data.name}' (Last updated: ${data.updated_at})`);
    }
  }

  console.log('\nAll essential credentials and information successfully stored in Supabase!');
}

syncAllToSupabase().catch(console.error);
