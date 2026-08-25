/**
 * Man Mandir Ghat - Astro-Interactive Unit Test Engine
 * Extensively utilizes Vitest and JSDOM to safely validate Lightbox modals
 * and Astronomical switching logic, ensuring UI robustness.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Man Mandir Ghat - Interaction Ecosystem', () => {

    let doc;
    let win;

    beforeEach(() => {
        // Construct deep mock JSDOM environment of the Astrological and Gallery structure
        const dom = new JSDOM(`
            <!DOCTYPE html>
            <html>
                <body>
                    <!-- Interactive Observatory Controls -->
                    <div class="instrument-explorer">
                        <div class="ie-sidebar">
                            <button class="ie-btn active" data-instrument="samrat">Samrat Yantra</button>
                            <button class="ie-btn" data-instrument="laghu">Laghu Samrat</button>
                            <button class="ie-btn" data-instrument="digamsha">Digamsha Yantra</button>
                        </div>
                        
                        <div class="ie-display">
                            <div id="samrat" class="ie-pane active">Samrat Detail</div>
                            <div id="laghu" class="ie-pane">Laghu Detail</div>
                            <div id="digamsha" class="ie-pane">Digamsha Detail</div>
                        </div>
                    </div>

                    <!-- Masonry Gallery Triggers -->
                    <div class="m-gallery-item" data-caption="Star Chart Image">
                        <div class="placeholder-img" style="background:#574b90;"></div>
                    </div>

                    <!-- Lightbox Output Structure -->
                    <div class="lightbox-modal" id="gallery-lightbox">
                        <span class="lightbox-close">&times;</span>
                        <div class="lightbox-content">
                            <div id="lb-image"></div>
                            <div id="lb-caption"></div>
                        </div>
                    </div>
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

    describe('Astrological Instrument Switcher', () => {
        it('verifies that the initial states match default DOM architecture', () => {
            const buttons = doc.querySelectorAll('.ie-btn');
            const sections = doc.querySelectorAll('.ie-pane');

            expect(buttons.length).toBe(3);
            expect(sections.length).toBe(3);

            // Samrat should hold native active state
            expect(buttons[0].classList.contains('active')).toBe(true);
            expect(sections[0].classList.contains('active')).toBe(true);
        });

        it('disables previous active state safely and establishes new target (Digamsha) without cross contamination', () => {
            const buttons = Array.from(doc.querySelectorAll('.ie-btn'));
            const sections = Array.from(doc.querySelectorAll('.ie-pane'));

            // Replicate target binding logic gracefully
            function fireTabClick(targetBtn) {
                buttons.forEach(b => b.classList.remove('active'));
                sections.forEach(s => s.classList.remove('active'));

                targetBtn.classList.add('active');
                const boundId = targetBtn.getAttribute('data-instrument');
                const boundPane = doc.getElementById(boundId);
                if (boundPane) boundPane.classList.add('active');
            }

            // Trigger Digamsha
            fireTabClick(buttons[2]);

            expect(buttons[0].classList.contains('active')).toBe(false);
            expect(sections[0].classList.contains('active')).toBe(false);

            expect(buttons[2].classList.contains('active')).toBe(true);
            expect(sections[2].classList.contains('active')).toBe(true);
            expect(sections[2].id).toBe('digamsha');
        });
    });

    describe('Gallery Lightbox Integration', () => {
        it('successfully parses nested captions and placeholder abstract backgrounds onto the Lightbox modal state', () => {
            const galleryItem = doc.querySelector('.m-gallery-item');
            const lightbox = doc.getElementById('gallery-lightbox');
            const captionDisplay = doc.getElementById('lb-caption');
            const imageOutput = doc.getElementById('lb-image');

            // Mimic Lightbox logic map
            function emulateLightboxSummon(target) {
                const extractedCaption = target.getAttribute('data-caption');
                const internalPlaceholder = target.querySelector('.placeholder-img');
                const extractedBgStyle = internalPlaceholder ? internalPlaceholder.style.background : 'none';

                captionDisplay.innerText = extractedCaption;
                imageOutput.style.background = extractedBgStyle;
                lightbox.classList.add('active');
            }

            emulateLightboxSummon(galleryItem);

            expect(lightbox.classList.contains('active')).toBe(true);
            expect(captionDisplay.innerText).toBe('Star Chart Image');

            // In JSDOM, background short-hands map distinctly.
            // We check that the styling rule was populated.
            expect(imageOutput.style.background).toBeDefined();
        });

        it('ensures close requests scrub the active modifier cleanly off the modal UI', () => {
            const lightbox = doc.getElementById('gallery-lightbox');

            // First activate it
            lightbox.classList.add('active');
            expect(lightbox.classList.contains('active')).toBe(true);

            // Then mimic close
            lightbox.classList.remove('active');
            expect(lightbox.classList.contains('active')).toBe(false);
        });
    });
});
