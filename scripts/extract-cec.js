const fs = require('fs');
const cheerio = require('cheerio');
const html = fs.readFileSync('scrape_cec.html', 'utf8');
const $ = cheerio.load(html);

// Find tables
const rows = [];
$('table tr').each((i, el) => {
  const cols = $(el).find('td').map((j, td) => $(td).text().trim()).get();
  if (cols.length > 0) rows.push(cols);
});

console.log(JSON.stringify(rows, null, 2));
