const fs = require('fs');
const path = require('path');

const root = 'D:\\Incredible-India-Explorer';

// Find all files in the project to build a map of basename -> [full_paths]
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

console.log("Walking project directory to find all files...");
const allFiles = walk(root);
const fileMap = {};

allFiles.forEach(f => {
  const base = path.basename(f);
  if (!fileMap[base]) fileMap[base] = [];
  fileMap[base].push(f);
});

const filesToFix = allFiles.filter(f => /\.(html|css)$/.test(f));
let totalFixed = 0;

filesToFix.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  const dir = path.dirname(file);
  
  // Fix href="..." and src="..."
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
      // The link is broken.
      // Special cases
      let targetFile = null;
      if (cleanUrl === 'index.html' || cleanUrl.endsWith('/index.html') || cleanUrl.startsWith('../index.html') || cleanUrl.includes('index.html')) {
          targetFile = path.join(root, 'index.html');
      } else if (cleanUrl === 'styles.css' || cleanUrl.endsWith('/styles.css') || cleanUrl.includes('styles.css')) {
          targetFile = path.join(root, 'styles.css');
      } else if (cleanUrl === 'style.css' || cleanUrl.endsWith('/style.css') || cleanUrl.includes('style.css')) {
          targetFile = path.join(root, 'style.css');
      } else if (cleanUrl.endsWith('.css')) {
          // css files in frontend/styles/ or js-modules/ ?
          const baseName = path.basename(cleanUrl);
          if (fileMap[baseName] && fileMap[baseName].length === 1) {
              targetFile = fileMap[baseName][0];
          } else if (fileMap[baseName] && fileMap[baseName].length > 1) {
              // Try to find the closest one or specific paths
              const closest = fileMap[baseName].find(f => f.includes('styles') || f.includes('js-modules') || f.includes('frontend'));
              if (closest) targetFile = closest;
          }
      } else if (cleanUrl.endsWith('.js')) {
          const baseName = path.basename(cleanUrl);
          if (fileMap[baseName] && fileMap[baseName].length === 1) {
              targetFile = fileMap[baseName][0];
          } else if (fileMap[baseName] && fileMap[baseName].length > 1) {
              // Try to find one matching
              const closest = fileMap[baseName].find(f => f.includes('js-modules') || f.includes('dist'));
              if (closest) targetFile = closest;
          }
      } else if (cleanUrl.endsWith('.html')) {
          const baseName = path.basename(cleanUrl);
          if (fileMap[baseName] && fileMap[baseName].length === 1) {
              targetFile = fileMap[baseName][0];
          } else if (fileMap[baseName] && fileMap[baseName].length > 1) {
              const inFrontend = fileMap[baseName].find(f => f.includes('frontend'));
              if (inFrontend) targetFile = inFrontend;
          }
      } else if (cleanUrl.match(/\.(png|jpg|jpeg|svg|gif|webp)$/i)) {
          const baseName = path.basename(cleanUrl);
          if (fileMap[baseName] && fileMap[baseName].length === 1) {
              targetFile = fileMap[baseName][0];
          }
      } else if (cleanUrl.endsWith('.json')) {
          const baseName = path.basename(cleanUrl);
          if (fileMap[baseName] && fileMap[baseName].length === 1) {
              targetFile = fileMap[baseName][0];
          }
      }
      
      if (targetFile && fs.existsSync(targetFile)) {
        let relPath = path.relative(dir, targetFile).replace(/\\/g, '/');
        // Prepend ./ if needed? Usually not needed for href.
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

console.log(`Fixed ${totalFixed} links automatically.`);
