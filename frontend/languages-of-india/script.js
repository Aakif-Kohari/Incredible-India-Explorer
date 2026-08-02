// script.js - Languages of India Logic
// Encapsulated in IIFE

(function () {
    'use strict';

    const data = window.languageData;
    if (!data) {
        console.error("Language data is missing.");
        return;
    }

    // DOM Elements
    const mapArea = document.getElementById('map-area');
    const themeBtn = document.getElementById('theme-toggle');
    const emptyState = document.getElementById('empty-state');
    const langDetails = document.getElementById('language-details');
    const comparisonTbody = document.getElementById('comparison-tbody');
    
    // Panel Elements
    const elLangName = document.getElementById('lang-name');
    const elLangFamily = document.getElementById('lang-family');
    const elLangGreeting = document.getElementById('lang-greeting');
    const elLangPronunciation = document.getElementById('lang-pronunciation');
    const elLangScript = document.getElementById('lang-script');
    const elLangStates = document.getElementById('lang-states');
    const elLangDesc = document.getElementById('lang-desc');

    // Audio Elements
    const playBtn = document.getElementById('play-btn');
    const playIcon = playBtn.querySelector('.icon');
    const progressFill = document.getElementById('audio-progress');
    const audioStatus = document.getElementById('audio-status');

    // Global Audio Instance
    let currentAudio = null;
    let currentLangId = null;

    // --- Theme Logic ---
    if (themeBtn) {
        let isDarkMode = localStorage.getItem('theme') === 'dark';
        if (isDarkMode) {
            document.body.classList.replace('light-theme', 'dark-theme');
            themeBtn.textContent = '☀️';
            themeBtn.setAttribute('aria-label', 'Toggle Light Mode');
        }

        themeBtn.addEventListener('click', () => {
            if (document.body.classList.contains('light-theme')) {
                document.body.classList.replace('light-theme', 'dark-theme');
                localStorage.setItem('theme', 'dark');
                themeBtn.textContent = '☀️';
            } else {
                document.body.classList.replace('dark-theme', 'light-theme');
                localStorage.setItem('theme', 'light');
                themeBtn.textContent = '🌙';
            }
        });
    }

    // --- Map Initialization & Interaction ---
    function initMap() {
        fetch('assets/india-map.svg')
            .then(response => {
                if (!response.ok) throw new Error("Failed to load SVG map");
                return response.text();
            })
            .then(svgText => {
                mapArea.innerHTML = svgText;
                setupMapInteractions();
            })
            .catch(err => {
                console.error(err);
                mapArea.innerHTML = `<p style="color:var(--text-muted);">Failed to load language map.</p>`;
            });
    }

    function setupMapInteractions() {
        const svgContainer = document.querySelector('#india-map-svg');
        if (!svgContainer) return;

        const regions = document.querySelectorAll('.region');

        regions.forEach(region => {
            region.addEventListener('click', () => selectLanguage(region));
            region.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectLanguage(region);
                }
            });
        });
    }

    function selectLanguage(selectedRegion) {
        const langId = selectedRegion.id;
        const langData = data[langId];

        if (!langData) return;

        // Visual Highlight
        document.querySelectorAll('.region').forEach(r => r.classList.remove('active'));
        selectedRegion.classList.add('active');

        // Stop current audio if switching languages
        if (currentLangId !== langId) {
            stopAudio();
            currentLangId = langId;
        }

        // Update Panel
        updateInfoPanel(langData);
    }

    function updateInfoPanel(langData) {
        emptyState.style.display = 'none';
        langDetails.classList.remove('hidden');

        // Reflow for animation
        langDetails.style.animation = 'none';
        void langDetails.offsetWidth;
        langDetails.style.animation = null;

        // Populate Text
        elLangName.textContent = langData.language;
        elLangFamily.textContent = langData.family;
        elLangGreeting.textContent = langData.greeting;
        elLangPronunciation.textContent = langData.pronunciation;
        elLangScript.textContent = langData.script;
        elLangStates.textContent = langData.states.join(', ');
        elLangDesc.textContent = langData.description;

        // Configure Play Button ARIA
        playBtn.setAttribute('aria-label', `Play ${langData.language} greeting`);

        // Mobile scroll
        if (window.innerWidth <= 992) {
            document.getElementById('info-panel').scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }

    // --- Audio Playback Management ---
    function stopAudio() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
        playBtn.classList.remove('playing');
        playBtn.innerHTML = '<span class="icon">▶</span> Play Greeting';
        progressFill.style.width = '0%';
        audioStatus.textContent = '';
    }

    playBtn.addEventListener('click', () => {
        if (!currentLangId) return;
        const langData = data[currentLangId];

        // If audio is currently playing for this language, pause it
        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause();
            playBtn.classList.remove('playing');
            playBtn.innerHTML = '<span class="icon">▶</span> Play Greeting';
            return;
        }

        // If we have an existing audio instance that is paused, resume it
        if (currentAudio && currentAudio.paused && currentAudio.src.endsWith(langData.audio)) {
            const playPromise = currentAudio.play();
            handlePlayPromise(playPromise);
            return;
        }

        // Otherwise, create a new Audio instance
        stopAudio();
        currentAudio = new Audio(langData.audio);
        
        // Listeners
        currentAudio.addEventListener('timeupdate', () => {
            if (currentAudio.duration) {
                const percentage = (currentAudio.currentTime / currentAudio.duration) * 100;
                progressFill.style.width = percentage + '%';
            }
        });

        currentAudio.addEventListener('ended', () => {
            playBtn.classList.remove('playing');
            playBtn.innerHTML = '<span class="icon">▶</span> Play Greeting';
            progressFill.style.width = '0%';
        });

        // Attempt playback with error handling
        const playPromise = currentAudio.play();
        handlePlayPromise(playPromise);
    });

    function handlePlayPromise(playPromise) {
        if (playPromise !== undefined) {
            playPromise.then(() => {
                // Playback started successfully
                playBtn.classList.add('playing');
                playBtn.innerHTML = '<span class="icon">⏸</span> Pause';
                audioStatus.textContent = '';
            }).catch(error => {
                // Expected error if local .mp3 asset is missing
                console.warn("Audio playback failed:", error);
                playBtn.classList.remove('playing');
                audioStatus.textContent = 'Audio sample unavailable offline.';
                currentAudio = null;
            });
        }
    }

    // --- Comparison Table Generation ---
    function generateTable() {
        const keys = Object.keys(data);
        const rowsHtml = keys.map(key => {
            const lang = data[key];
            return `
                <tr>
                    <td><strong>${lang.language}</strong></td>
                    <td>${lang.script}</td>
                    <td>${lang.family}</td>
                </tr>
            `;
        }).join('');
        
        if (comparisonTbody) {
            comparisonTbody.innerHTML = rowsHtml;
        }
    }

    // --- Boot ---
    initMap();
    generateTable();

})();
