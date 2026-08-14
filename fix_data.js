import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const dataFilePath = path.join(__dirname, 'frontend', 'national-parks-explorer', 'data.js');
const parksDir = path.join(__dirname, 'frontend', 'national-parks');

let content = fs.readFileSync(dataFilePath, 'utf8');
const dirs = fs.readdirSync(parksDir).filter(f => fs.statSync(path.join(parksDir, f)).isDirectory());

// We want to add/update explorerUrl for each park in data.js.
// We can use a regex to parse the array, but it's simpler to do string replacements based on the 'id: ' field.

const idRegex = /id:\s*'([^']+)'/g;
let match;
const parkIds = [];
while ((match = idRegex.exec(content)) !== null) {
    parkIds.push(match[1]);
}

let newContent = content;

parkIds.forEach(id => {
    // Find matching directory
    const matchingDir = dirs.find(d => d.startsWith(id));
    if (matchingDir) {
        const correctUrl = `../national-parks/${matchingDir}/index.html`;
        
        // Find the block for this ID.
        // It starts with id: 'id' and ends before the next id: or the end of the array.
        const blockRegex = new RegExp(`id:\\s*'${id}'[\\s\\S]*?(?=(?:id:\\s*'|\\}$))`);
        const blockMatch = newContent.match(blockRegex);
        if (blockMatch) {
            let block = blockMatch[0];
            
            // Check if explorerUrl or exploreUrl exists
            if (block.includes('explorerUrl:')) {
                block = block.replace(/explorerUrl:\s*'[^']+'/, `explorerUrl: '${correctUrl}'`);
            } else if (block.includes('exploreUrl:')) {
                block = block.replace(/exploreUrl:\s*'[^']+'/, `explorerUrl: '${correctUrl}'`);
            } else {
                // Insert explorerUrl before the image or at the end
                if (block.includes('image:')) {
                    block = block.replace(/(image:\s*'[^']+')/g, `$1,\n        explorerUrl: '${correctUrl}'`);
                } else {
                    block = block.replace(/,?\s*$/, `,\n        explorerUrl: '${correctUrl}'\n    `);
                }
            }
            newContent = newContent.replace(blockMatch[0], block);
        }
    }
});

// Fix some formatting issues (e.g., trailing commas)
newContent = newContent.replace(/,\s*,/g, ',');

fs.writeFileSync(dataFilePath, newContent, 'utf8');
console.log('Fixed data.js with correct explorerUrls');
