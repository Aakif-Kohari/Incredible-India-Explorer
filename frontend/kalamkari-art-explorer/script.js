/* Kalamkari Explorer Logic - Includes Timeline Interactivity */
function init() {
    setupTabs();
    setupThemeToggle();
    setupBookmark();
    setupTimeline();
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
    if(localStorage.getItem('theme') === 'light') { document.body.classList.add('light-theme'); toggle.textContent = '☀️'; }
}

function setupBookmark() {
    const btn = document.getElementById('bookmark-btn');
    const id = 'art-kalamkari';
    const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
    updateBtn();
    btn.addEventListener('click', () => {
        if (window.Journey) {
            window.Journey.toggle({ id, explorerPage: 'frontend/kalamkari-art-explorer/index.html', title: 'Kalamkari Art', thumbnail: 'https://placehold.co/100/059669/fff', category: 'art' });
            updateBtn();
        }
    });
}

/**
 * Interactive Timeline for the 23-step Dyeing Process.
 * Allows users to click through the stages of creating Kalamkari textiles.
 */
function setupTimeline() {
    const steps = document.querySelectorAll('.timeline-step');

    steps.forEach((step) => {
        step.addEventListener('click', () => {
            const stepIndex = step.dataset.step;

            // Update active state on timeline nodes
            steps.forEach(s => s.classList.remove('active'));
            step.classList.add('active');

            // Update active state on detail panels
            document.querySelectorAll('.timeline-detail').forEach(d => d.classList.remove('active'));
            const targetDetail = document.getElementById(`detail-${stepIndex}`);
            if (targetDetail) targetDetail.classList.add('active');
        });
    });
}

function setupJourneyIntegration() {
    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('frontend/kalamkari-art-explorer/index.html', [
            { id: 'art-kalamkari', title: 'Kalamkari Art', description: 'Hand-painted textile art from Andhra Pradesh.', link: '#' }
        ]);
    }
}

document.addEventListener('DOMContentLoaded', init);
