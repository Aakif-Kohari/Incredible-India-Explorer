/* ==========================================================================
   Bhagat Singh Explorer Logic
   ========================================================================== */
(function () {
    'use strict';

    const timelineData = [
        { year: '1907', desc: 'Born on September 28 in Banga, Punjab, into a family of revolutionary patriots.' },
        { year: '1919', desc: 'Deeply traumatized by the Jallianwala Bagh massacre; visits the site to collect mud soaked in blood.' },
        { year: '1924', desc: 'Joins the Hindustan Republican Association (HRA) in Kanpur and begins writing for revolutionary journals.' },
        { year: '1928', desc: 'Transforms HRA into the Hindustan Socialist Republican Association (HSRA) with Chandrashekhar Azad.' },
        { year: '1928', desc: 'Assassinates British police officer John Saunders in Lahore to avenge the death of Lala Lajpat Rai.' },
        { year: '1929', desc: 'Throws non-lethal smoke bombs in the Central Legislative Assembly with Batukeshwar Dutt and shouts "Inquilab Zindabad!"' },
        { year: '1930', desc: 'Leads a 116-day hunger strike in Mianwali and Lahore jails demanding rights for political prisoners.' },
        { year: '1931', desc: 'Executed by hanging on March 23 in Lahore Central Jail at the age of 23, alongside Rajguru and Sukhdev.' }
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
        const id = 'freedom-bhagat-singh';
        const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
        updateBtn();
        btn.addEventListener('click', () => {
            if (window.Journey) {
                window.Journey.toggle({ id, explorerPage: 'frontend/bhagat-singh-explorer/index.html', title: 'Bhagat Singh', thumbnail: 'https://placehold.co/100/dc2626/fff', category: 'freedom-fighters' });
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
            window.Journey.registerSearchItems('frontend/bhagat-singh-explorer/index.html', [
                { id: 'freedom-bhagat-singh', title: 'Bhagat Singh', description: 'Intellectual revolutionary and HSRA founder.', link: '#' }
            ]);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
