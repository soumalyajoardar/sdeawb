const fs = require('fs');

let content = fs.readFileSync('app/(public)/page.jsx', 'utf8');

// The replacement HTML
const newHeroContent = `
              <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6 mb-2">
                <div className="relative w-24 h-24 sm:w-32 sm:h-32 bg-white rounded-full p-1.5 shadow-2xl shrink-0 flex items-center justify-center border-4 border-amber-400 overflow-hidden">
                  <img 
                    src="https://bgdnjmllgeksnpoxykza.supabase.co/storage/v1/object/public/gallery/sdea-logo-1789572632418.webp" 
                    alt="SDEA WB Logo" 
                    className="w-full h-full object-contain rounded-full"
                  />
                </div>
                <div className="text-center sm:text-left space-y-2 pt-2">
                  <div className="text-sm sm:text-base font-semibold tracking-widest text-amber-400 uppercase">
                    Society For Development Of
                  </div>
                  <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-tight text-white font-serif">
                    ENGINEERS' & ARCHITECTS' WEST BENGAL
                  </h1>
                  <div className="text-sm sm:text-base text-amber-100/80 font-medium">
                    (State Diploma Engineers' Association, West Bengal | Founded 1971)
                  </div>
                </div>
              </div>
`;

// Replace the h1 and its surrounding elements
content = content.replace(/<div className="inline-flex items-center gap-2[\s\S]*?<\/h1>/, newHeroContent);

// Also need to address "reduce the gap on both the left and right side of the whole page."
// That means replacing `max-w-7xl` with `max-w-[100rem]` globally or simply `max-w-[90rem]`.
// Let's replace `max-w-7xl` with `max-w-[95rem]` globally across the main files.
fs.writeFileSync('app/(public)/page.jsx', content);

// Also replace max-w-7xl across files
const files = [
  'app/(public)/page.jsx', 
  'components/Navbar.jsx', 
  'components/Footer.jsx',
  'app/(public)/layout.jsx'
];

for (const file of files) {
  if (fs.existsSync(file)) {
    let fContent = fs.readFileSync(file, 'utf8');
    fContent = fContent.replace(/max-w-7xl/g, 'max-w-[95rem]');
    fs.writeFileSync(file, fContent);
  }
}

console.log("Changes applied successfully");
