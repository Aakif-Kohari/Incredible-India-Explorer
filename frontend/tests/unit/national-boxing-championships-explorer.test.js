/**
 * national-boxing-championships-explorer.test.js
 * Unit tests for the National Boxing Championships Explorer page.
 * Validates required sections, boxing history content, champions, women's boxing,
 * Olympic connections, milestones, interactive achievement timeline, references,
 * and accessibility.
 */

import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/national-boxing-championships-explorer', file),
        'utf-8'
    );
}

function readLandingPage() {
    return readFileSync(
        resolve(__dirname, '../../index.html'),
        'utf-8'
    );
}

describe('National Boxing Championships Explorer — Page Structure', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('contains a hero section with page title and kicker', () => {
        expect(html).toContain('class="boxing-hero"');
        expect(html).toContain('<h1>');
        expect(html).toContain('National Boxing');
        expect(html).toContain('Championships');
        expect(html).toContain('1950');
    });

    it('contains all required content sections from the issue', () => {
        const sections = [
            'history',           // Championship History
            'categories',        // Weight Categories
            'champions-men',     // Major Champions (Men)
            'womens-boxing',     // Women's Boxing
            'olympic',           // Olympic Connections
            'gallery',           // Visual Gallery
            'milestones',        // Important Milestones
            'achievement-timeline', // Interactive Boxer Achievement Timeline
            'references'         // References & Sources
        ];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('contains all required section topics in headings', () => {
        const topics = [
            'Championship History',
            'Seven Decades',
            'Weight Categories',
            'Divisions of Glory',
            'Major Champions',
            "Men's Ring Legends",
            "Women's Boxing",
            'Breaking Barriers',
            'Olympic Connections',
            'From Nationals to the Five Rings',
            'Visual Gallery',
            'Champions in the Ring',
            'Milestones',
            'Defining Moments',
            'Interactive Feature',
            'Boxer Achievement Timeline',
            'References'
        ];
        topics.forEach(topic => {
            expect(html).toContain(topic);
        });
    });

    it('documents championship history from 1950', () => {
        expect(html).toContain('1950');
        expect(html).toContain('Bombay');
        expect(html).toContain('Indian Amateur Boxing Federation');
        expect(html).toContain('IABF');
        expect(html).toContain('Services');
        expect(html).toContain('Railways');
    });

    it('includes men\'s weight categories (12 Olympic-aligned)', () => {
        expect(html).toContain("Men's Categories");
        expect(html).toContain('48 kg');
        expect(html).toContain('Minimumweight');
        expect(html).toContain('51 kg');
        expect(html).toContain('Flyweight');
        expect(html).toContain('54 kg');
        expect(html).toContain('Bantamweight');
        expect(html).toContain('57 kg');
        expect(html).toContain('Featherweight');
        expect(html).toContain('60 kg');
        expect(html).toContain('Lightweight');
        expect(html).toContain('63.5 kg');
        expect(html).toContain('Light Welterweight');
        expect(html).toContain('67 kg');
        expect(html).toContain('Welterweight');
        expect(html).toContain('71 kg');
        expect(html).toContain('Light Middleweight');
        expect(html).toContain('75 kg');
        expect(html).toContain('Middleweight');
        expect(html).toContain('80 kg');
        expect(html).toContain('Light Heavyweight');
        expect(html).toContain('92 kg');
        expect(html).toContain('Heavyweight');
        expect(html).toContain('+92 kg');
        expect(html).toContain('Super Heavyweight');
    });

    it('includes women\'s weight categories (12 Olympic-aligned)', () => {
        expect(html).toContain("Women's Categories");
        expect(html).toContain('48 kg');
        expect(html).toContain('50 kg');
        expect(html).toContain('Light Flyweight');
        expect(html).toContain('52 kg');
        expect(html).toContain('54 kg');
        expect(html).toContain('57 kg');
        expect(html).toContain('60 kg');
        expect(html).toContain('63 kg');
        expect(html).toContain('66 kg');
        expect(html).toContain('70 kg');
        expect(html).toContain('75 kg');
        expect(html).toContain('81 kg');
        expect(html).toContain('+81 kg');
    });

    it('includes major men\'s champions with details', () => {
        const champions = [
            'Vijender Singh',
            'Shiva Thapa',
            'Amit Panghal',
            'Manish Kaushik',
            'Hussamuddin Mohammed',
            'Naman Tanwar'
        ];
        champions.forEach(champion => {
            expect(html).toContain(champion);
        });
        // Check specific achievements
        expect(html).toContain('Olympic Glory');
        expect(html).toContain('Beijing 2008');
        expect(html).toContain('World Championships');
        expect(html).toContain('Asian Games');
        expect(html).toContain('Commonwealth Games');
    });

    it('includes women\'s boxing pioneers and champions', () => {
        const womenChampions = [
            'M. C. Mary Kom',
            'Sarita Devi',
            'Nikhat Zareen',
            'Lovlina Borgohain',
            'Simranjit Kaur',
            'Jaismine Lamboria'
        ];
        womenChampions.forEach(champion => {
            expect(html).toContain(champion);
        });
        // Check women's boxing history
        expect(html).toContain('2001');
        expect(html).toContain('Chennai');
        expect(html).toContain('Manipur');
        expect(html).toContain('London 2012');
        expect(html).toContain('Olympic Bronze');
    });

    it('documents Olympic connections from 1992 to 2024', () => {
        expect(html).toContain('1992');
        expect(html).toContain('Barcelona');
        expect(html).toContain('2008');
        expect(html).toContain('2012');
        expect(html).toContain('2020');
        expect(html).toContain('2024');
        expect(html).toContain('Paris');
        expect(html).toContain('Vijender');
        expect(html).toContain('Mary Kom');
        expect(html).toContain('Lovlina');
        expect(html).toContain('Nikhat Zareen');
    });

    it('includes important milestones timeline', () => {
        const milestones = [
            '1950', // Inaugural
            '1970', // Asian Games breakthrough
            '1990', // Beijing Asian Games
            '2001', // Women's nationals
            '2008', // Vijender bronze
            '2012', // Mary Kom bronze
            '2016', // BFI formation
            '2018', // Commonwealth Games
            '2019', // Amit Panghal world silver
            '2022', // Nikhat world gold
            '2023'  // Nikhat second world gold
        ];
        milestones.forEach(year => {
            expect(html).toContain(year);
        });
    });

    it('has interactive boxer achievement timeline with select dropdown', () => {
        expect(html).toContain('id="boxer-select"');
        expect(html).toContain('mary-kom');
        expect(html).toContain('vijender-singh');
        expect(html).toContain('nikhat-zareen');
        expect(html).toContain('lovlina-borgohain');
        expect(html).toContain('amit-panghal');
        expect(html).toContain('shiva-thapa');
        expect(html).toContain('sarita-devi');
        expect(html).toContain('manish-kaushik');
        expect(html).toContain('id="achievement-timeline-container"');
    });

    it('includes visual gallery with champion images', () => {
        expect(html).toContain('class="boxing-gallery-grid"');
        expect(html).toContain('class="boxing-gallery-item"');
        expect(html).toContain('M. C. Mary Kom');
        expect(html).toContain('Vijender Singh');
        expect(html).toContain('Nikhat Zareen');
        expect(html).toContain('Lovlina Borgohain');
        expect(html).toContain('Amit Panghal');
        expect(html).toContain('Shiva Thapa');
        expect(html).toContain('Sarita Devi');
    });

    it('has semantic heading hierarchy (single h1, multiple section h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(8);
    });

    it('includes references and sources section', () => {
        expect(html).toContain('References');
        expect(html).toContain('boxingfederation.in');
        expect(html).toContain('iba.sport');
        expect(html).toContain('olympics.com');
        expect(html).toContain('sportsauthorityofindia.nic.in');
        expect(html).toContain('thecgf.com');
        expect(html).toContain('asbcnews.org');
        expect(html).toContain('Unbreakable: My Autobiography');
        expect(html).toContain('Mary Kom');
    });

    it('uses HTTPS OG image URLs', () => {
        const ogImages = html.match(/property="og:image" content="([^"]*)"/g) || [];
        expect(ogImages.length).toBeGreaterThanOrEqual(1);
        ogImages.forEach(tag => {
            expect(tag).toMatch(/https:\/\//);
        });
    });

    it('links the shared stylesheet, page stylesheet, and script', () => {
        expect(html).toContain('href="../../styles.css"');
        expect(html).toContain('href="style.css"');
        expect(html).toContain('src="script.js"');
    });

    it('includes modal structure for gallery interaction', () => {
        expect(html).toContain('id="boxing-modal"');
        expect(html).toContain('id="boxing-modal-close"');
        expect(html).toContain('id="modal-title"');
        expect(html).toContain('id="modal-description"');
    });

    it('includes bookmark button for Journey integration', () => {
        expect(html).toContain('boxing-bookmark-btn');
        expect(html).toContain('journey-bookmark-btn');
        expect(html).toContain('data-bookmark-id="boxing-main"');
    });
});

describe('National Boxing Championships Explorer — Assets', () => {
    it('includes a non-empty stylesheet with expected selectors', () => {
        const css = readExplorerFile('style.css');
        expect(css.length).toBeGreaterThan(1000);
        expect(css).toContain('.boxing-hero');
        expect(css).toContain('.boxing-section');
        expect(css).toContain('.boxing-card-grid');
        expect(css).toContain('.boxing-timeline');
        expect(css).toContain('.boxing-achievement-timeline');
        expect(css).toContain('.boxing-gallery-grid');
        expect(css).toContain('.boxing-references');
        expect(css).toContain('.boxing-bookmark-btn');
        expect(css).toContain('.museum-modal');
    });

    it('includes a valid interactive script with required features', () => {
        const js = readExplorerFile('script.js');
        expect(js).toContain('registerSearchItems');
        expect(js).toContain('Journey');
        expect(js).toContain('boxing-modal');
        expect(js).toContain('app:route-changed');
        expect(js).toContain('boxerAchievements');
        expect(js).toContain('renderAchievementTimeline');
        expect(js).toContain('mary-kom');
        expect(js).toContain('vijender-singh');
        expect(js).toContain('nikhat-zareen');
        expect(js).toContain('lovlina-borgohain');
        expect(js).toContain('amit-panghal');
        expect(js).toContain('shiva-thapa');
        expect(js).toContain('sarita-devi');
        expect(js).toContain('manish-kaushik');
    });
});

describe('National Boxing Championships Explorer — Landing Page Integration', () => {
    it('is linked in the main navigation dropdown under Games', () => {
        const index = readLandingPage();
        expect(index).toContain('National Boxing Championships');
        expect(index).toContain('frontend/national-boxing-championships-explorer/index.html');
    });
});

describe('National Boxing Championships Explorer — Acceptance Criteria', () => {
    let html;

    beforeAll(() => {
        html = readExplorerFile('index.html');
    });

    it('History documented: Championship history from 1950 to present', () => {
        expect(html).toContain('1950');
        expect(html).toContain('Bombay');
        expect(html).toContain('IABF');
        expect(html).toContain('BFI');
        expect(html).toContain('Services');
    });

    it('Champions included: Major men and women champions with achievements', () => {
        expect(html).toContain('Vijender Singh');
        expect(html).toContain('Mary Kom');
        expect(html).toContain('Nikhat Zareen');
        expect(html).toContain('Lovlina Borgohain');
        expect(html).toContain('Amit Panghal');
        expect(html).toContain('Shiva Thapa');
        expect(html).toContain('Sarita Devi');
    });

    it('Women\'s boxing included: Dedicated section with pioneers and milestones', () => {
        expect(html).toContain("Women's Boxing");
        expect(html).toContain('2001');
        expect(html).toContain('Chennai');
        expect(html).toContain('Manipur');
        expect(html).toContain('Mary Kom');
        expect(html).toContain('Nikhat Zareen');
        expect(html).toContain('Lovlina Borgohain');
    });

    it('Sources included: References section with official and secondary sources', () => {
        expect(html).toContain('References');
        expect(html).toContain('boxingfederation.in');
        expect(html).toContain('iba.sport');
        expect(html).toContain('olympics.com');
        expect(html).toContain('sportsauthorityofindia.nic.in');
        expect(html).toContain('thecgf.com');
        expect(html).toContain('asbcnews.org');
    });

    it('Interactive Feature: Boxer achievement timeline with dropdown selector', () => {
        expect(html).toContain('Boxer Achievement Timeline');
        expect(html).toContain('id="boxer-select"');
        expect(html).toContain('id="achievement-timeline-container"');
        expect(html).toContain('mary-kom');
        expect(html).toContain('vijender-singh');
    });
});