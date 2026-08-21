import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadKuariData() {
    const code = readFileSync(
        resolve(__dirname, '../../kuari-pass-trek-explorer/kuari-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { KUARI_INFO, TRAIL_CAMPSITES, HIMALAYAN_GIANTS, REFERENCES };'
    );
    return fn();
}

describe('Kuari Pass Trek Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadKuariData();
    });

    describe('KUARI_INFO metadata', () => {
        it('contains correct Kuari Pass metadata and altitude 3,876m', () => {
            expect(data.KUARI_INFO.id).toBe('kuari-pass-trek');
            expect(data.KUARI_INFO.title).toContain('Kuari Pass');
            expect(data.KUARI_INFO.region).toContain('Uttarakhand');
            expect(data.KUARI_INFO.maxAltitude).toContain('3,876 Meters');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.KUARI_INFO.quickStats)).toBe(true);
            expect(data.KUARI_INFO.quickStats.length).toBe(6);
        });
    });

    describe('TRAIL_CAMPSITES & NANDA DEVI VISTA', () => {
        it('contains Dhak, Tali, Kuari Pass, and Mt. Nanda Devi', () => {
            expect(Array.isArray(data.TRAIL_CAMPSITES)).toBe(true);
            expect(data.TRAIL_CAMPSITES.length).toBeGreaterThanOrEqual(4);

            const pass = data.TRAIL_CAMPSITES.find(c => c.day.includes('Kuari Pass'));
            expect(pass).toBeDefined();

            expect(Array.isArray(data.HIMALAYAN_GIANTS)).toBe(true);
            const nanda = data.HIMALAYAN_GIANTS.find(g => g.peak.includes('Nanda Devi'));
            expect(nanda).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains tourism board and mountain literature citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
