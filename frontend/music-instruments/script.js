// script.js - Traditional Music Instruments Audio Logic
// Encapsulated in IIFE

(function () {
    'use strict';

    const data = window.instrumentsData;
    if (!data || !data.length) {
        console.error("Instruments data is missing.");
        return;
    }

    // DOM Elements
    const themeBtn = document.getElementById('theme-toggle');
    const grids = {
        "String Instruments": document.getElementById('grid-string'),
        "Percussion Instruments": document.getElementById('grid-percussion'),
        "Wind Instruments": document.getElementById('grid-wind'),
        "Drone Instruments": document.getElementById('grid-drone')
    };
    const template = document.getElementById('instrument-card-template');

    // Global audio state to ensure only one plays at a time
    let currentlyPlayingAudio = null;
    let currentlyPlayingBtn = null;

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

    // --- Render Gallery ---
    function renderGallery() {
        data.forEach(inst => {
            const grid = grids[inst.category];
            if (!grid) return; // Skip if category grid not found

            const clone = template.content.cloneNode(true);
            const card = clone.querySelector('.instrument-card');
            
            // Populate standard metadata
            clone.querySelector('.card-image-placeholder').textContent = `[ Image: ${inst.name} ]`;
            clone.querySelector('.instrument-name').textContent = inst.name;
            clone.querySelector('.category-tag').textContent = inst.category;
            clone.querySelector('.region-tag').textContent = inst.region;
            clone.querySelector('.instrument-desc').textContent = inst.description;

            // Populate Info Panel
            clone.querySelector('.info-tradition').textContent = inst.musicalTradition;
            clone.querySelector('.info-construction').textContent = inst.construction;
            clone.querySelector('.info-technique').textContent = inst.playingTechnique;
            clone.querySelector('.info-history').textContent = inst.history;
            clone.querySelector('.info-exponents').textContent = inst.notableExponents;

            // Info Panel Expand/Collapse Logic
            const expandBtn = clone.querySelector('.expand-btn');
            const infoPanel = clone.querySelector('.info-panel');
            expandBtn.addEventListener('click', () => {
                const isExpanded = expandBtn.getAttribute('aria-expanded') === 'true';
                if (isExpanded) {
                    infoPanel.classList.add('hidden');
                    expandBtn.setAttribute('aria-expanded', 'false');
                    expandBtn.innerHTML = `View Details <span class="arrow">▼</span>`;
                } else {
                    infoPanel.classList.remove('hidden');
                    expandBtn.setAttribute('aria-expanded', 'true');
                    expandBtn.innerHTML = `Hide Details <span class="arrow">▲</span>`;
                }
            });

            // Initialize Audio Player
            initAudioPlayer(clone, inst);

            grid.appendChild(card);
        });

        // Clean up empty sections
        Object.values(grids).forEach(grid => {
            if (grid.children.length === 0) {
                grid.parentElement.style.display = 'none';
            }
        });
    }

    // --- Audio Player Logic ---
    function initAudioPlayer(clone, inst) {
        const audio = clone.querySelector('.native-audio');
        const playBtn = clone.querySelector('.play-pause-btn');
        const iconPlay = playBtn.querySelector('.icon-play');
        const iconPause = playBtn.querySelector('.icon-pause');
        
        const progSlider = clone.querySelector('.progress-slider');
        const progFill = clone.querySelector('.progress-fill');
        const timeCur = clone.querySelector('.time-current');
        const timeDur = clone.querySelector('.time-duration');
        
        const volSlider = clone.querySelector('.volume-slider');
        const muteBtn = clone.querySelector('.volume-mute-btn');
        const iconVolUp = muteBtn ? muteBtn.querySelector('.icon-vol-up') : null;
        const iconVolMute = muteBtn ? muteBtn.querySelector('.icon-vol-mute') : null;

        // Setup audio element
        audio.src = inst.audio;
        audio.preload = 'metadata';

        // Format time helper
        const formatTime = (time) => {
            if (isNaN(time)) return "0:00";
            const min = Math.floor(time / 60);
            const sec = Math.floor(time % 60);
            return `${min}:${sec < 10 ? '0' : ''}${sec}`;
        };

        // Load metadata
        audio.addEventListener('loadedmetadata', () => {
            timeDur.textContent = formatTime(audio.duration);
            progSlider.max = audio.duration;
        });

        // Alternatively, if loadedmetadata fails/offline, fallback to provided duration
        timeDur.textContent = formatTime(inst.duration || 0);

        // Update progress bar
        audio.addEventListener('timeupdate', () => {
            const curTime = audio.currentTime;
            timeCur.textContent = formatTime(curTime);
            progSlider.value = curTime;
            
            // Update custom fill
            const pct = (curTime / audio.duration) * 100;
            progFill.style.width = `${pct}%`;
        });

        // Ended event
        audio.addEventListener('ended', () => {
            audio.currentTime = 0;
            pauseVisuals();
        });

        // Visual State Helpers
        const playVisuals = () => {
            iconPlay.classList.add('hidden');
            iconPause.classList.remove('hidden');
            playBtn.setAttribute('aria-label', `Pause ${inst.name} audio`);
        };

        const pauseVisuals = () => {
            iconPause.classList.add('hidden');
            iconPlay.classList.remove('hidden');
            playBtn.setAttribute('aria-label', `Play ${inst.name} audio`);
        };

        // Play/Pause Interaction
        playBtn.addEventListener('click', () => {
            if (audio.paused) {
                // Pause currently playing if it's different
                if (currentlyPlayingAudio && currentlyPlayingAudio !== audio) {
                    currentlyPlayingAudio.pause();
                    if (currentlyPlayingBtn) {
                        currentlyPlayingBtn.iconPlay.classList.remove('hidden');
                        currentlyPlayingBtn.iconPause.classList.add('hidden');
                        currentlyPlayingBtn.btn.setAttribute('aria-label', `Play audio`);
                    }
                }

                audio.play().catch(e => console.log('Audio play error, maybe offline or missing file', e));
                playVisuals();
                
                currentlyPlayingAudio = audio;
                currentlyPlayingBtn = { btn: playBtn, iconPlay, iconPause };
            } else {
                audio.pause();
                pauseVisuals();
                currentlyPlayingAudio = null;
                currentlyPlayingBtn = null;
            }
        });

        // Progress Slider Interaction
        progSlider.addEventListener('input', () => {
            audio.currentTime = progSlider.value;
            const pct = (progSlider.value / audio.duration) * 100;
            progFill.style.width = `${pct}%`;
        });

        // Volume Interaction
        if (volSlider && muteBtn) {
            volSlider.addEventListener('input', () => {
                audio.volume = volSlider.value;
                audio.muted = false;
                updateVolumeVisuals();
            });

            muteBtn.addEventListener('click', () => {
                audio.muted = !audio.muted;
                updateVolumeVisuals();
            });

            const updateVolumeVisuals = () => {
                if (audio.muted || audio.volume === 0) {
                    iconVolUp.classList.add('hidden');
                    iconVolMute.classList.remove('hidden');
                    if(audio.muted) volSlider.value = 0;
                } else {
                    iconVolMute.classList.add('hidden');
                    iconVolUp.classList.remove('hidden');
                    volSlider.value = audio.volume;
                }
            };
        }

        // --- Keyboard Accessibility for Custom Controls ---
        
        // Add keyboard events to the card itself to allow Space/Enter to play/pause
        // But only if the focus is not on an interactive element inside the card
        const cardContainer = clone.querySelector('.instrument-card');
        cardContainer.addEventListener('keydown', (e) => {
            // Check if focus is on a button or input already
            const tag = document.activeElement.tagName.toLowerCase();
            if (tag === 'button' || tag === 'input') return;

            if (e.key === ' ' || e.key === 'Enter') {
                e.preventDefault();
                playBtn.click();
            }
        });

        // Global shortcuts for the currently playing audio
        playBtn.addEventListener('keydown', (e) => {
            // Space and Enter are handled by default button behavior for click

            // Arrow keys for seeking if the button has focus (common custom player pattern)
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                audio.currentTime = Math.max(0, audio.currentTime - 5);
            } else if (e.key === 'ArrowRight') {
                e.preventDefault();
                if(!isNaN(audio.duration)) {
                    audio.currentTime = Math.min(audio.duration, audio.currentTime + 5);
                }
            } else if (e.key === 'ArrowUp' && volSlider) {
                e.preventDefault();
                volSlider.value = Math.min(1, parseFloat(volSlider.value) + 0.1);
                volSlider.dispatchEvent(new Event('input'));
            } else if (e.key === 'ArrowDown' && volSlider) {
                e.preventDefault();
                volSlider.value = Math.max(0, parseFloat(volSlider.value) - 0.1);
                volSlider.dispatchEvent(new Event('input'));
            }
        });
    }

    // --- Boot ---
    renderGallery();

})();
