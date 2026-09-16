const fs = require('fs');
const cheerio = require('cheerio');

const html = fs.readFileSync('scrape_about.html', 'utf8');
const $ = cheerio.load(html);

// Remove scripts, styles, nav, footer
$('script, style, nav, footer, header').remove();

// Get the text from the main elementor section
const text = $('div[data-elementor-type="wp-page"] .elementor-widget-text-editor').text();

console.log(text.trim().substring(0, 1000));
