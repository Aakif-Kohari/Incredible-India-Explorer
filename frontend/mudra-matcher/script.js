(function () {
    'use strict';
    const state = { difficulty: 'easy', pairs: [], matched: 0, score: 0, attempts: 0, kbSelected: null, completed: false };
    const $ = s => document.querySelector(s);
    const setupScreen = $('#setup-screen'), gameScreen = $('#game-screen');
    const mudraList = $('#mudra-list'), meaningList = $('#meaning-list');
    const feedbackPanel = $('#feedback-panel');
    const modal = $('#completion-modal');
    let liveRegion;

    function announce(msg) {
        if (!liveRegion) { liveRegion = document.createElement('div'); liveRegion.setAttribute('aria-live', 'polite'); liveRegion.className = 'sr-only'; document.body.appendChild(liveRegion); }
        liveRegion.textContent = msg;
    }

    // Difficulty selection
    document.querySelectorAll('.diff-btn').forEach(btn => {
        const h = () => { document.querySelectorAll('.diff-btn').forEach(b => { b.classList.remove('active'); b.setAttribute('aria-checked', 'false'); }); btn.classList.add('active'); btn.setAttribute('aria-checked', 'true'); state.difficulty = btn.dataset.diff; };
        btn.addEventListener('click', h);
        btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); h(); } });
    });

    function startGame() {
        const cfg = MUDRA_DIFFICULTIES[state.difficulty];
        const pool = MUDRA_DATA.filter(m => cfg.tierFilter(m.tier)).sort(() => Math.random() - 0.5).slice(0, cfg.pairs);
        state.pairs = pool; state.matched = 0; state.score = 0; state.attempts = 0; state.completed = false; state.kbSelected = null;
        renderBoard();
        updateStats();
        setupScreen.style.display = 'none'; gameScreen.style.display = ''; gameScreen.hidden = false;
    }
    $('#start-btn').addEventListener('click', startGame);
    $('#start-btn').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startGame(); } });

    function renderBoard() {
        mudraList.innerHTML = ''; meaningList.innerHTML = '';
        const shuffledMudras = [...state.pairs].sort(() => Math.random() - 0.5);
        const shuffledMeanings = [...state.pairs].sort(() => Math.random() - 0.5);

        shuffledMudras.forEach(m => {
            const el = document.createElement('div');
            el.className = 'mudra-card'; el.setAttribute('draggable', 'true'); el.setAttribute('tabindex', '0');
            el.setAttribute('role', 'listitem'); el.setAttribute('aria-label', `${m.name} mudra`);
            el.dataset.id = m.id;
            el.innerHTML = `<span class="card-icon">🤚</span><div><div class="card-name">${m.name}</div><div class="card-styles">${m.danceStyles.join(', ')}</div></div>`;
            el.addEventListener('dragstart', onMudraDragStart);
            el.addEventListener('keydown', onMudraKeydown);
            mudraList.appendChild(el);
        });

        shuffledMeanings.forEach(m => {
            const el = document.createElement('div');
            el.className = 'meaning-card'; el.setAttribute('tabindex', '0');
            el.setAttribute('role', 'listitem'); el.setAttribute('aria-label', `Meaning: ${m.meaning}`);
            el.setAttribute('aria-dropeffect', 'move');
            el.dataset.id = m.id;
            el.innerHTML = `<span class="card-meaning">${m.meaning}</span>`;
            el.addEventListener('dragover', e => { e.preventDefault(); });
            el.addEventListener('dragenter', e => { e.preventDefault(); el.classList.add('drag-over'); });
            el.addEventListener('dragleave', () => el.classList.remove('drag-over'));
            el.addEventListener('drop', onMeaningDrop);
            el.addEventListener('keydown', onMeaningKeydown);
            meaningList.appendChild(el);
        });
    }

    let dragId = null;
    function onMudraDragStart(e) {
        if (state.completed || this.classList.contains('matched')) return;
        dragId = this.dataset.id; this.classList.add('dragging');
        e.dataTransfer.setData('text/plain', dragId); e.dataTransfer.effectAllowed = 'move';
    }
    document.addEventListener('dragend', () => { document.querySelectorAll('.dragging').forEach(el => el.classList.remove('dragging')); document.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over')); dragId = null; });

    function onMeaningDrop(e) {
        e.preventDefault(); this.classList.remove('drag-over');
        if (!dragId) return;
        attemptMatch(dragId, this.dataset.id);
    }

    function onMudraKeydown(e) {
        if (state.completed || this.classList.contains('matched')) return;
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (state.kbSelected === null) {
                state.kbSelected = this.dataset.id; this.classList.add('kb-selected');
                announce(`${this.querySelector('.card-name').textContent} selected. Tab to a meaning and press Enter.`);
            } else if (state.kbSelected === this.dataset.id) {
                clearKb(); announce('Selection cancelled.');
            }
        } else if (e.key === 'Escape') { clearKb(); announce('Cancelled.'); }
    }

    function onMeaningKeydown(e) {
        if (state.completed || this.classList.contains('matched')) return;
        if ((e.key === 'Enter' || e.key === ' ') && state.kbSelected !== null) {
            e.preventDefault();
            attemptMatch(state.kbSelected, this.dataset.id);
            clearKb();
        }
    }

    function clearKb() {
        document.querySelectorAll('.kb-selected').forEach(el => el.classList.remove('kb-selected'));
        state.kbSelected = null;
    }

    function attemptMatch(mudraId, meaningId) {
        state.attempts++;
        const mudra = state.pairs.find(p => p.id === mudraId);
        if (mudraId === meaningId) {
            state.matched++; state.score += 10;
            markMatched(mudraId);
            showFeedback(true, mudra);
            announce(`Correct! ${mudra.name} means ${mudra.meaning}.`);
            if (state.matched === state.pairs.length) setTimeout(showCompletion, 1200);
        } else {
            showFeedback(false, mudra);
            announce(`Incorrect. ${mudra.name} means ${mudra.meaning}.`);
        }
        updateStats();
    }

    function markMatched(id) {
        document.querySelectorAll(`[data-id="${id}"]`).forEach(el => { el.classList.add('matched'); el.setAttribute('draggable', 'false'); });
    }

    function showFeedback(correct, mudra) {
        feedbackPanel.hidden = false;
        $('#fb-icon').textContent = correct ? '✅' : '❌';
        $('#fb-title').textContent = correct ? 'Correct!' : 'Not quite';
        $('#fb-title').style.color = correct ? 'var(--mm-emerald)' : '#ef4444';
        $('#fb-text').textContent = `${mudra.name}: ${mudra.explanation}`;
    }

    function updateStats() {
        $('#score-display').textContent = state.score;
        $('#matched-display').textContent = `${state.matched}/${state.pairs.length}`;
        $('#remaining-display').textContent = state.pairs.length - state.matched;
    }

    function showCompletion() {
        state.completed = true;
        const acc = Math.round((state.matched / state.attempts) * 100);
        $('#cm-message').textContent = `You matched all ${state.pairs.length} mudras correctly!`;
        $('#cm-score').textContent = state.score;
        $('#cm-accuracy').textContent = acc + '%';
        modal.hidden = false;
        $('#cm-restart').focus();
    }

    $('#cm-restart').addEventListener('click', () => { modal.hidden = true; setupScreen.style.display = ''; gameScreen.style.display = 'none'; });
    $('#cm-restart').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); modal.hidden = true; setupScreen.style.display = ''; gameScreen.style.display = 'none'; } });

    function initReveal() {
        const t = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) { t.forEach(el => el.classList.add('visible')); return; }
        new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } }), { threshold: 0.08 }).observe && t.forEach(el => new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } }), { threshold: 0.08 }).observe(el));
    }
    document.addEventListener('DOMContentLoaded', initReveal);
})();
