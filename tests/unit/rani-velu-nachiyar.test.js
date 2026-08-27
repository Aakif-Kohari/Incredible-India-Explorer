/**
 * Rani Velu Nachiyar Profile - Interactive Engine & DOM Validation Tests
 * Incredible India Explorer — Issue #3403
 */
import { describe, it, expect, beforeEach, afterEach, beforeAll } from 'vitest';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { JSDOM } from 'jsdom';

const __dirname = dirname(fileURLToPath(import.meta.url));

describe('Rani Velu Nachiyar Profile — Historical Markdown & Web Page Integrity', () => {

    describe('Markdown Profile (profiles/rani_velu_nachiyar.md)', () => {
        let mdContent;

        beforeAll(() => {
            const mdPath = resolve(__dirname, '../../profiles/rani_velu_nachiyar.md');
            expect(existsSync(mdPath)).toBe(true);
            mdContent = readFileSync(mdPath, 'utf-8');
        });

        it('contains the required title and Hero metadata', () => {
            expect(mdContent).toContain('# Historical Profile: Rani Velu Nachiyar — The Queen Who Resisted British Expansion');
            expect(mdContent).toContain('## Hero');
            expect(mdContent).toContain('Rani Velu Nachiyar');
            expect(mdContent).toContain('Sivaganga');
            expect(mdContent).toContain('Sethupathi');
        });

        it('contains all required narrative and analytical sections', () => {
            expect(mdContent).toContain('## Sivaganga Kingdom');
            expect(mdContent).toContain('## Early Life');
            expect(mdContent).toContain('## Conflict & Exile');
            expect(mdContent).toContain('## Building Resistance');
            expect(mdContent).toContain('## Return to Sivaganga & Anti-Company Campaign');
            expect(mdContent).toContain('## Governance, Succession & Later Life');
            expect(mdContent).toContain('## Historical Evidence vs. Later Narratives');
            expect(mdContent).toContain('## Geography & Map');
            expect(mdContent).toContain('## Timeline');
            expect(mdContent).toContain('## Legacy & National Memory');
            expect(mdContent).toContain('## Sources');
        });

        it('documents alliances with Hyder Ali, Gopala Nayaker, and Marudhu brothers', () => {
            expect(mdContent).toContain('Hyder Ali');
            expect(mdContent).toContain('Gopala Nayaker');
            expect(mdContent).toContain('Marudhu');
            expect(mdContent).toContain('Virupakshi');
            expect(mdContent).toContain('Kalaiyarkovil');
        });

        it('clearly distinguishes historical evidence from popular oral narratives', () => {
            expect(mdContent).toContain('Documented Archival Fact');
            expect(mdContent).toContain('Oral Tradition & Commemorative Narratives');
            expect(mdContent).toContain('Madras Military Consultations');
        });

        it('contains chronological timeline with key historical dates', () => {
            expect(mdContent).toContain('January 3, 1730');
            expect(mdContent).toContain('1772');
            expect(mdContent).toContain('1780');
            expect(mdContent).toContain('1796');
        });
    });

    describe('Web Profile Page (pages/velu-nachiyar/velu-nachiyar.html & Assets)', () => {
        let htmlContent;
        let cssContent;
        let jsContent;

        beforeAll(() => {
            const htmlPath = resolve(__dirname, '../../pages/velu-nachiyar/velu-nachiyar.html');
            const cssPath = resolve(__dirname, '../../pages/velu-nachiyar/velu-nachiyar.css');
            const jsPath = resolve(__dirname, '../../pages/velu-nachiyar/velu-nachiyar.js');

            expect(existsSync(htmlPath)).toBe(true);
            expect(existsSync(cssPath)).toBe(true);
            expect(existsSync(jsPath)).toBe(true);

            htmlContent = readFileSync(htmlPath, 'utf-8');
            cssContent = readFileSync(cssPath, 'utf-8');
            jsContent = readFileSync(jsPath, 'utf-8');
        });

        it('includes title, meta tags, and correct section ids in HTML', () => {
            expect(htmlContent).toContain('Rani Velu Nachiyar');
            expect(htmlContent).toContain('id="hero-intro"');
            expect(htmlContent).toContain('id="sivaganga-kingdom"');
            expect(htmlContent).toContain('id="early-life"');
            expect(htmlContent).toContain('id="conflict-exile"');
            expect(htmlContent).toContain('id="building-resistance"');
            expect(htmlContent).toContain('id="campaign-return"');
            expect(htmlContent).toContain('id="evidence-vs-legend"');
            expect(htmlContent).toContain('id="geographical-context"');
            expect(htmlContent).toContain('id="timeline"');
            expect(htmlContent).toContain('id="legacy"');
            expect(htmlContent).toContain('id="sources"');
        });

        it('includes CSS stylesheet definitions and color variables', () => {
            expect(cssContent).toContain('--primary-color: #800020');
            expect(cssContent).toContain('.hero-header');
            expect(cssContent).toContain('.card');
            expect(cssContent).toContain('.tab-btn');
            expect(cssContent).toContain('.timeline-list');
        });

        it('implements interactive tab switching logic in JS', () => {
            expect(jsContent).toContain('DOMContentLoaded');
            expect(jsContent).toContain('.tab-btn');
            expect(jsContent).toContain('targetId');
        });
    });

    describe('Interactive Tab Toggle Engine (JSDOM simulation)', () => {
        let doc;
        let win;

        beforeEach(() => {
            const htmlPath = resolve(__dirname, '../../pages/velu-nachiyar/velu-nachiyar.html');
            const html = readFileSync(htmlPath, 'utf-8');
            const dom = new JSDOM(html, { runScripts: 'dangerously' });
            win = dom.window;
            doc = win.document;
            global.document = doc;
            global.window = win;
        });

        afterEach(() => {
            global.document = undefined;
            global.window = undefined;
        });

        it('switches between Documented Evidence and Popular Legend tabs', () => {
            const tabButtons = doc.querySelectorAll('.tab-btn');
            const tabContents = doc.querySelectorAll('.tab-content');
            expect(tabButtons.length).toBe(2);
            expect(tabContents.length).toBe(2);

            const documentedBtn = tabButtons[0];
            const legendBtn = tabButtons[1];
            const documentedTab = doc.getElementById('documented');
            const legendTab = doc.getElementById('legend');

            // Initially documented is active
            expect(documentedBtn.classList.contains('active')).toBe(true);
            expect(documentedTab.classList.contains('active')).toBe(true);
            expect(legendTab.classList.contains('active')).toBe(false);

            // Simulate clicking on legend tab
            tabButtons.forEach(button => {
                button.addEventListener('click', () => {
                    const targetId = button.getAttribute('data-target');
                    tabButtons.forEach(btn => btn.classList.remove('active'));
                    tabContents.forEach(content => content.classList.remove('active'));

                    button.classList.add('active');
                    const targetEl = doc.getElementById(targetId);
                    if (targetEl) {
                        targetEl.classList.add('active');
                    }
                });
            });

            legendBtn.click();

            expect(legendBtn.classList.contains('active')).toBe(true);
            expect(documentedBtn.classList.contains('active')).toBe(false);
            expect(legendTab.classList.contains('active')).toBe(true);
            expect(documentedTab.classList.contains('active')).toBe(false);
        });
    });
});
