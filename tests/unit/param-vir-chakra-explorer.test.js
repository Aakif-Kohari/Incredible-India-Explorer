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
        code + '\nreturn { PVC_INFO, MEDAL_HISTORY, PVC_HEROES, CONFLICTS_TIMELINE };'
    );
    return fn();
}

describe('Param Vir Chakra Gallery & Heroes Explorer — Data Tests', () => {
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

    describe('PVC_HEROES catalog', () => {
        it('is a non-empty array of heroes with citations', () => {
            expect(Array.isArray(data.PVC_HEROES)).toBe(true);
            expect(data.PVC_HEROES.length).toBeGreaterThanOrEqual(6);
        });

        it('includes Major Somnath Sharma and Captain Vikram Batra', () => {
            const somnath = data.PVC_HEROES.find(h => h.id === 'somnath-sharma');
            const batra = data.PVC_HEROES.find(h => h.id === 'vikram-batra');
            expect(somnath).toBeDefined();
            expect(batra).toBeDefined();
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
});
