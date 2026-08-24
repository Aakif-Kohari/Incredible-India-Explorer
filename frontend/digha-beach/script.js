/**
 * Digha Beach Profile Interactive Features
 * Handles Tab Navigation, Gallery Filtering, Lightbox Modal with Prev/Next,
 * Leaflet Map with Custom Points & Filters, Tidal Estimator, Itinerary Tabs,
 * Ambient Ocean Waves Soundscape (Web Audio API), Share/Toast, and Theme Synchronization.
 */

document.addEventListener('DOMContentLoaded', () => {

    // --- 1. Interactive Explorer Hub Tabs ---
    const tabBtns = document.querySelectorAll('.hub-tab-btn');
    const tabPanels = document.querySelectorAll('.hub-panel');

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => {
                b.classList.remove('active');
                b.setAttribute('aria-selected', 'false');
            });
            tabPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            btn.setAttribute('aria-selected', 'true');

            const panelId = btn.getAttribute('aria-controls');
            const targetPanel = document.getElementById(panelId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });

        btn.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                btn.click();
            }
        });
    });

    // --- 2. Interactive Weekend Itinerary Tabs ---
    const itineraryBtns = document.querySelectorAll('.itinerary-btn');
    const itineraryPanels = document.querySelectorAll('.itinerary-panel');

    itineraryBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            itineraryBtns.forEach(b => b.classList.remove('active'));
            itineraryPanels.forEach(p => p.classList.remove('active'));

            btn.classList.add('active');
            const panelId = btn.getAttribute('data-target');
            const targetPanel = document.getElementById(panelId);
            if (targetPanel) {
                targetPanel.classList.add('active');
            }
        });
    });

    // --- 3. Gallery Category Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-card-item');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            galleryItems.forEach(item => {
                const category = item.getAttribute('data-category');

                if (filterValue === 'all' || category === filterValue) {
                    item.style.display = 'block';
                    item.style.animation = 'fadeIn 0.4s ease';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });

    // --- 4. Lightbox Modal Gallery Viewer with Prev/Next Navigation ---
    const modal = document.getElementById('lightbox-modal');
    const modalImg = document.getElementById('lightbox-img');
    const modalTitle = document.getElementById('lightbox-title');
    const modalDesc = document.getElementById('lightbox-desc');
    const modalCounter = document.getElementById('lightbox-counter');
    const closeBtn = document.getElementById('lightbox-close-btn');
    const prevBtn = document.getElementById('lightbox-prev-btn');
    const nextBtn = document.getElementById('lightbox-next-btn');

    let currentImageIndex = 0;
    let visibleGalleryItems = Array.from(galleryItems);

    function updateVisibleItems() {
        visibleGalleryItems = Array.from(galleryItems).filter(item => item.style.display !== 'none');
    }

    function showLightboxIndex(index) {
        updateVisibleItems();
        if (visibleGalleryItems.length === 0) return;

        if (index < 0) index = visibleGalleryItems.length - 1;
        if (index >= visibleGalleryItems.length) index = 0;
        currentImageIndex = index;

        const currentItem = visibleGalleryItems[currentImageIndex];
        const img = currentItem.querySelector('img');
        const title = currentItem.querySelector('h4');
        const desc = currentItem.querySelector('p');

        if (img && modalImg) {
            modalImg.src = img.src;
            modalImg.alt = img.alt || '';
            if (modalTitle) modalTitle.textContent = title ? title.textContent : 'Digha Beach Visual';
            if (modalDesc) modalDesc.textContent = desc ? desc.textContent : '';
            if (modalCounter) modalCounter.textContent = `Photo ${currentImageIndex + 1} of ${visibleGalleryItems.length}`;
            modal.classList.add('active');
        }
    }

    galleryItems.forEach((item) => {
        const openLightbox = () => {
            updateVisibleItems();
            const idx = visibleGalleryItems.indexOf(item);
            showLightboxIndex(idx !== -1 ? idx : 0);
            if (closeBtn) closeBtn.focus();
        };

        item.addEventListener('click', openLightbox);
        item.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                openLightbox();
            }
        });
    });

    const closeModal = () => {
        if (modal) {
            modal.classList.remove('active');
        }
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    if (prevBtn) prevBtn.addEventListener('click', () => showLightboxIndex(currentImageIndex - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => showLightboxIndex(currentImageIndex + 1));

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }

    document.addEventListener('keydown', (e) => {
        if (modal && modal.classList.contains('active')) {
            if (e.key === 'Escape') closeModal();
            if (e.key === 'ArrowLeft') showLightboxIndex(currentImageIndex - 1);
            if (e.key === 'ArrowRight') showLightboxIndex(currentImageIndex + 1);
        }
    });

    // --- 5. Interactive Leaflet Map with Points & View Controls ---
    let mapInstance = null;
    const mapLocations = [
        { name: 'Digha Main Beach (Old Digha)', coords: [21.6267, 87.5125], type: 'beach', desc: 'Calm seaside, sunrise point, rock embankment' },
        { name: 'New Digha Beach & Promenade', coords: [21.6384, 87.5096], type: 'beach', desc: 'Wide shallow flat, water sports, pony rides' },
        { name: 'Marine Aquarium & Regional Centre (ZSI)', coords: [21.6342, 87.5140], type: 'attraction', desc: 'Largest marine aquarium in India by ZSI' },
        { name: 'Amarabati Park & Ropeway', coords: [21.6450, 87.5150], type: 'attraction', desc: 'Boating lake, lush garden, ropeway' },
        { name: 'Udaipur Beach', coords: [21.6180, 87.4930], type: 'beach', desc: 'Serene beach on Bengal-Odisha border with red crabs' },
        { name: 'Talsari Beach (Odisha)', coords: [21.5980, 87.4500], type: 'beach', desc: 'Subarnarekha river mouth, palm dunes, red ghost crabs' },
        { name: 'Shankarpur Fishing Harbour & Beach', coords: [21.7075, 87.6203], type: 'beach', desc: 'Twin beach with active fishing harbour' },
        { name: 'Chandaneswar Shiva Temple', coords: [21.6050, 87.4560], type: 'attraction', desc: 'Historic 19th-century temple near border' },
        { name: 'Digha Railway Station (DGHA)', coords: [21.6360, 87.5180], type: 'transit', desc: 'Terminal railway hub connecting Kolkata' }
    ];

    function initMap() {
        if (!window.L) return;
        const mapEl = document.getElementById('digha-map');
        if (!mapEl) return;

        mapInstance = L.map('digha-map', { scrollWheelZoom: false }).setView([21.6384, 87.5096], 12);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
            maxZoom: 19
        }).addTo(mapInstance);

        const markers = [];

        mapLocations.forEach(place => {
            const marker = L.marker(place.coords).addTo(mapInstance);
            marker.bindPopup(`
                <div style="font-family: system-ui, sans-serif; font-size: 13px;">
                    <strong style="color: #e11d48; font-size: 14px;">${place.name}</strong><br>
                    <span style="color: #64748b;">${place.desc}</span><br>
                    <small>📍 ${place.coords[0].toFixed(4)}° N, ${place.coords[1].toFixed(4)}° E</small>
                </div>
            `);
            markers.push({ place, marker });
        });

        // Open popup for New Digha
        const defaultMarker = markers.find(m => m.place.name.includes('New Digha'));
        if (defaultMarker) {
            defaultMarker.marker.openPopup();
        }

        // Map Filter Buttons
        const mapFilterBtns = document.querySelectorAll('.map-btn');
        mapFilterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                mapFilterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const filter = btn.getAttribute('data-map-filter');

                if (filter === 'all') {
                    mapInstance.setView([21.6384, 87.5096], 12);
                } else if (filter === 'beaches') {
                    mapInstance.setView([21.6300, 87.5100], 13);
                } else if (filter === 'attractions') {
                    mapInstance.setView([21.6380, 87.5160], 14);
                }
            });
        });
    }

    initMap();

    // --- 6. Live Tidal & Sunrise Estimator Widget ---
    function updateTideStatus() {
        const now = new Date();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const tideTextEl = document.getElementById('live-tide-text');
        if (!tideTextEl) return;

        // Approximate semi-diurnal tide calculation simulation for Bay of Bengal coast
        const timeVal = hours + minutes / 60;
        const tideCycle = (timeVal % 12.42);

        if (tideCycle < 3 || (tideCycle >= 6 && tideCycle < 9)) {
            tideTextEl.innerHTML = '<span class="pulse-dot"></span> <strong>Current Status:</strong> Low Tide Phase &mdash; Sand flats are exposed (~1 km wide). Perfect for walking, wading & photography!';
        } else {
            tideTextEl.innerHTML = '<span class="pulse-dot"></span> <strong>Current Status:</strong> High Tide Phase &mdash; Sea water reaches the concrete promenade. Enjoy sea views from the embankment!';
        }
    }
    updateTideStatus();

    // --- 7. Synthesized Ambient Ocean Wave Soundscape (Web Audio API) ---
    let audioCtx = null;
    let isPlayingAudio = false;
    let oceanGainNode = null;
    let oceanInterval = null;

    const audioToggleBtn = document.getElementById('ocean-audio-toggle');

    function createOceanSound() {
        if (!audioCtx) {
            audioCtx = new (window.AudioContext || window.webkitAudioContext)();
        }
        if (audioCtx.state === 'suspended') {
            audioCtx.resume();
        }

        // Pink noise buffer generator for wave simulation
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
            output[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.08;
            b6 = white * 0.115926;
        }

        const whiteNoise = audioCtx.createBufferSource();
        whiteNoise.buffer = noiseBuffer;
        whiteNoise.loop = true;

        const filter = audioCtx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(320, audioCtx.currentTime);
        filter.Q.setValueAtTime(2.5, audioCtx.currentTime);

        oceanGainNode = audioCtx.createGain();
        oceanGainNode.gain.setValueAtTime(0.01, audioCtx.currentTime);

        whiteNoise.connect(filter);
        filter.connect(oceanGainNode);
        oceanGainNode.connect(audioCtx.destination);

        whiteNoise.start();

        // Wave ebb and surge oscillation
        let waveCycle = 0;
        oceanInterval = setInterval(() => {
            if (!isPlayingAudio || !oceanGainNode) return;
            waveCycle += 0.1;
            const targetGain = 0.08 + 0.07 * Math.sin(waveCycle);
            const targetFreq = 300 + 200 * Math.sin(waveCycle);
            oceanGainNode.gain.setTargetAtTime(targetGain, audioCtx.currentTime, 0.5);
            filter.frequency.setTargetAtTime(targetFreq, audioCtx.currentTime, 0.5);
        }, 300);

        return { whiteNoise, filter, oceanGainNode };
    }

    if (audioToggleBtn) {
        audioToggleBtn.addEventListener('click', () => {
            if (!isPlayingAudio) {
                createOceanSound();
                isPlayingAudio = true;
                audioToggleBtn.classList.add('active');
                audioToggleBtn.setAttribute('aria-label', 'Mute Ocean Wave Sounds');
                showToast('🌊 Relaxing Ocean Wave Ambient Audio Turned On');
            } else {
                if (audioCtx) {
                    audioCtx.suspend();
                }
                if (oceanInterval) clearInterval(oceanInterval);
                isPlayingAudio = false;
                audioToggleBtn.classList.remove('active');
                audioToggleBtn.setAttribute('aria-label', 'Play Ocean Wave Sounds');
                showToast('🔇 Ocean Wave Audio Paused');
            }
        });
    }

    // --- 8. Share Page & Toast Notification ---
    const shareBtn = document.getElementById('share-btn');
    const toast = document.getElementById('toast-msg');

    function showToast(message) {
        if (!toast) return;
        toast.textContent = message;
        toast.classList.add('show');
        setTimeout(() => {
            toast.classList.remove('show');
        }, 3000);
    }

    if (shareBtn) {
        shareBtn.addEventListener('click', async () => {
            const shareData = {
                title: 'Digha Beach, West Bengal — Brighton of the East',
                text: 'Discover Digha Beach — wide shallow sands, casuarina groves, sunrise and sunset on the Bay of Bengal.',
                url: window.location.href
            };

            if (navigator.share) {
                try {
                    await navigator.share(shareData);
                } catch (err) {
                    // Share dismissed
                }
            } else {
                navigator.clipboard.writeText(window.location.href);
                showToast('📋 Page Link Copied to Clipboard!');
            }
        });
    }

    // --- 9. Back to Top Button ---
    const backToTopBtn = document.getElementById('back-to-top');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 400) {
                backToTopBtn.classList.add('visible');
            } else {
                backToTopBtn.classList.remove('visible');
            }
        });

        backToTopBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- 10. Theme Toggle Synchronization ---
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
