/**
 * script.js — Usha Mehta Explorer
 * Handles interactive tabs navigation, theme switching, journey bookmarking,
 * Congress Radio 42.34m frequency tuner simulator, and interactive quiz.
 */

function initTabs() {
    const tabBtns = document.querySelectorAll('.um-tab-btn');
    const tabContents = document.querySelectorAll('.um-tab-content');

    if (!tabBtns.length || !tabContents.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const targetTab = btn.getAttribute('data-tab');

            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            tabContents.forEach(c => {
                c.classList.remove('active');
            });

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const contentToShow = document.querySelector(`.um-tab-content[data-tab="${targetTab}"]`);
            if (contentToShow) {
                contentToShow.classList.add('active');
            }
        });
    });
}

function initNavigation() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme') || 'dark';
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    }

    const bookmarkBtn = document.getElementById('btnBookmark');
    if (bookmarkBtn) {
        const saved = localStorage.getItem('iie_bookmark_usha_mehta') === 'true';
        setBookmarkState(bookmarkBtn, saved);

        bookmarkBtn.addEventListener('click', () => {
            const currentState = bookmarkBtn.getAttribute('aria-pressed') === 'true';
            const newState = !currentState;
            setBookmarkState(bookmarkBtn, newState);
            localStorage.setItem('iie_bookmark_usha_mehta', newState.toString());
        });
    }
}

function setBookmarkState(btn, isBookmarked) {
    const icon = btn.querySelector('.um-bookmark-icon');
    const label = btn.querySelector('.um-bookmark-label');
    if (isBookmarked) {
        btn.setAttribute('aria-pressed', 'true');
        if (icon) icon.textContent = '★';
        if (label) label.textContent = 'Saved in Journey';
    } else {
        btn.setAttribute('aria-pressed', 'false');
        if (icon) icon.textContent = '☆';
        if (label) label.textContent = 'Save to Journey';
    }
}

function initRadioSimulator() {
    const freqSlider = document.getElementById('freqSlider');
    const freqVal = document.getElementById('freqVal');
    const btnAutoTune = document.getElementById('btnAutoTune');
    const screenStatus = document.getElementById('screenStatus');
    const screenContent = document.getElementById('screenContent');

    if (!freqSlider || !freqVal || !screenStatus || !screenContent) return;

    function updateTuner(value) {
        const valNum = parseFloat(value);
        freqVal.textContent = valNum.toFixed(2);

        // Check if frequency matches 42.34m within tolerance +/- 0.08
        if (Math.abs(valNum - 42.34) <= 0.08) {
            screenStatus.textContent = 'STATUS: SIGNAL LOCKED — 42.34 METRES';
            screenStatus.style.color = '#00d2d3';
            screenContent.innerHTML = `
                <p style="color: #ff9f43; font-weight: bold;">"THIS IS THE CONGRESS RADIO CALLING ON 42.34 METRES FROM SOMEWHERE IN INDIA."</p>
                <p style="margin-top: 8px;">• News Bulletin: The British authorities have imposed complete press censorship. Over 60,000 citizens arrested. Workers in Ahmedabad and Jamshedpur on general strike!</p>
                <p style="margin-top: 6px;">• Message from Dr. Ram Manohar Lohia: "Do not lose heart. Freedom is at our doorstep if we stand firm in satyagraha!"</p>
            `;
        } else {
            screenStatus.textContent = 'STATUS: NO SIGNAL (STATIC & DISTORTION)';
            screenStatus.style.color = '#ff6f3c';
            screenContent.innerHTML = `<p>Move the tuner slider to exactly <strong>42.34 metres</strong> to intercept the underground broadcast...</p>`;
        }
    }

    freqSlider.addEventListener('input', (e) => updateTuner(e.target.value));

    if (btnAutoTune) {
        btnAutoTune.addEventListener('click', () => {
            freqSlider.value = '42.34';
            updateTuner('42.34');
        });
    }
}

function initQuizWidget() {
    const quizOptions = document.querySelectorAll('.um-quiz-btn');
    const quizFeedback = document.getElementById('quizFeedback');

    if (!quizOptions.length || !quizFeedback) return;

    quizOptions.forEach(opt => {
        opt.addEventListener('click', () => {
            const isCorrect = opt.getAttribute('data-correct') === 'true';
            if (isCorrect) {
                quizFeedback.textContent = '🎉 Correct! Usha Mehta operated Congress Radio on 42.34 metres wavelength in 1942.';
                quizFeedback.style.color = '#00d2d3';
            } else {
                quizFeedback.textContent = '❌ Incorrect. The secret station broadcast on 42.34 metres. Try again!';
                quizFeedback.style.color = '#ff6f3c';
            }
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    initNavigation();
    initTabs();
    initRadioSimulator();
    initQuizWidget();
});
