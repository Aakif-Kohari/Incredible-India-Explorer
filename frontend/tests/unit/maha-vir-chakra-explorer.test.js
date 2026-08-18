import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadMvcData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/maha-vir-chakra-explorer/mvc-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { MVC_INFO, MVC_HISTORY, MVC_ELIGIBILITY, MVC_MEDAL_DESIGN, MVC_OPERATIONS, MVC_AWARDEES, MVC_TIMELINE, MVC_FACTS };'
    );
    return fn();
}

describe('Maha Vir Chakra Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadMvcData();
    });

    describe('MVC_INFO metadata', () => {
        it('contains correct award metadata and statistics', () => {
            expect(data.MVC_INFO.id).toBe('maha-vir-chakra');
            expect(data.MVC_INFO.totalRecipients).toBe(218);
            expect(data.MVC_INFO.barToMvcRecipients).toBe(6);
            expect(Array.isArray(data.MVC_INFO.quickStats)).toBe(true);
            expect(data.MVC_INFO.quickStats.length).toBe(6);
        });
    });

    describe('MVC_HISTORY & MEDAL_DESIGN', () => {
        it('contains overview, wartime significance, and silver medal design specs', () => {
            expect(data.MVC_HISTORY.overview).toBeDefined();
            expect(data.MVC_HISTORY.wartimeSignificance).toBeDefined();
            expect(data.MVC_MEDAL_DESIGN.obverse).toContain('Five-pointed');
            expect(data.MVC_MEDAL_DESIGN.ribbon).toContain('half-orange');
        });
    });

    describe('MVC_AWARDEES catalog', () => {
        it('contains iconic awardees including Major Chewang Rinchen, Brigadier Rajinder Singh, and Colonel Santosh Babu', () => {
            expect(Array.isArray(data.MVC_AWARDEES)).toBe(true);
            expect(data.MVC_AWARDEES.length).toBeGreaterThanOrEqual(5);

            const chewang = data.MVC_AWARDEES.find(h => h.id === 'chewang-rinchen');
            const rajinder = data.MVC_AWARDEES.find(h => h.id === 'rajinder-singh');
            const santosh = data.MVC_AWARDEES.find(h => h.id === 'santosh-babu-mvc');

            expect(chewang).toBeDefined();
            expect(rajinder).toBeDefined();
            expect(santosh).toBeDefined();
            expect(chewang.conflict).toContain('Bar to MVC');
            expect(rajinder.famousWords).toContain('last man and last bullet');
        });
    });

    describe('MVC_TIMELINE & FACTS', () => {
        it('has timeline milestones and interesting facts', () => {
            expect(Array.isArray(data.MVC_TIMELINE)).toBe(true);
            expect(data.MVC_TIMELINE.length).toBeGreaterThanOrEqual(6);
            expect(Array.isArray(data.MVC_FACTS)).toBe(true);
            expect(data.MVC_FACTS.length).toBe(6);
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated into awards-of-india-explorer landing page', () => {
            const indexHtml = readFileSync(
                resolve(__dirname, '../../frontend/awards-of-india-explorer/index.html'),
                'utf-8'
            );
            expect(indexHtml).toContain('../maha-vir-chakra-explorer/index.html');
            expect(indexHtml).toContain('Maha Vir Chakra');
        });
    });
});
