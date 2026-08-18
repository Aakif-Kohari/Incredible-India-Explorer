/**
 * Kui Language & Culture Explorer - Interactive Engine
 * South-Central Dravidian Heritage of Odisha Highlands
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Kui Vocabulary Dataset ---
    const kuiVocabulary = [
        {
            id: 'word-kui',
            word: 'Kũi',
            odia: 'କୁ‍ଇ',
            ipa: '[kui̯]',
            meaning: 'Language of the Kondha people / Native speech',
            category: 'culture',
            cognate: 'Self-designation of the indigenous Kondha inhabitants',
            formants: [300, 2200, 3200]
        },
        {
            id: 'word-eyu',
            word: 'Eyu / Eju',
            odia: 'ଏୟୁ / ଏଜୁ',
            ipa: '[eju]',
            meaning: 'Water / River stream',
            category: 'nature',
            cognate: 'Telugu: Ēru (ఏరు), Tamil: Nīr (நீரும்), Proto-Dravidian: *nīr/*yāṟu',
            formants: [500, 1800, 2500]
        },
        {
            id: 'word-mara',
            word: 'Mara',
            odia: 'ମଡ଼ା / ମରା',
            ipa: '[maɽa]',
            meaning: 'Tree / Sal wood / Timber',
            category: 'nature',
            cognate: 'Tamil/Malayalam: Maram (மரம்), Kannada: Mara (ಮರ), Proto-Dravidian: *mar-am',
            formants: [700, 1200, 2400]
        },
        {
            id: 'word-illu',
            word: 'Illu / Idu',
            odia: 'ଇଡ଼ୁ / ଇଲ୍ଲୁ',
            ipa: '[iɽu]',
            meaning: 'House / Home / Dwelling',
            category: 'life',
            cognate: 'Telugu: Illu (ఇల్లు), Tamil: Illam (இல்லம்), Kannada: Illu (ಇಲ್ಲು)',
            formants: [350, 2300, 3000]
        },
        {
            id: 'word-palu',
            word: 'Pālu',
            odia: 'ପାଲୁ',
            ipa: '[paːlu]',
            meaning: 'Milk / Pure liquid',
            category: 'life',
            cognate: 'Tamil: Pāl (பால்), Telugu: Pālu (పాలు), Kannada: Hālu (ಹಾಲು)',
            formants: [650, 1100, 2500]
        },
        {
            id: 'word-kanu',
            word: 'Kānu',
            odia: 'କାନୁ',
            ipa: '[kaːnu]',
            meaning: 'Eye / Sight / Vision',
            category: 'body',
            cognate: 'Tamil/Malayalam: Kaṇ (கண்), Telugu: Kanni (కన్ను), Kannada: Kaṇṇu (ಕಣ್ಣು)',
            formants: [700, 1300, 2600]
        },
        {
            id: 'word-kadu',
            word: 'Kādu / Kāl',
            odia: 'କାଡ଼ୁ',
            ipa: '[kaːɖu]',
            meaning: 'Leg / Foot / Path',
            category: 'body',
            cognate: 'Tamil/Telugu/Malayalam: Kāl (கால்), Proto-Dravidian: *kāl',
            formants: [680, 1250, 2450]
        },
        {
            id: 'word-meenu',
            word: 'Meenu',
            odia: 'ମୀନୁ',
            ipa: '[miːnu]',
            meaning: 'Fish / Aquatic life',
            category: 'nature',
            cognate: 'Tamil/Malayalam/Kannada: Mīn (மீன்), Telugu: Mīnu (మీను)',
            formants: [300, 2400, 3100]
        },
        {
            id: 'word-penu',
            word: 'Penu',
            odia: 'ପେନୁ',
            ipa: '[penu]',
            meaning: 'Sacred Spirit / Deity (e.g. Dharani Penu)',
            category: 'culture',
            cognate: 'Gondi: Pen (Spirit), South-Central Dravidian sacred root',
            formants: [450, 1900, 2700]
        },
        {
            id: 'word-raju',
            word: 'Rāju',
            odia: 'ରାଜୁ',
            ipa: '[raːɟu]',
            meaning: 'Chief / Hill leader / Mountain ruler',
            category: 'culture',
            cognate: 'Shared regional highland chieftain designation (Niyam Raja)',
            formants: [600, 1400, 2400]
        },
        {
            id: 'word-potu',
            word: 'Pōtu',
            odia: 'ପୋତୁ',
            ipa: '[poːtu]',
            meaning: 'Male animal / Strong bull',
            category: 'life',
            cognate: 'Tamil: Pōttu (போத்து), Telugu: Pōtu (పోతు)',
            formants: [500, 1000, 2400]
        },
        {
            id: 'word-vali',
            word: 'Vāli / Vāyu',
            odia: 'ଵାଲି',
            ipa: '[vaːli]',
            meaning: 'Wind / Hill breeze',
            category: 'nature',
            cognate: 'Tamil: Vāli (வாளி), South Dravidian atmospheric root',
            formants: [600, 1500, 2500]
        }
    ];

    // --- 2. Regional Data for Odisha Highlands ---
    const regionData = {
        kandhamal: {
            name: 'Kandhamal (Phulbani & Daringbadi)',
            badge: 'Heartland District',
            elevation: '⛰️ Elevation: 900m – 1,100m above sea level',
            desc: 'Epicentre of Kui culture and speakers. Home to pine-scented Daringbadi ("The Kashmir of Odisha"), lush valley terraced farming, world-renowned organic Kandhamal Haldi (turmeric), and traditional Kutia & Maliah Kondha hamlets.',
            tags: ['Kutia Kondha', 'Daringbadi Pines', 'Kandhamal Haldi', 'Phulbani']
        },
        rayagada: {
            name: 'Rayagada & Niyamgiri Hills',
            badge: 'Sacred Mountain Territory',
            elevation: '⛰️ Elevation: 1,300m Peak Elevation',
            desc: 'The homeland of the Dongria Kondha tribe who inhabit the dense forests of the Niyamgiri hill range. Famous for sacred reverent eco-worship of Niyam Raja, intricate Kapdaganda hand embroidery, and pristine hilltop streams.',
            tags: ['Dongria Kondha', 'Niyamgiri Range', 'Kapdaganda Embroidery', 'Bisam Cuttack']
        },
        kalahandi: {
            name: 'Kalahandi High Plateaus',
            badge: 'Western Highland Gateway',
            elevation: '⛰️ Elevation: 700m – 1,000m',
            desc: 'Spanning Thuamul Rampur, Lanjigarh, and Karlapat Wildlife Sanctuary. Characterized by rolling highland plateaus, ancient Dhokra lost-wax brass foundries, and traditional Chaitra Parba spring dances.',
            tags: ['Thuamul Rampur', 'Karlapat Sanctuary', 'Dhokra Craft', 'Lanjigarh']
        },
        koraput: {
            name: 'Koraput & Nabarangpur Valleys',
            badge: 'Southern Eastern Ghats',
            elevation: '⛰️ Elevation: 850m – 1,200m',
            desc: 'Picturesque valley territory bordering Andhra Pradesh. Rich in agro-biodiversity, tribal weekly markets (haats), ancient stone wall art, and Kui-speaking indigenous forest settlements.',
            tags: ['Koraput Valley', 'Pottangi', 'Desia & Kui Dialects', 'Agro-Biodiversity']
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

    // Play verified speech audio using Web Speech API with Web Audio API Formant Synth fallback
    function playAudioPronunciation(text, ipa, wordName, btnElement) {
        if (btnElement) {
            btnElement.classList.add('playing');
            setTimeout(() => btnElement.classList.remove('playing'), 1500);
        }

        // Draw audio wave animation
        animateHeroWaveCanvas();

        // 1. Try SpeechSynthesis API
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel(); // Stop ongoing speech

            const utterance = new SpeechSynthesisUtterance(text);
            utterance.rate = currentPlaybackSpeed * 0.85; // Slightly slower for clarity
            utterance.pitch = 1.05; // Friendly warm pitch

            // Try finding an Indic voice if available
            const voices = window.speechSynthesis.getVoices();
            const indicVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('ta') || v.lang.includes('te') || v.lang.includes('in') || v.lang.includes('en-IN'));
            if (indicVoice) {
                utterance.voice = indicVoice;
            }

            utterance.onend = () => {
                if (btnElement) btnElement.classList.remove('playing');
            };

            window.speechSynthesis.speak(utterance);
        } else {
            // 2. Fallback Formant Synthesizer via Web Audio API
            synthesizeFormantAudio(wordName || text);
        }
    }

    // Formant Synthesizer Fallback for vocal sounds
    function synthesizeFormantAudio(word) {
        try {
            const ctx = getAudioContext();
            const now = ctx.currentTime;
            
            // Create oscillator for vocal tone
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            
            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(140, now); // Fundamental pitch ~140Hz
            
            // Envelope
            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8 / currentPlaybackSpeed);

            // Filter for formant resonance
            const filter = ctx.createBiquadFilter();
            filter.type = 'bandpass';
            filter.frequency.setValueAtTime(800, now);
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

    // Canvas Audio Wave Visualizer Animation
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
            ctx.strokeStyle = '#f39c12';

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

    function renderVocabGrid() {
        if (!vocabGrid) return;

        const filtered = kuiVocabulary.filter(item => {
            const matchesCat = currentCategoryFilter === 'all' || item.category === currentCategoryFilter;
            const query = currentSearchQuery.toLowerCase().trim();
            const matchesSearch = !query || 
                item.word.toLowerCase().includes(query) ||
                item.odia.toLowerCase().includes(query) ||
                item.meaning.toLowerCase().includes(query) ||
                item.cognate.toLowerCase().includes(query);
            return matchesCat && matchesSearch;
        });

        if (filtered.length === 0) {
            vocabGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--kui-text-muted);">
                    <div style="font-size: 2rem; margin-bottom: 10px;">🔍</div>
                    <p style="font-size: 1.1rem; margin: 0;">No Kui words found matching "<strong>${currentSearchQuery}</strong>"</p>
                </div>
            `;
            return;
        }

        vocabGrid.innerHTML = filtered.map(item => `
            <div class="vocab-card" id="${item.id}">
                <div>
                    <div class="vocab-card-header">
                        <span class="vocab-cat-badge">${getCategoryLabel(item.category)}</span>
                        <span style="font-size: 0.8rem; color: var(--kui-text-muted); font-family: monospace;">${item.ipa}</span>
                    </div>
                    <div class="vocab-word-odia">${item.odia}</div>
                    <h3 class="vocab-word-title">${item.word}</h3>
                    <div class="vocab-meaning">${item.meaning}</div>
                    
                    <div class="vocab-cognate-pill">
                        <strong>Dravidian Roots:</strong> ${item.cognate}
                    </div>
                </div>

                <button class="btn-play-audio vocab-play-btn" data-word="${item.word}" data-ipa="${item.ipa}" data-text="${item.word} - ${item.meaning}">
                    <span class="play-icon">🔊</span>
                    <span>Play Audio</span>
                </button>
            </div>
        `).join('');

        // Attach event listeners to newly created play buttons
        vocabGrid.querySelectorAll('.vocab-play-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                const word = btn.getAttribute('data-word');
                const ipa = btn.getAttribute('data-ipa');
                const text = btn.getAttribute('data-text');
                playAudioPronunciation(text, ipa, word, btn);
            });
        });
    }

    function getCategoryLabel(cat) {
        switch(cat) {
            case 'nature': return '🌿 Nature';
            case 'life': return '🏡 House & Life';
            case 'body': return '👁️ Body';
            case 'culture': return '⛰️ Culture';
            default: return '💬 General';
        }
    }

    // Search and Filter Events
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

    // Speed Toggle Buttons
    const speedBtns = document.querySelectorAll('.speed-btn');
    speedBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            speedBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentPlaybackSpeed = parseFloat(btn.getAttribute('data-speed')) || 1.0;
        });
    });

    // Audio Play Buttons globally
    document.querySelectorAll('.btn-play-audio').forEach(btn => {
        btn.addEventListener('click', () => {
            const word = btn.getAttribute('data-word');
            const ipa = btn.getAttribute('data-ipa');
            const text = btn.getAttribute('data-text');
            playAudioPronunciation(text, ipa, word, btn);
        });
    });

    // Initial render
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

    // --- 6. Interactive Kui Quiz Engine ---
    const quizQuestions = [
        {
            question: 'What is the primary native Kui greeting meaning "Hello / Warm Reverence"?',
            options: ['Aaju / Johara', 'Namaste', 'Mane-na', 'Ninge sadhi-na'],
            answer: 0,
            explanation: '"Aaju" or "Johara" is the traditional respectful Kui greeting used across the highlands.'
        },
        {
            question: 'Which linguistic family branch does the Kui language belong to?',
            options: ['Indo-Aryan', 'Austroasiatic (Munda)', 'South-Central Dravidian', 'Tibeto-Burman'],
            answer: 2,
            explanation: 'Kui is a South-Central Dravidian language, closely related to Kuvi, Gondi, and Telugu.'
        },
        {
            question: 'What is the Kui word for "Water"?',
            options: ['Mara', 'Eyu / Eju', 'Illu', 'Kānu'],
            answer: 1,
            explanation: '"Eyu" (or "Eju") means water in Kui, cognate to Proto-Dravidian *nīr/*yāṟu.'
        },
        {
            question: 'Which sacred mountain in Rayagada is considered the spiritual home of the Dongria Kondha?',
            options: ['Deomali', 'Niyamgiri Hills', 'Mahendragiri', 'Similipal'],
            answer: 1,
            explanation: 'Niyamgiri is sacred to the Dongria Kondha, who revere Niyam Raja (the mountain deity).'
        },
        {
            question: 'What is the GI-tagged traditional embroidered shawl crafted by Dongria Kondha women called?',
            options: ['Kapdaganda', 'Kantha', 'Phulkari', 'Pashmina'],
            answer: 0,
            explanation: 'The Kapdaganda is an intricately embroidered shawl featuring geometric red, yellow, and green triangles.'
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
                    if (selectedOption !== null) return; // Prevent changing after selection
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
                <h3 style="font-family: var(--kui-font-serif); font-size: 2rem; margin: 0 0 10px;">Quiz Completed!</h3>
                <p style="font-size: 1.2rem; color: var(--kui-accent); font-weight: 700; margin-bottom: 20px;">
                    Your Final Score: ${quizScore} / ${quizQuestions.length * 10} Points
                </p>
                <p style="color: var(--kui-text-muted); margin-bottom: 30px;">
                    ${quizScore >= 40 ? 'Outstanding! You are a master of Kui language and highland culture.' : 'Good effort! Review the word bank and try again.'}
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

    // Load initial quiz state
    loadQuizQuestion();
});
