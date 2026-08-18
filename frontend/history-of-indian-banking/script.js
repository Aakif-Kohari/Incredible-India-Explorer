import { 
    BANKING_TIMELINE_DATA, 
    filterBankingTimeline, 
    getBankingEraBadgeClass, 
    getUPIInfographicData, 
    getPresidencyFlowData 
} from './data.js';

export { 
    BANKING_TIMELINE_DATA, 
    filterBankingTimeline, 
    getBankingEraBadgeClass, 
    getUPIInfographicData, 
    getPresidencyFlowData 
};

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('banking-history-app');
    if (!appContainer) return;

    let currentEraFilter = 'all';
    let currentSearchQuery = '';
    let currentViewMode = 'timeline'; // 'timeline' | 'infographics'
    let currentFilteredData = [...BANKING_TIMELINE_DATA];

    function renderLayout() {
        const layoutHtml = `
            <header class="banking-hero">
                <div class="hero-badge">🏦 Financial Heritage & Innovation</div>
                <h1 class="hero-title">History of <span>Indian Banking</span></h1>
                <p class="hero-subtitle">From colonial Presidency Banks and Imperial amalgamation to Bank Nationalization, 1991 Liberalization, and the global UPI Digital Revolution.</p>

                <div class="hero-stats-bar">
                    <div class="stat-chip">
                        <span class="stat-num">220+ Years</span>
                        <span class="stat-lbl">Banking History (1806–Present)</span>
                    </div>
                    <div class="stat-chip">
                        <span class="stat-num">7 Key Eras</span>
                        <span class="stat-lbl">From Presidency to UPI</span>
                    </div>
                    <div class="stat-chip">
                        <span class="stat-num">#1 Global</span>
                        <span class="stat-lbl">Real-Time Digital Payments</span>
                    </div>
                </div>
            </header>

            <section class="controls-section">
                <!-- Era Tabs -->
                <div class="era-tabs" role="tablist" aria-label="Filter by Banking Era">
                    <button class="era-tab active" data-era="all" role="tab">All Eras</button>
                    <button class="era-tab" data-era="presidency" role="tab">🏛️ Presidency Banks</button>
                    <button class="era-tab" data-era="imperial" role="tab">🏢 Imperial Bank</button>
                    <button class="era-tab" data-era="rbi" role="tab">⚖️ RBI Formation</button>
                    <button class="era-tab" data-era="nationalization" role="tab">🔑 Bank Nationalization</button>
                    <button class="era-tab" data-era="liberalization" role="tab">📈 Liberalization</button>
                    <button class="era-tab" data-era="upi" role="tab">📲 Digital & UPI Revolution</button>
                </div>

                <div class="filter-toolbar">
                    <div class="search-wrapper">
                        <svg class="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
                        <input 
                            type="search" 
                            id="banking-search" 
                            placeholder="Search milestones, banks, years, reforms (e.g. 'SBI', '1969', 'UPI', 'Narasimham')..." 
                            aria-label="Search Banking History"
                            autocomplete="off"
                        />
                        <button id="btn-clear-search" class="btn-clear" style="display: none;" aria-label="Clear search">&times;</button>
                    </div>

                    <div class="view-mode-toggle">
                        <button class="view-btn active" data-view="timeline" aria-label="Timeline View">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="20" x2="12" y2="4"></line><line x1="6" y1="20" x2="6" y2="14"></line><line x1="18" y1="20" x2="18" y2="10"></line></svg>
                            <span>Interactive Timeline</span>
                        </button>
                        <button class="view-btn" data-view="infographics" aria-label="Infographics View">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>
                            <span>Infographics & Flowcharts</span>
                        </button>
                    </div>
                </div>

                <div class="results-counter">
                    Showing <strong id="visible-milestones-count">${BANKING_TIMELINE_DATA.length}</strong> historical milestones
                </div>
            </section>

            <main id="main-view-root" class="main-view-root">
                <!-- Injected dynamically -->
            </main>

            <div id="banking-modal-overlay" class="modal-overlay" aria-hidden="true"></div>
        `;

        appContainer.innerHTML = layoutHtml;
        attachEventListeners();
        applyFiltersAndRender();
    }

    function applyFiltersAndRender() {
        const searchInput = document.getElementById('banking-search');
        const clearBtn = document.getElementById('btn-clear-search');
        currentSearchQuery = searchInput ? searchInput.value : '';

        if (clearBtn) {
            clearBtn.style.display = currentSearchQuery.trim().length > 0 ? 'inline-block' : 'none';
        }

        currentFilteredData = filterBankingTimeline(BANKING_TIMELINE_DATA, currentSearchQuery, currentEraFilter);

        const countEl = document.getElementById('visible-milestones-count');
        if (countEl) countEl.textContent = currentFilteredData.length;

        const mainRoot = document.getElementById('main-view-root');
        if (!mainRoot) return;

        if (currentFilteredData.length === 0) {
            renderEmptyState(mainRoot);
            return;
        }

        if (currentViewMode === 'timeline') {
            renderTimelineView(mainRoot);
        } else {
            renderInfographicsView(mainRoot);
        }
    }

    function renderTimelineView(container) {
        const milestonesHtml = currentFilteredData.map((item, index) => {
            const sideClass = index % 2 === 0 ? 'left' : 'right';
            const eraBadgeClass = getBankingEraBadgeClass(item.eraId);

            const factsList = item.facts.slice(0, 2).map(f => `<li><span>•</span> ${f}</li>`).join('');

            return `
                <div class="timeline-node ${sideClass}" data-id="${item.id}">
                    <div class="node-dot">${item.icon}</div>
                    <div class="node-card">
                        <div class="card-header">
                            <span class="year-badge">${item.year}</span>
                            <span class="era-badge ${eraBadgeClass}">${item.era}</span>
                        </div>
                        <h3 class="card-title">${item.title}</h3>
                        <p class="card-summary">${item.summary}</p>
                        
                        <div class="card-impact-box">
                            <strong>Key Economic Impact:</strong>
                            <p>${item.keyImpact}</p>
                        </div>

                        <ul class="card-facts-snippet">${factsList}</ul>

                        <div class="card-footer">
                            <button class="btn-read-more" data-action="open-modal" data-id="${item.id}">
                                <span>Explore Historical Details</span>
                                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
                            </button>
                        </div>
                    </div>
                </div>
            `;
        }).join('');

        container.innerHTML = `
            <div class="timeline-container">
                <div class="central-line"></div>
                ${milestonesHtml}
            </div>
        `;
    }

    function renderInfographicsView(container) {
        const presidencyFlow = getPresidencyFlowData();
        const upiData = getUPIInfographicData();

        const flowHtml = presidencyFlow.map(stage => {
            const nodesHtml = stage.nodes.map(n => `<div class="flow-node">${n}</div>`).join('<div class="flow-plus">+</div>');
            return `
                <div class="flow-stage-card">
                    <h4>${stage.stage}</h4>
                    <div class="flow-nodes-group">
                        ${nodesHtml}
                    </div>
                    <p class="flow-desc">${stage.description}</p>
                </div>
            `;
        }).join('<div class="flow-arrow">➔</div>');

        const upiRowsHtml = upiData.map(row => `
            <div class="upi-data-row">
                <span class="upi-year">${row.year}</span>
                <div class="upi-bar-wrap">
                    <div class="upi-bar-fill" style="width: ${getUPIPercentage(row.year)}%;"></div>
                </div>
                <div class="upi-metrics">
                    <span class="vol">📱 ${row.volume}</span>
                    <span class="val">💰 ${row.value}</span>
                </div>
            </div>
        `).join('');

        container.innerHTML = `
            <div class="infographics-wrapper">
                <!-- Evolution Flowchart -->
                <div class="infographics-section">
                    <div class="section-title-wrap">
                        <h3><span class="icon">🏛️</span> Evolution Flowchart: Presidency Banks to SBI (1806–1955)</h3>
                        <p>How early colonial presidency banks amalgamated into Imperial Bank and eventually transformed into the public sector giant SBI.</p>
                    </div>
                    <div class="flowchart-container">
                        ${flowHtml}
                    </div>
                </div>

                <!-- Nationalization Impact Dashboard -->
                <div class="infographics-section">
                    <div class="section-title-wrap">
                        <h3><span class="icon">🔑</span> Impact of 1969 & 1980 Bank Nationalizations</h3>
                        <p>Structural transformation from elitist commercial lending to social credit for farmers and rural development.</p>
                    </div>
                    <div class="impact-comparison-grid">
                        <div class="impact-box">
                            <span class="impact-num">8,000 ➔ 60,000+</span>
                            <span class="impact-lbl">Bank Branch Expansion (1969 to 1990s)</span>
                        </div>
                        <div class="impact-box">
                            <span class="impact-num">85% ➔ 91%</span>
                            <span class="impact-lbl">Bank Deposits under Public Ownership</span>
                        </div>
                        <div class="impact-box">
                            <span class="impact-num">40% Mandate</span>
                            <span class="impact-lbl">Priority Sector Lending to Agriculture & MSMEs</span>
                        </div>
                    </div>
                </div>

                <!-- UPI Revolution Growth Chart -->
                <div class="infographics-section">
                    <div class="section-title-wrap">
                        <h3><span class="icon">📲</span> UPI Digital Payments Explosion (2016–Present)</h3>
                        <p>Exponential volume and value growth making India global leader in real-time digital payments.</p>
                    </div>
                    <div class="upi-chart-card">
                        ${upiRowsHtml}
                    </div>
                </div>
            </div>
        `;
    }

    function getUPIPercentage(year) {
        if (year.includes('2016')) return 10;
        if (year.includes('2018')) return 25;
        if (year.includes('2020')) return 45;
        if (year.includes('2022')) return 70;
        if (year.includes('2023')) return 88;
        return 100;
    }

    function renderEmptyState(container) {
        container.innerHTML = `
            <div class="empty-state-card">
                <div class="empty-icon">⌕</div>
                <h3>No Milestones Found</h3>
                <p>No historical banking milestones matched your search query or selected era filter.</p>
                <button id="btn-reset-filters" class="btn-reset">Reset All Filters</button>
            </div>
        `;

        const resetBtn = document.getElementById('btn-reset-filters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                currentEraFilter = 'all';
                currentSearchQuery = '';
                
                const searchInput = document.getElementById('banking-search');
                if (searchInput) searchInput.value = '';
                
                document.querySelectorAll('.era-tab').forEach(t => {
                    t.classList.toggle('active', t.dataset.era === 'all');
                });

                applyFiltersAndRender();
            });
        }
    }

    function openModal(id) {
        const item = BANKING_TIMELINE_DATA.find(m => m.id === id);
        const overlay = document.getElementById('banking-modal-overlay');
        if (!item || !overlay) return;

        const eraBadgeClass = getBankingEraBadgeClass(item.eraId);
        const factsHtml = item.facts.map(f => `<li><span class="star">⭐</span> <span>${f}</span></li>`).join('');

        overlay.innerHTML = `
            <div class="modal-card" role="dialog" aria-modal="true">
                <button class="modal-close-btn" id="modal-close-btn" aria-label="Close modal">&times;</button>
                
                <div class="modal-header">
                    <span class="modal-icon">${item.icon}</span>
                    <div>
                        <div class="modal-meta">
                            <span class="modal-year">${item.year}</span>
                            <span class="era-badge ${eraBadgeClass}">${item.era}</span>
                        </div>
                        <h2 class="modal-title">${item.title}</h2>
                    </div>
                </div>

                <div class="modal-body">
                    <div class="modal-section">
                        <h4>📖 Overview & Context</h4>
                        <p>${item.summary}</p>
                    </div>

                    <div class="modal-section">
                        <h4>📜 In-Depth Historical Details</h4>
                        <p>${item.details}</p>
                    </div>

                    <div class="modal-section impact-section">
                        <h4>💡 Economic & Policy Impact</h4>
                        <p>${item.keyImpact}</p>
                    </div>

                    <div class="modal-section">
                        <h4>⭐ Fascinating Trivia & Historical Facts</h4>
                        <ul class="modal-facts-list">${factsHtml}</ul>
                    </div>
                </div>
            </div>
        `;

        overlay.classList.add('active');
        overlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        const closeBtn = document.getElementById('modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
    }

    function closeModal() {
        const overlay = document.getElementById('banking-modal-overlay');
        if (!overlay) return;
        overlay.classList.remove('active');
        overlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
    }

    function attachEventListeners() {
        // Era Tabs
        document.querySelectorAll('.era-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                document.querySelectorAll('.era-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                currentEraFilter = tab.dataset.era;
                applyFiltersAndRender();
            });
        });

        // Search Input
        const searchInput = document.getElementById('banking-search');
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

        // View Mode Toggle
        document.querySelectorAll('.view-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.view-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                currentViewMode = btn.dataset.view;
                applyFiltersAndRender();
            });
        });

        // Click handler for modal triggers
        if (appContainer) {
            appContainer.addEventListener('click', (e) => {
                const actionTrigger = e.target.closest('[data-action="open-modal"]');
                if (actionTrigger) {
                    const id = actionTrigger.getAttribute('data-id');
                    openModal(id);
                    return;
                }

                const nodeCard = e.target.closest('.timeline-node');
                if (nodeCard && !e.target.closest('button')) {
                    const id = nodeCard.getAttribute('data-id');
                    openModal(id);
                }
            });
        }

        const overlay = document.getElementById('banking-modal-overlay');
        if (overlay) {
            overlay.addEventListener('click', (e) => {
                if (e.target === overlay) closeModal();
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') closeModal();
        });
    }

    // Initial render
    renderLayout();
});
