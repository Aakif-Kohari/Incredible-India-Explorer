import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadSikhData() {
    const code = readFileSync(
        resolve(__dirname, '../../sikh-empire-explorer/sikh-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { SIKH_EMPIRE_INFO, TIMELINE_DATA, RULERS_DATA, CONTRIBUTIONS_DATA, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Sikh Empire Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadSikhData();
    });

    describe('SIKH_EMPIRE_INFO metadata', () => {
        it('contains correct Sikh Empire attributes', () => {
            expect(data.SIKH_EMPIRE_INFO.id).toBe('sikh-empire');
            expect(data.SIKH_EMPIRE_INFO.name).toContain('Sikh Empire');
            expect(data.SIKH_EMPIRE_INFO.founder).toContain('Ranjit Singh');
            expect(data.SIKH_EMPIRE_INFO.period).toContain('1799');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.SIKH_EMPIRE_INFO.quickStats)).toBe(true);
            expect(data.SIKH_EMPIRE_INFO.quickStats.length).toBe(6);
        });
    });

    describe('TIMELINE_DATA & RULERS_DATA', () => {
        it('contains milestone timeline items and key rulers including Ranjit Singh & Hari Singh Nalwa', () => {
            expect(Array.isArray(data.TIMELINE_DATA)).toBe(true);
            expect(data.TIMELINE_DATA.length).toBeGreaterThanOrEqual(5);
            expect(Array.isArray(data.RULERS_DATA)).toBe(true);
            expect(data.RULERS_DATA.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('CONTRIBUTIONS_DATA', () => {
        it('contains required contribution fields', () => {
            expect(data.CONTRIBUTIONS_DATA.overview).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.faujIKhas).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.harmandirSahib).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.secularGovernance).toBeDefined();
            expect(data.CONTRIBUTIONS_DATA.borderSecurity).toBeDefined();
        });
    });

    describe('GALLERY_IMAGES & REFERENCES', () => {
        it('has non-empty gallery and references', () => {
            expect(Array.isArray(data.GALLERY_IMAGES)).toBe(true);
            expect(data.GALLERY_IMAGES.length).toBeGreaterThanOrEqual(2);
            expect(Array.isArray(data.REFERENCES)).toBe(true);
            expect(data.REFERENCES.length).toBeGreaterThanOrEqual(2);
        });
    });
});
