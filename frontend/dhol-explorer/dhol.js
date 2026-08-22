/**
 * Dhol Explorer — Interactive Application Logic & Web Audio Studio
 */

// Web Audio Context & Sound Engine
let audioCtx = null;
let masterGain = null;
let activeLoopInterval = null;
let currentLoopStep = 0;
let isLoopPlaying = false;
let currentRhythmIndex = 0;
let currentBpm = 128;

function initAudio() {
    if (!audioCtx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) {
            audioCtx = new AudioContextClass();
            masterGain = audioCtx.createGain();
            masterGain.gain.setValueAtTime(0.85, audioCtx.currentTime);
            masterGain.connect(audioCtx.destination);
        }
    }
    if (audioCtx && audioCtx.state === 'suspended') {
        audioCtx.resume();
    }
}

/**
 * Play synthesized realistic Bass Drum Strike (Nar Head / Dagga)
 * Low fundamental with pitch envelope drop + rich wooden body resonance
 */
function playBassSound(accent = 1.0) {
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();
    const filter = audioCtx.createBiquadFilter();

    // Pitch envelope: drops quickly from 150Hz to 55Hz (classic dhol thud)
    osc.type = 'sine';
    osc.frequency.setValueAtTime(160, now);
    osc.frequency.exponentialRampToValueAtTime(52, now + 0.12);

    // Filter to simulate wooden body cavity resonance
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(280, now);
    filter.Q.setValueAtTime(3.5, now);

    // Gain envelope
    gain.gain.setValueAtTime(0.95 * accent, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.4);

    triggerVisualHit('bass');
}

/**
 * Play synthesized realistic Treble Drum Strike (Madeen Head / Tilli)
 * High snappy transient with crisp metallic/cane slap overtone
 */
function playTrebleSound(accent = 1.0) {
    initAudio();
    if (!audioCtx) return;

    const now = audioCtx.currentTime;

    // High snap oscillator
    const osc = audioCtx.createOscillator();
    const gain = audioCtx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(420, now);
    osc.frequency.exponentialRampToValueAtTime(220, now + 0.08);

    gain.gain.setValueAtTime(0.8 * accent, now);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

    osc.connect(gain);
    gain.connect(masterGain);

    osc.start(now);
    osc.stop(now + 0.16);

    // Noise burst for the cane slap crack
    const bufferSize = audioCtx.sampleRate * 0.05;
    const noiseBuffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
        output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = audioCtx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    const noiseFilter = audioCtx.createBiquadFilter();
    noiseFilter.type = 'highpass';
    noiseFilter.frequency.setValueAtTime(1400, now);

    const noiseGain = audioCtx.createGain();
    noiseGain.gain.setValueAtTime(0.6 * accent, now);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + 0.06);

    whiteNoise.connect(noiseFilter);
    noiseFilter.connect(noiseGain);
    noiseGain.connect(masterGain);

    whiteNoise.start(now);
    whiteNoise.stop(now + 0.07);

    triggerVisualHit('treble');
}

function triggerVisualHit(type) {
    const pad = document.getElementById(type === 'bass' ? 'pad-bass' : 'pad-treble');
    const visualizer = document.getElementById('beat-visualizer');
    if (pad) {
        pad.classList.add('hit');
        setTimeout(() => pad.classList.remove('hit'), 140);
    }
    if (visualizer) {
        visualizer.classList.add(type === 'bass' ? 'pulse-bass' : 'pulse-treble');
        setTimeout(() => {
            visualizer.classList.remove('pulse-bass', 'pulse-treble');
        }, 120);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    renderStats();
    renderVirtualStudio();
    renderRegionalExplorer();
    renderFestivals();
    renderDanceTraditions();
    renderConstruction();
    renderGallery();
    renderSignificance();
    renderReferences();
    renderImageCredits();
    initThemeToggle();
    initKeyboardListeners();
    initLightbox();
});

function renderStats() {
    const grid = document.getElementById('stats-grid');
    if (!grid || typeof DHOL_INFO === 'undefined') return;

    grid.innerHTML = DHOL_INFO.quickStats
        .map(
            stat => `
        <div class="stat-card">
            <span class="stat-icon" aria-hidden="true">${stat.icon}</span>
            <div class="stat-val">${stat.value}</div>
            <div class="stat-lbl">${stat.label}</div>
        </div>
    `
        )
        .join('');
}

/**
 * Interactive Virtual Dhol Studio
 */
function renderVirtualStudio() {
    const studioContainer = document.getElementById('virtual-dhol-studio');
    if (!studioContainer || typeof DHOL_RHYTHMS === 'undefined') return;

    const rhythm = DHOL_RHYTHMS[currentRhythmIndex];

    studioContainer.innerHTML = `
        <div class="studio-card">
            <div class="studio-header">
                <div>
                    <span class="studio-tag">Interactive Audio Studio</span>
                    <h3>Play the Dhol &amp; Explore Rhythms</h3>
                </div>
                <div class="keyboard-shortcuts">
                    <span>Keys: <kbd>A</kbd> Bass · <kbd>D</kbd> Treble · <kbd>Space</kbd> Both</span>
                </div>
            </div>

            <!-- Virtual Drum Interactive Hit Pads -->
            <div class="virtual-drum-wrap">
                <div class="drum-pad bass-pad" id="pad-bass" tabindex="0" role="button" aria-label="Play Bass Dhol head with Dagga stick">
                    <div class="pad-label">
                        <span class="pad-emoji">🪵</span>
                        <strong>BASS HEAD (NAR)</strong>
                        <small>Deep Thud · Dagga Stick</small>
                    </div>
                    <div class="pad-key">Press 'A' / Tap</div>
                </div>

                <div class="drum-center-body" id="beat-visualizer">
                    <div class="visualizer-logo">🥁</div>
                    <div class="visualizer-status" id="visualizer-status">Tap a Head or Start Loop</div>
                    <div class="beat-dots" id="beat-dots"></div>
                </div>

                <div class="drum-pad treble-pad" id="pad-treble" tabindex="0" role="button" aria-label="Play Treble Dhol head with Tilli stick">
                    <div class="pad-label">
                        <span class="pad-emoji">🥢</span>
                        <strong>TREBLE HEAD (MADEEN)</strong>
                        <small>Crisp Slap · Tilli Stick</small>
                    </div>
                    <div class="pad-key">Press 'D' / Tap</div>
                </div>
            </div>

            <!-- Preset Rhythm Loop Sequencer -->
            <div class="sequencer-panel">
                <div class="rhythm-selector-row">
                    <div class="rhythm-buttons">
                        ${DHOL_RHYTHMS.map(
                            (r, idx) => `
                            <button type="button" class="rhythm-btn ${idx === currentRhythmIndex ? 'active' : ''}" data-idx="${idx}">
                                🎵 ${r.name}
                            </button>
                        `
                        ).join('')}
                    </div>

                    <div class="sequencer-controls">
                        <button type="button" class="loop-play-btn" id="loop-play-btn">
                            ▶ Play Loop
                        </button>
                        <div class="bpm-control">
                            <label for="bpm-slider">Tempo: <b id="bpm-val">${rhythm.tempo}</b> BPM</label>
                            <input type="range" id="bpm-slider" min="90" max="180" value="${rhythm.tempo}" />
                        </div>
                    </div>
                </div>

                <div class="rhythm-info-banner" id="rhythm-info-banner">
                    <strong>${rhythm.name} (${rhythm.region}):</strong> ${rhythm.description}
                    <div class="bols-display"><em>Bols:</em> ${rhythm.bols}</div>
                </div>
            </div>
        </div>
    `;

    // Pad click listeners
    const padBass = document.getElementById('pad-bass');
    const padTreble = document.getElementById('pad-treble');

    padBass.addEventListener('click', () => playBassSound());
    padTreble.addEventListener('click', () => playTrebleSound());

    // Enter / Space key on focused pads
    padBass.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            playBassSound();
        }
    });
    padTreble.addEventListener('keydown', e => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            playTrebleSound();
        }
    });

    // Rhythm preset buttons
    document.querySelectorAll('.rhythm-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('.rhythm-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentRhythmIndex = parseInt(btn.dataset.idx, 10);
            const selRhythm = DHOL_RHYTHMS[currentRhythmIndex];
            currentBpm = selRhythm.tempo;

            const slider = document.getElementById('bpm-slider');
            const bpmVal = document.getElementById('bpm-val');
            if (slider) slider.value = currentBpm;
            if (bpmVal) bpmVal.textContent = currentBpm;

            const banner = document.getElementById('rhythm-info-banner');
            if (banner) {
                banner.innerHTML = `
                    <strong>${selRhythm.name} (${selRhythm.region}):</strong> ${selRhythm.description}
                    <div class="bols-display"><em>Bols:</em> ${selRhythm.bols}</div>
                `;
            }

            renderBeatDots();
            if (isLoopPlaying) {
                restartLoop();
            }
        });
    });

    // Tempo Slider
    const bpmSlider = document.getElementById('bpm-slider');
    const bpmVal = document.getElementById('bpm-val');
    bpmSlider.addEventListener('input', e => {
        currentBpm = parseInt(e.target.value, 10);
        bpmVal.textContent = currentBpm;
        if (isLoopPlaying) {
            restartLoop();
        }
    });

    // Loop play/pause
    const playBtn = document.getElementById('loop-play-btn');
    playBtn.addEventListener('click', toggleLoopPlayback);

    renderBeatDots();
}

function renderBeatDots() {
    const container = document.getElementById('beat-dots');
    if (!container || typeof DHOL_RHYTHMS === 'undefined') return;

    const rhythm = DHOL_RHYTHMS[currentRhythmIndex];
    container.innerHTML = rhythm.pattern
        .map(
            (p, idx) => `
        <span class="beat-dot" id="dot-${idx}"></span>
    `
        )
        .join('');
}

function toggleLoopPlayback() {
    if (isLoopPlaying) {
        stopLoop();
    } else {
        startLoop();
    }
}

function startLoop() {
    initAudio();
    isLoopPlaying = true;
    currentLoopStep = 0;
    const playBtn = document.getElementById('loop-play-btn');
    const status = document.getElementById('visualizer-status');
    if (playBtn) {
        playBtn.classList.add('playing');
        playBtn.textContent = '⏹ Stop Loop';
    }
    if (status) status.textContent = 'Loop Playing… Feel the Chaal!';

    restartLoop();
}

function stopLoop() {
    isLoopPlaying = false;
    if (activeLoopInterval) {
        clearInterval(activeLoopInterval);
        activeLoopInterval = null;
    }
    const playBtn = document.getElementById('loop-play-btn');
    const status = document.getElementById('visualizer-status');
    if (playBtn) {
        playBtn.classList.remove('playing');
        playBtn.textContent = '▶ Play Loop';
    }
    if (status) status.textContent = 'Loop Stopped';
    document.querySelectorAll('.beat-dot').forEach(d => d.classList.remove('active'));
}

function restartLoop() {
    if (activeLoopInterval) {
        clearInterval(activeLoopInterval);
    }
    const rhythm = DHOL_RHYTHMS[currentRhythmIndex];
    const stepDurationMs = (60 / currentBpm) * 500; // 8th-note duration

    activeLoopInterval = setInterval(() => {
        const step = rhythm.pattern[currentLoopStep];
        if (step.bass) playBassSound(1.0);
        if (step.treble) playTrebleSound(0.9);

        document.querySelectorAll('.beat-dot').forEach((d, idx) => {
            d.classList.toggle('active', idx === currentLoopStep);
        });

        currentLoopStep = (currentLoopStep + 1) % rhythm.pattern.length;
    }, stepDurationMs);
}

function initKeyboardListeners() {
    window.addEventListener('keydown', e => {
        // Ignore typing in input fields
        if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

        if (e.key === 'a' || e.key === 'A' || e.key === 'ArrowLeft') {
            e.preventDefault();
            playBassSound();
        } else if (e.key === 'd' || e.key === 'D' || e.key === 'ArrowRight') {
            e.preventDefault();
            playTrebleSound();
        } else if (e.key === ' ' || e.key === 'Spacebar') {
            e.preventDefault();
            playBassSound(0.9);
            playTrebleSound(0.85);
        }
    });
}

/**
 * Interactive Regional Instrument Explorer.
 */
function renderRegionalExplorer() {
    const grid = document.getElementById('regional-grid');
    const detailPanel = document.getElementById('regional-detail');
    if (!grid || !detailPanel || typeof REGIONAL_VARIANTS === 'undefined' || !REGIONAL_VARIANTS.length) return;

    grid.innerHTML = REGIONAL_VARIANTS.map(
        variant => `
        <button
            type="button"
            class="regional-card"
            data-variant-id="${variant.id}"
            aria-pressed="false"
        >
            <div class="regional-card-media">
                <img src="${variant.image}" alt="${variant.name}" loading="lazy" onerror="this.src='${variant.fallback}'" />
                <span class="regional-badge">${variant.emoji} ${variant.category}</span>
            </div>
            <div class="regional-card-body">
                <span class="regional-tag">📍 ${variant.region}</span>
                <h3>${variant.name}</h3>
                <p>${variant.summary}</p>
            </div>
        </button>
    `
    ).join('');

    const cards = grid.querySelectorAll('.regional-card');

    function selectVariant(id) {
        const variant = REGIONAL_VARIANTS.find(v => v.id === id);
        if (!variant) return;

        cards.forEach(card => {
            const isActive = card.dataset.variantId === id;
            card.classList.toggle('active', isActive);
            card.setAttribute('aria-pressed', String(isActive));
        });

        detailPanel.innerHTML = `
            <div class="detail-split">
                <div class="detail-img-wrap">
                    <img src="${variant.image}" alt="${variant.name}" loading="lazy" onerror="this.src='${variant.fallback}'" />
                </div>
                <div class="detail-content">
                    <div class="detail-header">
                        <span class="detail-emoji" aria-hidden="true">${variant.emoji}</span>
                        <div>
                            <h3>${variant.name}</h3>
                            <span class="detail-region">📍 ${variant.region} · ${variant.category}</span>
                        </div>
                    </div>
                    <p>${variant.details}</p>
                    <div class="detail-specs">
                        <div><strong>📏 Dimensions:</strong> ${variant.dimensions}</div>
                        <div><strong>✨ Distinctives:</strong> ${variant.keyFeatures}</div>
                    </div>
                    <div class="detail-rhythm-row">
                        <div class="detail-rhythm">🎵 ${variant.rhythmNote}</div>
                        <button type="button" class="test-beat-btn" data-variant-id="${variant.id}">▶ Tap Sound Test</button>
                    </div>
                </div>
            </div>
        `;
        detailPanel.classList.add('is-visible');

        const testBtn = detailPanel.querySelector('.test-beat-btn');
        if (testBtn) {
            testBtn.addEventListener('click', () => {
                playBassSound(1.0);
                setTimeout(() => playTrebleSound(0.9), 160);
                setTimeout(() => playBassSound(0.8), 320);
                setTimeout(() => playTrebleSound(1.0), 480);
            });
        }
    }

    cards.forEach(card => {
        card.addEventListener('click', () => selectVariant(card.dataset.variantId));
    });

    selectVariant(REGIONAL_VARIANTS[0].id);
}

function renderFestivals() {
    const grid = document.getElementById('festivals-grid');
    if (!grid || typeof FESTIVALS === 'undefined') return;

    grid.innerHTML = FESTIVALS.map(
        festival => `
        <div class="festival-card">
            <div class="festival-img-wrap">
                <img src="${festival.image}" alt="${festival.name}" loading="lazy" onerror="this.style.display='none'" />
                <span class="festival-pill">${festival.icon} ${festival.category}</span>
            </div>
            <div class="festival-body">
                <div class="festival-tag">📍 ${festival.region}</div>
                <h3>${festival.name}</h3>
                <p>${festival.description}</p>
            </div>
        </div>
    `
    ).join('');
}

function renderDanceTraditions() {
    const grid = document.getElementById('dance-grid');
    if (!grid || typeof DANCE_TRADITIONS === 'undefined') return;

    grid.innerHTML = DANCE_TRADITIONS.map(
        dance => `
        <div class="dance-card">
            <div class="dance-img-wrap">
                <img src="${dance.image}" alt="${dance.name}" loading="lazy" onerror="this.style.display='none'" />
            </div>
            <div class="dance-body">
                <div class="dance-tag">📍 ${dance.region}</div>
                <h3>${dance.name}</h3>
                <p>${dance.description}</p>
            </div>
        </div>
    `
    ).join('');
}

function renderConstruction() {
    const container = document.getElementById('construction-steps');
    if (!container || typeof CONSTRUCTION_STEPS === 'undefined') return;

    container.innerHTML = CONSTRUCTION_STEPS.map(
        step => `
        <div class="step-card">
            <div class="step-num-badge">Step 0${step.step}</div>
            <div class="step-content">
                <h3>${step.title}</h3>
                <p>${step.description}</p>
                <div class="step-details-note">💡 ${step.details}</div>
            </div>
            <div class="step-img-box">
                <img class="step-image" src="${step.image}" alt="${step.title}" loading="lazy" />
            </div>
        </div>
    `
    ).join('');
}

function renderGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid || typeof GALLERY_ITEMS === 'undefined') return;

    grid.innerHTML = GALLERY_ITEMS.map(
        item => `
        <div class="gallery-card" data-full-img="${item.image}" data-title="${item.title}" data-caption="${item.caption}">
            <div class="gallery-img-wrap">
                <img src="${item.image}" alt="${item.title}" loading="lazy" />
                <span class="gallery-zoom-icon">🔍</span>
            </div>
            <div class="gallery-body">
                <h3>${item.title}</h3>
                <p>${item.caption}</p>
            </div>
        </div>
    `
    ).join('');
}

function renderSignificance() {
    const grid = document.getElementById('significance-grid');
    if (!grid || typeof CULTURAL_SIGNIFICANCE === 'undefined') return;

    grid.innerHTML = CULTURAL_SIGNIFICANCE.map(
        item => `
        <div class="significance-card">
            <h3>✨ ${item.title}</h3>
            <p>${item.description}</p>
        </div>
    `
        )
        .join('');
}

function renderReferences() {
    const list = document.getElementById('references-list');
    if (!list || typeof REFERENCES === 'undefined') return;

    list.innerHTML = REFERENCES.map(
        ref => `
        <li>
            <a href="${ref.link}" target="_blank" rel="noopener noreferrer">📚 ${ref.text}</a>
        </li>
    `
    ).join('');
}

function renderImageCredits() {
    const list = document.getElementById('image-credits-list');
    if (!list || typeof IMAGE_CREDITS === 'undefined') return;

    list.innerHTML = IMAGE_CREDITS.map(credit => `<li>${credit}</li>`).join('');
}

function initThemeToggle() {
    const toggleBtn = document.getElementById('theme-toggle');
    if (!toggleBtn) return;

    toggleBtn.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        localStorage.setItem('theme', isLight ? 'light' : 'dark');
        toggleBtn.textContent = isLight ? '🌙' : '☀️';
    });
}

function initLightbox() {
    const lightboxModal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxTitle = document.getElementById('lightbox-title');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');

    if (!lightboxModal) return;

    document.querySelectorAll('.gallery-card').forEach(card => {
        card.addEventListener('click', () => {
            lightboxImg.src = card.dataset.fullImg;
            lightboxTitle.textContent = card.dataset.title;
            lightboxCaption.textContent = card.dataset.caption;
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    const closeModal = () => {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto';
    };

    if (closeBtn) closeBtn.addEventListener('click', closeModal);
    lightboxModal.addEventListener('click', e => {
        if (e.target === lightboxModal) closeModal();
    });
    window.addEventListener('keydown', e => {
        if (e.key === 'Escape' && lightboxModal.classList.contains('active')) {
            closeModal();
        }
    });
}
