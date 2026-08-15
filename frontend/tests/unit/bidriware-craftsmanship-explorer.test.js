import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadBidriwareData() {
    const code = readFileSync(
        resolve(__dirname, '../../bidriware-craftsmanship-explorer/bidriware-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { BIDRIWARE_INFO, PROCESS_STEPS, TRADITIONAL_MOTIFS, ARTISAN_COMMUNITY, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Bidriware Craftsmanship Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadBidriwareData();
    });

    describe('BIDRIWARE_INFO metadata', () => {
        it('contains correct Bidriware metadata and GI tag', () => {
            expect(data.BIDRIWARE_INFO.id).toBe('bidriware-craftsmanship');
            expect(data.BIDRIWARE_INFO.title).toContain('Bidriware');
            expect(data.BIDRIWARE_INFO.originRegion).toContain('Karnataka');
            expect(data.BIDRIWARE_INFO.giTagStatus).toContain('GI');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.BIDRIWARE_INFO.quickStats)).toBe(true);
            expect(data.BIDRIWARE_INFO.quickStats.length).toBe(6);
        });
    });

    describe('PROCESS_STEPS & TRADITIONAL_MOTIFS', () => {
        it('contains manufacturing steps and traditional motifs', () => {
            expect(Array.isArray(data.PROCESS_STEPS)).toBe(true);
            expect(data.PROCESS_STEPS.length).toBeGreaterThanOrEqual(5);
            expect(Array.isArray(data.TRADITIONAL_MOTIFS)).toBe(true);
            expect(data.TRADITIONAL_MOTIFS.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('ARTISAN_COMMUNITY', () => {
        it('contains artisan community details', () => {
            expect(data.ARTISAN_COMMUNITY.title).toBeDefined();
            expect(data.ARTISAN_COMMUNITY.description).toContain('Bidar');
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
