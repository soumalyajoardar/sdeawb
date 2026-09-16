const fs = require('fs');

let content = fs.readFileSync('components/Navbar.jsx', 'utf8');

// Remove useEffect block for scroll
content = content.replace(/useEffect\(\(\) => \{\s+let ticking = false;[\s\S]*?\}, \[\]\);/g, '');

// Remove Main Branding Header block
content = content.replace(/\{\/\* Main Branding Header \*\/\}\s+<div className=\{\`bg-gradient-to-r[\s\S]*?<\/div>\s+<\/div>\s+<\/div>/g, '');

fs.writeFileSync('components/Navbar.jsx', content);
