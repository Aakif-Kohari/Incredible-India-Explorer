import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function loadKalighatData() {
    const code = readFileSync(
        resolve(__dirname, '../../kalighat-painting-showcase/kalighat-data.js'),
        'utf-8'
    );
    const fn = new Function(
        code + '\nreturn { KALIGHAT_INFO, HISTORY_CHAPTERS, BRUSHWORK_STEPS, THEMES, ARTIST_COMMUNITY, GALLERY_IMAGES, REFERENCES };'
    );
    return fn();
}

describe('Kalighat Painting Showcase — Data Tests', () => {
    let data;

    beforeAll(() => {
        data = loadKalighatData();
    });

    describe('KALIGHAT_INFO metadata', () => {
        it('contains correct Kalighat metadata', () => {
            expect(data.KALIGHAT_INFO.id).toBe('kalighat-painting');
            expect(data.KALIGHAT_INFO.title).toContain('Kalighat');
            expect(data.KALIGHAT_INFO.originRegion).toContain('Kolkata');
            expect(data.KALIGHAT_INFO.signatureStyle).toContain('stroke');
        });

        it('has quickStats array with 6 items', () => {
            expect(Array.isArray(data.KALIGHAT_INFO.quickStats)).toBe(true);
            expect(data.KALIGHAT_INFO.quickStats.length).toBe(6);
        });
    });

    describe('HISTORY_CHAPTERS & BRUSHWORK_STEPS', () => {
        it('contains history chapters and brushwork steps', () => {
            expect(Array.isArray(data.HISTORY_CHAPTERS)).toBe(true);
            expect(data.HISTORY_CHAPTERS.length).toBeGreaterThanOrEqual(4);
            expect(Array.isArray(data.BRUSHWORK_STEPS)).toBe(true);
            expect(data.BRUSHWORK_STEPS.length).toBeGreaterThanOrEqual(4);
        });
    });

    describe('THEMES', () => {
        it('contains divine and social-satire themes', () => {
            expect(Array.isArray(data.THEMES)).toBe(true);
            expect(data.THEMES.length).toBeGreaterThanOrEqual(4);
            expect(data.THEMES.some(t => t.category === 'Divine')).toBe(true);
            expect(data.THEMES.some(t => t.category === 'Social Satire')).toBe(true);
        });
    });

    describe('ARTIST_COMMUNITY', () => {
        it('contains artist community details', () => {
            expect(data.ARTIST_COMMUNITY.title).toBeDefined();
            expect(data.ARTIST_COMMUNITY.description).toContain('Kalighat');
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
