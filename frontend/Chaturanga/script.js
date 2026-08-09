import { CHATURANGA_DATA } from './chaturanga-data.js';

let currentMode = 'ancient';

document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavbar();
    renderStats();
    renderHeroImage();
    renderHistory();
    renderTimeline();
    renderComparisonTable();
    renderPieceEvolution();
    initBoardToggle();
    renderBoard(currentMode);
    renderModernInfluence();
    renderGallery();
    renderReferences();
    renderFacts();
});

function initTheme() {
    const themeToggleBtn = document.getElementById('theme-toggle');
    if (!themeToggleBtn) return;

    themeToggleBtn.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        themeToggleBtn.textContent = isLight ? '🌙' : '☀️';
    });
}

function initNavbar() {
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    if (!menuToggle || !navMenu) return;

    menuToggle.addEventListener('click', () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        navMenu.classList.toggle('active');
    });
}

function renderStats() {
    const container = document.getElementById('stats-grid');
    if (!container || !CHATURANGA_DATA.stats) return;

    container.innerHTML = CHATURANGA_DATA.stats
        .map(
            (stat) => `
        <div class="stat-card">
            <span class="stat-icon">${stat.icon}</span>
            <div class="stat-value">${stat.value}</div>
            <div class="stat-label">${stat.label}</div>
        </div>
    `
        )
        .join('');
}

function renderHeroImage() {
    const wrap = document.getElementById('hero-image-wrap');
    if (!wrap || !CHATURANGA_DATA.heroImage) return;

    wrap.innerHTML = `
        <img src="${CHATURANGA_DATA.heroImage.url}" alt="${CHATURANGA_DATA.heroImage.caption}" loading="lazy" />
        <figcaption>${CHATURANGA_DATA.heroImage.caption}</figcaption>
    `;
}

function renderHistory() {
    const title = document.getElementById('history-title');
    const content = document.getElementById('history-content');
    const imageWrap = document.getElementById('history-image-wrap');

    if (title) title.textContent = CHATURANGA_DATA.history.title;
    if (content) content.textContent = CHATURANGA_DATA.history.content;

    if (imageWrap && CHATURANGA_DATA.historyImage) {
        imageWrap.innerHTML = `
            <img src="${CHATURANGA_DATA.historyImage.url}" alt="${CHATURANGA_DATA.historyImage.caption}" loading="lazy" />
            <figcaption>${CHATURANGA_DATA.historyImage.caption}</figcaption>
        `;
    }
}

function renderTimeline() {
    const container = document.getElementById('timeline-list');
    if (!container || !CHATURANGA_DATA.timeline) return;

    container.innerHTML = CHATURANGA_DATA.timeline
        .map(
            (event) => `
        <div class="timeline-item">
            <div class="timeline-year">${event.year}</div>
            <div class="timeline-body">
                <h4>${event.title}</h4>
                <p>${event.desc}</p>
                ${
                    event.image
                        ? `<figure class="timeline-image-wrap">
                        <img src="${event.image}" alt="${event.imageCaption || event.title}" loading="lazy" />
                        <figcaption>${event.imageCaption || ''}</figcaption>
                    </figure>`
                        : ''
                }
            </div>
        </div>
    `
        )
        .join('');
}

function renderComparisonTable() {
    const title = document.getElementById('compare-title');
    const tbody = document.getElementById('compare-tbody');

    if (title) title.textContent = CHATURANGA_DATA.ancientVsModern.title;

    if (tbody && CHATURANGA_DATA.ancientVsModern.rows) {
        tbody.innerHTML = CHATURANGA_DATA.ancientVsModern.rows
            .map(
                (row) => `
            <tr>
                <td class="aspect-cell">${row.aspect}</td>
                <td>${row.ancient}</td>
                <td>${row.modern}</td>
            </tr>
        `
            )
            .join('');
    }
}

function renderPieceEvolution() {
    const container = document.getElementById('pieces-grid');
    if (!container || !CHATURANGA_DATA.pieceEvolution) return;

    container.innerHTML = CHATURANGA_DATA.pieceEvolution
        .map(
            (piece) => `
        <div class="piece-card">
            <div class="piece-symbol">${piece.symbol}</div>
            <h4>${piece.ancientName} → ${piece.modernName}</h4>
            <span class="piece-sanskrit">${piece.sanskrit}</span>
            <p class="piece-movement"><strong>Movement:</strong> ${piece.movement}</p>
            <p class="piece-description">${piece.description}</p>
        </div>
    `
        )
        .join('');
}

function initBoardToggle() {
    const ancientBtn = document.getElementById('toggle-ancient');
    const modernBtn = document.getElementById('toggle-modern');
    if (!ancientBtn || !modernBtn) return;

    ancientBtn.addEventListener('click', () => setBoardMode('ancient', ancientBtn, modernBtn));
    modernBtn.addEventListener('click', () => setBoardMode('modern', modernBtn, ancientBtn));
}

function setBoardMode(mode, activeBtn, inactiveBtn) {
    currentMode = mode;
    activeBtn.classList.add('active');
    inactiveBtn.classList.remove('active');
    renderBoard(mode);
    resetBoardDetail();
}

function renderBoard(mode) {
    const board = document.getElementById('chess-board');
    if (!board) return;

    const backRank = CHATURANGA_DATA.boardBackRank;
    board.innerHTML = '';

    for (let row = 0; row < 8; row++) {
        for (let col = 0; col < 8; col++) {
            const square = document.createElement('div');
            const isLight = (row + col) % 2 === 0;
            square.className = `chess-square ${isLight ? 'square-light' : 'square-dark'}`;

            const { pieceId, side } = getPieceAt(row, col, backRank);

            if (pieceId) {
                const piece = CHATURANGA_DATA.pieceEvolution.find((p) => p.id === pieceId);
                const symbol = mode === 'modern' ? getModernSymbol(pieceId) : piece.symbol;

                const pieceBtn = document.createElement('button');
                pieceBtn.type = 'button';
                pieceBtn.className = `chess-piece piece-${side}`;
                pieceBtn.textContent = symbol;
                pieceBtn.setAttribute(
                    'aria-label',
                    `${side === 'white' ? 'White' : 'Black'} ${mode === 'modern' ? piece.modernName : piece.ancientName}`
                );
                pieceBtn.addEventListener('click', () => showPieceDetail(pieceId, mode));
                square.appendChild(pieceBtn);
            }

            board.appendChild(square);
        }
    }
}

function getPieceAt(row, col, backRank) {
    if (row === 0) return { pieceId: backRank[col], side: 'black' };
    if (row === 1) return { pieceId: 'padati', side: 'black' };
    if (row === 6) return { pieceId: 'padati', side: 'white' };
    if (row === 7) return { pieceId: backRank[col], side: 'white' };
    return { pieceId: null, side: null };
}

function getModernSymbol(pieceId) {
    const modernInfo = CHATURANGA_DATA.modernPieceMap[pieceId];
    return modernInfo ? modernInfo.symbol : '';
}

function showPieceDetail(pieceId, mode) {
    const detailContainer = document.getElementById('board-detail');
    if (!detailContainer) return;

    const piece = CHATURANGA_DATA.pieceEvolution.find((p) => p.id === pieceId);
    if (!piece) return;

    const displayName = mode === 'modern' ? piece.modernName : `${piece.ancientName} (${piece.sanskrit})`;
    const displaySymbol = mode === 'modern' ? getModernSymbol(pieceId) : piece.symbol;

    detailContainer.innerHTML = `
        <div class="board-detail-symbol">${displaySymbol}</div>
        <h3>${displayName}</h3>
        ${mode === 'ancient' ? `<p class="board-detail-modern-note">Becomes the modern <strong>${piece.modernName}</strong></p>` : ''}
        <p class="board-detail-movement"><strong>Movement:</strong> ${piece.movement}</p>
        <p class="board-detail-description">${piece.description}</p>
    `;
}

function resetBoardDetail() {
    const detailContainer = document.getElementById('board-detail');
    if (!detailContainer) return;
    detailContainer.innerHTML = '<p class="board-detail-hint">Click a piece on the board to see its details here.</p>';
}

function renderModernInfluence() {
    const title = document.getElementById('influence-title');
    const content = document.getElementById('influence-content');
    if (title) title.textContent = CHATURANGA_DATA.modernInfluence.title;
    if (content) content.textContent = CHATURANGA_DATA.modernInfluence.content;
}

function renderGallery() {
    const container = document.getElementById('gallery-grid');
    if (!container || !CHATURANGA_DATA.gallery) return;

    container.innerHTML = CHATURANGA_DATA.gallery
        .map(
            (g) => `
        <div class="gallery-card">
            <img src="${g.url}" alt="${g.title}" loading="lazy" />
            <div class="gallery-info">
                <h4>${g.title}</h4>
                <p>${g.caption}</p>
            </div>
        </div>
    `
        )
        .join('');
}

function renderReferences() {
    const container = document.getElementById('references-list');
    if (!container || !CHATURANGA_DATA.references) return;

    container.innerHTML = CHATURANGA_DATA.references
        .map(
            (ref) => `
        <a class="reference-card" href="${ref.url}" target="_blank" rel="noopener noreferrer">
            <h4>${ref.title}</h4>
            <span class="reference-source">${ref.source}</span>
        </a>
    `
        )
        .join('');
}

function renderFacts() {
    const container = document.getElementById('facts-grid');
    if (!container || !CHATURANGA_DATA.facts) return;

    container.innerHTML = CHATURANGA_DATA.facts
        .map((f) => `<div class="trivia-box">💡 ${f}</div>`)
        .join('');
}