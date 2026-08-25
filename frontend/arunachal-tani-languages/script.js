/**
 * Arunachal Pradesh Tani Languages Explorer - Core Logic
 * Handles interactive SVG map, soundboard, speech synthesis, audio synth fallback,
 * vocabulary table filtering, and quiz mini-game.
 */

document.addEventListener('DOMContentLoaded', () => {
    const DATA = window.TANI_DATA;
    if (!DATA) {
        console.error("TANI_DATA not found!");
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

    // --- 2. RENDER LANGUAGE CARDS ---
    const languagesGrid = document.getElementById('languages-grid');
    if (languagesGrid) {
        languagesGrid.innerHTML = DATA.languages.map(lang => `
            <div class="lang-card" style="--card-accent: ${lang.color}">
                <div>
                    <div class="lang-header">
                        <div>
                            <h3 class="lang-name" style="color: ${lang.color}">${lang.name}</h3>
                            <div class="lang-native">${lang.nativeName}</div>
                        </div>
                        <span class="subgroup-pill">${lang.subGroup}</span>
                    </div>
                    <p class="lang-body">${lang.description}</p>
                </div>
                <div>
                    <div class="lang-meta">
                        <div>
                            <span class="meta-label">Primary Districts</span>
                            <span class="meta-val">${lang.primaryDistricts.slice(0, 2).join(', ')}</span>
                        </div>
                        <div>
                            <span class="meta-label">Speakers</span>
                            <span class="meta-val">${lang.speakers}</span>
                        </div>
                    </div>
                    <div style="margin-top: 12px; font-size: 0.82rem; color: var(--text-muted);">
                        <strong>Writing:</strong> ${lang.writingSystem}
                    </div>
                </div>
            </div>
        `).join('');
    }

    // --- 3. AUDIO ENGINE (Web Speech API + Web Audio Synthesizer Fallback) ---
    function playPhoneticAudio(text, btnElement) {
        // Reset all playing buttons
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
            
            osc.type = 'sine';
            osc.frequency.setValueAtTime(440, activeAudioContext.currentTime);
            osc.frequency.exponentialRampToValueAtTime(880, activeAudioContext.currentTime + 0.3);
            
            gain.gain.setValueAtTime(0.2, activeAudioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.001, activeAudioContext.currentTime + 0.4);
            
            osc.connect(gain);
            gain.connect(activeAudioContext.destination);
            
            osc.start();
            osc.stop(activeAudioContext.currentTime + 0.4);
        } catch (e) {
            console.log("Web Audio synth notice:", e);
        }

        // Web Speech synthesis
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // stop previous
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
    const filterContainer = document.getElementById('soundboard-filters');
    const greetingSearchInput = document.getElementById('greeting-search');
    let selectedLangFilter = 'all';

    if (filterContainer) {
        const languagesList = [{ id: 'all', name: 'All Languages' }, ...DATA.languages];
        filterContainer.innerHTML = languagesList.map(l => `
            <button class="filter-btn ${l.id === 'all' ? 'active' : ''}" data-lang="${l.id}">
                ${l.name}
            </button>
        `).join('');

        filterContainer.addEventListener('click', (e) => {
            if (e.target.classList.contains('filter-btn')) {
                filterContainer.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
                e.target.classList.add('active');
                selectedLangFilter = e.target.dataset.lang;
                renderGreetings();
            }
        });
    }

    if (greetingSearchInput) {
        greetingSearchInput.addEventListener('input', renderGreetings);
    }

    function renderGreetings() {
        if (!greetingsGrid) return;
        const query = greetingSearchInput ? greetingSearchInput.value.toLowerCase().trim() : '';

        const filtered = DATA.greetings.filter(g => {
            const matchesLang = selectedLangFilter === 'all' || g.langId === selectedLangFilter;
            const matchesSearch = !query || 
                g.native.toLowerCase().includes(query) || 
                g.latin.toLowerCase().includes(query) || 
                g.meaning.toLowerCase().includes(query) || 
                g.langName.toLowerCase().includes(query);
            return matchesLang && matchesSearch;
        });

        if (filtered.length === 0) {
            greetingsGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; color: var(--text-muted); padding: 40px;">
                    No greetings found matching your filter criteria.
                </div>
            `;
            return;
        }

        greetingsGrid.innerHTML = filtered.map(g => {
            const langObj = DATA.languages.find(l => l.id === g.langId) || {};
            return `
                <div class="greeting-card" style="border-top: 3px solid ${langObj.color || 'var(--accent-saffron)'}">
                    <div style="display:flex; justify-between; align-items:center;">
                        <span class="greeting-tag" style="color:${langObj.color}">${g.langName} • ${g.category}</span>
                    </div>
                    <div class="greeting-native">${g.native}</div>
                    <div class="greeting-ipa">Phonetic: ${g.ipa}</div>
                    <div class="greeting-meaning">"${g.meaning}"</div>
                    <div style="font-size:0.8rem; color:var(--text-muted); margin-bottom:14px;">${g.note}</div>
                    <button class="audio-btn" data-synth="${g.phoneticSynth}">
                        <span>🔊 Listen (${g.langName})</span>
                        <div class="visualizer">
                            <div class="wave-bar"></div>
                            <div class="wave-bar"></div>
                            <div class="wave-bar"></div>
                        </div>
                    </button>
                </div>
            `;
        }).join('');

        // Attach audio listeners
        greetingsGrid.querySelectorAll('.audio-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const text = btn.dataset.synth;
                playPhoneticAudio(text, btn);
            });
        });
    }

    renderGreetings();

    // --- 5. RENDER VOCABULARY MATRIX TABLE ---
    const vocabTableBody = document.getElementById('vocab-table-body');
    const vocabSearchInput = document.getElementById('vocab-search');

    function renderVocabTable() {
        if (!vocabTableBody) return;
        const query = vocabSearchInput ? vocabSearchInput.value.toLowerCase().trim() : '';

        const filtered = DATA.vocabularyMatrix.filter(v => {
            if (!query) return true;
            return v.concept.toLowerCase().includes(query) ||
                   v.protoTani.toLowerCase().includes(query) ||
                   v.nyishi.toLowerCase().includes(query) ||
                   v.adi.toLowerCase().includes(query) ||
                   v.apatani.toLowerCase().includes(query) ||
                   v.galo.toLowerCase().includes(query) ||
                   v.tagin.toLowerCase().includes(query) ||
                   v.mising.toLowerCase().includes(query);
        });

        vocabTableBody.innerHTML = filtered.map(v => `
            <tr>
                <td><strong>${v.concept}</strong></td>
                <td><span class="proto-root">${v.protoTani}</span></td>
                <td>${v.nyishi}</td>
                <td>${v.adi}</td>
                <td>${v.apatani}</td>
                <td>${v.galo}</td>
                <td>${v.tagin}</td>
                <td>${v.mising}</td>
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
                <div style="font-size:0.75rem; color:var(--accent-saffron); font-weight:700; text-transform:uppercase;">${c.category}</div>
                <h4 class="culture-title">${c.title}</h4>
                <p class="culture-text">${c.content}</p>
            </div>
        `).join('');
    }

    // --- 7. MAP INTERACTION ---
    const districtPaths = document.querySelectorAll('.district-path');
    const mapDistrictTitle = document.getElementById('map-district-title');
    const mapDistrictBadge = document.getElementById('map-district-badge');
    const mapDistrictDesc = document.getElementById('map-district-desc');

    function updateDistrictInfo(districtId) {
        const districtObj = DATA.districts.find(d => d.id === districtId);
        if (!districtObj) return;

        const langObj = DATA.languages.find(l => l.id === districtObj.lang) || {};

        districtPaths.forEach(p => {
            if (p.getAttribute('data-id') === districtId) {
                p.classList.add('active');
            } else {
                p.classList.remove('active');
            }
        });

        if (mapDistrictTitle) mapDistrictTitle.textContent = districtObj.name;
        if (mapDistrictBadge) {
            mapDistrictBadge.textContent = `${langObj.name || districtObj.lang} Primary`;
            mapDistrictBadge.style.backgroundColor = langObj.color || 'var(--accent-saffron)';
        }
        if (mapDistrictDesc) {
            mapDistrictDesc.innerHTML = `
                <p><strong>District Headquarters:</strong> ${districtObj.cap}</p>
                <p style="margin-top:8px;">${districtObj.desc}</p>
                <div style="margin-top:16px; padding:12px; background:rgba(0,0,0,0.2); border-radius:8px;">
                    <span style="font-size:0.85rem; color:var(--text-muted);">Main Language Spotlight:</span><br/>
                    <strong style="color:${langObj.color}">${langObj.name} (${langObj.nativeName})</strong><br/>
                    <span style="font-size:0.85rem;">${langObj.speakers} speakers • ${langObj.subGroup}</span>
                </div>
            `;
        }
    }

    districtPaths.forEach(path => {
        path.addEventListener('click', () => {
            const dId = path.getAttribute('data-id');
            updateDistrictInfo(dId);
            const dObj = DATA.districts.find(d => d.id === dId);
            if (dObj && filterContainer) {
                const btn = filterContainer.querySelector(`[data-lang="${dObj.lang}"]`);
                if (btn) btn.click();
            }
        });
    });

    // Default select Papum Pare
    updateDistrictInfo('papum-pare');

    // --- 8. QUIZ MINI-GAME ---
    const quizContainer = document.getElementById('quiz-card');

    function renderQuizQuestion() {
        if (!quizContainer) return;

        if (currentQuizIndex >= DATA.quizQuestions.length) {
            quizContainer.innerHTML = `
                <div style="text-align: center;">
                    <div style="font-size: 3rem; margin-bottom: 16px;">🎉</div>
                    <h3 class="quiz-question">Quiz Completed!</h3>
                    <p style="font-size: 1.2rem; margin-bottom: 24px;">Your Score: <strong>${quizScore} / ${DATA.quizQuestions.length}</strong></p>
                    <button class="filter-btn active" id="restart-quiz-btn">Restart Quiz</button>
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
            <div style="font-size: 0.85rem; color: var(--accent-saffron); font-weight: 700; margin-bottom: 8px;">
                Question ${currentQuizIndex + 1} of ${DATA.quizQuestions.length}
            </div>
            <h3 class="quiz-question">${q.question}</h3>
            <div class="quiz-options">
                ${q.options.map((opt, i) => `
                    <button class="quiz-btn" data-index="${i}">${opt}</button>
                `).join('')}
            </div>
            <div id="quiz-feedback" style="display: none;" class="quiz-feedback"></div>
            <button id="next-quiz-btn" class="filter-btn" style="display: none; width: 100%;">Next Question ➔</button>
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
