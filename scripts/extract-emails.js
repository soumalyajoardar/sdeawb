const cheerio = require('cheerio');
const fs = require('fs');

function decodeCfEmail(encodedString) {
  let email = '';
  const r = parseInt(encodedString.substr(0, 2), 16);
  for (let n = 2; n < encodedString.length; n += 2) {
    const charCode = parseInt(encodedString.substr(n, 2), 16) ^ r;
    email += String.fromCharCode(charCode);
  }
  return email;
}

const html = fs.readFileSync('scrape_cec.html', 'utf8');
const $ = cheerio.load(html);

const results = [];
$('table tr').each((i, row) => {
  const cells = $(row).find('td');
  if (cells.length > 0) {
    const rowData = [];
    cells.each((ci, cell) => {
      // Check if Cloudflare email protection is inside
      const cfEmail = $(cell).find('.__cf_email__').attr('data-cfemail');
      if (cfEmail) {
        rowData.push(decodeCfEmail(cfEmail));
      } else {
        rowData.push($(cell).text().trim().replace(/\s+/g, ' '));
      }
    });
    results.push(rowData);
  }
});

console.log(JSON.stringify(results.slice(0, 10), null, 2));
