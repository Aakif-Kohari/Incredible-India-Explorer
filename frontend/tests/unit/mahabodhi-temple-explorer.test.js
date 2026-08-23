import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadMahabodhiData() {
    const code = readFileSync(
        resolve(__dirname, '../../mahabodhi-temple-explorer/mahabodhi-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { MAHABODHI_INFO, SACRED_COMPONENTS, SEVEN_WEEKS_TIMELINE, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe('Mahabodhi Temple Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadMahabodhiData();
    });

    describe('MAHABODHI_INFO metadata', () => {
        it('contains correct Mahabodhi Temple metadata and UNESCO status', () => {
            expect(data.MAHABODHI_INFO.id).toBe('mahabodhi-temple');
            expect(data.MAHABODHI_INFO.title).toContain('Mahabodhi Temple');
            expect(data.MAHABODHI_INFO.location).toContain('Bodh Gaya');
            expect(data.MAHABODHI_INFO.unescoStatus).toContain('UNESCO');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.MAHABODHI_INFO.quickStats)).toBe(true);
            expect(data.MAHABODHI_INFO.quickStats.length).toBe(6);
        });
    });

    describe('SACRED_COMPONENTS & SEVEN_WEEKS_TIMELINE', () => {
        it('contains Bodhi tree, Vajrasana, and 7 sacred weeks', () => {
            expect(Array.isArray(data.SACRED_COMPONENTS)).toBe(true);
            expect(data.SACRED_COMPONENTS.length).toBeGreaterThanOrEqual(4);

            const tree = data.SACRED_COMPONENTS.find(c => c.name.includes('Bodhi Tree'));
            expect(tree).toBeDefined();

            const throne = data.SACRED_COMPONENTS.find(c => c.name.includes('Vajrasana'));
            expect(throne).toBeDefined();

            expect(Array.isArray(data.SEVEN_WEEKS_TIMELINE)).toBe(true);
            expect(data.SEVEN_WEEKS_TIMELINE.length).toBe(7);
        });
    });

    describe('TIMELINE_EVENTS & REFERENCES', () => {
        it('contains history timeline and reference citations', () => {
            expect(Array.isArray(data.TIMELINE_EVENTS)).toBe(true);
            expect(data.TIMELINE_EVENTS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
