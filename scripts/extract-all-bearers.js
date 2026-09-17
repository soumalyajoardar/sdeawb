const cheerio = require('cheerio');
const fs = require('fs');

function decodeCfEmail(encodedString) {
  if (!encodedString) return '';
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

const allRows = [];
$('table tr').each((i, row) => {
  const cells = $(row).find('td');
  if (cells.length > 0) {
    const rowData = [];
    cells.each((ci, cell) => {
      const cfEmail = $(cell).find('.__cf_email__').attr('data-cfemail');
      if (cfEmail) {
        rowData.push(decodeCfEmail(cfEmail));
      } else {
        rowData.push($(cell).text().trim().replace(/\s+/g, ' '));
      }
    });
    allRows.push(rowData);
  }
});

console.log('Total extracted rows:', allRows.length);
fs.writeFileSync('scripts/extracted_bearers.json', JSON.stringify(allRows, null, 2), 'utf8');
console.log('Saved to scripts/extracted_bearers.json');
