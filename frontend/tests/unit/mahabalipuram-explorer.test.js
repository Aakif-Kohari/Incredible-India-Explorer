import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = dirname(fileURLToPath(import.meta.url));

function readExplorerFile(file) {
    return readFileSync(
        resolve(__dirname, '../../frontend/mahabalipuram-explorer', file),
        'utf-8'
    );
}

describe('Mahabalipuram Explorer — Page Structure & Requirements', () => {
    let html;
    let css;
    let js;

    beforeAll(() => {
        html = readExplorerFile('index.html');
        css = readExplorerFile('style.css');
        js = readExplorerFile('script.js');
    });

    it('contains a hero section with title, subtitle, and badges', () => {
        expect(html).toContain('class="mb-hero"');
        expect(html).toContain('<h1 class="mb-title">');
        expect(html).toContain('Mahabalipuram');
        expect(html).toContain('Pallava');
    });

    it('contains all required sections', () => {
        const sections = ['history', 'shore-temple', 'monuments', 'caves-landscapes', 'unesco', 'facts', 'gallery', 'references'];
        sections.forEach(id => {
            expect(html).toContain(`id="${id}"`);
        });
    });

    it('explains the Pallava dynasty history and Narasimhavarman I', () => {
        expect(html).toContain('Pallava');
        expect(html).toContain('Narasimhavarman I');
        expect(html).toContain('Mamalla');
        expect(html).toContain('Rajasimha');
    });

    it('highlights the Shore Temple and structural granite architecture', () => {
        expect(html).toContain('Shore Temple');
        expect(html).toContain('Vimana');
        expect(html).toContain('Anantashayana Vishnu');
        expect(html).toContain('Bay of Bengal');
    });

    it('covers the Pancha Rathas monolithic shrines', () => {
        expect(html).toContain('Pancha Rathas');
        expect(html).toContain('Dharmaraja Ratha');
        expect(html).toContain('Bhima Ratha');
        expect(html).toContain('Arjuna Ratha');
        expect(html).toContain('Draupadi Ratha');
        expect(html).toContain('Nakula-Sahadeva Ratha');
    });

    it('includes Arjuna\'s Penance / Descent of the Ganges bas-relief', () => {
        expect(html).toContain('Arjuna\'s Penance');
        expect(html).toContain('Descent of the Ganges');
        expect(html).toContain('Bhagiratha');
        expect(html).toContain('elephant');
    });

    it('describes rock-cut cave temples and Krishna\'s Butterball', () => {
        expect(html).toContain('Varaha Cave');
        expect(html).toContain('Mahishasuramardini');
        expect(html).toContain('Krishna Mandapa');
        expect(html).toContain('Krishna\'s Butterball');
    });

    it('mentions UNESCO World Heritage status and coastal relationship', () => {
        expect(html).toContain('UNESCO World Heritage');
        expect(html).toContain('1984');
        expect(html).toContain('Seven Pagodas');
        expect(html).toContain('Tsunami');
    });

    it('includes photo gallery with lightbox modal', () => {
        expect(html).toContain('mb-gallery-grid');
        expect(html).toContain('mb-modal');
        const imgs = html.match(/loading="lazy"/g) || [];
        expect(imgs.length).toBeGreaterThanOrEqual(4);
    });

    it('has semantic heading hierarchy (single h1, multiple section h2s)', () => {
        const h1Count = (html.match(/<h1[\s>]/g) || []).length;
        const h2Count = (html.match(/<h2[\s>]/g) || []).length;
        expect(h1Count).toBe(1);
        expect(h2Count).toBeGreaterThanOrEqual(6);
    });

    it('includes responsive stylesheet and interactive script with Journey integration', () => {
        expect(css).toContain('--mb-ocean');
        expect(css).toContain('@media (max-width: 1024px)');
        expect(js).toContain('mb-modal');
        expect(js).toContain('journey-bookmark-btn');
    });
});
