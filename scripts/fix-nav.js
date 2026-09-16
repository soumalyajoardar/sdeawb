const fs = require('fs');
let content = fs.readFileSync('components/Navbar.jsx', 'utf8');

// The erroneous block looks like:
//       </div>
//
//       
//         </div>
//       </div>
//
//       {/* Main Navigation Bar */}

content = content.replace(/<\/div>\r?\n\r?\n\s+<\/div>\r?\n\s+<\/div>\r?\n\r?\n\s+\{\/\* Main Navigation Bar \*\/\}/g, '</div>\n\n      {/* Main Navigation Bar */}');

fs.writeFileSync('components/Navbar.jsx', content);
