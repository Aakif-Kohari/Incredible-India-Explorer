/**
 * Monument Jigsaw Puzzle - Interactive Script
 * HTML5 Drag & Drop + keyboard-accessible piece swapping with timer and move counter.
 */

(function () {
    'use strict';

    /* ---------------------------------------------------------------- State */
    const state = {
        monument: null,
        difficulty: 'easy',
        pieces: [],       // current arrangement [{correctIndex, currentPos}]
        moves: 0,
        startTime: null,
        timerInterval: null,
        kbSelected: null, // index of keyboard-selected piece
        completed: false
    };

    const $ = (s) => document.querySelector(s);
    const setupScreen = $('#setup-screen');
    const gameScreen = $('#game-screen');
    const monumentSelect = $('#monument-select');
    const diffBtns = document.querySelectorAll('.diff-btn');
    const board = $('#puzzle-board');
    const movesDisplay = $('#moves-display');
    const timerDisplay = $('#timer-display');
    const completionDisplay = $('#completion-display');
    const refImage = $('#ref-image');
    const refToggle = $('#ref-toggle');
    const modal = $('#completion-modal');

    /* -------------------------------------------------------- Populate Select */
    MONUMENT_DATA.forEach(m => {
        const opt = document.createElement('option');
        opt.value = m.id;
        opt.textContent = m.name;
        monumentSelect.appendChild(opt);
    });

    /* -------------------------------------------------------- Difficulty */
    diffBtns.forEach(btn => {
        const handler = () => {
            diffBtns.forEach(b => { b.classList.remove('active'); b.setAttribute('aria-checked', 'false'); });
            btn.classList.add('active');
            btn.setAttribute('aria-checked', 'true');
            state.difficulty = btn.dataset.diff;
        };
        btn.addEventListener('click', handler);
        btn.addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); handler(); } });
    });

    /* -------------------------------------------------------- Start Game */
    function startGame() {
        const mid = monumentSelect.value;
        state.monument = MONUMENT_DATA.find(m => m.id === mid);
        const diff = PUZZLE_DIFFICULTIES[state.difficulty];
        state.moves = 0;
        state.completed = false;
        state.kbSelected = null;

        // Generate shuffled pieces
        const indices = Array.from({ length: diff.pieces }, (_, i) => i);
        const shuffled = [...indices].sort(() => Math.random() - 0.5);
        // Ensure not already solved
        while (shuffled.every((v, i) => v === i)) shuffled.sort(() => Math.random() - 0.5);
        state.pieces = shuffled.map((correctIdx, pos) => ({ correctIndex: correctIdx, currentPos: pos }));

        // Update reference
        refImage.src = state.monument.image;
        refImage.alt = state.monument.name;
        refImage.classList.remove('hidden-ref');
        refToggle.textContent = 'Hide';
        refToggle.setAttribute('aria-pressed', 'true');
        $('#ref-name').textContent = state.monument.name;
        $('#ref-location').textContent = state.monument.location;
        $('#ref-year').textContent = `Built: ${state.monument.year}`;
        $('#ref-desc').textContent = state.monument.description;

        renderBoard(diff);
        updateStats();
        startTimer();

        setupScreen.style.display = 'none';
        gameScreen.style.display = '';
        gameScreen.hidden = false;
    }

    $('#start-btn').addEventListener('click', startGame);
    $('#start-btn').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); startGame(); } });

    /* -------------------------------------------------------- Render Board */
    function renderBoard(diff) {
        board.style.gridTemplateColumns = `repeat(${diff.cols}, 1fr)`;
        board.style.gridTemplateRows = `repeat(${diff.rows}, 1fr)`;
        board.innerHTML = '';

        const pieceW = 100 / diff.cols;
        const pieceH = 100 / diff.rows;

        state.pieces.forEach((piece, idx) => {
            const el = document.createElement('div');
            el.className = 'puzzle-piece';
            el.setAttribute('draggable', 'true');
            el.setAttribute('tabindex', '0');
            el.setAttribute('role', 'gridcell');
            el.setAttribute('aria-label', `Puzzle piece at position ${idx + 1}`);
            el.dataset.index = idx;

            // Background positioning based on CORRECT index
            const correctCol = piece.correctIndex % diff.cols;
            const correctRow = Math.floor(piece.correctIndex / diff.cols);
            el.style.backgroundImage = `url('${state.monument.image}')`;
            el.style.backgroundSize = `${diff.cols * 100}% ${diff.rows * 100}%`;
            el.style.backgroundPosition = `${correctCol * (100 / (diff.cols - 1))}% ${correctRow * (100 / (diff.rows - 1))}%`;

            // Mark correct placement
            if (piece.correctIndex === idx) el.classList.add('correct');

            // Drag events
            el.addEventListener('dragstart', onDragStart);
            el.addEventListener('dragover', onDragOver);
            el.addEventListener('dragenter', onDragEnter);
            el.addEventListener('dragleave', onDragLeave);
            el.addEventListener('drop', onDrop);
            el.addEventListener('dragend', onDragEnd);

            // Keyboard events
            el.addEventListener('keydown', onPieceKeydown);

            board.appendChild(el);
        });
    }

    /* -------------------------------------------------------- Drag & Drop */
    let dragSrcIndex = null;

    function onDragStart(e) {
        if (state.completed) return;
        dragSrcIndex = parseInt(this.dataset.index);
        this.classList.add('dragging');
        e.dataTransfer.effectAllowed = 'move';
        e.dataTransfer.setData('text/plain', dragSrcIndex);
    }

    function onDragOver(e) { e.preventDefault(); e.dataTransfer.dropEffect = 'move'; }
    function onDragEnter(e) { e.preventDefault(); this.classList.add('drag-over'); }
    function onDragLeave() { this.classList.remove('drag-over'); }

    function onDrop(e) {
        e.preventDefault();
        this.classList.remove('drag-over');
        const targetIdx = parseInt(this.dataset.index);
        if (dragSrcIndex !== null && dragSrcIndex !== targetIdx) swapPieces(dragSrcIndex, targetIdx);
    }

    function onDragEnd() {
        this.classList.remove('dragging');
        board.querySelectorAll('.drag-over').forEach(el => el.classList.remove('drag-over'));
        dragSrcIndex = null;
    }

    /* -------------------------------------------------------- Keyboard Interaction */
    function onPieceKeydown(e) {
        if (state.completed) return;
        const idx = parseInt(this.dataset.index);

        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            if (state.kbSelected === null) {
                // Pick up
                state.kbSelected = idx;
                this.classList.add('kb-selected');
                this.setAttribute('aria-grabbed', 'true');
                announce(`Piece ${idx + 1} selected. Navigate to target and press Enter to swap.`);
            } else if (state.kbSelected === idx) {
                // Deselect
                clearKbSelection();
                announce('Selection cancelled.');
            } else {
                // Swap
                swapPieces(state.kbSelected, idx);
                clearKbSelection();
            }
        } else if (e.key === 'Escape') {
            clearKbSelection();
            announce('Selection cancelled.');
        }
    }

    function clearKbSelection() {
        if (state.kbSelected !== null) {
            const prev = board.querySelector(`[data-index="${state.kbSelected}"]`);
            if (prev) { prev.classList.remove('kb-selected'); prev.setAttribute('aria-grabbed', 'false'); }
        }
        state.kbSelected = null;
    }

    /* -------------------------------------------------------- Swap & Check */
    function swapPieces(a, b) {
        [state.pieces[a], state.pieces[b]] = [state.pieces[b], state.pieces[a]];
        state.moves++;
        updateStats();
        renderBoard(PUZZLE_DIFFICULTIES[state.difficulty]);
        checkCompletion();
        announce(`Pieces swapped. Moves: ${state.moves}`);
    }

    function checkCompletion() {
        const allCorrect = state.pieces.every((p, i) => p.correctIndex === i);
        if (allCorrect) {
            state.completed = true;
            stopTimer();
            showCompletion();
        }
    }

    /* -------------------------------------------------------- Timer & Stats */
    function startTimer() {
        stopTimer();
        state.startTime = Date.now();
        state.timerInterval = setInterval(() => {
            const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
            timerDisplay.textContent = formatTime(elapsed);
        }, 1000);
    }

    function stopTimer() { clearInterval(state.timerInterval); }

    function formatTime(sec) {
        const m = Math.floor(sec / 60);
        const s = sec % 60;
        return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
    }

    function updateStats() {
        movesDisplay.textContent = state.moves;
        const total = state.pieces.length;
        const correct = state.pieces.filter((p, i) => p.correctIndex === i).length;
        completionDisplay.textContent = Math.round((correct / total) * 100) + '%';
    }

    /* -------------------------------------------------------- Completion */
    function showCompletion() {
        const elapsed = Math.floor((Date.now() - state.startTime) / 1000);
        $('#modal-message').textContent = `You completed the ${state.monument.name} puzzle!`;
        $('#ms-moves').textContent = state.moves;
        $('#ms-time').textContent = formatTime(elapsed);
        modal.hidden = false;
        $('#modal-restart').focus();
    }

    $('#modal-restart').addEventListener('click', () => { modal.hidden = true; setupScreen.style.display = ''; gameScreen.style.display = 'none'; });
    $('#modal-restart').addEventListener('keydown', e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); modal.hidden = true; setupScreen.style.display = ''; gameScreen.style.display = 'none'; } });
    $('#modal-backdrop').addEventListener('click', () => { modal.hidden = true; });

    /* -------------------------------------------------------- Reference Toggle */
    refToggle.addEventListener('click', () => {
        const hidden = refImage.classList.toggle('hidden-ref');
        refToggle.textContent = hidden ? 'Show' : 'Hide';
        refToggle.setAttribute('aria-pressed', String(!hidden));
    });

    /* -------------------------------------------------------- Announce (a11y) */
    let liveRegion;
    function announce(msg) {
        if (!liveRegion) {
            liveRegion = document.createElement('div');
            liveRegion.setAttribute('aria-live', 'polite');
            liveRegion.className = 'sr-only';
            document.body.appendChild(liveRegion);
        }
        liveRegion.textContent = msg;
    }

    /* -------------------------------------------------------- Scroll Reveal */
    function initReveal() {
        const targets = document.querySelectorAll('.reveal');
        if (!('IntersectionObserver' in window)) { targets.forEach(el => el.classList.add('visible')); return; }
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); } });
        }, { threshold: 0.08 });
        targets.forEach(el => obs.observe(el));
    }

    document.addEventListener('DOMContentLoaded', initReveal);
})();
