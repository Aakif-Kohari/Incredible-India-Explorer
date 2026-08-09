/**
 * battle-of-kili-explorer.test.js
 * Unit tests for the Battle of Kili Explorer page.
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
        resolve(__dirname, '../../frontend/battle-of-kili-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/history/battles/index.html'),
        'utf-8'
    );
}

describe('Battle of Kili Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="kili-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Battle of Kili');
        expect(html).toContain('1299 CE');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['background', 'timeline', 'commanders', 'strategy', 'outcome', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains all required section topics', () => {
        ['Background', 'Timeline', 'Commanders', 'Battle Strategy', 'Outcome', 'References'].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains key historical and structural details', () => {
        expect(html).toContain('Alauddin');
        expect(html).toContain('Mongol');
        expect(html).toContain('Qutlugh Khwaja');
        expect(html).toContain('Zafar Khan');
        expect(html).toContain('Delhi');
        expect(html).toContain('Strategy');
        expect(html).toContain('Defense');
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

describe('Battle of Kili Explorer — Assets', () => {
    it('includes a non-empty stylesheet', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.kili-hero');
        expect(css).toContain('.kili-timeline');
        expect(css).toContain('.kili-references');
    });

    it('includes a valid interactive script with required features', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('registerSearchItems');
        expect(js).toContain('Journey');
        expect(js).toContain('kili-modal');
        expect(js).toContain('app:route-changed');
    });
});

describe('Battle of Kili — Landing Page Integration', () => {
    it('is listed as a featured explorer card on the Historic Battles of India landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('Battle of Kili');
        expect(index).toContain('../../battle-of-kili-explorer/index.html');
        expect(index).toContain('featured-explorer-card');
    });

    it('matches the existing featured card pattern (badge, heading, button)', () => {
        const index = readLandingPage();
        const cardLinkIndex = index.indexOf('battle-of-kili-explorer');
        expect(cardLinkIndex).toBeGreaterThan(-1);
        const sectionStart = index.lastIndexOf('featured-explorer-section', cardLinkIndex);
        const card = index.slice(sectionStart, cardLinkIndex + 500);
        expect(card).toContain('featured-explorer-badge');
        expect(card).toContain('featured-explorer-btn');
        expect(card).toContain('Alauddin');
    });
});
