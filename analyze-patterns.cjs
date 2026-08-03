const fs = require('fs');
const path = require('path');

const root = 'D:\\Incredible-India-Explorer';

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(f => {
      f = path.join(dir, f);
      const stat = fs.statSync(f);
      if (stat && stat.isDirectory()) { results = results.concat(walk(f)); }
      else { results.push(f); }
    });
  } catch(e) {}
  return results;
}

const files = walk(root).filter(f => /\.(html|css)$/.test(f) && !f.includes('node_modules'));
const broken = [];

const urlRegex = /(?:href|src)\s*=\s*"([^"]+)"/g;

files.forEach(file => {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const dir = path.dirname(file);
  const rel = path.relative(root, file).replace(/\\/g, '/');
  
  lines.forEach((line, lineNum) => {
    let match;
    while ((match = urlRegex.exec(line)) !== null) {
      let url = match[1];
      if (!url) continue;
      if (url.startsWith('http') || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('data:')) continue;
      if (url.includes('${') || url.includes('||')) continue;
      
      const pathOnly = url.replace(/[?#].*$/, '');
      if (!pathOnly) continue;
      
      const resolved = path.resolve(dir, pathOnly);
      if (!fs.existsSync(resolved)) {
        broken.push({ file: rel, line: lineNum + 1, url: url });
      }
    }
  });
});

// Extract unique URL patterns
const patterns = {};
broken.forEach(b => {
  const cleanUrl = b.url.replace(/[?#].*$/, '');
  const dir = path.dirname(b.file);
  if (!patterns[cleanUrl]) patterns[cleanUrl] = { count: 0, files: [], dirs: new Set() };
  patterns[cleanUrl].count++;
  patterns[cleanUrl].files.push(b.file + ':' + b.line);
  patterns[cleanUrl].dirs.add(dir.replace(/\\/g, '/'));
});

console.log(`Total broken links: ${broken.length}`);
console.log(`Unique URL patterns: ${Object.keys(patterns).length}`);
console.log('');
console.log('=== Unique broken URL patterns (sorted by count) ===');
Object.entries(patterns).sort((a,b) => b[1].count - a[1].count).forEach(([pattern, info]) => {
  const sampleDirs = Array.from(info.dirs).slice(0, 3);
  console.log(`  [${info.count}x] "${pattern}"`);
  console.log(`    dirs: ${sampleDirs.join(', ')}`);
  console.log(`    files: ${info.files.slice(0, 2).join(', ')}`);
  console.log('');
});
