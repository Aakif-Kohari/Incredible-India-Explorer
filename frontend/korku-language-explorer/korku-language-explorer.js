/**
 * Korku Language & Culture Explorer - Interactive Engine
 * Westernmost Munda (Austroasiatic) Heritage of the Satpura Hills
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Korku Vocabulary Dataset ---
    const korkuVocabulary = [
        {
            id: 'word-juar',
            word: 'Juar',
            deva: 'जोहार',
            ipa: '[dʒuaːr]',
            meaning: 'Hello / Greetings',
            category: 'greeting',
            note: 'A common Munda-family greeting, shared in form with neighbouring Gondi and other central Indian tribal languages.'
        },
        {
            id: 'word-inj',
            word: 'Iñj',
            deva: 'इंज्',
            ipa: '[iɲɟ]',
            meaning: 'I (first-person pronoun)',
            category: 'grammar',
            note: 'Documented in Korku sentence structure, e.g. "Iñj dukanaʈen saːkaɾ sasaːba" — "I will bring sugar from the store."'
        },
        {
            id: 'word-ura',
            word: 'Ura',
            deva: 'उरा',
            ipa: '[uːraː]',
            meaning: 'House',
            category: 'life',
            note: 'Attested in Korku locational sentences such as "ura-iñ" — "I am in the house."'
        },
        {
            id: 'word-korku',
            word: 'Korku',
            deva: 'कोरकू',
            ipa: '[koːrkuː]',
            meaning: 'People / Men (self-designation)',
            category: 'identity',
            note: '"Koru" (man) + "ku" (plural) = "people". Cognate with Mundari "hõrõ" and Santali "hoṛo", both meaning "man".'
        },
        {
            id: 'word-miya',
            word: 'Miya',
            deva: 'मया',
            ipa: '[mĩjaː]',
            meaning: 'One (1)',
            category: 'numbers',
            note: 'The native Korku numeral for one, part of a base-twenty counting system.'
        },
        {
            id: 'word-baria',
            word: 'Baria',
            deva: 'बरिया',
            ipa: '[bariaː]',
            meaning: 'Two (2)',
            category: 'numbers',
            note: 'The native Korku numeral for two.'
        },
        {
            id: 'word-aphay',
            word: 'Aphay',
            deva: 'अफय',
            ipa: '[əpʰəj]',
            meaning: 'Three (3)',
            category: 'numbers',
            note: 'The native Korku numeral for three.'
        },
        {
            id: 'word-gel',
            word: 'Gel',
            deva: 'गेल',
            ipa: '[ɡeːl]',
            meaning: 'Ten (10)',
            category: 'numbers',
            note: 'Ten is the base unit of the Korku counting system; twenty ("isa") becomes the higher base beyond ten.'
        }
    ];

    // --- 2. Central Indian Regions ---
    const regionData = {
        madhyapradesh: {
            name: 'Madhya Pradesh',
            badge: 'Southern Heartland',
            elevation: '📍 Districts: Betul, Khandwa, Harda, Narmadapuram (Hoshangabad)',
            desc: 'The southern districts of Madhya Pradesh hold the largest share of Korku speakers, scattered across both the northern and southern slopes of the Satpura mountain range.',
            tags: ['Betul', 'Khandwa', 'Harda', 'Satpura Range']
        },
        maharashtra: {
            name: 'Maharashtra',
            badge: 'The Melghat Region',
            elevation: '📍 Districts: Amravati, Akola, Buldhana, Chandrapur',
            desc: 'The forested Melghat region of Amravati district — spanning the Dharni and Chikhaldara tehsils — is the cultural heartland of the Korku in Maharashtra, rich in Mahabharata-linked folklore.',
            tags: ['Melghat', 'Dharni', 'Chikhaldara', 'Amravati']
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
            const indicVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('mr') || v.lang.includes('in') || v.lang.includes('en-IN'));
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
            osc.frequency.setValueAtTime(145, now);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8 / currentPlaybackSpeed);

            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(820, now);
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
            ctx.strokeStyle = '#27ae60';

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

    // --- 4. Render Vocabulary Cards ---
    const vocabGrid = document.getElementById('vocab-grid');
    const searchInput = document.getElementById('vocab-search-input');
    const searchClearBtn = document.getElementById('vocab-search-clear');
    const filterTabs = document.querySelectorAll('.filter-tab');

    let currentCategoryFilter = 'all';
    let currentSearchQuery = '';

    function getCategoryLabel(cat) {
        switch (cat) {
            case 'greeting': return '👋 Greeting';
            case 'grammar': return '🔤 Grammar';
            case 'life': return '🏡 Daily Life';
            case 'identity': return '🪶 Identity';
            case 'numbers': return '🔢 Numbers';
            default: return '💬 General';
        }
    }

    function renderVocabGrid() {
        if (!vocabGrid) return;

        const filtered = korkuVocabulary.filter(item => {
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
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--korku-text-muted);">
                    <div style="font-size: 2rem; margin-bottom: 10px;">🔍</div>
                    <p style="font-size: 1.1rem; margin: 0;">No Korku words found matching "<strong>${currentSearchQuery}</strong>"</p>
                </div>
            `;
            return;
        }

        vocabGrid.innerHTML = filtered.map(item => `
            <div class="vocab-card" id="${item.id}">
                <div>
                    <div class="vocab-card-header">
                        <span class="vocab-cat-badge">${getCategoryLabel(item.category)}</span>
                        <span style="font-size: 0.8rem; color: var(--korku-text-muted); font-family: monospace;">${item.ipa}</span>
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

    // --- 6. Interactive Korku Quiz Engine ---
    const quizQuestions = [
        {
            question: 'What is the common Korku greeting?',
            options: ['Vanakkam', 'Juar', 'Ram Ram', 'Seva Johar'],
            answer: 1,
            explanation: '"Juar" is the common greeting in Korku, shared in form with several Munda-family languages of central India.'
        },
        {
            question: 'Which language family does Korku belong to?',
            options: ['Dravidian', 'Indo-Aryan', 'Austroasiatic (Munda)', 'Tibeto-Burman'],
            answer: 2,
            explanation: 'Korku is a North Munda language, part of the Austroasiatic family — the westernmost Munda language in India.'
        },
        {
            question: 'What script is Korku traditionally written in?',
            options: ['Telugu script', 'Devanagari script', 'Odia script', 'Gunjala Gondi script'],
            answer: 1,
            explanation: 'Korku is written using the Devanagari script (Balbodh style), though the language itself is primarily oral.'
        },
        {
            question: 'What does the word "Korku" itself mean?',
            options: ['River', 'Forest', 'People / Men', 'Mountain'],
            answer: 2,
            explanation: '"Korku" combines "koru" (man) and "ku" (plural), meaning "people" — cognate with Mundari "hõrõ".'
        },
        {
            question: 'Which forested region of Maharashtra is the Korku cultural heartland?',
            options: ['Melghat', 'Sahyadri', 'Konkan', 'Vidarbha Plains'],
            answer: 0,
            explanation: 'The Melghat region of Amravati district, spanning the Dharni and Chikhaldara tehsils, is the heart of Korku culture in Maharashtra.'
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
                <h3 style="font-family: var(--korku-font-serif); font-size: 2rem; margin: 0 0 10px;">Quiz Completed!</h3>
                <p style="font-size: 1.2rem; color: var(--korku-accent); font-weight: 700; margin-bottom: 20px;">
                    Your Final Score: ${quizScore} / ${quizQuestions.length * 10} Points
                </p>
                <p style="color: var(--korku-text-muted); margin-bottom: 30px;">
                    ${quizScore >= 40 ? 'Outstanding! You are well versed in Korku language and heritage.' : 'Good effort! Review the word bank and try again.'}
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