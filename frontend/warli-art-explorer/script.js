/* Warli Explorer Logic - Includes Canvas Pattern Generation */
function init() {
    setupTabs();
    setupThemeToggle();
    setupBookmark();
    setupCanvasVisualizer();
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
    const id = 'art-warli';
    const updateBtn = () => { btn.textContent = window.Journey && window.Journey.isSaved(id) ? '✅ Saved to Journey' : '🔖 Bookmark to My Journey'; };
    updateBtn();
    btn.addEventListener('click', () => {
        if (window.Journey) {
            window.Journey.toggle({ id, explorerPage: 'frontend/warli-art-explorer/index.html', title: 'Warli Art', thumbnail: 'https://placehold.co/100/d97706/fff', category: 'art' });
            updateBtn();
        }
    });
}

/**
 * Interactive Pattern Visualizer using HTML5 Canvas.
 * Draws randomized geometric shapes (triangles and circles) mimicking Warli art.
 */
function setupCanvasVisualizer() {
    const canvas = document.getElementById('warli-canvas');
    const ctx = canvas.getContext('2d');
    const generateBtn = document.getElementById('generate-btn');

    function drawPattern() {
        const width = canvas.width;
        const height = canvas.height;

        // Clear canvas with "Mud Wall" color
        const isLight = document.body.classList.contains('light-theme');
        ctx.fillStyle = isLight ? '#5c2a0c' : '#78350f';
        ctx.fillRect(0, 0, width, height);

        // Set "Rice Paste" drawing style
        ctx.strokeStyle = isLight ? '#fdfbf7' : '#ffffff';
        ctx.lineWidth = 2;

        // Generate random Warli figures (circles and joined triangles)
        for (let i = 0; i < 15; i++) {
            let x = Math.random() * (width - 100) + 50;
            let y = Math.random() * (height - 100) + 50;
            let size = Math.random() * 15 + 10;

            if (Math.random() > 0.5) {
                // Draw human figure (two triangles joined)
                ctx.beginPath();
                ctx.moveTo(x, y - size); // Top head
                ctx.lineTo(x - size, y + size); // Bottom left
                ctx.lineTo(x + size, y + size); // Bottom right
                ctx.closePath();
                ctx.stroke();

                ctx.beginPath();
                ctx.moveTo(x, y + size); // Bottom head
                ctx.lineTo(x - size, y + size * 3); // Bottom left
                ctx.lineTo(x + size, y + size * 3); // Bottom right
                ctx.closePath();
                ctx.stroke();

                // Stick arms/legs
                ctx.beginPath();
                ctx.moveTo(x - size * 2, y + size);
                ctx.lineTo(x + size * 2, y + size);
                ctx.stroke();
            } else {
                // Draw tree (triangle) or Sun (circle)
                ctx.beginPath();
                ctx.arc(x, y, size, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
    }

    generateBtn.addEventListener('click', drawPattern);

    // Initial draw
    drawPattern();

    // Redraw on theme change to adjust contrast
    document.getElementById('theme-toggle').addEventListener('click', () => setTimeout(drawPattern, 100));
}

function setupJourneyIntegration() {
    if (window.Journey && window.Journey.registerSearchItems) {
        window.Journey.registerSearchItems('frontend/warli-art-explorer/index.html', [
            { id: 'art-warli', title: 'Warli Art', description: 'Tribal art from Maharashtra using geometric shapes.', link: '#' }
        ]);
    }
}

document.addEventListener('DOMContentLoaded', init);
