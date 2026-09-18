import http from 'http';

function request(options, data) {
  return new Promise((resolve, reject) => {
    const req = http.request(options, (res) => {
      let body = '';
      res.on('data', chunk => body += chunk);
      res.on('end', () => resolve({ status: res.statusCode, headers: res.headers, body }));
    });
    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
}

async function runTests() {
  console.log('--- RUNNING SYSTEM VERIFICATION TESTS ---');

  // 1. Check Homepage for removal of "Active 2026-27"
  const homeRes = await request({ host: 'localhost', port: 3000, path: '/', method: 'GET' });
  const hasActiveBadge = homeRes.body.includes('Active 2026-27');
  console.log(`Test 1: Homepage status = ${homeRes.status}, 'Active 2026-27' removed: ${!hasActiveBadge ? 'PASS' : 'FAIL'}`);

  // 2. Check About Page
  const aboutRes = await request({ host: 'localhost', port: 3000, path: '/about', method: 'GET' });
  const hasTimeline = aboutRes.body.includes('Genesis & Historical Struggle') || aboutRes.body.includes('K. G. Bose');
  console.log(`Test 2: About SDEA page status = ${aboutRes.status}, Enhanced milestone content: ${hasTimeline ? 'PASS' : 'FAIL'}`);

  // 3. Check Gallery API
  const galleryRes = await request({ host: 'localhost', port: 3000, path: '/api/gallery', method: 'GET' });
  const galleryItems = JSON.parse(galleryRes.body);
  const categories = new Set(galleryItems.map(i => i.category));
  const hasTechnical = categories.has('Technical Sessions');
  const hasBiennial = categories.has('Biennial Conferences');
  const hasEngineersDay = categories.has("Engineers' Day");
  const hasViva = categories.has('Viva & Training');
  const hasPSC = categories.has('PSC Training');
  console.log(`Test 3: Gallery API status = ${galleryRes.status}, Total items = ${galleryItems.length} (>= 50): ${galleryItems.length >= 50 ? 'PASS' : 'FAIL'}`);
  console.log(`        Categories verified (Technical: ${hasTechnical}, Biennial: ${hasBiennial}, EngineersDay: ${hasEngineersDay}, Viva: ${hasViva}, PSC: ${hasPSC})`);

  // 4. Check Legacy Members GET
  const legacyGetRes = await request({ host: 'localhost', port: 3000, path: '/api/legacy-members', method: 'GET' });
  const legacyMembers = JSON.parse(legacyGetRes.body);
  console.log(`Test 4: Legacy Members API GET status = ${legacyGetRes.status}, Count = ${legacyMembers.length}: ${legacyMembers.length > 0 ? 'PASS' : 'FAIL'}`);

  // 5. Check Public Legacy Member POST (No session required)
  const newMemberPayload = JSON.stringify({
    membershipId: '4399',
    entryYear: '2018',
    paidUpYear: '2026',
    fullName: 'Er. Test Technocrat',
    designation: 'Sub-Assistant Engineer',
    department: 'Public Works (Roads) Directorate',
    postingOffice: 'Salt Lake Testing Division',
    district: 'North 24 Parganas',
    mobile: '9876543210',
    email: 'test.technocrat@sdeawb.org',
    hrmsId: '2018999888'
  });

  const legacyPostRes = await request({
    host: 'localhost',
    port: 3000,
    path: '/api/legacy-members',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(newMemberPayload)
    }
  }, newMemberPayload);

  console.log(`Test 5: Legacy Member Public Registration POST status = ${legacyPostRes.status}: ${legacyPostRes.status === 200 ? 'PASS' : 'FAIL'}`);

  // 6. Check Public Legacy Member page
  const legacyPageRes = await request({ host: 'localhost', port: 3000, path: '/legacy-member', method: 'GET' });
  console.log(`Test 6: Public /legacy-member page status = ${legacyPageRes.status}: ${legacyPageRes.status === 200 ? 'PASS' : 'FAIL'}`);

  console.log('--- ALL VERIFICATION TESTS FINISHED ---');
}

runTests().catch(err => console.error('Verification error:', err));
