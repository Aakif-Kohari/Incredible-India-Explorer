/**
 * Language Guesser - Interactive Script
 * Handles audio playback, quiz logic, scoring, keyboard accessibility, and screen transitions.
 */

(function () {
    'use strict';

    /* ---------------------------------------------------------------- State */
    const state = {
        difficulty: 'easy',
        questions: [],
        currentIndex: 0,
        score: 0,
        streak: 0,
        bestStreak: 0,
        correctCount: 0,
        startTime: null,
        answered: false,
        audioEl: null,
        audioTimer: null,
        audioPlaying: false
    };

    /* -------------------------------------------------------- DOM References */
    const $ = (sel) => document.querySelector(sel);
    const setupScreen = $('#setup-screen');
    const quizScreen = $('#quiz-screen');
    const resultsScreen = $('#results-screen');
    const diffBtns = document.querySelectorAll('.diff-btn');
    const startBtn = $('#start-btn');
    const playBtn = $('#play-btn');
    const replayBtn = $('#replay-btn');
    const audioProgressFill = $('#audio-progress-fill');
    const audioTimeDisplay = $('#audio-time');
    const optionsGrid = $('#options-grid');
    const feedbackPanel = $('#feedback-panel');
    const nextBtn = $('#next-btn');
    const progressFill = $('#progress-fill');
    const progressText = $('#progress-text');
    const scoreDisplay = $('#score-display');
    const streakDisplay = $('#streak-display');
    const accuracyDisplay = $('#accuracy-display');

    /* ----------------------------------------------------- Difficulty Select */
    diffBtns.forEach(btn => {
        const handler = () => {
            diffBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-checked', 'false'); });
            btn.classList.add('active');
            btn.setAttribute('aria-checked', 'true');
            state.difficulty = btn.dataset.diff;
        };
        btn.addEventListener('click', handler);
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
        });
    });

    /* -------------------------------------------------------- Start Quiz */
    function startQuiz() {
        const config = DIFFICULTY_CONFIG[state.difficulty];
        const pool = LANGUAGE_DATA.filter(config.poolFilter);
        const shuffled = pool.sort(() => Math.random() - 0.5).slice(0, config.rounds);

        state.questions = shuffled.map(lang => ({
            ...lang,
            options: generateOptions(lang, LANGUAGE_DATA, 4)
        }));
        state.currentIndex = 0;
        state.score = 0;
        state.streak = 0;
        state.bestStreak = 0;
        state.correctCount = 0;
        state.startTime = Date.now();
        state.answered = false;

        // Initialize audio element
        if (!state.audioEl) {
            state.audioEl = new Audio();
            state.audioEl.preload = 'auto';
        }

        updateStats();
        showScreen('quiz');
        loadQuestion();
    }

    startBtn.addEventListener('click', startQuiz);
    startBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startQuiz(); }
    });

    /* ------------------------------------------------------- Screen Management */
    function showScreen(name) {
        setupScreen.hidden = name !== 'setup';
        quizScreen.hidden = name !== 'quiz';
        resultsScreen.hidden = name !== 'results';
        if (name === 'quiz') {
            setupScreen.style.display = 'none';
            quizScreen.style.display = '';
            resultsScreen.style.display = 'none';
        } else if (name === 'results') {
            setupScreen.style.display = 'none';
            quizScreen.style.display = 'none';
            resultsScreen.style.display = 'flex';
        } else {
            setupScreen.style.display = '';
            quizScreen.style.display = 'none';
            resultsScreen.style.display = 'none';
        }
    }

    /* -------------------------------------------------------- Load Question */
    function loadQuestion() {
        const q = state.questions[state.currentIndex];
        state.answered = false;
        feedbackPanel.hidden = true;
        stopAudio();

        // Update progress
        const pct = ((state.currentIndex) / state.questions.length) * 100;
        progressFill.style.width = pct + '%';
        progressText.textContent = `Question ${state.currentIndex + 1} of ${state.questions.length}`;

        // Reset audio player UI
        audioProgressFill.style.width = '0%';
        audioTimeDisplay.textContent = '0:00 / 0:03';
        playBtn.textContent = '▶';
        playBtn.setAttribute('aria-label', 'Play audio clip');

        // Render options
        optionsGrid.innerHTML = q.options.map((opt, i) =>
            `<button class="option-btn" data-answer="${opt}" tabindex="0" role="button" aria-label="Select ${opt}">${opt}</button>`
        ).join('');

        // Bind option handlers
        optionsGrid.querySelectorAll('.option-btn').forEach(btn => {
            const handler = () => handleAnswer(btn.dataset.answer);
            btn.addEventListener('click', handler);
            btn.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); }
            });
        });

        // Auto-focus first option for keyboard users
        const firstOpt = optionsGrid.querySelector('.option-btn');
        if (firstOpt) setTimeout(() => firstOpt.focus(), 100);
    }

    /* -------------------------------------------------------- Audio Playback */
    function playAudio() {
        const q = state.questions[state.currentIndex];
        if (!q) return;

        stopAudio();
        state.audioEl.src = q.audio;
        state.audioEl.currentTime = 0;
        state.audioPlaying = true;
        playBtn.textContent = '⏸';
        playBtn.setAttribute('aria-label', 'Pause audio clip');

        state.audioEl.play().catch(() => {
            // Graceful fallback if audio fails to load
            audioTimeDisplay.textContent = 'Audio unavailable';
            state.audioPlaying = false;
            playBtn.textContent = '▶';
        });

        // Stop after 3 seconds
        state.audioTimer = setTimeout(() => {
            stopAudio();
        }, 3000);

        // Update progress bar
        state.audioEl.ontimeupdate = () => {
            const pct = Math.min((state.audioEl.currentTime / 3) * 100, 100);
            audioProgressFill.style.width = pct + '%';
            const cur = formatTime(state.audioEl.currentTime);
            audioTimeDisplay.textContent = `${cur} / 0:03`;
        };
    }

    function stopAudio() {
        if (state.audioEl) {
            state.audioEl.pause();
            state.audioEl.currentTime = 0;
        }
        clearTimeout(state.audioTimer);
        state.audioPlaying = false;
        playBtn.textContent = '▶';
        playBtn.setAttribute('aria-label', 'Play audio clip');
    }

    function togglePlay() {
        if (state.audioPlaying) stopAudio();
        else playAudio();
    }

    function formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = Math.floor(sec % 60);
        return `${m}:${s.toString().padStart(2, '0')}`;
    }

    playBtn.addEventListener('click', togglePlay);
    playBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); togglePlay(); }
    });
    replayBtn.addEventListener('click', () => { stopAudio(); playAudio(); });
    replayBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); stopAudio(); playAudio(); }
    });

    /* -------------------------------------------------------- Handle Answer */
    function handleAnswer(selected) {
        if (state.answered) return;
        state.answered = true;
        stopAudio();

        const q = state.questions[state.currentIndex];
        const isCorrect = selected === q.name;

        // Highlight buttons
        optionsGrid.querySelectorAll('.option-btn').forEach(btn => {
            btn.disabled = true;
            if (btn.dataset.answer === q.name) btn.classList.add('correct');
            else if (btn.dataset.answer === selected && !isCorrect) btn.classList.add('incorrect');
        });

        // Update score
        if (isCorrect) {
            state.score += 10;
            state.streak++;
            state.correctCount++;
            if (state.streak > state.bestStreak) state.bestStreak = state.streak;
        } else {
            state.streak = 0;
        }
        updateStats();

        // Show feedback
        showFeedback(isCorrect, q);
    }

    function showFeedback(isCorrect, q) {
        feedbackPanel.hidden = false;
        $('#feedback-icon').textContent = isCorrect ? '✅' : '❌';
        $('#feedback-title').textContent = isCorrect ? 'Correct!' : 'Incorrect';
        $('#feedback-title').style.color = isCorrect ? 'var(--lg-emerald)' : '#ef4444';
        $('#feedback-language').textContent = `This was ${q.name}.`;
        $('#feedback-family').textContent = q.family;
        $('#feedback-region').textContent = q.region;
        $('#feedback-explanation').textContent = q.explanation;

        nextBtn.focus();
    }

    /* -------------------------------------------------------- Next Question */
    function goNext() {
        state.currentIndex++;
        if (state.currentIndex >= state.questions.length) {
            showResults();
        } else {
            loadQuestion();
        }
    }

    nextBtn.addEventListener('click', goNext);
    nextBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goNext(); }
    });

    /* -------------------------------------------------------- Update Stats */
    function updateStats() {
        scoreDisplay.textContent = state.score;
        streakDisplay.textContent = state.streak;
        const total = state.currentIndex + (state.answered ? 1 : 0);
        const acc = total > 0 ? Math.round((state.correctCount / total) * 100) : 0;
        accuracyDisplay.textContent = total > 0 ? acc + '%' : '—';
    }

    /* -------------------------------------------------------- Show Results */
    function showResults() {
        const elapsed = Math.round((Date.now() - state.startTime) / 1000);
        const mins = Math.floor(elapsed / 60);
        const secs = elapsed % 60;
        const totalQ = state.questions.length;
        const maxScore = totalQ * 10;
        const acc = Math.round((state.correctCount / totalQ) * 100);

        let title, message;
        if (acc >= 90) { title = 'Outstanding!'; message = 'You have an exceptional ear for Indian languages.'; }
        else if (acc >= 70) { title = 'Great Job!'; message = 'You correctly identified most languages. Keep practicing!'; }
        else if (acc >= 50) { title = 'Good Effort!'; message = 'You\'re developing your linguistic recognition skills.'; }
        else { title = 'Keep Learning!'; message = 'India\'s linguistic diversity takes time to master. Try again!'; }

        $('#results-title').textContent = title;
        $('#results-score').textContent = `You scored ${state.score}/${maxScore}`;
        $('#rs-correct').textContent = `${state.correctCount}/${totalQ}`;
        $('#rs-accuracy').textContent = acc + '%';
        $('#rs-streak').textContent = state.bestStreak;
        $('#rs-time').textContent = `${mins}:${secs.toString().padStart(2, '0')}`;
        $('#results-message').textContent = message;

        showScreen('results');
    }

    /* -------------------------------------------------------- Restart */
    const restartBtn = $('#restart-btn');
    restartBtn.addEventListener('click', () => showScreen('setup'));
    restartBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); showScreen('setup'); }
    });

    /* -------------------------------------------------------- Scroll Reveal */
    function initReveal() {
        const targets = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) { targets.forEach(el => el.classList.add('visible')); return; }
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
        }, { threshold: 0.08 });
        targets.forEach(el => obs.observe(el));
    }

    /* -------------------------------------------------------- Init */
    document.addEventListener('DOMContentLoaded', initReveal);
})();
