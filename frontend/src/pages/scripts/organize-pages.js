#!/usr/bin/env node

/**
 * Utility script to help organize new pages in the correct directories
 * Usage: node scripts/organize-pages.js <page-name> <type>
 * 
 * Examples:
 * node scripts/organize-pages.js UserProfile public
 * node scripts/organize-pages.js Dashboard admin
 * node scripts/organize-pages.js PasswordReset auth
 */

const fs = require('fs');
const path = require('path');

const pageName = process.argv[2];
const pageType = process.argv[3];

if (!pageName || !pageType) {
  console.error('Usage: node scripts/organize-pages.js <page-name> <type>');
  console.error('Types: public, admin, auth');
  process.exit(1);
}

const validTypes = ['public', 'admin', 'auth'];
if (!validTypes.includes(pageType)) {
  console.error(`Invalid type. Must be one of: ${validTypes.join(', ')}`);
  process.exit(1);
}

const pagesDir = path.join(__dirname, '..');
const targetDir = path.join(pagesDir, pageType);
const stylesDir = path.join(pagesDir, 'styles');

// Create directories if they don't exist
[targetDir, stylesDir].forEach(dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
});

// Generate component file
const componentContent = `import React from 'react';

const ${pageName} = () => {
  return (
    <div className="${pageName.toLowerCase()}-page">
      <h1>${pageName}</h1>
      {/* Add your content here */}
    </div>
  );
};

export default ${pageName};
`;

// Generate CSS file
const cssContent = `/* ${pageName} Page Styles */
.${pageName.toLowerCase()}-page {
  /* Add your styles here */
}
`;

// Write files
const componentPath = path.join(targetDir, `${pageName}.tsx`);
const cssPath = path.join(stylesDir, `${pageName}.css`);

fs.writeFileSync(componentPath, componentContent);
fs.writeFileSync(cssPath, cssContent);

console.log(`✅ Created ${pageName} page:`);
console.log(`   Component: ${componentPath}`);
console.log(`   Styles: ${cssPath}`);
console.log(`\n📝 Don't forget to:`);
console.log(`   1. Add export to pages/index.ts`);
console.log(`   2. Add route to src/routes.tsx`);
console.log(`   3. Import CSS in the component file`); 