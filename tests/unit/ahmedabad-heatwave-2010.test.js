import { describe, it, expect, beforeAll } from 'vitest';
import fs from 'fs';
import path from 'path';

const htmlPath = path.resolve(__dirname, '../../frontend/ahmedabad-heatwave-2010/index.html');
const cssPath = path.resolve(__dirname, '../../frontend/ahmedabad-heatwave-2010/style.css');
const jsPath = path.resolve(__dirname, '../../frontend/ahmedabad-heatwave-2010/script.js');

let html;
let css;
let js;

beforeAll(() => {
    html = fs.readFileSync(htmlPath, 'utf-8');
    css = fs.readFileSync(cssPath, 'utf-8');
    js = fs.readFileSync(jsPath, 'utf-8');
});

describe('Ahmedabad 2010 Heatwave page — file structure', () => {
    it('index.html exists and is non-empty', () => {
        expect(html).toBeTruthy();
        expect(html.length).toBeGreaterThan(500);
    });

    it('style.css exists and is non-empty', () => {
        expect(css).toBeTruthy();
        expect(css.length).toBeGreaterThan(200);
    });

    it('script.js exists and is non-empty', () => {
        expect(js).toBeTruthy();
        expect(js.length).toBeGreaterThan(100);
    });

    it('links to style.css and script.js relatively', () => {
        expect(html).toMatch(/href="style\.css"/);
        expect(html).toMatch(/src="script\.js"/);
    });
});

describe('Ahmedabad 2010 Heatwave page — required content sections', () => {
    const requiredSections = [
        { id: 'event-context', label: 'Event Context' },
        { id: 'temperature-conditions', label: 'Temperature Conditions' },
        { id: 'urban-heat-environment', label: 'Urban Heat Environment' },
        { id: 'public-health-impacts', label: 'Public-Health Impacts' },
        { id: 'heat-action-plan', label: 'Heat Action Plan' },
        { id: 'early-warning', label: 'Early-Warning Systems' },
        { id: 'community-preparedness', label: 'Community Preparedness' },
        { id: 'lessons-learned', label: 'Lessons Learned' },
        { id: 'sources', label: 'Sources' },
    ];

    requiredSections.forEach(({ id, label }) => {
        it(`includes the "${label}" section (id="${id}")`, () => {
            expect(html).toMatch(new RegExp(`id="${id}"`));
        });
    });
});

describe('Ahmedabad 2010 Heatwave page — acceptance-criteria content accuracy', () => {
    it('states the verified peak temperature (46.8°C)', () => {
        expect(html).toMatch(/46\.8°C/);
    });

    it('cites the excess-mortality figures from the Azhar et al. study', () => {
        expect(html).toMatch(/4,462/);
        expect(html).toMatch(/1,344/);
        expect(html).toMatch(/43\.1%/);
    });

    it('explains heat-risk context via the urban heat island effect', () => {
        expect(html).toMatch(/urban heat island/i);
    });

    it('discusses the Heat Action Plan and its launch date', () => {
        expect(html).toMatch(/Heat Action Plan/);
        expect(html).toMatch(/2013/);
    });

    it('describes the early-warning colour-coded alert system', () => {
        expect(html).toMatch(/orange/i);
        expect(html).toMatch(/red/i);
        expect(html).toMatch(/alert/i);
    });

    it('includes at least one lessons-learned outcome statistic', () => {
        expect(html).toMatch(/1,190/);
    });

    it('provides a non-empty sources/references list', () => {
        const sourcesMatch = html.match(/id="sources"[\s\S]*?<\/section>/);
        expect(sourcesMatch).not.toBeNull();
        const sourcesBlock = sourcesMatch[0];
        const listItemCount = (sourcesBlock.match(/<li>/g) || []).length;
        expect(listItemCount).toBeGreaterThanOrEqual(3);
    });
});

describe('Ahmedabad 2010 Heatwave page — interactivity & accessibility', () => {
    it('script.js wires up the theme toggle button', () => {
        expect(js).toMatch(/theme-toggle/);
        expect(js).toMatch(/light-theme/);
    });

    it('script.js wires up the mobile menu toggle', () => {
        expect(js).toMatch(/menu-toggle/);
        expect(js).toMatch(/aria-expanded/);
    });

    it('page has a theme-toggle button with an aria-label', () => {
        expect(html).toMatch(/id="theme-toggle"[^>]*aria-label/);
    });
});