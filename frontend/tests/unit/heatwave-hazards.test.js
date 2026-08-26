import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readHeatwaveFile(file) {
    return readFileSync(
        resolve(__dirname, '../../../frontend/heatwave-hazards-northern-india', file),
        'utf-8'
    );
}

function loadHeatwaveData() {
    const code = readHeatwaveFile('heatwave-data.js');
    const fn = new Function(
        code + '\nreturn { HEATWAVE_STATS, HEATWAVE_REGIONS, HEATWAVE_CHAPTERS, HEATWAVE_WARNING_LEVELS, HEATWAVE_PREPAREDNESS, HEATWAVE_SOURCES };'
    );
    return fn();
}

function readSearchIndex() {
    return readFileSync(
        resolve(__dirname, '../../../frontend/search-index.js'),
        'utf-8'
    );
}

describe('Northern India Heatwave Hazards — Page Structure & Assets', () => {
    let html;
    let js;
    let css;

    beforeAll(() => {
        html = readHeatwaveFile('index.html');
        js = readHeatwaveFile('heatwave.js');
        css = readHeatwaveFile('heatwave.css');
    });

    it('renders title, hero section, and climatic hazard badges', () => {
        expect(html).toContain('Northern India Heatwave Hazards Explorer');
        expect(html).toContain('Extreme Summer Temperatures &amp; Climatic Risks Across Northern India');
        expect(html).toContain('Climatic Hazard Explorer');
        expect(html).toContain('class="heatwave-hero"');
    });

    it('displays required quick facts stats', () => {
        expect(html).toContain('Affected Population');
        expect(html).toContain('Peak Temperature Range');
        expect(html).toContain('Primary Seasonal Months');
        expect(html).toContain('Primary Warming Wind');
    });

    it('documents climatological causes, UHI effects, warning matrix, and preparedness', () => {
        expect(html).toContain('Extreme Heatwave Hazards in the Indo-Gangetic Basin');
        expect(html).toContain('Climatological and Topographical Drivers');
        expect(html).toContain('IMD Color-Coded Warning Alert Levels');
        expect(html).toContain('Preparedness Guidance &amp; Reference Sources');
    });

    it('embeds Leaflet maps library', () => {
        expect(html).toContain('unpkg.com/leaflet');
        expect(html).toContain('id="heatwave-map"');
    });

    it('includes tab navigation, map container, and warning matrix grid', () => {
        expect(html).toContain('id="tabBtnOverview"');
        expect(html).toContain('id="tabBtnCauses"');
        expect(html).toContain('id="tabBtnMap"');
        expect(html).toContain('id="tabBtnImpacts"');
        expect(html).toContain('id="tabBtnWarning"');
        expect(html).toContain('id="tabBtnPrep"');
        expect(html).toContain('id="warningMatrix"');
    });

    it('includes accessible back navigation', () => {
        expect(html).toContain('Back to All Destinations');
        expect(html).toContain('href="../../index.html"');
    });

    it('references local css and js', () => {
        expect(html).toContain('href="heatwave.css"');
        expect(html).toContain('src="heatwave.js"');
        expect(html).toContain('src="heatwave-data.js"');
    });

    it('contains theme CSS variables and scoped selectors', () => {
        expect(css).toContain('--heatwave-orange');
        expect(css).toContain('--heatwave-crimson');
        expect(css).toContain('.heatwave-body');
        expect(css).toContain('.heatwave-hero');
    });

    it('contains client-side interactions in JavaScript', () => {
        expect(js).toContain('initTabs');
        expect(js).toContain('renderCauses');
        expect(js).toContain('renderSocioEconomic');
        expect(js).toContain('renderWarningMatrix');
        expect(js).toContain('renderPrep');
        expect(js).toContain('renderSources');
        expect(js).toContain('initMap');
        expect(js).toContain('initThemeToggle');
    });
});

describe('Northern India Heatwave Hazards — Dataset Verification', () => {
    let data;

    beforeAll(() => {
        data = loadHeatwaveData();
    });

    it('verifies stats facts', () => {
        expect(data.HEATWAVE_STATS.affectedPopulation).toBe('400 Million+');
        expect(data.HEATWAVE_STATS.primaryWind).toContain('Loo');
    });

    it('contains exposure regions', () => {
        expect(data.HEATWAVE_REGIONS.length).toBeGreaterThanOrEqual(4);
        const del = data.HEATWAVE_REGIONS.find(r => r.id === 'delhi');
        expect(del).toBeDefined();
        expect(del.risk).toContain('Urban Heat Island');
    });

    it('contains IMD color alert criteria', () => {
        expect(data.HEATWAVE_WARNING_LEVELS.length).toBe(4);
        const orange = data.HEATWAVE_WARNING_LEVELS.find(l => l.color === 'Orange');
        expect(orange).toBeDefined();
        expect(orange.action).toContain('Be Prepared');
    });

    it('contains preparedness strategies', () => {
        expect(data.HEATWAVE_PREPAREDNESS.length).toBeGreaterThanOrEqual(3);
        const hydration = data.HEATWAVE_PREPAREDNESS.find(p => p.title.includes('Hydration'));
        expect(hydration).toBeDefined();
    });

    it('contains scientific sources', () => {
        expect(data.HEATWAVE_SOURCES.length).toBeGreaterThanOrEqual(3);
        const imd = data.HEATWAVE_SOURCES.find(s => s.citation.includes('Department'));
        expect(imd).toBeDefined();
    });
});

describe('Northern India Heatwave Hazards — Explorer Integrations', () => {
    it('is registered in search-index.js', () => {
        const searchIndex = readSearchIndex();
        expect(searchIndex).toContain('frontend/heatwave-hazards-northern-india/index.html');
        expect(searchIndex).toContain('Heatwave Hazards Across Northern India');
    });
});
