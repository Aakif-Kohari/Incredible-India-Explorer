import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadNalandaData() {
    const code = readFileSync(
        resolve(__dirname, '../../nalanda-mahavihara-explorer/nalanda-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { NALANDA_INFO, CAMPUS_COMPONENTS, CELEBRATED_SCHOLARS, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe('Nalanda Mahavihara Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadNalandaData();
    });

    describe('NALANDA_INFO metadata', () => {
        it('contains correct Nalanda Mahavihara metadata and UNESCO status', () => {
            expect(data.NALANDA_INFO.id).toBe('nalanda-mahavihara');
            expect(data.NALANDA_INFO.title).toContain('Nalanda Mahavihara');
            expect(data.NALANDA_INFO.location).toContain('Bihar');
            expect(data.NALANDA_INFO.unescoStatus).toContain('UNESCO');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.NALANDA_INFO.quickStats)).toBe(true);
            expect(data.NALANDA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('CAMPUS_COMPONENTS & CELEBRATED_SCHOLARS', () => {
        it('contains Dharmaganja library, Sariputra stupa, and Xuanzang & Aryabhata', () => {
            expect(Array.isArray(data.CAMPUS_COMPONENTS)).toBe(true);
            expect(data.CAMPUS_COMPONENTS.length).toBeGreaterThanOrEqual(4);

            const library = data.CAMPUS_COMPONENTS.find(c => c.name.includes('Dharmaganja'));
            expect(library).toBeDefined();

            expect(Array.isArray(data.CELEBRATED_SCHOLARS)).toBe(true);
            const xuanzang = data.CELEBRATED_SCHOLARS.find(s => s.name.includes('Xuanzang'));
            expect(xuanzang).toBeDefined();

            const aryabhata = data.CELEBRATED_SCHOLARS.find(s => s.name.includes('Aryabhata'));
            expect(aryabhata).toBeDefined();
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
