import { 
    INDIAN_SUPERLATIVES_DATA, 
    filterSuperlatives, 
    getSuperlativeBadgeClass, 
    getComparisonData 
} from './data.js';

export { 
    INDIAN_SUPERLATIVES_DATA, 
    filterSuperlatives, 
    getSuperlativeBadgeClass, 
    getComparisonData 
};

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('superlatives-app');
    if (!appContainer) return;

    let currentTypeFilter = 'all';
    let currentCategoryFilter = 'all';
    let currentSearchQuery = '';
    let currentViewMode = 'grid'; // 'grid' | 'infographics' | 'map'
    let currentFilteredData = [...INDIAN_SUPERLATIVES_DATA];

    function renderLayout() {
        const layoutHtml = `
            <header class="super-hero">
                <div class="hero-badge">🏆 Records & Superlatives Hub</div>
                <h1 class="hero-title">Indian Superlatives <span>Explorer</span></h1>
                <p class="hero-subtitle">Discover the largest, highest, longest, and oldest wonders of India — from towering Himalayan peaks and ancient cities to mega infrastructure and world record stadiums.</p>
                
                <div class="hero-metrics-bar">
                    <div class="metric-chip">
                        <span class="metric-value">${INDIAN_SUPERLATIVES_DATA.length}</span>
                        <span class="metric-label">National Superlatives</span>
                    </div>
                    <div class="metric-chip">
                        <span class="metric-value">4</span>
                        <span class="metric-label">Record Types (Largest, Highest, Longest, Oldest)</span>
                    </div>
                    <div class="metric-chip">
                        <span class="metric-value">15+</span>
                        <span class="metric-label">States & UTs Featured</span>
                    </div>
                </div>
            </header>

            <section class="controls-section">
                <!-- Type Tabs -->
                <div class="type-tabs" role="tablist" aria-label="Filter by Superlative Type">
                    <button class="tab-btn active" data-type="all" role="tab" aria-selected="true">✨ All Records</button>
                    <button class="tab-btn" data-type="largest" role="tab" aria-selected="false">🐘 Largest</button>
                    <button class="tab-btn" data-type="highest" role="tab" aria-selected="false">🏔️ Highest</button>
                    <button class="tab-btn" data-type="longest" role="tab" aria-selected="false">🛣️ Longest</button>
                    <button class="tab-btn" data-type="oldest" role="tab" aria-selected="false">🏛️ Oldest</button>
                </div>

                <div class="filter-toolbar">
                    <div class="search-box-wrapper">
                        <svg class="icon-search" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input 
                            type="search" 
                            id="superlative-search" 
                            placeholder="Search by name, state, record (e.g. 'Ganga', 'Stadium', 'Tehri', 'Varanasi')..." 
                            aria-label="Search Indian Superlatives"
                            autocomplete="off"
                        />
                        <button id="btn-clear-search" class="btn-clear" style="display: none;" aria-label="Clear Search">&times;</button>
                    </div>

                    <div class="category-select-wrapper">
                        <label for="category-filter">Category:</label>
                        <select id="category-filter" aria-label="Filter by Category">
                            <option value="all">All Categories</option>
                            <option value="Geography & Nature">🌿 Geography & Nature</option>
                            <option value="Architecture & Monuments">🏛️ Architecture & Monuments</option>
                            <option value="Infrastructure & Engineering">🌉 Infrastructure & Engineering</option>
                            <option value="History & Culture">📜 History & Culture</option>
                            <option value="Sports & Society">🏟️ Sports & Society</option>
                        </select>
                    </div>

                    <div class="view-mode-toggle">
                        <button class="view-btn active" data-view="grid" title="Grid View" aria-label="Grid View">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                            <span>Cards</span>
                        </button>
                        <button class="view-btn" data-view="infographics" title="Infographics View" aria-label="Infographics View">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"></line><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line></svg>
                            <span>Infographics</span>
                        </button>
                        <button class="view-btn" data-view="map" title="Map Visualization View" aria-label="Map View">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6"></polygon><line x1="8" y1="2" x2="8" y2="18"></line><line x1="16" y1="6" x2="16" y2="22"></line></svg>
                            <span>Map</span>
                        </button>
                    </div>
                </div>

                <div class="results-meta">
                    Showing <strong id="visible-count">${INDIAN_SUPERLATIVES_DATA.length}</strong> record-breaking superlatives
                </div>
            </section>

            <main id="view-container" class="view-container">
                <!-- Injected based on active view mode -->
            </main>

            <div id="detail-modal-overlay" class="modal-overlay" aria-hidden="true"></div>
        `;

        appContainer.innerHTML = layoutHtml;
        attachEventListeners();
        applyFiltersAndRender();
    }

    function applyFiltersAndRender() {
        const searchInput = document.getElementById('superlative-search');
        const clearBtn = document.getElementById('btn-clear-search');
        
        currentSearchQuery = searchInput ? searchInput.value : '';

        if (clearBtn) {
            clearBtn.style.display = currentSearchQuery.trim().length > 0 ? 'inline-block' : 'none';
        }

        currentFilteredData = filterSuperlatives(
            INDIAN_SUPERLATIVES_DATA, 
            currentSearchQuery, 
            currentTypeFilter, 
            currentCategoryFilter
        );

        const countEl = document.getElementById('visible-count');
        if (countEl) countEl.textContent = currentFilteredData.length;

        const viewContainer = document.getElementById('view-container');
        if (!viewContainer) return;

        if (currentFilteredData.length === 0) {
            renderEmptyState(viewContainer);
            return;
        }

        if (currentViewMode === 'grid') {
            renderGridView(viewContainer);
        } else if (currentViewMode === 'infographics') {
            renderInfographicsView(viewContainer);
        } else if (currentViewMode === 'map') {
            renderMapView(viewContainer);
        }
    }

    function renderGridView(container) {
        const cardsHtml = currentFilteredData.map(item => {
            const badgeClass = getSuperlativeBadgeClass(item.type);
            const keyStatSnippet = item.keyStats.map(s => `
                <div class="stat-pill">
                    <span class="stat-pill-label">${s.label}:</span>
                    <span class="stat-pill-val">${s.value}</span>
                </div>
            `).join('');

            return `
                <article class="super-card" data-id="${item.id}">
                    <div class="card-image-wrap">
                        <img 
                            src="${item.image}" 
                            alt="${item.name}" 
                            class="card-img"
                            loading="lazy"
                            onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'400\\' height=\\'250\\' viewBox=\\'0 0 100 100\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%231e293b\\'/><text x=\\'50%\\' y=\\'55%\\' fill=\\'%23f59e0b\\' font-size=\\'24\\' text-anchor=\\'middle\\'>🏆</text></svg>';"
                        />
                        <span class="type-badge ${badgeClass}">${item.typeLabel}</span>
                        <div class="card-location-tag">📍 ${item.state}</div>
                    </div>
                    
                    <div class="card-content">
                        <div class="card-category-tag">${item.category}</div>
                        <h3 class="card-title">${item.title}</h3>
                        <div class="card-name">${item.name}</div>
                        
                        <div class="card-highlight-value">
                            <span class="val-label">Record:</span>
                            <span class="val-number">${item.value}</span>
                        </div>

                        <p class="card-desc">${item.description}</p>
                        
                        <div class="card-stats-grid">
                            ${keyStatSnippet}
                        </div>
                    </div>

                    <div class="card-footer">
                        <button class="btn-card-details" data-action="open-modal" data-id="${item.id}">
                            <span>View Full Infographic & Facts</span>
                            <svg class="icon-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                        </button>
                    </div>
                </article>
            `;
        }).join('');

        container.innerHTML = `
            <div class="cards-grid">
                ${cardsHtml}
            </div>
        `;
    }

    function renderInfographicsView(container) {
        const types = ['highest', 'longest', 'largest', 'oldest'];
        let sectionsHtml = '';

        types.forEach(type => {
            const items = getComparisonData(currentFilteredData, type);
            if (items.length === 0) return;

            const maxValue = Math.max(...items.map(i => i.numericValue || 1));
            
            const barsHtml = items.map(item => {
                const percentage = Math.max(12, Math.min(100, (item.numericValue / maxValue) * 100));
                const badgeClass = getSuperlativeBadgeClass(item.type);

                return `
                    <div class="infographic-bar-row" data-action="open-modal" data-id="${item.id}">
                        <div class="bar-info">
                            <span class="bar-title">${item.name}</span>
                            <span class="bar-subtitle">(${item.title} • ${item.state})</span>
                        </div>
                        <div class="bar-track">
                            <div class="bar-fill ${badgeClass}" style="width: ${percentage}%;">
                                <span class="bar-value-text">${item.value}</span>
                            </div>
                        </div>
                    </div>
                `;
            }).join('');

            const typeHeading = type.charAt(0).toUpperCase() + type.slice(1);

            sectionsHtml += `
                <div class="infographic-block">
                    <h3 class="infographic-type-title"><span class="bullet-icon">📊</span> Scale Comparison: ${typeHeading} Superlatives</h3>
                    <div class="infographic-bars-container">
                        ${barsHtml}
                    </div>
                </div>
            `;
        });

        container.innerHTML = `
            <div class="infographics-view-wrapper">
                <div class="infographics-header">
                    <h2>Comparative Scale Infographics</h2>
                    <p>Visualizing scale, elevation, length, and antiquity across filtered superlatives.</p>
                </div>
                ${sectionsHtml}
            </div>
        `;
    }

    function renderMapView(container) {
        const pinsHtml = currentFilteredData.map(item => {
            const badgeClass = getSuperlativeBadgeClass(item.type);
            return `
                <div 
                    class="map-pin-marker ${badgeClass}" 
                    style="left: ${item.mapCoords.x}%; top: ${item.mapCoords.y}%;"
                    data-action="open-modal"
                    data-id="${item.id}"
                    title="${item.name} (${item.title})"
                >
                    <div class="pin-pulse"></div>
                    <div class="pin-icon">📍</div>
                    <div class="pin-tooltip">
                        <strong>${item.name}</strong>
                        <span>${item.title}</span>
                        <span class="pin-val">${item.value}</span>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="map-view-wrapper">
                <div class="map-header">
                    <h2>Geographical Map Visualization</h2>
                    <p>Explore where India's record-breaking landmarks and wonders are geographically situated.</p>
                </div>
                
                <div class="india-map-container">
                    <div class="map-svg-background">
                        <svg viewBox="0 0 800 900" xmlns="http://www.w3.org/2000/svg" class="map-svg">
                            <!-- Abstract India Outline Graphic -->
                            <path d="M 400 50 L 520 120 L 600 220 L 720 300 L 750 380 L 620 450 L 600 550 L 520 680 L 420 850 L 350 820 L 280 650 L 200 520 L 120 400 L 150 300 L 220 220 L 300 120 Z" fill="#1e293b" stroke="#334155" stroke-width="3" opacity="0.6"/>
                        </svg>
                    </div>
                    <div class="map-pins-layer">
                        ${pinsHtml}
                    </div>
                </div>
            </div>
        `;
    }

    function renderEmptyState(container) {
        container.innerHTML = `
            <div class="empty-state-card">
                <div class="empty-icon">⌕</div>
                <h3>No Superlatives Found</h3>
                <p>No records matched your search query or active filter settings.</p>
                <button id="btn-reset-filters" class="btn-reset">Reset All Filters</button>
            </div>
        `;

        const resetBtn = document.getElementById('btn-reset-filters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                currentTypeFilter = 'all';
                currentCategoryFilter = 'all';
                currentSearchQuery = '';
                
                const searchInput = document.getElementById('superlative-search');
                const catSelect = document.getElementById('category-filter');
                if (searchInput) searchInput.value = '';
                if (catSelect) catSelect.value = 'all';
                
                document.querySelectorAll('.tab-btn').forEach(btn => {
                    btn.classList.toggle('active', btn.dataset.type === 'all');
                });

                applyFiltersAndRender();
            });
        }
    }

    function openModal(id) {
        const item = INDIAN_SUPERLATIVES_DATA.find(i => i.id === id);
        const modalOverlay = document.getElementById('detail-modal-overlay');
        if (!item || !modalOverlay) return;

        const badgeClass = getSuperlativeBadgeClass(item.type);
        const statsRows = item.keyStats.map(s => `
            <div class="modal-stat-row">
                <span class="stat-name">${s.label}</span>
                <span class="stat-val">${s.value}</span>
            </div>
        `).join('');

        const factsList = item.facts.map(f => `
            <li><span class="bullet-star">⭐</span> <span>${f}</span></li>
        `).join('');

        modalOverlay.innerHTML = `
            <div class="modal-card" role="dialog" aria-modal="true">
                <button class="modal-close" id="modal-close-btn" aria-label="Close Modal">&times;</button>
                
                <div class="modal-hero-img-wrap">
                    <img 
                        src="${item.image}" 
                        alt="${item.name}" 
                        class="modal-hero-img"
                        onerror="this.onerror=null; this.src='data:image/svg+xml;utf8,<svg xmlns=\\'http://www.w3.org/2000/svg\\' width=\\'600\\' height=\\'300\\' viewBox=\\'0 0 100 100\\'><rect width=\\'100%\\' height=\\'100%\\' fill=\\'%231e293b\\'/><text x=\\'50%\\' y=\\'55%\\' fill=\\'%23f59e0b\\' font-size=\\'24\\' text-anchor=\\'middle\\'>🏆</text></svg>';"
                    />
                    <span class="type-badge ${badgeClass}">${item.typeLabel}</span>
                </div>

                <div class="modal-content-body">
                    <div class="modal-category">${item.category} • 📍 ${item.state}</div>
                    <h2 class="modal-title">${item.title}</h2>
                    <h3 class="modal-name">${item.name}</h3>

                    <div class="modal-record-callout">
                        <span class="callout-label">Official Record / Measurement:</span>
                        <span class="callout-value">${item.value}</span>
                    </div>

                    <p class="modal-description">${item.description}</p>

                    <div class="modal-section-grid">
                        <div class="modal-section-box">
                            <h4><span class="icon">📊</span> Key Specifications & Data</h4>
                            <div class="modal-stats-table">
                                ${statsRows}
                            </div>
                        </div>

                        <div class="modal-section-box">
                            <h4><span class="icon">💡</span> Fascinating Record Facts</h4>
                            <ul class="modal-facts-list">
                                ${factsList}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        `;

        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        const closeBtn = document.getElementById('modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
    }

    function closeModal() {
        const modalOverlay = document.getElementById('detail-modal-overlay');
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function attachEventListeners() {
        // Type Tabs
        document.querySelectorAll('.tab-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentTypeFilter = btn.dataset.type;
                applyFiltersAndRender();
            });
        });

        // Search Input
        const searchInput = document.getElementById('superlative-search');
        if (searchInput) {
            searchInput.addEventListener('input', applyFiltersAndRender);
        }

        const clearBtn = document.getElementById('btn-clear-search');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (searchInput) {
                    searchInput.value = '';
                    applyFiltersAndRender();
                    searchInput.focus();
                }
            });
        }

        // Category Filter Dropdown
        const categorySelect = document.getElementById('category-filter');
        if (categorySelect) {
            categorySelect.addEventListener('change', (e) => {
                currentCategoryFilter = e.target.value;
                applyFiltersAndRender();
            });
        }

        // View Mode Toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentViewMode = btn.dataset.view;
                applyFiltersAndRender();
            });
        });

        // Card / Map / Infographic Click for Modal
        if (appContainer) {
            appContainer.addEventListener('click', (e) => {
                const actionTrigger = e.target.closest('[data-action="open-modal"]');
                if (actionTrigger) {
                    const id = actionTrigger.getAttribute('data-id');
                    openModal(id);
                    return;
                }

                const card = e.target.closest('.super-card');
                if (card && !e.target.closest('button')) {
                    const id = card.getAttribute('data-id');
                    openModal(id);
                }
            });
        }

        const modalOverlay = document.getElementById('detail-modal-overlay');
        if (modalOverlay) {
            modalOverlay.addEventListener('click', (e) => {
                if (e.target === modalOverlay) closeModal();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // Initial Render
    renderLayout();
});
