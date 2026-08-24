/**
 * Tata Steel Industrial Heritage: Interactive Timeline
 * Data & Application Logic
 */

const TATA_STEEL_MILESTONES_DATA = [
    {
        id: 'founding-1907',
        year: 1907,
        yearDisplay: '1907',
        category: 'origin',
        title: "Incorporation of Tata Iron and Steel Company",
        desc: "Founded by Jamsetji Tata and established by Sir Dorabji Tata, TISCO was incorporated on August 26, 1907, representing India's first major foray into heavy industry.",
        source: "Tata Steel Official History"
    },
    {
        id: 'production-1912',
        year: 1912,
        yearDisplay: '1912',
        category: 'production',
        title: "First Steel Ingot Produced",
        desc: "The first steel ingot was rolled out of the Sakchi plant on February 16, 1912. This marked a monumental step towards industrial self-reliance for India.",
        source: "Tata Steel Corporate Milestones"
    },
    {
        id: 'jamshedpur-1919',
        year: 1919,
        yearDisplay: '1919',
        category: 'jamshedpur',
        title: "Renaming of Sakchi to Jamshedpur",
        desc: "In honour of its founder, Jamsetji Nusserwanji Tata, Lord Chelmsford named the city 'Jamshedpur'. The Kalimati railway station was also renamed to 'Tatanagar'.",
        source: "Jamshedpur City History"
    },
    {
        id: 'ww2-1940s',
        year: 1940,
        yearDisplay: '1940s',
        category: 'development',
        title: "Contribution to WWII Efforts",
        desc: "During World War II, Tata Steel supplied vast quantities of steel to the Allied forces, producing specialty steels like 'Tatanagar' armored cars used in the North African campaign.",
        source: "Historical Records on Tata Steel in WWII"
    },
    {
        id: 'expansion-1950s',
        year: 1955,
        yearDisplay: '1955',
        category: 'development',
        title: "Two Million Tonne Programme (TMP)",
        desc: "Following independence, Tata Steel embarked on a massive expansion, doubling its capacity to 2 million tonnes to support the nation-building efforts of modern India.",
        source: "Tata Steel Financial Archives"
    },
    {
        id: 'global-2007',
        year: 2007,
        yearDisplay: '2007',
        category: 'development',
        title: "Acquisition of Corus",
        desc: "Tata Steel acquired the Anglo-Dutch company Corus, making it one of the largest steel producers globally and establishing a strong international footprint.",
        source: "Business Standard"
    }
];

function filterMilestonesData(data, search = '', category = 'all') {
    const s = search.trim().toLowerCase();
    return data.filter(item => {
        const matchesSearch = !s ||
            item.title.toLowerCase().includes(s) ||
            item.desc.toLowerCase().includes(s) ||
            String(item.year).includes(s);

        const matchesCategory = category === 'all' || item.category === category;

        return matchesSearch && matchesCategory;
    });
}

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        const searchInput = document.getElementById('milestone-search-input');
        const clearBtn = document.getElementById('clear-search');
        const categoryFilter = document.getElementById('category-filter');
        const timelineList = document.getElementById('milestones-timeline-list');
        const milestoneModal = document.getElementById('milestone-modal');
        const modalBody = document.getElementById('modal-body');
        const modalCloseBtn = document.getElementById('modal-close-btn');
        const resultsCount = document.getElementById('results-count');

        function renderTimeline(items) {
            if (!timelineList) return;

            if (resultsCount) {
                resultsCount.textContent = `${items.length} milestone${items.length !== 1 ? 's' : ''} found`;
            }

            if (items.length === 0) {
                timelineList.innerHTML = `
                    <div class="milestones-empty-state">
                        <h3>No milestones found matching your search.</h3>
                        <p>Try adjusting your search query or filter options.</p>
                    </div>
                `;
                return;
            }

            timelineList.innerHTML = items.map(item => `
                <div class="milestone-card" data-id="${item.id}" tabindex="0" role="button" aria-label="View details for ${item.title}">
                    <div class="milestone-badge-col">
                        <div class="milestone-year">${item.yearDisplay}</div>
                        <span class="milestone-category-tag milestone-category-${item.category}">${item.category}</span>
                    </div>

                    <div class="milestone-main-col">
                        <h3>${item.title}</h3>
                        <p class="milestone-desc-preview">${item.desc}</p>
                    </div>
                </div>
            `).join('');

            document.querySelectorAll('.milestone-card').forEach(card => {
                const openModal = () => {
                    const id = card.getAttribute('data-id');
                    const item = TATA_STEEL_MILESTONES_DATA.find(m => m.id === id);
                    if (item) showModal(item);
                };
                card.addEventListener('click', openModal);
                card.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openModal();
                    }
                });
            });
        }

        function showModal(item) {
            if (!milestoneModal || !modalBody) return;
            modalBody.innerHTML = `
                <div class="modal-header-box">
                    <span class="milestone-category-tag milestone-category-${item.category}">${item.category}</span>
                    <h2>${item.title}</h2>
                    <p>${item.yearDisplay}</p>
                </div>

                <div class="modal-section-h4">Details</div>
                <p class="modal-desc-text">${item.desc}</p>

                <div class="modal-section-h4">Source</div>
                <p class="modal-source-text">${item.source}</p>
            `;
            milestoneModal.classList.remove('hidden');
        }

        function updateView() {
            const searchVal = searchInput ? searchInput.value : '';
            const categoryVal = categoryFilter ? categoryFilter.value : 'all';

            if (clearBtn) {
                if (searchVal) clearBtn.classList.remove('hidden');
                else clearBtn.classList.add('hidden');
            }

            const filtered = filterMilestonesData(TATA_STEEL_MILESTONES_DATA, searchVal, categoryVal);
            renderTimeline(filtered);
        }

        if (searchInput) searchInput.addEventListener('input', updateView);
        if (categoryFilter) categoryFilter.addEventListener('change', updateView);

        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (searchInput) searchInput.value = '';
                updateView();
            });
        }

        if (modalCloseBtn) {
            modalCloseBtn.addEventListener('click', () => {
                if (milestoneModal) milestoneModal.classList.add('hidden');
            });
        }

        if (milestoneModal) {
            milestoneModal.addEventListener('click', (e) => {
                if (e.target === milestoneModal) milestoneModal.classList.add('hidden');
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && milestoneModal && !milestoneModal.classList.contains('hidden')) {
                milestoneModal.classList.add('hidden');
            }
        });

        updateView();
    });
}

if (typeof module !== 'undefined') {
    module.exports = {
        TATA_STEEL_MILESTONES_DATA,
        filterMilestonesData
    };
}
