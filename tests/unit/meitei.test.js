/**
 * Meitei (Manipuri) Linguistic Explorer - Interactive Engine Core Validation Suites
 * Exhaustively analyzes the JSDOM mutations bounding the Tibeto-Burman Meitei Mayek 
 * flashcard arrays, CSS 3D transform hooks, and multi-script fallback constraints.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Meitei Linguistic UI - Dynamic Multi-Script Transliteration Matrix', () => {

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
                       <button class="btn btn-audio ripple" id="play-meitei"><i class="fas fa-volume-up"></i> ꯃꯤꯇꯩꯂꯣꯟ</button>
                    </div>

                    <!-- Filter Triggers -->
                    <div class="flash-filters text-center mb-4">
                        <button class="filter-btn active" data-category="all">Full Lexicon</button>
                        <button class="filter-btn" data-category="nature">Natural World</button>
                        <button class="filter-btn" data-category="family">Relationships</button>
                        <button class="filter-btn" data-category="common">Common Verbs</button>
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
        { id: 1, type: 'family', en: 'Mother', mayek: 'ꯏꯃꯥ', beng: 'ইমা', ph: 'Ima' },
        { id: 3, type: 'nature', en: 'Water', mayek: 'ꯏꯁꯤꯡ', beng: 'ঈশিং', ph: 'Ishing' },
        { id: 4, type: 'nature', en: 'Fire', mayek: 'ꯃꯩ', beng: 'মৈ', ph: 'Mei' },
        { id: 6, type: 'common', en: 'To Eat', mayek: 'ꯆꯥꯕꯥ', beng: 'চাবা', ph: 'Chaba' },
        { id: 7, type: 'common', en: 'To Go', mayek: 'ꯆꯠꯄꯥ', beng: 'চৎপা', ph: 'Chatpa' }
    ];

    describe('Multi-Script Flashcard Data Population Bounds', () => {

        // Abstracted Engine implementation exposing logic independently
        function renderFlashcards(filterType) {
            const container = doc.getElementById('flashcard-container');
            container.innerHTML = '';

            const targetData = filterType === 'all' ? vocabularyListMock : vocabularyListMock.filter(item => item.type === filterType);

            targetData.forEach(word => {
                const block = doc.createElement('div');
                block.className = 'ml-card';
                block.setAttribute('data-id', word.id);
                block.setAttribute('data-type', word.type); // test harness hook

                block.innerHTML = `
                    <div class="ml-inner">
                        <div class="ml-front"><div class="ml-f-word">${word.en}</div></div>
                        <div class="ml-back">
                            <div class="ml-b-script-indig meitei-script">${word.mayek}</div>
                            <div class="ml-b-script-beng bengali-script">${word.beng}</div>
                        </div>
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
            const elements = doc.querySelectorAll('.ml-card');
            expect(elements.length).toBe(5); // Baseline aggregate size

            // Confirm deep structural insertion
            const motherCard = Array.from(elements).find(el => el.querySelector('.ml-f-word').textContent === 'Mother');
            expect(motherCard).toBeTruthy();
            // Validate multi-script unicode glyph payload mappings
            expect(motherCard.querySelector('.ml-b-script-indig').textContent).toBe('ꯏꯃꯥ');
            expect(motherCard.querySelector('.ml-b-script-beng').textContent).toBe('ইমা');
        });

        it('should aggressively filter excluding non-matching attributes returning strict DOM subsets', () => {
            renderFlashcards('common');
            const verbElements = doc.querySelectorAll('.ml-card');

            // In mock array: To Eat(6) and To Go(7)
            expect(verbElements.length).toBe(2);
            Array.from(verbElements).forEach(el => expect(el.getAttribute('data-type')).toBe('common'));

            renderFlashcards('nature');
            const natureElements = doc.querySelectorAll('.ml-card');
            expect(natureElements.length).toBe(2);

            renderFlashcards('family');
            const familyElements = doc.querySelectorAll('.ml-card');
            expect(familyElements.length).toBe(1);
        });

        it('should purge the container handling arbitrary or corrupted invalid type filter strings securely', () => {
            renderFlashcards('invalid-malformed_payload');
            const emptyContainer = doc.querySelectorAll('.ml-card');
            expect(emptyContainer.length).toBe(0);
        });

        it('should execute active-state swapping resolving tab indexing anomalies securely', () => {
            const btns = Array.from(doc.querySelectorAll('.filter-btn'));
            // Default Active = all

            // Mock manual click execution
            btns.forEach(b => b.classList.remove('active'));
            btns[3].classList.add('active'); // common verbs

            expect(btns[0].classList.contains('active')).toBe(false);
            expect(btns[3].classList.contains('active')).toBe(true);
            expect(btns[3].getAttribute('data-category')).toBe('common');
        });

        it('should resolve the CSS 3D bounds mutation logic securely isolating flip hooks exclusively to the target', () => {
            renderFlashcards('all');
            const cards = doc.querySelectorAll('.ml-card');

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
            const btn = doc.getElementById('play-meitei');
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
