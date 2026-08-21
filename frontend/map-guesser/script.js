(function () {
    'use strict';
    const state = { difficulty: 'easy', questions: [], currentIndex: 0, score: 0, streak: 0, bestStreak: 0, correctCount: 0, answered: false, currentMode: 'choice' };
    const $ = s => document.querySelector(s);
    const setupScreen = $('#setup-screen'), quizScreen = $('#quiz-screen'), resultsScreen = $('#results-screen');
    const optionsGrid = $('#options-grid'), typeArea = $('#type-area'), typeInput = $('#type-input');
    const autocompleteList = $('#autocomplete-list'), feedbackPanel = $('#feedback-panel');
    let acIndex = -1;

    // Difficulty
    document.querySelectorAll('.diff-btn').forEach(btn => {
        const h = () => { document.querySelectorAll('.diff-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-checked', 'false'); }); btn.classList.add('active'); btn.setAttribute('aria-checked', 'true'); state.difficulty = btn.dataset.diff; };
        btn.addEventListener('click', h);
        btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); h(); } });
    });

    function startQuiz() {
        const cfg = MAP_DIFFICULTIES[state.difficulty];
        const pool = STATE_DATA.filter(s => cfg.tierFilter(s.tier)).sort(() => Math.random() - 0.5).slice(0, cfg.rounds);
        state.questions = pool.map(s => {
            let mode = cfg.mode;
            if (mode === 'mixed') mode = Math.random() > 0.5 ? 'choice' : 'type';
            const options = mode === 'choice' ? generateOptions(s) : [];
            return { ...s, mode, options };
        });
        state.currentIndex = 0; state.score = 0; state.streak = 0; state.bestStreak = 0; state.correctCount = 0; state.answered = false;
        updateStats();
        setupScreen.style.display = 'none'; quizScreen.style.display = ''; resultsScreen.style.display = 'none';
        quizScreen.hidden = false; resultsScreen.hidden = true;
        loadQuestion();
    }
    $('#start-btn').addEventListener('click', startQuiz);
    $('#start-btn').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startQuiz(); } });

    function generateOptions(correct) {
        const others = STATE_DATA.filter(s => s.id !== correct.id).sort(() => Math.random() - 0.5).slice(0, 3);
        return [...others.map(s => s.name), correct.name].sort(() => Math.random() - 0.5);
    }

    async function loadQuestion() {
        const q = state.questions[state.currentIndex];
        state.answered = false; state.currentMode = q.mode;
        feedbackPanel.hidden = true;
        $('#progress-fill').style.width = ((state.currentIndex / state.questions.length) * 100) + '%';
        $('#progress-text').textContent = `Question ${state.currentIndex + 1} of ${state.questions.length}`;

        // Load outline SVG
        const wrapper = $('#outline-display');
        wrapper.innerHTML = '<p style="color:var(--mg-sub)">Loading outline...</p>';
        try {
            const resp = await fetch(q.outline);
            if (resp.ok) { wrapper.innerHTML = await resp.text(); }
            else { wrapper.innerHTML = `<div style="font-size:4rem;text-align:center">🗺️</div><p style="text-align:center;color:var(--mg-sub)">${q.name} outline</p>`; }
        } catch { wrapper.innerHTML = `<div style="font-size:4rem;text-align:center">🗺️</div><p style="text-align:center;color:var(--mg-sub)">${q.name} outline</p>`; }

        if (q.mode === 'choice') {
            optionsGrid.hidden = false; typeArea.hidden = true;
            optionsGrid.innerHTML = q.options.map(o => `<button class="option-btn" data-answer="${o}" tabindex="0" role="button">${o}</button>`).join('');
            optionsGrid.querySelectorAll('.option-btn').forEach(btn => {
                const h = () => handleAnswer(btn.dataset.answer);
                btn.addEventListener('click', h);
                btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); h(); } });
            });
        } else {
            optionsGrid.hidden = true; typeArea.hidden = false;
            typeInput.value = ''; typeInput.focus();
            autocompleteList.hidden = true;
        }
    }

    // Autocomplete
    typeInput.addEventListener('input', () => {
        const val = typeInput.value.trim().toLowerCase();
        if (val.length < 1) { autocompleteList.hidden = true; return; }
        const matches = STATE_DATA.filter(s => s.name.toLowerCase().includes(val));
        if (matches.length === 0) { autocompleteList.hidden = true; return; }
        acIndex = -1;
        autocompleteList.innerHTML = matches.map((m, i) => `<div class="autocomplete-item" data-name="${m.name}" data-idx="${i}" role="option">${m.name}</div>`).join('');
        autocompleteList.hidden = false;
        autocompleteList.querySelectorAll('.autocomplete-item').forEach(item => {
            item.addEventListener('click', () => { typeInput.value = item.dataset.name; autocompleteList.hidden = true; });
        });
    });

    typeInput.addEventListener('keydown', e => {
        const items = autocompleteList.querySelectorAll('.autocomplete-item');
        if (!autocompleteList.hidden && items.length > 0) {
            if (e.key === 'ArrowDown') { e.preventDefault(); acIndex = Math.min(acIndex + 1, items.length - 1); updateAcHighlight(items); }
            else if (e.key === 'ArrowUp') { e.preventDefault(); acIndex = Math.max(acIndex - 1, 0); updateAcHighlight(items); }
            else if (e.key === 'Enter' && acIndex >= 0) { e.preventDefault(); typeInput.value = items[acIndex].dataset.name; autocompleteList.hidden = true; }
            else if (e.key === 'Escape') { autocompleteList.hidden = true; }
        } else if (e.key === 'Enter') { handleSubmit(); }
    });

    function updateAcHighlight(items) {
        items.forEach((it, i) => it.classList.toggle('active', i === acIndex));
    }

    $('#submit-btn').addEventListener('click', handleSubmit);
    $('#submit-btn').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handleSubmit(); } });

    function handleSubmit() {
        const val = typeInput.value.trim();
        if (!val) return;
        autocompleteList.hidden = true;
        handleAnswer(val);
    }

    function handleAnswer(answer) {
        if (state.answered) return;
        state.answered = true;
        const q = state.questions[state.currentIndex];
        const isCorrect = answer.toLowerCase() === q.name.toLowerCase();

        if (state.currentMode === 'choice') {
            optionsGrid.querySelectorAll('.option-btn').forEach(btn => {
                btn.disabled = true;
                if (btn.dataset.answer === q.name) btn.classList.add('correct');
                else if (btn.dataset.answer === answer && !isCorrect) btn.classList.add('incorrect');
            });
        }

        if (isCorrect) { state.score += 10; state.streak++; state.correctCount++; if (state.streak > state.bestStreak) state.bestStreak = state.streak; }
        else { state.streak = 0; }
        updateStats();
        showFeedback(isCorrect, q);
    }

    function showFeedback(correct, q) {
        feedbackPanel.hidden = false;
        $('#fb-icon').textContent = correct ? '✅' : '❌';
        const title = $('#fb-title');
        title.textContent = correct ? `Correct! This is ${q.name}.` : `Incorrect. The answer was ${q.name}.`;
        title.className = 'fb-title ' + (correct ? 'correct' : 'incorrect');
        $('#fb-capital').textContent = q.capital;
        $('#fb-region').textContent = q.region;
        $('#fb-landmark').textContent = q.landmark;
        $('#fb-fact').textContent = q.fact;
        $('#next-btn').focus();
    }

    function goNext() {
        state.currentIndex++;
        if (state.currentIndex >= state.questions.length) showResults();
        else loadQuestion();
    }
    $('#next-btn').addEventListener('click', goNext);
    $('#next-btn').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); goNext(); } });

    function updateStats() {
        $('#score-display').textContent = state.score;
        $('#streak-display').textContent = state.streak;
        const total = state.currentIndex + (state.answered ? 1 : 0);
        $('#accuracy-display').textContent = total > 0 ? Math.round((state.correctCount / total) * 100) + '%' : '—';
    }

    function showResults() {
        const total = state.questions.length;
        const acc = Math.round((state.correctCount / total) * 100);
        let title;
        if (acc >= 90) title = 'Outstanding!'; else if (acc >= 70) title = 'Great Job!'; else if (acc >= 50) title = 'Good Effort!'; else title = 'Keep Learning!';
        $('#results-title').textContent = title;
        $('#results-score').textContent = `You scored ${state.score}/${total * 10}`;
        $('#rs-correct').textContent = `${state.correctCount}/${total}`;
        $('#rs-accuracy').textContent = acc + '%';
        $('#rs-streak').textContent = state.bestStreak;
        quizScreen.style.display = 'none'; resultsScreen.style.display = 'flex'; resultsScreen.hidden = false;
    }

    $('#restart-btn').addEventListener('click', () => { resultsScreen.style.display = 'none'; setupScreen.style.display = ''; });
    $('#restart-btn').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); resultsScreen.style.display = 'none'; setupScreen.style.display = ''; } });

    function initReveal() {
        const t = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) { t.forEach(el => el.classList.add('visible')); return; }
        const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } }), { threshold: 0.08 });
        t.forEach(el => obs.observe(el));
    }
    document.addEventListener('DOMContentLoaded', initReveal);
})();
