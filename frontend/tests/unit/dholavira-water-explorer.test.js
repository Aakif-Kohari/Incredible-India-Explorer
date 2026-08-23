import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/dholavira-water-explorer', file),
        'utf-8'
    );
}

describe('Dholavira Explorer — Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains hero section introducing Dholavira', () => {
        expect(html).toContain('Dholavira: The Harappan City of Water');
        expect(html).toContain('UNESCO World Heritage Site');
    });

    it('covers tripartite city divisions and layout map', () => {
        expect(html).toContain('Citadel (Castle)');
        expect(html).toContain('Bailey');
        expect(html).toContain('Middle Town');
        expect(html).toContain('Lower Town');
    });

    it('covers hydraulic engineering and water management system', () => {
        expect(html).toContain('Stone-Cut Reservoirs');
        expect(html).toContain('Cascading Siltation Basins');
        expect(html).toContain('Fortified Dams & Aqueducts');
    });

    it('covers Harappan settlement timeline (Stage I to VII)', () => {
        expect(html).toContain('id="timeline"');
        expect(html).toContain('Stage I to VII');
    });

    it('covers archaeological discoveries including the 10-symbol signboard', () => {
        expect(html).toContain('10-Symbol Inscription Signboard');
        expect(html).toContain('Craft & Trade Artifacts');
    });

    it('covers decline, aridity, and credible sources', () => {
        expect(html).toContain('Decline, Abandonment & Archaeological Sources');
        expect(html).toContain('Bisht, R. S.');
    });
});
