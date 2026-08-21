/**
 * battle-of-pavan-khind-explorer.test.js
 * Unit tests for the Battle of Pavan Khind Explorer page.
 * Validates required sections, key historical content, accessibility,
 * and landing page card integration on the Historic Battles of India page.
 */

import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/battle-of-pavan-khind-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/history/battles/index.html'),
        'utf-8'
    );
}

describe('Battle of Pavan Khind Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="pavan-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('Battle of Pavan Khind');
        expect(html).toContain('13 July 1660');
    });

    it('contains all required content sections from the issue', () => {
        const sections = ['overview', 'figures', 'tactics', 'outcome', 'legacy', 'timeline', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains all required section topics', () => {
        ['Historical', 'Key Figures', 'Battle Tactics', 'Outcome', 'Legacy', 'Timeline', 'References'].forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('contains the key historical and structural details', () => {
        expect(html).toContain('Baji Prabhu Deshpande');
        expect(html).toContain('Chhatrapati Shivaji Maharaj');
        expect(html).toContain('Siddi Jauhar');
        expect(html).toContain('Panhala');
        expect(html).toContain('Vishalgad');
        expect(html).toContain('Afzal Khan');
        expect(html).toContain('Pratapgad');
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

describe('Battle of Pavan Khind Explorer — Assets', () => {
    it('includes a non-empty stylesheet', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.pavan-hero');
        expect(css).toContain('.pavan-timeline');
        expect(css).toContain('.pavan-references');
    });

    it('includes a valid interactive script with required features', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('registerSearchItems');
        expect(js).toContain('Journey');
        expect(js).toContain('pavan-modal');
        expect(js).toContain('app:route-changed');
    });
});

describe('Battle of Pavan Khind — Landing Page Integration', () => {
    it('is listed as a featured explorer card on the Historic Battles of India landing page', () => {
        const index = readLandingPage();
        expect(index).toContain('Battle of Pavan Khind');
        expect(index).toContain('../../battle-of-pavan-khind-explorer/index.html');
        expect(index).toContain('featured-explorer-card');
    });

    it('matches the existing featured card pattern (badge, heading, button)', () => {
        const index = readLandingPage();
        const cardStart = index.indexOf('battle-of-pavan-khind-explorer');
        expect(cardStart).toBeGreaterThan(-1);
        const card = index.slice(cardStart - 400, cardStart + 400);
        expect(card).toContain('featured-explorer-badge');
        expect(card).toContain('featured-explorer-btn');
        expect(card).toContain('Shivaji');
    });
});