import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadPvcData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/param-vir-chakra-explorer/pvc-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { PVC_INFO, MEDAL_HISTORY, PVC_ELIGIBILITY, PVC_SELECTION_PROCESS, PVC_BATTLES, PVC_HEROES, CONFLICTS_TIMELINE };'
    );
    return fn();
}

describe('Param Vir Chakra Gallery & Heroes Explorer — Data & Integration Tests', () => {
    let data;

    beforeAll(() => {
        data = loadPvcData();
    });

    describe('PVC_INFO metadata', () => {
        it('contains correct award metadata and total awardees count', () => {
            expect(data.PVC_INFO.id).toBe('param-vir-chakra');
            expect(data.PVC_INFO.totalRecipients).toBe(21);
            expect(data.PVC_INFO.designer).toContain('Savitri Khanolkar');
            expect(data.PVC_INFO.symbolism).toContain('Vajra');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.PVC_INFO.quickStats)).toBe(true);
            expect(data.PVC_INFO.quickStats.length).toBe(6);
        });
    });

    describe('MEDAL_HISTORY', () => {
        it('contains overview, design origin, and motto', () => {
            expect(data.MEDAL_HISTORY.overview).toBeDefined();
            expect(data.MEDAL_HISTORY.designOrigin).toBeDefined();
            expect(data.MEDAL_HISTORY.motto).toBeDefined();
        });
    });

    describe('PVC_ELIGIBILITY & SELECTION', () => {
        it('defines eligibility categories and selection process steps', () => {
            expect(Array.isArray(data.PVC_ELIGIBILITY.categories)).toBe(true);
            expect(data.PVC_ELIGIBILITY.categories.length).toBe(4);
            expect(Array.isArray(data.PVC_SELECTION_PROCESS.steps)).toBe(true);
            expect(data.PVC_SELECTION_PROCESS.steps.length).toBe(5);
        });
    });

    describe('PVC_BATTLES', () => {
        it('contains famous battles and military operations', () => {
            expect(Array.isArray(data.PVC_BATTLES)).toBe(true);
            expect(data.PVC_BATTLES.length).toBeGreaterThanOrEqual(6);
            expect(data.PVC_BATTLES[0].title).toContain('Badgam');
        });
    });

    describe('PVC_HEROES catalog', () => {
        it('contains all 21 Param Vir Chakra recipients with citations', () => {
            expect(Array.isArray(data.PVC_HEROES)).toBe(true);
            expect(data.PVC_HEROES.length).toBe(21);
        });

        it('includes Major Somnath Sharma, Captain Vikram Batra, and CQMH Abdul Hamid', () => {
            const somnath = data.PVC_HEROES.find(h => h.id === 'somnath-sharma');
            const batra = data.PVC_HEROES.find(h => h.id === 'vikram-batra');
            const hamid = data.PVC_HEROES.find(h => h.id === 'abdul-hamid');
            expect(somnath).toBeDefined();
            expect(batra).toBeDefined();
            expect(hamid).toBeDefined();
            expect(somnath.famousWords).toContain('last man and the last round');
            expect(batra.famousWords).toContain('Yeh Dil Maange More');
        });
    });

    describe('CONFLICTS_TIMELINE', () => {
        it('covers 7 major historical conflicts', () => {
            expect(Array.isArray(data.CONFLICTS_TIMELINE)).toBe(true);
            expect(data.CONFLICTS_TIMELINE.length).toBe(7);
        });
    });

    describe('Landing Page Integration', () => {
        it('is linked correctly from awards-of-india-explorer landing page', () => {
            const indexHtml = readFileSync(
                resolve(__dirname, '../../frontend/awards-of-india-explorer/index.html'),
                'utf-8'
            );
            expect(indexHtml).toContain('../param-vir-chakra-explorer/index.html');
            expect(indexHtml).toContain('Param Vir Chakra');
        });
    });
});
