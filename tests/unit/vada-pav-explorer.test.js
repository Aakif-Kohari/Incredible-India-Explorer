import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readVadaPavFile(file) {
    return readFileSync(resolve(__dirname, '../../frontend/vada-pav-explorer', file), 'utf-8');
}

function loadVadaPavData() {
    const code = readVadaPavFile('vada-pav-data.js');
    const fn = new Function(code + '\nreturn VADA_PAV_DATA;');
    return fn();
}

describe('Vada Pav Explorer — Page Structure & Accessibility', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readVadaPavFile('index.html');
        js = readVadaPavFile('vada-pav.js');
        css = readVadaPavFile('vada-pav.css');
    });

    it('contains the required feature title and section headings', () => {
        expect(html).toContain("Vada Pav — Mumbai's Iconic Street Food");
        expect(html).toContain('Origins & Historical Roots');
        expect(html).toContain('Main Ingredients');
        expect(html).toContain('Preparation Tradition');
        expect(html).toContain('Mumbai Street-Food Culture');
        expect(html).toContain('Regional & Culinary Variations');
        expect(html).toContain('Mumbai Street-Food Explorer');
        expect(html).toContain('Sources & Image Credits');
    });

    it('references local CSS, dataset, and JavaScript files', () => {
        expect(html).toContain('href="vada-pav.css"');
        expect(html).toContain('src="vada-pav-data.js"');
        expect(html).toContain('src="vada-pav.js"');
    });

    it('contains back navigation to Regional Street Food Hub', () => {
        expect(html).toContain('href="../regional-indian-gastronomy-street-food-hub/regional-indian-gastronomy-street-food-hub.html"');
        expect(html).toContain('Back to Regional Street Food Hub');
    });

    it('contains skip link for accessibility', () => {
        expect(html).toContain('class="skip-link"');
        expect(html).toContain('href="#main-content"');
    });

    it('defines responsive styles and focus states in CSS', () => {
        expect(css).toContain('@media (max-width: 900px)');
        expect(css).toContain('@media (max-width: 600px)');
        expect(css).toContain('focus-visible');
        expect(css).toContain('prefers-reduced-motion');
    });

    it('implements street food explorer interactivity in JS', () => {
        expect(js).toContain('initStreetFoodExplorer');
        expect(js).toContain('selectFoodItem');
        expect(js).toContain('renderExplorerDetail');
        expect(js).toContain('aria-selected');
    });
});

describe('Vada Pav Explorer — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadVadaPavData();
    });

    it('has accurate historical quick facts', () => {
        expect(data.quickFacts.creator).toBe('Ashok Vaidya');
        expect(data.quickFacts.originYear).toBe('1966');
        expect(data.quickFacts.originLocation).toContain('Dadar Railway Station');
    });

    it('documents the origins and mill worker context', () => {
        expect(data.origins.summary).toContain('Ashok Vaidya');
        expect(data.origins.summary).toContain('1966');
        expect(data.origins.summary).toContain('Dadar Railway Station');
        expect(data.origins.historicalContext).toContain('textile mill');
    });

    it('contains all required core ingredients', () => {
        const names = data.ingredients.map(i => i.name);
        expect(names).toContain('Batata Vada');
        expect(names).toContain('Pav');
        expect(names).toContain('Dry Garlic Chutney');
        expect(names).toContain('Green Chutney');
        expect(names).toContain('Salted Fried Green Chili');
    });

    it('contains a 5-step preparation tradition', () => {
        expect(data.preparationSteps).toHaveLength(5);
        expect(data.preparationSteps[0].title).toContain('Tempering');
        expect(data.preparationSteps[2].title).toContain('Batter');
        expect(data.preparationSteps[4].title).toContain('Assembly');
    });

    it('includes Mumbai street food culture items', () => {
        expect(data.streetCulture.details.length).toBeGreaterThanOrEqual(3);
    });

    it('includes established regional variations', () => {
        const names = data.variations.map(v => v.name);
        expect(names).toContain('Classic Dadar Vada Pav');
        expect(names).toContain('Cheese Vada Pav');
        expect(names).toContain('Schezwan Vada Pav');
        expect(names).toContain('Jain Vada Pav');
    });

    it('includes Mumbai Street-Food Explorer items with Vada Pav as default', () => {
        expect(data.explorerItems.length).toBeGreaterThanOrEqual(5);
        expect(data.explorerItems[0].id).toBe('vada-pav');
        
        const itemIds = data.explorerItems.map(item => item.id);
        expect(itemIds).toContain('vada-pav');
        expect(itemIds).toContain('pav-bhaji');
        expect(itemIds).toContain('misal-pav');
        expect(itemIds).toContain('bhel-puri');
        expect(itemIds).toContain('sev-puri');
    });

    it('contains sources with valid external references', () => {
        expect(data.sources.length).toBeGreaterThanOrEqual(3);
        for (const src of data.sources) {
            expect(src.title).toBeTruthy();
            expect(src.url).toContain('http');
        }
    });
});
