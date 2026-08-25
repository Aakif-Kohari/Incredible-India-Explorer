const fs = require('fs');
const path = require('path');

function walk(dir) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(file => {
        file = path.resolve(dir, file);
        const stat = fs.statSync(file);
        if (stat && stat.isDirectory()) {
            if (!file.includes('node_modules') && !file.includes('.git') && !file.includes('tests')) {
                results = results.concat(walk(file));
            }
        } else {
            if (file.endsWith('.html')) {
                results.push(file);
            }
        }
    });
    return results;
}

const ROOT_DIR = __dirname;
const htmlFiles = walk(ROOT_DIR);
let updated = 0;

const oldRegex = /<script>\s*\(\s*function\s*\(\)\s*\{\s*const\s+theme\s*=\s*localStorage\.getItem\('theme'\)\s*\|\|\s*'dark';\s*if\s*\(theme\s*===\s*'light'\)\s*\{\s*document\.documentElement\.setAttribute\('data-theme',\s*'light'\);\s*\}\s*\}\)\(\);\s*<\/script>/g;
const oldRegex2 = /<script>\s*\(\s*function\s*\(\)\s*\{\s*let\s+theme\s*=\s*'dark';\s*try\s*\{\s*theme\s*=\s*JSON\.parse\(localStorage\.getItem\('iie_storage'\)\s*\|\|\s*'\{\}'\)\.theme\s*\|\|\s*'dark';\s*\}\s*catch\s*\(e\)\s*\{\s*\}\s*if\s*\(theme\s*===\s*'light'\)\s*\{\s*document\.body\.classList\.add\('light-theme'\);\s*\}\s*\}\)\(\);\s*<\/script>/g;
const newScript = `<script>
        (function() {
            const theme = localStorage.getItem('theme') || 'dark';
            document.documentElement.setAttribute('data-theme', theme);
        })();
    </script>`;

htmlFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let changed = false;
    
    if (oldRegex.test(content)) {
        content = content.replace(oldRegex, newScript);
        changed = true;
    }
    
    if (oldRegex2.test(content)) {
        content = content.replace(oldRegex2, '');
        changed = true;
    }
    
    // Fallback for body inline script
    const bodyInlineScript = /<script>\s*\(\s*function\s*\(\)\s*\{\s*let\s+theme\s*=\s*'dark';\s*try.*?document\.body\.classList\.add\('light-theme'\);.*?<\/script>/gs;
    if (bodyInlineScript.test(content)) {
        content = content.replace(bodyInlineScript, '');
        changed = true;
    }
    
    if (changed) {
        fs.writeFileSync(file, content, 'utf8');
        updated++;
    }
});

console.log('Successfully updated ' + updated + ' HTML files with the new theme initialization script.');
