import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import { minify } from 'terser';
import CleanCSS from 'clean-css';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get root directory of the project
const rootDir = path.resolve(__dirname, '..');
// We will process the 'frontend' directory and the root 'style.css' and 'app.js'
const targetDirs = [
    path.join(rootDir, 'frontend'),
    path.join(rootDir, 'style.css'),
    path.join(rootDir, 'app.js')
];

const cssMinifier = new CleanCSS({
    level: 2, // Maximum optimization
    returnPromise: true
});

/**
 * Process a file or directory recursively
 */
async function processPath(targetPath) {
    if (!fs.existsSync(targetPath)) return;

    const stats = fs.statSync(targetPath);

    if (stats.isDirectory()) {
        const files = fs.readdirSync(targetPath);
        for (const file of files) {
            await processPath(path.join(targetPath, file));
        }
    } else if (stats.isFile()) {
        await minifyFile(targetPath);
    }
}

/**
 * Minify a single file if it is CSS or JS
 */
async function minifyFile(filePath) {
    const ext = path.extname(filePath).toLowerCase();
    
    // Skip already minified files
    if (filePath.endsWith('.min.js') || filePath.endsWith('.min.css')) {
        return;
    }

    if (ext === '.js') {
        const minifiedPath = filePath.replace(/\.js$/, '.min.js');
        await minifyJs(filePath, minifiedPath);
    } else if (ext === '.css') {
        const minifiedPath = filePath.replace(/\.css$/, '.min.css');
        await minifyCss(filePath, minifiedPath);
    }
}

/**
 * Minify JavaScript using Terser
 */
async function minifyJs(inputPath, outputPath) {
    try {
        const code = fs.readFileSync(inputPath, 'utf8');
        const result = await minify(code, {
            compress: true,
            mangle: true
        });
        
        if (result.code) {
            fs.writeFileSync(outputPath, result.code, 'utf8');
            const originalSize = fs.statSync(inputPath).size;
            const newSize = fs.statSync(outputPath).size;
            const saved = ((1 - (newSize / originalSize)) * 100).toFixed(2);
            console.log(`[JS] Minified: ${path.relative(rootDir, inputPath)} -> ${saved}% smaller`);
        }
    } catch (error) {
        console.error(`[JS] Error minifying ${inputPath}:`, error);
    }
}

/**
 * Minify CSS using CleanCSS
 */
async function minifyCss(inputPath, outputPath) {
    try {
        const code = fs.readFileSync(inputPath, 'utf8');
        const result = await cssMinifier.minify(code);
        
        if (result.styles) {
            fs.writeFileSync(outputPath, result.styles, 'utf8');
            const originalSize = fs.statSync(inputPath).size;
            const newSize = fs.statSync(outputPath).size;
            const saved = ((1 - (newSize / originalSize)) * 100).toFixed(2);
            console.log(`[CSS] Minified: ${path.relative(rootDir, inputPath)} -> ${saved}% smaller`);
        }
    } catch (error) {
        console.error(`[CSS] Error minifying ${inputPath}:`, error);
    }
}

// Run the minifier
async function run() {
    console.log('Starting minification process...');
    for (const target of targetDirs) {
        await processPath(target);
    }
    console.log('Minification complete.');
}

run();
