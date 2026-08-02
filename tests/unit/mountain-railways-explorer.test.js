import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadRailwaysData() {
    const code = readFileSync(
        resolve(__dirname, '../../frontend/mountain-railways-explorer/railways-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { RAILWAYS_INFO, ENGINEERING_MARVELS, MOUNTAIN_RAILWAYS, GALLERY_IMAGES };'
    );
    return fn();
}

describe('UNESCO Mountain Railways of India Explorer — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadRailwaysData();
    });

    describe('RAILWAYS_INFO metadata', () => {
        it('contains correct UNESCO metadata and railway counts', () => {
            expect(data.RAILWAYS_INFO.id).toBe('mountain-railways');
            expect(data.RAILWAYS_INFO.totalRailways).toBe(3);
            expect(data.RAILWAYS_INFO.highestStation).toContain('Ghum');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.RAILWAYS_INFO.quickStats)).toBe(true);
            expect(data.RAILWAYS_INFO.quickStats.length).toBe(6);
        });
    });

    describe('ENGINEERING_MARVELS', () => {
        it('contains overview, mechanisms, and status', () => {
            expect(data.ENGINEERING_MARVELS.overview).toBeDefined();
            expect(data.ENGINEERING_MARVELS.mechanisms).toBeDefined();
            expect(data.ENGINEERING_MARVELS.conservationStatus).toBeDefined();
        });
    });

    describe('MOUNTAIN_RAILWAYS catalog', () => {
        it('covers Darjeeling Himalayan, Nilgiri Mountain, and Kalka-Shimla railways', () => {
            expect(Array.isArray(data.MOUNTAIN_RAILWAYS)).toBe(true);
            expect(data.MOUNTAIN_RAILWAYS.length).toBe(3);

            const dhr = data.MOUNTAIN_RAILWAYS.find(r => r.id === 'darjeeling-himalayan');
            const nmr = data.MOUNTAIN_RAILWAYS.find(r => r.id === 'nilgiri-mountain');
            const ksr = data.MOUNTAIN_RAILWAYS.find(r => r.id === 'kalka-shimla');

            expect(dhr).toBeDefined();
            expect(nmr).toBeDefined();
            expect(ksr).toBeDefined();

            expect(dhr.unescoYear).toBe(1999);
            expect(nmr.unescoYear).toBe(2005);
            expect(ksr.unescoYear).toBe(2008);
        });
    });

    describe('GALLERY_IMAGES', () => {
        it('is a non-empty array of gallery images', () => {
            expect(Array.isArray(data.GALLERY_IMAGES)).toBe(true);
            expect(data.GALLERY_IMAGES.length).toBe(3);
        });
    });
});
