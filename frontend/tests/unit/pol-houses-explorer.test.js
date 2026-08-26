import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/pol-houses-explorer', file),
        'utf-8'
    );
}

function readArchitectureScript() {
    return readFileSync(
        resolve(__dirname, '../../frontend/architecture-styles/script.js'),
        'utf-8'
    );
}

describe('Pol Houses Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('renders the Pol Houses hero section', () => {
        expect(html).toContain('class="pol-hero"');
        expect(html).toContain('<h1>Pol <span>Houses</span></h1>');
        expect(html).toContain('Gujarat Architecture');
    });

    it('contains verified architectural and cultural information', () => {
        expect(html).toContain('Ahmedabad');
        expect(html).toContain('Chabutra');
        expect(html).toContain('Wooden Facades');
        expect(html).toContain('Courtyards');
        expect(html).toContain('narrow, winding streets');
    });

    it('contains an interactive SVG map with correct hotspots', () => {
        expect(html).toContain('<svg');
        expect(html).toContain('pol-feature');
        expect(html).toContain('data-title="Narrow Shared Streets"');
        expect(html).toContain('data-title="Pol Houses & Wooden Facades"');
        expect(html).toContain('data-title="Chowk (Courtyard) & Open Spaces"');
        expect(html).toContain('data-title="Main Gate (Pratoli)"');
        expect(html).toContain('data-title="Chabutra (Bird Feeder)"');
    });

    it('contains sources and credits', () => {
        expect(html).toContain('Sources & Credits');
        expect(html).toContain('Ahmedabad Municipal Corporation');
        expect(html).toContain('UNESCO');
        expect(html).toContain('INTACH');
    });
});

describe('Pol Houses Explorer — Architecture Integration', () => {
    it('is present in architectureStyles array', () => {
        const script = readArchitectureScript();
        expect(script).toContain('id: "pol-houses"');
        expect(script).toContain('name: "Pol Houses"');
        expect(script).toContain('exploreUrl: "../pol-houses-explorer/index.html"');
    });
});
