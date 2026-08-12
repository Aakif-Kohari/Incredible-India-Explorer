/* ==========================================================================
   Chittara Art Explorer Logic
   Handles tabs, theme, bookmarks, and an interactive Canvas pattern generator.
   ========================================================================== */

function init() {
    setupTabs();
    setupThemeToggle();
    setupBookmark();
    setupPatternVisualizer();
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
        // Redraw canvas to match new theme colors
        setTimeout(drawChittaraPattern, 100);
    });
    if (localStorage.getItem('theme') === 'light') { document.body.classList.add('light-theme'); toggle.textContent = '☀️'; }
}

function setupBookmark() {
    const btn = document.getElementById('bookmark-btn');
    const id = 'art-chittara';
    const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
    updateBtn();
    btn.addEventListener('click', () => {
        if (window.Journey) {
            window.Journey.toggle({ id, explorerPage: 'frontend/chittara-art-explorer/index.html', title: 'Chittara Art', thumbnail: 'https://placehold.co/100/DAA520/fff', category: 'art' });
            updateBtn();
        }
    });
}

/**
 * Interactive Geometric Pattern Visualizer using HTML5 Canvas.
 * Generates a randomized Chittara-style wall pattern using traditional shapes.
 */
function setupPatternVisualizer() {
    const generateBtn = document.getElementById('generate-btn');
    generateBtn.addEventListener('click', drawChittaraPattern);
    // Initial draw
    drawChittaraPattern();
}

function drawChittaraPattern() {
    const canvas = document.getElementById('chittara-canvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const w = canvas.width;
    const h = canvas.height;
    const isLight = document.body.classList.contains('light-theme');

    // Base mud wall color
    ctx.fillStyle = isLight ? '#A0522D' : '#8B4513';
    ctx.fillRect(0, 0, w, h);

    // Rice paste / natural pigment colors
    const white = '#F5F5DC';
    const black = '#2F4F4F';
    const red = '#B22222';

    // Draw outer border
    ctx.strokeStyle = white;
    ctx.lineWidth = 6;
    ctx.strokeRect(10, 10, w - 20, h - 20);
    ctx.lineWidth = 2;
    ctx.strokeRect(20, 20, w - 40, h - 40);

    const step = 60;
    // Loop through grid to draw geometric motifs
    for (let x = 30; x < w - 30; x += step) {
        for (let y = 30; y < h - 30; y += step) {
            const rand = Math.random();
            ctx.strokeStyle = rand > 0.7 ? red : (rand > 0.4 ? white : black);

            if (rand > 0.8) {
                // Draw nested squares
                ctx.strokeRect(x + 10, y + 10, step - 20, step - 20);
                ctx.strokeRect(x + 20, y + 20, step - 40, step - 40);
            } else if (rand > 0.6) {
                // Draw intersecting triangles (Star motif)
                ctx.beginPath();
                ctx.moveTo(x + step / 2, y + 10);
                ctx.lineTo(x + 10, y + step - 10);
                ctx.lineTo(x + step - 10, y + step - 10);
                ctx.closePath();
                ctx.stroke();
                ctx.beginPath();
                ctx.moveTo(x + step / 2, y + step - 10);
                ctx.lineTo(x + 10, y + 10);
                ctx.lineTo(x + step - 10, y + 10);
                ctx.closePath();
                ctx.stroke();
            } else if (rand > 0.4) {
                // Draw diamond with dot
                ctx.beginPath();
                ctx.moveTo(x + step / 2, y + 15);
                ctx.lineTo(x + step - 15, y + step / 2);
                ctx.lineTo(x + step / 2, y + step - 15);
                ctx.lineTo(x + 15, y + step / 2);
                ctx.closePath();
                ctx.stroke();
                ctx.fillStyle = ctx.strokeStyle;
                ctx.beginPath();
                ctx.arc(x + step / 2, y + step / 2, 3, 0, Math.PI * 2);
                ctx.fill();
            } else {
                // Draw simple cross lines
                ctx.beginPath();
                ctx.moveTo(x + 15, y + 15);
                ctx.lineTo(x + step - 15, y + step - 15);
                ctx.moveTo(x + step - 15, y + 15);
                ctx.lineTo(x + 15, y + step - 15);
                ctx.stroke();
            }
        }
    }
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
        window.Journey.registerSearchItems('frontend/chittara-art-explorer/index.html', [
            { id: 'art-chittara', title: 'Chittara Art', description: 'Geometric folk art from Karnataka.', link: '#' }
        ]);
    }
}

document.addEventListener('DOMContentLoaded', init);
