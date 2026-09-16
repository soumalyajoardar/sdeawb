const fs = require('fs');
const path = require('path');
const fetch = require('node-fetch');
const cheerio = require('cheerio');

const BASE_URL = 'https://sdeawb.org/';
const PUBLIC_DIR = path.join(__dirname, '..', 'public', 'images', 'scraped');

if (!fs.existsSync(PUBLIC_DIR)) {
  fs.mkdirSync(PUBLIC_DIR, { recursive: true });
}

async function downloadImage(url, filename) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP error ${res.status}`);
    const buffer = await res.buffer();
    fs.writeFileSync(path.join(PUBLIC_DIR, filename), buffer);
    console.log(`Downloaded: ${filename}`);
  } catch (e) {
    console.error(`Failed to download ${url}: ${e.message}`);
  }
}

async function scrape() {
  console.log('Fetching', BASE_URL);
  const res = await fetch(BASE_URL);
  const html = await res.text();
  const $ = cheerio.load(html);
  
  const images = [];
  $('img').each((i, el) => {
    let src = $(el).attr('src') || $(el).attr('data-src');
    if (src) {
      if (src.startsWith('//')) src = 'https:' + src;
      else if (src.startsWith('/')) src = BASE_URL.replace(/\/$/, '') + src;
      images.push(src);
    }
  });

  const uniqueImages = [...new Set(images)].filter(src => src.match(/\.(jpg|jpeg|png|gif|webp)/i));
  
  console.log(`Found ${uniqueImages.length} images. Downloading...`);
  
  for (let i = 0; i < uniqueImages.length; i++) {
    const imgUrl = uniqueImages[i];
    const urlObj = new URL(imgUrl);
    let filename = path.basename(urlObj.pathname);
    // basic sanitize
    filename = filename.replace(/[^a-zA-Z0-9.\-_]/g, '_');
    if (!filename) filename = `img_${i}.png`;
    
    await downloadImage(imgUrl, filename);
  }
  
  console.log('Done downloading images.');
}

scrape();
