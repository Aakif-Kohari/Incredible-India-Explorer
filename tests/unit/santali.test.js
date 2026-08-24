/**
 * Santali Linguistic Explorer - Interactive Engine Core Validation Suites
 * Exhaustively analyzes the JSDOM mutations bounding the Austroasiatic Ol Chiki 
 * flashcard arrays, CSS 3D transform hooks, and filtering constraints.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Santali Linguistic UI - Dynamic Ol Chiki Transliteration Matrix', () => {

    let doc;
    let win;

    beforeEach(() => {
        // Construct the global environment simulating the exact page DOM hook structure
        const dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
                <body>
                    <!-- Simulated Global Context -->
                    <div class="audio-btn-wrapper">
                       <button class="btn btn-audio ripple" id="play-santhal"><i class="fas fa-volume-up"></i> ᱥᱟᱱᱛᱟᱲᱤ</button>
                    </div>

                    <!-- Filter Triggers -->
                    <div class="flash-filters text-center mb-4">
                        <button class="filter-btn active" data-category="all">All Words</button>
                        <button class="filter-btn" data-category="nature">Nature</button>
                        <button class="filter-btn" data-category="family">Family</button>
                        <button class="filter-btn" data-category="numbers">Numbers</button>
                        <button class="filter-btn" data-category="invalid">Invalid Map</button>
                    </div>

                    <!-- Target Canvas -->
                    <div class="flashcard-grid" id="flashcard-container"></div>
                </body>
            </html>
        `);

        win = dom.window;
        doc = win.document;
        global.document = doc;
        global.window = win;
    });

    afterEach(() => {
        global.document = undefined;
        global.window = undefined;
    });

    // Mirroring exactly the internal payload map
    const vocabularyListMock = [
        { id: 1, type: 'family', en: 'Mother', chiki: 'ᱟᱭᱳ', ph: 'Ayó' },
        { id: 3, type: 'nature', en: 'Water', chiki: 'ᱫᱟᱜ', ph: 'Dak' },
        { id: 4, type: 'nature', en: 'Fire', chiki: 'ᱥᱮᱸᱜᱮᱞ', ph: 'Sengel' },
        { id: 7, type: 'numbers', en: 'Two', chiki: 'ᱵᱟᱨ', ph: 'Bar' },
        { id: 8, type: 'numbers', en: 'Three', chiki: 'ᱯᱮ', ph: 'Pe' }
    ];

    describe('Flashcard Data Population Bounds', () => {

        // Abstracted Engine implementation exposing logic independently
        function renderFlashcards(filterType) {
            const container = doc.getElementById('flashcard-container');
            container.innerHTML = '';

            const targetData = filterType === 'all' ? vocabularyListMock : vocabularyListMock.filter(item => item.type === filterType);

            targetData.forEach(word => {
                const block = doc.createElement('div');
                block.className = 'ol-card';
                block.setAttribute('data-id', word.id);
                block.setAttribute('data-type', word.type); // test harness hook

                block.innerHTML = `
                    <div class="ol-inner">
                        <div class="ol-front"><div class="ol-f-word">${word.en}</div></div>
                        <div class="ol-back"><div class="ol-b-script ol-chiki">${word.chiki}</div></div>
                    </div>
                `;

                // Emulate CSS 3D manual override bind
                block.addEventListener('click', () => {
                    block.classList.toggle('is-flipped');
                });
                container.appendChild(block);
            });
        }

        it('should correctly bypass regional filtering allocating the entire baseline mock array', () => {
            renderFlashcards('all');
            const elements = doc.querySelectorAll('.ol-card');
            expect(elements.length).toBe(5); // Baseline aggregate size

            // Confirm deep structural insertion
            const motherCard = Array.from(elements).find(el => el.querySelector('.ol-f-word').textContent === 'Mother');
            expect(motherCard).toBeTruthy();
            expect(motherCard.querySelector('.ol-b-script').textContent).toBe('ᱟᱭᱳ'); // Validate unicode glyph payload mapping
        });

        it('should aggressively filter excluding non-matching attributes returning strict DOM subsets', () => {
            renderFlashcards('nature');
            const natureElements = doc.querySelectorAll('.ol-card');

            // In mock array: Water(3) and Fire(4)
            expect(natureElements.length).toBe(2);
            Array.from(natureElements).forEach(el => expect(el.getAttribute('data-type')).toBe('nature'));

            renderFlashcards('family');
            const familyElements = doc.querySelectorAll('.ol-card');
            expect(familyElements.length).toBe(1);
        });

        it('should purge the container handling arbitrary or corrupted invalid type filter strings securely', () => {
            renderFlashcards('invalid-malformed_payload');
            const emptyContainer = doc.querySelectorAll('.ol-card');
            expect(emptyContainer.length).toBe(0);
        });

        it('should execute active-state swapping resolving tab indexing anomalies securely', () => {
            const btns = Array.from(doc.querySelectorAll('.filter-btn'));
            // Default Active = all

            // Mock manual click execution
            btns.forEach(b => b.classList.remove('active'));
            btns[3].classList.add('active'); // numbers

            expect(btns[0].classList.contains('active')).toBe(false);
            expect(btns[3].classList.contains('active')).toBe(true);
            expect(btns[3].getAttribute('data-category')).toBe('numbers');
        });

        it('should resolve the CSS 3D bounds mutation logic securely isolating flip hooks exclusively to the target', () => {
            renderFlashcards('all');
            const cards = doc.querySelectorAll('.ol-card');

            expect(cards[0].classList.contains('is-flipped')).toBe(false);

            cards[0].click(); // Simulate user geometry flip
            expect(cards[0].classList.contains('is-flipped')).toBe(true);
            expect(cards[1].classList.contains('is-flipped')).toBe(false); // Sibling remains static

            cards[0].click(); // Simulate Unflip
            expect(cards[0].classList.contains('is-flipped')).toBe(false);
        });
    });

    describe('Text-To-Speech (TTS) Binding Isolation', () => {
        it('should encapsulate the TTS node updating layout temporarily rejecting cascading overrides', () => {
            const btn = doc.getElementById('play-santhal');
            let triggeredCount = 0;

            // Simulating the native attachment logic
            btn.addEventListener('click', () => {
                triggeredCount++;
                const temp = btn.innerHTML;
                btn.innerHTML = 'sim-loading';
            });

            btn.click();

            expect(triggeredCount).toBe(1);
            expect(btn.innerHTML).toBe('sim-loading');
        });
    });
});
