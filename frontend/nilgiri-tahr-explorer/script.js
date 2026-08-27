/**
 * Nilgiri Tahr Explorer — Client Script
 * Handles dynamic content rendering, tab navigation, sexual dimorphism comparison toggle,
 * protected strongholds filter, interactive quiz engine, photo gallery, and lightbox modal.
 */

document.addEventListener('DOMContentLoaded', () => {
    initQuickStats();
    initTaxonomyTable();
    initDimorphismToggle();
    initProtectedAreasFilter();
    initAdaptationsGrid();
    initGallery();
    initQuizEngine();
    initTOCNavigation();
    initLightbox();
});

// Render Quick Stats in Hero Banner
function initQuickStats() {
    const container = document.getElementById('quick-stats-grid');
    if (!container || typeof NILGIRI_TAHR_INFO === 'undefined') return;

    container.innerHTML = NILGIRI_TAHR_INFO.quickStats.map(stat => `
        <div class="stat-badge">
            <span class="icon">${stat.icon}</span>
            <div class="stat-info">
                <span class="label">${escapeHtml(stat.label)}</span>
                <span class="val">${escapeHtml(stat.value)}</span>
            </div>
        </div>
    `).join('');
}

// Render Taxonomy Hierarchy Table
function initTaxonomyTable() {
    const tbody = document.getElementById('taxonomy-table-body');
    if (!tbody || typeof TAXONOMY_HIERARCHY === 'undefined') return;

    tbody.innerHTML = TAXONOMY_HIERARCHY.map(item => `
        <tr>
            <td><strong>${escapeHtml(item.rank)}</strong></td>
            <td><em>${escapeHtml(item.taxon)}</em></td>
            <td>${escapeHtml(item.description)}</td>
        </tr>
    `).join('');
}

// Sexual Dimorphism Toggle (Male vs Female)
function initDimorphismToggle() {
    const maleBtn = document.getElementById('btn-male-toggle');
    const femaleBtn = document.getElementById('btn-female-toggle');
    const displayCard = document.getElementById('dimorphism-display-card');

    if (!displayCard || typeof DIMORPHISM_DATA === 'undefined') return;

    function renderDimorphism(gender) {
        const data = DIMORPHISM_DATA[gender];
        if (!data) return;

        if (gender === 'male') {
            maleBtn?.classList.add('active');
            femaleBtn?.classList.remove('active');
        } else {
            femaleBtn?.classList.add('active');
            maleBtn?.classList.remove('active');
        }

        displayCard.innerHTML = `
            <h3>${escapeHtml(data.title)}</h3>
            <div class="dimorphism-details-grid">
                <div class="dimorphism-item">
                    <label>Average Body Weight</label>
                    <span>${escapeHtml(data.weight)}</span>
                </div>
                <div class="dimorphism-item">
                    <label>Shoulder Height</label>
                    <span>${escapeHtml(data.shoulderHeight)}</span>
                </div>
                <div class="dimorphism-item">
                    <label>Coat & Saddle Patch</label>
                    <span>${escapeHtml(data.coatColor)}</span>
                </div>
                <div class="dimorphism-item">
                    <label>Horns</label>
                    <span>${escapeHtml(data.horns)}</span>
                </div>
                <div class="dimorphism-item">
                    <label>Facial Markings</label>
                    <span>${escapeHtml(data.facialMarkings)}</span>
                </div>
                <div class="dimorphism-item">
                    <label>Social Behavior</label>
                    <span>${escapeHtml(data.behaviour)}</span>
                </div>
            </div>
        `;
    }

    maleBtn?.addEventListener('click', () => renderDimorphism('male'));
    femaleBtn?.addEventListener('click', () => renderDimorphism('female'));

    // Initial render male
    renderDimorphism('male');
}

// Render Protected Areas / Strongholds with filter buttons
function initProtectedAreasFilter() {
    const grid = document.getElementById('protected-grid');
    const filterBtns = document.querySelectorAll('[data-filter]');

    if (!grid || typeof PROTECTED_AREAS === 'undefined') return;

    function renderCards(filterState) {
        const filtered = filterState === 'all'
            ? PROTECTED_AREAS
            : PROTECTED_AREAS.filter(area => area.state === filterState);

        grid.innerHTML = filtered.map(area => `
            <article class="protected-card" id="protected-card-${area.id}">
                <div>
                    <div class="card-header">
                        <h3>${escapeHtml(area.name)}</h3>
                        <span class="state-chip">${escapeHtml(area.state)}</span>
                    </div>
                    <p>${escapeHtml(area.description)}</p>
                </div>
                <div class="protected-meta">
                    <span><i class="fas fa-paw"></i> <strong>Tahr Pop:</strong> ${escapeHtml(area.tahrPopulation)}</span>
                    <span><i class="fas fa-mountain"></i> <strong>Elevation:</strong> ${escapeHtml(area.elevation)}</span>
                    <span><i class="fas fa-location-dot"></i> <strong>District:</strong> ${escapeHtml(area.district)}</span>
                </div>
            </article>
        `).join('');
    }

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const stateFilter = btn.getAttribute('data-filter');
            renderCards(stateFilter);
        });
    });

    renderCards('all');
}

// Render Adaptations Grid
function initAdaptationsGrid() {
    const grid = document.getElementById('adaptations-grid');
    if (!grid || typeof ADAPTATIONS === 'undefined') return;

    grid.innerHTML = ADAPTATIONS.map(adapt => `
        <div class="adaptation-card">
            <div class="adapt-icon"><i class="fas ${escapeHtml(adapt.icon)}"></i></div>
            <h3>${escapeHtml(adapt.title)}</h3>
            <p>${escapeHtml(adapt.description)}</p>
        </div>
    `).join('');
}

// Render Photo Gallery
function initGallery() {
    const grid = document.getElementById('gallery-grid');
    if (!grid || typeof GALLERY_IMAGES === 'undefined') return;

    grid.innerHTML = GALLERY_IMAGES.map((img, index) => `
        <div class="gallery-item" data-index="${index}" tabindex="0" role="button" aria-label="View ${escapeHtml(img.caption)}">
            <img src="${escapeHtml(img.url)}" alt="${escapeHtml(img.caption)}" loading="lazy">
            <div class="overlay">
                <p><i class="fas fa-search-plus"></i> ${escapeHtml(img.caption)}</p>
            </div>
        </div>
    `).join('');
}

// Interactive Quiz Engine
function initQuizEngine() {
    if (typeof QUIZ_QUESTIONS === 'undefined' || !QUIZ_QUESTIONS.length) return;

    let currentStep = 0;
    let score = 0;
    let answered = false;

    const progressFill = document.getElementById('quiz-progress-fill');
    const stepIndicator = document.getElementById('quiz-step-indicator');
    const scoreIndicator = document.getElementById('quiz-score-indicator');
    const questionText = document.getElementById('quiz-question-text');
    const optionsList = document.getElementById('quiz-options-list');
    const explanationBox = document.getElementById('quiz-explanation');
    const nextBtn = document.getElementById('quiz-next-btn');
    const resetBtn = document.getElementById('quiz-reset-btn');

    function loadQuestion() {
        answered = false;
        const q = QUIZ_QUESTIONS[currentStep];

        const progressPercent = ((currentStep + 1) / QUIZ_QUESTIONS.length) * 100;
        if (progressFill) progressFill.style.width = `${progressPercent}%`;
        if (stepIndicator) stepIndicator.textContent = `Question ${currentStep + 1} of ${QUIZ_QUESTIONS.length}`;
        if (scoreIndicator) scoreIndicator.textContent = `Score: ${score}`;

        if (questionText) questionText.textContent = q.question;
        if (explanationBox) {
            explanationBox.classList.add('hidden');
            explanationBox.textContent = '';
        }
        if (nextBtn) nextBtn.classList.add('hidden');
        if (resetBtn) resetBtn.classList.add('hidden');

        if (optionsList) {
            optionsList.innerHTML = q.options.map((opt, idx) => `
                <button class="quiz-opt-btn" data-index="${idx}">${escapeHtml(opt)}</button>
            `).join('');

            const optionBtns = optionsList.querySelectorAll('.quiz-opt-btn');
            optionBtns.forEach(btn => {
                btn.addEventListener('click', () => handleAnswer(parseInt(btn.getAttribute('data-index'), 10)));
            });
        }
    }

    function handleAnswer(selectedIndex) {
        if (answered) return;
        answered = true;

        const q = QUIZ_QUESTIONS[currentStep];
        const optionBtns = optionsList.querySelectorAll('.quiz-opt-btn');

        optionBtns.forEach((btn, idx) => {
            btn.disabled = true;
            if (idx === q.correct) {
                btn.classList.add('correct');
            } else if (idx === selectedIndex) {
                btn.classList.add('incorrect');
            }
        });

        if (selectedIndex === q.correct) {
            score += 1;
            if (scoreIndicator) scoreIndicator.textContent = `Score: ${score}`;
        }

        if (explanationBox) {
            explanationBox.textContent = q.explanation;
            explanationBox.classList.remove('hidden');
        }

        if (currentStep < QUIZ_QUESTIONS.length - 1) {
            if (nextBtn) nextBtn.classList.remove('hidden');
        } else {
            if (resetBtn) resetBtn.classList.remove('hidden');
            if (questionText) {
                questionText.textContent = `Quiz Completed! Final Score: ${score} / ${QUIZ_QUESTIONS.length}`;
            }
        }
    }

    nextBtn?.addEventListener('click', () => {
        if (currentStep < QUIZ_QUESTIONS.length - 1) {
            currentStep++;
            loadQuestion();
        }
    });

    resetBtn?.addEventListener('click', () => {
        currentStep = 0;
        score = 0;
        loadQuestion();
    });

    loadQuestion();
}

// Lightbox Modal
function initLightbox() {
    const modal = document.getElementById('lightbox-modal');
    const lightboxImg = document.getElementById('lightbox-img');
    const lightboxCaption = document.getElementById('lightbox-caption');
    const closeBtn = document.getElementById('lightbox-close');

    if (!modal) return;

    document.addEventListener('click', (e) => {
        const item = e.target.closest('.gallery-item');
        if (item) {
            const index = parseInt(item.getAttribute('data-index'), 10);
            const imgData = GALLERY_IMAGES[index];
            if (imgData && lightboxImg && lightboxCaption) {
                lightboxImg.src = imgData.url;
                lightboxImg.alt = imgData.caption;
                lightboxCaption.textContent = imgData.caption;
                modal.classList.add('active');
                modal.setAttribute('aria-hidden', 'false');
            }
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        modal.setAttribute('aria-hidden', 'true');
    }

    closeBtn?.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// TOC Scroll Navigation Highlight
function initTOCNavigation() {
    const tocLinks = document.querySelectorAll('.toc-nav a');
    if (!tocLinks.length) return;

    window.addEventListener('scroll', () => {
        let currentSection = '';
        const sections = document.querySelectorAll('.content-section');

        sections.forEach(sec => {
            const secTop = sec.offsetTop - 120;
            if (window.scrollY >= secTop) {
                currentSection = sec.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    });
}

// Helper to escape HTML characters
function escapeHtml(str) {
    if (typeof str !== 'string') return str;
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
