const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('scrape_about.html', 'utf8');
const $ = cheerio.load(html);
$('script, style, nav, footer, header').remove();

// Get paragraphs
const paragraphs = [];
$('p, h2, h3, h4').each((i, el) => {
  const tagName = el.tagName.toLowerCase();
  const text = $(el).text().trim().replace(/\s+/g, ' ');
  if (text.length > 10) {
    paragraphs.push({ tag: tagName, text });
  }
});
console.log(JSON.stringify(paragraphs, null, 2));
