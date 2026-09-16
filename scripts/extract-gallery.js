const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('scrape_gallery.html', 'utf8');
const $ = cheerio.load(html);

const images = [];
$('img').each((i, el) => {
  const src = $(el).attr('src');
  if (src && !src.includes('logo') && !src.includes('avatar') && !images.includes(src)) {
    images.push(src);
  }
});

const videos = [];
$('iframe').each((i, el) => {
  const src = $(el).attr('src');
  if (src && src.includes('youtube') && !videos.includes(src)) {
    videos.push(src);
  }
});

console.log('Images:', images);
console.log('Videos:', videos);
