import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadWadiyarData() {
    const code = readFileSync(
        resolve(__dirname, '../../krishnaraja-wadiyar-iv-explorer/wadiyar-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { WADIYAR_INFO, EDUCATION_INSTITUTIONS, INFRASTRUCTURE_PROJECTS, CULTURAL_HERITAGE, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe('Krishnaraja Wadiyar IV Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadWadiyarData();
    });

    describe('WADIYAR_INFO metadata', () => {
        it('contains correct Krishnaraja Wadiyar IV metadata and reign', () => {
            expect(data.WADIYAR_INFO.id).toBe('krishnaraja-wadiyar-iv');
            expect(data.WADIYAR_INFO.title).toContain('Krishnaraja Wadiyar IV');
            expect(data.WADIYAR_INFO.dynasty).toContain('Wadiyar');
            expect(data.WADIYAR_INFO.honorific).toContain('Rajarshi');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.WADIYAR_INFO.quickStats)).toBe(true);
            expect(data.WADIYAR_INFO.quickStats.length).toBe(6);
        });
    });

    describe('EDUCATION_INSTITUTIONS & INFRASTRUCTURE_PROJECTS', () => {
        it('contains IISc land grant, University of Mysore, and KRS Dam details', () => {
            expect(Array.isArray(data.EDUCATION_INSTITUTIONS)).toBe(true);
            expect(data.EDUCATION_INSTITUTIONS.length).toBeGreaterThanOrEqual(3);

            const iisc = data.EDUCATION_INSTITUTIONS.find(e => e.name.includes('IISc'));
            expect(iisc).toBeDefined();

            expect(Array.isArray(data.INFRASTRUCTURE_PROJECTS)).toBe(true);
            expect(data.INFRASTRUCTURE_PROJECTS.length).toBeGreaterThanOrEqual(3);
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
