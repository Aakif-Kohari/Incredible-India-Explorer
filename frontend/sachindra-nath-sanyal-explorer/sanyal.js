/**
 * sanyal.js
 * Interactive Logic & Controller for Sachindra Nath Sanyal & HRA Explorer
 * Incredible India Explorer
 */

document.addEventListener('DOMContentLoaded', () => {
    initTabNavigation();
    renderBiography();
    renderTimeline();
    renderHRAHistory();
    renderWritings();
    renderQuotes();
    renderGallery();
    renderReferences();
    initLightbox();
    initQuiz();
    initAudioGuide();
});

/* ==========================================================================
   1. TAB NAVIGATION CONTROLLER
   ========================================================================== */
function initTabNavigation() {
    const tabButtons = document.querySelectorAll('.sn-tab-btn');
    const sections = document.querySelectorAll('.sn-section');

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

        // Update URL hash without forcing scroll jump
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

    // Deep-linking hash support on load
    const initialHash = window.location.hash.replace('#', '');
    if (initialHash && document.getElementById(initialHash)) {
        activateTab(initialHash);
    }
}

/* ==========================================================================
   2. RENDER BIOGRAPHY
   ========================================================================== */
function renderBiography() {
    const container = document.getElementById('bio-content');
    if (!container || typeof SANYAL_DATA === 'undefined') return;

    const { biography } = SANYAL_DATA;

    container.innerHTML = `
        <div class="bio-layout">
            <div class="bio-main-card">
                <h3>🚩 Architect of Revolutionary Nationalism</h3>
                <p class="bio-prose">${biography.summary}</p>
                
                <div class="bio-key-aspects">
                    <div class="bio-aspect-card">
                        <h4><span>📜</span> Ideological Foundation</h4>
                        <p style="margin:0; font-size: 0.95rem; color: var(--sn-text-muted);">
                            Bridged 19th-century Swadeshi thought and 20th-century armed revolution. Formulated the HRA's vision of democratic federalism and anti-exploitation.
                        </p>
                    </div>
                    <div class="bio-aspect-card">
                        <h4><span>🤝</span> Mentor to Legendary Martyrs</h4>
                        <p style="margin:0; font-size: 0.95rem; color: var(--sn-text-muted);">
                            Directly inspired and recruited Bhagat Singh, Chandrashekhar Azad, Ram Prasad Bismil, Ashfaqulla Khan, and Jatin Das.
                        </p>
                    </div>
                </div>
            </div>

            <div class="bio-side-panel">
                <div class="info-box-widget">
                    <h4>Biographical Details</h4>
                    <ul class="info-box-list">
                        <li><span class="info-box-label">Born:</span> <span class="info-box-val">${biography.birthDate}</span></li>
                        <li><span class="info-box-label">Birthplace:</span> <span class="info-box-val">Varanasi, UP</span></li>
                        <li><span class="info-box-label">Died:</span> <span class="info-box-val">${biography.deathDate}</span></li>
                        <li><span class="info-box-label">Key Org:</span> <span class="info-box-val">HRA Co-Founder</span></li>
                        <li><span class="info-box-label">Exile:</span> <span class="info-box-val">Cellular Jail (Twice)</span></li>
                    </ul>
                </div>

                <div class="audio-card">
                    <h4>🎧 Audio Guide Simulation</h4>
                    <p>Listen to a narration detailing Sachindra Nath Sanyal's life and the founding of HRA.</p>
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
                    const text = "Sachindra Nath Sanyal was a foundational ideologue of the Indian revolutionary movement. Born in Varanasi in 1893, he co-founded the Hindustan Republican Association in Kanpur in 1924. Author of Bandi Jeevan, the sacred text of Indian revolutionaries, Sanyal mentored iconic martyrs such as Bhagat Singh and Chandrashekhar Azad, enduring exile to the Cellular Jail twice during his lifelong battle for freedom.";
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
    if (!container || typeof SANYAL_DATA === 'undefined') return;

    container.innerHTML = `
        <div class="timeline-container">
            ${SANYAL_DATA.timeline.map(item => `
                <div class="timeline-card">
                    <div class="timeline-dot"></div>
                    <span class="timeline-year-badge">${item.year}</span>
                    <h3 class="timeline-card-title">${item.title}</h3>
                    <div class="timeline-card-cat">${item.category}</div>
                    <p class="timeline-card-desc">${item.description}</p>
                </div>
            `).join('')}
        </div>
    `;
}

/* ==========================================================================
   5. RENDER HRA HISTORY
   ========================================================================== */
function renderHRAHistory() {
    const container = document.getElementById('hra-content');
    if (!container || typeof SANYAL_DATA === 'undefined') return;

    const { hraHistory } = SANYAL_DATA;

    container.innerHTML = `
        <div class="bio-main-card">
            <h3 style="margin-top:0;">🚩 ${hraHistory.title}</h3>
            <p class="bio-prose" style="margin-bottom: 1.5rem;">
                Founded in <strong>${hraHistory.foundingLocation}</strong> in <strong>${hraHistory.foundingDate}</strong> by 
                <strong>${hraHistory.founders.join(', ')}</strong>, the HRA represented a revolutionary shift from regional secret societies to an organized pan-Northern movement.
            </p>
            <div style="background: rgba(255, 153, 51, 0.1); border-left: 4px solid var(--sn-saffron); padding: 1rem 1.25rem; border-radius: 0 var(--sn-radius) var(--sn-radius) 0; font-size: 1.05rem; margin-bottom: 2rem;">
                🎯 <strong>Core Objective:</strong> ${hraHistory.coreObjective}
            </div>

            <h4 style="font-family: var(--sn-font-heading); font-size: 1.4rem; color: var(--sn-saffron); margin-bottom: 1rem;">Four Foundational Pillars of HRA</h4>
            <div class="hra-grid">
                ${hraHistory.pillars.map(pillar => `
                    <div class="hra-pillar-card">
                        <div class="hra-pillar-icon">${pillar.icon}</div>
                        <h4 class="hra-pillar-title">${pillar.title}</h4>
                        <p class="hra-pillar-desc">${pillar.description}</p>
                    </div>
                `).join('')}
            </div>

            <div class="hsra-box">
                <h3>🔥 Transformation into HSRA (1928)</h3>
                <p style="margin:0; font-size: 1rem; color: var(--sn-text-main); line-height: 1.7;">
                    ${hraHistory.evolutionToHSRA}
                </p>
            </div>
        </div>
    `;
}

/* ==========================================================================
   6. RENDER MAJOR WRITINGS
   ========================================================================== */
function renderWritings() {
    const container = document.getElementById('writings-content');
    if (!container || typeof SANYAL_DATA === 'undefined') return;

    container.innerHTML = `
        <div class="writings-list">
            ${SANYAL_DATA.writings.map(book => `
                <div class="writing-card">
                    <div class="writing-header">
                        <h3 class="writing-title">📖 ${book.title}</h3>
                        <span class="writing-year">${book.year}</span>
                    </div>
                    <div class="writing-sig">Category: ${book.type} • <em>${book.significance}</em></div>
                    <p class="writing-desc">${book.description}</p>
                    <div class="writing-excerpt">
                        💬 <strong>Key Excerpt:</strong> "${book.excerpt}"
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

/* ==========================================================================
   7. RENDER QUOTES
   ========================================================================== */
function renderQuotes() {
    const container = document.getElementById('quotes-content');
    if (!container || typeof SANYAL_DATA === 'undefined') return;

    container.innerHTML = `
        <div class="quotes-grid">
            ${SANYAL_DATA.quotes.map(q => `
                <div class="quote-card">
                    <div class="quote-text">"${q.quote}"</div>
                    <div>
                        <p class="quote-author">— ${q.speaker}</p>
                        <div class="quote-context">${q.context}</div>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
}

/* ==========================================================================
   8. RENDER GALLERY & LIGHTBOX
   ========================================================================== */
function renderGallery() {
    const container = document.getElementById('gallery-grid');
    if (!container || typeof SANYAL_DATA === 'undefined') return;

    container.innerHTML = SANYAL_DATA.gallery.map((img, idx) => `
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
    const lightbox = document.getElementById('sn-lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');

    if (!lightbox || typeof SANYAL_DATA === 'undefined') return;

    document.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (item) {
            const index = item.dataset.index;
            const data = SANYAL_DATA.gallery[index];
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
   9. RENDER REFERENCES
   ========================================================================== */
function renderReferences() {
    const container = document.getElementById('references-content');
    if (!container || typeof SANYAL_DATA === 'undefined') return;

    container.innerHTML = `
        <div style="overflow-x: auto;">
            <table class="references-table">
                <thead>
                    <tr>
                        <th>Document / Source</th>
                        <th>Author / Origin</th>
                        <th>Year</th>
                        <th>Type</th>
                        <th>Historical Significance</th>
                    </tr>
                </thead>
                <tbody>
                    ${SANYAL_DATA.references.map(ref => `
                        <tr>
                            <td style="font-weight: 700; color: var(--sn-text-main);">${ref.source}</td>
                            <td>${ref.author}</td>
                            <td>${ref.year}</td>
                            <td><span style="color: var(--sn-saffron); font-weight: 600;">${ref.type}</span></td>
                            <td>${ref.notes}</td>
                        </tr>
                    `).join('')}
                </tbody>
            </table>
        </div>
    `;
}

/* ==========================================================================
   10. KNOWLEDGE QUIZ
   ========================================================================== */
let currentQuizIdx = 0;
let quizScore = 0;

function initQuiz() {
    const quizContainer = document.getElementById('quiz-content');
    if (!quizContainer || typeof SANYAL_DATA === 'undefined') return;

    renderQuizQuestion();
}

function renderQuizQuestion() {
    const quizContainer = document.getElementById('quiz-content');
    const questions = SANYAL_DATA.quizQuestions;

    if (currentQuizIdx >= questions.length) {
        quizContainer.innerHTML = `
            <div style="text-align: center;">
                <h3 style="font-family: var(--sn-font-heading); font-size: 2rem; color: var(--sn-saffron);">🎉 Quiz Completed!</h3>
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
        <div style="font-size: 0.9rem; color: var(--sn-text-muted); margin-bottom: 0.5rem;">Question ${currentQuizIdx + 1} of ${questions.length}</div>
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
