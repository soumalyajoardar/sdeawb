const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("Missing Supabase credentials in .env.local");
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

async function uploadToSupabase(filePath, originalRelativePath) {
  try {
    const buffer = fs.readFileSync(filePath);
    
    // Convert to webp
    const webpBuffer = await sharp(buffer)
      .webp({ quality: 80, effort: 6 })
      .toBuffer();

    const baseName = path.basename(filePath, path.extname(filePath));
    const uniqueFileName = `${baseName}-${Date.now()}.webp`;

    console.log(`Uploading ${uniqueFileName}...`);
    
    const { data, error } = await supabase.storage
      .from('gallery')
      .upload(uniqueFileName, webpBuffer, {
        contentType: 'image/webp',
        upsert: true
      });

    if (error) {
      // Auto-create bucket if it doesn't exist
      if (error.message.includes('bucket not found')) {
        console.log("Bucket 'gallery' not found. Creating it...");
        await supabase.storage.createBucket('gallery', { public: true });
        // Retry
        const retry = await supabase.storage.from('gallery').upload(uniqueFileName, webpBuffer, { contentType: 'image/webp', upsert: true });
        if (retry.error) throw new Error(retry.error.message);
      } else {
        throw new Error(error.message);
      }
    }

    const { data: publicUrlData } = supabase.storage
      .from('gallery')
      .getPublicUrl(uniqueFileName);

    return publicUrlData.publicUrl;
  } catch (err) {
    console.error(`Failed to process ${filePath}:`, err.message);
    return null;
  }
}

async function processDirectory(dir, urlMap) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      await processDirectory(fullPath, urlMap);
    } else if (/\.(png|jpe?g|gif|webp)$/i.test(file)) {
      const relativePath = '/' + path.relative(path.join(__dirname, '../public'), fullPath).replace(/\\/g, '/');
      const publicUrl = await uploadToSupabase(fullPath, relativePath);
      if (publicUrl) {
        urlMap[relativePath] = publicUrl;
      }
    }
  }
}

async function updateJsonFiles(urlMap) {
  const filesToUpdate = ['data/initialData.json', 'data/store.json'];
  for (const file of filesToUpdate) {
    const fullPath = path.join(__dirname, '..', file);
    if (fs.existsSync(fullPath)) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      // Replace all occurrences of the local paths with Supabase URLs
      for (const [localPath, supabaseUrl] of Object.entries(urlMap)) {
        // global replace
        content = content.split(`"${localPath}"`).join(`"${supabaseUrl}"`);
      }
      
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Updated ${file}`);
    }
  }
}

async function main() {
  const urlMap = {};
  console.log("Starting image migration to Supabase...");
  
  const publicImagesDir = path.join(__dirname, '../public/images');
  await processDirectory(publicImagesDir, urlMap);
  
  console.log("\nMigration Map:", urlMap);
  console.log("\nUpdating JSON data stores...");
  await updateJsonFiles(urlMap);
  
  console.log("Done!");
}

main();
