/* ==========================================================================
   Subhas Chandra Bose Explorer Logic
   Handles tabs, timeline rendering, lightbox gallery, and Journey API.
   ========================================================================== */
(function () {
    'use strict';

    const timelineData = [
        { year: '1897', desc: 'Born on January 23 in Cuttack, Odisha, to Janakinath and Prabhavati Bose.' },
        { year: '1921', desc: 'Resigns from the Indian Civil Service (ICS) to join the Indian National Congress and the freedom struggle.' },
        { year: '1938', desc: 'Elected President of the Indian National Congress at the Haripura session.' },
        { year: '1939', desc: 'Re-elected Congress President at Tripuri but resigns due to ideological differences with Gandhi. Forms the Forward Bloc.' },
        { year: '1941', desc: 'Executes a daring escape from house arrest in Calcutta, traveling to Germany via Afghanistan.' },
        { year: '1943', desc: 'Arrives in Singapore and assumes leadership of the Indian National Army (INA). Proclaims the Provisional Government of Free India.' },
        { year: '1944', desc: 'Leads the INA in the Imphal and Kohima campaigns against British forces in northeastern India.' },
        { year: '1945', desc: 'Reported to have died in a plane crash in Taihoku (Taipei) on August 18, though the circumstances remain historically debated.' }
    ];

    function init() {
        setupTabs();
        setupThemeToggle();
        setupBookmark();
        renderTimeline();
        setupLightbox();
        setupScrollAnimations();
        setupJourneyIntegration();
    }

    function setupTabs() {
        const tabs = document.querySelectorAll('.tab-btn');
        const contents = document.querySelectorAll('.tab-content');

        tabs.forEach(tab => {
            tab.addEventListener('click', () => {
                tabs.forEach(t => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
                contents.forEach(c => { c.classList.remove('active'); c.setAttribute('hidden', ''); });

                tab.classList.add('active');
                tab.setAttribute('aria-selected', 'true');
                const panel = document.getElementById(tab.dataset.tab);
                if (panel) {
                    panel.classList.add('active');
                    panel.removeAttribute('hidden');
                }
            });
        });
    }

    function setupThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;

        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            toggle.textContent = isLight ? '☀️' : '🌙';
        });

        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
            toggle.textContent = '☀️';
        }
    }

    function setupBookmark() {
        const btn = document.getElementById('bookmark-btn');
        if (!btn) return;

        const id = 'freedom-bose';
        const updateBtn = () => {
            if (window.Journey && window.Journey.isSaved(id)) {
                btn.textContent = '✅ Saved to Journey';
            } else {
                btn.textContent = '🔖 Bookmark to My Journey';
            }
        };

        updateBtn();
        btn.addEventListener('click', () => {
            if (window.Journey) {
                window.Journey.toggle({
                    id,
                    explorerPage: 'frontend/subhas-chandra-bose-explorer/index.html',
                    title: 'Subhas Chandra Bose',
                    thumbnail: 'https://placehold.co/100/dc2626/fff',
                    category: 'freedom-fighters'
                });
                updateBtn();
            }
        });
    }

    function renderTimeline() {
        const container = document.getElementById('timeline-container');
        if (!container) return;

        container.innerHTML = timelineData.map(item => `
            <div class="timeline-item animate-on-scroll">
                <div class="timeline-year">${item.year}</div>
                <div class="timeline-desc">${item.desc}</div>
            </div>
        `).join('');

        // Re-observe new elements
        if (window.scrollObserver) {
            container.querySelectorAll('.animate-on-scroll').forEach(el => window.scrollObserver.observe(el));
        }
    }

    function setupLightbox() {
        const modal = document.getElementById('lightbox-modal');
        const modalImg = document.getElementById('lightbox-img');
        const modalCaption = document.getElementById('lightbox-caption');
        const closeBtn = document.getElementById('lightbox-close');
        const galleryItems = document.querySelectorAll('.gallery-item');

        if (!modal || !closeBtn) return;

        const openLightbox = (src, alt, caption) => {
            modalImg.src = src;
            modalImg.alt = alt;
            modalCaption.textContent = caption;
            modal.classList.add('active');
            modal.setAttribute('aria-hidden', 'false');
            closeBtn.focus();
        };

        const closeLightbox = () => {
            modal.classList.remove('active');
            modal.setAttribute('aria-hidden', 'true');
            modalImg.src = '';
        };

        galleryItems.forEach(item => {
            item.addEventListener('click', () => {
                openLightbox(item.dataset.img, item.querySelector('img').alt, item.dataset.caption);
            });
            item.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    openLightbox(item.dataset.img, item.querySelector('img').alt, item.dataset.caption);
                }
            });
        });

        closeBtn.addEventListener('click', closeLightbox);
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeLightbox();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) closeLightbox();
        });
    }

    function setupScrollAnimations() {
        if (!('IntersectionObserver' in window)) {
            document.querySelectorAll('.animate-on-scroll').forEach(el => el.classList.add('visible'));
            return;
        }

        window.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                    window.scrollObserver.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });

        document.querySelectorAll('.animate-on-scroll').forEach(el => window.scrollObserver.observe(el));
    }

    function setupJourneyIntegration() {
        if (window.Journey && typeof window.Journey.registerSearchItems === 'function') {
            window.Journey.registerSearchItems('frontend/subhas-chandra-bose-explorer/index.html', [
                { id: 'freedom-bose', title: 'Subhas Chandra Bose', description: 'Leader of the Indian National Army.', link: '#' }
            ]);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
