import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadDayaraData() {
    const code = readFileSync(
        resolve(__dirname, '../../dayara-bugyal-trek-explorer/dayara-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { DAYARA_INFO, TRAIL_CAMPSITES, MOUNTAIN_PANORAMAS, REFERENCES };'
    );
    return fn();
}

describe('Dayara Bugyal Trek Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadDayaraData();
    });

    describe('DAYARA_INFO metadata', () => {
        it('contains correct Dayara Bugyal metadata and Bakaria Top altitude 3,700m', () => {
            expect(data.DAYARA_INFO.id).toBe('dayara-bugyal-trek');
            expect(data.DAYARA_INFO.title).toContain('Dayara Bugyal');
            expect(data.DAYARA_INFO.region).toContain('Uttarakhand');
            expect(data.DAYARA_INFO.maxAltitude).toContain('3,700 Meters');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.DAYARA_INFO.quickStats)).toBe(true);
            expect(data.DAYARA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('TRAIL_CAMPSITES & BANDARPOONCH PANORAMA', () => {
        it('contains Raithal, Gui, Bakaria Top, and Mt. Bandarpoonch', () => {
            expect(Array.isArray(data.TRAIL_CAMPSITES)).toBe(true);
            expect(data.TRAIL_CAMPSITES.length).toBeGreaterThanOrEqual(4);

            const top = data.TRAIL_CAMPSITES.find(c => c.day.includes('Bakaria Top'));
            expect(top).toBeDefined();

            expect(Array.isArray(data.MOUNTAIN_PANORAMAS)).toBe(true);
            const bandar = data.MOUNTAIN_PANORAMAS.find(p => p.peak.includes('Bandarpoonch'));
            expect(bandar).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains tourism board and gazetteer citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
