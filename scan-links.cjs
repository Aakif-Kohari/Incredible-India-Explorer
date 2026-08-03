const fs = require('fs');
const path = require('path');

const root = 'D:\\Incredible-India-Explorer';

function walk(dir) {
  let results = [];
  try {
    const list = fs.readdirSync(dir);
    list.forEach(file => {
      file = path.join(dir, file);
      const stat = fs.statSync(file);
      if (stat && stat.isDirectory()) {
        results = results.concat(walk(file));
      } else {
        results.push(file);
      }
    });
  } catch (e) {}
  return results;
}

const files = walk(root).filter(f => /\.(html|css)$/.test(f) && !f.includes('node_modules') && !f.includes('package-lock.json'));

const broken = [];

files.forEach(file => {
  const lines = fs.readFileSync(file, 'utf8').split('\n');
  const rel = path.relative(root, file).replace(/\\/g, '/');
  const dir = path.dirname(file);
  
  lines.forEach((line, lineNum) => {
    const regex = /(?:href|src)\s*=\s*"([^"]+)"/g;
    let match;
    while ((match = regex.exec(line)) !== null) {
      let url = match[1];
      if (!url) continue;
      if (url.startsWith('http') || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('data:')) continue;
      if (url.includes('${') || url.includes('||')) continue;
      
      // Strip fragment and query
      url = url.replace(/[?#].*$/, '');
      if (!url) continue;
      
      const resolved = path.resolve(dir, url);
      if (!fs.existsSync(resolved)) {
        broken.push({ file: rel, line: lineNum + 1, url: match[1], resolved: resolved.replace(/\\/g, '/') });
      }
    }
  });
});

// Group by file
const byFile = {};
broken.forEach(b => {
  if (!byFile[b.file]) byFile[b.file] = [];
  byFile[b.file].push(b);
});

console.log(`Total broken links: ${broken.length}`);
console.log(`Files with broken links: ${Object.keys(byFile).length}\n`);

Object.keys(byFile).sort().forEach(file => {
  console.log(`${file}:`);
  byFile[file].forEach(b => {
    console.log(`  L${b.line}: ${b.url} -> ${b.resolved}`);
  });
});
