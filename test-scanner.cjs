const fs = require('fs');
const path = require('path');

const f = 'D:\\Incredible-India-Explorer\\frontend\\about\\about.html';
const content = fs.readFileSync(f, 'utf8');
const regex = /href\s*=\s*"([^"]+)"/g;
let m;
while ((m = regex.exec(content)) !== null) {
  const url = m[1].replace(/[?#].*$/, '');
  const resolved = path.resolve(path.dirname(f), url);
  console.log(url + ' -> ' + resolved + ' exists=' + fs.existsSync(resolved));
}
