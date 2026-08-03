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

  // Fix 1: ../styles.css in subdirs -> ../../styles.css
  if (inFrontendSubdir) {
    replace(/(\.\.\/styles\.css)(?=["\'>])/g, '../../styles.css');
  }

  // Fix 2: ../page.html in subdirs -> ../page/page.html for nested pages
  if (inFrontendSubdir) {
    const nestedPages = {
      'travel.html': 'travel/travel.html',
      'cuisine.html': 'cuisine/cuisine.html',
      'festivals.html': 'festivals/festivals.html',
      'culture.html': 'culture/culture.html',
      'wildlife.html': 'wildlife/wildlife.html',
      'personalities.html': 'personalities/personalities.html',
      'spiritual.html': 'spiritual/spiritual.html',
      'arts-crafts.html': 'arts-crafts/arts-crafts.html',
      'museums.html': 'museums/museums.html',
      'tribes.html': 'tribes/tribes.html'
    };
    Object.entries(nestedPages).forEach(([short, full]) => {
      replace(new RegExp('(\\.\\./' + short.replace(/\./g, '\\.') + ')(?=["\'>])'), '../' + full);
    });
  }

  // Fix 3: bare page names from frontend root pages -> proper paths
  if (inFrontendRoot) {
    const nestedPages = {
      'travel.html': 'travel/travel.html',
      'cuisine.html': 'cuisine/cuisine.html',
      'festivals.html': 'festivals/festivals.html',
      'culture.html': 'culture/culture.html',
      'wildlife.html': 'wildlife/wildlife.html',
      'personalities.html': 'personalities/personalities.html',
      'spiritual.html': 'spiritual/spiritual.html',
      'arts-crafts.html': 'arts-crafts/arts-crafts.html',
      'museums.html': 'museums/museums.html',
      'tribes.html': 'tribes/tribes.html'
    };
    Object.entries(nestedPages).forEach(([short, full]) => {
      replace(new RegExp('(' + short.replace(/\./g, '\\.') + ')(?=["\'>])'), full);
    });
  }

  // Fix 4: ../../css/ -> ../css/ and ../../js/ -> ../js/ in subdirs
  if (inFrontendSubdir) {
    replace(/\.\.\/\.\.\/css\//g, '../css/');
    replace(/\.\.\/\.\.\/js\//g, '../js/');
  }

  // Fix 5: ../../assets/ -> ../assets/ in subdirs
  if (inFrontendSubdir) {
    replace(/\.\.\/\.\.\/assets\//g, '../assets/');
  }

  // Fix 6: ../../../frontend/js-modules/ -> ../../js-modules/
  if (inFrontendSubdir) {
    replace(/\.\.\/\.\.\/\.\.\/frontend\/js-modules\//g, '../../js-modules/');
  }

  // Fix 7: ../../../index.html -> ../../index.html in subdirs (for deeper nesting)
  if (inFrontendSubdir) {
    replace(/\.\.\/\.\.\/\.\.\/index\.html/g, '../../index.html');
    replace(/\.\.\/\.\.\/\.\.\/index\.html#home/g, '../../index.html#home');
    replace(/\.\.\/\.\.\/\.\.\/index\.html#map/g, '../../index.html#map');
  }

  // Fix 8: bare index.html from frontend root pages -> ../index.html
  if (inFrontendRoot) {
    replace(/(index\.html)(?=["\'>])/g, '../index.html');
    replace(/(index\.html#home)(?=["\'>])/g, '../index.html#home');
    replace(/(index\.html#map)(?=["\'>])/g, '../index.html#map');
    replace(/(index\.html#quiz)(?=["\'>])/g, '../index.html#quiz');
  }

  // Fix 9: bare index.html from subdirs -> ../../index.html
  if (inFrontendSubdir) {
    replace(/(index\.html)(?=["\'>])/g, '../../index.html');
    replace(/(index\.html#home)(?=["\'>])/g, '../../index.html#home');
    replace(/(index\.html#map)(?=["\'>])/g, '../../index.html#map');
    replace(/(index\.html#quiz)(?=["\'>])/g, '../../index.html#quiz');
  }

  // Fix 10: ./frontend/national-awards/national-awards.html from frontend root pages
  if (inFrontendRoot) {
    replace(/(frontend\/national-awards\/national-awards\.html)(?=["\'>])/g, 'frontend/national-awards/national-awards.html');
  }

  // Fix 11: self-references like ../../page.html from frontend/page/
  if (inFrontendSubdir) {
    const dirName = path.basename(path.dirname(file));
    if (dirName && !dirName.includes('-') && !dirName.includes('_')) {
      const escaped = dirName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
      replace(new RegExp('(\\.\\./\\.\\./' + escaped + '\\.html)(?=["\'>])'), '../' + dirName + '.html');
    }
  }

  if (content !== original) {
    fs.writeFileSync(file, content, 'utf8');
    fixes.push({ file: rel, fixes: fileFixes });
  }
});

console.log(`Fixed ${fixes.length} files in third pass:`);
fixes.forEach(f => {
  console.log(`\n${f.file}:`);
  f.fixes.forEach(fix => console.log(`  - ${fix.count}x ${fix.pattern}`));
});
