import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadTerracottaData() {
    const code = readFileSync(
        resolve(__dirname, '../../terracotta-pottery-explorer/terracotta-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { TERRACOTTA_INFO, PROCESS_STEPS, REGIONAL_STYLES, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Terracotta Pottery Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadTerracottaData();
    });

    describe('TERRACOTTA_INFO metadata', () => {
        it('contains correct Terracotta Pottery attributes and GI tag info', () => {
            expect(data.TERRACOTTA_INFO.id).toBe('terracotta-pottery');
            expect(data.TERRACOTTA_INFO.title).toContain('Terracotta Pottery');
            expect(data.TERRACOTTA_INFO.historicalBackground).toContain('Indus Valley');
            expect(data.TERRACOTTA_INFO.materialsUsed).toContain('Alluvial Clay');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.TERRACOTTA_INFO.quickStats)).toBe(true);
            expect(data.TERRACOTTA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('PROCESS_STEPS & REGIONAL_STYLES', () => {
        it('contains pottery making steps and regional clay styles', () => {
            expect(Array.isArray(data.PROCESS_STEPS)).toBe(true);
            expect(data.PROCESS_STEPS.length).toBeGreaterThanOrEqual(5);
            expect(Array.isArray(data.REGIONAL_STYLES)).toBe(true);
            expect(data.REGIONAL_STYLES.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('GALLERY_IMAGES & REFERENCES', () => {
        it('has non-empty gallery and references', () => {
            expect(Array.isArray(data.GALLERY_IMAGES)).toBe(true);
            expect(data.GALLERY_IMAGES.length).toBeGreaterThanOrEqual(2);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
