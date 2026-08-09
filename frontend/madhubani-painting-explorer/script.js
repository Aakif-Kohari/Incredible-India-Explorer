/* Madhubani Explorer Logic */
function init() {
    setupTabs();
    setupThemeToggle();
    setupBookmark();
    setupGalleryLightbox();
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
        localStorage.setItem('theme', document.body.classList.contains('light-theme') ? 'light' : 'dark');
        toggle.textContent = document.body.classList.contains('light-theme') ? '☀️' : '🌙';
    });
    if (localStorage.getItem('theme') === 'light') { document.body.classList.add('light-theme'); toggle.textContent = '☀️'; }
}

function setupBookmark() {
    const btn = document.getElementById('bookmark-btn');
    const id = 'art-madhubani';
    const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
    updateBtn();
    btn.addEventListener('click', () => {
        if (window.Journey) {
            window.Journey.toggle({ id, explorerPage: 'frontend/madhubani-painting-explorer/index.html', title: 'Madhubani Painting', thumbnail: 'https://placehold.co/100/e11d48/fff', category: 'art' });
            updateBtn();
        }
    });
}

function setupGalleryLightbox() {
    document.querySelectorAll('.gallery-item img').forEach(img => {
        img.addEventListener('click', () => {
            alert(`Lightbox view: ${img.alt}\n(In a production app, this would open a full-screen modal overlay)`);
        });
    });
}

function setupJourneyIntegration() {
    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('frontend/madhubani-painting-explorer/index.html', [
            { id: 'art-madhubani', title: 'Madhubani Painting', description: 'Folk art from Bihar known for geometric patterns.', link: '#' }
        ]);
    }
}

document.addEventListener('DOMContentLoaded', init);
