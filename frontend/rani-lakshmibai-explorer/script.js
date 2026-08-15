/* ==========================================================================
   Rani Lakshmibai Explorer Logic
   ========================================================================== */
(function () {
    'use strict';

    const timelineData = [
        { year: '1828', desc: 'Born Manikarnika Tambe in Varanasi; trained in martial arts and horse riding.' },
        { year: '1842', desc: 'Marries Maharaja Gangadhar Rao of Jhansi and is renamed Lakshmibai.' },
        { year: '1853', desc: 'Maharaja dies. The British refuse to recognize their adopted son, Damodar Rao, as heir.' },
        { year: '1854', desc: 'Jhansi is annexed by the British under the Doctrine of Lapse. Lakshmibai is granted a pension and ordered to leave the fort.' },
        { year: '1857', desc: 'The Sepoy Mutiny breaks out. Lakshmibai assumes leadership of the rebellion in Jhansi.' },
        { year: '1858', desc: 'British forces besiege Jhansi. After fierce fighting, she escapes the fort on horseback with her adopted son.' },
        { year: '1858', desc: 'Joins Tatya Tope, captures Gwalior, and fights her final battle disguised as a cavalry leader.' },
        { year: '1858', desc: 'Martyred on June 18 in battle. Her body is secretly cremated by her loyal followers to prevent British desecration.' }
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
        const id = 'freedom-lakshmibai';
        const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
        updateBtn();
        btn.addEventListener('click', () => {
            if (window.Journey) {
                window.Journey.toggle({ id, explorerPage: 'frontend/rani-lakshmibai-explorer/index.html', title: 'Rani Lakshmibai', thumbnail: 'https://placehold.co/100/e11d48/fff', category: 'freedom-fighters' });
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
            window.Journey.registerSearchItems('frontend/rani-lakshmibai-explorer/index.html', [
                { id: 'freedom-lakshmibai', title: 'Rani Lakshmibai', description: 'The Warrior Queen of Jhansi.', link: '#' }
            ]);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
