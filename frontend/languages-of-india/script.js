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

    // Search / Filter
    const searchInput = document.getElementById('search-input');
    const familyFilter = document.getElementById('family-filter');
    const resultsCount = document.getElementById('results-count');
    const cardsGrid = document.getElementById('cards-grid');

    // Family / Scripts explorers
    const familyGrid = document.getElementById('family-grid');
    const scriptsGrid = document.getElementById('scripts-grid');

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
    let currentRegion = null;

    // --- Theme Logic (site-wide convention: default dark, light-theme class) ---
    if (themeBtn) {
        const isLight = localStorage.getItem('theme') === 'light';
        if (isLight) document.body.classList.add('light-theme');
        themeBtn.textContent = isLight ? '🌙' : '☀️';
        themeBtn.setAttribute('aria-label', isLight ? 'Toggle Dark Mode' : 'Toggle Light Mode');

        themeBtn.addEventListener('click', () => {
            const nowLight = document.body.classList.toggle('light-theme');
            localStorage.setItem('theme', nowLight ? 'light' : 'dark');
            themeBtn.textContent = nowLight ? '🌙' : '☀️';
            themeBtn.setAttribute('aria-label', nowLight ? 'Toggle Dark Mode' : 'Toggle Light Mode');
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
            region.addEventListener('click', () => selectLanguage(region.id, region));
            region.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    selectLanguage(region.id, region);
                }
            });
        });
    }

    function selectLanguage(langId, selectedRegion) {
        const langData = data[langId];

        if (!langData) return;

        // Visual Highlight
        document.querySelectorAll('.region').forEach(r => r.classList.remove('active'));
        if (selectedRegion) {
            selectedRegion.classList.add('active');
            currentRegion = selectedRegion;
        }

        // Stop current audio if switching languages
        if (currentLangId !== langId) {
            stopAudio();
            currentLangId = langId;
        }

        // Update Panel
        updateInfoPanel(langData);

        // Update active card state
        document.querySelectorAll('.lang-card').forEach(card => {
            card.classList.toggle('active', card.dataset.lang === langId);
        });
    }

    function updateInfoPanel(langData) {
        if (emptyState) emptyState.style.display = 'none';
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

    // --- Audio Playback Management (mp3 + Web Speech API fallback) ---
    function stopAudio() {
        if (currentAudio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
            currentAudio = null;
        }
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
        playBtn.classList.remove('playing');
        playBtn.innerHTML = '<span class="icon">▶</span> Play Greeting';
        progressFill.style.width = '0%';
        audioStatus.textContent = '';
    }

    function playSpeechSynthesis(langData) {
        if (!('speechSynthesis' in window)) return false;

        const utterance = new SpeechSynthesisUtterance(langData.greeting);
        const code = langData.speechLang || 'hi-IN';
        utterance.lang = code;
        const short = code.split('-')[0];
        const voices = window.speechSynthesis.getVoices();
        const voice = voices.find(v => v.lang.startsWith(code)) || voices.find(v => v.lang.startsWith(short));
        if (voice) utterance.voice = voice;

        playBtn.classList.add('playing');
        playBtn.innerHTML = '<span class="icon">⏸</span> Pause';
        audioStatus.textContent = '';
        playBtn.setAttribute('aria-label', `Stop ${langData.language} greeting`);

        utterance.onend = () => {
            playBtn.classList.remove('playing');
            playBtn.innerHTML = '<span class="icon">▶</span> Play Greeting';
            playBtn.setAttribute('aria-label', `Play ${langData.language} greeting`);
        };
        utterance.onerror = () => {
            playBtn.classList.remove('playing');
            playBtn.innerHTML = '<span class="icon">▶</span> Play Greeting';
            audioStatus.textContent = 'Audio sample unavailable.';
        };

        window.speechSynthesis.speak(utterance);
        return true;
    }

    playBtn.addEventListener('click', () => {
        if (!currentLangId) return;
        const langData = data[currentLangId];

        // If mp3 is currently playing for this language, pause it
        if (currentAudio && !currentAudio.paused) {
            currentAudio.pause();
            playBtn.classList.remove('playing');
            playBtn.innerHTML = '<span class="icon">▶</span> Play Greeting';
            return;
        }

        // If speech synthesis is speaking, stop it
        if ('speechSynthesis' in window && window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            playBtn.classList.remove('playing');
            playBtn.innerHTML = '<span class="icon">▶</span> Play Greeting';
            return;
        }

        // Try mp3 asset first, fall back to Web Speech API
        const audio = new Audio(langData.audio);
        currentAudio = audio;

        audio.addEventListener('timeupdate', () => {
            if (audio.duration) {
                const percentage = (audio.currentTime / audio.duration) * 100;
                progressFill.style.width = percentage + '%';
            }
        });

        audio.addEventListener('ended', () => {
            playBtn.classList.remove('playing');
            playBtn.innerHTML = '<span class="icon">▶</span> Play Greeting';
            progressFill.style.width = '0%';
            currentAudio = null;
        });

        const playPromise = audio.play();
        if (playPromise !== undefined) {
            playPromise.then(() => {
                playBtn.classList.add('playing');
                playBtn.innerHTML = '<span class="icon">⏸</span> Pause';
                audioStatus.textContent = '';
            }).catch(() => {
                // Local .mp3 missing -> use browser speech synthesis
                currentAudio = null;
                playSpeechSynthesis(langData);
            });
        } else {
            playSpeechSynthesis(langData);
        }
    });

    // --- Language Cards Generation ---
    function generateCards(filteredIds) {
        if (!cardsGrid) return;

        const ids = filteredIds || Object.keys(data);
        const rowsHtml = ids.map(id => {
            const lang = data[id];
            return `
                <article class="lang-card" data-lang="${id}" tabindex="0" aria-label="${lang.language}">
                    <div class="card-top">
                        <span class="card-script" aria-hidden="true">${lang.script}</span>
                        <span class="card-badge">${lang.family}</span>
                    </div>
                    <h3 class="card-name">${lang.language}</h3>
                    <p class="card-native">Native name: ${lang.nativeName}</p>
                    <ul class="card-meta">
                        <li><strong>Script:</strong> ${lang.scriptName}</li>
                        <li><strong>Region:</strong> ${lang.region}</li>
                    </ul>
                    <div class="card-greeting">
                        <span class="card-greet">${lang.greeting}</span>
                        <span class="card-pronounce">${lang.pronunciation}</span>
                    </div>
                    <div class="card-actions">
                        <button class="card-play" data-id="${id}" aria-label="Hear ${lang.language} greeting">
                            🔊 Hear
                        </button>
                        <a class="card-explore" data-id="${id}" href="#map-area" aria-label="Explore ${lang.language} on the map">
                            Explore ▸
                        </a>
                    </div>
                </article>
            `;
        }).join('');

        cardsGrid.innerHTML = rowsHtml;
        bindCardEvents();

        if (resultsCount) {
            resultsCount.textContent = `${ids.length} of ${Object.keys(data).length} languages`;
        }
    }

    function bindCardEvents() {
        const cards = cardsGrid.querySelectorAll('.lang-card');

        cards.forEach(card => {
            const id = card.dataset.lang;
            const playEl = card.querySelector('.card-play');
            const exploreEl = card.querySelector('.card-explore');
            const langData = data[id];

            playEl.addEventListener('click', () => {
                // Stop any ongoing panel audio
                stopAudio();
                currentLangId = id;
                playSpeechSynthesis(langData);
            });

            exploreEl.addEventListener('click', () => {
                const region = document.getElementById(id);
                selectLanguage(id, region);
                document.getElementById('map-area').scrollIntoView({ behavior: 'smooth', block: 'center' });
            });

            // Keyboard accessibility for the card itself
            card.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' && e.target === card) {
                    e.preventDefault();
                    const region = document.getElementById(id);
                    selectLanguage(id, region);
                    document.getElementById('map-area').scrollIntoView({ behavior: 'smooth', block: 'center' });
                }
            });
        });
    }

    function applyFilters() {
        const query = (searchInput.value || '').trim().toLowerCase();
        const family = familyFilter.value;

        const ids = Object.keys(data).filter(id => {
            const lang = data[id];
            const haystack = [
                lang.language,
                lang.nativeName,
                lang.scriptName,
                lang.script,
                lang.family,
                lang.region,
                lang.states.join(' ')
            ].join(' ').toLowerCase();

            const matchesQuery = !query || haystack.includes(query);
            const matchesFamily = family === 'all' || lang.family === family;

            return matchesQuery && matchesFamily;
        });

        generateCards(ids);
    }

    if (searchInput) {
        searchInput.addEventListener('input', applyFilters);
    }
    if (familyFilter) {
        familyFilter.addEventListener('change', applyFilters);
    }

    // --- Family Explorer Generation ---
    function generateFamilies() {
        if (!familyGrid || !window.languageFamilies) return;

        const rowsHtml = window.languageFamilies.map(family => {
            const chips = family.languages.map(l => `<span class="family-chip">${l}</span>`).join('');
            return `
                <article class="family-card" style="--family-color: ${family.color}">
                    <h3>${family.name}</h3>
                    <p>${family.description}</p>
                    <div class="family-chips">${chips}</div>
                </article>
            `;
        }).join('');

        familyGrid.innerHTML = rowsHtml;
    }

    // --- Scripts Explorer Generation ---
    function generateScripts() {
        if (!scriptsGrid || !window.languageScripts) return;

        const rowsHtml = window.languageScripts.map(script => {
            const chips = script.languages.map(l => `<span class="script-chip">${l}</span>`).join('');
            return `
                <article class="script-card">
                    <div class="script-sample" lang="und" aria-hidden="true">${script.sample}</div>
                    <h3>${script.name}</h3>
                    <p>${script.description}</p>
                    <div class="script-chips">${chips}</div>
                </article>
            `;
        }).join('');

        scriptsGrid.innerHTML = rowsHtml;
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
                    <td>${lang.region}</td>
                </tr>
            `;
        }).join('');

        if (comparisonTbody) {
            comparisonTbody.innerHTML = rowsHtml;
        }
    }

    // --- Hero Stat Count-Up Animation ---
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-value[data-count]');
        counters.forEach(counter => {
            const target = parseInt(counter.dataset.count, 10);
            const duration = 1800;
            const startTime = performance.now();
            
            function updateCounter(currentTime) {
                const elapsed = currentTime - startTime;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                const current = Math.floor(eased * target);
                
                if (target >= 1000000) {
                    counter.textContent = (current / 10000000).toFixed(1) + 'B+';
                } else {
                    counter.textContent = current.toLocaleString();
                }
                
                if (progress < 1) {
                    requestAnimationFrame(updateCounter);
                } else {
                    if (target >= 1000000) {
                        counter.textContent = (target / 10000000).toFixed(1) + 'B+';
                    } else {
                        counter.textContent = target.toLocaleString();
                    }
                }
            }
            
            requestAnimationFrame(updateCounter);
        });
    }

// --- Scroll Reveal (IntersectionObserver) ---
    function initScrollReveal() {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        if (prefersReduced) {
            document.querySelectorAll('.fade-in-section').forEach(el => el.classList.add('is-visible'));
            return;
        }
        
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    // Trigger counter animation when hero stats come into view
                    if (entry.target.classList.contains('languages-hero')) {
                        animateCounters();
                    }
                }
            });
        }, {
            rootMargin: '0px 0px -10% 0px',
            threshold: 0.1
        });
        
        document.querySelectorAll('.fade-in-section').forEach(el => observer.observe(el));
        // Also observe hero for counter animation
        const hero = document.querySelector('.languages-hero');
        if (hero) observer.observe(hero);
    }

    // --- Scroll to Top Button ---
    function initScrollToTop() {
        const scrollBtn = document.getElementById('btn-scroll-top');
        if (!scrollBtn) return;
        
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                scrollBtn.classList.add('visible');
            } else {
                scrollBtn.classList.remove('visible');
            }
        });
        
        scrollBtn.addEventListener('click', () => {
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // --- Boot ---
    initMap();
    generateCards();
    generateFamilies();
    generateScripts();
    generateTable();
    initScrollReveal();
    initScrollToTop();

})();
