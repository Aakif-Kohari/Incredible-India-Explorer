/* ==========================================================================
   Sardar Vallabhbhai Patel Explorer Logic
   ========================================================================== */
(function () {
    'use strict';

    const timelineData = [
        { year: '1875', desc: 'Born on October 31 in Nadiad, Gujarat.' },
        { year: '1917', desc: 'Meets Mahatma Gandhi and joins the Indian National Congress, abandoning his lucrative law practice.' },
        { year: '1918', desc: 'Leads the Kheda Satyagraha, supporting farmers unable to pay taxes due to famine.' },
        { year: '1928', desc: 'Successfully organizes the Bardoli Satyagraha, earning the title "Sardar" (Leader) from the women of Bardoli.' },
        { year: '1946', desc: 'Plays a crucial role in the interim government and the transfer of power negotiations.' },
        { year: '1947', desc: 'Becomes independent India\'s first Deputy Prime Minister and Home Minister. Begins the monumental task of integrating 562 princely states.' },
        { year: '1948', desc: 'Oversees the police action (Operation Polo) to integrate the princely state of Hyderabad into India.' },
        { year: '1950', desc: 'Passes away on December 15, leaving behind a geographically and politically united India.' }
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
        const id = 'freedom-patel';
        const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
        updateBtn();
        btn.addEventListener('click', () => {
            if (window.Journey) {
                window.Journey.toggle({ id, explorerPage: 'frontend/sardar-patel-explorer/index.html', title: 'Sardar Vallabhbhai Patel', thumbnail: 'https://placehold.co/100/cd7f32/fff', category: 'freedom-fighters' });
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
            window.Journey.registerSearchItems('frontend/sardar-patel-explorer/index.html', [
                { id: 'freedom-patel', title: 'Sardar Vallabhbhai Patel', description: 'The Iron Man of India and architect of unity.', link: '#' }
            ]);
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
