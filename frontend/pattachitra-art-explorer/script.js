/* Pattachitra Explorer Logic - Includes Pan & Zoom Viewer */
function init() {
    setupTabs();
    setupThemeToggle();
    setupBookmark();
    setupInteractiveViewer();
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
    const id = 'art-pattachitra';
    const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
    updateBtn();
    btn.addEventListener('click', () => {
        if (window.Journey) {
            window.Journey.toggle({ id, explorerPage: 'frontend/pattachitra-art-explorer/index.html', title: 'Pattachitra Art', thumbnail: 'https://placehold.co/100/d97706/fff', category: 'art' });
            updateBtn();
        }
    });
}

/**
 * Interactive Image Viewer with Pan and Zoom capabilities.
 * Mimics a digital exhibition experience.
 */
function setupInteractiveViewer() {
    const viewer = document.getElementById('viewer-container');
    const img = document.getElementById('viewer-img');
    const btnIn = document.getElementById('zoom-in');
    const btnOut = document.getElementById('zoom-out');
    const btnReset = document.getElementById('zoom-reset');

    let isDown = false;
    let startX, startY, translateX = 0, translateY = 0, scale = 1;
    const MIN_SCALE = 1;
    const MAX_SCALE = 4;

    function updateTransform() {
        img.style.transform = `translate(${translateX}px, ${translateY}px) scale(${scale})`;
    }

    viewer.addEventListener('mousedown', (e) => {
        if (scale <= 1) return; // Don't pan if not zoomed
        isDown = true;
        startX = e.clientX - translateX;
        startY = e.clientY - translateY;
        viewer.style.cursor = 'grabbing';
    });

    window.addEventListener('mouseup', () => {
        isDown = false;
        viewer.style.cursor = scale > 1 ? 'grab' : 'default';
    });

    window.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        translateX = e.clientX - startX;
        translateY = e.clientY - startY;
        updateTransform();
    });

    viewer.addEventListener('wheel', (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.2 : 0.2;
        scale = Math.min(Math.max(MIN_SCALE, scale + delta), MAX_SCALE);
        if (scale === MIN_SCALE) { translateX = 0; translateY = 0; }
        updateTransform();
        viewer.style.cursor = scale > 1 ? 'grab' : 'default';
    });

    // Touch support for mobile pan/zoom
    let lastTouchDistance = 0;
    viewer.addEventListener('touchstart', (e) => {
        if (e.touches.length === 1) {
            isDown = true;
            startX = e.touches[0].clientX - translateX;
            startY = e.touches[0].clientY - translateY;
        } else if (e.touches.length === 2) {
            lastTouchDistance = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
        }
    });

    viewer.addEventListener('touchmove', (e) => {
        if (e.touches.length === 1 && isDown && scale > 1) {
            e.preventDefault();
            translateX = e.touches[0].clientX - startX;
            translateY = e.touches[0].clientY - startY;
            updateTransform();
        } else if (e.touches.length === 2) {
            const currentDistance = Math.hypot(e.touches[0].clientX - e.touches[1].clientX, e.touches[0].clientY - e.touches[1].clientY);
            const delta = (currentDistance - lastTouchDistance) * 0.01;
            scale = Math.min(Math.max(MIN_SCALE, scale + delta), MAX_SCALE);
            if (scale === MIN_SCALE) { translateX = 0; translateY = 0; }
            updateTransform();
            lastTouchDistance = currentDistance;
        }
    });

    viewer.addEventListener('touchend', () => { isDown = false; });

    btnIn.addEventListener('click', () => { scale = Math.min(scale + 0.5, MAX_SCALE); updateTransform(); });
    btnOut.addEventListener('click', () => { scale = Math.max(scale - 0.5, MIN_SCALE); if (scale === MIN_SCALE) { translateX = 0; translateY = 0; } updateTransform(); });
    btnReset.addEventListener('click', () => { scale = 1; translateX = 0; translateY = 0; updateTransform(); });
}

function setupJourneyIntegration() {
    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('frontend/pattachitra-art-explorer/index.html', [
            { id: 'art-pattachitra', title: 'Pattachitra Art', description: 'Scroll painting from Odisha with mythological themes.', link: '#' }
        ]);
    }
}

document.addEventListener('DOMContentLoaded', init);
