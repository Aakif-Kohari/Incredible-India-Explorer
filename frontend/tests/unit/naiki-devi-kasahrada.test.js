import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readNaikiFile(file) {
    return readFileSync(
        resolve(__dirname, '../../../frontend/naiki-devi-kasahrada', file),
        'utf-8'
    );
}

function loadNaikiData() {
    const code = readNaikiFile('naiki-data.js');
    const fn = new Function(
        code + '\nreturn { NAIKI_PROFILE_STATS, NAIKI_HIGHLIGHTS, NAIKI_SECTIONS, NAIKI_EVIDENCE_VS_RETELLING, NAIKI_TIMELINE, NAIKI_SOURCES };'
    );
    return fn();
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../../frontend/search-index.js'),
        'utf-8'
    );
}

describe('Queen Naiki Devi Profile — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readNaikiFile('index.html');
        js = readNaikiFile('naiki-devi.js');
        css = readNaikiFile('naiki-devi.css');
    });

    it('renders title, hero section, and battle badges', () => {
        expect(html).toContain('Queen Naiki Devi');
        expect(html).toContain('Battle of Kasahrada (1178 CE)');
        expect(html).toContain('Chaulukya (Solanki) Queen Regent');
        expect(html).toContain('class="naiki-hero"');
    });

    it('displays required quick facts fields', () => {
        expect(html).toContain('Battle of Kasahrada Date');
        expect(html).toContain('Region (Gujarat / Rajasthan)');
        expect(html).toContain('Ruling Dynasty');
        expect(html).toContain('Naiki Devi\'s State Role');
        expect(html).toContain('Minor Sovereign King');
        expect(html).toContain('Ghurid Invader Repelled');
    });

    it('documents historical chapters, evidence vs retelling, timeline, and sources', () => {
        expect(html).toContain('Core Accomplishments &amp; Historical Themes');
        expect(html).toContain('Background, Battle Analysis &amp; 12th-Century Gujarat');
        expect(html).toContain('Historical Evidence vs. Later Popular Retellings');
        expect(html).toContain('Chronological Timeline of the 1178 Campaign');
        expect(html).toContain('Primary Sources &amp; Scholarly References');
    });

    it('embeds Google Maps Kasahrada location view', () => {
        expect(html).toContain('title="Battle of Kasahrada Route Map"');
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

    it('references local naiki-devi.css and naiki-devi.js', () => {
        expect(html).toContain('href="naiki-devi.css"');
        expect(html).toContain('src="naiki-devi.js"');
        expect(html).toContain('src="naiki-data.js"');
    });

    it('contains theme CSS variables and scoped selectors', () => {
        expect(css).toContain('--naiki-emerald');
        expect(css).toContain('--naiki-amber');
        expect(css).toContain('--naiki-crimson');
        expect(css).toContain('.naiki-body');
        expect(css).toContain('.naiki-hero');
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

describe('Queen Naiki Devi Profile — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadNaikiData();
    });

    it('verifies profile metadata facts', () => {
        expect(data.NAIKI_PROFILE_STATS.name).toBe('Queen Naiki Devi');
        expect(data.NAIKI_PROFILE_STATS.battleEvent).toContain('1178');
        expect(data.NAIKI_PROFILE_STATS.dynasty).toContain('Chaulukya');
        expect(data.NAIKI_PROFILE_STATS.son).toContain('Mularaja II');
        expect(data.NAIKI_PROFILE_STATS.opponent).toContain('Muhammad Ghori');
    });

    it('contains historical chapters', () => {
        expect(data.NAIKI_SECTIONS.length).toBeGreaterThanOrEqual(4);
        const battle = data.NAIKI_SECTIONS.find(s => s.id.includes('battle'));
        expect(battle).toBeDefined();
    });

    it('contains evidence vs retelling comparison points', () => {
        expect(data.NAIKI_EVIDENCE_VS_RETELLING.length).toBeGreaterThanOrEqual(3);
        const command = data.NAIKI_EVIDENCE_VS_RETELLING.find(e => e.topic.includes('Command'));
        expect(command).toBeDefined();
    });

    it('contains chronological timeline events', () => {
        expect(data.NAIKI_TIMELINE.length).toBeGreaterThanOrEqual(4);
        expect(data.NAIKI_TIMELINE[3].year).toContain('1178');
    });

    it('contains academic sources & citations', () => {
        expect(data.NAIKI_SOURCES.length).toBeGreaterThanOrEqual(3);
        const prabandha = data.NAIKI_SOURCES.find(s => s.citation.includes('Prabandhachintamani'));
        expect(prabandha).toBeDefined();
    });
});

describe('Queen Naiki Devi Profile — Explorer Integrations', () => {
    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('frontend/naiki-devi-kasahrada/index.html');
        expect(searchIndex).toContain('Naiki Devi');
    });
});
