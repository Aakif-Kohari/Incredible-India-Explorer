/**
 * Xylophone & Indian Percussion Traditions — Interactive Logic
 * Issue #2938: X: Xylophone & Indian Percussion Traditions
 *
 * Exposes: initXylophonePercussion, renderInstrumentCards, openInstrumentModal, closeInstrumentModal, filterInstruments, playTunedNote
 */

/* ============================================================
   State
   ============================================================ */
let _activeFamily   = 'All Families';
let _activeRegion   = 'All Regions';
let _activeMaterial = 'All Materials';
let _searchQuery    = '';
let _activeModalId  = null;
let _lastFocusedEl  = null;
let _audioCtx       = null;

/* ============================================================
   DOM Helpers
   ============================================================ */
function $(id) { return document.getElementById(id); }

/* ============================================================
   Entry Point
   ============================================================ */
function initXylophonePercussion() {
    if (typeof XYLOPHONE_PERCUSSION_DATA === 'undefined') return;

    _populateHeroStats();
    _populateFilters();
    _attachFilterListeners();
    renderInstrumentCards(XYLOPHONE_PERCUSSION_DATA.instruments);
    _renderEnsembles();
    _renderSources();
    _initModalKeyboard();
    _initVirtualSynth();
}

/* ============================================================
   Hero Stats
   ============================================================ */
function _populateHeroStats() {
    const data = XYLOPHONE_PERCUSSION_DATA;
    const totalEl = $('xp-stat-total');
    const famEl   = $('xp-stat-families');
    const regEl   = $('xp-stat-regions');

    if (totalEl) totalEl.textContent = data.meta.totalInstruments;
    if (famEl)   famEl.textContent   = data.meta.familiesCount;
    if (regEl)   regEl.textContent   = data.meta.regionsCount;
}

/* ============================================================
   Populate Filters
   ============================================================ */
function _populateFilters() {
    const famSelect = $('xp-filter-family');
    const regSelect = $('xp-filter-region');
    const matSelect = $('xp-filter-material');

    if (famSelect) {
        famSelect.innerHTML = '';
        XYLOPHONE_PERCUSSION_DATA.families.forEach(f => {
            const opt = document.createElement('option');
            opt.value = f;
            opt.textContent = f;
            famSelect.appendChild(opt);
        });
    }

    if (regSelect) {
        regSelect.innerHTML = '';
        XYLOPHONE_PERCUSSION_DATA.regions.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r;
            opt.textContent = r;
            regSelect.appendChild(opt);
        });
    }

    if (matSelect) {
        matSelect.innerHTML = '';
        XYLOPHONE_PERCUSSION_DATA.materials.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m;
            opt.textContent = m;
            matSelect.appendChild(opt);
        });
    }
}

/* ============================================================
   Filter Event Listeners
   ============================================================ */
function _attachFilterListeners() {
    const famSelect = $('xp-filter-family');
    const regSelect = $('xp-filter-region');
    const matSelect = $('xp-filter-material');
    const searchInp = $('xp-search');

    if (famSelect) {
        famSelect.addEventListener('change', () => {
            _activeFamily = famSelect.value;
            filterInstruments();
        });
    }

    if (regSelect) {
        regSelect.addEventListener('change', () => {
            _activeRegion = regSelect.value;
            filterInstruments();
        });
    }

    if (matSelect) {
        matSelect.addEventListener('change', () => {
            _activeMaterial = matSelect.value;
            filterInstruments();
        });
    }

    if (searchInp) {
        searchInp.addEventListener('input', () => {
            _searchQuery = searchInp.value.trim().toLowerCase();
            filterInstruments();
        });
    }
}

/* ============================================================
   Filter Logic
   ============================================================ */
function filterInstruments() {
    if (typeof XYLOPHONE_PERCUSSION_DATA === 'undefined') return;

    const filtered = XYLOPHONE_PERCUSSION_DATA.instruments.filter(item => {
        const matchFamily =
            _activeFamily === 'All Families' ||
            item.family === _activeFamily;

        const matchRegion =
            _activeRegion === 'All Regions' ||
            item.region === _activeRegion;

        const matchMaterial =
            _activeMaterial === 'All Materials' ||
            item.material === _activeMaterial;

        const q = _searchQuery;
        const matchSearch =
            q === '' ||
            item.name.toLowerCase().includes(q) ||
            (item.altName && item.altName.toLowerCase().includes(q)) ||
            item.material.toLowerCase().includes(q) ||
            item.region.toLowerCase().includes(q) ||
            item.family.toLowerCase().includes(q) ||
            item.description.toLowerCase().includes(q);

        return matchFamily && matchRegion && matchMaterial && matchSearch;
    });

    renderInstrumentCards(filtered);
}

/* ============================================================
   Render Cards
   ============================================================ */
function renderInstrumentCards(instruments) {
    const grid    = $('xp-card-grid');
    const countEl = $('xp-results-count');

    if (!grid) return;

    const total = (typeof XYLOPHONE_PERCUSSION_DATA !== 'undefined')
        ? XYLOPHONE_PERCUSSION_DATA.instruments.length : instruments.length;

    if (countEl) {
        countEl.textContent =
            instruments.length === total
                ? `Showing all ${total} instruments`
                : `Showing ${instruments.length} of ${total} instruments`;
    }

    if (instruments.length === 0) {
        grid.innerHTML = `
            <div class="xp-empty">
                <span class="xp-empty-icon" aria-hidden="true">🔍</span>
                <h3>No instruments found</h3>
                <p>Try clearing your search query or adjusting the family, region, or material filters.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = instruments.map(item => `
        <article
            class="xp-card"
            tabindex="0"
            role="button"
            aria-label="Learn more about ${item.name}"
            data-id="${item.id}"
        >
            <span class="xp-card-emoji" aria-hidden="true">${item.emoji}</span>
            <div class="xp-card-badges">
                <span class="xp-badge-family">${item.family.split(' ')[0]}</span>
                <span class="xp-badge-region">${item.region}</span>
            </div>
            <h3 class="xp-card-name">${item.name}</h3>
            ${item.altName ? `<span class="xp-card-altname">${item.altName}</span>` : ''}
            <p class="xp-card-desc">${item.description}</p>
            <span class="xp-card-cta" aria-hidden="true">Explore organology &amp; audio details →</span>
        </article>
    `).join('');

    // Attach click and keyboard listeners
    grid.querySelectorAll('.xp-card').forEach(card => {
        card.addEventListener('click', () => openInstrumentModal(card.dataset.id));
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openInstrumentModal(card.dataset.id);
            }
        });
    });
}

/* ============================================================
   Modal — Open
   ============================================================ */
function openInstrumentModal(instrumentId) {
    const overlay = $('xp-modal-overlay');
    const modal   = $('xp-modal');
    if (!overlay || !modal || typeof XYLOPHONE_PERCUSSION_DATA === 'undefined') return;

    const item = XYLOPHONE_PERCUSSION_DATA.instruments.find(i => i.id === instrumentId);
    if (!item) return;

    _activeModalId = instrumentId;
    _lastFocusedEl = document.activeElement;

    _renderModalContent(item);

    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-modal', 'true');
    document.body.style.overflow = 'hidden';

    const closeBtn = $('xp-modal-close');
    if (closeBtn) closeBtn.focus();
}

/* ============================================================
   Modal — Render Content
   ============================================================ */
function _renderModalContent(item) {
    const modal = $('xp-modal');
    if (!modal) return;

    modal.innerHTML = `
        <div class="xp-modal-header">
            <span class="xp-modal-emoji" aria-hidden="true">${item.emoji}</span>
            <div class="xp-modal-title-group">
                <h2 class="xp-modal-title">${item.name}</h2>
                ${item.altName ? `<p class="xp-modal-altname">${item.altName}</p>` : ''}
                <div class="xp-modal-badges">
                    <span class="xp-badge-family">${item.family}</span>
                    <span class="xp-badge-region">${item.region}</span>
                </div>
            </div>
            <button
                class="xp-modal-close"
                id="xp-modal-close"
                aria-label="Close details for ${item.name}"
                type="button"
            >✕</button>
        </div>

        <div class="xp-modal-body">
            <div class="xp-modal-section">
                <h3><i class="fa-solid fa-circle-info" aria-hidden="true"></i> Overview</h3>
                <p>${item.description}</p>
            </div>

            <div class="xp-modal-section xp-classification-box">
                <h3><i class="fa-solid fa-sitemap" aria-hidden="true"></i> Classification &amp; Terminology</h3>
                <p>${item.classificationNote}</p>
            </div>

            <div class="xp-modal-section">
                <h3><i class="fa-solid fa-hand" aria-hidden="true"></i> How It Is Played</h3>
                <p><strong>Technique:</strong> ${item.howPlayed}</p>
                <p style="margin-top: 6px;">${item.playingTechnique}</p>
            </div>

            <div class="xp-modal-section">
                <h3><i class="fa-solid fa-layer-group" aria-hidden="true"></i> Materials &amp; Musical Context</h3>
                <p><strong>Primary Material:</strong> ${item.material}</p>
                <p><strong>Musical Tradition:</strong> ${item.musicalTradition}</p>
            </div>

            <div class="xp-modal-section">
                <h3><i class="fa-solid fa-landmark" aria-hidden="true"></i> Cultural Significance</h3>
                <p>${item.culturalSignificance}</p>
            </div>

            <div class="xp-modal-section xp-fun-fact">
                <h3><i class="fa-solid fa-lightbulb" aria-hidden="true"></i> Did You Know?</h3>
                <p>${item.funFact}</p>
            </div>

            <div class="xp-modal-credit">
                <i class="fa-solid fa-image" aria-hidden="true"></i>
                <span>Media Attribution: <a href="${item.imageCredit.url}" target="_blank" rel="noopener noreferrer">${item.imageCredit.text}</a></span>
            </div>
        </div>
    `;

    const closeBtn = $('xp-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeInstrumentModal);
}

/* ============================================================
   Modal — Close
   ============================================================ */
function closeInstrumentModal() {
    const overlay = $('xp-modal-overlay');
    if (!overlay) return;

    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    _activeModalId = null;

    if (_lastFocusedEl && typeof _lastFocusedEl.focus === 'function') {
        _lastFocusedEl.focus();
    }
}

/* ============================================================
   Modal — Keyboard Trap & Escape
   ============================================================ */
function _initModalKeyboard() {
    const overlay = $('xp-modal-overlay');
    if (!overlay) return;

    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeInstrumentModal();
    });

    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && _activeModalId !== null) {
            e.preventDefault();
            closeInstrumentModal();
        }

        if (_activeModalId !== null && e.key === 'Tab') {
            const modal = $('xp-modal');
            if (!modal) return;
            const focusable = modal.querySelectorAll(
                'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            if (!focusable.length) return;
            const first = focusable[0];
            const last  = focusable[focusable.length - 1];

            if (e.shiftKey) {
                if (document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                }
            } else {
                if (document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        }
    });
}

/* ============================================================
   Web Audio API — Virtual Tuned Bar Synthesizer
   ============================================================ */
const SAPTAK_NOTES = [
    { key: '1', swara: 'Sa', freq: 261.63, label: 'Shadj (C4)' },
    { key: '2', swara: 'Re', freq: 293.66, label: 'Rishabh (D4)' },
    { key: '3', swara: 'Ga', freq: 329.63, label: 'Gandhar (E4)' },
    { key: '4', swara: 'Ma', freq: 349.23, label: 'Madhyam (F4)' },
    { key: '5', swara: 'Pa', freq: 392.00, label: 'Pancham (G4)' },
    { key: '6', swara: 'Dha', freq: 440.00, label: 'Dhaivat (A4)' },
    { key: '7', swara: 'Ni', freq: 493.88, label: 'Nishad (B4)' }
];

function _getAudioContext() {
    if (!_audioCtx) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) _audioCtx = new AudioCtx();
    }
    if (_audioCtx && _audioCtx.state === 'suspended') {
        _audioCtx.resume();
    }
    return _audioCtx;
}

function playTunedNote(freq, swaraLabel) {
    const ctx = _getAudioContext();
    if (!ctx) return;

    try {
        const osc  = ctx.createOscillator();
        const gain = ctx.createGain();

        // Warm wooden marimba / porcelain tone simulation (blend sine + slight triangle harmonic)
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        // Envelope: sudden acoustic mallet strike, decay exponentially like a tuned bar
        gain.gain.setValueAtTime(0.001, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.5, ctx.currentTime + 0.01);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.9);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start(ctx.currentTime);
        osc.stop(ctx.currentTime + 0.95);

        const display = $('xp-synth-note-display');
        if (display && swaraLabel) {
            display.textContent = `▶ Sounding Swara: ${swaraLabel} (${freq.toFixed(1)} Hz)`;
        }
    } catch (e) {
        // Fallback gracefully if Web Audio is restricted
    }
}

function _initVirtualSynth() {
    const container = $('xp-bars-container');
    if (!container) return;

    // Heights for tuned bars to simulate Kashta Tarang (longest low bar to shortest high bar)
    const heights = [140, 128, 116, 106, 96, 86, 78];

    container.innerHTML = SAPTAK_NOTES.map((n, index) => `
        <button
            type="button"
            class="xp-synth-bar"
            style="height: ${heights[index]}px;"
            data-key="${n.key}"
            data-freq="${n.freq}"
            data-label="${n.swara} - ${n.label}"
            aria-label="Play Swara ${n.swara} pitch ${n.label}"
        >
            <span class="xp-bar-swara">${n.swara}</span>
            <span class="xp-bar-key">[${n.key}]</span>
        </button>
    `).join('');

    const bars = container.querySelectorAll('.xp-synth-bar');
    bars.forEach(bar => {
        const trigger = () => {
            const freq  = parseFloat(bar.dataset.freq);
            const label = bar.dataset.label;
            playTunedNote(freq, label);
            bar.classList.add('active');
            setTimeout(() => bar.classList.remove('active'), 200);
        };

        bar.addEventListener('click', trigger);
    });

    // Global keyboard shortcuts 1-7 for synth play
    document.addEventListener('keydown', e => {
        if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'SELECT')) {
            return;
        }

        const note = SAPTAK_NOTES.find(n => n.key === e.key);
        if (note) {
            playTunedNote(note.freq, `${note.swara} - ${note.label}`);
            const bar = container.querySelector(`[data-key="${note.key}"]`);
            if (bar) {
                bar.classList.add('active');
                setTimeout(() => bar.classList.remove('active'), 200);
            }
        }
    });
}

/* ============================================================
   Render Regional Ensembles & Sources
   ============================================================ */
function _renderEnsembles() {
    const container = $('xp-ensembles-grid');
    if (!container || typeof XYLOPHONE_PERCUSSION_DATA === 'undefined') return;

    container.innerHTML = XYLOPHONE_PERCUSSION_DATA.regionalEnsembles.map(e => `
        <div class="xp-ensemble-card">
            <span class="xp-ensemble-tag">${e.type}</span>
            <h3>${e.title}</h3>
            <p>${e.description}</p>
        </div>
    `).join('');
}

function _renderSources() {
    const container = $('xp-sources-list');
    if (!container || typeof XYLOPHONE_PERCUSSION_DATA === 'undefined') return;

    container.innerHTML = XYLOPHONE_PERCUSSION_DATA.sources.map(src => `
        <li class="xp-source-item">
            <a href="${src.url}" target="_blank" rel="noopener noreferrer">
                <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                ${src.title}
            </a>
        </li>
    `).join('');
}

/* ============================================================
   DOM Ready Initializer
   ============================================================ */
document.addEventListener('DOMContentLoaded', initXylophonePercussion);
