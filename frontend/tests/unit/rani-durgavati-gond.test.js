import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readDurgavatiFile(file) {
    return readFileSync(
        resolve(__dirname, '../../../frontend/rani-durgavati-gond', file),
        'utf-8'
    );
}

function loadDurgavatiData() {
    const code = readDurgavatiFile('durgavati-data.js');
    const fn = new Function(
        code + '\nreturn { DURGAVATI_PROFILE_STATS, DURGAVATI_HIGHLIGHTS, DURGAVATI_SECTIONS, DURGAVATI_EVIDENCE_VS_RETELLING, DURGAVATI_TIMELINE, DURGAVATI_SOURCES };'
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

describe('Rani Durgavati Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readDurgavatiFile('index.html');
        js = readDurgavatiFile('durgavati.js');
        css = readDurgavatiFile('durgavati.css');
    });

    it('renders title, hero section, and alliance badges', () => {
        expect(html).toContain('Rani Durgavati');
        expect(html).toContain('The Valiant Gond Queen Who Defended Garha-Katanga');
        expect(html).toContain('Chandel-Gond Royal Alliance');
        expect(html).toContain('class="durgavati-hero"');
    });

    it('displays required quick facts fields', () => {
        expect(html).toContain('Queen Regency Period');
        expect(html).toContain('Royal Fortified Capitals');
        expect(html).toContain('Ancestry &amp; Lineage');
        expect(html).toContain('Invasions Repelled');
        expect(html).toContain('Garha Campaign Opponent');
        expect(html).toContain('Minor Gond Sovereign');
    });

    it('documents historical chapters, evidence vs retelling, timeline, and sources', () => {
        expect(html).toContain('Defensive Resistance &amp; Public Statecraft in Central India');
        expect(html).toContain('History, Administration &amp; Defensive Campaigns');
        expect(html).toContain('Historical Evidence vs. Later Folklore &amp; Traditions');
        expect(html).toContain('Chronological Timeline of Garha-Katanga');
        expect(html).toContain('Primary Sources &amp; Archaeological References');
    });

    it('embeds Google Maps Jabalpur location view', () => {
        expect(html).toContain('title="Gond Capital Jabalpur Map"');
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

    it('references local durgavati.css and durgavati.js', () => {
        expect(html).toContain('href="durgavati.css"');
        expect(html).toContain('src="durgavati.js"');
        expect(html).toContain('src="durgavati-data.js"');
    });

    it('contains theme CSS variables and scoped selectors', () => {
        expect(css).toContain('--durgavati-emerald');
        expect(css).toContain('--durgavati-amber');
        expect(css).toContain('--durgavati-crimson');
        expect(css).toContain('.durgavati-body');
        expect(css).toContain('.durgavati-hero');
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

describe('Rani Durgavati Profile — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadDurgavatiData();
    });

    it('verifies profile metadata facts', () => {
        expect(data.DURGAVATI_PROFILE_STATS.name).toBe('Rani Durgavati');
        expect(data.DURGAVATI_PROFILE_STATS.capital).toContain('Singorgarh');
        expect(data.DURGAVATI_PROFILE_STATS.son).toContain('Bir Narayan');
        expect(data.DURGAVATI_PROFILE_STATS.opponents).toContain('Asaf Khan');
    });

    it('contains historical chapters', () => {
        expect(data.DURGAVATI_SECTIONS.length).toBeGreaterThanOrEqual(4);
        const battle = data.DURGAVATI_SECTIONS.find(s => s.id.includes('battle'));
        expect(battle).toBeDefined();
    });

    it('contains evidence vs retelling comparison points', () => {
        expect(data.DURGAVATI_EVIDENCE_VS_RETELLING.length).toBeGreaterThanOrEqual(3);
        const topic = data.DURGAVATI_EVIDENCE_VS_RETELLING.find(e => e.topic.includes('Command'));
        expect(topic).toBeDefined();
    });

    it('contains chronological timeline events', () => {
        expect(data.DURGAVATI_TIMELINE.length).toBeGreaterThanOrEqual(4);
        expect(data.DURGAVATI_TIMELINE[4].year).toContain('1564');
    });

    it('contains academic sources & citations', () => {
        expect(data.DURGAVATI_SOURCES.length).toBeGreaterThanOrEqual(3);
        const akbarnama = data.DURGAVATI_SOURCES.find(s => s.citation.includes('Akbarnama'));
        expect(akbarnama).toBeDefined();
    });
});

describe('Rani Durgavati Profile — Explorer Integrations', () => {
    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('frontend/rani-durgavati-gond/index.html');
        expect(searchIndex).toContain('Rani Durgavati');
    });

    it('is registered in forgotten-women-of-indian-history/women-data.js with url property', () => {
        const womenData = readWomenData();
        expect(womenData).toContain('id: "rani-durgavati"');
        expect(womenData).toContain('url: "../rani-durgavati-gond/"');
    });
});
