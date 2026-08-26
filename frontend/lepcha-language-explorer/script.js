/**
 * Interactive Script for Lepcha Language Explorer
 * Issue: #2403 — ᰛᰩᰵᰶ and Sikkim's Linguistic Heritage
 *
 * Renders every section from window.LEPCHA_DATA and wires up:
 *   - theme toggle (dark/light, persisted to localStorage)
 *   - the quiz engine (5 questions, restart support)
 *   - the speech-synthesis pronunciation buttons
 */

document.addEventListener('DOMContentLoaded', () => {
    const data = window.LEPCHA_DATA;
    if (!data) {
        console.error('Lepcha dataset missing!');
        return;
    }

    // ── 1. Theme Toggle ──────────────────────────────────────────
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const savedTheme = localStorage.getItem('lepcha_theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            document.body.classList.remove('dark-theme');
            themeBtn.textContent = '🌙 Theme';
        } else {
            themeBtn.textContent = '☀️ Theme';
        }

        themeBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            document.body.classList.toggle('dark-theme', !isLight);
            themeBtn.textContent = isLight ? '🌙 Theme' : '☀️ Theme';
            localStorage.setItem('lepcha_theme', isLight ? 'light' : 'dark');
        });
    }

    // ── 2. Overview ──────────────────────────────────────────────
    const ov = data.overview;
    document.getElementById('overview-description').textContent = ov.description;
    document.getElementById('meta-family').textContent = ov.family;
    document.getElementById('meta-speakers').textContent = ov.speakers;
    document.getElementById('meta-iso').textContent = ov.isoCode;
    document.getElementById('meta-romanization').textContent = ov.romanization;

    // Genealogy + characteristics
    const gen = data.genealogy;
    document.getElementById('genealogy-path').textContent =
        `${gen.root} → ${gen.branch} → ${gen.subgroup}`;
    const charGrid = document.getElementById('characteristics-grid');
    charGrid.innerHTML = gen.characteristics.map(c => `
        <div class="characteristic-item">
            <h4>${c.title}</h4>
            <p>${c.desc}</p>
        </div>
    `).join('');

    // ── 3. Scripts ──────────────────────────────────────────────
    const scriptsContainer = document.getElementById('scripts-container');
    scriptsContainer.innerHTML = data.scripts.map(s => `
        <div class="script-card">
            <h3>${s.name}</h3>
            <span class="script-status">${s.status}</span>
            <p>${s.desc}</p>
        </div>
    `).join('');

    // ── 4. Greetings ────────────────────────────────────────────
    const greetingsContainer = document.getElementById('greetings-container');
    greetingsContainer.innerHTML = data.greetings.map((g, i) => `
        <div class="greeting-card">
            <div class="greeting-native" lang="lep">${g.native}</div>
            <div class="greeting-translit">${g.transliteration}</div>
            <div class="greeting-pron">🔊 ${g.pronunciation}</div>
            <div class="greeting-meaning"><strong>${g.meaning}</strong></div>
            <div class="greeting-context">${g.context}</div>
            <button class="audio-btn" data-pron="${g.pronunciation}" data-index="${i}" aria-label="Pronounce ${g.transliteration}">
                🔊 Play
            </button>
        </div>
    `).join('');

    greetingsContainer.querySelectorAll('.audio-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const pron = btn.getAttribute('data-pron');
            speakText(pron);
        });
    });

    // ── 5. Vocabulary ────────────────────────────────────────────
    const vocabContainer = document.getElementById('vocabulary-container');
    vocabContainer.innerHTML = data.vocabulary.map(v => `
        <div class="vocab-card">
            <div class="vocab-concept">${v.concept}</div>
            <div class="vocab-native" lang="lep">${v.native}</div>
            <div class="vocab-translit">${v.transliteration}</div>
            <div class="vocab-pron">🔊 ${v.pronunciation}</div>
            <div class="vocab-meaning">${v.meaning}</div>
        </div>
    `).join('');

    // ── 6. Regions ──────────────────────────────────────────────
    const regionsContainer = document.getElementById('regions-container');
    regionsContainer.innerHTML = data.regions.map(r => `
        <div class="region-card">
            <h3>📍 ${r.name}</h3>
            <p class="region-speakers">👥 ${r.speakers}</p>
            <p class="region-desc">${r.description}</p>
            <p class="region-dialect">${r.dialectNotes}</p>
        </div>
    `).join('');

    // ── 7. Heritage ─────────────────────────────────────────────
    const heritageContainer = document.getElementById('heritage-container');
    heritageContainer.innerHTML = data.heritage.map(h => `
        <div class="heritage-card">
            <h3>${h.title}</h3>
            <p>${h.description}</p>
        </div>
    `).join('');

    // ── 8. Quiz ─────────────────────────────────────────────────
    initQuiz(data.quiz);

    // ── 9. Sources ──────────────────────────────────────────────
    const sourcesContainer = document.getElementById('sources-container');
    sourcesContainer.innerHTML = data.sources.map(s => `
        <div class="source-card">
            <a href="${s.url}" target="_blank" rel="noopener noreferrer">${s.title}</a>
            <span class="source-note">${s.note}</span>
        </div>
    `).join('');

    // ── 10. Nav active link on scroll ───────────────────────────
    initNavScrollSpy();
});

// ── Quiz engine ─────────────────────────────────────────────────
function initQuiz(questions) {
    const container = document.getElementById('quiz-container');
    if (!container) return;

    let currentIndex = 0;
    let score = 0;

    function render() {
        if (currentIndex >= questions.length) {
            container.innerHTML = `
                <div class="quiz-card">
                    <div class="quiz-score">Quiz Complete! 🎉</div>
                    <p style="text-align:center; font-size:1.1rem; color:var(--lepcha-text);">
                        Your score: <strong>${score} / ${questions.length}</strong>
                    </p>
                    <button class="quiz-restart" id="quiz-restart">Restart Quiz 🔄</button>
                </div>
            `;
            document.getElementById('quiz-restart').addEventListener('click', () => {
                currentIndex = 0;
                score = 0;
                render();
            });
            return;
        }

        const q = questions[currentIndex];
        container.innerHTML = `
            <div class="quiz-card">
                <div class="quiz-progress">Question ${currentIndex + 1} of ${questions.length}</div>
                <div class="quiz-question">${q.question}</div>
                <div>
                    ${q.options.map((opt, i) => `
                        <button class="quiz-option" data-index="${i}">${opt}</button>
                    `).join('')}
                </div>
                <div class="quiz-explanation" id="quiz-explanation"></div>
            </div>
        `;

        container.querySelectorAll('.quiz-option').forEach(btn => {
            btn.addEventListener('click', () => {
                const idx = parseInt(btn.getAttribute('data-index'), 10);
                handleAnswer(idx, q.answer, q.explanation);
            });
        });
    }

    function handleAnswer(selectedIdx, correctIdx, explanation) {
        const options = container.querySelectorAll('.quiz-option');
        options.forEach((opt, i) => {
            opt.disabled = true;
            if (i === correctIdx) opt.classList.add('correct');
            if (i === selectedIdx && i !== correctIdx) opt.classList.add('incorrect');
        });

        if (selectedIdx === correctIdx) score++;

        const expBox = container.querySelector('#quiz-explanation');
        if (expBox) {
            expBox.style.display = 'block';
            expBox.innerHTML = `<strong>${selectedIdx === correctIdx ? '✅ Correct!' : '❌ Incorrect.'}</strong> ${explanation}`;
        }

        setTimeout(() => {
            currentIndex++;
            render();
        }, 3000);
    }

    render();
}

// ── Speech synthesis for pronunciation ──────────────────────────
function speakText(text) {
    if (!('speechSynthesis' in window)) {
        console.warn('Speech synthesis not supported in this browser.');
        return;
    }
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = 'en-US';
    utter.rate = 0.85;
    window.speechSynthesis.speak(utter);
}

// ── Nav scroll-spy ──────────────────────────────────────────────
function initNavScrollSpy() {
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a.nav-link');
    if (sections.length === 0 || navLinks.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.id;
                navLinks.forEach(link => {
                    link.classList.toggle('active',
                        link.getAttribute('href') === `#${id}`);
                });
            }
        });
    }, { rootMargin: '-30% 0px -60% 0px' });

    sections.forEach(s => observer.observe(s));
}
