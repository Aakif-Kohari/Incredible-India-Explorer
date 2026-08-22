import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadBhojaData() {
    const code = readFileSync(
        resolve(__dirname, '../../bhoja-malwa-explorer/bhoja-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { BHOJA_INFO, SCHOLARLY_TREATISES, BHOJPUR_ARCHITECTURE, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe('Bhoja of Malwa Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadBhojaData();
    });

    describe('BHOJA_INFO metadata', () => {
        it('contains correct Raja Bhoja metadata and Paramara dynasty', () => {
            expect(data.BHOJA_INFO.id).toBe('bhoja-malwa');
            expect(data.BHOJA_INFO.title).toContain('Bhoja of Malwa');
            expect(data.BHOJA_INFO.dynasty).toContain('Paramara');
            expect(data.BHOJA_INFO.architecturalMasterpiece).toContain('Bhojeshwar Temple');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.BHOJA_INFO.quickStats)).toBe(true);
            expect(data.BHOJA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('SCHOLARLY_TREATISES & BHOJPUR_ARCHITECTURE', () => {
        it('contains Samarangana Sutradhara and Bhojeshwar temple details', () => {
            expect(Array.isArray(data.SCHOLARLY_TREATISES)).toBe(true);
            expect(data.SCHOLARLY_TREATISES.length).toBeGreaterThanOrEqual(4);

            const samarangana = data.SCHOLARLY_TREATISES.find(t => t.title.includes('Samarangana'));
            expect(samarangana).toBeDefined();

            expect(data.BHOJPUR_ARCHITECTURE.templeName).toContain('Bhojeshwar');
            expect(Array.isArray(data.BHOJPUR_ARCHITECTURE.architectureNotes)).toBe(true);
        });
    });

    describe('TIMELINE_EVENTS & REFERENCES', () => {
        it('contains reign timeline and reference citations', () => {
            expect(Array.isArray(data.TIMELINE_EVENTS)).toBe(true);
            expect(data.TIMELINE_EVENTS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
