/* Thrush Explorer Logic */
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
            tabs.forEach(t => t.classList.remove('active'));
            contents.forEach(c => c.classList.remove('active'));
            tab.classList.add('active');
            document.getElementById(tab.dataset.tab).classList.add('active');
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
    if (localStorage.getItem('theme') === 'light') {
        document.body.classList.add('light-theme');
        toggle.textContent = '☀️';
    }
}

function setupBookmark() {
    const btn = document.getElementById('bookmark-btn');
    const id = 'thrush-nilgiri-laughing';
    if (window.Journey && window.Journey.isSaved(id)) {
        btn.textContent = '✅ Saved to Journey';
    }
    btn.addEventListener('click', () => {
        if (window.Journey) {
            window.Journey.toggle({
                id: id,
                explorerPage: 'frontend/nilgiri-laughingthrush-explorer/index.html',
                title: 'Nilgiri Laughingthrush',
                thumbnail: 'https://placehold.co/100',
                category: 'birds'
            });
            btn.textContent = window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey';
        }
    });
}

let observer;
function setupScrollAnimations() {
    observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) entry.target.classList.add('visible');
        });
    }, { threshold: 0.1 });
    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

function setupJourneyIntegration() {
    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('frontend/nilgiri-laughingthrush-explorer/index.html', [
            { id: 'thrush-nilgiri-laughing', title: 'Nilgiri Laughingthrush', description: 'An endemic bird species of the Nilgiri Hills.', link: '#' }
        ]);
    }
}

document.addEventListener('DOMContentLoaded', init);
