import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/lothal-maritime-gateway', file),
        'utf-8'
    );
}

describe('Lothal Maritime Gateway Explorer — Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains hero section introducing Lothal maritime gateway', () => {
        expect(html).toContain('Lothal: India\'s Ancient Maritime Gateway');
        expect(html).toContain('Bronze Age Maritime Gateway');
    });

    it('covers city layout map and clickable structures', () => {
        expect(html).toContain('Interactive City Layout Map');
        expect(html).toContain('Tidal Dockyard');
        expect(html).toContain('Acropolis (Citadel)');
        expect(html).toContain('Warehouse');
        expect(html).toContain('Bead Factory');
    });

    it('covers dockyard interpretation and warehouse', () => {
        expect(html).toContain('Tidal Lock-Gate & Sluice System');
        expect(html).toContain('The Great Granary / Warehouse');
    });

    it('covers ancient trade routes and connections', () => {
        expect(html).toContain('Mesopotamia (Meluhha Trade)');
        expect(html).toContain('Persian Gulf (Dilmun & Magan)');
    });

    it('covers craft production and bead-making industry', () => {
        expect(html).toContain('Bead-Making Industry');
        expect(html).toContain('Pottery, Shell & Metallurgy');
    });

    it('covers timeline, artifact gallery, and credible sources', () => {
        expect(html).toContain('id="timeline"');
        expect(html).toContain('Persian Gulf Seal');
        expect(html).toContain('Rao, S. R.');
    });
});
