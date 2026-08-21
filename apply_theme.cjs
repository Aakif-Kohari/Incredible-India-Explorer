const fs = require('fs');
const path = require('path');

function processDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fs.statSync(fullPath).isDirectory()) {
            if (!fullPath.includes('node_modules') && !fullPath.includes('.git') && !fullPath.includes('.github')) {
                processDir(fullPath);
            }
        } else {
            if (fullPath.endsWith('.css') || fullPath.endsWith('.js')) {
                let content = fs.readFileSync(fullPath, 'utf8');
                let newContent = content.replace(/body\.light-theme/g, '[data-theme="light"]');
                if (content !== newContent) {
                    fs.writeFileSync(fullPath, newContent);
                    console.log(`Updated ${fullPath}`);
                }
            } else if (fullPath.endsWith('.html')) {
                let content = fs.readFileSync(fullPath, 'utf8');
                
                // Add script block if not present
                const scriptBlock = `\n    <script>\n        (function() {\n            const theme = localStorage.getItem('theme') || 'dark';\n            if (theme === 'light') {\n                document.documentElement.setAttribute('data-theme', 'light');\n            }\n        })();\n    </script>`;
                
                let newContent = content.replace(/body\.light-theme/g, '[data-theme="light"]');
                if (!newContent.includes("localStorage.getItem('theme') || 'dark'")) {
                    newContent = newContent.replace(/<head>/i, `<head>${scriptBlock}`);
                }
                
                if (content !== newContent) {
                    fs.writeFileSync(fullPath, newContent);
                    console.log(`Updated HTML ${fullPath}`);
                }
            }
        }
    }
}
processDir('./');
