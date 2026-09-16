const fs = require('fs');

const rawData = [
  [
    "1",
    "President",
    "Er. Sanjoy Kumar Maity",
    "E.E.P. W. (Roads) Dte.",
    "[email protected]9038726512"
  ],
  [
    "2",
    "Sr. Vice President",
    "Er. Soumen Joardar",
    "A.E.I & W. Dte.",
    "[email protected]9732501213"
  ],
  [
    "3",
    "Vice President",
    "Er. Manoj Saha",
    "A.E.I & W. Dte.",
    "[email protected]9734177972"
  ],
  [
    "1",
    "Patron",
    "Er. Gour Pal Chaudhury",
    "Retired J.E.P.W. (Roads) Dte.",
    "9830908075"
  ],
  [
    "2",
    "Patron",
    "Er. Sukesh Mukherjee",
    "Retired J.E.P.W.D. (Electl.)",
    "9474037291"
  ],
  [
    "3",
    "Patron",
    "Er. Dilip Kumar Gupta",
    "Retired J.E.P.W. (Roads) Dte.",
    "9477854176"
  ],
  [
    "4",
    "Patron",
    "Er. Sushanta Kumar Das",
    "Retired E.E.P.W.D. (Electl.)",
    "9830530328"
  ],
  [
    "1",
    "Advisor",
    "Er. Shibaji Nandi",
    "Retired A.E.P.W.D. (Electl.)",
    "[email protected]7044834829"
  ],
  [
    "2",
    "Advisor",
    "Er. Jyotirmoy Bhattacharjee",
    "Retired J.E.P.W. (Roads) Dte.",
    "[email protected]9051108827"
  ],
  [
    "3",
    "Advisor",
    "Er. Gobinda Ch. Manna",
    "Retired A.E.P.W.D. (Electl.)",
    "9007895363"
  ],
  [
    "4",
    "Advisor",
    "Er. Purna Chandra Das",
    "Retired E.E.P.W. (Roads) Dte.",
    "[email protected]9674803233"
  ],
  [
    "5",
    "Advisor",
    "Er. Jagannath Halder",
    "Retired A.E.P.W.D. (Electl.)",
    "[email protected]9830170988"
  ],
  [
    "1",
    "General Secretary",
    "Er. Subrata Kumar Mondal",
    "A.E.P.H.E. Dte.",
    "[email protected]9474714742"
  ],
  [
    "2",
    "Addl. General Secretary",
    "Er. Aloke Sardar",
    "A.E.P & R. Dte.",
    "[email protected]6290053841"
  ],
  [
    "3",
    "Addl. General Secretary",
    "Er. Susanta Saha",
    "A.E., P.H.E. Dte.",
    "[email protected]9474653307"
  ],
  [
    "4",
    "Organisation Secretary",
    "Er. Akhil Ch. Barman",
    "A.E.P.W. (Roads) Dte.",
    "[email protected]9733206473"
  ],
  [
    "5",
    "Organisation Secretary",
    "Er. Bijay Chand Mandi",
    "A.E.P.H.E. Dte.",
    "[email protected]7076180575"
  ],
  [
    "6",
    "Organisation Secretary",
    "Er. Arun Khanra",
    "J.E.P.H.E. Dte.",
    "[email protected]8250514303"
  ],
  [
    "7",
    "Organisation Secretary",
    "Er. Anjan Chakraborty",
    "J.E.P.H.E. Dte.",
    "[email protected]9932448764"
  ],
  [
    "8",
    "Office / IT Secretary",
    "Er. Kanchan Saha",
    "Sr. I. O.Electricity Duty",
    "[email protected]9433324402"
  ],
  [
    "9",
    "Accounts Secretary",
    "Er. Koushik Mitra",
    "A.E.P.W.D. (Electl.)",
    "[email protected]9434166711"
  ],
  [
    "10",
    "Finance Secretary",
    "Er. Prasenjit Das",
    "J.E.P.H.E. Dte.",
    "[email protected]9775578564"
  ],
  [
    "11",
    "Education & Training Secretary",
    "Er. Pronoy Roy Choudhury",
    "E.E.P.H.E. Dte.",
    "[email protected]9432205137"
  ],
  [
    "12",
    "C.E.C. Member",
    "Er. Ramkrisna Dash",
    "J.E.I & W. Dte.",
    "[email protected]9851785994"
  ]
];

const officeBearers = rawData.map((row, index) => {
  const contact = row[4].replace('[email protected]', '');
  
  // Extract designation, handle multi-line/departments
  const name = row[2];
  const designation = row[1];
  const departmentStr = row[3];
  
  return {
    id: 'cec-' + (index + 1),
    name: name,
    designation: designation,
    type: 'cec',
    rank: 'Engineer',
    department: departmentStr,
    district: 'West Bengal (HQ)',
    mobile: contact.length >= 10 ? contact : '',
    email: '',
    order: index + 1
  };
});

const initialDataPath = 'data/initialData.json';
let initialData = JSON.parse(fs.readFileSync(initialDataPath, 'utf8'));
initialData.officeBearers = officeBearers;
// Removing dummy notices and announcements to fulfill "remove any dummy texts/notices/etc"
initialData.notices = [];
initialData.announcements = [];

fs.writeFileSync(initialDataPath, JSON.stringify(initialData, null, 2));
fs.writeFileSync('data/store.json', JSON.stringify(initialData, null, 2));

console.log("Updated data successfully");
