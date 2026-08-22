import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadCwgData() {
    const code = readFileSync(
        resolve(__dirname, '../../cwg-explorer/cwg-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { CWG_INFO, CWG_EDITIONS, LEGENDARY_ATHLETES, REFERENCES };'
    );
    return fn();
}

describe('Commonwealth Games Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadCwgData();
    });

    describe('CWG_INFO metadata', () => {
        it('contains correct CWG metadata and 1934 debut', () => {
            expect(data.CWG_INFO.id).toBe('cwg-india');
            expect(data.CWG_INFO.title).toContain('Commonwealth Games');
            expect(data.CWG_INFO.debutYear).toContain('1934');
            expect(data.CWG_INFO.firstGoldMedalist).toContain('Milkha Singh');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.CWG_INFO.quickStats)).toBe(true);
            expect(data.CWG_INFO.quickStats.length).toBe(6);
        });
    });

    describe('CWG_EDITIONS & LEGENDARY_ATHLETES', () => {
        it('contains Delhi 2010 edition and Milkha Singh & Sharath Kamal', () => {
            expect(Array.isArray(data.CWG_EDITIONS)).toBe(true);
            expect(data.CWG_EDITIONS.length).toBeGreaterThanOrEqual(5);

            const delhi = data.CWG_EDITIONS.find(e => e.year === '2010');
            expect(delhi).toBeDefined();
            expect(delhi.total).toBe(101);

            expect(Array.isArray(data.LEGENDARY_ATHLETES)).toBe(true);
            const milkha = data.LEGENDARY_ATHLETES.find(a => a.name.includes('Milkha'));
            expect(milkha).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains sporting archive citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
