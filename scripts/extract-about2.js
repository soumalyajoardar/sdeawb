const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('scrape_about.html', 'utf8');
const $ = cheerio.load(html);

// Remove scripts, styles, nav, footer
$('script, style, nav, footer, header').remove();

// Get the text from body
let text = $('body').text().replace(/\s+/g, ' ');

console.log(text.trim().substring(0, 1500));
