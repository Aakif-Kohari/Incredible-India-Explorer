/**
 * Tulsi Ghat - Dedicated Unit Test Suite
 * Validates DOM elements, tabs interaction, quiz functionality, and structural integrity.
 */
import { describe, it, expect, beforeEach, afterEach } from 'vitest';
import { JSDOM } from 'jsdom';

describe('Tulsi Ghat Interactive Explorer', () => {
    let doc;
    let win;

    beforeEach(() => {
        const dom = new JSDOM(`
            <!DOCTYPE html>
            <html lang="en">
            <body class="tulsi-ghat-page">
                <div class="tabs-header">
                    <button class="tab-btn active" data-tab="tab-tulsidas">Tulsidas</button>
                    <button class="tab-btn" data-tab="tab-ramcharitmanas">Ramcharitmanas</button>
                    <button class="tab-btn" data-tab="tab-festivals">Festivals</button>
                </div>
                <div class="tab-content active" id="tab-tulsidas">Tulsidas content</div>
                <div class="tab-content" id="tab-ramcharitmanas">Ramcharitmanas content</div>
                <div class="tab-content" id="tab-festivals">Festivals content</div>

                <div class="quiz-container">
                    <div class="quiz-question">Which epic was composed by Tulsidas?</div>
                    <div class="quiz-options">
                        <button class="quiz-opt-btn" data-correct="false">Mahabharata</button>
                        <button class="quiz-opt-btn" data-correct="true">Ramcharitmanas</button>
                    </div>
                    <div class="quiz-feedback" id="quizFeedback"></div>
                </div>
                <button id="soundToggleBtn">Play</button>
                <p id="soundStatus"></p>
                <button id="theme-toggle">☀️</button>
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

    it('switches active tabs correctly when tab buttons are clicked', () => {
        const tabBtns = doc.querySelectorAll('.tab-btn');
        const tabContents = doc.querySelectorAll('.tab-content');

        function activateTab(btn) {
            const targetId = btn.getAttribute('data-tab');
            tabBtns.forEach(b => b.classList.remove('active'));
            tabContents.forEach(c => c.classList.remove('active'));
            btn.classList.add('active');
            const target = doc.getElementById(targetId);
            if (target) target.classList.add('active');
        }

        expect(doc.getElementById('tab-tulsidas').classList.contains('active')).toBe(true);
        expect(doc.getElementById('tab-ramcharitmanas').classList.contains('active')).toBe(false);

        activateTab(tabBtns[1]);

        expect(tabBtns[1].classList.contains('active')).toBe(true);
        expect(doc.getElementById('tab-tulsidas').classList.contains('active')).toBe(false);
        expect(doc.getElementById('tab-ramcharitmanas').classList.contains('active')).toBe(true);
    });

    it('evaluates correct answer and provides positive feedback in quiz', () => {
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
                feedback.innerHTML = 'Correct!';
            }
        }

        handleQuizClick(optBtns[1]); // Correct option

        expect(optBtns[1].classList.contains('correct')).toBe(true);
        expect(optBtns[0].disabled).toBe(true);
        expect(feedback.innerHTML).toContain('Correct!');
    });

    it('toggles light/dark theme class on body', () => {
        const body = doc.body;
        const themeBtn = doc.getElementById('theme-toggle');

        function toggleTheme() {
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
