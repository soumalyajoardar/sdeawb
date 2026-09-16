const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('scrape_home.html', 'utf8');
const $ = cheerio.load(html);

const links = [];
$('a').each((i, el) => {
  const href = $(el).attr('href');
  const text = $(el).text().trim();
  if (href && !href.startsWith('#') && href.length > 1) {
    links.push({ text, href });
  }
});

console.log(links);
