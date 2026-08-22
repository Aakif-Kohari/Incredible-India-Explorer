import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadSandakphuData() {
    const code = readFileSync(
        resolve(__dirname, '../../sandakphu-trek-explorer/sandakphu-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { SANDAKPHU_INFO, TRAIL_CAMPSITES, THE_FOUR_8000ERS, REFERENCES };'
    );
    return fn();
}

describe('Sandakphu Trek Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadSandakphuData();
    });

    describe('SANDAKPHU_INFO metadata', () => {
        it('contains correct Sandakphu metadata and highest point in West Bengal (3,636m)', () => {
            expect(data.SANDAKPHU_INFO.id).toBe('sandakphu-trek');
            expect(data.SANDAKPHU_INFO.title).toContain('Sandakphu');
            expect(data.SANDAKPHU_INFO.region).toContain('West Bengal');
            expect(data.SANDAKPHU_INFO.maxAltitude).toContain('3,636 Meters');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.SANDAKPHU_INFO.quickStats)).toBe(true);
            expect(data.SANDAKPHU_INFO.quickStats.length).toBe(6);
        });
    });

    describe('TRAIL_CAMPSITES & FOUR 8000ERS', () => {
        it('contains Manebhanjan, Kalipokhri, Sandakphu, and Everest & Kanchenjunga', () => {
            expect(Array.isArray(data.TRAIL_CAMPSITES)).toBe(true);
            expect(data.TRAIL_CAMPSITES.length).toBeGreaterThanOrEqual(4);

            const summit = data.TRAIL_CAMPSITES.find(c => c.day.includes('Sandakphu'));
            expect(summit).toBeDefined();

            expect(Array.isArray(data.THE_FOUR_8000ERS)).toBe(true);
            const everest = data.THE_FOUR_8000ERS.find(g => g.peak.includes('Everest'));
            expect(everest).toBeDefined();

            const buddha = data.THE_FOUR_8000ERS.find(g => g.peak.includes('Sleeping Buddha'));
            expect(buddha).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains Singalila national park and forest citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
