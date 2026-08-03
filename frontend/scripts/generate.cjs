const fs = require('fs');
const path = require('path');

// --check verifies the committed output matches what the layout would produce
// now, instead of writing files. Used by CI to catch stale dist/.
const checkOnly = process.argv.includes('--check');
const stale = [];

// Load data.js - read file directly and evaluate to bypass any module caching issues
const dataCode = fs.readFileSync(path.join(__dirname, '..', 'data.js'), 'utf8');
const dataModule = { exports: {} };
const dataFn = new Function('module', 'exports', 'require', '__dirname', '__filename', dataCode);
dataFn(dataModule, dataModule.exports, require, __dirname, __filename);
const { mapData } = dataModule.exports;

const layoutPath = path.join(__dirname, 'layout.html');
const layoutTemplate = fs.readFileSync(layoutPath, 'utf8');

const distDir = path.join(__dirname, '..', 'dist');
const statesDir = path.join(distDir, 'states');

// Ensure output directory exists
fs.mkdirSync(statesDir, { recursive: true });

// Escape dynamic text before inserting it into generated HTML
function escapeHtml(value) {
    return String(value ?? '')
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

// Generate State Pages
const locations = mapData.locations;
const generatedSlugs = new Map();

locations.forEach(state => {
    // Basic slugification for URL
    const slug = state.name.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    // Prevent different states from generating the same output file
    if (generatedSlugs.has(slug)) {
        const existingState = generatedSlugs.get(slug);

        throw new Error(
            `Duplicate state slug "${slug}" generated for "${existingState}" and "${state.name}".`
        );
    }

    generatedSlugs.set(slug, state.name);
    
    // Escape dynamic state data
    const safeName = escapeHtml(state.name);
    const safeCapital = escapeHtml(state.capital);
    const safeFood = escapeHtml(state.food);
    const safeFestival = escapeHtml(state.festival);
    const safeDescription = escapeHtml(
        state.description || `Explore ${state.name} in India`
    );
    const safeStory = escapeHtml(state.story);

    // Dynamic Content
    const title = `${safeName} | Incredible India Explorer`;
    const description = safeDescription;
    const relativePath = '../../'; // since it will be in dist/states/
    const BASE_URL = 'https://incredibleindiaexplorer.gov.in';
    const ogImage = `${BASE_URL}/assets/Brihadeeswara_Temple.png`;
    const ogUrl = `${BASE_URL}/states/${slug}.html`;
    const ogType = 'place';

    let content = `
    <div style="max-width: 800px; margin: 40px auto; padding: 20px;" class="glass-card">
        <h1>${safeName}</h1>
        <p><strong>Capital:</strong> ${safeCapital}</p>
        <p><strong>Famous Food:</strong> ${safeFood}</p>
        <p><strong>Major Festival:</strong> ${safeFestival}</p>
        <div style="margin-top: 20px;">
            <h3>Overview</h3>
            <p>${safeDescription}</p>
        </div>
        <div style="margin-top: 20px;">
            <h3>Story</h3>
            <p>${safeStory.replace(/\n/g, '<br>')}</p>
        </div>
        <a href="../../index.html" class="btn btn-primary" style="margin-top: 20px; display: inline-block;">Back to Home</a>
    </div>
    `;

    // Replace placeholders
    let pageHtml = layoutTemplate
        .replace(/\{\{title\}\}/g, title)
        .replace(/\{\{description\}\}/g, description)
        .replace(/\{\{og_title\}\}/g, title)
        .replace(/\{\{og_description\}\}/g, description)
        .replace(/\{\{og_image\}\}/g, ogImage)
        .replace(/\{\{og_url\}\}/g, ogUrl)
        .replace(/\{\{og_type\}\}/g, ogType)
        .replace(/\{\{relative_path\}\}/g, relativePath)
        .replace(/\{\{extra_head\}\}/g, '')
        .replace(/\{\{extra_scripts\}\}/g, '')
        .replace(/\{\{content\}\}/g, content);

    // Write file
    const outputPath = path.join(statesDir, `${slug}.html`);

    if (checkOnly) {
        const existing = fs.existsSync(outputPath) ? fs.readFileSync(outputPath, 'utf8') : null;
        if (existing !== pageHtml) stale.push(`dist/states/${slug}.html`);
        return;
    }

    fs.writeFileSync(outputPath, pageHtml);
    console.log(`Generated: dist/states/${slug}.html`);
});

if (checkOnly) {
    if (stale.length) {
        console.error(`${stale.length} generated page(s) are out of date:\n  ${stale.join('\n  ')}`);
        console.error('\nRun `npm run generate` and commit the result.');
        process.exit(1);
    }
    console.log(`All ${generatedSlugs.size} generated pages are up to date.`);
} else {
    console.log('Static Site Generation complete!');
}