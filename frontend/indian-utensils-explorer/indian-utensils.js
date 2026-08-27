/**
 * Indian Utensils Explorer — Interactive Logic
 * Issue #2936: Traditional Indian Utensils — Everyday Cultural Heritage
 *
 * Exposes: initUtensils, renderUtensilCards, openUtensilModal, closeUtensilModal, filterUtensils
 */

/* ============================================================
   State
   ============================================================ */
let _activeMaterial = 'All Materials';
let _activeRegion   = 'All Regions';
let _searchQuery    = '';
let _activeModalId  = null;
let _lastFocusedEl  = null;

/* ============================================================
   DOM helpers
   ============================================================ */
function $(id) { return document.getElementById(id); }

/* ============================================================
   Entry point
   ============================================================ */
function initUtensils() {
    if (typeof INDIAN_UTENSILS_DATA === 'undefined') return;

    _populateHeroStats();
    _populateFilters();
    _attachFilterListeners();
    renderUtensilCards(INDIAN_UTENSILS_DATA.utensils);
    _renderSources();
    _initModalKeyboard();
}

/* ============================================================
   Hero stats
   ============================================================ */
function _populateHeroStats() {
    const data = INDIAN_UTENSILS_DATA;
    const totalEl = $('iu-stat-total');
    const regEl   = $('iu-stat-regions');
    const matEl   = $('iu-stat-materials');
    if (totalEl) totalEl.textContent = data.meta.totalUtensils;
    if (regEl)   regEl.textContent   = data.meta.regionsCount;
    if (matEl)   matEl.textContent   = data.meta.materialsCount;
}

/* ============================================================
   Populate filter dropdowns
   ============================================================ */
function _populateFilters() {
    const matSelect = $('iu-filter-material');
    const regSelect = $('iu-filter-region');

    if (matSelect) {
        matSelect.innerHTML = '';
        INDIAN_UTENSILS_DATA.materials.forEach(m => {
            const opt = document.createElement('option');
            opt.value = m;
            opt.textContent = m;
            matSelect.appendChild(opt);
        });
    }

    if (regSelect) {
        regSelect.innerHTML = '';
        INDIAN_UTENSILS_DATA.regions.forEach(r => {
            const opt = document.createElement('option');
            opt.value = r;
            opt.textContent = r;
            regSelect.appendChild(opt);
        });
    }
}

/* ============================================================
   Filter listeners
   ============================================================ */
function _attachFilterListeners() {
    const matSelect  = $('iu-filter-material');
    const regSelect  = $('iu-filter-region');
    const searchInp  = $('iu-search');

    if (matSelect) {
        matSelect.addEventListener('change', () => {
            _activeMaterial = matSelect.value;
            filterUtensils();
        });
    }
    if (regSelect) {
        regSelect.addEventListener('change', () => {
            _activeRegion = regSelect.value;
            filterUtensils();
        });
    }
    if (searchInp) {
        searchInp.addEventListener('input', () => {
            _searchQuery = searchInp.value.trim().toLowerCase();
            filterUtensils();
        });
    }
}

/* ============================================================
   Filter & re-render
   ============================================================ */
function filterUtensils() {
    if (typeof INDIAN_UTENSILS_DATA === 'undefined') return;

    const filtered = INDIAN_UTENSILS_DATA.utensils.filter(u => {
        const matchMaterial =
            _activeMaterial === 'All Materials' ||
            u.material === _activeMaterial;

        const matchRegion =
            _activeRegion === 'All Regions' ||
            u.region === _activeRegion;

        const q = _searchQuery;
        const matchSearch =
            q === '' ||
            u.name.toLowerCase().includes(q) ||
            u.material.toLowerCase().includes(q) ||
            u.region.toLowerCase().includes(q) ||
            u.description.toLowerCase().includes(q);

        return matchMaterial && matchRegion && matchSearch;
    });

    renderUtensilCards(filtered);
}

/* ============================================================
   Render card grid
   ============================================================ */
function renderUtensilCards(utensils) {
    const grid      = $('iu-card-grid');
    const countEl   = $('iu-results-count');

    if (!grid) return;

    const total = (typeof INDIAN_UTENSILS_DATA !== 'undefined')
        ? INDIAN_UTENSILS_DATA.utensils.length : utensils.length;

    if (countEl) {
        countEl.textContent =
            utensils.length === total
                ? `Showing all ${total} utensils`
                : `Showing ${utensils.length} of ${total} utensils`;
    }

    if (utensils.length === 0) {
        grid.innerHTML = `
            <div class="iu-empty">
                <span class="iu-empty-icon" aria-hidden="true">🔍</span>
                <h3>No utensils found</h3>
                <p>Try adjusting the material filter, region filter, or search term.</p>
            </div>
        `;
        return;
    }

    grid.innerHTML = utensils.map(u => `
        <article
            class="iu-card"
            tabindex="0"
            role="button"
            aria-label="Learn more about ${u.name}"
            data-id="${u.id}"
        >
            <span class="iu-card-emoji" aria-hidden="true">${u.emoji}</span>
            <div class="iu-card-badges">
                <span class="iu-badge-material">${u.material}</span>
                <span class="iu-badge-region">${u.region}</span>
            </div>
            <h2 class="iu-card-name">${u.name}</h2>
            <p class="iu-card-desc">${u.description}</p>
            <span class="iu-card-cta" aria-hidden="true">Explore details →</span>
        </article>
    `).join('');

    // Attach click and keyboard listeners
    grid.querySelectorAll('.iu-card').forEach(card => {
        card.addEventListener('click', () => openUtensilModal(card.dataset.id));
        card.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openUtensilModal(card.dataset.id);
            }
        });
    });
}

/* ============================================================
   Modal — open
   ============================================================ */
function openUtensilModal(utensilId) {
    const overlay = $('iu-modal-overlay');
    const modal   = $('iu-modal');
    if (!overlay || !modal || typeof INDIAN_UTENSILS_DATA === 'undefined') return;

    const utensil = INDIAN_UTENSILS_DATA.utensils.find(u => u.id === utensilId);
    if (!utensil) return;

    _activeModalId  = utensilId;
    _lastFocusedEl  = document.activeElement;

    // Populate modal content
    _renderModalContent(utensil);

    overlay.classList.add('is-open');
    overlay.setAttribute('aria-hidden', 'false');
    modal.setAttribute('aria-modal', 'true');
    document.body.style.overflow = 'hidden';

    // Focus the close button
    const closeBtn = $('iu-modal-close');
    if (closeBtn) closeBtn.focus();
}

/* ============================================================
   Modal — render content
   ============================================================ */
function _renderModalContent(utensil) {
    const modal = $('iu-modal');
    if (!modal) return;

    modal.innerHTML = `
        <div class="iu-modal-header">
            <span class="iu-modal-emoji" aria-hidden="true">${utensil.emoji}</span>
            <div class="iu-modal-title-group">
                <h2 class="iu-modal-title">${utensil.name}</h2>
                <div class="iu-modal-badges">
                    <span class="iu-badge-material">${utensil.material}</span>
                    <span class="iu-badge-region">${utensil.region}</span>
                </div>
            </div>
            <button
                class="iu-modal-close"
                id="iu-modal-close"
                aria-label="Close details for ${utensil.name}"
                type="button"
            >✕</button>
        </div>

        <div class="iu-modal-body">
            <div class="iu-modal-section">
                <h3><i class="fa-solid fa-circle-info" aria-hidden="true"></i> About</h3>
                <p>${utensil.description}</p>
            </div>

            <div class="iu-modal-section">
                <h3><i class="fa-solid fa-fire-flame-curved" aria-hidden="true"></i> Cooking Practices</h3>
                <p>${utensil.cookingPractices}</p>
            </div>

            <div class="iu-modal-section">
                <h3><i class="fa-solid fa-landmark" aria-hidden="true"></i> Cultural Significance</h3>
                <p>${utensil.culturalSignificance}</p>
            </div>

            <div class="iu-modal-section iu-fun-fact">
                <h3><i class="fa-solid fa-lightbulb" aria-hidden="true"></i> Did You Know?</h3>
                <p>${utensil.funFact}</p>
            </div>

            <div class="iu-modal-credit">
                <i class="fa-solid fa-image" aria-hidden="true"></i>
                <span>Image Credit: <a href="${utensil.imageCredit.url}" target="_blank" rel="noopener noreferrer">${utensil.imageCredit.text}</a></span>
            </div>
        </div>
    `;

    // Attach close button listener
    const closeBtn = $('iu-modal-close');
    if (closeBtn) closeBtn.addEventListener('click', closeUtensilModal);
}

/* ============================================================
   Modal — close
   ============================================================ */
function closeUtensilModal() {
    const overlay = $('iu-modal-overlay');
    if (!overlay) return;

    overlay.classList.remove('is-open');
    overlay.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    _activeModalId = null;

    // Return focus to the triggering element
    if (_lastFocusedEl && typeof _lastFocusedEl.focus === 'function') {
        _lastFocusedEl.focus();
    }
}

/* ============================================================
   Modal — keyboard handling
   ============================================================ */
function _initModalKeyboard() {
    const overlay = $('iu-modal-overlay');
    if (!overlay) return;

    // Close on overlay background click
    overlay.addEventListener('click', e => {
        if (e.target === overlay) closeUtensilModal();
    });

    // Escape key closes modal
    document.addEventListener('keydown', e => {
        if (e.key === 'Escape' && _activeModalId !== null) {
            e.preventDefault();
            closeUtensilModal();
        }

        // Focus trap inside modal
        if (_activeModalId !== null && e.key === 'Tab') {
            const modal = $('iu-modal');
            if (!modal) return;
            const focusable = modal.querySelectorAll(
                'button, a[href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            const first = focusable[0];
            const last  = focusable[focusable.length - 1];
            if (!focusable.length) return;

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
   Sources section
   ============================================================ */
function _renderSources() {
    const container = $('iu-sources-list');
    if (!container || typeof INDIAN_UTENSILS_DATA === 'undefined') return;

    container.innerHTML = INDIAN_UTENSILS_DATA.sources.map(src => `
        <li class="iu-source-item">
            <a href="${src.url}" target="_blank" rel="noopener noreferrer">
                <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                ${src.title}
            </a>
        </li>
    `).join('');
}

/* ============================================================
   Initialise on DOMContentLoaded
   ============================================================ */
document.addEventListener('DOMContentLoaded', initUtensils);
