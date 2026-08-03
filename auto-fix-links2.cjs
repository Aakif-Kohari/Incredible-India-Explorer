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
        if (!file.includes('node_modules') && !file.includes('.git')) {
          results = results.concat(walk(file));
        }
      } else {
        results.push(file);
      }
    });
  } catch (e) {}
  return results;
}

const allFiles = walk(root);
const fileMap = {};
allFiles.forEach(f => {
  const base = path.basename(f);
  if (!fileMap[base]) fileMap[base] = [];
  fileMap[base].push(f.replace(/\\/g, '/'));
});

function findBestMatch(missingBaseName, currentDir, requestedPath) {
    if (!fileMap[missingBaseName] || fileMap[missingBaseName].length === 0) return null;
    if (fileMap[missingBaseName].length === 1) return fileMap[missingBaseName][0];
    
    const candidates = fileMap[missingBaseName];
    
    if (missingBaseName === 'app.js') {
        const main = candidates.find(f => f.endsWith('frontend/app.js'));
        if (main) return main;
    }
    
    if (missingBaseName === 'firebase-config.js') {
        const main = candidates.find(f => f.endsWith('frontend/firebase-config.js'));
        if (main) return main;
    }

    if (missingBaseName === 'apple-touch-icon.png' || missingBaseName === 'manifest.json') {
        const main = candidates.find(f => f.endsWith(`frontend/${missingBaseName}`));
        if (main) return main;
    }
    
    if (missingBaseName === 'data.js' || missingBaseName === 'script.js') {
        const folderMatch = candidates.find(f => requestedPath.split('/').some(p => p !== '..' && p !== '.' && f.includes('/' + p + '/')));
        if (folderMatch) return folderMatch;
    }

    return candidates[0];
}

const filesToFix = allFiles.filter(f => /\.(html|css)$/.test(f));
let totalFixed = 0;

filesToFix.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  const dir = path.dirname(file);
  
  const regex = /(href|src)\s*=\s*"([^"]+)"/g;
  content = content.replace(regex, (match, attr, url) => {
    if (url.startsWith('http') || url.startsWith('#') || url.startsWith('mailto:') || url.startsWith('tel:') || url.startsWith('data:')) return match;
    if (url.includes('${') || url.includes('||')) return match;
    
    const urlObj = url.split('#');
    const cleanUrl = urlObj[0].split('?')[0];
    const hash = urlObj[1] ? '#' + urlObj[1] : '';
    const query = urlObj[0].split('?')[1] ? '?' + urlObj[0].split('?')[1] : '';
    
    if (!cleanUrl) return match;
    
    const resolved = path.resolve(dir, cleanUrl);
    
    if (!fs.existsSync(resolved)) {
      const baseName = path.basename(cleanUrl);
      const targetFile = findBestMatch(baseName, dir, cleanUrl);
      if (targetFile) {
        let relPath = path.relative(dir, targetFile).replace(/\\/g, '/');
        totalFixed++;
        return `${attr}="${relPath}${query}${hash}"`;
      }
    }
    return match;
  });

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
  }
});
console.log(`Fixed ${totalFixed} more links.`);
