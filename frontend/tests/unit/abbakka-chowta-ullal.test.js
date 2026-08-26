import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readAbbakkaFile(file) {
    return readFileSync(
        resolve(__dirname, '../../../frontend/abbakka-chowta-ullal', file),
        'utf-8'
    );
}

function loadAbbakkaData() {
    const code = readAbbakkaFile('abbakka-data.js');
    const fn = new Function(
        code + '\nreturn { ABBAKKA_PROFILE_STATS, ABBAKKA_HIGHLIGHTS, ABBAKKA_SECTIONS, ABBAKKA_EVIDENCE_VS_RETELLING, ABBAKKA_TIMELINE, ABBAKKA_SOURCES };'
    );
    return fn();
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../../frontend/search-index.js'),
        'utf-8'
    );
}

function readWomenData() {
    return readFileSync(
        resolve(__dirname, '../../../frontend/forgotten-women-of-indian-history/women-data.js'),
        'utf-8'
    );
}

describe('Rani Abbakka Chowta Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readAbbakkaFile('index.html');
        js = readAbbakkaFile('abbakka.js');
        css = readAbbakkaFile('abbakka.css');
    });

    it('renders title, hero section, and coastal badges', () => {
        expect(html).toContain('Rani Abbakka Chowta I');
        expect(html).toContain('The Courageous Queen of Ullal Who Resisted Portuguese Expansion');
        expect(html).toContain('Defender of the Pepper Coast');
        expect(html).toContain('class="abbakka-hero"');
    });

    it('displays required quick facts fields', () => {
        expect(html).toContain('Sovereign Reign Period');
        expect(html).toContain('Royal Capital Ports');
        expect(html).toContain('Ruling Dynasty');
        expect(html).toContain('Portuguese Attacks Repelled');
        expect(html).toContain('Succession System');
        expect(html).toContain('Anti-Colonial Coalitions');
    });

    it('documents historical chapters, evidence vs retelling, timeline, and sources', () => {
        expect(html).toContain('Preserving Spice Independence against Maritime Hegemonies');
        expect(html).toContain('History, Trade Geopolitics &amp; Portuguese Campaigns');
        expect(html).toContain('Historical Evidence vs. Popular Folklore &amp; Retellings');
        expect(html).toContain('Chronological Timeline of Ullal\'s Resistance');
        expect(html).toContain('Primary Sources &amp; Scholarly References');
    });

    it('embeds Google Maps Ullal location view', () => {
        expect(html).toContain('title="Ullal Spice Port Map"');
        expect(html).toContain('google.com/maps/embed');
    });

    it('includes tab navigation, timeline container, and evidence comparison grid', () => {
        expect(html).toContain('id="tabBtnOverview"');
        expect(html).toContain('id="tabBtnSections"');
        expect(html).toContain('id="tabBtnEvidence"');
        expect(html).toContain('id="tabBtnTimeline"');
        expect(html).toContain('id="tabBtnMap"');
        expect(html).toContain('id="tabBtnSources"');
        expect(html).toContain('id="evidenceGrid"');
    });

    it('includes accessible back navigation', () => {
        expect(html).toContain('Back to All Destinations');
        expect(html).toContain('href="../../index.html"');
    });

    it('references local abbakka.css and abbakka.js', () => {
        expect(html).toContain('href="abbakka.css"');
        expect(html).toContain('src="abbakka.js"');
        expect(html).toContain('src="abbakka-data.js"');
    });

    it('contains theme CSS variables and scoped selectors', () => {
        expect(css).toContain('--abbakka-teal');
        expect(css).toContain('--abbakka-amber');
        expect(css).toContain('--abbakka-blue');
        expect(css).toContain('.abbakka-body');
        expect(css).toContain('.abbakka-hero');
    });

    it('contains client-side interactions in JavaScript', () => {
        expect(js).toContain('initTabs');
        expect(js).toContain('renderSections');
        expect(js).toContain('renderEvidenceVsRetelling');
        expect(js).toContain('renderTimeline');
        expect(js).toContain('renderSources');
        expect(js).toContain('initThemeToggle');
    });
});

describe('Rani Abbakka Chowta Profile — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadAbbakkaData();
    });

    it('verifies profile metadata facts', () => {
        expect(data.ABBAKKA_PROFILE_STATS.name).toBe('Rani Abbakka Chowta I');
        expect(data.ABBAKKA_PROFILE_STATS.capital).toContain('Ullal');
        expect(data.ABBAKKA_PROFILE_STATS.spouse).toContain('Bangarasa');
        expect(data.ABBAKKA_PROFILE_STATS.opponents).toContain('Portuguese');
    });

    it('contains historical chapters', () => {
        expect(data.ABBAKKA_SECTIONS.length).toBeGreaterThanOrEqual(4);
        const campaigns = data.ABBAKKA_SECTIONS.find(s => s.id.includes('skirmishes'));
        expect(campaigns).toBeDefined();
    });

    it('contains evidence vs retelling comparison points', () => {
        expect(data.ABBAKKA_EVIDENCE_VS_RETELLING.length).toBeGreaterThanOrEqual(3);
        const arrows = data.ABBAKKA_EVIDENCE_VS_RETELLING.find(e => e.topic.includes('Arrows'));
        expect(arrows).toBeDefined();
    });

    it('contains chronological timeline events', () => {
        expect(data.ABBAKKA_TIMELINE.length).toBeGreaterThanOrEqual(4);
        expect(data.ABBAKKA_TIMELINE[4].year).toContain('1568');
    });

    it('contains academic sources & citations', () => {
        expect(data.ABBAKKA_SOURCES.length).toBeGreaterThanOrEqual(3);
        const karnataka = data.ABBAKKA_SOURCES.find(s => s.citation.includes('Karnataka'));
        expect(karnataka).toBeDefined();
    });
});

describe('Rani Abbakka Chowta Profile — Explorer Integrations', () => {
    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('frontend/abbakka-chowta-ullal/index.html');
        expect(searchIndex).toContain('Abbakka');
    });

    it('is registered in forgotten-women-of-indian-history/women-data.js with url property', () => {
        const womenData = readWomenData();
        expect(womenData).toContain('id: "abbakka-chowta"');
        expect(womenData).toContain('url: "../abbakka-chowta-ullal/"');
    });
});
