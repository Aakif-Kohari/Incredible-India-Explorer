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

const fixes = [];

files.forEach(file => {
  let content = fs.readFileSync(file, 'utf8');
  let original = content;
  let fileFixes = [];
  const rel = path.relative(root, file).replace(/\\/g, '/');

  const inFrontendSubdir = /^frontend\/[^\/]+\//.test(rel);
  const inFrontendRoot = /^frontend\/[^\/]+\.(html|css)$/.test(rel);

  function replace(pattern, replacement) {
    const regex = new RegExp(pattern.source, pattern.flags);
    const matches = content.match(regex);
    if (matches && matches.length > 0) {
      fileFixes.push({ pattern: pattern.source, count: matches.length });
      content = content.replace(regex, replacement);
    }
  }

  // Fix 1: bare index.html from frontend root pages should be ../index.html
  if (inFrontendRoot) {
    replace(/(href|src)="index\.html"/g, '$1="../index.html"');
    replace(/(href|src)="index\.html#home"/g, '$1="../index.html#home"');
    replace(/(href|src)="index\.html#map"/g, '$1="../index.html#map"');
    replace(/(href|src)="index\.html#quiz"/g, '$1="../index.html#quiz"');
  }

  // Fix 2: bare index.html from frontend subdirs should be ../../index.html
  if (inFrontendSubdir) {
    replace(/(href|src)="index\.html#home"/g, '$1="../../index.html#home"');
    replace(/(href|src)="index\.html#map"/g, '$1="../../index.html#map"');
    replace(/(href|src)="index\.html#quiz"/g, '$1="../../index.html#quiz"');
    replace(/(href|src)="index\.html"/g, '$1="../../index.html"');
  }

  // Fix 3: frontend/national-awards/national-awards.html from frontend root pages
  if (inFrontendRoot) {
    replace(/(href|src)="frontend\/national-awards\/national-awards\.html"/g, '$1="./frontend/national-awards/national-awards.html"');
  }

  // Fix 4: ../../css/... and ../../js/... from subdirs
  if (inFrontendSubdir) {
    replace(/\.\.\/\.\.\/css\//g, '../css/');
    replace(/\.\.\/\.\.\/js\//g, '../js/');
  }

  // Fix 5: ../../assets/science/... from subdirs
  if (inFrontendSubdir) {
    replace(/\.\.\/\.\.\/assets\//g, '../assets/');
  }

  // Fix 6: self-references like ../../arts-crafts.html from frontend/arts-crafts/
  if (inFrontendSubdir) {
    const dirName = path.basename(path.dirname(file));
    // e.g. ../../arts-crafts.html from frontend/arts-crafts/arts-crafts.html
    replace(new RegExp('\\.\\.\\/\\.\\./' + dirName + '\\.html(?:[#?]|$)'), '../' + dirName + '.html');
  }

  // Fix 7: bare page names from frontend root pages that need ../ prefix
  if (inFrontendRoot) {
    const pages = ['cuisine.html', 'festivals.html', 'culture.html', 'travel.html',
      'wildlife.html', 'personalities.html', 'spiritual.html', 'arts-crafts.html',
      'museums.html', 'tribes.html', 'data-india.html', 'renewable-energy.html',
      'login.html', 'national-awards.html'];
    pages.forEach(p => {
      replace(new RegExp('(href|src)="' + p + '"'), '$1="../' + p + '"');
    });
  }

  // Fix 8: src="styles.css" / href="styles.css" from frontend root pages
  if (inFrontendRoot) {
    replace(/(href|src)="styles\.css"/g, '$1="../styles.css"');
  }

  // Fix 9: ../../../frontend/js-modules/ from deeper subdirs like frontend/heritage/, frontend/travel/, etc.
  if (inFrontendSubdir) {
    replace(/\.\.\/\.\.\/\.\.\/frontend\/js-modules\//g, '../../js-modules/');
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    fixes.push({ file: rel, fixes: fileFixes });
  }
});

console.log(`Fixed ${fixes.length} files in second pass:`);
fixes.forEach(f => {
  console.log(`\n${f.file}:`);
  f.fixes.forEach(fix => console.log(`  - ${fix.count}x ${fix.pattern}`));
});
