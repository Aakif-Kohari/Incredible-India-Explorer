import { 
  chessEvolutionData, 
  mensChampionshipHistory, 
  womensChampionshipHistory, 
  majorChampionsData, 
  grandmastersList, 
  historicGamesPGN, 
  quizQuestions 
} from './chess-data.js';

// Global App State
let currentChampionshipTab = 'mens';
let currentGameIndex = 0;
let currentMovePly = 0;
let isAutoPlaying = false;
let autoPlayTimer = null;
let isBoardFlipped = false;
let currentQuizIndex = 0;
let quizScore = 0;

// SVG Piece Unicode / Symbols mapping for clean UI
const PIECE_UNICODE = {
  'K': '♔', 'Q': '♕', 'R': '♖', 'B': '♗', 'N': '♘', 'P': '♙',
  'k': '♚', 'q': '♛', 'r': '♜', 'b': '♝', 'n': '♞', 'p': '♟'
};

// Initial Standard Board Setup (8x8 matrix)
const INITIAL_BOARD = [
  ['r','n','b','q','k','b','n','r'],
  ['p','p','p','p','p','p','p','p'],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['P','P','P','P','P','P','P','P'],
  ['R','N','B','Q','K','B','N','R']
];

document.addEventListener('DOMContentLoaded', () => {
  initTimeline();
  initChampionshipsTable();
  initChampionsGrid();
  initGMDirectory();
  initChessboardEngine();
  initQuizEngine();
  initSubnav();
  initThemeSupport();
});

/* --------------------------------------------------------------------------
   1. Evolution Timeline
   -------------------------------------------------------------------------- */
function initTimeline() {
  const container = document.getElementById('timeline-wrapper');
  if (!container) return;

  container.innerHTML = chessEvolutionData.map(item => `
    <div class="timeline-item">
      <div class="timeline-marker"></div>
      <div class="timeline-card">
        <span class="timeline-period">${item.period}</span>
        <h3>${item.icon} ${item.title}</h3>
        <div class="subtitle">${item.subtitle}</div>
        <p>${item.description}</p>
      </div>
    </div>
  `).join('');
}

/* --------------------------------------------------------------------------
   2. National Championship Archive
   -------------------------------------------------------------------------- */
function initChampionshipsTable() {
  const mensBtn = document.getElementById('tab-mens');
  const womensBtn = document.getElementById('tab-womens');
  const searchInput = document.getElementById('champ-search');
  const stateFilter = document.getElementById('champ-state-filter');

  mensBtn?.addEventListener('click', () => {
    currentChampionshipTab = 'mens';
    mensBtn.classList.add('active');
    womensBtn.classList.remove('active');
    renderChampionships();
  });

  womensBtn?.addEventListener('click', () => {
    currentChampionshipTab = 'womens';
    womensBtn.classList.add('active');
    mensBtn.classList.remove('active');
    renderChampionships();
  });

  searchInput?.addEventListener('input', renderChampionships);
  stateFilter?.addEventListener('change', renderChampionships);

  renderChampionships();
}

function renderChampionships() {
  const tbody = document.getElementById('championship-tbody');
  const searchVal = document.getElementById('champ-search')?.value.toLowerCase() || '';
  const selectedState = document.getElementById('champ-state-filter')?.value || 'all';

  const data = currentChampionshipTab === 'mens' ? mensChampionshipHistory : womensChampionshipHistory;

  const filtered = data.filter(item => {
    const matchesSearch = item.winner.toLowerCase().includes(searchVal) ||
                          item.venue.toLowerCase().includes(searchVal) ||
                          item.runnerUp.toLowerCase().includes(searchVal) ||
                          item.notes.toLowerCase().includes(searchVal) ||
                          item.year.toString().includes(searchVal);

    const matchesState = selectedState === 'all' || item.state.includes(selectedState);

    return matchesSearch && matchesState;
  });

  if (filtered.length === 0) {
    tbody.innerHTML = `<tr><td colspan="6" style="text-align:center; padding:30px; color:#94a3b8;">No national championship records match your search criteria.</td></tr>`;
    return;
  }

  tbody.innerHTML = filtered.map(item => `
    <tr>
      <td><span class="badge-gold">${item.year}</span></td>
      <td><strong>${item.venue}</strong></td>
      <td><span style="color:var(--primary-saffron); font-weight:700;">${item.winner}</span></td>
      <td>${item.runnerUp}</td>
      <td>${item.state}</td>
      <td style="font-size:0.88rem; color:#cbd5e1;">${item.notes}</td>
    </tr>
  `).join('');
}

/* --------------------------------------------------------------------------
   3. Champions & Hall of Fame Cards
   -------------------------------------------------------------------------- */
function initChampionsGrid() {
  const mainContainer = document.getElementById('champions-container');
  const womensContainer = document.getElementById('womens-champions-container');

  if (mainContainer) {
    mainContainer.innerHTML = majorChampionsData.slice(0, 6).map(c => renderChampionCard(c)).join('');
  }

  if (womensContainer) {
    womensContainer.innerHTML = majorChampionsData.filter(c => 
      ['Koneru Humpy', 'Subbaraman Vijayalakshmi', 'Harika Dronavalli', 'Divya Deshmukh', 'Vaishali Rameshbabu'].includes(c.name)
    ).map(c => renderChampionCard(c)).join('');
  }

  // Click event delegation for profile modals
  document.addEventListener('click', (e) => {
    const card = e.target.closest('.champion-card');
    if (card) {
      const name = card.getAttribute('data-name');
      const champion = majorChampionsData.find(item => item.name === name);
      if (champion) openChampionModal(champion);
    }
  });

  // Close Modal setup
  document.getElementById('modal-close-btn')?.addEventListener('click', closeModal);
  document.getElementById('champion-modal')?.addEventListener('click', (e) => {
    if (e.target.id === 'champion-modal') closeModal();
  });
}

function renderChampionCard(champ) {
  return `
    <div class="champion-card" data-name="${champ.name}">
      <div class="card-header-banner" style="background:${champ.imageBg};">
        <div class="icon-avatar">👑</div>
        <h3>${champ.name}</h3>
        <div class="title-tag">${champ.title}</div>
      </div>
      <div class="champion-card-body">
        <div>
          <div class="champion-meta">
            <span>📍 ${champ.state}</span>
            <span>⭐ Peak Rating: ${champ.peakRating}</span>
          </div>
          <p class="champion-summary">${champ.summary}</p>
        </div>
        <button class="view-profile-btn">View Detailed Bio & Achievements →</button>
      </div>
    </div>
  `;
}

function openChampionModal(champ) {
  const modal = document.getElementById('champion-modal');
  const modalBody = document.getElementById('modal-body-content');
  if (!modal || !modalBody) return;

  modalBody.innerHTML = `
    <div style="background:${champ.imageBg}; padding:24px; border-radius:14px; color:#fff; margin-bottom:20px;">
      <h2 style="font-size:1.8rem; margin:0 0 4px;">${champ.name}</h2>
      <p style="opacity:0.9; margin-bottom:8px;">${champ.title}</p>
      <div style="font-size:0.85rem; display:flex; gap:16px;">
        <span>📍 ${champ.state}</span>
        <span>⭐ Peak Rating: ${champ.peakRating}</span>
        <span>🎂 Born: ${champ.birthYear}</span>
      </div>
    </div>

    <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size:1.1rem;">Key Career Achievements</h4>
    <ul style="padding-left:20px; color:#cbd5e1; line-height:1.6; margin-bottom:20px;">
      ${champ.achievements.map(a => `<li style="margin-bottom:6px;">${a}</li>`).join('')}
    </ul>

    <h4 style="color:var(--primary-gold); margin-bottom:8px; font-size:1.1rem;">Biography & Legacy</h4>
    <p style="color:#cbd5e1; line-height:1.6;">${champ.bio}</p>
  `;

  modal.classList.add('active');
}

function closeModal() {
  document.getElementById('champion-modal')?.classList.remove('active');
}

/* --------------------------------------------------------------------------
   4. Grandmasters Directory
   -------------------------------------------------------------------------- */
function initGMDirectory() {
  const searchInput = document.getElementById('gm-search');
  const stateSelect = document.getElementById('gm-state-select');
  const sortSelect = document.getElementById('gm-sort-select');

  searchInput?.addEventListener('input', renderGMTable);
  stateSelect?.addEventListener('change', renderGMTable);
  sortSelect?.addEventListener('change', renderGMTable);

  renderGMTable();
}

function renderGMTable() {
  const tbody = document.getElementById('gm-tbody');
  if (!tbody) return;

  const searchVal = document.getElementById('gm-search')?.value.toLowerCase() || '';
  const selectedState = document.getElementById('gm-state-select')?.value || 'all';
  const sortVal = document.getElementById('gm-sort-select')?.value || 'year-asc';

  let filtered = grandmastersList.filter(gm => {
    const matchesSearch = gm.name.toLowerCase().includes(searchVal) ||
                          gm.state.toLowerCase().includes(searchVal) ||
                          gm.notes.toLowerCase().includes(searchVal) ||
                          gm.year.toString().includes(searchVal);
    const matchesState = selectedState === 'all' || gm.state.includes(selectedState);
    return matchesSearch && matchesState;
  });

  // Sorting logic
  filtered.sort((a, b) => {
    if (sortVal === 'year-asc') return a.id - b.id;
    if (sortVal === 'year-desc') return b.id - a.id;
    if (sortVal === 'rating-desc') return b.peakRating - a.peakRating;
    if (sortVal === 'name-asc') return a.name.localeCompare(b.name);
    return 0;
  });

  tbody.innerHTML = filtered.map(gm => `
    <tr>
      <td><span class="badge-gold">GM #${gm.id}</span></td>
      <td><strong style="color:var(--primary-saffron);">${gm.name}</strong></td>
      <td>${gm.state}</td>
      <td><strong>${gm.year}</strong></td>
      <td><span style="color:#10b981; font-weight:700;">${gm.peakRating}</span></td>
      <td style="font-size:0.88rem; color:#cbd5e1;">${gm.notes}</td>
    </tr>
  `).join('');
}

/* --------------------------------------------------------------------------
   5. Interactive PGN Chessboard Engine
   -------------------------------------------------------------------------- */
function initChessboardEngine() {
  const gameSelect = document.getElementById('game-select');
  if (!gameSelect) return;

  // Populate Selector
  gameSelect.innerHTML = historicGamesPGN.map((g, idx) => `
    <option value="${idx}">${g.title} - ${g.subtitle}</option>
  `).join('');

  gameSelect.addEventListener('change', (e) => {
    currentGameIndex = parseInt(e.target.value, 10);
    loadGame(currentGameIndex);
  });

  // Controls
  document.getElementById('btn-first')?.addEventListener('click', () => jumpToMove(0));
  document.getElementById('btn-prev')?.addEventListener('click', () => jumpToMove(currentMovePly - 1));
  document.getElementById('btn-next')?.addEventListener('click', () => jumpToMove(currentMovePly + 1));
  document.getElementById('btn-last')?.addEventListener('click', () => {
    const game = historicGamesPGN[currentGameIndex];
    const moves = parseMoves(game.movesPGN);
    jumpToMove(moves.length);
  });
  document.getElementById('btn-play')?.addEventListener('click', toggleAutoPlay);
  document.getElementById('btn-flip')?.addEventListener('click', () => {
    isBoardFlipped = !isBoardFlipped;
    renderBoardCurrentState();
  });

  loadGame(0);
}

function loadGame(index) {
  if (isAutoPlaying) pauseAutoPlay();
  currentGameIndex = index;
  currentMovePly = 0;
  const game = historicGamesPGN[index];

  document.getElementById('game-title').innerText = `${game.white} vs ${game.black}`;
  document.getElementById('game-event').innerText = `${game.event} (${game.date}) - Result: ${game.result}`;
  document.getElementById('game-desc').innerText = game.description;

  renderMovesList(game.movesPGN);
  renderBoardCurrentState();
}

function parseMoves(pgn) {
  // Simple PGN string to array of SAN tokens
  const clean = pgn.replace(/\{[^}]*\}/g, '').replace(/\d+\.+/g, '').trim();
  const rawTokens = clean.split(/\s+/);
  return rawTokens.filter(t => t && t !== '1-0' && t !== '0-1' && t !== '1/2-1/2');
}

function renderMovesList(pgn) {
  const moves = parseMoves(pgn);
  const container = document.getElementById('moves-list');
  if (!container) return;

  let html = '';
  for (let i = 0; i < moves.length; i += 2) {
    const moveNum = (i / 2) + 1;
    const whiteMove = moves[i] || '';
    const blackMove = moves[i + 1] || '';

    html += `
      <div class="move-num">${moveNum}.</div>
      <div class="move-ply ${currentMovePly === i + 1 ? 'active' : ''}" data-ply="${i + 1}">${whiteMove}</div>
      <div class="move-ply ${currentMovePly === i + 2 ? 'active' : ''}" data-ply="${i + 2}">${blackMove}</div>
    `;
  }

  container.innerHTML = html;

  container.querySelectorAll('.move-ply').forEach(btn => {
    btn.addEventListener('click', () => {
      const ply = parseInt(btn.getAttribute('data-ply'), 10);
      if (!isNaN(ply)) jumpToMove(ply);
    });
  });
}

function jumpToMove(targetPly) {
  const game = historicGamesPGN[currentGameIndex];
  const moves = parseMoves(game.movesPGN);

  if (targetPly < 0) targetPly = 0;
  if (targetPly > moves.length) targetPly = moves.length;

  currentMovePly = targetPly;
  renderBoardCurrentState();
  updateMoveHighlights();
}

function updateMoveHighlights() {
  const container = document.getElementById('moves-list');
  if (!container) return;

  container.querySelectorAll('.move-ply').forEach(el => {
    const ply = parseInt(el.getAttribute('data-ply'), 10);
    if (ply === currentMovePly) {
      el.classList.add('active');
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    } else {
      el.classList.remove('active');
    }
  });

  // Commentary update
  const game = historicGamesPGN[currentGameIndex];
  const activeComment = game.keyMoments?.find(k => Math.ceil(currentMovePly / 2) === k.move);
  const commentBox = document.getElementById('move-annotation');
  if (commentBox) {
    if (activeComment) {
      commentBox.innerHTML = `<strong>💡 Key Moment (Move ${activeComment.move}):</strong> ${activeComment.note}`;
    } else if (currentMovePly === 0) {
      commentBox.innerText = `Starting Position. Step forward or click auto-play to view game.`;
    } else {
      commentBox.innerText = `Move ${currentMovePly}: Game position after move ${currentMovePly}.`;
    }
  }
}

function computeBoardPosition(targetPly) {
  // Deep copy initial board
  let board = INITIAL_BOARD.map(row => [...row]);
  const game = historicGamesPGN[currentGameIndex];
  const moves = parseMoves(game.movesPGN);

  // Play moves up to targetPly
  for (let i = 0; i < targetPly; i++) {
    const moveStr = moves[i];
    applySANMove(board, moveStr, i % 2 === 0);
  }

  return board;
}

function applySANMove(board, moveStr, isWhite) {
  // Simplified board state updater for standard PGN moves
  const clean = moveStr.replace(/[+#?!]/g, '');

  if (clean === 'O-O' || clean === '0-0') {
    const row = isWhite ? 7 : 0;
    board[row][4] = '';
    board[row][6] = isWhite ? 'K' : 'k';
    board[row][7] = '';
    board[row][5] = isWhite ? 'R' : 'r';
    return;
  }

  if (clean === 'O-O-O' || clean === '0-0-0') {
    const row = isWhite ? 7 : 0;
    board[row][4] = '';
    board[row][2] = isWhite ? 'K' : 'k';
    board[row][0] = '';
    board[row][3] = isWhite ? 'R' : 'r';
    return;
  }

  // Parse destination square (e.g. e4, Nf3, Nxd4, Bxe6)
  const destMatch = clean.match(/([a-h])([1-8])/);
  if (!destMatch) return;

  const destFile = destMatch[1].charCodeAt(0) - 97;
  const destRank = 8 - parseInt(destMatch[2], 10);

  let piece = isWhite ? 'P' : 'p';
  if (/^[A-Z]/.test(clean)) {
    const pChar = clean[0];
    piece = isWhite ? pChar : pChar.toLowerCase();
  }

  // Find source square matching piece
  let srcRow = -1, srcCol = -1;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if (board[r][c] === piece) {
        if (piece.toUpperCase() === 'P') {
          if (clean.includes('x')) {
            const srcFile = clean[0].charCodeAt(0) - 97;
            if (c === srcFile && Math.abs(r - destRank) === 1) {
              srcRow = r; srcCol = c; break;
            }
          } else if (c === destFile) {
            if (isWhite && (r - destRank === 1 || (r === 6 && r - destRank === 2))) {
              srcRow = r; srcCol = c; break;
            }
            if (!isWhite && (destRank - r === 1 || (r === 1 && destRank - r === 2))) {
              srcRow = r; srcCol = c; break;
            }
          }
        } else {
          srcRow = r; srcCol = c; break;
        }
      }
    }
    if (srcRow !== -1) break;
  }

  if (srcRow !== -1 && srcCol !== -1) {
    board[srcRow][srcCol] = '';
    board[destRank][destFile] = piece;
  }
}

function renderBoardCurrentState() {
  const boardEl = document.getElementById('chessboard');
  if (!boardEl) return;

  const boardState = computeBoardPosition(currentMovePly);
  let html = '';

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      const rowIdx = isBoardFlipped ? 7 - r : r;
      const colIdx = isBoardFlipped ? 7 - c : c;
      const isLight = (rowIdx + colIdx) % 2 === 0;
      const pieceCode = boardState[rowIdx][colIdx];
      const pieceSymbol = PIECE_UNICODE[pieceCode] || '';

      html += `
        <div class="square ${isLight ? 'light' : 'dark'}">
          ${pieceSymbol ? `<span style="font-size:2.2rem;">${pieceSymbol}</span>` : ''}
        </div>
      `;
    }
  }

  boardEl.innerHTML = html;
}

function toggleAutoPlay() {
  if (isAutoPlaying) {
    pauseAutoPlay();
  } else {
    startAutoPlay();
  }
}

function startAutoPlay() {
  isAutoPlaying = true;
  const btn = document.getElementById('btn-play');
  if (btn) btn.innerText = '⏸️ Pause';

  autoPlayTimer = setInterval(() => {
    const game = historicGamesPGN[currentGameIndex];
    const moves = parseMoves(game.movesPGN);

    if (currentMovePly < moves.length) {
      jumpToMove(currentMovePly + 1);
    } else {
      pauseAutoPlay();
    }
  }, 1500);
}

function pauseAutoPlay() {
  isAutoPlaying = false;
  clearInterval(autoPlayTimer);
  const btn = document.getElementById('btn-play');
  if (btn) btn.innerText = '▶️ Play';
}

/* --------------------------------------------------------------------------
   6. Chess Quiz Engine
   -------------------------------------------------------------------------- */
function initQuizEngine() {
  currentQuizIndex = 0;
  quizScore = 0;
  renderQuizQuestion();
}

function renderQuizQuestion() {
  const box = document.getElementById('quiz-content');
  if (!box) return;

  if (currentQuizIndex >= quizQuestions.length) {
    box.innerHTML = `
      <div style="text-align:center; padding:20px;">
        <h3 style="font-size:1.8rem; color:var(--primary-saffron); margin-bottom:12px;">Quiz Complete! 🎉</h3>
        <p style="font-size:1.2rem; color:#fff; margin-bottom:20px;">Your Final Score: <strong>${quizScore} / ${quizQuestions.length}</strong></p>
        <button class="tab-btn active" id="quiz-restart-btn">Restart Quiz 🔄</button>
      </div>
    `;
    document.getElementById('quiz-restart-btn')?.addEventListener('click', initQuizEngine);
    return;
  }

  const q = quizQuestions[currentQuizIndex];
  box.innerHTML = `
    <div style="font-size:0.9rem; color:var(--primary-gold); font-weight:700; margin-bottom:10px;">Question ${currentQuizIndex + 1} of ${quizQuestions.length}</div>
    <h3 style="font-size:1.3rem; margin-bottom:20px; color:#fff; line-height:1.4;">${q.question}</h3>
    
    <div>
      ${q.options.map((opt, i) => `
        <button class="quiz-option" data-index="${i}">${opt}</button>
      `).join('')}
    </div>

    <div id="quiz-explanation" style="margin-top:20px; display:none; padding:14px; border-radius:10px; background:rgba(255,176,31,0.1); border-left:3px solid var(--primary-gold); font-size:0.95rem;"></div>
  `;

  box.querySelectorAll('.quiz-option').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const idx = parseInt(btn.getAttribute('data-index'), 10);
      handleQuizAnswer(idx, q.answer, q.explanation);
    });
  });
}

function handleQuizAnswer(selectedIdx, correctIdx, explanation) {
  const options = document.querySelectorAll('.quiz-option');
  options.forEach((opt, i) => {
    opt.disabled = true;
    if (i === correctIdx) opt.classList.add('correct');
    if (i === selectedIdx && i !== correctIdx) opt.classList.add('incorrect');
  });

  if (selectedIdx === correctIdx) quizScore++;

  const expBox = document.getElementById('quiz-explanation');
  if (expBox) {
    expBox.style.display = 'block';
    expBox.innerHTML = `<strong>${selectedIdx === correctIdx ? '✅ Correct!' : '❌ Incorrect.'}</strong> ${explanation}`;
  }

  setTimeout(() => {
    currentQuizIndex++;
    renderQuizQuestion();
  }, 3200);
}

/* --------------------------------------------------------------------------
   7. Subnav Smooth Scrolling
   -------------------------------------------------------------------------- */
function initSubnav() {
  const btns = document.querySelectorAll('.subnav-btn');
  btns.forEach(btn => {
    btn.addEventListener('click', () => {
      btns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const targetId = btn.getAttribute('data-target');
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });
}

/* --------------------------------------------------------------------------
   8. Theme Toggle Integration
   -------------------------------------------------------------------------- */
function initThemeSupport() {
  const menuToggle = document.getElementById('menu-toggle');
  const navMenu = document.getElementById('nav-menu');

  menuToggle?.addEventListener('click', () => {
    navMenu?.classList.toggle('active');
  });
}
