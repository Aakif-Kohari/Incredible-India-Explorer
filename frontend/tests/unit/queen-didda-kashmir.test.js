import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readDiddaFile(file) {
    return readFileSync(
        resolve(__dirname, '../../../frontend/queen-didda-kashmir', file),
        'utf-8'
    );
}

function loadDiddaData() {
    const code = readDiddaFile('didda-data.js');
    const fn = new Function(
        code + '\nreturn { DIDDA_PROFILE_STATS, DIDDA_HIGHLIGHTS, DIDDA_CHAPTERS, DIDDA_EVIDENCE_VS_PORTRAYAL, DIDDA_TIMELINE, DIDDA_SOURCES };'
    );
    return fn();
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../../frontend/search-index.js'),
        'utf-8'
    );
}

function readLoharaHTML() {
    return readFileSync(
        resolve(__dirname, '../../../frontend/loharaDynasty/lohara.html'),
        'utf-8'
    );
}

describe('Queen Didda of Kashmir Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readDiddaFile('index.html');
        js = readDiddaFile('didda.js');
        css = readDiddaFile('didda.css');
    });

    it('renders title, hero section, and royal badges', () => {
        expect(html).toContain('Queen Didda of Kashmir');
        expect(html).toContain('Ruler of Kashmir');
        expect(html).toContain('Princess of Lohara &amp; Shahi Lineage');
        expect(html).toContain('class="didda-hero"');
    });

    it('displays required quick facts fields', () => {
        expect(html).toContain('Reign &amp; Regency Period');
        expect(html).toContain('Realm &amp; Capital (Diddapura)');
        expect(html).toContain('Royal Ancestry');
        expect(html).toContain('Dynastic Transition');
        expect(html).toContain('Numismatic Coinage');
        expect(html).toContain('Chosen Lohara Successor');
    });

    it('documents governance chapters, evidence vs portrayal, timeline, and sources', () => {
        expect(html).toContain('Core Pillars of Her Rule');
        expect(html).toContain('Life, Political Strategies &amp; Dynastic Transition');
        expect(html).toContain('Historical Evidence vs. Later Literary Portrayals');
        expect(html).toContain('Chronological Timeline of Didda\'s Life &amp; Reign');
        expect(html).toContain('Primary Sources &amp; Scholarly References');
    });

    it('embeds Google Maps Kashmir location view', () => {
        expect(html).toContain('title="Kashmir Region Map"');
        expect(html).toContain('google.com/maps/embed');
    });

    it('includes tab navigation, timeline container, and evidence comparison grid', () => {
        expect(html).toContain('id="tabBtnOverview"');
        expect(html).toContain('id="tabBtnChapters"');
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

    it('references local didda.css and didda.js', () => {
        expect(html).toContain('href="didda.css"');
        expect(html).toContain('src="didda.js"');
        expect(html).toContain('src="didda-data.js"');
    });

    it('contains theme CSS variables and scoped selectors', () => {
        expect(css).toContain('--didda-emerald');
        expect(css).toContain('--didda-gold');
        expect(css).toContain('--didda-purple');
        expect(css).toContain('.didda-body');
        expect(css).toContain('.didda-hero');
    });

    it('contains client-side interactions in JavaScript', () => {
        expect(js).toContain('initTabs');
        expect(js).toContain('renderChapters');
        expect(js).toContain('renderEvidenceVsPortrayal');
        expect(js).toContain('renderTimeline');
        expect(js).toContain('renderSources');
        expect(js).toContain('initThemeToggle');
    });
});

describe('Queen Didda of Kashmir Profile — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadDiddaData();
    });

    it('verifies profile metadata facts', () => {
        expect(data.DIDDA_PROFILE_STATS.name).toBe('Queen Didda of Kashmir');
        expect(data.DIDDA_PROFILE_STATS.reignPeriod).toContain('958');
        expect(data.DIDDA_PROFILE_STATS.dynasty).toContain('Lohara');
        expect(data.DIDDA_PROFILE_STATS.spouse).toContain('Ksemagupta');
        expect(data.DIDDA_PROFILE_STATS.succession).toContain('Samgramaraja');
    });

    it('contains governance chapters', () => {
        expect(data.DIDDA_CHAPTERS.length).toBeGreaterThanOrEqual(4);
        const lohara = data.DIDDA_CHAPTERS.find(c => c.id.includes('lohara'));
        expect(lohara).toBeDefined();
    });

    it('contains evidence vs portrayal comparison points', () => {
        expect(data.DIDDA_EVIDENCE_VS_PORTRAYAL.length).toBeGreaterThanOrEqual(3);
        const limp = data.DIDDA_EVIDENCE_VS_PORTRAYAL.find(e => e.topic.includes('Physical'));
        expect(limp).toBeDefined();
    });

    it('contains chronological timeline events', () => {
        expect(data.DIDDA_TIMELINE.length).toBeGreaterThanOrEqual(5);
        expect(data.DIDDA_TIMELINE[0].year).toContain('924');
    });

    it('contains academic sources & citations', () => {
        expect(data.DIDDA_SOURCES.length).toBeGreaterThanOrEqual(3);
        const rajatarangini = data.DIDDA_SOURCES.find(s => s.citation.includes('Rajatarangini'));
        expect(rajatarangini).toBeDefined();
    });
});

describe('Queen Didda of Kashmir Profile — Explorer Integrations', () => {
    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('frontend/queen-didda-kashmir/index.html');
        expect(searchIndex).toContain('Queen Didda');
    });

    it('is linked in lohara.html', () => {
        const loharaHtml = readLoharaHTML();
        expect(loharaHtml).toContain('queen-didda-kashmir/index.html');
    });
});
