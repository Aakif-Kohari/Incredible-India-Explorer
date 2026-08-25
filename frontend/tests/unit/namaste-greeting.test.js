import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/namaste-greeting-explorer', file),
        'utf-8'
    );
}

describe('Namaste Greeting Explorer — Page Structure & Content (#2930)', () => {
    let html;

    beforeAll(() => {
        html = readFile('index.html');
    });

    it('contains a hero section with badges and title', () => {
        expect(html).toContain('class="hero-section namaste-hero"');
        expect(html).toContain('<h1 id="hero-heading">');
        expect(html).toContain('Namaste');
        expect(html).toContain('Divine Recognition');
    });

    it('contains all required cultural sections', () => {
        expect(html).toContain('id="meaning"');
        expect(html).toContain('id="gesture"');
        expect(html).toContain('id="regional"');
        expect(html).toContain('id="etiquette"');
        expect(html).toContain('id="interactive"');
    });

    it('documents the etymology and Anjali Mudra gesture', () => {
        expect(html).toContain('Namas');
        expect(html).toContain('Añjali Mudrā');
        expect(html).toContain('Pranam');
    });

    it('includes regional greeting variations across India', () => {
        expect(html).toContain('Vanakkam');
        expect(html).toContain('Namaskaramulu');
        expect(html).toContain('Namaskara');
        expect(html).toContain('Sat Sri Akaal');
        expect(html).toContain('Nomoshkar');
        expect(html).toContain('Adaab');
    });

    it('includes structured data (JSON-LD Article schema)', () => {
        expect(html).toContain('application/ld+json');
        expect(html).toContain('"@type": "Article"');
    });
});

describe('Namaste Greeting Explorer — Scripts & Styles', () => {
    it('style.css defines responsive layout, filter bar, modal and light/dark theme', () => {
        const css = readFile('style.css');
        expect(css).toContain('.namaste-hero');
        expect(css).toContain('.explorer-filter-bar');
        expect(css).toContain('.greeting-detail-modal');
        expect(css).toContain('.light-theme');
    });

    it('script.js implements regional greeting dataset, filtering, and modal popup', () => {
        const js = readFile('script.js');
        expect(js).toContain('greetingsData');
        expect(js).toContain('vanakkam');
        expect(js).toContain('sat-sri-akaal');
        expect(js).toContain('openGreetingModal');
        expect(js).toContain('theme-toggle');
    });
});
