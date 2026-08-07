/**
 * battle-of-chandawar-explorer.test.js
 * Unit tests for the Battle of Chandawar Explorer page.
 * Validates required sections, key historical content, accessibility,
 * and landing page card integration on the Historic Battles of India page.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/battle-of-chandawar-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/history/battles/index.html'),
        'utf-8'
    );
}

describe('Battle of Chandawar Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="chandawar-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Battle of Chandawar');
        expect(html).toContain('1194 CE');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['background', 'timeline', 'belligerents', 'outcome', 'significance', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains all required section topics', () => {
        ['Background', 'Timeline', 'Belligerents', 'Outcome', 'Historical Significance', 'References'].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains key historical and structural details', () => {
        expect(html).toContain('Muhammad Ghori');
        expect(html).toContain('Jayachandra');
        expect(html).toContain('Gahadavala');
        expect(html).toContain('Yamuna');
        expect(html).toContain('Kannauj');
        expect(html).toContain('Varanasi');
        expect(html).toContain('Qutb al-Din Aibak');
        expect(html).toContain('Elephant');
    });

    it('has a semantic heading hierarchy (single h1, multiple section h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(5);
    });

    it('uses HTTPS OG image URLs', () => {
        const ogImages = html.match(/property="og:image" content="([^"]*)"/g) || [];
        expect(ogImages.length).toBeGreaterThanOrEqual(1);
        ogImages.forEach(tag => {
            expect(tag).toMatch(/https:\/\//);
        });
    });

    it('links the shared stylesheet, page stylesheet, and script', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="script.js"');
    });
});

describe('Battle of Chandawar Explorer — Assets', () => {
    it('includes a non-empty stylesheet', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.chandawar-hero');
        expect(css).toContain('.chandawar-timeline');
        expect(css).toContain('.chandawar-references');
    });

    it('includes a valid interactive script with required features', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('registerSearchItems');
        expect(js).toContain('Journey');
        expect(js).toContain('chandawar-modal');
        expect(js).toContain('app:route-changed');
    });
});

describe('Battle of Chandawar — Landing Page Integration', () => {
    it('is listed as a featured explorer card on the Historic Battles of India landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('Battle of Chandawar');
        expect(index).toContain('../../battle-of-chandawar-explorer/index.html');
        expect(index).toContain('featured-explorer-card');
    });

    it('matches the existing featured card pattern (badge, heading, button)', () => {
        const index = readLandingPage();
        const cardLinkIndex = index.indexOf('battle-of-chandawar-explorer');
        expect(cardLinkIndex).toBeGreaterThan(-1);
        const sectionStart = index.lastIndexOf('featured-explorer-section', cardLinkIndex);
        const card = index.slice(sectionStart, cardLinkIndex + 500);
        expect(card).toContain('featured-explorer-badge');
        expect(card).toContain('featured-explorer-btn');
        expect(card).toContain('Jayachandra');
    });
});
