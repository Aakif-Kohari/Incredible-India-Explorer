import { primeMinisters, filterPMData, getPartyBadgeClass, calculateStats } from './data.js';
import { Timeline } from './components/Timeline.js';
import { SearchBar } from './components/SearchBar.js';
import { PartyFilter } from './components/PartyFilter.js';
import { PMModal } from './components/PMModal.js';

export { primeMinisters, filterPMData, getPartyBadgeClass, calculateStats };

document.addEventListener('DOMContentLoaded', () => {
    const appContainer = document.getElementById('pm-timeline-app');
    if (!appContainer) return;

    const stats = calculateStats(primeMinisters);

    const layoutHtml = `
        <header class="timeline-hero">
            <div class="hero-badge">🏛️ Governance & Democracy Hub</div>
            <h1 class="hero-title">Prime Ministers of India</h1>
            <p class="hero-subtitle">An interactive journey through the visionaries, statesmen, and leaders who shaped modern India from 1947 to Present.</p>
            
            <div class="quick-stats-bar">
                <div class="stat-card">
                    <span class="stat-value">${stats.totalTerms}</span>
                    <span class="stat-label">Total Prime Minister Terms</span>
                </div>
                <div class="stat-card">
                    <span class="stat-value">${stats.uniquePrimeMinisters}</span>
                    <span class="stat-label">Distinct Leaders</span>
                </div>
                <div class="stat-card">
                    <span class="stat-value">1947–Present</span>
                    <span class="stat-label">Democracy Timeline</span>
                </div>
            </div>
        </header>

        <section class="controls-section">
            <div class="controls-wrapper">
                ${SearchBar()}
                ${PartyFilter()}
            </div>
            <div id="results-count-bar" class="results-count-bar">
                Showing <strong id="visible-pm-count">${primeMinisters.length}</strong> leaders
            </div>
        </section>

        <section class="timeline-section">
            <div id="timeline-root" class="timeline-root"></div>
        </section>

        <div id="pm-modal-overlay" class="modal-overlay" aria-hidden="true"></div>
    `;

    appContainer.innerHTML = layoutHtml;

    const timelineRoot = document.getElementById('timeline-root');
    const searchInput = document.getElementById('pm-search');
    const clearBtn = document.getElementById('btn-clear-search');
    const partySelect = document.getElementById('party-filter');
    const countDisplay = document.getElementById('visible-pm-count');
    const modalOverlay = document.getElementById('pm-modal-overlay');

    let currentFilteredData = [...primeMinisters];

    function render(data) {
        currentFilteredData = data;
        if (countDisplay) countDisplay.textContent = data.length;

        timelineRoot.style.opacity = '0';
        timelineRoot.style.transform = 'translateY(10px)';

        setTimeout(() => {
            timelineRoot.innerHTML = Timeline(data);
            timelineRoot.style.opacity = '1';
            timelineRoot.style.transform = 'translateY(0)';
            attachResetListener();
        }, 120);
    }

    function applyFilters() {
        const query = searchInput ? searchInput.value : '';
        const selectedParty = partySelect ? partySelect.value : 'all';

        if (clearBtn) {
            clearBtn.style.display = query.trim().length > 0 ? 'inline-flex' : 'none';
        }

        const filtered = filterPMData(primeMinisters, query, selectedParty);
        render(filtered);
    }

    function attachResetListener() {
        const resetBtn = document.getElementById('btn-reset-filters');
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                if (partySelect) partySelect.value = 'all';
                applyFilters();
            });
        }
    }

    function openModal(pmId) {
        const pm = primeMinisters.find(item => item.id === pmId);
        if (!pm || !modalOverlay) return;

        modalOverlay.innerHTML = PMModal(pm);
        modalOverlay.classList.add('active');
        modalOverlay.setAttribute('aria-hidden', 'false');
        document.body.style.overflow = 'hidden';

        const closeBtn = document.getElementById('modal-close-btn');
        if (closeBtn) {
            closeBtn.addEventListener('click', closeModal);
        }
    }

    function closeModal() {
        if (!modalOverlay) return;
        modalOverlay.classList.remove('active');
        modalOverlay.setAttribute('aria-hidden', 'true');
        document.body.style.overflow = '';
        setTimeout(() => {
            modalOverlay.innerHTML = '';
        }, 200);
    }

    // Event listeners
    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }

    if (clearBtn) {
        clearBtn.addEventListener('click', () => {
            searchInput.value = '';
            applyFilters();
            searchInput.focus();
        });
    }

    if (partySelect) {
        partySelect.addEventListener('change', applyFilters);
    }

    // Timeline item clicks for modal
    if (appContainer) {
        appContainer.addEventListener('click', (e) => {
            const actionBtn = e.target.closest('[data-action="open-modal"]');
            if (actionBtn) {
                const pmId = actionBtn.getAttribute('data-pm-id');
                openModal(pmId);
                return;
            }

            const card = e.target.closest('.timeline-item');
            if (card && !e.target.closest('button')) {
                const pmId = card.getAttribute('data-pm-id');
                openModal(pmId);
            }
        });
    }

    if (modalOverlay) {
        modalOverlay.addEventListener('click', (e) => {
            if (e.target === modalOverlay) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay && modalOverlay.classList.contains('active')) {
            closeModal();
        }
    });

    // Initial render
    render(primeMinisters);
});
