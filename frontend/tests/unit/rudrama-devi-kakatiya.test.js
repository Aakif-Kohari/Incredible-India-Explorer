import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readRudramaFile(file) {
    return readFileSync(
        resolve(__dirname, '../../../frontend/rudrama-devi-kakatiya', file),
        'utf-8'
    );
}

function loadRudramaData() {
    const code = readRudramaFile('rudrama-data.js');
    const fn = new Function(
        code + '\nreturn { RUDRAMA_PROFILE_STATS, RUDRAMA_HIGHLIGHTS, RUDRAMA_SECTIONS, RUDRAMA_EVIDENCE_VS_RETELLING, RUDRAMA_TIMELINE, RUDRAMA_SOURCES };'
    );
    return fn();
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../../frontend/search-index.js'),
        'utf-8'
    );
}

describe('Queen Rudrama Devi Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readRudramaFile('index.html');
        js = readRudramaFile('rudrama-devi.js');
        css = readRudramaFile('rudrama-devi.css');
    });

    it('renders title, hero section, and state badges', () => {
        expect(html).toContain('Queen Rudrama Devi');
        expect(html).toContain('The Illustrious Kakatiya Queen Who Ruled the Deccan');
        expect(html).toContain('Designated Rudradeva Maharaja');
        expect(html).toContain('class="rudrama-hero"');
    });

    it('displays required quick facts fields', () => {
        expect(html).toContain('Sovereign Reign Period');
        expect(html).toContain('Imperial Capital');
        expect(html).toContain('Royal Parentage');
        expect(html).toContain('Invasions Repelled');
        expect(html).toContain('Military-Revenue System');
        expect(html).toContain('Designated Successor');
    });

    it('documents historical chapters, evidence vs retelling, timeline, and sources', () => {
        expect(html).toContain('Decisive Female Leadership in Medieval Deccan');
        expect(html).toContain('History, Administrative Reforms &amp; Deccan Geopolitics');
        expect(html).toContain('Historical Evidence vs. Popular Literary Portrayals');
        expect(html).toContain('Chronological Timeline of the Kakatiya Golden Era');
        expect(html).toContain('Primary Sources &amp; Scholarly References');
    });

    it('embeds Google Maps Warangal location view', () => {
        expect(html).toContain('title="Kakatiya Capital Warangal Map"');
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

    it('references local rudrama-devi.css and rudrama-devi.js', () => {
        expect(html).toContain('href="rudrama-devi.css"');
        expect(html).toContain('src="rudrama-devi.js"');
        expect(html).toContain('src="rudrama-data.js"');
    });

    it('contains theme CSS variables and scoped selectors', () => {
        expect(css).toContain('--rudrama-gold');
        expect(css).toContain('--rudrama-amber');
        expect(css).toContain('--rudrama-crimson');
        expect(css).toContain('.rudrama-body');
        expect(css).toContain('.rudrama-hero');
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

describe('Queen Rudrama Devi Profile — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadRudramaData();
    });

    it('verifies profile metadata facts', () => {
        expect(data.RUDRAMA_PROFILE_STATS.name).toBe('Queen Rudrama Devi');
        expect(data.RUDRAMA_PROFILE_STATS.dynasty).toContain('Kakatiya');
        expect(data.RUDRAMA_PROFILE_STATS.successor).toContain('Prataparudra II');
        expect(data.RUDRAMA_PROFILE_STATS.opponents).toContain('Mahadeva');
    });

    it('contains historical chapters', () => {
        expect(data.RUDRAMA_SECTIONS.length).toBeGreaterThanOrEqual(4);
        const campaigns = data.RUDRAMA_SECTIONS.find(s => s.id.includes('campaigns'));
        expect(campaigns).toBeDefined();
    });

    it('contains evidence vs retelling comparison points', () => {
        expect(data.RUDRAMA_EVIDENCE_VS_RETELLING.length).toBeGreaterThanOrEqual(3);
        const titles = data.RUDRAMA_EVIDENCE_VS_RETELLING.find(e => e.topic.includes('Titles'));
        expect(titles).toBeDefined();
    });

    it('contains chronological timeline events', () => {
        expect(data.RUDRAMA_TIMELINE.length).toBeGreaterThanOrEqual(4);
        expect(data.RUDRAMA_TIMELINE[3].year).toContain('1289');
    });

    it('contains academic sources & citations', () => {
        expect(data.RUDRAMA_SOURCES.length).toBeGreaterThanOrEqual(3);
        const kakatiyaBook = data.RUDRAMA_SOURCES.find(s => s.citation.includes('Kākatiyas of Warangal'));
        expect(kakatiyaBook).toBeDefined();
    });
});

describe('Queen Rudrama Devi Profile — Explorer Integrations', () => {
    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('frontend/rudrama-devi-kakatiya/index.html');
        expect(searchIndex).toContain('Rudrama Devi');
    });
});
