/* ==========================================================================
   Thangka Painting Explorer Logic
   Handles tabs, theme, bookmarks, and interactive symbolism cards.
   ========================================================================== */

function init() {
    setupTabs();
    setupThemeToggle();
    setupBookmark();
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
            panel.classList.add('active');
            panel.removeAttribute('hidden');
        });
    });
}

function setupThemeToggle() {
    const toggle = document.getElementById('theme-toggle');
    toggle.addEventListener('click', () => {
        document.body.classList.toggle('light-theme');
        const isLight = document.body.classList.contains('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggle.textContent = isLight ? '☀️' : '🌙';
    });
    if (localStorage.getItem('theme') === 'light') { document.body.classList.add('light-theme'); toggle.textContent = '☀️'; }
}

function setupBookmark() {
    const btn = document.getElementById('bookmark-btn');
    const id = 'art-thangka';
    const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
    updateBtn();
    btn.addEventListener('click', () => {
        if (window.Journey) {
            window.Journey.toggle({ id, explorerPage: 'frontend/thangka-painting-explorer/index.html', title: 'Thangka Painting', thumbnail: 'https://placehold.co/100/d4af37/fff', category: 'art' });
            updateBtn();
        }
    });
}

let observer;
function setupScrollAnimations() {
    if (!('IntersectionObserver' in window)) return;
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

function setupJourneyIntegration() {
    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('frontend/thangka-painting-explorer/index.html', [
            { id: 'art-thangka', title: 'Thangka Painting', description: 'Sacred Tibetan Buddhist scroll paintings.', link: '#' }
        ]);
    }
}

document.addEventListener('DOMContentLoaded', init);
