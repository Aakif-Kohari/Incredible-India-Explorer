/**
 * Kui Language & Culture Explorer - Interactive Engine
 * South-Central Dravidian Heritage of Odisha Highlands
 * 
 * Features:
 * - Web Speech API with Web Audio API Formant Fallback
 * - Dynamic Vocabulary Rendering with Search/Filter & Clipboard Copy
 * - Interactive Region Selector with Smooth Transitions
 * - Accessible Quiz Engine (Keyboard Navigable, LocalStorage High Score)
 * - Intersection Observer for Scroll Animations
 * - Debounced Input for Performance
 */

document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    // ==========================================
    // 1. DATASETS
    // ==========================================
    
    const kuiVocabulary = [
        { id: 'word-kui', word: 'Kũi', odia: 'କୁ‍ଇ', ipa: '[kui̯]', meaning: 'Language of the Kondha people / Native speech', category: 'culture', cognate: 'Self-designation of the indigenous Kondha inhabitants', formants: [300, 2200, 3200] },
        { id: 'word-eyu', word: 'Eyu / Eju', odia: 'ଏୟୁ / ଏଜୁ', ipa: '[eju]', meaning: 'Water / River stream', category: 'nature', cognate: 'Telugu: Ēru (ఏరు), Tamil: Nīr (நீரும்), Proto-Dravidian: *nīr/*yāṟu', formants: [500, 1800, 2500] },
        { id: 'word-mara', word: 'Mara', odia: 'ମଡ଼ା / ମରା', ipa: '[maɽa]', meaning: 'Tree / Sal wood / Timber', category: 'nature', cognate: 'Tamil/Malayalam: Maram (மரம்), Kannada: Mara (ಮರ), Proto-Dravidian: *mar-am', formants: [700, 1200, 2400] },
        { id: 'word-illu', word: 'Illu / Idu', odia: 'ଇଡ଼ୁ / ଇଲ୍ଲୁ', ipa: '[iɽu]', meaning: 'House / Home / Dwelling', category: 'life', cognate: 'Telugu: Illu (ఇల్లు), Tamil: Illam (இல்லம்), Kannada: Illu (ಇಲ್ಲು)', formants: [350, 2300, 3000] },
        { id: 'word-palu', word: 'Pālu', odia: 'ପାଲୁ', ipa: '[paːlu]', meaning: 'Milk / Pure liquid', category: 'life', cognate: 'Tamil: Pāl (பால்), Telugu: Pālu (పాలు), Kannada: Hālu (ಹಾಲು)', formants: [650, 1100, 2500] },
        { id: 'word-kanu', word: 'Kānu', odia: 'କାନୁ', ipa: '[kaːnu]', meaning: 'Eye / Sight / Vision', category: 'body', cognate: 'Tamil/Malayalam: Kaṇ (கண்), Telugu: Kanni (కన్ను), Kannada: Kaṇṇu (ಕಣ್ಣು)', formants: [700, 1300, 2600] },
        { id: 'word-kadu', word: 'Kādu / Kāl', odia: 'କାଡ଼ୁ', ipa: '[kaːɖu]', meaning: 'Leg / Foot / Path', category: 'body', cognate: 'Tamil/Telugu/Malayalam: Kāl (கால்), Proto-Dravidian: *kāl', formants: [680, 1250, 2450] },
        { id: 'word-meenu', word: 'Meenu', odia: 'ମୀନୁ', ipa: '[miːnu]', meaning: 'Fish / Aquatic life', category: 'nature', cognate: 'Tamil/Malayalam/Kannada: Mīn (மீன்), Telugu: Mīnu (మీను)', formants: [300, 2400, 3100] },
        { id: 'word-penu', word: 'Penu', odia: 'ପେନୁ', ipa: '[penu]', meaning: 'Sacred Spirit / Deity (e.g. Dharani Penu)', category: 'culture', cognate: 'Gondi: Pen (Spirit), South-Central Dravidian sacred root', formants: [450, 1900, 2700] },
        { id: 'word-raju', word: 'Rāju', odia: 'ରାଜୁ', ipa: '[raːɟu]', meaning: 'Chief / Hill leader / Mountain ruler', category: 'culture', cognate: 'Shared regional highland chieftain designation (Niyam Raja)', formants: [600, 1400, 2400] },
        { id: 'word-potu', word: 'Pōtu', odia: 'ପୋତୁ', ipa: '[poːtu]', meaning: 'Male animal / Strong bull', category: 'life', cognate: 'Tamil: Pōttu (போத்து), Telugu: Pōtu (పోతు)', formants: [500, 1000, 2400] },
        { id: 'word-vali', word: 'Vāli / Vāyu', odia: 'ଵାଲି', ipa: '[vaːli]', meaning: 'Wind / Hill breeze', category: 'nature', cognate: 'Tamil: Vāli (வாளி), South Dravidian atmospheric root', formants: [600, 1500, 2500] },
        // --- EXPANDED DATASET ---
        { id: 'word-johara', word: 'Johara', odia: 'ଯୋହାର', ipa: '[ɟoːhaːra]', meaning: 'Hello / Respectful greeting / Reverence', category: 'culture', cognate: 'Traditional Kondha salutation of respect', formants: [600, 1400, 2400] },
        { id: 'word-dharani', word: 'Dharani', odia: 'ଧରଣୀ', ipa: '[dʱaraɳi]', meaning: 'Earth / Land / Soil', category: 'nature', cognate: 'Sanskrit/Odia: Dharani (Earth), shared ancient root', formants: [500, 1500, 2500] },
        { id: 'word-saja', word: 'Saja', odia: 'ସଜ', ipa: '[saɟa]', meaning: 'Sal Tree (Sacred forest tree)', category: 'nature', cognate: 'Odia: Saja, Central Indian forest terminology', formants: [700, 1300, 2300] },
        { id: 'word-manda', word: 'Manda', odia: 'ମଣ୍ଡ', ipa: '[maɳɖa]', meaning: 'Traditional rice beer / Fermented drink', category: 'culture', cognate: 'Shared tribal terminology across Central/Eastern India', formants: [650, 1200, 2400] },
        { id: 'word-kedu', word: 'Kedu', odia: 'କେଡୁ', ipa: '[keɖu]', meaning: 'Community festival / Dance / Celebration', category: 'culture', cognate: 'Specific to Kondha festive traditions (Kedu Yatra)', formants: [600, 1600, 2600] },
        { id: 'word-gudba', word: 'Gudba', odia: 'ଗୁଡ଼ବା', ipa: '[guɖba]', meaning: 'Traditional drum / Percussion instrument', category: 'culture', cognate: 'Regional tribal musical instrument terminology', formants: [400, 1100, 2200] },
        { id: 'word-ninga', word: 'Ninga', odia: 'ନିଙ୍ଗା', ipa: '[niŋɡa]', meaning: 'You (Second person singular)', category: 'life', cognate: 'Dravidian second-person pronoun variants', formants: [500, 1800, 2600] },
        { id: 'word-nenu', word: 'Nenu', odia: 'ନେନୁ', ipa: '[nenu]', meaning: 'I / Me (First person singular)', category: 'life', cognate: 'Telugu: Nenu, shared Dravidian first-person root', formants: [550, 1900, 2700] }
    ];

    const regionData = {
        kandhamal: { name: 'Kandhamal (Phulbani & Daringbadi)', badge: 'Heartland District', elevation: '⛰️ Elevation: 900m – 1,100m above sea level', desc: 'Epicentre of Kui culture and speakers. Home to pine-scented Daringbadi ("The Kashmir of Odisha"), lush valley terraced farming, world-renowned organic Kandhamal Haldi (turmeric), and traditional Kutia & Maliah Kondha hamlets.', tags: ['Kutia Kondha', 'Daringbadi Pines', 'Kandhamal Haldi', 'Phulbani'] },
        rayagada: { name: 'Rayagada & Niyamgiri Hills', badge: 'Sacred Mountain Territory', elevation: '⛰️ Elevation: 1,300m Peak Elevation', desc: 'The homeland of the Dongria Kondha tribe who inhabit the dense forests of the Niyamgiri hill range. Famous for sacred reverent eco-worship of Niyam Raja, intricate Kapdaganda hand embroidery, and pristine hilltop streams.', tags: ['Dongria Kondha', 'Niyamgiri Range', 'Kapdaganda Embroidery', 'Bisam Cuttack'] },
        kalahandi: { name: 'Kalahandi High Plateaus', badge: 'Western Highland Gateway', elevation: '⛰️ Elevation: 700m – 1,000m', desc: 'Spanning Thuamul Rampur, Lanjigarh, and Karlapat Wildlife Sanctuary. Characterized by rolling highland plateaus, ancient Dhokra lost-wax brass foundries, and traditional Chaitra Parba spring dances.', tags: ['Thuamul Rampur', 'Karlapat Sanctuary', 'Dhokra Craft', 'Lanjigarh'] },
        koraput: { name: 'Koraput & Nabarangpur Valleys', badge: 'Southern Eastern Ghats', elevation: '⛰️ Elevation: 850m – 1,200m', desc: 'Picturesque valley territory bordering Andhra Pradesh. Rich in agro-biodiversity, tribal weekly markets (haats), ancient stone wall art, and Kui-speaking indigenous forest settlements.', tags: ['Koraput Valley', 'Pottangi', 'Desia & Kui Dialects', 'Agro-Biodiversity'] }
    };

    const quizQuestions = [
        { question: 'What is the primary native Kui greeting meaning "Hello / Warm Reverence"?', options: ['Aaju / Johara', 'Namaste', 'Mane-na', 'Ninge sadhi-na'], answer: 0, explanation: '"Aaju" or "Johara" is the traditional respectful Kui greeting used across the highlands.' },
        { question: 'Which linguistic family branch does the Kui language belong to?', options: ['Indo-Aryan', 'Austroasiatic (Munda)', 'South-Central Dravidian', 'Tibeto-Burman'], answer: 2, explanation: 'Kui is a South-Central Dravidian language, closely related to Kuvi, Gondi, and Telugu.' },
        { question: 'What is the Kui word for "Water"?', options: ['Mara', 'Eyu / Eju', 'Illu', 'Kānu'], answer: 1, explanation: '"Eyu" (or "Eju") means water in Kui, cognate to Proto-Dravidian *nīr/*yāṟu.' },
        { question: 'Which sacred mountain in Rayagada is considered the spiritual home of the Dongria Kondha?', options: ['Deomali', 'Niyamgiri Hills', 'Mahendragiri', 'Similipal'], answer: 1, explanation: 'Niyamgiri is sacred to the Dongria Kondha, who revere Niyam Raja (the mountain deity).' },
        { question: 'What is the GI-tagged traditional embroidered shawl crafted by Dongria Kondha women called?', options: ['Kapdaganda', 'Kantha', 'Phulkari', 'Pashmina'], answer: 0, explanation: 'The Kapdaganda is an intricately embroidered shawl featuring geometric red, yellow, and green triangles.' }
    ];

    // ==========================================
    // 2. STATE MANAGEMENT
    // ==========================================
    let currentCategoryFilter = 'all';
    let currentSearchQuery = '';
    let currentPlaybackSpeed = 1.0;
    let audioCtx = null;
    
    // Quiz State
    let currentQIndex = 0;
    let quizScore = 0;
    let selectedOption = null;
    const HIGH_SCORE_KEY = 'kui_explorer_quiz_highscore';

    // ==========================================
    // 3. UTILITY FUNCTIONS
    // ==========================================
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    function getCategoryLabel(cat) {
        const labels = { nature: '🌿 Nature', life: '🏡 House & Life', body: '👁️ Body', culture: '⛰️ Culture' };
        return labels[cat] || '💬 General';
    }

    async function copyToClipboard(text, btnElement) {
        try {
            await navigator.clipboard.writeText(text);
            const originalText = btnElement.innerHTML;
            btnElement.innerHTML = '<span class="play-icon">✅</span><span>Copied!</span>';
            btnElement.style.background = 'var(--kui-forest)';
            setTimeout(() => {
                btnElement.innerHTML = originalText;
                btnElement.style.background = '';
            }, 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    }

    // ==========================================
    // 4. AUDIO ENGINE (Speech Synthesis + Web Audio Fallback)
    // ==========================================
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
            utterance.pitch = 1.05;

            const voices = window.speechSynthesis.getVoices();
            const indicVoice = voices.find(v => v.lang.includes('hi') || v.lang.includes('ta') || v.lang.includes('te') || v.lang.includes('in') || v.lang.includes('en-IN'));
            if (indicVoice) utterance.voice = indicVoice;

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
            console.warn('Audio synth playback failed:', e);
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
            ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--kui-accent').trim() || '#f39c12';

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

    // ==========================================
    // 5. UI RENDERERS
    // ==========================================
    const vocabGrid = document.getElementById('vocab-grid');
    const searchInput = document.getElementById('vocab-search-input');
    const searchClearBtn = document.getElementById('vocab-search-clear');
    const filterTabs = document.querySelectorAll('.filter-tab');

    function renderVocabGrid() {
        if (!vocabGrid) return;

        // Remove skeleton loaders if they exist
        const skeletons = vocabGrid.querySelectorAll('.skeleton-loader');
        skeletons.forEach(s => s.remove());

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
                        <button class="btn-copy-word" title="Copy to clipboard" aria-label="Copy ${item.word} to clipboard" style="background:none; border:none; cursor:pointer; font-size:1rem; color:var(--kui-text-muted); transition: color 0.2s;">📋</button>
                    </div>
                    <div class="vocab-word-odia">${item.odia}</div>
                    <h3 class="vocab-word-title">${item.word}</h3>
                    <div class="vocab-meaning">${item.meaning}</div>
                    <div class="vocab-cognate-pill"><strong>Dravidian Roots:</strong> ${item.cognate}</div>
                </div>
                <button class="btn-play-audio vocab-play-btn" data-word="${item.word}" data-ipa="${item.ipa}" data-text="${item.word} - ${item.meaning}">
                    <span class="play-icon">🔊</span>
                    <span>Play Audio</span>
                </button>
            </div>
        `).join('');

        // Attach event listeners
        vocabGrid.querySelectorAll('.vocab-play-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                playAudioPronunciation(btn.dataset.text, btn.dataset.ipa, btn.dataset.word, btn);
            });
        });

        vocabGrid.querySelectorAll('.btn-copy-word').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = btn.closest('.vocab-card');
                const word = card.querySelector('.vocab-word-title').textContent;
                const meaning = card.querySelector('.vocab-meaning').textContent;
                copyToClipboard(`${word} - ${meaning}`, btn);
            });
        });
    }

    // ==========================================
    // 6. EVENT LISTENERS: Search, Filter, Audio
    // ==========================================
    if (searchInput) {
        searchInput.addEventListener('input', debounce((e) => {
            currentSearchQuery = e.target.value;
            if (searchClearBtn) searchClearBtn.classList.toggle('visible', currentSearchQuery.length > 0);
            renderVocabGrid();
        }, 300));
    }

    if (searchClearBtn) {
        searchClearBtn.addEventListener('click', () => {
            searchInput.value = '';
            currentSearchQuery = '';
            searchClearBtn.classList.remove('visible');
            searchInput.focus();
            renderVocabGrid();
        });
    }

    filterTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            filterTabs.forEach(t => {
                t.classList.remove('active');
                t.setAttribute('aria-selected', 'false');
            });
            tab.classList.add('active');
            tab.setAttribute('aria-selected', 'true');
            currentCategoryFilter = tab.getAttribute('data-category');
            renderVocabGrid();
        });
    });

    document.querySelectorAll('.speed-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.speed-btn').forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-pressed', 'false');
            });
            btn.classList.add('active');
            btn.setAttribute('aria-pressed', 'true');
            currentPlaybackSpeed = parseFloat(btn.getAttribute('data-speed')) || 1.0;
        });
    });

    document.querySelectorAll('.btn-play-audio:not(.vocab-play-btn)').forEach(btn => {
        btn.addEventListener('click', () => {
            playAudioPronunciation(btn.dataset.text, btn.dataset.ipa, btn.dataset.word, btn);
        });
    });

    // Initial render
    renderVocabGrid();

    // ==========================================
    // 7. REGION SELECTOR INTERACTIONS
    // ==========================================
    const regionItems = document.querySelectorAll('.region-item');
    const regionInfoPanel = document.getElementById('region-info-panel');

    regionItems.forEach(item => {
        item.addEventListener('click', () => {
            const regionKey = item.getAttribute('data-region');
            const data = regionData[regionKey];
            if (!data || !regionInfoPanel) return;

            regionItems.forEach(i => {
                i.classList.remove('active');
                i.setAttribute('aria-selected', 'false');
            });
            item.classList.add('active');
            item.setAttribute('aria-selected', 'true');

            // Smooth fade out/in effect
            regionInfoPanel.style.opacity = '0';
            setTimeout(() => {
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
                regionInfoPanel.style.opacity = '1';
            }, 150);
        });
    });

    // ==========================================
    // 8. INTERACTIVE QUIZ ENGINE (with Keyboard Nav & LocalStorage)
    // ==========================================
    const quizQNum = document.getElementById('quiz-q-num');
    const quizScoreText = document.getElementById('quiz-score');
    const quizQText = document.getElementById('quiz-question-text');
    const quizOptionsGrid = document.getElementById('quiz-options-grid');
    const quizFeedback = document.getElementById('quiz-feedback');
    const quizProgressFill = document.getElementById('quiz-progress-fill');
    const btnQuizNext = document.getElementById('btn-quiz-next');

    // Load high score
    const savedHighScore = localStorage.getItem(HIGH_SCORE_KEY) || 0;
    if (quizScoreText && savedHighScore > 0) {
        quizScoreText.textContent = `Score: ${quizScore} | Best: ${savedHighScore}`;
    }

    function loadQuizQuestion() {
        if (!quizQText || currentQIndex >= quizQuestions.length) return;
        const q = quizQuestions[currentQIndex];
        selectedOption = null;

        if (quizQNum) quizQNum.textContent = `Question ${currentQIndex + 1} of ${quizQuestions.length}`;
        if (quizProgressFill) quizProgressFill.style.width = `${((currentQIndex + 1) / quizQuestions.length) * 100}%`;
        if (quizFeedback) quizFeedback.className = 'quiz-feedback hidden';
        
        quizQText.textContent = q.question;

        if (btnQuizNext) {
            btnQuizNext.disabled = true;
            btnQuizNext.textContent = currentQIndex === quizQuestions.length - 1 ? 'Finish Quiz 🎉' : 'Next Question ➔';
        }

        if (quizOptionsGrid) {
            quizOptionsGrid.innerHTML = q.options.map((opt, idx) => `
                <button class="quiz-option-btn" data-idx="${idx}" tabindex="0">
                    <span style="font-weight: 700; margin-right: 8px;">${String.fromCharCode(65 + idx)}.</span>
                    ${opt}
                </button>
            `).join('');

            // Keyboard Navigation for Quiz
            quizOptionsGrid.addEventListener('keydown', handleQuizKeyboardNav);

            quizOptionsGrid.querySelectorAll('.quiz-option-btn').forEach(btn => {
                btn.addEventListener('click', () => {
                    if (selectedOption !== null) return;
                    handleAnswerSelection(parseInt(btn.getAttribute('data-idx')), q);
                });
            });
        }
    }

    function handleQuizKeyboardNav(e) {
        if (selectedOption !== null) return;
        const buttons = Array.from(quizOptionsGrid.querySelectorAll('.quiz-option-btn'));
        const currentIndex = buttons.findIndex(b => b === document.activeElement);
        
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            const nextIndex = (currentIndex + 1) % buttons.length;
            buttons[nextIndex].focus();
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            const prevIndex = (currentIndex - 1 + buttons.length) % buttons.length;
            buttons[prevIndex].focus();
        } else if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (currentIndex !== -1) {
                handleAnswerSelection(parseInt(buttons[currentIndex].getAttribute('data-idx')), quizQuestions[currentQIndex]);
            }
        }
    }

    function handleAnswerSelection(idx, question) {
        selectedOption = idx;
        const buttons = quizOptionsGrid.querySelectorAll('.quiz-option-btn');
        quizOptionsGrid.removeEventListener('keydown', handleQuizKeyboardNav); // Disable further keyboard nav for this question

        buttons.forEach((b, bIdx) => {
            b.disabled = true;
            b.setAttribute('tabindex', '-1');
            if (bIdx === question.answer) b.classList.add('correct');
            else if (bIdx === idx) b.classList.add('wrong');
        });

        if (idx === question.answer) {
            quizScore += 10;
            if (quizScoreText) {
                const best = Math.max(quizScore, parseInt(localStorage.getItem(HIGH_SCORE_KEY) || 0));
                localStorage.setItem(HIGH_SCORE_KEY, best);
                quizScoreText.textContent = `Score: ${quizScore} | Best: ${best}`;
            }
            showFeedback(true, `Correct! ${question.explanation}`);
        } else {
            showFeedback(false, `Incorrect. ${question.explanation}`);
        }

        if (btnQuizNext) btnQuizNext.disabled = false;
    }

    function showFeedback(isCorrect, text) {
        if (!quizFeedback) return;
        quizFeedback.className = `quiz-feedback ${isCorrect ? 'correct-bg' : 'wrong-bg'}`;
        quizFeedback.innerHTML = `<span class="feedback-icon">${isCorrect ? '✅' : '❌'}</span><span class="feedback-text">${text}</span>`;
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

        const bestScore = localStorage.getItem(HIGH_SCORE_KEY) || 0;
        const maxScore = quizQuestions.length * 10;
        const message = quizScore >= 40 
            ? 'Outstanding! You are a master of Kui language and highland culture.' 
            : 'Good effort! Review the word bank and try again to beat your high score.';

        quizCard.innerHTML = `
            <div style="text-align: center; padding: 20px 0;">
                <div style="font-size: 3.5rem; margin-bottom: 10px;">🏆</div>
                <h3 style="font-family: var(--kui-font-serif); font-size: 2rem; margin: 0 0 10px;">Quiz Completed!</h3>
                <p style="font-size: 1.2rem; color: var(--kui-accent); font-weight: 700; margin-bottom: 10px;">
                    Your Score: ${quizScore} / ${maxScore} Points
                </p>
                <p style="font-size: 1rem; color: var(--kui-text-muted); margin-bottom: 30px;">
                    All-Time Best: ${bestScore} / ${maxScore}
                </p>
                <p style="color: var(--kui-text-main); margin-bottom: 30px; font-style: italic;">${message}</p>
                <button class="btn-play-audio" id="btn-restart-quiz" style="margin: 0 auto;">
                    🔄 Restart Quiz
                </button>
            </div>
        `;

        document.getElementById('btn-restart-quiz')?.addEventListener('click', () => {
            currentQIndex = 0;
            quizScore = 0;
            selectedOption = null;
            // Re-render initial quiz UI
            quizCard.innerHTML = `
                <div class="quiz-progress-bar"><div class="quiz-progress-fill" id="quiz-progress-fill"></div></div>
                <div class="quiz-question-header">
                    <span class="quiz-q-num" id="quiz-q-num"></span>
                    <span class="quiz-score" id="quiz-score"></span>
                </div>
                <h3 class="quiz-question-text" id="quiz-question-text"></h3>
                <div class="quiz-options-grid" id="quiz-options-grid" role="radiogroup" aria-label="Quiz options"></div>
                <div class="quiz-feedback hidden" id="quiz-feedback" aria-live="assertive"></div>
                <div class="quiz-footer"><button class="btn-quiz-next" id="btn-quiz-next" disabled>Next Question ➔</button></div>
            `;
            // Re-bind elements
            location.reload(); // Simplest way to fully reset state cleanly
        });
    }

    loadQuizQuestion();

    // ==========================================
    // 9. GLOBAL UI ENHANCEMENTS (Scroll, Animations)
    // ==========================================
    
    // Scroll to Top Button Logic
    const scrollTopBtn = document.getElementById('btn-scroll-top');
    if (scrollTopBtn) {
        window.addEventListener('scroll', debounce(() => {
            if (window.scrollY > 400) {
                scrollTopBtn.classList.add('visible');
            } else {
                scrollTopBtn.classList.remove('visible');
            }
        }, 100));

        scrollTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // Intersection Observer for Fade-in Animations
    const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -50px 0px' };
    const fadeObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                fadeObserver.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.kui-section, .stat-card').forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease-out, transform 0.6s ease-out';
        fadeObserver.observe(el);
    });

    // Smooth Scroll for Anchor Links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                targetElement.scrollIntoView({ behavior: 'smooth', block: 'start' });
                // Update URL without jumping
                history.pushState(null, null, targetId);
            }
        });
    });

    console.log('✅ Kui Language Explorer Engine Initialized Successfully');
});