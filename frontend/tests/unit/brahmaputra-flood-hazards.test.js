import { describe, it, expect, beforeEach } from 'vitest';
import { JSDOM } from 'jsdom';

const dom = new JSDOM('<!DOCTYPE html><html><body></body></html>', { url: 'http://localhost/' });
global.document = dom.window.document;
global.window = dom.window;

const {
    BRAHMAPUTRA_FLOOD_DATA,
    renderFloodFacts,
    renderSeasonalCycle,
    renderCauses,
    renderVulnerableRegions,
    renderImpacts,
    renderManagementMeasures,
    renderRivers,
    renderPreparednessChecklists,
    renderGallery,
    renderImageCredits
} = await import('../../brahmaputra-flood-hazards/script.js');

describe('BRAHMAPUTRA_FLOOD_DATA', () => {
    it('has core identity fields', () => {
        expect(BRAHMAPUTRA_FLOOD_DATA.name).toBe('Brahmaputra Flood Hazards');
        expect(BRAHMAPUTRA_FLOOD_DATA.state).toBe('Assam');
        expect(BRAHMAPUTRA_FLOOD_DATA.region).toContain('Brahmaputra');
        expect(BRAHMAPUTRA_FLOOD_DATA.basinArea).toMatch(/580,000|km²/);
        expect(BRAHMAPUTRA_FLOOD_DATA.riverLength).toContain('2,880');
    });

    it('explains basin geography in overview', () => {
        const overview = Object.values(BRAHMAPUTRA_FLOOD_DATA.overview).join(' ');
        expect(overview).toContain('Tibet');
        expect(overview).toContain('Sadiya');
        expect(overview).toContain('Bangladesh');
        expect(overview.toLowerCase()).toContain('basin');
    });

    it('includes eight flood profile facts', () => {
        expect(BRAHMAPUTRA_FLOOD_DATA.facts).toHaveLength(8);
        const titles = BRAHMAPUTRA_FLOOD_DATA.facts.map(f => f.title);
        expect(titles).toContain('River System');
        expect(titles).toContain('Flood Season');
        expect(titles).toContain('Flood-Prone Land');
    });

    it('documents four seasonal stages from pre-monsoon to winter', () => {
        expect(BRAHMAPUTRA_FLOOD_DATA.seasonalCycle).toHaveLength(4);
        const stages = BRAHMAPUTRA_FLOOD_DATA.seasonalCycle.map(s => s.stage);
        expect(stages[0]).toContain('Pre-Monsoon');
        expect(stages[1]).toContain('Monsoon Peak');
        expect(stages.at(-1)).toContain('Winter');
    });

    it('lists at least eight contributing flood causes covering key drivers', () => {
        expect(BRAHMAPUTRA_FLOOD_DATA.causes.length).toBeGreaterThanOrEqual(8);
        const titles = BRAHMAPUTRA_FLOOD_DATA.causes.map(c => c.title).join(' ');
        expect(titles).toMatch(/Rainfall/i);
        expect(titles).toMatch(/Snowmelt|Glacial/i);
        expect(titles).toMatch(/Erosion/i);
        expect(titles).toMatch(/Embankment/i);
    });

    it('identifies vulnerable regions including Majuli, Dhemaji and Barak Valley', () => {
        expect(BRAHMAPUTRA_FLOOD_DATA.vulnerableRegions.length).toBeGreaterThanOrEqual(6);
        const titles = BRAHMAPUTRA_FLOOD_DATA.vulnerableRegions.map(r => r.title).join(' ');
        expect(titles).toContain('Majuli');
        expect(titles).toContain('Dhemaji');
        expect(titles).toContain('Barak Valley');
        expect(titles).toContain('Kaziranga');
    });

    it('separates community and ecosystem impacts', () => {
        expect(BRAHMAPUTRA_FLOOD_DATA.communityImpacts.length).toBeGreaterThanOrEqual(4);
        expect(BRAHMAPUTRA_FLOOD_DATA.ecosystemImpacts.length).toBeGreaterThanOrEqual(4);
        const eco = BRAHMAPUTRA_FLOOD_DATA.ecosystemImpacts.map(i => i.name).join(' ');
        expect(eco).toMatch(/Kaziranga/);
    });

    it('documents flood-management measures including embankments and Brahmaputra Board', () => {
        expect(BRAHMAPUTRA_FLOOD_DATA.managementMeasures.length).toBeGreaterThanOrEqual(6);
        const titles = BRAHMAPUTRA_FLOOD_DATA.managementMeasures.map(m => m.title).join(' ');
        expect(titles).toMatch(/Embankment/i);
        expect(titles).toMatch(/Brahmaputra Board/);
        expect(titles).toMatch(/Early Warning|Forecasting/i);
    });

    it('maps major rivers of the basins with the mainstem first', () => {
        expect(BRAHMAPUTRA_FLOOD_DATA.rivers.length).toBeGreaterThanOrEqual(8);
        expect(BRAHMAPUTRA_FLOOD_DATA.rivers[0].name).toContain('Brahmaputra');
        const names = BRAHMAPUTRA_FLOOD_DATA.rivers.map(r => r.name).join(' ');
        expect(names).toContain('Subansiri');
        expect(names).toContain('Manas');
        expect(names).toContain('Barak');
    });

    it('provides before/during/after preparedness checklists', () => {
        expect(BRAHMAPUTRA_FLOOD_DATA.preparedness.map(p => p.phase)).toEqual([
            'Before the Flood',
            'During the Flood',
            'After the Flood'
        ]);
        for (const list of BRAHMAPUTRA_FLOOD_DATA.preparedness) {
            expect(list.items.length).toBeGreaterThanOrEqual(4);
        }
    });

    it('provides eight credited gallery images over HTTPS', () => {
        expect(BRAHMAPUTRA_FLOOD_DATA.gallery).toHaveLength(8);
        for (const item of BRAHMAPUTRA_FLOOD_DATA.gallery) {
            expect(item.image.startsWith('https://')).toBe(true);
            expect(item.credit).toContain('Wikimedia Commons');
            expect(item.sourceUrl.startsWith('https://commons.wikimedia.org/')).toBe(true);
        }
    });
});

function createContainer() {
    const container = document.createElement('div');
    document.body.appendChild(container);
    return container;
}

describe('render functions', () => {
    let container;

    beforeEach(() => {
        container?.remove();
        container = createContainer();
    });

    it('renders one fact card per fact', () => {
        renderFloodFacts(BRAHMAPUTRA_FLOOD_DATA.facts, container);
        expect(container.querySelectorAll('.fact-card')).toHaveLength(8);
        expect(container.textContent).toContain('Brahmaputra & Barak');
    });

    it('renders seasonal cycle cards with badges and highlights', () => {
        renderSeasonalCycle(BRAHMAPUTRA_FLOOD_DATA.seasonalCycle, container);
        expect(container.querySelectorAll('.route-step-card')).toHaveLength(4);
        expect(container.querySelector('[data-step="1"] .step-stage').textContent).toContain('Pre-Monsoon');
    });

    it('renders cause cards with title and text', () => {
        renderCauses(BRAHMAPUTRA_FLOOD_DATA.causes, container);
        expect(container.querySelectorAll('.feature-card')).toHaveLength(BRAHMAPUTRA_FLOOD_DATA.causes.length);
        expect(container.textContent).toMatch(/Orographic Rainfall/);
    });

    it('renders vulnerable region cards', () => {
        renderVulnerableRegions(BRAHMAPUTRA_FLOOD_DATA.vulnerableRegions, container);
        expect(container.querySelectorAll('.nearby-card')).toHaveLength(BRAHMAPUTRA_FLOOD_DATA.vulnerableRegions.length);
        expect(container.textContent).toContain('Majuli');
    });

    it('renders impact cards for both communities and ecosystems', () => {
        const ecoContainer = createContainer();
        renderImpacts(BRAHMAPUTRA_FLOOD_DATA.communityImpacts, container);
        renderImpacts(BRAHMAPUTRA_FLOOD_DATA.ecosystemImpacts, ecoContainer);
        expect(container.querySelectorAll('.viewpoint-card')).toHaveLength(BRAHMAPUTRA_FLOOD_DATA.communityImpacts.length);
        expect(ecoContainer.querySelectorAll('.viewpoint-card')).toHaveLength(BRAHMAPUTRA_FLOOD_DATA.ecosystemImpacts.length);
        expect(container.textContent).toContain('Relief Camps');
        ecoContainer.remove();
    });

    it('renders management measure cards', () => {
        renderManagementMeasures(BRAHMAPUTRA_FLOOD_DATA.managementMeasures, container);
        expect(container.querySelectorAll('.permit-card')).toHaveLength(BRAHMAPUTRA_FLOOD_DATA.managementMeasures.length);
        expect(container.textContent).toContain('Brahmaputra Board');
    });

    it('renders river chips with type labels', () => {
        renderRivers(BRAHMAPUTRA_FLOOD_DATA.rivers, container);
        expect(container.querySelectorAll('.river-chip')).toHaveLength(BRAHMAPUTRA_FLOOD_DATA.rivers.length);
        expect(container.querySelector('.river-type').textContent).toBe('Master River');
    });

    it('renders three preparedness checklists with items', () => {
        renderPreparednessChecklists(BRAHMAPUTRA_FLOOD_DATA.preparedness, container);
        expect(container.querySelectorAll('.checklist-card')).toHaveLength(3);
        expect(container.querySelectorAll('.checklist-card li').length)
            .toBe(BRAHMAPUTRA_FLOOD_DATA.preparedness.reduce((sum, p) => sum + p.items.length, 0));
        expect(container.textContent).toContain('go-bag');
    });

    it('renders gallery figures with images, captions, and credits', () => {
        renderGallery(BRAHMAPUTRA_FLOOD_DATA.gallery, container);
        expect(container.querySelectorAll('.gallery-card')).toHaveLength(8);
        expect(container.querySelectorAll('img.gallery-img')).toHaveLength(8);
        expect(container.querySelectorAll('.gallery-credit')).toHaveLength(8);
    });

    it('renders image credit list items with source links', () => {
        renderImageCredits(BRAHMAPUTRA_FLOOD_DATA.gallery, container);
        expect(container.querySelectorAll('li')).toHaveLength(8);
        expect(container.querySelectorAll('a[target="_blank"]')).toHaveLength(8);
    });

    it('escapes HTML in rendered content', () => {
        renderFloodFacts([{ title: '<script>alert(1)</script>', value: 'x & y', description: '"quoted"', icon: '🌊' }], container);
        expect(container.innerHTML).not.toContain('<script>');
        expect(container.innerHTML).toContain('&lt;script&gt;');
        expect(container.innerHTML).toContain('&amp;');
    });
});
