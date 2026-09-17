const http = require('http');

function post(path, data) {
  return new Promise((resolve, reject) => {
    const payload = JSON.stringify(data);
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(payload)
      }
    }, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => resolve({ status: res.statusCode, data: body, headers: res.headers }));
    });
    req.on('error', reject);
    req.write(payload);
    req.end();
  });
}

function get(path) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      hostname: 'localhost',
      port: 3000,
      path,
      method: 'GET'
    }, res => {
      let body = '';
      res.on('data', d => body += d);
      res.on('end', () => resolve({ status: res.statusCode, data: body, headers: res.headers }));
    });
    req.on('error', reject);
    req.end();
  });
}

async function verify() {
  console.log('=== VERIFYING IMPLEMENTATION ===');

  // 1. Check Homepage
  const home = await get('/');
  console.log('1. Homepage status:', home.status);
  const hasOldBadge = home.data.includes('Apex Democratic Technocrat Body');
  console.log('   "Apex Democratic Technocrat Body" present:', hasOldBadge ? 'FAIL (still present)' : 'PASS (removed!)');

  // 2. Check Auth with sdea_admin / sdea@2026
  const auth = await post('/api/auth', { username: 'sdea_admin', password: 'sdea@2026' });
  console.log('2. Auth with sdea_admin / sdea@2026:', auth.status, auth.data);

  // 3. Check Office Bearers API
  const bearers = await get('/api/office-bearers');
  const bearerList = JSON.parse(bearers.data);
  console.log('3. Total Office Bearers:', bearerList.length);
  const withEmail = bearerList.filter(b => b.email && b.email.includes('@'));
  console.log('   Bearers with real decoded emails:', withEmail.length, 'e.g.', withEmail[0]?.name, '->', withEmail[0]?.email);

  // 4. Check Navigation Admin link target
  const navHasNewTab = home.data.includes('target="_blank"') && home.data.includes('/admin/login');
  console.log('4. Admin link has target="_blank":', navHasNewTab ? 'PASS' : 'FAIL');

  console.log('=== VERIFICATION COMPLETED ===');
}

verify().catch(console.error);
