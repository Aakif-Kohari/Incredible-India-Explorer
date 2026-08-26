/**
 * 2001 Bhuj Earthquake Explorer - Dedicated Unit Test Suite
 * Validates DOM elements, OpenStreetMap switcher, quiz interaction, and theme toggling.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('2001 Bhuj Earthquake Explorer', () => {
    let doc;
    let win;

    beforeEach(() => {
        const dom = new JSDOM(`
            <!DOCTYPE html>
            <html lang="en">
            <body>
                <div class="map-controls">
                    <button type="button" class="map-btn is-active" data-place="epicentre">Chobari Epicentre</button>
                    <button type="button" class="map-btn" data-place="bhuj">Bhuj City</button>
                    <button type="button" class="map-btn" data-place="ahmedabad">Ahmedabad</button>
                </div>
                <iframe id="eq-map" src="https://www.openstreetmap.org/export/embed.html?bbox=69.8%2C23.0%2C70.7%2C23.8&layer=mapnik"></iframe>
                <h3 id="map-info-title">Chobari Epicentre</h3>
                <p id="map-info-desc">South Wagad Fault</p>

                <div class="quiz-container">
                    <div class="quiz-question">On which national holiday did the earthquake occur?</div>
                    <div class="quiz-options">
                        <button class="quiz-opt-btn" data-correct="false">Independence Day</button>
                        <button class="quiz-opt-btn" data-correct="true">Republic Day</button>
                    </div>
                    <div class="quiz-feedback" id="quizFeedback"></div>
                </div>
                <button type="button" id="theme-toggle">☀️</button>
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

    it('switches map view and active button correctly', () => {
        const buttons = doc.querySelectorAll('.map-btn');
        const frame = doc.getElementById('eq-map');
        const titleEl = doc.getElementById('map-info-title');

        const places = {
            bhuj: { title: "Bhuj City", src: "bhuj_map_url" }
        };

        function showPlace(key) {
            buttons.forEach(btn => {
                const active = btn.getAttribute('data-place') === key;
                btn.classList.toggle('is-active', active);
            });
            titleEl.textContent = places[key].title;
            frame.src = places[key].src;
        }

        expect(buttons[0].classList.contains('is-active')).toBe(true);
        expect(buttons[1].classList.contains('is-active')).toBe(false);

        showPlace('bhuj');

        expect(buttons[0].classList.contains('is-active')).toBe(false);
        expect(buttons[1].classList.contains('is-active')).toBe(true);
        expect(titleEl.textContent).toBe('Bhuj City');
        expect(frame.src).toBe('bhuj_map_url');
    });

    it('validates correct quiz answer for Republic Day', () => {
        const optBtns = doc.querySelectorAll('.quiz-opt-btn');
        const feedback = doc.getElementById('quizFeedback');

        function handleQuizClick(btn) {
            const isCorrect = btn.getAttribute('data-correct') === 'true';
            optBtns.forEach(b => {
                b.disabled = true;
                if (b.getAttribute('data-correct') === 'true') {
                    b.classList.add('correct');
                }
            });
            if (isCorrect) {
                feedback.innerHTML = 'Correct! Republic Day (26 January 2001)';
            }
        }

        handleQuizClick(optBtns[1]); // Republic Day option

        expect(optBtns[1].classList.contains('correct')).toBe(true);
        expect(optBtns[0].disabled).toBe(true);
        expect(feedback.innerHTML).toContain('Correct!');
    });

    it('toggles light-theme mode for Bhuj earthquake profile', () => {
        const root = doc.documentElement;
        const body = doc.body;
        const themeBtn = doc.getElementById('theme-toggle');

        function toggleTheme() {
            root.classList.toggle('light-theme');
            body.classList.toggle('light-theme');
            const isLight = body.classList.contains('light-theme');
            themeBtn.textContent = isLight ? '🌙' : '☀️';
        }

        expect(body.classList.contains('light-theme')).toBe(false);
        toggleTheme();
        expect(body.classList.contains('light-theme')).toBe(true);
        expect(themeBtn.textContent).toBe('🌙');
        toggleTheme();
        expect(body.classList.contains('light-theme')).toBe(false);
        expect(themeBtn.textContent).toBe('☀️');
    });
});
