import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadBambooData() {
    const code = readFileSync(
        resolve(__dirname, '../../bamboo-craft-explorer/bamboo-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { BAMBOO_INFO, REGIONAL_CRAFTS, PROCESS_STEPS, GALLERY_ITEMS, SUSTAINABILITY_POINTS, REFERENCES };'
    );
    return fn();
}

describe('Bamboo Craft Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadBambooData();
    });

    it('contains proper bamboo craft metadata and overview', () => {
        expect(data.BAMBOO_INFO.id).toBe('bamboo-craft');
        expect(data.BAMBOO_INFO.title).toContain('Bamboo');
        expect(data.BAMBOO_INFO.originRegions).toContain('North-East');
        expect(data.BAMBOO_INFO.history).toContain('traditional');
    });

    it('has key regional craft and process sections', () => {
        expect(Array.isArray(data.REGIONAL_CRAFTS)).toBe(true);
        expect(data.REGIONAL_CRAFTS.length).toBeGreaterThanOrEqual(4);
        expect(Array.isArray(data.PROCESS_STEPS)).toBe(true);
        expect(data.PROCESS_STEPS.length).toBeGreaterThanOrEqual(5);
    });

    it('contains gallery, sustainability, and references', () => {
        expect(Array.isArray(data.GALLERY_ITEMS)).toBe(true);
        expect(data.GALLERY_ITEMS.length).toBeGreaterThanOrEqual(3);
        expect(Array.isArray(data.SUSTAINABILITY_POINTS)).toBe(true);
        expect(data.SUSTAINABILITY_POINTS.length).toBeGreaterThanOrEqual(3);
        expect(Array.isArray(data.REFERENCES)).toBe(true);
        expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
    });
});
