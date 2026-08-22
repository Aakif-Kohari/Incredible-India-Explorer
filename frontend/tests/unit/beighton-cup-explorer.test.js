import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadBeightonData() {
    const code = readFileSync(
        resolve(__dirname, '../../beighton-cup-explorer/beighton-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { BEIGHTON_INFO, HISTORIC_CHAMPIONS, TIMELINE_EVENTS, REFERENCES };'
    );
    return fn();
}

describe('Beighton Cup Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadBeightonData();
    });

    describe('BEIGHTON_INFO metadata', () => {
        it('contains correct Beighton Cup metadata and founding year 1895 in Kolkata', () => {
            expect(data.BEIGHTON_INFO.id).toBe('beighton-cup');
            expect(data.BEIGHTON_INFO.title).toContain('Beighton Cup');
            expect(data.BEIGHTON_INFO.foundedYear).toBe('1895 CE');
            expect(data.BEIGHTON_INFO.venue).toContain('Kolkata');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.BEIGHTON_INFO.quickStats)).toBe(true);
            expect(data.BEIGHTON_INFO.quickStats.length).toBe(6);
        });
    });

    describe('HISTORIC_CHAMPIONS & MAJOR DHYAN CHAND', () => {
        it('contains Mohun Bagan 14 titles and Jhansi Heroes Dhyan Chand record', () => {
            expect(Array.isArray(data.HISTORIC_CHAMPIONS)).toBe(true);
            expect(data.HISTORIC_CHAMPIONS.length).toBeGreaterThanOrEqual(4);

            const bagan = data.HISTORIC_CHAMPIONS.find(c => c.club.includes('Mohun Bagan'));
            expect(bagan).toBeDefined();
            expect(bagan.titles).toBe(14);

            const jhansi = data.HISTORIC_CHAMPIONS.find(c => c.club.includes('Jhansi'));
            expect(jhansi).toBeDefined();
        });
    });

    describe('TIMELINE_EVENTS & REFERENCES', () => {
        it('contains tournament timeline and reference citations', () => {
            expect(Array.isArray(data.TIMELINE_EVENTS)).toBe(true);
            expect(data.TIMELINE_EVENTS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
