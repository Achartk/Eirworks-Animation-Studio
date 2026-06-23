const fs = require('fs');
const path = require('path');

const adminDir = path.join(__dirname, 'src', 'admin');

const replacements = [
  { regex: /#060a14/gi, replacement: 'var(--color-bg-primary)' },
  { regex: /#0d1426/gi, replacement: 'var(--color-bg-card)' },
  { regex: /rgba\(13,\s*20,\s*38,\s*0\.95\)/g, replacement: 'var(--color-bg-primary)' },
  { regex: /#111827/gi, replacement: 'var(--color-bg-card)' },
  { regex: /#1a2336/gi, replacement: 'var(--color-bg-card-hover)' },
  { regex: /#f1f5f9/gi, replacement: 'var(--color-text-primary)' },
  { regex: /#94a3b8/gi, replacement: 'var(--color-text-secondary)' },
  { regex: /#64748b/gi, replacement: 'var(--color-text-muted)' },
  { regex: /#475569/gi, replacement: 'var(--color-text-muted)' },
  { regex: /rgba\(255,\s*255,\s*255,\s*0\.0[1-9]\)/g, replacement: 'var(--color-border-light)' },
  { regex: /rgba\(255,\s*255,\s*255,\s*0\.1\)/g, replacement: 'var(--color-border-light)' },
  { regex: /rgba\(124,\s*58,\s*237,\s*0\.15\)/g, replacement: 'var(--color-border)' },
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
console.log('Done replacing colors in Admin CSS!');
