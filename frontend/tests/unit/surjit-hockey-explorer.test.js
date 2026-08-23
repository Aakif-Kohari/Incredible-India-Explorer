import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const ROOT = process.cwd();
const DIR = resolve(ROOT, 'frontend', 'surjit-hockey-explorer');

const html = readFileSync(resolve(DIR, 'index.html'), 'utf-8');
const css = readFileSync(resolve(DIR, 'style.css'), 'utf-8');
const js = readFileSync(resolve(DIR, 'script.js'), 'utf-8');
const data = readFileSync(resolve(DIR, 'data.js'), 'utf-8');

describe('Surjit Hockey Explorer - index.html structure', () => {
    it('has exactly one h1 heading', () => {
        const count = (html.match(/<h1[\s>]/g) || []).length;
        assert.equal(count, 1);
    });

    it('has at least 8 h2 sections worth of content', () => {
        const count = (html.match(/<h2[\s>]/g) || []).length;
        assert.ok(count >= 8, `expected >= 8 h2 tags, found ${count}`);
    });

    it('contains all required section ids', () => {
        ['trophy', 'namesake', 'history', 'punjab-hockey', 'teams', 'winners', 'players', 'milestones', 'timeline', 'sources']
            .forEach((id) => assert.ok(html.includes(`id="${id}"`), `missing section id ${id}`));
    });

    it('has tab buttons wired to every section via data-tab', () => {
        ['trophy', 'namesake', 'history', 'punjab-hockey', 'teams', 'winners', 'players', 'milestones', 'timeline', 'sources']
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
        ['stat-editions', 'stat-psb', 'stat-io', 'stat-nations'].forEach((id) =>
            assert.ok(html.includes(`id="${id}"`), `missing hero stat id ${id}`));
    });
});

describe('Surjit Hockey Explorer - data.js content coverage', () => {
    it('exposes window.SURJIT_DATA', () => {
        assert.ok(data.includes('window.SURJIT_DATA'));
    });

    it('covers winners including 1984 debut, 2020 gap and 2025 final', () => {
        assert.ok(/year:\s*1984/.test(data));
        assert.ok(/year:\s*2020/.test(data));
        assert.ok(/year:\s*2025/.test(data));
        assert.ok(/Western Command/.test(data));
        assert.ok(/Indian Oil Mumbai/.test(data));
        assert.ok(/Indian Railways Delhi/.test(data));
    });

    it('documents the namesake Surjit Singh Randhawa', () => {
        ['Surjit Singh Randhawa', 'Kuala Lumpur', 'Arjuna Award', 'Penalty corner'].forEach((term) =>
            assert.ok(data.includes(term) || html.includes(term), `missing namesake detail ${term}`));
    });

    it('lists notable players of Punjab hockey', () => {
        ['Balbir Singh', 'Ajit Pal Singh', 'Pargat Singh', 'Manpreet Singh'].forEach((name) =>
            assert.ok(data.includes(name), `missing player ${name}`));
    });

    it('includes team entries for regular participants', () => {
        ['Punjab & Sind Bank', 'BSF Jalandhar', 'Punjab Police', 'JCT Phagwara'].forEach((team) =>
            assert.ok(data.includes(team), `missing team ${team}`));
    });
});

describe('Surjit Hockey Explorer - script.js behaviour hooks', () => {
    it('defines required functions', () => {
        ['initTabNavigation', 'activateTab', 'initCountUp', 'initTyping',
         'initTimeline', 'renderTeams', 'renderPlayers', 'renderWinners', 'renderMilestones']
            .forEach((fn) => assert.ok(js.includes(`function ${fn}`), `missing function ${fn}`));
    });

    it('boots on DOMContentLoaded', () => {
        assert.match(js, /document\.addEventListener\(\s*'DOMContentLoaded'/);
    });

    it('reads data from window.SURJIT_DATA', () => {
        assert.ok(js.includes('window.SURJIT_DATA'));
    });
});

describe('Surjit Hockey Explorer - style.css coverage', () => {
    it('styles tabs, hero stats, teams, players and timelines', () => {
        ['.sh-tabs', '.sh-tab', '.hero-stat', '.team-grid', '.team-card',
         '.player-grid', '.player-card', '.timeline-container', '.milestone-list']
            .forEach((sel) => assert.ok(css.includes(sel), `missing selector ${sel}`));
    });

    it('provides responsive breakpoints', () => {
        const count = (css.match(/@media/g) || []).length;
        assert.ok(count >= 3, `expected >= 3 media queries, found ${count}`);
    });
});
