/* ==========================================================================
   Chandrashekhar Azad Explorer Logic
   ========================================================================== */
(function () {
    'use strict';

    const timelineData = [
        { year: '1906', desc: 'Born Chandrashekhar Tiwari on July 23 in Bhavra, present-day Madhya Pradesh.' },
        { year: '1921', desc: 'Joins the Non-Cooperation Movement. Arrested and introduces himself as "Azad" (Free) to the magistrate.' },
        { year: '1922', desc: 'Deeply disillusioned by Gandhi\'s withdrawal of the movement after Chauri Chaura, he turns towards armed revolutionary struggle.' },
        { year: '1925', desc: 'Participates in the Kakori Train Action, a daring robbery of British government funds to finance the revolution.' },
        { year: '1928', desc: 'Reorganizes the HRA into the HSRA with Bhagat Singh, adopting socialist ideals alongside nationalism.' },
        { year: '1931', desc: 'Surrounded by British police at Alfred Park in Allahabad on February 27. Fights alone to allow his comrades to escape.' },
        { year: '1931', desc: 'True to his vow of never being captured alive, he shoots himself with his last remaining bullet, dying a free man.' }
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
                if (panel) { panel.classList.add('active'); panel.removeAttribute('hidden'); }
            });
        });
    }

    function setupThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
            toggle.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
        });
        if (localStorage.getItem('theme') === 'light') { document.body.classList.add('light-theme'); toggle.textContent = '☀️'; }
    }

    function setupBookmark() {
        const btn = document.getElementById('bookmark-btn');
        const id = 'freedom-azad';
        const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
        updateBtn();
        btn.addEventListener('click', () => {
            if (window.Journey) {
                window.Journey.toggle({ id, explorerPage: 'frontend/chandrashekhar-azad-explorer/index.html', title: 'Chandrashekhar Azad', thumbnail: 'https://placehold.co/100/f59e0b/fff', category: 'freedom-fighters' });
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
        if (window.scrollObserver) container.querySelectorAll('.animate-on-scroll').forEach(el => window.scrollObserver.observe(el));
    }

    function setupLightbox() {
        const modal = document.getElementById('lightbox-modal');
        const modalImg = document.getElementById('lightbox-img');
        const modalCaption = document.getElementById('lightbox-caption');
        const closeBtn = document.getElementById('lightbox-close');
        const galleryItems = document.querySelectorAll('.gallery-item');

        const openLightbox = (src, alt, caption) => {
            modalImg.src = src; modalImg.alt = alt; modalCaption.textContent = caption;
            modal.classList.add('active'); modal.setAttribute('aria-hidden', 'false'); closeBtn.focus();
        };
        const closeLightbox = () => { modal.classList.remove('active'); modal.setAttribute('aria-hidden', 'true'); modalImg.src = ''; };

        galleryItems.forEach(item => {
            item.addEventListener('click', () => openLightbox(item.dataset.img, item.querySelector('img').alt, item.dataset.caption));
            item.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(item.dataset.img, item.querySelector('img').alt, item.dataset.caption); } });
        });
        closeBtn.addEventListener('click', closeLightbox);
        modal.addEventListener('click', (e) => { if (e.target === modal) closeLightbox(); });
        document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && modal.classList.contains('active')) closeLightbox(); });
    }

    function setupScrollAnimations() {
        if (!('IntersectionObserver' in window)) return;
        window.scrollObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => { if (entry.isIntersecting) { entry.target.classList.add('visible'); window.scrollObserver.unobserve(entry.target); } });
        }, { threshold: 0.1 });
        document.querySelectorAll('.animate-on-scroll').forEach(el => window.scrollObserver.observe(el));
    }

    function setupJourneyIntegration() {
        if (window.Journey && window.Journey.registerSearchItems) {
            window.Journey.registerSearchItems('frontend/chandrashekhar-azad-explorer/index.html', [
                { id: 'freedom-azad', title: 'Chandrashekhar Azad', description: 'The fearless mentor of the HSRA.', link: '#' }
            ]);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
