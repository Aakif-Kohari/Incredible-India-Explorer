import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadAcData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/ashoka-chakra-explorer/ac-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { AC_INFO, AC_HISTORY, AC_ELIGIBILITY, AC_MEDAL_DESIGN, AC_HEROISM_TYPES, AC_HEROES, AC_TIMELINE, AC_FACTS };'
    );
    return fn();
}

describe('Ashoka Chakra Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadAcData();
    });

    describe('AC_INFO metadata', () => {
        it('contains correct award metadata and statistics', () => {
            expect(data.AC_INFO.id).toBe('ashoka-chakra');
            expect(data.AC_INFO.totalRecipients).toBe(90);
            expect(data.AC_INFO.symbolism).toContain('Ashoka');
            expect(Array.isArray(data.AC_INFO.quickStats)).toBe(true);
            expect(data.AC_INFO.quickStats.length).toBe(6);
        });
    });

    describe('AC_HISTORY & MEDAL_DESIGN', () => {
        it('contains history, peacetime significance, and medal specs', () => {
            expect(data.AC_HISTORY.overview).toBeDefined();
            expect(data.AC_HISTORY.peacetimeSignificance).toBeDefined();
            expect(data.AC_MEDAL_DESIGN.obverse).toContain('Ashoka Chakra');
            expect(data.AC_MEDAL_DESIGN.ribbon).toContain('Green');
        });
    });

    describe('AC_HEROES catalog', () => {
        it('contains iconic recipients including Neerja Bhanot, Sandeep Unnikrishnan, and Kamlesh Kumari', () => {
            expect(Array.isArray(data.AC_HEROES)).toBe(true);
            expect(data.AC_HEROES.length).toBeGreaterThanOrEqual(6);

            const neerja = data.AC_HEROES.find(h => h.id === 'neerja-bhanot');
            const sandeep = data.AC_HEROES.find(h => h.id === 'sandeep-unnikrishnan');
            const kamlesh = data.AC_HEROES.find(h => h.id === 'kamlesh-kumari');

            expect(neerja).toBeDefined();
            expect(sandeep).toBeDefined();
            expect(kamlesh).toBeDefined();
            expect(neerja.famousWords).toContain('Do your duty');
            expect(sandeep.famousWords).toContain('Do not come up');
        });
    });

    describe('AC_TIMELINE & FACTS', () => {
        it('has timeline milestones and interesting facts', () => {
            expect(Array.isArray(data.AC_TIMELINE)).toBe(true);
            expect(data.AC_TIMELINE.length).toBeGreaterThanOrEqual(5);
            expect(Array.isArray(data.AC_FACTS)).toBe(true);
            expect(data.AC_FACTS.length).toBe(6);
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated into awards-of-india-explorer landing page', () => {
            const indexHtml = readFileSync(
                resolve(__dirname, '../../frontend/awards-of-india-explorer/index.html'),
                'utf-8'
            );
            expect(indexHtml).toContain('../ashoka-chakra-explorer/index.html');
            expect(indexHtml).toContain('Ashoka Chakra');
        });
    });
});
