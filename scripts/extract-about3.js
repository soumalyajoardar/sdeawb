const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('scrape_about.html', 'utf8');
const $ = cheerio.load(html);
$('script, style, nav, footer, header').remove();
const contentBlocks = [];
$('.elementor-widget-text-editor').each((i, el) => {
  contentBlocks.push($(el).text().trim().replace(/\s+/g, ' '));
});
console.log(contentBlocks.join('\n\n'));
