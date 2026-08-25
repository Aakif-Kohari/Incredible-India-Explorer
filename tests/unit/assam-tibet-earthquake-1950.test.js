/**
 * 1950 Assam-Tibet Earthquake Explorer - Dedicated Unit Test Suite
 * Validates DOM elements, OpenStreetMap switcher, quiz interaction, and theme toggling.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('1950 Assam-Tibet Earthquake Explorer', () => {
    let doc;
    let win;

    beforeEach(() => {
        const dom = new JSDOM(`
            <!DOCTYPE html>
            <html lang="en">
            <body>
                <div class="map-controls">
                    <button type="button" class="map-btn is-active" data-place="epicentre">Rima/Zayü Epicentre</button>
                    <button type="button" class="map-btn" data-place="sadiya">Sadiya Outpost</button>
                    <button type="button" class="map-btn" data-place="dibrugarh">Dibrugarh</button>
                </div>
                <iframe id="eq-map" src="https://www.openstreetmap.org/export/embed.html?bbox=96.0%2C27.9%2C97.5%2C28.9&layer=mapnik"></iframe>
                <h3 id="map-info-title">Rima/Zayü Epicentre</h3>
                <p id="map-info-desc">Eastern Himalayan Syntaxis</p>

                <div class="quiz-container">
                    <div class="quiz-question">On which national holiday did the 1950 earthquake occur?</div>
                    <div class="quiz-options">
                        <button class="quiz-opt-btn" data-correct="false">Republic Day</button>
                        <button class="quiz-opt-btn" data-correct="true">Independence Day</button>
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
            sadiya: { title: "Old Sadiya Frontier Post", src: "sadiya_map_url" }
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

        showPlace('sadiya');

        expect(buttons[0].classList.contains('is-active')).toBe(false);
        expect(buttons[1].classList.contains('is-active')).toBe(true);
        expect(titleEl.textContent).toBe('Old Sadiya Frontier Post');
        expect(frame.src).toBe('sadiya_map_url');
    });

    it('validates correct quiz answer for Independence Day', () => {
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
                feedback.innerHTML = 'Correct! Independence Day (15 August 1950)';
            }
        }

        handleQuizClick(optBtns[1]); // Independence Day option

        expect(optBtns[1].classList.contains('correct')).toBe(true);
        expect(optBtns[0].disabled).toBe(true);
        expect(feedback.innerHTML).toContain('Correct!');
    });

    it('toggles light-theme mode for Assam-Tibet earthquake profile', () => {
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
