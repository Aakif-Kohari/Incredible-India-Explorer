import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadDokraData() {
    const code = readFileSync(
        resolve(__dirname, '../../dokra-art-explorer/dokra-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { DOKRA_INFO, HISTORY_CHAPTERS, LOST_WAX_PROCESS, ARTISAN_COMMUNITIES, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Dokra Art Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadDokraData();
    });

    describe('DOKRA_INFO metadata', () => {
        it('contains correct Dokra metadata', () => {
            expect(data.DOKRA_INFO.id).toBe('dokra-art');
            expect(data.DOKRA_INFO.title).toContain('Dokra');
            expect(data.DOKRA_INFO.technique).toContain('Lost-Wax');
            expect(data.DOKRA_INFO.eraOrigin).toContain('Indus Valley');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.DOKRA_INFO.quickStats)).toBe(true);
            expect(data.DOKRA_INFO.quickStats.length).toBe(6);
        });
    });

    describe('HISTORY_CHAPTERS & LOST_WAX_PROCESS', () => {
        it('contains history chapters and lost-wax process steps', () => {
            expect(Array.isArray(data.HISTORY_CHAPTERS)).toBe(true);
            expect(data.HISTORY_CHAPTERS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.LOST_WAX_PROCESS)).toBe(true);
            expect(data.LOST_WAX_PROCESS.length).toBeGreaterThanOrEqual(5);
        });
    });

    describe('ARTISAN_COMMUNITIES', () => {
        it('contains multiple artisan communities', () => {
            expect(Array.isArray(data.ARTISAN_COMMUNITIES)).toBe(true);
            expect(data.ARTISAN_COMMUNITIES.length).toBeGreaterThanOrEqual(3);
            expect(data.ARTISAN_COMMUNITIES.some(c => c.name.includes('Dokra Damar'))).toBe(true);
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
