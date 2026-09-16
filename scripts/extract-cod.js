const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('scrape_cod.html', 'utf8');
const $ = cheerio.load(html);
$('script, style, nav, footer, header').remove();
const p = [];
$('li').each((i, el) => {
  const text = $(el).text().trim().replace(/\s+/g, ' ');
  if (text.length > 5 && !p.includes(text)) p.push(text);
});
console.log(JSON.stringify(p, null, 2));
