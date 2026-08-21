import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/shekhawati-haveli-explorer', file),
        'utf-8'
    );
}

function readArchitectureScript() {
    return readFileSync(
        resolve(__dirname, '../../frontend/architecture-styles/script.js'),
        'utf-8'
    );
}

describe('Shekhawati Haveli Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('renders the Shekhawati Haveli hero section', () => {
        expect(html).toContain('class="shekhawati-hero"');
        expect(html).toContain('<h1>Shekhawati <span>Havelis</span></h1>');
        expect(html).toContain('Rajasthan Architecture');
    });

    it('contains verified architectural and cultural information', () => {
        expect(html).toContain('Fresco Paintings');
        expect(html).toContain('Jharokhas');
        expect(html).toContain('courtyard');
        expect(html).toContain('merchant');
        expect(html).toContain('desert');
    });

    it('contains an interactive SVG diagram with correct hotspots', () => {
        expect(html).toContain('<svg');
        expect(html).toContain('shekhawati-feature');
        expect(html).toContain('data-title="Jharokhas (Overhanging Balconies)"');
        expect(html).toContain('data-title="Fresco Paintings"');
        expect(html).toContain('data-title="Chowk (Courtyard)"');
        expect(html).toContain('data-title="Main Entrance (Torana)"');
    });

    it('contains climate adaptations section', () => {
        expect(html).toContain('Designed for the Desert');
        expect(html).toContain('passive climate control');
    });

    it('contains sources and credits', () => {
        expect(html).toContain('Sources & Credits');
        expect(html).toContain('INTACH');
        expect(html).toContain('Rajasthan Tourism');
    });
});

describe('Shekhawati Haveli Explorer — Architecture Integration', () => {
    it('is present in architectureStyles array', () => {
        const script = readArchitectureScript();
        expect(script).toContain('id: "shekhawati-haveli"');
        expect(script).toContain('name: "Shekhawati Havelis"');
        expect(script).toContain('exploreUrl: "../shekhawati-haveli-explorer/index.html"');
    });
});
