/**
 * Interactive Script for Shina Language Explorer (Dardic Himalayan Heritage of Ladakh)
 */

document.addEventListener('DOMContentLoaded', () => {
    const data = window.SHINA_DATA;
    if (!data) {
        console.error("Shina dataset missing!");
        return;
    }

    // -------------------------------------------------------------------------
    // 1. Theme Toggle
    // -------------------------------------------------------------------------
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        const savedTheme = localStorage.getItem('shina_theme') || 'dark';
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeBtn.textContent = '🌙 Theme';
        } else {
            themeBtn.textContent = '☀️ Theme';
        }

        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            themeBtn.textContent = isLight ? '🌙 Theme' : '☀️ Theme';
            localStorage.setItem('shina_theme', isLight ? 'light' : 'dark');
        });
    }

    // -------------------------------------------------------------------------
    // 2. Audio Player (SpeechSynthesis + Phonetic Audio)
    // -------------------------------------------------------------------------
    let voices = [];
    function loadVoices() {
        if ('speechSynthesis' in window) {
            voices = window.speechSynthesis.getVoices();
        }
    }
    if ('speechSynthesis' in window) {
        window.speechSynthesis.onvoiceschanged = loadVoices;
        loadVoices();
    }

    function playAudio(text, lang = 'hi-IN') {
        if (!('speechSynthesis' in window)) {
            alert(`Pronunciation: "${text}" (Speech synthesis not supported on this browser)`);
            return;
        }

        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = 0.85;
        utterance.pitch = 1.02;
        utterance.lang = lang;

        const bestVoice = voices.find(v => v.lang.startsWith('ur') || v.lang.startsWith('hi') || v.lang.startsWith('ks') || v.lang.startsWith('en-IN'));
        if (bestVoice) {
            utterance.voice = bestVoice;
        }

        window.speechSynthesis.speak(utterance);
    }

    // -------------------------------------------------------------------------
    // 3. Interactive 4-Step Vocab Showcase Slider & Word Chips
    // -------------------------------------------------------------------------
    let currentVocabIdx = 0;
    const vocabList = data.vocabulary || [];

    const sliderNative = document.getElementById('slider-native');
    const sliderTranslit = document.getElementById('slider-translit');
    const sliderPronounce = document.getElementById('slider-pronounce');
    const sliderMeaning = document.getElementById('slider-meaning');
    const sliderNotes = document.getElementById('slider-notes');
    const sliderCounter = document.getElementById('slider-counter');
    const btnPlaySlider = document.getElementById('btn-play-slider');
    const btnPrevSlider = document.getElementById('btn-prev-slider');
    const btnNextSlider = document.getElementById('btn-next-slider');
    const vocabChipsBar = document.getElementById('vocab-chips-bar');

    function renderSlider(idx) {
        if (vocabList.length === 0) return;
        currentVocabIdx = (idx + vocabList.length) % vocabList.length;
        const item = vocabList[currentVocabIdx];

        if (sliderNative) sliderNative.textContent = item.native;
        if (sliderTranslit) sliderTranslit.textContent = item.transliteration;
        if (sliderPronounce) sliderPronounce.textContent = `IPA: ${item.ipa} • Phonetic: ${item.phonetic}`;
        if (sliderMeaning) sliderMeaning.textContent = `${item.concept}: ${item.meaning}`;
        if (sliderNotes) sliderNotes.textContent = `💡 ${item.notes}`;
        if (sliderCounter) sliderCounter.textContent = `${currentVocabIdx + 1} / ${vocabList.length}`;

        // Update active chip
        if (vocabChipsBar) {
            vocabChipsBar.querySelectorAll('.vocab-chip').forEach((chip, i) => {
                chip.classList.toggle('active', i === currentVocabIdx);
            });
        }
    }

    if (vocabChipsBar && vocabList.length > 0) {
        vocabChipsBar.innerHTML = vocabList.map((item, i) => `
            <button class="vocab-chip ${i === 0 ? 'active' : ''}" data-idx="${i}">
                ${item.concept} (${item.transliteration})
            </button>
        `).join('');

        vocabChipsBar.querySelectorAll('.vocab-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                renderSlider(parseInt(chip.dataset.idx, 10));
            });
        });
    }

    if (btnPrevSlider) {
        btnPrevSlider.addEventListener('click', () => renderSlider(currentVocabIdx - 1));
    }
    if (btnNextSlider) {
        btnNextSlider.addEventListener('click', () => renderSlider(currentVocabIdx + 1));
    }
    if (btnPlaySlider) {
        btnPlaySlider.addEventListener('click', () => {
            const item = vocabList[currentVocabIdx];
            if (item) playAudio(item.phonetic || item.transliteration);
        });
    }

    renderSlider(0);

    // -------------------------------------------------------------------------
    // 4. Interactive Pronunciation Panel (Requirement: Hear Individual Words)
    // -------------------------------------------------------------------------
    const pronounceGrid = document.getElementById('pronounce-tiles-grid');
    if (pronounceGrid && vocabList.length > 0) {
        pronounceGrid.innerHTML = vocabList.map(v => `
            <div class="pronounce-tile" data-audio="${v.phonetic || v.transliteration}">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div class="tile-word">${v.native}</div>
                    <span style="font-size: 1.1rem; color: var(--accent-cyan-bright);">🔊</span>
                </div>
                <div class="tile-translit">${v.transliteration}</div>
                <div style="font-size: 0.78rem; color: var(--text-secondary); margin-top: 2px;">IPA: ${v.ipa}</div>
                <div class="tile-meaning">${v.concept}: ${v.meaning}</div>
            </div>
        `).join('');

        pronounceGrid.querySelectorAll('.pronounce-tile').forEach(tile => {
            tile.addEventListener('click', () => {
                playAudio(tile.dataset.audio);
            });
        });
    }

    // -------------------------------------------------------------------------
    // 5. Regional Map Interactivity
    // -------------------------------------------------------------------------
    const regionPaths = document.querySelectorAll('.region-path');
    const mapTitle = document.getElementById('map-region-title');
    const mapBadge = document.getElementById('map-region-badge');
    const mapDesc = document.getElementById('map-region-desc');

    function selectRegion(regionId) {
        regionPaths.forEach(p => {
            p.classList.toggle('active', p.dataset.id === regionId);
        });

        const regData = data.regions.find(r => r.id === regionId);
        if (regData && mapTitle && mapBadge && mapDesc) {
            mapTitle.textContent = regData.name;
            mapBadge.textContent = regData.speakers;
            mapBadge.style.backgroundColor = regData.color;
            mapDesc.innerHTML = `
                <p style="margin-bottom: 14px; font-size: 1rem; color: var(--text-secondary);">${regData.desc}</p>
                <div style="font-size: 0.88rem; color: var(--text-muted); background: rgba(255,255,255,0.03); padding: 12px 16px; border-radius: 8px; border-left: 3px solid ${regData.color};">
                    <strong style="color: var(--text-primary);">Key Settlements:</strong> ${regData.subRegions.join(', ')}
                </div>
            `;
        }
    }

    regionPaths.forEach(path => {
        path.addEventListener('click', () => selectRegion(path.dataset.id));
    });

    if (data.regions.length > 0) {
        selectRegion(data.regions[0].id);
    }

    // -------------------------------------------------------------------------
    // 6. Greetings Soundboard & Search
    // -------------------------------------------------------------------------
    const greetingsGrid = document.getElementById('greetings-grid');
    const greetingSearch = document.getElementById('greeting-search');

    function renderGreetings(filter = '') {
        if (!greetingsGrid) return;
        const q = filter.toLowerCase();
        const list = (data.greetings || []).filter(g => 
            g.transliteration.toLowerCase().includes(q) ||
            g.meaning.toLowerCase().includes(q) ||
            g.native.includes(q)
        );

        if (list.length === 0) {
            greetingsGrid.innerHTML = `<p style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 20px;">No greetings found matching "${filter}".</p>`;
            return;
        }

        greetingsGrid.innerHTML = list.map(g => `
            <div class="greeting-card">
                <div>
                    <span class="region-badge" style="background: rgba(2, 132, 199, 0.2); color: var(--accent-cyan-bright); margin-bottom: 12px; display: inline-block;">${g.category}</span>
                    <div class="greeting-native">${g.native}</div>
                    <div class="greeting-translit">${g.transliteration}</div>
                    <div style="font-size: 0.82rem; color: var(--text-muted); margin-bottom: 8px;">IPA: ${g.ipa} • Pronounce: <strong>${g.phonetic}</strong></div>
                    <div class="greeting-meaning">${g.meaning}</div>
                    <div class="greeting-context">${g.context}</div>
                </div>
                <button class="btn-audio" data-audio="${g.audioText || g.transliteration}" style="width: 100%; justify-content: center;">
                    🔊 Play Pronunciation
                </button>
            </div>
        `).join('');

        greetingsGrid.querySelectorAll('.btn-audio').forEach(btn => {
            btn.addEventListener('click', () => {
                playAudio(btn.dataset.audio);
            });
        });
    }

    if (greetingSearch) {
        greetingSearch.addEventListener('input', (e) => renderGreetings(e.target.value));
    }
    renderGreetings();

    // -------------------------------------------------------------------------
    // 7. Vocabulary Matrix Table & Filter
    // -------------------------------------------------------------------------
    const vocabTableBody = document.getElementById('vocab-table-body');
    const vocabSearch = document.getElementById('vocab-search');

    function renderVocabTable(filter = '') {
        if (!vocabTableBody) return;
        const q = filter.toLowerCase();
        const list = (data.vocabulary || []).filter(v =>
            v.concept.toLowerCase().includes(q) ||
            v.transliteration.toLowerCase().includes(q) ||
            v.meaning.toLowerCase().includes(q) ||
            v.native.includes(q)
        );

        if (list.length === 0) {
            vocabTableBody.innerHTML = `<tr><td colspan="6" style="text-align: center; color: var(--text-muted); padding: 20px;">No vocabulary items found.</td></tr>`;
            return;
        }

        vocabTableBody.innerHTML = list.map(v => `
            <tr>
                <td style="font-weight: 700; color: var(--text-primary);">${v.concept}</td>
                <td class="vocab-native">${v.native}</td>
                <td style="font-family: var(--font-mono); color: var(--accent-amber); font-weight: 600;">${v.transliteration}</td>
                <td>IPA: ${v.ipa}<br><small style="color: var(--text-muted); font-weight: 600;">${v.phonetic}</small></td>
                <td>${v.meaning}</td>
                <td>
                    <button class="btn-mini-play" data-word="${v.phonetic || v.transliteration}">🔊 Listen</button>
                </td>
            </tr>
        `).join('');

        vocabTableBody.querySelectorAll('.btn-mini-play').forEach(btn => {
            btn.addEventListener('click', () => playAudio(btn.dataset.word));
        });
    }

    if (vocabSearch) {
        vocabSearch.addEventListener('input', (e) => renderVocabTable(e.target.value));
    }
    renderVocabTable();

    // -------------------------------------------------------------------------
    // 8. Cultural Heritage Showcase
    // -------------------------------------------------------------------------
    const cultureGrid = document.getElementById('culture-grid');
    if (cultureGrid && data.culturalHeritage) {
        cultureGrid.innerHTML = data.culturalHeritage.map(c => `
            <div class="culture-card">
                <div class="culture-card-body">
                    <div style="font-size: 2rem; margin-bottom: 8px;">${c.icon}</div>
                    <span class="region-badge" style="background: rgba(2, 132, 199, 0.2); color: var(--accent-cyan-bright); margin-bottom: 12px; display: inline-block;">${c.category}</span>
                    <h3 class="culture-title">${c.title}</h3>
                    <p class="culture-text">${c.content}</p>
                </div>
            </div>
        `).join('');
    }

    // -------------------------------------------------------------------------
    // 9. Interactive Quiz
    // -------------------------------------------------------------------------
    const quizContainer = document.getElementById('quiz-card');
    let currentQ = 0;
    let score = 0;
    const questions = data.quizQuestions || [];

    function renderQuiz() {
        if (!quizContainer || questions.length === 0) return;

        if (currentQ >= questions.length) {
            quizContainer.innerHTML = `
                <div style="text-align: center; padding: 24px;">
                    <div style="font-size: 3.5rem; margin-bottom: 14px;">🏆</div>
                    <h3 style="font-size: 2rem; margin-bottom: 10px; font-weight: 800;">Quiz Completed!</h3>
                    <p style="font-size: 1.3rem; color: var(--accent-cyan-bright); margin-bottom: 20px; font-weight: 700;">Your Score: ${score} / ${questions.length}</p>
                    <p style="color: var(--text-secondary); margin-bottom: 28px; max-width: 500px; margin-left: auto; margin-right: auto;">
                        ${score === questions.length ? 'Mishto han! You have demonstrated outstanding mastery of the Shina language, Dardic linguistics, and Drass heritage!' : 'Great effort! Revisit the pronunciation panel and greetings soundboard to master every concept.'}
                    </p>
                    <button class="btn-audio" id="btn-restart-quiz">🔄 Restart Quiz</button>
                </div>
            `;
            document.getElementById('btn-restart-quiz').addEventListener('click', () => {
                currentQ = 0;
                score = 0;
                renderQuiz();
            });
            return;
        }

        const q = questions[currentQ];
        quizContainer.innerHTML = `
            <div style="display: flex; justify-content: space-between; margin-bottom: 18px; font-size: 0.88rem; color: var(--text-muted); font-weight: 600;">
                <span>Question ${currentQ + 1} of ${questions.length}</span>
                <span>Score: ${score}</span>
            </div>
            <div class="quiz-q">${q.question}</div>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <button class="q-opt" data-idx="${i}">${opt}</button>
                `).join('')}
            </div>
            <div id="quiz-feedback" style="display: none; margin-top: 20px; padding: 16px; border-radius: 12px; font-size: 0.95rem; font-weight: 600;"></div>
            <button id="btn-next-q" class="btn-audio" style="display: none; margin-top: 20px; width: 100%; justify-content: center;">Next Question ➔</button>
        `;

        const optBtns = quizContainer.querySelectorAll('.q-opt');
        const feedback = document.getElementById('quiz-feedback');
        const nextBtn = document.getElementById('btn-next-q');

        optBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const selected = parseInt(btn.dataset.idx, 10);
                optBtns.forEach(b => b.disabled = true);

                if (selected === q.correct) {
                    score++;
                    btn.classList.add('correct');
                    feedback.style.display = 'block';
                    feedback.style.background = 'rgba(2, 132, 199, 0.25)';
                    feedback.style.border = '1px solid #0284c7';
                    feedback.style.color = '#38bdf8';
                    feedback.innerHTML = `✓ Correct! ${q.explanation}`;
                } else {
                    btn.classList.add('wrong');
                    optBtns[q.correct].classList.add('correct');
                    feedback.style.display = 'block';
                    feedback.style.background = 'rgba(244, 63, 94, 0.25)';
                    feedback.style.border = '1px solid #f43f5e';
                    feedback.style.color = '#fb7185';
                    feedback.innerHTML = `✗ Incorrect. ${q.explanation}`;
                }

                nextBtn.style.display = 'inline-flex';
            });
        });

        nextBtn.addEventListener('click', () => {
            currentQ++;
            renderQuiz();
        });
    }

    renderQuiz();

    // -------------------------------------------------------------------------
    // 10. Sources List
    // -------------------------------------------------------------------------
    const sourcesContainer = document.getElementById('sources-list');
    if (sourcesContainer && data.sources) {
        sourcesContainer.innerHTML = data.sources.map(s => `
            <div class="source-item">
                <div style="font-weight: 700; color: var(--text-primary); margin-bottom: 4px;">${s.title}</div>
                <div style="color: var(--text-muted); margin-bottom: 8px; font-size: 0.82rem;">${s.author}</div>
                <a href="${s.link}" target="_blank" rel="noopener noreferrer">View Academic Reference ↗</a>
            </div>
        `).join('');
    }
});
