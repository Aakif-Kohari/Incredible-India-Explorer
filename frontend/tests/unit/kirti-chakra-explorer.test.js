import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadKcData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/kirti-chakra-explorer/kc-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { KC_INFO, KC_HISTORY, KC_ELIGIBILITY, KC_MEDAL_DESIGN, KC_HEROIC_ACTS, KC_RECIPIENTS, KC_TIMELINE, KC_FAQS };'
    );
    return fn();
}

describe('Kirti Chakra Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadKcData();
    });

    describe('KC_INFO metadata', () => {
        it('contains correct award metadata and statistics', () => {
            expect(data.KC_INFO.id).toBe('kirti-chakra');
            expect(data.KC_INFO.totalRecipients).toBe(480);
            expect(data.KC_INFO.ribbonColor).toContain('two orange');
            expect(Array.isArray(data.KC_INFO.quickStats)).toBe(true);
            expect(data.KC_INFO.quickStats.length).toBe(6);
        });
    });

    describe('KC_HISTORY & MEDAL_DESIGN', () => {
        it('contains history, peacetime significance, and silver medal design specs', () => {
            expect(data.KC_HISTORY.overview).toBeDefined();
            expect(data.KC_HISTORY.peacetimeSignificance).toBeDefined();
            expect(data.KC_MEDAL_DESIGN.obverse).toContain('Ashoka Chakra');
            expect(data.KC_MEDAL_DESIGN.ribbon).toContain('two orange');
        });
    });

    describe('KC_RECIPIENTS catalog', () => {
        it('contains heroes like Major Anuj Sood, Captain Anshuman Singh, and Sapper Prakash Jadhav', () => {
            expect(Array.isArray(data.KC_RECIPIENTS)).toBe(true);
            expect(data.KC_RECIPIENTS.length).toBeGreaterThanOrEqual(5);

            const anuj = data.KC_RECIPIENTS.find(h => h.id === 'anuj-sood');
            const anshuman = data.KC_RECIPIENTS.find(h => h.id === 'anshuman-singh');

            expect(anuj).toBeDefined();
            expect(anshuman).toBeDefined();
            expect(anuj.famousWords).toContain('Duty before self');
            expect(anshuman.citation).toContain('Siachen Glacier');
        });
    });

    describe('KC_TIMELINE & FAQS', () => {
        it('has timeline milestones and interactive FAQs array', () => {
            expect(Array.isArray(data.KC_TIMELINE)).toBe(true);
            expect(data.KC_TIMELINE.length).toBeGreaterThanOrEqual(5);
            expect(Array.isArray(data.KC_FAQS)).toBe(true);
            expect(data.KC_FAQS.length).toBe(6);
        });
    });

    describe('Landing Page Integration', () => {
        it('is integrated into awards-of-india-explorer landing page', () => {
            const indexHtml = readFileSync(
                resolve(__dirname, '../../frontend/awards-of-india-explorer/index.html'),
                'utf-8'
            );
            expect(indexHtml).toContain('../kirti-chakra-explorer/index.html');
            expect(indexHtml).toContain('Kirti Chakra');
        });
    });
});
