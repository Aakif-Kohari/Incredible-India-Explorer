/**
 * Bhili Language & Culture Explorer - Interactive Engine
 * Western Indo-Aryan Heritage of the Bhil Tribal Belt
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Bhili Vocabulary Dataset ---
    const bhiliVocabulary = [
        {
            id: 'word-pani',
            word: 'Pani',
            deva: 'पाणी',
            ipa: '[paːɳiː]',
            meaning: 'Water',
            category: 'nature',
            cognate: 'Gujarati: Pani (પાણી), Rajasthani: Paani, Hindi: Paani (पानी)',
            formants: [500, 1800, 2500]
        },
        {
            id: 'word-dungar',
            word: 'Dungar',
            deva: 'डूंगर',
            ipa: '[ɖuːŋɡər]',
            meaning: 'Hill / Mountain',
            category: 'nature',
            cognate: 'Gujarati: Dungar (ડુંગર), root of place names like Dungarpur ("City of Hills")',
            formants: [400, 1500, 2300]
        },
        {
            id: 'word-ghar',
            word: 'Ghar',
            deva: 'घर',
            ipa: '[ɡʱər]',
            meaning: 'House / Home',
            category: 'life',
            cognate: 'Gujarati: Ghar (ઘર), Rajasthani: Ghar, Hindi: Ghar (घर)',
            formants: [350, 2300, 3000]
        },
        {
            id: 'word-baap',
            word: 'Baap',
            deva: 'बाप',
            ipa: '[baːp]',
            meaning: 'Father',
            category: 'life',
            cognate: 'Shared across Gujarati, Rajasthani and Hindi as Baap (बाप)',
            formants: [600, 1100, 2400]
        },
        {
            id: 'word-ba',
            word: 'Ba / Ma',
            deva: 'बा / मा',
            ipa: '[baː] / [maː]',
            meaning: 'Mother',
            category: 'life',
            cognate: 'Gujarati: Ba (બા), Rajasthani/Hindi: Ma (मा)',
            formants: [500, 1200, 2400]
        },
        {
            id: 'word-chokro',
            word: 'Chokro',
            deva: 'छोकरो',
            ipa: '[tʃʰoːkro]',
            meaning: 'Boy',
            category: 'body',
            cognate: 'Gujarati: Chokro (છોકરો), Rajasthani: Chhokro',
            formants: [650, 1300, 2500]
        },
        {
            id: 'word-chokri',
            word: 'Chokri',
            deva: 'छोकरी',
            ipa: '[tʃʰoːkriː]',
            meaning: 'Girl',
            category: 'body',
            cognate: 'Gujarati: Chokri (છોકરી), Rajasthani: Chhokri',
            formants: [700, 1400, 2600]
        },
        {
            id: 'word-bhaat',
            word: 'Bhaat',
            deva: 'भात',
            ipa: '[bʱaːt̪]',
            meaning: 'Rice (cooked)',
            category: 'life',
            cognate: 'Shared with Marathi, Gujarati and Hindi as Bhaat (भात)',
            formants: [450, 1600, 2600]
        },
        {
            id: 'word-kaam',
            word: 'Kaam',
            deva: 'काम',
            ipa: '[kaːm]',
            meaning: 'Work / Labour',
            category: 'culture',
            cognate: 'Shared root across most Western Indo-Aryan languages',
            formants: [550, 1200, 2300]
        },
        {
            id: 'word-devta',
            word: 'Devta',
            deva: 'देवता',
            ipa: '[d̪eːʋt̪aː]',
            meaning: 'Deity / Nature spirit',
            category: 'culture',
            cognate: 'Same form across Gujarati, Rajasthani and Hindi; central to Bhil nature worship',
            formants: [500, 1500, 2500]
        }
    ];

    // --- 2. Regional Data across the Western Indian Tribal Belt ---
    const regionData = {
        rajasthan: {
            name: 'Rajasthan (Wagad Region)',
            badge: 'Southern Tribal Heartland',
            elevation: '📍 Districts: Banswara, Dungarpur, Pratapgarh',
            desc: 'Home to the largest concentration of Bhil Garasia and Dungri Bhil communities. The annual Baneshwar Fair at the sacred Som-Mahi river confluence draws lakhs of Bhil pilgrims each Shivratri.',
            tags: ['Banswara', 'Dungarpur', 'Baneshwar Fair', 'Wagdi Dialect']
        },
        gujarat: {
            name: 'Gujarat',
            badge: 'Eastern Hill Districts',
            elevation: '📍 Districts: Panchmahal, Dahod, Sabarkantha',
            desc: 'Rathwa and Dungri Bhil communities practice ritual Pithora wall-painting and observe vibrant seasonal fairs. Bhili here shows strong influence from neighbouring Gujarati.',
            tags: ['Panchmahal', 'Dahod', 'Pithora Art', 'Rathwa Community']
        },
        madhyapradesh: {
            name: 'Madhya Pradesh',
            badge: 'Western Heartland',
            elevation: '📍 Districts: Jhabua, Alirajpur, Dhar',
            desc: 'Jhabua and Alirajpur form the heart of Bhil country, famed for the colourful pre-Holi Bhagoria Haat festival where music, dance and courtship customs come alive in village markets.',
            tags: ['Jhabua', 'Alirajpur', 'Bhagoria Haat', 'Bhilali Dialect']
        },
        maharashtra: {
            name: 'Maharashtra (Khandesh Region)',
            badge: 'Satpura Hill Country',
            elevation: '📍 Districts: Dhule, Nandurbar, Jalgaon',
            desc: 'Bhil and Pawra communities inhabit the forested Satpura hill ranges. Local Bhili dialects here blend with Marathi and Ahirani vocabulary in daily speech.',
            tags: ['Dhule', 'Nandurbar', 'Satpura Range', 'Pawra Community']
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
            utterance.pitch = 1.0;

            // Try finding an Indic voice if available
            const voices = window.speechSynthesis.getVoices();
            const indicVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('gu') || v.lang.includes('mr') || v.lang.includes('in') || v.lang.includes('en-IN'));
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

            const osc = ctx.createOscillator();
            const gain = ctx.createGain();

            osc.type = 'sawtooth';
            osc.frequency.setValueAtTime(140, now);

            gain.gain.setValueAtTime(0, now);
            gain.gain.linearRampToValueAtTime(0.3, now + 0.05);
            gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8 / currentPlaybackSpeed);

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
            ctx.strokeStyle = '#e67e22';

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

        const filtered = bhiliVocabulary.filter(item => {
            const matchesCat = currentCategoryFilter === 'all' || item.category === currentCategoryFilter;
            const query = currentSearchQuery.toLowerCase().trim();
            const matchesSearch = !query ||
                item.word.toLowerCase().includes(query) ||
                item.deva.toLowerCase().includes(query) ||
                item.meaning.toLowerCase().includes(query) ||
                item.cognate.toLowerCase().includes(query);
            return matchesCat && matchesSearch;
        });

        if (filtered.length === 0) {
            vocabGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 40px; color: var(--bhili-text-muted);">
                    <div style="font-size: 2rem; margin-bottom: 10px;">🔍</div>
                    <p style="font-size: 1.1rem; margin: 0;">No Bhili words found matching "<strong>${currentSearchQuery}</strong>"</p>
                </div>
            `;
            return;
        }

        vocabGrid.innerHTML = filtered.map(item => `
            <div class="vocab-card" id="${item.id}">
                <div>
                    <div class="vocab-card-header">
                        <span class="vocab-cat-badge">${getCategoryLabel(item.category)}</span>
                        <span style="font-size: 0.8rem; color: var(--bhili-text-muted); font-family: monospace;">${item.ipa}</span>
                    </div>
                    <div class="vocab-word-odia">${item.deva}</div>
                    <h3 class="vocab-word-title">${item.word}</h3>
                    <div class="vocab-meaning">${item.meaning}</div>

                    <div class="vocab-cognate-pill">
                        <strong>Indo-Aryan Cognates:</strong> ${item.cognate}
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

    function getCategoryLabel(cat) {
        switch (cat) {
            case 'nature': return '🌿 Nature';
            case 'life': return '🏡 House & Life';
            case 'body': return '👤 People';
            case 'culture': return '🏹 Culture';
            default: return '💬 General';
        }
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

    // --- 6. Interactive Bhili Quiz Engine ---
    const quizQuestions = [
        {
            question: 'What is the common everyday Bhili greeting?',
            options: ['Ram Ram', 'Vanakkam', 'Julley', 'Khamma Ghani'],
            answer: 0,
            explanation: '"Ram Ram" is the everyday greeting exchanged across Bhil villages in Rajasthan, Gujarat, Madhya Pradesh and Maharashtra.'
        },
        {
            question: 'Which language family does Bhili belong to?',
            options: ['Dravidian', 'Austroasiatic (Munda)', 'Western Indo-Aryan', 'Tibeto-Burman'],
            answer: 2,
            explanation: 'Bhili is a Western Indo-Aryan language, closely related to Gujarati and Rajasthani.'
        },
        {
            question: 'What is the Bhili word for "Water"?',
            options: ['Ghar', 'Dungar', 'Pani', 'Kaam'],
            answer: 2,
            explanation: '"Pani" means water in Bhili, shared with Gujarati, Rajasthani and Hindi.'
        },
        {
            question: 'Which Madhya Pradesh district is home to the famous Bhagoria Haat festival?',
            options: ['Indore', 'Jhabua', 'Bhopal', 'Gwalior'],
            answer: 1,
            explanation: 'Jhabua district is the heartland of the colourful pre-Holi Bhagoria Haat festival.'
        },
        {
            question: 'Which scripts are used to write Bhili today?',
            options: ['Odia and Telugu', 'Devanagari and Gujarati', 'Tamil and Malayalam', 'Perso-Arabic only'],
            answer: 1,
            explanation: 'Bhili, historically an oral language, is today written using the Devanagari and Gujarati scripts.'
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
                <h3 style="font-family: var(--bhili-font-serif); font-size: 2rem; margin: 0 0 10px;">Quiz Completed!</h3>
                <p style="font-size: 1.2rem; color: var(--bhili-accent); font-weight: 700; margin-bottom: 20px;">
                    Your Final Score: ${quizScore} / ${quizQuestions.length * 10} Points
                </p>
                <p style="color: var(--bhili-text-muted); margin-bottom: 30px;">
                    ${quizScore >= 40 ? 'Outstanding! You are well versed in Bhili language and Bhil heritage.' : 'Good effort! Review the word bank and try again.'}
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