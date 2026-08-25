/**
 * Gondi Language & Culture Explorer - Interactive Engine
 * South-Central Dravidian Heritage of Central India (Gondwana)
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Gondi Vocabulary Dataset (click-to-hear word explorer) ---
    const gondiVocabulary = [
        {
            id: 'word-koitur',
            word: 'Koitur',
            deva: 'कोइतुर',
            ipa: '[koː.iː.t̪oːr]',
            meaning: 'The People (self-designation of the Gond community)',
            category: 'identity',
            note: 'Gonds refer to themselves as Koitur or Koi rather than the outsider term "Gond".'
        },
        {
            id: 'word-koyang',
            word: 'Koyang',
            deva: 'कोयांग',
            ipa: '[koː.jaŋ]',
            meaning: 'The Gondi language itself',
            category: 'identity',
            note: 'The self-name for the language, used alongside "Gondi" in phrasebooks and dictionaries.'
        },
        {
            id: 'word-yan',
            word: 'Yān',
            deva: 'यान',
            ipa: '[jaːn]',
            meaning: 'I (first-person pronoun)',
            category: 'grammar',
            note: 'A core Dravidian pronoun, cognate with Proto-Dravidian *yān / *ñān.'
        },
        {
            id: 'word-persapen',
            word: 'Persa Pen',
            deva: 'पेरसा पेन',
            ipa: '[peːrsaː peːn]',
            meaning: 'The Supreme Deity / Great God',
            category: 'faith',
            note: 'The central divine figure invoked in the indigenous Koya Punem faith of the Koitur people.'
        },
        {
            id: 'word-koyapunem',
            word: 'Koya Punem',
            deva: 'कोया पुनेम',
            ipa: '[koːjaː puːneːm]',
            meaning: 'The Gondi way of life / indigenous faith',
            category: 'faith',
            note: 'The traditional religious and cultural belief system rooted in nature worship and ancestor reverence.'
        },
        {
            id: 'word-lingo',
            word: 'Pari Kupar Lingo',
            deva: 'पारी कुपार लिंगो',
            ipa: '[paːriː kuːpaːr liŋɡoː]',
            meaning: 'Legendary culture-hero and sage',
            category: 'faith',
            note: 'Revered in Koitur tradition as the founding sage credited with organising Gondi clans, music, and script.'
        },
        {
            id: 'word-gondwana',
            word: 'Gondwana',
            deva: 'गोंडवाना',
            ipa: '[ɡoːɳɖ.waː.naː]',
            meaning: 'Land of the Gonds',
            category: 'geography',
            note: 'The historic central-Indian homeland of the Koitur; also lent its name to the ancient supercontinent Gondwana.'
        },
        {
            id: 'word-gond',
            word: 'Gōṇḍī / Gōṇḍ',
            deva: 'गोंडी',
            ipa: '[ɡoːɳɖiː]',
            meaning: 'Hill people (outsider term, from Telugu "konda" / Sanskrit "gonda", meaning hill)',
            category: 'identity',
            note: 'The widely used exonym "Gond" is believed to derive from words for "hill" or "mountain".'
        }
    ];

    // --- 2. Major Central Indian Regions ---
    const regionData = {
        madhyapradesh: {
            name: 'Madhya Pradesh',
            badge: 'Northern Gondi Heartland',
            elevation: '📍 Districts: Betul, Chhindwara, Mandla, Seoni',
            desc: 'Historic seat of the powerful Garha-Mandla Gond kingdom, once ruled by the celebrated warrior-queen Rani Durgavati. Home to the largest Gondi-speaking population in India.',
            tags: ['Mandla', 'Chhindwara', 'Garha-Mandla Kingdom', 'Northern Gondi Dialect']
        },
        chhattisgarh: {
            name: 'Chhattisgarh',
            badge: 'The Bastar Region',
            elevation: '📍 Districts: Bastar, Kanker, Kondagaon, Dantewada',
            desc: 'The Bastar plateau is often called the cultural heart of Gondwana, with a dense concentration of Koitur communities, hereditary Pardhan bards, and vibrant Dussehra tribal festivities.',
            tags: ['Bastar', 'Kanker', 'Pardhan Bards', 'Bastar Dussehra']
        },
        maharashtra: {
            name: 'Maharashtra',
            badge: 'Eastern Vidarbha Belt',
            elevation: '📍 Districts: Gadchiroli, Chandrapur, Nagpur, Bhandara',
            desc: 'Forested Vidarbha districts are home to Aheri and Adilabad Gondi speakers, with Gadchiroli among the least-disturbed strongholds of Gondi oral tradition.',
            tags: ['Gadchiroli', 'Chandrapur', 'Aheri Gondi Dialect', 'Vidarbha']
        },
        telangana: {
            name: 'Telangana',
            badge: 'Adilabad & the Gunjala Script Belt',
            elevation: '📍 Districts: Adilabad, Komaram Bheem, Nirmal',
            desc: 'Northern Telangana holds the largest single concentration of Gondi speakers, written locally in the Telugu script. Adilabad district is also where the historic Gunjala Gondi manuscripts were rediscovered.',
            tags: ['Adilabad', 'Utnoor', 'Gunjala Gondi Script', 'Keslapur Jatara']
        }
    };

    // --- 3. Web Audio API & Speech Synthesizer Engine ---
    let audioCtx = null;
    let currentPlaybackSpeed = 1.0;

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

    function playAudioPronunciation(text, ipa, wordName, btnElement) {
        if (btnElement) {
            btnElement.classList.add('playing');
            setTimeout(() => btnElement.classList.remove('playing'), 1500);
        }

        animateHeroWaveCanvas();

        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = currentPlaybackSpeed * 0.85;
            utterance.pitch = 1.0;

            const voices = window.speechSynthesis.getVoices();
            const indicVoice = voices.find(v => v.lang.includes('te') || v.lang.includes('hi') || v.lang.includes('mr') || v.lang.includes('in') || v.lang.includes('en-IN'));
            if (indicVoice) {
                utterance.voice = indicVoice;
            }

            utterance.onend = () => {
                if (btnElement) btnElement.classList.remove('playing');
            };

            window.speechSynthesis.speak(utterance);
        } else {
            synthesizeFormantAudio(wordName || text);
        }
    }

    function synthesizeFormantAudio(word) {
        try {
            const ctx = getAudioContext();
            const now = ctx.currentTime;

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(150, now);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8 / currentPlaybackSpeed);

            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(850, now);
            filter.Q.setValueAtTime(3.0, now);

            osc.connect(filter);
            filter.connect(gain);
            gain.connect(ctx.destination);

            osc.start(now);
            osc.stop(now + 0.8 / currentPlaybackSpeed);
        } catch (e) {
            console.log('Audio synth playback:', e);
        }
    }

    function animateHeroWaveCanvas() {
        const canvas = document.getElementById('hero-wave-canvas');
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        let frame = 0;
        const maxFrames = 45;

        function renderWave() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.beginPath();
            ctx.lineWidth = 2;
            ctx.strokeStyle = '#c0392b';

            const height = canvas.height;
            const width = canvas.width;
            const amplitude = (1 - frame / maxFrames) * 12;

            for (let x = 0; x < width; x += 4) {
                const y = height / 2 + Math.sin(x * 0.08 + frame * 0.3) * amplitude;
                if (x === 0) ctx.moveTo(x, y);
                else ctx.lineTo(x, y);
            }
            ctx.stroke();

            frame++;
            if (frame < maxFrames) {
                requestAnimationFrame(renderWave);
            } else {
                ctx.clearRect(0, 0, width, height);
            }
        }
        renderWave();
    }

    // --- 4. Render Vocabulary Cards (Interactive Word Explorer) ---
    const vocabGrid = document.getElementById('vocab-grid');
    const searchInput = document.getElementById('vocab-search-input');
    const searchClearBtn = document.getElementById('vocab-search-clear');
    const filterTabs = document.querySelectorAll('.filter-tab');

    let currentCategoryFilter = 'all';
    let currentSearchQuery = '';

    function getCategoryLabel(cat) {
        switch (cat) {
            case 'identity': return '🪶 Identity & Language';
            case 'faith': return '🔥 Faith & Culture';
            case 'grammar': return '🔤 Grammar';
            case 'geography': return '🗺️ Geography';
            default: return '💬 General';
        }
    }

    function renderVocabGrid() {
        if (!vocabGrid) return;

        const filtered = gondiVocabulary.filter(item => {
            const matchesCat = currentCategoryFilter === 'all' || item.category === currentCategoryFilter;
            const query = currentSearchQuery.toLowerCase().trim();
            const matchesSearch = !query ||
                item.word.toLowerCase().includes(query) ||
                item.deva.toLowerCase().includes(query) ||
                item.meaning.toLowerCase().includes(query) ||
                item.note.toLowerCase().includes(query);
            return matchesCat && matchesSearch;
        });

        if (filtered.length === 0) {
            vocabGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--gondi-text-muted);">
                    <div style="font-size: 2rem; margin-bottom: 10px;">🔍</div>
                    <p style="font-size: 1.1rem; margin: 0;">No Gondi words found matching "<strong>${currentSearchQuery}</strong>"</p>
                </div>
            `;
            return;
        }

        vocabGrid.innerHTML = filtered.map(item => `
            <div class="vocab-card" id="${item.id}">
                <div>
                    <div class="vocab-card-header">
                        <span class="vocab-cat-badge">${getCategoryLabel(item.category)}</span>
                        <span style="font-size: 0.8rem; color: var(--gondi-text-muted); font-family: monospace;">${item.ipa}</span>
                    </div>
                    <div class="vocab-word-odia">${item.deva}</div>
                    <h3 class="vocab-word-title">${item.word}</h3>
                    <div class="vocab-meaning">${item.meaning}</div>

                    <div class="vocab-cognate-pill">
                        ${item.note}
                    </div>
                </div>

                <button class="btn-play-audio vocab-play-btn" data-word="${item.word}" data-ipa="${item.ipa}" data-text="${item.word} - ${item.meaning}">
                    <span class="play-icon">🔊</span>
                    <span>Play Audio</span>
                </button>
            </div>
        `).join('');

        vocabGrid.querySelectorAll('.vocab-play-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const word = btn.getAttribute('data-word');
                const ipa = btn.getAttribute('data-ipa');
                const text = btn.getAttribute('data-text');
                playAudioPronunciation(text, ipa, word, btn);
            });
        });
    }

    if (searchInput) {
        searchInput.addEventListener('input', (e) => {
            currentSearchQuery = e.target.value;
            if (searchClearBtn) {
                searchClearBtn.classList.toggle('visible', currentSearchQuery.length > 0);
            }
            renderVocabGrid();
        });
    }

    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentSearchQuery = '';
            searchClearBtn.classList.remove('visible');
            renderVocabGrid();
        });
    }

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            currentCategoryFilter = tab.getAttribute('data-category');
            renderVocabGrid();
        });
    });

    const speedBtns = document.querySelectorAll('.speed-btn');
    speedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            speedBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPlaybackSpeed = parseFloat(btn.getAttribute('data-speed')) || 1.0;
        });
    });

    document.querySelectorAll('.btn-play-audio').forEach(btn => {
        btn.addEventListener('click', () => {
            const word = btn.getAttribute('data-word');
            const ipa = btn.getAttribute('data-ipa');
            const text = btn.getAttribute('data-text');
            playAudioPronunciation(text, ipa, word, btn);
        });
    });

    renderVocabGrid();

    // --- 5. Region Selector Interactions ---
    const regionItems = document.querySelectorAll('.region-item');
    const regionInfoPanel = document.getElementById('region-info-panel');

    regionItems.forEach(item => {
        item.addEventListener('click', () => {
            const regionKey = item.getAttribute('data-region');
            const data = regionData[regionKey];
            if (!data || !regionInfoPanel) return;

            regionItems.forEach(i => i.classList.remove('active'));
            item.classList.add('active');

            regionInfoPanel.innerHTML = `
                <div class="region-card active">
                    <span class="region-badge">${data.badge}</span>
                    <h3>${data.name}</h3>
                    <p class="region-elevation">${data.elevation}</p>
                    <p class="region-desc">${data.desc}</p>
                    <div class="region-tags">
                        ${data.tags.map(t => `<span class="tag">${t}</span>`).join('')}
                    </div>
                </div>
            `;
        });
    });

    // --- 6. Interactive Gondi Quiz Engine ---
    const quizQuestions = [
        {
            question: 'What is the common Gondi greeting?',
            options: ['Vanakkam', 'Seva Johar', 'Khamma Ghani', 'Julley'],
            answer: 1,
            explanation: '"Seva Johar" (or simply "Johar") is the traditional greeting exchanged among Koitur communities.'
        },
        {
            question: 'Which language family does Gondi belong to?',
            options: ['Indo-Aryan', 'South-Central Dravidian', 'Austroasiatic (Munda)', 'Tibeto-Burman'],
            answer: 1,
            explanation: 'Gondi is a South-Central Dravidian language, closely related to Telugu and Konda.'
        },
        {
            question: 'What do the Gonds call themselves, rather than the outsider term "Gond"?',
            options: ['Koitur', 'Bhilala', 'Santhal', 'Munda'],
            answer: 0,
            explanation: '"Koitur" (or "Koi"), meaning "the People", is the self-designation used by the Gondi-speaking community.'
        },
        {
            question: 'Which historic Gondi script was rediscovered in 2014 from 1750s manuscripts?',
            options: ['Masaram Gondi', 'Gunjala Gondi', 'Modi Script', 'Kaithi Script'],
            answer: 1,
            explanation: 'The Gunjala Gondi script was rediscovered in Adilabad district and added to Unicode in 2018.'
        },
        {
            question: 'Who is the Supreme Deity invoked in the indigenous Koya Punem faith?',
            options: ['Persa Pen', 'Baba Dev', 'Marang Buru', 'Thakur Dev'],
            answer: 0,
            explanation: '"Persa Pen" is the central divine figure of Koya Punem, the traditional Koitur faith.'
        }
    ];

    let currentQIndex = 0;
    let quizScore = 0;
    let selectedOption = null;

    const quizQNum = document.getElementById('quiz-q-num');
    const quizScoreText = document.getElementById('quiz-score');
    const quizQText = document.getElementById('quiz-question-text');
    const quizOptionsGrid = document.getElementById('quiz-options-grid');
    const quizFeedback = document.getElementById('quiz-feedback');
    const quizProgressFill = document.getElementById('quiz-progress-fill');
    const btnQuizNext = document.getElementById('btn-quiz-next');

    function loadQuizQuestion() {
        if (!quizQText || currentQIndex >= quizQuestions.length) return;

        const q = quizQuestions[currentQIndex];
        selectedOption = null;

        if (quizQNum) quizQNum.textContent = `Question ${currentQIndex + 1} of ${quizQuestions.length}`;
        if (quizScoreText) quizScoreText.textContent = `Score: ${quizScore}`;
        if (quizProgressFill) quizProgressFill.style.width = `${((currentQIndex + 1) / quizQuestions.length) * 100}%`;

        quizQText.textContent = q.question;

        if (quizFeedback) {
            quizFeedback.className = 'quiz-feedback hidden';
        }
        if (btnQuizNext) {
            btnQuizNext.disabled = true;
            btnQuizNext.textContent = currentQIndex === quizQuestions.length - 1 ? 'Finish Quiz 🎉' : 'Next Question ➔';
        }

        if (quizOptionsGrid) {
            quizOptionsGrid.innerHTML = q.options.map((opt, idx) => `
                <button class="quiz-option-btn" data-idx="${idx}">
                    <span style="font-weight: 700; margin-right: 8px;">${String.fromCharCode(65 + idx)}.</span>
                    ${opt}
                </button>
            `).join('');

            quizOptionsGrid.querySelectorAll('.quiz-option-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (selectedOption !== null) return;
                    const idx = parseInt(btn.getAttribute('data-idx'));
                    handleAnswerSelection(idx, q);
                });
            });
        }
    }

    function handleAnswerSelection(idx, question) {
        selectedOption = idx;
        const buttons = quizOptionsGrid.querySelectorAll('.quiz-option-btn');

        buttons.forEach((b, bIdx) => {
            b.disabled = true;
            if (bIdx === question.answer) {
                b.classList.add('correct');
            } else if (bIdx === idx) {
                b.classList.add('wrong');
            }
        });

        if (idx === question.answer) {
            quizScore += 10;
            if (quizScoreText) quizScoreText.textContent = `Score: ${quizScore}`;
            showFeedback(true, `Correct! ${question.explanation}`);
        } else {
            showFeedback(false, `Incorrect. ${question.explanation}`);
        }

        if (btnQuizNext) btnQuizNext.disabled = false;
    }

    function showFeedback(isCorrect, text) {
        if (!quizFeedback) return;
        quizFeedback.className = `quiz-feedback ${isCorrect ? 'correct-bg' : 'wrong-bg'}`;
        quizFeedback.innerHTML = `
            <span class="feedback-icon">${isCorrect ? '✅' : '❌'}</span>
            <span class="feedback-text">${text}</span>
        `;
    }

    if (btnQuizNext) {
        btnQuizNext.addEventListener('click', () => {
            currentQIndex++;
            if (currentQIndex < quizQuestions.length) {
                loadQuizQuestion();
            } else {
                showQuizSummary();
            }
        });
    }

    function showQuizSummary() {
        const quizCard = document.getElementById('quiz-card');
        if (!quizCard) return;

        quizCard.innerHTML = `
            <div style="text-align: center; padding: 20px 0;">
                <div style="font-size: 3.5rem; margin-bottom: 10px;">🏆</div>
                <h3 style="font-family: var(--gondi-font-serif); font-size: 2rem; margin: 0 0 10px;">Quiz Completed!</h3>
                <p style="font-size: 1.2rem; color: var(--gondi-accent); font-weight: 700; margin-bottom: 20px;">
                    Your Final Score: ${quizScore} / ${quizQuestions.length * 10} Points
                </p>
                <p style="color: var(--gondi-text-muted); margin-bottom: 30px;">
                    ${quizScore >= 40 ? 'Outstanding! You are well versed in Gondi language and Koitur heritage.' : 'Good effort! Review the word bank and try again.'}
                </p>
                <button class="btn-play-audio" id="btn-restart-quiz" style="margin: 0 auto;">
                    🔄 Restart Quiz
                </button>
            </div>
        `;

        document.getElementById('btn-restart-quiz')?.addEventListener('click', () => {
            location.reload();
        });
    }

    loadQuizQuestion();
});