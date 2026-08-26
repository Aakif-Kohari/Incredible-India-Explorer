/**
 * Yoga — India's Global Cultural Heritage — Interactive Controller
 * Issue #2939: Y: Yoga — India's Global Cultural Heritage
 *
 * Exposes: initYogaExplorer, renderTimeline, filterTimeline, selectTimelineEntry
 */

/* ============================================================
   State
   ============================================================ */
let _activeEpochFilter = 'All Epochs';
let _selectedTimelineId = 'epoch-4'; // Default selected: Patanjali Classical Codification

/* ============================================================
   DOM Helpers
   ============================================================ */
function $(id) { return document.getElementById(id); }

/* ============================================================
   Entry Point
   ============================================================ */
function initYogaExplorer() {
    if (typeof YOGA_DATA === 'undefined') return;

    _populateHeroStats();
    _renderHistoryOverview();
    _renderTraditions();
    _renderPhilosophy();
    _renderPractices();
    _renderTexts();
    _initTimelineFilters();
    renderTimeline(YOGA_DATA.timelineEntries);
    _renderModernGlobal();
    _renderSources();
}

/* ============================================================
   Hero Stats
   ============================================================ */
function _populateHeroStats() {
    const data = YOGA_DATA;
    const tradEl   = $('yoga-stat-traditions');
    const textsEl  = $('yoga-stat-texts');
    const epochsEl = $('yoga-stat-epochs');
    const globalEl = $('yoga-stat-global');

    if (tradEl)   tradEl.textContent   = data.meta.totalTraditions;
    if (textsEl)  textsEl.textContent  = data.meta.coreTexts;
    if (epochsEl) epochsEl.textContent = data.meta.historicalEpochs;
    if (globalEl) globalEl.textContent = data.meta.globalMilestones;
}

/* ============================================================
   Historical Overview
   ============================================================ */
function _renderHistoryOverview() {
    const container = $('yoga-history-container');
    if (!container || typeof YOGA_DATA === 'undefined') return;

    const h = YOGA_DATA.historyOverview;
    container.innerHTML = `
        <div class="yoga-history-box">
            <p class="yoga-history-lead">${h.summary}</p>
            <div class="yoga-epochs-chips" aria-label="Historical epochs overview">
                ${h.epochsList.map(ep => `<span class="yoga-epoch-chip">${ep}</span>`).join('')}
            </div>
        </div>
    `;
}

/* ============================================================
   Major Traditions
   ============================================================ */
function _renderTraditions() {
    const container = $('yoga-traditions-grid');
    if (!container || typeof YOGA_DATA === 'undefined') return;

    container.innerHTML = YOGA_DATA.traditions.map(t => `
        <article class="yoga-tradition-card" id="${t.id}">
            <span class="yoga-tradition-icon" role="img" aria-label="${t.name}">${t.icon}</span>
            <h3 class="yoga-tradition-title">${t.name}</h3>
            <p class="yoga-tradition-sanskrit">${t.sanskritName}</p>
            <span class="yoga-tradition-period">${t.period}</span>
            <p class="yoga-tradition-desc">${t.description}</p>
            <div class="yoga-tradition-meta">
                <p><strong>Core Focus:</strong> ${t.focus}</p>
                <p style="margin-top: 4px;"><strong>Key Text:</strong> ${t.coreTexts}</p>
            </div>
        </article>
    `).join('');
}

/* ============================================================
   Yoga Philosophy
   ============================================================ */
function _renderPhilosophy() {
    const container = $('yoga-philosophy-grid');
    if (!container || typeof YOGA_DATA === 'undefined') return;

    container.innerHTML = YOGA_DATA.philosophyConcepts.map(c => `
        <article class="yoga-philosophy-card">
            <span class="yoga-concept-cat">${c.category}</span>
            <h3>${c.title}</h3>
            <p class="yoga-concept-sanskrit">${c.sanskrit}</p>
            <p>${c.description}</p>
        </article>
    `).join('');
}

/* ============================================================
   Traditional Practices
   ============================================================ */
function _renderPractices() {
    const container = $('yoga-practices-grid');
    if (!container || typeof YOGA_DATA === 'undefined') return;

    container.innerHTML = YOGA_DATA.practices.map(p => `
        <article class="yoga-practice-card">
            <span class="yoga-practice-icon" role="img" aria-label="${p.name}">${p.icon}</span>
            <h3>${p.name}</h3>
            <p class="yoga-practice-sanskrit">${p.sanskrit}</p>
            <p>${p.summary}</p>
            <ul class="yoga-practice-list" aria-label="Key aspects of ${p.name}">
                ${p.keyAspects.map(k => `<li>${k}</li>`).join('')}
            </ul>
        </article>
    `).join('');
}

/* ============================================================
   Important Texts
   ============================================================ */
function _renderTexts() {
    const container = $('yoga-texts-container');
    if (!container || typeof YOGA_DATA === 'undefined') return;

    container.innerHTML = YOGA_DATA.texts.map(t => `
        <article class="yoga-text-card" id="${t.id}">
            <div class="yoga-text-card-header">
                <div>
                    <h3 class="yoga-text-title">${t.title} <span class="yoga-text-sanskrit">(${t.sanskrit})</span></h3>
                    <p style="font-size: 0.8rem; color: var(--yoga-text-dim); margin-top: 2px;">Author/Attribution: ${t.author}</p>
                </div>
                <span class="yoga-text-meta">${t.dateLabel}</span>
            </div>
            <p class="yoga-text-summary"><strong>Significance:</strong> ${t.significance}</p>
            <p class="yoga-text-summary">${t.summary}</p>
            <div class="yoga-text-quote">
                💬 "${t.keyQuote}"
            </div>
        </article>
    `).join('');
}

/* ============================================================
   Timeline Filter Buttons
   ============================================================ */
function _initTimelineFilters() {
    const filterContainer = $('yoga-timeline-filter-bar');
    if (!filterContainer || typeof YOGA_DATA === 'undefined') return;

    const categories = ['All Epochs', 'Ancient Roots', 'Classical Era', 'Medieval Synthesis', 'Modern & Global Era'];

    filterContainer.innerHTML = categories.map(cat => `
        <button
            type="button"
            class="yoga-epoch-btn ${cat === _activeEpochFilter ? 'is-active' : ''}"
            data-category="${cat}"
            aria-pressed="${cat === _activeEpochFilter}"
        >${cat}</button>
    `).join('');

    filterContainer.querySelectorAll('.yoga-epoch-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            _activeEpochFilter = btn.dataset.category;
            filterContainer.querySelectorAll('.yoga-epoch-btn').forEach(b => {
                const isActive = b.dataset.category === _activeEpochFilter;
                b.classList.toggle('is-active', isActive);
                b.setAttribute('aria-pressed', isActive ? 'true' : 'false');
            });
            filterTimeline(_activeEpochFilter);
        });
    });
}

function filterTimeline(category) {
    if (typeof YOGA_DATA === 'undefined') return;

    const filtered = YOGA_DATA.timelineEntries.filter(entry => {
        return category === 'All Epochs' || entry.epochCategory === category;
    });

    renderTimeline(filtered);
}

/* ============================================================
   Render Timeline
   ============================================================ */
function renderTimeline(entries) {
    const container = $('yoga-timeline-container');
    if (!container) return;

    if (!entries || entries.length === 0) {
        container.innerHTML = `
            <div style="text-align: center; padding: 40px; color: var(--yoga-text-muted);">
                No timeline entries found for this epoch category.
            </div>
        `;
        return;
    }

    container.innerHTML = entries.map(entry => {
        const isSelected = entry.id === _selectedTimelineId;
        return `
            <div class="yoga-timeline-item ${isSelected ? 'is-selected' : ''}" id="item-${entry.id}">
                <div
                    class="yoga-timeline-node"
                    tabindex="0"
                    role="button"
                    aria-expanded="${isSelected}"
                    aria-label="Select timeline epoch ${entry.periodLabel}: ${entry.title}"
                    data-id="${entry.id}"
                ></div>
                <article
                    class="yoga-timeline-card"
                    tabindex="0"
                    role="button"
                    aria-expanded="${isSelected}"
                    data-id="${entry.id}"
                >
                    <span class="yoga-timeline-period">${entry.periodLabel} • ${entry.epochCategory}</span>
                    <h3>${entry.title}</h3>
                    <p class="yoga-timeline-desc">${entry.description}</p>
                    <div class="yoga-timeline-details">
                        <p><strong>Historical Significance:</strong> ${entry.significance}</p>
                        <p class="yoga-timeline-source">Source Reference: ${entry.sources}</p>
                    </div>
                </article>
            </div>
        `;
    }).join('');

    // Attach click and keyboard events
    container.querySelectorAll('.yoga-timeline-card, .yoga-timeline-node').forEach(el => {
        const trigger = () => selectTimelineEntry(el.dataset.id);
        el.addEventListener('click', trigger);
        el.addEventListener('keydown', e => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                trigger();
            }
        });
    });
}

function selectTimelineEntry(id) {
    _selectedTimelineId = (_selectedTimelineId === id) ? null : id; // Toggle collapse/expand

    const container = $('yoga-timeline-container');
    if (!container) return;

    container.querySelectorAll('.yoga-timeline-item').forEach(item => {
        const itemId = item.id.replace('item-', '');
        const isSelected = itemId === _selectedTimelineId;
        item.classList.toggle('is-selected', isSelected);

        const node = item.querySelector('.yoga-timeline-node');
        const card = item.querySelector('.yoga-timeline-card');
        if (node) node.setAttribute('aria-expanded', isSelected ? 'true' : 'false');
        if (card) card.setAttribute('aria-expanded', isSelected ? 'true' : 'false');
    });
}

/* ============================================================
   Modern Global Presence & Sources
   ============================================================ */
function _renderModernGlobal() {
    const container = $('yoga-modern-grid');
    if (!container || typeof YOGA_DATA === 'undefined') return;

    const m = YOGA_DATA.modernGlobal;

    container.innerHTML = `
        <article class="yoga-modern-card">
            <h3><i class="fa-solid fa-award" aria-hidden="true"></i> ${m.unescoTitle}</h3>
            <p>${m.unescoDescription}</p>
            <ul class="yoga-modern-list">
                ${m.unescoPoints.map(pt => `<li>${pt}</li>`).join('')}
            </ul>
        </article>

        <article class="yoga-modern-card">
            <h3><i class="fa-solid fa-globe" aria-hidden="true"></i> ${m.unDayTitle}</h3>
            <p>${m.unDayDescription}</p>
            <p style="margin-top: 10px; font-size: 0.85rem; color: var(--yoga-teal-light);">
                <strong>Ministry of AYUSH Protocol:</strong> ${m.ayushNote}
            </p>
        </article>
    `;
}

function _renderSources() {
    const container = $('yoga-sources-list');
    if (!container || typeof YOGA_DATA === 'undefined') return;

    container.innerHTML = YOGA_DATA.sources.map(src => `
        <li class="yoga-source-item">
            <a href="${src.url}" target="_blank" rel="noopener noreferrer">
                <i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>
                ${src.title}
            </a>
        </li>
    `).join('');
}

/* ============================================================
   DOM Ready
   ============================================================ */
document.addEventListener('DOMContentLoaded', initYogaExplorer);
