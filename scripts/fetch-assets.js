const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, 'public');
const imgDir = path.join(publicDir, 'images');
const galleryDir = path.join(imgDir, 'gallery');

if (!fs.existsSync(publicDir)) fs.mkdirSync(publicDir, { recursive: true });
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
if (!fs.existsSync(galleryDir)) fs.mkdirSync(galleryDir, { recursive: true });

async function downloadFile(url, dest) {
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buffer = await res.arrayBuffer();
    fs.writeFileSync(dest, Buffer.from(buffer));
    console.log(`Saved: ${dest}`);
  } catch (err) {
    console.error(`Failed to download ${url}:`, err.message);
  }
}

async function main() {
  // Logo
  await downloadFile(
    'https://sdeawb.org/wp-content/uploads/2026/05/Reg.No-S0005492.png',
    path.join(imgDir, 'sdea-logo.png')
  );

  // Gallery items from sdeawb.org
  const sampleImgs = [1, 2, 3, 4, 5, 6, 7, 8, 10, 12, 15, 18];
  for (const num of sampleImgs) {
    await downloadFile(
      `https://sdeawb.org/wp-content/uploads/2026/05/${num}.png`,
      path.join(galleryDir, `${num}.png`)
    );
  }
  console.log('All asset downloads complete.');
}

main();
