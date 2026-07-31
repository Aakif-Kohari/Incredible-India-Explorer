/**
 * Balpakram National Park Explorer Application Logic
 */

if (typeof window !== 'undefined') {
    document.addEventListener('DOMContentLoaded', () => {
        if (typeof BALPAKRAM_DATA === 'undefined') return;

        const statsGrid = document.getElementById('stats-grid');
        const historyContent = document.getElementById('history-content');
        const legendsGrid = document.getElementById('legends-grid');
        const landscapeContent = document.getElementById('landscape-content');
        const landscapeGrid = document.getElementById('landscape-grid');
        const faunaGrid = document.getElementById('fauna-grid');
        const floraGrid = document.getElementById('flora-grid');
        const waterfallsContent = document.getElementById('waterfalls-content');
        const mapHotspotsLayer = document.getElementById('map-hotspots-layer');
        const mapInfoPopup = document.getElementById('map-info-popup');
        const galleryGrid = document.getElementById('gallery-grid');
        const lightboxModal = document.getElementById('lightbox-modal');
        const lightboxEmoji = document.getElementById('lightbox-emoji');
        const lightboxCaption = document.getElementById('lightbox-caption');
        const lightboxClose = document.getElementById('lightbox-close');

        // Reusable card-grid renderer (used for legends, landscape features, fauna, flora)
        function renderCardGrid(container, items) {
            if (!container || !items) return;
            container.innerHTML = items.map(item => `
                <div class="fauna-card glass-card">
                    <div class="fauna-card-header">
                        <div class="fauna-icon">${item.icon || '🌿'}</div>
                        <div>
                            <h3>${item.name}</h3>
                            ${item.status ? `<span class="fauna-status">${item.status}</span>` : ''}
                        </div>
                    </div>
                    <p>${item.desc}</p>
                </div>
            `).join('');
        }

        // Render Stats
        if (statsGrid && BALPAKRAM_DATA.quickStats) {
            statsGrid.innerHTML = BALPAKRAM_DATA.quickStats.map(s => `
                <div class="stat-box">
                    <div style="font-size: 1.8rem; margin-bottom: 0.2rem;">${s.icon}</div>
                    <div class="stat-number">${s.value}</div>
                    <div class="stat-label">${s.label}</div>
                </div>
            `).join('');
        }

        // Render History
        if (historyContent && BALPAKRAM_DATA.history) {
            const h = BALPAKRAM_DATA.history;
            historyContent.innerHTML = `
                <h3 style="font-family: 'Playfair Display', serif; font-size: 1.5rem; color: var(--balpakram-gold); margin-bottom: 0.8rem;">
                    ${h.title}
                </h3>
                <p style="color: var(--balpakram-text-muted-dark); line-height: 1.7; margin-bottom: 1.2rem;">
                    ${h.description}
                </p>
                <ul class="fact-list">
                    ${h.facts.map(f => `<li>${f}</li>`).join('')}
                </ul>
            `;
        }

        // Render Mythology & Legends
        if (legendsGrid && BALPAKRAM_DATA.mythology) {
            renderCardGrid(legendsGrid, BALPAKRAM_DATA.mythology.legends);
        }

        // Render Landscape
        if (landscapeContent && BALPAKRAM_DATA.landscape) {
            landscapeContent.innerHTML = `<p>${BALPAKRAM_DATA.landscape.description}</p>`;
        }
        if (landscapeGrid && BALPAKRAM_DATA.landscape) {
            renderCardGrid(landscapeGrid, BALPAKRAM_DATA.landscape.features);
        }

        // Render Wildlife
        if (faunaGrid && BALPAKRAM_DATA.wildlife) {
            renderCardGrid(faunaGrid, BALPAKRAM_DATA.wildlife);
        }

        // Render Rare Plants
        if (floraGrid && BALPAKRAM_DATA.flora) {
            renderCardGrid(floraGrid, BALPAKRAM_DATA.flora);
        }

        // Render Waterfalls
        if (waterfallsContent && BALPAKRAM_DATA.waterfalls) {
            const w = BALPAKRAM_DATA.waterfalls;
            waterfallsContent.innerHTML = `
                <h3 style="font-family: 'Playfair Display', serif; font-size: 1.5rem; color: var(--balpakram-gold); margin-bottom: 0.8rem;">
                    ${w.title}
                </h3>
                <p style="color: var(--balpakram-text-muted-dark); line-height: 1.7; margin-bottom: 1.2rem;">
                    ${w.description}
                </p>
                <ul class="fact-list">
                    ${w.highlights.map(f => `<li>${f}</li>`).join('')}
                </ul>
            `;
        }

        // Render Map Hotspots
        if (mapHotspotsLayer && BALPAKRAM_DATA.mapHotspots) {
            mapHotspotsLayer.innerHTML = BALPAKRAM_DATA.mapHotspots.map(h => `
                <button type="button" class="map-pin-btn" style="left: ${(h.x/1000)*100}%; top: ${(h.y/600)*100}%;" data-id="${h.id}">
                    📍 ${h.name}
                </button>
            `).join('');

            mapHotspotsLayer.addEventListener('click', (e) => {
                const pin = e.target.closest('.map-pin-btn');
                if (pin && mapInfoPopup) {
                    const id = pin.getAttribute('data-id');
                    const hObj = BALPAKRAM_DATA.mapHotspots.find(h => h.id === id);
                    if (hObj) {
                        mapInfoPopup.innerHTML = `
                            <h4 style="font-size: 1.1rem; color: var(--balpakram-gold); margin-bottom: 0.3rem;">📍 ${hObj.name}</h4>
                            <p style="font-size: 0.9rem; color: var(--balpakram-text-muted-dark);">${hObj.desc}</p>
                        `;
                        mapInfoPopup.classList.remove('hidden');
                    }
                }
            });
        }

        // Render Gallery (emoji-based visual cards)
        if (galleryGrid && BALPAKRAM_DATA.gallery) {
            galleryGrid.innerHTML = BALPAKRAM_DATA.gallery.map(g => `
                <div class="gallery-item" data-emoji="${g.emoji}" data-title="${g.title}" data-caption="${g.caption}" tabindex="0" role="button" aria-label="${g.caption}">
                    <div class="gallery-emoji-box">${g.emoji}</div>
                    <div class="gallery-caption">${g.caption}</div>
                </div>
            `).join('');

            document.querySelectorAll('.gallery-item').forEach(item => {
                const openLightbox = () => {
                    const emoji = item.getAttribute('data-emoji');
                    const title = item.getAttribute('data-title');
                    const cap = item.getAttribute('data-caption');
                    if (lightboxEmoji && lightboxCaption && lightboxModal) {
                        lightboxEmoji.textContent = emoji;
                        lightboxCaption.innerHTML = `
                            <div class="lightbox-caption-title">${title}</div>
                            <div class="lightbox-caption-text">${cap}</div>
                        `;
                        lightboxModal.classList.remove('hidden');
                    }
                };
                item.addEventListener('click', openLightbox);
                item.addEventListener('keydown', (e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        openLightbox();
                    }
                });
            });
        }

        if (lightboxClose) {
            lightboxClose.addEventListener('click', () => {
                if (lightboxModal) lightboxModal.classList.add('hidden');
            });
        }

        if (lightboxModal) {
            lightboxModal.addEventListener('click', (e) => {
                if (e.target === lightboxModal) lightboxModal.classList.add('hidden');
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && lightboxModal && !lightboxModal.classList.contains('hidden')) {
                lightboxModal.classList.add('hidden');
            }
        });
    });
}