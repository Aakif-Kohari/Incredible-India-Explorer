import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/revolt-1857-explorer', file),
        'utf-8'
    );
}

describe('Revolt of 1857 Explorer — Page Structure & Content', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains hero section introducing Revolt of 1857', () => {
        expect(html).toContain('Revolt of 1857');
        expect(html).toContain('First War of Indian Independence');
    });

    it('covers political, economic, social, and military causes', () => {
        expect(html).toContain('Political Causes');
        expect(html).toContain('Economic Exploitation');
        expect(html).toContain('Social & Religious Concerns');
        expect(html).toContain('Military Grievances');
    });

    it('contains interactive SVG map with key location markers', () => {
        expect(html).toContain('id="r1857-map"');
        expect(html).toContain('data-location="meerut"');
        expect(html).toContain('data-location="delhi"');
        expect(html).toContain('data-location="kanpur"');
        expect(html).toContain('data-location="lucknow"');
        expect(html).toContain('data-location="jhansi"');
        expect(html).toContain('data-location="bihar"');
    });

    it('contains chronological timeline section', () => {
        expect(html).toContain('id="timeline"');
        expect(html).toContain('id="r1857-timeline"');
    });

    it('contains major leaders section', () => {
        expect(html).toContain('id="leaders"');
        expect(html).toContain('Key Leaders of the Uprising');
    });

    it('covers aftermath, before/after comparison, and transfer of power', () => {
        expect(html).toContain('Before 1857');
        expect(html).toContain('After 1857');
        expect(html).toContain('Crown Rule');
        expect(html).toContain('Government of India Act 1858');
    });

    it('includes credible historical references', () => {
        expect(html).toContain('Credible Historical References');
        expect(html).toContain('Sen, S. N.');
    });
});

describe('Revolt of 1857 Explorer — JavaScript Logic', () => {
    let js;

    beforeAll(() => {
        js = readExplorerFile('script.js');
    });

    it('defines REVOLT_LOCATIONS data with location details', () => {
        expect(js).toContain('REVOLT_LOCATIONS');
        expect(js).toContain('meerut');
        expect(js).toContain('delhi');
        expect(js).toContain('kanpur');
        expect(js).toContain('lucknow');
        expect(js).toContain('jhansi');
        expect(js).toContain('bihar');
    });

    it('exports selectLocation function for interactive map interaction', () => {
        expect(js).toContain('selectLocation');
    });
});
