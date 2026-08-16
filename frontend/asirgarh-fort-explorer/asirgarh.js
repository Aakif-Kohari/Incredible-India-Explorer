/**
 * asirgarh.js
 * Interactive Logic & Controller for Asirgarh Fort Explorer
 * Incredible India Explorer
 */

document.addEventListener('DOMContentLoaded', () => {
    initTabNavigation();
    renderOverview();
    renderTimeline();
    renderBuilders();
    renderStrategicImportance();
    renderArchitecture('all');
    renderBattles();
    renderFacts();
    renderGallery();
    initLightbox();
    initQuiz();
    initAudioGuide();
});

/* ==========================================================================
   1. TAB NAVIGATION CONTROLLER
   ========================================================================== */
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.asir-tab-btn');
    const sections = document.querySelectorAll('.asir-section');

    function activateTab(tabId) {
        tabButtons.forEach(btn => {
            const isActive = btn.dataset.tab === tabId;
            btn.classList.toggle('active', isActive);
            btn.setAttribute('aria-selected', isActive ? 'true' : 'false');
        });

        sections.forEach(sec => {
            const isTarget = sec.id === tabId;
            sec.classList.toggle('active', isTarget);
        });

        // Update URL hash without forcing window jump
        if (history.pushState) {
            history.pushState(null, null, `#${tabId}`);
        } else {
            location.hash = `#${tabId}`;
        }
    }

    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabId = btn.dataset.tab;
            activateTab(tabId);
        });
    });

    // Hash deep-linking on initial page load
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && document.getElementById(initialHash)) {
        activateTab(initialHash);
    }
}

/* ==========================================================================
   2. RENDER OVERVIEW
   ========================================================================== */
function renderOverview() {
    const overviewContainer = document.getElementById('overview-content');
    if (!overviewContainer || typeof ASIRGARH_DATA === 'undefined') return;

    const { overview } = ASIRGARH_DATA;

    overviewContainer.innerHTML = `
        <div class="overview-layout">
            <div class="overview-main-card">
                <h3>🏰 The Impregnable Gateway</h3>
                <p class="overview-prose">${overview.summary}</p>
                
                <div class="overview-grid-cards">
                    <div class="overview-subcard">
                        <h4><span>📍</span> Geographical Position</h4>
                        <p style="margin:0; font-size: 0.95rem; color: var(--asir-text-muted);">
                            Situated in <strong>${overview.location}</strong> at coordinates <strong>${overview.coordinates}</strong>.
                            Elevation of <strong>${overview.elevation}</strong> with sheer vertical basalt drop.
                        </p>
                    </div>
                    <div class="overview-subcard">
                        <h4><span>👑</span> Heritage & Legacy</h4>
                        <p style="margin:0; font-size: 0.95rem; color: var(--asir-text-muted);">
                            Founded in the <strong>${overview.builtEra}</strong> by <strong>${overview.founders}</strong>.
                            Spans <strong>${overview.area}</strong>.
                        </p>
                    </div>
                </div>
            </div>

            <div class="overview-side-panel">
                <div class="info-box-widget">
                    <h4>Quick Specifications</h4>
                    <ul class="info-box-list">
                        <li><span class="info-box-label">Native Name:</span> <span class="info-box-val">${overview.nativeTitle}</span></li>
                        <li><span class="info-box-label">Location:</span> <span class="info-box-val">Burhanpur, MP</span></li>
                        <li><span class="info-box-label">Cliff Height:</span> <span class="info-box-val">${overview.cliffHeight}</span></li>
                        <li><span class="info-box-label">Key Pass:</span> <span class="info-box-val">Burhanpur Gap</span></li>
                        <li><span class="info-box-label">Style:</span> <span class="info-box-val">Indo-Islamic / Hill Fort</span></li>
                    </ul>
                </div>

                <div class="audio-guide-card">
                    <h4>🎧 Audio Guide Simulation</h4>
                    <p>Listen to an overview of Asirgarh's strategic role as the Gateway to the Deccan.</p>
                    <button id="btn-audio-play" class="btn-audio-play">
                        <span>▶️</span> Play Narration
                    </button>
                </div>
            </div>
        </div>
    `;
}

/* ==========================================================================
   3. AUDIO GUIDE SIMULATOR
   ========================================================================== */
function initAudioGuide() {
    document.addEventListener('click', (e) => {
        if (e.target && (e.target.id === 'btn-audio-play' || e.target.closest('#btn-audio-play'))) {
            const button = document.getElementById('btn-audio-play');
            if ('speechSynthesis' in window) {
                if (window.speechSynthesis.speaking) {
                    window.speechSynthesis.cancel();
                    button.innerHTML = '<span>▶️</span> Play Narration';
                } else {
                    const text = "Welcome to Asirgarh Fort Explorer. Known as Kili-i-Dakkan, or the Key to the Deccan, Asirgarh stands atop a steep 750-meter mountain peak in Madhya Pradesh. Built originally by Asa Ahir in the 14th century and fortified by the Faruqui Dynasty and Mughals, Asirgarh commanded the strategic Burhanpur Gap—the primary land passage connecting Northern and Southern India.";
                    const utterance = new SpeechSynthesisUtterance(text);
                    utterance.rate = 0.95;
                    utterance.onend = () => {
                        button.innerHTML = '<span>▶️</span> Play Narration';
                    };
                    window.speechSynthesis.speak(utterance);
                    button.innerHTML = '<span>⏹️</span> Stop Narration';
                }
            } else {
                alert("Audio Speech Synthesis is not supported in this browser.");
            }
        }
    });
}

/* ==========================================================================
   4. RENDER TIMELINE
   ========================================================================== */
function renderTimeline() {
    const container = document.getElementById('timeline-content');
    if (!container || typeof ASIRGARH_DATA === 'undefined') return;

    container.innerHTML = `
        <div class="timeline-container">
            ${ASIRGARH_DATA.historyTimeline.map(item => `
                <div class="timeline-card">
                    <div class="timeline-dot"></div>
                    <span class="timeline-year-badge">${item.year}</span>
                    <h3 class="timeline-card-title">${item.title}</h3>
                    <div class="timeline-card-era">${item.era}</div>
                    <p class="timeline-card-desc">${item.description}</p>
                </div>
            `).join('')}
        </div>
    `;
}

/* ==========================================================================
   5. RENDER BUILDERS
   ========================================================================== */
function renderBuilders() {
    const container = document.getElementById('builders-content');
    if (!container || typeof ASIRGARH_DATA === 'undefined') return;

    container.innerHTML = `
        <div class="builders-grid">
            ${ASIRGARH_DATA.builders.map(builder => `
                <div class="builder-card">
                    <div class="builder-icon-box">${builder.icon}</div>
                    <h3 class="builder-name">${builder.name}</h3>
                    <div class="builder-role">${builder.role}</div>
                    <div class="builder-era">${builder.era} • <em>${builder.dynasty}</em></div>
                    <p class="builder-desc">${builder.description}</p>
                </div>
            `).join('')}
        </div>
    `;
}

/* ==========================================================================
   6. RENDER STRATEGIC IMPORTANCE
   ========================================================================== */
function renderStrategicImportance() {
    const container = document.getElementById('strategic-content');
    if (!container || typeof ASIRGARH_DATA === 'undefined') return;

    const { strategicImportance } = ASIRGARH_DATA;

    container.innerHTML = `
        <div class="strategic-wrapper">
            <div class="strategic-visual">
                <svg class="strategic-visual-svg" viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <linearGradient id="satpuraGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stop-color="#d35400" />
                            <stop offset="100%" stop-color="#18202c" />
                        </linearGradient>
                    </defs>
                    <!-- Background Pass Lines -->
                    <path d="M 50,280 Q 250,140 450,280" fill="none" stroke="rgba(230,161,0,0.3)" stroke-width="2" stroke-dasharray="6,6" />
                    <!-- North to South Trade Arrow -->
                    <line x1="250" y1="30" x2="250" y2="320" stroke="#e6a100" stroke-width="4" marker-end="url(#arrow)" />
                    
                    <!-- Mountain Shapes representing Satpura Range -->
                    <polygon points="20,280 120,120 200,280" fill="url(#satpuraGrad)" opacity="0.8" />
                    <polygon points="300,280 380,120 480,280" fill="url(#satpuraGrad)" opacity="0.8" />
                    
                    <!-- Central Asirgarh Peak -->
                    <polygon points="180,280 250,80 320,280" fill="#e6a100" opacity="0.9" />
                    <rect x="235" y="70" width="30" height="20" fill="#c0392b" rx="3" />
                    
                    <!-- Text Labels -->
                    <text x="250" y="45" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">NORTH INDIA (Agra / Malwa)</text>
                    <text x="250" y="340" fill="#ffffff" font-size="14" font-weight="bold" text-anchor="middle">DECCAN PLATEAU (South India)</text>
                    <text x="250" y="60" fill="#e6a100" font-size="12" font-weight="bold" text-anchor="middle">ASIRGARH FORT (750m)</text>
                    <text x="250" y="210" fill="#f3e5ab" font-size="13" font-style="italic" text-anchor="middle">Burhanpur Gap (Pass)</text>
                </svg>
            </div>

            <div class="strategic-points">
                ${strategicImportance.points.map(pt => `
                    <div class="strategic-item">
                        <div class="strategic-item-icon">${pt.icon}</div>
                        <div>
                            <h4 class="strategic-item-title">${pt.title}</h4>
                            <p class="strategic-item-detail">${pt.detail}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `;
}

/* ==========================================================================
   7. RENDER ARCHITECTURE WITH FILTERING
   ========================================================================== */
function renderArchitecture(filter = 'all') {
    const container = document.getElementById('arch-grid');
    if (!container || typeof ASIRGARH_DATA === 'undefined') return;

    const filteredItems = filter === 'all'
        ? ASIRGARH_DATA.architecture
        : ASIRGARH_DATA.architecture.filter(item => item.category.toLowerCase() === filter.toLowerCase());

    container.innerHTML = filteredItems.map(item => `
        <div class="arch-card">
            <img src="${item.image}" alt="${item.title}" class="arch-card-img" loading="lazy" />
            <div class="arch-card-body">
                <span class="arch-card-tag">${item.icon} ${item.category}</span>
                <h3 class="arch-card-title">${item.title}</h3>
                <p class="arch-card-desc">${item.description}</p>
            </div>
        </div>
    `).join('');

    // Filter Buttons Event Listeners
    const filterBtns = document.querySelectorAll('.arch-filter-btn');
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            renderArchitecture(btn.dataset.filter);
        });
    });
}

/* ==========================================================================
   8. RENDER BATTLES
   ========================================================================== */
function renderBattles() {
    const container = document.getElementById('battles-content');
    if (!container || typeof ASIRGARH_DATA === 'undefined') return;

    container.innerHTML = `
        <div class="battles-grid">
            ${ASIRGARH_DATA.battles.map(b => `
                <div class="battle-card">
                    <h3 class="battle-card-title">⚔️ ${b.title}</h3>
                    <span class="battle-meta-tag">Duration: ${b.duration}</span>
                    <div class="battle-detail-row"><strong>Combatants:</strong> ${b.combatants}</div>
                    <div class="battle-detail-row"><strong>Result:</strong> ${b.result}</div>
                    <p class="battle-summary">${b.summary}</p>
                    <div class="battle-takeaway">💡 <strong>Historic Impact:</strong> ${b.keyTakeaway}</div>
                </div>
            `).join('')}
        </div>
    `;
}

/* ==========================================================================
   9. RENDER INTERESTING FACTS
   ========================================================================== */
function renderFacts() {
    const container = document.getElementById('facts-content');
    if (!container || typeof ASIRGARH_DATA === 'undefined') return;

    container.innerHTML = `
        <div class="facts-grid">
            ${ASIRGARH_DATA.facts.map(fact => `
                <div class="fact-card">
                    <div class="fact-header">
                        <span class="fact-icon">${fact.icon}</span>
                        <h4 class="fact-title">${fact.title}</h4>
                    </div>
                    <p class="fact-desc">${fact.description}</p>
                </div>
            `).join('')}
        </div>
    `;
}

/* ==========================================================================
   10. RENDER GALLERY & LIGHTBOX
   ========================================================================== */
function renderGallery() {
    const container = document.getElementById('gallery-grid');
    if (!container || typeof ASIRGARH_DATA === 'undefined') return;

    container.innerHTML = ASIRGARH_DATA.gallery.map((img, idx) => `
        <div class="gallery-item" data-index="${idx}">
            <img src="${img.image}" alt="${img.title}" loading="lazy" />
            <div class="gallery-overlay">
                <span class="gallery-cat">${img.category}</span>
                <h4 class="gallery-title">${img.title}</h4>
            </div>
        </div>
    `).join('');
}

function initLightbox() {
    const lightbox = document.getElementById('asir-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');

    if (!lightbox || typeof ASIRGARH_DATA === 'undefined') return;

    document.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (item) {
            const index = item.dataset.index;
            const data = ASIRGARH_DATA.gallery[index];
            if (data) {
                lightboxImg.src = data.image;
                lightboxImg.alt = data.title;
                lightboxCaption.textContent = `${data.title} — ${data.caption}`;
                lightbox.classList.add('active');
            }
        }
    });

    const closeLightbox = () => {
        lightbox.classList.remove('active');
    };

    if (closeBtn) closeBtn.addEventListener('click', closeLightbox);
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && lightbox.classList.contains('active')) {
            closeLightbox();
        }
    });
}

/* ==========================================================================
   11. KNOWLEDGE QUIZ
   ========================================================================== */
let currentQuizIdx = 0;
let quizScore = 0;

function initQuiz() {
    const quizContainer = document.getElementById('quiz-content');
    if (!quizContainer || typeof ASIRGARH_DATA === 'undefined') return;

    renderQuizQuestion();
}

function renderQuizQuestion() {
    const quizContainer = document.getElementById('quiz-content');
    const questions = ASIRGARH_DATA.quizQuestions;

    if (currentQuizIdx >= questions.length) {
        quizContainer.innerHTML = `
            <div style="text-align: center;">
                <h3 style="font-family: var(--asir-font-heading); font-size: 2rem; color: var(--asir-gold);">🎉 Quiz Completed!</h3>
                <p style="font-size: 1.2rem; margin: 1rem 0;">You scored <strong>${quizScore}</strong> out of <strong>${questions.length}</strong>!</p>
                <button id="btn-restart-quiz" class="btn-next-quiz">Try Again 🔄</button>
            </div>
        `;
        document.getElementById('btn-restart-quiz').addEventListener('click', () => {
            currentQuizIdx = 0;
            quizScore = 0;
            renderQuizQuestion();
        });
        return;
    }

    const q = questions[currentQuizIdx];

    quizContainer.innerHTML = `
        <div style="font-size: 0.9rem; color: var(--asir-text-muted); margin-bottom: 0.5rem;">Question ${currentQuizIdx + 1} of ${questions.length}</div>
        <h3 class="quiz-question-title">${q.question}</h3>
        <div class="quiz-options">
            ${q.options.map((opt, i) => `
                <button class="quiz-opt-btn" data-opt="${i}">${opt}</button>
            `).join('')}
        </div>
        <div id="quiz-feedback" class="quiz-feedback"></div>
        <button id="btn-next-q" class="btn-next-quiz" style="display: none;">Next Question ➔</button>
    `;

    const optBtns = quizContainer.querySelectorAll('.quiz-opt-btn');
    const feedback = document.getElementById('quiz-feedback');
    const nextBtn = document.getElementById('btn-next-q');

    optBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            optBtns.forEach(b => b.disabled = true);
            const selectedOpt = parseInt(btn.dataset.opt);
            if (selectedOpt === q.correct) {
                btn.classList.add('correct');
                quizScore++;
                feedback.className = 'quiz-feedback show';
                feedback.style.background = 'rgba(46, 204, 113, 0.15)';
                feedback.style.color = '#2ecc71';
                feedback.style.border = '1px solid #2ecc71';
                feedback.innerHTML = `<strong>Correct!</strong> ${q.explanation}`;
            } else {
                btn.classList.add('wrong');
                optBtns[q.correct].classList.add('correct');
                feedback.className = 'quiz-feedback show';
                feedback.style.background = 'rgba(231, 76, 60, 0.15)';
                feedback.style.color = '#e74c3c';
                feedback.style.border = '1px solid #e74c3c';
                feedback.innerHTML = `<strong>Incorrect.</strong> ${q.explanation}`;
            }
            nextBtn.style.display = 'inline-block';
        });
    });

    nextBtn.addEventListener('click', () => {
        currentQuizIdx++;
        renderQuizQuestion();
    });
}
