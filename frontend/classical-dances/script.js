// script.js - Classical Dances of India Logic
// Encapsulated in IIFE

(function () {
    'use strict';

    if (!window.danceData) {
        console.error("Dance data not found!");
        return;
    }

    const data = window.danceData;

    // DOM Elements
    const navList = document.getElementById('dance-nav-list');
    const container = document.getElementById('dance-container');
    const themeBtn = document.getElementById('theme-toggle');

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
                themeBtn.setAttribute('aria-label', 'Toggle Light Mode');
            } else {
                document.body.classList.replace('dark-theme', 'light-theme');
                localStorage.setItem('theme', 'light');
                themeBtn.textContent = '🌙';
                themeBtn.setAttribute('aria-label', 'Toggle Dark Mode');
            }
        });
    }

    // --- Render Logic ---
    function renderContent() {
        data.forEach((dance, index) => {
            // Render Nav Items
            const li = document.createElement('li');
            li.className = 'nav-item';
            
            const btn = document.createElement('button');
            btn.className = `nav-btn ${index === 0 ? 'active' : ''}`;
            btn.textContent = dance.name;
            btn.setAttribute('data-target', dance.id);
            btn.setAttribute('aria-label', `Navigate to ${dance.name}`);
            
            btn.addEventListener('click', () => {
                const targetCard = document.getElementById(dance.id);
                if (targetCard) {
                    targetCard.scrollIntoView({ behavior: 'smooth' });
                }
            });

            li.appendChild(btn);
            navList.appendChild(li);

            // Render Dance Cards
            const card = document.createElement('article');
            card.className = 'dance-card';
            card.id = dance.id;

            const mudrasHtml = dance.mudras.map(m => `
                <div class="mudra-card" tabindex="0" aria-label="Mudra: ${m.name}. Meaning: ${m.meaning}">
                    ${m.name}
                    <span class="mudra-tooltip">${m.meaning}</span>
                </div>
            `).join('');

            card.innerHTML = `
                <div class="video-section">
                    <div class="video-fallback">
                        <p>Video Preview: ${dance.name}</p>
                        <small>Local asset missing: ${dance.videoSrc}</small>
                    </div>
                    <!-- The video element is placed above the fallback using z-index -->
                    <video 
                        class="dance-video" 
                        src="${dance.videoSrc}" 
                        loop 
                        muted 
                        playsinline 
                        preload="metadata"
                        aria-label="Looping video performance of ${dance.name}"
                        style="position: relative; z-index: 1;">
                    </video>
                </div>
                <div class="info-section">
                    <div class="dance-header">
                        <h2 class="dance-title">${dance.name}</h2>
                        <span class="dance-meta">${dance.origin} &bull; ${dance.period}</span>
                    </div>
                    
                    <p class="dance-description">${dance.description}</p>
                    
                    <div class="info-grid">
                        <div class="info-item">
                            <span class="info-label">Costume</span>
                            ${dance.costume}
                        </div>
                        <div class="info-item">
                            <span class="info-label">Music</span>
                            ${dance.music}
                        </div>
                    </div>
                    
                    <div class="mudra-section">
                        <h3>Key Mudras (Gestures)</h3>
                        <div class="mudra-gallery">
                            ${mudrasHtml}
                        </div>
                    </div>
                </div>
            `;

            container.appendChild(card);
        });
    }

    // --- Scroll & Navigation Sync ---
    function setupScrollSpy() {
        const cards = document.querySelectorAll('.dance-card');
        const navBtns = document.querySelectorAll('.nav-btn');

        const observerOptions = {
            root: null,
            rootMargin: '-50% 0px -50% 0px', // Trigger when card is in the middle of screen
            threshold: 0
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const id = entry.target.id;
                    
                    // Update active nav button
                    navBtns.forEach(btn => {
                        if (btn.getAttribute('data-target') === id) {
                            btn.classList.add('active');
                            // Scroll the nav bar to keep active button in view
                            btn.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
                        } else {
                            btn.classList.remove('active');
                        }
                    });
                }
            });
        }, observerOptions);

        cards.forEach(card => observer.observe(card));
    }

    // --- Video Playback Management ---
    function setupVideoManager() {
        const videos = document.querySelectorAll('.dance-video');

        // Play/Pause based on viewport intersection
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                const video = entry.target;
                if (entry.isIntersecting) {
                    // Attempt to play (muted)
                    const playPromise = video.play();
                    if (playPromise !== undefined) {
                        playPromise.catch(error => {
                            // Expected error if video source is missing or browser blocks autoplay
                            console.warn(`Could not auto-play video for ${video.src}:`, error.message);
                        });
                    }
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.2 }); // Trigger when 20% visible

        videos.forEach(video => {
            videoObserver.observe(video);

            // Handle manual click to unmute/play
            video.addEventListener('click', function() {
                // If it's muted, we want to unmute it and show controls
                if (this.muted) {
                    this.muted = false;
                    this.controls = true;
                    
                    // Pause all other videos
                    videos.forEach(v => {
                        if (v !== this) {
                            v.pause();
                            v.muted = true;
                            v.controls = false;
                        }
                    });
                } else {
                    // If already unmuted, clicking could toggle play/pause
                    if (this.paused) {
                        this.play();
                    } else {
                        this.pause();
                    }
                }
            });
        });
    }

    // --- Initialization ---
    renderContent();
    setupScrollSpy();
    setupVideoManager();

})();
