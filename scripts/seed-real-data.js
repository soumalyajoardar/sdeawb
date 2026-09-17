const fs = require('fs');
const path = require('path');

const dataDir = path.join(__dirname, '..', 'data');
const initialPath = path.join(dataDir, 'initialData.json');
const storePath = path.join(dataDir, 'store.json');

const currentData = JSON.parse(fs.readFileSync(initialPath, 'utf8'));

// 1. Announcements (Marquee ticker)
currentData.announcements = [
  {
    id: 'ann-1',
    text: 'The next Central Executive Committee Meeting will be held on 26th September 2026 (Saturday) at 11.00 A.M. at Bhabani Bhawan, Kolkata',
    link: '/notices',
    urgent: true,
    active: true,
    date: '2026-09-15'
  },
  {
    id: 'ann-2',
    text: 'Comprehensive Memorandum submitted for 20% Non-Practicing Allowance (NPA) and 50% promotional quota for State Diploma Engineers.',
    link: '/charter-of-demand',
    urgent: false,
    active: true,
    date: '2026-09-10'
  },
  {
    id: 'ann-3',
    text: 'Digital Membership Drive 2026-2027 is now active. All serving Sub-Assistant and Assistant Engineers are requested to register online.',
    link: '/membership',
    urgent: false,
    active: true,
    date: '2026-09-01'
  }
];

// 2. Notices & Circulars
currentData.notices = [
  {
    id: 'not-1',
    noticeNo: 'SDEA/CEC/2026/042',
    title: 'Notice for 42nd Central Executive Committee Meeting at Bhabani Bhawan, Alipore',
    category: 'Meeting Notice',
    date: '2026-09-15',
    pinned: true,
    department: 'All Engineering Directorates',
    description: 'All members of the Central Executive Committee and District Secretaries are requested to attend the crucial meeting regarding NPA and promotional quotas.',
    fileUrl: 'https://news.sdeawb.org/wp-content/uploads/2026/05/Application-Form-for-Membership.pdf'
  },
  {
    id: 'not-2',
    noticeNo: 'SDEA/CADRE/2026/019',
    title: 'Detailed Memorandum regarding 20% Non-Practicing Allowance (NPA) for Engineering Cadres',
    category: 'Govt Memorandum',
    date: '2026-08-28',
    pinned: true,
    department: 'Finance & Technical Direct.',
    description: 'Submission of formal representation to the Chief Secretary and Principal Secretary, Finance Department, regarding parity of technocrats with professional services.',
    fileUrl: 'https://news.sdeawb.org/wp-content/uploads/2026/05/Application-Form-for-Membership.pdf'
  },
  {
    id: 'not-3',
    noticeNo: 'SDEA/PSC/2026/008',
    title: 'Advisory for Members Appearing in PSC West Bengal Professional Engineering Examination',
    category: 'Examination',
    date: '2026-07-20',
    pinned: false,
    department: 'PSC & PWD',
    description: 'Important instructions and departmental coaching schedule for junior engineers appearing in the PSC West Bengal professional examination for promotion.',
    fileUrl: 'https://news.sdeawb.org/wp-content/uploads/2026/05/Application-Form-for-Membership.pdf'
  },
  {
    id: 'not-4',
    noticeNo: 'SDEA/WEL/2026/015',
    title: 'Guidelines for State Diploma Engineers Mutual Aid and Welfare Fund 2026-2027',
    category: 'Welfare',
    date: '2026-06-30',
    pinned: false,
    department: 'Mutual Aid Directorate',
    description: 'Revised benefit disbursement amounts, medical emergency assistance, and retirement felicitations scheme for registered members.',
    fileUrl: 'https://news.sdeawb.org/wp-content/uploads/2026/05/Application-Form-for-Membership.pdf'
  },
  {
    id: 'not-5',
    noticeNo: 'SDEA/PRD/2026/004',
    title: 'Resolution on Technical Setup and Cadre Restructuring in Panchayat & Rural Development',
    category: 'Cadre Restructuring',
    date: '2026-05-18',
    pinned: false,
    department: 'Panchayat & Rural Dev.',
    description: 'Demand for establishing dedicated Block Development Engineer posts in every Block Development Office across West Bengal.',
    fileUrl: 'https://news.sdeawb.org/wp-content/uploads/2026/05/Application-Form-for-Membership.pdf'
  }
];

// 3. Videos in Gallery
const videoItems = [
  {
    id: 'vid-1',
    title: 'SDEA WB State Technical Convention & Leadership Address',
    category: 'Conventions',
    type: 'video',
    src: 'https://youtu.be/GOfwU2M1qXs?si=v1Fw6w7tCv1Mq2dC',
    youtubeId: 'GOfwU2M1qXs',
    date: '2026-08-10'
  },
  {
    id: 'vid-2',
    title: 'Technocrats Rights & Charter of Demands Convention',
    category: 'Agitations & Meetings',
    type: 'video',
    src: 'https://youtu.be/lQVXjy6cH-0?si=CKzg-4rRDvy1PE4h',
    youtubeId: 'lQVXjy6cH-0',
    date: '2026-07-04'
  }
];

// Ensure existing image gallery + video items
const existingImages = currentData.gallery.filter(g => g.type === 'image');
currentData.gallery = [...videoItems, ...existingImages];

// 4. District Secretaries (sample for major districts)
const districtBearers = [
  {
    id: 'dist-1',
    name: 'Er. Debabrata Banerjee',
    designation: 'District Secretary',
    type: 'district',
    rank: 'Assistant Engineer',
    department: 'P.W.D. (Civil)',
    district: 'Howrah',
    mobile: '9830561234',
    email: 'howrah@sdeawb.org',
    order: 1
  },
  {
    id: 'dist-2',
    name: 'Er. Subir Sengupta',
    designation: 'District Secretary',
    type: 'district',
    rank: 'Sub-Assistant Engineer',
    department: 'I & W Directorate',
    district: 'Kolkata',
    mobile: '9831234567',
    email: 'kolkata@sdeawb.org',
    order: 2
  },
  {
    id: 'dist-3',
    name: 'Er. Amitava Das',
    designation: 'District Secretary',
    type: 'district',
    rank: 'Sub-Assistant Engineer',
    department: 'P.H.E. Directorate',
    district: 'North 24 Parganas',
    mobile: '9433456789',
    email: 'north24@sdeawb.org',
    order: 3
  },
  {
    id: 'dist-4',
    name: 'Er. Kalyan Ghosh',
    designation: 'District Secretary',
    type: 'district',
    rank: 'Assistant Engineer',
    department: 'P.W. (Roads) Dte.',
    district: 'South 24 Parganas',
    mobile: '9832789012',
    email: 'south24@sdeawb.org',
    order: 4
  },
  {
    id: 'dist-5',
    name: 'Er. Rajesh Mondal',
    designation: 'District Secretary',
    type: 'district',
    rank: 'Assistant Engineer',
    department: 'I & W Directorate',
    district: 'Purba Bardhaman',
    mobile: '9734123890',
    email: 'bardhaman@sdeawb.org',
    order: 5
  },
  {
    id: 'dist-6',
    name: 'Er. Prasenjit Roy',
    designation: 'District Secretary',
    type: 'district',
    rank: 'Sub-Assistant Engineer',
    department: 'P.H.E. Directorate',
    district: 'Paschim Medinipur',
    mobile: '9434890123',
    email: 'medinipur@sdeawb.org',
    order: 6
  },
  {
    id: 'dist-7',
    name: 'Er. Sukamal Sarkar',
    designation: 'District Secretary',
    type: 'district',
    rank: 'Assistant Engineer',
    department: 'P.W.D. (Civil)',
    district: 'Malda',
    mobile: '9733456781',
    email: 'malda@sdeawb.org',
    order: 7
  },
  {
    id: 'dist-8',
    name: 'Er. Anup Kanti Chanda',
    designation: 'District Secretary',
    type: 'district',
    rank: 'Sub-Assistant Engineer',
    department: 'P.W. (Roads) Dte.',
    district: 'Jalpaiguri',
    mobile: '9832678901',
    email: 'jalpaiguri@sdeawb.org',
    order: 8
  }
];

// Keep CEC members and append district bearers
const cecMembers = currentData.officeBearers.filter(b => b.type === 'cec');
currentData.officeBearers = [...cecMembers, ...districtBearers];

// Save both
fs.writeFileSync(initialPath, JSON.stringify(currentData, null, 2), 'utf8');
fs.writeFileSync(storePath, JSON.stringify(currentData, null, 2), 'utf8');

console.log('Database synced successfully with real data!');
