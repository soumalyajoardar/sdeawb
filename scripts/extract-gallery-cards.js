const cheerio = require('cheerio');
const fs = require('fs');

const html = fs.readFileSync('scrape_gallery.html', 'utf8');
const $ = cheerio.load(html);

const albums = [];

$('.news-event-card').each((i, card) => {
  const rawTitle = $(card).find('.news-event-title').text().trim();
  // decode html entities
  const title = rawTitle.replace(/&#8211;/g, '–').replace(/&#8217;/g, '’');
  const imgs = [];
  $(card).find('.news-event-media-item img').each((j, img) => {
    const src = $(img).attr('src');
    if (src && !imgs.includes(src)) {
      imgs.push(src);
    }
  });

  if (title && imgs.length > 0) {
    albums.push({
      title,
      images: imgs
    });
  }
});

console.log('Extracted news-event-card albums count:', albums.length);
albums.forEach((alb, i) => {
  console.log(`\n${i+1}. "${alb.title}" -> ${alb.images.length} images`);
  console.log('   First image:', alb.images[0]);
});

fs.writeFileSync('scripts/extracted_gallery_albums.json', JSON.stringify(albums, null, 2));
