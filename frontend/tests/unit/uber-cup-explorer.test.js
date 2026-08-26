import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = process.cwd();
const DIR = resolve(ROOT, 'frontend', 'uber-cup-explorer');

const html = readFileSync(resolve(DIR, 'index.html'), 'utf-8');
const css = readFileSync(resolve(DIR, 'style.css'), 'utf-8');
const js = readFileSync(resolve(DIR, 'script.js'), 'utf-8');
const data = readFileSync(resolve(DIR, 'data.js'), 'utf-8');

describe('Uber Cup Explorer - index.html structure', () => {
    it('has exactly one h1 heading', () => {
        const count = (html.match(/<h1[\s>]/g) || []).length;
        assert.equal(count, 1);
    });

    it('has at least 8 h2 sections worth of content', () => {
        const count = (html.match(/<h2[\s>]/g) || []).length;
        assert.ok(count >= 8, `expected >= 8 h2 tags, found ${count}`);
    });

    it('contains all required section ids', () => {
        ['trophy', 'history', 'teams', 'players', 'results', 'milestones', 'timeline', 'sources']
            .forEach((id) => assert.ok(html.includes(`id="${id}"`), `missing section id ${id}`));
    });

    it('has tab buttons wired to every section via data-tab', () => {
        ['trophy', 'history', 'teams', 'players', 'results', 'milestones', 'timeline', 'sources']
            .forEach((id) => assert.ok(html.includes(`data-tab="${id}"`), `missing data-tab for ${id}`));
    });

    it('includes meta viewport and description', () => {
        assert.ok(html.includes('name="viewport"'));
        assert.match(html, /<meta\s+name="description"\s+content="[^"]+"/);
    });

    it('links the shared root stylesheet', () => {
        assert.ok(html.includes('../../styles.css'));
    });

    it('references its own style.css, data.js and script.js', () => {
        assert.ok(html.includes('href="style.css"'));
        assert.ok(html.includes('src="data.js"'));
        assert.ok(html.includes('src="script.js"'));
    });

    it('uses https image sources with alt text (if any images)', () => {
        const imgs = html.match(/<img\b[^>]*>/g) || [];
        imgs.forEach((tag) => {
            const src = /src="([^"]*)"/.exec(tag);
            assert.ok(src && src[1].startsWith('https://'), `non-https img src: ${src && src[1]}`);
            assert.match(tag, /alt="/, 'img missing alt attribute');
        });
    });

    it('renders hero stat counters with ids for count-up', () => {
        ['stat-editions', 'stat-semis', 'stat-medals', 'stat-titles'].forEach((id) =>
            assert.ok(html.includes(`id="${id}"`), `missing hero stat id ${id}`));
    });
});

describe('Uber Cup Explorer - data.js content coverage', () => {
    it('exposes window.UBER_CUP_DATA', () => {
        assert.ok(data.includes('window.UBER_CUP_DATA'));
    });

    it('covers tournaments including 1957 debut, 2014 bronze and 2024 edition', () => {
        assert.ok(/year:\s*1957/.test(data));
        assert.ok(/year:\s*2014/.test(data));
        assert.ok(/year:\s*2024/.test(data));
        assert.ok(/New Delhi/i.test(data));
    });

    it('lists notable Indian players', () => {
        ['Saina Nehwal', 'P.V. Sindhu', 'Jwala Gutta', 'Ashwini Ponnappa'].forEach((name) =>
            assert.ok(data.includes(name), `missing player ${name}`));
    });

    it('documents key milestones', () => {
        assert.ok(/Betty Uber/i.test(data));
        assert.ok(/semi-final/i.test(data));
    });
});

describe('Uber Cup Explorer - script.js behaviour hooks', () => {
    it('defines required functions', () => {
        ['initTabNavigation', 'activateTab', 'initCountUp', 'initTyping',
         'initTimeline', 'renderPlayers', 'renderResults', 'renderMilestones']
            .forEach((fn) => assert.ok(js.includes(`function ${fn}`), `missing function ${fn}`));
    });

    it('boots on DOMContentLoaded', () => {
        assert.match(js, /document\.addEventListener\(\s*'DOMContentLoaded'/);
    });

    it('reads data from window.UBER_CUP_DATA', () => {
        assert.ok(js.includes('window.UBER_CUP_DATA'));
    });
});

describe('Uber Cup Explorer - style.css coverage', () => {
    it('styles tabs, hero stats, player grid and timelines', () => {
        ['.uc-tabs', '.uc-tab', '.hero-stat', '.player-grid', '.player-card',
         '.timeline-container', '.timeline-item', '.milestone-list']
            .forEach((sel) => assert.ok(css.includes(sel), `missing selector ${sel}`));
    });

    it('provides responsive breakpoints', () => {
        const count = (css.match(/@media/g) || []).length;
        assert.ok(count >= 3, `expected >= 3 media queries, found ${count}`);
    });
});
