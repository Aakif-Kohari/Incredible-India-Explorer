/**
 * T-Series Brand Profile: Interactive Timeline
 * Data & Application Logic
 */

const TSERIES_MILESTONES_DATA = [
    {
        id: 'founding-1983',
        year: 1983,
        yearDisplay: '1983',
        category: 'origin',
        title: "Foundation of Super Cassettes Industries",
        desc: "Gulshan Kumar founded Super Cassettes Industries, later known as T-Series. It began as a small company selling pirated Bollywood songs before moving into producing original music and devotional songs, capitalizing on the cassette boom in India.",
        source: "Wikipedia - T-Series (company)"
    },
    {
        id: 'qsqt-1988',
        year: 1988,
        yearDisplay: '1988',
        category: 'music',
        title: "Breakthrough with Qayamat Se Qayamat Tak",
        desc: "T-Series scored its first major original Bollywood soundtrack success with 'Qayamat Se Qayamat Tak', which became one of the best-selling Indian music albums of the 1980s.",
        source: "Wikipedia - Qayamat Se Qayamat Tak"
    },
    {
        id: 'aashiqui-1990',
        year: 1990,
        yearDisplay: '1990',
        category: 'music',
        title: "Unprecedented Success with Aashiqui",
        desc: "The soundtrack for 'Aashiqui' became the best-selling Bollywood soundtrack album of all time, selling over 20 million units and cementing T-Series as the dominant force in the Indian music industry.",
        source: "Box Office India"
    },
    {
        id: 'film-production-2001',
        year: 2001,
        yearDisplay: '2001',
        category: 'film',
        title: "Success in Film Production with Tum Bin",
        desc: "After early ventures, T-Series achieved significant success in film production with 'Tum Bin'. The company expanded to not just own the music rights but also produce the movies themselves.",
        source: "Wikipedia - Tum Bin"
    },
    {
        id: 'youtube-join-2006',
        year: 2006,
        yearDisplay: '2006',
        category: 'digital',
        title: "T-Series Joins YouTube",
        desc: "T-Series created its YouTube channel in 2006 (though it didn't start uploading actively until 2010). This marked the very beginning of its transition from physical media and television to global digital streaming.",
        source: "YouTube - T-Series About Page"
    },
    {
        id: 'youtube-growth-2016',
        year: 2016,
        yearDisplay: '2016',
        category: 'digital',
        title: "Jio Data Boom Accelerates YouTube Growth",
        desc: "The launch of Reliance Jio brought cheap 4G data to millions of Indians. This caused a massive surge in online video consumption in India, propelling T-Series' YouTube subscriber and view counts at unprecedented rates.",
        source: "The Verge - How T-Series became the biggest YouTube channel"
    },
    {
        id: 'pewdiepie-2019',
        year: 2019,
        yearDisplay: '2019',
        category: 'digital',
        title: "Becoming the Most-Subscribed YouTube Channel",
        desc: "Following a highly publicized subscriber battle with PewDiePie, T-Series officially became the most-subscribed channel on YouTube, showcasing the immense scale of the Indian digital audience on the global stage.",
        source: "BBC News"
    },
    {
        id: 'first-200-million-2021',
        year: 2021,
        yearDisplay: '2021',
        category: 'digital',
        title: "First Channel to Reach 200 Million Subscribers",
        desc: "T-Series became the first YouTube channel in history to cross 200 million subscribers, firmly establishing its dominance as a global digital entertainment brand.",
        source: "Guinness World Records"
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
                    const item = TSERIES_MILESTONES_DATA.find(m => m.id === id);
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

            const filtered = filterMilestonesData(TSERIES_MILESTONES_DATA, searchVal, categoryVal);
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
        TSERIES_MILESTONES_DATA,
        filterMilestonesData
    };
}
