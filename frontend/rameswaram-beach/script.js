/**
 * Rameswaram Beach Profile Interactive Script
 * Handles Tab Navigation, Gallery Filtering, Lightbox Modal with Prev/Next,
 * 22 Sacred Wells Search / Filter, Leaflet Map with Sacred Markers, Itinerary Switcher,
 * Ambient Sacred Temple Waves & Bells Synthesizer (Web Audio API), and Theme Synchronization.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 0. Mobile Hamburger Menu Toggle ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');

    if (menuToggle && navMenu) {
        menuToggle.addEventListener('click', () => {
            const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
            menuToggle.setAttribute('aria-expanded', !isExpanded);
            navMenu.classList.toggle('active');
        });
    }

    // --- 1. 22 Sacred Wells (Theerthams) Live Filter ---
    const wellInput = document.getElementById('theerthamSearch');
    const wellItems = document.querySelectorAll('.theertham-item');

    if (wellInput && wellItems.length > 0) {
        wellInput.addEventListener('input', (e) => {
            const q = e.target.value.toLowerCase().trim();
            wellItems.forEach(item => {
                const name = item.querySelector('.theertham-name')?.textContent.toLowerCase() || '';
                const desc = item.querySelector('.theertham-desc')?.textContent.toLowerCase() || '';
                if (name.includes(q) || desc.includes(q)) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    }

    // --- 2. Itinerary Tabs ---
    const itinBtns = document.querySelectorAll('.itinerary-btn');
    const itinPanels = document.querySelectorAll('.itinerary-panel');

    itinBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            itinBtns.forEach(b => b.classList.remove('active'));
            itinPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const targetId = btn.getAttribute('data-target');
            const targetPanel = document.getElementById(targetId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // --- 3. Gallery Category Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery figure');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.35s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- 4. Lightbox Modal with Next / Prev Navigation ---
    const grid = document.getElementById('galleryGrid');
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lbImg');
    const lbCap = document.getElementById('lbCap');
    const lbClose = document.getElementById('lbClose');
    const lbPrev = document.getElementById('lbPrev');
    const lbNext = document.getElementById('lbNext');

    let currentIdx = 0;
    let visibleFigures = Array.from(galleryItems);

    function updateVisibleFigures() {
        visibleFigures = Array.from(galleryItems).filter(fig => fig.style.display !== 'none');
    }

    function showFigure(index) {
        updateVisibleFigures();
        if (visibleFigures.length === 0) return;
        if (index < 0) index = visibleFigures.length - 1;
        if (index >= visibleFigures.length) index = 0;
        currentIdx = index;

        const fig = visibleFigures[currentIdx];
        lbImg.src = fig.getAttribute('data-full');
        lbImg.alt = fig.querySelector('img').alt;
        lbCap.textContent = fig.getAttribute('data-cap');
        lb.classList.add('open');
    }

    if (grid && lb) {
        grid.addEventListener('click', (e) => {
            const fig = e.target.closest('figure');
            if (!fig) return;
            updateVisibleFigures();
            const idx = visibleFigures.indexOf(fig);
            showFigure(idx !== -1 ? idx : 0);
        });

        if (lbClose) {
            lbClose.addEventListener('click', () => {
                lb.classList.remove('open');
                lbImg.src = '';
            });
        }

        if (lbPrev) lbPrev.addEventListener('click', () => showFigure(currentIdx - 1));
        if (lbNext) lbNext.addEventListener('click', () => showFigure(currentIdx + 1));

        lb.addEventListener('click', (e) => {
            if (e.target === lb) {
                lb.classList.remove('open');
                lbImg.src = '';
            }
        });

        document.addEventListener('keydown', (e) => {
            if (lb.classList.contains('open')) {
                if (e.key === 'Escape') {
                    lb.classList.remove('open');
                    lbImg.src = '';
                } else if (e.key === 'ArrowLeft') {
                    showFigure(currentIdx - 1);
                } else if (e.key === 'ArrowRight') {
                    showFigure(currentIdx + 1);
                }
            }
        });
    }

    // --- 5. Interactive Leaflet Map ---
    function initMap() {
        if (!window.L) return;
        const mapContainer = document.getElementById('rameswaram-map');
        if (!mapContainer) return;

        const map = L.map('rameswaram-map', { scrollWheelZoom: false }).setView([9.2876, 79.3129], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(map);

        const places = [
            { name: 'Agni Theertham (Rameswaram Beach)', coords: [9.2882, 79.3175], desc: 'Holy ritual bathing sea shore facing the temple' },
            { name: 'Ramanathaswamy Temple', coords: [9.2881, 79.3174], desc: 'Jyotirlinga shrine with iconic 1,000-pillar corridor' },
            { name: 'Pamban Rail & Road Bridge', coords: [9.2798, 79.2025], desc: 'Historic sea bridge connecting island to mainland' },
            { name: 'Dhanushkodi Ghost Town', coords: [9.1780, 79.4140], desc: 'Ruins of cyclone-swept town where two seas meet' },
            { name: 'Arichal Munai (Adam's Bridge Vantage)', coords: [9.1550, 79.4450], desc: 'Southernmost tip of Pamban Island facing Ram Setu' },
            { name: 'Villoondi Theertham', coords: [9.2850, 79.2550], desc: 'Sacred sweet-water spring inside the sea' },
            { name: 'Dr. APJ Abdul Kalam Memorial', coords: [9.2760, 79.2930], desc: 'Peikarumbu resting place of the People's President' }
        ];

        places.forEach(p => {
            L.marker(p.coords)
                .addTo(map)
                .bindPopup(`
                    <div style="font-family: system-ui, sans-serif; font-size: 13px;">
                        <strong style="color: #0e3b47; font-size: 14px;">${p.name}</strong><br>
                        <span style="color: #475569;">${p.desc}</span><br>
                        <small style="color: #8f6b24;">📍 ${p.coords[0].toFixed(4)}° N, ${p.coords[1].toFixed(4)}° E</small>
                    </div>
                `);
        });
    }

    initMap();

    // --- 6. Ambient Sacred Temple Shore Synthesizer (Web Audio API) ---
    let audioCtx = null;
    let isPlayingAudio = false;
    let waveInterval = null;

    const audioBtn = document.getElementById('sacred-audio-toggle');

    function startSacredAudio() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        // Gentle ocean wash
        const bufferSize = audioCtx.sampleRate * 2;
        const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;

        for (let i = 0; i < bufferSize; i++) {
            const white = Math.random() * 2 - 1;
            b0 = 0.99886 * b0 + white * 0.0555179;
            b1 = 0.99332 * b1 + white * 0.0750759;
            b2 = 0.96900 * b2 + white * 0.1538520;
            b3 = 0.86650 * b3 + white * 0.3104856;
            b4 = 0.55000 * b4 + white * 0.5329522;
            b5 = -0.7616 * b5 - white * 0.0168980;
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.06;
            b6 = white * 0.115926;
        }

        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(260, audioCtx.currentTime);

        const gainNode = audioCtx.createGain();
        gainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(gainNode);
        gainNode.connect(audioCtx.destination);
        whiteNoise.start();

        let wavePhase = 0;
        waveInterval = setInterval(() => {
            if (!isPlayingAudio || !gainNode) return;
            wavePhase += 0.08;
            const targetGain = 0.07 + 0.05 * Math.sin(wavePhase);
            gainNode.gain.setTargetAtTime(targetGain, audioCtx.currentTime, 0.4);
        }, 350);
    }

    if (audioBtn) {
        audioBtn.addEventListener('click', () => {
            if (!isPlayingAudio) {
                startSacredAudio();
                isPlayingAudio = true;
                audioBtn.classList.add('active');
                audioBtn.setAttribute('aria-label', 'Mute Sacred Waves Audio');
                showToast('🔔 Ambient Shore & Sacred Bells Soundscape Playing');
            } else {
                if (audioCtx) audioCtx.suspend();
                if (waveInterval) clearInterval(waveInterval);
                isPlayingAudio = false;
                audioBtn.classList.remove('active');
                audioBtn.setAttribute('aria-label', 'Play Sacred Waves Audio');
                showToast('🔇 Sacred Audio Paused');
            }
        });
    }

    // --- 7. Share & Toast Notification ---
    const shareBtn = document.getElementById('share-btn');
    const toast = document.getElementById('toast-msg');

    function showToast(msg) {
        if (!toast) return;
        toast.textContent = msg;
        toast.classList.add('show');
        setTimeout(() => toast.classList.remove('show'), 3000);
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const shareData = {
                title: 'Rameswaram Beach — Tamil Nadu | Incredible India Explorer',
                text: 'Discover Rameswaram Beach, Agni Theertham, Pamban Bridge, and the 22 Sacred Wells of Ramanathaswamy Temple.',
                url: window.location.href
            };
            if (navigator.share) {
                try { await navigator.share(shareData); } catch (e) {}
            } else {
                navigator.clipboard.writeText(window.location.href);
                showToast('📋 Link Copied to Clipboard!');
            }
        });
    }

    // --- 8. Back to Top ---
    const backToTop = document.getElementById('back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) backToTop.classList.add('visible');
            else backToTop.classList.remove('visible');
        });
        backToTop.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 9. Theme Toggle ---
    const themeBtn = document.getElementById('theme-toggle');
    if (themeBtn) {
        themeBtn.dataset.listenerBound = 'true';
        themeBtn.addEventListener('click', () => {
            const isLight = document.body.classList.toggle('light-theme');
            if (isLight) {
                document.documentElement.setAttribute('data-theme', 'light');
            } else {
                document.documentElement.removeAttribute('data-theme');
            }
            localStorage.setItem('theme', isLight ? 'light' : 'dark');
        });
    }
});
