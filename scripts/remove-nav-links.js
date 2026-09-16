const fs = require('fs');

function removeLinkBlocks(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');

  // List of hrefs to remove
  const hrefsToRemove = [
    '/office-bearers',
    '/charter-of-demand',
    '/notices',
    '/gallery',
    '/membership',
    '/contact',
    '/member-login'
  ];

  // Regex to remove JSX <Link ...>...</Link> based on href
  // Needs to handle nested stuff. A simple approach is matching the <Link to </Link> if it has the href
  for (const href of hrefsToRemove) {
    // For Desktop nav: <Link \s+ href="/office-bearers" [\s\S]*?<\/Link>
    // Note: Some have ?tab=districts
    const regex = new RegExp(`<Link\\s+[^>]*href="${href}(?:\\?[^"]*)?"[^>]*>[\\s\\S]*?<\\/Link>`, 'g');
    content = content.replace(regex, '');
  }

  // Also remove the "New Membership" button from Top Utility Bar
  // It has a specific icon inside. The regex above will catch it if it's a <Link>.

  // Remove dangling `|` separators if needed
  content = content.replace(/<span className="text-slate-500">\|<\/span>\s*<Link \s*href="\/admin\/login"/g, '<Link href="/admin/login"');

  fs.writeFileSync(filePath, content);
  console.log(`Updated ${filePath}`);
}

removeLinkBlocks('components/Navbar.jsx');
removeLinkBlocks('components/Footer.jsx');
