const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'src', 'admin');

const replacements = [
  { regex: /#334155/gi, replacement: 'var(--color-text-muted)' },
  { regex: /#475569/gi, replacement: 'var(--color-text-secondary)' },
  { regex: /rgba\(\s*255\s*,\s*255\s*,\s*255\s*,\s*0\.[0-9]+\s*\)/g, replacement: 'var(--color-border-light)' },
  { regex: /rgba\(\s*13\s*,\s*20\s*,\s*38\s*,\s*0\.95\s*\)/g, replacement: 'var(--color-bg-primary)' },
  { regex: /#0d1426/gi, replacement: 'var(--color-bg-card)' },
  { regex: /#111827/gi, replacement: 'var(--color-bg-card)' },
  { regex: /rgba\(\s*0\s*,\s*0\s*,\s*0\s*,\s*0\.5\s*\)/g, replacement: 'rgba(0, 0, 0, 0.2)' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.css')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      
      for (const rule of replacements) {
        content = content.replace(rule.regex, rule.replacement);
      }
      
      fs.writeFileSync(fullPath, content, 'utf8');
      console.log(`Updated ${fullPath}`);
    }
  }
}

processDirectory(adminDir);
console.log('Done replacing additional hardcoded colors!');
