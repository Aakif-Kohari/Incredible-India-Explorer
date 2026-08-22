/**
 * indian-sports-trophy-design-explorer.test.js
 * Unit tests for the Indian Sports Trophy Design Explorer page (issue #2557).
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/indian-sports-trophy-design-explorer', file),
        'utf-8'
    );
}

function readSportsPage() {
    return readFileSync(
        resolve(__dirname, '../../frontend/sports/sports.html'),
        'utf-8'
    );
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../frontend/search-index.js'),
        'utf-8'
    );
}

describe('Indian Sports Trophy Design Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="itd-hero"');
        expect(html).toContain('<h1');
        expect(html).toContain('Indian Sports Trophy Design');
        expect(html).toContain('Symbols');
        expect(html).toContain('Meaning');
        expect(html).toContain('Durand Cup');
    });

    it('contains all required content sections from the issue', () => {
        const sections = [
            'design',
            'shapes',
            'materials',
            'symbols',
            'sports',
            'names',
            'evolution',
            'diagram',
            'sources'
        ];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
            expect(html).toContain(`data-tab="${id}"`);
        });
    });

    it('contains all required tab navigation buttons', () => {
        const tabs = [
            'Anatomy',
            'Shapes &amp; Forms',
            'Materials',
            'National Symbols',
            'Sport Elements',
            'Names &amp; Inscriptions',
            'Evolution',
            'Interactive Diagram',
            'Sources'
        ];
        tabs.forEach(label => {
            expect(html).toContain(label);
        });
    });

    it('documents trophy shapes and forms', () => {
        expect(html).toContain('Grecian urn');
        expect(html).toContain('statuette');
        expect(html).toContain('snake boat');
        expect(html).toContain('The Open Bowl');
    });

    it('documents trophy materials', () => {
        expect(html).toContain('Silver');
        expect(html).toContain('Gold');
        expect(html).toContain('Bronze');
        expect(html).toContain('wooden abacus');
        expect(html).toContain('Gajendra Prasad Sahu');
    });

    it('documents national symbols used on trophies', () => {
        expect(html).toContain('Ashoka Lion Capital');
        expect(html).toContain('Ashoka Chakra');
        expect(html).toContain('Satyameva Jayate');
        expect(html).toContain('Tricolour');
        expect(html).toContain('State Emblem Act, 2005');
    });

    it('documents sport-specific elements', () => {
        expect(html).toContain('Cricket');
        expect(html).toContain('Football');
        expect(html).toContain('Arjuna');
        expect(html).toContain('Dronacharya');
        expect(html).toContain('Dhyan Chand');
    });

    it('documents names and inscriptions', () => {
        expect(html).toContain('Ranjitsinhji');
        expect(html).toContain('Maharaja of Santosh');
        expect(html).toContain('Sir Henry Mortimer Durand');
        expect(html).toContain('unique feature of community life in Travancore Cochin');
        expect(html).toContain('rolling trophies');
    });

    it('documents the design evolution with a timeline', () => {
        expect(html).toContain('1888');
        expect(html).toContain('1934');
        expect(html).toContain('1952');
        expect(html).toContain('1961');
        expect(html).toContain('1991–92');
        expect(html).toContain('2009');
        expect(html).toContain('2021');
    });

    it('includes historical context', () => {
        expect(html).toContain('Colonial era');
        expect(html).toContain('Republic');
        expect(html).toContain('Modern era');
    });

    it('has a semantic heading hierarchy (single h1, multiple h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(8);
    });

    it('links the shared stylesheet, page stylesheet, and script', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="script.js"');
    });
});

describe('Indian Sports Trophy Design Explorer — Interactive Diagram', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains an accessible diagram with an aria label', () => {
        expect(html).toContain('class="itd-diagram"');
        expect(html).toContain('role="img"');
        expect(html).toContain('aria-label="Illustrated diagram');
    });

    it('contains clickable marker buttons for every trophy part', () => {
        const parts = ['crown', 'bowl', 'emblem', 'handle', 'band', 'stem', 'base', 'motto'];
        parts.forEach((part, index) => {
            expect(html).toContain(`class="itd-marker itd-marker-${index + 1}"`);
            expect(html).toContain(`data-part="${part}"`);
            expect(html).toContain(`aria-label="View details: `);
        });
    });

    it('provides a legend with accessible buttons for each part', () => {
        const legendNames = ['The Crown Finial', 'The Bowl', 'The Sport Emblem', 'The Handle', 'The Inscription Band', 'The Stem', 'The Base Plinth', 'The Motto Ribbon'];
        legendNames.forEach(name => {
            expect(html).toContain(name);
        });
        expect(html).toContain('itd-legend-btn');
        expect(html).toContain('itd-legend-num');
    });

    it('contains a detail panel that the diagram updates', () => {
        expect(html).toContain('id="itd-part-panel"');
        expect(html).toContain('id="itd-part-title"');
        expect(html).toContain('id="itd-part-example"');
        expect(html).toContain('id="itd-part-body"');
        expect(html).toContain('aria-live="polite"');
    });

    it('uses only decorative SVG and no images (avoids alt/asset issues)', () => {
        expect(html).toContain('<svg');
        expect(html).toContain('aria-hidden="true"');
        expect(html).not.toMatch(/<img\b/);
    });
});

describe('Indian Sports Trophy Design Explorer — Assets', () => {
    it('includes a non-empty stylesheet with the expected selectors', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.itd-hero');
        expect(css).toContain('.itd-section');
        expect(css).toContain('.itd-timeline');
        expect(css).toContain('.itd-marker');
        expect(css).toContain('.itd-legend-btn');
        expect(css).toContain('.itd-diagram');
        expect(css).toContain('.glass-card');
    });

    it('includes a valid interactive script with the required functions', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('initNavigation');
        expect(js).toContain('initTabs');
        expect(js).toContain('initDiagram');
        expect(js).toContain('initScrollTop');
        expect(js).toContain("document.addEventListener('DOMContentLoaded'");
        expect(js).toContain('TROPHY_PARTS');
    });

    it('defines every diagram part in the script data', () => {
        const js = readExplorerFile('script.js');
        const parts = ['crown', 'bowl', 'emblem', 'handle', 'band', 'stem', 'base', 'motto'];
        parts.forEach(part => {
            expect(js).toContain(`${part}: {`);
        });
    });
});

describe('Indian Sports Trophy Design Explorer — Landing Page Integration', () => {
    it('is listed as a card on the Sports landing page', () => {
        const sports = readSportsPage();
        expect(sports).toContain('Indian Sports Trophy Design');
        expect(sports).toContain('../indian-sports-trophy-design-explorer/index.html');
    });

    it('links to the explorer page using a relative path from the sports page', () => {
        const sports = readSportsPage();
        expect(sports).toMatch(/href="\.\.\/indian-sports-trophy-design-explorer\/index\.html"/);
    });

    it('is registered in the site search index', () => {
        const index = readSearchIndex();
        expect(index).toContain('Indian Sports Trophy Design Explorer');
        expect(index).toContain('"frontend/indian-sports-trophy-design-explorer/index.html"');
    });
});
