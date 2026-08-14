/**
 * Balti Language Explorer - Core Interactivity
 * SVG map interactions, speech synthesis, audio synth fallback,
 * vocabulary search filter, script cards, and quiz mini-game.
 */

document.addEventListener('DOMContentLoaded', () => {
    const DATA = window.BALTI_DATA;
    if (!DATA) {
        console.error("BALTI_DATA not found!");
        return;
    }

    let activeAudioContext = null;
    let currentQuizIndex = 0;
    let quizScore = 0;

    // --- 1. THEME TOGGLE ---
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light') {
            document.body.classList.add('light-theme');
            themeToggleBtn.textContent = '🌙';
        }
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            themeToggleBtn.textContent = isLight ? '🌙' : '☀️';
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }

    // --- 2. RENDER SCRIPTS CARDS ---
    const scriptsGrid = document.getElementById('scripts-grid');
    if (scriptsGrid) {
        scriptsGrid.innerHTML = DATA.scripts.map(s => `
            <div class="script-card">
                <div>
                    <h3 class="script-title">${s.name}</h3>
                    <div class="script-native">${s.native}</div>
                    <div style="font-size: 0.8rem; color: var(--accent-gold); font-weight: 700; text-transform: uppercase; margin-bottom: 8px;">${s.status}</div>
                    <p style="font-size: 0.92rem; color: var(--text-secondary);">${s.desc}</p>
                </div>
                <div class="script-example">
                    <span style="font-size: 0.75rem; color: var(--text-muted); display: block; text-transform: uppercase;">Script Example:</span>
                    <strong>${s.example}</strong>
                </div>
            </div>
        `).join('');
    }

    // --- 3. AUDIO SYNTHESIS ENGINE ---
    function playPhoneticAudio(text, btnElement) {
        document.querySelectorAll('.audio-btn').forEach(b => b.classList.remove('playing'));
        if (btnElement) btnElement.classList.add('playing');

        // Play Web Audio synth tone accent
        try {
            if (!activeAudioContext) {
                activeAudioContext = new (window.AudioContext || window.webkitAudioContext)();
            }
            if (activeAudioContext.state === 'suspended') {
                activeAudioContext.resume();
            }
            
            const osc = activeAudioContext.createOscillator();
            const gain = activeAudioContext.createGain();
            
            osc.type = 'triangle';
            osc.frequency.setValueAtTime(320, activeAudioContext.currentTime);
            osc.frequency.exponentialRampToValueAtTime(640, activeAudioContext.currentTime + 0.35);
            
            gain.gain.setValueAtTime(0.2, activeAudioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, activeAudioContext.currentTime + 0.4);
            
            osc.connect(gain);
            gain.connect(activeAudioContext.destination);
            
            osc.start();
            osc.stop(activeAudioContext.currentTime + 0.4);
        } catch (e) {
            console.log("Audio synth notice:", e);
        }

        // Web Speech API
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = 0.85;
            utterance.pitch = 1.0;
            utterance.onend = () => {
                if (btnElement) btnElement.classList.remove('playing');
            };
            utterance.onerror = () => {
                if (btnElement) btnElement.classList.remove('playing');
            };
            window.speechSynthesis.speak(utterance);
        } else {
            setTimeout(() => {
                if (btnElement) btnElement.classList.remove('playing');
            }, 800);
        }
    }

    // --- 4. RENDER GREETINGS SOUNDBOARD ---
    const greetingsGrid = document.getElementById('greetings-grid');
    const greetingSearchInput = document.getElementById('greeting-search');

    function renderGreetings() {
        if (!greetingsGrid) return;
        const query = greetingSearchInput ? greetingSearchInput.value.toLowerCase().trim() : '';

        const filtered = DATA.greetings.filter(g => {
            if (!query) return true;
            return g.transliteration.toLowerCase().includes(query) ||
                   g.meaning.toLowerCase().includes(query) ||
                   g.persoArabic.toLowerCase().includes(query) ||
                   g.tibetan.toLowerCase().includes(query);
        });

        greetingsGrid.innerHTML = filtered.map(g => `
            <div class="greeting-card">
                <span class="greeting-tag">${g.category}</span>
                <div class="greeting-perso">${g.persoArabic}</div>
                <div class="greeting-tibetan">${g.tibetan}</div>
                <div class="greeting-trans">${g.transliteration}</div>
                <div style="font-size:0.85rem; color:var(--accent-cyan); font-family:monospace; margin: 4px 0;">IPA: ${g.ipa}</div>
                <div style="font-size:0.92rem; color:var(--text-secondary); margin-bottom:8px;">"${g.meaning}"</div>
                <div style="font-size:0.8rem; color:var(--text-muted);">${g.note}</div>
                <button class="audio-btn" data-synth="${g.phoneticSynth}">
                    <span>🔊 Listen Pronunciation</span>
                    <div class="visualizer">
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                        <div class="wave-bar"></div>
                    </div>
                </button>
            </div>
        `).join('');

        greetingsGrid.querySelectorAll('.audio-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                playPhoneticAudio(btn.dataset.synth, btn);
            });
        });
    }

    if (greetingSearchInput) {
        greetingSearchInput.addEventListener('input', renderGreetings);
    }
    renderGreetings();

    // --- 5. RENDER VOCABULARY MATRIX ---
    const vocabTableBody = document.getElementById('vocab-table-body');
    const vocabSearchInput = document.getElementById('vocab-search');

    function renderVocabTable() {
        if (!vocabTableBody) return;
        const query = vocabSearchInput ? vocabSearchInput.value.toLowerCase().trim() : '';

        const filtered = DATA.vocabularyMatrix.filter(v => {
            if (!query) return true;
            return v.concept.toLowerCase().includes(query) ||
                   v.transliteration.toLowerCase().includes(query) ||
                   v.persoArabic.toLowerCase().includes(query) ||
                   v.tibetan.toLowerCase().includes(query) ||
                   v.oldTibetan.toLowerCase().includes(query);
        });

        vocabTableBody.innerHTML = filtered.map(v => `
            <tr>
                <td><strong>${v.concept}</strong></td>
                <td style="direction:rtl; text-align:right; font-size:1.1rem; color:var(--accent-gold);">${v.persoArabic}</td>
                <td style="font-size:1.1rem;">${v.tibetan}</td>
                <td><strong style="color:var(--accent-cyan);">${v.transliteration}</strong></td>
                <td><span class="old-tibetan-highlight">${v.oldTibetan}</span></td>
                <td style="font-size:0.85rem; color:var(--text-secondary);">${v.etymology}</td>
            </tr>
        `).join('');
    }

    if (vocabSearchInput) {
        vocabSearchInput.addEventListener('input', renderVocabTable);
    }
    renderVocabTable();

    // --- 6. RENDER CULTURAL HERITAGE GRID ---
    const cultureGrid = document.getElementById('culture-grid');
    if (cultureGrid) {
        cultureGrid.innerHTML = DATA.culturalHeritage.map(c => `
            <div class="culture-card">
                <div class="culture-icon">${c.icon}</div>
                <div style="font-size:0.75rem; color:var(--accent-cyan); font-weight:700; text-transform:uppercase;">${c.category}</div>
                <h4 class="culture-title">${c.title}</h4>
                <p class="culture-text">${c.content}</p>
            </div>
        `).join('');
    }

    // --- 7. MAP INTERACTION ---
    const regionPaths = document.querySelectorAll('.region-path');
    const mapRegionTitle = document.getElementById('map-region-title');
    const mapRegionBadge = document.getElementById('map-region-badge');
    const mapRegionDesc = document.getElementById('map-region-desc');

    function updateRegionInfo(regionId) {
        const regObj = DATA.regions.find(r => r.id === regionId);
        if (!regObj) return;

        regionPaths.forEach(p => {
            if (p.getAttribute('data-id') === regionId) {
                p.classList.add('active');
            } else {
                p.classList.remove('active');
            }
        });

        if (mapRegionTitle) mapRegionTitle.textContent = regObj.name;
        if (mapRegionBadge) {
            mapRegionBadge.textContent = regObj.speakers;
            mapRegionBadge.style.backgroundColor = regObj.color;
        }
        if (mapRegionDesc) {
            mapRegionDesc.innerHTML = `
                <p><strong>Sub-regions & Key Settlements:</strong> ${regObj.subRegions.join(', ')}</p>
                <p style="margin-top:10px;">${regObj.desc}</p>
            `;
        }
    }

    regionPaths.forEach(path => {
        path.addEventListener('click', () => {
            updateRegionInfo(path.getAttribute('data-id'));
        });
    });

    // Default select Kargil
    updateRegionInfo('kargil');

    // --- 8. QUIZ MINI-GAME ---
    const quizContainer = document.getElementById('quiz-card');

    function renderQuizQuestion() {
        if (!quizContainer) return;

        if (currentQuizIndex >= DATA.quizQuestions.length) {
            quizContainer.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 16px;">🏔️</div>
                    <h3 class="quiz-question">Quiz Completed!</h3>
                    <p style="font-size: 1.2rem; margin-bottom: 24px;">Your Score: <strong>${quizScore} / ${DATA.quizQuestions.length}</strong></p>
                    <button class="audio-btn" id="restart-quiz-btn" style="max-width:200px; margin:0 auto;">Restart Quiz</button>
                </div>
            `;
            document.getElementById('restart-quiz-btn').addEventListener('click', () => {
                currentQuizIndex = 0;
                quizScore = 0;
                renderQuizQuestion();
            });
            return;
        }

        const q = DATA.quizQuestions[currentQuizIndex];
        quizContainer.innerHTML = `
            <div style="font-size: 0.85rem; color: var(--accent-cyan); font-weight: 700; margin-bottom: 8px;">
                Question ${currentQuizIndex + 1} of ${DATA.quizQuestions.length}
            </div>
            <h3 class="quiz-question">${q.question}</h3>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <button class="quiz-btn" data-index="${i}">${opt}</button>
                `).join('')}
            </div>
            <div id="quiz-feedback" style="display: none;" class="quiz-feedback"></div>
            <button id="next-quiz-btn" class="audio-btn" style="display: none; width: 100%;">Next Question ➔</button>
        `;

        const quizBtns = quizContainer.querySelectorAll('.quiz-btn');
        const feedbackDiv = document.getElementById('quiz-feedback');
        const nextBtn = document.getElementById('next-quiz-btn');

        quizBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const selected = parseInt(btn.dataset.index);
                quizBtns.forEach(b => b.disabled = true);

                if (selected === q.correct) {
                    btn.classList.add('correct');
                    quizScore++;
                    feedbackDiv.innerHTML = `<strong>Correct!</strong> ${q.explanation}`;
                    feedbackDiv.style.borderLeftColor = 'var(--accent-emerald)';
                } else {
                    btn.classList.add('wrong');
                    quizBtns[q.correct].classList.add('correct');
                    feedbackDiv.innerHTML = `<strong>Incorrect.</strong> ${q.explanation}`;
                    feedbackDiv.style.borderLeftColor = 'var(--accent-ruby)';
                }

                feedbackDiv.style.display = 'block';
                nextBtn.style.display = 'block';
            });
        });

        nextBtn.addEventListener('click', () => {
            currentQuizIndex++;
            renderQuizQuestion();
        });
    }

    renderQuizQuestion();
});
