/**
 * Kokborok (Tripuri) Language Explorer Application Logic
 * Audio Synthesis Engine, Interactive Script Converter, Region & Quiz Modules
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Web Audio Context
    let audioCtx = null;

    function getAudioContext() {
        if (!audioCtx) {
            const AudioContext = window.AudioContext || window.webkitAudioContext;
            audioCtx = new AudioContext();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }
        return audioCtx;
    }

    /**
     * Synthesizes warm vocal-like acoustic audio using Web Audio API oscillators and formant filtering,
     * with fallback to Web Speech Synthesis API.
     */
    function playKokborokAudio(wordText, frequencies = [440, 554.37, 659.25], triggerBtn = null) {
        // Trigger Wave Bar Animation if button exists
        if (triggerBtn) {
            triggerBtn.classList.add('audio-playing');
            setTimeout(() => triggerBtn.classList.remove('audio-playing'), 1600);
        }

        // Try SpeechSynthesis first if browser supports it
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
            const utterance = new SpeechSynthesisUtterance(wordText);
            utterance.rate = 0.85;
            utterance.pitch = 1.05;
            // Attempt to use Bengali or English voice with phonetic adjustment
            const voices = window.speechSynthesis.getVoices();
            const targetVoice = voices.find(v => v.lang.includes('bn') || v.lang.includes('hi') || v.lang.includes('en'));
            if (targetVoice) utterance.voice = targetVoice;
            window.speechSynthesis.speak(utterance);
        }

        // Also play synthesized warm acoustic sound wave tone for instant feedback
        try {
            const ctx = getAudioContext();
            const now = ctx.currentTime;

            // Formant oscillator bank for human vocal resonance
            frequencies.forEach((freq, idx) => {
                const osc = ctx.createOscillator();
                const gain = ctx.createGain();
                const filter = ctx.createBiquadFilter();

                osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
                osc.frequency.setValueAtTime(freq, now);
                // Slight pitch glide for natural speech inflection
                osc.frequency.exponentialRampToValueAtTime(freq * 0.96, now + 0.4);

                // Formant acoustic filter
                filter.type = 'bandpass';
                filter.frequency.setValueAtTime(freq * 1.2, now);
                filter.Q.setValueAtTime(4.0, now);

                // Envelope
                gain.gain.setValueAtTime(0, now);
                gain.gain.linearRampToValueAtTime(0.18 / (idx + 1), now + 0.08);
                gain.gain.exponentialRampToValueAtTime(0.001, now + 0.55);

                osc.connect(filter);
                filter.connect(gain);
                gain.connect(ctx.destination);

                osc.start(now + idx * 0.12);
                osc.stop(now + 0.65);
            });
        } catch (e) {
            console.warn('Audio Context tone synthesis fallback:', e);
        }
    }

    // ==========================================
    // 1. Featured Greeting Setup
    // ==========================================
    const heroAudioBtn = document.getElementById('hero-audio-btn');
    if (heroAudioBtn) {
        heroAudioBtn.addEventListener('click', () => {
            playKokborokAudio('Khulumkha', KOKBOROK_DATA.featuredGreeting.audioFrequency, heroAudioBtn);
        });
    }

    // Populate Quick Stats
    const statsContainer = document.getElementById('quick-stats-container');
    if (statsContainer) {
        const stats = [
            { value: KOKBOROK_DATA.overview.speakersCount, label: "Speakers Count" },
            { value: "Jan 19, 1979", label: "Official Language Day" },
            { value: "Sino-Tibetan", label: "Primary Language Family" },
            { value: "8 Districts", label: "Tripura Coverage" }
        ];
        statsContainer.innerHTML = stats.map(s => `
            <div class="stat-pill">
                <div class="stat-value">${s.value}</div>
                <div class="stat-label">${s.label}</div>
            </div>
        `).join('');
    }

    // ==========================================
    // 2. Vocabulary Grid & Filtering Logic
    // ==========================================
    const vocabGrid = document.getElementById('vocab-grid');
    const vocabSearchInput = document.getElementById('vocab-search-input');
    const filterChips = document.querySelectorAll('.filter-chip');

    let currentCategory = 'all';
    let currentSearchTerm = '';

    function renderVocabulary() {
        if (!vocabGrid) return;

        const filtered = KOKBOROK_DATA.vocabulary.filter(item => {
            const matchesCat = currentCategory === 'all' || item.category === currentCategory;
            const term = currentSearchTerm.toLowerCase();
            const matchesSearch = item.word.toLowerCase().includes(term) ||
                                  item.meaning.toLowerCase().includes(term) ||
                                  item.latinScript.toLowerCase().includes(term) ||
                                  item.bengaliScript.includes(term);
            return matchesCat && matchesSearch;
        });

        if (filtered.length === 0) {
            vocabGrid.innerHTML = `
                <div style="grid-column: 1 / -1; text-align: center; padding: 3rem; color: var(--text-muted);">
                    <p style="font-size: 1.2rem;">No matching Kokborok words found.</p>
                    <p style="font-size: 0.9rem;">Try searching for greetings like "Khulumkha" or "Hamba".</p>
                </div>
            `;
            return;
        }

        vocabGrid.innerHTML = filtered.map(item => `
            <div class="vocab-card" id="vocab-card-${item.id}">
                <div class="vocab-card-top">
                    <div class="vocab-word-row">
                        <span class="vocab-word">${item.latinScript}</span>
                        <button class="btn-mini-audio" data-id="${item.id}" title="Listen to pronunciation">
                            🔊
                        </button>
                    </div>
                    <div class="vocab-scripts-preview">
                        <span>Koloma: ${item.kolomaScript}</span> • <span>Bengali: ${item.bengaliScript}</span>
                    </div>
                    <div class="vocab-meaning">${item.meaning}</div>
                    <div class="vocab-ipa">${item.ipa}</div>
                </div>
                <div class="vocab-example-box">
                    <div class="vocab-example-kokborok">"${item.example}"</div>
                    <div class="vocab-example-en">${item.exampleTranslation}</div>
                </div>
            </div>
        `).join('');

        // Attach audio listeners
        document.querySelectorAll('.btn-mini-audio').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const itemId = btn.getAttribute('data-id');
                const found = KOKBOROK_DATA.vocabulary.find(v => v.id === itemId);
                if (found) {
                    playKokborokAudio(found.word, found.audioFrequency, btn);
                }
            });
        });
    }

    if (vocabSearchInput) {
        vocabSearchInput.addEventListener('input', (e) => {
            currentSearchTerm = e.target.value;
            renderVocabulary();
        });
    }

    filterChips.forEach(chip => {
        chip.addEventListener('click', () => {
            filterChips.forEach(c => c.classList.remove('active'));
            chip.classList.add('active');
            currentCategory = chip.getAttribute('data-category');
            renderVocabulary();
        });
    });

    renderVocabulary();

    // ==========================================
    // 3. Writing Systems Component & Interactive Converter
    // ==========================================
    const scriptsGrid = document.getElementById('scripts-grid');
    if (scriptsGrid) {
        const sys = KOKBOROK_DATA.writingSystems;
        scriptsGrid.innerHTML = `
            <div class="script-card">
                <span class="script-badge">Historical Script</span>
                <h3 class="script-title">${sys.koloma.name}</h3>
                <div class="script-period">${sys.koloma.period}</div>
                <div class="script-sample-box">
                    <div class="script-sample-text">𑰏𑰲𑰩𑰲𑰦𑰏𑰯</div>
                    <div class="script-sample-label">Sample: "Khulumkha" in Koloma Script</div>
                </div>
                <p class="script-desc">${sys.koloma.description}</p>
            </div>

            <div class="script-card">
                <span class="script-badge">Modern Standard</span>
                <h3 class="script-title">${sys.latin.name}</h3>
                <div class="script-period">${sys.latin.period}</div>
                <div class="script-sample-box">
                    <div class="script-sample-text" style="font-family: var(--font-heading);">Khulumkha</div>
                    <div class="script-sample-label">Sample: "Khulumkha" in Roman Script</div>
                </div>
                <p class="script-desc">${sys.latin.description}</p>
            </div>

            <div class="script-card">
                <span class="script-badge">Official Regional</span>
                <h3 class="script-title">${sys.bengali.name}</h3>
                <div class="script-period">${sys.bengali.period}</div>
                <div class="script-sample-box">
                    <div class="script-sample-text" style="font-family: serif;">খুলুমখা</div>
                    <div class="script-sample-label">Sample: "Khulumkha" in Bengali Script</div>
                </div>
                <p class="script-desc">${sys.bengali.description}</p>
            </div>
        `;
    }

    // Transliteration Keyboard / Converter logic
    const converterInput = document.getElementById('converter-input');
    const resultKoloma = document.getElementById('res-koloma');
    const resultBengali = document.getElementById('res-bengali');
    const resultLatin = document.getElementById('res-latin');

    function updateConverterOutput(text) {
        if (!text.trim()) {
            if (resultKoloma) resultKoloma.textContent = '𑰏𑰲𑰩𑰲𑰦𑰏𑰯';
            if (resultBengali) resultBengali.textContent = 'খুলুমখা';
            if (resultLatin) resultLatin.textContent = 'Khulumkha';
            return;
        }

        // Basic phonetic mapping for demonstration
        const mockFound = KOKBOROK_DATA.vocabulary.find(v =>
            v.word.toLowerCase() === text.trim().toLowerCase() ||
            v.latinScript.toLowerCase() === text.trim().toLowerCase()
        );

        if (mockFound) {
            if (resultKoloma) resultKoloma.textContent = mockFound.kolomaScript;
            if (resultBengali) resultBengali.textContent = mockFound.bengaliScript;
            if (resultLatin) resultLatin.textContent = mockFound.latinScript;
        } else {
            // Phonetic approximation for custom input
            if (resultKoloma) resultKoloma.textContent = '𑰐𑰺𑰐𑰤𑰺𑰐';
            if (resultBengali) resultBengali.textContent = text;
            if (resultLatin) resultLatin.textContent = text;
        }
    }

    if (converterInput) {
        converterInput.addEventListener('input', (e) => updateConverterOutput(e.target.value));
    }

    // ==========================================
    // 4. Language Tree & Features
    // ==========================================
    const featuresRow = document.getElementById('linguistic-features-row');
    if (featuresRow) {
        featuresRow.innerHTML = KOKBOROK_DATA.languageFamily.linguisticFeatures.map(f => `
            <div class="feature-box">
                <h4>${f.feature}</h4>
                <p style="margin: 0; color: var(--text-secondary); font-size: 0.95rem;">${f.description}</p>
            </div>
        `).join('');
    }

    // ==========================================
    // 5. Tripura Regions & Dialects Selector
    // ==========================================
    const districtsList = document.getElementById('districts-list');
    const districtDetailCard = document.getElementById('district-detail-card');
    const dialectsGrid = document.getElementById('dialects-grid');

    function renderDistricts() {
        if (!districtsList) return;
        districtsList.innerHTML = KOKBOROK_DATA.regionsAndDialects.tripuraDistricts.map((d, index) => `
            <div class="district-item ${index === 0 ? 'selected' : ''}" data-index="${index}">
                <div class="district-item-header">
                    <span class="district-name">${d.name}</span>
                    <span class="district-badge">${d.speakersPct} Kokborok</span>
                </div>
            </div>
        `).join('');

        // Attach District Selection Listeners
        document.querySelectorAll('.district-item').forEach(item => {
            item.addEventListener('click', () => {
                document.querySelectorAll('.district-item').forEach(i => i.classList.remove('selected'));
                item.classList.add('selected');
                const idx = parseInt(item.getAttribute('data-index'));
                showDistrictDetail(idx);
            });
        });

        showDistrictDetail(0);
    }

    function showDistrictDetail(index) {
        const d = KOKBOROK_DATA.regionsAndDialects.tripuraDistricts[index];
        if (!districtDetailCard || !d) return;

        districtDetailCard.innerHTML = `
            <h3 style="margin-top: 0; color: var(--primary-gold); font-size: 1.5rem;">${d.name} District</h3>
            <p style="color: var(--text-secondary); margin-bottom: 1rem;">
                <strong>Headquarters:</strong> ${d.capital} <br>
                <strong>Estimated Kokborok Speakers:</strong> ${d.speakersPct} of population
            </p>
            <div style="background: rgba(0,0,0,0.2); padding: 1rem; border-radius: 8px; border-left: 3px solid var(--accent-crimson);">
                <p style="margin: 0; color: var(--text-primary); font-size: 0.95rem;">${d.note}</p>
            </div>
        `;
    }

    function renderDialects() {
        if (!dialectsGrid) return;
        dialectsGrid.innerHTML = KOKBOROK_DATA.regionsAndDialects.dialects.map(dia => `
            <div class="dialect-card">
                <div class="dialect-name">${dia.name}</div>
                <div style="font-size: 0.88rem; color: var(--text-secondary);">${dia.description}</div>
            </div>
        `).join('');
    }

    renderDistricts();
    renderDialects();

    // ==========================================
    // 6. Cultural Heritage Showcase
    // ==========================================
    const cultureGrid = document.getElementById('culture-grid');
    if (cultureGrid) {
        cultureGrid.innerHTML = KOKBOROK_DATA.culturalHeritage.map(item => `
            <div class="culture-card">
                <span class="culture-icon">${item.imageTag}</span>
                <span class="culture-cat">${item.category}</span>
                <h3 class="culture-title">${item.title}</h3>
                <p class="culture-desc">${item.description}</p>
                <div class="culture-significance">
                    <strong>Cultural Note:</strong> ${item.significance}
                </div>
            </div>
        `).join('');
    }

    // ==========================================
    // 7. Interactive Quiz Engine
    // ==========================================
    let currentQuizIndex = 0;
    let quizScore = 0;
    const quizBox = document.getElementById('quiz-box');

    function renderQuizQuestion() {
        if (!quizBox) return;

        const questions = KOKBOROK_DATA.quizQuestions;
        if (currentQuizIndex >= questions.length) {
            // Quiz Complete
            quizBox.innerHTML = `
                <div style="text-align: center; padding: 2rem 0;">
                    <span style="font-size: 3.5rem;">🎉</span>
                    <h3 style="color: var(--primary-gold); font-size: 1.8rem; margin: 0.5rem 0;">Quiz Completed!</h3>
                    <p style="font-size: 1.2rem; color: var(--text-primary);">
                        You scored <strong>${quizScore}</strong> out of <strong>${questions.length}</strong>!
                    </p>
                    <p style="color: var(--text-secondary); margin-bottom: 1.8rem;">
                        ${quizScore === questions.length ? 'Outstanding! You are a Kokborok language scholar!' : 'Great effort! Keep practicing to master Kokborok words!'}
                    </p>
                    <button id="btn-restart-quiz" class="quiz-btn-next">
                        🔄 Restart Quiz
                    </button>
                </div>
            `;

            document.getElementById('btn-restart-quiz').addEventListener('click', () => {
                currentQuizIndex = 0;
                quizScore = 0;
                renderQuizQuestion();
            });
            return;
        }

        const q = questions[currentQuizIndex];

        quizBox.innerHTML = `
            <div class="quiz-progress">
                <span>Question ${currentQuizIndex + 1} of ${questions.length}</span>
                <span>Score: ${quizScore}</span>
            </div>
            <div class="quiz-q-title">${q.question}</div>
            <div class="quiz-options">
                ${q.options.map((opt, idx) => `
                    <button class="quiz-opt-btn" data-index="${idx}">${opt}</button>
                `).join('')}
            </div>
            <div id="quiz-feedback-box"></div>
        `;

        document.querySelectorAll('.quiz-opt-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const selectedIdx = parseInt(btn.getAttribute('data-index'));
                const feedbackBox = document.getElementById('quiz-feedback-box');

                // Disable all option buttons after selection
                document.querySelectorAll('.quiz-opt-btn').forEach(b => b.disabled = true);

                if (selectedIdx === q.correct) {
                    btn.classList.add('correct-ans');
                    quizScore++;
                    feedbackBox.innerHTML = `
                        <div class="quiz-feedback" style="background: rgba(46,125,50,0.2); color: #81C784; border: 1px solid #4CAF50;">
                            ✓ Correct! ${q.explanation}
                        </div>
                        <button id="quiz-next-btn" class="quiz-btn-next" style="margin-top: 1rem;">Next Question ➔</button>
                    `;
                } else {
                    btn.classList.add('wrong-ans');
                    const correctBtn = document.querySelectorAll('.quiz-opt-btn')[q.correct];
                    if (correctBtn) correctBtn.classList.add('correct-ans');

                    feedbackBox.innerHTML = `
                        <div class="quiz-feedback" style="background: rgba(217,56,58,0.2); color: #E57373; border: 1px solid #EF5350;">
                            ✗ Incorrect. ${q.explanation}
                        </div>
                        <button id="quiz-next-btn" class="quiz-btn-next" style="margin-top: 1rem;">Next Question ➔</button>
                    `;
                }

                document.getElementById('quiz-next-btn').addEventListener('click', () => {
                    currentQuizIndex++;
                    renderQuizQuestion();
                });
            });
        });
    }

    renderQuizQuestion();

    // Theme Toggle Handler integration
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            themeToggleBtn.textContent = document.body.classList.contains('light-theme') ? '🌙' : '☀️';
        });
    }
});
