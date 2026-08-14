import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/toda-houses-explorer', file),
        'utf-8'
    );
}

function readArchitectureScript() {
    return readFileSync(
        resolve(__dirname, '../../frontend/architecture-styles/script.js'),
        'utf-8'
    );
}

describe('Toda Houses Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('renders the Toda Houses hero section', () => {
        expect(html).toContain('class="toda-hero"');
        expect(html).toContain('<h1>Toda <span>Houses</span></h1>');
        expect(html).toContain('Nilgiris Architecture');
    });

    it('contains verified architectural information', () => {
        expect(html).toContain('barrel-vaulted');
        expect(html).toContain('bamboo');
        expect(html).toContain('thatch');
        expect(html).toContain('mural');
        expect(html).toContain('munds');
    });

    it('contains an interactive SVG diagram', () => {
        expect(html).toContain('<svg');
        expect(html).toContain('toda-feature');
        expect(html).toContain('data-title="Curved Roof"');
        expect(html).toContain('data-title="Entrance"');
        expect(html).toContain('data-title="Decorative Patterns"');
    });

    it('contains sources and credits', () => {
        expect(html).toContain('Sources & Credits');
        expect(html).toContain('Architectural Records');
    });
});

describe('Toda Houses Explorer — Architecture Integration', () => {
    it('is present in architectureStyles array', () => {
        const script = readArchitectureScript();
        expect(script).toContain('id: "toda-houses"');
        expect(script).toContain('name: "Toda Houses"');
        expect(script).toContain('exploreUrl: "../toda-houses-explorer/index.html"');
    });
});
