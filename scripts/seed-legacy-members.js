import fs from 'fs';
import path from 'path';
import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = supabaseUrl && supabaseKey ? createClient(supabaseUrl, supabaseKey) : null;

const storePath = path.join(process.cwd(), 'data', 'store.json');
const initialPath = path.join(process.cwd(), 'data', 'initialData.json');

const sampleLegacyMembers = [
  {
    id: 'leg-101',
    membershipId: '1042',
    entryYear: '2012',
    paidUpYear: '2026',
    fullName: 'Er. Tarun Kumar Biswas',
    designation: 'Assistant Engineer',
    department: 'Public Works (Roads) Directorate',
    postingOffice: 'Alipore Highway Division, Bhabani Bhawan, Kolkata',
    district: 'Kolkata',
    hrmsId: '1998012345',
    gpfNo: 'PWD/CIVIL/8942',
    mobile: '9830112233',
    email: 'tarunkumar.biswas@gmail.com',
    address: '45/2 Lake Gardens, Kolkata - 700045',
    qualification: 'Diploma in Civil Engineering (APC Roy Polytechnic, 1996)',
    joiningDate: '1998-05-15',
    remarks: 'Physical Membership Book #042 verified with Central Registry.',
    status: 'Verified',
    submittedAt: '2026-09-05',
    adminNotes: 'Verified against Physical SDEA Roll 2012.'
  },
  {
    id: 'leg-102',
    membershipId: '0876',
    entryYear: '2016',
    paidUpYear: '2025',
    fullName: 'Er. Sourav Chatterjee',
    designation: 'Sub-Assistant Engineer',
    department: 'Irrigation & Waterways Directorate',
    postingOffice: 'Damodar Canal Division, Court Compound, Bardhaman',
    district: 'Purba Bardhaman',
    hrmsId: '2014056789',
    gpfNo: 'IW/CANAL/5512',
    mobile: '9734556677',
    email: 'sourav.chatterjee.wb@gmail.com',
    address: 'Vivekananda Pally, Burdwan - 713101',
    qualification: 'Diploma in Civil Engineering (MBB Inst. of Tech, 2013)',
    joiningDate: '2014-11-20',
    remarks: 'Annual subscription paid up to 2025.',
    status: 'Pending Verification',
    submittedAt: '2026-09-12',
    adminNotes: 'Pending district secretary counter-signature.'
  },
  {
    id: 'leg-103',
    membershipId: '2190',
    entryYear: '2008',
    paidUpYear: '2026',
    fullName: 'Er. Anindya Roy',
    designation: 'Executive Engineer',
    department: 'Public Health Engineering Directorate (PHED)',
    postingOffice: 'Barasat Water Supply Division, Barasat',
    district: 'North 24 Parganas',
    hrmsId: '1995087654',
    gpfNo: 'PHE/ENG/3301',
    mobile: '9433221100',
    email: 'anindya.roy.phed@wb.gov.in',
    address: '12 Pioneer Park, Barasat, Kolkata - 700124',
    qualification: 'B.E. (Civil) / Dip. Civil (North Calcutta Poly, 1994)',
    joiningDate: '1995-09-01',
    remarks: 'Life Member / Regular CEC attendee.',
    status: 'Verified',
    submittedAt: '2026-09-01',
    adminNotes: 'Confirmed by CEC IT Secretary.'
  }
];

function seed(file) {
  if (fs.existsSync(file)) {
    const data = JSON.parse(fs.readFileSync(file, 'utf8'));
    if (!data.legacyMembers || data.legacyMembers.length === 0) {
      data.legacyMembers = sampleLegacyMembers;
      fs.writeFileSync(file, JSON.stringify(data, null, 2), 'utf8');
      console.log(`Seeded legacy members to ${file}`);
    } else {
      console.log(`${file} already has ${data.legacyMembers.length} legacy members.`);
    }
  }
}

seed(storePath);
seed(initialPath);

// Sync to Supabase
if (supabase) {
  const data = JSON.parse(fs.readFileSync(storePath, 'utf8'));
  supabase.from('collections').upsert({
    name: 'sdea_legacy_members',
    data: data.legacyMembers || sampleLegacyMembers,
    updated_at: new Date().toISOString()
  }, { onConflict: 'name' }).then(({ error }) => {
    if (error) console.error('Supabase error:', error.message);
    else console.log('Successfully synced sdea_legacy_members to Supabase!');
  });
}
