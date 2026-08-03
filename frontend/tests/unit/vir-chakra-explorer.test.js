import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadVrData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/vir-chakra-explorer/vr-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { VR_INFO, VR_HISTORY, VR_ELIGIBILITY, VR_MEDAL_DESIGN, VR_HEROISM_TYPES, VR_AWARDEES, VR_TIMELINE, VR_FACTS };'
    );
    return fn();
}

describe('Vir Chakra Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadVrData();
    });

    describe('VR_INFO metadata', () => {
        it('contains correct award metadata and statistics', () => {
            expect(data.VR_INFO.id).toBe('vir-chakra');
            expect(data.VR_INFO.totalRecipients).toBe(1322);
            expect(data.VR_INFO.ribbonColor).toContain('dark blue');
            expect(Array.isArray(data.VR_INFO.quickStats)).toBe(true);
            expect(data.VR_INFO.quickStats.length).toBe(6);
        });
    });

    describe('VR_HISTORY & MEDAL_DESIGN', () => {
        it('contains history, wartime significance, and silver star medal design specs', () => {
            expect(data.VR_HISTORY.overview).toBeDefined();
            expect(data.VR_HISTORY.wartimeSignificance).toBeDefined();
            expect(data.VR_MEDAL_DESIGN.obverse).toContain('Five-pointed');
            expect(data.VR_MEDAL_DESIGN.ribbon).toContain('half dark blue');
        });
    });

    describe('VR_AWARDEES catalog', () => {
        it('contains heroes like Abhinandan Varthaman, AB Devayya, and Balwan Singh', () => {
            expect(Array.isArray(data.VR_AWARDEES)).toBe(true);
            expect(data.VR_AWARDEES.length).toBeGreaterThanOrEqual(5);

            const abhinandan = data.VR_AWARDEES.find(h => h.id === 'abhinandan-varthaman');
            const devayya = data.VR_AWARDEES.find(h => h.id === 'ajjamada-devayya');

            expect(abhinandan).toBeDefined();
            expect(devayya).toBeDefined();
            expect(abhinandan.citation).toContain('F-16');
            expect(devayya.citation).toContain('Starfighter');
        });
    });

    describe('VR_TIMELINE & FACTS', () => {
        it('has timeline milestones and interesting facts', () => {
            expect(Array.isArray(data.VR_TIMELINE)).toBe(true);
            expect(data.VR_TIMELINE.length).toBeGreaterThanOrEqual(5);
            expect(Array.isArray(data.VR_FACTS)).toBe(true);
            expect(data.VR_FACTS.length).toBe(6);
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated into awards-of-india-explorer landing page', () => {
            const indexHtml = readFileSync(
                resolve(__dirname, '../../frontend/awards-of-india-explorer/index.html'),
                'utf-8'
            );
            expect(indexHtml).toContain('../vir-chakra-explorer/index.html');
            expect(indexHtml).toContain('Vir Chakra');
        });
    });
});
