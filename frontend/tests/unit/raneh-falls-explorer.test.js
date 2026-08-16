import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadRanehData() {
    const code = readFileSync(
        resolve(__dirname, '../../raneh-falls-explorer/raneh-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { RANEH_INFO, GEOLOGY_ROCKS, SEASONAL_DATA, NEARBY_ATTRACTIONS, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Raneh Falls Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadRanehData();
    });

    describe('RANEH_INFO metadata', () => {
        it('contains correct Raneh Falls location, height, and Ken River source', () => {
            expect(data.RANEH_INFO.id).toBe('raneh-falls');
            expect(data.RANEH_INFO.title).toContain('Raneh Falls');
            expect(data.RANEH_INFO.waterfallHeight).toContain('30 Meters');
            expect(data.RANEH_INFO.riverSource).toContain('Ken River');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.RANEH_INFO.quickStats)).toBe(true);
            expect(data.RANEH_INFO.quickStats.length).toBe(6);
        });
    });

    describe('GEOLOGY_ROCKS & SEASONAL_DATA', () => {
        it('contains 5-color geology rock strata and seasonal flow data', () => {
            expect(Array.isArray(data.GEOLOGY_ROCKS)).toBe(true);
            expect(data.GEOLOGY_ROCKS.length).toBeGreaterThanOrEqual(4);

            const granite = data.GEOLOGY_ROCKS.find(r => r.name.includes('Granite'));
            expect(granite).toBeDefined();

            expect(Array.isArray(data.SEASONAL_DATA)).toBe(true);
            expect(data.SEASONAL_DATA.length).toBeGreaterThanOrEqual(3);
        });
    });

    describe('NEARBY_ATTRACTIONS & REFERENCES', () => {
        it('contains nearby Khajuraho circuit attractions and references', () => {
            expect(Array.isArray(data.NEARBY_ATTRACTIONS)).toBe(true);
            expect(data.NEARBY_ATTRACTIONS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
