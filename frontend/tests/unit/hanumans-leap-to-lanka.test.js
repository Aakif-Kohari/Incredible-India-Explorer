import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadHanumanLeapData() {
    const code = readFileSync(
        resolve(__dirname, '../../hanumans-leap-to-lanka/hanuman-leap-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { HANUMAN_LEAP_INFO, JOURNEY_STAGES, CULTURAL_PERSPECTIVES, REFERENCES };'
    );
    return fn();
}

describe('Hanuman Leap to Lanka Story Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadHanumanLeapData();
    });

    describe('HANUMAN_LEAP_INFO metadata', () => {
        it('contains correct Hanuman Leap metadata, Mount Mahendra launch, and 100 Yojanas span', () => {
            expect(data.HANUMAN_LEAP_INFO.id).toBe('hanumans-leap-to-lanka');
            expect(data.HANUMAN_LEAP_INFO.title).toContain("Hanuman's Leap");
            expect(data.HANUMAN_LEAP_INFO.launchPoint).toContain('Mount Mahendra');
            expect(data.HANUMAN_LEAP_INFO.distance).toContain('100 Yojanas');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.HANUMAN_LEAP_INFO.quickStats)).toBe(true);
            expect(data.HANUMAN_LEAP_INFO.quickStats.length).toBe(6);
        });
    });

    describe('JOURNEY_STAGES & CULTURAL_PERSPECTIVES', () => {
        it('contains 6 chronological journey stages and Sundara Kanda perspective', () => {
            expect(Array.isArray(data.JOURNEY_STAGES)).toBe(true);
            expect(data.JOURNEY_STAGES.length).toBe(6);

            const surasa = data.JOURNEY_STAGES.find(s => s.title.includes('Surasa') || s.stage.includes('Surasa'));
            expect(surasa).toBeDefined();

            expect(Array.isArray(data.CULTURAL_PERSPECTIVES)).toBe(true);
            const sundara = data.CULTURAL_PERSPECTIVES.find(p => p.dimension.includes('Sundara Kanda'));
            expect(sundara).toBeDefined();
        });
    });

    describe('REFERENCES', () => {
        it('contains Valmiki Ramayana Sundara Kanda and Ramcharitmanas citations', () => {
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
