import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/rampa-rebellion-explorer', file),
        'utf-8'
    );
}

function readHubLanding() {
    return readFileSync(
        resolve(__dirname, '../../frontend/freedom-fighters-hub/index.html'),
        'utf-8'
    );
}

describe('Rampa Rebellion Explorer — Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains hero section introducing Rampa Rebellion', () => {
        expect(html).toContain('Rampa Rebellion of 1922–24');
        expect(html).toContain('Eastern Ghats');
    });

    it('covers tribal society, forest regulations, forced labor, and causes', () => {
        expect(html).toContain('Forest Dependence & Podu Cultivation');
        expect(html).toContain('Madras Forest Act');
        expect(html).toContain('Forced Labour (Vetti)');
    });

    it('includes leader profile for Alluri Sitarama Raju', () => {
        expect(html).toContain('Alluri Sitarama Raju');
        expect(html).toContain('Manyam Veerudu');
    });

    it('contains interactive Eastern Ghats map', () => {
        expect(html).toContain('id="map-section"');
        expect(html).toContain('Chintapalle');
        expect(html).toContain('KD Peta');
        expect(html).toContain('Addateegala');
        expect(html).toContain('Rampachodavaram');
    });

    it('covers 1922-1924 timeline and consequences', () => {
        expect(html).toContain('id="timeline"');
        expect(html).toContain('British Counter-Insurgency & Capture');
        expect(html).toContain('Consequences & Long-Term Legacy');
    });

    it('includes credible sources', () => {
        expect(html).toContain('Credible Sources');
        expect(html).toContain('Elementary Aspects of Peasant Insurgency');
    });
});

describe('Rampa Rebellion — Landing Page Integration', () => {
    it('is listed under Tribal Resistance on Freedom Fighters Hub landing page', () => {
        const hub = readHubLanding();
        expect(hub).toContain('Rampa Rebellion of 1922–24');
        expect(hub).toContain('Tribal Resistance');
        expect(hub).toContain('../rampa-rebellion-explorer/index.html');
    });
});
