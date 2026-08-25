/* ==========================================================================
   Virtual Postcard Creator Logic
   Handles Canvas API rendering, text wrapping, and PNG export.
   ========================================================================== */
(function () {
    'use strict';

    const canvas = document.getElementById('postcard-canvas');
    const ctx = canvas.getContext('2d');

    // State management
    let state = {
        monument: monumentsData[0],
        message: document.getElementById('postcard-message').value,
        font: "'Playfair Display', serif",
        fontSize: 42,
        color: '#2C1810',
        bold: false,
        italic: false,
        decos: { stamp: true, border: false, mandala: false }
    };

    /**
     * Initialize the creator workspace.
     */
    function init() {
        renderMonumentGrid();
        attachEventListeners();
        setupThemeToggle();
        drawPostcard();
    }

    /**
     * Render the selectable monument grid.
     */
    function renderMonumentGrid() {
        const grid = document.getElementById('monument-grid');
        monumentsData.forEach((m, index) => {
            const card = document.createElement('button');
            card.type = 'button';
            card.className = `monument-card ${index === 0 ? 'active' : ''}`;
            card.setAttribute('aria-pressed', index === 0 ? 'true' : 'false');
            card.setAttribute('aria-label', `Select ${m.name}`);

            // Create mini canvas for preview
            const miniCanvas = document.createElement('canvas');
            miniCanvas.width = 100; miniCanvas.height = 60;
            miniCanvas.className = 'monument-preview';
            const miniCtx = miniCanvas.getContext('2d');
            m.draw(miniCtx, 100, 60);

            const h4 = document.createElement('h4');
            h4.textContent = m.name;
            const p = document.createElement('p');
            p.textContent = m.location;

            card.appendChild(miniCanvas);
            card.appendChild(h4);
            card.appendChild(p);

            card.addEventListener('click', () => {
                document.querySelectorAll('.monument-card').forEach(c => {
                    c.classList.remove('active');
                    c.setAttribute('aria-pressed', 'false');
                });
                card.classList.add('active');
                card.setAttribute('aria-pressed', 'true');
                state.monument = m;
                drawPostcard();
            });

            grid.appendChild(card);
        });
    }

    /**
     * Attach event listeners to all editor controls.
     */
    function attachEventListeners() {
        const msgInput = document.getElementById('postcard-message');
        const charCount = document.getElementById('char-count');

        msgInput.addEventListener('input', () => {
            state.message = msgInput.value;
            charCount.textContent = msgInput.value.length;
            drawPostcard();
        });
        charCount.textContent = msgInput.value.length;

        document.getElementById('font-family').addEventListener('change', (e) => {
            state.font = e.target.value;
            drawPostcard();
        });

        document.getElementById('font-size').addEventListener('input', (e) => {
            state.fontSize = parseInt(e.target.value);
            drawPostcard();
        });

        document.getElementById('text-color').addEventListener('input', (e) => {
            state.color = e.target.value;
            drawPostcard();
        });

        document.getElementById('btn-bold').addEventListener('click', (e) => {
            state.bold = !state.bold;
            e.currentTarget.setAttribute('aria-pressed', state.bold);
            drawPostcard();
        });

        document.getElementById('btn-italic').addEventListener('click', (e) => {
            state.italic = !state.italic;
            e.currentTarget.setAttribute('aria-pressed', state.italic);
            drawPostcard();
        });

        document.querySelectorAll('.deco-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const deco = btn.dataset.deco;
                state.decos[deco] = !state.decos[deco];
                btn.classList.toggle('active');
                btn.setAttribute('aria-pressed', state.decos[deco]);
                drawPostcard();
            });
        });

        document.getElementById('btn-download').addEventListener('click', downloadPostcard);

        document.querySelectorAll('.preset-btn').forEach(btn => {
            btn.addEventListener('click', () => applyPreset(btn.dataset.preset));
        });
    }

    /**
     * Main Canvas Drawing Function.
     * Composites background, decorations, and text.
     */
    function drawPostcard() {
        const w = canvas.width;
        const h = canvas.height;
        ctx.clearRect(0, 0, w, h);

        // 1. Draw Background (Monument)
        state.monument.draw(ctx, w, h);

        // 2. Draw Decorations
        if (state.decos.border) drawBorder(w, h);
        if (state.decos.mandala) drawMandala(w, h);
        if (state.decos.stamp) drawStamp(w, h);

        // 3. Draw Text Box Background (for readability)
        drawTextBackground(w, h);

        // 4. Draw User Message
        drawText(w, h);
    }

    function drawBorder(w, h) {
        ctx.strokeStyle = '#FDFBF7';
        ctx.lineWidth = 20;
        ctx.strokeRect(20, 20, w - 40, h - 40);
        ctx.strokeStyle = state.color;
        ctx.lineWidth = 4;
        ctx.strokeRect(35, 35, w - 70, h - 70);
    }

    function drawMandala(w, h) {
        ctx.save();
        ctx.globalAlpha = 0.15;
        ctx.strokeStyle = '#FDFBF7';
        ctx.lineWidth = 2;
        ctx.translate(w * 0.85, h * 0.2);
        for (let i = 0; i < 12; i++) {
            ctx.beginPath();
            ctx.arc(0, 0, 80, 0, Math.PI * 2);
            ctx.stroke();
            ctx.rotate(Math.PI / 6);
        }
        ctx.restore();
    }

    function drawStamp(w, h) {
        const x = w - 220, y = 60, sw = 160, sh = 200;
        ctx.save();
        ctx.fillStyle = '#FDFBF7';
        ctx.fillRect(x, y, sw, sh);
        // Perforations
        ctx.fillStyle = state.monument.gradient[1];
        for (let i = 0; i < 10; i++) {
            ctx.beginPath(); ctx.arc(x + i * (sw / 9), y, 5, 0, Math.PI * 2); ctx.fill();
            ctx.beginPath(); ctx.arc(x + i * (sw / 9), y + sh, 5, 0, Math.PI * 2); ctx.fill();
        }
        ctx.fillStyle = state.color;
        ctx.font = "bold 24px 'Outfit'";
        ctx.textAlign = 'center';
        ctx.fillText('INCREDIBLE', x + sw / 2, y + 40);
        ctx.fillText('INDIA', x + sw / 2, y + 70);
        ctx.font = "16px 'Outfit'";
        ctx.fillText('POSTAGE', x + sw / 2, y + sh - 20);
        ctx.restore();
    }

    function drawTextBackground(w, h) {
        ctx.save();
        ctx.fillStyle = 'rgba(253, 251, 247, 0.85)';
        ctx.shadowColor = 'rgba(0,0,0,0.3)';
        ctx.shadowBlur = 15;
        ctx.shadowOffsetY = 5;
        // Draw a rounded rect in the bottom left
        roundRect(ctx, 60, h - 350, w * 0.55, 280, 15);
        ctx.fill();
        ctx.restore();
    }

    function drawText(w, h) {
        ctx.save();
        const fontStyle = `${state.italic ? 'italic' : ''} ${state.bold ? 'bold' : ''} ${state.fontSize}px ${state.font}`;
        ctx.font = fontStyle;
        ctx.fillStyle = state.color;
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        const maxWidth = w * 0.45;
        const lineHeight = state.fontSize * 1.3;
        const x = 100;
        let y = h - 310;

        // Word wrap logic
        const words = state.message.split(' ');
        let line = '';
        for (let n = 0; n < words.length; n++) {
            const testLine = line + words[n] + ' ';
            const metrics = ctx.measureText(testLine);
            if (metrics.width > maxWidth && n > 0) {
                ctx.fillText(line, x, y);
                line = words[n] + ' ';
                y += lineHeight;
            } else {
                line = testLine;
            }
        }
        ctx.fillText(line, x, y);

        // Signature
        ctx.font = "italic 24px 'Caveat', cursive";
        ctx.fillStyle = state.color;
        ctx.fillText('- A Traveler', x, y + lineHeight + 20);
        ctx.restore();
    }

    function roundRect(ctx, x, y, w, h, r) {
        ctx.beginPath();
        ctx.moveTo(x + r, y);
        ctx.arcTo(x + w, y, x + w, y + h, r);
        ctx.arcTo(x + w, y + h, x, y + h, r);
        ctx.arcTo(x, y + h, x, y, r);
        ctx.arcTo(x, y, x + w, y, r);
        ctx.closePath();
    }

    /**
     * Export the canvas as a PNG file.
     */
    function downloadPostcard() {
        const link = document.createElement('a');
        link.download = 'my-india-postcard.png';
        link.href = canvas.toDataURL('image/png');
        link.click();
    }

    /**
     * Apply a quick preset template.
     */
    function applyPreset(presetId) {
        const preset = presetsData[presetId];
        if (!preset) return;

        state.monument = monumentsData.find(m => m.id === preset.monument);
        state.font = preset.font;
        state.color = preset.color;

        // Update UI controls to match preset
        document.getElementById('font-family').value = preset.font;
        document.getElementById('text-color').value = preset.color;

        // Update monument selection
        document.querySelectorAll('.monument-card').forEach(c => {
            c.classList.remove('active');
            c.setAttribute('aria-pressed', 'false');
        });
        const activeCard = Array.from(document.querySelectorAll('.monument-card')).find(c => c.querySelector('h4').textContent === state.monument.name);
        if (activeCard) {
            activeCard.classList.add('active');
            activeCard.setAttribute('aria-pressed', 'true');
        }

        // Reset decos
        Object.keys(state.decos).forEach(k => state.decos[k] = false);
        state.decos[preset.deco] = true;
        document.querySelectorAll('.deco-btn').forEach(btn => {
            const isActive = btn.dataset.deco === preset.deco;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-pressed', isActive);
        });

        drawPostcard();
    }

    function setupThemeToggle() {
        const toggle = document.getElementById('theme-toggle');
        if (!toggle) return;
        toggle.addEventListener('click', () => {
            document.body.classList.toggle('light-theme');
            const isLight = document.body.classList.contains('light-theme');
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
            toggle.textContent = isLight ? '☀️' : '🌙';
        });
        if (localStorage.getItem('theme') === 'light') {
            document.body.classList.add('light-theme');
            toggle.textContent = '☀️';
        }
    }

    document.addEventListener('DOMContentLoaded', init);
})();
