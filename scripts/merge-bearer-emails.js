const fs = require('fs');
const path = require('path');

const initialPath = path.join(__dirname, '..', 'data', 'initialData.json');
const storePath = path.join(__dirname, '..', 'data', 'store.json');
const extractedPath = path.join(__dirname, 'extracted_bearers.json');

const initialData = JSON.parse(fs.readFileSync(initialPath, 'utf8'));
const extractedRows = JSON.parse(fs.readFileSync(extractedPath, 'utf8'));

// Build lookup map from extracted rows: name -> { email, phone, designation, dept }
const lookup = {};
for (const row of extractedRows) {
  // row format: [index, designation, name, department, contact]
  if (row.length >= 4) {
    const desig = row[1]?.trim();
    const name = row[2]?.trim();
    const dept = row[3]?.trim();
    const contact = row[4]?.trim() || '';

    if (name) {
      const isEmail = contact.includes('@');
      const isPhone = /^[0-9+ -]{8,}$/.test(contact);

      lookup[name.toLowerCase()] = {
        name,
        designation: desig,
        department: dept,
        email: isEmail ? contact : '',
        phone: isPhone ? contact : ''
      };
    }
  }
}

// Update initialData officeBearers
initialData.officeBearers = (initialData.officeBearers || []).map(b => {
  const normName = b.name?.toLowerCase().trim();
  const found = lookup[normName];
  
  return {
    ...b,
    image: b.image || '',
    email: found?.email || b.email || '',
    mobile: b.mobile || found?.phone || ''
  };
});

// Update admin credentials
initialData.settings.adminPassword = 'sdea@2026';
initialData.settings.adminUsername = 'sdea_admin';

// Save
fs.writeFileSync(initialPath, JSON.stringify(initialData, null, 2), 'utf8');
fs.writeFileSync(storePath, JSON.stringify(initialData, null, 2), 'utf8');

console.log('Updated office bearers with emails and initialized image fields!');
console.log('Sample bearer:', JSON.stringify(initialData.officeBearers[0], null, 2));
